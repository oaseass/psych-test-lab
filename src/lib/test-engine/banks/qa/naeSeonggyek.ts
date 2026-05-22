// banks/qa/naeSeonggyek.ts
// "내 성격의 위험한 부분 테스트" (nae-seonggyek-wiheom-bubun) 전용 QA 뱅크
// Result keys: controlFreak, emotionBlast, irresponsible, victimhood,
//              falseEgo, overDepend, aggressiveDefense, chronicComplaint

import type { QAPair } from "../types";

export const naeSeonggyekQA: QAPair[] = [
  {
    text: "주변 사람이 나와 다른 방법으로 일을 진행할 때, 나는?",
    options: [
      { text: "그 사람의 방식을 인정하고 결과를 기다린다", resultKey: "overDepend" },
      { text: "내 방식이 더 낫다며 계속 개입하게 된다", resultKey: "controlFreak" },
      { text: "내심 불안하지만 참는다", resultKey: "aggressiveDefense" },
      { text: "나쁜 결과가 나오면 내가 말했잖아 라고 생각한다", resultKey: "victimhood" },
    ],
  },
  {
    text: "예상과 다르게 일이 잘못됐을 때, 나의 첫 반응은?",
    options: [
      { text: "무엇이 문제였는지 분석한다", resultKey: "overDepend" },
      { text: "감정이 먼저 올라와서 폭발하거나 강하게 표현한다", resultKey: "emotionBlast" },
      { text: "책임을 피하거나 이유를 찾으려 한다", resultKey: "irresponsible" },
      { text: "왜 이렇게 됐는지 억울한 마음이 든다", resultKey: "victimhood" },
    ],
  },
  {
    text: "비판이나 피드백을 받았을 때, 나는?",
    options: [
      { text: "불편하지만 받아들이려 노력한다", resultKey: "overDepend" },
      { text: "즉각적으로 반박하거나 화가 난다", resultKey: "emotionBlast" },
      { text: "억울하고 상대가 이해를 못 한다는 생각이 든다", resultKey: "falseEgo" },
      { text: "내 잘못이 아닌 이유를 먼저 찾는다", resultKey: "irresponsible" },
    ],
  },
  {
    text: "중요한 결정을 내려야 할 때, 나는?",
    options: [
      { text: "스스로 판단하고 결정한다", resultKey: "controlFreak" },
      { text: "주변 사람의 의견을 많이 구하고, 그에 따른다", resultKey: "overDepend" },
      { text: "결정을 미루거나 다른 사람에게 떠넘기려 한다", resultKey: "irresponsible" },
      { text: "내가 옳다는 확신이 있어서 빠르게 결정한다", resultKey: "falseEgo" },
    ],
  },
  {
    text: "관계에서 갈등이 생겼을 때, 나의 방식은?",
    options: [
      { text: "직접 이야기하려 하지만, 해결이 안 되면 그냥 이해하려 하거나 혼자 삭이게 된다", resultKey: "overDepend" },
      { text: "감정적으로 강하게 표현한다", resultKey: "emotionBlast" },
      { text: "소통 없이 내 방식대로 밀어붙인다", resultKey: "controlFreak" },
      { text: "내가 피해자라는 느낌이 들어서 억울하다", resultKey: "victimhood" },
    ],
  },
  {
    text: "나에 대한 비판이 여러 사람에게서 반복될 때, 나는?",
    options: [
      { text: "공통적인 부분이 있다면 수용한다", resultKey: "overDepend" },
      { text: "저 사람들이 다 틀렸다고 생각한다", resultKey: "falseEgo" },
      { text: "불공평하게 비판받는다는 생각이 든다", resultKey: "victimhood" },
      { text: "듣기 불편해서 그 자리를 피하거나 관계를 끊는다", resultKey: "aggressiveDefense" },
    ],
  },
  {
    text: "누군가가 나의 생활 방식이나 습관에 대해 지적할 때, 나는?",
    options: [
      { text: "귀담아듣고 내 행동을 점검한다", resultKey: "overDepend" },
      { text: "강하게 방어하거나 반격한다", resultKey: "aggressiveDefense" },
      { text: "내 방식이 맞다는 생각이 든다", resultKey: "falseEgo" },
      { text: "지적받는 것 자체를 공격으로 느낀다", resultKey: "emotionBlast" },
    ],
  },
  {
    text: "팀이나 그룹 프로젝트에서 문제가 생겼을 때, 나는?",
    options: [
      { text: "내 역할을 점검하고 책임을 진다", resultKey: "overDepend" },
      { text: "내가 더 주도해야 했다는 생각이 든다", resultKey: "controlFreak" },
      { text: "다른 사람의 부족함 때문이라고 생각한다", resultKey: "chronicComplaint" },
      { text: "내 탓은 최소화하고 상황 탓을 한다", resultKey: "irresponsible" },
    ],
  },
  {
    text: "나와 가까운 사람이 내 결정에 반대할 때, 나는?",
    options: [
      { text: "납득이 안 돼도 일단 수긍하고, 나중에 혼자 생각을 정리하게 된다", resultKey: "overDepend" },
      { text: "설득이 안 되면 내 방식대로 진행한다", resultKey: "controlFreak" },
      { text: "반대하는 것 자체가 배신처럼 느껴진다", resultKey: "victimhood" },
      { text: "강하게 감정 표현을 해서라도 내 뜻을 관철한다", resultKey: "emotionBlast" },
    ],
  },
  {
    text: "일상에서 불만이 생겼을 때, 나는?",
    options: [
      { text: "해결 방법을 찾거나 상황을 수용한다", resultKey: "overDepend" },
      { text: "주변에 불만을 자주 이야기한다", resultKey: "chronicComplaint" },
      { text: "혼자 속으로 삭이지만 태도가 바뀐다", resultKey: "aggressiveDefense" },
      { text: "불만이 쌓이면 갑자기 폭발한다", resultKey: "emotionBlast" },
    ],
  },
  {
    text: "친구나 동료가 나보다 더 좋은 결과를 얻었을 때, 나는?",
    options: [
      { text: "진심으로 축하하고 자극을 받는다", resultKey: "overDepend" },
      { text: "과정이 불공평했다는 생각이 든다", resultKey: "victimhood" },
      { text: "그 사람보다 내가 더 잘할 수 있다고 생각한다", resultKey: "falseEgo" },
      { text: "주변에 부당함을 이야기하게 된다", resultKey: "chronicComplaint" },
    ],
  },
  {
    text: "내가 누군가에게 의존하거나 도움을 받아야 할 때, 나는?",
    options: [
      { text: "자연스럽게 부탁하고 감사하게 생각한다", resultKey: "controlFreak" },
      { text: "의존하는 것이 불편하고 혼자 하려 한다", resultKey: "aggressiveDefense" },
      { text: "도움을 받을 때 불안하거나 과도하게 의존하게 된다", resultKey: "overDepend" },
      { text: "도움을 받고 나서도 불만이 생기는 편이다", resultKey: "chronicComplaint" },
    ],
  },
];