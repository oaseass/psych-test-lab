"use client";
import { useState, useCallback } from "react";

// 관찰력 테스트: 격자에서 다른 것 찾기
type Level = {
  gridSize: number;
  totalItems: number;
  timeLimit: number; // seconds
};

const LEVELS: Level[] = [
  { gridSize: 4, totalItems: 16, timeLimit: 15 },
  { gridSize: 5, totalItems: 25, timeLimit: 12 },
  { gridSize: 6, totalItems: 36, timeLimit: 10 },
];

// 이모지 세트 (비슷해 보이는 것들)
const EMOJI_PAIRS: [string, string][] = [
  ["🐶", "🐱"],
  ["🍎", "🍊"],
  ["⭐", "🌟"],
  ["😊", "😄"],
  ["🌸", "🌺"],
  ["🎵", "🎶"],
  ["🚗", "🚕"],
  ["🏠", "🏡"],
  ["☀️", "🌤️"],
  ["🐘", "🦏"],
];

function generateGrid(size: number): { items: string[]; oddIndex: number } {
  const pairIdx = Math.floor(Math.random() * EMOJI_PAIRS.length);
  const [main, odd] = EMOJI_PAIRS[pairIdx];
  const total = size * size;
  const oddIndex = Math.floor(Math.random() * total);
  const items = Array(total).fill(main);
  items[oddIndex] = odd;
  return { items, oddIndex };
}

export default function ObservationGame() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [grid, setGrid] = useState(() => generateGrid(LEVELS[0].gridSize));
  const [found, setFound] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);
  const totalRounds = 5;

  const level = LEVELS[Math.min(levelIdx, LEVELS.length - 1)];

  const handleClick = useCallback(
    (idx: number) => {
      if (found !== null) return;
      const isCorrect = idx === grid.oddIndex;
      setFound(isCorrect);
      if (isCorrect) setScore((s) => s + 1);
      setTimeout(() => {
        if (round < totalRounds) {
          const nextLevelIdx = Math.min(levelIdx + (isCorrect ? 1 : 0), LEVELS.length - 1);
          setLevelIdx(nextLevelIdx);
          setGrid(generateGrid(LEVELS[nextLevelIdx].gridSize));
          setRound((r) => r + 1);
          setFound(null);
        } else {
          setDone(true);
        }
      }, 1000);
    },
    [found, grid.oddIndex, round, levelIdx]
  );

  function handleRetry() {
    setLevelIdx(0);
    setScore(0);
    setRound(1);
    setGrid(generateGrid(LEVELS[0].gridSize));
    setFound(null);
    setDone(false);
  }

  if (done) {
    let grade = score >= 4 ? "🦅 독수리 눈!" : score >= 3 ? "👁️ 관찰력 우수" : "🔍 연습이 필요해요";
    return (
      <div className="flex flex-col items-center gap-6 py-10">
        <div className="text-5xl">👁️</div>
        <div className="text-xl font-bold text-gray-800">{grade}</div>
        <div className="text-4xl font-black text-purple-600">{score} / {totalRounds}</div>
        <p className="text-gray-500 text-sm">총 {totalRounds}문제 중 {score}개 발견!</p>
        <button onClick={handleRetry} className="px-6 py-3 rounded-full bg-purple-600 text-white font-bold">
          다시 도전
        </button>
      </div>
    );
  }

  const cols = level.gridSize;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex justify-between w-full max-w-sm text-sm text-gray-500">
        <span>라운드 {round} / {totalRounds}</span>
        <span>맞힌 수: {score}</span>
      </div>

      <p className="text-gray-700 font-semibold">다른 하나를 찾아보세요!</p>

      {found !== null && (
        <div className={`text-sm font-bold px-4 py-2 rounded-full ${found ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
          {found ? "✅ 정답!" : "❌ 틀렸어요!"}
        </div>
      )}

      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, maxWidth: "320px" }}
      >
        {grid.items.map((emoji, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            disabled={found !== null}
            className={`aspect-square flex items-center justify-center rounded-lg text-2xl border transition-all ${
              found !== null && idx === grid.oddIndex
                ? "bg-yellow-100 border-yellow-400 scale-110"
                : "bg-white border-gray-100 hover:bg-gray-50 active:scale-95"
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}
