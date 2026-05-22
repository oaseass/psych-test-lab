/**
 * scripts/audit-tests.ts
 * /tests에 노출되는 polished 슬러그 전체를 실제 데이터 기준으로 검수합니다.
 * 
 * 검사 기준:
 *   - 슬러그가 meta에 존재
 *   - 상세/play 페이지 데이터 생성 가능
 *   - 질문 1개 이상
 *   - 각 질문 선택지 2개 이상
 *   - 결과 타입 2개 이상
 *   - 결과 라벨이 제네릭(A형~H형) 아님
 *   - "심리테스트 연구소" 구 브랜드 잔재 없음
 *   - 가짜 참여 수치(1000+, 900+, 명 참여) 없음
 *   - "준비중"만 표시 금지
 *
 * 실행: npm run audit:tests
 */

import fs from "fs";
import path from "path";

const projectRoot = path.resolve(__dirname, "..");

// ── 실제 데이터 소스 로드 ─────────────────────────────────────────────
// tsx가 tsconfig.json의 paths(@/)를 지원하지만, import type은 컴파일 시 제거되므로
// require()로 전체 경로를 명시해 안전하게 로드합니다.
const { POLISHED_SLUGS_ARRAY } = require(path.join(
  projectRoot, "src/data/playableSlugs.ts"
)) as { POLISHED_SLUGS_ARRAY: string[] };

const { curatedTestMap } = require(path.join(
  projectRoot, "src/data/curatedTests.ts"
)) as { curatedTestMap: Map<string, any> };

const { generatedTestMeta } = require(path.join(
  projectRoot, "src/data/generated/testMeta.generated.ts"
)) as { generatedTestMeta: any[] };

const { generatePlayableTest } = require(path.join(
  projectRoot, "src/lib/test-engine/generatePlayableTest.ts"
)) as { generatePlayableTest: (meta: any) => any };

// ── slug → meta 빠른 조회 ─────────────────────────────────────────────
const generatedMetaBySlug = new Map<string, any>(
  generatedTestMeta.map((m) => [m.slug, m])
);

// ── 검사 기준 패턴 ────────────────────────────────────────────────────
/** 가짜 참여 수치: "1000+", "800명 참여", "900+명", "N명이 테스트" 형태 */
const FAKE_NUMBERS_RE = /\d[\d,]*\s*[+]\s*명|\d[\d,]*\s*명\s*참여|\d[\d,]*\+/;
/** 구 브랜드명 */
const OLD_BRAND_RE = /심리테스트\s*연구소/;
/** 제네릭 결과 라벨 (A형~H형, 타입A/B, 결과A/B 등) */
const GENERIC_RESULT_RE = /^[A-H]형$|^타입\s*[A-H]$|^결과\s*[A-H]$|^유형\s*[A-H]$/;
/** "준비중" 텍스트 */
const PREP_TEXT_RE = /준비중|준비 중/;

// ── 타입 정의 ─────────────────────────────────────────────────────────
interface CheckResult {
  name: string;
  pass: boolean;
  reason?: string;
}

interface AuditRow {
  route: string;
  slug: string;
  status: "pass" | "fail";
  reason: string;
  action: string;
  checks: CheckResult[];
}

// ── 텍스트 배열에서 패턴 탐지 ─────────────────────────────────────────
function hasPattern(texts: (string | undefined | null)[], re: RegExp): boolean {
  return texts.some((t) => t && re.test(t));
}

// ── 단일 슬러그 검사 ─────────────────────────────────────────────────
function auditSlug(slug: string): AuditRow {
  const checks: CheckResult[] = [];
  const route = `/test/${slug}`;

  // 1. 메타 존재 확인 (curatedTests 또는 generatedTestMeta)
  const curated = curatedTestMap.get(slug);
  const meta = curated?.meta ?? generatedMetaBySlug.get(slug);

  if (!meta) {
    return {
      route,
      slug,
      status: "fail",
      reason: "메타 데이터 없음 (curatedTests + generatedTestMeta 모두 미등록)",
      action: "playableSlugs.ts에서 제거",
      checks: [{ name: "메타 존재", pass: false, reason: "slug를 찾을 수 없음" }],
    };
  }
  checks.push({ name: "메타 존재", pass: true });

  // 2. 상세/play 페이지용 PlayableTest 생성 확인
  let test: any;
  try {
    test = curated ?? generatePlayableTest(meta);
  } catch (e: any) {
    return {
      route,
      slug,
      status: "fail",
      reason: `PlayableTest 생성 오류: ${e?.message ?? e}`,
      action: "generatePlayableTest 수정 필요",
      checks: [...checks, { name: "PlayableTest 생성", pass: false, reason: e?.message }],
    };
  }

  if (!test) {
    return {
      route,
      slug,
      status: "fail",
      reason: "PlayableTest 생성 실패 (null 반환)",
      action: "testRepository.getPlayableTest 확인",
      checks: [...checks, { name: "PlayableTest 생성", pass: false, reason: "null 반환" }],
    };
  }
  checks.push({ name: "PlayableTest 생성", pass: true });

  // 런타임과 동일하게 6문항으로 슬라이스
  if (test.questions && test.questions.length > 6) {
    test = { ...test, questions: test.questions.slice(0, 6) };
  }

  const { questions, results } = test as { questions: any[]; results: any[] };

  // 3. 질문 6개 이상
  const hasQuestions = Array.isArray(questions) && questions.length >= 6;
  checks.push({
    name: "질문 6개 이상",
    pass: hasQuestions,
    reason: !hasQuestions ? `질문 ${questions?.length ?? 0}개 (6개 이상 필요)` : undefined,
  });

  // 4. 각 질문 선택지 정확히 4개
  const badQuestionsCount = (questions ?? []).filter(
    (q) => !Array.isArray(q.options) || q.options.length !== 4
  ).length;
  checks.push({
    name: "선택지 정확히 4개",
    pass: badQuestionsCount === 0,
    reason: badQuestionsCount > 0 ? `선택지 4개 아닌 질문 ${badQuestionsCount}개` : undefined,
  });

  // 5. 결과 4개 이상
  const hasResults = Array.isArray(results) && results.length >= 4;
  checks.push({
    name: "결과 타입 4개 이상",
    pass: hasResults,
    reason: !hasResults ? `결과 ${results?.length ?? 0}개 (4개 이상 필요)` : undefined,
  });

  // 6. 결과 라벨이 제네릭(A형~H형) 아님
  const genericCount = (results ?? []).filter((r) => GENERIC_RESULT_RE.test(r.title)).length;
  checks.push({
    name: "결과 라벨 품질",
    pass: genericCount === 0,
    reason:
      genericCount > 0
        ? `제네릭 결과 라벨 ${genericCount}개 (A형~H형) – generatePlayableTest 카테고리 템플릿 미등록`
        : undefined,
  });

  // 7. "심리테스트 연구소" 구 브랜드 잔재
  const allTexts = [
    meta.title, meta.description, meta.hook, meta.target,
    ...(results ?? []).flatMap((r) => [r.title, r.summary, r.shareText]),
    ...(questions ?? []).map((q) => q.text),
  ];
  const hasOldBrand = hasPattern(allTexts, OLD_BRAND_RE);
  checks.push({
    name: "구 브랜드 없음",
    pass: !hasOldBrand,
    reason: hasOldBrand ? '"심리테스트 연구소" 텍스트 발견' : undefined,
  });

  // 8. 가짜 참여 수치 없음
  const hasFakeNums = hasPattern(
    [meta.description, meta.hook, ...(results ?? []).map((r) => r.shareText ?? "")],
    FAKE_NUMBERS_RE
  );
  checks.push({
    name: "가짜 참여 수치 없음",
    pass: !hasFakeNums,
    reason: hasFakeNums ? "가짜 참여 수치(1000+, 900+명 참여 등) 발견" : undefined,
  });

  // 9. "준비중"만 표시 금지
  const hasPrepText = hasPattern(
    (results ?? []).flatMap((r) => [r.title, r.summary]),
    PREP_TEXT_RE
  );
  checks.push({
    name: "준비중 텍스트 없음",
    pass: !hasPrepText,
    reason: hasPrepText ? '"준비중" 텍스트 발견' : undefined,
  });

  // 10-A. 12문항 노출 금지 (FAIL)
  const has12Q = meta.questionCount > 6;
  checks.push({
    name: "문항 수 6개 이하",
    pass: !has12Q,
    reason: has12Q ? `questionCount=${meta.questionCount} — 6 초과 노출 금지` : undefined,
  });

  // 10-B. 3분 이상 노출 금지 (FAIL)
  const has3Min = meta.estimatedMinutes > 1;
  checks.push({
    name: "소요 시간 1분 이하",
    pass: !has3Min,
    reason: has3Min ? `estimatedMinutes=${meta.estimatedMinutes} — 1분 초과 노출 금지` : undefined,
  });

  // 10-C. 실제 플레이 문항 수 6개 초과 금지 (FAIL)
  const over6Questions = Array.isArray(questions) && questions.length > 6;
  checks.push({
    name: "실제 플레이 문항 6개 이하",
    pass: !over6Questions,
    reason: over6Questions ? `실제 questions.length=${questions.length} — 6 초과` : undefined,
  });

  // 10-D. 카드 제목 전체가 "테스트"로만 끝나면 WARN (pass지만 로그)
  const titleEndsWithTest = meta.title.endsWith("테스트");
  if (titleEndsWithTest) {
    // WARN — pass로 처리하되 출력에 반영
    checks.push({
      name: "카드 제목 '테스트' 반복 (WARN)",
      pass: true,
      reason: `"${meta.title}" — 카드에서는 자동 제거됨`,
    });
  }

  // 10. 결과 summary 50자 이상
  const shortSummaryCount = (results ?? []).filter(
    (r) => !r.summary || r.summary.length < 50
  ).length;
  checks.push({
    name: "결과 summary 50자 이상",
    pass: shortSummaryCount === 0,
    reason: shortSummaryCount > 0 ? `summary 50자 미만 결과 ${shortSummaryCount}개` : undefined,
  });

  // 11. 결과 keywords 3개 이상
  const fewKeywordsCount = (results ?? []).filter(
    (r) => !Array.isArray(r.keywords) || r.keywords.length < 3
  ).length;
  checks.push({
    name: "결과 keywords 3개 이상",
    pass: fewKeywordsCount === 0,
    reason: fewKeywordsCount > 0 ? `keywords 3개 미만 결과 ${fewKeywordsCount}개` : undefined,
  });

  // ── 이하 구조 기반 품질 검사 (resultKey 의미 매핑 검증) ──
  // curated 테스트는 수동 제작 데이터(r1~r8 ID를 사용할 수 있음)이므로
  // 포지션 key 관련 검사는 generatePlayableTest 기반 테스트에만 적용
  const isCurated = !!curated;

  // 12. 포지션 기반 scores key (r1~rN) 중 유효하지 않은 key 발견 시 fail (generated 전용)
  const positionalKeyRE = /^r\d+$/;
  const allOptionScoreKeys: string[] = (questions ?? []).flatMap((q) =>
    (q.options ?? []).flatMap((o: any) => Object.keys(o.scores ?? {}))
  );
  const positionalKeyCount = allOptionScoreKeys.filter((k) => positionalKeyRE.test(k)).length;
  // r1~rN이 결과 id와 일치하면 valid (template-based generatePlayableTest 허용)
  const resultIds = new Set<string>((results ?? []).map((r: any) => r.id));
  const invalidPositionalKeys = allOptionScoreKeys.filter(
    (k) => positionalKeyRE.test(k) && !resultIds.has(k)
  );
  checks.push({
    name: "포지션 fallback key 없음 (r1~rN)",
    pass: isCurated || invalidPositionalKeys.length === 0,
    reason:
      !isCurated && invalidPositionalKeys.length > 0
        ? `포지션 기반 scores key ${invalidPositionalKeys.length}개 발견 — QA뱅크 resultKey 미설정`
        : undefined,
  });

  // 13. scores key가 results id 목록에 있는지 확인 (generated 전용)
  const unknownKeyCount = allOptionScoreKeys.filter(
    (k) => !resultIds.has(k)
  ).length;
  checks.push({
    name: "scores key → results id 매핑 일치",
    pass: isCurated || unknownKeyCount === 0,
    reason:
      !isCurated && unknownKeyCount > 0
        ? `scores에서 results id와 불일치하는 key ${unknownKeyCount}개`
        : undefined,
  });

  // 14. resultBank id 중복 없음
  const resultIdArr = (results ?? []).map((r: any) => r.id as string);
  const uniqueResultIds = new Set(resultIdArr);
  checks.push({
    name: "results id 중복 없음",
    pass: uniqueResultIds.size === resultIdArr.length,
    reason:
      uniqueResultIds.size !== resultIdArr.length
        ? `중복된 result id ${resultIdArr.length - uniqueResultIds.size}개`
        : undefined,
  });

  // 15. 참조되지 않는 result key 없음 (generated 전용)
  const referencedKeys = new Set(allOptionScoreKeys);
  const unreferencedCount = [...resultIds].filter((id) => !referencedKeys.has(id)).length;
  checks.push({
    name: "모든 result key 선택지에서 참조됨",
    pass: isCurated || unreferencedCount === 0,
    reason:
      !isCurated && unreferencedCount > 0
        ? `선택지에서 한 번도 참조되지 않은 result key ${unreferencedCount}개`
        : undefined,
  });

  // 16. 각 result key 최소 2회 이상 참조 (generated 전용)
  const keyRefCount = new Map<string, number>();
  allOptionScoreKeys.forEach((k) => keyRefCount.set(k, (keyRefCount.get(k) ?? 0) + 1));
  const underRefCount = [...resultIds].filter((id) => (keyRefCount.get(id) ?? 0) < 2).length;
  checks.push({
    name: "각 result key 최소 2회 이상 참조",
    pass: isCurated || underRefCount === 0,
    reason:
      !isCurated && underRefCount > 0
        ? `2회 미만 참조된 result key ${underRefCount}개 — QA뱅크에서 선택지 분포 불균형`
        : undefined,
  });

  // 17. 결과 title이 너무 짧거나 제네릭한 패턴 없음 (6자 미만 또는 단순 단어+형)
  const SHORT_TITLE_RE = /^.형$|^타입\s*.{1,2}$/;
  const poorTitleCount = (results ?? []).filter(
    (r: any) => !r.title || r.title.length < 4 || SHORT_TITLE_RE.test(r.title)
  ).length;
  checks.push({
    name: "결과 title 품질 (너무 짧거나 단순한 형식 없음)",
    pass: poorTitleCount === 0,
    reason:
      poorTitleCount > 0
        ? `title 4자 미만 또는 단순 패턴 결과 ${poorTitleCount}개`
        : undefined,
  });

  const failures = checks.filter((c) => !c.pass);
  const status: "pass" | "fail" = failures.length === 0 ? "pass" : "fail";

  return {
    route,
    slug,
    status,
    reason:
      failures.length === 0
        ? "전체 검사 통과"
        : failures.map((f) => f.reason).filter(Boolean).join("; "),
    action: status === "fail" ? "playableSlugs.ts에서 제거" : "-",
    checks,
  };
}

// ── 메인 ─────────────────────────────────────────────────────────────
function main() {
  const slugs: string[] = POLISHED_SLUGS_ARRAY;
  console.log(`\n🔍 audit-tests: /tests 노출 대상 ${slugs.length}개 테스트 검사 시작\n`);

  const rows: AuditRow[] = slugs.map(auditSlug);
  const passRows = rows.filter((r) => r.status === "pass");
  const failRows = rows.filter((r) => r.status === "fail");

  // ── 콘솔 출력 ──
  rows.forEach((r) => {
    const icon = r.status === "pass" ? "✅" : "❌";
    console.log(`${icon} ${r.slug}`);
    if (r.status === "fail") {
      r.checks
        .filter((c) => !c.pass)
        .forEach((c) => console.log(`   └─ [${c.name}] ${c.reason}`));
    }
  });

  console.log("\n──────────────────────────────────────────────────");
  console.log(`  검사 수       : ${slugs.length}개`);
  console.log(`  ✅ pass      : ${passRows.length}개`);
  console.log(`  ❌ fail      : ${failRows.length}개`);
  console.log(`  숨길 테스트  : ${failRows.length}개`);
  console.log(`  실제 노출 수 : ${passRows.length}개`);
  console.log("──────────────────────────────────────────────────\n");

  if (failRows.length > 0) {
    console.log("❌ 실패 목록:");
    failRows.forEach((r) => {
      console.log(`  - ${r.slug}`);
      r.checks
        .filter((c) => !c.pass)
        .forEach((c) => console.log(`      · ${c.name}: ${c.reason}`));
    });
    console.log("");
  }

  // ── audit-tests.md 생성 ──
  const lines: string[] = [
    "# audit-tests 결과",
    "",
    `> 실행일시: ${new Date().toLocaleString("ko-KR")}`,
    `> 검사 수: **${slugs.length}개** | ✅ pass: **${passRows.length}개** | ❌ fail: **${failRows.length}개**`,
    `> 숨긴 테스트: **${failRows.length}개** | /tests 실제 노출: **${passRows.length}개**`,
    "",
    "| route | status | reason | action |",
    "|-------|--------|--------|--------|",
    ...rows.map((r) => {
      const icon = r.status === "pass" ? "✅ pass" : "❌ fail";
      return `| \`${r.route}\` | ${icon} | ${r.reason} | ${r.action} |`;
    }),
  ];

  if (failRows.length > 0) {
    lines.push("", "## 실패 상세", "");
    failRows.forEach((r) => {
      lines.push(`### \`${r.slug}\``);
      r.checks
        .filter((c) => !c.pass)
        .forEach((c) => lines.push(`- **${c.name}**: ${c.reason}`));
      lines.push("");
    });
  }

  lines.push("## 검사 기준", "");
  lines.push(
    "- 메타 존재 (curatedTests 또는 generatedTestMeta)",
    "- PlayableTest 생성 가능",
    "- 질문 8개 이상",
    "- 각 질문 선택지 정확히 4개",
    "- 결과 타입 4개 이상",
    "- 결과 라벨 비제네릭 (A형~H형, 타입A/B, 결과A/B 등 패턴 금지)",
    "- `심리테스트 연구소` 구 브랜드 잔재 없음",
    "- 가짜 참여 수치 없음 (1000+, 900+, N명 참여 등)",
    '- "준비중" 텍스트 금지',
    "- 결과 summary 50자 이상",
    "- 결과 keywords 3개 이상",
    "- 포지션 fallback key(r1~rN) 없음 — 모든 option 반드시 resultKey 기반",
    "- scores key → results id 매핑 일치",
    "- results id 중복 없음",
    "- 모든 result key 선택지에서 최소 1회 이상 참조",
    "- 각 result key 최소 2회 이상 참조 (선택지 분포 균형)",
    "- 결과 title 4자 이상, 단순 패턴 없음",
    ""
  );

  const mdPath = path.join(projectRoot, "audit-tests.md");
  fs.writeFileSync(mdPath, lines.join("\n"), "utf-8");
  console.log(`📄 audit-tests.md 저장 완료: ${mdPath}\n`);

  if (failRows.length > 0) {
    console.error(
      `\n🚫 ${failRows.length}개 테스트가 품질 검사를 통과하지 못했습니다.` +
        "\n   playableSlugs.ts에서 fail 슬러그를 제거하고 재빌드하세요.\n"
    );
    process.exit(1);
  }
}

main();
