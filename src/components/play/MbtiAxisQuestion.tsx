"use client";

import type { TestQuestion } from "@/types";

// 각 문항의 축 정보를 text에서 파싱
// 형식: "질문 텍스트 [E/I]" 또는 "[S/N] 질문 텍스트"
function getAxisLabel(question: TestQuestion): string {
  const match = question.text.match(/\[([EI]\/[EI]|[SN]\/[SN]|[TF]\/[TF]|[JP]\/[JP])\]/);
  if (match) return match[1];

  // 옵션의 scores에서 축 추론
  const opt = question.options[0];
  if (!opt) return "";
  const keys = Object.keys(opt.scores || {});
  if (keys.some((k) => ["E", "I"].includes(k))) return "E/I";
  if (keys.some((k) => ["S", "N"].includes(k))) return "S/N";
  if (keys.some((k) => ["T", "F"].includes(k))) return "T/F";
  if (keys.some((k) => ["J", "P"].includes(k))) return "J/P";
  return "";
}

const axisDescriptions: Record<string, { left: string; right: string; leftFull: string; rightFull: string }> = {
  "E/I": {
    left: "E",
    right: "I",
    leftFull: "외향형",
    rightFull: "내향형",
  },
  "S/N": {
    left: "S",
    right: "N",
    leftFull: "현실형",
    rightFull: "직관형",
  },
  "T/F": {
    left: "T",
    right: "F",
    leftFull: "사고형",
    rightFull: "감정형",
  },
  "J/P": {
    left: "J",
    right: "P",
    leftFull: "계획형",
    rightFull: "인식형",
  },
};

type Props = {
  question: TestQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (optionId: string) => void;
};

export default function MbtiAxisQuestion({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: Props) {
  const axisLabel = getAxisLabel(question);
  const axisInfo = axisDescriptions[axisLabel];
  const optionA = question.options[0];
  const optionB = question.options[1];

  if (!optionA || !optionB) return null;

  const cleanText = question.text.replace(/\s*\[[^\]]+\]\s*/g, "").trim();

  return (
    <div className="w-full space-y-5">
      <div className="text-center">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
          {questionNumber} / {totalQuestions}
        </span>
        {axisInfo && (
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
              {axisInfo.leftFull} vs {axisInfo.rightFull}
            </span>
          </div>
        )}
        <p className="mt-3 text-base font-semibold text-gray-800 leading-relaxed">
          {cleanText}
        </p>
      </div>

      {/* 축 시각화 */}
      {axisInfo && (
        <div className="flex items-center gap-2 text-xs text-gray-500 px-4">
          <span className="font-bold text-purple-600">{axisInfo.left}</span>
          <div className="flex-1 h-1 rounded-full bg-gradient-to-r from-purple-300 to-pink-300" />
          <span className="font-bold text-pink-600">{axisInfo.right}</span>
        </div>
      )}

      {/* 두 선택지 */}
      <div className="flex flex-col gap-3">
        <button
          onClick={() => onAnswer(optionA.id)}
          type="button"
          className="w-full py-4 px-5 rounded-xl border-2 border-purple-200 bg-purple-50 hover:border-purple-500 hover:bg-purple-100 text-left text-sm font-medium text-gray-800 transition-all duration-200"
        >
          <span className="font-bold text-purple-600 mr-2">
            {axisInfo ? axisInfo.left : "A"}
          </span>
          {optionA.text}
        </button>

        <button
          onClick={() => onAnswer(optionB.id)}
          type="button"
          className="w-full py-4 px-5 rounded-xl border-2 border-pink-200 bg-pink-50 hover:border-pink-500 hover:bg-pink-100 text-left text-sm font-medium text-gray-800 transition-all duration-200"
        >
          <span className="font-bold text-pink-600 mr-2">
            {axisInfo ? axisInfo.right : "B"}
          </span>
          {optionB.text}
        </button>
      </div>
    </div>
  );
}
