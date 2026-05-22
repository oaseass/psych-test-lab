"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminChartCard from "@/components/admin/AdminChartCard";
import { getRetentionMetrics } from "@/lib/admin/analyticsService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TARGETS = { day1: 40, day7: 15, day30: 8 };

export default function AdminRetentionPage() {
  const retention = getRetentionMetrics();

  const retentionData = [
    { name: "D1", value: retention.day1, target: TARGETS.day1 },
    { name: "D3", value: retention.day3, target: 25 },
    { name: "D7", value: retention.day7, target: TARGETS.day7 },
    { name: "D30", value: retention.day30, target: TARGETS.day30 },
  ];

  const engagementData = [
    { name: "출석", value: retention.checkInRate },
    { name: "미션", value: retention.missionRate },
    { name: "상점", value: retention.shopRate },
    { name: "뱃지", value: retention.badgeRate },
  ];

  const recs = [
    retention.day1 < TARGETS.day1 ? "D1 리텐션 저조 — 첫 방문 경험(온보딩) 개선 필요" : null,
    retention.day7 < TARGETS.day7 ? "D7 리텐션 저조 — 7일 이내 재방문 동기(미션/출석) 강화 필요" : null,
    retention.day30 < TARGETS.day30 ? "D30 리텐션 저조 — 장기 유지 전략(계급/뱃지) 검토 필요" : null,
  ].filter(Boolean);

  return (
    <div>
      <AdminTopbar title="리텐션 분석" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "D1 리텐션", value: `${retention.day1}%`, target: TARGETS.day1, met: retention.day1 >= TARGETS.day1 },
            { label: "D3 리텐션", value: `${retention.day3}%`, target: 25, met: retention.day3 >= 25 },
            { label: "D7 리텐션", value: `${retention.day7}%`, target: TARGETS.day7, met: retention.day7 >= TARGETS.day7 },
            { label: "D30 리텐션", value: `${retention.day30}%`, target: TARGETS.day30, met: retention.day30 >= TARGETS.day30 },
          ].map(s => (
            <div key={s.label} className={`bg-white border rounded-2xl p-4 ${!s.met ? "border-amber-300" : "border-gray-200"}`}>
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className={`font-black text-2xl ${s.met ? "text-emerald-600" : "text-amber-600"}`}>{s.value}</div>
              <div className="text-[10px] text-gray-400">목표 {s.target}%</div>
            </div>
          ))}
        </div>

        <AdminChartCard title="리텐션 vs 목표" height={240}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={retentionData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: unknown) => `${v}%`} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} name="실제" />
              <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} name="목표" />
            </BarChart>
          </ResponsiveContainer>
        </AdminChartCard>

        <AdminChartCard title="참여 기능별 이용률" height={220}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 50]} />
              <Tooltip contentStyle={{ fontSize: 12 }} formatter={(v: unknown) => `${v}%`} />
              <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} name="이용률" />
            </BarChart>
          </ResponsiveContainer>
        </AdminChartCard>

        {recs.length > 0 && (
          <AdminSection title="개선 권고사항">
            <ul className="space-y-2">
              {recs.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                  <span className="text-amber-500 mt-0.5">⚠</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </AdminSection>
        )}
      </div>
    </div>
  );
}
