"use client";
import { useState, useEffect, useRef } from "react";
import type { WorldcupData, WorldcupItem } from "@/data/games/worldcupData";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";
import { getCurrentUser } from "@/lib/user/authService";
import { submitRankingScore } from "@/lib/ranking/rankingService";

type Props = {
  data: WorldcupData;
  onComplete: (winnerId: string) => void;
};

const ROUND_GRADIENTS: Record<string, string> = {
  "8강": "from-blue-500 to-indigo-600",
  "4강": "from-purple-500 to-pink-600",
  "결승": "from-yellow-400 to-orange-500",
};

function Confetti() {
  const pieces = Array.from({ length: 24 }, (_, i) => ({
    left: `${(i / 24) * 100}%`,
    delay: `${(i * 0.08).toFixed(2)}s`,
    color: ["#F472B6", "#FCD34D", "#34D399", "#60A5FA", "#F87171", "#A78BFA"][i % 6],
    size: 6 + (i % 4) * 2,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((p, i) => (
        <div
          key={i}
          className="absolute animate-bounce"
          style={{
            left: p.left,
            top: "-10px",
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: i % 3 === 0 ? "50%" : "2px",
            animationDelay: p.delay,
            animationDuration: "1.2s",
            opacity: 0.85,
          }}
        />
      ))}
    </div>
  );
}

export default function WorldcupGame({ data, onComplete }: Props) {
  const [bracket, setBracket] = useState<WorldcupItem[][]>(() => {
    const items = [...data.items];
    const pairs: WorldcupItem[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push([items[i], items[i + 1]]);
    }
    return pairs;
  });
  const [currentPairIdx, setCurrentPairIdx] = useState(0);
  const [winners, setWinners] = useState<WorldcupItem[]>([]);
  const [round, setRound] = useState(data.items.length);
  const [selected, setSelected] = useState<string | null>(null);
  const [finalWinner, setFinalWinner] = useState<WorldcupItem | null>(null);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    if (finalWinner && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      const user = getCurrentUser();
      if (user?.role === "member") {
        submitRankingScore({ userId: user.id, contentId: data.slug, rankingType: "worldcup_winner", worldcupWinnerId: finalWinner.id });
      }
    }
  }, [finalWinner, data.slug]);

  const totalPairs = bracket.length;
  const currentPair = bracket[currentPairIdx];
  const roundLabel =
    round === 8 ? "8강" : round === 4 ? "4강" : round === 2 ? "결승" : `${round}강`;
  const progressPct = ((currentPairIdx + (round === data.items.length ? 0 : data.items.length - round)) / (data.items.length - 1)) * 100;

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
        if (nextWinners.length === 1) {
          setFinalWinner(nextWinners[0]);
          onComplete(nextWinners[0].id);
        } else {
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

  function handleRetry() {
    const items = [...data.items];
    const pairs: WorldcupItem[][] = [];
    for (let i = 0; i < items.length; i += 2) {
      pairs.push([items[i], items[i + 1]]);
    }
    setBracket(pairs);
    setCurrentPairIdx(0);
    setWinners([]);
    setRound(data.items.length);
    setSelected(null);
    setFinalWinner(null);
  }

  if (finalWinner) {
    return (
      <div className="relative flex flex-col items-center gap-5 py-6">
        <Confetti />
        {/* Trophy card */}
        <div
          className="w-full rounded-3xl overflow-hidden shadow-xl"
          style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}cc)` }}
        >
          <div className="px-6 pt-6 pb-4 text-center text-white">
            <div className="text-6xl mb-2">{finalWinner.emoji}</div>
            <div className="text-sm font-bold opacity-70 uppercase tracking-widest mb-1">최종 우승</div>
            <h2 className="text-2xl font-extrabold">{finalWinner.label}</h2>
            <p className="text-sm opacity-80 mt-1">{finalWinner.description}</p>
          </div>
          <div className="bg-white/20 mx-4 mb-4 rounded-2xl px-5 py-3 text-white text-center">
            <p className="text-xs opacity-70">🏆 당신의 선택</p>
            <p className="font-bold mt-0.5">{data.title}에서 최고는 바로 이것!</p>
          </div>
        </div>

        <div className="flex gap-3 w-full">
          <button
            onClick={handleRetry}
            className="flex-1 py-3 rounded-2xl text-white font-bold text-sm"
            style={{ background: data.color }}
          >
            다시 하기 🔄
          </button>
        </div>
        <PointRewardBanner contentId={data.slug} reason="worldcup_complete" className="w-full" />
        <NextContentRecommend currentSlug={data.slug} title="다음 월드컵 해보기 👇" />
      </div>
    );
  }

  const gradClass = ROUND_GRADIENTS[roundLabel] ?? "from-purple-500 to-pink-500";

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Round badge + progress */}
      <div className="w-full flex items-center gap-3">
        <span
          className={`text-white text-sm font-extrabold px-4 py-1.5 rounded-full bg-gradient-to-r ${gradClass} shadow-sm`}
        >
          {roundLabel}
        </span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-2 rounded-full bg-gradient-to-r ${gradClass} transition-all duration-500`}
            style={{ width: `${Math.max(progressPct, 5)}%` }}
          />
        </div>
        <span className="text-xs text-gray-400 font-semibold">{currentPairIdx + 1}/{totalPairs}</span>
      </div>

      <p className="text-gray-500 text-sm font-semibold">더 마음에 드는 것을 선택하세요!</p>

      {/* Battle cards */}
      <div className="relative w-full flex gap-3">
        {currentPair.map((item) => {
          const isSelected = selected === item.id;
          const isOther = selected != null && selected !== item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleSelect(item)}
              disabled={!!selected}
              className={`flex-1 rounded-3xl overflow-hidden flex flex-col items-center gap-2 pb-5 pt-5 border-2 transition-all duration-300 shadow-sm ${
                isSelected
                  ? "border-transparent scale-105 shadow-2xl"
                  : isOther
                  ? "opacity-30 scale-95 border-gray-100"
                  : "border-gray-100 hover:border-purple-300 hover:-translate-y-1 hover:shadow-lg active:scale-95"
              }`}
              style={{
                background: isSelected
                  ? `linear-gradient(135deg, ${data.color}22, ${data.color}44)`
                  : "white",
                borderColor: isSelected ? data.color : undefined,
              }}
            >
              <span className="text-5xl drop-shadow">{item.emoji}</span>
              <span className="font-extrabold text-gray-800 text-center text-base leading-tight px-2">
                {item.label}
              </span>
              <span className="text-xs text-gray-400 text-center leading-relaxed px-3">
                {item.description}
              </span>
              {isSelected && (
                <span
                  className="text-xs text-white font-bold px-3 py-1 rounded-full mt-1"
                  style={{ background: data.color }}
                >
                  ✓ 선택됨
                </span>
              )}
            </button>
          );
        })}

        {/* VS badge — centered */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center text-white text-xs font-extrabold shadow-lg bg-gradient-to-br ${gradClass}`}
          >
            VS
          </div>
        </div>
      </div>
    </div>
  );
}
