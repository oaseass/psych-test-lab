"use client";

import { useState, useEffect } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import LuckyGuard from "@/components/lucky/LuckyGuard";
import StakeSelector from "@/components/lucky/StakeSelector";
import LuckyResultCard from "@/components/lucky/LuckyResultCard";
import LuckyNotice from "@/components/lucky/LuckyNotice";
import { getCurrentUser } from "@/lib/user/authService";
import {
  processLuckyResult, validateStake,
  canUseFreeBox, markFreeBoxUsed,
} from "@/lib/lucky/luckyPointService";
import type { UserProfile } from "@/lib/user/types";
import type { LuckyPlayResult } from "@/lib/lucky/luckyPointService";

const BOX_RESULTS = [
  { emoji: "❌", label: "꽝", multiplier: 0, prob: 40 },
  { emoji: "💰", label: "0.5배", multiplier: 0.5, prob: 25 },
  { emoji: "💎", label: "1배 (원금)", multiplier: 1, prob: 20 },
  { emoji: "🏆", label: "2배", multiplier: 2, prob: 12 },
  { emoji: "⭐", label: "5배 대박!", multiplier: 5, prob: 3 },
];

function pickBoxResult() {
  const r = Math.random() * 100;
  let acc = 0;
  for (const b of BOX_RESULTS) {
    acc += b.prob;
    if (r < acc) return b;
  }
  return BOX_RESULTS[0];
}

type Phase = "select" | "opening" | "result";

function GameContent({ user }: { user: UserProfile }) {
  const [stake, setStake] = useState(50);
  const [phase, setPhase] = useState<Phase>("select");
  const [chosen, setChosen] = useState<number | null>(null);
  const [boxResults, setBoxResults] = useState<(typeof BOX_RESULTS[0] | null)[]>(Array(5).fill(null));
  const [playResult, setPlayResult] = useState<LuckyPlayResult | null>(null);
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState<string | null>(null);
  const isFree = canUseFreeBox(currentUser.id);

  function refreshUser() {
    const u = getCurrentUser();
    if (u?.role === "member") setCurrentUser(u);
  }

  function handleChoose(idx: number) {
    const actualStake = isFree ? 0 : stake;
    if (!isFree) {
      const v = validateStake(currentUser.id, stake);
      if (!v.ok) { setError(v.reason); return; }
    }
    setError(null);
    setChosen(idx);
    setPhase("opening");

    // 결과 배정
    const result = pickBoxResult();
    const newBoxResults = Array(5).fill(null).map((_, i) => i === idx ? result : pickBoxResult());
    setBoxResults(newBoxResults);

    setTimeout(() => {
      setPhase("result");
      if (isFree) markFreeBoxUsed(currentUser.id);
      const isWin = result.multiplier > 0;
      const actualMultiplier = result.multiplier;
      const detail = `상자 ${idx + 1}번 선택 → ${result.label}${isFree ? " (무료)" : ""}`;

      if (isFree) {
        // 무료라면 포인트 증감 없이 기록만
        const freeResult: LuckyPlayResult = {
          success: true,
          result: {
            id: `free-${Date.now()}`,
            userId: currentUser.id,
            gameType: "box",
            stakePoints: 0,
            rewardPoints: 0,
            netPoints: 0,
            isWin,
            multiplier: actualMultiplier,
            detail,
            createdAt: new Date().toISOString(),
          },
          newPoints: currentUser.points,
        };
        setPlayResult(freeResult);
      } else {
        const res = processLuckyResult(currentUser.id, "box", actualStake, isWin, actualMultiplier, detail);
        setPlayResult(res);
        refreshUser();
      }
    }, 1200);
  }

  function reset() {
    setPhase("select");
    setChosen(null);
    setBoxResults(Array(5).fill(null));
    setPlayResult(null);
    setError(null);
    refreshUser();
  }

  if (phase === "result" && playResult?.success && playResult.result) {
    const chosen_result = chosen !== null ? boxResults[chosen] : null;
    return (
      <div className="space-y-4">
        <div className="flex justify-center gap-2 mb-2">
          {boxResults.map((br, i) => (
            <div
              key={i}
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl border-2 transition-all ${
                i === chosen ? "border-violet-400 bg-violet-50 shadow-md scale-110" : "border-gray-200 bg-gray-50"
              }`}
            >
              {br ? br.emoji : "📦"}
            </div>
          ))}
        </div>
        {chosen_result && (
          <div className="text-center text-lg font-black text-gray-800">
            {chosen_result.emoji} {chosen_result.label}
          </div>
        )}
        {playResult.result.stakePoints === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
            <div className="text-2xl mb-2">{chosen_result?.emoji}</div>
            <div className="font-bold text-gray-800 mb-1">오늘의 무료 보물상자!</div>
            <div className="text-sm text-gray-500">결과: {chosen_result?.label}</div>
            <button onClick={reset} className="mt-4 px-6 py-2 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-colors">
              포인트로 다시 도전
            </button>
          </div>
        ) : (
          <LuckyResultCard
            isWin={playResult.result.isWin}
            stakePoints={playResult.result.stakePoints}
            rewardPoints={playResult.result.rewardPoints}
            netPoints={playResult.result.netPoints}
            newPoints={playResult.newPoints ?? currentUser.points}
            rankUp={playResult.rankUp}
            newRankName={playResult.newRankName}
            prevRankName={playResult.prevRankName}
            detail={playResult.result.detail}
            onRetry={reset}
            nextGameHref="/lucky/bomb"
            nextGameLabel="폭탄 피하기 →"
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">📦</div>
        <h1 className="text-xl font-black text-gray-900">보물상자</h1>
        <p className="text-sm text-gray-400 mt-1">5개 중 하나를 골라라!</p>
        {isFree && (
          <div className="mt-2 inline-block text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
            🎁 오늘 무료 1회 남음
          </div>
        )}
      </div>

      {!isFree && <StakeSelector value={stake} onChange={setStake} disabled={phase !== "select"} />}
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      {/* 상자 배열 */}
      {phase === "select" && (
        <div className="flex justify-center gap-3 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleChoose(i)}
              className="w-16 h-16 rounded-2xl bg-white border-2 border-amber-200 hover:border-amber-400 hover:shadow-md transition-all active:scale-95 flex items-center justify-center text-3xl"
            >
              📦
            </button>
          ))}
        </div>
      )}

      {phase === "opening" && chosen !== null && (
        <div className="flex justify-center gap-3 flex-wrap">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all border-2 ${
                i === chosen ? "border-violet-400 bg-violet-50 animate-bounce" : "border-amber-200 bg-white"
              }`}
            >
              {i === chosen ? "✨" : "📦"}
            </div>
          ))}
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 text-center">
        꽝 40% · 0.5배 25% · 원금 20% · 2배 12% · 5배 3%
      </div>
    </div>
  );
}

export default function BoxPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    const u = getCurrentUser();
    if (u?.role === "member") setUser(u);
  }, []);
  return (
    <LuckyGuard>
      <LayoutContainer>
        {user ? <GameContent user={user} /> : <div className="py-8 text-center text-gray-400 animate-pulse">로딩 중...</div>}
        <LuckyNotice compact />
      </LayoutContainer>
    </LuckyGuard>
  );
}
