"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/user/authService";
import { getLeaderboard, getMyRank, type LeaderboardEntry } from "@/lib/user/leaderboardService";
import type { UserProfile } from "@/lib/user/types";

export default function LeaderboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [myRank, setMyRank] = useState<number>(-1);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    setEntries(getLeaderboard(50));
    if (u?.role === "member") {
      setMyRank(getMyRank(u.id));
    }
  }, []);

  const rankEmoji = (n: number) => n === 1 ? "🥇" : n === 2 ? "🥈" : n === 3 ? "🥉" : `${n}`;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">🏆 랭킹</h1>
        <p className="text-sm text-gray-400 mt-1">포인트 TOP 50</p>
      </div>

      {/* 내 순위 */}
      {user?.role === "member" && myRank > 0 && (
        <div className="bg-gradient-to-r from-violet-600 to-pink-500 rounded-2xl p-4 mb-5 text-white flex items-center gap-3">
          <span className="text-2xl font-extrabold">{rankEmoji(myRank)}</span>
          <div>
            <p className="text-xs opacity-80">내 순위</p>
            <p className="font-extrabold">{myRank}위 · {user.rankIcon} {user.nickname} · {user.points.toLocaleString()}P</p>
          </div>
        </div>
      )}

      {user?.role !== "member" && (
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-5 text-center">
          <p className="text-sm text-gray-600 mb-2">랭킹에 등록하려면 회원가입이 필요합니다.</p>
          <Link href="/auth/signup" className="inline-block px-4 py-2 bg-brand-purple text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors">
            가입하고 이등병 시작
          </Link>
        </div>
      )}

      {/* 랭킹 테이블 */}
      {entries.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-2">🏆</div>
          <p className="text-sm">아직 랭킹 데이터가 없습니다.</p>
          <p className="text-xs mt-1">첫 회원이 되어보세요!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {entries.map((e) => {
            const isMe = user?.id === e.userId;
            return (
              <div
                key={e.userId}
                className={`flex items-center gap-3 p-3 rounded-2xl border ${isMe ? "border-violet-300 bg-violet-50" : "border-gray-100 bg-white"}`}
              >
                <div className="w-8 text-center font-extrabold text-sm text-gray-500">
                  {rankEmoji(e.rank)}
                </div>
                <div className="w-8 h-8 bg-gray-50 rounded-xl flex items-center justify-center text-lg border border-gray-100">
                  {e.rankIcon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold text-sm ${isMe ? "text-violet-700" : "text-gray-800"}`}>{e.nickname}</span>
                    {isMe && <span className="text-[10px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full">나</span>}
                  </div>
                  <p className="text-xs text-gray-400">{e.rankName} · {e.playedCount}회 플레이</p>
                </div>
                <div className="text-sm font-bold text-brand-purple">{e.points.toLocaleString()}P</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex gap-2">
        <Link href="/my" className="flex-1 py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center">내 정보</Link>
        <Link href="/rank" className="flex-1 py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center">계급표</Link>
      </div>
    </div>
  );
}
