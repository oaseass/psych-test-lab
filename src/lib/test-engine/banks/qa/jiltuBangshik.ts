// banks/qa/jiltuBangshik.ts
// "나의 질투 방식 테스트" (jiltu-bangshik-testeut) 전용 질문 뱅크

import type { QAPair } from "../types";

export const jiltuBangshikQA: QAPair[] = [
  {
    text: "연인이 다른 이성과 웃으며 대화하는 걸 보면?",
    options: [
      { text: "표정은 괜찮은 척하지만 속으로 비교하고 있다", resultKey: "covertCompare" },
      { text: "바로 티를 내거나 직접 말한다", resultKey: "directExpress" },
      { text: "내가 부족해서 저러는 건 아닌지 자책한다", resultKey: "selfDoubt" },
      { text: "참다가 나중에 폭발하는 패턴이 생긴다", resultKey: "silentExplode" },
    ],
  },
  {
    text: "연인의 SNS에서 다른 이성이 많이 좋아요를 누른 걸 보면?",
    options: [
      { text: "몰래 그 계정을 확인해본다", resultKey: "covertCompare" },
      { text: "그냥 넘기지만 속으로 신경이 쓰인다", resultKey: "ignoreAvoid" },
      { text: "나한테는 저렇게 반응 안 해줬는데라는 생각이 든다", resultKey: "selfDoubt" },
      { text: "나도 더 잘 보여야겠다고 생각한다", resultKey: "competitiveGrowth" },
    ],
  },
  {
    text: "연인이 전 연인 이야기를 하면?",
    options: [
      { text: "속으로 비교하면서 불편해진다", resultKey: "covertCompare" },
      { text: "불편하다고 바로 말한다", resultKey: "directExpress" },
      { text: "내가 더 나은지 확인하고 싶어진다", resultKey: "overConfirm" },
      { text: "아무렇지 않은 척하지만 사실 별로다", resultKey: "ignoreAvoid" },
    ],
  },
  {
    text: "연인이 이성 친구가 많다고 하면?",
    options: [
      { text: "표면적으로는 괜찮다고 하지만 속으론 신경 쓰인다", resultKey: "covertCompare" },
      { text: "솔직히 불편하다고 말한다", resultKey: "directExpress" },
      { text: "나는 그 친구들보다 특별한가 싶어진다", resultKey: "selfDoubt" },
      { text: "이성 친구 중 위험한 사람은 없는지 확인하고 싶다", resultKey: "overConfirm" },
    ],
  },
  {
    text: "질투 감정을 처리하는 방식은?",
    options: [
      { text: "혼자 속으로 삭이고 비교하다 지친다", resultKey: "covertCompare" },
      { text: "일단 말하고 털어버린다", resultKey: "directExpress" },
      { text: "질투 자체를 자기 발전의 동기로 쓴다", resultKey: "competitiveGrowth" },
      { text: "느끼지 않는 척하거나 감정을 차단한다", resultKey: "coldSeparate" },
    ],
  },
  {
    text: "연인이 나를 신경 써주지 않는다고 느낄 때?",
    options: [
      { text: "이유를 물어보거나 계속 확인하게 된다", resultKey: "overConfirm" },
      { text: "나때문이 아닐까 자책한다", resultKey: "selfDoubt" },
      { text: "참다가 어느 순간 폭발한다", resultKey: "silentExplode" },
      { text: "감정을 차단하고 나도 거리를 둔다", resultKey: "coldSeparate" },
    ],
  },
  {
    text: "연인이 다른 사람을 칭찬하면?",
    options: [
      { text: "나도 그런 점을 가져야 하나 비교한다", resultKey: "covertCompare" },
      { text: "나는 왜 그런 칭찬을 안 해주냐고 말한다", resultKey: "directExpress" },
      { text: "내가 부족한 것 같아서 위축된다", resultKey: "selfDoubt" },
      { text: "그것보다 내가 더 잘하는 면을 보여주고 싶다", resultKey: "competitiveGrowth" },
    ],
  },
  {
    text: "질투를 느낄 때 상대에게 어떻게 표현하나요?",
    options: [
      { text: "표현 안 하지만 계속 신경 쓰이는 것들을 확인한다", resultKey: "overConfirm" },
      { text: "바로 말하고 해결한다", resultKey: "directExpress" },
      { text: "아무렇지 않은 척 무시하거나 피한다", resultKey: "ignoreAvoid" },
      { text: "감정을 끊고 차갑게 거리를 둔다", resultKey: "coldSeparate" },
    ],
  },
  {
    text: "질투가 계속 쌓이면 어떻게 되나요?",
    options: [
      { text: "오래 참다가 예상치 못한 순간에 터진다", resultKey: "silentExplode" },
      { text: "계속 확인하는 행동이 늘어난다", resultKey: "overConfirm" },
      { text: "감정적으로 분리되어 무감각해진다", resultKey: "coldSeparate" },
      { text: "자기 자신을 더 발전시키는 방향으로 쓴다", resultKey: "competitiveGrowth" },
    ],
  },
  {
    text: "비교당하는 상황에서 어떤 기분인가요?",
    options: [
      { text: "나도 모르게 나 자신을 비교하기 시작한다", resultKey: "covertCompare" },
      { text: "내가 부족한 것 같아서 자존감이 흔들린다", resultKey: "selfDoubt" },
      { text: "자극받아서 더 잘하고 싶어진다", resultKey: "competitiveGrowth" },
      { text: "참다가 한꺼번에 말하거나 감정이 터진다", resultKey: "silentExplode" },
    ],
  },
  {
    text: "질투가 관계에 미치는 영향은?",
    options: [
      { text: "몰래 비교하다 혼자 지치는 경우가 많다", resultKey: "covertCompare" },
      { text: "솔직하게 말해서 오히려 빨리 해결된다", resultKey: "directExpress" },
      { text: "감정을 차단해서 관계 자체가 멀어진다", resultKey: "coldSeparate" },
      { text: "쌓였다가 터지면서 갈등이 커지는 패턴이 있다", resultKey: "silentExplode" },
    ],
  },
  {
    text: "질투 후 관계는 어떻게 변하나요?",
    options: [
      { text: "말하지 않아서 속앓이를 하게 된다", resultKey: "covertCompare" },
      { text: "말한 덕에 오히려 더 솔직해진 것 같다", resultKey: "directExpress" },
      { text: "확인하는 행동이 반복되어 상대가 지쳐한다", resultKey: "overConfirm" },
      { text: "자기 발전으로 연결되어 긍정적인 변화가 생긴다", resultKey: "competitiveGrowth" },
    ],
  },
];
