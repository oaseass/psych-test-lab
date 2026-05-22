// banks/qa/jipcheokButton.ts
// "나의 집착 버튼 테스트" (jipcheok-button) 전용 질문 뱅크

import type { QAPair } from "../types";

export const jipcheokButtonQA: QAPair[] = [
  {
    text: "연인에게 답장이 오지 않을 때 가장 먼저 드는 생각은?",
    options: [
      { text: "혹시 나를 무시하는 건 아닐까, 계속 핸드폰을 확인한다", resultKey: "uncertaintyFear" },
      { text: "나를 충분히 좋아하지 않는 것 같다는 생각이 든다", resultKey: "affectionDeficit" },
      { text: "다른 사람과 있는 건 아닐까 싶어서 확인하고 싶다", resultKey: "possessive" },
      { text: "내가 중요한 사람인지 확인받고 싶어진다", resultKey: "existenceCheck" },
    ],
  },
  {
    text: "연인의 SNS에서 다른 이성과 찍은 사진을 발견하면?",
    options: [
      { text: "어떤 관계인지 알 수 없어서 계속 마음이 쓰인다", resultKey: "uncertaintyFear" },
      { text: "나한테는 저런 적이 없는데라는 생각이 든다", resultKey: "affectionDeficit" },
      { text: "그 사람이 누군지 알고 싶어진다", resultKey: "possessive" },
      { text: "나보다 더 중요한 사람이 생긴 건 아닌지 걱정된다", resultKey: "existenceCheck" },
    ],
  },
  {
    text: "어떤 상황에서 가장 강하게 집착이 발동되나요?",
    options: [
      { text: "상대의 행동이나 감정을 예측할 수 없을 때", resultKey: "uncertaintyFear" },
      { text: "상대가 나를 충분히 원하지 않는다고 느낄 때", resultKey: "affectionDeficit" },
      { text: "완벽하게 이루고 싶은데 잘 안 될 것 같을 때", resultKey: "perfectionist" },
      { text: "경쟁자가 생기거나 비교당하는 상황이 생길 때", resultKey: "rivalry" },
    ],
  },
  {
    text: "상대가 나 말고 다른 사람에게 관심을 줄 것 같을 때?",
    options: [
      { text: "확실하지 않은 상황이 가장 힘들다", resultKey: "uncertaintyFear" },
      { text: "오히려 더 그 상대를 원하게 된다", resultKey: "rivalry" },
      { text: "내 것으로 만들지 않으면 불안하다", resultKey: "possessive" },
      { text: "내가 중요한 사람인지 먼저 확인하고 싶다", resultKey: "existenceCheck" },
    ],
  },
  {
    text: "내가 집착하고 있다는 걸 알면서도 멈추지 못하는 이유는?",
    options: [
      { text: "불확실한 상황이 해소되지 않아서", resultKey: "uncertaintyFear" },
      { text: "사랑받고 싶은 마음이 너무 크기 때문이다", resultKey: "affectionDeficit" },
      { text: "완벽하게 이루고 싶은 욕구 때문이다", resultKey: "perfectionist" },
      { text: "과거에 비슷한 상처가 있어서 반복되는 것 같다", resultKey: "woundMemory" },
    ],
  },
  {
    text: "연인의 과거 연애에 대해 어떻게 생각하나요?",
    options: [
      { text: "자세히 알지 못하는 게 계속 신경 쓰인다", resultKey: "uncertaintyFear" },
      { text: "전 연인보다 내가 더 사랑받는지 확인하고 싶다", resultKey: "affectionDeficit" },
      { text: "전 연인과 비교될까봐 신경이 쓰인다", resultKey: "rivalry" },
      { text: "과거 배신 때문에 이번에도 의심이 된다", resultKey: "woundMemory" },
    ],
  },
  {
    text: "내가 원하는 것을 갖기 어렵다는 걸 알게 되면?",
    options: [
      { text: "어떻게든 얻을 방법을 찾는다", resultKey: "possessive" },
      { text: "포기가 안 되고 더 원하게 된다", resultKey: "cantLetGo" },
      { text: "이미 쏟은 것들 때문에 내려놓기가 힘들다", resultKey: "cantLetGo" },
      { text: "내가 충분히 매력적이지 않은 건지 자책한다", resultKey: "affectionDeficit" },
    ],
  },
  {
    text: "연인과 연락 빈도가 줄어들면?",
    options: [
      { text: "내가 먼저 더 자주 연락해서 간격을 채우려 한다", resultKey: "affectionDeficit" },
      { text: "왜 줄었는지 이유를 확인하지 않으면 불안하다", resultKey: "existenceCheck" },
      { text: "놓칠까봐 더 꽉 잡으려 한다", resultKey: "possessive" },
      { text: "전에도 이런 적 있어서 더 예민하게 반응한다", resultKey: "woundMemory" },
    ],
  },
  {
    text: "집착 후에 상대가 거리를 두면?",
    options: [
      { text: "내가 왜 이러지 싶으면서도 멈추기 어렵다", resultKey: "cantLetGo" },
      { text: "거리가 좁혀질 때까지 계속 확인하게 된다", resultKey: "existenceCheck" },
      { text: "상대가 떠날까봐 더 강하게 붙잡으려 한다", resultKey: "possessive" },
      { text: "역시 나는 충분히 사랑받지 못하는 거라는 생각이 든다", resultKey: "affectionDeficit" },
    ],
  },
  {
    text: "집착을 촉발하는 가장 결정적인 상황은?",
    options: [
      { text: "상대의 감정이나 의도가 모호하게 느껴질 때", resultKey: "uncertaintyFear" },
      { text: "상대가 나를 특별하게 여기지 않는 것처럼 느껴질 때", resultKey: "affectionDeficit" },
      { text: "상대를 완전히 내 것으로 할 수 없을 것 같을 때", resultKey: "perfectionist" },
      { text: "비슷한 상처를 줬던 사람이 떠오를 때", resultKey: "woundMemory" },
    ],
  },
  {
    text: "헤어진 후에도 집착이 남는 이유는?",
    options: [
      { text: "아직 내가 충분히 사랑받지 못했다는 느낌이 든다", resultKey: "affectionDeficit" },
      { text: "그 사람을 내 것으로 했어야 했다는 생각이 든다", resultKey: "possessive" },
      { text: "이렇게 많이 쏟았는데 그냥 끝낼 수 없다는 느낌이다", resultKey: "cantLetGo" },
      { text: "또 이런 상처를 받았다는 것이 힘들다", resultKey: "woundMemory" },
    ],
  },
  {
    text: "집착하는 나 자신을 볼 때 드는 감정은?",
    options: [
      { text: "이렇게 불안해하는 내가 이해가 안 된다", resultKey: "uncertaintyFear" },
      { text: "사랑받고 싶은 게 잘못인가 싶다", resultKey: "affectionDeficit" },
      { text: "포기하지 못하는 내가 답답하기도 하다", resultKey: "cantLetGo" },
      { text: "과거 경험이 나를 이렇게 만든 것 같다", resultKey: "woundMemory" },
    ],
  },
];
