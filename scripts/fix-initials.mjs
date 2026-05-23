// scripts/fix-initials.mjs
// Run: npx tsx scripts/fix-initials.mjs
// Rewrites all `initials` fields in initialQuizData.ts to match getChosung(answer).

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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

const dataPath = path.resolve(__dirname, "../src/data/games/initialQuizData.ts");
let src = readFileSync(dataPath, "utf8");

// Extract all answer values and compute their correct initials,
// then replace initials: "..." for each question block.
// Pattern: initials: "STORED", answer: "ANSWER"
// We need to replace STORED with getChosung(ANSWER).

const pattern = /initials:\s*"([^"]*)",\s*answer:\s*"([^"]*)"/g;
let count = 0;
const replaced = src.replace(pattern, (match, storedInitials, answer) => {
  const correct = getChosung(answer);
  if (storedInitials !== correct) {
    count++;
    console.log(`  "${answer}": "${storedInitials}" → "${correct}"`);
  }
  return `initials: "${correct}", answer: "${answer}"`;
});

writeFileSync(dataPath, replaced, "utf8");
console.log(`\n✅ ${count}개 초성 수정 완료`);
