"use client";
import type { RankingEntry } from "@/lib/ranking/types";

interface Props {
  entry: RankingEntry;
  highlight?: boolean;
}

export default function UserRankCard({ entry, highlight = false }: Props) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition-all ${
      highlight
        ? "bg-indigo-50 border-indigo-300 shadow-md"
        : "bg-white border-gray-100 shadow-sm"
    }`}>
      {/* 순위 */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0 ${
        highlight ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
      }`}>
        {entry.rank}
      </div>

      {/* 계급 아이콘 */}
      {entry.rankIcon && (
        <span className="text-xl flex-shrink-0">{entry.rankIcon}</span>
      )}

      {/* 닉네임 + 계급명 */}
      <div className="flex-1 min-w-0">
        <div className={`font-bold truncate text-sm ${highlight ? "text-indigo-900" : "text-gray-800"}`}>
          {entry.rankIcon} {entry.nickname ?? entry.title}
        </div>
        {entry.rankName && (
          <div className="text-[11px] text-gray-500 truncate">{entry.rankName}</div>
        )}
      </div>

      {/* 값 */}
      <div className="text-right flex-shrink-0">
        <div className={`font-black text-sm ${highlight ? "text-indigo-700" : "text-gray-800"}`}>
          {entry.displayValue}
        </div>
        {entry.subValue && (
          <div className="text-[10px] text-gray-400">{entry.subValue}</div>
        )}
      </div>
    </div>
  );
}
