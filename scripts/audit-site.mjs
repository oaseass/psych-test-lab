#!/usr/bin/env node
/**
 * audit-site.mjs
 * 사이트 전수 검수 스크립트 — 정적 분석 방식
 *
 * 검수 항목:
 * 1. /tests 카테고리 필터 — 공개 테스트 0개 카테고리가 보이면 FAIL
 * 2. /category/[slug] — 빈 카테고리 slug가 생성되면 FAIL
 * 3. /experiments — 차단 slug가 노출되면 FAIL
 * 4. /experiments/[blocked-slug] — notFound 처리 여부 코드 검사
 * 5. 실패 키워드 스캔 — 소스 코드에서 사용자 노출 금지 문구 검사
 *
 * 사용: npm run audit:site
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── 실패 키워드 (사용자에게 보이면 안 되는 문구) ──────────────────────────────
// 주의: 이 키워드는 JSX 렌더 텍스트에서만 체크하며, HTML 속성값이나 변수명은 제외
const FAIL_KEYWORDS = [
  "준비중",
  "개발중",
  "아직 준비",
  "곧 공개",
  "레시피가 없어요",
  "조합 레시피가 없어요",
  "테스트가 없습니다",
];

// ── 차단되어야 하는 실험 slug ─────────────────────────────────────────────────
const BLOCKED_EXPERIMENT_SLUGS = ["infinite-mix"];

let passCount = 0;
let failCount = 0;

/** PASS / FAIL 출력 헬퍼 */
function pass(msg) {
  passCount++;
  console.log(`  ✅ PASS  ${msg}`);
}
function fail(msg) {
  failCount++;
  console.error(`  ❌ FAIL  ${msg}`);
}
function section(title) {
  console.log(`\n${"─".repeat(60)}\n  ${title}\n${"─".repeat(60)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. POLISHED_SLUGS 및 카테고리 정보 파싱 (TS 파일을 텍스트로 파싱)
// ─────────────────────────────────────────────────────────────────────────────
section("1. 공개 테스트 / 카테고리 현황 분석");

const playableSlugsFile = fs.readFileSync(
  path.join(ROOT, "src/data/playableSlugs.ts"),
  "utf8"
);
const slugMatches = [...playableSlugsFile.matchAll(/"([a-z0-9\-]+)",?\s*\/\//g)];
const POLISHED_SLUGS = slugMatches.map((m) => m[1]);
console.log(`  공개 테스트 수: ${POLISHED_SLUGS.length}개`);
console.log(`  slugs: ${POLISHED_SLUGS.join(", ")}`);

// testMeta.generated.ts 파싱 — categorySlug 추출
const testMetaFile = fs.readFileSync(
  path.join(ROOT, "src/data/generated/testMeta.generated.ts"),
  "utf8"
);

const slugToCategoryMap = {};
for (const slug of POLISHED_SLUGS) {
  const match = testMetaFile.match(
    new RegExp(`slug:"${slug}".*?categorySlug:"([a-z0-9\\-]+)"`)
  );
  if (match) {
    slugToCategoryMap[slug] = match[1];
  }
}

// curatedTests.ts에서도 파싱
const curatedFile = fs.readFileSync(
  path.join(ROOT, "src/data/curatedTests.ts"),
  "utf8"
);
for (const slug of POLISHED_SLUGS) {
  if (!slugToCategoryMap[slug]) {
    const regex = new RegExp(
      `slug:\\s*"${slug}"[^}]*?categorySlug:\\s*"([a-z0-9\\-]+)"`,
      "s"
    );
    const match = curatedFile.match(regex);
    if (match) slugToCategoryMap[slug] = match[1];
  }
}

// 활성 카테고리 집합
const ACTIVE_CATEGORIES = new Set(Object.values(slugToCategoryMap));
console.log(`\n  활성 카테고리 (공개 테스트 보유): ${ACTIVE_CATEGORIES.size}개`);
console.log(`  → ${[...ACTIVE_CATEGORIES].join(", ")}`);

// ─────────────────────────────────────────────────────────────────────────────
// 2. /tests 페이지 카테고리 필터 검사
// ─────────────────────────────────────────────────────────────────────────────
section("2. /tests 페이지 카테고리 필터 검사");

const testsPageFile = fs.readFileSync(
  path.join(ROOT, "src/app/tests/page.tsx"),
  "utf8"
);

if (testsPageFile.includes("getActiveCategories")) {
  pass("/tests 페이지가 getActiveCategories() 사용 — 빈 카테고리 자동 제외");
} else if (
  testsPageFile.includes("allTests.some") &&
  testsPageFile.includes("categorySlug")
) {
  pass("/tests 페이지가 카테고리 필터링 로직 포함 (수동)");
} else {
  fail("/tests 페이지가 카테고리 필터링 없이 getAllCategories() 직접 사용");
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. /category/[slug] 빈 카테고리 notFound 검사
// ─────────────────────────────────────────────────────────────────────────────
section("3. /category/[slug] 빈 카테고리 notFound 검사");

const categoryPageFile = fs.readFileSync(
  path.join(ROOT, "src/app/category/[slug]/page.tsx"),
  "utf8"
);

if (categoryPageFile.includes("if (tests.length === 0) notFound()")) {
  pass("/category/[slug] — 공개 테스트 0개 시 notFound() 처리 확인");
} else {
  fail("/category/[slug] — tests.length === 0 notFound() 처리 없음");
}

if (
  categoryPageFile.includes("getActiveCategorySlugs") ||
  !categoryPageFile.includes("getAllCategorySlugs")
) {
  pass(
    "/category/[slug] generateStaticParams — 활성 카테고리만 정적 생성"
  );
} else {
  fail(
    "/category/[slug] generateStaticParams — getAllCategorySlugs() 사용 중 (빈 카테고리 URL 생성)"
  );
}

if (categoryPageFile.includes("개의 테스트")) {
  fail('/category/[slug] — "{n}개의 테스트" 텍스트 노출 (0개 시 실패 문구)');
} else {
  pass('/category/[slug] — "{n}개의 테스트" 노출 텍스트 없음');
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. /experiments 차단 slug 노출 검사
// ─────────────────────────────────────────────────────────────────────────────
section("4. /experiments 페이지 차단 slug 노출 검사");

const experimentsPageFile = fs.readFileSync(
  path.join(ROOT, "src/app/experiments/page.tsx"),
  "utf8"
);

for (const slug of BLOCKED_EXPERIMENT_SLUGS) {
  const inMainSlugs = experimentsPageFile.match(
    new RegExp(`MAIN_SLUGS\\s*=\\s*\\[[^\\]]*"${slug}"`)
  );
  if (inMainSlugs) {
    fail(`/experiments — MAIN_SLUGS에 "${slug}" 포함 (오노출, 차단 필요)`);
  } else {
    // HIDDEN_SLUGS 또는 BLOCKED_SLUGS에 포함됨으로서 제외 확인
    const hasHidden =
      experimentsPageFile.includes("HIDDEN_SLUGS") &&
      experimentsPageFile.includes(`"${slug}"`);
    const hasBlocked =
      experimentsPageFile.includes("BLOCKED_SLUGS") &&
      experimentsPageFile.includes(`"${slug}"`);
    if (hasHidden) {
      pass(`/experiments — "${slug}" HIDDEN_SLUGS로 하드 차단 (환경변수 무관)`);
    } else if (hasBlocked) {
      pass(`/experiments — "${slug}" BLOCKED_SLUGS로 제어됨`);
    } else if (!experimentsPageFile.includes(`"${slug}"`)) {
      pass(`/experiments — "${slug}" 목록에 없음 (비노출 확인)`);
    } else {
      fail(`/experiments — "${slug}" 참조 있음, 차단 로직 불명확`);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. /experiments/[blocked-slug] 직접 URL 차단 검사
// ─────────────────────────────────────────────────────────────────────────────
section("5. 차단 slug 직접 URL 접근 차단 검사");

for (const slug of BLOCKED_EXPERIMENT_SLUGS) {
  const pagePath = path.join(ROOT, `src/app/experiments/${slug}/page.tsx`);
  if (!fs.existsSync(pagePath)) {
    fail(`/experiments/${slug}/page.tsx 파일 없음 (접근 자체 불가이므로 OK이나 예상치 못한 상태)`);
    continue;
  }
  const pageContent = fs.readFileSync(pagePath, "utf8");
  if (
    pageContent.includes("notFound()") &&
    (pageContent.includes("ENABLE_LAB_GAMES") || pageContent.includes("feature flag"))
  ) {
    pass(`/experiments/${slug} — 서버 전용 env(ENABLE_LAB_GAMES) 기반 notFound() 차단 확인`);
  } else if (pageContent.includes("notFound()")) {
    pass(`/experiments/${slug} — notFound() 처리 있음`);
  } else {
    fail(`/experiments/${slug} — notFound() 처리 없음 (직접 URL 접근 가능)`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. 실패 키워드 소스코드 스캔
// ─────────────────────────────────────────────────────────────────────────────
section("6. 실패 키워드 소스코드 스캔 (JSX/TSX 렌더 텍스트)");

/** 렌더링되는 JSX 텍스트인지 확인 (HTML 속성값·주석·변수명 제외) */
function isRenderedText(line) {
  const trimmed = line.trim();
  // 주석 라인 제외
  if (/^\s*(\/\/|\/\*|\*|\*)/.test(line)) return false;
  // HTML 속성값 패턴 제외: placeholder="...", title="...", aria-label="..." 등
  // 즉, keyword가 속성 값 안에만 있는 라인은 제외
  // JSX 속성: key={value}, className=, etc. 에서 키워드가 속성 값에만 있으면 제외
  // 속성 값 패턴: word="...keyword..." 또는 word={`...keyword...`}
  if (/\w+=["{`][^}>]*$/.test(trimmed) && !/>/.test(trimmed)) return false;
  // 순수 import/export/const/let/var 정의 라인 제외
  if (/^(import|export|const|let|var|type|interface|function|class)\s/.test(trimmed)) return false;
  // 렌더링 문자열로 판단: JSX 텍스트 노드 (>text<) 또는 문자열 리터럴
  return true;
}

function scanDir(dir, depth = 0) {
  if (depth > 8) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // admin 폴더 제외 (내부 도구용)
      if (entry.name === "admin") continue;
      scanDir(fullPath, depth + 1);
    } else if (/\.(tsx|ts|jsx|js)$/.test(entry.name) && !entry.name.includes(".test.")) {
      const content = fs.readFileSync(fullPath, "utf8");
      const lines = content.split("\n");
      for (const keyword of FAIL_KEYWORDS) {
        const foundLines = lines
          .map((l, i) => ({ l, i }))
          .filter(({ l }) => l.includes(keyword) && isRenderedText(l));
        for (const { l, i } of foundLines) {
          const rel = path.relative(ROOT, fullPath);
          fail(
            `"${keyword}" 발견 — ${rel}:${i + 1}\n         → ${l.trim()}`
          );
        }
      }
    }
  }
}

scanDir(path.join(ROOT, "src/app"));
scanDir(path.join(ROOT, "src/components"));

// ─────────────────────────────────────────────────────────────────────────────
// 7. 실제 라이브 URL 검사 (https://test-pink-two-64.vercel.app)
// ─────────────────────────────────────────────────────────────────────────────
section("7. 실제 라이브 URL 검사");

const PROD_BASE = "https://test-pink-two-64.vercel.app";

/** URL fetch 후 상태코드 및 HTML 키워드 검사 */
async function fetchCheck(urlPath, { expect404 = false, failIfContains = [] } = {}) {
  const url = PROD_BASE + urlPath;
  try {
    const res = await fetch(url, { redirect: "manual" });
    const status = res.status;
    if (expect404) {
      if (status === 200) {
        fail(`라이브 ${urlPath} — ${status} 응답 (404 예상, 차단 실패)`);
      } else {
        pass(`라이브 ${urlPath} — ${status} (차단 확인)`);
      }
    } else {
      if (status !== 200) {
        fail(`라이브 ${urlPath} — ${status} 응답 (200 예상)`);
        return;
      }
      if (failIfContains.length > 0) {
        const html = await res.text();
        let anyFail = false;
        for (const kw of failIfContains) {
          if (html.includes(kw)) {
            fail(`라이브 ${urlPath} — HTML에 "${kw}" 발견`);
            anyFail = true;
          }
        }
        if (!anyFail) pass(`라이브 ${urlPath} — 200 정상, 실패 키워드 없음`);
      } else {
        pass(`라이브 ${urlPath} — 200 정상`);
      }
    }
  } catch (e) {
    // fetch 자체 실패 (네트워크 없음, Node 버전 등)
    console.warn(`  ⚠️  라이브 ${urlPath} — 네트워크 오류 (스킵): ${e.message}`);
  }
}

const LIVE_FAIL_WORDS = [
  "준비중", "개발중", "아직 준비", "테스트가 없습니다",
  "레시피가 없어요", "조합 레시피가 없어요",
];

await fetchCheck("/experiments", { failIfContains: ["무한 조합", "infinite-mix"] });
await fetchCheck("/experiments/infinite-mix", { expect404: true });
await fetchCheck("/category/sseom", { expect404: true });
await fetchCheck("/category/jaemi-byeongmat", { expect404: true });
await fetchCheck("/", { failIfContains: LIVE_FAIL_WORDS });
await fetchCheck("/tests", { failIfContains: LIVE_FAIL_WORDS });

// ─────────────────────────────────────────────────────────────────────────────
// 8. 최종 보고
// ─────────────────────────────────────────────────────────────────────────────
section("최종 보고");

console.log(`\n  총 검사 수: ${passCount + failCount}`);
console.log(`  ✅ PASS: ${passCount}`);
console.log(`  ❌ FAIL: ${failCount}`);

if (failCount > 0) {
  console.error(`\n  🚨 검수 실패 — 위 FAIL 항목을 수정 후 재실행하세요.\n`);
  process.exit(1);
} else {
  console.log(`\n  🎉 전수 검수 통과 — 사용자에게 빈 페이지/실패 문구가 노출되지 않습니다.\n`);
  process.exit(0);
}
