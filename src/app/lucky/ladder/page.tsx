"use client";

import { useState, useEffect, useRef } from "react";
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

const MODES = [
  { value: "safe" as LadderMode, label: "안전 사다리", prob: 50, multiplier: 2, color: "#2563EB", desc: "성공 50% · 2배 보상" },
  { value: "challenge" as LadderMode, label: "도전 사다리", prob: 33, multiplier: 3, color: "#7C3AED", desc: "성공 33% · 3배 보상" },
  { value: "jackpot" as LadderMode, label: "대박 사다리", prob: 20, multiplier: 5, color: "#DC2626", desc: "성공 20% · 5배 보상 · 하루 3회" },
];

const COLS = 4;
const ROWS = 6;

// SVG layout
const SVG_W = 300;
const SVG_H = 312;
const TOP_Y = 50;
const BOT_Y = 262;
const LABEL_R = 14;
const STEP_Y = (BOT_Y - TOP_Y) / (ROWS + 1);
const COL_X: number[] = [50, 116, 183, 250];
const levelY = (r: number): number => TOP_Y + r * STEP_Y;

function buildRungs(): boolean[][] {
  return Array.from({ length: ROWS }, () => {
    const row: boolean[] = Array(COLS - 1).fill(false);
    let prev = false;
    for (let c = 0; c < COLS - 1; c++) {
      if (!prev && Math.random() < 0.5) { row[c] = true; prev = true; }
      else prev = false;
    }
    return row;
  });
}

function computeTraversal(
  startCol: number,
  rungs: boolean[][],
): { waypoints: [number, number][]; endCol: number } {
  const pts: [number, number][] = [];
  let col = startCol;
  pts.push([COL_X[col], levelY(0)]);
  for (let r = 1; r <= ROWS + 1; r++) {
    const y = levelY(r);
    pts.push([COL_X[col], y]);
    if (r <= ROWS) {
      if (col < COLS - 1 && rungs[r - 1][col]) {
        col++; pts.push([COL_X[col], y]);
      } else if (col > 0 && rungs[r - 1][col - 1]) {
        col--; pts.push([COL_X[col], y]);
      }
    }
  }
  return { waypoints: pts, endCol: col };
}

type Phase = "select" | "animating" | "result";

function LadderCanvas({
  rungs, startCol, drawnPoints, endCol, phase, modeColor, isWin,
}: {
  rungs: boolean[][];
  startCol: number | null;
  drawnPoints: [number, number][];
  endCol: number | null;
  phase: Phase;
  modeColor: string;
  isWin: boolean | null;
}) {
  const curPos = drawnPoints.length > 0 ? drawnPoints[drawnPoints.length - 1] : null;
  const revealed = phase === "result" && endCol !== null && isWin !== null;

  return (
    <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full max-w-[280px] mx-auto select-none">
      {COL_X.map((x, i) => (
        <line key={i} x1={x} y1={TOP_Y} x2={x} y2={BOT_Y}
          stroke="#E5E7EB" strokeWidth={3} strokeLinecap="round" />
      ))}
      {rungs.map((row, r) =>
        row.map((has, c) =>
          has ? (
            <line key={`${r}-${c}`}
              x1={COL_X[c]} y1={levelY(r + 1)} x2={COL_X[c + 1]} y2={levelY(r + 1)}
              stroke="#D1D5DB" strokeWidth={3} strokeLinecap="round" />
          ) : null
        )
      )}
      {COL_X.map((x, i) => {
        const active = startCol === i;
        return (
          <g key={i}>
            <circle cx={x} cy={TOP_Y - 18} r={LABEL_R}
              fill={active ? modeColor : "#F3F4F6"}
              stroke={active ? modeColor : "#E5E7EB"} strokeWidth={1.5} />
            <text x={x} y={TOP_Y - 13} textAnchor="middle"
              fontSize={12} fontWeight="bold" fill={active ? "white" : "#9CA3AF"}>
              {i + 1}
            </text>
          </g>
        );
      })}
      {drawnPoints.length > 1 && (
        <polyline
          points={drawnPoints.map(([x, y]) => `${x},${y}`).join(" ")}
          fill="none" stroke={modeColor} strokeWidth={4}
          strokeLinecap="round" strokeLinejoin="round" opacity={0.9}
        />
      )}
      {curPos && phase === "animating" && (
        <>
          <circle cx={curPos[0]} cy={curPos[1]} r={16} fill={modeColor} opacity={0.18} />
          <circle cx={curPos[0]} cy={curPos[1]} r={10}
            fill={modeColor} stroke="white" strokeWidth={2.5} />
        </>
      )}
      {COL_X.map((x, i) => {
        const isEnd = revealed && i === endCol;
        return (
          <g key={i}>
            <circle cx={x} cy={BOT_Y + 18} r={LABEL_R}
              fill={isEnd ? (isWin ? "#10B981" : "#EF4444") : "#F9FAFB"}
              stroke={isEnd ? (isWin ? "#10B981" : "#EF4444") : "#E5E7EB"}
              strokeWidth={1.5} />
            <text x={x} y={BOT_Y + 23} textAnchor="middle"
              fontSize={12} fontWeight="bold"
              fill={isEnd ? "white" : "#D1D5DB"}>
              {isEnd ? (isWin ? "★" : "✗") : "?"}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function GameContent({ user }: { user: UserProfile }) {
  const [stake, setStake] = useState(50);
  const [mode, setMode] = useState<LadderMode>("safe");
  const [phase, setPhase] = useState<Phase>("select");
  const [startCol, setStartCol] = useState<number | null>(null);
  const [endCol, setEndCol] = useState<number | null>(null);
  // SSR/Client 하이드레이션 불일치 방지: 빈 rungs로 초기화 후 클라이언트에서 교체
  const [rungs, setRungs] = useState<boolean[][]>(() =>
    Array.from({ length: ROWS }, () => Array(COLS - 1).fill(false) as boolean[])
  );
  const [waypoints, setWaypoints] = useState<[number, number][]>([]);
  const [drawnPoints, setDrawnPoints] = useState<[number, number][]>([]);
  const [playResult, setPlayResult] = useState<LuckyPlayResult | null>(null);
  const [isWin, setIsWin] = useState<boolean | null>(null);
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState<string | null>(null);
  const [jackpotCount, setJackpotCount] = useState(0);

  const modeRef = useRef(mode);
  const stakeRef = useRef(stake);
  const startColRef = useRef(startCol);
  useEffect(() => { modeRef.current = mode; }, [mode]);
  useEffect(() => { stakeRef.current = stake; }, [stake]);
  useEffect(() => { startColRef.current = startCol; }, [startCol]);

  // 클라이언트에서만 랜덤 rungs 생성 (하이드레이션 이후)
  useEffect(() => { setRungs(buildRungs()); }, []);
  // 클라이언트에서만 localStorage 접근
  useEffect(() => { setJackpotCount(getLadderJackpotCount(currentUser.id)); }, [currentUser.id]);

  const modeConfig = MODES.find(m => m.value === mode)!;

  function refreshUser() {
    const u = getCurrentUser();
    if (u?.role === "member") setCurrentUser(u);
  }

  useEffect(() => {
    if (phase !== "animating" || waypoints.length === 0) return;
    let idx = 1;
    const timer = setInterval(() => {
      if (idx >= waypoints.length) {
        clearInterval(timer);
        setTimeout(() => {
          const cfg = MODES.find(m => m.value === modeRef.current)!;
          const win = Math.random() * 100 < cfg.prob;
          const detail = `${(startColRef.current ?? 0) + 1}번 출발 → ${win ? "성공!" : "실패"} (${cfg.label}, ${cfg.multiplier}배)`;
          if (modeRef.current === "jackpot") {
            incrementLadderJackpot(currentUser.id);
            setJackpotCount(getLadderJackpotCount(currentUser.id));
          }
          const res = processLuckyResult(currentUser.id, "ladder", stakeRef.current, win, cfg.multiplier, detail);
          setIsWin(win);
          setPlayResult(res);
          setPhase("result");
          refreshUser();
        }, 500);
        return;
      }
      const pt = waypoints[idx];
      setDrawnPoints(prev => [...prev, pt]);
      idx++;
    }, 260);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, waypoints]);

  function handleStart(col: number) {
    const v = validateStake(currentUser.id, stake);
    if (!v.ok) { setError(v.reason); return; }
    if (mode === "jackpot" && jackpotCount >= 3) {
      setError("대박 사다리는 하루 3회까지만 도전할 수 있습니다.");
      return;
    }
    setError(null);
    const { waypoints: pts, endCol: eCol } = computeTraversal(col, rungs);
    setStartCol(col);
    setEndCol(eCol);
    setWaypoints(pts);
    setDrawnPoints([pts[0]]);
    setPhase("animating");
  }

  function reset() {
    setPhase("select");
    setStartCol(null);
    setEndCol(null);
    setRungs(buildRungs());
    setWaypoints([]);
    setDrawnPoints([]);
    setPlayResult(null);
    setIsWin(null);
    setError(null);
    refreshUser();
    setJackpotCount(getLadderJackpotCount(currentUser.id));
  }

  if (phase === "result" && !playResult?.success) {
    return (
      <div className="space-y-4 text-center">
        <LadderCanvas
          rungs={rungs} startCol={startCol} drawnPoints={drawnPoints}
          endCol={endCol} phase={phase} modeColor={modeConfig.color} isWin={isWin}
        />
        <p className="text-sm text-red-500 font-semibold">{playResult?.error ?? "처리 중 오류가 발생했습니다."}</p>
        <button onClick={reset} className="px-6 py-2.5 rounded-xl font-bold text-white text-sm" style={{ background: modeConfig.color }}>
          다시 도전
        </button>
      </div>
    );
  }

  if (phase === "result" && playResult?.success && playResult.result) {
    return (
      <div className="space-y-4">
        <LadderCanvas
          rungs={rungs} startCol={startCol} drawnPoints={drawnPoints}
          endCol={endCol} phase={phase} modeColor={modeConfig.color} isWin={isWin}
        />
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
    <div className="space-y-5">
      <div className="text-center">
        <div className="text-4xl mb-2">🪜</div>
        <h1 className="text-xl font-black text-gray-900">사다리 타기</h1>
        <p className="text-sm text-gray-400 mt-1">출발점을 골라 사다리를 타자!</p>
      </div>

      {phase === "select" && (
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
              <span className={mode === m.value ? "opacity-80" : "text-gray-400 font-normal"}>{m.desc}</span>
              {m.value === "jackpot" && <span className="text-[9px] opacity-70">{jackpotCount}/3회</span>}
            </button>
          ))}
        </div>
      )}

      {phase === "select" && (
        <StakeSelector value={stake} onChange={setStake} disabled={false} />
      )}

      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      <LadderCanvas
        rungs={rungs} startCol={startCol} drawnPoints={drawnPoints}
        endCol={endCol} phase={phase} modeColor={modeConfig.color} isWin={isWin}
      />

      {phase === "select" && (
        <div>
          <p className="text-sm font-bold text-gray-600 mb-3 text-center">출발점을 선택하세요</p>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: COLS }).map((_, i) => (
              <button
                key={i}
                onClick={() => handleStart(i)}
                className="py-3 rounded-xl font-black text-white text-lg transition-all active:scale-95 hover:opacity-90"
                style={{ background: modeConfig.color }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase === "animating" && (
        <div className="text-center py-2">
          <span className="text-sm font-bold" style={{ color: modeConfig.color }}>
            🪜 사다리 타는 중...
          </span>
        </div>
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
        {user ? (
          <GameContent user={user} />
        ) : (
          <div className="py-8 text-center text-gray-400 animate-pulse">로딩 중...</div>
        )}
        <LuckyNotice compact />
      </LayoutContainer>
    </LuckyGuard>
  );
}
