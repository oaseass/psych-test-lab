"use client";
import { useState } from "react";
import type { WorldcupData, WorldcupItem } from "@/data/games/worldcupData";

type Props = {
  data: WorldcupData;
  onComplete: (winnerId: string) => void;
};

export default function WorldcupGame({ data, onComplete }: Props) {
  const [bracket, setBracket] = useState<WorldcupItem[][]>(() => {
    // 8강 기준 4쌍으로 나눔
    const items = [...data.items];
    const pairs: WorldcupItem[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push([items[i], items[i + 1]]);
    }
    return pairs;
  });
  const [currentPairIdx, setCurrentPairIdx] = useState(0);
  const [winners, setWinners] = useState<WorldcupItem[]>([]);
  const [round, setRound] = useState(data.items.length); // 8강=8, 4강=4, 결승=2
  const [selected, setSelected] = useState<string | null>(null);
  const [finalWinner, setFinalWinner] = useState<WorldcupItem | null>(null);

  const totalPairs = bracket.length;
  const currentPair = bracket[currentPairIdx];

  const roundLabel =
    round === 8 ? "8강" : round === 4 ? "4강" : round === 2 ? "결승" : `${round}강`;

  function handleSelect(item: WorldcupItem) {
    if (selected) return;
    setSelected(item.id);
    setTimeout(() => {
      const nextWinners = [...winners, item];
      if (currentPairIdx + 1 < totalPairs) {
        setCurrentPairIdx(currentPairIdx + 1);
        setWinners(nextWinners);
        setSelected(null);
      } else {
        // 현재 라운드 종료
        if (nextWinners.length === 1) {
          // 우승자 확정
          setFinalWinner(nextWinners[0]);
          onComplete(nextWinners[0].id);
        } else {
          // 다음 라운드 생성
          const newBracket: WorldcupItem[][] = [];
          for (let i = 0; i < nextWinners.length; i += 2) {
            newBracket.push([nextWinners[i], nextWinners[i + 1]]);
          }
          setBracket(newBracket);
          setCurrentPairIdx(0);
          setWinners([]);
          setRound(nextWinners.length);
          setSelected(null);
        }
      }
    }, 600);
  }

  if (finalWinner) {
    return (
      <div className="flex flex-col items-center gap-6 py-12">
        <div className="text-5xl">{finalWinner.emoji}</div>
        <div
          className="text-2xl font-bold text-white px-6 py-3 rounded-2xl"
          style={{ background: data.color }}
        >
          🏆 최종 우승!
        </div>
        <div className="text-xl font-semibold text-gray-800">{finalWinner.label}</div>
        <p className="text-gray-500 text-sm">{finalWinner.description}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 진행 상황 */}
      <div className="flex items-center gap-3">
        <span
          className="text-white text-sm font-bold px-3 py-1 rounded-full"
          style={{ background: data.color }}
        >
          {roundLabel}
        </span>
        <span className="text-gray-500 text-sm">
          {currentPairIdx + 1} / {totalPairs}
        </span>
      </div>

      <p className="text-gray-600 text-sm">더 마음에 드는 것을 선택하세요!</p>

      {/* 대결 카드 */}
      <div className="flex gap-4 w-full max-w-md">
        {currentPair.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => handleSelect(item)}
            disabled={!!selected}
            className={`flex-1 rounded-2xl p-5 flex flex-col items-center gap-3 border-2 transition-all duration-300 ${
              selected === item.id
                ? "border-purple-500 scale-105 shadow-lg"
                : selected && selected !== item.id
                ? "opacity-40 scale-95"
                : "border-gray-200 hover:border-purple-300 hover:scale-105 active:scale-95"
            }`}
            style={{
              background: selected === item.id ? "#F5F3FF" : "white",
            }}
          >
            <span className="text-4xl">{item.emoji}</span>
            <span className="font-semibold text-gray-800 text-center">{item.label}</span>
            <span className="text-xs text-gray-400 text-center">{item.description}</span>
          </button>
        ))}
      </div>

      {/* VS 뱃지 */}
      <div className="absolute pointer-events-none text-lg font-black text-gray-400 mt-20">VS</div>
    </div>
  );
}
