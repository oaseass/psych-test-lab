"use client";
import type { ContentStatsEntry } from "@/lib/ranking/types";

interface Props {
  entries: ContentStatsEntry[];
  title?: string;
  myResultId?: string;
  type?: "result" | "choice";
}

const TREND_ICON = { up: "↑", down: "↓", flat: "→" } as const;
const TREND_COLOR = { up: "text-emerald-500", down: "text-red-400", flat: "text-gray-400" } as const;
const BAR_COLORS = [
  "bg-indigo-500",
  "bg-violet-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-rose-500",
];

export default function DistributionChart({ entries, title, myResultId, type = "result" }: Props) {
  if (entries.length === 0) return null;
  const max = Math.max(...entries.map(e => e.percentage));

  return (
    <div className="space-y-3">
      {title && <div className="text-sm font-bold text-gray-800">{title}</div>}

      {entries.slice(0, 8).map((entry, i) => {
        const isMine = entry.id === myResultId;
        const pct = Math.max(2, (entry.percentage / Math.max(max, 1)) * 100);

        return (
          <div key={entry.id} className={`space-y-1 rounded-xl p-2 ${isMine ? "bg-indigo-50 border border-indigo-200" : ""}`}>
            <div className="flex items-center justify-between text-xs">
              <span className={`font-semibold ${isMine ? "text-indigo-700" : "text-gray-700"}`}>
                {i === 0 && type === "result" && "👑 "}
                {entry.label}
                {isMine && <span className="ml-1 text-indigo-500 text-[10px]">← 내 결과</span>}
              </span>
              <div className="flex items-center gap-1.5">
                {entry.trend && (
                  <span className={`text-[10px] ${TREND_COLOR[entry.trend]}`}>
                    {TREND_ICON[entry.trend]}
                  </span>
                )}
                <span className={`font-black ${isMine ? "text-indigo-600" : "text-gray-800"}`}>
                  {entry.percentage}%
                </span>
                <span className="text-gray-400 text-[10px]">({entry.count.toLocaleString()}명)</span>
              </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${BAR_COLORS[i % BAR_COLORS.length]}`}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}

      {type === "choice" && entries.length >= 2 && (
        <div className="mt-2 text-center text-xs text-gray-500">
          {entries[0].percentage >= 60
            ? `다수파(${entries[0].percentage}%) vs 소수파(${entries[1].percentage}%)`
            : entries[1].percentage >= 60
            ? `소수파(${entries[0].percentage}%) vs 다수파(${entries[1].percentage}%)`
            : "팽팽한 접전! 두 선택이 비슷해요."}
        </div>
      )}
    </div>
  );
}
