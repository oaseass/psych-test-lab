"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";

const RANDOM_POOL = [
  { route: "/games/worldcup/anime-character", label: "애니 캐릭터 월드컵" },
  { route: "/games/balance/work-life", label: "직장인 밸런스 게임" },
  { route: "/games/initial-quiz/kpop", label: "케이팝 초성퀴즈" },
  { route: "/experiments/spend-money", label: "돈쓰기 시뮬레이터" },
  { route: "/experiments/password-hell", label: "비밀번호 지옥" },
  { route: "/experiments/world-trip", label: "세계 여행 퀴즈" },
  { route: "/experiments/radio-roulette", label: "라디오 룰렛" },
  { route: "/experiments/internet-museum", label: "인터넷 박물관" },
  { route: "/experiments/price-guess", label: "가격 맞히기" },
  { route: "/bingo/office", label: "직장인 빙고" },
  { route: "/bingo/love", label: "연애 빙고" },
  { route: "/gauge/kkondae", label: "꼰대력 측정기" },
  { route: "/gauge/resign", label: "퇴사욕구 측정기" },
  { route: "/story/office-survival", label: "회사에서 살아남기" },
  { route: "/story/sseum-survival", label: "썸에서 살아남기" },
  { route: "/tests/mbti-test", label: "MBTI 테스트" },
  { route: "/tests/iq-test", label: "IQ 테스트" },
  { route: "/polls", label: "실시간 투표" },
];

export default function SurprisePage() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<typeof RANDOM_POOL[0] | null>(null);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    setResult(null);
    let count = 0;
    const total = 14;
    const interval = setInterval(() => {
      const rand = RANDOM_POOL[Math.floor(Math.random() * RANDOM_POOL.length)];
      setResult(rand);
      count++;
      if (count >= total) {
        clearInterval(interval);
        const final = RANDOM_POOL[Math.floor(Math.random() * RANDOM_POOL.length)];
        setResult(final);
        setSpinning(false);
      }
    }, 80);
  }

  return (
    <LayoutContainer>
      <div className="py-10 max-w-sm mx-auto text-center">
        <div className="text-6xl mb-3">🎲</div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">랜덤 심심풀이</h1>
        <p className="text-gray-500 text-sm mb-8">오늘 뭐 할지 모르겠다면? 랜덤으로 골라드려요!</p>

        {/* 결과 표시 영역 */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 mb-6 min-h-[120px] flex items-center justify-center border border-purple-100">
          {result ? (
            <div>
              <div className="text-4xl mb-2">🎯</div>
              <div className="font-black text-gray-900 text-lg">{result.label}</div>
              {!spinning && (
                <div className="text-xs text-gray-400 mt-2">선택됨!</div>
              )}
            </div>
          ) : (
            <div className="text-gray-300 text-3xl">{spinning ? "🎲" : "❓"}</div>
          )}
        </div>

        {/* 버튼들 */}
        <button
          onClick={spin}
          disabled={spinning}
          className={`w-full py-4 rounded-2xl font-black text-xl text-white shadow-lg mb-3 transition-all ${
            spinning ? "opacity-60 cursor-not-allowed" : "hover:scale-105 active:scale-95"
          }`}
          style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}
        >
          {spinning ? "고르는 중..." : "🎲 랜덤으로 골라줘!"}
        </button>

        {result && !spinning && (
          <button
            onClick={() => router.push(result.route)}
            className="w-full py-3 rounded-2xl border-2 border-purple-300 text-purple-700 font-bold hover:bg-purple-50 transition-colors"
          >
            바로 시작하기 →
          </button>
        )}

        <p className="text-xs text-gray-400 mt-6">
          {RANDOM_POOL.length}가지 심심풀이 중 하나를 골라드려요
        </p>
      </div>
    </LayoutContainer>
  );
}
