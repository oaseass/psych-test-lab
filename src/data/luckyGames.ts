// ================================================
// 럭키존 게임 설정 데이터
// ================================================

import type { LuckyGameConfig } from "@/lib/lucky/types";

export const LUCKY_GAMES: LuckyGameConfig[] = [
  {
    gameType: "rock-paper-scissors",
    title: "가위바위보",
    description: "AI와 가위바위보 대결! 이기면 2배, 비기면 포인트 반환",
    minRankId: "private2",
    minRankName: "이등병",
    minStake: 10,
    maxStake: 500,
    possibleMultipliers: [0, 1, 2],
    estimatedSeconds: 10,
    icon: "✊",
    color: "#7C3AED",
    bgColor: "#EDE9FE",
    route: "/lucky/rock-paper-scissors",
  },
  {
    gameType: "odd-even",
    title: "홀짝",
    description: "1~100 사이 숫자가 홀수인지 짝수인지 맞히면 2배!",
    minRankId: "private2",
    minRankName: "이등병",
    minStake: 10,
    maxStake: 500,
    possibleMultipliers: [0, 2],
    estimatedSeconds: 8,
    icon: "🎲",
    color: "#2563EB",
    bgColor: "#DBEAFE",
    route: "/lucky/odd-even",
  },
  {
    gameType: "ox",
    title: "OX 운빨퀴즈",
    description: "O 또는 X, 맞히면 2배! 상식과 운빨을 섞은 퀴즈",
    minRankId: "private2",
    minRankName: "이등병",
    minStake: 10,
    maxStake: 500,
    possibleMultipliers: [0, 2],
    estimatedSeconds: 15,
    icon: "⭕",
    color: "#059669",
    bgColor: "#D1FAE5",
    route: "/lucky/ox",
  },
  {
    gameType: "ladder",
    title: "사다리 타기",
    description: "출발점을 골라 사다리를 타자! 성공 확률별 2~5배 보상",
    minRankId: "private1",
    minRankName: "일병",
    minStake: 10,
    maxStake: 500,
    possibleMultipliers: [0, 2, 3, 5],
    estimatedSeconds: 15,
    icon: "🪜",
    color: "#EA580C",
    bgColor: "#FEF3C7",
    route: "/lucky/ladder",
  },
  {
    gameType: "roulette",
    title: "행운 룰렛",
    description: "색상을 골라 룰렛을 돌려라! 골드에 맞으면 10배 대박",
    minRankId: "corporal",
    minRankName: "상병",
    minStake: 10,
    maxStake: 500,
    possibleMultipliers: [0, 2, 4, 10],
    estimatedSeconds: 12,
    icon: "🎡",
    color: "#D97706",
    bgColor: "#FEF3C7",
    route: "/lucky/roulette",
  },
  {
    gameType: "box",
    title: "보물상자",
    description: "상자 5개 중 하나 선택! 하루 무료 1회 포함",
    minRankId: "sergeant",
    minRankName: "병장",
    minStake: 10,
    maxStake: 500,
    possibleMultipliers: [0, 0.5, 1, 2, 5],
    estimatedSeconds: 10,
    icon: "📦",
    color: "#B45309",
    bgColor: "#FEF9C3",
    route: "/lucky/box",
  },
  {
    gameType: "bomb",
    title: "폭탄 피하기",
    description: "3×3 칸에서 폭탄을 피하면 누적 보상! 멈출 때를 알아야 해",
    minRankId: "staff_sgt",
    minRankName: "하사",
    minStake: 10,
    maxStake: 500,
    possibleMultipliers: [0, 1.2, 1.5, 2, 3, 5],
    estimatedSeconds: 30,
    icon: "💣",
    color: "#DC2626",
    bgColor: "#FEE2E2",
    route: "/lucky/bomb",
  },
];

export function getLuckyGameConfig(gameType: string): LuckyGameConfig | undefined {
  return LUCKY_GAMES.find((g) => g.gameType === gameType);
}

// 계급별 해금 게임 목록 (rankId 순서 기준)
const RANK_ORDER = ["private2", "private1", "corporal", "sergeant", "staff_sgt"];

export function getRankIndex(rankId: string): number {
  const idx = RANK_ORDER.indexOf(rankId);
  return idx === -1 ? RANK_ORDER.length : idx;
}

export function isGameUnlocked(gameType: string, rankId: string): boolean {
  const config = getLuckyGameConfig(gameType);
  if (!config) return false;
  return getRankIndex(rankId) >= getRankIndex(config.minRankId);
}
