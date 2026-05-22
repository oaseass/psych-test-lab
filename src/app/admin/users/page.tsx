"use client";
import { useState, useEffect } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminFilterBar from "@/components/admin/AdminFilterBar";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import { getAllUsers, getUserStats, filterUsers } from "@/lib/admin/userAdminService";
import { isSupabaseConfigured, getAllUsersSupabase } from "@/lib/supabase/authSupabase";
import type { AdminUser } from "@/lib/admin/types";

const RANK_FILTERS = [
  { label: "전체", value: "all" },
  { label: "신규", value: "new" },
  { label: "휴면", value: "dormant" },
  { label: "포인트 상위", value: "gold" },
];

export default function AdminUsersPage() {
  const [filter, setFilter] = useState("all");
  const [allUsers, setAllUsers] = useState<AdminUser[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      if (isSupabaseConfigured) {
        // Supabase에서 실제 회원 데이터 조회
        const raw = await getAllUsersSupabase();
        const now = Date.now();
        const weekMs = 7 * 86400000;
        const mapped: AdminUser[] = raw.map((u) => {
          const lastActive = u.last_login_at ?? u.created_at;
          const isNew = now - new Date(u.created_at).getTime() < 86400000;
          const isDormant = now - new Date(lastActive).getTime() > weekMs;
          return {
            id: u.id,
            nickname: u.nickname,
            rankId: u.rank_id,
            rankName: u.rank_name,
            points: u.points,
            joinedAt: u.created_at.slice(0, 10),
            lastActiveAt: lastActive ?? u.created_at,
            checkInDays: u.total_check_in_days,
            completedCount: u.played_count,
            togetherCount: u.together_played_count,
            luckyCount: 0,
            inviteCount: 0,
            status: (isNew ? "new" : isDormant ? "dormant" : "active") as AdminUser["status"],
          };
        });
        setAllUsers(mapped);
      } else {
        // localStorage에서 읽기
        setAllUsers(getAllUsers());
      }
      setIsLoaded(true);
    }
    loadUsers();
  }, []);

  const stats = isLoaded
    ? {
        total: allUsers.length,
        newToday: allUsers.filter((u) => Date.now() - new Date(u.joinedAt).getTime() < 86400000).length,
        active7d: allUsers.filter((u) => Date.now() - new Date(u.lastActiveAt).getTime() < 7 * 86400000).length,
        avgPoints: allUsers.length > 0 ? Math.round(allUsers.reduce((s, u) => s + u.points, 0) / allUsers.length) : 0,
      }
    : getUserStats();

  const filtered = filterUsers(allUsers, filter === "active" ? "new" : filter === "gold" ? "high_points" : filter);

  const cols = [
    { key: "nickname", label: "닉네임" },
    { key: "rankName", label: "계급", render: (v: unknown) => <span className="text-xs font-semibold">{String(v)}</span> },
    { key: "points", label: "포인트", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "completedCount", label: "완료수", align: "right" as const },
    { key: "checkInDays", label: "출석", align: "right" as const, render: (v: unknown) => `${v}일` },
    { key: "status", label: "상태", render: (v: unknown) => (
      <AdminStatusBadge level={String(v) === "active" ? "active" : String(v) === "new" ? "info" : "dormant"} label={String(v) === "active" ? "활성" : String(v) === "new" ? "신규" : "휴면"} />
    )},
    { key: "joinedAt", label: "가입일" },
  ];

  return (
    <div>
      <AdminTopbar title="회원 관리" />
      <div className="space-y-6 mt-6">

        {isSupabaseConfigured && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-2 text-xs text-emerald-700 font-semibold">
            ✅ Supabase 연동됨 — 실제 가입 회원 데이터를 표시합니다.
          </div>
        )}
        {!isSupabaseConfigured && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 text-xs text-amber-700 font-semibold">
            ⚠️ Supabase 미연동 — 현재 브라우저의 localStorage 회원만 보입니다.
            Vercel에 NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY를 추가하세요.
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "전체 회원", value: stats.total.toLocaleString() },
            { label: "7일 활성", value: stats.active7d.toLocaleString() },
            { label: "오늘 신규", value: stats.newToday.toLocaleString() },
            { label: "평균 포인트", value: `${stats.avgPoints.toLocaleString()}P` },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title={`회원 목록 (${filtered.length}명)`}>
          <div className="mb-4">
            <AdminFilterBar filters={RANK_FILTERS} active={filter} onChange={setFilter} />
          </div>
          {!isLoaded ? (
            <div className="text-center py-8 text-gray-400 text-sm">불러오는 중...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-3xl mb-2">👤</div>
              <p className="text-gray-500 text-sm font-semibold">아직 가입한 회원이 없습니다.</p>
              {!isSupabaseConfigured && (
                <p className="text-xs text-gray-400 mt-1">Supabase 연동 후 전체 회원을 관리할 수 있습니다.</p>
              )}
            </div>
          ) : (
            <AdminDataTable columns={cols} data={filtered as unknown as Record<string, unknown>[]} maxRows={50} />
          )}
        </AdminSection>
      </div>
    </div>
  );
}
