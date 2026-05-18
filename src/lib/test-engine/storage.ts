import type { TestPlayResult, UserAnswer } from "@/types";

const STORAGE_KEY_HISTORY = "psych_play_history";
const STORAGE_KEY_FAVORITES = "psych_favorites";
const STORAGE_KEY_RECENT_SEARCH = "psych_recent_search";
const STORAGE_KEY_PROGRESS = "psych_progress";

// localStorage 안전 접근 헬퍼
function safeGetItem(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeSetItem(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // localStorage가 가득 찼을 때 무시
  }
}

// === 플레이 기록 관련 ===

export function savePlayResult(result: TestPlayResult): void {
  const history = getPlayHistory();
  // 같은 testSlug의 기존 결과 제거 후 앞에 추가
  const filtered = history.filter((h) => h.testSlug !== result.testSlug);
  filtered.unshift(result);
  // 최대 50개 유지
  safeSetItem(STORAGE_KEY_HISTORY, JSON.stringify(filtered.slice(0, 50)));
}

export function getPlayHistory(): TestPlayResult[] {
  const raw = safeGetItem(STORAGE_KEY_HISTORY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as TestPlayResult[];
  } catch {
    return [];
  }
}

export function getPlayResult(resultId: string): TestPlayResult | null {
  const history = getPlayHistory();
  return history.find((h) => h.resultId === resultId) || null;
}

export function hasPlayed(testSlug: string): boolean {
  const history = getPlayHistory();
  return history.some((h) => h.testSlug === testSlug);
}

export function getPlayedSlugs(): string[] {
  return getPlayHistory().map((h) => h.testSlug);
}

export function clearHistory(): void {
  safeSetItem(STORAGE_KEY_HISTORY, JSON.stringify([]));
}

// === 진행 중 답변 저장/복원 ===

interface InProgressData {
  testSlug: string;
  answers: UserAnswer[];
  currentIndex: number;
  savedAt: string;
}

export function saveProgress(
  testSlug: string,
  answers: UserAnswer[],
  currentIndex: number
): void {
  const data: InProgressData = {
    testSlug,
    answers,
    currentIndex,
    savedAt: new Date().toISOString(),
  };
  safeSetItem(`${STORAGE_KEY_PROGRESS}_${testSlug}`, JSON.stringify(data));
}

export function loadProgress(testSlug: string): InProgressData | null {
  const raw = safeGetItem(`${STORAGE_KEY_PROGRESS}_${testSlug}`);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as InProgressData;
  } catch {
    return null;
  }
}

export function clearProgress(testSlug: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(`${STORAGE_KEY_PROGRESS}_${testSlug}`);
  } catch {
    // ignore
  }
}

// === 즐겨찾기 ===

export function getFavorites(): string[] {
  const raw = safeGetItem(STORAGE_KEY_FAVORITES);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function toggleFavorite(slug: string): boolean {
  const favorites = getFavorites();
  const idx = favorites.indexOf(slug);
  if (idx === -1) {
    favorites.push(slug);
    safeSetItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
    return true;
  } else {
    favorites.splice(idx, 1);
    safeSetItem(STORAGE_KEY_FAVORITES, JSON.stringify(favorites));
    return false;
  }
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug);
}

// === 최근 검색어 ===

export function getRecentSearches(): string[] {
  const raw = safeGetItem(STORAGE_KEY_RECENT_SEARCH);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as string[];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  const searches = getRecentSearches();
  const filtered = searches.filter((s) => s !== query);
  filtered.unshift(query);
  safeSetItem(STORAGE_KEY_RECENT_SEARCH, JSON.stringify(filtered.slice(0, 10)));
}

export function clearRecentSearches(): void {
  safeSetItem(STORAGE_KEY_RECENT_SEARCH, JSON.stringify([]));
}
