/**
 * visibility.ts
 * 테스트 공개 노출 기준을 통일하는 유틸리티
 * 모든 목록/검색/추천/sitemap/카테고리 함수는 이 함수를 사용해야 합니다.
 */

import type { TestMeta } from "@/types";

/**
 * 사용자에게 공개적으로 노출 가능한 테스트인지 판단합니다.
 *
 * 노출 가능 조건:
 * - isPlayable === true (POLISHED_SLUGS 등록됨)
 * - status가 needsReview 가 아님
 */
export function isPubliclyVisibleTest(meta: TestMeta): boolean {
  return meta.isPlayable === true && meta.status !== "needsReview";
}
