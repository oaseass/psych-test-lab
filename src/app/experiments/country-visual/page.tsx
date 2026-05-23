"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { countryQuestions, type CountryVisualQuestion } from "@/data/games/countryGuessData";

const ROUND_COUNT = 8;
const MAX_HINTS = 3;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, "");
}

function isCorrect(input: string, q: CountryVisualQuestion): boolean {
  const n = normalize(input);
  return q.answerAliases.some((a) => normalize(a) === n);
}

const DIFF_BADGE: Record<string, { label: string; color: string }> = {
  easy:   { label: "쉬움",   color: "#10B981" },
  normal: { label: "보통",   color: "#F59E0B" },
  hard:   { label: "어려움", color: "#EF4444" },
};

export default function CountryVisualPage() {
  const [questions, setQuestions] = useState<CountryVisualQuestion[]>([]);
  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [imgError, setImgError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // 난이도 균형: easy 3 / normal 3 / hard 2
    const easy   = shuffle(countryQuestions.filter((q) => q.difficulty === "easy")).slice(0, 3);
    const normal = shuffle(countryQuestions.filter((q) => q.difficulty === "normal")).slice(0, 3);
    const hard   = shuffle(countryQuestions.filter((q) => q.difficulty === "hard")).slice(0, 2);
    setQuestions(shuffle([...easy, ...normal, ...hard]));
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <LayoutContainer>
        <div className="py-8 text-center text-gray-400 animate-pulse">로딩 중...</div>
      </LayoutContainer>
    );
  }

  const current = questions[idx];
  const diff = DIFF_BADGE[current.difficulty];
  const ptsIfCorrect = Math.max(MAX_HINTS + 1 - hintsUsed, 1);

  function submitAnswer() {
    if (!input.trim() || answered) return;
    if (isCorrect(input, current)) {
      setScore((s) => s + ptsIfCorrect);
      setAnswered("correct");
    } else {
      setAnswered("wrong");
    }
  }

  function useHint() {
    if (hintsUsed < MAX_HINTS && !answered) {
      setHintsUsed((h) => h + 1);
    }
  }

  function next() {
    setInput("");
    setHintsUsed(0);
    setAnswered(null);
    setImgError(false);
    if (idx + 1 >= questions.length) setDone(true);
    else setIdx((i) => i + 1);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") answered ? next() : submitAnswer();
  }

  if (done) {
    const max = ROUND_COUNT * (MAX_HINTS + 1);
    const pct = (score / max) * 100;
    const grade =
      pct >= 90 ? { label: "🌍 세계지리 박사!", color: "#10B981" } :
      pct >= 70 ? { label: "✈️ 여행 마니아",    color: "#6366F1" } :
      pct >= 50 ? { label: "🗺️ 평균 지리력",    color: "#F59E0B" } :
                  { label: "📚 지리 공부가 필요해요", color: "#94A3B8" };
    return (
      <LayoutContainer>
        <div className="py-12 max-w-sm mx-auto text-center">
          <div className="text-6xl mb-4">🌍</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">세계 사진 퀴즈 완료!</h2>
          <div className="text-6xl font-black my-6" style={{ color: grade.color }}>{score}점</div>
          <p className="text-sm text-gray-400 mb-1">최고 {max}점 중</p>
          <p className="text-lg font-bold mb-8" style={{ color: grade.color }}>{grade.label}</p>
          <div className="bg-gray-50 rounded-2xl p-4 mb-8 text-sm text-gray-600">
            <div className="font-bold mb-2">점수 기준</div>
            <div className="flex justify-around text-xs">
              <div><span className="font-bold text-green-600">힌트 없이 정답</span><br/>{MAX_HINTS + 1}점</div>
              <div><span className="font-bold text-yellow-600">힌트 1개 사용</span><br/>{MAX_HINTS}점</div>
              <div><span className="font-bold text-orange-500">힌트 2개 사용</span><br/>{MAX_HINTS - 1}점</div>
              <div><span className="font-bold text-gray-400">오답</span><br/>0점</div>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3.5 rounded-2xl font-bold text-white text-base"
            style={{ background: "linear-gradient(135deg,#0284C7,#38BDF8)" }}
          >
            다시 도전하기
          </button>
        </div>
      </LayoutContainer>
    );
  }

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-black text-gray-900">🌍 세계 사진 퀴즈</h1>
            <p className="text-xs text-gray-400 mt-0.5">사진을 보고 나라를 맞혀봐요</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-full">{score}점</span>
            <span className="text-sm text-gray-400">{idx + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="h-1.5 bg-gray-100 rounded-full mb-5 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${((idx + (answered ? 1 : 0)) / questions.length) * 100}%`,
              background: "linear-gradient(90deg,#0284C7,#38BDF8)",
            }}
          />
        </div>

        {/* Image card */}
        <div className="relative rounded-2xl overflow-hidden mb-4 bg-gray-100" style={{ paddingTop: "62%" }}>
          {!imgError ? (
            <Image
              src={current.imageSrc}
              alt={current.imageAlt}
              fill
              className="object-cover"
              unoptimized
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-100">
              <span className="text-5xl">🖼️</span>
              <span className="text-xs text-gray-400">이미지를 불러올 수 없습니다</span>
            </div>
          )}

          {/* Difficulty badge */}
          <div
            className="absolute top-3 left-3 text-white text-[11px] font-bold px-2.5 py-1 rounded-full"
            style={{ background: diff.color }}
          >
            {diff.label}
          </div>

          {/* Prompt type badge */}
          <div className="absolute top-3 right-3 bg-black/40 text-white text-[11px] px-2.5 py-1 rounded-full backdrop-blur-sm">
            {current.promptType === "landmark" ? "🏛 랜드마크" :
             current.promptType === "city"     ? "🏙 도시 풍경" :
             current.promptType === "food"     ? "🍽 음식" :
             current.promptType === "flag"     ? "🚩 국기" :
             current.promptType === "culture"  ? "🎭 문화" :
             current.promptType === "map"      ? "🗺 지도" :
                                                 "💴 화폐"}
          </div>

          {/* Attribution overlay */}
          <div className="absolute bottom-0 inset-x-0 px-3 py-1.5 bg-black/30 backdrop-blur-sm">
            <p className="text-[10px] text-white/70 truncate">
              📷 {current.source.attribution} · {current.source.license}
            </p>
          </div>
        </div>

        {/* Clue */}
        <p className="text-center font-bold text-gray-800 text-sm mb-4">{current.clueText}</p>

        {/* Hints */}
        {hintsUsed > 0 && (
          <div className="mb-4 space-y-2">
            {current.hints.slice(0, hintsUsed).map((hint, i) => (
              <div key={i} className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                <span className="text-amber-500 text-xs font-bold shrink-0 mt-0.5">힌트 {i + 1}</span>
                <span className="text-sm text-gray-700">{hint}</span>
              </div>
            ))}
          </div>
        )}

        {/* Answer area */}
        {!answered ? (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="나라 이름을 입력하세요"
                className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-sky-400 transition-colors"
                autoComplete="off"
                autoFocus
              />
              <button
                onClick={submitAnswer}
                disabled={!input.trim()}
                className="px-5 py-3 rounded-xl font-bold text-white disabled:opacity-40 transition-colors"
                style={{ background: "#0284C7" }}
              >
                확인
              </button>
            </div>

            <div className="flex items-center justify-between">
              <button
                onClick={useHint}
                disabled={hintsUsed >= MAX_HINTS}
                className="text-xs text-amber-600 font-bold bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full disabled:opacity-40 transition-opacity"
              >
                💡 힌트 보기 ({hintsUsed}/{MAX_HINTS})
              </button>
              <span className="text-xs text-gray-400">
                정답 시 <span className="font-bold text-sky-600">{ptsIfCorrect}점</span> 획득
              </span>
            </div>
          </div>
        ) : (
          <div>
            {/* Result */}
            <div className={`rounded-2xl p-4 mb-4 ${
              answered === "correct"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-bold text-sm ${answered === "correct" ? "text-green-700" : "text-red-600"}`}>
                  {answered === "correct" ? "🎯 정답!" : "❌ 오답"}
                </span>
                {answered === "correct" && (
                  <span className="font-black text-lg text-green-700">+{ptsIfCorrect}점</span>
                )}
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-500">정답은 </span>
                <span className="font-black text-base text-gray-900">
                  {current.countryNameKo}
                </span>
                <span className="text-sm text-gray-400 ml-1">({current.countryNameEn})</span>
              </div>
              {answered === "wrong" && input.trim() && (
                <p className="text-center text-xs text-gray-400 mt-1">
                  내 답: {input.trim()}
                </p>
              )}
            </div>
            <button
              onClick={next}
              className="w-full py-3.5 rounded-2xl font-bold text-white text-base"
              style={{ background: "linear-gradient(135deg,#0284C7,#38BDF8)" }}
            >
              {idx + 1 < questions.length ? "다음 문제 →" : "결과 보기"}
            </button>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
