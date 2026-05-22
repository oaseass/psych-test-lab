import { getPlayableTests } from "@/lib/data/testRepository";

const KEY_CHALLENGE = "sslab_challenge";
export const CHALLENGE_BONUS_POINTS = 500;
export const CHALLENGE_TEST_COUNT = 5;

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface ChallengeItem {
  testSlug: string;
  title: string;
  categorySlug: string;
}

export interface ChallengeProgress {
  date: string;
  completedSlugs: string[];
  bonusClaimed: boolean;
}

/** 날짜 시드 기반 deterministic 5개 테스트 선택 */
export function getTodayChallenge(): ChallengeItem[] {
  const tests = getPlayableTests();
  if (tests.length === 0) return [];

  const dateNum = parseInt(todayStr().replace(/-/g, ""), 10);
  let seed = dateNum ^ 0x5a5a5a5a;

  const available = [...tests];
  const selected: typeof tests = [];

  for (let i = 0; i < CHALLENGE_TEST_COUNT && available.length > 0; i++) {
    seed = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b);
    seed = Math.imul(seed ^ (seed >>> 16), 0x45d9f3b);
    seed = seed ^ (seed >>> 16);
    const idx = Math.abs(seed) % available.length;
    selected.push(available[idx]);
    available.splice(idx, 1);
  }

  return selected.map((t) => ({
    testSlug: t.slug,
    title: t.title,
    categorySlug: t.categorySlug,
  }));
}

export function getChallengeProgress(): ChallengeProgress {
  const today = todayStr();
  if (typeof window === "undefined") {
    return { date: today, completedSlugs: [], bonusClaimed: false };
  }
  try {
    const raw = localStorage.getItem(KEY_CHALLENGE);
    if (!raw) return { date: today, completedSlugs: [], bonusClaimed: false };
    const saved = JSON.parse(raw) as ChallengeProgress;
    if (saved.date !== today) {
      return { date: today, completedSlugs: [], bonusClaimed: false };
    }
    return saved;
  } catch {
    return { date: today, completedSlugs: [], bonusClaimed: false };
  }
}

export function saveChallengeProgress(progress: ChallengeProgress): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_CHALLENGE, JSON.stringify(progress));
}

export function markChallengeTestComplete(testSlug: string): void {
  const progress = getChallengeProgress();
  if (!progress.completedSlugs.includes(testSlug)) {
    progress.completedSlugs.push(testSlug);
    saveChallengeProgress(progress);
  }
}

export function markBonusClaimed(): void {
  const progress = getChallengeProgress();
  progress.bonusClaimed = true;
  saveChallengeProgress(progress);
}

export function isChallengeComplete(challenge: ChallengeItem[], progress: ChallengeProgress): boolean {
  return challenge.every((c) => progress.completedSlugs.includes(c.testSlug));
}
