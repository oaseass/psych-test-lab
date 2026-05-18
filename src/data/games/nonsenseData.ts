// ================================================
// 넌센스 퀴즈 데이터
// ================================================

export type NonsenseQuestion = {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  emoji: string;
  category: "아재개그" | "말장난" | "반전" | "상식반전" | "수수께끼";
};

export type NonsenseSet = {
  id: string;
  slug: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  questions: NonsenseQuestion[];
  tags: string[];
  isFeatured?: boolean;
  playCount?: number;
};

export const nonsenseSets: NonsenseSet[] = [
  {
    id: "ns-01",
    slug: "classic",
    title: "클래식 넌센스 퀴즈",
    description: "맞히면 기쁘고, 틀리면 더 웃긴 넌센스!",
    emoji: "🤣",
    color: "#F97316",
    bgColor: "#FFF7ED",
    isFeatured: true,
    playCount: 48000,
    tags: ["넌센스", "인기", "아재개그"],
    questions: [
      {
        id: "q1",
        question: "세상에서 제일 빠른 닭은?",
        answer: "후다닥",
        explanation: "'후다닭'이 빨리 달리면 '후다닥'이 되기 때문!",
        emoji: "🐔",
        category: "아재개그",
      },
      {
        id: "q2",
        question: "냉장고 안에서 싸우면?",
        answer: "냉전",
        explanation: "냉장고(냉) + 전쟁(전) = 냉전!",
        emoji: "❄️",
        category: "말장난",
      },
      {
        id: "q3",
        question: "세상에서 제일 무거운 알파벳은?",
        answer: "W (더블유)",
        explanation: "'더블유' = '더블' 로 두 배 무겁기 때문!",
        emoji: "⚖️",
        category: "말장난",
      },
      {
        id: "q4",
        question: "소가 없는 목장은?",
        answer: "가장 (장만 남음)",
        explanation: "목장에서 '소'를 빼면 '목+장'에서 '목'이 남고... 결국 그냥 '장'",
        emoji: "🐄",
        category: "아재개그",
      },
      {
        id: "q5",
        question: "참새가 전봇대에 앉으면?",
        answer: "전참새",
        explanation: "전봇대(전) + 참새 = 전참새!",
        emoji: "🐦",
        category: "말장난",
      },
      {
        id: "q6",
        question: "떡볶이를 먹으면 어떻게 될까?",
        answer: "떡보가 된다",
        explanation: "떡볶이를 먹으면 살이 쪄서 '떡보'가 되기 때문!",
        emoji: "🌶️",
        category: "아재개그",
      },
      {
        id: "q7",
        question: "방귀를 왜 방귀라고 할까?",
        answer: "방에서 귀를 막아야 하니까",
        explanation: "방(房)에서 귀(耳)를 막아야 하는 상황!",
        emoji: "💨",
        category: "말장난",
      },
      {
        id: "q8",
        question: "세상에서 제일 단단한 것은?",
        answer: "흑심",
        explanation: "다이아몬드보다 단단한 건 사람의 '흑심(검은 마음)'!",
        emoji: "💎",
        category: "반전",
      },
      {
        id: "q9",
        question: "영어로 말해도 변하지 않는 나라는?",
        answer: "아이슬란드 (Iceland는 '얼음의 나라'지만 실제로는 초록 섬)",
        explanation: "그린란드와 아이슬란드의 이름 바뀜 반전!",
        emoji: "🌍",
        category: "상식반전",
      },
      {
        id: "q10",
        question: "개가 웃으면?",
        answer: "개그",
        explanation: "개 + 웃음(Giggle의 g) = 개그(Gag)!",
        emoji: "🐶",
        category: "말장난",
      },
    ],
  },
  {
    id: "ns-02",
    slug: "workplace",
    title: "직장인 넌센스 퀴즈",
    description: "직장 생활하면 공감 100% 넌센스!",
    emoji: "💼",
    color: "#374151",
    bgColor: "#F9FAFB",
    isFeatured: true,
    playCount: 31000,
    tags: ["직장", "공감", "넌센스"],
    questions: [
      {
        id: "q1",
        question: "회사에서 커피가 맛없어도 마시는 이유는?",
        answer: "커피 = 눈 뜨는 데 필요한 연료",
        explanation: "출근길 커피 한 잔은 살아남기 위한 것!",
        emoji: "☕",
        category: "반전",
      },
      {
        id: "q2",
        question: "월요병을 고치는 방법은?",
        answer: "금요일",
        explanation: "월요병은 금요일이 오면 자연 치유됨!",
        emoji: "📅",
        category: "반전",
      },
      {
        id: "q3",
        question: "직장인이 제일 기다리는 날은?",
        answer: "급여일",
        explanation: "이건 굳이 설명 안 해도 다 안다!",
        emoji: "💰",
        category: "상식반전",
      },
      {
        id: "q4",
        question: "상사가 말하는 '잠깐'은 얼마나 긴가?",
        answer: "적어도 30분",
        explanation: "'잠깐 얘기 좀 해요'는 인생 최장의 '잠깐'",
        emoji: "⏰",
        category: "반전",
      },
      {
        id: "q5",
        question: "회사에서 투명인간이 될 수 있을 때는?",
        answer: "야근하자고 할 때",
        explanation: "갑자기 눈에 안 띄는 마법 발동!",
        emoji: "👻",
        category: "반전",
      },
      {
        id: "q6",
        question: "직장인이 가장 좋아하는 회의는?",
        answer: "취소된 회의",
        explanation: "회의를 좋아하는 직장인은 없다!",
        emoji: "🚫",
        category: "반전",
      },
      {
        id: "q7",
        question: "회사에서 친절한 상사란?",
        answer: "전설의 존재",
        explanation: "영화에서나 볼 수 있는 희귀종!",
        emoji: "🦄",
        category: "반전",
      },
      {
        id: "q8",
        question: "직장인이 가장 많이 쓰는 거짓말은?",
        answer: "곧 퇴사할 거야",
        explanation: "3년째 하는 말...",
        emoji: "🤥",
        category: "반전",
      },
      {
        id: "q9",
        question: "회식을 한 단어로?",
        answer: "강제 야외활동",
        explanation: "참석 안 하면 분위기 이상해지는 그것",
        emoji: "🍺",
        category: "반전",
      },
      {
        id: "q10",
        question: "워라밸의 진짜 뜻은?",
        answer: "Work까지만 하고 싶다",
        explanation: "균형이 아니라 일을 줄이고 싶다는 뜻!",
        emoji: "⚖️",
        category: "반전",
      },
    ],
  },
  {
    id: "ns-03",
    slug: "love",
    title: "연애 넌센스 퀴즈",
    description: "연애하면 공감되는 말도 안 되는 퀴즈!",
    emoji: "💕",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    playCount: 27000,
    tags: ["연애", "공감", "넌센스"],
    questions: [
      {
        id: "q1",
        question: "썸남/썸녀가 연락이 없을 때 심장이 빠른 이유는?",
        answer: "불안이 산소 역할을 함",
        explanation: "공황 증상이지만 설레는 것처럼 느껴지는 마법",
        emoji: "💓",
        category: "반전",
      },
      {
        id: "q2",
        question: "사귀기 전에 제일 예쁘고 멋있어 보이는 이유는?",
        answer: "아직 실망을 못 봐서",
        explanation: "사귀면 현실이 보인다...",
        emoji: "🌹",
        category: "반전",
      },
      {
        id: "q3",
        question: "연인에게 '괜찮아'라는 말의 진짜 뜻은?",
        answer: "안 괜찮아",
        explanation: "괜찮다고 하면 절대 괜찮은 게 아님!",
        emoji: "😶",
        category: "상식반전",
      },
      {
        id: "q4",
        question: "연인이 '밥 먹었어?'를 보내는 이유는?",
        answer: "보고 싶어서",
        explanation: "할 말이 없어도 연락하고 싶은 마음",
        emoji: "🍚",
        category: "반전",
      },
      {
        id: "q5",
        question: "'뭐해?'의 진짜 의미는?",
        answer: "'나 심심해, 보고 싶어'",
        explanation: "뭐하는지 궁금한 게 아니라 연락이 하고 싶은 것",
        emoji: "📱",
        category: "반전",
      },
      {
        id: "q6",
        question: "연인과 싸운 후 먼저 연락하는 사람은?",
        answer: "더 좋아하는 사람",
        explanation: "참다 참다 먼저 카톡 보내는 그 사람...",
        emoji: "💬",
        category: "반전",
      },
      {
        id: "q7",
        question: "사진 찍을 때 '아무거나'를 고르면?",
        answer: "틀렸음",
        explanation: "아무거나는 없다. 원하는 게 있다.",
        emoji: "📸",
        category: "반전",
      },
      {
        id: "q8",
        question: "고백은 언제 하는 게 성공률이 높을까?",
        answer: "이미 분위기 됐을 때",
        explanation: "고백의 성공률은 타이밍이 90%",
        emoji: "💌",
        category: "상식반전",
      },
      {
        id: "q9",
        question: "헤어진 후 '잘 지내지?'의 진짜 의미는?",
        answer: "나 생각나?",
        explanation: "안부가 아니라 자기 확인",
        emoji: "📞",
        category: "반전",
      },
      {
        id: "q10",
        question: "연인에게 '먼저 자'라는 말의 실제 뜻은?",
        answer: "나 먼저 자줘 (그냥 자긴 싫어)",
        explanation: "먼저 자라고 하면서 아직 연락을 기다리는 것",
        emoji: "😴",
        category: "반전",
      },
    ],
  },
  {
    id: "ns-04",
    slug: "five-second",
    title: "5초 안에 맞히는 퀴즈",
    description: "생각하면 틀리고 즉각 답하면 맞는 반전 퀴즈!",
    emoji: "⏱️",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    isFeatured: true,
    playCount: 35000,
    tags: ["반전", "순발력", "인기"],
    questions: [
      {
        id: "q1",
        question: "1000에 1000을 더하면?",
        answer: "2000",
        explanation: "그냥 더하면 2000! 어렵게 생각하지 마세요.",
        emoji: "🔢",
        category: "상식반전",
      },
      {
        id: "q2",
        question: "빨간 집은 빨간 벽돌, 파란 집은 파란 벽돌. 초록 집은?",
        answer: "초록 집 (초록 벽돌)",
        explanation: "그냥 초록 벽돌이에요. 생각하면 딴 데 감!",
        emoji: "🏠",
        category: "상식반전",
      },
      {
        id: "q3",
        question: "소는 몇 발짝 자나요?",
        answer: "소는 걸음이지 자를 잡지 않아요",
        explanation: "소가 '자'는 잠을 잔다는 게 아니라 측정 단위 '자'!",
        emoji: "🐄",
        category: "수수께끼",
      },
      {
        id: "q4",
        question: "어떤 방에 들어갈 수 없을까?",
        answer: "방귀 (방+귀, 들어갈 수 없는 방)",
        explanation: "방귀는 방이지만 들어갈 수 없어요!",
        emoji: "🚪",
        category: "말장난",
      },
      {
        id: "q5",
        question: "2+2는 얼마? 4+4는? 8+8은? 16+16은?",
        answer: "32 (각각 4, 8, 16, 32)",
        explanation: "계속 더하다 보면 '32'가 됩니다!",
        emoji: "➕",
        category: "상식반전",
      },
      {
        id: "q6",
        question: "하늘은 왜 파란가요?",
        answer: "빛의 산란 (레일리 산란) 때문",
        explanation: "파장이 짧은 파란빛이 대기에서 더 많이 산란됩니다",
        emoji: "🌤️",
        category: "상식반전",
      },
      {
        id: "q7",
        question: "이건 모든 사람 위에 있고, 아래에도 있어요. 무엇인가요?",
        answer: "이름 (이름이 위에도 아래에도 올 수 있음)",
        explanation: "이름 위에 하늘, 이름 아래 땅처럼 어디서나 이름은 존재!",
        emoji: "📛",
        category: "수수께끼",
      },
      {
        id: "q8",
        question: "달리기를 잘하는 채소는?",
        answer: "달리아 (달려 + 아 → 달리아)",
        explanation: "꽃 이름이지만 '달리다'와 연결되는 말장난!",
        emoji: "🌸",
        category: "아재개그",
      },
      {
        id: "q9",
        question: "세상에서 제일 빠른 것은?",
        answer: "빛 (광속)",
        explanation: "빛의 속도는 초속 약 30만 km!",
        emoji: "⚡",
        category: "상식반전",
      },
      {
        id: "q10",
        question: "울면서 웃는 것은?",
        answer: "눈물 (눈물은 눈에서 나오고, 눈은 웃을 때도 씁니다)",
        explanation: "눈물과 웃음은 함께 있을 수 있어요!",
        emoji: "😂",
        category: "수수께끼",
      },
    ],
  },
];

export function getNonsenseSetBySlug(slug: string): NonsenseSet | undefined {
  return nonsenseSets.find((s) => s.slug === slug);
}
