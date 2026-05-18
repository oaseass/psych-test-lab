// ============================
// 심리테스트 연구소 타입 정의
// ============================

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
