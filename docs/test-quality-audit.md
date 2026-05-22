# 테스트 콘텐츠 품질 검수 보고서

**검수 기준 8가지:**
1. 질문 날카로움 (유치하지 않은지)
2. 선택지 구분도 (겹침 없는지)
3. 결과명 공유욕 (제목 매력도)
4. AI티 여부 (결과 설명 자연스러움)
5. 반복 표현 여부
6. 모바일 UX (선택지·결과 길이)
7. 결과 카드 공유욕 (shareText 매력도)
8. 추천 자연스러움 (matchingTypes/oppositeTypes)

---

## 12개 테스트 품질 평가

| slug | title | 질문 | 선택지 | 결과명 | AI티 | 반복 | 모바일 | shareText | 추천 | status | action |
|------|-------|------|--------|--------|------|------|--------|-----------|------|--------|--------|
| yeonae-gojang-paeteon | 나의 연애 고장 패턴 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **pass** | — |
| kkeullim-yuhyeong | 내가 끌리는 사람 유형 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **pass** | — |
| jeon-aein-mot-nitneum | 전 애인이 나를 못 잊는 이유 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **pass** | — |
| jipcheok-button | 나의 집착 버튼 | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **copyFix** | Q11 cantLetGo 중복 |
| hoepisseonghyang-testeut | 나의 회피 성향 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **pass** | — |
| jiltu-bangshik-testeut | 내가 질투하는 방식 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **pass** | — |
| sohnjeol-dang-ha-neun-iyu | 내가 손절당하는 숨은 이유 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **pass** | — |
| don-mot-moneun-iyu | 내가 돈을 못 모으는 진짜 이유 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **pass** | — |
| tongjang-sae-neun-paeteon | 내 통장에서 돈이 새는 패턴 | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **copyFix** | Q9 moodFood 잘못 매핑 |
| nae-seonggyek-wiheom-bubun | 내 성격의 위험한 부분 | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ✅ | ⚠️ | ✅ | **resultFix** | overDepend 결과 설명 불일치 |
| naega-muneojinan-sungan | 내가 무너지는 순간 | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **resultFix** | 7개 옵션 resultKey 오매핑 |
| insheng-kkoineum-paeteon | 내 인생이 꼬이는 반복 패턴 | ✅ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | **resultFix** | 4개 옵션 resultKey 오매핑 |

**결과 요약:** pass 8개, copyFix 2개, resultFix 3개 (모두 수정 후 통과 예정)

---

## 각 테스트 상세 이슈

### jipcheok-button — copyFix
- **Q11** `헤어진 후에도 집착이 남는 이유는?` — 선택지 A `"아직 결론이 나지 않은 느낌이 든다"` 와 선택지 C `"이렇게 많이 쏟았는데 그냥 끝낼 수 없다는 느낌이다"` 가 둘 다 `cantLetGo` 로 매핑됨 → A를 `affectionDeficit` 으로 교체

### tongjang-sae-neun-paeteon — copyFix  
- **Q9** `카드 명세서를 보면 가장 많이 나오는 지출 항목은?` — 선택지 A `"식비와 생활 필수품이 대부분"` 이 `moodFood` 로 매핑되어 있어 건전한 소비자를 감정 소비형으로 오분류함 → `convenienceAddict` 으로 교체

### nae-seonggyek-wiheom-bubun — resultFix
- **overDepend** result: Q1~Q12 전반에서 건강한 행동(분석, 수용, 직접 해결, 책임감 등)이 모두 `overDepend`로 수렴하는 구조인데, 결과 설명은 `"스스로 결정하는 것이 두려운 사람"`으로 되어 있어 완전히 불일치 → 결과 설명을 `"감정 억압형"`으로 재작성 (속으로 삭이고 합리화하다가 소진되는 패턴)

### naega-muneojinan-sungan — resultFix
오매핑 7개 옵션:
- Q1-A: `"준비가 됐다면 크게 긴장하지 않는다"` → `controlLoss` (❌ 건강한 응답) → `unpredictFear` 로 텍스트+키 교체
- Q7-A: `"유연하게 대처하는 편이다"` → `isolationFear` (❌ 연관없음) → `selfNegate` 로 교체
- Q8-A: `"잠깐 기다리면 나아지니까 혼자 삭힌다"` → `isolationFear` (❌ 고립 두려움 아님) → `selfNegate` 로 교체
- Q9-A: `"불편하지만 이야기로 해결한다"` → `compareHurt` (❌ 연관없음) → 텍스트+키 교체
- Q10-A: `"아쉽지만 자기 평가는 스스로 한다"` → `compareHurt` (❌ 연관없음) → 텍스트+키 교체
- Q11-A: `"새로운 방향을 찾는다"` → `unpredictFear` (❌ 맞지 않음) + Q11-D `lossTrigger` 중복 → A/D 교체
- Q12-A: `"각자 페이스가 있다는 것을 안다"` → `overloadBurst` (❌ 건강한 응답) → 텍스트+키 교체

### insheng-kkoineum-paeteon — resultFix
오매핑 4개 옵션:
- Q2-A: `"딱히 떠오르지 않는다"` → `blameShift` (Q2-D와 중복) → `fearFirst` 로 교체
- Q3-A: `"빠르게 잡으려 한다"` → `decisionAvoid` (❌ 반대 의미) → `selfSabotage` 로 텍스트+키 교체
- Q9-A: `"내 기준과 판단으로"` → `selfSabotage` (❌ 자기결정 = 자기방해??) → `decisionAvoid` 로 텍스트+키 교체
- Q9-D: `"지금보다 더 좋아질 것이라는 기대로"` → `blameShift` (❌ 희망 = 책임전가??) → 텍스트 교체
