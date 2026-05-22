export type UserRole = "guest" | "member";

export type UserProfile = {
  id: string;
  role: UserRole;
  nickname: string;
  passwordHash?: string;
  points: number;
  rankId: string;
  rankName: string;
  rankIcon: string;
  createdAt: string;
  lastLoginAt?: string;
  lastCheckInAt?: string;
  checkInStreak: number;
  totalCheckInDays: number;
  playedCount: number;
  togetherPlayedCount: number;
};

export type PointReason =
  | "signup_bonus"
  | "daily_check_in"
  | "streak_bonus_3"
  | "streak_bonus_7"
  | "streak_bonus_14"
  | "streak_bonus_30"
  | "test_complete"
  | "short_test_complete"
  | "long_test_complete"
  | "worldcup_complete"
  | "balance_complete"
  | "initial_quiz_complete"
  | "nonsense_complete"
  | "memory_complete"
  | "reaction_complete"
  | "observation_complete"
  | "poll_vote"
  | "generator_use"
  | "together_join_complete"
  | "together_host_complete"
  | "friend_invite_complete";

export type PointLog = {
  id: string;
  userId: string;
  amount: number;
  reason: PointReason;
  label: string;
  createdAt: string;
};

export type RankTier =
  | "guest"
  | "soldier"
  | "nonCommissionedOfficer"
  | "warrantOfficer"
  | "officer"
  | "fieldOfficer"
  | "general"
  | "legend";

export type RankAnimationType =
  | "none"
  | "soft-pulse"
  | "shine"
  | "float"
  | "aura"
  | "legend-flame";

export type Rank = {
  id: string;
  name: string;
  shortName: string;
  icon: string;
  iconCount: number;
  minPoints: number;
  tier: RankTier;
  color: string;
  gradient: string;
  glowColor: string;
  description: string;
  rewardText: string;
  animationType: RankAnimationType;
};
