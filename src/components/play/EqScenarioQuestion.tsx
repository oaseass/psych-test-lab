"use client";

import type { TestQuestion } from "@/types";

type Props = {
  question: TestQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string) => void;
};

export default function EqScenarioQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: Props) {
  return (
    <div className="w-full space-y-5">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold">
          💡 상황 {questionNumber} / {totalQuestions}
        </span>
      </div>

      {/* 시나리오 박스 */}
      <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-200 p-5">
        <p className="text-base font-medium text-gray-800 leading-relaxed">
          {question.text}
        </p>
      </div>

      <p className="text-center text-sm text-gray-500">
        이 상황에서 나는 어떻게 반응할까요?
      </p>

      {/* 4가지 반응 선택지 */}
      <div className="space-y-2">
        {question.options.map((opt, idx) => (
          <button
            key={opt.id}
            onClick={() => onAnswer(opt.id)}
            type="button"
            className="w-full flex items-start gap-3 py-4 px-4 rounded-xl border-2 border-gray-200 bg-white hover:border-teal-400 hover:bg-teal-50 text-left text-sm font-medium text-gray-700 transition-all duration-200"
          >
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold">
              {String.fromCharCode(65 + idx)}
            </span>
            <span className="leading-relaxed">{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
