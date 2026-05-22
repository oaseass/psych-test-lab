// ================================================
// 랭킹 서비스 - localStorage 기반 mock 구현
// 추후 Supabase DB로 교체 가능하도록 함수명 분리
// ================================================

import type {
  RankingType,
  RankingPeriod,
  RankingEntry,
  ContentStatsEntry,
  RankingSubmitInput,
  StoredRankingRecord,
  RankingTabConfig,
} from "./types";
import type { ContentItem } from "@/lib/content/types";

const STORAGE_KEY = "sslab_rankings_db";

// ───────── 유틸 ─────────

function genId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function getStorage(): StoredRankingRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function setStorage(records: StoredRankingRecord[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function filterByPeriod(createdAt: string, period: RankingPeriod): boolean {
  const now = new Date();
  const d = new Date(createdAt);
  if (period === "today") {
    return d.toDateString() === now.toDateString();
  } else if (period === "weekly") {
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  } else if (period === "monthly") {
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    return d >= monthAgo;
  }
  return true;
}

// ───────── Mock 사용자 풀 ─────────

const MOCK_USERS = [
  { userId: "mock_u01", nickname: "모찌", rankIcon: "👑", rankName: "전설의 왕" },
  { userId: "mock_u02", nickname: "라파엘", rankIcon: "★", rankName: "은하 기사" },
  { userId: "mock_u03", nickname: "하루", rankIcon: "✦", rankName: "새벽 탐험가" },
  { userId: "mock_u04", nickname: "달빛", rankIcon: "🌙", rankName: "달빛 전사" },
  { userId: "mock_u05", nickname: "별이", rankIcon: "⭐", rankName: "별빛 수호자" },
  { userId: "mock_u06", nickname: "구름이", rankIcon: "☁️", rankName: "구름 여행자" },
  { userId: "mock_u07", nickname: "바람", rankIcon: "💨", rankName: "바람 사냥꾼" },
  { userId: "mock_u08", nickname: "소나기", rankIcon: "🌧️", rankName: "폭풍 기사" },
  { userId: "mock_u09", nickname: "햇살", rankIcon: "☀️", rankName: "태양의 전사" },
  { userId: "mock_u10", nickname: "새벽이", rankIcon: "🌅", rankName: "새벽의 방랑자" },
  { userId: "mock_u11", nickname: "나비", rankIcon: "🦋", rankName: "자유의 탐험가" },
  { userId: "mock_u12", nickname: "은빛", rankIcon: "💫", rankName: "은빛 수호자" },
];

// ───────── Mock 데이터 생성기 ─────────

function buildMockEntries(
  contentId: string,
  rankingType: RankingType,
  count: number = 10
): RankingEntry[] {
  const entries: RankingEntry[] = [];
  for (let i = 0; i < count; i++) {
    const u = MOCK_USERS[i % MOCK_USERS.length];
    const seed = (contentId.charCodeAt(0) || 0) + i * 7 + rankingType.charCodeAt(0);

    let value = 0;
    let displayValue = "";
    let subValue: string | undefined;
    let title = "";

    switch (rankingType) {
      case "time": {
        // 시간 랭킹: 낮을수록 좋음 (ms)
        const baseMs = 180 + i * 45;
        value = baseMs + Math.floor(seededRand(seed) * 30);
        displayValue = `${(value / 1000).toFixed(2)}초`;
        subValue = `${i + 1}회 도전`;
        title = `${u.nickname} 님의 기록`;
        break;
      }
      case "score": {
        const baseScore = 95 - i * 5;
        value = Math.max(1, baseScore + Math.floor(seededRand(seed) * 5));
        displayValue = `${value}점`;
        subValue = `${Math.floor(seededRand(seed + 1) * 3) + 1}콤보`;
        title = `${u.nickname} 님의 기록`;
        break;
      }
      case "worldcup_winner": {
        value = 80 - i * 6 + Math.floor(seededRand(seed) * 8);
        displayValue = `${value}회 우승`;
        title = WORLDCUP_WINNER_LABELS[contentId]?.[i % 5] ?? `항목 ${i + 1}`;
        break;
      }
      case "lucky_points": {
        value = 2000 - i * 150 + Math.floor(seededRand(seed) * 80);
        displayValue = `+${value.toLocaleString()}P`;
        subValue = `오늘 ${Math.floor(seededRand(seed) * 5) + 1}회 도전`;
        title = `${u.nickname} 님`;
        break;
      }
      case "lucky_streak": {
        value = 12 - i + Math.floor(seededRand(seed) * 3);
        displayValue = `${value}연승`;
        subValue = `누적 ${Math.floor(seededRand(seed) * 30) + 10}회 성공`;
        title = `${u.nickname} 님`;
        break;
      }
      case "together_host": {
        value = 45 - i * 3 + Math.floor(seededRand(seed) * 5);
        displayValue = `${value}회 방장`;
        subValue = `완료율 ${Math.floor(seededRand(seed) * 30) + 60}%`;
        title = `${u.nickname} 님`;
        break;
      }
      case "invite": {
        value = 30 - i * 2 + Math.floor(seededRand(seed) * 4);
        displayValue = `${value}명 초대`;
        subValue = `가입 ${Math.floor(value * 0.7)}명`;
        title = `${u.nickname} 님`;
        break;
      }
      case "rank_points": {
        value = 12000 - i * 800 + Math.floor(seededRand(seed) * 500);
        displayValue = `${value.toLocaleString()}P`;
        subValue = u.rankName;
        title = `${u.nickname} 님`;
        break;
      }
      case "badge_count": {
        value = 28 - i * 2 + Math.floor(seededRand(seed) * 3);
        displayValue = `${value}개`;
        subValue = `희귀 ${Math.floor(value * 0.3)}개`;
        title = `${u.nickname} 님`;
        break;
      }
      default: {
        value = 100 - i * 5;
        displayValue = `${value}`;
        title = `${u.nickname} 님`;
      }
    }

    entries.push({
      id: `mock_${contentId}_${rankingType}_${i}`,
      rank: i + 1,
      userId: u.userId,
      nickname: u.nickname,
      rankIcon: u.rankIcon,
      rankName: u.rankName,
      title,
      value,
      displayValue,
      subValue,
      contentId,
      contentTitle: "",
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
    });
  }
  return entries;
}

const WORLDCUP_WINNER_LABELS: Record<string, string[]> = {
  default: ["치킨", "삼겹살", "라면", "피자", "떡볶이"],
  "food-worldcup": ["치킨", "삼겹살", "라면", "피자", "떡볶이"],
  "movie-worldcup": ["어벤져스", "기생충", "인터스텔라", "라라랜드", "베테랑"],
};

// ───────── 공개 API ─────────

/** 랭킹 조회 */
export function getRanking(
  contentId: string,
  rankingType: RankingType,
  period: RankingPeriod = "all",
  limit: number = 100
): RankingEntry[] {
  const stored = getStorage()
    .filter(r => r.contentId === contentId && r.rankingType === rankingType)
    .filter(r => filterByPeriod(r.createdAt, period));

  if (stored.length === 0) {
    // mock 데이터 반환
    return buildMockEntries(contentId, rankingType, 10).slice(0, limit);
  }

  // 실제 데이터 정렬
  const isAsc = rankingType === "time";
  const metric = (r: StoredRankingRecord) =>
    rankingType === "time" ? (r.clearTimeMs ?? 999999) :
    rankingType === "score" ? (r.score ?? 0) :
    rankingType === "lucky_points" ? (r.luckyNetPoints ?? 0) :
    rankingType === "lucky_streak" ? (r.luckyStreak ?? 0) :
    rankingType === "together_host" ? (r.togetherHostCount ?? 0) :
    rankingType === "invite" ? (r.inviteCount ?? 0) :
    (r.score ?? 0);

  const sorted = [...stored].sort((a, b) =>
    isAsc ? metric(a) - metric(b) : metric(b) - metric(a)
  );

  // 유저별 최고 기록만
  const seen = new Set<string>();
  const deduped = sorted.filter(r => {
    if (!r.userId || seen.has(r.userId)) return false;
    seen.add(r.userId);
    return true;
  });

  return deduped.slice(0, limit).map((r, i) => {
    const mVal = metric(r);
    let displayValue = "";
    if (rankingType === "time") displayValue = `${(mVal / 1000).toFixed(2)}초`;
    else if (rankingType === "score") displayValue = `${mVal}점`;
    else if (rankingType === "lucky_points") displayValue = `+${mVal.toLocaleString()}P`;
    else if (rankingType === "lucky_streak") displayValue = `${mVal}연승`;
    else if (rankingType === "together_host") displayValue = `${mVal}회`;
    else if (rankingType === "invite") displayValue = `${mVal}명`;
    else displayValue = `${mVal}`;

    return {
      id: r.id,
      rank: i + 1,
      userId: r.userId,
      nickname: r.userId,
      rankIcon: "⭐",
      rankName: "",
      title: `${r.userId} 님의 기록`,
      value: mVal,
      displayValue,
      contentId: r.contentId,
      createdAt: r.createdAt,
    };
  });
}

/** 특정 유저의 해당 콘텐츠 랭킹 조회 */
export function getUserRanking(
  userId: string,
  contentId: string,
  rankingType: RankingType,
  period: RankingPeriod = "all"
): RankingEntry | null {
  const allRanking = getRanking(contentId, rankingType, period);
  return allRanking.find(e => e.userId === userId) ?? null;
}

/** 결과 분포 통계 (심리테스트 등) */
export function getResultDistribution(
  contentId: string,
  period: RankingPeriod = "all"
): ContentStatsEntry[] {
  const stored = getStorage()
    .filter(r => r.contentId === contentId && r.resultTypeId)
    .filter(r => filterByPeriod(r.createdAt, period));

  if (stored.length === 0) {
    // mock 데이터
    return buildMockResultDistribution(contentId);
  }

  const counts: Record<string, number> = {};
  for (const r of stored) {
    if (r.resultTypeId) counts[r.resultTypeId] = (counts[r.resultTypeId] || 0) + 1;
  }
  const total = stored.length;
  return Object.entries(counts)
    .map(([id, count]) => ({
      id,
      label: id,
      count,
      percentage: Math.round((count / total) * 100),
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
}

const RESULT_LABELS_MOCK: Record<string, string[]> = {
  default: ["INTJ형", "ENFP형", "INFJ형", "ESTJ형", "INFP형", "ENTP형"],
  "eq-test": ["감성 마스터", "이성 지배자", "균형 달인", "직관의 귀재", "논리의 왕", "공감의 천재"],
  "blood-type": ["A형", "B형", "O형", "AB형"],
};

function buildMockResultDistribution(contentId: string): ContentStatsEntry[] {
  const labels = RESULT_LABELS_MOCK[contentId] ?? RESULT_LABELS_MOCK.default;
  const total = labels.length;
  const rawCounts = labels.map((_, i) => {
    const seed = (contentId.charCodeAt(0) || 0) + i * 11;
    return Math.floor(seededRand(seed) * 400) + 50;
  });
  const sum = rawCounts.reduce((a, b) => a + b, 0);
  return labels.map((label, i) => ({
    id: `result_${i}`,
    label,
    count: rawCounts[i],
    percentage: Math.round((rawCounts[i] / sum) * 100),
    trend: (["up", "down", "flat"] as const)[i % 3],
  })).sort((a, b) => b.count - a.count);
}

/** 선택 비율 통계 (밸런스게임 등) */
export function getChoiceDistribution(
  contentId: string,
  period: RankingPeriod = "all"
): ContentStatsEntry[] {
  const stored = getStorage()
    .filter(r => r.contentId === contentId && r.choiceId)
    .filter(r => filterByPeriod(r.createdAt, period));

  if (stored.length === 0) {
    return buildMockChoiceDistribution(contentId);
  }

  const counts: Record<string, number> = {};
  for (const r of stored) {
    if (r.choiceId) counts[r.choiceId] = (counts[r.choiceId] || 0) + 1;
  }
  const total = stored.length;
  return Object.entries(counts).map(([id, count]) => ({
    id,
    label: id,
    count,
    percentage: Math.round((count / total) * 100),
  })).sort((a, b) => b.count - a.count);
}

function buildMockChoiceDistribution(contentId: string): ContentStatsEntry[] {
  const seed = contentId.charCodeAt(0) || 50;
  const pct = Math.floor(seededRand(seed) * 40) + 30; // 30~70%
  return [
    { id: "a", label: "A 선택지", count: pct * 12, percentage: pct, trend: "up" },
    { id: "b", label: "B 선택지", count: (100 - pct) * 12, percentage: 100 - pct, trend: "down" },
  ];
}

/** 월드컵 우승 랭킹 */
export function getWorldcupWinnerRanking(
  contentId: string,
  period: RankingPeriod = "all"
): RankingEntry[] {
  const stored = getStorage()
    .filter(r => r.contentId === contentId && r.worldcupWinnerId)
    .filter(r => filterByPeriod(r.createdAt, period));

  if (stored.length === 0) {
    return buildMockEntries(contentId, "worldcup_winner", 10);
  }

  const counts: Record<string, number> = {};
  for (const r of stored) {
    if (r.worldcupWinnerId) counts[r.worldcupWinnerId] = (counts[r.worldcupWinnerId] || 0) + 1;
  }
  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([itemId, count], i) => ({
      id: `wc_${itemId}`,
      rank: i + 1,
      title: itemId,
      value: count,
      displayValue: `${count}회 우승`,
      createdAt: new Date().toISOString(),
    }));
}

/** 럭키존 랭킹 */
export function getLuckyRanking(
  gameType: "points" | "streak",
  period: RankingPeriod = "today"
): RankingEntry[] {
  const rankingType: RankingType = gameType === "streak" ? "lucky_streak" : "lucky_points";
  return getRanking("lucky_zone", rankingType, period, 20);
}

/** 같이놀기 랭킹 */
export function getTogetherRanking(
  gameType: "host" | "invite",
  period: RankingPeriod = "weekly"
): RankingEntry[] {
  const rankingType: RankingType = gameType === "invite" ? "invite" : "together_host";
  return getRanking("together", rankingType, period, 20);
}

/** 전체 포인트 리더보드 */
export function getGlobalLeaderboard(period: RankingPeriod = "all"): RankingEntry[] {
  return buildMockEntries("global", "rank_points", 50);
}

/** 뱃지 수집 랭킹 */
export function getBadgeLeaderboard(period: RankingPeriod = "all"): RankingEntry[] {
  return buildMockEntries("badges", "badge_count", 20);
}

/** 특정 타입의 전체 랭킹 (leaderboard 섹션용) */
export function getSectionRanking(
  sectionKey: string,
  period: RankingPeriod = "all",
  limit: number = 10
): RankingEntry[] {
  const map: Record<string, { contentId: string; type: RankingType }> = {
    points: { contentId: "global", type: "rank_points" },
    initial_quiz: { contentId: "initial-quiz", type: "score" },
    reaction: { contentId: "reaction", type: "time" },
    spot_difference: { contentId: "spot-difference", type: "time" },
    worldcup: { contentId: "worldcup", type: "worldcup_winner" },
    lucky_king: { contentId: "lucky_zone", type: "lucky_points" },
    lucky_streak: { contentId: "lucky_zone", type: "lucky_streak" },
    together_host: { contentId: "together", type: "together_host" },
    invite: { contentId: "global", type: "invite" },
    badge: { contentId: "badges", type: "badge_count" },
  };
  const cfg = map[sectionKey];
  if (!cfg) return buildMockEntries(sectionKey, "score", limit);
  return buildMockEntries(cfg.contentId, cfg.type, limit).slice(0, limit);
}

/** 랭킹 기록 등록 */
export function submitRankingScore(input: RankingSubmitInput): void {
  if (typeof window === "undefined") return;
  // 게스트 불가 체크는 호출부에서 처리
  const records = getStorage();
  const newRecord: StoredRankingRecord = {
    ...input,
    id: genId(),
    createdAt: new Date().toISOString(),
  };
  records.push(newRecord);
  // 각 타입별 최대 1000건 유지
  const kept = records.slice(-2000);
  setStorage(kept);
}

/** 내 최고 기록 조회 */
export function getMyBestRecords(userId: string): {
  reaction?: RankingEntry;
  initialQuiz?: RankingEntry;
  memory?: RankingEntry;
  spotDifference?: RankingEntry;
  worldcup?: RankingEntry;
  luckyPoints?: RankingEntry;
  luckyStreak?: RankingEntry;
  togetherHost?: RankingEntry;
} {
  return {
    reaction: getUserRanking(userId, "reaction", "time", "all") ?? undefined,
    initialQuiz: getUserRanking(userId, "initial-quiz", "score", "all") ?? undefined,
    memory: getUserRanking(userId, "memory", "score", "all") ?? undefined,
    spotDifference: getUserRanking(userId, "spot-difference", "time", "all") ?? undefined,
    worldcup: getUserRanking(userId, "worldcup", "worldcup_winner", "all") ?? undefined,
    luckyPoints: getUserRanking(userId, "lucky_zone", "lucky_points", "today") ?? undefined,
    luckyStreak: getUserRanking(userId, "lucky_zone", "lucky_streak", "all") ?? undefined,
    togetherHost: getUserRanking(userId, "together", "together_host", "all") ?? undefined,
  };
}

/** 콘텐츠 아이템에 맞는 랭킹 탭 구성 반환 */
export function getRankingTabsForContent(contentItem: ContentItem): RankingTabConfig[] {
  const k = contentItem.kind;
  switch (k) {
    case "reaction":
      return [
        { key: "play", label: "플레이", icon: "▶️" },
        { key: "ranking", label: "시간 랭킹", icon: "⏱️", rankingType: "time" },
        { key: "my", label: "내 기록", icon: "🏅" },
      ];
    case "spot-difference":
    case "observation":
      return [
        { key: "play", label: "플레이", icon: "▶️" },
        { key: "ranking", label: "클리어 시간 랭킹", icon: "⏱️", rankingType: "time" },
        { key: "my", label: "내 기록", icon: "🏅" },
      ];
    case "memory":
    case "initial-quiz":
    case "nonsense-quiz":
      return [
        { key: "play", label: "플레이", icon: "▶️" },
        { key: "ranking", label: "점수 랭킹", icon: "🏆", rankingType: "score" },
        { key: "my", label: "내 기록", icon: "🏅" },
      ];
    case "psych-test":
    case "mbti-like":
    case "eq-test":
    case "blood-type":
    case "gauge":
    case "iq-test":
      return [
        { key: "play", label: "테스트", icon: "📝" },
        { key: "stats", label: "결과 통계", icon: "📊", rankingType: "result_distribution" },
        { key: "my", label: "내 결과", icon: "👤" },
      ];
    case "balance":
    case "poll":
      return [
        { key: "play", label: "플레이", icon: "▶️" },
        { key: "stats", label: "선택 비율", icon: "📊", rankingType: "choice_distribution" },
        { key: "my", label: "내 선택", icon: "👤" },
      ];
    case "worldcup":
      return [
        { key: "play", label: "플레이", icon: "▶️" },
        { key: "ranking", label: "우승 랭킹", icon: "🏆", rankingType: "worldcup_winner" },
        { key: "my", label: "내 우승 기록", icon: "🏅" },
      ];
    case "lucky-game":
      return [
        { key: "play", label: "도전", icon: "🍀" },
        { key: "lucky_king", label: "오늘의 럭키왕", icon: "👑", rankingType: "lucky_points" },
        { key: "lucky_streak", label: "연승 랭킹", icon: "🔥", rankingType: "lucky_streak" },
        { key: "my", label: "내 기록", icon: "🏅" },
      ];
    case "together":
      return [
        { key: "play", label: "방 만들기", icon: "🎮" },
        { key: "host", label: "인기 방장", icon: "⭐", rankingType: "together_host" },
        { key: "invite", label: "친구초대 랭킹", icon: "📨", rankingType: "invite" },
        { key: "my", label: "내 방 기록", icon: "🏅" },
      ];
    default:
      return [
        { key: "play", label: "플레이", icon: "▶️" },
        { key: "my", label: "내 기록", icon: "🏅" },
      ];
  }
}

/** 전체 랭킹 Admin 현황 */
export function getAdminRankingStats() {
  const records = getStorage();
  const today = records.filter(r => filterByPeriod(r.createdAt, "today"));
  const weekly = records.filter(r => filterByPeriod(r.createdAt, "weekly"));
  const typeCount: Record<string, number> = {};
  for (const r of records) {
    typeCount[r.rankingType] = (typeCount[r.rankingType] || 0) + 1;
  }
  const contentCount: Record<string, number> = {};
  for (const r of records) {
    contentCount[r.contentId] = (contentCount[r.contentId] || 0) + 1;
  }
  return {
    totalRecords: records.length,
    todayRecords: today.length,
    weeklyRecords: weekly.length,
    typeBreakdown: Object.entries(typeCount).map(([type, count]) => ({ type, count })),
    topContents: Object.entries(contentCount).sort(([, a], [, b]) => b - a).slice(0, 10).map(([contentId, count]) => ({ contentId, count })),
  };
}
