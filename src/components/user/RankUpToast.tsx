"use client";
import { useState, useEffect } from "react";
import { ALL_RANKS } from "@/data/ranks";
import AnimatedRankIcon from "./AnimatedRankIcon";

type ToastState = {
  fromRankName: string;
  toRankName: string;
} | null;

let _setToast: ((s: ToastState) => void) | null = null;

export function showRankUpToast(fromRankName: string, toRankName: string) {
  if (_setToast) {
    _setToast({ fromRankName, toRankName });
    setTimeout(() => _setToast && _setToast(null), 6000);
  }
}

export default function RankUpToast() {
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    _setToast = setToast;
    return () => { _setToast = null; };
  }, []);

  if (!toast) return null;

  const toRank = ALL_RANKS.find((r) => r.name === toast.toRankName);

  let headline = "진급했습니다!";
  let extra = "새 계급 뱃지가 적용됐습니다.";

  if (toRank?.tier === "nonCommissionedOfficer") {
    headline = "🎖️ 부사관 계급 진입!";
    extra = "움직이는 부사관 뱃지가 해금됐습니다.";
  } else if (toRank?.name === "소위" || toRank?.tier === "officer") {
    headline = "✨ 장교 계급 진입!";
    extra = "빛나는 장교 shine 뱃지가 해금됐습니다.";
  } else if (toRank?.name === "소령" || toRank?.tier === "fieldOfficer") {
    headline = "⬆️ 영관급 계급 진입!";
    extra = "부유하는 float 뱃지가 해금됐습니다.";
  } else if (toRank?.name === "준장" || toRank?.tier === "general") {
    headline = "👑 장군 계급 진입!";
    extra = "장군 전용 오라 효과가 해금됐습니다.";
  } else if (toRank?.tier === "legend") {
    headline = "🌟 레전드 계급 달성!";
    extra = "심심풀이 연구소 최고 계급 원수에 도달했습니다.";
  }

  return (
    <div className="fixed inset-x-0 top-16 z-[300] flex justify-center px-4 pointer-events-none">
      <div
        className="pointer-events-auto bg-gradient-to-r from-violet-700 to-pink-500 text-white rounded-2xl px-5 py-4 shadow-2xl max-w-sm w-full rank-slide-down"
      >
        <div className="flex items-center gap-3">
          {toRank && (
            <div className="flex-shrink-0">
              <AnimatedRankIcon rank={toRank} sizeClass="text-3xl" animated />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-extrabold text-base leading-tight">{headline}</p>
            <p className="text-sm opacity-90 mt-0.5">
              {toast.fromRankName} → {toast.toRankName}
            </p>
            <p className="text-xs opacity-70 mt-0.5">{extra}</p>
          </div>
          <button
            onClick={() => setToast(null)}
            className="flex-shrink-0 opacity-60 hover:opacity-100 text-xl leading-none"
            aria-label="닫기"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
