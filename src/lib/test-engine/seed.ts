// 결정론적 시드 기반 랜덤 숫자 생성기
// 같은 slug는 항상 같은 테스트를 생성합니다

export function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // 32비트 정수로 변환
  }
  return Math.abs(hash);
}

export function seededRandom(seed: number): () => number {
  let s = seed;
  return function () {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function createSeededRandomFromSlug(slug: string): () => number {
  const seed = hashString(slug);
  return seededRandom(seed);
}

export function seededShuffle<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function seededPickN<T>(arr: T[], n: number, rng: () => number): T[] {
  const shuffled = seededShuffle(arr, rng);
  return shuffled.slice(0, n);
}
