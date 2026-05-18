"use client";

import { useState } from "react";
import type { TestQuestion } from "@/types";

type Props = {
  question: TestQuestion;
  onAnswer: (optionId: string) => void;
};

export default function IllusionPrompt({ question, onAnswer }: Props) {
  const [revealed, setRevealed] = useState(false);

  // 그라디언트 패턴 (SVG 없이 CSS만으로 착시 효과)
  const illusionPatterns = [
    {
      style: {
        background: `repeating-linear-gradient(
          45deg,
          #1a1a2e,
          #1a1a2e 10px,
          #16213e 10px,
          #16213e 20px
        )`,
      },
      label: "패턴을 바라보면?",
    },
    {
      style: {
        background: `radial-gradient(ellipse at 20% 20%, #FF6B6B 0%, transparent 50%),
                     radial-gradient(ellipse at 80% 80%, #4ECDC4 0%, transparent 50%),
                     radial-gradient(ellipse at 50% 50%, #45B7D1 0%, transparent 70%)`,
        backgroundColor: "#1a1a2e",
      },
      label: "중앙을 30초 바라본 후",
    },
    {
      style: {
        background: `repeating-conic-gradient(
          #1a1a2e 0deg 10deg,
          #4a1a6e 10deg 20deg
        )`,
      },
      label: "소용돌이 패턴",
    },
    {
      style: {
        background: `linear-gradient(135deg, 
          #000 25%, transparent 25%, transparent 75%, #000 75%),
          linear-gradient(135deg, 
          #000 25%, transparent 25%, transparent 75%, #000 75%)`,
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0, 10px 10px",
        backgroundColor: "#4a4a6e",
      },
      label: "체커보드 착시",
    },
  ];

  const patternIndex = Math.abs(question.id.charCodeAt(0)) % illusionPatterns.length;
  const pattern = illusionPatterns[patternIndex];

  return (
    <div className="w-full space-y-6">
      <p className="text-center text-lg font-semibold text-gray-800 leading-relaxed">
        {question.text}
      </p>

      {/* 착시 패턴 박스 */}
      <div
        className="mx-auto w-64 h-64 rounded-2xl overflow-hidden flex items-center justify-center cursor-pointer relative"
        style={pattern.style as React.CSSProperties}
        onClick={() => setRevealed(true)}
      >
        {!revealed && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <div className="text-white text-center p-4">
              <div className="text-4xl mb-2">👁️</div>
              <p className="text-sm font-medium">{pattern.label}</p>
              <p className="text-xs opacity-80 mt-1">탭해서 집중하기</p>
            </div>
          </div>
        )}
        {revealed && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-white text-sm font-bold text-center px-4 drop-shadow-lg">
              지금 처음 떠오른 느낌은?
            </p>
          </div>
        )}
      </div>

      {/* 선택지 */}
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onAnswer(opt.id)}
            type="button"
            className="py-4 px-4 rounded-xl border-2 border-gray-200 bg-white hover:border-purple-400 hover:bg-purple-50 text-sm font-medium text-gray-700 transition-all duration-200 text-left leading-snug"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
