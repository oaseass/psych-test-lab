import type { TestQuestion, TestResult, UserAnswer } from "@/types";

// 답변들을 기반으로 결과 유형별 점수를 계산합니다
export function calculateScores(
  questions: TestQuestion[],
  answers: UserAnswer[]
): Record<string, number> {
  const scoreMap: Record<string, number> = {};

  for (const answer of answers) {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const option = question.options.find((o) => o.id === answer.optionId);
    if (!option) continue;

    for (const [key, value] of Object.entries(option.scores)) {
      scoreMap[key] = (scoreMap[key] || 0) + value;
    }
  }

  return scoreMap;
}

// 점수맵에서 최고 점수의 결과 유형을 반환합니다
export function resolveTopResult(
  scoreMap: Record<string, number>,
  results: TestResult[],
  slug: string
): TestResult {
  if (results.length === 0) {
    throw new Error("결과 유형이 없습니다");
  }

  // 결과들의 점수 계산
  let maxScore = -1;
  let topResult = results[0];

  for (const result of results) {
    const score = scoreMap[result.id] || 0;
    if (score > maxScore) {
      maxScore = score;
      topResult = result;
    }
  }

  // 동점 처리: slug 기반 해시로 안정적인 결정
  const tied = results.filter((r) => (scoreMap[r.id] || 0) === maxScore);
  if (tied.length > 1) {
    // slug와 최고점수를 합쳐 시드 생성
    let hashSeed = 0;
    const str = slug + maxScore.toString();
    for (let i = 0; i < str.length; i++) {
      hashSeed = ((hashSeed << 5) - hashSeed + str.charCodeAt(i)) & 0xffffffff;
    }
    const idx = Math.abs(hashSeed) % tied.length;
    return tied[idx];
  }

  return topResult;
}
