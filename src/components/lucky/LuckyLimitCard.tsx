"use client";

import { LUCKY_DAILY_MAX_SPEND, LUCKY_DAILY_MAX_PROFIT } from "@/lib/lucky/luckyPointService";
import type { LuckyDailyStats } from "@/lib/lucky/types";

// ─────────────────────────────────────────────
// LuckyLimitCard — 하루 한도 표시
// ─────────────────────────────────────────────

type Props = {
  stats: LuckyDailyStats;
  currentPoints: number;
};

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-2 rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: color }}
      />
    </div>
  );
}

export default function LuckyLimitCard({ stats, currentPoints }: Props) {
  const spendLeft = Math.max(0, LUCKY_DAILY_MAX_SPEND - stats.totalSpend);
  const profitLeft = Math.max(0, LUCKY_DAILY_MAX_PROFIT - stats.totalProfit);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-700">오늘 한도</span>
        <span className="text-xs text-gray-400">{stats.playCount}회 도전</span>
      </div>
      <div className="space-y-2">
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>사용 {stats.totalSpend.toLocaleString()}P</span>
            <span>한도 {LUCKY_DAILY_MAX_SPEND.toLocaleString()}P · 잔여 {spendLeft.toLocaleString()}P</span>
          </div>
          <Bar value={stats.totalSpend} max={LUCKY_DAILY_MAX_SPEND} color="#EF4444" />
        </div>
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>획득 {stats.totalProfit.toLocaleString()}P</span>
            <span>한도 {LUCKY_DAILY_MAX_PROFIT.toLocaleString()}P · 잔여 {profitLeft.toLocaleString()}P</span>
          </div>
          <Bar value={stats.totalProfit} max={LUCKY_DAILY_MAX_PROFIT} color="#10B981" />
        </div>
      </div>
      <div className="pt-2 border-t border-gray-50 flex justify-between text-xs">
        <span className="text-gray-400">현재 보유</span>
        <span className="font-bold text-violet-600">{currentPoints.toLocaleString()}P</span>
      </div>
    </div>
  );
}
