# audit-tests 결과

> 실행일시: 2026. 5. 22. PM 6:27:26
> 검사 수: **12개** | ✅ pass: **12개** | ❌ fail: **0개**
> 숨긴 테스트: **0개** | /tests 실제 노출: **12개**

| route | status | reason | action |
|-------|--------|--------|--------|
| `/test/yeonae-gojang-paeteon` | ✅ pass | 전체 검사 통과 | - |
| `/test/kkeullim-yuhyeong` | ✅ pass | 전체 검사 통과 | - |
| `/test/jeon-aein-mot-nitneum` | ✅ pass | 전체 검사 통과 | - |
| `/test/jipcheok-button` | ✅ pass | 전체 검사 통과 | - |
| `/test/hoepisseonghyang-testeut` | ✅ pass | 전체 검사 통과 | - |
| `/test/jiltu-bangshik-testeut` | ✅ pass | 전체 검사 통과 | - |
| `/test/sohnjeol-dang-ha-neun-iyu` | ✅ pass | 전체 검사 통과 | - |
| `/test/don-mot-moneun-iyu` | ✅ pass | 전체 검사 통과 | - |
| `/test/tongjang-sae-neun-paeteon` | ✅ pass | 전체 검사 통과 | - |
| `/test/nae-seonggyek-wiheom-bubun` | ✅ pass | 전체 검사 통과 | - |
| `/test/naega-muneojinan-sungan` | ✅ pass | 전체 검사 통과 | - |
| `/test/insheng-kkoineum-paeteon` | ✅ pass | 전체 검사 통과 | - |
## 검사 기준

- 메타 존재 (curatedTests 또는 generatedTestMeta)
- PlayableTest 생성 가능
- 질문 8개 이상
- 각 질문 선택지 정확히 4개
- 결과 타입 4개 이상
- 결과 라벨 비제네릭 (A형~H형, 타입A/B, 결과A/B 등 패턴 금지)
- `심리테스트 연구소` 구 브랜드 잔재 없음
- 가짜 참여 수치 없음 (1000+, 900+, N명 참여 등)
- "준비중" 텍스트 금지
- 결과 summary 50자 이상
- 결과 keywords 3개 이상
- 포지션 fallback key(r1~rN) 없음 — 모든 option 반드시 resultKey 기반
- scores key → results id 매핑 일치
- results id 중복 없음
- 모든 result key 선택지에서 최소 1회 이상 참조
- 각 result key 최소 2회 이상 참조 (선택지 분포 균형)
- 결과 title 4자 이상, 단순 패턴 없음
