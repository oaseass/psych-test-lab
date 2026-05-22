"use client";

import Link from "next/link";
import { showRankUpToast } from "@/components/user/RankUpToast";
import { useEffect } from "react";

// ─────────────────────────────────────────────
// LuckyResultCard — 결과 카드
// ─────────────────────────────────────────────

type Props = {
  isWin: boolean;
  stakePoints: number;
  rewardPoints: number;
  netPoints: number;
  newPoints: number;
  rankUp?: boolean;
  newRankName?: string;
  prevRankName?: string;
  detail: string;
  onRetry: () => void;
  nextGameHref?: string;
  nextGameLabel?: string;
};

export default function LuckyResultCard({
  isWin,
  stakePoints,
  rewardPoints,
  netPoints,
  newPoints,
  rankUp,
  newRankName,
  prevRankName,
  detail,
  onRetry,
  nextGameHref,
  nextGameLabel,
}: Props) {
  useEffect(() => {
    if (rankUp && prevRankName && newRankName) {
      showRankUpToast(prevRankName, newRankName);
    }
  }, [rankUp, prevRankName, newRankName]);

  return (
    <div className={`rounded-2xl p-6 text-center border-2 ${isWin ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
      <div className="text-5xl mb-3">{isWin ? "🎉" : "😢"}</div>
      <div className={`text-2xl font-black mb-1 ${isWin ? "text-green-700" : "text-red-600"}`}>
        {isWin ? "성공!" : "아쉽게 실패!"}
      </div>
      <p className="text-sm text-gray-600 mb-4">{detail}</p>

      <div className="bg-white rounded-xl p-4 mb-4 text-left space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">사용 포인트</span>
          <span className="font-bold text-red-500">-{stakePoints}P</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">획득 포인트</span>
          <span className={`font-bold ${rewardPoints > 0 ? "text-green-600" : "text-gray-400"}`}>
            {rewardPoints > 0 ? `+${rewardPoints}P` : "없음"}
          </span>
        </div>
        <div className="border-t pt-2 flex justify-between text-sm font-bold">
          <span className="text-gray-700">순증감</span>
          <span className={netPoints >= 0 ? "text-green-600" : "text-red-500"}>
            {netPoints >= 0 ? `+${netPoints}P` : `${netPoints}P`}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">현재 보유</span>
          <span className="font-bold text-violet-600">{newPoints.toLocaleString()}P</span>
        </div>
      </div>

      {rankUp && newRankName && (
        <div className="bg-violet-100 rounded-xl p-3 mb-4 text-center text-sm font-bold text-violet-700">
          🎖️ {prevRankName} → {newRankName} 진급!
        </div>
      )}

      {!isWin && (
        <p className="text-xs text-gray-400 mb-4">
          테스트·퀴즈를 완료하거나 출석체크로 포인트를 모아보세요.
        </p>
      )}

      <div className="flex gap-2">
        <button
          onClick={onRetry}
          className="flex-1 py-3 rounded-xl font-bold text-white bg-violet-600 hover:bg-violet-700 transition-colors"
        >
          다시 도전
        </button>
        {nextGameHref && nextGameLabel && (
          <Link
            href={nextGameHref}
            className="flex-1 py-3 rounded-xl font-bold text-center text-violet-700 bg-violet-50 border border-violet-200 hover:bg-violet-100 transition-colors"
          >
            {nextGameLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
