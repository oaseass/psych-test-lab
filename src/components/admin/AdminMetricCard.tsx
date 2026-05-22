"use client";
import type { KpiMetric } from "@/lib/admin/types";

interface AdminMetricCardProps {
  metric: KpiMetric;
  compact?: boolean;
}

export default function AdminMetricCard({ metric, compact = false }: AdminMetricCardProps) {
  const isUp = metric.trend === "up";
  const isDown = metric.trend === "down";
  const trendColor = isUp ? "text-emerald-600" : isDown ? "text-red-500" : "text-gray-400";
  const trendBg = isUp ? "bg-emerald-50" : isDown ? "bg-red-50" : "bg-gray-50";
  const trendIcon = isUp ? "↑" : isDown ? "↓" : "→";

  if (compact) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-gray-500 font-medium">{metric.label}</span>
          <span className={`text-[10px] font-bold ${trendColor}`}>{trendIcon} {Math.abs(metric.changeRate)}%</span>
        </div>
        <div className="font-black text-gray-900 text-lg">{metric.displayValue}</div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-xs text-gray-500 font-medium mb-1">{metric.label}</div>
          <div className="font-black text-gray-900 text-2xl">{metric.displayValue}</div>
        </div>
        <div className={`${trendBg} ${trendColor} text-xs font-bold px-2.5 py-1 rounded-full`}>
          {trendIcon} {Math.abs(metric.changeRate)}%
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-400">{metric.changeLabel}</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">{metric.description}</span>
      </div>
    </div>
  );
}
