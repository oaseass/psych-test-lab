/**
 * audit-spot-difference.ts
 * Validates spotSceneList data integrity and license safety.
 * Run: npx tsx scripts/audit-spot-difference.ts
 */

import { spotSceneList } from "../src/data/games/spotDifferenceData";

const SAFE_LICENSES = new Set([
  "Public Domain",
  "CC0",
  "CC BY",
  "CC BY 2.0",
  "CC BY 3.0",
  "CC BY 4.0",
  "CC BY-SA 2.0",
  "CC BY-SA 3.0",
  "CC BY-SA 4.0",
]);

let errors = 0;

function fail(slug: string, msg: string) {
  console.error(`❌  [${slug}] ${msg}`);
  errors++;
}

function warn(slug: string, msg: string) {
  console.warn(`⚠️   [${slug}] ${msg}`);
}

for (const scene of spotSceneList) {
  const s = scene.slug;

  // Required string fields
  if (!scene.id)            fail(s, "id가 없음");
  if (!scene.slug)          fail(s, "slug가 없음");
  if (!scene.title)         fail(s, "title이 없음");
  if (!scene.originalImage) fail(s, "originalImage URL이 없음");
  else if (!scene.originalImage.startsWith("https://")) fail(s, "originalImage URL이 https로 시작하지 않음");

  // Source info
  if (!scene.source.license)    fail(s, "source.license가 없음");
  if (!scene.source.provider)   fail(s, "source.provider가 없음");
  if (!scene.source.attribution) fail(s, "source.attribution이 없음");
  if (!scene.source.sourceUrl)  fail(s, "source.sourceUrl이 없음");

  // License safety
  if (!SAFE_LICENSES.has(scene.source.license)) {
    warn(s, `알 수 없는 라이선스: "${scene.source.license}"`);
  }
  if (!scene.source.isCommercialSafe) {
    warn(s, "isCommercialSafe가 false임 — 상업적 사용 불가");
  }

  // Differences
  if (!scene.differences || scene.differences.length < 5) {
    fail(s, `differences 개수가 5개 미만: ${scene.differences?.length ?? 0}`);
  }

  // Overlays match
  if (!scene.overlays || scene.overlays.length === 0) {
    fail(s, "overlays가 없음");
  } else if (scene.overlays.length !== scene.differences.length) {
    fail(s, `overlays(${scene.overlays.length}) != differences(${scene.differences.length})`);
  }

  // Overlay IDs must match difference IDs
  const diffIds = new Set(scene.differences.map((d) => d.id));
  for (const o of scene.overlays ?? []) {
    if (!diffIds.has(o.id)) {
      fail(s, `overlay.id "${o.id}"에 대응하는 difference가 없음`);
    }
  }

  // Coordinate ranges
  for (const d of scene.differences) {
    if (d.x < 0 || d.x > 100) fail(s, `difference "${d.id}" x=${d.x} 범위 초과`);
    if (d.y < 0 || d.y > 100) fail(s, `difference "${d.id}" y=${d.y} 범위 초과`);
    if (d.radius <= 0)         fail(s, `difference "${d.id}" radius=${d.radius} 이하`);
  }

  console.log(`✅  [${s}] OK — ${scene.differences.length}개 차이, 라이선스: ${scene.source.license}`);
}

console.log(`\n총 ${spotSceneList.length}개 퍼즐 검사 완료.`);
if (errors > 0) {
  console.error(`\n총 ${errors}개 오류 발견 — 배포 전 수정 필요`);
  process.exit(1);
} else {
  console.log("모든 항목 정상 ✅");
}
