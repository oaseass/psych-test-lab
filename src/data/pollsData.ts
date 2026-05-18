// ================================================
// 투표/설문 데이터 (localStorage 기반)
// ================================================

export type PollOption = {
  id: string;
  text: string;
  emoji?: string;
  seedVotes: number; // 초기 표 시드값 (실제 투표는 localStorage에 누적)
};

export type PollData = {
  id: string;
  slug: string;
  question: string;
  description?: string;
  category: string;
  emoji: string;
  color: string;
  bgColor: string;
  options: PollOption[];
  tags: string[];
  isHot?: boolean;
  isNew?: boolean;
};

export const pollList: PollData[] = [
  {
    id: "poll-01",
    slug: "namnyeo-chingu",
    question: "남녀 사이 진짜 우정이 가능할까?",
    description: "이성 친구가 가능하다고 생각하시나요?",
    category: "인간관계",
    emoji: "👫",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    isHot: true,
    tags: ["관계", "인기"],
    options: [
      { id: "o1", text: "가능하다 — 순수한 우정도 있다", emoji: "✅", seedVotes: 3200 },
      { id: "o2", text: "불가능하다 — 어느 한쪽은 설렌다", emoji: "❌", seedVotes: 4800 },
      { id: "o3", text: "상황에 따라 다르다", emoji: "🤔", seedVotes: 2100 },
    ],
  },
  {
    id: "poll-02",
    slug: "date-money",
    question: "데이트 비용은 어떻게 해야 할까?",
    description: "커플의 데이트 비용 부담에 대해 어떻게 생각하나요?",
    category: "연애",
    emoji: "💸",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    isHot: true,
    tags: ["연애", "인기"],
    options: [
      { id: "o1", text: "더치페이 (5:5 절반)", emoji: "⚖️", seedVotes: 2800 },
      { id: "o2", text: "남자가 더 내야 한다", emoji: "👨", seedVotes: 1900 },
      { id: "o3", text: "벌이 많은 쪽이 더 내면 된다", emoji: "💰", seedVotes: 3400 },
      { id: "o4", text: "그때그때 다르게 (번갈아가며)", emoji: "🔄", seedVotes: 2100 },
    ],
  },
  {
    id: "poll-03",
    slug: "worst-coworker",
    question: "직장에서 가장 참기 힘든 동료 유형은?",
    description: "함께 일하기 가장 힘든 유형을 골라주세요",
    category: "직장",
    emoji: "😤",
    color: "#374151",
    bgColor: "#F9FAFB",
    isHot: true,
    tags: ["직장", "공감", "인기"],
    options: [
      { id: "o1", text: "내 아이디어 가로채는 사람", emoji: "🥷", seedVotes: 4100 },
      { id: "o2", text: "업무 넘기는 사람", emoji: "📋", seedVotes: 3700 },
      { id: "o3", text: "눈치 없는 회식 강요", emoji: "🍺", seedVotes: 2900 },
      { id: "o4", text: "퇴근 후 카톡하는 상사", emoji: "📱", seedVotes: 5200 },
    ],
  },
  {
    id: "poll-04",
    slug: "kakao-style",
    question: "가장 싫은 카톡 말투는?",
    description: "이런 말투 받으면 진짜 짜증나는 유형은?",
    category: "인간관계",
    emoji: "📱",
    color: "#EAB308",
    bgColor: "#FEFCE8",
    tags: ["카톡", "말투", "공감"],
    options: [
      { id: "o1", text: "\"ㅇㅇ\" 단답 (읽었는데 그냥 ㅇㅇ)", emoji: "😑", seedVotes: 3800 },
      { id: "o2", text: "마침표 찍는 말투 (\"알겠어.\")", emoji: "❄️", seedVotes: 2600 },
      { id: "o3", text: "메시지 폭격 (한 줄씩 20개)", emoji: "💥", seedVotes: 3100 },
      { id: "o4", text: "공격적 물음표 (\"왜요???\")", emoji: "❓", seedVotes: 2200 },
    ],
  },
  {
    id: "poll-05",
    slug: "friend-cutoff-reason",
    question: "친구 관계를 끊게 되는 결정적 이유는?",
    description: "어떤 상황에서 손절을 결심하게 될까요?",
    category: "인간관계",
    emoji: "✂️",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    tags: ["친구", "관계", "공감"],
    options: [
      { id: "o1", text: "뒷담화 (앞에서는 친한 척)", emoji: "🗡️", seedVotes: 4500 },
      { id: "o2", text: "빌린 돈 안 갚음", emoji: "💸", seedVotes: 3800 },
      { id: "o3", text: "내 비밀 폭로", emoji: "🗣️", seedVotes: 3200 },
      { id: "o4", text: "내 연인에게 관심", emoji: "💔", seedVotes: 2900 },
    ],
  },
  {
    id: "poll-06",
    slug: "premarriage-cohabit",
    question: "결혼 전 동거, 어떻게 생각하세요?",
    description: "결혼 전 같이 사는 것에 대해 어떻게 생각하시나요?",
    category: "연애",
    emoji: "🏠",
    color: "#059669",
    bgColor: "#ECFDF5",
    tags: ["결혼", "동거"],
    options: [
      { id: "o1", text: "찬성 — 서로 맞는지 알아야 한다", emoji: "✅", seedVotes: 3900 },
      { id: "o2", text: "반대 — 결혼 후에 해야 한다", emoji: "❌", seedVotes: 2100 },
      { id: "o3", text: "중립 — 개인 선택이다", emoji: "🤷", seedVotes: 2800 },
    ],
  },
  {
    id: "poll-07",
    slug: "introvert-vs-extrovert",
    question: "나는 내향인인가, 외향인인가?",
    description: "스스로 어느 쪽이라고 느끼시나요?",
    category: "성격",
    emoji: "🧠",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    tags: ["성격", "내향", "외향"],
    options: [
      { id: "o1", text: "확실한 내향인 (혼자가 편함)", emoji: "🙋‍♀️", seedVotes: 3500 },
      { id: "o2", text: "약간 내향인", emoji: "😌", seedVotes: 2900 },
      { id: "o3", text: "약간 외향인", emoji: "😊", seedVotes: 2400 },
      { id: "o4", text: "확실한 외향인 (사람이 충전됨)", emoji: "🎉", seedVotes: 1800 },
    ],
  },
  {
    id: "poll-08",
    slug: "work-meeting",
    question: "가장 싫은 회사 상황은?",
    description: "직장인이라면 공감하는 최악의 상황!",
    category: "직장",
    emoji: "💼",
    color: "#374151",
    bgColor: "#F9FAFB",
    isNew: true,
    tags: ["직장", "공감"],
    options: [
      { id: "o1", text: "퇴근 직전 갑작스러운 야근 요청", emoji: "😱", seedVotes: 6100 },
      { id: "o2", text: "내용 없는 2시간 회의", emoji: "😴", seedVotes: 4200 },
      { id: "o3", text: "주말에 오는 업무 카톡", emoji: "📱", seedVotes: 5300 },
      { id: "o4", text: "이유 없이 미뤄진 연봉 협상", emoji: "💸", seedVotes: 3800 },
    ],
  },
  {
    id: "poll-09",
    slug: "morning-vs-night",
    question: "아침형 인간 vs 저녁형 인간",
    description: "자연스럽게 나는 어느 쪽에 가깝나요?",
    category: "생활",
    emoji: "☀️",
    color: "#F97316",
    bgColor: "#FFF7ED",
    tags: ["생활", "습관"],
    options: [
      { id: "o1", text: "일찍 일어나는 아침형", emoji: "🌅", seedVotes: 2300 },
      { id: "o2", text: "밤에 활동적인 저녁형", emoji: "🌙", seedVotes: 4600 },
      { id: "o3", text: "강제로 아침형 (사실 저녁형)", emoji: "😫", seedVotes: 3100 },
    ],
  },
  {
    id: "poll-10",
    slug: "money-priority",
    question: "돈이 생기면 제일 먼저 하고 싶은 것은?",
    description: "100만원이 갑자기 생긴다면?",
    category: "돈",
    emoji: "💰",
    color: "#059669",
    bgColor: "#ECFDF5",
    isNew: true,
    tags: ["돈", "소비"],
    options: [
      { id: "o1", text: "여행 (국내/해외)", emoji: "✈️", seedVotes: 3700 },
      { id: "o2", text: "저축/투자", emoji: "📈", seedVotes: 2900 },
      { id: "o3", text: "맛있는 것 먹기", emoji: "🍜", seedVotes: 2100 },
      { id: "o4", text: "쇼핑 (옷/신발/전자기기)", emoji: "🛍️", seedVotes: 3300 },
      { id: "o5", text: "부모님께 드리기", emoji: "👨‍👩‍👧", seedVotes: 1800 },
    ],
  },
  {
    id: "poll-11",
    slug: "alone-vs-together",
    question: "혼자 vs 같이, 어느 쪽이 더 편한가요?",
    description: "대부분의 상황에서 어느 쪽이 더 편안한가요?",
    category: "생활",
    emoji: "🙋",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    tags: ["생활", "성격"],
    options: [
      { id: "o1", text: "혼자가 더 편함 (자유로움)", emoji: "🦅", seedVotes: 3900 },
      { id: "o2", text: "같이가 더 편함 (에너지 충전)", emoji: "🫂", seedVotes: 2100 },
      { id: "o3", text: "상황마다 다름", emoji: "⚖️", seedVotes: 4200 },
    ],
  },
  {
    id: "poll-12",
    slug: "confession-timing",
    question: "고백은 언제 하는 게 좋을까?",
    description: "썸에서 고백 타이밍에 대해 어떻게 생각하세요?",
    category: "연애",
    emoji: "💌",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    isNew: true,
    tags: ["연애", "고백"],
    options: [
      { id: "o1", text: "느낌 오면 바로 고백", emoji: "⚡", seedVotes: 2400 },
      { id: "o2", text: "3개월 정도 썸 유지 후", emoji: "📅", seedVotes: 3100 },
      { id: "o3", text: "상대방이 먼저 해주길 기다림", emoji: "😏", seedVotes: 2800 },
      { id: "o4", text: "분위기 되면 그때 자연스럽게", emoji: "🌸", seedVotes: 3500 },
    ],
  },
  {
    id: "poll-13",
    slug: "stressrelief",
    question: "스트레스 해소 방법은?",
    description: "스트레스 받을 때 주로 어떻게 푸시나요?",
    category: "생활",
    emoji: "😤",
    color: "#EF4444",
    bgColor: "#FEF2F2",
    tags: ["스트레스", "생활"],
    options: [
      { id: "o1", text: "맛있는 것 먹기", emoji: "🍜", seedVotes: 4800 },
      { id: "o2", text: "잠자기", emoji: "😴", seedVotes: 3900 },
      { id: "o3", text: "운동하기", emoji: "💪", seedVotes: 2100 },
      { id: "o4", text: "드라마/영화 보기", emoji: "📺", seedVotes: 3500 },
      { id: "o5", text: "친구들 만나기", emoji: "👫", seedVotes: 2300 },
    ],
  },
  {
    id: "poll-14",
    slug: "ideal-weekend",
    question: "이상적인 주말은?",
    description: "아무 계획 없는 주말, 가장 행복한 상태는?",
    category: "생활",
    emoji: "🛋️",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    isNew: true,
    tags: ["주말", "생활"],
    options: [
      { id: "o1", text: "집에서 유튜브/넷플릭스 (누워서)", emoji: "🛋️", seedVotes: 5200 },
      { id: "o2", text: "카페나 브런치 즐기기", emoji: "☕", seedVotes: 2900 },
      { id: "o3", text: "친구/연인 만나기", emoji: "👫", seedVotes: 2400 },
      { id: "o4", text: "운동하거나 산책", emoji: "🏃", seedVotes: 1800 },
      { id: "o5", text: "여행 (당일 혹은 1박 2일)", emoji: "✈️", seedVotes: 1600 },
    ],
  },
  {
    id: "poll-15",
    slug: "marriage-age",
    question: "결혼은 언제 하는 게 이상적일까?",
    description: "결혼 시기에 대한 솔직한 생각은?",
    category: "연애",
    emoji: "💍",
    color: "#0891B2",
    bgColor: "#ECFEFF",
    tags: ["결혼", "나이"],
    options: [
      { id: "o1", text: "20대 후반 (27~29세)", emoji: "🌸", seedVotes: 2800 },
      { id: "o2", text: "30대 초반 (30~33세)", emoji: "🌟", seedVotes: 4100 },
      { id: "o3", text: "30대 중반 (34~36세)", emoji: "⭐", seedVotes: 2600 },
      { id: "o4", text: "때가 되면 자연스럽게", emoji: "🌊", seedVotes: 3900 },
      { id: "o5", text: "결혼 안 해도 된다", emoji: "🙋", seedVotes: 2200 },
    ],
  },
];

export function getPollBySlug(slug: string): PollData | undefined {
  return pollList.find((p) => p.slug === slug);
}

export function getHotPolls(): PollData[] {
  return pollList.filter((p) => p.isHot);
}

export function getNewPolls(): PollData[] {
  return pollList.filter((p) => p.isNew);
}

// localStorage 키
export const POLL_VOTES_KEY = "psych_poll_votes";
export const POLL_VOTED_KEY = "psych_poll_voted";

export type PollVoteData = {
  [pollId: string]: {
    [optionId: string]: number;
  };
};

export type PollVotedData = {
  [pollId: string]: string; // optionId that was voted
};
