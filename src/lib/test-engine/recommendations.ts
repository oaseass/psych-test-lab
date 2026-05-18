import type { TestMeta } from "@/types";

// 테스트 결과를 기반으로 다음 추천 테스트 반환

interface RecommendationOptions {
  currentSlug: string;
  resultTypeId?: string;
  categorySlug?: string;
  playedSlugs?: string[];
  allTests: TestMeta[];
}

export function getRecommendations(options: RecommendationOptions): TestMeta[] {
  const { currentSlug, categorySlug, playedSlugs = [], allTests } = options;

  const notCurrent = allTests.filter((t) => t.slug !== currentSlug && t.status !== "needsReview");

  // 같은 카테고리 우선 (안 해본 것)
  const sameCat = notCurrent
    .filter((t) => t.categorySlug === categorySlug && !playedSlugs.includes(t.slug))
    .sort((a, b) => a.priority - b.priority);

  // 다른 카테고리 (안 해본 것, 높은 바이럴 스코어 우선)
  const otherCat = notCurrent
    .filter((t) => t.categorySlug !== categorySlug && !playedSlugs.includes(t.slug))
    .sort((a, b) => b.viralScore - a.viralScore);

  // 이미 한 것들 (바이럴 스코어 순)
  const alreadyPlayed = notCurrent
    .filter((t) => playedSlugs.includes(t.slug))
    .sort((a, b) => b.viralScore - a.viralScore);

  // 3개 추천: 같은 카테고리 1개 + 다른 카테고리 2개 (없으면 이미 한 것으로 채움)
  const result: TestMeta[] = [];

  if (sameCat.length > 0) result.push(sameCat[0]);
  const remaining = [...otherCat, ...alreadyPlayed].filter(
    (t) => !result.find((r) => r.slug === t.slug)
  );
  result.push(...remaining.slice(0, 3 - result.length));

  return result.slice(0, 3);
}

export function getPopularTests(allTests: TestMeta[], limit = 10): TestMeta[] {
  return [...allTests]
    .filter((t) => t.status !== "needsReview")
    .sort((a, b) => b.viralScore - a.viralScore)
    .slice(0, limit);
}

export function getFeaturedTests(allTests: TestMeta[]): TestMeta[] {
  return allTests
    .filter((t) => t.isFeatured && t.status !== "needsReview")
    .sort((a, b) => a.priority - b.priority);
}

export function getNewTests(allTests: TestMeta[], limit = 6): TestMeta[] {
  return allTests
    .filter((t) => t.isNew && t.status !== "needsReview")
    .sort((a, b) => a.priority - b.priority)
    .slice(0, limit);
}
