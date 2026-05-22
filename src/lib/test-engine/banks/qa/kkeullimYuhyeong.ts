// banks/qa/kkeullimYuhyeong.ts
// "나는 어떤 사람에게 끌릴까? 끌림 유형 테스트" (kkeullim-yuhyeong) 전용 질문 뱅크

import type { QAPair } from "../types";

export const kkeullimYuhyeongQA: QAPair[] = [
  {
    text: "처음 만난 사람에게 끌림을 느끼는 순간은?",
    options: [
      { text: "예측하기 어렵고 미스터리한 면이 있을 때", resultKey: "badStimulus" },
      { text: "말 한마디에 진심이 느껴지고 편안할 때", resultKey: "stableLanding" },
      { text: "내가 꿈꿔온 이상형의 모습과 딱 맞을 때", resultKey: "idealist" },
      { text: "나와 결이 비슷하고 취향이 통할 때", resultKey: "mirrorResonance" },
    ],
  },
  {
    text: "상대방이 나에게 차갑게 굴면 어떤 기분인가요?",
    options: [
      { text: "오히려 더 궁금하고 끌린다", resultKey: "badStimulus" },
      { text: "상처받고 관계를 재고하게 된다", resultKey: "stableLanding" },
      { text: "내 이상형이 아니었나 싶어 거리를 둔다", resultKey: "idealist" },
      { text: "나를 이해 못 하는 것 같아 실망한다", resultKey: "mirrorResonance" },
    ],
  },
  {
    text: "연애 초반, 가장 설레는 순간은?",
    options: [
      { text: "상대가 나를 힘들게도 하지만 자꾸 생각나는 순간", resultKey: "badStimulus" },
      { text: "같이 있을 때 아무것도 안 해도 편안한 순간", resultKey: "stableLanding" },
      { text: "상대가 내가 그린 이상형의 모습과 겹칠 때", resultKey: "idealist" },
      { text: "말 안 해도 서로 통한다는 게 느껴지는 순간", resultKey: "mirrorResonance" },
    ],
  },
  {
    text: "상대에게 기대는 것이 자연스럽게 느껴지는 사람은?",
    options: [
      { text: "내가 완전히 이해하지 못하는 부분이 있는 사람", resultKey: "badStimulus" },
      { text: "내 말을 끝까지 들어주는 사람", resultKey: "stableLanding" },
      { text: "나보다 조금 더 완성된 것 같은 사람", resultKey: "idealist" },
      { text: "나의 감정 변화를 먼저 알아채는 사람", resultKey: "mirrorResonance" },
    ],
  },
  {
    text: "상대방의 어떤 점이 가장 매력적으로 느껴지나요?",
    options: [
      { text: "자유롭고 구속받지 않는 태도", resultKey: "adventureStimulus" },
      { text: "나를 보호해주고 든든한 느낌", resultKey: "protector" },
      { text: "지적으로 자극받는 대화와 관점", resultKey: "intellectual" },
      { text: "감수성이 깊고 감정을 세밀하게 표현하는 것", resultKey: "emotionalResonance" },
    ],
  },
  {
    text: "이상형을 묘사한다면?",
    options: [
      { text: "예측불가하고 독특한 에너지가 있는 사람", resultKey: "adventureStimulus" },
      { text: "믿음직하고 내 편이 되어줄 것 같은 사람", resultKey: "protector" },
      { text: "대화가 깊고 아는 것이 많은 사람", resultKey: "intellectual" },
      { text: "감정이 풍부하고 감성적인 면이 있는 사람", resultKey: "emotionalResonance" },
    ],
  },
  {
    text: "상대가 나에 대해 잘 모른다는 게 느껴지면?",
    options: [
      { text: "오히려 더 알리고 싶다는 생각이 든다", resultKey: "adventureStimulus" },
      { text: "서운하지만 천천히 알아가면 된다고 생각한다", resultKey: "protector" },
      { text: "내가 먼저 상대를 더 알아보고 싶어진다", resultKey: "intellectual" },
      { text: "감정적으로 연결이 안 된 것 같아 멀어지는 느낌이 든다", resultKey: "emotionalResonance" },
    ],
  },
  {
    text: "연애에서 자극이 없어지면 어떤 기분인가요?",
    options: [
      { text: "권태가 오고 이 관계가 맞는지 의문이 든다", resultKey: "badStimulus" },
      { text: "자극보다 안정이 더 중요하다고 생각한다", resultKey: "stableLanding" },
      { text: "이상형과 다른 것 같아 실망한다", resultKey: "idealist" },
      { text: "서로 더 깊이 알아가는 과정이라고 본다", resultKey: "mirrorResonance" },
    ],
  },
  {
    text: "상대의 단점을 발견했을 때?",
    options: [
      { text: "그 단점도 매력으로 느껴지거나 오히려 궁금해진다", resultKey: "badStimulus" },
      { text: "괜찮다. 완벽한 사람은 없으니까", resultKey: "stableLanding" },
      { text: "이상형의 기준과 비교하게 된다", resultKey: "idealist" },
      { text: "나도 비슷한 단점이 있다면 더 이해가 간다", resultKey: "mirrorResonance" },
    ],
  },
  {
    text: "상대가 나에게 솔직하게 약한 면을 보여주면?",
    options: [
      { text: "오히려 조금 흥미를 잃는 것 같다", resultKey: "adventureStimulus" },
      { text: "내가 더 잘 챙겨주고 싶어진다", resultKey: "protector" },
      { text: "그 깊이에 지적 호기심이 생긴다", resultKey: "intellectual" },
      { text: "감정적으로 더 깊이 연결된 느낌이 든다", resultKey: "emotionalResonance" },
    ],
  },
  {
    text: "연애에서 가장 중요하게 생각하는 것은?",
    options: [
      { text: "예측할 수 없는 설렘과 긴장감", resultKey: "adventureStimulus" },
      { text: "내 편이 되어주는 든든한 존재감", resultKey: "protector" },
      { text: "서로 성장하게 만드는 지적 교류", resultKey: "intellectual" },
      { text: "감정을 충분히 나누고 공감하는 깊은 연결", resultKey: "emotionalResonance" },
    ],
  },
  {
    text: "나를 가장 설레게 하는 상황은?",
    options: [
      { text: "상대가 나를 잡으러 올 것 같은 쫓기는 느낌", resultKey: "badStimulus" },
      { text: "아무 말 없이 그냥 옆에 있어주는 따뜻함", resultKey: "stableLanding" },
      { text: "상대가 내 기대에 부응하는 완벽한 순간", resultKey: "idealist" },
      { text: "말하지 않아도 서로 다 아는 것 같은 교감", resultKey: "mirrorResonance" },
    ],
  },
];
