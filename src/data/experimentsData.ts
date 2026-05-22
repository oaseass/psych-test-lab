// ================================================
// 웹실험 메타 데이터
// ================================================

export type ExperimentData = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  gradient: string;
  tags: string[];
  estimatedMinutes: number;
  isFeatured: boolean;
  isNew: boolean;
  isHot: boolean;
  qualityTier: "polished" | "normal" | "prototype";
};

export const experimentsList: ExperimentData[] = [
  {
    id: "exp-spend-money",
    slug: "spend-money",
    title: "돈쓰기 시뮬레이터",
    subtitle: "1억, 10억, 100억 다 써봐",
    description: "가상의 큰돈을 받아 다양한 물건을 사면서 남은 돈을 확인하는 시뮬레이터. 실제 돈이라면 뭘 살 것 같아?",
    emoji: "💸",
    color: "#059669",
    bgColor: "#ECFDF5",
    gradient: "linear-gradient(135deg, #059669, #34D399)",
    tags: ["돈", "시뮬레이터", "재미", "가상"],
    estimatedMinutes: 3,
    isFeatured: true,
    isNew: false,
    isHot: true,
    qualityTier: "polished",
  },
  {
    id: "exp-password-hell",
    slug: "password-hell",
    title: "비밀번호 지옥 챌린지",
    subtitle: "이 정도면 회원가입 포기합니다",
    description: "계속 늘어나는 이상한 비밀번호 조건을 모두 만족시켜야 하는 챌린지. 몇 단계까지 버틸 수 있을까?",
    emoji: "🔐",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    gradient: "linear-gradient(135deg, #DC2626, #F87171)",
    tags: ["챌린지", "퀴즈", "비밀번호", "인터넷"],
    estimatedMinutes: 5,
    isFeatured: true,
    isNew: false,
    isHot: true,
    qualityTier: "polished",
  },
  {
    id: "exp-world-trip",
    slug: "world-trip",
    title: "세계 랜덤 여행",
    subtitle: "힌트 3개로 나라 맞히기",
    description: "랜덤 도시/국가 카드를 보고 어디인지 맞히는 지리 퀴즈 놀이. 힌트를 보고 객관식으로 선택.",
    emoji: "✈️",
    color: "#0284C7",
    bgColor: "#F0F9FF",
    gradient: "linear-gradient(135deg, #0284C7, #38BDF8)",
    tags: ["세계", "지리", "퀴즈", "여행"],
    estimatedMinutes: 5,
    isFeatured: true,
    isNew: true,
    isHot: false,
    qualityTier: "polished",
  },
  {
    id: "exp-window-view",
    slug: "window-view",
    title: "랜덤 창밖 구경",
    subtitle: "지금 이 창밖엔 어떤 풍경이 있을까",
    description: "비 오는 도시, 새벽 골목, 바닷가, 눈 오는 거리... CSS로 만든 감성 창밖 풍경 감상",
    emoji: "🪟",
    color: "#64748B",
    bgColor: "#F8FAFC",
    gradient: "linear-gradient(135deg, #475569, #94A3B8)",
    tags: ["감성", "힐링", "구경", "창밖"],
    estimatedMinutes: 3,
    isFeatured: false,
    isNew: true,
    isHot: false,
    qualityTier: "polished",
  },
  {
    id: "exp-radio-roulette",
    slug: "radio-roulette",
    title: "세계 라디오 룰렛",
    subtitle: "지금 이 나라 라디오엔 뭐가 나올까",
    description: "랜덤 국가 카드와 그 나라의 음악 분위기를 카드로 탐험하는 감성 실험. (카드형 컨셉)",
    emoji: "📻",
    color: "#D97706",
    bgColor: "#FFFBEB",
    gradient: "linear-gradient(135deg, #D97706, #FCD34D)",
    tags: ["라디오", "세계", "음악", "감성"],
    estimatedMinutes: 3,
    isFeatured: false,
    isNew: true,
    isHot: false,
    qualityTier: "normal",
  },
  {
    id: "exp-internet-museum",
    slug: "internet-museum",
    title: "인터넷 박물관",
    subtitle: "2000년대 인터넷 감성 소환",
    description: "싸이월드, 버디버디, 네이트온... 추억의 인터넷 감성을 카드로 되살리는 나만의 박물관",
    emoji: "🖥️",
    color: "#4F46E5",
    bgColor: "#EEF2FF",
    gradient: "linear-gradient(135deg, #4F46E5, #818CF8)",
    tags: ["추억", "2000년대", "인터넷", "향수"],
    estimatedMinutes: 5,
    isFeatured: true,
    isNew: true,
    isHot: false,
    qualityTier: "polished",
  },
  {
    id: "exp-price-guess",
    slug: "price-guess",
    title: "가격 맞히기",
    subtitle: "둘 중 뭐가 더 비쌀까?",
    description: "편의점 음식부터 명품까지, 둘 중 더 비싼 것을 맞히는 게임. 연속 정답으로 점수를 쌓아봐.",
    emoji: "💰",
    color: "#047857",
    bgColor: "#ECFDF5",
    gradient: "linear-gradient(135deg, #047857, #10B981)",
    tags: ["가격", "퀴즈", "돈", "상식"],
    estimatedMinutes: 3,
    isFeatured: true,
    isNew: false,
    isHot: true,
    qualityTier: "polished",
  },
  {
    id: "exp-ranking-guess",
    slug: "ranking-guess",
    title: "순위 맞히기",
    subtitle: "뭐가 더 인기 있을까?",
    description: "뭐가 더 많이 검색될지, 더 많이 팔릴지, 더 인기 있을지 맞히는 게임.",
    emoji: "📊",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    gradient: "linear-gradient(135deg, #7C3AED, #A78BFA)",
    tags: ["순위", "퀴즈", "인기", "상식"],
    estimatedMinutes: 3,
    isFeatured: false,
    isNew: true,
    isHot: false,
    qualityTier: "normal",
  },
];
