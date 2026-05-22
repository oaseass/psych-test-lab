/**
 * 12개 테스트를 실제 시드 기반으로 시뮬레이션
 * - 첫 번째 옵션만 선택 패턴
 * - 마지막 옵션만 선택 패턴
 * - 결과 제목/부제목/shareText 출력
 */

import { QA_BANKS } from "../src/lib/test-engine/banks";
import { RESULT_BANKS } from "../src/lib/test-engine/banks";
import { createSeededRandomFromSlug, seededPickN } from "../src/lib/test-engine/seed";

const SLUGS = [
  "yeonae-gojang-paeteon",
  "kkeullim-yuhyeong",
  "jeon-aein-mot-nitneum",
  "jipcheok-button",
  "hoepisseonghyang-testeut",
  "jiltu-bangshik-testeut",
  "sohnjeol-dang-ha-neun-iyu",
  "don-mot-moneun-iyu",
  "tongjang-sae-neun-paeteon",
  "nae-seonggyek-wiheom-bubun",
  "naega-muneojinan-sungan",
  "insheng-kkoineum-paeteon",
];

type QAOption = { text: string; resultKey: string };
type QAItem = { text: string; options: QAOption[] };
type ResultItem = { key?: string; title?: string; subtitle?: string; shareText?: string; summary?: string; keywords?: string[] };

function simulate(slug: string, pattern: "first" | "last" | "alt") {
  const qaBank = (QA_BANKS[slug] ?? []) as QAItem[];
  const resultBank = (RESULT_BANKS[slug] ?? []) as ResultItem[];

  if (!qaBank.length || !resultBank.length) return null;

  const rng = createSeededRandomFromSlug(slug);
  const selectedQAs = seededPickN(qaBank, Math.min(12, qaBank.length), rng) as QAItem[];

  const scores: Record<string, number> = {};
  selectedQAs.forEach((qa, qi) => {
    let optIdx: number;
    if (pattern === "first") optIdx = 0;
    else if (pattern === "last") optIdx = qa.options.length - 1;
    else optIdx = qi % 2 === 0 ? 0 : qa.options.length - 1; // alternating
    const opt = qa.options[optIdx];
    scores[opt.resultKey] = (scores[opt.resultKey] || 0) + 3;
  });

  // 결과 찾기
  let maxScore = -1;
  let topKey = "";
  for (const [key, score] of Object.entries(scores)) {
    if (score > maxScore) { maxScore = score; topKey = key; }
  }

  const result = resultBank.find(r => (r.key ?? "") === topKey) ?? resultBank[0];
  return { topKey, maxScore, scores, result };
}

function getOptionDistribution(slug: string) {
  const qaBank = (QA_BANKS[slug] ?? []) as QAItem[];
  if (!qaBank.length) return {};
  const rng = createSeededRandomFromSlug(slug);
  const selectedQAs = seededPickN(qaBank, Math.min(12, qaBank.length), rng) as QAItem[];
  const keyCount: Record<string, number[]> = {};
  selectedQAs.forEach((qa) => {
    qa.options.forEach(opt => {
      if (!keyCount[opt.resultKey]) keyCount[opt.resultKey] = [];
      keyCount[opt.resultKey].push(qa.options.indexOf(opt));
    });
  });
  return keyCount;
}

console.log("═══════════════════════════════════════════════════════════");
console.log("  12개 테스트 플레이 시뮬레이션 리포트");
console.log("═══════════════════════════════════════════════════════════\n");

for (const slug of SLUGS) {
  const qaBank = (QA_BANKS[slug] ?? []) as QAItem[];
  const resultBank = (RESULT_BANKS[slug] ?? []) as ResultItem[];

  if (!qaBank.length) {
    console.log(`[${slug}] ❌ QA 뱅크 없음\n`);
    continue;
  }

  const rng = createSeededRandomFromSlug(slug);
  const selectedQAs = seededPickN(qaBank, Math.min(12, qaBank.length), rng) as QAItem[];

  console.log(`▶ ${slug}`);
  console.log(`  QA 전체: ${qaBank.length}개 → 추출: ${selectedQAs.length}개 | 결과: ${resultBank.length}개`);

  // 세 가지 패턴
  const patternFirst = simulate(slug, "first");
  const patternLast = simulate(slug, "last");
  const patternAlt = simulate(slug, "alt");

  if (patternFirst) {
    const r = patternFirst.result;
    console.log(`  [패턴1: 항상 첫 번째 선택]`);
    console.log(`    → resultKey: "${patternFirst.topKey}" (${patternFirst.maxScore}점)`);
    console.log(`    → 제목: ${r?.title ?? "(없음)"}`);
    console.log(`    → 부제목: ${r?.subtitle ?? "(없음)"}`);
    console.log(`    → 공유 문구: ${(r?.shareText ?? "(없음)").slice(0, 60)}`);
  }

  if (patternLast) {
    const r = patternLast.result;
    console.log(`  [패턴2: 항상 마지막 선택]`);
    console.log(`    → resultKey: "${patternLast.topKey}" (${patternLast.maxScore}점)`);
    console.log(`    → 제목: ${r?.title ?? "(없음)"}`);
    console.log(`    → 공유 문구: ${(r?.shareText ?? "(없음)").slice(0, 60)}`);
  }

  if (patternAlt) {
    const r = patternAlt.result;
    console.log(`  [패턴3: 교차 선택 (짝수→첫번째, 홀수→마지막)]`);
    console.log(`    → resultKey: "${patternAlt.topKey}" (${patternAlt.maxScore}점)`);
    console.log(`    → 제목: ${r?.title ?? "(없음)"}`);
    console.log(`    → 공유 문구: ${(r?.shareText ?? "(없음)").slice(0, 60)}`);
  }

  // 분포 분석: 각 resultKey가 몇 개 질문에서 나오는지
  const keyCoverage: Record<string, number> = {};
  selectedQAs.forEach((qa) => {
    const seen = new Set<string>();
    qa.options.forEach(opt => {
      if (!seen.has(opt.resultKey)) {
        keyCoverage[opt.resultKey] = (keyCoverage[opt.resultKey] || 0) + 1;
        seen.add(opt.resultKey);
      }
    });
  });
  const sortedKeys = Object.entries(keyCoverage).sort((a, b) => b[1] - a[1]);
  console.log(`  [결과키 분포 (질문 수 기준)]`);
  sortedKeys.forEach(([k, cnt]) => {
    const r = resultBank.find(rb => (rb.key ?? "") === k);
    console.log(`    ${k}: ${cnt}개 Q | ${r?.title ?? "❌ 결과 없음"}`);
  });

  // 모든 패턴이 같은 결과면 경고
  if (patternFirst?.topKey === patternLast?.topKey && patternLast?.topKey === patternAlt?.topKey) {
    console.log(`  ⚠️  3개 패턴 모두 동일 결과 → 결과 다양성 부족 가능성`);
  }

  // 결과 키 중에 QA에서 선택되지 않는 결과가 있는지 확인
  const allReachedKeys = new Set(selectedQAs.flatMap(qa => qa.options.map(o => o.resultKey)));
  const unreachable = resultBank.filter(r => {
    const key = r.key ?? "";
    return !allReachedKeys.has(key);
  });
  if (unreachable.length > 0) {
    console.log(`  ⚠️  도달 불가 결과: ${unreachable.map(r => r.key).join(", ")}`);
  }

  console.log();
}
