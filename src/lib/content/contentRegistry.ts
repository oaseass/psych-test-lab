// ================================================
// 통합 콘텐츠 레지스트리
// 모든 콘텐츠를 ContentItem[]으로 통합해서 관리
// ================================================

import type { ContentItem, ContentKind } from "./types";
import { getAllTestMeta } from "@/lib/data/testRepository";
import { worldcupList } from "@/data/games/worldcupData";
import { balanceGameList } from "@/data/games/balanceData";
import { initialQuizList } from "@/data/games/initialQuizData";
import { nonsenseSets } from "@/data/games/nonsenseData";
import { spotSceneList } from "@/data/games/spotDifferenceData";
import { pollList } from "@/data/pollsData";
import { generatorList } from "@/data/generatorData";
import { experimentsList } from "@/data/experimentsData";
import { storyList } from "@/data/storyData";
import { bingoList } from "@/data/bingoData";
import { gaugeList } from "@/data/gaugeData";
import { LUCKY_GAMES } from "@/data/luckyGames";

// ── 심리테스트 ────────────────────────────────────
function buildTestItems(): ContentItem[] {
  const tests = getAllTestMeta();
  return tests.map((t) => ({
    id: `test-${t.id}`,
    slug: t.slug,
    title: t.title,
    subtitle: t.hook,
    description: t.description,
    kind: "psych-test" as ContentKind,
    mainCategorySlug: "tests",
    subCategorySlug: t.categorySlug,
    route: `/tests/${t.slug}`,
    icon: "🧠",
    emoji: "🧠",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899, #F9A8D4)",
    estimatedMinutes: t.estimatedMinutes,
    difficulty: "normal" as const,
    playMode: "solo" as const,
    tags: t.tags,
    isFeatured: t.isFeatured,
    isNew: t.isNew,
    isHot: t.adFriendlyScore >= 70 || t.viralScore >= 70,
    qualityTier: t.status === "curated" ? "polished" : t.status === "generated" ? "normal" : "prototype",
    priority: t.priority,
    adFriendlyScore: t.adFriendlyScore,
    viralScore: t.viralScore,
  }));
}

// ── 월드컵 ────────────────────────────────────────
function buildWorldcupItems(): ContentItem[] {
  return worldcupList.map((w) => ({
    id: `worldcup-${w.id}`,
    slug: w.slug,
    title: w.title,
    subtitle: w.description,
    description: w.description,
    kind: "worldcup" as ContentKind,
    mainCategorySlug: "choices",
    route: `/games/worldcup/${w.slug}`,
    icon: "🏆",
    emoji: w.emoji,
    color: w.color,
    gradient: `linear-gradient(135deg, ${w.color}, ${w.bgColor})`,
    estimatedMinutes: 5,
    difficulty: "easy" as const,
    playMode: "solo" as const,
    tags: w.tags,
    isFeatured: w.isFeatured ?? false,
    isNew: w.isNew ?? false,
    isHot: (w.playCount ?? 0) >= 30000,
    qualityTier: "polished" as const,
    priority: w.isFeatured ? 10 : 50,
    adFriendlyScore: 75,
    viralScore: 80,
  }));
}

// ── 밸런스게임 ────────────────────────────────────
function buildBalanceItems(): ContentItem[] {
  return balanceGameList.map((b) => ({
    id: `balance-${b.id}`,
    slug: b.slug,
    title: b.title,
    subtitle: b.description,
    description: b.description,
    kind: "balance" as ContentKind,
    mainCategorySlug: "choices",
    route: `/games/balance/${b.slug}`,
    icon: "⚖️",
    emoji: b.emoji,
    color: b.color,
    gradient: `linear-gradient(135deg, ${b.color}, ${b.bgColor})`,
    estimatedMinutes: 3,
    difficulty: "easy" as const,
    playMode: "solo" as const,
    tags: b.tags ?? [],
    isFeatured: b.isFeatured ?? false,
    isNew: b.isNew ?? false,
    isHot: false,
    qualityTier: "polished" as const,
    priority: b.isFeatured ? 15 : 55,
    adFriendlyScore: 70,
    viralScore: 75,
  }));
}

// ── 초성퀴즈 ──────────────────────────────────────
function buildInitialQuizItems(): ContentItem[] {
  return initialQuizList.map((q) => ({
    id: `initial-quiz-${q.id}`,
    slug: q.slug,
    title: q.title,
    subtitle: q.description,
    description: q.description,
    kind: "initial-quiz" as ContentKind,
    mainCategorySlug: "quizzes",
    route: `/games/initial-quiz/${q.slug}`,
    icon: "🔤",
    emoji: q.emoji,
    color: q.color,
    gradient: `linear-gradient(135deg, ${q.color}, ${q.bgColor})`,
    estimatedMinutes: 3,
    difficulty: "normal" as const,
    playMode: "solo" as const,
    tags: q.tags ?? [],
    isFeatured: q.isFeatured ?? false,
    isNew: q.isNew ?? false,
    isHot: false,
    qualityTier: "polished" as const,
    priority: q.isFeatured ? 20 : 60,
    adFriendlyScore: 65,
    viralScore: 70,
  }));
}

// ── 넌센스 퀴즈 ───────────────────────────────────
function buildNonsenseItems(): ContentItem[] {
  return nonsenseSets.map((n) => ({
    id: `nonsense-${n.id}`,
    slug: n.slug,
    title: n.title,
    subtitle: n.description,
    description: n.description,
    kind: "nonsense-quiz" as ContentKind,
    mainCategorySlug: "quizzes",
    route: `/games/nonsense/${n.slug}`,
    icon: "🤣",
    emoji: n.emoji,
    color: n.color,
    gradient: `linear-gradient(135deg, ${n.color}, ${n.bgColor})`,
    estimatedMinutes: 2,
    difficulty: "easy" as const,
    playMode: "solo" as const,
    tags: n.tags ?? [],
    isFeatured: n.isFeatured ?? false,
    isNew: false,
    isHot: false,
    qualityTier: "normal" as const,
    priority: 70,
    adFriendlyScore: 60,
    viralScore: 65,
  }));
}

// ── 틀린그림 찾기 ─────────────────────────────────
function buildSpotDiffItems(): ContentItem[] {
  return spotSceneList.map((s) => ({
    id: `spot-${s.id}`,
    slug: s.slug,
    title: s.title,
    subtitle: s.subtitle,
    description: `${s.title} — ${s.subtitle}`,
    kind: "spot-difference" as ContentKind,
    mainCategorySlug: "brain",
    route: `/games/spot-difference/${s.slug}`,
    icon: "🔍",
    emoji: s.emoji,
    color: s.color,
    gradient: `linear-gradient(135deg, ${s.color}, ${s.bgColor})`,
    estimatedMinutes: s.timeLimit / 60,
    difficulty: s.difficulty as "easy" | "normal" | "hard",
    playMode: "solo" as const,
    tags: ["관찰력", "집중력"],
    isFeatured: ["cafe-table", "cat-room", "dog-walk"].includes(s.slug),
    isNew: true,
    isHot: false,
    qualityTier: "polished" as const,
    priority: 30,
    adFriendlyScore: 60,
    viralScore: 55,
  }));
}

// ── 투표 ──────────────────────────────────────────
function buildPollItems(): ContentItem[] {
  return pollList.map((p) => ({
    id: `poll-${p.id}`,
    slug: p.slug,
    title: p.question,
    subtitle: p.description ?? p.question,
    description: p.description ?? p.question,
    kind: "poll" as ContentKind,
    mainCategorySlug: "community",
    subCategorySlug: p.category,
    route: `/polls/${p.slug}`,
    icon: "🗳️",
    emoji: p.emoji,
    color: p.color,
    gradient: `linear-gradient(135deg, ${p.color}, ${p.bgColor})`,
    estimatedMinutes: 1,
    difficulty: "easy" as const,
    playMode: "solo" as const,
    tags: p.tags ?? [],
    isFeatured: false,
    isNew: p.isNew ?? false,
    isHot: p.isHot ?? false,
    qualityTier: "normal" as const,
    priority: p.isHot ? 25 : 75,
    adFriendlyScore: 55,
    viralScore: 60,
  }));
}

// ── 생성기 ────────────────────────────────────────
function buildGeneratorItems(): ContentItem[] {
  return generatorList.map((g) => ({
    id: `gen-${g.id}`,
    slug: g.slug,
    title: g.title,
    subtitle: g.description,
    description: g.description,
    kind: "generator" as ContentKind,
    mainCategorySlug: "generators",
    route: `/generator/${g.slug}`,
    icon: "✨",
    emoji: "✨",
    color: "#0891B2",
    gradient: "linear-gradient(135deg, #0891B2, #22D3EE)",
    estimatedMinutes: 2,
    difficulty: "easy" as const,
    playMode: "random" as const,
    tags: g.tags ?? [],
    isFeatured: false,
    isNew: g.isNew ?? false,
    isHot: false,
    qualityTier: "normal" as const,
    priority: 80,
    adFriendlyScore: 50,
    viralScore: 65,
  }));
}

// ── 웹실험 ────────────────────────────────────────
function buildExperimentItems(): ContentItem[] {
  return experimentsList.map((e) => ({
    id: e.id,
    slug: e.slug,
    title: e.title,
    subtitle: e.subtitle,
    description: e.description,
    kind: "experiment" as ContentKind,
    mainCategorySlug: "experiments",
    route: `/experiments/${e.slug}`,
    icon: "⚗️",
    emoji: e.emoji,
    color: e.color,
    gradient: e.gradient,
    estimatedMinutes: e.estimatedMinutes,
    difficulty: "normal" as const,
    playMode: "solo" as const,
    tags: e.tags,
    isFeatured: e.isFeatured,
    isNew: e.isNew,
    isHot: e.isHot,
    qualityTier: e.qualityTier,
    priority: e.isFeatured ? 20 : 50,
    adFriendlyScore: 75,
    viralScore: 85,
  }));
}

// ── 스토리 ────────────────────────────────────────
function buildStoryItems(): ContentItem[] {
  return storyList.map((s) => ({
    id: s.id,
    slug: s.slug,
    title: s.title,
    subtitle: s.subtitle,
    description: s.description,
    kind: "story" as ContentKind,
    mainCategorySlug: "experiments",
    route: `/story/${s.slug}`,
    icon: "📖",
    emoji: s.emoji,
    color: s.color,
    gradient: `linear-gradient(135deg, ${s.color}, ${s.bgColor})`,
    estimatedMinutes: 5,
    difficulty: "easy" as const,
    playMode: "solo" as const,
    tags: s.tags,
    isFeatured: false,
    isNew: false,
    isHot: s.isHot ?? false,
    qualityTier: "normal" as const,
    priority: 45,
    adFriendlyScore: 65,
    viralScore: 70,
  }));
}

// ── 빙고 ──────────────────────────────────────────
function buildBingoItems(): ContentItem[] {
  return bingoList.map((b) => ({
    id: b.id,
    slug: b.slug,
    title: b.title,
    subtitle: b.subtitle,
    description: b.description,
    kind: "bingo" as ContentKind,
    mainCategorySlug: "experiments",
    route: `/bingo/${b.slug}`,
    icon: "🎯",
    emoji: b.emoji,
    color: b.color,
    gradient: `linear-gradient(135deg, ${b.color}, ${b.bgColor})`,
    estimatedMinutes: 3,
    difficulty: "easy" as const,
    playMode: "solo" as const,
    tags: b.tags,
    isFeatured: false,
    isNew: b.isNew ?? false,
    isHot: b.isHot ?? false,
    qualityTier: "normal" as const,
    priority: 50,
    adFriendlyScore: 60,
    viralScore: 70,
  }));
}

// ── 가짜 측정기 ───────────────────────────────────
function buildGaugeItems(): ContentItem[] {
  return gaugeList.map((g) => ({
    id: g.id,
    slug: g.slug,
    title: g.title,
    subtitle: g.subtitle,
    description: g.description,
    kind: "gauge" as ContentKind,
    mainCategorySlug: "tests",
    route: `/gauge/${g.slug}`,
    icon: "📊",
    emoji: g.emoji,
    color: g.color,
    gradient: `linear-gradient(135deg, ${g.color}, ${g.bgColor})`,
    estimatedMinutes: 3,
    difficulty: "easy" as const,
    playMode: "solo" as const,
    tags: g.tags,
    isFeatured: false,
    isNew: g.isNew ?? false,
    isHot: g.isHot ?? false,
    qualityTier: "normal" as const,
    priority: 60,
    adFriendlyScore: 65,
    viralScore: 75,
  }));
}

// ── 럭키존 ────────────────────────────────────
function buildLuckyItems(): ContentItem[] {
  return LUCKY_GAMES.map((g) => ({
    id: `lucky-${g.gameType}`,
    slug: g.route,
    title: g.title,
    subtitle: g.description,
    description: g.description,
    kind: "lucky-game" as ContentKind,
    mainCategorySlug: "lucky",
    route: g.route,
    icon: g.icon,
    emoji: g.icon,
    color: g.color,
    gradient: `linear-gradient(135deg, ${g.color}, ${g.bgColor})`,
    estimatedMinutes: Math.round(g.estimatedSeconds / 60) || 1,
    difficulty: "easy" as const,
    playMode: "solo" as const,
    tags: ["lucky", "point-game", "member-only"],
    isFeatured: false,
    isNew: true,
    isHot: false,
    qualityTier: "normal" as const,
    priority: 70,
    adFriendlyScore: 50,
    viralScore: 60,
  }));
}

// ── 메인 레지스트리 빌드 ─────────────────────────
let _registry: ContentItem[] | null = null;

function getRegistry(): ContentItem[] {
  if (_registry) return _registry;
  _registry = [
    ...buildTestItems(),
    ...buildWorldcupItems(),
    ...buildBalanceItems(),
    ...buildInitialQuizItems(),
    ...buildNonsenseItems(),
    ...buildSpotDiffItems(),
    ...buildPollItems(),
    ...buildGeneratorItems(),
    ...buildExperimentItems(),
    ...buildStoryItems(),
    ...buildBingoItems(),
    ...buildGaugeItems(),
    ...buildLuckyItems(),
  ];
  return _registry;
}

// ══════════════════════════════════════════════════
// 공개 API
// ══════════════════════════════════════════════════

export function getAllContent(): ContentItem[] {
  return getRegistry();
}

export function getContentByCategory(categorySlug: string): ContentItem[] {
  return getRegistry().filter((c) => c.mainCategorySlug === categorySlug);
}

export function getContentByKind(kind: ContentKind): ContentItem[] {
  return getRegistry().filter((c) => c.kind === kind);
}

export function getFeaturedContent(limit = 12): ContentItem[] {
  return getRegistry()
    .filter((c) => c.isFeatured && c.qualityTier !== "hidden" && c.qualityTier !== "prototype")
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}

export function getHotContent(limit = 10): ContentItem[] {
  return getRegistry()
    .filter((c) => c.isHot && c.qualityTier !== "hidden" && c.qualityTier !== "prototype")
    .sort((a, b) => b.viralScore - a.viralScore)
    .slice(0, limit);
}

export function getNewContent(limit = 10): ContentItem[] {
  return getRegistry()
    .filter((c) => c.isNew && c.qualityTier !== "hidden")
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}

export function getDailyContent(limit = 6): ContentItem[] {
  // 날짜 기반 시드로 하루에 같은 내용이 나오게
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const polished = getRegistry().filter(
    (c) => (c.qualityTier === "polished" || c.isHot || c.isFeatured)
  );
  const shuffled = [...polished].sort((a, b) => {
    const hashA = ((seed * 31 + a.id.charCodeAt(0)) % 997);
    const hashB = ((seed * 31 + b.id.charCodeAt(0)) % 997);
    return hashA - hashB;
  });
  return shuffled.slice(0, limit);
}

export function getRandomContent(
  exclude: string[] = [],
  limit = 1
): ContentItem[] {
  const eligible = getRegistry().filter(
    (c) =>
      !exclude.includes(c.id) &&
      c.qualityTier !== "hidden" &&
      c.qualityTier !== "prototype"
  );
  const shuffled = [...eligible].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, limit);
}

export function searchContent(query: string): ContentItem[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return getRegistry().filter(
    (c) =>
      c.qualityTier !== "hidden" &&
      (c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)))
  );
}

export function getRecommendedContent(
  currentContentId: string,
  options: { limit?: number; sameCategory?: boolean } = {}
): ContentItem[] {
  const { limit = 3, sameCategory = true } = options;
  const current = getRegistry().find((c) => c.id === currentContentId);
  if (!current) return getRandomContent([], limit);

  const candidates = getRegistry().filter(
    (c) =>
      c.id !== currentContentId &&
      c.qualityTier !== "hidden" &&
      c.qualityTier !== "prototype"
  );

  const scored = candidates.map((c) => {
    let score = 0;
    if (sameCategory && c.mainCategorySlug === current.mainCategorySlug) score += 30;
    const sharedTags = c.tags.filter((t) => current.tags.includes(t)).length;
    score += sharedTags * 10;
    if (c.qualityTier === "polished") score += 20;
    if (c.isHot) score += 15;
    if (c.isFeatured) score += 10;
    score += Math.random() * 15; // 랜덤성
    return { item: c, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.item);
}

export function getPolishedContent(limit = 20): ContentItem[] {
  return getRegistry()
    .filter((c) => c.qualityTier === "polished" || (c.qualityTier === "normal" && c.isFeatured))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}
