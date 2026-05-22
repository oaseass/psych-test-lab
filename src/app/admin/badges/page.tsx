"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { getMockBadges } from "@/lib/admin/mockAdminData";

export default function AdminBadgesPage() {
  const badges = getMockBadges();

  const cols = [
    { key: "emoji", label: "", render: (v: unknown) => <span className="text-xl">{String(v)}</span> },
    { key: "name", label: "이름", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "condition", label: "획득 조건" },
    { key: "rarity", label: "희귀도", render: (v: unknown) => {
      const r = String(v);
      const color = r === "legendary" ? "text-yellow-600 font-bold" : r === "epic" ? "text-purple-600" : r === "rare" ? "text-blue-600" : "text-gray-500";
      return <span className={`text-xs ${color}`}>{r}</span>;
    }},
    { key: "holders", label: "보유자", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "isLimited", label: "한정", render: (v: unknown) => v ? "🔒 한정" : "—" },
  ];

  const legendary = badges.filter(b => b.rarity === "legendary").length;
  const rare = badges.filter(b => b.rarity === "rare").length;

  return (
    <div>
      <AdminTopbar title="뱃지/칭호 관리" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "전체 뱃지", value: `${badges.length}개` },
            { label: "레전더리", value: `${legendary}개` },
            { label: "레어", value: `${rare}개` },
            { label: "총 지급", value: badges.reduce((s, b) => s + b.holders, 0).toLocaleString() },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title="뱃지 목록">
          <AdminDataTable columns={cols} data={badges as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
