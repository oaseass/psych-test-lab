"use client";

import { useState, useEffect, useRef } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import LuckyGuard from "@/components/lucky/LuckyGuard";
import StakeSelector from "@/components/lucky/StakeSelector";
import LuckyResultCard from "@/components/lucky/LuckyResultCard";
import LuckyNotice from "@/components/lucky/LuckyNotice";
import { getCurrentUser } from "@/lib/user/authService";
import { processLuckyResult, validateStake, canUseRouletteGold, markRouletteGoldUsed } from "@/lib/lucky/luckyPointService";
import type { UserProfile } from "@/lib/user/types";
import type { LuckyPlayResult } from "@/lib/lucky/luckyPointService";

type ColorChoice = "red" | "blue" | "green" | "gold";

const SEGMENTS = [
  { value: "red", label: "빨강", color: "#EF4444", multiplier: 2, prob: 40 },
  { value: "blue", label: "파랑", color: "#3B82F6", multiplier: 2, prob: 35 },
  { value: "green", label: "초록", color: "#10B981", multiplier: 4, prob: 20 },
  { value: "gold", label: "골드", color: "#F59E0B", multiplier: 10, prob: 5 },
];

function getRandomResult(canGold: boolean): typeof SEGMENTS[0] {
  let pool = canGold ? SEGMENTS : SEGMENTS.filter(s => s.value !== "gold");
  if (!canGold) {
    // redistribute gold prob to others
    const total = pool.reduce((a, s) => a + s.prob, 0) + 5;
    const extra = 5 / pool.length;
    pool = pool.map(s => ({ ...s, prob: s.prob + extra }));
  }
  const r = Math.random() * 100;
  let acc = 0;
  for (const seg of pool) {
    acc += seg.prob;
    if (r < acc) return seg;
  }
  return pool[0];
}

type Phase = "select" | "spinning" | "result";

function RouletteWheel({ spinning, resultColor }: { spinning: boolean; resultColor: string | null }) {
  const deg = spinning ? 1440 : resultColor ? 720 : 0;
  return (
    <div className="flex justify-center my-4">
      <div
        className="w-48 h-48 rounded-full border-4 border-white shadow-xl flex items-center justify-center relative overflow-hidden transition-all"
        style={{
          background: `conic-gradient(#EF4444 0% 40%, #3B82F6 40% 75%, #10B981 75% 95%, #F59E0B 95% 100%)`,
          transform: spinning ? `rotate(${deg}deg)` : "rotate(0deg)",
          transition: spinning ? "transform 2s cubic-bezier(0.17,0.67,0.12,0.99)" : "transform 0.3s",
        }}
      >
        {!spinning && resultColor && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ background: resultColor + "CC" }}
          >
            <span className="text-4xl">⭐</span>
          </div>
        )}
      </div>
    </div>
  );
}

function GameContent({ user }: { user: UserProfile }) {
  const [stake, setStake] = useState(50);
  const [choice, setChoice] = useState<ColorChoice>("red");
  const [phase, setPhase] = useState<Phase>("select");
  const [resultSegment, setResultSegment] = useState<typeof SEGMENTS[0] | null>(null);
  const [playResult, setPlayResult] = useState<LuckyPlayResult | null>(null);
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState<string | null>(null);
  const canGold = canUseRouletteGold(currentUser.id);

  function refreshUser() {
    const u = getCurrentUser();
    if (u?.role === "member") setCurrentUser(u);
  }

  function handleSpin() {
    const v = validateStake(currentUser.id, stake);
    if (!v.ok) { setError(v.reason); return; }
    setError(null);
    setPhase("spinning");

    const seg = getRandomResult(canGold);
    setResultSegment(seg);

    setTimeout(() => {
      setPhase("result");
      if (seg.value === "gold") markRouletteGoldUsed(currentUser.id);
      const isWin = seg.value === choice;
      const detail = `${SEGMENTS.find(s => s.value === choice)?.label} 선택 → ${seg.label} 당첨 (${isWin ? `${seg.multiplier}배 보상` : "실패"})`;
      const res = processLuckyResult(currentUser.id, "roulette", stake, isWin, seg.multiplier, detail);
      setPlayResult(res);
      refreshUser();
    }, 2200);
  }

  function reset() {
    setPhase("select");
    setResultSegment(null);
    setPlayResult(null);
    setError(null);
    refreshUser();
  }

  if (phase === "result" && playResult?.success && playResult.result) {
    return (
      <div className="space-y-4">
        <RouletteWheel spinning={false} resultColor={resultSegment?.color ?? null} />
        <div className="text-center">
          <div className="text-2xl font-black" style={{ color: resultSegment?.color }}>
            {resultSegment?.label} 당첨!
          </div>
          {resultSegment && (
            <div className="text-sm text-gray-500">{resultSegment.multiplier}배 구간</div>
          )}
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
          nextGameHref="/lucky/box"
          nextGameLabel="보물상자 도전 →"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">🎡</div>
        <h1 className="text-xl font-black text-gray-900">행운 룰렛</h1>
        <p className="text-sm text-gray-400 mt-1">색상을 골라 룰렛을 돌려라!</p>
      </div>

      <RouletteWheel spinning={phase === "spinning"} resultColor={null} />

      {/* 색상 선택 */}
      <div className="grid grid-cols-4 gap-2">
        {SEGMENTS.map((seg) => (
          <button
            key={seg.value}
            onClick={() => setChoice(seg.value as ColorChoice)}
            disabled={seg.value === "gold" && !canGold || phase !== "select"}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all disabled:opacity-40 ${
              choice === seg.value ? "border-current shadow-md scale-105" : "border-gray-200 hover:border-gray-300"
            }`}
            style={choice === seg.value ? { borderColor: seg.color, background: seg.color + "15" } : {}}
          >
            <div className="w-6 h-6 rounded-full" style={{ background: seg.color }} />
            <span className="text-[10px] font-bold text-gray-700">{seg.label}</span>
            <span className="text-[10px] text-gray-500">{seg.multiplier}배</span>
            {seg.value === "gold" && !canGold && (
              <span className="text-[8px] text-gray-400">오늘 완료</span>
            )}
          </button>
        ))}
      </div>

      <StakeSelector value={stake} onChange={setStake} disabled={phase !== "select"} />
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      {phase === "select" && (
        <button
          onClick={handleSpin}
          className="w-full py-4 rounded-2xl font-black text-white text-lg transition-all active:scale-95 hover:shadow-md"
          style={{ background: SEGMENTS.find(s => s.value === choice)?.color }}
        >
          {stake}P로 {SEGMENTS.find(s => s.value === choice)?.label} 선택 → 돌리기!
        </button>
      )}
      {phase === "spinning" && (
        <div className="text-center text-sm text-gray-500 animate-pulse">룰렛 돌아가는 중...</div>
      )}
    </div>
  );
}

export default function RoulettePage() {
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
