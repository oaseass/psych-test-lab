// ======================================================
// 반응속도 테스트 — 벤치마크 기준 / 티어 정의 / 평가 함수
// ======================================================
//
// 참고 출처:
// - Human Benchmark 중앙값 273ms  (humanbenchmark.com 통계)
// - ArealMe 일반 시각 반응속도 평균: 약 250ms
// - ArealMe "매우 빠른" 기준: 약 120ms
// - 인벤 기사 기준 현직 프로게이머 5명 측정 평균: 약 150ms
// - 기기/모니터/입력 지연: 10~50ms 이상 영향 가능
// ======================================================

export const REACTION_TIME_BENCHMARK = {
  humanBenchmarkMedian: 273,
  generalAverage: 250,
  proGamerReference: 150,
  eliteReference: 120,
  deviceLatencyNote:
    "모바일 터치, 무선 마우스, 모니터 지연에 따라 10~50ms 이상 차이가 날 수 있습니다.",
  fakerNote:
    "페이커 개인의 공식 반응속도 기록은 확인되지 않았으므로, '페이커 도전권'은 재미용 표현입니다.",
} as const;

export type ReactionTier = "SSS" | "SS" | "S" | "A" | "B" | "C" | "D" | "E" | "F";

export type TierInfo = {
  tier: ReactionTier;
  minMs: number;
  maxMs: number;
  color: string;
  bgColor: string;
  label: string;
  description: string;
};

export const REACTION_TIERS: TierInfo[] = [
  {
    tier: "SSS",
    minMs: 0,
    maxMs: 100,
    color: "#FF4500",
    bgColor: "#FFF1EC",
    label: "예지 클릭급",
    description: "실제 반응이라기보다 예측 클릭 의심권입니다.",
  },
  {
    tier: "SS",
    minMs: 101,
    maxMs: 120,
    color: "#FF7A00",
    bgColor: "#FFF5EC",
    label: "인간 한계권",
    description: "세계급 반응속도 도전권입니다.",
  },
  {
    tier: "S",
    minMs: 121,
    maxMs: 150,
    color: "#F59E0B",
    bgColor: "#FFFBEC",
    label: "페이커 도전권",
    description: "프로게이머 상위권에 가까운 반응입니다.",
  },
  {
    tier: "A",
    minMs: 151,
    maxMs: 180,
    color: "#22C55E",
    bgColor: "#F0FFF4",
    label: "프로게이머권",
    description: "일반인 기준으로는 매우 빠른 편입니다.",
  },
  {
    tier: "B",
    minMs: 181,
    maxMs: 220,
    color: "#3B82F6",
    bgColor: "#EFF6FF",
    label: "고수 게이머권",
    description: "FPS/롤 유저 중에서도 빠른 편입니다.",
  },
  {
    tier: "C",
    minMs: 221,
    maxMs: 270,
    color: "#8B5CF6",
    bgColor: "#F5F3FF",
    label: "빠른 일반인권",
    description: "평균보다 빠르거나 평균 근처입니다.",
  },
  {
    tier: "D",
    minMs: 271,
    maxMs: 320,
    color: "#6B7280",
    bgColor: "#F9FAFB",
    label: "평균권",
    description: "Human Benchmark 중앙값 근처입니다.",
  },
  {
    tier: "E",
    minMs: 321,
    maxMs: 380,
    color: "#64748B",
    bgColor: "#F8FAFC",
    label: "느긋한 반응형",
    description: "평균보다 느린 편입니다.",
  },
  {
    tier: "F",
    minMs: 381,
    maxMs: Infinity,
    color: "#94A3B8",
    bgColor: "#F1F5F9",
    label: "딴생각 중",
    description: "집중 상태나 기기 지연을 확인하고 다시 측정해보세요.",
  },
];

function getTierInfo(avgMs: number): TierInfo {
  return (
    REACTION_TIERS.find((t) => avgMs <= t.maxMs) ??
    REACTION_TIERS[REACTION_TIERS.length - 1]
  );
}

// 100ms → 100점, 450ms → 0점, 선형 보간
function computeScore(avgMs: number): number {
  if (avgMs <= 100) return 100;
  if (avgMs >= 450) return 0;
  return Math.max(0, Math.min(100, Math.round(100 - ((avgMs - 100) / 350) * 100)));
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "전설급";
  if (score >= 75) return "우수";
  if (score >= 60) return "양호";
  if (score >= 45) return "보통";
  if (score >= 30) return "미흡";
  return "요주의";
}

function getRoastLine(tier: ReactionTier, avgMs: number): string {
  const ROASTS: Record<ReactionTier, string> = {
    SSS: "이건 반응이 아니라 예지입니다. 다음 클릭도 맞추실 건가요?",
    SS: "인간 신체 한계 근처입니다. 혹시 신경계가 특별한가요?",
    S: "프로게이머도 이 정도면 칭찬받습니다. 페이커 팀 지원해보셨나요? (페이커 개인 공식 기록 미확인)",
    A: "인벤 기사 기준 LOL 프로게이머 평균 수준입니다. 솔로랭크 챌린저 도전해보세요.",
    B: "FPS 고인물 느낌납니다. 글로벌 엘리트 정도는 가능하겠는데요?",
    C: "평균보다 빠릅니다. 게임에서 반응속도 탓은 못 하겠는데요.",
    D: `${avgMs}ms, Human Benchmark 중앙값 근처입니다. 극히 정상 범위입니다.`,
    E: `${avgMs}ms, 커피 한 모금 마시고 누른 반응에 가깝습니다. 페이커 도전권은 아직입니다.`,
    F: "딴생각하셨나요? 화면에 집중하고 다시 측정해보세요.",
  };
  return ROASTS[tier];
}

export type ReactionRankResult = {
  avgMs: number;
  tier: ReactionTier;
  label: string;
  score: number;
  scoreLabel: string;
  deltaFromHumanBenchmarkMedian: number;
  deltaFromGeneralAverage: number;
  deltaFromProGamerReference: number;
  deltaFromEliteReference: number;
  summary: string;
  roastLine: string;
  shareText: string;
  caution: string[];
  tierInfo: TierInfo;
};

export function getReactionTimeRank(avgMs: number): ReactionRankResult {
  const info = getTierInfo(avgMs);
  const score = computeScore(avgMs);
  const scoreLabel = getScoreLabel(score);
  const B = REACTION_TIME_BENCHMARK;

  const deltaFromHumanBenchmarkMedian = avgMs - B.humanBenchmarkMedian;
  const deltaFromGeneralAverage = avgMs - B.generalAverage;
  const deltaFromProGamerReference = avgMs - B.proGamerReference;
  const deltaFromEliteReference = avgMs - B.eliteReference;

  const diffFromPro = Math.max(0, deltaFromProGamerReference);
  const shareText = `내 반응속도는 ${avgMs}ms, ${info.tier}티어 ${info.label}. 프로게이머권까지 ${diffFromPro}ms 남았다ㅋㅋ 너는 몇 ms? https://test-pink-two-64.vercel.app/games/reaction`;

  return {
    avgMs,
    tier: info.tier,
    label: info.label,
    score,
    scoreLabel,
    deltaFromHumanBenchmarkMedian,
    deltaFromGeneralAverage,
    deltaFromProGamerReference,
    deltaFromEliteReference,
    summary: info.description,
    roastLine: getRoastLine(info.tier, avgMs),
    shareText,
    caution: [B.deviceLatencyNote, B.fakerNote],
    tierInfo: info,
  };
}
