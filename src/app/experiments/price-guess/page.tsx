"use client";
import { useState, useEffect } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type PriceItem = {
  id: string;
  name: string;
  emoji: string;
  actualPrice: number;
  min: number;
  max: number;
  step: number;
  hint: string;
  category: string;
  catColor: string;
};

const ALL_ITEMS: PriceItem[] = [
  // 카페·식음료
  { id: "p1", name: "스타벅스 아메리카노 (Tall)", emoji: "☕", actualPrice: 5000, min: 1000, max: 12000, step: 100, hint: "가장 작은 사이즈", category: "카페", catColor: "#00704A" },
  { id: "p2", name: "편의점 삼각김밥", emoji: "🍙", actualPrice: 1200, min: 500, max: 3000, step: 50, hint: "참치마요 기준", category: "식품", catColor: "#F97316" },
  { id: "p3", name: "치킨 한 마리 (배달)", emoji: "🍗", actualPrice: 22000, min: 10000, max: 40000, step: 500, hint: "프랜차이즈 후라이드 기준", category: "식품", catColor: "#F97316" },
  { id: "p4", name: "소주 한 병 (편의점)", emoji: "🍶", actualPrice: 1800, min: 500, max: 5000, step: 100, hint: "참이슬·처음처럼 기준", category: "식품", catColor: "#F97316" },
  { id: "p5", name: "삼겹살 1인분 (식당)", emoji: "🥓", actualPrice: 15000, min: 8000, max: 30000, step: 500, hint: "서울 평균, 200g 기준", category: "식품", catColor: "#F97316" },
  { id: "p6", name: "맥도날드 빅맥 세트", emoji: "🍔", actualPrice: 8200, min: 4000, max: 15000, step: 100, hint: "단품 아닌 세트 기준", category: "카페", catColor: "#FCD34D" },
  { id: "p7", name: "파리바게뜨 생크림 케이크", emoji: "🎂", actualPrice: 42000, min: 20000, max: 80000, step: 1000, hint: "1호 기준", category: "식품", catColor: "#F97316" },
  { id: "p8", name: "빙그레 바나나맛 우유", emoji: "🥛", actualPrice: 1500, min: 500, max: 4000, step: 50, hint: "편의점 기준, 240ml", category: "식품", catColor: "#F97316" },
  { id: "p9", name: "신라면 박스 (40개)", emoji: "🍜", actualPrice: 34000, min: 15000, max: 60000, step: 1000, hint: "대형마트 기준", category: "식품", catColor: "#F97316" },
  // 교통
  { id: "p10", name: "서울 지하철 기본요금", emoji: "🚇", actualPrice: 1400, min: 500, max: 3000, step: 50, hint: "2023년 기준", category: "교통", catColor: "#2563EB" },
  { id: "p11", name: "서울 버스 기본요금", emoji: "🚌", actualPrice: 1500, min: 500, max: 3000, step: 50, hint: "간선버스 기준", category: "교통", catColor: "#2563EB" },
  { id: "p12", name: "KTX 서울–부산 (일반석)", emoji: "🚅", actualPrice: 59800, min: 30000, max: 100000, step: 1000, hint: "비할인 정가 기준", category: "교통", catColor: "#2563EB" },
  { id: "p13", name: "서울 택시 기본요금", emoji: "🚕", actualPrice: 4800, min: 2000, max: 10000, step: 100, hint: "2023년 기준 (심야 제외)", category: "교통", catColor: "#2563EB" },
  // 엔터
  { id: "p14", name: "영화관 일반 성인 입장권", emoji: "🎬", actualPrice: 14000, min: 8000, max: 22000, step: 500, hint: "CGV 기준", category: "엔터", catColor: "#DC2626" },
  { id: "p15", name: "넷플릭스 기본 요금제", emoji: "📺", actualPrice: 5500, min: 3000, max: 15000, step: 500, hint: "광고형 기준", category: "엔터", catColor: "#DC2626" },
  { id: "p16", name: "노래방 30분 (2인)", emoji: "🎤", actualPrice: 10000, min: 4000, max: 25000, step: 500, hint: "서울 시내 코인노래방 아닌 일반방", category: "엔터", catColor: "#DC2626" },
  // 레저·관광
  { id: "p17", name: "한강 공원 자전거 대여", emoji: "🚲", actualPrice: 3000, min: 1000, max: 8000, step: 100, hint: "여의도 기준, 1시간", category: "레저", catColor: "#059669" },
  { id: "p18", name: "롯데타워 전망대 입장료", emoji: "🏢", actualPrice: 27000, min: 15000, max: 50000, step: 1000, hint: "서울스카이 성인 기준", category: "관광", catColor: "#7C3AED" },
  { id: "p19", name: "국립공원 입장료 (설악산)", emoji: "🏔️", actualPrice: 3500, min: 1000, max: 10000, step: 500, hint: "성인 기준", category: "관광", catColor: "#7C3AED" },
  // 생활
  { id: "p20", name: "유니클로 기본 반팔 티셔츠", emoji: "👕", actualPrice: 14900, min: 5000, max: 30000, step: 100, hint: "UT 아닌 일반 라운드넥", category: "쇼핑", catColor: "#DB2777" },
  { id: "p21", name: "마스크 한 통 (50매)", emoji: "😷", actualPrice: 9900, min: 3000, max: 25000, step: 500, hint: "KF94 기준, 대형마트", category: "생활", catColor: "#64748B" },
  { id: "p22", name: "미용실 커트 (남성)", emoji: "💈", actualPrice: 13000, min: 5000, max: 30000, step: 1000, hint: "서울 일반 미용실 기준", category: "생활", catColor: "#64748B" },
  // 일급·임금
  { id: "p23", name: "한국 최저시급 (2024년)", emoji: "💵", actualPrice: 9860, min: 5000, max: 15000, step: 100, hint: "시간당 기준", category: "경제", catColor: "#0EA5E9" },
  { id: "p24", name: "서울 지하철 정기권 (60회)", emoji: "🎫", actualPrice: 55000, min: 25000, max: 90000, step: 1000, hint: "30일권 기준", category: "교통", catColor: "#2563EB" },
  { id: "p25", name: "짜파게티 한 봉지 (편의점)", emoji: "🍝", actualPrice: 1200, min: 500, max: 3000, step: 50, hint: "일반 봉지라면 기준", category: "식품", catColor: "#F97316" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatWon(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(n % 10000 !== 0 ? 1 : 0)}만원`;
  return `${n.toLocaleString()}원`;
}

function pct(guess: number, actual: number): number {
  return Math.abs(guess - actual) / actual;
}

const QUESTION_COUNT = 8;

export default function PriceGuessPage() {
  const [questions, setQuestions] = useState<PriceItem[]>([]);
  const [ready, setReady] = useState(false);
  const [idx, setIdx] = useState(0);
  const [guess, setGuess] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const q = shuffle(ALL_ITEMS).slice(0, QUESTION_COUNT);
    setQuestions(q);
    setGuess(Math.round((q[0].min + q[0].max) / 2));
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
  const p = pct(guess, current.actualPrice);
  const pts = p <= 0.05 ? 3 : p <= 0.2 ? 2 : p <= 0.5 ? 1 : 0;

  function confirmGuess() {
    setScore((s) => s + pts);
    setRevealed(true);
  }

  function next() {
    const nextIdx = idx + 1;
    if (nextIdx >= questions.length) {
      setDone(true);
    } else {
      const nextItem = questions[nextIdx];
      setGuess(Math.round((nextItem.min + nextItem.max) / 2));
      setRevealed(false);
      setIdx(nextIdx);
    }
  }

  function handleSlider(v: number) {
    if (!revealed) setGuess(v);
  }

  const sliderPct = ((guess - current.min) / (current.max - current.min)) * 100;

  if (done) {
    const maxScore = QUESTION_COUNT * 3;
    const rating =
      score >= maxScore * 0.85 ? { label: "가격 감각 만렙 🏆", color: "#F59E0B" } :
      score >= maxScore * 0.65 ? { label: "물가 박사 👏", color: "#10B981" } :
      score >= maxScore * 0.4  ? { label: "나쁘지 않아요 😊", color: "#6366F1" } :
                                  { label: "한동안 쇼핑 안 하셨군요 😅", color: "#94A3B8" };
    return (
      <LayoutContainer>
        <div className="py-12 max-w-sm mx-auto text-center">
          <div className="text-6xl mb-4">💰</div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">결과 발표!</h2>
          <div className="text-6xl font-black my-6" style={{ color: rating.color }}>{score}점</div>
          <p className="text-sm text-gray-400 mb-1">최고 {maxScore}점 중</p>
          <p className="text-lg font-bold mb-8" style={{ color: rating.color }}>{rating.label}</p>
          <div className="mb-8 bg-gray-50 rounded-2xl p-4">
            <div className="text-xs text-gray-400 mb-3">점수 기준</div>
            <div className="flex justify-around text-xs">
              <div><span className="font-bold text-green-600">3점</span><br/>5% 이내</div>
              <div><span className="font-bold text-yellow-600">2점</span><br/>20% 이내</div>
              <div><span className="font-bold text-orange-500">1점</span><br/>50% 이내</div>
              <div><span className="font-bold text-gray-400">0점</span><br/>50% 초과</div>
            </div>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-2xl font-bold text-white"
            style={{ background: "linear-gradient(135deg,#F59E0B,#FBBF24)" }}
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
          <div className="font-black text-gray-900">💰 가격 맞히기</div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-600 font-bold bg-amber-50 px-2 py-1 rounded-full">{score}점</span>
            <span className="text-sm text-gray-400">{idx + 1}/{questions.length}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div
            className="h-2 rounded-full transition-all duration-500"
            style={{
              width: `${((idx + (revealed ? 1 : 0)) / questions.length) * 100}%`,
              background: "linear-gradient(90deg,#F59E0B,#FBBF24)",
            }}
          />
        </div>

        {/* Item card */}
        <div className="rounded-2xl p-5 mb-5 text-center" style={{ background: `${current.catColor}12`, border: `1.5px solid ${current.catColor}30` }}>
          <div className="text-5xl mb-3">{current.emoji}</div>
          <span className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full mb-2" style={{ background: current.catColor, color: "#fff" }}>
            {current.category}
          </span>
          <h3 className="font-black text-gray-900 text-base mb-1">{current.name}</h3>
          <p className="text-xs text-gray-400">{current.hint}</p>
        </div>

        {/* Slider */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{formatWon(current.min)}</span>
            <span>{formatWon(current.max)}</span>
          </div>
          <div className="relative">
            <input
              type="range"
              min={current.min}
              max={current.max}
              step={current.step}
              value={guess}
              onChange={(e) => handleSlider(Number(e.target.value))}
              disabled={revealed}
              className="w-full h-3 rounded-full appearance-none cursor-pointer disabled:cursor-default"
              style={{
                background: revealed
                  ? `linear-gradient(90deg,#10B981 ${sliderPct}%,#E5E7EB ${sliderPct}%)`
                  : `linear-gradient(90deg,#F59E0B ${sliderPct}%,#E5E7EB ${sliderPct}%)`,
              }}
            />
          </div>
          <div className="text-center mt-3">
            <span className="text-3xl font-black" style={{ color: revealed ? "#10B981" : "#F59E0B" }}>
              {formatWon(guess)}
            </span>
            <p className="text-xs text-gray-400 mt-0.5">내 예상 가격</p>
          </div>
        </div>

        {!revealed ? (
          <button
            onClick={confirmGuess}
            className="w-full py-3.5 rounded-2xl font-bold text-white text-base transition-opacity"
            style={{ background: "linear-gradient(135deg,#F59E0B,#FBBF24)" }}
          >
            이 가격으로 확인하기
          </button>
        ) : (
          <div>
            {/* Result */}
            <div className="rounded-2xl p-4 mb-4" style={{
              background: pts === 3 ? "#ECFDF5" : pts === 2 ? "#FEFCE8" : pts === 1 ? "#FFF7ED" : "#FEF2F2",
              border: `1.5px solid ${pts === 3 ? "#6EE7B7" : pts === 2 ? "#FDE68A" : pts === 1 ? "#FDBA74" : "#FCA5A5"}`,
            }}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm" style={{ color: pts === 3 ? "#059669" : pts === 2 ? "#CA8A04" : pts === 1 ? "#EA580C" : "#DC2626" }}>
                  {pts === 3 ? "🎯 완벽해요!" : pts === 2 ? "👍 거의 맞혔어요!" : pts === 1 ? "😊 아쉬워요" : "😅 많이 다르네요"}
                </span>
                <span className="font-black text-lg" style={{ color: pts === 3 ? "#059669" : pts === 2 ? "#CA8A04" : pts === 1 ? "#EA580C" : "#DC2626" }}>
                  +{pts}점
                </span>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-0.5">실제 가격</div>
                <div className="text-2xl font-black text-gray-900">{formatWon(current.actualPrice)}</div>
                <div className="text-xs text-gray-400 mt-1">
                  내 예상 {formatWon(guess)} · 오차 {(p * 100).toFixed(1)}%
                </div>
              </div>
            </div>
            <button
              onClick={next}
              className="w-full py-3.5 rounded-2xl font-bold text-white text-base"
              style={{ background: "linear-gradient(135deg,#F59E0B,#FBBF24)" }}
            >
              {idx + 1 < questions.length ? "다음 문제 →" : "결과 보기"}
            </button>
          </div>
        )}
      </div>

      <style>{`
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 24px; height: 24px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid #F59E0B;
          box-shadow: 0 2px 6px rgba(0,0,0,0.15);
          cursor: pointer;
        }
        input[type=range]:disabled::-webkit-slider-thumb {
          border-color: #10B981;
          cursor: default;
        }
      `}</style>
    </LayoutContainer>
  );
}
