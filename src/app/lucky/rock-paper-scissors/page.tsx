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

type Choice = "scissors" | "rock" | "paper";
const CHOICES: { value: Choice; emoji: string; label: string }[] = [
  { value: "scissors", emoji: "✌️", label: "가위" },
  { value: "rock", emoji: "✊", label: "바위" },
  { value: "paper", emoji: "🖐️", label: "보" },
];

function getOutcome(player: Choice, ai: Choice): "win" | "draw" | "lose" {
  if (player === ai) return "draw";
  if (
    (player === "scissors" && ai === "paper") ||
    (player === "rock" && ai === "scissors") ||
    (player === "paper" && ai === "rock")
  ) return "win";
  return "lose";
}

function randomChoice(): Choice {
  return CHOICES[Math.floor(Math.random() * 3)].value;
}

type Phase = "select" | "animating" | "result";

function GameContent({ user }: { user: UserProfile }) {
  const [stake, setStake] = useState(50);
  const [phase, setPhase] = useState<Phase>("select");
  const [playerChoice, setPlayerChoice] = useState<Choice | null>(null);
  const [aiChoice, setAiChoice] = useState<Choice | null>(null);
  const [aiDisplay, setAiDisplay] = useState<Choice>("rock");
  const [playResult, setPlayResult] = useState<LuckyPlayResult | null>(null);
  const [currentUser, setCurrentUser] = useState(user);
  const [error, setError] = useState<string | null>(null);

  function refreshUser() {
    const u = getCurrentUser();
    if (u && u.role === "member") setCurrentUser(u);
  }

  function handleChoose(choice: Choice) {
    const v = validateStake(currentUser.id, stake);
    if (!v.ok) { setError(v.reason); return; }
    setError(null);
    setPlayerChoice(choice);
    const aiPick = randomChoice();
    setAiChoice(aiPick);
    setPhase("animating");

    // 애니메이션: AI가 랜덤으로 변하다가 결과 표시
    let tick = 0;
    const interval = setInterval(() => {
      setAiDisplay(CHOICES[tick % 3].value);
      tick++;
      if (tick > 10) {
        clearInterval(interval);
        setAiDisplay(aiPick);
        setPhase("result");

        const outcome = getOutcome(choice, aiPick);
        const isWin = outcome === "win";
        const isDraw = outcome === "draw";
        const multiplier = isWin ? 2 : isDraw ? 1 : 0;
        const label = isWin ? "🏆 승리!" : isDraw ? "🤝 무승부 (포인트 반환)" : "😢 패배";
        const detail = `${CHOICES.find(c => c.value === choice)!.label} vs AI ${CHOICES.find(c => c.value === aiPick)!.label} → ${label}`;

        const res = processLuckyResult(currentUser.id, "rock-paper-scissors", stake, isWin || isDraw, multiplier, detail);
        setPlayResult(res);
        refreshUser();
      }
    }, 100);
  }

  function reset() {
    setPhase("select");
    setPlayerChoice(null);
    setAiChoice(null);
    setPlayResult(null);
    setError(null);
    refreshUser();
  }

  const aiEmoji = CHOICES.find(c => c.value === aiDisplay)?.emoji ?? "✊";

  if (phase === "result" && playResult?.success && playResult.result && playerChoice && aiChoice) {
    const outcome = getOutcome(playerChoice, aiChoice);
    const playerInfo = CHOICES.find(c => c.value === playerChoice)!;
    const aiInfo = CHOICES.find(c => c.value === aiChoice)!;
    const REASONS: Record<string, string> = {
      "scissors-paper": "가위가 보를 잘랐어요!",
      "rock-scissors": "바위가 가위를 부쉈어요!",
      "paper-rock": "보가 바위를 감쌌어요!",
      "scissors-rock": "가위는 바위에게 졌어요.",
      "rock-paper": "바위는 보에게 졌어요.",
      "paper-scissors": "보는 가위에게 졌어요.",
    };
    const reason = outcome === "draw"
      ? "같은 선택이라 무승부예요."
      : REASONS[`${playerChoice}-${aiChoice}`] ?? "";
    return (
      <div className="space-y-4">
        {/* VS 결과 카드 */}
        <div className="flex items-stretch gap-3">
          <div className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 ${
            outcome === "win" ? "bg-green-50 border-green-300"
            : outcome === "draw" ? "bg-blue-50 border-blue-200"
            : "bg-gray-50 border-gray-200"
          }`}>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest">나</span>
            <span className="text-6xl">{playerInfo.emoji}</span>
            <span className="text-sm font-black text-gray-800">{playerInfo.label}</span>
          </div>
          <div className="flex items-center justify-center px-1">
            <span className="text-2xl font-black text-gray-300">VS</span>
          </div>
          <div className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-2xl border-2 ${
            outcome === "lose" ? "bg-red-50 border-red-300" : "bg-gray-50 border-gray-200"
          }`}>
            <span className="text-[10px] font-bold text-gray-400 tracking-widest">AI</span>
            <span className="text-6xl">{aiInfo.emoji}</span>
            <span className="text-sm font-black text-gray-700">{aiInfo.label}</span>
          </div>
        </div>
        {/* 판정 + 이유 */}
        <div className={`text-center rounded-xl py-3 px-4 ${
          outcome === "win" ? "bg-green-100"
          : outcome === "draw" ? "bg-blue-50"
          : "bg-red-50"
        }`}>
          <div className={`text-xl font-black mb-1 ${
            outcome === "win" ? "text-green-700"
            : outcome === "draw" ? "text-blue-700"
            : "text-red-600"
          }`}>
            {outcome === "win" ? "🏆 승리!" : outcome === "draw" ? "🤝 무승부" : "😢 패배"}
          </div>
          <p className="text-sm text-gray-600">{reason}</p>
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
          nextGameHref="/lucky/odd-even"
          nextGameLabel="홀짝 도전 →"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-4xl mb-2">✊</div>
        <h1 className="text-xl font-black text-gray-900">가위바위보</h1>
        <p className="text-sm text-gray-400 mt-1">이기면 2배 · 비기면 포인트 반환 · 지면 차감</p>
      </div>

      <StakeSelector value={stake} onChange={setStake} disabled={phase !== "select"} />
      {error && <p className="text-xs text-red-500 text-center">{error}</p>}

      {/* 선택 카드 */}
      {phase === "select" && (
        <div>
          <p className="text-sm font-bold text-gray-600 mb-3 text-center">{stake}P로 도전하기 — 골라라!</p>
          <div className="grid grid-cols-3 gap-3">
            {CHOICES.map((c) => (
              <button
                key={c.value}
                onClick={() => handleChoose(c.value)}
                className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border-2 border-gray-200 hover:border-violet-400 hover:shadow-md transition-all active:scale-95"
              >
                <span className="text-4xl">{c.emoji}</span>
                <span className="text-sm font-bold text-gray-700">{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 결과 표시 */}
      {(phase === "animating" || phase === "result") && playerChoice && (
        <div className="flex items-center justify-around py-6">
          <div className="text-center">
            <div className="text-6xl mb-2">{CHOICES.find(c => c.value === playerChoice)!.emoji}</div>
            <div className="text-xs font-bold text-gray-600">나</div>
          </div>
          <div className="text-3xl font-black text-gray-300">VS</div>
          <div className="text-center">
            <div className={`text-6xl mb-2 ${phase === "animating" ? "animate-bounce" : ""}`}>{aiEmoji}</div>
            <div className="text-xs font-bold text-gray-600">AI</div>
          </div>
        </div>
      )}

      {!playResult?.success && playResult && (
        <p className="text-xs text-red-500 text-center">{playResult.error}</p>
      )}
    </div>
  );
}

export default function RockPaperScissorsPage() {
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
