"use client";
import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminKpiGrid from "@/components/admin/AdminKpiGrid";
import AdminSection from "@/components/admin/AdminSection";
import AdminChartCard from "@/components/admin/AdminChartCard";
import AdminAlertCard from "@/components/admin/AdminAlertCard";
import AdminDataTable from "@/components/admin/AdminDataTable";
import type { AdminDateRange } from "@/lib/admin/types";
import { getKpiMetrics, getTrafficSeries, getFunnelMetrics, getDashboardSummary } from "@/lib/admin/analyticsService";
import { getRevenueEstimate } from "@/lib/admin/revenueService";
import { getActionItems } from "@/lib/admin/reportService";
import { getMockContentPerformance } from "@/lib/admin/mockAdminData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [dateRange, setDateRange] = useState<AdminDateRange>("7d");

  const kpis = getKpiMetrics(dateRange);
  const traffic = getTrafficSeries(dateRange);
  const funnel = getFunnelMetrics(dateRange);
  const summary = getDashboardSummary(dateRange);
  const revenue = getRevenueEstimate(summary.pageViews * 30, 1000);
  const alerts = getActionItems();
  const topContent = getMockContentPerformance().slice(0, 5);

  // funnel is {step, value, color}[]
  const funnelData = funnel.map(f => ({ name: f.step, value: f.value }));

  const contentCols = [
    { key: "title", label: "콘텐츠" },
    { key: "impressions", label: "노출", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "completionRate", label: "완료율", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "shareRate", label: "공유율", align: "right" as const, render: (v: unknown) => `${v}%` },
  ];

  return (
    <div>
      <AdminTopbar title="대시보드" dateRange={dateRange} onDateRangeChange={(r) => setDateRange(r as AdminDateRange)} />

      <div className="space-y-6 mt-6">
        <AdminKpiGrid metrics={kpis} cols={4} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "월 예상 광고수익", value: `${revenue.estimatedAdRevenue.toLocaleString()}원`, color: "text-emerald-600" },
            { label: "월 예상 협찬수익", value: `${revenue.sponsorRevenue.toLocaleString()}원`, color: "text-blue-600" },
            { label: "월 예상 합계", value: `${revenue.totalEstimatedRevenue.toLocaleString()}원`, color: "text-indigo-600" },
            { label: "기준 RPM", value: `${revenue.rpm.toLocaleString()}원`, color: "text-gray-700" },
          ].map(item => (
            <div key={item.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{item.label}</div>
              <div className={`font-black text-xl ${item.color}`}>{item.value}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminChartCard title="트래픽 추이" subtitle="방문자 / 페이지뷰" height={220}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={traffic} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
                <defs>
                  <linearGradient id="uvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="pvGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="pageViews" stroke="#6366f1" fill="url(#uvGrad)" name="페이지뷰" strokeWidth={2} />
                <Area type="monotone" dataKey="uniqueVisitors" stroke="#10b981" fill="url(#pvGrad)" name="방문자" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </AdminChartCard>

          <AdminChartCard title="콘텐츠 퍼널" subtitle="방문 → 완료 → 공유 → 가입" height={220}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, bottom: 5, left: 30 }}>
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={60} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </AdminChartCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <AdminSection
            title="액션 아이템"
            subtitle="즉시 확인이 필요한 항목"
            headerRight={<Link href="/admin/reports" className="text-xs text-indigo-600 hover:underline">전체보기</Link>}
            className="lg:col-span-1"
          >
            <div className="space-y-3">
              {alerts.slice(0, 4).map((a, i) => <AdminAlertCard key={i} alert={a} />)}
            </div>
          </AdminSection>

          <AdminSection
            title="TOP 5 콘텐츠"
            subtitle="이번 기간 성과 기준"
            headerRight={<Link href="/admin/content" className="text-xs text-indigo-600 hover:underline">전체보기</Link>}
            className="lg:col-span-2"
          >
            <AdminDataTable
              columns={contentCols}
              data={topContent as unknown as Record<string, unknown>[]}
              sortable={false}
            />
          </AdminSection>
        </div>

        <AdminSection title="빠른 메뉴">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { href: "/admin/analytics", icon: "📈", label: "성과분석" },
              { href: "/admin/revenue", icon: "💰", label: "수익분석" },
              { href: "/admin/content", icon: "📝", label: "콘텐츠 관리" },
              { href: "/admin/users", icon: "👥", label: "회원 관리" },
              { href: "/admin/points", icon: "🪙", label: "포인트 경제" },
              { href: "/admin/sponsors", icon: "🤝", label: "협찬 문의" },
              { href: "/admin/lucky", icon: "🍀", label: "럭키존" },
              { href: "/admin/reports", icon: "📋", label: "운영 리포트" },
            ].map(item => (
              <Link key={item.href} href={item.href} className="flex flex-col items-center gap-2 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-xl p-4 transition-colors text-center">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
              </Link>
            ))}
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
