// ================================================
// 럭키존 타입 정의
// ================================================

export type LuckyGameType =
  | "ladder"
  | "rock-paper-scissors"
  | "odd-even"
  | "ox"
  | "roulette"
  | "bomb"
  | "box";

export type LuckyResult = {
  id: string;
  userId: string;
  gameType: LuckyGameType;
  stakePoints: number;   // 사용한 포인트
  rewardPoints: number;  // 획득한 포인트 (실패 시 0)
  netPoints: number;     // 순증감 (rewardPoints - stakePoints)
  isWin: boolean;
  multiplier: number;    // 배수 (실패 시 0)
  detail: string;        // 결과 설명
  createdAt: string;
};

export type LuckyGameConfig = {
  gameType: LuckyGameType;
  title: string;
  description: string;
  minRankId: string;     // 해금 최소 rankId
  minRankName: string;   // 표시용 계급명
  minStake: number;
  maxStake: number;
  possibleMultipliers: number[];
  estimatedSeconds: number;
  icon: string;
  color: string;
  bgColor: string;
  route: string;
};

// 럭키존 하루 집계
export type LuckyDailyStats = {
  date: string;        // yyyy-mm-dd
  totalSpend: number;  // 오늘 사용 포인트 합계
  totalProfit: number; // 오늘 획득 포인트 합계
  playCount: number;
};
