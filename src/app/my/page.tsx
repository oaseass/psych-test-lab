"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getCurrentUser, logout } from "@/lib/user/authService";
import { getPointLogs } from "@/lib/user/pointService";
import { getRankProgress, getRankById } from "@/lib/user/rankService";
import { canCheckInToday, getNextStreakReward } from "@/lib/user/checkInService";
import type { UserProfile, PointLog } from "@/lib/user/types";
import RankProgress from "@/components/user/RankProgress";
import SignupPrompt from "@/components/user/SignupPrompt";
import AnimatedRankIcon from "@/components/user/AnimatedRankIcon";

export default function MyPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [logs, setLogs] = useState<PointLog[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    if (u) setLogs(getPointLogs(u.id).slice(0, 10));
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  // 게스트
  if (!user || user.role === "guest") {
    return (
      <div className="max-w-xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <div className="text-5xl mb-2">🕵️</div>
          <h1 className="text-xl font-extrabold text-gray-800">{user?.nickname ?? "손님"}</h1>
          <p className="text-sm text-gray-400 mt-1">훈련병 · 게스트</p>
        </div>
        <div className="bg-gray-50 rounded-2xl p-4 mb-4 text-sm text-gray-500 text-center">
          포인트와 계급이 저장되지 않습니다. 회원가입하면 이등병부터 시작해요.
        </div>
        <SignupPrompt variant="card" className="mb-4" />
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-sm text-gray-500 text-center">
          같이놀기는 회원 전용입니다.
          <Link href="/auth/signup" className="ml-2 text-brand-purple font-semibold hover:underline">가입하기</Link>
        </div>
      </div>
    );
  }

  const { nextRank, progressPercent, pointsToNext } = getRankProgress(user.points, user.role);
  const canCheckIn = canCheckInToday(user);
  const nextBonus = getNextStreakReward(user.checkInStreak);

  function handleLogout() {
    logout();
    router.replace("/");
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
      {/* 프로필 카드 */}
      <div className="bg-gradient-to-br from-violet-600 to-pink-500 rounded-3xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
            <AnimatedRankIcon rank={getRankById(user.rankId)} sizeClass="text-4xl" animated />
          </div>
          <div>
            <h1 className="text-xl font-extrabold">{user.nickname}</h1>
            <p className="text-sm opacity-80">{user.rankName}</p>
            <p className="text-lg font-bold mt-0.5">{user.points.toLocaleString()}P</p>
          </div>
        </div>
      </div>

      {/* 계급 진행 */}
      <RankProgress user={user} />

      {/* 출석 현황 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-800">📅 출석체크</h3>
          {canCheckIn ? (
            <Link
              href="/check-in"
              className="px-3 py-1.5 bg-violet-600 text-white rounded-lg text-xs font-bold hover:bg-violet-700 transition-colors"
            >
              출석하기 +100P
            </Link>
          ) : (
            <span className="text-xs text-green-600 font-semibold bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
              ✓ 오늘 출석 완료
            </span>
          )}
        </div>
        <div className="flex gap-4 text-sm text-gray-600">
          <div><span className="font-bold text-gray-800">{user.checkInStreak}</span>일 연속</div>
          <div><span className="font-bold text-gray-800">{user.totalCheckInDays}</span>일 누적</div>
        </div>
        {nextBonus && (
          <p className="text-xs text-violet-600 mt-1">🎁 {nextBonus.days}일 더 출석하면 +{nextBonus.points.toLocaleString()}P</p>
        )}
      </div>

      {/* 활동 요약 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <div className="text-xl mb-1">🎮</div>
          <div className="text-2xl font-extrabold text-brand-purple">{user.playedCount}</div>
          <div className="text-xs text-gray-500 mt-0.5">완료한 테스트/게임</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
          <div className="text-xl mb-1">👥</div>
          <div className="text-2xl font-extrabold text-violet-600">{user.togetherPlayedCount}</div>
          <div className="text-xs text-gray-500 mt-0.5">같이놀기 참여</div>
        </div>
      </div>

      {/* 최근 포인트 로그 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <h3 className="font-bold text-gray-800 mb-3">💰 최근 획득 포인트</h3>
        {logs.length === 0 ? (
          <div className="text-center py-4">
            <div className="text-3xl mb-1">📭</div>
            <p className="text-sm text-gray-400">아직 포인트 기록이 없어요.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{log.label}</span>
                <span className="font-bold text-brand-purple">+{log.amount}P</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 액션 링크 */}
      <div className="grid grid-cols-2 gap-2">
        <Link href="/check-in" className="py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center hover:bg-violet-100 transition-colors">
          📅 출석체크
        </Link>
        <Link href="/rank" className="py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center hover:bg-violet-100 transition-colors">
          🎖️ 계급표
        </Link>
        <Link href="/leaderboard" className="py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center hover:bg-violet-100 transition-colors">
          🏆 랭킹
        </Link>
        <Link href="/together" className="py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center hover:bg-violet-100 transition-colors">
          👥 같이놀기
        </Link>
      </div>

      <button
        onClick={handleLogout}
        className="w-full py-3 border border-gray-200 text-gray-500 rounded-2xl text-sm font-semibold hover:border-gray-300 hover:text-gray-700 transition-colors"
      >
        로그아웃
      </button>
    </div>
  );
}
