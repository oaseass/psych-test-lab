"use client";
import type { RankingPeriod } from "@/lib/ranking/types";

interface Props {
  period: RankingPeriod;
  onChange: (p: RankingPeriod) => void;
  periods?: RankingPeriod[];
}

const LABELS: Record<RankingPeriod, string> = {
  today: "오늘",
  weekly: "이번 주",
  monthly: "이번 달",
  all: "전체",
};

export default function RankingPeriodTabs({ period, onChange, periods = ["today", "weekly", "monthly", "all"] }: Props) {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {periods.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            period === p
              ? "bg-indigo-600 text-white shadow-sm"
              : "bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
          }`}
        >
          {LABELS[p]}
        </button>
      ))}
    </div>
  );
}
