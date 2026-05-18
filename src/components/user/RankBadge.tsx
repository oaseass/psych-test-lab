"use client";
import type { Rank } from "@/lib/user/types";
import AnimatedRankIcon from "./AnimatedRankIcon";

export type RankBadgeProps = {
  rank: Rank;
  nickname?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showName?: boolean;
  animated?: boolean;
  compact?: boolean;
};

const SIZE_ICON: Record<string, string> = {
  sm: "text-xs",
  md: "text-lg",
  lg: "text-3xl",
  xl: "text-5xl",
};

const SIZE_TEXT: Record<string, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

export default function RankBadge({
  rank,
  nickname,
  size = "md",
  showName = true,
  animated = true,
  compact = false,
}: RankBadgeProps) {
  const iconClass = SIZE_ICON[size];
  const textClass = SIZE_TEXT[size];

  if (compact) {
    return (
      <span className={`inline-flex items-center gap-0.5 ${textClass} font-semibold text-gray-700`}>
        <span className="text-gray-400">(</span>
        <AnimatedRankIcon rank={rank} sizeClass={iconClass} animated={animated} />
        <span className={`${rank.color} font-bold`}>{nickname ?? rank.shortName}</span>
        <span className="text-gray-400">)</span>
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 ${textClass}`}>
      <AnimatedRankIcon rank={rank} sizeClass={iconClass} animated={animated} />
      {showName && (
        <span className={`font-bold ${rank.color}`}>{rank.name}</span>
      )}
      {nickname && (
        <span className="text-gray-700 font-semibold">{nickname}</span>
      )}
    </span>
  );
}
