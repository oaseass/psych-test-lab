// ── 관리자 데이터 타입 ──────────────────────────────────────────────

export type AdminDateRange = "today" | "yesterday" | "7d" | "30d" | "90d";

export type KpiMetric = {
  id: string;
  label: string;
  value: number;
  displayValue: string;
  changeRate: number;
  changeLabel: string;
  trend: "up" | "down" | "flat";
  description: string;
  unit?: string;
};

export type TimeSeriesPoint = {
  date: string;
  value: number;
  label?: string;
};

export type MultiSeriesPoint = {
  date: string;
  [key: string]: number | string;
};

export type AnalyticsEventType =
  | "page_view"
  | "session_start"
  | "content_impression"
  | "content_start"
  | "content_complete"
  | "result_view"
  | "result_share"
  | "signup"
  | "login"
  | "check_in"
  | "mission_complete"
  | "point_earn"
  | "point_spend"
  | "rank_up"
  | "badge_unlock"
  | "shop_purchase"
  | "lucky_play"
  | "lucky_win"
  | "lucky_lose"
  | "together_room_create"
  | "together_room_join"
  | "together_room_complete"
  | "invite_click"
  | "invite_signup"
  | "ad_impression"
  | "ad_click"
  | "affiliate_click"
  | "sponsor_inquiry"
  | "feedback_submit";

export type AnalyticsEvent = {
  id: string;
  type: AnalyticsEventType;
  userId?: string;
  contentId?: string;
  contentKind?: string;
  categorySlug?: string;
  route?: string;
  value?: number;
  meta?: Record<string, string | number | boolean>;
  createdAt: string;
};

export type ContentPerformance = {
  id: string;
  title: string;
  kind: string;
  category: string;
  route: string;
  qualityTier: "polished" | "normal" | "prototype" | "hidden";
  impressions: number;
  starts: number;
  completes: number;
  shares: number;
  signups: number;
  avgTimeSeconds: number;
  completionRate: number;
  shareRate: number;
  signupRate: number;
  revenueScore: number;
  viralScore: number;
  recommendation: "promote" | "keep" | "improve" | "hide";
  isHot: boolean;
  isNew: boolean;
  isFeatured: boolean;
};

export type RevenueEstimate = {
  pageViews: number;
  rpm: number;
  estimatedAdRevenue: number;
  sponsorRevenue: number;
  affiliateRevenue: number;
  customProductionRevenue: number;
  totalEstimatedRevenue: number;
};

export type RevenueBreakdown = {
  source: string;
  amount: number;
  share: number;
  color: string;
};

export type AdminAlert = {
  id: string;
  level: "info" | "warning" | "danger" | "success";
  title: string;
  message: string;
  actionLabel?: string;
  actionHref?: string;
};

export type AdminUser = {
  id: string;
  nickname: string;
  rankId: string;
  rankName: string;
  points: number;
  joinedAt: string;
  lastActiveAt: string;
  checkInDays: number;
  completedCount: number;
  togetherCount: number;
  luckyCount: number;
  inviteCount: number;
  status: "active" | "dormant" | "new";
};

export type LuckyGame = {
  id: string;
  name: string;
  emoji: string;
  plays: number;
  winRate: number;
  pointsIn: number;
  pointsOut: number;
  netPoints: number;
  enabled: boolean;
};

export type AdSlot = {
  id: string;
  name: string;
  location: string;
  device: "all" | "mobile" | "desktop";
  enabled: boolean;
  estimatedImpressions: number;
  rpm: number;
  estimatedRevenue: number;
  riskLevel: "low" | "medium" | "high";
  notes: string;
};

export type SponsorInquiry = {
  id: string;
  brand: string;
  contact: string;
  phone: string;
  email: string;
  product: string;
  budget: string;
  message: string;
  status: "new" | "reviewing" | "proposed" | "active" | "completed" | "rejected";
  submittedAt: string;
  notes: string;
};

export type AffiliateItem = {
  id: string;
  name: string;
  contentId: string;
  contentTitle: string;
  category: string;
  clicks: number;
  conversions: number;
  estimatedRevenue: number;
  status: "active" | "paused" | "draft";
};

export type EventItem = {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "active" | "ended";
  participants: number;
  completions: number;
  pointsAwarded: number;
  badgesAwarded: number;
  signupContribution: number;
  enabled: boolean;
};

export type BadgeItem = {
  id: string;
  name: string;
  emoji: string;
  condition: string;
  holders: number;
  rarity: "common" | "rare" | "epic" | "legendary";
  isLimited: boolean;
  isVisible: boolean;
};

export type ShopItemAdmin = {
  id: string;
  name: string;
  category: string;
  price: number;
  purchases: number;
  totalPointsSpent: number;
  isLimited: boolean;
  isActive: boolean;
};

export type ExperimentItem = {
  id: string;
  name: string;
  variantA: string;
  variantB: string;
  impressionsA: number;
  impressionsB: number;
  clickRateA: number;
  clickRateB: number;
  completionRateA: number;
  completionRateB: number;
  signupRateA: number;
  signupRateB: number;
  winner: "A" | "B" | "running" | "tie";
  status: "running" | "ended" | "draft";
};

export type MissionAdmin = {
  id: string;
  name: string;
  description: string;
  points: number;
  completionRate: number;
  totalCompletions: number;
  signupContribution: number;
  revisitContribution: number;
  enabled: boolean;
  type: "daily" | "weekly";
};

export type RankInfo = {
  id: string;
  name: string;
  icon: string;
  minPoints: number;
  maxPoints: number;
  memberCount: number;
  avgActivity: number;
  tier: string;
};

export type AdminSettings = {
  siteName: string;
  defaultRpm: number;
  adsEnabled: boolean;
  demoDataVisible: boolean;
  mainQualityThreshold: "polished" | "normal";
  signupBonusPoints: number;
  checkInPoints: number;
  dailyMissionBonus: number;
  luckyDailyLimit: number;
  luckyDailyMaxProfit: number;
  togetherAiDefault: boolean;
};

export type PointSummary = {
  totalEarned: number;
  totalSpent: number;
  todayEarned: number;
  todaySpent: number;
  netChange: number;
  inflationRisk: "safe" | "caution" | "danger";
  earnBySource: { source: string; amount: number; share: number }[];
  spendByReason: { reason: string; amount: number; share: number }[];
};

export type DashboardSummary = {
  dau: number;
  pageViews: number;
  avgPagesPerSession: number;
  avgSessionDuration: number;
  contentStarts: number;
  contentCompletionRate: number;
  resultShares: number;
  signups: number;
  checkIns: number;
  pointsEarned: number;
  luckyPlays: number;
  togetherRoomsCreated: number;
};
