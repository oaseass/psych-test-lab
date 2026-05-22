"use client";
import { use } from "react";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminSection from "@/components/admin/AdminSection";
import AdminChartCard from "@/components/admin/AdminChartCard";
import { getContentDetail } from "@/lib/admin/contentAdminService";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

export default function AdminContentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const content = getContentDetail(id);

  if (!content) {
    return (
      <div>
        <AdminTopbar title="콘텐츠 상세" />
        <div className="mt-6 text-center text-gray-400 py-20">콘텐츠를 찾을 수 없습니다.</div>
      </div>
    );
  }

  const metricsData = [
    { name: "완료율", value: content.completionRate },
    { name: "공유율", value: content.shareRate },
    { name: "가입기여율", value: content.signupRate },
  ];

  return (
    <div>
      <AdminTopbar title="콘텐츠 상세" />
      <div className="space-y-6 mt-6">
        {/* 기본 정보 */}
        <AdminSection
          title={content.title}
          headerRight={<Link href="/admin/content" className="text-xs text-indigo-600 hover:underline">← 목록</Link>}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "카테고리", value: content.category },
              { label: "총 노출", value: content.impressions.toLocaleString() },
              { label: "완료율", value: `${content.completionRate}%` },
              { label: "공유율", value: `${content.shareRate}%` },
              { label: "가입기여율", value: `${content.signupRate}%` },
              { label: "추천", value: content.recommendation },
              { label: "피처드", value: content.isFeatured ? "✅ 예" : "아니오" },
              { label: "인기 콘텐츠", value: content.isHot ? "🔥 예" : "아니오" },
            ].map(item => (
              <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className="font-semibold text-gray-900 text-sm">{item.value}</div>
              </div>
            ))}
          </div>
        </AdminSection>

        <AdminChartCard title="성과 지표" height={200}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={metricsData} margin={{ top: 5, right: 10, bottom: 0, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </AdminChartCard>
      </div>
    </div>
  );
}
