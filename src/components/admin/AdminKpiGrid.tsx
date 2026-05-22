"use client";
import type { KpiMetric } from "@/lib/admin/types";
import AdminMetricCard from "./AdminMetricCard";

interface AdminKpiGridProps {
  metrics: KpiMetric[];
  cols?: 2 | 3 | 4 | 6;
}

const COL_CLASS: Record<number, string> = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  6: "grid-cols-2 md:grid-cols-3 xl:grid-cols-6",
};

export default function AdminKpiGrid({ metrics, cols = 4 }: AdminKpiGridProps) {
  return (
    <div className={`grid ${COL_CLASS[cols]} gap-4`}>
      {metrics.map(m => (
        <AdminMetricCard key={m.id} metric={m} />
      ))}
    </div>
  );
}
