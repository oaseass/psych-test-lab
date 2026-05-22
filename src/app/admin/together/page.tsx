"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";

export default function AdminTogetherPage() {
  const stats = [
    { label: "오늘 생성 방", value: "12개" },
    { label: "현재 활성 방", value: "3개" },
    { label: "총 참여자", value: "87명" },
    { label: "평균 방 참여", value: "4.2명" },
  ];

  const recommendations = [
    "방 생성 후 10분 이내 미참여 시 자동 닫힘 — 정상",
    "최대 동시 참여 방 수 8개 — 서버 부하 안정",
    "AI 봇 응답률 95% — 정상",
  ];

  return (
    <div>
      <AdminTopbar title="같이놀기" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title="AI 봇 분석">
          <ul className="space-y-2">
            {recommendations.map((r, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </AdminSection>

        <AdminSection title="운영 메모">
          <p className="text-sm text-gray-500">같이놀기는 실시간 서비스로, 상세 로그는 서버 로그를 참조하세요. 현재는 데모 데이터를 표시합니다.</p>
        </AdminSection>
      </div>
    </div>
  );
}
