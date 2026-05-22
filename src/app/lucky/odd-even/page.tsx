"use client";

import { useState, useEffect, useRef } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import LuckyGuard from "@/components/lucky/LuckyGuard";
import StakeSelector from "@/components/lucky/StakeSelector";
import LuckyResultCard from "@/components/lucky/LuckyResultCard";
import LuckyNotice from "@/components/lucky/LuckyNotice";
import { getCurrentUser } from "@/lib/user/authService";
import { processLuckyResult, validateStake } from "@/lib/lucky/luckyPointService";
import type { UserProfile } from "@/lib/user/types";
import type { LuckyPlayResult } from "@/lib/lucky/luckyPointService";

type Choice = "odd" | "even";
type Phase = "select" | "rolling" | "result";

function GameContent({ user }: { user: UserProfile }) {
  const [stake, setStake] = useState(50);
  const [phase, setPhase] = useState<Phase>("select");
  const [choice, setChoice] = useState<Choice | null>(null);
  const [displayNum, setDisplayNum] = useState(1);
  const [finalNum, setFinalNum] = useState<number | null>(null);
  const [playResult, setPlayResult] = useState<LuckyPlayResult | null>(null);
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function refreshUser() {
    const u = getCurrentUser();
    if (u?.role === "member") setCurrentUser(u);
  }

  function handleChoose(c: Choice) {
    const v = validateStake(currentUser.id, stake);
    if (!v.ok) { setError(v.reason); return; }
    setError(null);
    setChoice(c);
    setPhase("rolling");

    const result = Math.floor(Math.random() * 100) + 1;
    setFinalNum(result);

    let tick = 0;
    intervalRef.current = setInterval(() => {
      setDisplayNum(Math.floor(Math.random() * 100) + 1);
      tick++;
      if (tick > 20) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayNum(result);
        setPhase("result");
        const isOdd = result % 2 !== 0;
        const isWin = (c === "odd" && isOdd) || (c === "even" && !isOdd);
        const detail = `숫자 ${result} (${isOdd ? "홀수" : "짝수"}) — ${isWin ? "정답! 2배 보상" : "틀렸습니다"}`;
        const res = processLuckyResult(currentUser.id, "odd-even", stake, isWin, 2, detail);
        setPlayResult(res);
        refreshUser();
      }
    }, 80);
  }

  function reset() {
    setPhase("select");
    setChoice(null);
    setFinalNum(null);
    setPlayResult(null);
    setError(null);
    refreshUser();
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  if (phase === "result" && playResult?.success && playResult.result) {
    return (
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
        nextGameHref="/lucky/ox"
        nextGameLabel="OX 퀴즈 도전 →"
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">🎲</div>
        <h1 className="text-xl font-black text-gray-900">홀짝</h1>
        <p className="text-sm text-gray-400 mt-1">1~100 중 홀수인지 짝수인지 맞히면 2배!</p>
      </div>

      <StakeSelector value={stake} onChange={setStake} disabled={phase !== "select"} />
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      {/* 숫자 표시 */}
      <div className="flex justify-center">
        <div
          className={`w-36 h-36 rounded-3xl flex items-center justify-center text-6xl font-black shadow-lg transition-all ${
            phase === "rolling" ? "animate-pulse bg-blue-100" : "bg-blue-50"
          } ${finalNum !== null && phase === "result" ? (finalNum % 2 !== 0 ? "bg-orange-50" : "bg-blue-50") : ""}`}
        >
          {phase === "select" ? "?" : displayNum}
        </div>
      </div>

      {phase === "result" && finalNum !== null && (
        <div className="text-center text-sm font-bold text-gray-600">
          {finalNum}는 <span className="text-blue-600">{finalNum % 2 !== 0 ? "홀수" : "짝수"}</span>입니다
        </div>
      )}

      {/* 선택 버튼 */}
      {phase === "select" && (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleChoose("odd")}
            className="flex flex-col items-center gap-2 p-5 bg-orange-50 border-2 border-orange-200 rounded-2xl hover:border-orange-400 hover:shadow-md transition-all active:scale-95"
          >
            <span className="text-4xl">1️⃣</span>
            <span className="text-lg font-black text-orange-700">홀수</span>
            <span className="text-xs text-orange-400">1, 3, 5, 7 …</span>
          </button>
          <button
            onClick={() => handleChoose("even")}
            className="flex flex-col items-center gap-2 p-5 bg-blue-50 border-2 border-blue-200 rounded-2xl hover:border-blue-400 hover:shadow-md transition-all active:scale-95"
          >
            <span className="text-4xl">2️⃣</span>
            <span className="text-lg font-black text-blue-700">짝수</span>
            <span className="text-xs text-blue-400">2, 4, 6, 8 …</span>
          </button>
        </div>
      )}

      {phase === "rolling" && (
        <div className="text-center text-sm text-gray-500 animate-pulse">숫자 뽑는 중...</div>
      )}

      {!playResult?.success && playResult && (
        <p className="text-xs text-red-500 text-center">{playResult.error}</p>
      )}
    </div>
  );
}

export default function OddEvenPage() {
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
