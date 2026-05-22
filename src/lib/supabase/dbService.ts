/**
 * dbService.ts — Supabase 데이터 동기화 서비스
 *
 * Supabase가 설정된 경우 localStorage 데이터를 서버에 동기화합니다.
 * 설정되지 않은 경우 모든 함수는 아무 동작도 하지 않으며 localStorage만 사용됩니다.
 */
import { supabase, isSupabaseConfigured } from "./client";

// ============================================================
// 포인트 로그 동기화
// ============================================================
export async function syncPointLog(
  userId: string,
  log: { id: string; amount: number; reason: string; label: string; createdAt: string }
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from("point_logs").upsert(
      {
        id: log.id,
        user_id: userId,
        amount: log.amount,
        reason: log.reason,
        label: log.label,
        created_at: log.createdAt,
      },
      { onConflict: "id" }
    );
  } catch {
    // 네트워크 오류 시 무시 (localStorage에 이미 저장됨)
  }
}

// ============================================================
// 프로필 동기화
// ============================================================
export async function syncProfile(profile: {
  id: string;
  nickname: string;
  points: number;
  rankId: string;
  rankName: string;
  rankIcon: string;
  checkInStreak: number;
  totalCheckInDays: number;
  playedCount: number;
  togetherPlayedCount: number;
  lastCheckInAt?: string;
  lastLoginAt?: string;
}): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from("profiles").upsert(
      {
        id: profile.id,
        nickname: profile.nickname,
        email: `${profile.id}@mock.local`,
        points: profile.points,
        rank_id: profile.rankId,
        rank_name: profile.rankName,
        rank_icon: profile.rankIcon,
        check_in_streak: profile.checkInStreak,
        total_check_in_days: profile.totalCheckInDays,
        played_count: profile.playedCount,
        together_played_count: profile.togetherPlayedCount,
        last_login_at: profile.lastLoginAt ?? new Date().toISOString(),
      },
      { onConflict: "id" }
    );
  } catch {
    // 무시
  }
}

// ============================================================
// 리더보드 조회 (Supabase 우선, 실패 시 null 반환)
// ============================================================
export async function fetchLeaderboard(limit = 50): Promise<Array<{
  id: string;
  nickname: string;
  rank_name: string;
  rank_icon: string;
  points: number;
  played_count: number;
  together_played_count: number;
}> | null> {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, nickname, rank_name, rank_icon, points, played_count, together_played_count")
      .order("points", { ascending: false })
      .limit(limit);
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

// ============================================================
// 테스트 결과 저장
// ============================================================
export async function syncTestResult(
  userId: string,
  result: {
    id: string;
    testSlug: string;
    resultTypeId: string;
    resultTitle: string;
    createdAt: string;
  }
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from("user_results").upsert(
      {
        id: result.id,
        user_id: userId,
        test_slug: result.testSlug,
        result_type_id: result.resultTypeId,
        result_title: result.resultTitle,
        created_at: result.createdAt,
      },
      { onConflict: "id" }
    );
  } catch {
    // 무시
  }
}

// ============================================================
// 실시간 접속자 추적
// ============================================================
export async function upsertOnlineVisitor(
  visitorId: string,
  testSlug: string
): Promise<void> {
  if (!isSupabaseConfigured || !supabase) return;
  try {
    await supabase.from("online_visitors").upsert(
      { id: visitorId, test_slug: testSlug, last_seen: new Date().toISOString() },
      { onConflict: "id" }
    );
  } catch {
    // 무시
  }
}

export async function getOnlineCount(testSlug: string): Promise<number> {
  if (!isSupabaseConfigured || !supabase) return 0;
  try {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("online_visitors")
      .select("*", { count: "exact", head: true })
      .eq("test_slug", testSlug)
      .gte("last_seen", fiveMinAgo);
    return count ?? 0;
  } catch {
    return 0;
  }
}
