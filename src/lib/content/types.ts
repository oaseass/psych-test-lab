// ================================================
// 통합 콘텐츠 타입 정의
// ================================================

import type { RankingConfig } from "@/lib/ranking/types";

export type ContentKind =
  | "psych-test"
  | "iq-test"
  | "eq-test"
  | "mbti-like"
  | "blood-type"
  | "worldcup"
  | "balance"
  | "initial-quiz"
  | "nonsense-quiz"
  | "spot-difference"
  | "memory"
  | "reaction"
  | "observation"
  | "poll"
  | "generator"
  | "together"
  | "experiment"
  | "explore"
  | "story"
  | "gauge"
  | "ranking-guess"
  | "bingo"
  | "lucky-game"
  | "daily";

export type QualityTier = "polished" | "normal" | "prototype" | "hidden";

export type ContentItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  kind: ContentKind;
  mainCategorySlug: string;
  subCategorySlug?: string;
  route: string;
  icon: string;
  emoji?: string;
  color: string;
  gradient: string;
  estimatedMinutes: number;
  difficulty: "easy" | "normal" | "hard";
  playMode: "solo" | "together" | "daily" | "random";
  tags: string[];
  isFeatured: boolean;
  isNew: boolean;
  isHot: boolean;
  qualityTier: QualityTier;
  priority: number;
  adFriendlyScore: number;
  viralScore: number;
  rankingConfig?: RankingConfig;
};
