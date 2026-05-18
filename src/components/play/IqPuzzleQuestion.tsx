"use client";

import type { TestQuestion } from "@/types";

type Props = {
  question: TestQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string) => void;
};

export default function IqPuzzleQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: Props) {
  // 옵션 색상 (A B C D)
  const optionColors = [
    "from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600",
    "from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600",
    "from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600",
    "from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600",
  ];
  const optionLetters = ["A", "B", "C", "D"];

  return (
    <div className="w-full space-y-5">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
          🧩 {questionNumber} / {totalQuestions}
        </span>
        <p className="mt-3 text-base font-bold text-gray-800 leading-relaxed whitespace-pre-line">
          {question.text}
        </p>
      </div>

      {/* 선택지 2×2 그리드 */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt, idx) => (
          <button
            key={opt.id}
            onClick={() => onAnswer(opt.id)}
            type="button"
            className={`
              py-5 px-4 rounded-xl text-white font-bold text-center text-base
              bg-gradient-to-br ${optionColors[idx] || optionColors[0]}
              transition-all duration-200 hover:scale-[1.02] shadow-sm
            `}
          >
            <span className="block text-xs opacity-75 mb-1">{optionLetters[idx]}</span>
            {opt.text}
          </button>
        ))}
      </div>

      <p className="text-center text-xs text-gray-400">
        재미용 두뇌 순발력 테스트 · 공식 IQ 검사 아님
      </p>
    </div>
  );
}
