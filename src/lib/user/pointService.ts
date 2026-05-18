import type { PointLog, PointReason } from "@/lib/user/types";
import { getCurrentUser, saveCurrentUser } from "@/lib/user/authService";
import { syncUserRank } from "@/lib/user/rankService";

const KEY_POINT_LOGS = "sslab_point_logs";

export const POINT_AMOUNTS: Record<PointReason, number> = {
  signup_bonus: 500,
  daily_check_in: 100,
  streak_bonus_3: 300,
  streak_bonus_7: 1000,
  streak_bonus_14: 2000,
  streak_bonus_30: 5000,
  test_complete: 30,
  short_test_complete: 15,
  long_test_complete: 50,
  worldcup_complete: 50,
  balance_complete: 30,
  initial_quiz_complete: 40,
  nonsense_complete: 30,
  memory_complete: 40,
  reaction_complete: 40,
  observation_complete: 40,
  poll_vote: 10,
  generator_use: 10,
  together_join_complete: 80,
  together_host_complete: 120,
  friend_invite_complete: 150,
};

export const POINT_LABELS: Record<PointReason, string> = {
  signup_bonus: "가입 축하 포인트",
  daily_check_in: "출석체크",
  streak_bonus_3: "3일 연속 출석 보너스",
  streak_bonus_7: "7일 연속 출석 보너스",
  streak_bonus_14: "14일 연속 출석 보너스",
  streak_bonus_30: "30일 연속 출석 보너스",
  test_complete: "테스트 완료",
  short_test_complete: "단편 테스트 완료",
  long_test_complete: "장편 테스트 완료",
  worldcup_complete: "월드컵 완료",
  balance_complete: "밸런스게임 완료",
  initial_quiz_complete: "초성퀴즈 완료",
  nonsense_complete: "넌센스퀴즈 완료",
  memory_complete: "기억력 테스트 완료",
  reaction_complete: "반응속도 테스트 완료",
  observation_complete: "관찰력 테스트 완료",
  poll_vote: "투표 참여",
  generator_use: "생성기 사용",
  together_join_complete: "같이놀기 참여 완료",
  together_host_complete: "같이놀기 방 만들기 완료",
  friend_invite_complete: "친구 초대 완료",
};

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

export function addPointLog(userId: string, reason: PointReason, amount: number): PointLog {
  const log: PointLog = {
    id: generateId(),
    userId,
    amount,
    reason,
    label: POINT_LABELS[reason],
    createdAt: new Date().toISOString(),
  };
  if (typeof window !== "undefined") {
    const raw = localStorage.getItem(KEY_POINT_LOGS);
    const logs: PointLog[] = raw ? JSON.parse(raw) : [];
    logs.push(log);
    localStorage.setItem(KEY_POINT_LOGS, JSON.stringify(logs));
  }
  return log;
}

export function getPointLogs(userId: string): PointLog[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(KEY_POINT_LOGS);
  const all: PointLog[] = raw ? JSON.parse(raw) : [];
  return all.filter((l) => l.userId === userId).sort((a, b) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getPointSummary(userId: string): { total: number; today: number; recentLogs: PointLog[] } {
  const logs = getPointLogs(userId);
  const today = new Date().toISOString().slice(0, 10);
  const todayTotal = logs
    .filter((l) => l.createdAt.slice(0, 10) === today)
    .reduce((sum, l) => sum + l.amount, 0);
  return {
    total: logs.reduce((sum, l) => sum + l.amount, 0),
    today: todayTotal,
    recentLogs: logs.slice(0, 20),
  };
}

// 중복 지급 방지: earned:{userId}:{reason}:{contentId}:{yyyy-mm-dd}
function earnedKey(userId: string, reason: PointReason, contentId: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `sslab_earned:${userId}:${reason}:${contentId}:${today}`;
}

export function canEarnForContent(userId: string, contentId: string, reason: PointReason): boolean {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem(earnedKey(userId, reason, contentId));
}

export function markEarned(userId: string, contentId: string, reason: PointReason): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(earnedKey(userId, reason, contentId), "1");
}

/** 회원에게 포인트를 지급하고 계급 업데이트 후 지급 결과 반환 */
export function awardPoints(
  userId: string,
  reason: PointReason,
  contentId = "default"
): { awarded: boolean; amount: number; newTotal: number; rankUp?: boolean; newRankName?: string } {
  const user = getCurrentUser();
  if (!user || user.role !== "member" || user.id !== userId) {
    return { awarded: false, amount: 0, newTotal: 0 };
  }
  if (!canEarnForContent(userId, contentId, reason)) {
    return { awarded: false, amount: 0, newTotal: user.points };
  }

  const amount = POINT_AMOUNTS[reason];
  markEarned(userId, contentId, reason);
  addPointLog(userId, reason, amount);

  const prevRankId = user.rankId;
  const updated = syncUserRank({ ...user, points: user.points + amount });
  saveCurrentUser(updated);

  return {
    awarded: true,
    amount,
    newTotal: updated.points,
    rankUp: updated.rankId !== prevRankId,
    newRankName: updated.rankId !== prevRankId ? updated.rankName : undefined,
  };
}

export function updateUserRank(userId: string): void {
  const user = getCurrentUser();
  if (!user || user.id !== userId) return;
  const updated = syncUserRank(user);
  saveCurrentUser(updated);
}
