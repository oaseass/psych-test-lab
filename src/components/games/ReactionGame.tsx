"use client";
import { useState, useRef, useCallback, useEffect } from "react";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";
import BenchmarkRankCard from "@/components/results/BenchmarkRankCard";
import { getReactionTimeRank, REACTION_TIERS } from "@/lib/benchmarks/reactionTimeBenchmark";
import { getCurrentUser } from "@/lib/user/authService";
import { submitRankingScore } from "@/lib/ranking/rankingService";

type Phase = "idle" | "waiting" | "ready" | "done";

export default function ReactionGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [times, setTimes] = useState<number[]>([]);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [isTooEarly, setIsTooEarly] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startTimeRef = useRef<number>(0);
  const round = times.length + 1;
  const maxRounds = 5;

  const startRound = useCallback(() => {
    setIsTooEarly(false);
    setCurrentTime(null);
    setPhase("waiting");
    const delay = 1500 + Math.random() * 3000;
    timerRef.current = setTimeout(() => {
      setPhase("ready");
      startTimeRef.current = Date.now();
    }, delay);
  }, []);

  function handleClick() {
    if (phase === "idle") {
      startRound();
    } else if (phase === "waiting") {
      // 너무 빨리 클릭
      if (timerRef.current) clearTimeout(timerRef.current);
      setIsTooEarly(true);
      setPhase("idle");
    } else if (phase === "ready") {
      const elapsed = Date.now() - startTimeRef.current;
      setCurrentTime(elapsed);
      setPhase("done");
    } else if (phase === "done") {
      if (round <= maxRounds) {
        const newTimes = [...times, currentTime!];
        setTimes(newTimes);
        if (newTimes.length >= maxRounds) {
          // 끝
          setPhase("idle");
        } else {
          startRound();
        }
      }
    }
  }

  function handleRetry() {
    setTimes([]);
    setCurrentTime(null);
    setPhase("idle");
    setIsTooEarly(false);
  }

  const avgTime =
    times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : null;

  const isDone = times.length >= maxRounds && phase === "idle";

  // 랭킹 등록 (회원만)
  const hasSubmittedRef = useRef(false);
  useEffect(() => {
    if (isDone && avgTime !== null && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      const user = getCurrentUser();
      if (user?.role === "member") {
        submitRankingScore({ userId: user.id, contentId: "reaction", rankingType: "time", clearTimeMs: avgTime });
      }
    }
  }, [isDone, avgTime]);

  function getGrade(ms: number) {
    if (ms < 200) return "🚀 초인적 반응속도!";
    if (ms < 250) return "⚡ 매우 빠름!";
    if (ms < 300) return "🎯 빠른 편";
    if (ms < 350) return "👍 평균";
    if (ms < 400) return "🐢 조금 느린 편";
    return "😴 느려요";
  }

  if (isDone && avgTime !== null) {
    const rank = getReactionTimeRank(avgTime);
    const B_MEDIAN = 273;
    const B_AVG = 250;
    const B_PRO = 150;
    const B_ELITE = 120;

    const tierTable = REACTION_TIERS.map((t) => ({
      tier: t.tier,
      range: t.maxMs === Infinity ? `${t.minMs}ms~` : `${t.minMs}~${t.maxMs}ms`,
      label: t.label,
      color: t.color,
      bgColor: t.bgColor,
      isCurrentTier: t.tier === rank.tier,
    }));

    const comparisons = [
      {
        label: `Human Benchmark 중앙값 (${B_MEDIAN}ms)보다`,
        delta: rank.deltaFromHumanBenchmarkMedian,
        unit: "ms",
        lowerIsBetter: true,
      },
      {
        label: `일반 평균 (${B_AVG}ms)보다`,
        delta: rank.deltaFromGeneralAverage,
        unit: "ms",
        lowerIsBetter: true,
      },
      {
        label: `프로게이머권 기준 (${B_PRO}ms)까지`,
        delta: rank.deltaFromProGamerReference,
        unit: "ms",
        lowerIsBetter: true,
      },
      {
        label: `SSS 인간 한계권 (${B_ELITE}ms)까지`,
        delta: rank.deltaFromEliteReference,
        unit: "ms",
        lowerIsBetter: true,
      },
    ];

    return (
      <div className="flex flex-col gap-6 py-4">
        <BenchmarkRankCard
          value={avgTime}
          unit="ms"
          tier={rank.tier}
          tierColor={rank.tierInfo.color}
          tierBgColor={rank.tierInfo.bgColor}
          label={rank.label}
          score={rank.score}
          scoreLabel={rank.scoreLabel}
          roastLine={rank.roastLine}
          comparisons={comparisons}
          tierTable={tierTable}
          caution={rank.caution}
          shareText={rank.shareText}
        />

        {/* 회차별 기록 */}
        <div className="bg-white rounded-2xl border border-gray-100 px-4 py-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">회차별 기록</p>
          <div className="flex flex-col gap-1">
            {times.map((t, i) => (
              <div key={i} className="flex justify-between text-sm text-gray-600 px-1">
                <span className="text-gray-400">{i + 1}회차</span>
                <span className="font-semibold">{t}ms</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleRetry}
          className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-sm"
        >
          다시 측정
        </button>
        <PointRewardBanner contentId="reaction" reason="reaction_complete" className="w-full" />
        <NextContentRecommend currentSlug="reaction" title="다음에 이거 해보요 👇" />
      </div>
    );
  }

  const bgColor =
    phase === "waiting"
      ? "#EF4444"
      : phase === "ready"
      ? "#10B981"
      : "#7C3AED";

  const label =
    phase === "idle"
      ? times.length === 0
        ? "시작하기"
        : `${round}번째 도전`
      : phase === "waiting"
      ? "기다리세요..."
      : phase === "ready"
      ? "지금 누르세요!"
      : `${currentTime}ms — 다음 →`;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <p className="text-sm text-gray-500">
          {times.length} / {maxRounds} 완료
        </p>
        {avgTime !== null && times.length < maxRounds && (
          <p className="text-xs text-purple-500">현재 평균: {avgTime}ms</p>
        )}
      </div>

      {isTooEarly && (
        <div className="bg-red-50 text-red-600 text-sm font-semibold px-4 py-2 rounded-full">
          너무 빨리 눌렀어요! 초록불 때 눌러주세요
        </div>
      )}

      <p className="text-gray-600 text-sm text-center">
        화면이 <span className="text-green-600 font-bold">초록색</span>으로 변하면 빠르게 누르세요!
      </p>

      <button
        onClick={handleClick}
        className="w-64 h-64 rounded-3xl text-white font-black text-xl shadow-lg active:scale-95 transition-all"
        style={{ background: bgColor }}
      >
        {label}
      </button>
    </div>
  );
}
