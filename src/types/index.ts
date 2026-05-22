// ============================
// 심심풀이 연구소 타입 정의
// ============================

export type TestFormat =
  | "short-choice"
  | "long-choice"
  | "image-choice"
  | "color-choice"
  | "illusion"
  | "first-impression"
  | "balance"
  | "card-pick"
  | "situation"
  | "ranking"
  | "iq-puzzle"
  | "eq-scenario"
  | "mbti-axis"
  | "blood-type"
  | "enneagram"
  | "big5-lite"
  | "memory"
  | "observation"
  | "reaction"
  | "logic"
  | "compatibility"
  | "worldcup"
  | "checklist"
  | "generator";

export type VisualStyle =
  | "gradient"
  | "abstract"
  | "card"
  | "color"
  | "shape"
  | "illusion"
  | "emoji";

export type TestCategory = {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  icon: string;
};

export type TestMeta = {
  id: string;
  slug: string;
  title: string;
  categorySlug: string;
  hook: string;
  description: string;
  target: string;
  estimatedMinutes: number;
  questionCount: number;
  resultCount: number;
  adFriendlyScore: number;
  viralScore: number;
  priority: number;
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  status: "curated" | "generated" | "needsReview";
  testFormat?: TestFormat;
  visualStyle?: VisualStyle;
  minQuestionCount?: number;
  maxQuestionCount?: number;
  // 플레이 가능 여부 (전수검수 기준)
  isPlayable?: boolean;
  qualityTier?: "polished" | "normal" | "prototype" | "hidden";
  auditStatus?: "pass" | "fail" | "needsReview";
  auditReason?: string;
};

export type TestQuestion = {
  id: string;
  text: string;
  options: {
    id: string;
    text: string;
    scores: Record<string, number>;
  }[];
};

export type TestResult = {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  keywords: string[];
  strengths: string[];
  weaknesses: string[];
  relationship: string;
  money: string;
  work: string;
  social: string;
  caution: string;
  matchingTypes: string[];
  oppositeTypes: string[];
  shareText: string;
};

export type PlayableTest = {
  meta: TestMeta;
  questions: TestQuestion[];
  results: TestResult[];
};

export type UserAnswer = {
  questionId: string;
  optionId: string;
};

export type TestPlayResult = {
  resultId: string;
  testSlug: string;
  resultTypeId: string;
  scoreMap: Record<string, number>;
  answers: UserAnswer[];
  createdAt: string;
};

export type SortOption = "popular" | "latest" | "shared" | "short" | "priority";

export type SearchResult = {
  test: TestMeta;
  score: number;
};
