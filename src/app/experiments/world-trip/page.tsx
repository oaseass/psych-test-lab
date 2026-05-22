"use client";
import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type Country = {
  name: string;
  emoji: string;
  hint1: string;
  hint2: string;
  hint3: string;
  aliases: string[];
};

const COUNTRIES: Country[] = [
  { name: "프랑스", emoji: "🇫🇷", hint1: "에펠탑이 있어요", hint2: "와인과 바게트로 유명해요", hint3: "수도는 파리예요", aliases: ["불란서", "France"] },
  { name: "일본", emoji: "🇯🇵", hint1: "후지산이 있어요", hint2: "초밥과 라멘이 유명해요", hint3: "수도는 도쿄예요", aliases: ["Japan"] },
  { name: "미국", emoji: "🇺🇸", hint1: "자유의 여신상이 있어요", hint2: "세계 최강국이에요", hint3: "수도는 워싱턴 D.C.예요", aliases: ["USA", "America"] },
  { name: "이탈리아", emoji: "🇮🇹", hint1: "콜로세움이 있어요", hint2: "피자와 파스타의 고향이에요", hint3: "수도는 로마예요", aliases: ["Italy"] },
  { name: "스페인", emoji: "🇪🇸", hint1: "사그라다 파밀리아가 있어요", hint2: "플라멩코가 유명해요", hint3: "수도는 마드리드예요", aliases: ["Spain"] },
  { name: "중국", emoji: "🇨🇳", hint1: "만리장성이 있어요", hint2: "자장면의 고향이에요", hint3: "수도는 베이징이에요", aliases: ["China", "중화인민공화국"] },
  { name: "브라질", emoji: "🇧🇷", hint1: "아마존 강이 있어요", hint2: "삼바와 축구의 나라예요", hint3: "수도는 브라질리아예요", aliases: ["Brazil"] },
  { name: "호주", emoji: "🇦🇺", hint1: "캥거루가 살아요", hint2: "오페라 하우스가 있어요", hint3: "수도는 캔버라예요", aliases: ["Australia", "오스트레일리아"] },
  { name: "이집트", emoji: "🇪🇬", hint1: "피라미드가 있어요", hint2: "나일강이 흘러요", hint3: "수도는 카이로예요", aliases: ["Egypt"] },
  { name: "러시아", emoji: "🇷🇺", hint1: "세계에서 가장 큰 나라예요", hint2: "붉은 광장이 있어요", hint3: "수도는 모스크바예요", aliases: ["Russia"] },
  { name: "독일", emoji: "🇩🇪", hint1: "맥주 축제 옥토버페스트가 유명해요", hint2: "소시지와 프레첼의 나라예요", hint3: "수도는 베를린이에요", aliases: ["Germany"] },
  { name: "영국", emoji: "🇬🇧", hint1: "빅벤과 버킹엄 궁전이 있어요", hint2: "홍차 문화가 발달했어요", hint3: "수도는 런던이에요", aliases: ["UK", "영국", "Britain"] },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function WorldTripPage() {
  const [questions] = useState(() => shuffle(COUNTRIES).slice(0, 8));
  const [idx, setIdx] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[idx];

  function check() {
    if (!input.trim()) return;
    const ans = input.trim();
    const correct =
      ans === current.name ||
      current.aliases.some((a) => a.toLowerCase() === ans.toLowerCase());
    setResult(correct ? "correct" : "wrong");
    if (correct) {
      const pts = Math.max(3 - hintsUsed, 1);
      setScore((s) => s + pts);
    }
  }

  function next() {
    setInput("");
    setHintsUsed(0);
    setResult(null);
    if (idx + 1 >= questions.length) {
      setDone(true);
    } else {
      setIdx((i) => i + 1);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      if (result) next();
      else check();
    }
  }

  if (done) {
    const maxScore = questions.length * 3;
    const pct = Math.round((score / maxScore) * 100);
    return (
      <LayoutContainer>
        <div className="py-12 max-w-sm mx-auto text-center">
          <div className="text-6xl mb-4">🌍</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">세계 여행 완료!</h2>
          <div className="text-6xl font-black text-blue-600 my-6">{score}점</div>
          <p className="text-gray-500 text-sm mb-1">최고 점수 {maxScore}점 중 {pct}%</p>
          <p className="text-gray-400 text-sm mb-8">
            {pct >= 80 ? "지리 천재! 세계를 꿰뚫고 있어요! 🏆" :
             pct >= 60 ? "지리 실력이 꽤 되네요! 👏" :
             pct >= 40 ? "절반 이상 맞혔어요. 여행 가고 싶다! ✈️" :
             "지리 공부가 필요해요. 세계는 넓어요! 🗺️"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold"
          >
            다시 여행하기
          </button>
        </div>
      </LayoutContainer>
    );
  }

  const hints = [current.hint1, current.hint2, current.hint3];

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        <div className="flex items-center justify-between mb-5">
          <div className="text-sm font-bold text-gray-700">✈️ 세계 여행 퀴즈</div>
          <div className="text-sm text-gray-500">
            {idx + 1} / {questions.length} · {score}점
          </div>
        </div>

        <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
            style={{ width: `${((idx) / questions.length) * 100}%` }}
          />
        </div>

        <div className="text-center mb-6">
          <div className="text-8xl mb-3">{current.emoji}</div>
          <p className="text-sm text-gray-400">이 나라는 어디일까요?</p>
        </div>

        {/* 힌트 */}
        <div className="space-y-2 mb-6">
          {hints.slice(0, hintsUsed).map((hint, i) => (
            <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2 text-sm text-blue-800">
              힌트 {i + 1}: {hint}
            </div>
          ))}
          {hintsUsed < 3 && !result && (
            <button
              onClick={() => setHintsUsed((n) => n + 1)}
              className="w-full py-2 border border-dashed border-gray-300 rounded-xl text-sm text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors"
            >
              💡 힌트 {hintsUsed + 1} 보기 (-1점 페널티)
            </button>
          )}
        </div>

        {/* 입력 */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={!!result}
            placeholder="나라 이름을 입력하세요"
            className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-blue-400 disabled:bg-gray-50 transition-colors"
          />
          {!result && (
            <button
              onClick={check}
              disabled={!input.trim()}
              className="px-5 py-3 rounded-xl bg-blue-500 text-white font-bold disabled:opacity-40 hover:bg-blue-600 transition-colors"
            >
              확인
            </button>
          )}
        </div>

        {result && (
          <div className={`rounded-2xl p-4 mb-4 text-center ${result === "correct" ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
            <div className="text-2xl mb-1">{result === "correct" ? "🎉" : "😅"}</div>
            <div className={`font-bold ${result === "correct" ? "text-green-700" : "text-red-700"}`}>
              {result === "correct" ? `정답! +${Math.max(3 - hintsUsed, 1)}점` : `틀렸어요. 정답은 ${current.name}이에요`}
            </div>
            <button
              onClick={next}
              className="mt-3 px-6 py-2 rounded-xl bg-blue-500 text-white text-sm font-bold"
            >
              {idx + 1 < questions.length ? "다음 문제 →" : "결과 보기"}
            </button>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
