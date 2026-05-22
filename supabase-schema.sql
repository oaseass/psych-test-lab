-- ============================================================
-- 심심풀이 연구소 - Supabase 스키마 설정
-- Supabase 대시보드 > SQL Editor에서 실행
-- ============================================================

-- profiles 테이블 (회원 프로필)
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  nickname text unique not null,
  email text unique not null,
  points int not null default 500,
  rank_id text not null default 'pvt',
  rank_name text not null default '이등병',
  rank_icon text not null default '🪖',
  created_at timestamptz not null default now(),
  last_login_at timestamptz,
  check_in_streak int not null default 0,
  total_check_in_days int not null default 0,
  played_count int not null default 0,
  together_played_count int not null default 0
);

-- Row Level Security 활성화
alter table public.profiles enable row level security;

-- 본인 프로필 읽기/수정 가능
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 회원가입 시 본인 프로필 삽입 허용
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 관리자 콘솔에서 전체 회원 목록 조회 가능 (anon key로)
-- 주의: 실제 운영에서는 서비스롤 키나 별도 admin API 사용 권장
create policy "Public read for admin dashboard"
  on public.profiles for select
  using (true);

-- 닉네임 인덱스
create index if not exists profiles_nickname_idx on public.profiles (nickname);
create index if not exists profiles_created_at_idx on public.profiles (created_at desc);

-- ============================================================
-- point_logs 테이블 (포인트 내역 서버 동기화)
-- ============================================================
create table if not exists public.point_logs (
  id text primary key,
  user_id text not null,
  amount int not null,
  reason text not null,
  label text not null,
  created_at timestamptz not null default now()
);

alter table public.point_logs enable row level security;

create policy "Public insert point_logs"
  on public.point_logs for insert
  with check (true);

create policy "Public read point_logs"
  on public.point_logs for select
  using (true);

create index if not exists point_logs_user_id_idx on public.point_logs (user_id, created_at desc);

-- ============================================================
-- user_results 테이블 (테스트 결과 서버 저장)
-- ============================================================
create table if not exists public.user_results (
  id text primary key,
  user_id text not null,
  test_slug text not null,
  result_type_id text not null,
  result_title text not null,
  created_at timestamptz not null default now()
);

alter table public.user_results enable row level security;

create policy "Public insert user_results"
  on public.user_results for insert
  with check (true);

create policy "Public read user_results"
  on public.user_results for select
  using (true);

create index if not exists user_results_user_id_idx on public.user_results (user_id, created_at desc);
create index if not exists user_results_test_slug_idx on public.user_results (test_slug);

-- ============================================================
-- online_visitors 테이블 (실시간 접속자 추적)
-- ============================================================
create table if not exists public.online_visitors (
  id text primary key,
  test_slug text not null,
  last_seen timestamptz not null default now()
);

alter table public.online_visitors enable row level security;

create policy "Public upsert online_visitors"
  on public.online_visitors for all
  using (true)
  with check (true);

create index if not exists online_visitors_test_slug_idx on public.online_visitors (test_slug, last_seen desc);

-- ============================================================
-- Vercel 환경변수에 추가해야 할 값 (Supabase Settings > API)
-- ============================================================
-- NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxx.supabase.co
-- NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
-- NEXT_PUBLIC_ADMIN_PASSWORD=여기에_관리자_비밀번호_설정
-- NEXT_PUBLIC_SITE_URL=https://psychlab.kr
-- ============================================================
