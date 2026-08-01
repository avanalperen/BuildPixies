alter table public.generation_jobs
  add column if not exists progress jsonb;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'generation_jobs_progress_object_check'
      and conrelid = 'public.generation_jobs'::regclass
  ) then
    alter table public.generation_jobs
      add constraint generation_jobs_progress_object_check
      check (progress is null or jsonb_typeof(progress) = 'object');
  end if;
end;
$$;

comment on column public.generation_jobs.progress is
  'Real per-section pipeline progress reported by the generation worker.';

-- Lease-guarded progress writes for the durable worker.
create or replace function public.set_generation_job_progress(
  p_job_id uuid,
  p_lease_token uuid,
  p_progress jsonb
)
returns boolean
language sql
security definer
set search_path = ''
as $$
  update public.generation_jobs
  set progress = p_progress, updated_at = now()
  where id = p_job_id
    and status = 'running'
    and lease_token = p_lease_token
  returning true;
$$;

revoke all on function public.set_generation_job_progress(uuid, uuid, jsonb)
  from public, anon, authenticated;
grant execute on function public.set_generation_job_progress(uuid, uuid, jsonb)
  to service_role;

-- A failed run must not hide a blueprint the project already owns.
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

-- Export endpoints hit storage and CPU, so they need their own quota.
create or replace function public.consume_rate_limit(
  p_bucket text
)
returns table (allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_owner_id uuid := (select auth.uid());
  v_now timestamptz := clock_timestamp();
  v_window_started_at timestamptz;
  v_request_count integer;
  v_limit integer;
  v_window_seconds integer := 60;
begin
  if v_owner_id is null then
    raise insufficient_privilege using message = 'Authentication required';
  end if;

  v_limit := case p_bucket
    when 'ai:generation-jobs' then 5
    when 'ai:regenerate' then 10
    when 'ai:bootcamp' then 5
    when 'projects:create' then 30
    when 'export:document' then 30
    else null
  end;

  if v_limit is null then
    raise invalid_parameter_value using message = 'Invalid rate limit bucket';
  end if;

  insert into public.rate_limit_buckets as rate_limit (
    owner_id,
    bucket,
    window_started_at,
    request_count
  )
  values (v_owner_id, p_bucket, v_now, 1)
  on conflict (owner_id, bucket) do update
  set
    window_started_at = case
      when rate_limit.window_started_at <=
        v_now - make_interval(secs => v_window_seconds)
      then v_now
      else rate_limit.window_started_at
    end,
    request_count = case
      when rate_limit.window_started_at <=
        v_now - make_interval(secs => v_window_seconds)
      then 1
      else rate_limit.request_count + 1
    end
  returning rate_limit.window_started_at, rate_limit.request_count
    into v_window_started_at, v_request_count;

  allowed := v_request_count <= v_limit;
  retry_after_seconds := case
    when allowed then 0
    else greatest(
      1,
      ceil(extract(epoch from (
        v_window_started_at
          + make_interval(secs => v_window_seconds)
          - v_now
      )))::integer
    )
  end;
  return next;
end;
$$;

revoke all on function public.consume_rate_limit(text)
  from public, anon;
grant execute on function public.consume_rate_limit(text)
  to authenticated;
