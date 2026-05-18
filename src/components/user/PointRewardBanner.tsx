"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/user/authService";
import { awardPoints, POINT_AMOUNTS } from "@/lib/user/pointService";
import { getRankProgress } from "@/lib/user/rankService";
import type { PointReason } from "@/lib/user/types";

type Props = {
  contentId: string;
  reason: PointReason;
  className?: string;
};

export default function PointRewardBanner({ contentId, reason, className = "" }: Props) {
  const [state, setState] = useState<"idle" | "awarded" | "already" | "guest">("idle");
  const [awardedAmount, setAwardedAmount] = useState(0);
  const [rankUpName, setRankUpName] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<{ points: number; rankName: string; rankIcon: string; rankProgress: number; pointsToNext: number } | null>(null);

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || user.role !== "member") {
      setState("guest");
      return;
    }

    const result = awardPoints(user.id, reason, contentId);
    if (result.awarded) {
      setState("awarded");
      setAwardedAmount(result.amount);
      if (result.rankUp) setRankUpName(result.newRankName ?? null);
    } else {
      setState("already");
    }

    // 최신 사용자 정보 조회
    const refreshed = getCurrentUser();
    if (refreshed) {
      const { progressPercent, pointsToNext } = getRankProgress(refreshed.points, refreshed.role);
      setUserInfo({
        points: refreshed.points,
        rankName: refreshed.rankName,
        rankIcon: refreshed.rankIcon,
        rankProgress: progressPercent,
        pointsToNext,
      });
    }
  }, [contentId, reason]);

  if (state === "guest") {
    const pendingAmount = POINT_AMOUNTS[reason];
    return (
      <div className={`bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-100 rounded-2xl p-5 ${className}`}>
        <div className="flex items-start gap-3 mb-3">
          <span className="text-2xl">🎖️</span>
          <div>
            <p className="text-sm font-bold text-gray-800">회원이면 {pendingAmount}P를 받을 수 있어요!</p>
            <p className="text-xs text-gray-500 mt-0.5">가입 축하 500P + 이번 플레이 {pendingAmount}P</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/auth/signup?redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : "/")}`}
            className="flex-1 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-bold text-center hover:bg-purple-700 transition-colors"
          >
            가입하고 포인트 받기
          </Link>
          <Link href="/auth/login" className="flex-1 py-2.5 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold text-center hover:bg-gray-50 transition-colors">
            로그인
          </Link>
        </div>
      </div>
    );
  }

  if (state === "already" && userInfo) {
    return (
      <div className={`bg-white border border-gray-100 rounded-2xl p-4 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">오늘 이미 적립된 콘텐츠입니다.</span>
          <Link href="/my" className="text-xs text-brand-purple font-semibold hover:underline">내 정보</Link>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg">{userInfo.rankIcon}</span>
          <div className="flex-1">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>{userInfo.rankName}</span>
              <span>{userInfo.points.toLocaleString()}P</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5">
              <div className="bg-gradient-to-r from-violet-500 to-pink-500 h-1.5 rounded-full" style={{ width: `${userInfo.rankProgress}%` }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === "awarded" && userInfo) {
    return (
      <div className={`bg-gradient-to-r from-violet-600 to-pink-500 rounded-2xl p-5 text-white ${className}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">⭐</span>
          <div>
            <p className="text-lg font-extrabold">+{awardedAmount}P 적립 완료!</p>
            {rankUpName && (
              <p className="text-sm font-bold opacity-90">🎖️ {rankUpName}으로 진급!</p>
            )}
          </div>
        </div>
        <div className="bg-white/20 rounded-xl p-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="opacity-80">현재 계급: {userInfo.rankIcon} {userInfo.rankName}</span>
            <span className="font-bold">{userInfo.points.toLocaleString()}P</span>
          </div>
          {userInfo.pointsToNext > 0 && (
            <p className="text-xs opacity-75">다음 계급까지 {userInfo.pointsToNext.toLocaleString()}P</p>
          )}
          <div className="w-full bg-white/30 rounded-full h-1.5 mt-2">
            <div className="bg-white h-1.5 rounded-full transition-all" style={{ width: `${userInfo.rankProgress}%` }} />
          </div>
        </div>
        <Link href="/my" className="block mt-3 text-center text-xs opacity-80 hover:opacity-100 hover:underline">
          내 정보 보기 →
        </Link>
      </div>
    );
  }

  return null;
}
