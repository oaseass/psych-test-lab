"use client";
import { useState, useEffect, useRef } from "react";
import type { InitialQuizData, InitialQuizQuestion } from "@/data/games/initialQuizData";
import { getChosung } from "@/lib/korean/chosung";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";
import { getCurrentUser } from "@/lib/user/authService";
import { submitRankingScore } from "@/lib/ranking/rankingService";

/** 공백·하이픈·특수문자 제거, 소문자 */
function normalize(s: string): string {
  return s.replace(/[\s\-_·,.]/g, "").toLowerCase();
}

function checkAnswer(input: string, q: InitialQuizQuestion): boolean {
  const n = normalize(input);
  if (normalize(q.answer) === n) return true;
  if (q.aliases?.some((a) => normalize(a) === n)) return true;
  return false;
}

/** 힌트 없이 정답 +3 / 힌트1 +2 / 힌트2+ +1 */
function getBaseScore(hintLevel: number): number {
  if (hintLevel === 0) return 3;
  if (hintLevel === 1) return 2;
  return 1;
}

const HINT_NEXT_LABEL = [
  "카테고리 힌트 보기 (-1점)",
  "글자 수 힌트 보기 (-1점)",
  "보기 4개 공개",
];

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
  const [currentIdx, setCurrentIdx]       = useState(0);
  const [score, setScore]                 = useState(0);
  const [correctCount, setCorrectCount]   = useState(0);
  const [combo, setCombo]                 = useState(0);
  const [maxCombo, setMaxCombo]           = useState(0);
  const [done, setDone]                   = useState(false);

  // 현재 문제 상태
  const [inputValue, setInputValue]       = useState("");
  const [hintLevel, setHintLevel]         = useState(0); // 0=없음 1=카테고리 2=글자수 3=4지선다
  const [submitted, setSubmitted]         = useState(false);
  const [isCorrect, setIsCorrect]         = useState(false);
  const [lastInput, setLastInput]         = useState("");
  const [questionScore, setQuestionScore] = useState(0);
  const [comboBonus, setComboBonus]       = useState(0);
  const [comboAnim, setComboAnim]         = useState(false);

  const inputRef        = useRef<HTMLInputElement>(null);
  const hasSubmittedRef = useRef(false);
  const total           = data.questions.length;
  const currentQ: InitialQuizQuestion = data.questions[currentIdx];

  // 게임 종료 시 랭킹 제출 (1회)
  useEffect(() => {
    if (done && !hasSubmittedRef.current) {
      hasSubmittedRef.current = true;
      const user = getCurrentUser();
      if (user?.role === "member") {
        submitRankingScore({
          userId: user.id,
          contentId: data.slug,
          rankingType: "score",
          score,
          correctCount,
          wrongCount: total - correctCount,
        });
      }
    }
  }, [done, score, correctCount, total, data.slug]);

  // 문제 전환 시 input 포커스
  useEffect(() => {
    if (!submitted && !done && hintLevel < 3) {
      const t = setTimeout(() => inputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [currentIdx, submitted, done, hintLevel]);

  function handleSubmit(rawInput: string) {
    if (submitted) return;
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const correct = checkAnswer(trimmed, currentQ);
    const base    = getBaseScore(hintLevel);
    const earned  = correct ? base : 0;
    let   bonus   = 0;

    if (correct) {
      const newCombo = combo + 1;
      if (newCombo === 3)      bonus = 2;
      else if (newCombo === 5) bonus = 5;
      setCombo(newCombo);
      setMaxCombo((m) => Math.max(m, newCombo));
      setCorrectCount((c) => c + 1);
      if (newCombo >= 2) {
        setComboAnim(true);
        setTimeout(() => setComboAnim(false), 800);
      }
    } else {
      setCombo(0);
    }

    setLastInput(trimmed);
    setIsCorrect(correct);
    setQuestionScore(earned);
    setComboBonus(bonus);
    setSubmitted(true);
    setScore((s) => s + earned + bonus);
  }

  function handleHint() {
    if (!submitted && hintLevel < 3) setHintLevel((h) => h + 1);
  }

  function handleNext() {
    if (currentIdx + 1 < total) {
      setCurrentIdx((i) => i + 1);
      setInputValue("");
      setHintLevel(0);
      setSubmitted(false);
      setIsCorrect(false);
      setQuestionScore(0);
      setComboBonus(0);
      setLastInput("");
    } else {
      setDone(true);
    }
  }

  function handleRetry() {
    setCurrentIdx(0);
    setScore(0);
    setCorrectCount(0);
    setCombo(0);
    setMaxCombo(0);
    setDone(false);
    setInputValue("");
    setHintLevel(0);
    setSubmitted(false);
    setIsCorrect(false);
    setQuestionScore(0);
    setComboBonus(0);
    setLastInput("");
    hasSubmittedRef.current = false;
  }

  // ─── 결과 화면 ───────────────────────────────────────
  if (done) {
    const maxScore = total * 3;
    const percent  = Math.round((score / maxScore) * 100);
    const grade    = getGrade(percent);

    return (
      <div className="flex flex-col items-center gap-5 py-4">
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
              <p className="text-2xl font-extrabold">{score}점</p>
              <p className="text-xs opacity-70">총 점수</p>
            </div>
            <div>
              <p className="text-2xl font-extrabold">{percent}%</p>
              <p className="text-xs opacity-70">달성률</p>
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

  // ─── 게임 화면 ───────────────────────────────────────
  const progPct        = (currentIdx / total) * 100;
  const displayInitials = getChosung(currentQ.answer);
  const charsCount      = displayInitials.replace(/\s/g, "").length;
  const chosungTextSize =
    charsCount <= 3  ? "text-7xl" :
    charsCount <= 5  ? "text-5xl" :
    charsCount <= 7  ? "text-4xl" :
    charsCount <= 10 ? "text-3xl" : "text-2xl";

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 진행률 */}
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

      {/* 콤보 배지 */}
      {combo >= 2 && (
        <div
          className={`flex items-center gap-1.5 text-white text-sm font-extrabold px-4 py-1.5 rounded-full shadow-md transition-all ${
            comboAnim ? "scale-110" : "scale-100"
          }`}
          style={{ background: "linear-gradient(90deg, #F97316, #EF4444)" }}
        >
          🔥 {combo}연속 정답!
        </div>
      )}

      {/* 초성 카드 */}
      <div
        className="w-full rounded-3xl py-10 text-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${data.bgColor}, white)` }}
      >
        <div
          className={`${chosungTextSize} font-black tracking-widest leading-snug`}
          style={{
            background: `linear-gradient(135deg, ${data.color}, #EC4899)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {displayInitials}
        </div>
        {/* 장식 원 */}
        <div
          className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-10"
          style={{ background: data.color }}
        />
        <div
          className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full opacity-10"
          style={{ background: data.color }}
        />
      </div>

      {/* 힌트 뱃지 */}
      {hintLevel >= 1 && (
        <div className="flex flex-wrap gap-2 w-full">
          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
            📂 카테고리: {currentQ.category}
          </span>
          {hintLevel >= 2 && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">
              🔢 {currentQ.answer.replace(/\s/g, "").length}글자
            </span>
          )}
        </div>
      )}

      {/* 텍스트 입력 (힌트3 이전, 미제출) */}
      {!submitted && hintLevel < 3 && (
        <div className="w-full flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(inputValue)}
            placeholder="정답을 입력하세요"
            className="flex-1 rounded-2xl border-2 border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-purple-400 transition-colors"
            autoComplete="off"
            autoCorrect="off"
          />
          <button
            onClick={() => handleSubmit(inputValue)}
            disabled={!inputValue.trim()}
            className="px-5 py-3 rounded-2xl text-white font-bold text-sm disabled:opacity-40 transition-all active:scale-95"
            style={{ background: data.color }}
          >
            확인
          </button>
        </div>
      )}

      {/* 힌트 버튼 (힌트3 이전, 미제출) */}
      {!submitted && hintLevel < 3 && (
        <button
          onClick={handleHint}
          className="w-full py-2.5 rounded-2xl border-2 border-dashed border-gray-200 text-gray-500 text-xs font-semibold hover:border-yellow-400 hover:text-yellow-600 transition-all"
        >
          💡 {HINT_NEXT_LABEL[hintLevel]}
        </button>
      )}

      {/* 4지선다 (힌트3, 미제출) */}
      {!submitted && hintLevel === 3 && (
        <div className="grid grid-cols-2 gap-2 w-full">
          {currentQ.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleSubmit(opt)}
              className="rounded-2xl px-3 py-4 text-sm font-bold border-2 border-gray-200 bg-white text-gray-800 hover:border-purple-300 hover:shadow-sm transition-all active:scale-95"
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* 문제별 결과 카드 */}
      {submitted && (
        <div
          className={`w-full rounded-2xl p-4 text-sm ${
            isCorrect
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-extrabold text-base">
              {isCorrect ? "✅ 정답!" : "❌ 오답"}
            </span>
            <span className="font-extrabold text-sm">
              <span style={{ color: data.color }}>+{questionScore}점</span>
              {comboBonus > 0 && (
                <span className="ml-1.5 text-orange-500 text-xs font-bold">
                  +{comboBonus} 콤보!
                </span>
              )}
            </span>
          </div>
          <div className="space-y-0.5 text-xs opacity-75">
            <p>내 입력: <span className="font-semibold opacity-100">{lastInput}</span></p>
            <p>정답: <span className="font-semibold opacity-100">{currentQ.answer}</span></p>
            <p>초성: <span className="font-semibold opacity-100">{displayInitials}</span></p>
            <p className="opacity-60">
              {`"${currentQ.answer}"는 `}
              {displayInitials.split(" ").map((w) => w.split("").join("+")).join(" / ")}
            </p>
          </div>
        </div>
      )}

      {/* 다음 버튼 */}
      {submitted && (
        <button
          onClick={handleNext}
          className="w-full py-3.5 rounded-2xl text-white font-extrabold text-sm shadow-sm active:scale-95 transition-all"
          style={{ background: data.color }}
        >
          {currentIdx + 1 < total ? "다음 문제 →" : "결과 보기 🎯"}
        </button>
      )}
    </div>
  );
}
