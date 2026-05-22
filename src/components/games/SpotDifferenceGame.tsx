"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import SpotScene from "@/components/games/SpotScene";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";
import type { SpotSceneData, DifferencePoint } from "@/data/games/spotDifferenceData";
import { getCurrentUser } from "@/lib/user/authService";
import { submitRankingScore } from "@/lib/ranking/rankingService";

type Props = {
  scene: SpotSceneData;
};

type ClickMarker = {
  x: number;
  y: number;
  correct: boolean;
};

export default function SpotDifferenceGame({ scene }: Props) {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [timeLeft, setTimeLeft] = useState(scene.timeLimit);
  const [running, setRunning] = useState(true);
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [hintId, setHintId] = useState<string | null>(null);
  const [wrongMarkers, setWrongMarkers] = useState<ClickMarker[]>([]);
  const [correctMarkers, setCorrectMarkers] = useState<Map<string, { x: number; y: number }>>(new Map());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    if (done && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      const user = getCurrentUser();
      if (user?.role === "member") {
        submitRankingScore({
          userId: user.id,
          contentId: scene.slug,
          rankingType: "time",
          clearTimeMs: (scene.timeLimit - timeLeft) * 1000,
        });
      }
    }
  }, [done, scene.slug, scene.timeLimit, timeLeft]);

  const totalDiffs = scene.differences.length;
  const foundCount = found.size;

  // Timer
  useEffect(() => {
    if (!running) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setRunning(false);
          setFailed(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, [running]);

  // Complete check
  useEffect(() => {
    if (foundCount === totalDiffs && running) {
      setRunning(false);
      setDone(true);
      clearInterval(timerRef.current!);
    }
  }, [foundCount, totalDiffs, running]);

  // Auto-clear hint
  useEffect(() => {
    if (!hintId) return;
    const t = setTimeout(() => setHintId(null), 3000);
    return () => clearTimeout(t);
  }, [hintId]);

  // Auto-clear wrong markers
  useEffect(() => {
    if (wrongMarkers.length === 0) return;
    const t = setTimeout(() => setWrongMarkers([]), 800);
    return () => clearTimeout(t);
  }, [wrongMarkers]);

  const handleSceneClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, isRight: boolean) => {
      if (!running || done || failed) return;
      if (!isRight) return; // only count clicks on "changed" (right) scene
      const rect = sceneRef.current?.getBoundingClientRect();
      if (!rect) return;

      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const pctX = (clickX / rect.width) * 100;
      const pctY = (clickY / rect.height) * 100;

      // Convert scene pixel radius to percentage
      const sceneW = 360;
      const sceneH = 240;

      let matched: DifferencePoint | null = null;
      for (const diff of scene.differences) {
        if (found.has(diff.id)) continue;
        const dx = ((pctX - diff.x) / 100) * sceneW;
        const dy = ((pctY - diff.y) / 100) * sceneH;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= diff.radius) {
          matched = diff;
          break;
        }
      }

      if (matched) {
        setFound((prev) => new Set([...prev, matched!.id]));
        setCorrectMarkers((prev) => {
          const m = new Map(prev);
          m.set(matched!.id, { x: pctX, y: pctY });
          return m;
        });
      } else {
        setWrongMarkers([{ x: pctX, y: pctY, correct: false }]);
      }
    },
    [running, done, failed, found, scene.differences]
  );

  const handleHint = () => {
    if (hintUsed) return;
    const remaining = scene.differences.filter((d) => !found.has(d.id));
    if (remaining.length === 0) return;
    setHintId(remaining[0].id);
    setHintUsed(true);
  };

  const handleRetry = () => {
    setFound(new Set());
    setTimeLeft(scene.timeLimit);
    setRunning(true);
    setDone(false);
    setFailed(false);
    setHintUsed(false);
    setHintId(null);
    setWrongMarkers([]);
    setCorrectMarkers(new Map());
  };

  const timerPct = (timeLeft / scene.timeLimit) * 100;
  const timerColor = timeLeft > 30 ? "#22C55E" : timeLeft > 10 ? "#F59E0B" : "#EF4444";

  const difficultyLabel = { easy: "쉬움", normal: "보통", hard: "어려움" }[scene.difficulty];
  const difficultyColor = { easy: "#22C55E", normal: "#F59E0B", hard: "#EF4444" }[scene.difficulty];

  // Result Screen
  if (done || failed) {
    const elapsed = scene.timeLimit - timeLeft;
    return (
      <div className="flex flex-col items-center gap-5 py-4">
        <div className="w-full rounded-3xl overflow-hidden shadow-lg" style={{ background: done ? "linear-gradient(135deg, #7C3AED, #EC4899)" : "linear-gradient(135deg, #6B7280, #374151)" }}>
          <div className="p-6 text-white text-center">
            <div className="text-5xl mb-2">{done ? "🎉" : "😢"}</div>
            <h2 className="text-2xl font-extrabold">{done ? "클리어!" : "시간 초과"}</h2>
            {done && <p className="text-sm opacity-80 mt-1">모든 차이점을 찾았어요!</p>}
          </div>
          <div className="bg-white/15 mx-4 mb-4 rounded-2xl p-4 grid grid-cols-3 gap-3 text-white text-center">
            <div>
              <p className="text-2xl font-extrabold">{foundCount}/{totalDiffs}</p>
              <p className="text-xs opacity-70">찾은 차이</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{done ? elapsed : scene.timeLimit}초</p>
              <p className="text-xs opacity-70">{done ? "걸린 시간" : "제한 시간"}</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{hintUsed ? "사용" : "미사용"}</p>
              <p className="text-xs opacity-70">힌트</p>
            </div>
          </div>
        </div>

        {/* Show answer */}
        <div className="w-full">
          <p className="text-sm text-gray-500 text-center mb-2 font-semibold">정답 위치 확인</p>
          <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
            <SpotScene sceneType={scene.sceneType} variant="changed" className="w-full" />
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {scene.differences.map((d) => (
                <circle
                  key={d.id}
                  cx={d.x}
                  cy={d.y}
                  r={(d.radius / 360) * 100}
                  fill={found.has(d.id) ? "#22C55E" : "#EF4444"}
                  fillOpacity="0.3"
                  stroke={found.has(d.id) ? "#22C55E" : "#EF4444"}
                  strokeWidth="0.4"
                />
              ))}
            </svg>
          </div>
          <div className="mt-2 flex flex-wrap gap-2 justify-center">
            {scene.differences.map((d) => (
              <span
                key={d.id}
                className="text-xs px-2 py-1 rounded-full font-semibold"
                style={{ background: found.has(d.id) ? "#DCFCE7" : "#FEE2E2", color: found.has(d.id) ? "#15803D" : "#DC2626" }}
              >
                {found.has(d.id) ? "✓" : "✗"} {d.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={handleRetry}
            className="flex-1 py-3 rounded-2xl text-white font-bold text-sm"
            style={{ background: scene.color }}
          >
            다시 도전 🔄
          </button>
        </div>

        {done && <PointRewardBanner contentId={scene.slug} reason="observation_complete" className="w-full" />}
        <NextContentRecommend currentSlug={scene.slug} title="다음 틀린그림 찾기 👇" />
      </div>
    );
  }

  // Game Screen
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg font-extrabold text-gray-800">{scene.emoji} {scene.title}</span>
          <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white" style={{ background: difficultyColor }}>
            {difficultyLabel}
          </span>
        </div>
        <div className="text-sm font-bold" style={{ color: timerColor }}>
          ⏱ {timeLeft}초
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${timerPct}%`, background: timerColor }}
          />
        </div>
        <div className="flex items-center gap-1.5">
          {scene.differences.map((d) => (
            <div
              key={d.id}
              className="w-5 h-5 rounded-full border-2 transition-all duration-300"
              style={{
                borderColor: scene.color,
                background: found.has(d.id) ? scene.color : "white",
              }}
            />
          ))}
        </div>
        <span className="text-sm font-bold text-gray-600">{foundCount}/{totalDiffs}</span>
      </div>

      {/* Hint */}
      {!hintUsed && (
        <div className="text-right">
          <button
            onClick={handleHint}
            className="text-xs text-gray-400 border border-gray-200 px-3 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
          >
            💡 힌트 (1회)
          </button>
        </div>
      )}
      {hintId && (
        <div
          className="text-center text-sm font-semibold py-2 rounded-xl"
          style={{ background: scene.bgColor, color: scene.color }}
        >
          💡 힌트: 오른쪽 그림에서 <strong>{scene.differences.find((d) => d.id === hintId)?.label}</strong>을 찾아보세요!
        </div>
      )}

      {/* Instruction */}
      <p className="text-xs text-center text-gray-400">오른쪽 그림에서 차이점을 클릭하세요!</p>

      {/* Scene comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* Original */}
        <div className="flex flex-col gap-1">
          <div className="text-center">
            <span className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full">원본</span>
          </div>
          <div className="relative w-full rounded-2xl overflow-hidden border-2 border-gray-200 shadow-sm" style={{ aspectRatio: "360/240" }}>
            <SpotScene sceneType={scene.sceneType} variant="original" className="w-full h-full" />
          </div>
        </div>

        {/* Changed — clickable */}
        <div className="flex flex-col gap-1">
          <div className="text-center">
            <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: scene.color }}>
              차이점 찾기 클릭!
            </span>
          </div>
          <div
            ref={sceneRef}
            className="relative w-full rounded-2xl overflow-hidden border-2 shadow-sm cursor-crosshair select-none"
            style={{ aspectRatio: "360/240", borderColor: scene.color }}
            onClick={(e) => handleSceneClick(e, true)}
          >
            <SpotScene sceneType={scene.sceneType} variant="changed" className="w-full h-full" />

            {/* Found markers */}
            {[...correctMarkers.entries()].map(([id, pos]) => {
              const diff = scene.differences.find((d) => d.id === id);
              return (
                <div
                  key={id}
                  className="absolute pointer-events-none animate-ping-once"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div
                    className="rounded-full border-3 border-green-500 bg-green-500/20 flex items-center justify-center"
                    style={{
                      width: `${((diff?.radius ?? 20) / 360) * 100 * 2}%`,
                      aspectRatio: "1",
                      minWidth: "32px",
                      minHeight: "32px",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>
              );
            })}

            {/* Hint highlight */}
            {hintId && (() => {
              const diff = scene.differences.find((d) => d.id === hintId);
              if (!diff) return null;
              return (
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${diff.x}%`,
                    top: `${diff.y}%`,
                    transform: "translate(-50%, -50%)",
                    animation: "pulse 0.8s ease-in-out infinite",
                  }}
                >
                  <div
                    className="rounded-full border-4 border-yellow-400 bg-yellow-200/40"
                    style={{ width: 60, height: 60 }}
                  />
                </div>
              );
            })()}

            {/* Wrong click markers */}
            {wrongMarkers.map((m, i) => (
              <div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${m.x}%`,
                  top: `${m.y}%`,
                  transform: "translate(-50%, -50%)",
                  animation: "shake 0.4s ease-in-out",
                }}
              >
                <div className="w-8 h-8 rounded-full border-3 border-red-500 bg-red-200/50 flex items-center justify-center">
                  <span className="text-red-600 font-black text-sm">✕</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Found list */}
      {foundCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {[...found].map((id) => {
            const diff = scene.differences.find((d) => d.id === id);
            return (
              <span
                key={id}
                className="text-xs px-2.5 py-1 rounded-full font-semibold text-white"
                style={{ background: scene.color }}
              >
                ✓ {diff?.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
