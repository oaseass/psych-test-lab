// =====================================================
// 테스트/결과별 시각 정보 매핑
// =====================================================

export type TestIllustration = {
  /** 카드 썸네일 대표 이모지 */
  emoji: string;
  /** 배경 그라데이션 (Tailwind gradient class) */
  gradient: string;
  /** 포인트 컬러 hex */
  accentColor: string;
  /** 배경 연한 컬러 hex */
  bgColor: string;
  /** 카드 썸네일용 장식 이모지 목록 */
  decorEmojis: string[];
};

export type ResultIllustration = {
  /** 결과 대표 이모지 (크게 표시) */
  emoji: string;
  /** 결과 카드 헤더 그라데이션 */
  gradient: string;
  /** 결과 accent 색상 */
  accentColor: string;
  /** 결과 배경 연한 색상 */
  bgColor: string;
};

// ──────────────────────────────
// 카테고리 기본 비주얼
// ──────────────────────────────
const CATEGORY_VISUALS: Record<string, TestIllustration> = {
  yeonae: {
    emoji: "💕",
    gradient: "from-pink-500 via-rose-400 to-pink-400",
    accentColor: "#EC4899",
    bgColor: "#FDF2F8",
    decorEmojis: ["💔", "✨", "🌸"],
  },
  sseom: {
    emoji: "💘",
    gradient: "from-pink-400 via-fuchsia-400 to-rose-400",
    accentColor: "#F472B6",
    bgColor: "#FFF0F6",
    decorEmojis: ["💌", "🌷", "✨"],
  },
  ibyeol: {
    emoji: "💔",
    gradient: "from-violet-500 via-purple-400 to-indigo-400",
    accentColor: "#8B5CF6",
    bgColor: "#F5F3FF",
    decorEmojis: ["🌧️", "😢", "🍂"],
  },
  gyeolhon: {
    emoji: "💍",
    gradient: "from-fuchsia-500 via-pink-400 to-violet-400",
    accentColor: "#D946EF",
    bgColor: "#FDF4FF",
    decorEmojis: ["💐", "🥂", "✨"],
  },
  "ingangwan-gye": {
    emoji: "🤝",
    gradient: "from-indigo-500 via-blue-400 to-violet-400",
    accentColor: "#6366F1",
    bgColor: "#EEF2FF",
    decorEmojis: ["👥", "💬", "🔗"],
  },
  chingu: {
    emoji: "👫",
    gradient: "from-emerald-500 via-green-400 to-teal-400",
    accentColor: "#22C55E",
    bgColor: "#F0FDF4",
    decorEmojis: ["🫂", "🎉", "🌈"],
  },
  jikjang: {
    emoji: "💼",
    gradient: "from-blue-500 via-sky-400 to-cyan-400",
    accentColor: "#3B82F6",
    bgColor: "#EFF6FF",
    decorEmojis: ["📊", "💻", "☕"],
  },
  "don-sobi": {
    emoji: "💰",
    gradient: "from-orange-500 via-amber-400 to-yellow-400",
    accentColor: "#F97316",
    bgColor: "#FFF7ED",
    decorEmojis: ["💸", "📈", "🏦"],
  },
  "seonggong-saup": {
    emoji: "🚀",
    gradient: "from-yellow-500 via-amber-400 to-orange-400",
    accentColor: "#EAB308",
    bgColor: "#FEFCE8",
    decorEmojis: ["🏆", "📊", "⚡"],
  },
  seonggyek: {
    emoji: "🧠",
    gradient: "from-violet-600 via-purple-500 to-indigo-500",
    accentColor: "#7C3AED",
    bgColor: "#F5F3FF",
    decorEmojis: ["⚡", "🌀", "✨"],
  },
  jajungam: {
    emoji: "🌱",
    gradient: "from-emerald-500 via-green-400 to-teal-400",
    accentColor: "#10B981",
    bgColor: "#ECFDF5",
    decorEmojis: ["🌿", "☀️", "💚"],
  },
  seuteuleseu: {
    emoji: "😤",
    gradient: "from-red-500 via-rose-400 to-orange-400",
    accentColor: "#EF4444",
    bgColor: "#FEF2F2",
    decorEmojis: ["⚡", "😰", "🔥"],
  },
  muheuishik: {
    emoji: "🔮",
    gradient: "from-blue-700 via-indigo-500 to-violet-500",
    accentColor: "#1D4ED8",
    bgColor: "#EFF6FF",
    decorEmojis: ["🌙", "⭐", "💫"],
  },
  gajok: {
    emoji: "🏠",
    gradient: "from-emerald-600 via-teal-500 to-green-500",
    accentColor: "#059669",
    bgColor: "#ECFDF5",
    decorEmojis: ["👨‍👩‍👧‍👦", "❤️", "🌳"],
  },
  "sosyal-imiji": {
    emoji: "🪞",
    gradient: "from-cyan-500 via-sky-400 to-blue-400",
    accentColor: "#0891B2",
    bgColor: "#ECFEFF",
    decorEmojis: ["✨", "👁️", "💎"],
  },
  chihyang: {
    emoji: "✨",
    gradient: "from-pink-500 via-fuchsia-400 to-purple-400",
    accentColor: "#BE185D",
    bgColor: "#FDF2F8",
    decorEmojis: ["🎨", "🎵", "☕"],
  },
};

// ──────────────────────────────
// 개별 테스트 슬러그별 오버라이드
// ──────────────────────────────
const TEST_OVERRIDES: Partial<Record<string, TestIllustration>> = {
  "yeonae-gojang-paeteon": {
    emoji: "💔",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-400",
    accentColor: "#F43F5E",
    bgColor: "#FFF1F2",
    decorEmojis: ["🔄", "😔", "💭"],
  },
  "kkeullim-yuhyeong": {
    emoji: "💫",
    gradient: "from-pink-500 via-rose-400 to-orange-300",
    accentColor: "#EC4899",
    bgColor: "#FDF2F8",
    decorEmojis: ["👀", "💕", "✨"],
  },
  "jeon-aein-mot-nitneum": {
    emoji: "👤",
    gradient: "from-violet-500 via-purple-400 to-pink-400",
    accentColor: "#8B5CF6",
    bgColor: "#F5F3FF",
    decorEmojis: ["💭", "🔁", "💔"],
  },
  "jipcheok-button": {
    emoji: "🔒",
    gradient: "from-purple-600 via-violet-500 to-indigo-500",
    accentColor: "#7C3AED",
    bgColor: "#F5F3FF",
    decorEmojis: ["📍", "⚓", "🧲"],
  },
  "hoepisseonghyang-testeut": {
    emoji: "🚪",
    gradient: "from-sky-500 via-blue-400 to-indigo-400",
    accentColor: "#0EA5E9",
    bgColor: "#F0F9FF",
    decorEmojis: ["🏃", "🌬️", "💨"],
  },
  "jiltu-bangshik-testeut": {
    emoji: "👁️",
    gradient: "from-amber-500 via-orange-400 to-red-400",
    accentColor: "#F59E0B",
    bgColor: "#FFFBEB",
    decorEmojis: ["⚡", "🔥", "😤"],
  },
  "sohnjeol-dang-ha-neun-iyu": {
    emoji: "✂️",
    gradient: "from-slate-500 via-gray-400 to-zinc-400",
    accentColor: "#64748B",
    bgColor: "#F8FAFC",
    decorEmojis: ["👤", "💬", "🚫"],
  },
  "don-mot-moneun-iyu": {
    emoji: "💸",
    gradient: "from-green-500 via-emerald-400 to-teal-400",
    accentColor: "#22C55E",
    bgColor: "#F0FDF4",
    decorEmojis: ["💰", "📉", "🏦"],
  },
  "tongjang-sae-neun-paeteon": {
    emoji: "🏦",
    gradient: "from-teal-500 via-cyan-400 to-sky-400",
    accentColor: "#14B8A6",
    bgColor: "#F0FDFA",
    decorEmojis: ["💳", "📊", "💴"],
  },
  "nae-seonggyek-wiheom-bubun": {
    emoji: "⚡",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
    accentColor: "#7C3AED",
    bgColor: "#F5F3FF",
    decorEmojis: ["🌩️", "🔥", "⚠️"],
  },
  "naega-muneojinan-sungan": {
    emoji: "🌊",
    gradient: "from-blue-600 via-indigo-500 to-violet-500",
    accentColor: "#2563EB",
    bgColor: "#EFF6FF",
    decorEmojis: ["💧", "🌧️", "😞"],
  },
  "insheng-kkoineum-paeteon": {
    emoji: "🌀",
    gradient: "from-indigo-600 via-violet-500 to-purple-500",
    accentColor: "#4F46E5",
    bgColor: "#EEF2FF",
    decorEmojis: ["🔄", "⛓️", "🗝️"],
  },
};

// ──────────────────────────────
// 전생 직업별 비주얼
// ──────────────────────────────
export type PastLifeJobVisual = {
  emoji: string;
  secondaryEmojis: string[];
  label: string;
  gradient: string;
  accentColor: string;
  bgColor: string;
};

export const PAST_LIFE_JOB_VISUALS: Record<string, PastLifeJobVisual> = {
  학자: {
    emoji: "📜",
    secondaryEmojis: ["📚", "🖊️", "🕯️"],
    label: "학자",
    gradient: "from-amber-700 via-yellow-600 to-amber-500",
    accentColor: "#92400E",
    bgColor: "#FFFBEB",
  },
  "궁중 화가": {
    emoji: "🎨",
    secondaryEmojis: ["🖌️", "🖼️", "✨"],
    label: "궁중 화가",
    gradient: "from-blue-600 via-indigo-500 to-purple-500",
    accentColor: "#1D4ED8",
    bgColor: "#EFF6FF",
  },
  상인: {
    emoji: "⚖️",
    secondaryEmojis: ["💰", "📦", "🗺️"],
    label: "상인",
    gradient: "from-yellow-500 via-amber-400 to-orange-400",
    accentColor: "#D97706",
    bgColor: "#FFFBEB",
  },
  검객: {
    emoji: "⚔️",
    secondaryEmojis: ["🛡️", "🌸", "🗡️"],
    label: "검객",
    gradient: "from-gray-700 via-slate-600 to-zinc-500",
    accentColor: "#374151",
    bgColor: "#F9FAFB",
  },
  점술사: {
    emoji: "🔮",
    secondaryEmojis: ["⭐", "🌙", "✨"],
    label: "점술사",
    gradient: "from-indigo-700 via-violet-600 to-purple-500",
    accentColor: "#4338CA",
    bgColor: "#EEF2FF",
  },
  의원: {
    emoji: "⚕️",
    secondaryEmojis: ["🌿", "💊", "🕯️"],
    label: "의원",
    gradient: "from-emerald-600 via-green-500 to-teal-400",
    accentColor: "#059669",
    bgColor: "#ECFDF5",
  },
  시인: {
    emoji: "🪶",
    secondaryEmojis: ["🌸", "📝", "🌙"],
    label: "시인",
    gradient: "from-rose-500 via-pink-400 to-fuchsia-400",
    accentColor: "#F43F5E",
    bgColor: "#FFF1F2",
  },
  귀족: {
    emoji: "👑",
    secondaryEmojis: ["💎", "🏰", "🌹"],
    label: "귀족",
    gradient: "from-yellow-600 via-amber-500 to-orange-400",
    accentColor: "#B45309",
    bgColor: "#FFFBEB",
  },
  농부: {
    emoji: "🌾",
    secondaryEmojis: ["🌱", "☀️", "🪵"],
    label: "농부",
    gradient: "from-green-600 via-lime-500 to-emerald-400",
    accentColor: "#15803D",
    bgColor: "#F0FDF4",
  },
  장군: {
    emoji: "🏹",
    secondaryEmojis: ["⚔️", "🛡️", "🚩"],
    label: "장군",
    gradient: "from-red-700 via-red-600 to-orange-500",
    accentColor: "#B91C1C",
    bgColor: "#FEF2F2",
  },
  무희: {
    emoji: "🎭",
    secondaryEmojis: ["🌸", "🎶", "💃"],
    label: "무희",
    gradient: "from-fuchsia-500 via-pink-400 to-rose-400",
    accentColor: "#C026D3",
    bgColor: "#FDF4FF",
  },
  도공: {
    emoji: "🏺",
    secondaryEmojis: ["🔥", "🪣", "🌍"],
    label: "도공",
    gradient: "from-orange-600 via-amber-500 to-yellow-400",
    accentColor: "#EA580C",
    bgColor: "#FFF7ED",
  },
};

/** 전생 결과 텍스트에서 직업 키워드를 찾아 시각 정보 반환 */
export function getPastLifeJobVisual(resultText: string): PastLifeJobVisual | null {
  for (const [key, visual] of Object.entries(PAST_LIFE_JOB_VISUALS)) {
    if (resultText.includes(key)) return visual;
  }
  return null;
}

// ──────────────────────────────
// 공개 API
// ──────────────────────────────

/** 테스트 슬러그로 카드 썸네일 비주얼 반환 */
export function getTestIllustration(slug: string, categorySlug: string): TestIllustration {
  return (
    TEST_OVERRIDES[slug] ??
    CATEGORY_VISUALS[categorySlug] ?? {
      emoji: "🧠",
      gradient: "from-violet-500 via-purple-400 to-indigo-400",
      accentColor: "#7C3AED",
      bgColor: "#F5F3FF",
      decorEmojis: ["✨", "⚡", "💫"],
    }
  );
}

/** 결과 카드 헤더 비주얼 반환 (카테고리 기반) */
export function getResultIllustration(categorySlug: string): ResultIllustration {
  const base = CATEGORY_VISUALS[categorySlug];
  if (!base) {
    return {
      emoji: "🧠",
      gradient: "from-violet-600 via-purple-500 to-pink-500",
      accentColor: "#7C3AED",
      bgColor: "#F5F3FF",
    };
  }
  return {
    emoji: base.emoji,
    gradient: base.gradient,
    accentColor: base.accentColor,
    bgColor: base.bgColor,
  };
}
