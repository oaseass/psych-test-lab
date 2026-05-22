"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminAlertCard from "@/components/admin/AdminAlertCard";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { getDailyReport, getActionItems, getKpiAlerts, getQualityAudit } from "@/lib/admin/reportService";
import Link from "next/link";

export default function AdminReportsPage() {
  const daily = getDailyReport();
  const actions = getActionItems();
  const kpiAlerts = getKpiAlerts();
  const qualityAudit = getQualityAudit();

  const STATUS_COLORS = {
    ok: "text-emerald-600 bg-emerald-50 border-emerald-200",
    warning: "text-amber-600 bg-amber-50 border-amber-200",
    danger: "text-red-600 bg-red-50 border-red-200",
  };

  const STATUS_LABELS = {
    ok: "✅ 정상",
    warning: "⚠️ 수정 필요",
    danger: "🚨 즉시 수정",
  };

  const contentCols = [
    { key: "title", label: "콘텐츠" },
    { key: "impressions", label: "노출", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "completionRate", label: "완료율", align: "right" as const, render: (v: unknown) => `${v}%` },
    { key: "shareRate", label: "공유율", align: "right" as const, render: (v: unknown) => `${v}%` },
  ];

  const kpiCols = [
    { key: "label", label: "KPI" },
    { key: "current", label: "현재", align: "right" as const, render: (v: unknown) => `${v}` },
    { key: "target", label: "목표", align: "right" as const, render: (v: unknown) => `${v}` },
    { key: "achieved", label: "달성", align: "center" as const, render: (v: unknown) => v ? "✅" : "❌" },
  ];

  return (
    <div>
      <AdminTopbar title="운영 리포트" />
      <div className="space-y-6 mt-6">
        <AdminSection title="KPI 달성 현황">
          <AdminDataTable columns={kpiCols} data={kpiAlerts as unknown as Record<string, unknown>[]} sortable={false} />
        </AdminSection>

        <AdminSection title="액션 아이템" subtitle="즉시 대응이 필요한 항목">
          <div className="space-y-3">
            {actions.length > 0
              ? actions.map((a, i) => <AdminAlertCard key={i} alert={a} />)
              : <p className="text-sm text-gray-400 text-center py-4">모든 지표 정상 ✅</p>
            }
          </div>
        </AdminSection>

        <AdminSection title="TOP 10 콘텐츠 (노출 기준)">
          <AdminDataTable columns={contentCols} data={daily.top10 as unknown as Record<string, unknown>[]} sortable={false} />
        </AdminSection>

        <AdminSection title="완료율 낮은 콘텐츠 (개선 필요)">
          <AdminDataTable columns={contentCols} data={daily.problems as unknown as Record<string, unknown>[]} sortable={false} emptyLabel="완료율 낮은 콘텐츠 없음" />
        </AdminSection>

        <AdminSection title="공유율 TOP 10">
          <AdminDataTable columns={contentCols} data={daily.topShare as unknown as Record<string, unknown>[]} sortable={false} />
        </AdminSection>

        {/* 품질 감사 */}
        <AdminSection title="품질 감사 리포트" subtitle="사이트 품질 기준 충족 여부">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {qualityAudit.map((item) => (
              <div
                key={item.id}
                className={`rounded-xl border p-4 ${STATUS_COLORS[item.status]}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-sm font-bold leading-snug">{item.label}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full border whitespace-nowrap ${STATUS_COLORS[item.status]}`}>
                    {STATUS_LABELS[item.status]}
                  </span>
                </div>
                {item.count > 0 && (
                  <div className="text-lg font-black mb-1">{item.count}건</div>
                )}
                <p className="text-xs opacity-80 leading-relaxed">{item.hint}</p>
                {item.actionHref && item.status !== "ok" && (
                  <Link
                    href={item.actionHref}
                    className="inline-block mt-2 text-xs font-semibold underline opacity-70 hover:opacity-100"
                  >
                    수정하러 가기 →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </AdminSection>
      </div>
    </div>
  );
}
