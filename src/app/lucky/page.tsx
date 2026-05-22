"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import LuckyGuard from "@/components/lucky/LuckyGuard";
import LuckyGameCard from "@/components/lucky/LuckyGameCard";
import LuckyLimitCard from "@/components/lucky/LuckyLimitCard";
import LuckyHistoryList from "@/components/lucky/LuckyHistoryList";
import LuckyNotice from "@/components/lucky/LuckyNotice";
import { getCurrentUser } from "@/lib/user/authService";
import { getLuckyDailyStats, getLuckyResults } from "@/lib/lucky/luckyPointService";
import { LUCKY_GAMES, isGameUnlocked } from "@/data/luckyGames";
import type { UserProfile } from "@/lib/user/types";
import type { LuckyResult, LuckyDailyStats } from "@/lib/lucky/types";

const RANK_UNLOCK_INFO = [
  { rankName: "이등병", rankId: "private2", games: ["가위바위보", "홀짝", "OX 운빨퀴즈"], color: "#6B7280" },
  { rankName: "일병", rankId: "private1", games: ["사다리 타기"], color: "#2563EB" },
  { rankName: "상병", rankId: "corporal", games: ["행운 룰렛"], color: "#7C3AED" },
  { rankName: "병장", rankId: "sergeant", games: ["보물상자"], color: "#B45309" },
  { rankName: "하사", rankId: "staff_sgt", games: ["폭탄 피하기"], color: "#DC2626" },
];

function LuckyContent({ user }: { user: UserProfile }) {
  const [daily, setDaily] = useState<LuckyDailyStats>({ date: "", totalSpend: 0, totalProfit: 0, playCount: 0 });
  const [recentResults, setRecentResults] = useState<LuckyResult[]>([]);

  useEffect(() => {
    setDaily(getLuckyDailyStats(user.id));
    setRecentResults(getLuckyResults(user.id).slice(0, 5));
  }, [user.id]);

  return (
    <LayoutContainer>
      {/* 히어로 */}
      <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-6 mb-6 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-2 left-4 text-6xl rotate-12">🍀</div>
          <div className="absolute bottom-2 right-4 text-6xl -rotate-12">⭐</div>
        </div>
        <div className="relative">
          <div className="text-4xl mb-2">🍀</div>
          <h1 className="text-2xl font-black mb-1">럭키존</h1>
          <p className="text-sm text-violet-200 mb-2">포인트로 운을 시험해보세요</p>
          <p className="text-xs text-violet-300 max-w-xs mx-auto leading-relaxed">
            현금 가치 없는 내부 포인트로만 즐기는 회원 전용 운빨 게임
          </p>
        </div>
      </div>

      {/* 내 포인트 카드 */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 text-center">
          <div className="text-xs text-violet-400 mb-1">보유 포인트</div>
          <div className="text-2xl font-black text-violet-700">{user.points.toLocaleString()}P</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
          <div className="text-xs text-gray-400 mb-1">현재 계급</div>
          <div className="text-base font-black text-gray-800">{user.rankIcon} {user.rankName}</div>
        </div>
      </div>

      <div className="mb-6">
        <LuckyLimitCard stats={daily} currentPoints={user.points} />
      </div>

      {/* 게임 카드 */}
      <div className="mb-6">
        <h2 className="text-base font-black text-gray-900 mb-3">🎮 게임 선택</h2>
        <div className="grid grid-cols-2 gap-3">
          {LUCKY_GAMES.map((g) => (
            <LuckyGameCard
              key={g.gameType}
              config={g}
              unlocked={isGameUnlocked(g.gameType, user.rankId)}
              isHot={g.gameType === "rock-paper-scissors" || g.gameType === "odd-even"}
              isNew={g.gameType === "bomb" || g.gameType === "box"}
            />
          ))}
        </div>
      </div>

      {/* 계급별 해금 안내 */}
      <div className="mb-6 bg-gray-50 rounded-2xl p-4">
        <h3 className="text-sm font-black text-gray-700 mb-3">🔓 계급별 해금 안내</h3>
        <div className="space-y-2">
          {RANK_UNLOCK_INFO.map((info) => (
            <div key={info.rankId} className="flex items-start gap-3">
              <span
                className="text-xs font-bold px-2 py-1 rounded-lg text-white flex-shrink-0"
                style={{ background: info.color }}
              >
                {info.rankName}
              </span>
              <span className="text-xs text-gray-600 mt-1">{info.games.join(", ")}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 최근 기록 */}
      {recentResults.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-black text-gray-700">📋 최근 기록</h3>
            <Link href="/lucky/history" className="text-xs text-violet-600 font-semibold hover:underline">
              전체 보기 →
            </Link>
          </div>
          <LuckyHistoryList results={recentResults} limit={5} />
        </div>
      )}

      <LuckyNotice />
    </LayoutContainer>
  );
}

export default function LuckyPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const u = getCurrentUser();
    if (u && u.role === "member") setUser(u);
  }, []);

  return (
    <LuckyGuard>
      {user ? (
        <LuckyContent user={user} />
      ) : (
        <div className="min-h-screen flex items-center justify-center text-gray-400 animate-pulse">
          로딩 중...
        </div>
      )}
    </LuckyGuard>
  );
}
