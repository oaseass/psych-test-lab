"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getAdminRankingStats } from "@/lib/ranking/rankingService";

type Stats = ReturnType<typeof getAdminRankingStats>;

const TYPE_LABELS: Record<string, string> = {
  time: "⏱️ 시간 랭킹",
  score: "🏆 점수 랭킹",
  worldcup_winner: "🥇 월드컵 우승",
  choice_distribution: "⚖️ 밸런스게임",
  result_distribution: "📊 심리테스트",
  lucky_points: "🎰 럭키포인트",
  lucky_streak: "🔥 럭키연승",
  together_host: "🎮 같이놀기",
};

export default function AdminRankingsPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    setStats(getAdminRankingStats());
  }, []);

  if (!stats) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400 text-sm">불러오는 중...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-16">
      {/* 헤더 */}
      <div className="bg-white border-b px-6 py-4 flex items-center gap-3">
        <Link href="/admin" className="text-gray-400 hover:text-gray-600 text-sm">
          ← 관리자 홈
        </Link>
        <h1 className="text-lg font-extrabold text-gray-800">🏆 랭킹 관리</h1>
      </div>

      <div className="max-w-3xl mx-auto px-4 mt-6 flex flex-col gap-6">
        {/* 요약 카드 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border p-4 text-center">
            <div className="text-2xl font-extrabold text-violet-600">{stats.totalRecords.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">전체 기록 수</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border p-4 text-center">
            <div className="text-2xl font-extrabold text-green-600">{stats.todayRecords.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">오늘 기록</div>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border p-4 text-center">
            <div className="text-2xl font-extrabold text-blue-600">{stats.weeklyRecords.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">이번 주 기록</div>
          </div>
        </div>

        {/* 타입별 분포 */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-4">랭킹 타입별 기록 수</h2>
          <div className="flex flex-col gap-2">
            {stats.typeBreakdown
              .sort((a, b) => b.count - a.count)
              .map(({ type, count }) => {
                const pct = stats.totalRecords > 0 ? Math.round((count / stats.totalRecords) * 100) : 0;
                return (
                  <div key={type} className="flex items-center gap-3">
                    <div className="w-32 text-xs text-gray-600 shrink-0">
                      {TYPE_LABELS[type] ?? type}
                    </div>
                    <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-2 bg-violet-400 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 w-16 text-right shrink-0">
                      {count.toLocaleString()}건 ({pct}%)
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 콘텐츠별 참여 상위 10 */}
        <div className="bg-white rounded-2xl shadow-sm border p-5">
          <h2 className="text-sm font-bold text-gray-700 mb-4">콘텐츠별 참여 랭킹 (상위 10)</h2>
          <div className="flex flex-col gap-2">
            {stats.topContents.map(({ contentId, count }, idx) => (
              <div key={contentId} className="flex items-center gap-3">
                <div className="w-6 text-center text-xs font-bold text-gray-400">
                  {idx + 1}
                </div>
                <div className="flex-1 text-sm text-gray-700 font-medium truncate">
                  {contentId}
                </div>
                <div className="text-xs text-gray-500 shrink-0">
                  {count.toLocaleString()}건
                </div>
              </div>
            ))}
            {stats.topContents.length === 0 && (
              <div className="text-sm text-gray-400">아직 기록이 없어요</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
