"use client";
import { useState, useEffect, useCallback } from "react";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";

// 기억력 테스트: 시퀀스 기억하기
const EMOJIS = ["🔴", "🟡", "🟢", "🔵", "🟣", "🟠"];

function generateSequence(length: number): number[] {
  return Array.from({ length }, () => Math.floor(Math.random() * EMOJIS.length));
}

type GameState = "idle" | "showing" | "input" | "result";

export default function MemoryGame() {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSeq, setPlayerSeq] = useState<number[]>([]);
  const [showIdx, setShowIdx] = useState(-1);
  const [gameState, setGameState] = useState<GameState>("idle");
  const [correct, setCorrect] = useState(true);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const startGame = useCallback(() => {
    const seq = generateSequence(level + 2);
    setSequence(seq);
    setPlayerSeq([]);
    setGameState("showing");
    setShowIdx(0);
  }, [level]);

  // 시퀀스 표시
  useEffect(() => {
    if (gameState !== "showing") return;
    if (showIdx < 0) return;
    if (showIdx < sequence.length) {
      const timer = setTimeout(() => {
        setShowIdx((i) => i + 1);
      }, 700);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setShowIdx(-1);
        setGameState("input");
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [gameState, showIdx, sequence.length]);

  function handleInput(emojiIdx: number) {
    if (gameState !== "input") return;
    const newSeq = [...playerSeq, emojiIdx];
    const pos = newSeq.length - 1;

    if (newSeq[pos] !== sequence[pos]) {
      // 틀림
      setCorrect(false);
      setGameState("result");
      if (score > bestScore) setBestScore(score);
      return;
    }

    if (newSeq.length === sequence.length) {
      // 성공
      setPlayerSeq([]);
      setScore((s) => s + 1);
      setLevel((l) => l + 1);
      const seq = generateSequence(level + 3);
      setSequence(seq);
      setGameState("showing");
      setShowIdx(0);
    } else {
      setPlayerSeq(newSeq);
    }
  }

  function handleRetry() {
    setLevel(1);
    setScore(0);
    setSequence([]);
    setPlayerSeq([]);
    setShowIdx(-1);
    setGameState("idle");
    setCorrect(true);
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="text-center">
        <div className="text-sm text-gray-500">레벨 {level} | 점수 {score}</div>
        {bestScore > 0 && <div className="text-xs text-purple-500">최고: {bestScore}점</div>}
      </div>

      {gameState === "idle" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-700 text-center">색깔 순서를 기억하고 그대로 눌러보세요!</p>
          <button onClick={startGame} className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold">
            시작하기
          </button>
        </div>
      )}

      {gameState === "showing" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-purple-600 font-bold animate-pulse">기억하세요!</p>
          <div className="grid grid-cols-3 gap-3">
            {EMOJIS.map((emoji, idx) => (
              <div
                key={idx}
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 transition-all duration-300 ${
                  showIdx - 1 < sequence.length && sequence[showIdx - 1] === idx
                    ? "scale-125 border-purple-500 shadow-lg bg-purple-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )}

      {gameState === "input" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-gray-700 font-semibold">
            {playerSeq.length + 1} / {sequence.length}번째를 누르세요
          </p>
          <div className="grid grid-cols-3 gap-3">
            {EMOJIS.map((emoji, idx) => (
              <button
                key={idx}
                onClick={() => handleInput(idx)}
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 border-gray-200 bg-white hover:border-purple-400 hover:scale-105 active:scale-95 transition-all"
              >
                {emoji}
              </button>
            ))}
          </div>
          <div className="flex gap-1">
            {sequence.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full ${
                  i < playerSeq.length ? "bg-purple-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {gameState === "result" && (
        <div className="flex flex-col items-center gap-4 py-6">
          <div className="text-4xl">😅</div>
          <div className="text-xl font-bold text-gray-800">
            {score > 0 ? `${score}단계 통과!` : "아깝네요!"}
          </div>
          <div className="text-3xl font-black text-purple-600">점수: {score}</div>
          <button onClick={handleRetry} className="px-6 py-3 rounded-full bg-purple-600 text-white font-bold">
            다시 도전
          </button>
          <PointRewardBanner contentId="memory" reason="memory_complete" className="w-full max-w-xs" />
          <NextContentRecommend currentSlug="memory" title="다음에 이거 해봐요 👇" />
        </div>
      )}
    </div>
  );
}
