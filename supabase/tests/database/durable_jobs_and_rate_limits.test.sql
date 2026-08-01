begin;

select plan(30);

select has_table(
  'public',
  'rate_limit_buckets',
  'rate limit buckets table exists'
);
select has_column(
  'public',
  'generation_jobs',
  'input',
  'generation jobs persist their input'
);
select has_column(
  'public',
  'projects',
  'bootcamp_report',
  'projects persist their latest bootcamp report'
);
select ok(
  has_function_privilege(
    'authenticated',
    'public.consume_rate_limit(text)',
    'execute'
  ),
  'authenticated users can consume an API quota'
);
select ok(
  not has_function_privilege(
    'authenticated',
    'public.claim_generation_job(uuid,integer)',
    'execute'
  ),
  'authenticated users cannot claim workers jobs'
);
select ok(
  has_function_privilege(
    'service_role',
    'public.claim_generation_job(uuid,integer)',
    'execute'
  ),
  'service role can claim worker jobs'
);

insert into auth.users (id)
values ('00000000-0000-0000-0000-000000000016');
set local "request.jwt.claim.sub" = '00000000-0000-0000-0000-000000000016';

select is(
  (select allowed from public.consume_rate_limit('ai:generation-jobs')),
  true,
  'request one is allowed'
);
select is(
  (select allowed from public.consume_rate_limit('ai:generation-jobs')),
  true,
  'request two is allowed'
);
select is(
  (select allowed from public.consume_rate_limit('ai:generation-jobs')),
  true,
  'request three is allowed'
);
select is(
  (select allowed from public.consume_rate_limit('ai:generation-jobs')),
  true,
  'request four is allowed'
);
select is(
  (select allowed from public.consume_rate_limit('ai:generation-jobs')),
  true,
  'request five is allowed'
);
select is(
  (select allowed from public.consume_rate_limit('ai:bootcamp')),
  true,
  'bootcamp report generation has a dedicated quota'
);

create temporary table denied_request on commit drop as
select * from public.consume_rate_limit('ai:generation-jobs');

select is(
  (select allowed from denied_request),
  false,
  'request six is denied'
);
select cmp_ok(
  (select retry_after_seconds from denied_request),
  '>',
  0,
  'denied requests include a retry delay'
);

insert into public.projects (
  id,
  owner_id,
  title,
  raw_idea,
  goal,
  platform,
  target_audience,
  constraints,
  output_depth,
  status
) values (
  '10000000-0000-0000-0000-000000000016',
  '00000000-0000-0000-0000-000000000016',
  'Queue test',
  'A sufficiently detailed queue test idea',
  'bootcamp',
  'web',
  'builders',
  '{}'::jsonb,
  'bootcamp-ready',
  'draft'
);

insert into public.generation_jobs (
  id,
  project_id,
  owner_id,
  input
) values (
  '20000000-0000-0000-0000-000000000016',
  '10000000-0000-0000-0000-000000000016',
  '00000000-0000-0000-0000-000000000016',
  '{"rawIdea":"A sufficiently detailed queue test idea","goal":"bootcamp","platform":"web","targetAudience":"builders","outputDepth":"bootcamp-ready"}'::jsonb
);

create temporary table claimed_job on commit drop as
select *
from public.claim_generation_job(
  '20000000-0000-0000-0000-000000000016',
  600
);

select is(
  (select status from claimed_job),
  'running',
  'claimed job is running'
);
select is(
  (select input ->> 'goal' from claimed_job),
  'bootcamp',
  'claim returns the persisted generation input'
);
select is(
  (select attempt_count from claimed_job),
  1,
  'claim increments the attempt count'
);
select ok(
  (select lease_token is not null from claimed_job),
  'claim creates a lease token'
);
select is(
  (
    select status
    from public.projects
    where id = '10000000-0000-0000-0000-000000000016'
  ),
  'generating',
  'claim marks the project as generating'
);
select is(
  (
    select count(*)::integer
    from public.claim_generation_job(
      '20000000-0000-0000-0000-000000000016',
      600
    )
  ),
  0,
  'an active job cannot be claimed twice'
);
select ok(
  public.complete_generation_job(
    '20000000-0000-0000-0000-000000000016',
    (select lease_token from claimed_job),
    '{"test":true}'::jsonb
  ),
  'the lease owner can complete the job'
);
select ok(
  exists (
    select 1
    from public.generation_jobs
    where id = '20000000-0000-0000-0000-000000000016'
      and status = 'succeeded'
      and lease_token is null
      and lease_expires_at is null
  ),
  'completed job is terminal and releases its lease'
);
select ok(
  exists (
    select 1
    from public.projects
    where id = '10000000-0000-0000-0000-000000000016'
      and status = 'ready'
      and blueprint = '{"test":true}'::jsonb
  ),
  'job completion atomically updates the project'
);

-- 202608010001 / 202608010002: progress and partial persistence contract.
select has_column(
  'public',
  'generation_jobs',
  'progress',
  'generation jobs persist real pipeline progress'
);
select has_column(
  'public',
  'generation_jobs',
  'partial_blueprint',
  'generation jobs keep the sections produced so far'
);
select ok(
  has_function_privilege(
    'service_role',
    'public.set_generation_job_progress(uuid,uuid,jsonb,jsonb)',
    'execute'
  ),
  'the worker can report progress'
);
select ok(
  not has_function_privilege(
    'authenticated',
    'public.set_generation_job_progress(uuid,uuid,jsonb,jsonb)',
    'execute'
  ),
  'authenticated users cannot forge progress'
);
select ok(
  not exists (
    select 1
    from pg_proc
    join pg_namespace on pg_namespace.oid = pg_proc.pronamespace
    where pg_namespace.nspname = 'public'
      and pg_proc.proname = 'set_generation_job_progress'
      and pg_proc.pronargs = 3
  ),
  'the superseded three argument progress function is gone'
);

-- A permanently failed run must not hide a blueprint the project already owns.
insert into auth.users (id)
values ('00000000-0000-0000-0000-000000000031');
set local "request.jwt.claim.sub" = '00000000-0000-0000-0000-000000000031';
insert into public.projects (
  id, owner_id, title, raw_idea, goal, platform, target_audience,
  blueprint, status
) values (
  '10000000-0000-0000-0000-000000000031',
  '00000000-0000-0000-0000-000000000031',
  'Already generated', 'An idea long enough to store', 'bootcamp', 'web',
  'builders', '{"test":true}'::jsonb, 'ready'
);
insert into public.generation_jobs (
  id, project_id, owner_id, status, input
) values (
  '20000000-0000-0000-0000-000000000031',
  '10000000-0000-0000-0000-000000000031',
  '00000000-0000-0000-0000-000000000031',
  'queued',
  '{"rawIdea":"An idea long enough to store","goal":"bootcamp","platform":"web","targetAudience":"builders"}'::jsonb
);
select ok(
  public.fail_generation_job_permanently(
    '20000000-0000-0000-0000-000000000031',
    'provider unavailable'
  ),
  'a queued job can fail permanently'
);
select ok(
  exists (
    select 1 from public.projects
    where id = '10000000-0000-0000-0000-000000000031' and status = 'ready'
  ),
  'a failed run keeps a project that already owns a blueprint ready'
);

select * from finish();
rollback;
