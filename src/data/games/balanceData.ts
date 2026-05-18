// ================================================
// 밸런스게임 데이터
// ================================================

export type BalancePair = {
  id: string;
  question?: string;
  situation?: string;
  optionA: string;
  optionB: string;
  emojiA: string;
  emojiB: string;
  subtextA?: string;
  subtextB?: string;
};

export type BalanceResult = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  condition: "mostly-a" | "mostly-b" | "balanced" | "extreme-a" | "extreme-b";
};

export type BalanceGameData = {
  id: string;
  slug: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  pairs: BalancePair[];
  results: BalanceResult[];
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  playCount?: number;
};

export const balanceGameList: BalanceGameData[] = [
  {
    id: "bg-01",
    slug: "love-balance",
    title: "연애 밸런스게임",
    description: "연애할 때 더 참기 힘든 상황은?",
    emoji: "💕",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    isFeatured: true,
    playCount: 45000,
    tags: ["연애", "인기"],
    pairs: [
      { id: "lb1", optionA: "연락이 안 되는 연인", optionB: "연락이 너무 자주 오는 연인", emojiA: "🔇", emojiB: "📱" },
      { id: "lb2", optionA: "생일을 잊은 연인", optionB: "생일에 선물이 마음에 안 드는 연인", emojiA: "🎂", emojiB: "🎁" },
      { id: "lb3", optionA: "질투가 심한 연인", optionB: "질투가 전혀 없는 연인", emojiA: "😡", emojiB: "😶" },
      { id: "lb4", optionA: "내 친구를 싫어하는 연인", optionB: "내 친구들과 너무 친한 연인", emojiA: "👀", emojiB: "🤝" },
      { id: "lb5", optionA: "맛집에서 항상 같은 메뉴 고르는 연인", optionB: "매번 너무 비싼 곳 가자는 연인", emojiA: "😐", emojiB: "💸" },
      { id: "lb6", optionA: "전 연인과 연락하는 연인", optionB: "전 연인 이야기를 자꾸 꺼내는 연인", emojiA: "📞", emojiB: "💬" },
      { id: "lb7", optionA: "SNS에 나를 숨기는 연인", optionB: "SNS에 모든 것을 올리는 연인", emojiA: "🙈", emojiB: "📸" },
      { id: "lb8", optionA: "데이트비 절대 안 내는 연인", optionB: "데이트비 너무 따지는 연인", emojiA: "💳", emojiB: "🧮" },
      { id: "lb9", optionA: "나를 만날 때마다 30분 늦는 연인", optionB: "나를 30분 일찍 오라고 하는 연인", emojiA: "⏰", emojiB: "⌚" },
      { id: "lb10", optionA: "집에만 있으려는 연인", optionB: "매일 밖에 나가자는 연인", emojiA: "🏠", emojiB: "🚪" },
    ],
    results: [
      { id: "r-a", title: "감정 우선형", description: "연애할 때 감정과 관계에 더 민감한 타입", emoji: "💝", condition: "mostly-a" },
      { id: "r-b", title: "현실 중심형", description: "연애할 때 현실적인 부분을 중요하게 보는 타입", emoji: "🧠", condition: "mostly-b" },
      { id: "r-bal", title: "균형 연애형", description: "감정과 현실 모두 중요하게 여기는 균형형", emoji: "⚖️", condition: "balanced" },
    ],
  },
  {
    id: "bg-02",
    slug: "money-balance",
    title: "돈 밸런스게임",
    description: "더 힘든 상황을 골라보세요",
    emoji: "💰",
    color: "#059669",
    bgColor: "#ECFDF5",
    isFeatured: true,
    playCount: 38000,
    tags: ["돈", "소비", "인기"],
    pairs: [
      { id: "mb1", optionA: "통장 잔액이 매달 0원", optionB: "통장엔 돈이 있는데 쓰지 못함", emojiA: "😱", emojiB: "🔒" },
      { id: "mb2", optionA: "월급이 적지만 일이 편한 직장", optionB: "월급이 많지만 일이 힘든 직장", emojiA: "😌", emojiB: "💪" },
      { id: "mb3", optionA: "빌려준 돈을 못 받음", optionB: "내가 빌린 돈을 갚아야 함", emojiA: "🤦", emojiB: "😰" },
      { id: "mb4", optionA: "지갑을 잃어버림", optionB: "카드가 해킹됨", emojiA: "👛", emojiB: "💳" },
      { id: "mb5", optionA: "로또 1등 당첨인데 분실", optionB: "로또 2등 당첨", emojiA: "😭", emojiB: "🤑" },
      { id: "mb6", optionA: "충동구매 후 후회", optionB: "사지 않아서 후회", emojiA: "🛒", emojiB: "😢" },
      { id: "mb7", optionA: "소득의 70% 세금", optionB: "소득은 없지만 세금도 없음", emojiA: "💸", emojiB: "🚫" },
      { id: "mb8", optionA: "10억 생겼는데 5년 뒤 써야 함", optionB: "지금 당장 100만원", emojiA: "📦", emojiB: "💵" },
      { id: "mb9", optionA: "먹고 싶은 것 못 먹는 가난", optionB: "먹고 싶은데 살찌는 몸", emojiA: "🍜", emojiB: "⚖️" },
      { id: "mb10", optionA: "취미 생활에 돈 많이 쓰는 친구", optionB: "맨날 밥값 안 내는 친구", emojiA: "🎮", emojiB: "🍽️" },
    ],
    results: [
      { id: "r-a", title: "현실주의 돈센스", description: "현실적인 돈 문제에 더 민감한 타입", emoji: "💰", condition: "mostly-a" },
      { id: "r-b", title: "자유 소비형", description: "소비의 자유와 현재를 중요시하는 타입", emoji: "🛍️", condition: "mostly-b" },
      { id: "r-bal", title: "알뜰한 균형파", description: "소비와 저축 사이 균형을 잡는 타입", emoji: "⚖️", condition: "balanced" },
    ],
  },
  {
    id: "bg-03",
    slug: "work-balance",
    title: "직장생활 밸런스게임",
    description: "직장에서 더 참기 힘든 상황은?",
    emoji: "💼",
    color: "#374151",
    bgColor: "#F9FAFB",
    isFeatured: true,
    playCount: 51000,
    tags: ["직장", "공감", "인기"],
    pairs: [
      { id: "wb1", optionA: "월급은 많지만 야근이 일상", optionB: "월급은 적지만 칼퇴 보장", emojiA: "💰", emojiB: "🏠" },
      { id: "wb2", optionA: "일은 없는데 자리를 지켜야 하는 눈치 야근", optionB: "일이 너무 많아서 진짜 야근", emojiA: "😑", emojiB: "😫" },
      { id: "wb3", optionA: "내 아이디어를 가로채는 상사", optionB: "지시만 하고 책임은 안 지는 상사", emojiA: "🥷", emojiB: "🏃" },
      { id: "wb4", optionA: "회식이 매주 있는 회사", optionB: "점심을 무조건 같이 먹는 회사", emojiA: "🍺", emojiB: "🍚" },
      { id: "wb5", optionA: "퇴근 후 업무 카톡이 매일 오는 상사", optionB: "출근 전 아침 미팅이 매일 있는 회사", emojiA: "📱", emojiB: "☀️" },
      { id: "wb6", optionA: "월급이 밀리는 회사", optionB: "상여금이 사라진 회사", emojiA: "💸", emojiB: "📉" },
      { id: "wb7", optionA: "능력 없는 상사", optionB: "능력 있지만 성격 나쁜 상사", emojiA: "🤦", emojiB: "😠" },
      { id: "wb8", optionA: "팀원 전체가 나 싫어하는 회사", optionB: "팀원은 좋지만 일이 힘든 회사", emojiA: "👥", emojiB: "💪" },
      { id: "wb9", optionA: "연봉 협상이 불가능한 회사", optionB: "연봉은 되는데 이상한 복지만 있는 회사", emojiA: "📊", emojiB: "🎁" },
      { id: "wb10", optionA: "업무 실수를 모두에게 공개하는 상사", optionB: "칭찬을 절대 안 하는 상사", emojiA: "😳", emojiB: "😶" },
    ],
    results: [
      { id: "r-a", title: "감정 에너지 소진형", description: "직장에서 감정적으로 더 힘들어하는 타입", emoji: "😮‍💨", condition: "mostly-a" },
      { id: "r-b", title: "업무 스트레스 민감형", description: "일 자체의 양과 질에 더 영향받는 타입", emoji: "📋", condition: "mostly-b" },
      { id: "r-bal", title: "회사 현실주의자", description: "직장의 모든 요소를 냉정히 평가하는 타입", emoji: "🎯", condition: "balanced" },
    ],
  },
  {
    id: "bg-04",
    slug: "friend-balance",
    title: "친구관계 밸런스게임",
    description: "친구 관계에서 더 힘든 상황은?",
    emoji: "👫",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    playCount: 28000,
    tags: ["인간관계", "친구"],
    pairs: [
      { id: "fb1", optionA: "빌린 돈 안 갚는 친구", optionB: "돈은 갚지만 매번 빌리는 친구", emojiA: "💸", emojiB: "🔄" },
      { id: "fb2", optionA: "비밀을 말하자마자 퍼뜨리는 친구", optionB: "내 비밀을 5년째 꺼내는 친구", emojiA: "🗣️", emojiB: "📼" },
      { id: "fb3", optionA: "모임에 매번 늦는 친구", optionB: "모임을 매번 잠깐 있다가 먼저 가는 친구", emojiA: "⏰", emojiB: "🚗" },
      { id: "fb4", optionA: "자기 자랑만 하는 친구", optionB: "내 자랑을 무시하는 친구", emojiA: "📣", emojiB: "🙄" },
      { id: "fb5", optionA: "나를 흉보는 친구", optionB: "나를 걱정하는 척 훈수 두는 친구", emojiA: "🗡️", emojiB: "🧐" },
      { id: "fb6", optionA: "연락이 잘 안 되는 친구", optionB: "24시간 연락하려는 친구", emojiA: "📵", emojiB: "📞" },
      { id: "fb7", optionA: "내 연인을 좋게 보는 척 뒷담화 치는 친구", optionB: "내 연인을 대놓고 싫어하는 친구", emojiA: "🎭", emojiB: "😤" },
      { id: "fb8", optionA: "부탁을 거절 못 하는 친구", optionB: "부탁을 항상 거절하는 친구", emojiA: "😓", emojiB: "🙅" },
      { id: "fb9", optionA: "성공해서 달라진 친구", optionB: "어려워져서 나한테만 기대는 친구", emojiA: "👑", emojiB: "🫂" },
      { id: "fb10", optionA: "SNS에 우리 만남을 항상 올리는 친구", optionB: "SNS에 나를 한 번도 태그 안 하는 친구", emojiA: "📸", emojiB: "🙈" },
    ],
    results: [
      { id: "r-a", title: "신뢰 중시형", description: "친구 관계에서 신뢰와 배려를 가장 중요하게 여기는 타입", emoji: "🤝", condition: "mostly-a" },
      { id: "r-b", title: "편안함 추구형", description: "친구 관계에서 편안함과 자유를 중요하게 여기는 타입", emoji: "🕊️", condition: "mostly-b" },
      { id: "r-bal", title: "현실적 우정파", description: "친구 관계에서 실용적인 부분도 중요하게 보는 타입", emoji: "⚖️", condition: "balanced" },
    ],
  },
  {
    id: "bg-05",
    slug: "worst-situation",
    title: "최악의 상황 밸런스게임",
    description: "인생 최악의 상황 중 더 힘든 건?",
    emoji: "😱",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    isFeatured: true,
    playCount: 62000,
    tags: ["상황", "극단", "인기"],
    pairs: [
      { id: "ws1", optionA: "핸드폰이 없는 한 달", optionB: "인터넷이 없는 한 달", emojiA: "📵", emojiB: "🚫" },
      { id: "ws2", optionA: "영원히 아무도 나를 기억 못함", optionB: "영원히 내가 아무것도 잊지 못함", emojiA: "👻", emojiB: "🧠" },
      { id: "ws3", optionA: "내일 죽는다는 걸 아는 것", optionB: "언제 죽는지 모르는 것", emojiA: "📅", emojiB: "❓" },
      { id: "ws4", optionA: "10년을 허비한 느낌", optionB: "10년 뒤로 돌아가야 함", emojiA: "😔", emojiB: "⏪" },
      { id: "ws5", optionA: "말을 못 하는 하루", optionB: "눈이 안 보이는 하루", emojiA: "🤐", emojiB: "🙈" },
      { id: "ws6", optionA: "사랑받지 못하는 삶", optionB: "인정받지 못하는 삶", emojiA: "💔", emojiB: "🚫" },
      { id: "ws7", optionA: "돈이 없는 인생", optionB: "건강이 없는 인생", emojiA: "💸", emojiB: "🏥" },
      { id: "ws8", optionA: "자고 일어나면 10년 후", optionB: "자고 일어나면 10년 전", emojiA: "⏩", emojiB: "⏪" },
      { id: "ws9", optionA: "좋아하는 음식 평생 못 먹는 것", optionB: "좋아하는 취미 평생 못 하는 것", emojiA: "🍜", emojiB: "🎮" },
      { id: "ws10", optionA: "내가 싫어하는 사람이 성공함", optionB: "내가 좋아하는 사람이 실패함", emojiA: "😤", emojiB: "😢" },
    ],
    results: [
      { id: "r-a", title: "관계 중심형", description: "상실과 연결의 두려움이 큰 타입", emoji: "🫂", condition: "mostly-a" },
      { id: "r-b", title: "개인 독립형", description: "개인의 자유와 능력 상실에 더 민감한 타입", emoji: "🦅", condition: "mostly-b" },
      { id: "r-bal", title: "균형 인생파", description: "삶의 여러 요소를 골고루 중요하게 여기는 타입", emoji: "🌟", condition: "balanced" },
    ],
  },
  {
    id: "bg-06",
    slug: "food-balance",
    title: "음식 밸런스게임",
    description: "음식 취향의 진짜 내 선택은?",
    emoji: "🍽️",
    color: "#F97316",
    bgColor: "#FFF7ED",
    playCount: 33000,
    tags: ["음식", "취향"],
    pairs: [
      { id: "fdb1", optionA: "평생 치킨만 먹기", optionB: "평생 삼겹살만 먹기", emojiA: "🍗", emojiB: "🥓" },
      { id: "fdb2", optionA: "매운 음식을 못 먹게 됨", optionB: "단 음식을 못 먹게 됨", emojiA: "🌶️", emojiB: "🍰" },
      { id: "fdb3", optionA: "혼자 밥 먹기", optionB: "먹기 싫은 사람과 밥 먹기", emojiA: "🙋", emojiB: "😒" },
      { id: "fdb4", optionA: "배달 음식 없는 세상", optionB: "식당 없는 세상", emojiA: "🛵", emojiB: "🏪" },
      { id: "fdb5", optionA: "평생 한식만 먹기", optionB: "평생 양식만 먹기", emojiA: "🍚", emojiB: "🍝" },
      { id: "fdb6", optionA: "먹을 때마다 같은 맛", optionB: "먹을 때마다 맛이 달라짐", emojiA: "😐", emojiB: "🎲" },
      { id: "fdb7", optionA: "야식을 영원히 못 먹음", optionB: "아침을 영원히 못 먹음", emojiA: "🌙", emojiB: "☀️" },
      { id: "fdb8", optionA: "음식 사진을 못 찍음", optionB: "음식 사진만 찍고 못 먹음", emojiA: "📵", emojiB: "📸" },
      { id: "fdb9", optionA: "비싸고 맛없는 식당", optionB: "저렴하고 맛있는 식당이 줄이 너무 긴 것", emojiA: "💸", emojiB: "⌛" },
      { id: "fdb10", optionA: "평생 카페에 못 감", optionB: "평생 편의점에 못 감", emojiA: "☕", emojiB: "🏪" },
    ],
    results: [
      { id: "r-a", title: "음식 감성파", description: "음식에서 감정과 경험을 중요시하는 타입", emoji: "🍜", condition: "mostly-a" },
      { id: "r-b", title: "현실 미식가", description: "맛과 현실적 조건을 균형있게 보는 타입", emoji: "🍽️", condition: "mostly-b" },
      { id: "r-bal", title: "뭐든지 잘 먹는 형", description: "음식에 대해 유연한 태도를 가진 타입", emoji: "😋", condition: "balanced" },
    ],
  },
  {
    id: "bg-07",
    slug: "marriage-balance",
    title: "결혼 밸런스게임",
    description: "결혼 생활에서 더 힘든 건?",
    emoji: "💍",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    playCount: 24000,
    tags: ["결혼", "연애", "현실"],
    pairs: [
      { id: "mar1", optionA: "시댁/처가 눈치를 많이 봐야 하는 결혼", optionB: "경제적으로 빠듯한 결혼", emojiA: "👨‍👩‍👧‍👦", emojiB: "💸" },
      { id: "mar2", optionA: "사랑은 있는데 돈이 없음", optionB: "돈은 있는데 사랑이 없음", emojiA: "❤️", emojiB: "💰" },
      { id: "mar3", optionA: "성격이 극단적으로 다른 배우자", optionB: "취향이 너무 같아서 지루한 배우자", emojiA: "🆚", emojiB: "🪞" },
      { id: "mar4", optionA: "평생 함께 사는 배우자가 요리를 못함", optionB: "평생 함께 사는 배우자가 청소를 못함", emojiA: "🍳", emojiB: "🧹" },
      { id: "mar5", optionA: "아이 없는 결혼", optionB: "아이가 많은 결혼", emojiA: "👶", emojiB: "👶👶👶" },
      { id: "mar6", optionA: "배우자가 친구를 자주 집에 데려옴", optionB: "배우자가 친구를 만나지 말라고 함", emojiA: "🏠", emojiB: "🚫" },
      { id: "mar7", optionA: "잔소리가 심한 배우자", optionB: "무관심한 배우자", emojiA: "😤", emojiB: "😶" },
      { id: "mar8", optionA: "결혼 후 살이 많이 찐 배우자", optionB: "결혼 후 외모에 너무 신경 쓰는 배우자", emojiA: "🍔", emojiB: "💅" },
      { id: "mar9", optionA: "매일 함께 있어야 하는 배우자", optionB: "주말에만 보는 주말부부", emojiA: "🫂", emojiB: "📅" },
      { id: "mar10", optionA: "시댁 명절 10번 vs 처가 명절 10번", optionB: "명절마다 해외여행", emojiA: "🏮", emojiB: "✈️" },
    ],
    results: [
      { id: "r-a", title: "관계 중심 결혼관", description: "결혼에서 관계와 감정을 가장 중요하게 여기는 타입", emoji: "❤️", condition: "mostly-a" },
      { id: "r-b", title: "현실 중심 결혼관", description: "결혼에서 현실적인 조건과 편안함을 중요하게 여기는 타입", emoji: "🏠", condition: "mostly-b" },
      { id: "r-bal", title: "균형잡힌 결혼관", description: "결혼의 감정과 현실을 모두 중요하게 보는 타입", emoji: "💍", condition: "balanced" },
    ],
  },
  {
    id: "bg-08",
    slug: "daily-life",
    title: "일상생활 밸런스게임",
    description: "하루하루 생활 속 더 힘든 상황은?",
    emoji: "🌞",
    color: "#EAB308",
    bgColor: "#FEFCE8",
    playCount: 19000,
    tags: ["일상", "생활"],
    pairs: [
      { id: "dl1", optionA: "매일 아침 6시 기상", optionB: "매일 밤 3시 이전에 잠들지 못함", emojiA: "⏰", emojiB: "🌙" },
      { id: "dl2", optionA: "대중교통만 이용하는 삶", optionB: "자차만 이용하는 삶 (주차·기름값 포함)", emojiA: "🚇", emojiB: "🚗" },
      { id: "dl3", optionA: "모든 집안일을 혼자 해야 함", optionB: "집안일을 아무도 인정해주지 않음", emojiA: "🧹", emojiB: "🙄" },
      { id: "dl4", optionA: "평생 자가 없이 전세·월세", optionB: "평생 대출 갚으며 자가 유지", emojiA: "🏠", emojiB: "🏦" },
      { id: "dl5", optionA: "카페인 없이 사는 하루", optionB: "설탕 없이 사는 하루", emojiA: "☕", emojiB: "🍬" },
      { id: "dl6", optionA: "음악을 못 듣는 일주일", optionB: "유튜브를 못 보는 일주일", emojiA: "🎵", emojiB: "📺" },
      { id: "dl7", optionA: "날씨가 매일 비", optionB: "날씨가 매일 폭염", emojiA: "🌧️", emojiB: "☀️" },
      { id: "dl8", optionA: "긴 출퇴근(왕복 3시간)", optionB: "좁고 비싼 집 (회사 도보 5분)", emojiA: "🚇", emojiB: "🏠" },
      { id: "dl9", optionA: "평생 같은 옷만 입어야 함", optionB: "평생 같은 헤어스타일", emojiA: "👕", emojiB: "💇" },
      { id: "dl10", optionA: "음식 배달이 없는 세상", optionB: "쿠팡/택배가 없는 세상", emojiA: "🛵", emojiB: "📦" },
    ],
    results: [
      { id: "r-a", title: "편안함 최우선형", description: "일상의 편안함을 가장 중요하게 여기는 타입", emoji: "🛋️", condition: "mostly-a" },
      { id: "r-b", title: "실용주의 생활인", description: "현실적이고 효율적인 생활을 추구하는 타입", emoji: "⚙️", condition: "mostly-b" },
      { id: "r-bal", title: "융통성 있는 일상파", description: "상황에 따라 유연하게 적응하는 타입", emoji: "🌟", condition: "balanced" },
    ],
  },
  {
    id: "bg-09",
    slug: "pride-vs-love",
    title: "자존심 vs 사랑 밸런스게임",
    description: "자존심을 지킬까, 사랑을 지킬까?",
    emoji: "👑",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    isNew: true,
    playCount: 41000,
    tags: ["연애", "자존심", "인기"],
    pairs: [
      { id: "pl1", optionA: "먼저 사과하기 (내 잘못 아니어도)", optionB: "싸운 후 3일 냉전", emojiA: "🙏", emojiB: "🥶" },
      { id: "pl2", optionA: "연인 앞에서 우는 것", optionB: "연인 앞에서 화내는 것", emojiA: "😢", emojiB: "😡" },
      { id: "pl3", optionA: "좋아하는 티를 먼저 냄", optionB: "좋아하는 티를 숨기다 놓침", emojiA: "😍", emojiB: "😔" },
      { id: "pl4", optionA: "차인 후 다시 고백하기", optionB: "차이고 그냥 포기하기", emojiA: "💪", emojiB: "😶" },
      { id: "pl5", optionA: "먼저 연락하기", optionB: "연락 안 하다 쪽팔려서 끊기", emojiA: "📱", emojiB: "📵" },
      { id: "pl6", optionA: "상대가 원하는 대로 맞춰주기", optionB: "내 방식 고집하다 헤어짐", emojiA: "🫡", emojiB: "💔" },
      { id: "pl7", optionA: "질투 인정하기", optionB: "질투 감추다 오해 쌓임", emojiA: "😤", emojiB: "💭" },
      { id: "pl8", optionA: "잘못을 솔직히 말하기", optionB: "잘못을 숨기다 나중에 들킴", emojiA: "😅", emojiB: "😰" },
      { id: "pl9", optionA: "연인 앞에서 이모저모 안 좋은 모습 보임", optionB: "완벽한 모습만 보이다 지침", emojiA: "🥴", emojiB: "😤" },
      { id: "pl10", optionA: "헤어지자는 말을 못 하고 흐지부지", optionB: "상처 주지 않으려다 더 상처 줌", emojiA: "😶", emojiB: "💔" },
    ],
    results: [
      { id: "r-a", title: "사랑 우선형", description: "자존심보다 관계와 감정을 더 중요하게 여기는 타입", emoji: "❤️", condition: "mostly-a" },
      { id: "r-b", title: "자존심 지키기형", description: "관계보다 자신의 감정과 자존심을 중요시하는 타입", emoji: "👑", condition: "mostly-b" },
      { id: "r-bal", title: "현실적 사랑파", description: "상황에 따라 판단하는 유연한 연애 스타일", emoji: "⚖️", condition: "balanced" },
    ],
  },
  {
    id: "bg-10",
    slug: "travel-balance",
    title: "여행 밸런스게임",
    description: "여행할 때 더 힘든 상황은?",
    emoji: "✈️",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    playCount: 17000,
    tags: ["여행", "취향"],
    pairs: [
      { id: "tr1", optionA: "자유 여행 (계획 없이)", optionB: "패키지 여행 (모든 게 정해진)", emojiA: "🗺️", emojiB: "📋" },
      { id: "tr2", optionA: "혼자 여행", optionB: "마음 안 맞는 사람과 여행", emojiA: "🙋", emojiB: "😒" },
      { id: "tr3", optionA: "숙소가 별로인 여행", optionB: "음식이 전부 맛없는 여행", emojiA: "🏨", emojiB: "🤢" },
      { id: "tr4", optionA: "비행시간 14시간 이상", optionB: "경유 3번", emojiA: "✈️", emojiB: "🔄" },
      { id: "tr5", optionA: "여행 중 지갑 분실", optionB: "여행 중 핸드폰 분실", emojiA: "👛", emojiB: "📱" },
      { id: "tr6", optionA: "여행지에서 매일 비", optionB: "여행지에서 매일 폭염", emojiA: "🌧️", emojiB: "☀️" },
      { id: "tr7", optionA: "국내 여행만 평생", optionB: "해외만 평생 (국내 여행 없음)", emojiA: "🇰🇷", emojiB: "🌍" },
      { id: "tr8", optionA: "맛집 줄 2시간 기다림", optionB: "먹고 싶은 게 다 품절", emojiA: "⌛", emojiB: "😢" },
      { id: "tr9", optionA: "여행 중 몸살", optionB: "여행 중 멀미", emojiA: "🤒", emojiB: "🤢" },
      { id: "tr10", optionA: "사진이 하나도 안 찍힘", optionB: "사진이 모두 흔들림", emojiA: "📵", emojiB: "📸" },
    ],
    results: [
      { id: "r-a", title: "자유 여행가", description: "자유롭고 즉흥적인 여행을 선호하는 타입", emoji: "🕊️", condition: "mostly-a" },
      { id: "r-b", title: "계획형 여행가", description: "안전하고 계획적인 여행을 선호하는 타입", emoji: "📋", condition: "mostly-b" },
      { id: "r-bal", title: "경험 중심 여행가", description: "여행의 어느 방식이든 즐기는 유연한 타입", emoji: "🌟", condition: "balanced" },
    ],
  },
];

export function getBalanceGameBySlug(slug: string): BalanceGameData | undefined {
  return balanceGameList.find((b) => b.slug === slug);
}

export function computeBalanceResult(
  game: BalanceGameData,
  answers: Map<string, "a" | "b">
): BalanceResult {
  const total = answers.size;
  if (total === 0) return game.results[0];

  let aCount = 0;
  answers.forEach((v) => { if (v === "a") aCount++; });
  const bCount = total - aCount;

  const aRatio = aCount / total;

  let condition: BalanceResult["condition"];
  if (aRatio >= 0.8) condition = "extreme-a";
  else if (aRatio >= 0.6) condition = "mostly-a";
  else if (aRatio <= 0.2) condition = "extreme-b";
  else if (aRatio <= 0.4) condition = "mostly-b";
  else condition = "balanced";

  return (
    game.results.find((r) => r.condition === condition) ||
    game.results.find((r) => r.condition === "balanced") ||
    game.results[0]
  );
}
