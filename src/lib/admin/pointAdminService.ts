import type { PointSummary } from "./types";

export function getPointEconomySummary(): PointSummary {
  const totalEarned = 2840000;
  const totalSpent = 1120000;
  return {
    totalEarned,
    totalSpent,
    todayEarned: 84200,
    todaySpent: 31500,
    netChange: totalEarned - totalSpent,
    inflationRisk: (totalEarned / Math.max(totalSpent, 1)) > 4 ? "danger" : (totalEarned / Math.max(totalSpent, 1)) > 2.5 ? "caution" : "safe",
    earnBySource: [
      { source: "출석체크", amount: 680000, share: 23.9 },
      { source: "콘텐츠 완료", amount: 580000, share: 20.4 },
      { source: "미션", amount: 420000, share: 14.8 },
      { source: "회원가입 보너스", amount: 380000, share: 13.4 },
      { source: "럭키존 성공", amount: 340000, share: 12.0 },
      { source: "같이놀기", amount: 260000, share: 9.2 },
      { source: "초대 보상", amount: 180000, share: 6.3 },
    ],
    spendByReason: [
      { reason: "럭키존 베팅", amount: 560000, share: 50.0 },
      { reason: "포인트 상점", amount: 340000, share: 30.4 },
      { reason: "칭호 구매", amount: 120000, share: 10.7 },
      { reason: "부스터 구매", amount: 100000, share: 8.9 },
    ],
  };
}

export function getPointLogs() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("sslab_point_logs") ?? "[]").slice(0, 50);
  } catch { return []; }
}

export function getPointInflationRisk(): { level: "safe" | "caution" | "danger"; ratio: number; message: string } {
  const s = getPointEconomySummary();
  const ratio = s.totalEarned / Math.max(s.totalSpent, 1);
  if (ratio > 4) return { level: "danger", ratio, message: "포인트 공급이 소모의 4배 이상입니다. 소모 채널 확대가 필요합니다." };
  if (ratio > 2.5) return { level: "caution", ratio, message: "포인트 공급과 소모 비율이 높아지고 있습니다." };
  return { level: "safe", ratio, message: "포인트 경제가 안정적입니다." };
}

export function getPointSourceBreakdown() {
  return getPointEconomySummary().earnBySource;
}

export function getPointSinkBreakdown() {
  return getPointEconomySummary().spendByReason;
}
