"use client";

import type { VisualOption } from "@/lib/visuals/visualOptions";
import GeneratedVisualCard from "./GeneratedVisualCard";

type Props = {
  question: { text: string };
  options: VisualOption[];
  selectedId?: string;
  onSelect: (optionId: string) => void;
};

export default function CardPickGrid({ question, options, selectedId, onSelect }: Props) {
  return (
    <div className="w-full space-y-6">
      <p className="text-center text-lg font-semibold text-gray-800 leading-relaxed">
        {question.text}
      </p>

      <p className="text-center text-sm text-gray-500">
        직감에 따라 하나를 선택하세요
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        {options.map((opt) => (
          <GeneratedVisualCard
            key={opt.id}
            option={opt}
            selected={selectedId === opt.id}
            onClick={() => onSelect(opt.id)}
            size="md"
          />
        ))}
      </div>

      {selectedId && (
        <p className="text-center text-sm text-purple-600 font-medium">
          ✓ 카드 선택 완료
        </p>
      )}
    </div>
  );
}
