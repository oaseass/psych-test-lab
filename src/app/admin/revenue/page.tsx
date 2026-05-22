"use client";
import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminChartCard from "@/components/admin/AdminChartCard";
import AdminRevenueCalculator from "@/components/admin/AdminRevenueCalculator";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { getRevenueEstimate, getRevenueBreakdown, getSponsorPipeline } from "@/lib/admin/revenueService";
import { getMockAffiliateItems } from "@/lib/admin/mockAdminData";
import { getSponsorInquiries } from "@/lib/admin/sponsorAdminService";
import { getDashboardSummary } from "@/lib/admin/analyticsService";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6"];

export default function AdminRevenuePage() {
  const [dateRange, setDateRange] = useState("30d");
  const summary = getDashboardSummary();
  const revenue = getRevenueEstimate(summary.pageViews * 30, 1000);
  const breakdown = getRevenueBreakdown();
  const sponsorPipeline = getSponsorPipeline();
  const inquiries = getSponsorInquiries();
  const affiliates = getMockAffiliateItems();

  const pieData = [
    { name: "광고", value: revenue.estimatedAdRevenue },
    { name: "협찬", value: revenue.sponsorRevenue },
  ];

  const sponsorCols = [
    { key: "brand", label: "브랜드" },
    { key: "product", label: "희망 상품" },
    { key: "budget", label: "예산" },
    { key: "status", label: "상태" },
    { key: "submittedAt", label: "접수일", render: (v: unknown) => new Date(String(v)).toLocaleDateString() },
  ];

  const affiliateCols = [
    { key: "name", label: "제휴사" },
    { key: "clicks", label: "클릭", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "conversions", label: "전환", align: "right" as const },
    { key: "estimatedRevenue", label: "수익", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}원` },
    { key: "status", label: "상태" },
  ];

  void breakdown;

  return (
    <div>
      <AdminTopbar title="수익 분석" dateRange={dateRange} onDateRangeChange={setDateRange} />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "월 예상 광고수익", value: `${revenue.estimatedAdRevenue.toLocaleString()}원`, color: "text-indigo-600" },
            { label: "월 예상 협찬수익", value: `${revenue.sponsorRevenue.toLocaleString()}원`, color: "text-blue-600" },
            { label: "월 예상 합계", value: `${revenue.totalEstimatedRevenue.toLocaleString()}원`, color: "text-emerald-600" },
            { label: "협찬 파이프라인", value: `${sponsorPipeline.monthlyEstimate.toLocaleString()}원`, color: "text-gray-700" },
          ].map(item => (
            <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className={`font-black text-2xl ${item.color}`}>{item.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminSection title="수익 구성">
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`} labelLine={false}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: unknown) => `${Number(v).toLocaleString()}원`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </AdminSection>

          <AdminSection title="수익 시나리오 계산기" subtitle="RPM 기반 예상 수익 시뮬레이션">
            <AdminRevenueCalculator />
          </AdminSection>
        </div>

        <AdminSection title="협찬 문의 현황">
          <AdminDataTable columns={sponsorCols} data={inquiries as unknown as Record<string, unknown>[]} maxRows={5} />
        </AdminSection>

        <AdminSection title="제휴 성과">
          <AdminDataTable columns={affiliateCols} data={affiliates as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
