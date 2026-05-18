"use client";

import { useState } from "react";
import type { PlayableTest } from "@/types";

type Props = {
  playable: PlayableTest;
  onComplete: (winnerId: string) => void;
};

export default function WorldcupQuestion({ playable, onComplete }: Props) {
  const items = playable.questions.map((q) => ({
    id: q.id,
    label: q.text,
    emoji: q.options[0]?.text || "🏆",
  }));

  const [bracket, setBracket] = useState<string[]>(items.map((i) => i.id));
  const [round, setRound] = useState<string[][]>(() => {
    const arr = items.map((i) => i.id);
    const pairs: string[][] = [];
    for (let i = 0; i < arr.length; i += 2) {
      pairs.push([arr[i], arr[i + 1] ?? arr[i]]);
    }
    return pairs;
  });
  const [currentPairIndex, setCurrentPairIndex] = useState(0);
  const [winners, setWinners] = useState<string[]>([]);
  const [roundNum, setRoundNum] = useState(1);

  const totalItems = items.length;
  const roundName =
    bracket.length === 2
      ? "결승"
      : bracket.length === 4
      ? "4강"
      : bracket.length === 8
      ? "8강"
      : `${bracket.length}강`;

  const currentPair = round[currentPairIndex];
  if (!currentPair) return null;

  const itemA = items.find((i) => i.id === currentPair[0]);
  const itemB = items.find((i) => i.id === currentPair[1]);

  if (!itemA || !itemB) return null;

  function pickWinner(winnerId: string) {
    const newWinners = [...winners, winnerId];

    if (currentPairIndex + 1 < round.length) {
      // 다음 대결
      setCurrentPairIndex(currentPairIndex + 1);
      setWinners(newWinners);
    } else {
      // 이번 라운드 끝
      if (newWinners.length === 1) {
        // 최종 우승자
        onComplete(newWinners[0]);
        return;
      }

      // 다음 라운드 구성
      const nextPairs: string[][] = [];
      for (let i = 0; i < newWinners.length; i += 2) {
        if (newWinners[i + 1]) {
          nextPairs.push([newWinners[i], newWinners[i + 1]]);
        } else {
          // 부전승
          nextPairs.push([newWinners[i], newWinners[i]]);
        }
      }
      setBracket(newWinners);
      setRound(nextPairs);
      setCurrentPairIndex(0);
      setWinners([]);
      setRoundNum((r) => r + 1);
    }
  }

  const totalPairs = round.length;

  return (
    <div className="w-full space-y-6">
      <div className="text-center">
        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
          🏆 {roundName} — {currentPairIndex + 1}/{totalPairs}
        </span>
        <p className="mt-2 text-sm text-gray-500">
          {playable.meta.title}
        </p>
        <p className="text-base font-semibold text-gray-800 mt-1">
          더 좋아하는 것을 선택하세요!
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* 선택지 A */}
        <button
          onClick={() => pickWinner(itemA.id)}
          type="button"
          className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-purple-600 to-indigo-500 text-white text-center transition-all duration-200 hover:from-purple-700 hover:to-indigo-600 hover:scale-[1.01] shadow-lg"
        >
          <div className="text-4xl mb-2">{itemA.emoji}</div>
          <div className="text-lg font-bold">{itemA.label}</div>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-sm font-black text-gray-400">VS</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* 선택지 B */}
        <button
          onClick={() => pickWinner(itemB.id)}
          type="button"
          className="group relative overflow-hidden rounded-2xl p-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-center transition-all duration-200 hover:from-pink-600 hover:to-rose-600 hover:scale-[1.01] shadow-lg"
        >
          <div className="text-4xl mb-2">{itemB.emoji}</div>
          <div className="text-lg font-bold">{itemB.label}</div>
        </button>
      </div>

      {/* 진행 바 */}
      <div className="space-y-1">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-500"
            style={{
              width: `${((currentPairIndex) / totalPairs) * 100}%`,
            }}
          />
        </div>
        <p className="text-xs text-center text-gray-400">
          라운드 {roundNum} | 총 {totalItems}개 중
        </p>
      </div>
    </div>
  );
}
