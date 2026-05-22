"use client";
import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type PriceItem = {
  id: string;
  name: string;
  emoji: string;
  actualPrice: number;
  unit: string;
  hint: string;
  category: string;
};

const PRICE_ITEMS: PriceItem[] = [
  { id: "p1", name: "스타벅스 아메리카노 (Tall)", emoji: "☕", actualPrice: 5000, unit: "원", hint: "가장 작은 사이즈", category: "카페" },
  { id: "p2", name: "서울 지하철 기본요금", emoji: "🚇", actualPrice: 1400, unit: "원", hint: "2023년 기준", category: "교통" },
  { id: "p3", name: "편의점 삼각김밥", emoji: "🍙", actualPrice: 1200, unit: "원", hint: "참치마요 기준", category: "식품" },
  { id: "p4", name: "치킨 한 마리 (배달)", emoji: "🍗", actualPrice: 22000, unit: "원", hint: "프랜차이즈 후라이드 기준", category: "식품" },
  { id: "p5", name: "한강 공원 자전거 대여", emoji: "🚲", actualPrice: 3000, unit: "원/시간", hint: "여의도 공원 기준", category: "레저" },
  { id: "p6", name: "영화관 일반 성인 입장권", emoji: "🎬", actualPrice: 14000, unit: "원", hint: "CGV 기준", category: "엔터" },
  { id: "p7", name: "서울 버스 기본요금", emoji: "🚌", actualPrice: 1500, unit: "원", hint: "간선버스 기준", category: "교통" },
  { id: "p8", name: "롯데타워 전망대 입장료", emoji: "🏢", actualPrice: 27000, unit: "원", hint: "서울스카이 기준", category: "관광" },
  { id: "p9", name: "국립공원 입장료 (설악산)", emoji: "🏔️", actualPrice: 3500, unit: "원", hint: "성인 기준", category: "관광" },
  { id: "p10", name: "KTX 서울-부산 (일반)", emoji: "🚅", actualPrice: 59800, unit: "원", hint: "일반석 기준", category: "교통" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatWon(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(n % 10000 !== 0 ? 1 : 0)}만원`;
  return `${n.toLocaleString()}원`;
}

export default function PriceGuessPage() {
  const [questions] = useState(() => shuffle(PRICE_ITEMS).slice(0, 7));
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = questions[idx];

  function checkGuess() {
    if (!guess || isNaN(Number(guess))) return;
    const userNum = Number(guess);
    const actual = current.actualPrice;
    const ratio = Math.max(userNum, actual) / Math.min(userNum, actual);
    let pts = 0;
    if (ratio <= 1.05) pts = 3;
    else if (ratio <= 1.2) pts = 2;
    else if (ratio <= 1.5) pts = 1;
    setScore((s) => s + pts);
    setRevealed(true);
  }

  function next() {
    setGuess("");
    setRevealed(false);
    if (idx + 1 >= questions.length) setDone(true);
    else setIdx((i) => i + 1);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      if (revealed) next();
      else checkGuess();
    }
  }

  if (done) {
    const maxScore = questions.length * 3;
    return (
      <LayoutContainer>
        <div className="py-12 max-w-sm mx-auto text-center">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">가격 감각 테스트 완료!</h2>
          <div className="text-6xl font-black text-amber-500 my-6">{score}점</div>
          <p className="text-gray-500 text-sm mb-2">최고 {maxScore}점 중</p>
          <p className="text-gray-500 text-sm mb-8">
            {score >= maxScore * 0.8 ? "가격 감각이 탁월해요! 생활의 달인! 🏆" :
             score >= maxScore * 0.6 ? "꽤 정확해요! 물가를 잘 알고 있군요 👏" :
             score >= maxScore * 0.4 ? "나쁘지 않아요. 가격 감각이 있네요 😊" :
             "흠... 한동안 가격을 안 챙겨보셨군요 😅"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-white font-bold"
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
        <div className="flex items-center justify-between mb-5">
          <div className="font-black text-gray-900">💰 가격 맞히기</div>
          <div className="text-sm text-gray-500">{idx + 1}/{questions.length} · {score}점</div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className="h-2 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transition-all"
            style={{ width: `${(idx / questions.length) * 100}%` }}
          />
        </div>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-5 text-center">
          <div className="text-5xl mb-3">{current.emoji}</div>
          <h3 className="font-black text-gray-900 text-base mb-1">{current.name}</h3>
          <p className="text-xs text-gray-400">{current.hint}</p>
        </div>

        {!revealed ? (
          <div className="mb-4">
            <div className="text-sm text-gray-600 mb-2 font-semibold">가격이 얼마일까요? (단위: 원)</div>
            <div className="flex gap-2">
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="숫자만 입력 (예: 5000)"
                className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-amber-400 transition-colors"
                min="0"
              />
              <button
                onClick={checkGuess}
                disabled={!guess}
                className="px-5 py-3 rounded-xl bg-amber-400 text-white font-bold disabled:opacity-40 hover:bg-amber-500 transition-colors"
              >
                확인
              </button>
            </div>
          </div>
        ) : (
          <div className="mb-5">
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-3">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-1">실제 가격</div>
                <div className="text-3xl font-black text-green-600">{formatWon(current.actualPrice)}</div>
                <div className="text-sm text-gray-500 mt-1">
                  내 예상: {formatWon(Number(guess))}
                  {" "}({Number(guess) === current.actualPrice ? "정확!" :
                    Number(guess) > current.actualPrice ? `+${formatWon(Number(guess) - current.actualPrice)} 높게 예상` :
                    `-${formatWon(current.actualPrice - Number(guess))} 낮게 예상`})
                </div>
              </div>
            </div>
            <button
              onClick={next}
              className="w-full py-3 rounded-xl bg-amber-400 text-white font-bold hover:bg-amber-500 transition-colors"
            >
              {idx + 1 < questions.length ? "다음 →" : "결과 보기"}
            </button>
          </div>
        )}

        <div className="mt-2 flex gap-2 flex-wrap">
          <span className="text-xs text-gray-400">점수 기준:</span>
          <span className="text-xs text-green-600 font-bold">5% 이내 = 3점</span>
          <span className="text-xs text-yellow-600 font-bold">20% 이내 = 2점</span>
          <span className="text-xs text-orange-600 font-bold">50% 이내 = 1점</span>
        </div>
      </div>
    </LayoutContainer>
  );
}
