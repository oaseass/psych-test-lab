// ================================================================
// 시각적 선택지 데이터 - 이미지 파일 없이 CSS/SVG로 구현
// 나중에 실제 이미지로 교체 가능하도록 구조 분리
// ================================================================

export type VisualType =
  | "gradient"
  | "color"
  | "door"
  | "path"
  | "room"
  | "animal"
  | "card-abstract"
  | "illusion-svg"
  | "emoji-large";

export type VisualOption = {
  id: string;
  label: string;
  type: VisualType;
  gradient?: string;
  color?: string;
  emoji?: string;
  svgContent?: string;
  description: string;
  // 결과 해석
  meaning: string;
};

// ────────────────────────────────────────
// 그림 선택용 그라디언트 옵션 (8개)
// ────────────────────────────────────────
export const GRADIENT_OPTIONS: VisualOption[] = [
  {
    id: "vis-g1",
    label: "석양빛",
    type: "gradient",
    gradient: "linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)",
    emoji: "🌅",
    description: "따뜻한 석양빛",
    meaning: "열정과 에너지가 가득한 상태",
  },
  {
    id: "vis-g2",
    label: "깊은 바다",
    type: "gradient",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    emoji: "🌊",
    description: "깊고 차분한 바다",
    meaning: "생각이 많고 내면 지향적인 상태",
  },
  {
    id: "vis-g3",
    label: "새벽 숲",
    type: "gradient",
    gradient: "linear-gradient(135deg, #0F9B58 0%, #00B4D8 100%)",
    emoji: "🌿",
    description: "새벽의 초록 숲",
    meaning: "치유와 회복이 필요한 상태",
  },
  {
    id: "vis-g4",
    label: "보랏빛 황혼",
    type: "gradient",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    emoji: "🌆",
    description: "신비로운 보랏빛",
    meaning: "감수성이 예민하고 직관적인 상태",
  },
  {
    id: "vis-g5",
    label: "불꽃",
    type: "gradient",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    emoji: "🔥",
    description: "강렬한 불꽃",
    meaning: "강한 욕구와 충동이 있는 상태",
  },
  {
    id: "vis-g6",
    label: "눈덮인 산",
    type: "gradient",
    gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    emoji: "🏔️",
    description: "고요한 눈 덮인 산",
    meaning: "안정을 원하고 냉정한 상태",
  },
  {
    id: "vis-g7",
    label: "황금빛 들판",
    type: "gradient",
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    emoji: "🌾",
    description: "따뜻한 황금빛 들판",
    meaning: "안정과 풍요를 원하는 상태",
  },
  {
    id: "vis-g8",
    label: "밤하늘",
    type: "gradient",
    gradient: "linear-gradient(135deg, #0c0c1e 0%, #1a1a4e 50%, #2d1b69 100%)",
    emoji: "🌌",
    description: "깊은 밤하늘",
    meaning: "고독하거나 내면 깊이 탐색 중인 상태",
  },
];

// ────────────────────────────────────────
// 색깔 선택 옵션 (10개)
// ────────────────────────────────────────
export const COLOR_OPTIONS: VisualOption[] = [
  {
    id: "col-1",
    label: "빨강",
    type: "color",
    color: "#EF4444",
    emoji: "❤️",
    description: "강렬한 빨강",
    meaning: "열정, 분노, 에너지, 강한 욕망",
  },
  {
    id: "col-2",
    label: "주황",
    type: "color",
    color: "#F97316",
    emoji: "🧡",
    description: "따뜻한 주황",
    meaning: "활기, 따뜻함, 사교성, 활동욕구",
  },
  {
    id: "col-3",
    label: "노랑",
    type: "color",
    color: "#EAB308",
    emoji: "💛",
    description: "밝은 노랑",
    meaning: "호기심, 낙천성, 명랑함, 창의성",
  },
  {
    id: "col-4",
    label: "초록",
    type: "color",
    color: "#22C55E",
    emoji: "💚",
    description: "싱그러운 초록",
    meaning: "안정, 치유, 성장, 균형",
  },
  {
    id: "col-5",
    label: "파랑",
    type: "color",
    color: "#3B82F6",
    emoji: "💙",
    description: "깊은 파랑",
    meaning: "냉정, 신뢰, 분석력, 거리두기",
  },
  {
    id: "col-6",
    label: "보라",
    type: "color",
    color: "#8B5CF6",
    emoji: "💜",
    description: "신비로운 보라",
    meaning: "직관, 감수성, 창의성, 신비로움",
  },
  {
    id: "col-7",
    label: "분홍",
    type: "color",
    color: "#EC4899",
    emoji: "🩷",
    description: "사랑스러운 분홍",
    meaning: "애정, 친밀감, 부드러움, 연애감정",
  },
  {
    id: "col-8",
    label: "검정",
    type: "color",
    color: "#171717",
    emoji: "🖤",
    description: "강렬한 검정",
    meaning: "방어, 비밀, 우울, 독립심",
  },
  {
    id: "col-9",
    label: "흰색",
    type: "color",
    color: "#F8FAFC",
    emoji: "🤍",
    description: "순수한 흰색",
    meaning: "정돈욕구, 순수함, 비움, 새 출발",
  },
  {
    id: "col-10",
    label: "회색",
    type: "color",
    color: "#9CA3AF",
    emoji: "🩶",
    description: "차분한 회색",
    meaning: "중립, 피로감, 혼란, 결정 미루기",
  },
];

// ────────────────────────────────────────
// 문(Door) 카드 옵션 (6개)
// ────────────────────────────────────────
export const DOOR_OPTIONS: VisualOption[] = [
  {
    id: "door-1",
    label: "낡은 나무문",
    type: "door",
    gradient: "linear-gradient(160deg, #8B4513 0%, #A0522D 60%, #6B3410 100%)",
    emoji: "🚪",
    description: "따뜻한 나무 향기가 나는 낡은 문",
    meaning: "과거와의 연결, 따뜻한 기억",
  },
  {
    id: "door-2",
    label: "흰 유리문",
    type: "door",
    gradient: "linear-gradient(160deg, #E2E8F0 0%, #F8FAFC 50%, #CBD5E1 100%)",
    emoji: "🏢",
    description: "투명하고 깔끔한 유리문",
    meaning: "투명성, 개방성, 새로운 기회",
  },
  {
    id: "door-3",
    label: "검은 철문",
    type: "door",
    gradient: "linear-gradient(160deg, #1F2937 0%, #374151 60%, #111827 100%)",
    emoji: "⛓️",
    description: "묵직한 검은 철문",
    meaning: "보호, 방어, 강한 경계심",
  },
  {
    id: "door-4",
    label: "빨간 대문",
    type: "door",
    gradient: "linear-gradient(160deg, #DC2626 0%, #EF4444 50%, #B91C1C 100%)",
    emoji: "🔴",
    description: "눈에 띄는 빨간 대문",
    meaning: "열정, 도전, 강한 의지",
  },
  {
    id: "door-5",
    label: "초록 정원문",
    type: "door",
    gradient: "linear-gradient(160deg, #166534 0%, #22C55E 50%, #15803D 100%)",
    emoji: "🌿",
    description: "덩굴이 감싼 초록 정원문",
    meaning: "성장, 치유, 자연스러운 변화",
  },
  {
    id: "door-6",
    label: "황금빛 문",
    type: "door",
    gradient: "linear-gradient(160deg, #D97706 0%, #FCD34D 50%, #B45309 100%)",
    emoji: "✨",
    description: "빛나는 황금빛 문",
    meaning: "성공, 풍요, 기회, 야망",
  },
];

// ────────────────────────────────────────
// 길/경로 카드 옵션 (6개)
// ────────────────────────────────────────
export const PATH_OPTIONS: VisualOption[] = [
  {
    id: "path-1",
    label: "숲속 오솔길",
    type: "path",
    gradient: "linear-gradient(180deg, #1a4731 0%, #2D6A4F 40%, #40916C 100%)",
    emoji: "🌲",
    description: "나무 사이로 난 조용한 오솔길",
    meaning: "내면 탐색, 혼자만의 여정",
  },
  {
    id: "path-2",
    label: "탁 트인 들판길",
    type: "path",
    gradient: "linear-gradient(180deg, #87CEEB 0%, #90EE90 60%, #228B22 100%)",
    emoji: "🌿",
    description: "끝없이 펼쳐진 들판 사이 길",
    meaning: "자유, 가능성, 개방적 미래",
  },
  {
    id: "path-3",
    label: "도시의 교차로",
    type: "path",
    gradient: "linear-gradient(180deg, #374151 0%, #6B7280 50%, #9CA3AF 100%)",
    emoji: "🏙️",
    description: "복잡한 도시의 교차로",
    meaning: "선택의 기로, 현실적 고민",
  },
  {
    id: "path-4",
    label: "해안 절벽길",
    type: "path",
    gradient: "linear-gradient(180deg, #1E40AF 0%, #3B82F6 40%, #93C5FD 100%)",
    emoji: "🌊",
    description: "파도 소리 들리는 절벽 위 길",
    meaning: "도전, 스릴, 위험 감수",
  },
  {
    id: "path-5",
    label: "꽃길",
    type: "path",
    gradient: "linear-gradient(180deg, #F9A8D4 0%, #EC4899 50%, #BE185D 100%)",
    emoji: "🌸",
    description: "봄꽃이 만발한 화사한 꽃길",
    meaning: "낭만, 아름다움, 행복한 기대",
  },
  {
    id: "path-6",
    label: "안개 낀 골목",
    type: "path",
    gradient: "linear-gradient(180deg, #C4B5FD 0%, #A78BFA 50%, #7C3AED 100%)",
    emoji: "🌫️",
    description: "신비로운 안개가 낀 좁은 골목",
    meaning: "불확실성, 신비, 미지의 여정",
  },
];

// ────────────────────────────────────────
// 방(Room) 무드 카드 옵션 (6개)
// ────────────────────────────────────────
export const ROOM_OPTIONS: VisualOption[] = [
  {
    id: "room-1",
    label: "따뜻한 거실",
    type: "room",
    gradient: "linear-gradient(135deg, #FEF3C7 0%, #FCD34D 50%, #F59E0B 100%)",
    emoji: "🛋️",
    description: "따뜻한 조명이 있는 아늑한 거실",
    meaning: "안정, 편안함, 가족 연결 욕구",
  },
  {
    id: "room-2",
    label: "깔끔한 서재",
    type: "room",
    gradient: "linear-gradient(135deg, #E0E7FF 0%, #A5B4FC 50%, #6366F1 100%)",
    emoji: "📚",
    description: "책이 가득한 조용한 서재",
    meaning: "지식욕, 독립성, 혼자만의 시간 욕구",
  },
  {
    id: "room-3",
    label: "넓은 아틀리에",
    type: "room",
    gradient: "linear-gradient(135deg, #FECDD3 0%, #FB7185 50%, #E11D48 100%)",
    emoji: "🎨",
    description: "창의적인 작업물이 가득한 아틀리에",
    meaning: "창의욕, 자기표현, 자유로운 삶",
  },
  {
    id: "room-4",
    label: "모던한 오피스",
    type: "room",
    gradient: "linear-gradient(135deg, #D1FAE5 0%, #34D399 50%, #059669 100%)",
    emoji: "💼",
    description: "깔끔하게 정돈된 모던 오피스",
    meaning: "성취욕, 효율성, 목표 지향성",
  },
  {
    id: "room-5",
    label: "자연 속 오두막",
    type: "room",
    gradient: "linear-gradient(135deg, #D9F99D 0%, #84CC16 50%, #3F6212 100%)",
    emoji: "🌿",
    description: "자연 속 조용한 통나무 오두막",
    meaning: "탈출 욕구, 치유, 자연 회귀",
  },
  {
    id: "room-6",
    label: "화려한 파티룸",
    type: "room",
    gradient: "linear-gradient(135deg, #FDE68A 0%, #F59E0B 30%, #EC4899 70%, #8B5CF6 100%)",
    emoji: "🎉",
    description: "화려하게 꾸며진 파티룸",
    meaning: "사교 욕구, 인정받고 싶음, 활력",
  },
];

// ────────────────────────────────────────
// 동물 실루엣 이모지 카드 (8개)
// ────────────────────────────────────────
export const ANIMAL_OPTIONS: VisualOption[] = [
  {
    id: "ani-1",
    label: "사자",
    type: "animal",
    gradient: "linear-gradient(135deg, #FCD34D 0%, #F59E0B 100%)",
    emoji: "🦁",
    description: "당당한 사자",
    meaning: "리더십, 자신감, 강한 의지",
  },
  {
    id: "ani-2",
    label: "고양이",
    type: "animal",
    gradient: "linear-gradient(135deg, #E2E8F0 0%, #94A3B8 100%)",
    emoji: "🐱",
    description: "독립적인 고양이",
    meaning: "독립성, 자기중심, 선택적 친밀감",
  },
  {
    id: "ani-3",
    label: "강아지",
    type: "animal",
    gradient: "linear-gradient(135deg, #FEF3C7 0%, #D97706 100%)",
    emoji: "🐶",
    description: "충실한 강아지",
    meaning: "충성심, 애정 표현, 공감 능력",
  },
  {
    id: "ani-4",
    label: "늑대",
    type: "animal",
    gradient: "linear-gradient(135deg, #374151 0%, #6B7280 100%)",
    emoji: "🐺",
    description: "고독한 늑대",
    meaning: "고독, 독립심, 강한 생존 본능",
  },
  {
    id: "ani-5",
    label: "독수리",
    type: "animal",
    gradient: "linear-gradient(135deg, #1E40AF 0%, #60A5FA 100%)",
    emoji: "🦅",
    description: "하늘을 나는 독수리",
    meaning: "야망, 전략적 사고, 큰 그림 지향",
  },
  {
    id: "ani-6",
    label: "여우",
    type: "animal",
    gradient: "linear-gradient(135deg, #DC2626 0%, #F97316 100%)",
    emoji: "🦊",
    description: "영리한 여우",
    meaning: "영리함, 적응력, 기민함",
  },
  {
    id: "ani-7",
    label: "곰",
    type: "animal",
    gradient: "linear-gradient(135deg, #78350F 0%, #B45309 100%)",
    emoji: "🐻",
    description: "든든한 곰",
    meaning: "보호 본능, 든든함, 온화한 힘",
  },
  {
    id: "ani-8",
    label: "부엉이",
    type: "animal",
    gradient: "linear-gradient(135deg, #312E81 0%, #7C3AED 100%)",
    emoji: "🦉",
    description: "지혜로운 부엉이",
    meaning: "관찰력, 직관, 지적 탐구심",
  },
];

// ────────────────────────────────────────
// 착시/첫인상 SVG 패턴 (4개)
// ────────────────────────────────────────
export const ILLUSION_OPTIONS: VisualOption[] = [
  {
    id: "ill-1",
    label: "패턴 A",
    type: "illusion-svg",
    gradient: "linear-gradient(45deg, #1a1a2e 25%, #16213e 25%, #16213e 50%, #1a1a2e 50%, #1a1a2e 75%, #16213e 75%)",
    emoji: "🔲",
    description: "기하학적 패턴",
    meaning: "분석적 사고, 체계적 관찰",
  },
  {
    id: "ill-2",
    label: "패턴 B",
    type: "illusion-svg",
    gradient: "radial-gradient(circle at 30% 30%, #FF6B6B 0%, #4ECDC4 40%, #45B7D1 70%, #96CEB4 100%)",
    emoji: "🔮",
    description: "동심원 패턴",
    meaning: "감성적 인식, 직관적 판단",
  },
  {
    id: "ill-3",
    label: "패턴 C",
    type: "illusion-svg",
    gradient: "linear-gradient(60deg, #8B5CF6 0%, #EC4899 33%, #F97316 66%, #EAB308 100%)",
    emoji: "🌈",
    description: "사선 그라디언트",
    meaning: "창의성, 다양한 시각",
  },
  {
    id: "ill-4",
    label: "패턴 D",
    type: "illusion-svg",
    gradient: "linear-gradient(135deg, #0F0F23 0%, #1a0533 50%, #2d1b69 100%)",
    emoji: "🌑",
    description: "어두운 심연",
    meaning: "내면 탐색, 무의식적 두려움",
  },
];

// ────────────────────────────────────────
// 카드 앞면 디자인 (6개)
// ────────────────────────────────────────
export const CARD_ABSTRACT_OPTIONS: VisualOption[] = [
  {
    id: "card-1",
    label: "별빛 카드",
    type: "card-abstract",
    gradient: "linear-gradient(135deg, #0c0c1e 0%, #1a1a4e 50%, #2d1b69 100%)",
    emoji: "⭐",
    description: "별이 빛나는 밤하늘",
    meaning: "가능성, 꿈, 먼 미래 지향",
  },
  {
    id: "card-2",
    label: "파도 카드",
    type: "card-abstract",
    gradient: "linear-gradient(135deg, #0077B6 0%, #00B4D8 50%, #90E0EF 100%)",
    emoji: "🌊",
    description: "넘실대는 파도",
    meaning: "감정 기복, 자유로운 흐름",
  },
  {
    id: "card-3",
    label: "불꽃 카드",
    type: "card-abstract",
    gradient: "linear-gradient(135deg, #FF4500 0%, #FF8C00 50%, #FFD700 100%)",
    emoji: "🔥",
    description: "타오르는 불꽃",
    meaning: "열정, 충동, 즉각적 행동",
  },
  {
    id: "card-4",
    label: "새벽 카드",
    type: "card-abstract",
    gradient: "linear-gradient(135deg, #2C3E50 0%, #4CA1AF 50%, #C4E0E5 100%)",
    emoji: "🌅",
    description: "새벽빛",
    meaning: "새 시작, 희망, 차분한 결단",
  },
  {
    id: "card-5",
    label: "꽃잎 카드",
    type: "card-abstract",
    gradient: "linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%)",
    emoji: "🌸",
    description: "봄꽃 잎",
    meaning: "감수성, 섬세함, 배려 욕구",
  },
  {
    id: "card-6",
    label: "대지 카드",
    type: "card-abstract",
    gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 50%, #DAA520 100%)",
    emoji: "🌍",
    description: "풍요로운 대지",
    meaning: "안정, 실용성, 현실 감각",
  },
];

// ────────────────────────────────────────
// 포맷별 기본 시각 옵션 반환
// ────────────────────────────────────────
export type VisualOptionSet = "gradient" | "color" | "door" | "path" | "room" | "animal" | "illusion" | "card";

export function getVisualOptions(set: VisualOptionSet): VisualOption[] {
  switch (set) {
    case "gradient":
      return GRADIENT_OPTIONS;
    case "color":
      return COLOR_OPTIONS;
    case "door":
      return DOOR_OPTIONS;
    case "path":
      return PATH_OPTIONS;
    case "room":
      return ROOM_OPTIONS;
    case "animal":
      return ANIMAL_OPTIONS;
    case "illusion":
      return ILLUSION_OPTIONS;
    case "card":
      return CARD_ABSTRACT_OPTIONS;
  }
}

// slug에서 시각 옵션 세트를 추론
export function inferVisualSet(slug: string): VisualOptionSet {
  if (slug.includes("mun") || slug.includes("door") || slug.includes("gate")) return "door";
  if (slug.includes("gil") || slug.includes("path") || slug.includes("road")) return "path";
  if (slug.includes("bang") || slug.includes("room")) return "room";
  if (slug.includes("dongmul") || slug.includes("animal")) return "animal";
  if (slug.includes("saek") || slug.includes("color")) return "color";
  if (slug.includes("chaksi") || slug.includes("illusion")) return "illusion";
  if (slug.includes("kadeu") || slug.includes("card")) return "card";
  return "gradient";
}
