"use client";

import type { VisualOption } from "@/lib/visuals/visualOptions";
import GeneratedVisualCard from "./GeneratedVisualCard";

type Props = {
  question: { text: string };
  options: VisualOption[];
  selectedId?: string;
  onSelect: (optionId: string) => void;
  columns?: 2 | 3 | 4;
};

export default function VisualChoiceGrid({
  question,
  options,
  selectedId,
  onSelect,
  columns = 3,
}: Props) {
  const colClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-4",
  }[columns];

  return (
    <div className="w-full space-y-6">
      <p className="text-center text-lg font-semibold text-gray-800 leading-relaxed">
        {question.text}
      </p>

      <div className={`grid ${colClass} gap-3 justify-items-center`}>
        {options.map((opt) => (
          <GeneratedVisualCard
            key={opt.id}
            option={opt}
            selected={selectedId === opt.id}
            onClick={() => onSelect(opt.id)}
            size="lg"
          />
        ))}
      </div>

      {selectedId && (
        <p className="text-center text-sm text-purple-600 font-medium">
          ✓ 선택 완료 — 다음 단계로 넘어가세요
        </p>
      )}
    </div>
  );
}
