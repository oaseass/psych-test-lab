"use client";

import { COLOR_OPTIONS } from "@/lib/visuals/visualOptions";

type Props = {
  question: { text: string };
  selectedId?: string;
  onSelect: (optionId: string) => void;
};

export default function ColorChoiceGrid({ question, selectedId, onSelect }: Props) {
  return (
    <div className="w-full space-y-6">
      <p className="text-center text-lg font-semibold text-gray-800 leading-relaxed">
        {question.text}
      </p>

      <div className="grid grid-cols-5 gap-3 max-w-sm mx-auto">
        {COLOR_OPTIONS.map((col) => (
          <button
            key={col.id}
            onClick={() => onSelect(col.id)}
            type="button"
            aria-label={col.label}
            aria-pressed={selectedId === col.id}
            className={`
              relative aspect-square rounded-full transition-all duration-200 border-4
              ${
                selectedId === col.id
                  ? "border-gray-800 scale-125 shadow-xl"
                  : "border-transparent hover:scale-110 hover:shadow-md"
              }
            `}
            style={{ backgroundColor: col.color }}
          >
            {selectedId === col.id && (
              <span className="absolute inset-0 flex items-center justify-center text-white drop-shadow-md text-xs font-bold">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>

      {selectedId && (
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">
            {COLOR_OPTIONS.find((c) => c.id === selectedId)?.emoji}{" "}
            {COLOR_OPTIONS.find((c) => c.id === selectedId)?.label} 선택
          </p>
        </div>
      )}
    </div>
  );
}
