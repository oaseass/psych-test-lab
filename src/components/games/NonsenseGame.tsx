"use client";
import { useState } from "react";
import type { NonsenseSet, NonsenseQuestion } from "@/data/games/nonsenseData";

type Props = {
  data: NonsenseSet;
};

export default function NonsenseGame({ data }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const q: NonsenseQuestion = data.questions[currentIdx];
  const total = data.questions.length;

  function handleReveal() {
    setRevealed(true);
  }

  function handleNext() {
    if (currentIdx + 1 < total) {
      setCurrentIdx(currentIdx + 1);
      setRevealed(false);
    } else {
      setDone(true);
    }
  }

  function handleRetry() {
    setCurrentIdx(0);
    setRevealed(false);
    setDone(false);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="text-5xl">🎉</div>
        <div className="text-xl font-bold text-gray-800">모두 풀었어요!</div>
        <p className="text-gray-500 text-sm">총 {total}개의 넌센스 퀴즈를 완료했어요</p>
        <button
          onClick={handleRetry}
          className="px-6 py-3 rounded-full text-white font-bold"
          style={{ background: data.color }}
        >
          다시 풀기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* 진행 */}
      <div className="flex items-center gap-2 w-full max-w-sm">
        <span className="text-sm text-gray-500">{currentIdx + 1} / {total}</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${((currentIdx + 1) / total) * 100}%`,
              background: data.color,
            }}
          />
        </div>
      </div>

      {/* 질문 카드 */}
      <div
        className="w-full max-w-sm rounded-2xl p-6 text-center"
        style={{ background: data.bgColor }}
      >
        <div className="text-3xl mb-3">{q.emoji}</div>
        <p className="text-lg font-bold text-gray-800">{q.question}</p>
      </div>

      {/* 정답 영역 */}
      {revealed ? (
        <div className="w-full max-w-sm flex flex-col gap-3">
          <div
            className="rounded-2xl p-5 text-center text-white"
            style={{ background: data.color }}
          >
            <div className="text-sm font-semibold opacity-80 mb-1">정답</div>
            <div className="text-xl font-black">{q.answer}</div>
          </div>
          <div className="bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-500 text-center">
            {q.explanation}
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3 rounded-xl text-white font-bold"
            style={{ background: data.color }}
          >
            {currentIdx + 1 < total ? "다음 문제 →" : "마치기"}
          </button>
        </div>
      ) : (
        <button
          onClick={handleReveal}
          className="w-full max-w-sm py-4 rounded-2xl text-white font-bold text-lg border-2 border-dashed"
          style={{
            borderColor: data.color,
            color: data.color,
            background: "transparent",
          }}
        >
          👆 정답 확인하기
        </button>
      )}
    </div>
  );
}
