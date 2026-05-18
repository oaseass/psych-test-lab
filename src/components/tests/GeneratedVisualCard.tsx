"use client";

import type { VisualOption } from "@/lib/visuals/visualOptions";
import { cn } from "@/lib/utils";

type Props = {
  option: VisualOption;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
};

export default function GeneratedVisualCard({
  option,
  selected = false,
  onClick,
  size = "md",
}: Props) {
  const sizeClass = {
    sm: "h-20 w-20",
    md: "h-28 w-28",
    lg: "h-36 w-full",
  }[size];

  const emojiSize = {
    sm: "text-3xl",
    md: "text-4xl",
    lg: "text-5xl",
  }[size];

  return (
    <button
      onClick={onClick}
      className={cn(
        "relative rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-200 border-2",
        sizeClass,
        selected
          ? "border-purple-500 ring-4 ring-purple-300 scale-105"
          : "border-transparent hover:border-gray-300 hover:scale-103"
      )}
      style={{
        background: option.gradient || option.color || "#e5e7eb",
      }}
      type="button"
      aria-label={option.label}
      aria-pressed={selected}
    >
      {/* 반투명 오버레이 */}
      <div className="absolute inset-0 bg-black/10 rounded-2xl" />

      {/* 이모지 */}
      {option.emoji && (
        <span
          className={cn("relative z-10 leading-none", emojiSize)}
          role="img"
          aria-label={option.label}
        >
          {option.emoji}
        </span>
      )}

      {/* 라벨 */}
      <span className="relative z-10 text-white font-bold text-xs text-center px-1 drop-shadow-md">
        {option.label}
      </span>

      {/* 선택된 경우 체크 */}
      {selected && (
        <div className="absolute top-2 right-2 z-10 bg-purple-500 rounded-full w-5 h-5 flex items-center justify-center">
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
        </div>
      )}
    </button>
  );
}
