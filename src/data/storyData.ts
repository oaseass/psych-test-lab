// ================================================
// 선택형 생존 스토리 데이터
// ================================================

export type StoryChoice = {
  id: string;
  text: string;
  nextSceneId: string;
  scoreEffect: number; // 생존 점수 변화
};

export type StoryScene = {
  id: string;
  text: string;
  choices: StoryChoice[];
  isEnding?: boolean;
  endingGrade?: string; // 엔딩 등급
};

export type StoryData = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  tags: string[];
  scenes: StoryScene[];
  isNew?: boolean;
  isHot?: boolean;
};

export const storyList: StoryData[] = [
  {
    id: "story-office",
    slug: "office-survival",
    title: "회사에서 살아남기",
    subtitle: "월요일 아침, 팀장이 부른다",
    description: "회사 생활의 갖가지 지뢰를 피해 오늘 하루 살아남아라",
    emoji: "💼",
    color: "#1F2937",
    bgColor: "#F9FAFB",
    tags: ["직장", "회사", "사회생활"],
    isHot: true,
    scenes: [
      {
        id: "s1",
        text: "월요일 아침 9시. 팀장이 갑자기 메시지를 보냈다.\n'지금 잠깐 얘기 좀 할 수 있어요?'\n\n무슨 일일까?",
        choices: [
          { id: "c1a", text: "즉시 '네! 지금 바로 가겠습니다' 답장", nextSceneId: "s2_fast", scoreEffect: 5 },
          { id: "c1b", text: "5분 후 '지금 잠깐 마무리 중인데 곧 갈게요' 답장", nextSceneId: "s2_slow", scoreEffect: 0 },
          { id: "c1c", text: "읽고 답장 안 함 (읽씹)", nextSceneId: "s2_ignore", scoreEffect: -15 },
        ],
      },
      {
        id: "s2_fast",
        text: "팀장 자리에 갔더니 '이번 주 프레젠테이션 자료 좀 부탁해요. 오늘 오후까지'라고 한다.\n\n이미 오늘 일정이 꽉 찼다.",
        choices: [
          { id: "c2a", text: "표정 유지하며 '네, 해보겠습니다'", nextSceneId: "s3_yes", scoreEffect: 10 },
          { id: "c2b", text: "일정이 있다고 솔직하게 말하고 협의", nextSceneId: "s3_honest", scoreEffect: 5 },
        ],
      },
      {
        id: "s2_slow",
        text: "5분 후 팀장에게 갔더니 분위기가 약간 싸늘하다.\n'아, 이제 왔어요? 이번 주 발표 자료 오늘 오후까지 부탁해요'",
        choices: [
          { id: "c2c", text: "'죄송합니다, 바로 시작하겠습니다'", nextSceneId: "s3_yes", scoreEffect: 0 },
          { id: "c2d", text: "이유 설명하며 일정 조율 요청", nextSceneId: "s3_honest", scoreEffect: 3 },
        ],
      },
      {
        id: "s2_ignore",
        text: "10분 뒤 팀장이 직접 자리로 왔다.\n'메시지 못 봤어요?'",
        choices: [
          { id: "c2e", text: "'죄송해요, 집중하느라 못 봤어요'", nextSceneId: "s3_yes", scoreEffect: -5 },
          { id: "c2f", text: "'아 죄송합니다...' (변명 없이 수용)", nextSceneId: "s3_yes", scoreEffect: -3 },
        ],
      },
      {
        id: "s3_yes",
        text: "점심시간. 동료가 '오늘 점심 같이 먹어요'라고 한다.\n하지만 자료 마감이 걱정된다.",
        choices: [
          { id: "c3a", text: "점심 30분만 먹고 바로 복귀", nextSceneId: "s4_end_good", scoreEffect: 10 },
          { id: "c3b", text: "혼자 책상에서 먹으며 자료 작업", nextSceneId: "s4_end_great", scoreEffect: 15 },
          { id: "c3c", text: "점심 느긋하게 먹고 야근각오", nextSceneId: "s4_end_ok", scoreEffect: -5 },
        ],
      },
      {
        id: "s3_honest",
        text: "일정 협의가 잘 됐다. 팀장이 '그럼 내일까지'라고 했다.\n\n남은 오늘 하루, 여유가 생겼다.",
        choices: [
          { id: "c3d", text: "미리 자료 작업 시작", nextSceneId: "s4_end_great", scoreEffect: 20 },
          { id: "c3e", text: "여유 있게 업무 처리", nextSceneId: "s4_end_good", scoreEffect: 10 },
        ],
      },
      {
        id: "s4_end_good",
        text: "퇴근 시간. 자료도 제출하고 오늘 하루 무사히 마쳤다.",
        choices: [],
        isEnding: true,
        endingGrade: "🏢 직장인 생존 성공",
      },
      {
        id: "s4_end_great",
        text: "퇴근 시간. 자료도 일찍 제출하고, 팀장에게 칭찬까지 받았다. 오늘은 진짜 잘 버텼다.",
        choices: [],
        isEnding: true,
        endingGrade: "⭐ 직장인 고수",
      },
      {
        id: "s4_end_ok",
        text: "오후 8시. 결국 야근 중이다. 그래도 내일은 더 잘하자.",
        choices: [],
        isEnding: true,
        endingGrade: "🌙 야근 생존자",
      },
    ],
  },
  {
    id: "story-sseum",
    slug: "sseum-survival",
    title: "썸에서 살아남기",
    subtitle: "카톡 읽고 3일째 답장 없음",
    description: "썸을 지키면서 이 관계를 어디까지 끌고 갈 수 있을까",
    emoji: "💌",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    tags: ["연애", "썸", "카톡"],
    isHot: true,
    scenes: [
      {
        id: "s1",
        text: "3일 전에 카톡을 보냈는데 읽고 답장이 없다.\n오늘 상대방이 인스타 스토리를 올렸다.",
        choices: [
          { id: "c1a", text: "스토리에 반응 이모지 보내기", nextSceneId: "s2_reaction", scoreEffect: 5 },
          { id: "c1b", text: "아무것도 안 하고 기다림", nextSceneId: "s2_wait", scoreEffect: 10 },
          { id: "c1c", text: "다시 카톡 보내기 '혹시 못 봤어?'", nextSceneId: "s2_resend", scoreEffect: -10 },
        ],
      },
      {
        id: "s2_reaction",
        text: "상대방이 스토리 반응에 'ㅋㅋ'라고 답장했다.\n그리고 원래 카톡에는 여전히 답장이 없다.",
        choices: [
          { id: "c2a", text: "'혹시 저번에 보낸 거 봤어?' 자연스럽게 물어보기", nextSceneId: "s3_ask", scoreEffect: 5 },
          { id: "c2b", text: "'ㅋㅋ' 에 'ㅋㅋ'로만 답하고 기다리기", nextSceneId: "s3_wait", scoreEffect: 10 },
        ],
      },
      {
        id: "s2_wait",
        text: "하루가 더 지났다. 여전히 답장이 없다.\n하지만 주변 친구들이 '기다려, 쫄면 안 돼'라고 한다.",
        choices: [
          { id: "c2c", text: "더 기다린다 (이 관계에 투자)", nextSceneId: "s3_wait", scoreEffect: 5 },
          { id: "c2d", text: "깔끔하게 정리하고 다른 사람 만나기", nextSceneId: "s4_end_free", scoreEffect: 20 },
        ],
      },
      {
        id: "s2_resend",
        text: "'못 봤어?'를 보냈더니 1분 뒤 읽음 처리가 됐다.\n그리고 또 답장이 없다.",
        choices: [
          { id: "c2e", text: "이제는 진짜 기다린다", nextSceneId: "s3_wait", scoreEffect: -5 },
          { id: "c2f", text: "전화해서 직접 물어보기", nextSceneId: "s3_call", scoreEffect: -15 },
        ],
      },
      {
        id: "s3_ask",
        text: "상대방이 '아 맞다 깜빡했어 ㅋㅋ'라고 답장이 왔다.\n그리고 원래 질문에 대한 답장도 왔다.",
        choices: [],
        isEnding: true,
        endingGrade: "💕 썸 생존 성공",
      },
      {
        id: "s3_wait",
        text: "일주일 후, 상대방이 먼저 연락이 왔다.\n'요즘 어때?'\n\n기다린 보람이 있다.",
        choices: [],
        isEnding: true,
        endingGrade: "⭐ 썸 고수",
      },
      {
        id: "s3_call",
        text: "전화했더니 받지 않았다. 나중에 '미안 바빴어'라는 문자가 왔다.\n어색한 분위기가 됐다.",
        choices: [],
        isEnding: true,
        endingGrade: "📱 조금 쫄았지만 OK",
      },
      {
        id: "s4_end_free",
        text: "그냥 이 관계 정리했다. 마음이 훨씬 편하다. 잘했다.",
        choices: [],
        isEnding: true,
        endingGrade: "🌟 나를 지킨 승리",
      },
    ],
  },
  {
    id: "story-hoesik",
    slug: "hoesik-survival",
    title: "회식에서 살아남기",
    subtitle: "오늘도 2차를 피할 수 있을까",
    description: "회식의 갖가지 함정을 피하고 무사히 귀가하라",
    emoji: "🍺",
    color: "#D97706",
    bgColor: "#FFFBEB",
    tags: ["회사", "회식", "술"],
    scenes: [
      {
        id: "s1",
        text: "오늘 팀 회식. 삼겹살집에 왔다.\n팀장이 '오늘 다 같이 마시자~'라며 소주를 따른다.",
        choices: [
          { id: "c1a", text: "적당히 한 잔만 마시고 페이스 조절", nextSceneId: "s2_ok", scoreEffect: 10 },
          { id: "c1b", text: "운전해야 해서 못 마신다고 정중히 거절", nextSceneId: "s2_no", scoreEffect: 15 },
          { id: "c1c", text: "분위기에 맞춰 열심히 마심", nextSceneId: "s2_drink", scoreEffect: 0 },
        ],
      },
      {
        id: "s2_ok",
        text: "1차가 끝나가는데 팀장이 '2차 노래방 어때?'라고 한다.",
        choices: [
          { id: "c2a", text: "'아 저 일찍 들어가야 해서요~' 자연스럽게 빠지기", nextSceneId: "s3_escape", scoreEffect: 15 },
          { id: "c2b", text: "노래방 한 시간만 하고 빠지기로 결정", nextSceneId: "s3_ok", scoreEffect: 5 },
        ],
      },
      {
        id: "s2_no",
        text: "운전 핑계가 통했다. 주스를 마시며 1차를 버텼다.\n팀장이 '2차 가자~'라고 한다.",
        choices: [
          { id: "c2c", text: "'저 차 가지러 가야 해서요' 여기서 빠지기", nextSceneId: "s3_escape", scoreEffect: 20 },
          { id: "c2d", text: "어쩔 수 없이 2차 따라가기", nextSceneId: "s3_ok", scoreEffect: 0 },
        ],
      },
      {
        id: "s2_drink",
        text: "많이 마셨다. 흥이 올라서 좋은데 내일 출근이 걱정된다.\n팀장이 '3차 클럽 어때?'",
        choices: [
          { id: "c2e", text: "여기서 무조건 빠진다", nextSceneId: "s3_escape", scoreEffect: 5 },
          { id: "c2f", text: "그냥 따라간다... 내일은 내일의 내가 처리", nextSceneId: "s3_end_bad", scoreEffect: -20 },
        ],
      },
      {
        id: "s3_escape",
        text: "무사히 귀가 성공! 밤 11시 전에 집에 왔다.\n내일 아침도 상쾌할 것 같다.",
        choices: [],
        isEnding: true,
        endingGrade: "🏠 회식 생존 완료",
      },
      {
        id: "s3_ok",
        text: "2차까지 하고 자정 넘겨서 귀가했다.\n나름 즐거운 회식이었다.",
        choices: [],
        isEnding: true,
        endingGrade: "🌙 밤이 깊은 귀가",
      },
      {
        id: "s3_end_bad",
        text: "다음날 아침 9시. 두통 속에 출근. 회식 생존 실패.",
        choices: [],
        isEnding: true,
        endingGrade: "😵 회식의 희생양",
      },
    ],
  },
  {
    id: "story-kakao",
    slug: "kakao-survival",
    title: "카톡 지뢰 피하기",
    subtitle: "단체 카톡방의 진짜 공포",
    description: "단체방, 가족방, 직장방... 잘못 보내면 폭발하는 카톡 지뢰를 피해라",
    emoji: "💬",
    color: "#FBBF24",
    bgColor: "#FFFBEB",
    tags: ["카톡", "메신저", "직장", "가족"],
    scenes: [
      {
        id: "s1",
        text: "오늘 점심 친구한테 보내려던 '팀장이 또 개소리 ㅋㅋ'를 실수로\n팀 단체방에 보내버렸다.",
        choices: [
          { id: "c1a", text: "3초 안에 삭제", nextSceneId: "s2_delete", scoreEffect: 5 },
          { id: "c1b", text: "패닉 상태... 아무것도 못 하고 멍하니 보고 있음", nextSceneId: "s2_freeze", scoreEffect: -20 },
          { id: "c1c", text: "폰을 던지고 싶다... 일단 자리 피하기", nextSceneId: "s2_hide", scoreEffect: -10 },
        ],
      },
      {
        id: "s2_delete",
        text: "삭제했는데 이미 읽은 사람이 있다.\n팀장이 '방금 뭐 보낸 거예요?'라고 한다.",
        choices: [
          { id: "c2a", text: "'죄송합니다, 잘못 보냈어요' 솔직히 시인", nextSceneId: "s3_honest", scoreEffect: 10 },
          { id: "c2b", text: "'아 다른 방에 보내려던 건데...' 얼버무리기", nextSceneId: "s3_cover", scoreEffect: 0 },
        ],
      },
      {
        id: "s2_freeze",
        text: "이미 5명이 읽었다. 팀장이 이모티콘을 보냈다.\n어색한 침묵이 흐른다.",
        choices: [
          { id: "c2c", text: "'죄송합니다'라고 단체방에 사과 메시지", nextSceneId: "s3_sorry", scoreEffect: 5 },
          { id: "c2d", text: "그냥 아무 말 안 하고 모른 척", nextSceneId: "s3_ignore", scoreEffect: -15 },
        ],
      },
      {
        id: "s2_hide",
        text: "화장실에 5분 있다 나왔더니 단체방에 '???'가 여러 개다.",
        choices: [
          { id: "c2e", text: "'죄송합니다 실수였어요'라고 사과", nextSceneId: "s3_sorry", scoreEffect: 5 },
          { id: "c2f", text: "더 이상한 말 보내서 덮으려 시도", nextSceneId: "s3_worse", scoreEffect: -20 },
        ],
      },
      {
        id: "s3_honest",
        text: "솔직하게 사과했더니 팀장이 '다음엔 조심해요'라고 했다.\n어색하지만 생각보다 별 일 없었다.",
        choices: [],
        isEnding: true,
        endingGrade: "💪 솔직함으로 생존",
      },
      {
        id: "s3_cover",
        text: "얼버무렸는데 팀장이 의심스러운 눈으로 봤다.\n그냥 솔직히 말할 걸 그랬나.",
        choices: [],
        isEnding: true,
        endingGrade: "😅 아슬아슬 생존",
      },
      {
        id: "s3_sorry",
        text: "단체방에 사과했더니 '에이 다들 그런 거 있죠 ㅋㅋ'라는 훈훈한 반응이 왔다.",
        choices: [],
        isEnding: true,
        endingGrade: "🌸 인간적 생존",
      },
      {
        id: "s3_ignore",
        text: "모른 척했더니 분위기가 계속 어색하다. 내일 출근이 두렵다.",
        choices: [],
        isEnding: true,
        endingGrade: "💀 생존 실패",
      },
      {
        id: "s3_worse",
        text: "덮으려다 더 이상한 말을 보냈다. 방이 조용해졌다.",
        choices: [],
        isEnding: true,
        endingGrade: "🔥 최악의 상황",
      },
    ],
  },
  {
    id: "story-nomoney",
    slug: "nomoney-survival",
    title: "돈 안 쓰고 하루 버티기",
    subtitle: "오늘 하루 무지출 챌린지",
    description: "무지출 챌린지! 유혹을 피하고 오늘 하루 한 푼도 안 쓰고 버텨라",
    emoji: "🪙",
    color: "#059669",
    bgColor: "#ECFDF5",
    tags: ["돈", "챌린지", "절약"],
    scenes: [
      {
        id: "s1",
        text: "오늘 무지출 챌린지 1일차.\n아침에 일어나니 편의점 삼각김밥이 먹고 싶다.",
        choices: [
          { id: "c1a", text: "집에 있는 걸로 아침 먹기", nextSceneId: "s2_home", scoreEffect: 20 },
          { id: "c1b", text: "편의점은 잠깐만... 1000원짜리 하나만", nextSceneId: "s2_fail", scoreEffect: -20 },
          { id: "c1c", text: "아침 굶기", nextSceneId: "s2_hungry", scoreEffect: 10 },
        ],
      },
      {
        id: "s2_home",
        text: "집에 남은 라면으로 아침을 해결했다.\n오전 내내 버텼다. 그런데 배달앱 알림이 계속 온다.",
        choices: [
          { id: "c2a", text: "알림 끄고 물 마시기", nextSceneId: "s3_strong", scoreEffect: 15 },
          { id: "c2b", text: "'1만원짜리 하나만...'", nextSceneId: "s3_weak", scoreEffect: -10 },
        ],
      },
      {
        id: "s2_fail",
        text: "편의점에서 1000원만 쓰려다 5000원을 썼다.\n하지만 오늘 하루 이게 끝이라 다짐한다.",
        choices: [
          { id: "c2c", text: "지금이라도 더 이상 안 쓰기", nextSceneId: "s3_recover", scoreEffect: 5 },
          { id: "c2d", text: "어차피 깼으니 마음껏 쓰기", nextSceneId: "s3_end_bad", scoreEffect: -20 },
        ],
      },
      {
        id: "s2_hungry",
        text: "오전에 배가 너무 고프다. 집중이 안 된다.\n점심은 어떻게 할까?",
        choices: [
          { id: "c2e", text: "집에 남은 재료로 직접 요리", nextSceneId: "s3_strong", scoreEffect: 15 },
          { id: "c2f", text: "친구한테 밥 사달라고 애교 부리기", nextSceneId: "s3_friend", scoreEffect: 10 },
        ],
      },
      {
        id: "s3_strong",
        text: "저녁까지 버텼다! 오늘 지출: 0원.\n내 의지력 최고다.",
        choices: [],
        isEnding: true,
        endingGrade: "🏆 무지출 챌린지 완료",
      },
      {
        id: "s3_weak",
        text: "배달앱을 열었다가 15,000원 결제했다.\n오늘 무지출은 실패지만 맛있어서 괜찮다.",
        choices: [],
        isEnding: true,
        endingGrade: "😋 배부른 실패",
      },
      {
        id: "s3_recover",
        text: "5000원 쓰고 나머지 하루는 무지출로 버텼다. 반쯤은 성공.",
        choices: [],
        isEnding: true,
        endingGrade: "🔄 아슬아슬 반성공",
      },
      {
        id: "s3_friend",
        text: "친구가 밥을 사줬다. 내 돈 안 썼으니까 성공 아닌가?",
        choices: [],
        isEnding: true,
        endingGrade: "🤝 친구 덕에 생존",
      },
      {
        id: "s3_end_bad",
        text: "오늘 지출: 43,700원. 내일부터 다시 시작하면 된다.",
        choices: [],
        isEnding: true,
        endingGrade: "💸 다음에 다시",
      },
    ],
  },
];
