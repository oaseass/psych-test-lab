// banks/qa/tongjangSaeNeunPaeteon.ts
// "내 통장에서 돈이 새는 패턴 테스트" (tongjang-sae-neun-paeteon) 전용 QA 뱅크
// Result keys: subscriptionBleed, moodFood, convenienceAddict,
//              socialCost, upgradeLoop, nightSpend, compareShop, eventBinge

import type { QAPair } from "../types";

export const tongjangSaeNeunPaeteonQA: QAPair[] = [
  {
    text: "한 달에 쓰는 배달/외식 금액이 얼마 정도인가?",
    options: [
      { text: "예산을 정해두고 그 안에서 사용한다", resultKey: "eventBinge" },
      { text: "기분에 따라 크게 달라진다", resultKey: "moodFood" },
      { text: "밥 먹기 귀찮을 때마다 시키다 보면 꽤 된다", resultKey: "convenienceAddict" },
      { text: "친구 만날 때 외식이 많아서 사교 비용이 크다", resultKey: "socialCost" },
    ],
  },
  {
    text: "새벽이나 밤 11시 이후에 온라인 구매를 한 적이 있는가?",
    options: [
      { text: "거의 없다, 주로 낮에 구매한다", resultKey: "subscriptionBleed" },
      { text: "가끔 있다, 잠 오기 전 쇼핑이 습관이다", resultKey: "nightSpend" },
      { text: "자주 있다, 새벽에 결제한 것을 아침에 후회한다", resultKey: "nightSpend" },
      { text: "특정 이벤트(할인) 때 새벽에 결제한다", resultKey: "eventBinge" },
    ],
  },
  {
    text: "현재 유지 중인 구독 서비스는 몇 개 정도인가?",
    options: [
      { text: "1~2개, 필요한 것만 유지한다", resultKey: "moodFood" },
      { text: "3~5개, 다 필요한 것이라 생각한다", resultKey: "subscriptionBleed" },
      { text: "5개 이상, 정확히는 모르겠다", resultKey: "subscriptionBleed" },
      { text: "언제 신청했는지도 모르는 것이 있다", resultKey: "subscriptionBleed" },
    ],
  },
  {
    text: "스마트폰을 새 모델로 바꾸는 주기는?",
    options: [
      { text: "4년 이상 쓰거나 완전히 고장 나면 바꾼다", resultKey: "moodFood" },
      { text: "2~3년 주기, 새 기능이 필요할 때 바꾼다", resultKey: "convenienceAddict" },
      { text: "1~2년, 좋은 신제품이 나오면 바꾼다", resultKey: "upgradeLoop" },
      { text: "주변에서 새 기종을 쓰면 나도 바꾸고 싶어진다", resultKey: "compareShop" },
    ],
  },
  {
    text: "할인 이벤트(블랙프라이데이, 11.11 등)에서 나는?",
    options: [
      { text: "미리 필요한 것을 리스트업하고 그것만 산다", resultKey: "moodFood" },
      { text: "할인 중이라 이것저것 더 사게 된다", resultKey: "eventBinge" },
      { text: "나중에 필요할 것 같아서 사두는 것도 있다", resultKey: "compareShop" },
      { text: "이 기회 아니면 더 비싸게 살 것 같아서 많이 산다", resultKey: "eventBinge" },
    ],
  },
  {
    text: "편의점이나 스마트폰 결제 앱(배달앱 등)을 사용하는 빈도는?",
    options: [
      { text: "주 1~2회 이하, 필요할 때만", resultKey: "upgradeLoop" },
      { text: "주 3~4회, 급할 때 자주 이용한다", resultKey: "convenienceAddict" },
      { text: "거의 매일, 편의성 때문에 주로 이용한다", resultKey: "convenienceAddict" },
      { text: "기분에 따라 달라진다", resultKey: "moodFood" },
    ],
  },
  {
    text: "친구나 지인이 비싼 물건이나 서비스를 이용하면, 나는?",
    options: [
      { text: "나와 무관하게 느껴진다", resultKey: "subscriptionBleed" },
      { text: "어떤 건지 궁금해지고 나도 찾아보게 된다", resultKey: "compareShop" },
      { text: "같은 것을 경험해보고 싶어진다", resultKey: "compareShop" },
      { text: "나도 비슷한 수준은 해야 한다는 생각이 든다", resultKey: "socialCost" },
    ],
  },
  {
    text: "장거리 이동이나 외출 시, 교통/이동 방식은?",
    options: [
      { text: "시간이 걸려도 경제적인 방법을 선택한다", resultKey: "moodFood" },
      { text: "조금 더 비싸도 편한 방법을 선택한다", resultKey: "convenienceAddict" },
      { text: "시간 절약이 최우선이라 택시 등을 자주 쓴다", resultKey: "convenienceAddict" },
      { text: "기분에 따라 크게 달라진다", resultKey: "nightSpend" },
    ],
  },
  {
    text: "카드 명세서를 보면 가장 많이 나오는 지출 항목은?",
    options: [
      { text: "배달과 편의점 이용이 많고, 매번 소액이라 생각하지만 쌓이면 꽤 크다", resultKey: "convenienceAddict" },
      { text: "배달/외식 항목이 생각보다 크다", resultKey: "moodFood" },
      { text: "정기결제 항목들이 여러 개", resultKey: "subscriptionBleed" },
      { text: "쇼핑/의류 등 비정기 지출이 크다", resultKey: "upgradeLoop" },
    ],
  },
  {
    text: "특별한 날(생일, 기념일 등)이 아닌데도 비싼 식사를 하는 이유는?",
    options: [
      { text: "거의 없다, 특별한 날에만 한다", resultKey: "subscriptionBleed" },
      { text: "기분이 좋거나 보상이 필요할 때", resultKey: "moodFood" },
      { text: "친구들 제안으로 같이 가게 된다", resultKey: "socialCost" },
      { text: "그냥 맛있는 걸 즐기고 싶어서", resultKey: "upgradeLoop" },
    ],
  },
  {
    text: "지인 모임이나 회식에서 돈 관련 불편함을 느낄 때는?",
    options: [
      { text: "거의 없다", resultKey: "upgradeLoop" },
      { text: "내 예산보다 비싼 장소가 정해질 때", resultKey: "socialCost" },
      { text: "더 많이 낸 것 같은 느낌이 들 때", resultKey: "socialCost" },
      { text: "모임 자체가 너무 자주 있어서 비용이 부담될 때", resultKey: "socialCost" },
    ],
  },
  {
    text: "전자기기나 가전제품을 고를 때, 주로 어떤 기준인가?",
    options: [
      { text: "필요한 기능만 있으면 저렴한 것을 선택한다", resultKey: "moodFood" },
      { text: "가성비를 꼼꼼히 따진다", resultKey: "compareShop" },
      { text: "조금 더 비싸도 더 좋은 걸 산다", resultKey: "upgradeLoop" },
      { text: "후기가 많거나 유명한 브랜드를 선호한다", resultKey: "compareShop" },
    ],
  },
];
