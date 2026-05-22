"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/play/ProgressBar";
import QuestionCard from "@/components/play/QuestionCard";
import { resolveResult } from "@/lib/test-engine/resultResolver";
import { savePlayResult, saveProgress, loadProgress, clearProgress } from "@/lib/test-engine/storage";
import { trackTestStart, trackTestComplete } from "@/lib/tracking/tracking";
import type { UserAnswer, PlayableTest } from "@/types";

interface TestPlayerProps {
  initialTest: PlayableTest;
  slug: string;
  resumedAnswers?: UserAnswer[];
  resumedIndex?: number;
}

export default function TestPlayer({ initialTest, slug, resumedAnswers = [], resumedIndex = 0 }: TestPlayerProps) {
  const router = useRouter();

  const [answers, setAnswers] = useState<UserAnswer[]>(resumedAnswers);
  const [currentIndex, setCurrentIndex] = useState(resumedIndex);
  const [startTime] = useState(Date.now());

  function handleAnswer(optionId: string) {
    const question = initialTest.questions[currentIndex];

    const newAnswer: UserAnswer = {
      questionId: question.id,
      optionId,
    };

    const newAnswers = [...answers.filter((a) => a.questionId !== question.id), newAnswer];
    setAnswers(newAnswers);

    const nextIndex = currentIndex + 1;

    if (nextIndex >= initialTest.questions.length) {
      const { result, scoreMap, resultId } = resolveResult(initialTest, newAnswers);
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      trackTestComplete(slug, result.id, timeSpent);

      savePlayResult({
        resultId,
        testSlug: slug,
        resultTypeId: result.id,
        scoreMap,
        answers: newAnswers,
        createdAt: new Date().toISOString(),
      });

      clearProgress(slug);
      router.push(`/result/${encodeURIComponent(resultId)}`);
    } else {
      setCurrentIndex(nextIndex);
      saveProgress(slug, newAnswers, nextIndex);
    }
  }

  const currentQuestion = initialTest.questions[currentIndex];

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-3 truncate">
            {initialTest.meta.title}
          </h2>
          <ProgressBar current={currentIndex + 1} total={initialTest.questions.length} />
        </div>

        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          onAnswer={handleAnswer}
          selectedOptionId={answers.find((a) => a.questionId === currentQuestion.id)?.optionId}
        />

        {currentIndex > 0 && (
          <button
            onClick={() => setCurrentIndex(currentIndex - 1)}
            className="mt-6 text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← 이전 문항
          </button>
        )}
      </div>
    </div>
  );
}
