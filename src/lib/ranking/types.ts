// ================================================
// 랭킹 시스템 타입 정의
// ================================================

export type RankingType =
  | "time"
  | "score"
  | "result_distribution"
  | "choice_distribution"
  | "worldcup_winner"
  | "lucky_points"
  | "lucky_streak"
  | "together_host"
  | "invite"
  | "rank_points"
  | "badge_count";

export type RankingPeriod = "today" | "weekly" | "monthly" | "all";

export type RankingSort = "asc" | "desc";

export type RankingConfig = {
  enabled: boolean;
  type: RankingType;
  label: string;
  description: string;
  primaryMetric: string;
  secondaryMetric?: string;
  sort: RankingSort;
  periods: RankingPeriod[];
  showUserRank: boolean;
};

export type RankingEntry = {
  id: string;
  rank: number;
  userId?: string;
  nickname?: string;
  rankIcon?: string;
  rankName?: string;
  title: string;
  value: number;
  displayValue: string;
  subValue?: string;
  contentId?: string;
  contentTitle?: string;
  createdAt: string;
};

export type ContentStatsEntry = {
  id: string;
  label: string;
  count: number;
  percentage: number;
  trend?: "up" | "down" | "flat";
};

export type RankingSubmitInput = {
  userId: string;
  contentId: string;
  rankingType: RankingType;
  score?: number;
  clearTimeMs?: number;
  correctCount?: number;
  wrongCount?: number;
  resultTypeId?: string;
  choiceId?: string;
  worldcupWinnerId?: string;
  luckyNetPoints?: number;
  luckyStreak?: number;
  togetherHostCount?: number;
  inviteCount?: number;
};

export type StoredRankingRecord = RankingSubmitInput & {
  id: string;
  createdAt: string;
};

export type RankingTabConfig = {
  key: string;
  label: string;
  icon: string;
  rankingType?: RankingType;
};
