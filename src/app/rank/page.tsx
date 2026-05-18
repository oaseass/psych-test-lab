"use client";
import { useEffect, useState } from "react";
import { GUEST_RANK, MEMBER_RANKS } from "@/data/ranks";
import { getCurrentUser } from "@/lib/user/authService";
import type { UserProfile } from "@/lib/user/types";
import type { Rank } from "@/lib/user/types";
import Link from "next/link";

export default function RankPage() {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const allRanks: Rank[] = [GUEST_RANK, ...MEMBER_RANKS];

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-extrabold text-gray-900">🎖️ 계급표</h1>
        <p className="text-sm text-gray-500 mt-1">게임하고 테스트할수록 계급이 올라갑니다.</p>
      </div>

      {user?.role === "member" && (
        <div className="bg-gradient-to-r from-violet-600 to-pink-500 rounded-2xl p-4 mb-5 text-white flex items-center gap-3">
          <span className="text-3xl">{user.rankIcon}</span>
          <div>
            <p className="text-xs opacity-80">내 현재 계급</p>
            <p className="font-extrabold">{user.rankName} · {user.points.toLocaleString()}P</p>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {allRanks.map((rank) => {
          const isCurrent = user?.rankId === rank.id;
          const isNext = user?.role === "member" && MEMBER_RANKS.findIndex(r => r.id === user.rankId) + 1 === MEMBER_RANKS.findIndex(r => r.id === rank.id);
          const isGuest = rank.id === "guest";
          return (
            <div
              key={rank.id}
              className={`flex items-center gap-3 p-4 rounded-2xl border transition-all
                ${isCurrent ? "border-violet-300 bg-violet-50 shadow-sm" : isNext ? "border-orange-200 bg-orange-50" : "border-gray-100 bg-white"}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl
                ${isCurrent ? "bg-violet-100" : isNext ? "bg-orange-100" : "bg-gray-50"}`}>
                {rank.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-sm ${isCurrent ? "text-violet-700" : "text-gray-800"}`}>{rank.name}</span>
                  {isCurrent && <span className="text-[10px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full font-bold">현재</span>}
                  {isNext && <span className="text-[10px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold">다음</span>}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{rank.description}</p>
              </div>
              <div className="text-right text-xs text-gray-400 flex-shrink-0">
                {isGuest ? "게스트" : `${rank.minPoints.toLocaleString()}P~`}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-2">
        {user?.role !== "member" ? (
          <Link href="/auth/signup" className="flex-1 py-3 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-2xl text-sm font-bold text-center hover:opacity-90 transition-opacity">
            가입하고 이등병 시작
          </Link>
        ) : (
          <>
            <Link href="/my" className="flex-1 py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center">내 정보</Link>
            <Link href="/check-in" className="flex-1 py-3 bg-violet-600 text-white rounded-2xl text-sm font-bold text-center hover:bg-violet-700 transition-colors">출석체크</Link>
          </>
        )}
      </div>
    </div>
  );
}
