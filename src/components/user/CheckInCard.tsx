"use client";
import Link from "next/link";
import type { UserProfile } from "@/lib/user/types";
import { canCheckInToday, getNextStreakReward } from "@/lib/user/checkInService";

type Props = {
  user: UserProfile;
  onCheckIn?: () => void;
  loading?: boolean;
};

export default function CheckInCard({ user, onCheckIn, loading }: Props) {
  const canToday = canCheckInToday(user);
  const nextBonus = getNextStreakReward(user.checkInStreak);

  if (user.role !== "member") {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
        <div className="text-3xl mb-2">📅</div>
        <p className="text-sm text-gray-500 mb-3">회원만 출석체크를 할 수 있어요.</p>
        <Link
          href="/auth/signup"
          className="inline-block px-5 py-2 bg-brand-purple text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors"
        >
          회원가입하고 매일 100P 받기
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-bold text-gray-800">출석체크</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            연속 {user.checkInStreak}일 · 총 {user.totalCheckInDays}일
          </p>
        </div>
        {canToday ? (
          <button
            onClick={onCheckIn}
            disabled={loading}
            className="px-4 py-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "..." : "출석하기 +100P"}
          </button>
        ) : (
          <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-bold border border-green-100">
            ✓ 출석 완료
          </span>
        )}
      </div>
      {nextBonus && (
        <div className="bg-violet-50 rounded-xl p-3 text-xs text-violet-700">
          <span className="font-bold">🎁 {nextBonus.days}일 더 출석</span>하면 추가{" "}
          <span className="font-bold">{nextBonus.points.toLocaleString()}P</span> 보너스!
        </div>
      )}
      {!nextBonus && (
        <div className="bg-yellow-50 rounded-xl p-3 text-xs text-yellow-700 font-bold">
          🏆 30일 연속 출석 달성! 대단해요!
        </div>
      )}
    </div>
  );
}
