"use client";
import { useState } from "react";
import type { InitialQuizData, InitialQuizQuestion } from "@/data/games/initialQuizData";

type Props = {
  data: InitialQuizData;
};

export default function InitialQuizGame({ data }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [done, setDone] = useState(false);

  const currentQ: InitialQuizQuestion = data.questions[currentIdx];
  const total = data.questions.length;

  function handleSelect(opt: string) {
    if (selected) return;
    setSelected(opt);
    setShowAnswer(true);
    if (opt === currentQ.answer) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (currentIdx + 1 < total) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setDone(true);
    }
  }

  function handleRetry() {
    setCurrentIdx(0);
    setScore(0);
    setSelected(null);
    setShowAnswer(false);
    setDone(false);
  }

  if (done) {
    const percent = Math.round((score / total) * 100);
    let grade = "";
    if (percent >= 90) grade = "🏆 완벽한 초성 마스터!";
    else if (percent >= 70) grade = "🌟 꽤 잘 했어요!";
    else if (percent >= 50) grade = "👍 절반은 맞혔어요";
    else grade = "😅 다시 도전해 봐요!";

    return (
      <div className="flex flex-col items-center gap-6 py-8">
        <div className="text-5xl">{data.emoji}</div>
        <div className="text-2xl font-bold text-gray-800">{grade}</div>
        <div
          className="text-3xl font-black text-white px-8 py-4 rounded-2xl"
          style={{ background: data.color }}
        >
          {score} / {total}
        </div>
        <p className="text-gray-500 text-sm">맞힌 문제: {score}개 ({percent}%)</p>
        <button
          onClick={handleRetry}
          className="px-6 py-2 rounded-full text-sm font-semibold text-white"
          style={{ background: data.color }}
        >
          다시 도전하기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* 진행 */}
      <div className="flex justify-between w-full max-w-sm text-sm text-gray-500">
        <span>{currentIdx + 1} / {total}</span>
        <span>점수: {score}점</span>
      </div>

      {/* 초성 표시 */}
      <div
        className="w-full max-w-sm rounded-2xl py-8 text-center"
        style={{ background: data.bgColor }}
      >
        <div className="text-5xl font-black tracking-widest text-gray-800">
          {currentQ.initials}
        </div>
        {currentQ.hint && (
          <p className="text-sm text-gray-400 mt-2">힌트: {currentQ.hint}</p>
        )}
      </div>

      {/* 선택지 */}
      <div className="grid grid-cols-2 gap-2 w-full max-w-sm">
        {currentQ.options.map((opt) => {
          const isCorrect = opt === currentQ.answer;
          const isSelected = selected === opt;

          let bgClass = "bg-white border-gray-200 text-gray-800 hover:border-purple-300";
          if (showAnswer) {
            if (isCorrect) bgClass = "bg-green-500 border-green-500 text-white";
            else if (isSelected) bgClass = "bg-red-400 border-red-400 text-white";
            else bgClass = "bg-gray-100 border-gray-100 text-gray-400";
          }

          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`rounded-xl px-3 py-3 text-sm font-semibold border-2 transition-all ${bgClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {/* 정오 피드백 */}
      {showAnswer && (
        <div
          className={`w-full max-w-sm rounded-xl p-3 text-center text-sm font-semibold ${
            selected === currentQ.answer ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"
          }`}
        >
          {selected === currentQ.answer
            ? "✅ 정답이에요!"
            : `❌ 정답은 '${currentQ.answer}'`}
        </div>
      )}

      {showAnswer && (
        <button
          onClick={handleNext}
          className="w-full max-w-sm py-3 rounded-xl text-white font-bold text-sm"
          style={{ background: data.color }}
        >
          {currentIdx + 1 < total ? "다음 문제 →" : "결과 보기"}
        </button>
      )}
    </div>
  );
}
