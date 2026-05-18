"use client";
import { getRankProgress } from "@/lib/user/rankService";
import type { UserProfile } from "@/lib/user/types";

type Props = {
  user: UserProfile;
  className?: string;
};

export default function RankProgress({ user, className = "" }: Props) {
  const { currentRank, nextRank, progressPercent, pointsToNext } = getRankProgress(user.points, user.role);

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{currentRank.icon}</span>
          <span className="font-bold text-gray-800">{currentRank.name}</span>
        </div>
        <span className="text-xs text-gray-500">{user.points.toLocaleString()}P</span>
      </div>
      {nextRank ? (
        <>
          <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
            <div
              className="bg-gradient-to-r from-violet-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-400">
            다음 계급 <span className="font-semibold text-gray-600">{nextRank.icon} {nextRank.name}</span>까지{" "}
            <span className="font-bold text-brand-purple">{pointsToNext.toLocaleString()}P</span> 남음
          </p>
        </>
      ) : (
        <p className="text-xs text-yellow-600 font-semibold">🏆 최고 계급 달성!</p>
      )}
    </div>
  );
}
