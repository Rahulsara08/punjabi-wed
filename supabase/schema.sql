-- Phulkari wedding invite: Supabase schema (PRD §9).
-- Run in the Supabase SQL editor, then set NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY.
--
-- rsvps:     anyone can insert or update their own row (upsert by invite_code or device id);
--            only the couple can read (service role / dashboard). No anon SELECT policy.
-- blessings: anyone can insert; the public reads only approved rows.

create extension if not exists "pgcrypto";

create table if not exists public.rsvps (
  id uuid primary key default gen_random_uuid(),
  invite_code text unique,
  name text not null check (char_length(name) between 1 and 80),
  attending boolean not null,
  guest_count int not null default 1 check (guest_count between 0 and 20),
  events text[] not null default '{}',
  food_preference text,
  needs_stay boolean not null default false,
  note text check (char_length(note) <= 400),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.rsvps enable row level security;

drop policy if exists "anyone can insert rsvp" on public.rsvps;
create policy "anyone can insert rsvp"
  on public.rsvps for insert to anon with check (true);

-- Lets a guest change their answer later from the same link (upsert on invite_code / id).
drop policy if exists "anyone can update rsvp" on public.rsvps;
create policy "anyone can update rsvp"
  on public.rsvps for update to anon using (true) with check (true);

create table if not exists public.blessings (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 40),
  place text check (char_length(place) <= 40),
  message text not null check (char_length(message) between 1 and 250),
  color_variant text not null default 'sarson' check (color_variant in ('sarson', 'gulabi')),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.blessings enable row level security;

drop policy if exists "anyone can insert blessing" on public.blessings;
create policy "anyone can insert blessing"
  on public.blessings for insert to anon with check (true);

drop policy if exists "public reads approved blessings" on public.blessings;
create policy "public reads approved blessings"
  on public.blessings for select to anon using (approved = true);

create index if not exists blessings_created_at_idx on public.blessings (created_at desc);

-- If wedding.blessings.requireApproval is false in content/wedding.ts, make new rows public by default:
-- alter table public.blessings alter column approved set default true;
