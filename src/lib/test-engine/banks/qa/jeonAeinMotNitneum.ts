// banks/qa/jeonAeinMotNitneum.ts
// "전 애인이 나를 못 잊는 이유 테스트" (jeon-aein-mot-nitneum) 전용 질문 뱅크

import type { QAPair } from "../types";

export const jeonAeinMotNitneumQA: QAPair[] = [
  {
    text: "이별 후 전 연인이 가장 많이 떠올리는 것은 무엇일까요?",
    options: [
      { text: "함께 했던 특별한 순간들", resultKey: "idealizedImprint" },
      { text: "결말 없이 끝난 우리의 감정", resultKey: "incompleteEmotion" },
      { text: "나만이 줄 수 있었던 어떤 것", resultKey: "exclusiveExistence" },
      { text: "헤어지고 달라진 내 모습", resultKey: "changeShock" },
    ],
  },
  {
    text: "전 연인이 떠나보내기 힘든 이유 중 당신과 관련이 있을 것 같은 건?",
    options: [
      { text: "내가 먼저 연락을 끊었고 제대로 마무리가 안 됐다", resultKey: "incompleteEmotion" },
      { text: "기억 속의 나는 실제보다 더 좋게 포장됐을 것 같다", resultKey: "idealizedImprint" },
      { text: "나 같은 사람을 다시 만나기 어려울 것 같다", resultKey: "exclusiveExistence" },
      { text: "헤어진 후 내가 많이 달라졌을 것 같다", resultKey: "changeShock" },
    ],
  },
  {
    text: "이별 방식이 어떠했나요?",
    options: [
      { text: "하고 싶은 말을 다 못 하고 끝났다", resultKey: "incompleteEmotion" },
      { text: "서로에게 상처를 많이 남기고 끝났다", resultKey: "woundImprint" },
      { text: "내가 더 많이 받았던 것 같아 미안함이 남는다", resultKey: "guiltTrigger" },
      { text: "결국 반복되는 갈등으로 지쳐서 끝났다", resultKey: "recallLoop" },
    ],
  },
  {
    text: "이별 후 상대방이 나에게 연락한다면 그 이유는?",
    options: [
      { text: "아직 감정이 정리가 안 됐을 것이다", resultKey: "incompleteEmotion" },
      { text: "기억 속의 나를 그리워하는 것이다", resultKey: "idealizedImprint" },
      { text: "나 대신할 사람을 못 찾은 것이다", resultKey: "exclusiveExistence" },
      { text: "내가 없어진 공백이 생각보다 크게 느껴지는 것이다", resultKey: "voidGiant" },
    ],
  },
  {
    text: "전 연인이 SNS에서 내 활동을 계속 확인한다면?",
    options: [
      { text: "아직 미련이 남아서일 것이다", resultKey: "incompleteEmotion" },
      { text: "헤어진 후 달라진 내 모습에 충격받았을 것이다", resultKey: "changeShock" },
      { text: "없어지고 나서 얼마나 중요했는지 깨달은 것이다", resultKey: "voidGiant" },
      { text: "내게 상처준 것에 죄책감이 있는 것이다", resultKey: "guiltTrigger" },
    ],
  },
  {
    text: "상대방이 새 연애를 시작했는데도 나를 떠올린다면?",
    options: [
      { text: "새 연인에게서 나의 흔적을 발견하는 것 같다", resultKey: "recallLoop" },
      { text: "내가 줬던 것과 비슷한 것을 원하는 것이다", resultKey: "exclusiveExistence" },
      { text: "상처받은 기억이 더 선명하게 남아있는 것이다", resultKey: "woundImprint" },
      { text: "내 빈자리가 생각보다 크다는 것을 느끼는 것이다", resultKey: "voidGiant" },
    ],
  },
  {
    text: "내가 이별 후 상대를 생각나게 하는 가장 큰 이유는?",
    options: [
      { text: "내가 그에게 깊은 상처를 남겼기 때문이다", resultKey: "woundImprint" },
      { text: "내게 미안한 감정이 아직 해소되지 않았기 때문이다", resultKey: "guiltTrigger" },
      { text: "나와 비슷한 상황이 생길 때마다 떠오르기 때문이다", resultKey: "recallLoop" },
      { text: "결국 다 안 됐다는 허무함이 남아서이다", resultKey: "voidGiant" },
    ],
  },
  {
    text: "전 연인이 지금도 나를 기억하는 방식은?",
    options: [
      { text: "실제보다 더 완벽하게 기억하고 있을 것이다", resultKey: "idealizedImprint" },
      { text: "아팠던 기억이 더 선명하게 남아있을 것이다", resultKey: "woundImprint" },
      { text: "나만이 채워줬던 어떤 부분으로 기억할 것이다", resultKey: "exclusiveExistence" },
      { text: "끝내지 못한 감정이 뭉텅이로 남아있을 것이다", resultKey: "incompleteEmotion" },
    ],
  },
  {
    text: "이별 후 상대가 가장 힘들어하는 부분은 무엇이었을까요?",
    options: [
      { text: "내가 없는 일상의 공백이 컸을 것이다", resultKey: "voidGiant" },
      { text: "내게 상처를 준 것에 대한 자책이었을 것이다", resultKey: "guiltTrigger" },
      { text: "비슷한 상황이 나를 계속 소환해서였을 것이다", resultKey: "recallLoop" },
      { text: "헤어지고 달라진 내 모습을 감당 못 했을 것이다", resultKey: "changeShock" },
    ],
  },
  {
    text: "전 연인에게 내가 남긴 인상은?",
    options: [
      { text: "같이 있을 때보다 없어진 후 더 커진 존재감", resultKey: "voidGiant" },
      { text: "실제보다 이상화된 아름다운 기억", resultKey: "idealizedImprint" },
      { text: "깊은 상처와 동시에 잊지 못할 감정", resultKey: "woundImprint" },
      { text: "나만이 줄 수 있었던 독보적인 무언가", resultKey: "exclusiveExistence" },
    ],
  },
  {
    text: "당신이 떠난 뒤 상대가 변했다면?",
    options: [
      { text: "내가 준 영향으로 성장했거나 달라진 것 같다", resultKey: "changeShock" },
      { text: "나를 그리워하며 비슷한 사람을 반복해서 만날 것 같다", resultKey: "recallLoop" },
      { text: "미안함 때문에 더 좋은 사람이 되려 했을 것 같다", resultKey: "guiltTrigger" },
      { text: "제대로 마무리되지 않아서 계속 여운이 남았을 것 같다", resultKey: "incompleteEmotion" },
    ],
  },
  {
    text: "전 연인이 '그때 그 사람'으로 오래 기억되는 이유는?",
    options: [
      { text: "끝이 나도 감정이 완결되지 않아서", resultKey: "incompleteEmotion" },
      { text: "기억 속에서 점점 더 좋게 포장되어서", resultKey: "idealizedImprint" },
      { text: "비슷한 상황마다 자꾸 소환되어서", resultKey: "recallLoop" },
      { text: "그 공백을 채워줄 사람을 아직 못 만나서", resultKey: "voidGiant" },
    ],
  },
];
