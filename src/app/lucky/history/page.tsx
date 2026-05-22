"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import LuckyGuard from "@/components/lucky/LuckyGuard";
import { getCurrentUser } from "@/lib/user/authService";
import { getLuckyResults, getLuckyDailyStats, LUCKY_DAILY_MAX_SPEND, LUCKY_DAILY_MAX_PROFIT } from "@/lib/lucky/luckyPointService";
import { LUCKY_GAMES } from "@/data/luckyGames";
import type { UserProfile } from "@/lib/user/types";
import type { LuckyResult } from "@/lib/lucky/types";

function getGameLabel(gameType: string) {
  const g = LUCKY_GAMES.find(x => x.gameType === gameType);
  return g ? `${g.icon} ${g.title}` : gameType;
}

function HistoryContent({ user }: { user: UserProfile }) {
  const results = getLuckyResults(user.id);
  const today = getLuckyDailyStats(user.id);

  const totalPlays = results.length;
  const wins = results.filter(r => r.isWin).length;
  const winRate = totalPlays > 0 ? Math.round((wins / totalPlays) * 100) : 0;
  const bestWin = results.reduce((max, r) => r.netPoints > max ? r.netPoints : max, 0);
  const gameCount = results.reduce<Record<string, number>>((acc, r) => {
    acc[r.gameType] = (acc[r.gameType] || 0) + 1;
    return acc;
  }, {});
  const favoriteGame = Object.entries(gameCount).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;

  // 날짜별 그룹
  const grouped = results.reduce<Record<string, LuckyResult[]>>((acc, r) => {
    const d = r.createdAt.slice(0, 10);
    (acc[d] = acc[d] || []).push(r);
    return acc;
  }, {});
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">📋</div>
        <h1 className="text-xl font-black text-gray-900">럭키존 히스토리</h1>
        <p className="text-sm text-gray-400 mt-1">내 도전 기록 전체 보기</p>
      </div>

      {/* 오늘 요약 */}
      <div className="bg-violet-50 rounded-2xl p-4 border border-violet-100">
        <h2 className="text-sm font-bold text-violet-700 mb-3">오늘의 기록</h2>
        <div className="grid grid-cols-3 gap-3 text-center text-xs">
          <div className="bg-white rounded-xl p-2">
            <div className="text-gray-500 mb-1">도전 횟수</div>
            <div className="text-lg font-black text-gray-800">{today.playCount}회</div>
          </div>
          <div className="bg-white rounded-xl p-2">
            <div className="text-gray-500 mb-1">사용 포인트</div>
            <div className={`text-lg font-black ${today.totalSpend > 0 ? "text-red-500" : "text-gray-400"}`}>
              -{today.totalSpend}P
            </div>
            <div className="text-[9px] text-gray-400">{today.totalSpend}/{LUCKY_DAILY_MAX_SPEND}</div>
          </div>
          <div className="bg-white rounded-xl p-2">
            <div className="text-gray-500 mb-1">획득 포인트</div>
            <div className={`text-lg font-black ${today.totalProfit > 0 ? "text-green-600" : "text-gray-400"}`}>
              +{today.totalProfit}P
            </div>
            <div className="text-[9px] text-gray-400">{today.totalProfit}/{LUCKY_DAILY_MAX_PROFIT}</div>
          </div>
        </div>
      </div>

      {/* 전체 통계 */}
      <div className="bg-gray-50 rounded-2xl p-4">
        <h2 className="text-sm font-bold text-gray-700 mb-3">전체 통계</h2>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex justify-between bg-white rounded-xl px-3 py-2">
            <span className="text-gray-500">총 도전</span>
            <span className="font-bold text-gray-800">{totalPlays}회</span>
          </div>
          <div className="flex justify-between bg-white rounded-xl px-3 py-2">
            <span className="text-gray-500">성공률</span>
            <span className="font-bold text-violet-600">{winRate}%</span>
          </div>
          <div className="flex justify-between bg-white rounded-xl px-3 py-2">
            <span className="text-gray-500">최고 획득</span>
            <span className={`font-bold ${bestWin > 0 ? "text-green-600" : "text-gray-400"}`}>+{bestWin}P</span>
          </div>
          <div className="flex justify-between bg-white rounded-xl px-3 py-2">
            <span className="text-gray-500">즐겨찾는 게임</span>
            <span className="font-bold text-gray-800 truncate ml-1">{favoriteGame ? getGameLabel(favoriteGame) : "-"}</span>
          </div>
        </div>
      </div>

      {/* 기록 없을 때 */}
      {results.length === 0 && (
        <div className="text-center py-10">
          <div className="text-4xl mb-3">🎮</div>
          <div className="text-gray-500 text-sm">아직 도전 기록이 없습니다</div>
          <Link href="/lucky" className="mt-4 inline-block px-6 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-colors">
            게임 하러 가기
          </Link>
        </div>
      )}

      {/* 날짜별 기록 */}
      {sortedDates.map(date => (
        <div key={date}>
          <div className="text-xs font-bold text-gray-400 mb-2 px-1">{date}</div>
          <div className="space-y-2">
            {grouped[date].map(r => {
              const netPositive = r.netPoints >= 0;
              return (
                <div key={r.id} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-3 shadow-sm">
                  <div className="text-2xl">{LUCKY_GAMES.find(g => g.gameType === r.gameType)?.icon ?? "🎲"}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-gray-800 truncate">{getGameLabel(r.gameType)}</div>
                    <div className="text-[10px] text-gray-400 mt-0.5 truncate">{r.detail}</div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className={`text-sm font-black ${netPositive ? "text-green-600" : "text-red-500"}`}>
                      {netPositive ? "+" : ""}{r.netPoints}P
                    </div>
                    <div className="text-[10px] text-gray-400">배팅 {r.stakePoints}P</div>
                    <div className={`text-[9px] mt-0.5 font-bold ${r.isWin ? "text-green-500" : "text-gray-400"}`}>
                      {r.isWin ? "✅ 성공" : "❌ 실패"}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Link href="/lucky" className="block w-full py-3 text-center rounded-xl border-2 border-violet-200 text-violet-600 font-bold text-sm hover:bg-violet-50 transition-colors">
        ← 럭키존으로 돌아가기
      </Link>
    </div>
  );
}

export default function LuckyHistoryPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    const u = getCurrentUser();
    if (u?.role === "member") setUser(u);
  }, []);
  return (
    <LuckyGuard>
      <LayoutContainer>
        {user ? <HistoryContent user={user} /> : <div className="py-8 text-center text-gray-400 animate-pulse">로딩 중...</div>}
      </LayoutContainer>
    </LuckyGuard>
  );
}
