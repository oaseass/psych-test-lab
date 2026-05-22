/**
 * scripts/audit-routes.ts
 * 전체 테스트 슬러그를 전수검수하여 플레이 가능 여부를 판별하고
 * audit-results.json 및 audit-results.md 파일로 출력합니다.
 *
 * 실행: npx tsx scripts/audit-routes.ts
 */

import fs from "fs";
import path from "path";

// 절대 경로 기반으로 모듈 불러오기
const projectRoot = path.resolve(__dirname, "..");

// testMeta 불러오기
const { generatedTestMeta } = require(path.join(projectRoot, "src/data/generated/testMeta.generated.ts"));
const { curatedTestSlugs } = require(path.join(projectRoot, "src/data/curatedTests.ts"));
const { POLISHED_SLUGS } = require(path.join(projectRoot, "src/data/playableSlugs.ts"));

// ── 슬러그 목록 전수 수집 ──────────────────────────────────────────────
const allSlugs: string[] = [
  ...curatedTestSlugs,
  ...generatedTestMeta
    .filter((m: { slug: string }) => !curatedTestSlugs.includes(m.slug))
    .map((m: { slug: string }) => m.slug),
];

interface AuditRow {
  slug: string;
  status: "pass" | "fail";
  reason: string;
}

const rows: AuditRow[] = allSlugs.map((slug: string) => {
  const isPolished = (POLISHED_SLUGS as ReadonlySet<string>).has(slug);
  return {
    slug,
    status: isPolished ? "pass" : "fail",
    reason: isPolished ? "전수검수 통과 (polished)" : "전수검수 미완료 – 비노출(hidden)",
  };
});

const passCount = rows.filter((r) => r.status === "pass").length;
const failCount = rows.filter((r) => r.status === "fail").length;

// ── JSON 출력 ─────────────────────────────────────────────────────────
const jsonOutput = {
  generatedAt: new Date().toISOString(),
  total: rows.length,
  pass: passCount,
  fail: failCount,
  rows,
};

const jsonPath = path.join(projectRoot, "audit-results.json");
fs.writeFileSync(jsonPath, JSON.stringify(jsonOutput, null, 2), "utf-8");
console.log(`✅ audit-results.json 저장 완료 (${jsonPath})`);

// ── Markdown 출력 ─────────────────────────────────────────────────────
const mdLines: string[] = [
  "# 전수검수 결과 보고서",
  "",
  `> 생성일시: ${new Date().toLocaleString("ko-KR")}`,
  "",
  "## 요약",
  "",
  `| 항목 | 수치 |`,
  `|------|------|`,
  `| 전체 테스트 | ${rows.length} |`,
  `| ✅ pass (polished) | ${passCount} |`,
  `| ❌ fail (hidden) | ${failCount} |`,
  "",
  "## 상세 결과",
  "",
  "| # | slug | 상태 | 사유 |",
  "|---|------|------|------|",
  ...rows.map((r, i) => `| ${i + 1} | \`${r.slug}\` | ${r.status === "pass" ? "✅ pass" : "❌ fail"} | ${r.reason} |`),
];

const mdPath = path.join(projectRoot, "audit-results.md");
fs.writeFileSync(mdPath, mdLines.join("\n"), "utf-8");
console.log(`✅ audit-results.md 저장 완료 (${mdPath})`);

// ── 터미널 요약 출력 ──────────────────────────────────────────────────
console.log("");
console.log("──────────────────────────────────────────");
console.log(`  전수검수 완료`);
console.log(`  전체: ${rows.length}개`);
console.log(`  ✅ pass (polished): ${passCount}개`);
console.log(`  ❌ fail (hidden):   ${failCount}개`);
console.log("──────────────────────────────────────────");
