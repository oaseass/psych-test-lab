"use client";
import { useState } from "react";
import type { BalanceGameData, BalancePair } from "@/data/games/balanceData";
import { computeBalanceResult } from "@/data/games/balanceData";
import NextContentRecommend from "@/components/common/NextContentRecommend";

type Props = {
  data: BalanceGameData;
};

export default function BalanceGame({ data }: Props) {
  const [answers, setAnswers] = useState<Map<string, "a" | "b">>(new Map());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<"a" | "b" | null>(null);
  const [result, setResult] = useState<ReturnType<typeof computeBalanceResult> | null>(null);

  const currentPair: BalancePair = data.pairs[currentIdx];
  const totalPairs = data.pairs.length;

  function handleSelect(choice: "a" | "b") {
    if (selected) return;
    setSelected(choice);
    setTimeout(() => {
      const newAnswers = new Map(answers);
      newAnswers.set(currentPair.id, choice);
      if (currentIdx + 1 < totalPairs) {
        setAnswers(newAnswers);
        setCurrentIdx(currentIdx + 1);
        setSelected(null);
      } else {
        // 결과 계산
        setAnswers(newAnswers);
        const r = computeBalanceResult(data, newAnswers);
        setResult(r);
      }
    }, 500);
  }

  function handleRetry() {
    setAnswers(new Map());
    setCurrentIdx(0);
    setSelected(null);
    setResult(null);
  }

  if (result) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="text-5xl">{data.emoji}</div>
        <div className="text-xl font-bold text-gray-800">{result.title}</div>
        <p className="text-gray-600 text-center max-w-sm">{result.description}</p>
        <div className="w-full max-w-sm bg-gray-50 rounded-2xl p-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>A 선택</span>
            <span>B 선택</span>
          </div>
          <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-3 rounded-full bg-purple-500 transition-all"
              style={{
                width: `${
                  ([...answers.values()].filter((v) => v === "a").length / totalPairs) * 100
                }%`,
              }}
            />
          </div>
        </div>
        <button
          onClick={handleRetry}
          className="px-6 py-2 rounded-full text-sm font-semibold text-white"
          style={{ background: data.color }}
        >
          다시 하기
        </button>
        <NextContentRecommend currentSlug={data.slug} title="다음에 이거 해보요 👇" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* 진행 */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">
          {currentIdx + 1} / {totalPairs}
        </span>
        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-purple-500 rounded-full transition-all"
            style={{ width: `${((currentIdx + 1) / totalPairs) * 100}%` }}
          />
        </div>
      </div>

      {/* 질문 */}
      {currentPair.situation && (
        <p className="text-gray-500 text-sm bg-gray-50 rounded-xl px-4 py-2 text-center">
          {currentPair.situation}
        </p>
      )}

      {currentPair.question && (
        <p className="font-bold text-gray-800 text-lg text-center px-2">{currentPair.question}</p>
      )}

      {/* 선택지 */}
      <div className="flex flex-col gap-3 w-full max-w-md">
        {(["a", "b"] as const).map((choice) => {
          const optText = choice === "a" ? currentPair.optionA : currentPair.optionB;
          const optEmoji = choice === "a" ? currentPair.emojiA : currentPair.emojiB;
          const optSubtext = choice === "a" ? currentPair.subtextA : currentPair.subtextB;
          const color = choice === "a" ? "#7C3AED" : "#EC4899";
          const isSelected = selected === choice;
          const isOther = selected && selected !== choice;

          return (
            <button
              key={choice}
              onClick={() => handleSelect(choice)}
              disabled={!!selected}
              className={`w-full rounded-2xl p-5 text-left transition-all duration-300 border-2 ${
                isSelected
                  ? "scale-105 shadow-lg text-white border-transparent"
                  : isOther
                  ? "opacity-40 scale-95 border-gray-200"
                  : "border-gray-200 hover:border-purple-300 hover:shadow"
              }`}
              style={{
                background: isSelected ? color : "white",
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`text-2xl`}
                >
                  {optEmoji}
                </span>
                <div>
                  <div className={`font-bold ${isSelected ? "text-white" : "text-gray-800"}`}>
                    {optText}
                  </div>
                  {optSubtext && (
                    <div
                      className={`text-sm mt-0.5 ${isSelected ? "text-white/80" : "text-gray-400"}`}
                    >
                      {optSubtext}
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
