"use client";

import type { TestQuestion } from "@/types";

type Props = {
  question: TestQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string) => void;
};

export default function BalanceQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: Props) {
  const optionA = question.options[0];
  const optionB = question.options[1];

  if (!optionA || !optionB) return null;

  return (
    <div className="w-full space-y-4">
      <div className="text-center">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {questionNumber} / {totalQuestions}
        </span>
        <p className="mt-2 text-base font-semibold text-gray-700">
          {question.text}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* 선택지 A */}
        <button
          onClick={() => onAnswer(optionA.id)}
          type="button"
          className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-200 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg hover:shadow-purple-200 hover:scale-[1.01]"
        >
          <div className="absolute top-3 left-4 text-xs font-bold opacity-60 tracking-widest">
            A
          </div>
          <div className="mt-2 text-lg font-bold leading-snug">
            {optionA.text}
          </div>
        </button>

        {/* VS 배지 */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm font-black text-gray-400">VS</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* 선택지 B */}
        <button
          onClick={() => onAnswer(optionB.id)}
          type="button"
          className="group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-200 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg hover:shadow-pink-200 hover:scale-[1.01]"
        >
          <div className="absolute top-3 left-4 text-xs font-bold opacity-60 tracking-widest">
            B
          </div>
          <div className="mt-2 text-lg font-bold leading-snug">
            {optionB.text}
          </div>
        </button>
      </div>

      <p className="text-center text-xs text-gray-400">
        솔직하게, 빠르게 선택하세요
      </p>
    </div>
  );
}
