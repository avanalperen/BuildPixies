begin;

select plan(21);

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

select * from finish();
rollback;
