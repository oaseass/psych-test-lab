"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  getTodayChallenge,
  getChallengeProgress,
  markBonusClaimed,
  isChallengeComplete,
  CHALLENGE_BONUS_POINTS,
  type ChallengeItem,
  type ChallengeProgress,
} from "@/lib/challenge/challengeService";
import { awardPoints } from "@/lib/user/pointService";
import { getCurrentUser } from "@/lib/user/authService";

const CATEGORY_EMOJI: Record<string, string> = {
  romance: "💕",
  money: "💸",
  work: "💼",
  relationships: "👥",
  personality: "🧠",
  humor: "😂",
  lifestyle: "🌿",
  psychology: "🔮",
  default: "🎯",
};

function getCategoryEmoji(slug: string): string {
  return CATEGORY_EMOJI[slug] ?? CATEGORY_EMOJI.default;
}

export default function ChallengePage() {
  const [challenge, setChallenge] = useState<ChallengeItem[]>([]);
  const [progress, setProgress] = useState<ChallengeProgress>({
    date: "",
    completedSlugs: [],
    bonusClaimed: false,
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const items = getTodayChallenge();
    const prog = getChallengeProgress();
    setChallenge(items);
    setProgress(prog);
  }, []);

  function handleClaimBonus() {
    const user = getCurrentUser();
    if (user?.role === "member") {
      awardPoints(user.id, "test_complete", `challenge_bonus_${progress.date}`);
    }
    markBonusClaimed();
    setProgress((p) => ({ ...p, bonusClaimed: true }));
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 3000);
  }

  const completedCount = challenge.filter((c) =>
    progress.completedSlugs.includes(c.testSlug)
  ).length;

  const isAllDone = mounted && challenge.length > 0 && isChallengeComplete(challenge, progress);
  const progressPct = challenge.length > 0 ? (completedCount / challenge.length) * 100 : 0;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">🔥</div>
        <h1 className="text-2xl font-black text-gray-900 mb-1">오늘의 5연속 챌린지</h1>
        <p className="text-sm text-gray-500">5개 테스트를 모두 완료하면 보너스 포인트!</p>
      </div>

      {/* 진행 바 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-5 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-bold text-gray-700">진행도</span>
          <span className="text-sm font-bold text-brand-purple">
            {mounted ? completedCount : 0} / {challenge.length}
          </span>
        </div>
        <div className="h-3 rounded-full bg-gray-100 overflow-hidden mb-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
            style={{ width: `${mounted ? progressPct : 0}%` }}
          />
        </div>

        {/* 보너스 카드 */}
        <div
          className={`rounded-xl p-3 text-center ${
            isAllDone
              ? "bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100"
              : "bg-gray-50 border border-gray-100"
          }`}
        >
          <p className="text-xs text-gray-500 mb-0.5">전부 완료 보너스</p>
          <p className={`text-lg font-black ${isAllDone ? "text-brand-purple" : "text-gray-400"}`}>
            +{CHALLENGE_BONUS_POINTS.toLocaleString()}P
          </p>
        </div>
      </div>

      {/* 전부 완료 + 수령 버튼 */}
      {isAllDone && !progress.bonusClaimed && (
        <div className="mb-5">
          <button
            onClick={handleClaimBonus}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl text-base font-black hover:opacity-95 active:scale-[0.98] transition-all shadow-md"
          >
            🎉 보너스 {CHALLENGE_BONUS_POINTS}P 수령하기
          </button>
        </div>
      )}

      {isAllDone && progress.bonusClaimed && (
        <div className="mb-5 py-4 bg-green-50 border border-green-100 rounded-2xl text-center">
          <p className="text-green-700 font-bold text-sm">✅ 오늘 챌린지 완료! 내일 또 도전해봐요</p>
        </div>
      )}

      {/* 축하 */}
      {showCelebration && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white rounded-3xl shadow-2xl p-8 text-center animate-bounce">
            <div className="text-5xl mb-3">🎊</div>
            <p className="text-xl font-black text-brand-purple">+{CHALLENGE_BONUS_POINTS}P 획득!</p>
          </div>
        </div>
      )}

      {/* 챌린지 테스트 목록 */}
      <div className="space-y-3">
        {(!mounted ? Array(5).fill(null) : challenge).map((item, idx) => {
          if (!item) {
            return (
              <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-4 animate-pulse h-20" />
            );
          }

          const done = progress.completedSlugs.includes(item.testSlug);
          const emoji = getCategoryEmoji(item.categorySlug);

          return (
            <Link
              key={item.testSlug}
              href={`/test/${item.testSlug}`}
              className={`block rounded-2xl border p-4 transition-all active:scale-[0.98] ${
                done
                  ? "bg-green-50 border-green-200"
                  : "bg-white border-gray-100 hover:border-purple-200 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* 번호 / 체크 */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-black flex-shrink-0 ${
                    done
                      ? "bg-green-500 text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {done ? "✓" : idx + 1}
                </div>

                {/* 정보 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-sm">{emoji}</span>
                    <span className="text-[11px] text-gray-400">{item.categorySlug}</span>
                  </div>
                  <p
                    className={`text-sm font-bold truncate ${
                      done ? "text-green-700" : "text-gray-800"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>

                {/* 화살표 */}
                <span className={`text-sm ${done ? "text-green-400" : "text-gray-300"}`}>
                  {done ? "완료" : "→"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* 안내 */}
      <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-2xl text-center">
        <p className="text-xs text-amber-700">
          💡 각 테스트를 완료하면 자동으로 체크됩니다. 챌린지는 매일 자정에 초기화됩니다.
        </p>
      </div>
    </div>
  );
}
