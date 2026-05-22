"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import { getMockMissions } from "@/lib/admin/mockAdminData";

export default function AdminMissionsPage() {
  const missions = getMockMissions();

  const cols = [
    { key: "name", label: "미션", render: (v: unknown) => <span className="font-medium text-sm">{String(v)}</span> },
    { key: "type", label: "유형", render: (v: unknown) => (
      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{String(v)}</span>
    )},
    { key: "points", label: "보상", align: "right" as const, render: (v: unknown) => `${Number(v)}P` },
    { key: "totalCompletions", label: "완료수", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "completionRate", label: "완료율", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "enabled", label: "상태", render: (v: unknown) => (
      <AdminStatusBadge level={v ? "active" : "dormant"} label={v ? "활성" : "비활성"} />
    )},
  ];

  const activeCount = missions.filter(m => m.enabled).length;
  const totalCompletions = missions.reduce((s, m) => s + m.totalCompletions, 0);
  const avgRate = missions.length > 0 ? (missions.reduce((s, m) => s + m.completionRate, 0) / missions.length).toFixed(1) : 0;

  return (
    <div>
      <AdminTopbar title="미션 관리" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "활성 미션", value: `${activeCount}개` },
            { label: "총 완료 수", value: totalCompletions.toLocaleString() },
            { label: "평균 완료율", value: `${avgRate}%` },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title="미션 목록">
          <AdminDataTable columns={cols} data={missions as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
