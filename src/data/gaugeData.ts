// ================================================
// 가짜 측정기 데이터
// ================================================

export type GaugeQuestion = {
  id: string;
  text: string;
  options: { value: number; label: string }[];
};

export type GaugeGrade = {
  minScore: number;
  maxScore: number;
  title: string;
  description: string;
  emoji: string;
};

export type GaugeData = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  tags: string[];
  questions: GaugeQuestion[];
  grades: GaugeGrade[];
  disclaimer: string;
  isNew?: boolean;
  isHot?: boolean;
};

export const gaugeList: GaugeData[] = [
  {
    id: "gauge-kkondae",
    slug: "kkondae",
    title: "꼰대력 측정기",
    subtitle: "내 안의 꼰대를 측정합니다",
    description: "나는 꼰대일까? 재미로 측정하는 꼰대력 측정기",
    emoji: "👴",
    color: "#78350F",
    bgColor: "#FFFBEB",
    tags: ["꼰대", "직장", "세대"],
    disclaimer: "본 측정기는 재미 목적으로만 사용하세요. 실제 성격 진단이 아닙니다.",
    isHot: true,
    questions: [
      {
        id: "q1",
        text: "'요즘 것들은...'이라는 말을 써본 적 있다",
        options: [
          { value: 0, label: "전혀 없다" },
          { value: 20, label: "가끔 있다" },
          { value: 35, label: "자주 있다" },
          { value: 50, label: "입에 달고 산다" },
        ],
      },
      {
        id: "q2",
        text: "내 경험을 상대방에게 꼭 적용해야 한다고 생각한다",
        options: [
          { value: 0, label: "아니다, 각자 다르다" },
          { value: 15, label: "가끔 그런 것 같다" },
          { value: 30, label: "내 방법이 검증됐으니까" },
          { value: 45, label: "내가 해봤잖아" },
        ],
      },
      {
        id: "q3",
        text: "나이가 어리면 먼저 존댓말을 해야 한다고 생각한다",
        options: [
          { value: 0, label: "서로 편한 게 제일 좋다" },
          { value: 20, label: "초반에는 맞다" },
          { value: 35, label: "당연히 그렇다" },
          { value: 50, label: "왜 그걸 말로 해야 하나" },
        ],
      },
      {
        id: "q4",
        text: "직장에서 야근/특근을 당연하게 생각한다",
        options: [
          { value: 0, label: "절대 아니다" },
          { value: 15, label: "중요할 때는 해야지" },
          { value: 30, label: "나도 그렇게 했으니까" },
          { value: 45, label: "열심히 해야 인정받는다" },
        ],
      },
      {
        id: "q5",
        text: "'내가 젊을 때는...'으로 시작하는 말을 자주 한다",
        options: [
          { value: 0, label: "절대 안 한다" },
          { value: 15, label: "가끔 나온다" },
          { value: 30, label: "그게 왜 나쁜가" },
          { value: 45, label: "당연한 이야기 아닌가" },
        ],
      },
    ],
    grades: [
      { minScore: 0, maxScore: 30, title: "꼰대 0단계", description: "매우 열린 마음을 가지고 있어요", emoji: "😇" },
      { minScore: 31, maxScore: 70, title: "꼰대 예비군", description: "가끔 꼰대 기질이 보입니다. 자각이 있으면 OK", emoji: "😐" },
      { minScore: 71, maxScore: 110, title: "꼰대 중급", description: "본인은 모르지만 주변에서 느낄 수 있어요", emoji: "😅" },
      { minScore: 111, maxScore: 150, title: "꼰대 고급", description: "경험이 풍부한 꼰대. 한 발 물러서볼까요?", emoji: "👴" },
      { minScore: 151, maxScore: 999, title: "꼰대 마스터", description: "꼰대 최고 단계. 하지만 인생 경험만큼은 최고", emoji: "🏆" },
    ],
  },
  {
    id: "gauge-resign",
    slug: "resign",
    title: "퇴사욕구 측정기",
    subtitle: "지금 당장 관두고 싶은 마음 측정",
    description: "오늘 퇴사욕구는 몇 퍼센트? 재미로 확인하는 퇴사 욕구 측정기",
    emoji: "🚪",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    tags: ["퇴사", "직장", "스트레스"],
    disclaimer: "본 측정기는 재미 목적으로만 사용하세요. 실제 직장생활 상담이 아닙니다.",
    isHot: true,
    questions: [
      {
        id: "q1",
        text: "오늘 출근하면서 든 첫 생각은?",
        options: [
          { value: 0, label: "오늘도 화이팅!" },
          { value: 20, label: "그냥 하루 버티자" },
          { value: 40, label: "진짜 하기 싫다" },
          { value: 60, label: "오늘 당장 그만두고 싶다" },
        ],
      },
      {
        id: "q2",
        text: "팀장/상사를 볼 때 드는 감정은?",
        options: [
          { value: 0, label: "존경스럽다" },
          { value: 15, label: "그냥 직장 상사다" },
          { value: 35, label: "스트레스 받는다" },
          { value: 50, label: "보기만 해도 피곤하다" },
        ],
      },
      {
        id: "q3",
        text: "회사에서 보내는 시간이 어떻게 느껴지나?",
        options: [
          { value: 0, label: "의미 있고 보람차다" },
          { value: 15, label: "그냥 시간이 간다" },
          { value: 35, label: "하루가 너무 길다" },
          { value: 50, label: "인생 낭비 같다" },
        ],
      },
      {
        id: "q4",
        text: "퇴사 후 하고 싶은 일이 구체적으로 있나?",
        options: [
          { value: 0, label: "없다, 지금 회사가 좋다" },
          { value: 10, label: "막연하게는 있다" },
          { value: 25, label: "꽤 구체적으로 생각해봤다" },
          { value: 40, label: "이미 다 계획해뒀다" },
        ],
      },
      {
        id: "q5",
        text: "주말 저녁이 되면?",
        options: [
          { value: 0, label: "내일 일이 기대된다" },
          { value: 15, label: "그냥 하루 더 쉬고 싶다" },
          { value: 30, label: "일요일 밤 공포증 있다" },
          { value: 45, label: "월요일 생각만 해도 소름" },
        ],
      },
    ],
    grades: [
      { minScore: 0, maxScore: 40, title: "퇴사욕구 10%", description: "지금 직장과 꽤 잘 맞는 것 같아요", emoji: "😊" },
      { minScore: 41, maxScore: 90, title: "퇴사욕구 40%", description: "번아웃 조심! 가끔은 쉬어가는 게 좋아요", emoji: "😐" },
      { minScore: 91, maxScore: 140, title: "퇴사욕구 70%", description: "마음은 이미 퇴사 중. 진지하게 고민해볼 때", emoji: "😤" },
      { minScore: 141, maxScore: 200, title: "퇴사욕구 100%", description: "몸만 회사에 있고 마음은 이미 떠났어요", emoji: "🚪" },
      { minScore: 201, maxScore: 999, title: "퇴사욕구 200%", description: "지금 당장 관두고 싶은 상태. 정말 괜찮아요?", emoji: "🔥" },
    ],
  },
  {
    id: "gauge-fatigue",
    slug: "fatigue",
    title: "사회생활 피로도 측정기",
    subtitle: "나의 사회생활 배터리는 몇 퍼?",
    description: "사회생활에서 쌓인 피로를 측정해봐. 재미용 측정기야.",
    emoji: "🔋",
    color: "#6B7280",
    bgColor: "#F9FAFB",
    tags: ["피로", "사회생활", "스트레스"],
    disclaimer: "재미 목적으로만 사용하세요. 심각한 번아웃이 느껴지면 전문 상담을 권장합니다.",
    questions: [
      {
        id: "q1",
        text: "최근 모임/약속에 나가고 싶지 않다는 생각이 드는 빈도는?",
        options: [
          { value: 0, label: "전혀 없다, 늘 나가고 싶다" },
          { value: 20, label: "가끔 그런다" },
          { value: 40, label: "자주 그런다" },
          { value: 60, label: "항상 그렇다" },
        ],
      },
      {
        id: "q2",
        text: "사람들과 있다가 혼자 있는 공간이 얼마나 필요한가?",
        options: [
          { value: 0, label: "사람들과 있는 게 충전된다" },
          { value: 15, label: "가끔 혼자 시간이 필요하다" },
          { value: 35, label: "혼자 시간이 꼭 필요하다" },
          { value: 50, label: "혼자 있는 게 훨씬 편하다" },
        ],
      },
      {
        id: "q3",
        text: "최근 낯선 사람과 대화할 때 에너지가 많이 드는가?",
        options: [
          { value: 0, label: "전혀, 오히려 즐겁다" },
          { value: 15, label: "약간 에너지가 든다" },
          { value: 30, label: "꽤 신경이 쓰인다" },
          { value: 45, label: "매우 소진된다" },
        ],
      },
      {
        id: "q4",
        text: "약속 잡을 때 기분이 어떤가?",
        options: [
          { value: 0, label: "설레고 기대된다" },
          { value: 15, label: "그냥 일상이다" },
          { value: 30, label: "가끔 부담스럽다" },
          { value: 45, label: "웬만하면 잡고 싶지 않다" },
        ],
      },
      {
        id: "q5",
        text: "주변 사람들과 연락하는 빈도가 줄었는가?",
        options: [
          { value: 0, label: "유지되거나 늘었다" },
          { value: 15, label: "비슷하다" },
          { value: 30, label: "약간 줄었다" },
          { value: 45, label: "많이 줄었다" },
        ],
      },
    ],
    grades: [
      { minScore: 0, maxScore: 40, title: "피로도 10% 🔋", description: "사회적 배터리가 가득! 에너지가 넘쳐요", emoji: "😎" },
      { minScore: 41, maxScore: 90, title: "피로도 40% 🔋", description: "적당히 쉬어가면서 유지 중이에요", emoji: "😊" },
      { minScore: 91, maxScore: 140, title: "피로도 70% 🔋", description: "충전이 필요해요. 혼자만의 시간을 가져봐요", emoji: "😐" },
      { minScore: 141, maxScore: 999, title: "피로도 95% 🔋", description: "배터리 위험 수준. 조용히 쉬어가도 괜찮아요", emoji: "😴" },
    ],
  },
  {
    id: "gauge-mental",
    slug: "mental",
    title: "멘탈 방전도 측정기",
    subtitle: "지금 멘탈 충전량은?",
    description: "지금 멘탈 상태를 유쾌하게 측정해봐. 재미용이야.",
    emoji: "⚡",
    color: "#D97706",
    bgColor: "#FFFBEB",
    tags: ["멘탈", "스트레스", "기분"],
    disclaimer: "재미 목적으로만 사용하세요.",
    isNew: true,
    questions: [
      {
        id: "q1",
        text: "오늘 아침 기분은?",
        options: [
          { value: 0, label: "상쾌하다" },
          { value: 15, label: "그냥 그렇다" },
          { value: 30, label: "별로다" },
          { value: 45, label: "최악이다" },
        ],
      },
      {
        id: "q2",
        text: "최근 작은 일에 짜증이 나는 빈도는?",
        options: [
          { value: 0, label: "거의 없다" },
          { value: 15, label: "가끔 있다" },
          { value: 30, label: "자주 있다" },
          { value: 45, label: "항상 있다" },
        ],
      },
      {
        id: "q3",
        text: "뭔가를 시작하는 데 에너지가 얼마나 필요한가?",
        options: [
          { value: 0, label: "금방 시작된다" },
          { value: 15, label: "조금 애를 써야 한다" },
          { value: 30, label: "꽤 힘들다" },
          { value: 45, label: "시작 자체가 너무 힘들다" },
        ],
      },
      {
        id: "q4",
        text: "즐거웠던 일들이 요즘도 즐거운가?",
        options: [
          { value: 0, label: "여전히 즐겁다" },
          { value: 15, label: "조금 덜 즐겁다" },
          { value: 30, label: "많이 흥미가 줄었다" },
          { value: 45, label: "아무것도 즐겁지 않다" },
        ],
      },
      {
        id: "q5",
        text: "밤에 잠을 잘 자고 있나?",
        options: [
          { value: 0, label: "잘 잔다" },
          { value: 15, label: "가끔 뒤척인다" },
          { value: 30, label: "자주 잠을 설친다" },
          { value: 45, label: "거의 못 잔다" },
        ],
      },
    ],
    grades: [
      { minScore: 0, maxScore: 40, title: "멘탈 충전 95% ⚡", description: "지금 컨디션 최고예요!", emoji: "😎" },
      { minScore: 41, maxScore: 90, title: "멘탈 충전 60% ⚡", description: "나쁘지는 않지만 조금 쉬면 더 좋겠어요", emoji: "😊" },
      { minScore: 91, maxScore: 140, title: "멘탈 충전 30% ⚡", description: "요즘 많이 힘드신가요? 쉬어도 돼요", emoji: "😔" },
      { minScore: 141, maxScore: 999, title: "멘탈 방전 🔋", description: "지금 많이 지쳐있어요. 충분히 쉬어가세요", emoji: "😵" },
    ],
  },
  {
    id: "gauge-nunchimsa",
    slug: "nunchimsa",
    title: "눈치력 측정기",
    subtitle: "나의 눈치력을 측정합니다",
    description: "눈치가 빠른지 측정해봐. 재미로 보는 눈치력 측정기야.",
    emoji: "👁️",
    color: "#4F46E5",
    bgColor: "#EEF2FF",
    tags: ["눈치", "사회성", "공감"],
    disclaimer: "재미 목적으로만 사용하세요.",
    questions: [
      {
        id: "q1",
        text: "대화할 때 상대방이 지루해하는 걸 금방 눈치챈다",
        options: [
          { value: 40, label: "거의 바로 알 수 있다" },
          { value: 25, label: "조금 지나면 안다" },
          { value: 10, label: "나중에 가서야 안다" },
          { value: 0, label: "잘 모르겠다" },
        ],
      },
      {
        id: "q2",
        text: "분위기가 좋지 않을 때 원인을 빨리 파악한다",
        options: [
          { value: 40, label: "바로 파악된다" },
          { value: 25, label: "어느 정도 파악된다" },
          { value: 10, label: "늦게야 파악된다" },
          { value: 0, label: "잘 모른다" },
        ],
      },
      {
        id: "q3",
        text: "상대방이 불편한 주제를 피하고 싶을 때 감지한다",
        options: [
          { value: 40, label: "거의 바로 알아챈다" },
          { value: 25, label: "어느 정도 알아챈다" },
          { value: 10, label: "한참 후에 안다" },
          { value: 0, label: "잘 모른다" },
        ],
      },
      {
        id: "q4",
        text: "처음 만난 자리에서 분위기를 부드럽게 만드는 편이다",
        options: [
          { value: 40, label: "자연스럽게 잘 한다" },
          { value: 25, label: "어느 정도 한다" },
          { value: 10, label: "잘 못하는 편이다" },
          { value: 0, label: "반대로 어색하게 만드는 것 같다" },
        ],
      },
      {
        id: "q5",
        text: "팀 프로젝트에서 역할 분배가 불균형할 때 먼저 나선다",
        options: [
          { value: 40, label: "자주 먼저 나선다" },
          { value: 25, label: "가끔 나선다" },
          { value: 10, label: "누군가 말하면 따른다" },
          { value: 0, label: "그냥 내 역할만 한다" },
        ],
      },
    ],
    grades: [
      { minScore: 0, maxScore: 50, title: "눈치 없음 (솔직함)", description: "눈치 대신 직진! 솔직함이 무기예요", emoji: "😶" },
      { minScore: 51, maxScore: 100, title: "눈치 보통", description: "평균적인 눈치. 나쁘지 않아요", emoji: "😊" },
      { minScore: 101, maxScore: 150, title: "눈치 고수", description: "사람을 잘 읽어요. 사회생활 잘하시겠어요", emoji: "😎" },
      { minScore: 151, maxScore: 999, title: "눈치 천재", description: "눈치력 만렙! 상대방 표정만 봐도 다 안다", emoji: "🧠" },
    ],
  },
];
