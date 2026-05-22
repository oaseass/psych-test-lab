// banks/qa/donMotMoneunIyu.ts
// "내가 돈을 못 모으는 진짜 이유 테스트" (don-mot-moneun-iyu) 전용 QA 뱅크
// Result keys: impulseBuyer, emotionSpender, statusSeeker, futureBlind,
//              smallLeaks, avoidPlanning, rewardOverspend, incomeFirst

import type { QAPair } from "../types";

export const donMotMoneunIyuQA: QAPair[] = [
  {
    text: "월급날 통장에 돈이 들어왔을 때, 나의 첫 번째 행동은?",
    options: [
      { text: "고정 지출과 저축을 먼저 빼고 나머지로 생활한다", resultKey: "incomeFirst" },
      { text: "그동안 참았던 걸 사고 싶어진다", resultKey: "rewardOverspend" },
      { text: "일단 기분이 좋아서 맛있는 것을 먹는다", resultKey: "emotionSpender" },
      { text: "생각 없이 쓰다 보면 어느새 별로 없다", resultKey: "smallLeaks" },
    ],
  },
  {
    text: "오늘 기분이 안 좋거나 스트레스를 받았을 때, 주로 어떻게 푸는가?",
    options: [
      { text: "친구를 만나거나 운동 같은 무료 활동을 한다", resultKey: "incomeFirst" },
      { text: "평소보다 더 맛있는 걸 사먹거나 배달시킨다", resultKey: "emotionSpender" },
      { text: "온라인 쇼핑을 하거나 물건을 산다", resultKey: "impulseBuyer" },
      { text: "카드 영수증을 의식하지 못하고 지름을 반복한다", resultKey: "smallLeaks" },
    ],
  },
  {
    text: "지금 당장 필요하지 않지만 할인 중인 제품을 발견했을 때, 나는?",
    options: [
      { text: "정말 필요한지 따져보고 대부분 넘긴다", resultKey: "incomeFirst" },
      { text: "할인이니까 사두면 이득이라는 생각에 구매한다", resultKey: "impulseBuyer" },
      { text: "이미 비슷한 게 있어도 '더 좋은 것'이라 구매한다", resultKey: "statusSeeker" },
      { text: "일단 장바구니에 담아두다가 결국 구매한다", resultKey: "avoidPlanning" },
    ],
  },
  {
    text: "10년 후 나의 재정 상태가 어떨 것 같냐는 질문에, 나는?",
    options: [
      { text: "구체적인 계획이 있어서 대략 예상된다", resultKey: "incomeFirst" },
      { text: "잘 모르겠고 생각하기 싫다", resultKey: "futureBlind" },
      { text: "어떻게든 되겠지, 라는 생각이 든다", resultKey: "avoidPlanning" },
      { text: "그때 가서 생각하면 된다고 느낀다", resultKey: "futureBlind" },
    ],
  },
  {
    text: "한 달에 나가는 구독/정기결제 금액을 정확히 알고 있는가?",
    options: [
      { text: "매달 정리해서 불필요한 건 해지한다", resultKey: "incomeFirst" },
      { text: "대략 알지만 정확히는 모른다", resultKey: "smallLeaks" },
      { text: "확인하려면 카드 명세서를 봐야 한다", resultKey: "avoidPlanning" },
      { text: "쌓여 있는데 해지하기가 귀찮다", resultKey: "smallLeaks" },
    ],
  },
  {
    text: "오래 일했거나 힘든 프로젝트가 끝났을 때, 나는?",
    options: [
      { text: "보상은 필요하지만 예산 안에서 한다", resultKey: "incomeFirst" },
      { text: "이 정도는 써야 한다는 생각에 평소보다 더 쓴다", resultKey: "rewardOverspend" },
      { text: "그동안 참았으니 마음껏 사고 싶다", resultKey: "rewardOverspend" },
      { text: "보상보다는 그냥 쉬고 싶다", resultKey: "futureBlind" },
    ],
  },
  {
    text: "친구나 지인이 비싼 물건을 샀다거나 좋은 곳에 갔다는 이야기를 들었을 때, 나는?",
    options: [
      { text: "잘됐다고 생각하고 별로 영향을 받지 않는다", resultKey: "incomeFirst" },
      { text: "나도 비슷한 수준은 해야 한다는 생각이 든다", resultKey: "statusSeeker" },
      { text: "뒤처진 것 같은 불안감이 생긴다", resultKey: "statusSeeker" },
      { text: "그냥 흘려듣는다", resultKey: "futureBlind" },
    ],
  },
  {
    text: "가계부나 지출 기록을 꾸준히 쓰는가?",
    options: [
      { text: "매달 쓰고 분석도 한다", resultKey: "incomeFirst" },
      { text: "시작했다가 며칠 만에 그만둔다", resultKey: "avoidPlanning" },
      { text: "써야 하는 건 알지만 귀찮아서 안 한다", resultKey: "avoidPlanning" },
      { text: "생각해본 적 없다", resultKey: "futureBlind" },
    ],
  },
  {
    text: "카드 청구서가 예상보다 많이 나왔을 때, 나는?",
    options: [
      { text: "어디서 초과됐는지 확인하고 다음 달 조정한다", resultKey: "incomeFirst" },
      { text: "당혹스럽지만 어쩔 수 없다고 생각한다", resultKey: "smallLeaks" },
      { text: "어디에 썼는지 잘 기억이 안 난다", resultKey: "smallLeaks" },
      { text: "다음 달에 아끼면 되지, 라고 생각한다", resultKey: "avoidPlanning" },
    ],
  },
  {
    text: "현재 내 저축 방식을 가장 잘 설명하는 것은?",
    options: [
      { text: "자동이체로 매달 일정 금액이 빠져나간다", resultKey: "incomeFirst" },
      { text: "쓰고 남으면 저축하지만 남는 게 없다", resultKey: "impulseBuyer" },
      { text: "저축 계획은 있는데 잘 안 된다", resultKey: "avoidPlanning" },
      { text: "저축은 나중에 돈 좀 더 벌면 할 것이다", resultKey: "futureBlind" },
    ],
  },
  {
    text: "물건을 살 때 가장 강하게 작용하는 이유는?",
    options: [
      { text: "실제로 필요하고 예산에 맞아서", resultKey: "incomeFirst" },
      { text: "보면 그냥 사고 싶어서 / 충동", resultKey: "impulseBuyer" },
      { text: "기분이 안 좋아서 / 위로가 필요해서", resultKey: "emotionSpender" },
      { text: "남들도 갖고 있어서 / 뒤처지지 않으려고", resultKey: "statusSeeker" },
    ],
  },
  {
    text: "지금 당장 지출을 줄여야 한다면, 가장 어려운 부분은?",
    options: [
      { text: "딱히 없다, 이미 계획적으로 쓰고 있다", resultKey: "incomeFirst" },
      { text: "갑자기 사고 싶어지는 충동 소비", resultKey: "impulseBuyer" },
      { text: "스트레스 해소를 위한 소비", resultKey: "emotionSpender" },
      { text: "자잘하게 나가는 것들이 너무 많아서", resultKey: "smallLeaks" },
    ],
  },
];
