"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import { getMockExperiments } from "@/lib/admin/mockAdminData";

export default function AdminExperimentsPage() {
  const experiments = getMockExperiments();

  const cols = [
    { key: "name", label: "실험명", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "variantA", label: "A안" },
    { key: "variantB", label: "B안" },
    { key: "completionRateA", label: "A 완료율", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "completionRateB", label: "B 완료율", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "winner", label: "승자", render: (v: unknown) => v ? (
      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-0.5 rounded-full">{String(v)}</span>
    ) : "-" },
    { key: "status", label: "상태", render: (v: unknown) => {
      const s = String(v);
      return <AdminStatusBadge level={s === "running" ? "active" : s === "ended" ? "success" : "dormant"} label={s === "running" ? "진행중" : s === "ended" ? "완료" : "대기"} />;
    }},
  ];

  const running = experiments.filter(e => e.status === "running").length;

  return (
    <div>
      <AdminTopbar title="A/B 테스트" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "진행 중", value: `${running}개` },
            { label: "완료된 실험", value: `${experiments.filter(e => e.status === "ended").length}개` },
            { label: "전체 실험", value: `${experiments.length}개` },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title="A/B 테스트 목록">
          <AdminDataTable columns={cols} data={experiments as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
