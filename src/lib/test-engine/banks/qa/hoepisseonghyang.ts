// banks/qa/hoepisseonghyang.ts
// "나의 회피 성향 테스트" (hoepisseonghyang-testeut) 전용 질문 뱅크

import type { QAPair } from "../types";

export const hoepisseonghyangQA: QAPair[] = [
  {
    text: "연인이 더 깊이 가까워지려 할 때 어떤 기분인가요?",
    options: [
      { text: "설레기도 하지만 동시에 도망치고 싶은 느낌이 든다", resultKey: "intimacyFear" },
      { text: "감정이 너무 무거워져서 감당이 안 된다", resultKey: "emotionOverload" },
      { text: "나의 자유와 공간이 줄어드는 것 같아 불편하다", resultKey: "independenceFirst" },
      { text: "전에 상처받은 기억이 떠올라 조심스럽다", resultKey: "woundDefense" },
    ],
  },
  {
    text: "연인이 자주 연락을 하면?",
    options: [
      { text: "가까워지는 게 좋은데 어느 순간 숨막힌다", resultKey: "intimacyFear" },
      { text: "감정적 요구가 쌓이는 것 같아 부담된다", resultKey: "emotionOverload" },
      { text: "나만의 시간이 없어지는 것 같아 답답하다", resultKey: "independenceFirst" },
      { text: "기대가 생기면 나중에 상처받을까봐 긴장된다", resultKey: "woundDefense" },
    ],
  },
  {
    text: "관계에서 갈등이 생겼을 때 주로 어떻게 하나요?",
    options: [
      { text: "일단 그 상황에서 벗어나고 싶다", resultKey: "conflictAvoid" },
      { text: "감정 싸움 자체가 너무 지치고 버겁다", resultKey: "emotionOverload" },
      { text: "갈등보다 혼자 있는 시간이 더 편하다", resultKey: "independenceFirst" },
      { text: "다시 상처받는 게 무서워서 먼저 물러선다", resultKey: "woundDefense" },
    ],
  },
  {
    text: "상대가 나에게 감정 표현을 요구하면?",
    options: [
      { text: "원하는 건 알지만 그렇게 하면 더 가까워질까봐 망설여진다", resultKey: "intimacyFear" },
      { text: "감정을 언어로 꺼내는 게 너무 무겁게 느껴진다", resultKey: "emotionOverload" },
      { text: "자유롭게 느끼고 싶은데 표현해야 한다는 압박이 싫다", resultKey: "freedomCrave" },
      { text: "감정을 보여줬다가 이용당한 적이 있어서 꺼려진다", resultKey: "woundDefense" },
    ],
  },
  {
    text: "가까운 관계가 생기면 어느 순간 소리 없이 멀어지는 일이 있나요?",
    options: [
      { text: "있다. 너무 가까워지면 무서워진다", resultKey: "intimacyFear" },
      { text: "있다. 관계 유지 자체가 에너지가 많이 들어서", resultKey: "relationFatigue" },
      { text: "있다. 구속받는 느낌이 생기면 자연스럽게 멀어진다", resultKey: "freedomCrave" },
      { text: "있다. 상처받기 전에 먼저 빠져나오는 것 같다", resultKey: "woundDefense" },
    ],
  },
  {
    text: "연인이 약속이나 기대를 표현하면?",
    options: [
      { text: "기대가 높아질수록 도망치고 싶은 느낌이 든다", resultKey: "intimacyFear" },
      { text: "감당해야 할 것들이 많아지는 것 같아 버겁다", resultKey: "emotionOverload" },
      { text: "내 속도대로 하고 싶은데 강요받는 느낌이 든다", resultKey: "freedomCrave" },
      { text: "조용히 멀어지는 게 더 쉬울 것 같다는 생각이 든다", resultKey: "quietRetreat" },
    ],
  },
  {
    text: "사람이 많은 자리나 모임이 끝난 후 어떤 기분인가요?",
    options: [
      { text: "에너지가 소진되고 혼자만의 시간이 절실하다", resultKey: "relationFatigue" },
      { text: "감정적으로 너무 많이 쓴 것 같다", resultKey: "emotionOverload" },
      { text: "자유로운 시간이 그리웠다는 생각이 든다", resultKey: "freedomCrave" },
      { text: "그나마 혼자 있어야 나다운 것 같다", resultKey: "independenceFirst" },
    ],
  },
  {
    text: "회피하고 있다는 걸 알면서도 멈추지 못하는 이유는?",
    options: [
      { text: "가까워지면 결국 상처받을 것 같은 두려움", resultKey: "intimacyFear" },
      { text: "관계를 유지하는 것 자체가 너무 힘들어서", resultKey: "relationFatigue" },
      { text: "과거의 상처가 반복될 것 같은 느낌", resultKey: "woundDefense" },
      { text: "내 공간과 자유가 침범받는 것 같은 느낌", resultKey: "independenceFirst" },
    ],
  },
  {
    text: "연인이 '우리 이야기 좀 해'라고 하면?",
    options: [
      { text: "갈등이 생길 것 같아서 피하고 싶다", resultKey: "conflictAvoid" },
      { text: "감정이 무거워질 것 같아서 부담된다", resultKey: "emotionOverload" },
      { text: "조용히 사라지거나 시간을 미루고 싶다", resultKey: "quietRetreat" },
      { text: "전에 이런 대화 후 상처받은 기억이 있어서 긴장된다", resultKey: "woundDefense" },
    ],
  },
  {
    text: "가장 편안하게 느껴지는 관계는?",
    options: [
      { text: "서로 적당한 거리가 있고 독립적인 관계", resultKey: "independenceFirst" },
      { text: "서로 요구가 없고 자유로운 관계", resultKey: "freedomCrave" },
      { text: "감정 기복이 없고 조용한 관계", resultKey: "quietRetreat" },
      { text: "충분히 신뢰가 쌓여서 안전한 관계", resultKey: "woundDefense" },
    ],
  },
  {
    text: "연인과 오래 함께 있으면 어떤 느낌인가요?",
    options: [
      { text: "좋긴 한데 어느 순간 혼자 있고 싶어진다", resultKey: "independenceFirst" },
      { text: "에너지가 소진되고 혼자만의 공간이 필요하다", resultKey: "relationFatigue" },
      { text: "자유롭게 내 시간을 쓸 수 없어서 답답하다", resultKey: "freedomCrave" },
      { text: "너무 가까워지면 불안해진다", resultKey: "intimacyFear" },
    ],
  },
  {
    text: "관계에서 갈등이 생기면 가장 먼저 하고 싶은 것은?",
    options: [
      { text: "일단 그 상황에서 벗어나서 거리를 두고 싶다", resultKey: "conflictAvoid" },
      { text: "소리 없이 멀어지는 게 더 편할 것 같다", resultKey: "quietRetreat" },
      { text: "혼자 있는 시간으로 충전하고 나서 생각하고 싶다", resultKey: "independenceFirst" },
      { text: "내가 먼저 마음을 닫는 게 더 안전하다고 느낀다", resultKey: "woundDefense" },
    ],
  },
];
