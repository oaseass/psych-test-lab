"use client";
import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminKpiGrid from "@/components/admin/AdminKpiGrid";
import AdminSection from "@/components/admin/AdminSection";
import AdminChartCard from "@/components/admin/AdminChartCard";
import AdminDataTable from "@/components/admin/AdminDataTable";
import type { AdminDateRange } from "@/lib/admin/types";
import { getKpiMetrics, getTrafficSeries, getFunnelMetrics, getCategoryPerformance } from "@/lib/admin/analyticsService";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const RANGE_OPTIONS: { label: string; value: AdminDateRange }[] = [
  { label: "7일", value: "7d" },
  { label: "30일", value: "30d" },
  { label: "90일", value: "90d" },
];

export default function AdminAnalyticsPage() {
  const [range, setRange] = useState<AdminDateRange>("7d");
  const kpis = getKpiMetrics(range);
  const traffic = getTrafficSeries(range);
  const funnel = getFunnelMetrics(range);
  const cats = getCategoryPerformance(range);

  // funnel is {step, value, color}[]
  const pageViews = funnel[0]?.value ?? 0;
  const funnelRows = funnel.map(f => ({
    label: f.step,
    value: f.value,
    rate: pageViews > 0 ? `${((f.value / pageViews) * 100).toFixed(1)}%` : "-",
  }));

  const catCols = [
    { key: "category", label: "카테고리" },
    { key: "pageViews", label: "페이지뷰", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "completionRate", label: "완료율", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "shareRate", label: "공유율", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "adContrib", label: "광고기여", align: "right" as const, render: (v: unknown) => `${v}%` },
  ];

  const funnelCols = [
    { key: "label", label: "단계" },
    { key: "value", label: "수", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "rate", label: "전환율", align: "right" as const },
  ];

  return (
    <div>
      <AdminTopbar title="성과 분석" dateRange={range} onDateRangeChange={(r) => setRange(r as AdminDateRange)} />
      <div className="space-y-6 mt-6">
        <div className="flex gap-2 mb-2">
          {RANGE_OPTIONS.map(o => (
            <button key={o.value} onClick={() => setRange(o.value)}
              className={`text-xs px-3 py-1 rounded-full border transition ${range === o.value ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-600 border-gray-200"}`}
            >{o.label}</button>
          ))}
        </div>

        <AdminKpiGrid metrics={kpis} cols={4} />

        <AdminChartCard title="트래픽 추이" subtitle="페이지뷰 · 방문자" height={260}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={traffic} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
              <defs>
                <linearGradient id="pvG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="uvG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="date" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="pageViews" stroke="#6366f1" fill="url(#pvG)" name="페이지뷰" strokeWidth={2} />
              <Area type="monotone" dataKey="uniqueVisitors" stroke="#10b981" fill="url(#uvG)" name="방문자" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </AdminChartCard>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminSection title="전환 퍼널">
            <AdminDataTable columns={funnelCols} data={funnelRows as unknown as Record<string, unknown>[]} sortable={false} />
          </AdminSection>

          <AdminSection title="카테고리별 성과">
            <AdminDataTable columns={catCols} data={cats as unknown as Record<string, unknown>[]} />
          </AdminSection>
        </div>

        <AdminChartCard title="카테고리별 페이지뷰 vs 완료율" height={240}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cats} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="category" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="pageViews" fill="#6366f1" radius={[4, 4, 0, 0]} name="페이지뷰" />
              <Bar dataKey="completionRate" fill="#10b981" radius={[4, 4, 0, 0]} name="완료율%" />
            </BarChart>
          </ResponsiveContainer>
        </AdminChartCard>
      </div>
    </div>
  );
}
