// TOP 12 polished 테스트 슬러그 목록 (audit pass 기준)
// 이 목록에 있는 테스트만 /tests, 메인, 추천에서 노출됩니다.
// audit:tests 실패 슬러그는 제거되었습니다. (카테고리 템플릿 미등록 → 결과 라벨 A형~H형)
//
// 제거된 슬러그 (재등록 조건: generatePlayableTest에 카테고리 템플릿 추가 후 audit 통과):
//   chingu-jinjja-imiji, dantok-yeok-hal (chingu 카테고리)
//   sajang-vs-jikwon, saup-mangham-pointo (seonggong-saup 카테고리)
//   sumneun-yeoldeunggam (jajungam 카테고리)
//   cheot-insang-yuhyeong, sahoe-gamen-paeteon, eolyeo-wo-ha-neun-iyu (sosyal-imiji 카테고리)

export const POLISHED_SLUGS: ReadonlySet<string> = new Set([
  "yeonae-gojang-paeteon",      // 1. 나의 연애 고장 패턴 테스트
  "kkeullim-yuhyeong",           // 2. 내가 끌리는 사람 유형 테스트
  "jeon-aein-mot-nitneum",       // 3. 전 애인이 나를 못 잊는 이유 테스트
  "jipcheok-button",             // 4. 나의 집착 버튼 테스트
  "hoepisseonghyang-testeut",    // 5. 나의 회피 성향 테스트
  "jiltu-bangshik-testeut",      // 6. 내가 질투하는 방식 테스트
  "sohnjeol-dang-ha-neun-iyu",   // 7. 내가 손절당하는 숨은 이유 테스트
  "don-mot-moneun-iyu",          // 8. 내가 돈을 못 모으는 진짜 이유 테스트 (curated)
  "tongjang-sae-neun-paeteon",   // 9. 내 통장에서 돈이 새는 패턴 테스트
  "nae-seonggyek-wiheom-bubun",  // 10. 내 성격의 위험한 부분 테스트
  "naega-muneojinan-sungan",     // 11. 내가 무너지는 순간 테스트
  "insheng-kkoineum-paeteon",    // 12. 내 인생이 꼬이는 반복 패턴 테스트
]);

export const POLISHED_SLUGS_ARRAY: string[] = Array.from(POLISHED_SLUGS);
