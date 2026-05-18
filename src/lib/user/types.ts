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

export type Rank = {
  id: string;
  name: string;
  icon: string;
  minPoints: number;
  description: string;
};
