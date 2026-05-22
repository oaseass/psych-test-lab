"use client";
import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import { getSponsorInquiries, updateSponsorStatus } from "@/lib/admin/sponsorAdminService";
import Link from "next/link";

const STATUS_FILTERS = [
  { label: "전체", value: "all" },
  { label: "신규", value: "new" },
  { label: "검토중", value: "reviewing" },
  { label: "제안중", value: "proposed" },
  { label: "활성", value: "active" },
  { label: "완료", value: "completed" },
  { label: "거절", value: "rejected" },
];

export default function AdminSponsorsPage() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [items, setItems] = useState(() => getSponsorInquiries());

  const filtered = statusFilter === "all" ? items : items.filter(i => i.status === statusFilter);

  function handleStatus(id: string, status: string) {
    updateSponsorStatus(id, status as "new" | "reviewing" | "proposed" | "active" | "completed" | "rejected");
    setItems(getSponsorInquiries());
  }

  const cols = [
    { key: "brand", label: "브랜드", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "product", label: "희망 상품" },
    { key: "contact", label: "담당자" },
    { key: "phone", label: "연락처" },
    { key: "budget", label: "예산" },
    { key: "status", label: "상태", render: (v: unknown, row: Record<string, unknown>) => (
      <select
        value={String(v)}
        onChange={e => handleStatus(String(row.id), e.target.value)}
        className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-white outline-none"
      >
        <option value="new">신규</option>
        <option value="reviewing">검토중</option>
        <option value="proposed">제안중</option>
        <option value="active">활성</option>
        <option value="completed">완료</option>
        <option value="rejected">거절</option>
      </select>
    )},
    { key: "submittedAt", label: "접수일", render: (v: unknown) => new Date(String(v)).toLocaleDateString() },
  ];

  const pendingCount = items.filter(i => i.status === "new").length;

  return (
    <div>
      <AdminTopbar title="협찬 문의" />
      <div className="space-y-6 mt-6">
        {pendingCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2">
            <span className="text-amber-500">⚠️</span>
            <span className="text-sm text-amber-800 font-medium">처리 필요 문의 {pendingCount}건이 신규 상태입니다.</span>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "전체", value: items.length },
            { label: "신규", value: items.filter(i => i.status === "new").length },
            { label: "검토중", value: items.filter(i => i.status === "reviewing").length },
            { label: "제안중", value: items.filter(i => i.status === "proposed").length },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection
          title="협찬 문의 목록"
          headerRight={<Link href="/advertise" className="text-xs text-indigo-600 hover:underline" target="_blank">협찬 페이지 보기 →</Link>}
        >
          <div className="mb-4">
            <AdminFilterBar filters={STATUS_FILTERS} active={statusFilter} onChange={setStatusFilter} />
          </div>
          <AdminDataTable columns={cols} data={filtered as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
