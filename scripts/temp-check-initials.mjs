import { initialQuizList } from "../src/data/games/initialQuizData.ts";

const C = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
function g(t) {
  return t.split("").map(c => {
    const code = c.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) return C[Math.floor((code - 0xAC00) / 588)];
    if (c === " ") return " ";
    return "";
  }).join("").trim().replace(/\s{2,}/g, " ");
}

for (const quiz of initialQuizList) {
  for (const q of quiz.questions) {
    const expected = g(q.answer);
    console.log(`${quiz.slug}|${q.id}|${JSON.stringify(q.answer)}|stored:${JSON.stringify(q.initials)}|expected:${JSON.stringify(expected)}|${expected === q.initials ? "OK" : "MISMATCH"}`);
  }
}
