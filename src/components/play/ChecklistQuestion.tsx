"use client";

import { useState } from "react";
import type { PlayableTest } from "@/types";

type Props = {
  playable: PlayableTest;
  onComplete: (score: number) => void;
};

export default function ChecklistQuestion({ playable, onComplete }: Props) {
  const items = playable.questions.map((q) => ({
    id: q.id,
    text: q.text,
  }));

  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleSubmit() {
    onComplete(checked.size);
  }

  const checkPercent = Math.round((checked.size / items.length) * 100);

  return (
    <div className="w-full space-y-5">
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-800">{playable.meta.title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          해당되는 항목을 모두 체크하세요
        </p>
      </div>

      {/* 체크리스트 */}
      <div className="space-y-2">
        {items.map((item) => {
          const isChecked = checked.has(item.id);
          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              type="button"
              className={`
                w-full flex items-start gap-3 p-3 rounded-xl border-2 text-left transition-all duration-150
                ${
                  isChecked
                    ? "border-purple-400 bg-purple-50 text-purple-900"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                }
              `}
            >
              <div
                className={`
                  mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all
                  ${isChecked ? "bg-purple-500 border-purple-500" : "border-gray-400"}
                `}
              >
                {isChecked && (
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
              <span className="text-sm leading-relaxed">{item.text}</span>
            </button>
          );
        })}
      </div>

      {/* 진행도 */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>체크 항목: {checked.size}/{items.length}</span>
          <span>{checkPercent}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
            style={{ width: `${checkPercent}%` }}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        type="button"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-base hover:from-purple-700 hover:to-pink-600 transition-all duration-200 shadow-lg"
      >
        결과 확인하기 →
      </button>
    </div>
  );
}
