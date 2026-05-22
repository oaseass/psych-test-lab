// ================================================
// 럭키존 포인트 엔진
// localStorage 기반 (mock) — 현금성 없음
// ================================================

import type { LuckyResult, LuckyGameType, LuckyDailyStats } from "@/lib/lucky/types";
import { getCurrentUser, saveCurrentUser } from "@/lib/user/authService";
import { syncUserRank } from "@/lib/user/rankService";

const KEY_LUCKY_RESULTS = "sslab_lucky_results";
const KEY_LUCKY_DAILY = "sslab_lucky_daily";

// ── 한도 상수 ──────────────────────────────────
export const LUCKY_MIN_STAKE = 10;
export const LUCKY_MAX_STAKE = 500;
export const LUCKY_DAILY_MAX_SPEND = 3000;
export const LUCKY_DAILY_MAX_PROFIT = 5000;

// ── ID 생성 ──────────────────────────────────
function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ── 오늘 날짜 ──────────────────────────────────
function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

// ── 일일 집계 읽기/쓰기 ──────────────────────────
function getDailyStats(userId: string): LuckyDailyStats {
  if (typeof window === "undefined") return { date: todayStr(), totalSpend: 0, totalProfit: 0, playCount: 0 };
  const key = `${KEY_LUCKY_DAILY}:${userId}:${todayStr()}`;
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { date: todayStr(), totalSpend: 0, totalProfit: 0, playCount: 0 };
}

function saveDailyStats(userId: string, stats: LuckyDailyStats): void {
  if (typeof window === "undefined") return;
  const key = `${KEY_LUCKY_DAILY}:${userId}:${todayStr()}`;
  localStorage.setItem(key, JSON.stringify(stats));
}

// ── 공개 API: 오늘 집계 조회 ─────────────────────
export function getLuckyDailyStats(userId: string): LuckyDailyStats {
  return getDailyStats(userId);
}

// ── 결과 기록 읽기/쓰기 ──────────────────────────
export function getLuckyResults(userId: string): LuckyResult[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY_LUCKY_RESULTS);
    const all: LuckyResult[] = raw ? JSON.parse(raw) : [];
    return all
      .filter((r) => r.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } catch {
    return [];
  }
}

function saveResult(result: LuckyResult): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY_LUCKY_RESULTS);
    const all: LuckyResult[] = raw ? JSON.parse(raw) : [];
    all.push(result);
    // 최대 500개 유지
    const trimmed = all.slice(-500);
    localStorage.setItem(KEY_LUCKY_RESULTS, JSON.stringify(trimmed));
  } catch { /* ignore */ }
}

// ── 검증 결과 타입 ────────────────────────────────
export type StakeValidation =
  | { ok: true }
  | { ok: false; reason: string };

export function validateStake(userId: string, stake: number): StakeValidation {
  const user = getCurrentUser();
  if (!user || user.role !== "member" || user.id !== userId) {
    return { ok: false, reason: "회원만 이용할 수 있습니다." };
  }
  if (stake < LUCKY_MIN_STAKE) {
    return { ok: false, reason: `최소 도전 포인트는 ${LUCKY_MIN_STAKE}P입니다.` };
  }
  if (stake > LUCKY_MAX_STAKE) {
    return { ok: false, reason: `최대 도전 포인트는 ${LUCKY_MAX_STAKE}P입니다.` };
  }
  if (user.points < stake) {
    return { ok: false, reason: "보유 포인트가 부족합니다. 테스트·퀴즈를 완료해 포인트를 모아보세요." };
  }
  const daily = getDailyStats(userId);
  if (daily.totalSpend + stake > LUCKY_DAILY_MAX_SPEND) {
    const remaining = LUCKY_DAILY_MAX_SPEND - daily.totalSpend;
    return { ok: false, reason: `오늘 사용 한도까지 ${remaining}P 남았습니다. (일일 한도: ${LUCKY_DAILY_MAX_SPEND}P)` };
  }
  return { ok: true };
}

// ── 핵심 함수: 럭키 결과 처리 ──────────────────────
export type LuckyPlayResult = {
  success: boolean;
  error?: string;
  result?: LuckyResult;
  newPoints?: number;
  rankUp?: boolean;
  newRankName?: string;
  prevRankName?: string;
};

export function processLuckyResult(
  userId: string,
  gameType: LuckyGameType,
  stake: number,
  isWin: boolean,
  multiplier: number,  // 성공 배수 (무승부 시 1 = 원금 반환)
  detail: string
): LuckyPlayResult {
  const user = getCurrentUser();
  if (!user || user.role !== "member" || user.id !== userId) {
    return { success: false, error: "회원만 이용할 수 있습니다." };
  }

  const validation = validateStake(userId, stake);
  if (!validation.ok) {
    return { success: false, error: validation.reason };
  }

  const rewardPoints = isWin ? Math.floor(stake * multiplier) : 0;
  const netPoints = rewardPoints - stake;

  // 하루 획득 한도 체크 (성공 시만)
  if (isWin && rewardPoints > stake) {
    const daily = getDailyStats(userId);
    const todayProfit = daily.totalProfit;
    if (todayProfit + (rewardPoints - stake) > LUCKY_DAILY_MAX_PROFIT) {
      const remaining = LUCKY_DAILY_MAX_PROFIT - todayProfit;
      return {
        success: false,
        error: `오늘 순획득 한도까지 ${remaining}P 남았습니다. (일일 한도: ${LUCKY_DAILY_MAX_PROFIT}P)`,
      };
    }
  }

  // 포인트 차감 + 보상 지급
  const prevRankName = user.rankName;
  const newPointsValue = user.points - stake + rewardPoints;
  const updatedUser = syncUserRank({ ...user, points: newPointsValue });
  saveCurrentUser(updatedUser);

  // 일일 집계 업데이트
  const daily = getDailyStats(userId);
  const newDaily: LuckyDailyStats = {
    date: todayStr(),
    totalSpend: daily.totalSpend + stake,
    totalProfit: daily.totalProfit + rewardPoints,
    playCount: daily.playCount + 1,
  };
  saveDailyStats(userId, newDaily);

  // 결과 저장
  const result: LuckyResult = {
    id: generateId(),
    userId,
    gameType,
    stakePoints: stake,
    rewardPoints,
    netPoints,
    isWin,
    multiplier,
    detail,
    createdAt: new Date().toISOString(),
  };
  saveResult(result);

  const rankUp = updatedUser.rankId !== user.rankId;

  return {
    success: true,
    result,
    newPoints: updatedUser.points,
    rankUp,
    newRankName: rankUp ? updatedUser.rankName : undefined,
    prevRankName: rankUp ? prevRankName : undefined,
  };
}

// 보물상자 무료 1회 관리
const KEY_BOX_FREE = "sslab_lucky_box_free";

export function canUseFreeBox(userId: string): boolean {
  if (typeof window === "undefined") return false;
  const key = `${KEY_BOX_FREE}:${userId}:${todayStr()}`;
  return !localStorage.getItem(key);
}

export function markFreeBoxUsed(userId: string): void {
  if (typeof window === "undefined") return;
  const key = `${KEY_BOX_FREE}:${userId}:${todayStr()}`;
  localStorage.setItem(key, "1");
}

// 사다리 대박 모드 하루 3회 관리
const KEY_LADDER_JACKPOT = "sslab_lucky_ladder_jackpot";

export function getLadderJackpotCount(userId: string): number {
  if (typeof window === "undefined") return 0;
  const key = `${KEY_LADDER_JACKPOT}:${userId}:${todayStr()}`;
  return parseInt(localStorage.getItem(key) || "0", 10);
}

export function incrementLadderJackpot(userId: string): void {
  if (typeof window === "undefined") return;
  const key = `${KEY_LADDER_JACKPOT}:${userId}:${todayStr()}`;
  localStorage.setItem(key, String(getLadderJackpotCount(userId) + 1));
}

// 룰렛 골드 하루 1회 관리
const KEY_ROULETTE_GOLD = "sslab_lucky_roulette_gold";

export function canUseRouletteGold(userId: string): boolean {
  if (typeof window === "undefined") return false;
  const key = `${KEY_ROULETTE_GOLD}:${userId}:${todayStr()}`;
  return !localStorage.getItem(key);
}

export function markRouletteGoldUsed(userId: string): void {
  if (typeof window === "undefined") return;
  const key = `${KEY_ROULETTE_GOLD}:${userId}:${todayStr()}`;
  localStorage.setItem(key, "1");
}
