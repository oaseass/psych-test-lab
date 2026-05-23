"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser, getOrCreateGuest } from "@/lib/user/authService";
import { checkIn, canCheckInToday, getNextStreakReward } from "@/lib/user/checkInService";
import { getPointLogs } from "@/lib/user/pointService";
import type { UserProfile, PointLog } from "@/lib/user/types";
import CheckInCard from "@/components/user/CheckInCard";
import CheckInCalendar from "@/components/check-in/CheckInCalendar";

const STREAK_BONUSES = [
  { days: 3,  points: 300,  icon: "🥉" },
  { days: 7,  points: 1000, icon: "🥈" },
  { days: 14, points: 2000, icon: "🥇" },
  { days: 30, points: 5000, icon: "🏆" },
];

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function CheckInPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [logs, setLogs] = useState<PointLog[]>([]);
  const [checkInResult, setCheckInResult] = useState<{
    basePoints: number;
    bonusPoints: number;
    bonusReason?: string;
  } | null>(null);
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
      setCheckInResult({
        basePoints: result.basePoints,
        bonusPoints: result.bonusPoints,
        bonusReason: result.bonusReason,
      });
    }
    setLoading(false);
  }

  if (!user) return null;

  const today = todayISO();
  const todayLabel = new Date().toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
    weekday: "short",
  });

  // 달력용 출석 날짜 배열 — checkInDates 없으면 lastCheckInAt으로 fallback
  const checkedDates: string[] =
    user.checkInDates ??
    (user.lastCheckInAt ? [user.lastCheckInAt.slice(0, 10)] : []);

  const nextBonus =
    user.role === "member" ? getNextStreakReward(user.checkInStreak) : null;

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
      {/* 1. 페이지 제목 */}
      <div className="text-center mb-2">
        <h1 className="text-xl font-extrabold text-gray-900">📅 출석체크</h1>
        <p className="text-sm text-gray-400 mt-1">{todayLabel}</p>
      </div>

      {/* 2. 출석 결과 플래시 */}
      {checkInResult && (
        <div className="bg-gradient-to-r from-violet-600 to-pink-500 rounded-2xl p-5 text-white text-center">
          <div className="text-3xl mb-1">🎉</div>
          <p className="font-extrabold text-lg">출석 완료!</p>
          <p className="text-sm opacity-90 mt-1">+{checkInResult.basePoints}P 적립</p>
          {checkInResult.bonusPoints > 0 && (
            <p className="text-sm font-bold mt-0.5">
              🎁 {checkInResult.bonusReason} +{checkInResult.bonusPoints}P 보너스!
            </p>
          )}
        </div>
      )}

      {/* 3. 메인 출석 카드 */}
      {user.role !== "member" ? (
        <div className="bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-100 rounded-2xl p-6 text-center space-y-4">
          <div className="text-4xl">📅</div>
          <div>
            <p className="font-bold text-gray-800">매일 출석하고 포인트 쌓기</p>
            <p className="text-sm text-gray-500 mt-1">
              로그인하면 출석 달력과 포인트 기록을 확인할 수 있어요.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Link
              href="/auth/login"
              className="w-full py-3 bg-brand-purple text-white rounded-xl text-sm font-bold text-center hover:bg-purple-700 transition-colors"
            >
              로그인하고 출석하기
            </Link>
            <Link
              href="/auth/signup"
              className="w-full py-2.5 border border-violet-200 text-violet-700 rounded-xl text-sm font-semibold text-center hover:bg-violet-50 transition-colors"
            >
              아직 계정이 없어요 → 간단 가입 (축하 500P)
            </Link>
          </div>
        </div>
      ) : (
        <CheckInCard user={user} onCheckIn={handleCheckIn} loading={loading} />
      )}

      {/* 4. 이번 달 출석 달력 */}
      {user.role === "member" && (
        <CheckInCalendar
          checkedDates={checkedDates}
          today={today}
          streak={user.checkInStreak}
        />
      )}

      {/* 5. 다음 보너스까지 안내 */}
      {user.role === "member" && nextBonus && (
        <div className="bg-gradient-to-r from-violet-50 to-pink-50 rounded-2xl p-4 border border-violet-100 text-center">
          <p className="text-xs text-gray-400 mb-0.5">다음 보너스까지</p>
          <p className="text-base font-bold text-violet-700">
            <span className="text-2xl font-extrabold">{nextBonus.days}일</span> 더 출석하면
          </p>
          <p className="text-lg font-extrabold text-violet-600 mt-0.5">
            🎁 +{nextBonus.points.toLocaleString()}P 보너스
          </p>
        </div>
      )}
      {user.role === "member" && !nextBonus && (
        <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100 text-center">
          <p className="text-sm font-bold text-yellow-700">🏆 30일 연속 출석 달성! 최고예요!</p>
        </div>
      )}

      {/* 6. 연속 출석 보너스 카드 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <h3 className="font-bold text-gray-700 mb-3 text-sm">연속 출석 보너스</h3>
        <div className="space-y-2">
          {STREAK_BONUSES.map((b) => {
            const achieved =
              user.role === "member" && user.checkInStreak >= b.days;
            const isNext =
              user.role === "member" &&
              nextBonus &&
              user.checkInStreak < b.days &&
              b.days - user.checkInStreak === nextBonus.days;
            return (
              <div
                key={b.days}
                className={`flex justify-between items-center text-sm rounded-xl px-2 py-1 ${
                  isNext
                    ? "bg-violet-50 font-bold"
                    : achieved
                    ? "text-gray-800"
                    : "text-gray-400"
                }`}
              >
                <span>
                  {b.icon} {b.days}일 연속
                  {isNext && (
                    <span className="ml-1.5 text-xs text-violet-500">
                      ← 다음 목표
                    </span>
                  )}
                </span>
                <span
                  className={`font-bold ${
                    isNext
                      ? "text-violet-600"
                      : achieved
                      ? "text-violet-600"
                      : ""
                  }`}
                >
                  +{b.points.toLocaleString()}P
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. 최근 포인트 기록 */}
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

      {/* 8. 내 정보 / 계급표 버튼 */}
      <div className="flex gap-2">
        <Link
          href="/my"
          className="flex-1 py-3 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-600 text-center hover:border-gray-300 transition-colors"
        >
          내 정보
        </Link>
        <Link
          href="/rank"
          className="flex-1 py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center hover:bg-violet-100 transition-colors"
        >
          계급표 보기
        </Link>
      </div>
    </div>
  );
}
