// banks/qa/naegaMuneojinanSungan.ts
// "내가 무너지는 순간 테스트" (naega-muneojinan-sungan) 전용 QA 뱅크
// Result keys: approvalHunger, controlLoss, isolationFear, overloadBurst,
//              selfNegate, lossTrigger, unpredictFear, compareHurt

import type { QAPair } from "../types";

export const naegaMuneojinanSunganQA: QAPair[] = [
  {
    text: "중요한 발표나 평가를 앞두고 나는?",
    options: [
      { text: "준비를 아무리 해도 어떤 상황이 올지 몰라서 긴장된다", resultKey: "unpredictFear" },
      { text: "잘 해야 한다는 압박이 강하게 온다", resultKey: "approvalHunger" },
      { text: "결과보다 과정을 통제하지 못할 것 같아 불안하다", resultKey: "controlLoss" },
      { text: "혼자 감당하는 것이 버겁게 느껴진다", resultKey: "overloadBurst" },
    ],
  },
  {
    text: "기대하고 있던 일이 갑자기 취소되거나 무산됐을 때, 나는?",
    options: [
      { text: "실망하지만 금방 적응하고 다른 계획을 세운다", resultKey: "approvalHunger" },
      { text: "예측하지 못한 변화 자체가 스트레스다", resultKey: "unpredictFear" },
      { text: "기대했던 것을 잃었다는 상실감이 크다", resultKey: "lossTrigger" },
      { text: "왜 나한테만 이런 일이 생기냐는 생각이 든다", resultKey: "selfNegate" },
    ],
  },
  {
    text: "혼자 있는 시간이 길어질 때, 나는?",
    options: [
      { text: "재충전 시간이라 좋다", resultKey: "controlLoss" },
      { text: "고립되는 것 같아 불안해진다", resultKey: "isolationFear" },
      { text: "나를 찾는 사람이 없다는 생각이 든다", resultKey: "approvalHunger" },
      { text: "오히려 자신에 대한 부정적인 생각이 많아진다", resultKey: "selfNegate" },
    ],
  },
  {
    text: "해야 할 일이 한꺼번에 많아졌을 때, 나는?",
    options: [
      { text: "우선순위를 정하고 차례로 처리한다", resultKey: "unpredictFear" },
      { text: "모두 잘 해야 한다는 압박에 압도된다", resultKey: "overloadBurst" },
      { text: "어디서 시작해야 할지 몰라 멈춰버린다", resultKey: "controlLoss" },
      { text: "나에게 너무 많은 걸 요구한다는 생각에 지친다", resultKey: "selfNegate" },
    ],
  },
  {
    text: "오래 알고 지낸 사람이 나를 갑자기 멀리하거나 연락이 끊어질 때, 나는?",
    options: [
      { text: "서로 바빠진 것이라 생각하고 유연하게 받아들인다", resultKey: "lossTrigger" },
      { text: "내가 뭔가 잘못한 건 아닌지 계속 돌아본다", resultKey: "approvalHunger" },
      { text: "버려진 것 같은 강한 감정이 온다", resultKey: "isolationFear" },
      { text: "어떤 관계도 믿을 수 없다는 생각이 든다", resultKey: "selfNegate" },
    ],
  },
  {
    text: "나보다 잘하거나 잘 되는 사람을 봤을 때, 나는?",
    options: [
      { text: "자극을 받고 나도 해볼 수 있겠다고 생각한다", resultKey: "controlLoss" },
      { text: "나는 왜 저렇게 못 할까, 비교되는 감정이 온다", resultKey: "compareHurt" },
      { text: "열심히 해도 안 된다는 무력감이 든다", resultKey: "selfNegate" },
      { text: "인정받고 싶다는 욕구가 강해진다", resultKey: "approvalHunger" },
    ],
  },
  {
    text: "계획대로 진행되지 않거나 예상치 못한 문제가 생겼을 때, 나는?",
    options: [
      { text: "의도대로 풀리지 않으면 금방 의욕을 잃는다", resultKey: "selfNegate" },
      { text: "통제력을 잃은 것 같아 매우 불안해진다", resultKey: "controlLoss" },
      { text: "어떻게 될지 모른다는 불확실성이 두렵다", resultKey: "unpredictFear" },
      { text: "감당이 안 된다는 생각에 포기하고 싶어진다", resultKey: "overloadBurst" },
    ],
  },
  {
    text: "힘든 감정이 생겼을 때, 나는 주로?",
    options: [
      { text: "말하지 않아도 주변에서 알아주길 바라는 마음이 생긴다", resultKey: "approvalHunger" },
      { text: "나눌 수 있는 사람이 없어서 더 힘들다", resultKey: "isolationFear" },
      { text: "감정을 조절하지 못해 무너지는 느낌이 든다", resultKey: "overloadBurst" },
      { text: "누군가 위로해주거나 알아줬으면 하는 마음이 생긴다", resultKey: "approvalHunger" },
    ],
  },
  {
    text: "가장 가까운 사람과 큰 다툼이 생겼을 때, 나는?",
    options: [
      { text: "상대보다 내가 더 힘들어하는 것 같아 초라해진다", resultKey: "compareHurt" },
      { text: "관계가 완전히 끝날 것 같은 두려움이 온다", resultKey: "isolationFear" },
      { text: "내가 잘못한 부분만 계속 되새긴다", resultKey: "selfNegate" },
      { text: "예상치 못한 상황에 감당이 안 된다", resultKey: "unpredictFear" },
    ],
  },
  {
    text: "내 노력이나 결과물이 인정받지 못했을 때, 나는?",
    options: [
      { text: "남들은 인정받는데 나만 못 받는 것 같아 비교된다", resultKey: "compareHurt" },
      { text: "굉장히 의욕이 꺾이고 지속하기 어렵다", resultKey: "approvalHunger" },
      { text: "역시 나는 안 된다는 생각이 강해진다", resultKey: "selfNegate" },
      { text: "내 방향이 맞는지 모르겠다는 혼란이 온다", resultKey: "lossTrigger" },
    ],
  },
  {
    text: "지금까지 쌓아온 무언가(관계, 일, 목표)를 잃을 위기가 생겼을 때, 나는?",
    options: [
      { text: "방향을 잃은 것 같아서 어떻게 해야 할지 모르겠다", resultKey: "unpredictFear" },
      { text: "그것이 없으면 나는 무엇인지 모르겠다는 생각이 든다", resultKey: "lossTrigger" },
      { text: "어떻게든 붙잡으려고 필사적으로 노력한다", resultKey: "controlLoss" },
      { text: "이렇게 됐다는 것 자체가 역시 나는 안 된다는 느낌으로 이어진다", resultKey: "selfNegate" },
    ],
  },
  {
    text: "주변 사람들이 다 잘 되는 것처럼 보일 때, 나는?",
    options: [
      { text: "어느 순간 모든 게 지쳐서 아무것도 하기 싫어진다", resultKey: "overloadBurst" },
      { text: "나만 뒤처지는 것 같아 초조해진다", resultKey: "compareHurt" },
      { text: "열심히 해도 나는 안 되는 것 같다는 생각이 든다", resultKey: "selfNegate" },
      { text: "빨리 따라잡아야 한다는 압박이 온다", resultKey: "approvalHunger" },
    ],
  },
];
