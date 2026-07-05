alter table public.projects
  add column if not exists owner_id uuid references auth.users(id) on delete cascade;

create index if not exists projects_owner_updated_at_idx
  on public.projects (owner_id, updated_at desc);

grant select, insert, update, delete on public.projects to authenticated;

alter table public.projects enable row level security;

drop policy if exists "projects_select_own" on public.projects;
create policy "projects_select_own"
  on public.projects for select
  to authenticated
  using ((select auth.uid()) = owner_id);

drop policy if exists "projects_insert_own" on public.projects;
create policy "projects_insert_own"
  on public.projects for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);

drop policy if exists "projects_update_own" on public.projects;
create policy "projects_update_own"
  on public.projects for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "projects_delete_own" on public.projects;
create policy "projects_delete_own"
  on public.projects for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

create table if not exists public.generation_jobs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'queued'
    check (status in ('queued', 'running', 'succeeded', 'failed')),
  error text,
  blueprint jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz
);

create index if not exists generation_jobs_owner_created_at_idx
  on public.generation_jobs (owner_id, created_at desc);

create index if not exists generation_jobs_project_id_idx
  on public.generation_jobs (project_id);

grant select, insert, update, delete on public.generation_jobs to authenticated;

alter table public.generation_jobs enable row level security;

drop policy if exists "generation_jobs_select_own" on public.generation_jobs;
create policy "generation_jobs_select_own"
  on public.generation_jobs for select
  to authenticated
  using ((select auth.uid()) = owner_id);

drop policy if exists "generation_jobs_insert_own" on public.generation_jobs;
create policy "generation_jobs_insert_own"
  on public.generation_jobs for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);

drop policy if exists "generation_jobs_update_own" on public.generation_jobs;
create policy "generation_jobs_update_own"
  on public.generation_jobs for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "generation_jobs_delete_own" on public.generation_jobs;
create policy "generation_jobs_delete_own"
  on public.generation_jobs for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

comment on table public.projects is
  'BuildPixies project storage. Rows are owner-scoped with Supabase Auth and RLS.';

comment on table public.generation_jobs is
  'BuildPixies AI generation job status table. Rows are owner-scoped with Supabase Auth and RLS.';
