import type { PlayableTest, TestResult, UserAnswer, TestPlayResult } from "@/types";
import { calculateScores, resolveTopResult } from "./scoring";

// resultId 형식: {testSlug}__{resultTypeId}__{timestamp}
// URL-safe 처리를 위해 underscore 사용

export function buildResultId(testSlug: string, resultTypeId: string): string {
  const timestamp = Date.now().toString(36);
  return `${testSlug}__${resultTypeId}__${timestamp}`;
}

export function parseResultId(resultId: string): {
  testSlug: string;
  resultTypeId: string;
  timestamp?: string;
} | null {
  const parts = resultId.split("__");
  if (parts.length < 2) return null;
  return {
    testSlug: parts[0],
    resultTypeId: parts[1],
    timestamp: parts[2],
  };
}

export function resolveResult(
  playableTest: PlayableTest,
  answers: UserAnswer[]
): { result: TestResult; scoreMap: Record<string, number>; resultId: string } {
  const scoreMap = calculateScores(playableTest.questions, answers);
  const result = resolveTopResult(scoreMap, playableTest.results, playableTest.meta.slug);
  const resultId = buildResultId(playableTest.meta.slug, result.id);

  return { result, scoreMap, resultId };
}

// resultId에서 TestPlayResult 복원 (localStorage 없이)
export function restoreFromResultId(
  resultId: string,
  playableTest: PlayableTest
): { result: TestResult; playResult: Partial<TestPlayResult> } | null {
  const parsed = parseResultId(resultId);
  if (!parsed) return null;

  const result = playableTest.results.find((r) => r.id === parsed.resultTypeId);
  if (!result) {
    // 결과 유형이 없으면 첫 번째 결과 반환
    return {
      result: playableTest.results[0],
      playResult: {
        resultId,
        testSlug: parsed.testSlug,
        resultTypeId: parsed.resultTypeId,
      },
    };
  }

  return {
    result,
    playResult: {
      resultId,
      testSlug: parsed.testSlug,
      resultTypeId: parsed.resultTypeId,
    },
  };
}
