import type { UserProfile } from "@/lib/user/types";
import { getCurrentUser, saveCurrentUser } from "@/lib/user/authService";
import { addPointLog, POINT_AMOUNTS } from "@/lib/user/pointService";
import { syncUserRank } from "@/lib/user/rankService";

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function canCheckInToday(user: UserProfile): boolean {
  if (user.role !== "member") return false;
  if (!user.lastCheckInAt) return true;
  return user.lastCheckInAt.slice(0, 10) !== todayStr();
}

export type CheckInResult = {
  success: boolean;
  basePoints: number;
  bonusPoints: number;
  bonusReason?: string;
  streak: number;
  error?: string;
};

export function checkIn(userId: string): CheckInResult {
  const user = getCurrentUser();
  if (!user || user.id !== userId) {
    return { success: false, basePoints: 0, bonusPoints: 0, streak: 0, error: "로그인이 필요합니다." };
  }
  if (user.role !== "member") {
    return { success: false, basePoints: 0, bonusPoints: 0, streak: 0, error: "회원만 출석체크를 할 수 있습니다." };
  }
  if (!canCheckInToday(user)) {
    return { success: false, basePoints: 0, bonusPoints: 0, streak: user.checkInStreak, error: "오늘은 이미 출석했습니다." };
  }

  const today = todayStr();
  const lastDate = user.lastCheckInAt?.slice(0, 10);
  // streak 계산: 어제 출석했으면 이어서, 아니면 1부터
  const newStreak = lastDate === yesterday() ? user.checkInStreak + 1 : 1;
  const newTotal = user.totalCheckInDays + 1;

  // 기본 출석 포인트
  addPointLog(userId, "daily_check_in", POINT_AMOUNTS.daily_check_in);

  // 연속 출석 보너스
  let bonusPoints = 0;
  let bonusReason = "";
  const streakBonuses: Array<{ days: number; reason: "streak_bonus_3" | "streak_bonus_7" | "streak_bonus_14" | "streak_bonus_30"; label: string }> = [
    { days: 30, reason: "streak_bonus_30", label: "30일 연속 출석" },
    { days: 14, reason: "streak_bonus_14", label: "14일 연속 출석" },
    { days: 7, reason: "streak_bonus_7", label: "7일 연속 출석" },
    { days: 3, reason: "streak_bonus_3", label: "3일 연속 출석" },
  ];
  for (const b of streakBonuses) {
    if (newStreak === b.days || (newStreak > b.days && newStreak % b.days === 0)) {
      bonusPoints = POINT_AMOUNTS[b.reason];
      bonusReason = b.label;
      addPointLog(userId, b.reason, bonusPoints);
      break;
    }
  }

  const totalGained = POINT_AMOUNTS.daily_check_in + bonusPoints;
  const existingDates = user.checkInDates ?? [];
  const updated: UserProfile = {
    ...user,
    points: user.points + totalGained,
    checkInStreak: newStreak,
    totalCheckInDays: newTotal,
    lastCheckInAt: today,
    checkInDates: existingDates.includes(today) ? existingDates : [...existingDates, today],
  };

  // 계급 동기화
  const synced = syncUserRank(updated);
  saveCurrentUser(synced);

  return {
    success: true,
    basePoints: POINT_AMOUNTS.daily_check_in,
    bonusPoints,
    bonusReason: bonusReason || undefined,
    streak: newStreak,
  };
}

export function getCheckInStreak(user: UserProfile): number {
  return user.checkInStreak;
}

export function getNextStreakReward(streak: number): { days: number; points: number } | null {
  const milestones = [3, 7, 14, 30];
  const pointMap: Record<number, number> = { 3: 300, 7: 1000, 14: 2000, 30: 5000 };
  for (const m of milestones) {
    if (streak < m) {
      return { days: m - streak, points: pointMap[m] };
    }
  }
  return null; // 30일 이상 달성
}
