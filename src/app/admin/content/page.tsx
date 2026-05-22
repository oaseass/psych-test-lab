"use client";
import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import { getAdminContentList } from "@/lib/admin/contentAdminService";
import type { ContentPerformance } from "@/lib/admin/types";
import Link from "next/link";

const CATEGORY_FILTERS = [
  { label: "전체", value: "all" },
  { label: "심리테스트", value: "psychology" },
  { label: "MBTI", value: "mbti" },
  { label: "퀴즈", value: "quiz" },
  { label: "운세", value: "fortune" },
  { label: "월드컵", value: "worldcup" },
];

export default function AdminContentPage() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const items = getAdminContentList();
  const filtered = items.filter(item => {
    if (category !== "all" && item.category !== category) return false;
    if (search && !item.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const cols = [
    { key: "title", label: "콘텐츠", render: (v: unknown, row: Record<string, unknown>) => (
      <Link href={`/admin/content/${row.id}`} className="text-indigo-600 hover:underline font-medium text-sm">{String(v)}</Link>
    )},
    { key: "category", label: "카테고리", render: (v: unknown) => (
      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{String(v)}</span>
    )},
    { key: "views", label: "조회", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "completionRate", label: "완료율", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "shareRate", label: "공유율", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "qualityScore", label: "품질", align: "right" as const, render: (v: unknown) => (
      <span className={`font-semibold ${Number(v) >= 80 ? "text-emerald-600" : Number(v) >= 60 ? "text-amber-600" : "text-red-500"}`}>{String(v)}</span>
    )},
    { key: "featured", label: "피처드", align: "center" as const, render: (v: unknown) => v ? "⭐" : "" },
  ];

  return (
    <div>
      <AdminTopbar title="콘텐츠 관리" />
      <div className="space-y-6 mt-6">
        <AdminSection
          title={`콘텐츠 목록 (${filtered.length}개)`}
          headerRight={
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="제목 검색..."
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs outline-none focus:border-indigo-300 w-40"
            />
          }
        >
          <div className="mb-4">
            <AdminFilterBar filters={CATEGORY_FILTERS} active={category} onChange={setCategory} />
          </div>
          <AdminDataTable columns={cols} data={filtered as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
