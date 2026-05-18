"use client";
import { useState, useRef, useCallback } from "react";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";

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

  function getGrade(ms: number) {
    if (ms < 200) return "🚀 초인적 반응속도!";
    if (ms < 250) return "⚡ 매우 빠름!";
    if (ms < 300) return "🎯 빠른 편";
    if (ms < 350) return "👍 평균";
    if (ms < 400) return "🐢 조금 느린 편";
    return "😴 느려요";
  }

  if (isDone && avgTime !== null) {
    return (
      <div className="flex flex-col items-center gap-6 py-10">
        <div className="text-5xl">⚡</div>
        <div className="text-xl font-bold text-gray-800">{getGrade(avgTime)}</div>
        <div className="text-4xl font-black text-purple-600">{avgTime}ms</div>
        <p className="text-sm text-gray-500">평균 반응속도</p>
        <div className="flex flex-col gap-1 w-full max-w-xs">
          {times.map((t, i) => (
            <div key={i} className="flex justify-between text-sm text-gray-600 px-2">
              <span>{i + 1}회차</span>
              <span className="font-semibold">{t}ms</span>
            </div>
          ))}
        </div>
        <button onClick={handleRetry} className="px-6 py-3 rounded-full bg-purple-600 text-white font-bold">
          다시 측정
        </button>
        <PointRewardBanner contentId="reaction" reason="reaction_complete" className="w-full max-w-sm" />
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
