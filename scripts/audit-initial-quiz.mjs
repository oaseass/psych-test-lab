// scripts/audit-initial-quiz.mjs
// 초성퀴즈 데이터 정합성 검사
// Run: npx tsx scripts/audit-initial-quiz.mjs

import { initialQuizList } from "../src/data/games/initialQuizData.ts";

const CHOSUNG_LIST = [
  "ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ",
  "ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ",
];

function getChosung(text) {
  return text
    .split("")
    .map((c) => {
      const code = c.charCodeAt(0);
      if (code >= 0xac00 && code <= 0xd7a3)
        return CHOSUNG_LIST[Math.floor((code - 0xac00) / 588)];
      if (c === " ") return " ";
      return "";
    })
    .join("")
    .trim()
    .replace(/\s{2,}/g, " ");
}

let errors   = 0;
let warnings = 0;

for (const quiz of initialQuizList) {
  for (const q of quiz.questions) {
    // answer 빈값 검사
    if (!q.answer) {
      console.error(`❌ [${quiz.slug}] ${q.id}: answer가 비어 있음`);
      errors++;
      continue;
    }

    // initials 정합성 검사
    const computed = getChosung(q.answer);
    if (q.initials !== computed) {
      console.error(
        `❌ [${quiz.slug}] ${q.id}: "${q.answer}" stored="${q.initials}" expected="${computed}"`,
      );
      errors++;
    }

    // options 검사
    if (Array.isArray(q.options)) {
      if (q.options.length < 4) {
        console.warn(`⚠️  [${quiz.slug}] ${q.id}: options ${q.options.length}개 (4개 미만)`);
        warnings++;
      }
      if (!q.options.includes(q.answer)) {
        console.error(`❌ [${quiz.slug}] ${q.id}: options에 정답 "${q.answer}"이 없음`);
        errors++;
      }
    }

    // aliases 중복 검사
    if (Array.isArray(q.aliases) && q.aliases.length > 0) {
      const unique = new Set(q.aliases);
      if (unique.size !== q.aliases.length) {
        console.warn(`⚠️  [${quiz.slug}] ${q.id}: aliases에 중복 있음`);
        warnings++;
      }
    }
  }
}

console.log(
  `\n결과: ${errors === 0 ? "✅ 모두 통과" : `❌ ${errors}개 실패`} | ⚠️  ${warnings}개 경고`,
);
process.exit(errors > 0 ? 1 : 0);
