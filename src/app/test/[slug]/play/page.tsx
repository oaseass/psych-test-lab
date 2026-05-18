"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "@/components/play/ProgressBar";
import QuestionCard from "@/components/play/QuestionCard";
import { getPlayableTest } from "@/lib/data/testRepository";
import { resolveResult } from "@/lib/test-engine/resultResolver";
import { savePlayResult, saveProgress, loadProgress, clearProgress } from "@/lib/test-engine/storage";
import { trackTestStart, trackTestComplete } from "@/lib/tracking/tracking";
import type { UserAnswer, PlayableTest } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function PlayPage({ params }: PageProps) {
  const { slug } = use(params);
  const router = useRouter();

  const [playable, setPlayable] = useState<PlayableTest | null>(null);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const test = getPlayableTest(slug);
    if (!test) {
      router.replace("/404");
      return;
    }
    setPlayable(test);

    // 이전 진행 상황 복원
    const progress = loadProgress(slug);
    if (progress && progress.answers.length > 0) {
      setAnswers(progress.answers);
      setCurrentIndex(progress.currentIndex);
    } else {
      trackTestStart(slug, test.meta.title);
    }
  }, [slug, router]);

  function handleAnswer(optionId: string) {
    if (!playable) return;
    const question = playable.questions[currentIndex];

    const newAnswer: UserAnswer = {
      questionId: question.id,
      optionId,
    };

    const newAnswers = [...answers.filter((a) => a.questionId !== question.id), newAnswer];
    setAnswers(newAnswers);

    const nextIndex = currentIndex + 1;

    if (nextIndex >= playable.questions.length) {
      // 마지막 문항 → 결과 계산
      const { result, scoreMap, resultId } = resolveResult(playable, newAnswers);

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

  if (!playable) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl animate-pulse mb-3">🧠</div>
          <p>테스트 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = playable.questions[currentIndex];

  return (
    <div className="min-h-screen bg-brand-bg">
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-3 truncate">
            {playable.meta.title}
          </h2>
          <ProgressBar current={currentIndex + 1} total={playable.questions.length} />
        </div>

        {/* 질문 */}
        <QuestionCard
          key={currentQuestion.id}
          question={currentQuestion}
          questionNumber={currentIndex + 1}
          onAnswer={handleAnswer}
          selectedOptionId={answers.find((a) => a.questionId === currentQuestion.id)?.optionId}
        />

        {/* 이전 버튼 */}
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
