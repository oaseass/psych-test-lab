// banks/qa/sohnjeolDangHaNenuIyu.ts
// "내가 손절당하는 숨은 이유 테스트" (sohnjeol-dang-ha-neun-iyu) 전용 QA 뱅크
// 인간관계에서 내가 손절당하는 숨겨진 패턴을 발견하는 12개 질문

import type { QAPair } from "../types";

export const sohnjeolDangHaNenuIyuQA: QAPair[] = [
  {
    text: "친한 친구가 개인적인 고민을 털어놓았을 때, 나는 주로 어떻게 반응하는가?",
    options: [
      { text: "공감하며 들어주고, 상대가 원할 때 조언한다", resultKey: "noComm" },
      { text: "바로 해결책과 조언을 제시한다", resultKey: "oneWay" },
      { text: "비슷한 내 경험을 먼저 이야기하게 된다", resultKey: "selfCentered" },
      { text: "문제를 분석해서 논리적으로 정리해준다", resultKey: "energyDrain" },
    ],
  },
  {
    text: "단톡방에서 내 의견과 다른 이야기가 나올 때, 나는?",
    options: [
      { text: "조용히 읽기만 한다", resultKey: "noComm" },
      { text: "내 생각을 명확하게 표현하되 강요는 않는다", resultKey: "emotionDump" },
      { text: "반박하거나 틀렸다고 지적한다", resultKey: "boundaryViolate" },
      { text: "대화를 내가 원하는 방향으로 유도한다", resultKey: "selfCentered" },
    ],
  },
  {
    text: "약속 당일 급한 사정으로 취소해야 할 때, 나는?",
    options: [
      { text: "빠르게 연락하고 다음 약속을 바로 잡는다", resultKey: "noComm" },
      { text: "미리 연락하지만 다음 약속은 흐지부지된다", resultKey: "repeatHurt" },
      { text: "취소 후 며칠 지나서야 다시 연락한다", resultKey: "energyDrain" },
      { text: "상대가 이해해줄 거라 믿고 나중에 연락한다", resultKey: "oneWay" },
    ],
  },
  {
    text: "친구가 나에게 부탁을 했을 때, 내가 거절하는 방식은?",
    options: [
      { text: "솔직하게 거절하지만, 이후에 먼저 다시 연락하거나 확인하지는 않는다", resultKey: "noComm" },
      { text: "일단 수락했다가 나중에 못하겠다고 한다", resultKey: "trustBreak" },
      { text: "거절을 잘 못하고 억지로 들어준다", resultKey: "energyDrain" },
      { text: "나도 요즘 힘들다는 이야기를 먼저 하게 된다", resultKey: "emotionDump" },
    ],
  },
  {
    text: "오랫동안 안 만난 지인을 만났을 때, 대화 주제는?",
    options: [
      { text: "근황은 묻고 답하지만, 서로 깊은 속 이야기까지는 잘 하지 않는 편이다", resultKey: "noComm" },
      { text: "주로 내 최근 근황과 성취를 이야기한다", resultKey: "selfCentered" },
      { text: "상대 이야기에 조언하고 싶어진다", resultKey: "oneWay" },
      { text: "공통 지인의 이야기가 많이 나온다", resultKey: "trustBreak" },
    ],
  },
  {
    text: "친구와 사이가 멀어지고 있다는 느낌이 들 때, 나는?",
    options: [
      { text: "직접 연락해서 괜찮은지 물어본다", resultKey: "noComm" },
      { text: "상대가 먼저 연락할 때까지 기다린다", resultKey: "energyDrain" },
      { text: "왜 그런지 이유를 계속 분석하고 고민한다", resultKey: "repeatHurt" },
      { text: "서운함을 간접적으로 표현한다", resultKey: "oneWay" },
    ],
  },
  {
    text: "술자리나 모임에서 나는 주로 어떤 역할을 하는가?",
    options: [
      { text: "분위기를 이끌며 중심에 있는 편이다", resultKey: "selfCentered" },
      { text: "조용히 있다가 불편하면 먼저 빠진다", resultKey: "energyDrain" },
      { text: "다른 사람의 이야기를 잘 들어주는 편이다", resultKey: "noComm" },
      { text: "내 의견과 경험을 활발히 나눈다", resultKey: "oneWay" },
    ],
  },
  {
    text: "누군가가 나를 오해하거나 잘못 알고 있을 때, 나는?",
    options: [
      { text: "차분하게 내 입장을 설명하지만, 상대가 어떻게 받아들였는지는 확인하지 않고 넘어간다", resultKey: "noComm" },
      { text: "이해해주지 않는 상대방에게 화가 난다", resultKey: "boundaryViolate" },
      { text: "해명하기 귀찮아서 그냥 넘긴다", resultKey: "energyDrain" },
      { text: "주변 사람들에게 상황을 설명한다", resultKey: "trustBreak" },
    ],
  },
  {
    text: "친한 사람의 비밀을 알게 되었을 때, 나는?",
    options: [
      { text: "완전히 비밀로 지킨다", resultKey: "noComm" },
      { text: "가까운 한두 명에게는 이야기할 수 있다", resultKey: "trustBreak" },
      { text: "비밀인지 몰랐다며 얘기하게 되기도 한다", resultKey: "repeatHurt" },
      { text: "직접적인 이해관계자에게만 공유한다", resultKey: "selfCentered" },
    ],
  },
  {
    text: "상대방이 내 행동이나 말에 상처를 받았다고 할 때, 나의 첫 반응은?",
    options: [
      { text: "바로 사과는 하지만, 이후에 그 주제를 다시 꺼내거나 충분히 풀어내지는 않는다", resultKey: "noComm" },
      { text: "내 의도가 그게 아니었음을 먼저 설명한다", resultKey: "oneWay" },
      { text: "상대가 예민하다고 생각된다", resultKey: "boundaryViolate" },
      { text: "미안하다고는 하지만 억울한 마음이 크다", resultKey: "selfCentered" },
    ],
  },
  {
    text: "관계가 끊어진 사람이 있다면, 주로 어떤 이유였는가?",
    options: [
      { text: "서로 자연스럽게 바빠지면서", resultKey: "energyDrain" },
      { text: "내가 상대방에게 상처를 줘서", resultKey: "repeatHurt" },
      { text: "상대방이 나를 이해 못 해서", resultKey: "boundaryViolate" },
      { text: "서로 다른 방향으로 살다 보니", resultKey: "noComm" },
    ],
  },
  {
    text: "친구가 내가 모르는 새로운 친구 그룹과 친해졌을 때, 나는?",
    options: [
      { text: "자연스럽게 어울리긴 하지만, 깊이 가까워지기보다는 편한 거리감을 유지한다", resultKey: "noComm" },
      { text: "왠지 모를 서운함이나 질투심이 생긴다", resultKey: "boundaryViolate" },
      { text: "그쪽 모임에 끼려는 노력을 한다", resultKey: "selfCentered" },
      { text: "기존 관계가 약해질까 봐 걱정된다", resultKey: "repeatHurt" },
    ],
  },
];
