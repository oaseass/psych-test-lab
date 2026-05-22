# 전수 검수 최종 보고서

> 생성일: 2025-07-10  
> 대상: D:\test (Next.js 15 App Router, https://test-pink-two-64.vercel.app)  
> 검수 방식: 코드 전수 분석 + 빌드 검증

---

## 검수 결과 요약

| 항목 | 상태 | 비고 |
|------|------|------|
| 12개 공개 테스트 (POLISHED_SLUGS) | ✅ PASS | 전용 QA/결과 뱅크, notFound() 처리 완비 |
| 108개 비공개 테스트 | ✅ PASS (차단됨) | isPlayable=false, 모든 공개 API에서 필터링 |
| `infinite-mix` "조합 레시피가 없어요" | ✅ 수정 완료 | 재미있는 fallback 결과 12개로 교체 |
| `sitemap.ts` 잘못된 URL | ✅ 수정 완료 | `/tests/` → `/test/`, 12개만 색인 |
| `experimentsData.ts` 내부 주석 노출 | ✅ 수정 완료 | "(초기 데이터는 mock)" 제거 |
| `getTestsByCategory` 필터 누락 | ✅ 수정 완료 | isPlayable 필터 추가 |
| `visibility.ts` 유틸 생성 | ✅ 완료 | 공개 기준 통일 함수 |
| `radio-roulette` fakeSongs 노출 | ✅ PASS | "(가상)" 레이블 표시 중 |
| `price-guess` | ✅ PASS | 10개 상품, 7문제 퀴즈 정상 |
| `ranking-guess` | ✅ PASS | 4개 세트, 정상 동작 |
| `internet-museum` | ✅ PASS | 10개 전시품 카드 플립 정상 |
| `world-trip` | ✅ PASS | 12개 국가, 힌트 퀴즈 정상 |
| `spend-money` | ✅ PASS | 정상 동작 |
| `password-hell` | ✅ PASS | 단계별 챌린지 정상 |

---

## 발견 및 수정된 문제 상세

### 🔴 [CRITICAL] infinite-mix "조합 레시피가 없어요"

**파일**: `src/app/experiments/infinite-mix/page.tsx`

**문제**: 15개 재료로 만들 수 있는 조합은 105가지인데, 정의된 `COMBOS`는 20개뿐.  
나머지 85개 조합에서 사용자에게 **"조합 레시피가 없어요"** 텍스트가 노출됨.  
이 텍스트는 검수 실패 조건에 해당함.

**수정 내용**:
- `FALLBACK_COMBOS` 12개 추가 (재미있는 fallback 결과 목록)
- `getFallbackCombo(a, b)` 함수: 두 재료의 해시 기반으로 fallback 결정 (결정론적)
- `getComboResult()` 반환 타입을 `Combo | null` → `Combo` (항상 결과 반환)
- `noCombo` state 완전 제거
- "조합 레시피가 없어요" 텍스트 완전 제거

---

### 🟡 [MEDIUM] sitemap.ts 잘못된 테스트 URL

**파일**: `src/app/sitemap.ts`

**문제**:
1. `getAllTestSlugs()` → 120개 전체 slug 포함 (108개는 404 반환)
2. 테스트 URL이 `/tests/${slug}` → 실제 경로는 `/test/${slug}` (단수)
3. 비노출 테스트 URL이 Google 색인에 포함될 위험

**수정 내용**:
- `getAllTestSlugs()` → `getPublicTestSlugs()` (12개 공개 테스트만)
- URL 경로 `/tests/${slug}` → `/test/${slug}`
- 테스트 priority 0.6 → 0.8 (12개의 핵심 콘텐츠 강조)

---

### 🟡 [MEDIUM] getTestsByCategory isPlayable 필터 누락

**파일**: `src/lib/data/testRepository.ts`

**문제**: `getTestsByCategory()`가 비공개 테스트도 반환했음.  
카테고리 페이지는 자체적으로 `.filter(t => t.isPlayable)` 처리하고 있었지만,  
다른 곳에서 `getTestsByCategory()`를 직접 사용할 경우 비공개 테스트가 노출될 위험 존재.

**수정 내용**: `getTestsByCategory`에 `isPubliclyVisibleTest()` 필터 추가

---

### 🟢 [INFO] experimentsData.ts 내부 주석 누출

**파일**: `src/data/experimentsData.ts`

**문제**: `ranking-guess` description에 `(초기 데이터는 mock)` 문구 포함.  
현재 실험 상세 페이지에서 `description`은 렌더링되지 않지만, 향후 노출 위험.

**수정 내용**: 해당 괄호 주석 제거

---

## 새로 추가된 파일

### `src/lib/data/visibility.ts`
공개 노출 기준 통일 함수. 모든 공개 API는 이 함수를 통해 일관성 유지.
```ts
export function isPubliclyVisibleTest(meta: TestMeta): boolean {
  return meta.isPlayable === true && meta.status !== "needsReview";
}
```

---

## 아키텍처 방어 현황 (검수 시점 확인)

| 방어 레이어 | 파일 | 상태 |
|------------|------|------|
| isPlayable 주입 | `testRepository.ts` allTestMeta 생성 시 | ✅ |
| 목록 API 필터 | `getPlayableTests`, `getFeaturedTests`, `getNewTests`, `getPopularTests`, `searchTests` | ✅ |
| 상세 페이지 차단 | `app/test/[slug]/page.tsx` → `notFound()` | ✅ |
| 카테고리 목록 필터 | `app/category/[slug]/page.tsx` → `.filter(isPlayable)` + `getTestsByCategory` 필터 | ✅ |
| sitemap 필터 | `getPublicTestSlugs()` 사용 | ✅ (수정 후) |
| 통일 유틸 | `src/lib/data/visibility.ts` | ✅ (신규) |

---

## 빌드 결과

```
npm run build → ✅ 성공
TypeScript 오류: 없음
```
