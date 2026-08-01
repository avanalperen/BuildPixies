-- BP-031: a failed or still-running job keeps the sections it already produced.
-- Partials live on the job, never on projects.blueprint: that column is read
-- back through the strict blueprint schema and must stay complete.
alter table public.generation_jobs
  add column if not exists partial_blueprint jsonb;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'generation_jobs_partial_blueprint_object_check'
      and conrelid = 'public.generation_jobs'::regclass
  ) then
    alter table public.generation_jobs
      add constraint generation_jobs_partial_blueprint_object_check
      check (
        partial_blueprint is null
        or jsonb_typeof(partial_blueprint) = 'object'
      );
  end if;
end;
$$;

comment on column public.generation_jobs.partial_blueprint is
  'Schema-validated sections produced so far; survives a failed run.';

drop function if exists public.set_generation_job_progress(uuid, uuid, jsonb);

create or replace function public.set_generation_job_progress(
  p_job_id uuid,
  p_lease_token uuid,
  p_progress jsonb,
  p_partial_blueprint jsonb default null
)
returns boolean
language sql
security definer
set search_path = ''
as $$
  update public.generation_jobs
  set
    progress = p_progress,
    partial_blueprint = coalesce(p_partial_blueprint, partial_blueprint),
    updated_at = now()
  where id = p_job_id
    and status = 'running'
    and lease_token = p_lease_token
  returning true;
$$;

revoke all on function public.set_generation_job_progress(uuid, uuid, jsonb, jsonb)
  from public, anon, authenticated;
grant execute on function public.set_generation_job_progress(uuid, uuid, jsonb, jsonb)
  to service_role;

-- A permanently failed run must not drop the sections it did produce.
create or replace function public.fail_generation_job_permanently(
  p_job_id uuid,
  p_error text
)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_project_id uuid;
  v_owner_id uuid;
begin
  update public.generation_jobs
  set
    status = 'failed',
    error = left(p_error, 500),
    completed_at = now(),
    updated_at = now(),
    lease_token = null,
    lease_expires_at = null
  where id = p_job_id and status in ('queued', 'running')
  returning project_id, owner_id into v_project_id, v_owner_id;

  if not found then
    return false;
  end if;

  if v_project_id is not null then
    update public.projects
    set
      status = case when blueprint is null then 'failed' else 'ready' end,
      updated_at = now()
    where id = v_project_id and owner_id = v_owner_id;
  end if;

  return true;
end;
$$;

revoke all on function public.fail_generation_job_permanently(uuid, text)
  from public, anon, authenticated;
grant execute on function public.fail_generation_job_permanently(uuid, text)
  to service_role;
