// ================================================
// 같이놀기 게임 데이터 (질문 풀, 게임 설정)
// ================================================
import type { TogetherGameConfig, TogetherGameType } from "@/lib/together/types";

// ─── 게임 설정 목록 ───
export const TOGETHER_GAMES: TogetherGameConfig[] = [
  {
    gameType: "image-vote",
    title: "친구 이미지 투표",
    emoji: "🗳️",
    subtitle: "이 방에서 가장 어울리는 사람은?",
    description: "질문을 보고 방 안의 참가자 중 가장 어울리는 사람에게 투표하세요!",
    minPlayers: 3,
    maxPlayers: 8,
    recommendedPlayers: "3~6명",
    estimatedMinutes: 5,
    totalRounds: 5,
    tags: ["투표", "이미지", "파티"],
    isBotSupported: true,
    bgColor: "#FDF2F8",
    gradientFrom: "#EC4899",
    gradientTo: "#F472B6",
  },
  {
    gameType: "balance-room",
    title: "같이 밸런스게임",
    emoji: "⚖️",
    subtitle: "A vs B, 우리 취향은 같을까?",
    description: "밸런스 선택지를 보고 동시에 선택하세요. 다수파와 소수파를 공개합니다!",
    minPlayers: 2,
    maxPlayers: 8,
    recommendedPlayers: "2~6명",
    estimatedMinutes: 5,
    totalRounds: 5,
    tags: ["밸런스", "선택", "파티"],
    isBotSupported: true,
    bgColor: "#EFF6FF",
    gradientFrom: "#3B82F6",
    gradientTo: "#60A5FA",
  },
  {
    gameType: "initial-quiz-room",
    title: "초성퀴즈 대결방",
    emoji: "🔤",
    subtitle: "초성만 보고 맞히면 점수!",
    description: "초성 힌트를 보고 4개 보기 중 정답을 선택하세요. 빨리 맞힐수록 유리!",
    minPlayers: 2,
    maxPlayers: 8,
    recommendedPlayers: "2~8명",
    estimatedMinutes: 8,
    totalRounds: 10,
    tags: ["퀴즈", "초성", "대결"],
    isBotSupported: true,
    bgColor: "#FFF7ED",
    gradientFrom: "#F97316",
    gradientTo: "#FB923C",
  },
  {
    gameType: "compatibility-room",
    title: "친구 궁합방",
    emoji: "💫",
    subtitle: "우리 얼마나 잘 맞을까?",
    description: "5가지 질문에 대한 생각이 얼마나 같은지 비교해요. 최고 궁합 조합을 공개!",
    minPlayers: 2,
    maxPlayers: 6,
    recommendedPlayers: "2~6명",
    estimatedMinutes: 5,
    totalRounds: 5,
    tags: ["궁합", "성격", "비교"],
    isBotSupported: true,
    bgColor: "#EDE9FE",
    gradientFrom: "#7C3AED",
    gradientTo: "#A78BFA",
  },
  {
    gameType: "friend-quiz",
    title: "친구 맞히기 퀴즈",
    emoji: "🤔",
    subtitle: "방장을 얼마나 잘 알아?",
    description: "방장에 관한 질문! 방장의 답변을 예측해서 맞히면 점수를 드립니다.",
    minPlayers: 2,
    maxPlayers: 6,
    recommendedPlayers: "3~6명",
    estimatedMinutes: 5,
    totalRounds: 5,
    tags: ["친구", "퀴즈", "추측"],
    isBotSupported: true,
    bgColor: "#ECFDF5",
    gradientFrom: "#10B981",
    gradientTo: "#34D399",
  },
  {
    gameType: "mission-roulette",
    title: "랜덤 미션 룰렛",
    emoji: "🎰",
    subtitle: "누가 미션에 당첨될까?",
    description: "룰렛을 돌려 참가자 중 한 명에게 재미있는 미션을 부여합니다!",
    minPlayers: 2,
    maxPlayers: 8,
    recommendedPlayers: "3~8명",
    estimatedMinutes: 10,
    totalRounds: 6,
    tags: ["미션", "룰렛", "파티"],
    isBotSupported: true,
    bgColor: "#FFFBEB",
    gradientFrom: "#F59E0B",
    gradientTo: "#FBBF24",
  },
];

export const getGameConfig = (gameType: TogetherGameType): TogetherGameConfig =>
  TOGETHER_GAMES.find((g) => g.gameType === gameType)!;

// ─── 이미지 투표 질문 ───
export const IMAGE_VOTE_QUESTIONS = [
  "이 방에서 제일 돈 잘 벌 것 같은 사람은?",
  "이 방에서 제일 연애 고수 같은 사람은?",
  "이 방에서 제일 몰래 인기 많을 것 같은 사람은?",
  "이 방에서 제일 사업하면 잘할 것 같은 사람은?",
  "이 방에서 제일 감정 숨기는 사람은?",
  "이 방에서 제일 먼저 결혼할 것 같은 사람은?",
  "이 방에서 제일 여행 가면 길 잃을 것 같은 사람은?",
  "이 방에서 제일 단톡방을 조용히 보는 사람은?",
  "이 방에서 제일 의외로 계획적인 사람은?",
  "이 방에서 제일 갑자기 새로운 취미 생길 것 같은 사람은?",
  "이 방에서 제일 좋아하는 영화 장르가 다양할 것 같은 사람은?",
  "이 방에서 제일 침대에서 오래 있을 것 같은 사람은?",
];

// ─── 밸런스게임 선택지 ───
export type BalanceRoomPair = { optionA: string; optionB: string; emoji: string };
export const BALANCE_ROOM_PAIRS: BalanceRoomPair[] = [
  { optionA: "월 500만원 안정 직장", optionB: "월 2000만원 불안정 사업", emoji: "💼" },
  { optionA: "사랑하지만 불안한 연인", optionB: "편하지만 설레지 않는 연인", emoji: "💕" },
  { optionA: "솔직한 상처", optionB: "다정한 거짓말", emoji: "💬" },
  { optionA: "조용한 성공", optionB: "시끌벅적한 성공", emoji: "🏆" },
  { optionA: "먼저 연락하기", optionB: "연락 기다리기", emoji: "📱" },
  { optionA: "기억을 지울 수 있다", optionB: "미래를 볼 수 있다", emoji: "🔮" },
  { optionA: "10년 후 갑자기 50억", optionB: "지금 당장 월 500만원 평생", emoji: "💰" },
  { optionA: "말이 많은 사람과 살기", optionB: "말이 없는 사람과 살기", emoji: "🏡" },
  { optionA: "공감 잘 해주는 친구", optionB: "해결책 잘 찾아주는 친구", emoji: "🤝" },
  { optionA: "완벽하지만 한 번만", optionB: "평범하지만 매일", emoji: "⭐" },
];

// ─── 초성퀴즈 문제 ───
export type QuizQuestion = {
  question: string;
  correctAnswer: string;
  options: string[];
  category: string;
};
export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  { question: "🍚 ㅂㅂ밥", correctAnswer: "비빔밥", options: ["비빔밥", "볶음밥", "버터밥", "보리밥"], category: "음식" },
  { question: "🥣 ㄷㅈ찌개", correctAnswer: "된장찌개", options: ["된장찌개", "두부찌개", "돼지찌개", "도가니탕"], category: "음식" },
  { question: "🥩 ㅅㄱㅅ", correctAnswer: "삼겹살", options: ["삼겹살", "소갈비", "수육볶음", "생선구이"], category: "음식" },
  { question: "🍱 ㄱㅂ", correctAnswer: "김밥", options: ["김밥", "국밥", "갈비탕", "겉절이"], category: "음식" },
  { question: "🍗 ㅊㅋ", correctAnswer: "치킨", options: ["치킨", "청국장", "찹쌀죽", "채끝구이"], category: "음식" },
  { question: "🎵 ㅂㅌㅅㄴㄷ", correctAnswer: "방탄소년단", options: ["방탄소년단", "빅뱅수녀단", "블랙탑신나당", "배틀스타넌대단"], category: "K팝" },
  { question: "🎤 ㅇㅇ (아이)", correctAnswer: "아이유", options: ["아이유", "아이오아이", "에이핑크", "엔하이픈"], category: "K팝" },
  { question: "🎤 ㅂㄱ (불빛)", correctAnswer: "블랙핑크", options: ["블랙핑크", "부기파워", "불꽃걸스", "백광팀"], category: "K팝" },
  { question: "🎬 ㄱㅅ (기생)", correctAnswer: "기생충", options: ["기생충", "기억상실", "강심장", "과속스캔들"], category: "영화" },
  { question: "🎬 ㅂㅈ도시", correctAnswer: "범죄도시", options: ["범죄도시", "불조도시", "봄직도시", "변종도시"], category: "영화" },
  { question: "📺 ㅅㄱ부부", correctAnswer: "사랑이 찾아온다", options: ["사랑이 찾아온다", "신혼부부", "세계부부", "시골귀환부부"], category: "드라마" },
  { question: "📺 ㄱㅇ해요 (결혼)", correctAnswer: "결혼해요", options: ["결혼해요", "기억해요", "같이가요", "긍정해요"], category: "드라마" },
  { question: "💬 ㄱㅅ (요즘 유행어)", correctAnswer: "갓생", options: ["갓생", "금사빠", "가성비", "글쎄요"], category: "MZ 신조어" },
  { question: "💬 ㅂㄷ (열심히 함)", correctAnswer: "불타오름", options: ["불타오름", "바득바득", "별다줄", "분두터워"], category: "MZ 신조어" },
  { question: "☕ ㅅㅂㅋㅅ", correctAnswer: "스타벅스", options: ["스타벅스", "새벽카페소", "소보카페소", "선발커피숍"], category: "브랜드" },
  { question: "🍔 ㄹㄷ (패스트푸드)", correctAnswer: "롯데리아", options: ["롯데리아", "런던데이", "레드리아", "라이더스"], category: "브랜드" },
  { question: "🐶 ㅍㄷ", correctAnswer: "푸들", options: ["푸들", "포식자", "파괴자", "포도달려"], category: "동물" },
  { question: "🐱 ㅍㄹ", correctAnswer: "표범", options: ["표범", "포로", "펭귄류", "퍼즐러"], category: "동물" },
  { question: "🌿 ㅁㄷ레", correctAnswer: "민들레", options: ["민들레", "미더운레", "메달리레", "민달팽이"], category: "자연" },
  { question: "🎉 ㅅㅇ (생일)", correctAnswer: "생일파티", options: ["생일파티", "서울파티", "소원파티", "수업파티"], category: "일상" },
];

// ─── 궁합 질문 ───
export type CompatibilityQuestion = {
  question: string;
  optionA: string;
  optionB: string;
  labelA: string;
  labelB: string;
};
export const COMPATIBILITY_QUESTIONS: CompatibilityQuestion[] = [
  { question: "약속을 잡을 때 어떤 편이야?", optionA: "즉흥이 좋아", optionB: "계획이 좋아", labelA: "즉흥파", labelB: "계획파" },
  { question: "힘들 때 주로 어떻게 해?", optionA: "바로 털어놔", optionB: "혼자 정리해", labelA: "표현파", labelB: "내면파" },
  { question: "돈 쓰는 방식이 어때?", optionA: "지금 즐기는 게 최고", optionB: "미래를 위해 모아야지", labelA: "현재파", labelB: "미래파" },
  { question: "연애에서 뭐가 더 중요해?", optionA: "설렘이 중요해", optionB: "안정감이 중요해", labelA: "설렘파", labelB: "안정파" },
  { question: "친구 관계는 어때?", optionA: "자주 봐야 친해", optionB: "가끔 봐도 괜찮아", labelA: "자주보기파", labelB: "독립파" },
];

// ─── 친구 맞히기 질문 ───
export type FriendQuizQuestion = {
  question: string;
  options: string[];
};
export const FRIEND_QUIZ_QUESTIONS: FriendQuizQuestion[] = [
  { question: "방장이 제일 싫어하는 카톡 답장은?", options: ["ㅇㅇ", "읽씹", "늦은 답장", "이모티콘만"] },
  { question: "방장이 여행 가면 가장 먼저 하는 일은?", options: ["사진 찍기", "카페 찾기", "맛집 검색", "짐 풀기"] },
  { question: "방장이 스트레스 받을 때 하는 행동은?", options: ["폭식", "잠 자기", "쇼핑", "유튜브 정주행"] },
  { question: "방장이 돈이 생기면 가장 먼저 할 일은?", options: ["여행", "저축", "쇼핑", "맛있는 거 먹기"] },
  { question: "방장이 제일 못 참는 사람 유형은?", options: ["지각하는 사람", "말 끊는 사람", "약속 취소하는 사람", "연락 안 되는 사람"] },
  { question: "방장의 최애 음식 카테고리는?", options: ["한식", "중식", "일식", "양식"] },
  { question: "방장이 주로 자는 시간은?", options: ["11시 이전", "12시 전후", "1~2시", "새벽 3시 이후"] },
  { question: "방장이 가장 자주 쓰는 앱은?", options: ["유튜브", "인스타그램", "카카오톡", "틱톡"] },
];

// ─── 미션 룰렛 ───
export const MISSION_ROULETTE_MISSIONS = [
  "가장 최근 저장한 사진 설명하기",
  "방 안 사람 한 명 칭찬하기",
  "10초 동안 아무 말 대잔치",
  "오늘 가장 웃겼던 일 말하기",
  "내가 요즘 빠진 것 말하기",
  "방 안에서 제일 고마운 사람 말하기",
  "지금 기분을 이모지 3개로 표현하기",
  "지금 당장 소원 한 가지 말하기",
  "최근에 가장 잘한 일 자랑하기",
  "나를 한 단어로 표현하면?",
  "요즘 가장 자주 생각나는 것 말하기",
  "지금 이 순간 솔직한 마음 한 마디",
  "오늘 아침에 일어나서 처음 한 일 말하기",
  "내가 다시 태어난다면 꼭 하고 싶은 것",
  "방 안 분위기를 색깔로 표현한다면?",
  "갑자기 100만원이 생기면 오늘 안에 할 일",
  "요즘 가장 많이 듣는 노래 제목 말하기",
  "최근 검색 기록 중 하나 공개하기",
  "지금 바로 연락하고 싶은 사람 유형 말하기",
  "나에게 해주고 싶은 응원 한 마디",
];
