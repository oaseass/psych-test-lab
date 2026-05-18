"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser, getOrCreateGuest } from "@/lib/user/authService";
import { checkIn, canCheckInToday, getNextStreakReward } from "@/lib/user/checkInService";
import { getPointLogs } from "@/lib/user/pointService";
import type { UserProfile, PointLog } from "@/lib/user/types";
import CheckInCard from "@/components/user/CheckInCard";
import SignupPrompt from "@/components/user/SignupPrompt";

export default function CheckInPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [logs, setLogs] = useState<PointLog[]>([]);
  const [checkInResult, setCheckInResult] = useState<{ basePoints: number; bonusPoints: number; bonusReason?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const u = getCurrentUser() ?? getOrCreateGuest();
    setUser(u);
    if (u.role === "member") setLogs(getPointLogs(u.id).slice(0, 10));
  }, []);

  async function handleCheckIn() {
    if (!user) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const result = checkIn(user.id);
    if (result.success) {
      const refreshed = getCurrentUser();
      if (refreshed) {
        setUser(refreshed);
        setLogs(getPointLogs(refreshed.id).slice(0, 10));
      }
      setCheckInResult({ basePoints: result.basePoints, bonusPoints: result.bonusPoints, bonusReason: result.bonusReason });
    }
    setLoading(false);
  }

  if (!user) return null;

  const today = new Date().toLocaleDateString("ko-KR", { month: "long", day: "numeric", weekday: "short" });

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
      <div className="text-center mb-2">
        <h1 className="text-xl font-extrabold text-gray-900">📅 출석체크</h1>
        <p className="text-sm text-gray-400 mt-1">{today}</p>
      </div>

      {/* 출석 결과 메시지 */}
      {checkInResult && (
        <div className="bg-gradient-to-r from-violet-600 to-pink-500 rounded-2xl p-5 text-white text-center animate-pulse-once">
          <div className="text-3xl mb-1">🎉</div>
          <p className="font-extrabold text-lg">출석 완료!</p>
          <p className="text-sm opacity-90 mt-1">+{checkInResult.basePoints}P 적립</p>
          {checkInResult.bonusPoints > 0 && (
            <p className="text-sm font-bold mt-0.5">🎁 {checkInResult.bonusReason} +{checkInResult.bonusPoints}P 보너스!</p>
          )}
        </div>
      )}

      {user.role !== "member" ? (
        <>
          <div className="bg-white rounded-2xl border border-gray-100 p-5 text-center">
            <div className="text-3xl mb-2">📅</div>
            <p className="text-sm text-gray-500 mb-1">오늘 출석하고 <span className="font-bold text-brand-purple">100P</span> 받기</p>
            <p className="text-xs text-gray-400">7일 개근하면 추가 1,000P</p>
          </div>
          <SignupPrompt variant="card" />
        </>
      ) : (
        <CheckInCard user={user} onCheckIn={handleCheckIn} loading={loading} />
      )}

      {/* 포인트 안내 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <h3 className="font-bold text-gray-700 mb-3 text-sm">연속 출석 보너스</h3>
        <div className="space-y-2">
          {[
            { days: 3, points: 300, icon: "🥉" },
            { days: 7, points: 1000, icon: "🥈" },
            { days: 14, points: 2000, icon: "🥇" },
            { days: 30, points: 5000, icon: "🏆" },
          ].map((b) => {
            const achieved = user.role === "member" && user.checkInStreak >= b.days;
            return (
              <div key={b.days} className={`flex justify-between items-center text-sm ${achieved ? "text-gray-800" : "text-gray-400"}`}>
                <span>{b.icon} {b.days}일 연속</span>
                <span className={`font-bold ${achieved ? "text-violet-600" : ""}`}>+{b.points.toLocaleString()}P</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 최근 포인트 */}
      {user.role === "member" && logs.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold text-gray-700 mb-3 text-sm">최근 포인트 기록</h3>
          <div className="space-y-2">
            {logs.map((l) => (
              <div key={l.id} className="flex justify-between items-center text-sm">
                <span className="text-gray-600">{l.label}</span>
                <span className="font-bold text-brand-purple">+{l.amount}P</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Link href="/my" className="flex-1 py-3 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 text-center hover:border-gray-300 transition-colors">
          내 정보
        </Link>
        <Link href="/rank" className="flex-1 py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center hover:bg-violet-100 transition-colors">
          계급표 보기
        </Link>
      </div>
    </div>
  );
}
