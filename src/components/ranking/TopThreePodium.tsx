"use client";
import type { RankingEntry } from "@/lib/ranking/types";

const MEDAL = ["🥇", "🥈", "🥉"];
const PODIUM_BG = [
  "bg-gradient-to-b from-yellow-400 to-yellow-500",
  "bg-gradient-to-b from-gray-300 to-gray-400",
  "bg-gradient-to-b from-amber-600 to-amber-700",
];
const PODIUM_HEIGHT = ["h-24", "h-16", "h-12"];

interface Props {
  entries: RankingEntry[];
}

export default function TopThreePodium({ entries }: Props) {
  const top3 = entries.slice(0, 3);
  // 시상대 순서: 2등, 1등, 3등
  const order = [top3[1], top3[0], top3[2]].filter(Boolean);
  const orderIndex = [1, 0, 2];

  if (top3.length === 0) return null;

  return (
    <div className="flex items-end justify-center gap-3 py-4 px-2">
      {order.map((entry, i) => {
        const origIdx = orderIndex[i];
        const isCenter = origIdx === 0;
        return (
          <div key={entry.id} className="flex flex-col items-center gap-1 w-28">
            {/* 아바타 / 아이콘 */}
            <div className={`relative ${isCenter ? "w-16 h-16" : "w-12 h-12"} rounded-full flex items-center justify-center text-2xl shadow-lg border-4 ${isCenter ? "border-yellow-400 bg-yellow-50" : origIdx === 1 ? "border-gray-300 bg-gray-50" : "border-amber-600 bg-amber-50"}`}>
              {entry.rankIcon || "👤"}
              <span className="absolute -top-2 -right-1 text-base">{MEDAL[origIdx]}</span>
            </div>

            {/* 닉네임 */}
            <div className="text-center">
              <div className={`font-black text-gray-900 truncate max-w-[7rem] ${isCenter ? "text-sm" : "text-xs"}`}>
                {entry.rankIcon} {entry.nickname ?? entry.title}
              </div>
              {entry.rankName && (
                <div className="text-[10px] text-gray-500 truncate">{entry.rankName}</div>
              )}
            </div>

            {/* 시상대 */}
            <div className={`w-full ${PODIUM_HEIGHT[origIdx]} ${PODIUM_BG[origIdx]} rounded-t-lg flex items-center justify-center shadow-inner`}>
              <span className="text-white font-black text-lg">{origIdx + 1}</span>
            </div>

            {/* 값 */}
            <div className={`font-bold ${isCenter ? "text-sm text-yellow-600" : "text-xs text-gray-600"}`}>
              {entry.displayValue}
            </div>
          </div>
        );
      })}
    </div>
  );
}
