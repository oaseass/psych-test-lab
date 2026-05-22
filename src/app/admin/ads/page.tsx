"use client";
import { useState } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import AdminStatusBadge from "@/components/admin/AdminStatusBadge";
import { getAdSlots, getAdEstimate } from "@/lib/admin/adAdminService";

export default function AdminAdsPage() {
  const [rpm, setRpm] = useState(1000);
  const slots = getAdSlots();
  const estimate = getAdEstimate(rpm);

  const cols = [
    { key: "name", label: "슬롯명", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "location", label: "위치" },
    { key: "device", label: "디바이스" },
    { key: "rpm", label: "RPM", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}원` },
    { key: "estimatedRevenue", label: "예상수익", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}원` },
    { key: "enabled", label: "상태", render: (v: unknown) => (
      <AdminStatusBadge level={v ? "active" : "dormant"} label={v ? "활성" : "비활성"} />
    )},
  ];

  return (
    <div>
      <AdminTopbar title="광고 관리" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "활성 슬롯", value: `${slots.filter(s => s.enabled).length}개` },
            { label: "월 예상 수익", value: `${estimate.totalRevenue.toLocaleString()}원` },
            { label: "현재 RPM", value: `${rpm.toLocaleString()}원` },
            { label: "총 슬롯 수", value: `${slots.length}개` },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title="RPM 설정" subtitle="RPM(천회 노출당 수익) 조정">
          <div className="flex items-center gap-4">
            <input
              type="range" min={100} max={5000} step={100} value={rpm}
              onChange={e => setRpm(Number(e.target.value))}
              className="flex-1"
            />
            <div className="flex items-center gap-2">
              <input
                type="number" value={rpm}
                onChange={e => setRpm(Number(e.target.value))}
                className="w-24 border border-gray-200 rounded-lg px-2 py-1 text-sm text-center"
              />
              <span className="text-sm text-gray-500">원/천뷰</span>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            RPM {rpm.toLocaleString()}원 기준 → 월 예상 <span className="font-bold text-indigo-600">{estimate.totalRevenue.toLocaleString()}원</span>
          </div>
        </AdminSection>

        <AdminSection title="광고 슬롯 현황">
          <AdminDataTable columns={cols} data={slots as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
