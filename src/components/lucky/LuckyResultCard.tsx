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
    <div className="rounded-2xl border bg-white overflow-hidden">
      {/* 포인트 정산 헤더 */}
      <div className="bg-gray-50 border-b px-5 py-3">
        <p className="text-xs font-bold text-gray-500 tracking-wide">포인트 정산</p>
      </div>
      {/* 정산 내역 */}
      <div className="px-5 py-4 space-y-2">
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
      </div>
      {/* 현재 보유 포인트 강조 */}
      <div className={`mx-4 mb-4 rounded-xl px-4 py-3 flex items-center justify-between ${
        isWin ? "bg-violet-50 border border-violet-100" : "bg-gray-50 border border-gray-100"
      }`}>
        <span className="text-sm text-gray-500">현재 보유</span>
        <span className="text-lg font-black text-violet-600">{newPoints.toLocaleString()}P</span>
      </div>

      {rankUp && newRankName && (
        <div className="mx-4 mb-4 bg-violet-100 rounded-xl p-3 text-center text-sm font-bold text-violet-700">
          🎖️ {prevRankName} → {newRankName} 진급!
        </div>
      )}

      {!isWin && (
        <p className="text-xs text-gray-400 px-5 pb-3 text-center">
          테스트·퀴즈를 완료하거나 출석체크로 포인트를 모아보세요.
        </p>
      )}

      <div className="flex gap-2 px-4 pb-4">
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
