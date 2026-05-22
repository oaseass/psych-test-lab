"use client";

import { useState, useEffect } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import LuckyGuard from "@/components/lucky/LuckyGuard";
import StakeSelector from "@/components/lucky/StakeSelector";
import LuckyResultCard from "@/components/lucky/LuckyResultCard";
import LuckyNotice from "@/components/lucky/LuckyNotice";
import { getCurrentUser } from "@/lib/user/authService";
import { processLuckyResult, validateStake } from "@/lib/lucky/luckyPointService";
import type { UserProfile } from "@/lib/user/types";
import type { LuckyPlayResult } from "@/lib/lucky/luckyPointService";

type OXQuestion = {
  question: string;
  answer: "O" | "X";
  explanation: string;
  isRandom?: boolean; // 운빨형 (매번 랜덤 정답)
};

const OX_POOL: OXQuestion[] = [
  { question: "바나나는 나무에서 열린다.", answer: "X", explanation: "바나나는 초본식물(풀)에서 자랍니다." },
  { question: "인간의 뼈는 어릴 때 성인보다 더 많다.", answer: "O", explanation: "신생아는 약 270개, 성인은 약 206개입니다." },
  { question: "번개는 같은 곳에 두 번 치지 않는다.", answer: "X", explanation: "번개는 높은 건물 등에 반복해서 떨어집니다." },
  { question: "금은 불에 녹지 않는다.", answer: "X", explanation: "금은 약 1,064°C에서 녹습니다." },
  { question: "고래는 포유류다.", answer: "O", explanation: "고래는 숨을 쉬고, 새끼를 낳으며, 젖을 먹입니다." },
  { question: "낙타 혹 안에는 물이 들어있다.", answer: "X", explanation: "낙타 혹 안에는 지방이 저장되어 있습니다." },
  { question: "타조는 세계에서 가장 빠른 새다.", answer: "X", explanation: "빠른 새는 독수리 등 비행 조류입니다. 달리기에선 타조가 빠릅니다." },
  { question: "인간은 뇌의 10%만 사용한다.", answer: "X", explanation: "이는 잘못된 속설로, 뇌 전체를 사용합니다." },
  { question: "오늘의 행운 답은 O다.", answer: "O", isRandom: true, explanation: "순수 운빨 문제입니다." },
  { question: "오늘 하늘의 별은 X 더 많다.", answer: "X", isRandom: true, explanation: "순수 운빨 문제입니다." },
  { question: "지금 이 순간, 행운이 당신 편이다.", answer: "O", isRandom: true, explanation: "순수 운빨 문제입니다." },
  { question: "다음 숫자는 O(짝수)에서 나온다.", answer: "O", isRandom: true, explanation: "순수 운빨 문제입니다." },
  { question: "유럽에서 가장 큰 나라는 러시아다.", answer: "O", explanation: "러시아 유럽 영역은 유럽에서 가장 큽니다." },
  { question: "다이아몬드는 영구불멸이다.", answer: "X", explanation: "다이아몬드는 아주 높은 온도에서 탈 수 있습니다." },
];

type Phase = "select" | "revealed" | "result";

function GameContent({ user }: { user: UserProfile }) {
  const [stake, setStake] = useState(50);
  const [phase, setPhase] = useState<Phase>("select");
  const [currentQ, setCurrentQ] = useState<OXQuestion>(() => pickQuestion());
  const [chosen, setChosen] = useState<"O" | "X" | null>(null);
  const [playResult, setPlayResult] = useState<LuckyPlayResult | null>(null);
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState<string | null>(null);

  function pickQuestion(): OXQuestion {
    const q = OX_POOL[Math.floor(Math.random() * OX_POOL.length)];
    if (q.isRandom) {
      return { ...q, answer: Math.random() < 0.5 ? "O" : "X" };
    }
    return q;
  }

  function refreshUser() {
    const u = getCurrentUser();
    if (u?.role === "member") setCurrentUser(u);
  }

  function handleChoose(c: "O" | "X") {
    const v = validateStake(currentUser.id, stake);
    if (!v.ok) { setError(v.reason); return; }
    setError(null);
    setChosen(c);
    setPhase("revealed");

    const isWin = c === currentQ.answer;
    const detail = `"${currentQ.question}" → 정답: ${currentQ.answer} — ${isWin ? "정답! 2배" : "오답"}`;
    const res = processLuckyResult(currentUser.id, "ox", stake, isWin, 2, detail);
    setPlayResult(res);
    refreshUser();
  }

  function reset() {
    setCurrentQ(pickQuestion());
    setPhase("select");
    setChosen(null);
    setPlayResult(null);
    setError(null);
    refreshUser();
  }

  if (phase === "revealed" && playResult?.success && playResult.result) {
    return (
      <div className="space-y-4">
        {/* 정답 공개 */}
        <div className={`rounded-2xl p-5 text-center border-2 ${playResult.result.isWin ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <div className="text-3xl mb-2">{currentQ.answer === "O" ? "⭕" : "❌"}</div>
          <div className="font-bold text-gray-900 mb-1 text-sm">"{currentQ.question}"</div>
          <div className="text-xs text-gray-500 mb-3">정답: {currentQ.answer} — {currentQ.explanation}</div>
          <div className={`text-xl font-black ${playResult.result.isWin ? "text-green-600" : "text-red-500"}`}>
            {playResult.result.isWin ? "🎉 정답!" : "😢 오답"}
          </div>
        </div>
        <LuckyResultCard
          isWin={playResult.result.isWin}
          stakePoints={playResult.result.stakePoints}
          rewardPoints={playResult.result.rewardPoints}
          netPoints={playResult.result.netPoints}
          newPoints={playResult.newPoints ?? currentUser.points}
          rankUp={playResult.rankUp}
          newRankName={playResult.newRankName}
          prevRankName={playResult.prevRankName}
          detail={playResult.result.detail}
          onRetry={reset}
          nextGameHref="/lucky/ladder"
          nextGameLabel="사다리 도전 →"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">⭕❌</div>
        <h1 className="text-xl font-black text-gray-900">OX 운빨퀴즈</h1>
        <p className="text-sm text-gray-400 mt-1">O 또는 X — 맞히면 2배!</p>
      </div>

      <StakeSelector value={stake} onChange={setStake} disabled={phase !== "select"} />
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      <div className="bg-gray-50 rounded-2xl p-5 text-center">
        <div className="text-base font-bold text-gray-900 leading-relaxed mb-1">
          {currentQ.question}
        </div>
        {currentQ.isRandom && (
          <div className="text-[10px] text-gray-400 mt-1">운빨형 문제</div>
        )}
      </div>

      {phase === "select" && (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleChoose("O")}
            className="flex flex-col items-center gap-2 p-6 bg-green-50 border-2 border-green-200 rounded-2xl hover:border-green-400 hover:shadow-md transition-all active:scale-95"
          >
            <span className="text-5xl">⭕</span>
            <span className="text-xl font-black text-green-700">O</span>
          </button>
          <button
            onClick={() => handleChoose("X")}
            className="flex flex-col items-center gap-2 p-6 bg-red-50 border-2 border-red-200 rounded-2xl hover:border-red-400 hover:shadow-md transition-all active:scale-95"
          >
            <span className="text-5xl">❌</span>
            <span className="text-xl font-black text-red-700">X</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function OXPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  useEffect(() => {
    const u = getCurrentUser();
    if (u?.role === "member") setUser(u);
  }, []);
  return (
    <LuckyGuard>
      <LayoutContainer>
        {user ? <GameContent user={user} /> : <div className="py-8 text-center text-gray-400 animate-pulse">로딩 중...</div>}
        <LuckyNotice compact />
      </LayoutContainer>
    </LuckyGuard>
  );
}
