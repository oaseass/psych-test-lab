import type { TestMeta, PlayableTest, TestCategory } from "@/types";
import { categories, getCategoryBySlug } from "@/data/categories";
import { curatedTests, getCuratedTest, curatedTestSlugs } from "@/data/curatedTests";
import { generatedTestMeta } from "@/data/generated/testMeta.generated";
import { generatePlayableTest } from "@/lib/test-engine/generatePlayableTest";
import { POLISHED_SLUGS } from "@/data/playableSlugs";

export { getRecommendations } from "@/lib/test-engine/recommendations";

// 큐레이션 테스트 메타 추출
const curatedMeta: TestMeta[] = curatedTests.map((t) => t.meta);

// 전체 테스트 메타 (큐레이션 + 생성, 중복 slug 제거)
const _allMeta: TestMeta[] = [
  ...curatedMeta,
  ...generatedTestMeta.filter((g) => !curatedTestSlugs.includes(g.slug)),
];

// 우선순위 정렬
const allTestMeta: TestMeta[] = _allMeta.sort((a, b) => a.priority - b.priority);

// slug → meta 맵
const metaBySlug = new Map<string, TestMeta>(allTestMeta.map((m) => [m.slug, m]));

// ==================
// 공개 API
// ==================

export function getAllTestMeta(): TestMeta[] {
  return allTestMeta;
}

export function getTestMeta(slug: string): TestMeta | undefined {
  return metaBySlug.get(slug);
}

export function getTestsByCategory(categorySlug: string): TestMeta[] {
  return allTestMeta.filter((m) => m.categorySlug === categorySlug);
}

export function getFeaturedTests(): TestMeta[] {
  return allTestMeta.filter((m) => m.isFeatured).slice(0, 10);
}

export function getNewTests(): TestMeta[] {
  return allTestMeta.filter((m) => m.isNew).slice(0, 8);
}

export function getPopularTests(limit = 20): TestMeta[] {
  return [...allTestMeta].sort((a, b) => b.viralScore - a.viralScore).slice(0, limit);
}

export function searchTests(query: string): TestMeta[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return allTestMeta.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.hook.toLowerCase().includes(q) ||
      m.tags.some((t) => t.toLowerCase().includes(q))
  );
}

// 플레이 가능한 테스트 반환 (큐레이션 우선, 없으면 생성)
// 항상 6문항으로 정규화 (빠른 테스트 구조)
export function getPlayableTest(slug: string): PlayableTest | null {
  const curated = getCuratedTest(slug);
  const raw: PlayableTest | null = curated ?? (() => {
    const meta = getTestMeta(slug);
    if (!meta) return null;
    return generatePlayableTest(meta);
  })();

  if (!raw) return null;

  if (raw.questions.length > 6) {
    return {
      ...raw,
      questions: raw.questions.slice(0, 6),
      meta: { ...raw.meta, questionCount: 6, estimatedMinutes: 1 },
    };
  }
  return {
    ...raw,
    meta: { ...raw.meta, questionCount: Math.min(raw.questions.length, 6), estimatedMinutes: 1 },
  };
}

// polished 테스트만 반환 (목록 노출용)
export function getPlayableTests(): TestMeta[] {
  return allTestMeta.filter((m) => POLISHED_SLUGS.has(m.slug));
}

// 활성 카테고리 반환 (playable 테스트가 있는 카테고리)
export function getActiveCategories(): TestCategory[] {
  const activeSlugs = new Set(getPlayableTests().map((m) => m.categorySlug));
  return categories.filter((c) => activeSlugs.has(c.slug));
}

// 활성 카테고리 슬러그 (generateStaticParams / sitemap용)
export function getActiveCategorySlugs(): string[] {
  return getActiveCategories().map((c) => c.slug);
}

// 공개 테스트 슬러그 (sitemap용)
export function getPublicTestSlugs(): string[] {
  return getPlayableTests().map((m) => m.slug);
}

export function getAllCategories(): TestCategory[] {
  return categories;
}

export function getCategory(slug: string): TestCategory | undefined {
  return getCategoryBySlug(slug);
}

// 슬러그 목록 (sitemap 생성용)
export function getAllTestSlugs(): string[] {
  return allTestMeta.map((m) => m.slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}

export { allTestMeta, categories };
