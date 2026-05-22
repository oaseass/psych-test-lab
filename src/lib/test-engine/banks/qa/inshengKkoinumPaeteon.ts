// banks/qa/inshengKkoinumPaeteon.ts
// "인생 꼬이는 패턴 테스트" (insheng-kkoineum-paeteon) 전용 QA 뱅크
// Result keys: decisionAvoid, relationRepeat, selfSabotage, perfectDelay,
//              otherDepend, blameShift, stabilityAddict, fearFirst

import type { QAPair } from "../types";

export const inshengKkoinumPaeteonQA: QAPair[] = [
  {
    text: "중요한 결정을 앞두고 나는?",
    options: [
      { text: "충분히 정보를 모은 후 결정한다", resultKey: "perfectDelay" },
      { text: "가능하면 결정을 미루거나 다른 사람에게 맡긴다", resultKey: "decisionAvoid" },
      { text: "현재 상황을 크게 바꾸지 않는 방향을 선호한다", resultKey: "stabilityAddict" },
      { text: "주변 사람의 의견을 많이 따른다", resultKey: "otherDepend" },
    ],
  },
  {
    text: "이전 관계(직장, 연인, 친구)에서 반복되는 문제가 있다면?",
    options: [
      { text: "떠오르기는 하는데, 어떻게 바꾸어야 할지 몰라서 그냥 넘겨다", resultKey: "fearFirst" },
      { text: "내 성격이나 행동 패턴과 관련이 있는 것 같다", resultKey: "selfSabotage" },
      { text: "매번 비슷한 유형의 사람을 만나는 것 같다", resultKey: "relationRepeat" },
      { text: "상대나 환경의 문제가 반복되는 것 같다", resultKey: "blameShift" },
    ],
  },
  {
    text: "좋은 기회가 왔을 때, 나는?",
    options: [
      { text: "주저하다 놓치는 경우가 있는데, 이번에도 버려끄밀까 싶다", resultKey: "selfSabotage" },
      { text: "잘 될 것 같다가도 이상하게 안 되는 쪽으로 흘러간다", resultKey: "selfSabotage" },
      { text: "완전히 준비됐을 때 시작하려 한다", resultKey: "perfectDelay" },
      { text: "실패할까봐 망설이다 놓치는 경우가 있다", resultKey: "fearFirst" },
    ],
  },
  {
    text: "현재 내 삶이 꼬여있다고 느낀다면, 그 이유는?",
    options: [
      { text: "작은 것들이 쌓여서 지금 상황이 된 것 같다", resultKey: "selfSabotage" },
      { text: "운이 좋지 않거나 환경이 안 따라줬다", resultKey: "blameShift" },
      { text: "누구 때문에 이렇게 된 것 같다", resultKey: "otherDepend" },
      { text: "아직 결단을 내리지 못하고 있어서", resultKey: "decisionAvoid" },
    ],
  },
  {
    text: "새로운 것을 시작할 때, 나의 패턴은?",
    options: [
      { text: "일단 시작하고 배워간다", resultKey: "stabilityAddict" },
      { text: "충분히 준비가 됐다고 느낄 때까지 기다린다", resultKey: "perfectDelay" },
      { text: "잘 될 것 같다가 이유 없이 그만두게 된다", resultKey: "selfSabotage" },
      { text: "잘 되는 사람을 보고 그대로 따라 하려 한다", resultKey: "otherDepend" },
    ],
  },
  {
    text: "관계에서 나는 비슷한 상처를 반복적으로 받는 것 같다?",
    options: [
      { text: "딱히 그렇지 않다", resultKey: "blameShift" },
      { text: "그렇다, 비슷한 유형에게 끌리는 것 같다", resultKey: "relationRepeat" },
      { text: "그렇다, 근데 매번 달라질 거라 믿는다", resultKey: "fearFirst" },
      { text: "그렇다, 내 어딘가에 원인이 있는 것 같다", resultKey: "selfSabotage" },
    ],
  },
  {
    text: "삶이 안정되면 좋겠지만, 안정이 너무 강하면?",
    options: [
      { text: "오히려 답답하고 성장이 없다는 느낌이 든다", resultKey: "perfectDelay" },
      { text: "그래도 안정이 제일이다", resultKey: "stabilityAddict" },
      { text: "새로운 시도가 두렵지만 필요하다고 생각한다", resultKey: "fearFirst" },
      { text: "변화를 원하지만 실행을 못 하겠다", resultKey: "decisionAvoid" },
    ],
  },
  {
    text: "내 인생에서 반복적으로 후회하는 게 있다면?",
    options: [
      { text: "결정을 너무 오래 미뤘던 것", resultKey: "decisionAvoid" },
      { text: "더 잘 준비했더라면 하는 것", resultKey: "perfectDelay" },
      { text: "비슷한 실수를 반복하는 것", resultKey: "relationRepeat" },
      { text: "두려움 때문에 시도하지 못했던 것", resultKey: "fearFirst" },
    ],
  },
  {
    text: "나는 내 삶의 방향을 주로 어디서 결정하는가?",
    options: [
      { text: "내 기준이 뒤다바뛽하여 상황마다 달라진다", resultKey: "decisionAvoid" },
      { text: "주변 사람의 의견이나 기대에 따라", resultKey: "otherDepend" },
      { text: "안전하고 검증된 길을 따라", resultKey: "stabilityAddict" },
      { text: "상황이 알아서 진전되면 자연스럽게 되겠지라는 기대로", resultKey: "blameShift" },
    ],
  },
  {
    text: "문제가 생겼을 때 내가 먼저 하는 것은?",
    options: [
      { text: "원인을 분석하고 해결책을 찾는다", resultKey: "stabilityAddict" },
      { text: "책임질 사람이나 원인을 찾는다", resultKey: "blameShift" },
      { text: "주변에 도움을 요청한다", resultKey: "otherDepend" },
      { text: "두려움이 생겨서 행동이 느려진다", resultKey: "fearFirst" },
    ],
  },
  {
    text: "내 삶에서 가장 자주 느끼는 감정은?",
    options: [
      { text: "막막하거나 불명확한 느낌", resultKey: "decisionAvoid" },
      { text: "왜 나는 안 될까, 이상하다는 느낌", resultKey: "selfSabotage" },
      { text: "두렵고 조심스러운 느낌", resultKey: "fearFirst" },
      { text: "억울하거나 불공평한 느낌", resultKey: "blameShift" },
    ],
  },
  {
    text: "나와 비슷한 조건의 사람이 더 잘 되는 것을 봤을 때, 나는?",
    options: [
      { text: "나도 할 수 있겠다고 자극을 받는다", resultKey: "stabilityAddict" },
      { text: "나는 왜 저렇게 안 될까 생각한다", resultKey: "selfSabotage" },
      { text: "저 사람은 뭔가 운이 좋았거나 다른 게 있다고 생각한다", resultKey: "blameShift" },
      { text: "나도 해봐야겠다, 하지만 어떻게 하지 고민이 든다", resultKey: "perfectDelay" },
    ],
  },
];
