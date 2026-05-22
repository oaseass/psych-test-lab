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

  // 플레이 가능한 테스트만 대상
  const candidates = allTests.filter(
    (t) => t.slug !== currentSlug && t.isPlayable && t.status !== "needsReview"
  );

  // 현재 카테고리에서 플레이한 횟수 계산 (카테고리 선호도 판단)
  const sameCatPlayedCount = playedSlugs.filter((s) => {
    const t = allTests.find((m) => m.slug === s);
    return t?.categorySlug === categorySlug;
  }).length;
  const preferSameCategory = sameCatPlayedCount >= 2;

  // 같은 카테고리 (안 해본 것, 우선순위 기준)
  const sameCat = candidates
    .filter((t) => t.categorySlug === categorySlug && !playedSlugs.includes(t.slug))
    .sort((a, b) => a.priority - b.priority);

  // 다른 카테고리 (안 해본 것, 바이럴 스코어 우선)
  const otherCat = candidates
    .filter((t) => t.categorySlug !== categorySlug && !playedSlugs.includes(t.slug))
    .sort((a, b) => b.viralScore - a.viralScore);

  // 이미 한 것들 (바이럴 스코어 순)
  const alreadyPlayed = candidates
    .filter((t) => playedSlugs.includes(t.slug))
    .sort((a, b) => b.viralScore - a.viralScore);

  const result: TestMeta[] = [];

  if (preferSameCategory) {
    // 같은 카테고리 2개 + 다른 카테고리 4개
    result.push(...sameCat.slice(0, 2));
  } else {
    // 같은 카테고리 1개 + 다른 카테고리 5개
    if (sameCat.length > 0) result.push(sameCat[0]);
  }

  const pool = [...otherCat, ...alreadyPlayed].filter(
    (t) => !result.find((r) => r.slug === t.slug)
  );
  result.push(...pool.slice(0, 6 - result.length));

  return result.slice(0, 6);
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
