"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminChartCard from "@/components/admin/AdminChartCard";
import AdminAlertCard from "@/components/admin/AdminAlertCard";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { getPointEconomySummary, getPointSourceBreakdown, getPointSinkBreakdown, getPointInflationRisk } from "@/lib/admin/pointAdminService";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS_SRC = ["#6366f1", "#10b981", "#f59e0b", "#3b82f6", "#ec4899", "#8b5cf6"];

export default function AdminPointsPage() {
  const summary = getPointEconomySummary();
  const sources = getPointSourceBreakdown();
  const sinks = getPointSinkBreakdown();
  const risk = getPointInflationRisk();

  const srcCols = [
    { key: "source", label: "발생 경로" },
    { key: "amount", label: "총 포인트", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}P` },
    { key: "share", label: "비중", align: "right" as const, render: (v: unknown) => `${v}%` },
  ];

  const sinkCols = [
    { key: "reason", label: "소비 경로" },
    { key: "amount", label: "총 포인트", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}P` },
    { key: "share", label: "비중", align: "right" as const, render: (v: unknown) => `${v}%` },
  ];

  const srcPie = sources.map(s => ({ name: s.source, value: s.amount }));
  const sinkPie = sinks.map(s => ({ name: s.reason, value: s.amount }));

  return (
    <div>
      <AdminTopbar title="포인트 경제" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "총 발행 포인트", value: summary.totalEarned.toLocaleString(), color: "text-indigo-600" },
            { label: "총 소비 포인트", value: summary.totalSpent.toLocaleString(), color: "text-red-500" },
            { label: "순 변화", value: summary.netChange.toLocaleString(), color: "text-emerald-600" },
            { label: "소각률", value: `${((summary.totalSpent / summary.totalEarned) * 100).toFixed(1)}%`, color: "text-gray-700" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className={`font-black text-2xl ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {risk.level !== "safe" && (
          <AdminAlertCard alert={{
            id: "inflation",
            level: risk.level === "danger" ? "danger" : "warning",
            title: "포인트 인플레이션 경고",
            message: risk.message,
            actionLabel: "포인트 소각 이벤트 기획",
            actionHref: "/admin/points",
          }} />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AdminSection title="포인트 발생 경로">
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={srcPie} cx="50%" cy="50%" outerRadius={60} dataKey="value" label={({ name }) => name} labelLine={false}>
                    {srcPie.map((_, i) => <Cell key={i} fill={COLORS_SRC[i % COLORS_SRC.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: unknown) => `${Number(v).toLocaleString()}P`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <AdminDataTable columns={srcCols} data={sources as unknown as Record<string, unknown>[]} sortable={false} />
          </AdminSection>

          <AdminSection title="포인트 소비 경로">
            <div className="h-40 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sinkPie} cx="50%" cy="50%" outerRadius={60} dataKey="value" label={({ name }) => name} labelLine={false}>
                    {sinkPie.map((_, i) => <Cell key={i} fill={COLORS_SRC[i % COLORS_SRC.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: unknown) => `${Number(v).toLocaleString()}P`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <AdminDataTable columns={sinkCols} data={sinks as unknown as Record<string, unknown>[]} sortable={false} />
          </AdminSection>
        </div>
      </div>
    </div>
  );
}
