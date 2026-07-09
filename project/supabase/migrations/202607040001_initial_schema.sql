create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  raw_idea text not null,
  goal text not null check (goal in ('bootcamp', 'startup', 'portfolio', 'client', 'hackathon')),
  platform text not null check (platform in ('web', 'mobile', 'extension', 'ai-tool', 'marketplace', 'desktop')),
  target_audience text not null,
  constraints jsonb not null default '{}'::jsonb,
  output_depth text check (output_depth in ('quick', 'detailed', 'bootcamp-ready')),
  blueprint jsonb,
  status text not null default 'draft' check (status in ('draft', 'generating', 'ready', 'failed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_updated_at_idx
  on public.projects (updated_at desc);

comment on table public.projects is
  'BuildPixies MVP project storage. Add owner_id and RLS before public multi-user production.';

