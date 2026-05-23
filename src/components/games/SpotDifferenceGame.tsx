"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";
import type { SpotSceneData, ImageOverlay } from "@/data/games/spotDifferenceData";
import { getCurrentUser } from "@/lib/user/authService";
import { submitRankingScore } from "@/lib/ranking/rankingService";

type Props = { scene: SpotSceneData };

type ClickMarker = { x: number; y: number; correct: boolean };

function computeRank(usedRatio: number): { label: string; color: string } {
  if (usedRatio <= 0.4) return { label: "S", color: "text-yellow-500" };
  if (usedRatio <= 0.6) return { label: "A", color: "text-blue-500" };
  if (usedRatio <= 0.8) return { label: "B", color: "text-green-600" };
  return { label: "C", color: "text-gray-500" };
}

function OverlaySvg({ overlay, hidden }: { overlay: ImageOverlay; hidden: boolean }) {
  if (hidden) return null;
  const style: React.CSSProperties = {
    mixBlendMode: overlay.blend as React.CSSProperties["mixBlendMode"],
  };
  const cx = overlay.x;
  const cy = overlay.y;
  const hw = overlay.w / 2;
  const hh = overlay.h / 2;
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={style}
    >
      {overlay.shape === "rect" ? (
        <rect
          x={cx - hw}
          y={cy - hh}
          width={overlay.w}
          height={overlay.h}
          fill={overlay.fill}
          opacity={overlay.opacity}
        />
      ) : (
        <ellipse
          cx={cx}
          cy={cy}
          rx={hw}
          ry={hh}
          fill={overlay.fill}
          opacity={overlay.opacity}
        />
      )}
    </svg>
  );
}

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
  const imgRef = useRef<HTMLDivElement>(null);
  const hasSubmittedRef = useRef(false);

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

  // All found → done
  useEffect(() => {
    if (foundCount === totalDiffs && running) {
      clearInterval(timerRef.current!);
      setRunning(false);
      setDone(true);
    }
  }, [foundCount, totalDiffs, running]);

  // Submit ranking on done
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

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    if (!running || !imgRef.current) return;
    const rect = imgRef.current.getBoundingClientRect();
    const pctX = ((e.clientX - rect.left) / rect.width) * 100;
    const pctY = ((e.clientY - rect.top) / rect.height) * 100;

    let hit: string | null = null;
    for (const diff of scene.differences) {
      if (found.has(diff.id)) continue;
      const dx = pctX - diff.x;
      const dy = pctY - diff.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= diff.radius) { hit = diff.id; break; }
    }

    if (hit) {
      setFound((prev) => new Set(prev).add(hit!));
      setCorrectMarkers((prev) => new Map(prev).set(hit!, { x: pctX, y: pctY }));
    } else {
      const marker = { x: pctX, y: pctY, correct: false };
      setWrongMarkers((prev) => [...prev, marker]);
      setTimeout(() => setWrongMarkers((prev) => prev.filter((m) => m !== marker)), 1000);
    }
  }

  function useHint() {
    if (hintUsed || !running) return;
    const unfound = scene.differences.filter((d) => !found.has(d.id));
    if (unfound.length === 0) return;
    const pick = unfound[Math.floor(Math.random() * unfound.length)];
    setHintId(pick.id);
    setHintUsed(true);
    setTimeout(() => setHintId(null), 3000);
  }

  const timerPct = (timeLeft / scene.timeLimit) * 100;
  const usedRatio = 1 - timeLeft / scene.timeLimit;
  const rank = computeRank(usedRatio);

  // ── Image panel (shared) ────────────────────────────────────
  const imageBase = (
    <img
      src={scene.originalImage}
      alt={scene.source.originalTitle}
      className="w-full h-full object-cover"
      draggable={false}
    />
  );

  const changedPanel = (
    <div
      ref={imgRef}
      className="relative w-full overflow-hidden cursor-crosshair"
      style={{ aspectRatio: "4/3" }}
      onClick={handleClick}
    >
      {imageBase}
      {/* Overlays — visually "change" regions; hidden when found */}
      {scene.overlays.map((o) => (
        <OverlaySvg key={o.id} overlay={o} hidden={found.has(o.id)} />
      ))}
      {/* Hint ring */}
      {hintId && (() => {
        const d = scene.differences.find((d) => d.id === hintId);
        if (!d) return null;
        return (
          <div
            className="absolute border-4 border-yellow-400 rounded-full animate-ping pointer-events-none"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: `${d.radius * 2}%`,
              height: `${d.radius * 2}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })()}
      {/* Correct markers */}
      {Array.from(correctMarkers.entries()).map(([id, pos]) => (
        <div
          key={id}
          className="absolute border-4 border-green-400 rounded-full pointer-events-none"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: "8%",
            height: "8%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
      {/* Wrong markers */}
      {wrongMarkers.map((m, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 border-4 border-red-500 rounded-full pointer-events-none animate-ping"
          style={{
            left: `${m.x}%`,
            top: `${m.y}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );

  const originalPanel = (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
      {imageBase}
    </div>
  );

  // ── Result screen ───────────────────────────────────────────
  if (done || failed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-8 text-center">
        {done ? (
          <>
            <div className="text-6xl mb-2">🎉</div>
            <h2 className="text-2xl font-bold mb-1">모든 차이를 찾았어요!</h2>
            <div className={`text-5xl font-black mb-1 ${rank.color}`}>Rank {rank.label}</div>
            <p className="text-gray-500 text-sm mb-6">
              {scene.timeLimit - timeLeft}초 / {scene.timeLimit}초 사용 · {totalDiffs}개 완료
            </p>
          </>
        ) : (
          <>
            <div className="text-6xl mb-2">⏰</div>
            <h2 className="text-2xl font-bold mb-1">시간이 초과됐어요</h2>
            <p className="text-gray-500 text-sm mb-6">
              {foundCount} / {totalDiffs}개 발견
            </p>
          </>
        )}

        {/* Attribution */}
        <div className="text-xs text-gray-400 bg-gray-50 rounded-lg p-3 mb-6 text-left leading-relaxed">
          <strong>이미지 출처</strong><br />
          {scene.source.attribution}<br />
          <span className="text-gray-300">{scene.source.license} · {scene.source.provider}</span>
        </div>

        <div className="flex flex-col gap-3">
          <button
            className="w-full py-3 rounded-xl font-bold text-white"
            style={{ background: scene.color }}
            onClick={() => {
              setFound(new Set());
              setTimeLeft(scene.timeLimit);
              setRunning(true);
              setDone(false);
              setFailed(false);
              setHintUsed(false);
              setHintId(null);
              setWrongMarkers([]);
              setCorrectMarkers(new Map());
              hasSubmittedRef.current = false;
            }}
          >
            다시 도전
          </button>
          <Link href="/games/spot-difference" className="w-full py-3 rounded-xl font-bold text-center bg-gray-100 text-gray-700">
            다른 그림 선택
          </Link>
        </div>

        <div className="mt-8">
          <NextContentRecommend currentSlug={scene.slug} />
        </div>
        <PointRewardBanner contentId={scene.slug} reason="observation_complete" />
      </div>
    );
  }

  // ── Playing screen ──────────────────────────────────────────
  return (
    <div className="max-w-3xl mx-auto px-2 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{scene.emoji}</span>
          <span className="font-bold text-sm text-gray-700">{scene.title}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="font-mono font-bold text-lg tabular-nums"
            style={{ color: timeLeft < 20 ? "#ef4444" : "#374151" }}
          >
            {String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}
          </span>
          <span className="text-gray-500">{foundCount}/{totalDiffs}</span>
        </div>
      </div>

      {/* Timer bar */}
      <div className="h-1.5 bg-gray-100 rounded-full mx-2 mb-4 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${timerPct}%`,
            background: timerPct > 50 ? "#22c55e" : timerPct > 20 ? "#f59e0b" : "#ef4444",
          }}
        />
      </div>

      {/* Difference checklist */}
      <div className="flex flex-wrap gap-1.5 px-2 mb-4">
        {scene.differences.map((d) => (
          <span
            key={d.id}
            className={`text-xs px-2 py-0.5 rounded-full border transition-all ${
              found.has(d.id)
                ? "bg-green-100 border-green-300 text-green-700 line-through"
                : "bg-gray-50 border-gray-200 text-gray-500"
            }`}
          >
            {d.label}
          </span>
        ))}
      </div>

      {/* Image panels */}
      <div className="flex flex-col md:flex-row gap-3 px-2">
        <div className="flex-1">
          <p className="text-xs text-gray-400 text-center mb-1">원본</p>
          {originalPanel}
        </div>
        <div className="flex-1">
          <p className="text-xs text-gray-400 text-center mb-1">변경된 그림 (클릭)</p>
          {changedPanel}
        </div>
      </div>

      {/* Hint button */}
      <div className="text-center mt-4">
        <button
          onClick={useHint}
          disabled={hintUsed || !running}
          className="text-xs px-4 py-2 rounded-full border text-gray-500 border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {hintUsed ? "힌트 사용됨" : "💡 힌트 (1회)"}
        </button>
      </div>

      {/* Attribution footnote */}
      <p className="text-center text-xs text-gray-300 mt-6 px-4">
        {scene.source.attribution} · {scene.source.license}
      </p>
    </div>
  );
}
