// Mock 데이터 생성기 - 실제 서비스 연결 전 UI 개발/데모용

import type {
  KpiMetric, MultiSeriesPoint, ContentPerformance, AdminUser,
  LuckyGame, AdSlot, SponsorInquiry, AffiliateItem, EventItem,
  BadgeItem, ShopItemAdmin, ExperimentItem, MissionAdmin, RankInfo, DashboardSummary
} from "./types";

// 결정론적 시드 기반 의사난수
function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function randRange(min: number, max: number, seed: number): number {
  return Math.round(min + seededRand(seed) * (max - min));
}

// 날짜 기반 시드
const TODAY_SEED = new Date().getDate() + new Date().getMonth() * 31;

export function getMockDashboardSummary(): DashboardSummary {
  return {
    dau: randRange(1200, 3800, TODAY_SEED + 1),
    pageViews: randRange(6000, 18000, TODAY_SEED + 2),
    avgPagesPerSession: parseFloat((3.2 + seededRand(TODAY_SEED + 3) * 3).toFixed(1)),
    avgSessionDuration: randRange(180, 420, TODAY_SEED + 4),
    contentStarts: randRange(2000, 7000, TODAY_SEED + 5),
    contentCompletionRate: parseFloat((48 + seededRand(TODAY_SEED + 6) * 20).toFixed(1)),
    resultShares: randRange(80, 350, TODAY_SEED + 7),
    signups: randRange(15, 80, TODAY_SEED + 8),
    checkIns: randRange(300, 900, TODAY_SEED + 9),
    pointsEarned: randRange(50000, 180000, TODAY_SEED + 10),
    luckyPlays: randRange(400, 1200, TODAY_SEED + 11),
    togetherRoomsCreated: randRange(30, 120, TODAY_SEED + 12),
  };
}

export function getMockKpiMetrics(): KpiMetric[] {
  const s = getMockDashboardSummary();
  const metrics: KpiMetric[] = [
    { id: "dau", label: "DAU", value: s.dau, displayValue: s.dau.toLocaleString(), changeRate: 12.4, changeLabel: "전일 대비", trend: "up", description: "일간 활성 사용자 수" },
    { id: "pv", label: "페이지뷰", value: s.pageViews, displayValue: s.pageViews.toLocaleString(), changeRate: 8.2, changeLabel: "전일 대비", trend: "up", description: "총 페이지뷰 수" },
    { id: "pps", label: "세션당 PV", value: s.avgPagesPerSession, displayValue: `${s.avgPagesPerSession}`, changeRate: -1.3, changeLabel: "전일 대비", trend: "down", description: "세션당 평균 페이지뷰" },
    { id: "dur", label: "평균 체류시간", value: s.avgSessionDuration, displayValue: `${Math.floor(s.avgSessionDuration / 60)}분 ${s.avgSessionDuration % 60}초`, changeRate: 5.1, changeLabel: "전일 대비", trend: "up", description: "평균 세션 체류시간" },
    { id: "starts", label: "콘텐츠 시작", value: s.contentStarts, displayValue: s.contentStarts.toLocaleString(), changeRate: 15.7, changeLabel: "전일 대비", trend: "up", description: "콘텐츠 시작 수" },
    { id: "comp", label: "콘텐츠 완료율", value: s.contentCompletionRate, displayValue: `${s.contentCompletionRate}%`, changeRate: 2.3, changeLabel: "전일 대비", trend: "up", description: "시작 대비 완료율", unit: "%" },
    { id: "shares", label: "결과 공유", value: s.resultShares, displayValue: s.resultShares.toLocaleString(), changeRate: -4.2, changeLabel: "전일 대비", trend: "down", description: "결과 공유 수" },
    { id: "signups", label: "회원가입", value: s.signups, displayValue: s.signups.toLocaleString(), changeRate: 22.5, changeLabel: "전일 대비", trend: "up", description: "신규 회원가입 수" },
    { id: "checkins", label: "출석체크", value: s.checkIns, displayValue: s.checkIns.toLocaleString(), changeRate: 3.8, changeLabel: "전일 대비", trend: "up", description: "오늘 출석체크 수" },
    { id: "points", label: "포인트 지급량", value: s.pointsEarned, displayValue: `${(s.pointsEarned / 1000).toFixed(0)}K P`, changeRate: 7.1, changeLabel: "전일 대비", trend: "up", description: "오늘 지급된 포인트" },
    { id: "lucky", label: "럭키존 참여", value: s.luckyPlays, displayValue: s.luckyPlays.toLocaleString(), changeRate: 18.9, changeLabel: "전일 대비", trend: "up", description: "럭키존 플레이 수" },
    { id: "together", label: "같이놀기 방", value: s.togetherRoomsCreated, displayValue: s.togetherRoomsCreated.toLocaleString(), changeRate: 9.3, changeLabel: "전일 대비", trend: "up", description: "생성된 방 수" },
  ];
  return metrics;
}

export function getMockTrafficSeries(days: number = 7): MultiSeriesPoint[] {
  const result: MultiSeriesPoint[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const seed = d.getDate() + d.getMonth() * 31;
    result.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      dau: randRange(900, 4200, seed),
      pv: randRange(5000, 20000, seed + 1),
      sessions: randRange(800, 3500, seed + 2),
    });
  }
  return result;
}

export function getMockFunnelMetrics() {
  const s = getMockDashboardSummary();
  return [
    { step: "페이지뷰", value: s.pageViews, color: "#4F46E5" },
    { step: "콘텐츠 시작", value: s.contentStarts, color: "#7C3AED" },
    { step: "콘텐츠 완료", value: Math.round(s.contentStarts * s.contentCompletionRate / 100), color: "#10B981" },
    { step: "결과 공유", value: s.resultShares, color: "#F59E0B" },
    { step: "회원가입", value: s.signups, color: "#EF4444" },
    { step: "출석체크", value: s.checkIns, color: "#3B82F6" },
  ];
}

export function getMockContentPerformance(): ContentPerformance[] {
  const contents = [
    { id: "gen-001", title: "나의 연애 고장 패턴 테스트", kind: "test", category: "연애", route: "/test/yeonae-gojang-paeteon" },
    { id: "gen-005", title: "전 애인이 나를 못 잊는 이유", kind: "test", category: "연애", route: "/test/jeon-aein-mot-nitneum" },
    { id: "gen-019", title: "내가 손절당하는 숨은 이유", kind: "test", category: "인간관계", route: "/test/sohnjeol-dang-ha-neun-iyu" },
    { id: "gen-020", title: "친구들이 보는 내 진짜 이미지", kind: "test", category: "친구", route: "/test/chingu-jinjja-imiji" },
    { id: "gen-021", title: "단톡방에서 내 역할 테스트", kind: "test", category: "친구", route: "/test/dantok-yeok-hal" },
    { id: "gen-048", title: "돈쓰기 시뮬레이터", kind: "test", category: "돈소비", route: "/test/don-sseugi-simulator" },
    { id: "wc-001", title: "음식 이상형 월드컵", kind: "worldcup", category: "월드컵", route: "/games/worldcup/food" },
    { id: "wc-002", title: "여행지 이상형 월드컵", kind: "worldcup", category: "월드컵", route: "/games/worldcup/travel" },
    { id: "iq-001", title: "초성퀴즈 일반", kind: "initial-quiz", category: "퀴즈", route: "/games/initial-quiz/basic" },
    { id: "exp-001", title: "눈 테스트", kind: "experiment", category: "웹실험", route: "/experiments/eye-test" },
    { id: "lucky-main", title: "럭키존 사다리", kind: "lucky", category: "럭키존", route: "/lucky/ladder" },
    { id: "tg-001", title: "같이 밸런스게임", kind: "together", category: "같이놀기", route: "/together" },
  ];

  return contents.map((c, i) => {
    const seed = i + TODAY_SEED;
    const impressions = randRange(200, 2500, seed);
    const starts = Math.round(impressions * (0.3 + seededRand(seed + 1) * 0.5));
    const completes = Math.round(starts * (0.35 + seededRand(seed + 2) * 0.45));
    const shares = Math.round(completes * (0.02 + seededRand(seed + 3) * 0.12));
    const signups = Math.round(shares * (0.05 + seededRand(seed + 4) * 0.15));
    const completionRate = starts > 0 ? Math.round((completes / starts) * 100) : 0;
    const shareRate = completes > 0 ? parseFloat(((shares / completes) * 100).toFixed(1)) : 0;
    const signupRate = parseFloat(((signups / Math.max(impressions, 1)) * 100).toFixed(2));
    const revenueScore = randRange(3, 10, seed + 5);
    const viralScore = randRange(3, 10, seed + 6);
    const rec = completionRate >= 60 && shareRate >= 3 ? "promote"
      : completionRate < 35 ? "improve"
      : shareRate < 1 ? "improve" : "keep";

    return {
      ...c,
      qualityTier: i < 6 ? "polished" : "normal",
      impressions, starts, completes, shares, signups,
      avgTimeSeconds: randRange(90, 360, seed + 7),
      completionRate, shareRate, signupRate,
      revenueScore, viralScore,
      recommendation: rec as ContentPerformance["recommendation"],
      isHot: i < 3, isNew: i > 8, isFeatured: i < 4,
    } as ContentPerformance;
  });
}

export function getMockAdminUsers(): AdminUser[] {
  const nicknames = ["갈색고양이", "달빛토끼", "파란하늘77", "초록바람", "빨간사과", "하얀구름", "노란별빛", "검은밤하늘", "은빛달", "황금별"];
  const ranks = [
    { id: "sergeant", name: "병장" }, { id: "staff_sgt", name: "하사" },
    { id: "corporal", name: "상병" }, { id: "private1", name: "일병" },
    { id: "sgt_major", name: "중사" }, { id: "officer", name: "소위" }
  ];
  return nicknames.map((nickname, i) => {
    const seed = i + 100;
    const rank = ranks[i % ranks.length];
    return {
      id: `user-${i + 1}`,
      nickname,
      rankId: rank.id,
      rankName: rank.name,
      points: randRange(200, 8000, seed),
      joinedAt: new Date(Date.now() - randRange(1, 90, seed + 1) * 86400000).toISOString(),
      lastActiveAt: new Date(Date.now() - randRange(0, 7, seed + 2) * 86400000).toISOString(),
      checkInDays: randRange(1, 45, seed + 3),
      completedCount: randRange(2, 60, seed + 4),
      togetherCount: randRange(0, 15, seed + 5),
      luckyCount: randRange(0, 30, seed + 6),
      inviteCount: randRange(0, 5, seed + 7),
      status: i < 2 ? "new" : i > 7 ? "dormant" : "active",
    } as AdminUser;
  });
}

export function getMockLuckyGames(): LuckyGame[] {
  return [
    { id: "ladder", name: "사다리타기", emoji: "🪜", plays: randRange(200, 600, 201), winRate: 52, pointsIn: randRange(20000, 60000, 202), pointsOut: randRange(18000, 55000, 203), netPoints: -randRange(1000, 5000, 204), enabled: true },
    { id: "rps", name: "가위바위보", emoji: "✊", plays: randRange(150, 450, 211), winRate: 49, pointsIn: randRange(15000, 45000, 212), pointsOut: randRange(14000, 43000, 213), netPoints: -randRange(500, 3000, 214), enabled: true },
    { id: "ox", name: "OX퀴즈", emoji: "⭕", plays: randRange(100, 350, 221), winRate: 51, pointsIn: randRange(10000, 35000, 222), pointsOut: randRange(9500, 34000, 223), netPoints: -randRange(200, 2000, 224), enabled: true },
    { id: "roulette", name: "룰렛", emoji: "🎰", plays: randRange(80, 250, 231), winRate: 38, pointsIn: randRange(8000, 25000, 232), pointsOut: randRange(7000, 23000, 233), netPoints: -randRange(500, 2500, 234), enabled: true },
    { id: "bomb", name: "폭탄피하기", emoji: "💣", plays: randRange(60, 200, 241), winRate: 45, pointsIn: randRange(6000, 20000, 242), pointsOut: randRange(5500, 19000, 243), netPoints: -randRange(300, 1500, 244), enabled: true },
    { id: "box", name: "보물상자", emoji: "📦", plays: randRange(50, 180, 251), winRate: 33, pointsIn: randRange(5000, 18000, 252), pointsOut: randRange(4500, 16000, 253), netPoints: -randRange(200, 1000, 254), enabled: true },
    { id: "odd_even", name: "홀짝", emoji: "🎲", plays: randRange(120, 380, 261), winRate: 50, pointsIn: randRange(12000, 38000, 262), pointsOut: randRange(11500, 37000, 263), netPoints: -randRange(300, 1500, 264), enabled: true },
  ];
}

export function getMockAdSlots(): AdSlot[] {
  return [
    { id: "main_mid", name: "메인 중간", location: "메인페이지 스크롤 중간", device: "all", enabled: true, estimatedImpressions: randRange(3000, 8000, 301), rpm: 1200, estimatedRevenue: 0, riskLevel: "low", notes: "" },
    { id: "category_feed", name: "카테고리 피드", location: "카테고리 목록 사이", device: "all", enabled: true, estimatedImpressions: randRange(2000, 6000, 302), rpm: 1000, estimatedRevenue: 0, riskLevel: "low", notes: "" },
    { id: "test_detail_bottom", name: "테스트 하단", location: "테스트 상세 페이지 하단", device: "all", enabled: true, estimatedImpressions: randRange(1500, 5000, 303), rpm: 1500, estimatedRevenue: 0, riskLevel: "low", notes: "" },
    { id: "game_result_bottom", name: "게임 결과 하단", location: "게임 결과 화면 하단", device: "all", enabled: true, estimatedImpressions: randRange(1000, 4000, 304), rpm: 1800, estimatedRevenue: 0, riskLevel: "low", notes: "" },
    { id: "result_recommend", name: "결과 추천 사이", location: "결과 추천 콘텐츠 사이", device: "all", enabled: false, estimatedImpressions: randRange(800, 3000, 305), rpm: 1200, estimatedRevenue: 0, riskLevel: "medium", notes: "UX 영향 검토 필요" },
    { id: "together_lobby", name: "같이놀기 로비", location: "같이놀기 대기실 하단", device: "mobile", enabled: true, estimatedImpressions: randRange(400, 1500, 306), rpm: 800, estimatedRevenue: 0, riskLevel: "low", notes: "" },
    { id: "lucky_result", name: "럭키존 결과", location: "럭키존 결과 화면 하단", device: "all", enabled: false, estimatedImpressions: randRange(600, 2000, 307), rpm: 1000, estimatedRevenue: 0, riskLevel: "high", notes: "럭키존 결과 후 광고는 정책 검토 필요" },
    { id: "daily_bottom", name: "데일리 하단", location: "출석/미션 페이지 하단", device: "all", enabled: true, estimatedImpressions: randRange(500, 1800, 308), rpm: 900, estimatedRevenue: 0, riskLevel: "low", notes: "" },
  ].map(slot => ({ ...slot, estimatedRevenue: Math.round((slot.estimatedImpressions / 1000) * slot.rpm) } as AdSlot));
}

export function getMockSponsorInquiries(): SponsorInquiry[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("sslab_sponsor_inquiries");
    const real: SponsorInquiry[] = saved ? JSON.parse(saved) : [];
    const mock: SponsorInquiry[] = [
      { id: "sp-001", brand: "카페베네 마케팅팀", contact: "김지현", phone: "010-1234-5678", email: "marketing@caffebene.com", product: "브랜드 테스트 제작", budget: "50만원", message: "카페 메뉴 테스트 제작 문의드립니다.", status: "reviewing", submittedAt: new Date(Date.now() - 5 * 86400000).toISOString(), notes: "제안서 초안 작성 중" },
      { id: "sp-002", brand: "여기어때 파트너십", contact: "박민준", phone: "010-9876-5432", email: "partner@yeogi.com", product: "카테고리 스폰서", budget: "100만원", message: "여행 카테고리 스폰서십 문의", status: "proposed", submittedAt: new Date(Date.now() - 12 * 86400000).toISOString(), notes: "제안서 발송 완료, 답변 대기" },
      { id: "sp-003", brand: "올리브영 디지털팀", contact: "이수진", phone: "010-5555-6666", email: "digital@oliveyoung.com", product: "브랜드 월드컵 제작", budget: "80만원", message: "뷰티 월드컵 제작 문의드려요.", status: "new", submittedAt: new Date(Date.now() - 1 * 86400000).toISOString(), notes: "" },
    ];
    return [...real, ...mock];
  } catch {
    return [];
  }
}

export function getMockAffiliateItems(): AffiliateItem[] {
  return [
    { id: "aff-001", name: "배달의민족 쿠폰", contentId: "wc-food", contentTitle: "음식 월드컵", category: "음식", clicks: randRange(80, 300, 401), conversions: randRange(5, 30, 402), estimatedRevenue: randRange(15000, 60000, 403), status: "active" },
    { id: "aff-002", name: "야놀자 숙박", contentId: "travel-test", contentTitle: "여행지 테스트", category: "여행", clicks: randRange(50, 200, 411), conversions: randRange(3, 20, 412), estimatedRevenue: randRange(25000, 100000, 413), status: "active" },
    { id: "aff-003", name: "클래스101 강의", contentId: "brain-game", contentTitle: "두뇌게임", category: "교육", clicks: randRange(30, 150, 421), conversions: randRange(2, 15, 422), estimatedRevenue: randRange(10000, 45000, 423), status: "paused" },
    { id: "aff-004", name: "쿠팡 파트너스", contentId: "gen-048", contentTitle: "돈쓰기 시뮬레이터", category: "쇼핑", clicks: randRange(60, 250, 431), conversions: randRange(8, 40, 432), estimatedRevenue: randRange(20000, 80000, 433), status: "active" },
    { id: "aff-005", name: "멜론 구독", contentId: "music-test", contentTitle: "음악 취향 테스트", category: "문화", clicks: randRange(20, 100, 441), conversions: randRange(1, 10, 442), estimatedRevenue: randRange(5000, 25000, 443), status: "draft" },
  ];
}

export function getMockEvents(): EventItem[] {
  return [
    { id: "ev-001", name: "7일 연속 출석 이벤트", startDate: "2026-05-01", endDate: "2026-05-31", status: "active", participants: randRange(500, 1500, 501), completions: randRange(200, 600, 502), pointsAwarded: randRange(30000, 90000, 503), badgesAwarded: randRange(100, 400, 504), signupContribution: randRange(20, 80, 505), enabled: true },
    { id: "ev-002", name: "럭키존 주간 챌린지", startDate: "2026-05-13", endDate: "2026-05-19", status: "ended", participants: randRange(300, 800, 511), completions: randRange(150, 400, 512), pointsAwarded: randRange(20000, 60000, 513), badgesAwarded: randRange(50, 200, 514), signupContribution: randRange(10, 40, 515), enabled: false },
    { id: "ev-003", name: "월드컵 10개 완료 이벤트", startDate: "2026-05-18", endDate: "2026-06-18", status: "active", participants: randRange(200, 600, 521), completions: randRange(50, 200, 522), pointsAwarded: randRange(15000, 45000, 523), badgesAwarded: randRange(30, 120, 524), signupContribution: randRange(5, 30, 525), enabled: true },
    { id: "ev-004", name: "친구 초대 이벤트", startDate: "2026-06-01", endDate: "2026-06-30", status: "upcoming", participants: 0, completions: 0, pointsAwarded: 0, badgesAwarded: 0, signupContribution: 0, enabled: true },
  ];
}

export function getMockBadges(): BadgeItem[] {
  return [
    { id: "first_test", name: "첫 테스트", emoji: "🎯", condition: "심리테스트 첫 완료", holders: randRange(800, 2000, 601), rarity: "common", isLimited: false, isVisible: true },
    { id: "test_10", name: "테스트 마니아", emoji: "🧠", condition: "테스트 10회 완료", holders: randRange(200, 800, 611), rarity: "rare", isLimited: false, isVisible: true },
    { id: "lucky_winner", name: "럭키스타", emoji: "⭐", condition: "럭키존 1000P 획득", holders: randRange(50, 200, 621), rarity: "rare", isLimited: false, isVisible: true },
    { id: "worldcup_10", name: "월드컵 마스터", emoji: "👑", condition: "월드컵 10회 완주", holders: randRange(30, 120, 631), rarity: "epic", isLimited: false, isVisible: true },
    { id: "checkin_30", name: "한달 개근", emoji: "🔥", condition: "30일 연속 체크인", holders: randRange(10, 60, 641), rarity: "epic", isLimited: false, isVisible: true },
    { id: "rich", name: "포인트 부자", emoji: "💰", condition: "누적 10,000P 달성", holders: randRange(5, 30, 651), rarity: "legendary", isLimited: false, isVisible: true },
    { id: "inviter", name: "소셜 커넥터", emoji: "🤝", condition: "친구 3명 초대", holders: randRange(15, 50, 661), rarity: "rare", isLimited: false, isVisible: true },
    { id: "new_year_2026", name: "2026 신년 한정", emoji: "🎊", condition: "2026년 1월 가입", holders: randRange(100, 300, 671), rarity: "legendary", isLimited: true, isVisible: true },
  ];
}

export function getMockShopItems(): ShopItemAdmin[] {
  return [
    { id: "nick_gold", name: "닉네임 골드", category: "닉네임", price: 500, purchases: randRange(50, 200, 701), totalPointsSpent: 0, isLimited: false, isActive: true },
    { id: "nick_violet", name: "닉네임 바이올렛", category: "닉네임", price: 300, purchases: randRange(30, 150, 711), totalPointsSpent: 0, isLimited: false, isActive: true },
    { id: "border_rainbow", name: "무지개 테두리", category: "프로필", price: 800, purchases: randRange(20, 100, 721), totalPointsSpent: 0, isLimited: false, isActive: true },
    { id: "title_lucky", name: "칭호: 럭키스타", category: "칭호", price: 1000, purchases: randRange(10, 60, 731), totalPointsSpent: 0, isLimited: false, isActive: true },
    { id: "slot_boost", name: "럭키존 부스터 x2", category: "부스터", price: 400, purchases: randRange(40, 180, 741), totalPointsSpent: 0, isLimited: false, isActive: true },
    { id: "ai_skin_1", name: "AI 친구 스킨 귀여운봇", category: "AI친구", price: 600, purchases: randRange(5, 40, 751), totalPointsSpent: 0, isLimited: true, isActive: false },
  ].map(item => ({ ...item, totalPointsSpent: item.purchases * item.price }));
}

export function getMockExperiments(): ExperimentItem[] {
  return [
    { id: "exp-hero-1", name: "히어로 문구 A/B", variantA: "심심할 때 바로 즐기는 포털", variantB: "오늘 뭐할지 모르겠을 때", impressionsA: randRange(1000, 3000, 801), impressionsB: randRange(1000, 3000, 802), clickRateA: 4.2, clickRateB: 5.8, completionRateA: 52.1, completionRateB: 58.3, signupRateA: 1.8, signupRateB: 2.4, winner: "B", status: "ended" },
    { id: "exp-cta-1", name: "CTA 문구 테스트", variantA: "지금 시작하기", variantB: "무료로 해보기", impressionsA: randRange(800, 2500, 811), impressionsB: randRange(800, 2500, 812), clickRateA: 6.1, clickRateB: 7.3, completionRateA: 55.0, completionRateB: 56.2, signupRateA: 2.1, signupRateB: 2.3, winner: "running", status: "running" },
    { id: "exp-share-1", name: "공유 문구 테스트", variantA: "결과 카드 공유하기", variantB: "친구한테 보내보기", impressionsA: randRange(500, 1500, 821), impressionsB: randRange(500, 1500, 822), clickRateA: 2.8, clickRateB: 3.9, completionRateA: 0, completionRateB: 0, signupRateA: 0, signupRateB: 0, winner: "B", status: "ended" },
  ];
}

export function getMockMissions(): MissionAdmin[] {
  return [
    { id: "daily_test", name: "테스트 1개 완료", description: "아무 심리테스트나 완료", points: 50, completionRate: randRange(40, 70, 901), totalCompletions: randRange(200, 800, 902), signupContribution: randRange(5, 20, 903), revisitContribution: randRange(20, 60, 904), enabled: true, type: "daily" },
    { id: "daily_worldcup", name: "월드컵 참여", description: "이상형 월드컵 1판 완주", points: 50, completionRate: randRange(30, 60, 911), totalCompletions: randRange(150, 600, 912), signupContribution: randRange(3, 15, 913), revisitContribution: randRange(15, 50, 914), enabled: true, type: "daily" },
    { id: "daily_poll", name: "투표 1회 참여", description: "HOT 투표에 답하기", points: 30, completionRate: randRange(50, 80, 921), totalCompletions: randRange(300, 1000, 922), signupContribution: randRange(2, 10, 923), revisitContribution: randRange(25, 70, 924), enabled: true, type: "daily" },
    { id: "daily_lucky", name: "럭키존 1회 도전", description: "럭키존 아무 게임 1회", points: 40, completionRate: randRange(35, 65, 931), totalCompletions: randRange(180, 700, 932), signupContribution: randRange(3, 12, 933), revisitContribution: randRange(20, 55, 934), enabled: true, type: "daily" },
    { id: "daily_together", name: "같이놀기 방 만들기", description: "같이놀기 방 1개 생성", points: 60, completionRate: randRange(10, 30, 941), totalCompletions: randRange(50, 200, 942), signupContribution: randRange(8, 25, 943), revisitContribution: randRange(15, 45, 944), enabled: true, type: "daily" },
  ];
}

export function getMockRanks(): RankInfo[] {
  const ranks = [
    { id: "trainee", name: "훈련병", icon: "🪖", minPoints: 0, maxPoints: 99, tier: "enlisted" },
    { id: "private2", name: "이등병", icon: "⭐", minPoints: 100, maxPoints: 299, tier: "enlisted" },
    { id: "private1", name: "일병", icon: "⭐⭐", minPoints: 300, maxPoints: 699, tier: "enlisted" },
    { id: "corporal", name: "상병", icon: "⭐⭐⭐", minPoints: 700, maxPoints: 1499, tier: "enlisted" },
    { id: "sergeant", name: "병장", icon: "🎖️", minPoints: 1500, maxPoints: 2999, tier: "enlisted" },
    { id: "staff_sgt", name: "하사", icon: "🎖️🎖️", minPoints: 3000, maxPoints: 5999, tier: "nco" },
    { id: "sgt_major", name: "중사", icon: "🏅", minPoints: 6000, maxPoints: 9999, tier: "nco" },
    { id: "msgt", name: "상사", icon: "🏅🏅", minPoints: 10000, maxPoints: 14999, tier: "nco" },
    { id: "2lt", name: "소위", icon: "🌟", minPoints: 15000, maxPoints: 19999, tier: "officer" },
    { id: "1lt", name: "중위", icon: "🌟🌟", minPoints: 20000, maxPoints: 29999, tier: "officer" },
    { id: "cpt", name: "대위", icon: "🌟🌟🌟", minPoints: 30000, maxPoints: 49999, tier: "officer" },
    { id: "maj", name: "소령", icon: "💫", minPoints: 50000, maxPoints: 79999, tier: "field" },
    { id: "ltc", name: "중령", icon: "💫💫", minPoints: 80000, maxPoints: 119999, tier: "field" },
    { id: "col", name: "대령", icon: "👑", minPoints: 120000, maxPoints: 199999, tier: "field" },
    { id: "gen1", name: "준장", icon: "⚡", minPoints: 200000, maxPoints: 299999, tier: "general" },
    { id: "gen2", name: "소장", icon: "⚡⚡", minPoints: 300000, maxPoints: 499999, tier: "general" },
    { id: "gen3", name: "중장", icon: "⚡⚡⚡", minPoints: 500000, maxPoints: 799999, tier: "general" },
    { id: "gen4", name: "대장", icon: "⚡⚡⚡⚡", minPoints: 800000, maxPoints: 999999, tier: "general" },
    { id: "marshal", name: "원수", icon: "🌈", minPoints: 1000000, maxPoints: 9999999, tier: "legend" },
  ];

  return ranks.map((r, i) => ({
    ...r,
    memberCount: i < 5 ? randRange(100, 800, 1000 + i) : i < 9 ? randRange(20, 150, 1000 + i) : randRange(1, 20, 1000 + i),
    avgActivity: randRange(5, 50, 1050 + i),
  }));
}
