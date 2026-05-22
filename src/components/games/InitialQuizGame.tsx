"use client";
import { useState, useEffect, useRef } from "react";
import type { InitialQuizData, InitialQuizQuestion } from "@/data/games/initialQuizData";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";
import { getCurrentUser } from "@/lib/user/authService";
import { submitRankingScore } from "@/lib/ranking/rankingService";

type Props = {
  data: InitialQuizData;
};

const GRADES = [
  { min: 90, label: "초성 괴물", desc: "인간이 아닙니다. 두뇌 CPU 과부하 우려.", emoji: "🧠", color: "#7C3AED" },
  { min: 75, label: "인간 자동완성", desc: "당신 덕에 주변이 편합니다.", emoji: "⚡", color: "#2563EB" },
  { min: 60, label: "초성 고수", desc: "연습하면 전설이 될 수 있어요.", emoji: "🔥", color: "#059669" },
  { min: 40, label: "눈치 빠른 사람", desc: "맥락으로 때려 맞히는 재능 있음.", emoji: "👀", color: "#D97706" },
  { min: 0,  label: "초성 초보", desc: "처음이라면 괜찮아요. 다시 해봐요!", emoji: "🌱", color: "#DC2626" },
];

function getGrade(percent: number) {
  return GRADES.find((g) => percent >= g.min) ?? GRADES[4];
}

export default function InitialQuizGame({ data }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [done, setDone] = useState(false);
  const [comboAnim, setComboAnim] = useState(false);
  const hasSubmittedRef = useRef(false);
  const total = data.questions.length;

  useEffect(() => {
    if (done && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      const user = getCurrentUser();
      if (user?.role === "member") {
        submitRankingScore({ userId: user.id, contentId: data.slug, rankingType: "score", score, correctCount: score, wrongCount: total - score });
      }
    }
  }, [done, score, total, data.slug]);

  const currentQ: InitialQuizQuestion = data.questions[currentIdx];

  function handleSelect(opt: string) {
    if (selected) return;
    setSelected(opt);
    setShowAnswer(true);
    const correct = opt === currentQ.answer;
    if (correct) {
      setScore((s) => s + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      if (newCombo >= 2) {
        setComboAnim(true);
        setTimeout(() => setComboAnim(false), 800);
      }
    } else {
      setCombo(0);
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
    setCombo(0);
    setMaxCombo(0);
    setSelected(null);
    setShowAnswer(false);
    setDone(false);
  }

  if (done) {
    const percent = Math.round((score / total) * 100);
    const grade = getGrade(percent);
    return (
      <div className="flex flex-col items-center gap-5 py-4">
        {/* Result card */}
        <div
          className="w-full rounded-3xl overflow-hidden shadow-xl"
          style={{ background: `linear-gradient(135deg, ${grade.color}, ${grade.color}bb)` }}
        >
          <div className="p-6 text-white text-center">
            <div className="text-5xl mb-2">{grade.emoji}</div>
            <h2 className="text-2xl font-extrabold">{grade.label}</h2>
            <p className="text-sm opacity-80 mt-1">{grade.desc}</p>
          </div>
          <div className="bg-white/15 mx-4 mb-4 rounded-2xl p-4 grid grid-cols-3 gap-3 text-white text-center">
            <div>
              <p className="text-2xl font-extrabold">{score}/{total}</p>
              <p className="text-xs opacity-70">정답 수</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{percent}%</p>
              <p className="text-xs opacity-70">정답률</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{maxCombo}연속</p>
              <p className="text-xs opacity-70">최고 콤보</p>
            </div>
          </div>
        </div>
        <button
          onClick={handleRetry}
          className="w-full py-3 rounded-2xl text-white font-bold text-sm"
          style={{ background: data.color }}
        >
          다시 도전하기 🔄
        </button>
        <PointRewardBanner contentId={data.slug} reason="initial_quiz_complete" className="w-full" />
        <NextContentRecommend currentSlug={data.slug} title="다음 초성퀴즈 해보기 👇" />
      </div>
    );
  }

  const progPct = ((currentIdx) / total) * 100;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Progress */}
      <div className="w-full flex items-center gap-3">
        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progPct}%`, background: data.color }}
          />
        </div>
        <span className="text-xs font-semibold text-gray-400">{currentIdx + 1}/{total}</span>
        <span className="text-sm font-extrabold" style={{ color: data.color }}>{score}점</span>
      </div>

      {/* Combo badge */}
      {combo >= 2 && (
        <div
          className={`flex items-center gap-1.5 text-white text-sm font-extrabold px-4 py-1.5 rounded-full shadow-md transition-all ${comboAnim ? "scale-110" : "scale-100"}`}
          style={{ background: "linear-gradient(90deg, #F97316, #EF4444)" }}
        >
          🔥 {combo}연속 정답!
        </div>
      )}

      {/* Initials display */}
      <div
        className="w-full rounded-3xl py-10 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${data.bgColor}, white)` }}
      >
        <div
          className="text-8xl font-black tracking-widest leading-none"
          style={{
            background: `linear-gradient(135deg, ${data.color}, #EC4899)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {currentQ.initials}
        </div>
        {currentQ.hint && (
          <p className="text-sm text-gray-400 mt-4 font-medium">💡 힌트: {currentQ.hint}</p>
        )}
        {/* Decorative */}
        <div
          className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10"
          style={{ background: data.color }}
        />
        <div
          className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-8"
          style={{ background: data.color }}
        />
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-2 w-full">
        {currentQ.options.map((opt) => {
          const isCorrect = opt === currentQ.answer;
          const isSelected = selected === opt;
          let bg = "bg-white border-gray-200 text-gray-800 hover:border-purple-300 hover:shadow-sm";
          let icon = "";
          if (showAnswer) {
            if (isCorrect) { bg = "border-green-500 text-green-700"; icon = "✅ "; }
            else if (isSelected) { bg = "border-red-400 text-red-600 bg-red-50"; icon = "❌ "; }
            else { bg = "bg-gray-50 border-gray-100 text-gray-400"; }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={!!selected}
              className={`rounded-2xl px-3 py-4 text-sm font-bold border-2 transition-all active:scale-95 ${bg}`}
              style={showAnswer && isCorrect ? { background: "#F0FDF4", borderColor: "#22C55E" } : undefined}
            >
              {icon}{opt}
            </button>
          );
        })}
      </div>

      {/* Feedback & Next */}
      {showAnswer && (
        <>
          <div
            className={`w-full rounded-2xl p-3.5 text-center text-sm font-bold ${
              selected === currentQ.answer
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {selected === currentQ.answer
              ? `✅ 정답! ${combo >= 3 ? `🔥 ${combo}연속!` : ""}` 
              : `❌ 정답은 「${currentQ.answer}」`}
          </div>
          <button
            onClick={handleNext}
            className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm shadow-sm active:scale-95 transition-all"
            style={{ background: data.color }}
          >
            {currentIdx + 1 < total ? "다음 문제 →" : "결과 보기 🎯"}
          </button>
        </>
      )}
    </div>
  );
}
