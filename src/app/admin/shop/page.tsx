"use client";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminDataTable from "@/components/admin/AdminDataTable";
import { getMockShopItems } from "@/lib/admin/mockAdminData";

export default function AdminShopPage() {
  const items = getMockShopItems();

  const cols = [
    { key: "name", label: "상품명", render: (v: unknown) => <span className="font-medium">{String(v)}</span> },
    { key: "category", label: "카테고리" },
    { key: "price", label: "가격", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}P` },
    { key: "purchases", label: "구매수", align: "right" as const, render: (v: unknown) => Number(v).toLocaleString() },
    { key: "totalPointsSpent", label: "소각P", align: "right" as const, render: (v: unknown) => `${Number(v).toLocaleString()}P` },
    { key: "isActive", label: "판매중", align: "center" as const, render: (v: unknown) => v ? "✅" : "🚫" },
  ];

  const totalSold = items.reduce((s, i) => s + i.purchases, 0);
  const totalBurned = items.reduce((s, i) => s + i.totalPointsSpent, 0);

  return (
    <div>
      <AdminTopbar title="포인트 상점" />
      <div className="space-y-6 mt-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "상품 수", value: `${items.length}개` },
            { label: "총 구매수", value: totalSold.toLocaleString() },
            { label: "총 소각P", value: `${totalBurned.toLocaleString()}P` },
          ].map(s => (
            <div key={s.label} className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="text-xs text-gray-500 mb-1">{s.label}</div>
              <div className="font-black text-gray-900 text-2xl">{s.value}</div>
            </div>
          ))}
        </div>

        <AdminSection title="상품 목록">
          <AdminDataTable columns={cols} data={items as unknown as Record<string, unknown>[]} />
        </AdminSection>
      </div>
    </div>
  );
}
