alter table public.generation_jobs
  add column if not exists input jsonb,
  add column if not exists attempt_count integer not null default 0
    check (attempt_count >= 0),
  add column if not exists lease_token uuid,
  add column if not exists lease_expires_at timestamptz,
  add column if not exists queue_message_id text;

update public.generation_jobs
set
  status = 'failed',
  error = 'Restart generation after the durable queue upgrade',
  completed_at = now(),
  updated_at = now(),
  lease_token = null,
  lease_expires_at = null
where status in ('queued', 'running') and input is null;

do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'generation_jobs_active_input_check'
      and conrelid = 'public.generation_jobs'::regclass
  ) then
    alter table public.generation_jobs
      add constraint generation_jobs_active_input_check
      check (input is not null or status in ('succeeded', 'failed'));
  end if;
end;
$$;

create index if not exists generation_jobs_claim_idx
  on public.generation_jobs (status, lease_expires_at)
  where status in ('queued', 'running');

create table if not exists public.rate_limit_buckets (
  owner_id uuid not null references auth.users(id) on delete cascade,
  bucket text not null,
  window_started_at timestamptz not null,
  request_count integer not null check (request_count > 0),
  primary key (owner_id, bucket)
);

alter table public.rate_limit_buckets enable row level security;
revoke all on public.rate_limit_buckets from public, anon, authenticated;

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
    when 'ai:generate' then 5
    when 'ai:regenerate' then 10
    when 'projects:create' then 30
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

create or replace function public.claim_generation_job(
  p_job_id uuid,
  p_lease_seconds integer default 600
)
returns setof public.generation_jobs
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_lease_seconds < 30 or p_lease_seconds > 3600 then
    raise invalid_parameter_value using message = 'Invalid lease duration';
  end if;

  update public.projects as project
  set status = 'generating', updated_at = now()
  from public.generation_jobs as job
  where job.id = p_job_id
    and job.project_id = project.id
    and job.owner_id = project.owner_id
    and job.input is not null
    and (
      job.status = 'queued'
      or (job.status = 'running' and job.lease_expires_at <= now())
    );

  return query
  update public.generation_jobs
  set
    status = 'running',
    error = null,
    started_at = coalesce(started_at, now()),
    completed_at = null,
    updated_at = now(),
    attempt_count = attempt_count + 1,
    lease_token = gen_random_uuid(),
    lease_expires_at = now() + make_interval(secs => p_lease_seconds)
  where id = p_job_id
    and input is not null
    and (
      status = 'queued'
      or (status = 'running' and lease_expires_at <= now())
    )
  returning *;
end;
$$;

create or replace function public.complete_generation_job(
  p_job_id uuid,
  p_lease_token uuid,
  p_blueprint jsonb
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
  select project_id, owner_id
    into v_project_id, v_owner_id
  from public.generation_jobs
  where id = p_job_id
    and status = 'running'
    and lease_token = p_lease_token
  for update;

  if not found then
    return false;
  end if;

  if v_project_id is not null then
    update public.projects
    set blueprint = p_blueprint, status = 'ready', updated_at = now()
    where id = v_project_id and owner_id = v_owner_id;
  end if;

  update public.generation_jobs
  set
    status = 'succeeded',
    blueprint = p_blueprint,
    error = null,
    completed_at = now(),
    updated_at = now(),
    lease_token = null,
    lease_expires_at = null
  where id = p_job_id and lease_token = p_lease_token;

  return found;
end;
$$;

create or replace function public.release_generation_job(
  p_job_id uuid,
  p_lease_token uuid,
  p_error text
)
returns boolean
language sql
security definer
set search_path = ''
as $$
  update public.generation_jobs
  set
    status = 'queued',
    error = left(p_error, 500),
    updated_at = now(),
    lease_token = null,
    lease_expires_at = null
  where id = p_job_id
    and status = 'running'
    and lease_token = p_lease_token
  returning true;
$$;

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
    set status = 'failed', updated_at = now()
    where id = v_project_id and owner_id = v_owner_id;
  end if;

  return true;
end;
$$;

revoke all on function public.claim_generation_job(uuid, integer)
  from public, anon, authenticated;
revoke all on function public.complete_generation_job(uuid, uuid, jsonb)
  from public, anon, authenticated;
revoke all on function public.release_generation_job(uuid, uuid, text)
  from public, anon, authenticated;
revoke all on function public.fail_generation_job_permanently(uuid, text)
  from public, anon, authenticated;

grant execute on function public.claim_generation_job(uuid, integer)
  to service_role;
grant execute on function public.complete_generation_job(uuid, uuid, jsonb)
  to service_role;
grant execute on function public.release_generation_job(uuid, uuid, text)
  to service_role;
grant execute on function public.fail_generation_job_permanently(uuid, text)
  to service_role;

comment on table public.rate_limit_buckets is
  'Fixed-window API quotas keyed by authenticated owner and bucket.';
