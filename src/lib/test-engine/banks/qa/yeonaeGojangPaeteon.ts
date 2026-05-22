// banks/qa/yeonaeGojangPaeteon.ts
// "나의 연애 고장 패턴 테스트" (yeonae-gojang-paeteon) 전용 질문 뱅크

import type { QAPair } from "../types";

export const yeonaeGojangPaeteonQA: QAPair[] = [
  {
    text: "연락이 안 될 때 가장 먼저 떠오르는 생각은?",
    options: [
      { text: "무슨 일이 생긴 건 아닐까, 계속 신경 쓰인다", resultKey: "anxious" },
      { text: "바쁜가 보다, 나중에 연락 오겠지", resultKey: "avoidant" },
      { text: "예전에도 이랬다가 싸운 적이 있는데…", resultKey: "repeatHurt" },
      { text: "굳이 내가 먼저 확인 연락을 해야 하나", resultKey: "disconnect" },
    ],
  },
  {
    text: "싸운 뒤 화해할 때 보통 어떻게 하나요?",
    options: [
      { text: "내가 먼저 하지 않으면 불안해서 못 기다린다", resultKey: "anxious" },
      { text: "일단 자리를 피하고 감정이 가라앉으면 연락한다", resultKey: "avoidant" },
      { text: "항상 같은 패턴으로 싸우다 화해하는 것 같다", resultKey: "repeatHurt" },
      { text: "화해는 하는데 정작 하고 싶은 말은 못 한다", resultKey: "disconnect" },
    ],
  },
  {
    text: "연인의 행동이 마음에 걸릴 때 어떻게 하나요?",
    options: [
      { text: "어디 가는지, 누구랑인지 다 알고 싶다", resultKey: "control" },
      { text: "물어봐도 솔직히 말 안 할 것 같아 혼자 상상한다", resultKey: "passiveAggress" },
      { text: "확인하고 싶지만 집착처럼 보일까 봐 참는다", resultKey: "rationalize" },
      { text: "불안하지만 어떻게 말을 꺼내야 할지 모르겠다", resultKey: "anxious" },
    ],
  },
  {
    text: "화가 났을 때 나는?",
    options: [
      { text: "감정이 임계점에 달하면 한꺼번에 터진다", resultKey: "explosive" },
      { text: "겉으로는 아무렇지 않은 척하지만 속으론 불만이 쌓인다", resultKey: "passiveAggress" },
      { text: "화가 난 게 맞지만 내가 예민한 건 아닌지 생각한다", resultKey: "rationalize" },
      { text: "말하지 않으면 상대가 알 수 없는데 그게 더 화가 난다", resultKey: "disconnect" },
    ],
  },
  {
    text: "연애에서 내가 반복하는 패턴이 있다고 생각하나요?",
    options: [
      { text: "있는 것 같다. 늘 불안해하고 확인하려 한다", resultKey: "anxious" },
      { text: "있는 것 같다. 친해지면 멀어지고 싶어진다", resultKey: "avoidant" },
      { text: "있는 것 같다. 같은 이유로 상처받는다", resultKey: "repeatHurt" },
      { text: "있는 것 같다. 감정을 제대로 말로 못 한다", resultKey: "disconnect" },
    ],
  },
  {
    text: "상대가 선을 넘는다고 느낄 때?",
    options: [
      { text: "참다가 한꺼번에 말한다. 그래서 폭발처럼 보이기도 한다", resultKey: "explosive" },
      { text: "직접 말은 안 하고 차갑게 대응하거나 무시한다", resultKey: "passiveAggress" },
      { text: "사실 나도 어딘가 잘못이 있는 것 아닌지 생각한다", resultKey: "rationalize" },
      { text: "뭔가 잘못된 것 같은데 정확히 어떤지 설명을 못 하겠다", resultKey: "disconnect" },
    ],
  },
  {
    text: "상대의 과거 연애 이야기를 들으면?",
    options: [
      { text: "신경 쓰이고 자꾸 떠오른다", resultKey: "control" },
      { text: "그냥 넘기는 척하지만 속으론 불편하다", resultKey: "passiveAggress" },
      { text: "과거는 과거니 괜찮다고 말하지만 사실 약간 불편하다", resultKey: "rationalize" },
      { text: "과거도 다 알아야 안심된다", resultKey: "anxious" },
    ],
  },
  {
    text: "연인에게 서운함을 어떻게 전달하나요?",
    options: [
      { text: "직접 말하지 못하고 태도로 보여준다", resultKey: "passiveAggress" },
      { text: "서운하다고 하면 과민반응처럼 보일까봐 말을 못 한다", resultKey: "disconnect" },
      { text: "서운함이 쌓이면 어느 순간 폭발한다", resultKey: "explosive" },
      { text: "서운해도 원인이 내게 있는 건 아닌지 먼저 생각한다", resultKey: "rationalize" },
    ],
  },
  {
    text: "연애 초반, 상대가 조금 차갑게 느껴지면?",
    options: [
      { text: "불안해서 더 자주 연락하거나 확인하게 된다", resultKey: "anxious" },
      { text: "나도 마음을 닫고 거리를 둔다", resultKey: "avoidant" },
      { text: "전에도 이런 식으로 관계가 삐걱거렸던 기억이 난다", resultKey: "repeatHurt" },
      { text: "감정이 멀어지는 게 느껴지는데 말로 표현이 어렵다", resultKey: "disconnect" },
    ],
  },
  {
    text: "연애 이별이 반복된다면 그 이유가 뭐라고 생각하나요?",
    options: [
      { text: "내가 너무 불안하게 굴어서 상대가 지쳐서", resultKey: "anxious" },
      { text: "가까워질수록 내가 밀어내서", resultKey: "avoidant" },
      { text: "같은 상황에서 비슷하게 상처를 주고받아서", resultKey: "repeatHurt" },
      { text: "제대로 된 말을 못 해서 오해가 쌓여서", resultKey: "disconnect" },
    ],
  },
  {
    text: "연인이 다른 사람에게 친절하게 대하면?",
    options: [
      { text: "질투가 나고 그 상황을 통제하고 싶어진다", resultKey: "control" },
      { text: "겉으로는 아무렇지 않지만 안은 불편하다", resultKey: "passiveAggress" },
      { text: "별거 아닌데 왜 신경 쓰이지 하고 자책한다", resultKey: "rationalize" },
      { text: "불편한데 어떻게 말해야 할지 몰라서 그냥 넘긴다", resultKey: "disconnect" },
    ],
  },
  {
    text: "연애가 힘들다고 느낄 때 가장 먼저 하는 것은?",
    options: [
      { text: "더 자주 확인하고 붙잡으려 한다", resultKey: "anxious" },
      { text: "혼자만의 시간을 갖거나 거리를 둔다", resultKey: "avoidant" },
      { text: "예전에도 이런 적 있었는데 또 왔구나 싶다", resultKey: "repeatHurt" },
      { text: "힘들다고 말하고 싶은데 어떻게 말해야 할지 모르겠다", resultKey: "disconnect" },
    ],
  },
];
