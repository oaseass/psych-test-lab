"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import { getMockEvents } from "@/lib/admin/mockAdminData";

export default function AdminEventsPage() {
  const events = getMockEvents();

  const cols = [
    { key: "title", label: "이벤트명", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "type", label: "유형", render: (v: unknown) => (
      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{String(v)}</span>
    )},
    { key: "startDate", label: "시작일" },
    { key: "endDate", label: "종료일" },
    { key: "participants", label: "참여자", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "status", label: "상태", render: (v: unknown) => {
      const s = String(v);
      const level = s === "active" ? "active" : s === "upcoming" ? "info" : "dormant";
      const label = s === "active" ? "진행중" : s === "upcoming" ? "예정" : "종료";
      return <AdminStatusBadge level={level} label={label} />;
    }},
  ];

  const active = events.filter(e => e.status === "active").length;

  return (
    <div>
      <AdminTopbar title="이벤트 관리" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "진행 중 이벤트", value: `${active}개` },
            { label: "총 참여자", value: events.reduce((s, e) => s + e.participants, 0).toLocaleString() },
            { label: "전체 이벤트", value: `${events.length}개` },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title="이벤트 목록">
          <AdminDataTable columns={cols} data={events as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
