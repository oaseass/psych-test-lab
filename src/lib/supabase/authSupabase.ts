/**
 * Supabase 기반 인증 서비스
 *
 * 사용하려면:
 * 1. supabase.com에서 프로젝트 생성
 * 2. /supabase-schema.sql 을 Supabase SQL Editor에서 실행
 * 3. Vercel 환경변수에 추가:
 *    NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
 *    NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxx...
 */

import { supabase, isSupabaseConfigured } from "./client";
import type { UserProfile } from "@/lib/user/types";
import { MEMBER_RANKS } from "@/data/ranks";

export type SupabaseSignupInput = {
  email: string;
  password: string;
  nickname: string;
};

export type SupabaseAuthResult =
  | { success: true; user: UserProfile }
  | { success: false; error: string };

export { isSupabaseConfigured };

export async function supabaseSignup(
  input: SupabaseSignupInput
): Promise<SupabaseAuthResult> {
  if (!supabase) return { success: false, error: "Supabase 미설정" };

  const { email, password, nickname } = input;

  if (!email || !email.includes("@")) {
    return { success: false, error: "올바른 이메일 주소를 입력하세요." };
  }
  if (!nickname.trim() || nickname.length < 2 || nickname.length > 12) {
    return { success: false, error: "닉네임은 2~12자여야 합니다." };
  }
  if (!password || password.length < 6) {
    return { success: false, error: "비밀번호는 6자 이상이어야 합니다." };
  }

  // 닉네임 중복 체크
  const { data: existing } = await supabase
    .from("profiles")
    .select("id")
    .eq("nickname", nickname.trim())
    .maybeSingle();
  if (existing) {
    return { success: false, error: "이미 사용 중인 닉네임입니다." };
  }

  // Supabase Auth 계정 생성
  const { data, error } = await supabase.auth.signUp({
    email: email.toLowerCase(),
    password,
    options: { data: { nickname: nickname.trim() } },
  });

  if (error) {
    if (error.message.includes("already registered") || error.message.includes("User already registered")) {
      return { success: false, error: "이미 가입된 이메일입니다. 로그인을 시도해보세요." };
    }
    if (error.message.includes("rate limit") || error.message.includes("too many requests")) {
      return { success: false, error: "잠시 후 다시 시도해주세요. (이메일 발송 한도 초과)" };
    }
    return { success: false, error: error.message };
  }
  if (!data.user) {
    // Supabase는 이미 가입된 이메일일 때 user: null을 에러 없이 반환 (보안상)
    return { success: false, error: "이미 가입된 이메일입니다. 로그인을 시도해보세요." };
  }

  const startRank = MEMBER_RANKS[0];
  const now = new Date().toISOString();

  // profiles 테이블에 프로필 저장
  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    nickname: nickname.trim(),
    email: email.toLowerCase(),
    points: 500,
    rank_id: startRank.id,
    rank_name: startRank.name,
    rank_icon: startRank.icon,
    created_at: now,
    last_login_at: now,
    check_in_streak: 0,
    total_check_in_days: 0,
    played_count: 0,
    together_played_count: 0,
  });

  if (profileError) {
    return { success: false, error: "프로필 저장 실패: " + profileError.message };
  }

  const userProfile: UserProfile = {
    id: data.user.id,
    role: "member",
    nickname: nickname.trim(),
    points: 500,
    rankId: startRank.id,
    rankName: startRank.name,
    rankIcon: startRank.icon,
    createdAt: now,
    lastLoginAt: now,
    checkInStreak: 0,
    totalCheckInDays: 0,
    playedCount: 0,
    togetherPlayedCount: 0,
  };

  return { success: true, user: userProfile };
}

export async function supabaseLogin(
  email: string,
  password: string
): Promise<SupabaseAuthResult> {
  if (!supabase) return { success: false, error: "Supabase 미설정" };

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.toLowerCase(),
    password,
  });

  if (error || !data.user) {
    return { success: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." };
  }

  // 프로필 조회
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    return { success: false, error: "프로필을 찾을 수 없습니다. 관리자에게 문의하세요." };
  }

  const now = new Date().toISOString();

  // last_login_at 갱신
  await supabase
    .from("profiles")
    .update({ last_login_at: now })
    .eq("id", data.user.id);

  const userProfile: UserProfile = {
    id: profile.id,
    role: "member",
    nickname: profile.nickname,
    points: profile.points,
    rankId: profile.rank_id,
    rankName: profile.rank_name,
    rankIcon: profile.rank_icon,
    createdAt: profile.created_at,
    lastLoginAt: now,
    checkInStreak: profile.check_in_streak ?? 0,
    totalCheckInDays: profile.total_check_in_days ?? 0,
    playedCount: profile.played_count ?? 0,
    togetherPlayedCount: profile.together_played_count ?? 0,
  };

  return { success: true, user: userProfile };
}

export async function supabaseLogout(): Promise<void> {
  if (!supabase) return;
  await supabase.auth.signOut();
}

/** 관리자용: 전체 회원 목록 조회 */
export async function getAllUsersSupabase(): Promise<
  Array<{
    id: string;
    nickname: string;
    email: string;
    points: number;
    rank_id: string;
    rank_name: string;
    rank_icon: string;
    created_at: string;
    last_login_at: string | null;
    check_in_streak: number;
    total_check_in_days: number;
    played_count: number;
    together_played_count: number;
  }>
> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data;
}
