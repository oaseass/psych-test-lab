"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import { getMockAffiliateItems } from "@/lib/admin/mockAdminData";

export default function AdminAffiliatePage() {
  const items = getMockAffiliateItems();
  const totalRevenue = items.reduce((s, i) => s + i.estimatedRevenue, 0);
  const totalClicks = items.reduce((s, i) => s + i.clicks, 0);
  const totalConversions = items.reduce((s, i) => s + i.conversions, 0);

  const cols = [
    { key: "name", label: "제휴사", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "category", label: "카테고리" },
    { key: "contentTitle", label: "연결 콘텐츠" },
    { key: "clicks", label: "클릭", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "conversions", label: "전환", align: "right" as const },
    { key: "estimatedRevenue", label: "수익", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}원` },
    { key: "status", label: "상태", render: (v: unknown) => (
      <AdminStatusBadge
        level={String(v) === "active" ? "active" : String(v) === "paused" ? "warning" : "dormant"}
        label={String(v) === "active" ? "활성" : String(v) === "paused" ? "중단" : "초안"}
      />
    )},
  ];

  return (
    <div>
      <AdminTopbar title="제휴 관리" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "총 클릭", value: totalClicks.toLocaleString() },
            { label: "총 전환", value: totalConversions.toLocaleString() },
            { label: "총 수익", value: `${totalRevenue.toLocaleString()}원` },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title="제휴 성과">
          <AdminDataTable columns={cols} data={items as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
