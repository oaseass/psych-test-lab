"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/user/authService";
import { getLeaderboard, getMyRank, type LeaderboardEntry } from "@/lib/user/leaderboardService";
import { getRankById, getRankByName } from "@/lib/user/rankService";
import { GUEST_RANK } from "@/data/ranks";
import type { UserProfile } from "@/lib/user/types";
import AnimatedRankIcon from "@/components/user/AnimatedRankIcon";
import RankBadge from "@/components/user/RankBadge";

const TOP3_STYLES = [
  { medal: "🥇", gradient: "from-yellow-400 to-amber-300", border: "border-yellow-300", ring: "ring-2 ring-yellow-400" },
  { medal: "🥈", gradient: "from-slate-300 to-slate-200", border: "border-slate-200", ring: "ring-2 ring-slate-300" },
  { medal: "🥉", gradient: "from-orange-400 to-amber-300", border: "border-orange-300", ring: "ring-2 ring-orange-400" },
];

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

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3);

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">🏆 랭킹</h1>
        <p className="text-sm text-gray-400 mt-1">포인트 TOP 50</p>
      </div>

      {/* 내 순위 */}
      {user?.role === "member" && myRank > 0 && (
        <div className="bg-gradient-to-r from-violet-600 to-pink-500 rounded-2xl p-4 mb-5 text-white flex items-center gap-3">
          <span className="text-2xl font-extrabold">{myRank}위</span>
          <div className="flex items-center gap-2">
            <AnimatedRankIcon rank={getRankById(user.rankId)} sizeClass="text-xl" animated />
            <div>
              <p className="text-xs opacity-80">내 순위</p>
              <p className="font-extrabold">{user.nickname} · {user.points.toLocaleString()}P</p>
            </div>
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

      {entries.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <div className="text-4xl mb-2">🏆</div>
          <p className="text-sm">아직 랭킹 데이터가 없습니다.</p>
          <p className="text-xs mt-1">첫 회원이 되어보세요!</p>
        </div>
      ) : (
        <>
          {/* TOP 3 카드 */}
          {top3.length > 0 && (
            <div className="flex gap-2 mb-4">
              {top3.map((e, idx) => {
                const style = TOP3_STYLES[idx];
                const rank = getRankByName(e.rankName) ?? GUEST_RANK;
                const isMe = user?.id === e.userId;
                return (
                  <div
                    key={e.userId}
                    className={`flex-1 bg-gradient-to-b ${style.gradient} ${style.ring} rounded-2xl p-3 text-center shadow-sm border ${style.border} ${isMe ? "scale-105" : ""}`}
                  >
                    <div className="text-2xl mb-1">{style.medal}</div>
                    <div className="flex justify-center mb-1">
                      <AnimatedRankIcon rank={rank} sizeClass="text-2xl" animated />
                    </div>
                    <p className="text-xs font-extrabold text-gray-800 truncate">{e.nickname}</p>
                    <p className="text-[10px] text-gray-600 font-semibold mt-0.5">{e.rankName}</p>
                    <p className="text-xs font-bold text-violet-700 mt-0.5">{e.points.toLocaleString()}P</p>
                    {isMe && <span className="text-[9px] bg-violet-600 text-white px-1 py-0.5 rounded-full">나</span>}
                  </div>
                );
              })}
            </div>
          )}

          {/* 4위 이하 */}
          {rest.length > 0 && (
            <div className="space-y-2">
              {rest.map((e) => {
                const isMe = user?.id === e.userId;
                const rank = getRankByName(e.rankName) ?? GUEST_RANK;
                return (
                  <div
                    key={e.userId}
                    className={`flex items-center gap-3 p-3 rounded-2xl border ${isMe ? "border-violet-300 bg-violet-50" : "border-gray-100 bg-white"}`}
                  >
                    <div className="w-7 text-center font-extrabold text-xs text-gray-400 flex-shrink-0">
                      {e.rank}
                    </div>
                    <div className="flex-shrink-0">
                      <AnimatedRankIcon rank={rank} sizeClass="text-lg" animated />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold text-sm truncate ${isMe ? "text-violet-700" : "text-gray-800"}`}>
                          {e.nickname}
                        </span>
                        {isMe && <span className="text-[9px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full flex-shrink-0">나</span>}
                      </div>
                      <p className="text-xs text-gray-400">{e.rankName}</p>
                    </div>
                    <div className="text-sm font-bold text-brand-purple flex-shrink-0">
                      {e.points.toLocaleString()}P
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      <div className="mt-6 flex gap-2">
        <Link href="/my" className="flex-1 py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center">내 정보</Link>
        <Link href="/rank" className="flex-1 py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center">계급표</Link>
      </div>
    </div>
  );
}
