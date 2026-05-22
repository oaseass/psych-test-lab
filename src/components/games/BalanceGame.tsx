"use client";
import { useState, useEffect, useRef } from "react";
import type { BalanceGameData, BalancePair } from "@/data/games/balanceData";
import { computeBalanceResult } from "@/data/games/balanceData";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";
import { getCurrentUser } from "@/lib/user/authService";
import { submitRankingScore } from "@/lib/ranking/rankingService";

type Props = {
  data: BalanceGameData;
};

// Simple deterministic hash → mock percentage
function mockPct(pairId: string, choice: "a" | "b"): { a: number; b: number } {
  let hash = 0;
  for (let i = 0; i < pairId.length; i++) hash = (hash * 31 + pairId.charCodeAt(i)) & 0xffff;
  const aPct = 30 + (hash % 41); // 30~70
  return { a: aPct, b: 100 - aPct };
}

function choiceLabel(pct: number): { label: string; color: string } {
  if (pct < 35) return { label: "소수파 🌊", color: "#7C3AED" };
  if (pct < 45) return { label: "독특한 선택 ✨", color: "#2563EB" };
  if (pct > 65) return { label: "다수파 🌍", color: "#059669" };
  if (pct > 55) return { label: "인기 선택 👍", color: "#D97706" };
  return { label: "팽팽한 선택 ⚖️", color: "#6B7280" };
}

const RESULT_TYPE_ICONS: Record<string, string> = {
  "안정추구형": "🏠",
  "모험선택형": "🚀",
  "감정우선형": "💖",
  "현실계산형": "🧮",
  "자존심방어형": "👑",
  "관계중심형": "🤝",
};

export default function BalanceGame({ data }: Props) {
  const [answers, setAnswers] = useState<Map<string, "a" | "b">>(new Map());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<"a" | "b" | null>(null);
  const [choiceShown, setChoiceShown] = useState<{ a: number; b: number } | null>(null);
  const [result, setResult] = useState<ReturnType<typeof computeBalanceResult> | null>(null);
  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    if (result && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      const user = getCurrentUser();
      if (user?.role === "member") {
        submitRankingScore({ userId: user.id, contentId: data.slug, rankingType: "choice_distribution", choiceId: result.title });
      }
    }
  }, [result, data.slug]);

  const currentPair: BalancePair = data.pairs[currentIdx];
  const totalPairs = data.pairs.length;
  const progPct = (currentIdx / totalPairs) * 100;

  function handleSelect(choice: "a" | "b") {
    if (selected) return;
    setSelected(choice);
    const pct = mockPct(currentPair.id, choice);
    setChoiceShown(pct);

    setTimeout(() => {
      const newAnswers = new Map(answers);
      newAnswers.set(currentPair.id, choice);
      if (currentIdx + 1 < totalPairs) {
        setAnswers(newAnswers);
        setCurrentIdx(currentIdx + 1);
        setSelected(null);
        setChoiceShown(null);
      } else {
        setAnswers(newAnswers);
        const r = computeBalanceResult(data, newAnswers);
        setResult(r);
      }
    }, 1400);
  }

  function handleRetry() {
    setAnswers(new Map());
    setCurrentIdx(0);
    setSelected(null);
    setChoiceShown(null);
    setResult(null);
  }

  if (result) {
    const aCount = [...answers.values()].filter((v) => v === "a").length;
    const aPct = Math.round((aCount / totalPairs) * 100);
    const typeIcon = RESULT_TYPE_ICONS[result.title] ?? result.emoji;
    return (
      <div className="flex flex-col items-center gap-5 py-4">
        {/* Result card */}
        <div
          className="w-full rounded-3xl overflow-hidden shadow-xl"
          style={{ background: `linear-gradient(135deg, ${data.color}, ${data.color}bb)` }}
        >
          <div className="p-6 text-white text-center">
            <div className="text-5xl mb-2">{typeIcon}</div>
            <h2 className="text-2xl font-extrabold">{result.title}</h2>
            <p className="text-sm opacity-80 mt-1.5 leading-relaxed">{result.description}</p>
          </div>
          {/* A/B ratio */}
          <div className="bg-white/15 mx-4 mb-4 rounded-2xl p-4">
            <div className="flex justify-between text-xs text-white/70 font-semibold mb-1.5">
              <span>A 선택 {aPct}%</span>
              <span>B 선택 {100 - aPct}%</span>
            </div>
            <div className="h-3 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-3 rounded-full bg-white/80 transition-all duration-700"
                style={{ width: `${aPct}%` }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleRetry}
          className="w-full py-3 rounded-2xl text-white font-extrabold text-sm shadow-sm"
          style={{ background: data.color }}
        >
          다시 하기 🔄
        </button>
        <PointRewardBanner contentId={data.slug} reason="balance_complete" className="w-full" />
        <NextContentRecommend currentSlug={data.slug} title="다른 밸런스게임 해보기 👇" />
      </div>
    );
  }

  // Selected pair's mock stat
  const choicePct = selected && choiceShown ? (selected === "a" ? choiceShown.a : choiceShown.b) : null;
  const choiceTag = choicePct ? choiceLabel(choicePct) : null;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Progress */}
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${Math.max(progPct, 4)}%`, background: data.color }}
          />
        </div>
        <span className="text-xs font-semibold text-gray-400">{currentIdx + 1}/{totalPairs}</span>
      </div>

      {/* Question */}
      {currentPair.situation && (
        <div className="w-full bg-gray-50 rounded-2xl px-4 py-3 text-sm text-gray-500 text-center font-medium border border-gray-100">
          {currentPair.situation}
        </div>
      )}
      {currentPair.question && (
        <p className="font-extrabold text-gray-900 text-lg text-center leading-snug px-2">
          {currentPair.question}
        </p>
      )}

      {/* Choice buttons */}
      <div className="flex flex-col gap-3 w-full">
        {(["a", "b"] as const).map((choice) => {
          const optText = choice === "a" ? currentPair.optionA : currentPair.optionB;
          const optEmoji = choice === "a" ? currentPair.emojiA : currentPair.emojiB;
          const optSubtext = choice === "a" ? currentPair.subtextA : currentPair.subtextB;
          const color = choice === "a" ? data.color : "#EC4899";
          const isSelected = selected === choice;
          const isOther = selected != null && selected !== choice;
          const thisPct = choiceShown ? (choice === "a" ? choiceShown.a : choiceShown.b) : null;

          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              disabled={!!selected}
              className={`w-full rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                isSelected
                  ? "border-transparent shadow-xl scale-102"
                  : isOther
                  ? "opacity-40 scale-[0.97] border-gray-100"
                  : "border-gray-100 hover:border-purple-200 hover:shadow-md active:scale-[0.98]"
              }`}
              style={{ background: isSelected ? `linear-gradient(135deg, ${color}18, ${color}30)` : "white" }}
            >
              <div className="px-5 py-4 flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: isSelected ? color + "22" : "#F9FAFB" }}
                >
                  {optEmoji}
                </div>
                <div className="flex-1 text-left">
                  <div className={`font-extrabold text-base ${isSelected ? "text-gray-900" : "text-gray-800"}`}>
                    {optText}
                  </div>
                  {optSubtext && (
                    <div className="text-xs text-gray-400 mt-0.5">{optSubtext}</div>
                  )}
                </div>
                {isSelected && (
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span
                      className="text-xs font-extrabold text-white px-2.5 py-1 rounded-full"
                      style={{ background: color }}
                    >
                      {thisPct}%
                    </span>
                  </div>
                )}
              </div>
              {/* Bar when selected */}
              {isSelected && thisPct !== null && (
                <div className="h-1.5 bg-gray-100">
                  <div
                    className="h-1.5 rounded-full transition-all duration-700"
                    style={{ width: `${thisPct}%`, background: color }}
                  />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Choice context */}
      {choiceTag && (
        <div
          className="w-full rounded-2xl py-2.5 px-4 text-center font-extrabold text-sm transition-all"
          style={{ background: choiceTag.color + "18", color: choiceTag.color }}
        >
          {choiceTag.label} — 선택한 사람의 {choicePct}%!
        </div>
      )}

      {/* VS divider */}
      {!selected && (
        <div className="flex items-center w-full gap-3 my-1">
          <div className="flex-1 h-px bg-gray-100" />
          <span className="text-sm font-black text-gray-300">VS</span>
          <div className="flex-1 h-px bg-gray-100" />
        </div>
      )}
    </div>
  );
}


