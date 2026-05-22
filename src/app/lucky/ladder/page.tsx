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
  getLadderJackpotCount, incrementLadderJackpot,
} from "@/lib/lucky/luckyPointService";
import type { UserProfile } from "@/lib/user/types";
import type { LuckyPlayResult } from "@/lib/lucky/luckyPointService";

type LadderMode = "safe" | "challenge" | "jackpot";
const MODES: { value: LadderMode; label: string; prob: number; multiplier: number; color: string; desc: string }[] = [
  { value: "safe", label: "안전 사다리", prob: 50, multiplier: 2, color: "#2563EB", desc: "성공 50% · 2배 보상" },
  { value: "challenge", label: "도전 사다리", prob: 33, multiplier: 3, color: "#7C3AED", desc: "성공 33% · 3배 보상" },
  { value: "jackpot", label: "대박 사다리", prob: 20, multiplier: 5, color: "#DC2626", desc: "성공 20% · 5배 보상 · 하루 3회" },
];

// 사다리 시각화 (4열, 6행)
const COLS = 4;
const ROWS = 6;
function buildLadder(winCol: number): { hasRung: boolean[][] } {
  const rungs: boolean[][] = Array.from({ length: ROWS }, () => Array(COLS - 1).fill(false));
  for (let r = 0; r < ROWS; r++) {
    let prev = false;
    for (let c = 0; c < COLS - 1; c++) {
      if (!prev && Math.random() < 0.5) { rungs[r][c] = true; prev = true; }
      else prev = false;
    }
  }
  // 승리 경로 보정 — 시작 winCol에서 도착 winCol(인덱스 0)으로 연결되도록 확률 조정만
  return { hasRung: rungs };
}

type Phase = "select" | "animating" | "result";

function LadderSVG({
  startCol,
  winCol,
  animating,
}: {
  startCol: number | null;
  winCol: number;
  animating: boolean;
}) {
  const W = 280;
  const H = 220;
  const colW = W / (COLS + 1);
  const rowH = H / (ROWS + 1);
  const cols = Array.from({ length: COLS }, (_, i) => (i + 1) * colW);
  // 간단 가로 막대 (static)
  const rungs: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let r = 1; r <= ROWS; r++) {
    for (let c = 0; c < COLS - 1; c++) {
      if (Math.random() < 0.45) {
        rungs.push({ x1: cols[c], y1: r * rowH, x2: cols[c + 1], y2: r * rowH });
      }
    }
  }

  return (
    <svg width={W} height={H} className="mx-auto">
      {/* 세로선 */}
      {cols.map((x, i) => (
        <line key={i} x1={x} y1={rowH * 0.5} x2={x} y2={H - rowH * 0.5} stroke="#D1D5DB" strokeWidth={3} strokeLinecap="round" />
      ))}
      {/* 가로 막대 */}
      {rungs.map((r, i) => (
        <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke="#9CA3AF" strokeWidth={2} />
      ))}
      {/* 출발 마커 */}
      {startCol !== null && (
        <circle cx={cols[startCol]} cy={rowH * 0.5} r={12} fill="#7C3AED" className={animating ? "animate-bounce" : ""} />
      )}
      {/* 도착 마커 */}
      <circle cx={cols[winCol]} cy={H - rowH * 0.5} r={10} fill="#10B981" />
      <text x={cols[winCol]} y={H - rowH * 0.5 + 4} textAnchor="middle" fill="white" fontSize={12} fontWeight="bold">★</text>
    </svg>
  );
}

function GameContent({ user }: { user: UserProfile }) {
  const [stake, setStake] = useState(50);
  const [mode, setMode] = useState<LadderMode>("safe");
  const [phase, setPhase] = useState<Phase>("select");
  const [startCol, setStartCol] = useState<number | null>(null);
  const [winCol] = useState(() => Math.floor(Math.random() * COLS));
  const [playResult, setPlayResult] = useState<LuckyPlayResult | null>(null);
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState<string | null>(null);

  const jackpotCount = getLadderJackpotCount(currentUser.id);

  function refreshUser() {
    const u = getCurrentUser();
    if (u?.role === "member") setCurrentUser(u);
  }

  function handleStart(col: number) {
    const v = validateStake(currentUser.id, stake);
    if (!v.ok) { setError(v.reason); return; }
    if (mode === "jackpot" && jackpotCount >= 3) {
      setError("대박 사다리는 하루 3회까지만 도전할 수 있습니다.");
      return;
    }
    setError(null);
    setStartCol(col);
    setPhase("animating");

    setTimeout(() => {
      setPhase("result");
      const modeConfig = MODES.find(m => m.value === mode)!;
      const isWin = Math.random() * 100 < modeConfig.prob;
      const detail = `${col + 1}번 출발 → ${isWin ? "성공 경로!" : "실패"} (${modeConfig.label}, ${modeConfig.multiplier}배)`;
      if (mode === "jackpot") incrementLadderJackpot(currentUser.id);
      const res = processLuckyResult(currentUser.id, "ladder", stake, isWin, modeConfig.multiplier, detail);
      setPlayResult(res);
      refreshUser();
    }, 1800);
  }

  function reset() {
    setPhase("select");
    setStartCol(null);
    setPlayResult(null);
    setError(null);
    refreshUser();
  }

  if (phase === "result" && playResult?.success && playResult.result) {
    return (
      <div className="space-y-4">
        <LadderSVG startCol={startCol} winCol={winCol} animating={false} />
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
          nextGameHref="/lucky/roulette"
          nextGameLabel="룰렛 도전 →"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">🪜</div>
        <h1 className="text-xl font-black text-gray-900">사다리 타기</h1>
        <p className="text-sm text-gray-400 mt-1">출발점을 골라 사다리를 타자!</p>
      </div>

      {/* 모드 선택 */}
      <div className="grid grid-cols-3 gap-2">
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => setMode(m.value)}
            disabled={m.value === "jackpot" && jackpotCount >= 3}
            className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-xs font-bold transition-all disabled:opacity-40 ${
              mode === m.value ? "border-current text-white" : "border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
            style={mode === m.value ? { background: m.color, borderColor: m.color } : {}}
          >
            <span>{m.label}</span>
            <span className={mode === m.value ? "opacity-80" : "text-gray-400"}>{m.desc}</span>
            {m.value === "jackpot" && <span className="text-[9px]">{jackpotCount}/3회</span>}
          </button>
        ))}
      </div>

      <StakeSelector value={stake} onChange={setStake} disabled={phase !== "select"} />
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      <LadderSVG startCol={startCol} winCol={winCol} animating={phase === "animating"} />

      {phase === "select" && (
        <div>
          <p className="text-sm font-bold text-gray-600 mb-3 text-center">출발점을 선택하세요</p>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: COLS }).map((_, i) => (
              <button
                key={i}
                onClick={() => handleStart(i)}
                className="py-3 rounded-xl font-black text-white text-lg transition-all active:scale-95 hover:shadow-md"
                style={{ background: MODES.find(m => m.value === mode)!.color }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "animating" && (
        <div className="text-center text-sm text-gray-500 animate-pulse">사다리 타는 중...</div>
      )}
    </div>
  );
}

export default function LadderPage() {
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
