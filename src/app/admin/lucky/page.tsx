"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminAlertCard from "@/components/admin/AdminAlertCard";
import { getMockLuckyGames } from "@/lib/admin/mockAdminData";

export default function AdminLuckyPage() {
  const games = getMockLuckyGames();
  const totalPlays = games.reduce((s, g) => s + g.plays, 0);
  const totalIssued = games.reduce((s, g) => s + g.pointsOut, 0);
  const totalSpent = games.reduce((s, g) => s + g.pointsIn, 0);
  const pnl = totalSpent - totalIssued;

  const cols = [
    { key: "name", label: "게임명", render: (v: unknown) => <span className="font-medium text-sm">{String(v)}</span> },
    { key: "plays", label: "플레이", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "pointsIn", label: "소비P", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}P` },
    { key: "pointsOut", label: "지급P", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}P` },
    { key: "winRate", label: "당첨률", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "enabled", label: "상태", render: (v: unknown) => v ? "✅ 활성" : "🚫 비활성" },
  ];

  return (
    <div>
      <AdminTopbar title="럭키존" />
      <div className="space-y-6 mt-6">
        <AdminAlertCard alert={{
          id: "lucky-notice",
          level: "info",
          title: "내부 포인트 전용 · 현금성 없음",
          message: "럭키존에서 사용/획득하는 포인트는 심심풀이 내부 포인트이며, 현금으로 환전되지 않습니다. 사행성 서비스가 아닙니다.",
        }} />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "총 플레이", value: totalPlays.toLocaleString() },
            { label: "총 소비P", value: `${totalSpent.toLocaleString()}P` },
            { label: "총 지급P", value: `${totalIssued.toLocaleString()}P` },
            { label: "P&L (소비-지급)", value: `${pnl >= 0 ? "+" : ""}${pnl.toLocaleString()}P`, color: pnl >= 0 ? "text-emerald-600" : "text-red-500" },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className={`font-black text-2xl ${s.color ?? "text-gray-900"}`}>{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title="게임별 현황">
          <AdminDataTable columns={cols} data={games as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
