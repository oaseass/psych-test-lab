"use client";

import { useState, useEffect } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import LuckyGuard from "@/components/lucky/LuckyGuard";
import StakeSelector from "@/components/lucky/StakeSelector";
import LuckyResultCard from "@/components/lucky/LuckyResultCard";
import LuckyNotice from "@/components/lucky/LuckyNotice";
import { getCurrentUser } from "@/lib/user/authService";
import { processLuckyResult, validateStake } from "@/lib/lucky/luckyPointService";
import type { UserProfile } from "@/lib/user/types";
import type { LuckyPlayResult } from "@/lib/lucky/luckyPointService";

const GRID = 9; // 3x3
const BOMB_COUNT = 2;

const MULTIPLIERS = [0, 1.2, 1.5, 2, 3, 5]; // index = 안전칸 수

type CellState = "hidden" | "bomb" | "safe";
type Phase = "select" | "playing" | "stopped" | "result";

function initCells(): CellState[] {
  const cells: CellState[] = Array(GRID).fill("safe");
  const bombs = new Set<number>();
  while (bombs.size < BOMB_COUNT) bombs.add(Math.floor(Math.random() * GRID));
  bombs.forEach(i => { cells[i] = "bomb"; });
  return cells.map(() => "hidden"); // 다 숨김 상태로 시작, 실제 값은 별도
}

function GameContent({ user }: { user: UserProfile }) {
  const [stake, setStake] = useState(50);
  const [phase, setPhase] = useState<Phase>("select");
  const [cells, setCells] = useState<CellState[]>(Array(GRID).fill("hidden"));
  const [revealed, setRevealed] = useState<CellState[]>(Array(GRID).fill("hidden"));
  const [safeCount, setSafeCount] = useState(0);
  const [playResult, setPlayResult] = useState<LuckyPlayResult | null>(null);
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState<string | null>(null);

  function refreshUser() {
    const u = getCurrentUser();
    if (u?.role === "member") setCurrentUser(u);
  }

  function startGame() {
    const v = validateStake(currentUser.id, stake);
    if (!v.ok) { setError(v.reason); return; }
    setError(null);
    // 새 보드 생성
    const newCells: CellState[] = Array(GRID).fill("safe");
    const bombs = new Set<number>();
    while (bombs.size < BOMB_COUNT) bombs.add(Math.floor(Math.random() * GRID));
    bombs.forEach(i => { newCells[i] = "bomb"; });
    setCells(newCells);
    setRevealed(Array(GRID).fill("hidden"));
    setSafeCount(0);
    setPhase("playing");
  }

  function handleReveal(idx: number) {
    if (revealed[idx] !== "hidden" || phase !== "playing") return;
    const actual = cells[idx];
    const newRevealed = [...revealed];
    newRevealed[idx] = actual;
    setRevealed(newRevealed);

    if (actual === "bomb") {
      // 실패 — 모든 칸 공개
      setCells(prev => prev); // already set
      setRevealed(cells.map(c => c));
      setPhase("result");
      const detail = `폭탄 발견! ${safeCount}칸 안전 통과 후 실패`;
      const res = processLuckyResult(currentUser.id, "bomb", stake, false, 0, detail);
      setPlayResult(res);
      refreshUser();
    } else {
      const newCount = safeCount + 1;
      setSafeCount(newCount);
      if (newCount >= GRID - BOMB_COUNT) {
        // 모든 안전칸 통과
        finishSuccess(newCount, cells);
      }
    }
  }

  function finishSuccess(count: number, currentCells: CellState[]) {
    setRevealed(currentCells.map(c => c));
    setPhase("result");
    const multi = MULTIPLIERS[Math.min(count, MULTIPLIERS.length - 1)];
    const detail = `${count}칸 안전 통과! ${multi}배 보상`;
    const res = processLuckyResult(currentUser.id, "bomb", stake, true, multi, detail);
    setPlayResult(res);
    refreshUser();
  }

  function handleStop() {
    if (safeCount === 0 || phase !== "playing") return;
    setRevealed(cells.map(c => c));
    setPhase("result");
    const multi = MULTIPLIERS[Math.min(safeCount, MULTIPLIERS.length - 1)];
    const detail = `${safeCount}칸에서 멈춤! ${multi}배 보상`;
    const res = processLuckyResult(currentUser.id, "bomb", stake, true, multi, detail);
    setPlayResult(res);
    refreshUser();
  }

  function reset() {
    setPhase("select");
    setCells(Array(GRID).fill("hidden"));
    setRevealed(Array(GRID).fill("hidden"));
    setSafeCount(0);
    setPlayResult(null);
    setError(null);
    refreshUser();
  }

  const currentMultiplier = MULTIPLIERS[Math.min(safeCount, MULTIPLIERS.length - 1)];

  if (phase === "result" && playResult?.success && playResult.result) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2 mb-2">
          {revealed.map((state, i) => (
            <div
              key={i}
              className={`h-20 rounded-2xl flex items-center justify-center text-3xl transition-all ${
                state === "bomb" ? "bg-red-100 border-2 border-red-300" :
                state === "safe" ? "bg-green-50 border-2 border-green-200" :
                "bg-gray-100 border-2 border-gray-200"
              }`}
            >
              {state === "bomb" ? "💣" : state === "safe" ? "💎" : ""}
            </div>
          ))}
        </div>
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
          nextGameHref="/lucky"
          nextGameLabel="럭키존 홈"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">💣</div>
        <h1 className="text-xl font-black text-gray-900">폭탄 피하기</h1>
        <p className="text-sm text-gray-400 mt-1">안전칸을 눌러 누적 보상 획득! 폭탄은 피해야 해</p>
      </div>

      {phase === "select" && (
        <>
          <StakeSelector value={stake} onChange={setStake} />
          {error && <p className="text-xs text-red-500 text-center">{error}</p>}
          <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 text-center">
            9칸 중 폭탄 2개 · 안전칸 누를수록 배수 증가 · 언제든 멈출 수 있어요
          </div>
          <div className="grid grid-cols-5 gap-1 text-[10px] text-center mb-2">
            {[1,2,3,4,5].map(n => (
              <div key={n} className="bg-white rounded p-1 border border-gray-100">
                <div className="font-bold text-gray-700">{n}칸</div>
                <div className="text-violet-600">{MULTIPLIERS[n]}배</div>
              </div>
            ))}
          </div>
          <button
            onClick={startGame}
            className="w-full py-4 rounded-2xl font-black text-white bg-red-500 hover:bg-red-600 transition-colors active:scale-95"
          >
            {stake}P로 시작!
          </button>
        </>
      )}

      {phase === "playing" && (
        <>
          <div className="flex justify-between items-center px-2">
            <div className="text-sm font-bold text-gray-700">
              안전 {safeCount}칸 · 현재 {currentMultiplier}배
            </div>
            <div className="text-xs text-violet-600 font-bold">
              예상 획득: {Math.floor(stake * currentMultiplier)}P
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {revealed.map((state, i) => (
              <button
                key={i}
                onClick={() => handleReveal(i)}
                disabled={state !== "hidden"}
                className={`h-24 rounded-2xl text-3xl flex items-center justify-center transition-all border-2 ${
                  state === "hidden"
                    ? "bg-white border-gray-200 hover:border-violet-400 hover:shadow-md active:scale-95"
                    : state === "safe"
                    ? "bg-green-50 border-green-300"
                    : "bg-red-50 border-red-300"
                }`}
              >
                {state === "hidden" ? "?" : state === "safe" ? "💎" : "💣"}
              </button>
            ))}
          </div>
          {safeCount > 0 && (
            <button
              onClick={handleStop}
              className="w-full py-3 rounded-2xl font-black text-white bg-green-500 hover:bg-green-600 transition-colors active:scale-95 shadow-md"
            >
              🛑 {Math.floor(stake * currentMultiplier)}P 들고 멈추기!
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default function BombPage() {
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
