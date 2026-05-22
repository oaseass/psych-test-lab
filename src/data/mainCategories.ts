// ================================================
// 심심풀이 연구소 — 최상위 카테고리 체계
// ================================================

export type MainCategory = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  color: string;
  gradient: string;
  priority: number;
};

export const mainCategories: MainCategory[] = [
  {
    id: "cat-daily",
    slug: "daily",
    name: "오늘의 놀이",
    shortName: "오늘",
    description: "매일 바뀌는 추천 테스트·퀴즈·게임·랜덤놀이",
    icon: "🎯",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #EC4899)",
    priority: 1,
  },
  {
    id: "cat-tests",
    slug: "tests",
    name: "심리/성향 테스트",
    shortName: "테스트",
    description: "심리테스트, MBTI형, IQ형, EQ형, 혈액형, 애착유형, 자존감, 연애성향",
    icon: "🧠",
    color: "#EC4899",
    gradient: "linear-gradient(135deg, #EC4899, #F9A8D4)",
    priority: 2,
  },
  {
    id: "cat-quizzes",
    slug: "quizzes",
    name: "퀴즈/퍼즐",
    shortName: "퀴즈",
    description: "초성퀴즈, 넌센스퀴즈, 상식퀴즈, 단어묶기, 오늘의 단어추리",
    icon: "🔤",
    color: "#2563EB",
    gradient: "linear-gradient(135deg, #2563EB, #60A5FA)",
    priority: 3,
  },
  {
    id: "cat-choices",
    slug: "choices",
    name: "월드컵/선택게임",
    shortName: "월드컵",
    description: "이상형 월드컵, 음식 월드컵, 밸런스게임, 선택형 취향게임",
    icon: "🏆",
    color: "#EA580C",
    gradient: "linear-gradient(135deg, #EA580C, #FB923C)",
    priority: 4,
  },
  {
    id: "cat-brain",
    slug: "brain",
    name: "두뇌/관찰력 게임",
    shortName: "두뇌게임",
    description: "틀린그림 찾기, 기억력, 반응속도, 관찰력, 색감, 타자속도",
    icon: "🔍",
    color: "#059669",
    gradient: "linear-gradient(135deg, #059669, #34D399)",
    priority: 5,
  },
  {
    id: "cat-together",
    slug: "together",
    name: "같이놀기",
    shortName: "같이",
    description: "방 만들고 링크 공유하면 친구랑 바로 시작. 혼자라면 AI 연습방도 있어요.",
    icon: "👥",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    priority: 6,
  },
  {
    id: "cat-generators",
    slug: "generators",
    name: "랜덤/생성기",
    shortName: "생성기",
    description: "이름/생일 생성기, 짤 제목 생성기, 랜덤 미션, 랜덤 결과 카드",
    icon: "✨",
    color: "#0891B2",
    gradient: "linear-gradient(135deg, #0891B2, #22D3EE)",
    priority: 7,
  },
  {
    id: "cat-experiments",
    slug: "experiments",
    name: "웹실험",
    shortName: "웹실험",
    description: "돈쓰기 시뮬레이터, 비밀번호 지옥, 무한조합, 가격맞히기, 순위맞히기",
    icon: "⚗️",
    color: "#1F2937",
    gradient: "linear-gradient(135deg, #1F2937, #374151)",
    priority: 8,
  },
  {
    id: "cat-explore",
    slug: "explore",
    name: "여행/탐험/구경",
    shortName: "탐험",
    description: "세계 랜덤 여행, 랜덤 창밖 구경, 세계 라디오 룰렛, 랜덤 잡지식",
    icon: "🌍",
    color: "#0284C7",
    gradient: "linear-gradient(135deg, #0284C7, #38BDF8)",
    priority: 9,
  },
  {
    id: "cat-community",
    slug: "community",
    name: "투표/랭킹/커뮤니티",
    shortName: "투표",
    description: "오늘의 투표, 실시간 선택비율, 인기 랭킹, 계급 랭킹",
    icon: "🗳️",
    color: "#D97706",
    gradient: "linear-gradient(135deg, #D97706, #FCD34D)",
    priority: 10,
  },
  {
    id: "cat-lucky",
    slug: "lucky",
    name: "럭키존",
    shortName: "럭키",
    description: "회원 전용 내부 포인트 운빨 게임 — 현금·상품 교환 불가",
    icon: "🍀",
    color: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    priority: 11,
  },
];

export function getCategoryBySlug(slug: string): MainCategory | undefined {
  return mainCategories.find((c) => c.slug === slug);
}
