"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { getMockRanks } from "@/lib/admin/mockAdminData";

export default function AdminRanksPage() {
  const ranks = getMockRanks();

  const cols = [
    { key: "icon", label: "", render: (v: unknown) => <span className="text-xl">{String(v)}</span> },
    { key: "name", label: "계급명", render: (v: unknown) => <span className="font-semibold">{String(v)}</span> },
    { key: "minPoints", label: "최소 포인트", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}P` },
    { key: "maxPoints", label: "최대 포인트", align: "right" as const, render: (v: unknown) => Number(v) >= 999999 ? "∞" : `${Number(v).toLocaleString()}P` },
    { key: "memberCount", label: "보유 회원", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}명` },
    { key: "avgActivity", label: "평균 활동", align: "right" as const },
    { key: "tier", label: "티어" },
  ];

  return (
    <div>
      <AdminTopbar title="계급 관리" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          {ranks.map(r => (
            <div key={r.id} className="bg-white border border-gray-200 rounded-2xl p-3 text-center">
              <div className="text-2xl mb-1">{r.icon}</div>
              <div className="font-bold text-gray-900 text-xs">{r.name}</div>
              <div className="text-indigo-600 font-black text-sm">{r.memberCount}</div>
              <div className="text-[10px] text-gray-400">명</div>
            </div>
          ))}
        </div>

        <AdminSection title="계급 상세">
          <AdminDataTable columns={cols} data={ranks as unknown as Record<string, unknown>[]} sortable={false} />
        </AdminSection>
      </div>
    </div>
  );
}
