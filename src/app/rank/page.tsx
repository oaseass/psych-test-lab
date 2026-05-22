"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GUEST_RANK, MEMBER_RANKS, ALL_RANKS, TIER_LABELS } from "@/data/ranks";
import { getCurrentUser } from "@/lib/user/authService";
import { getRankProgress } from "@/lib/user/rankService";
import AnimatedRankIcon from "@/components/user/AnimatedRankIcon";
import type { UserProfile, Rank, RankTier } from "@/lib/user/types";

const TIER_ORDER: RankTier[] = [
  "soldier",
  "nonCommissionedOfficer",
  "warrantOfficer",
  "officer",
  "fieldOfficer",
  "general",
  "legend",
];

function RankCard({ rank, isCurrent, isNext, isUnlocked }: {
  rank: Rank;
  isCurrent: boolean;
  isNext: boolean;
  isUnlocked: boolean;
}) {
  const tierInfo = TIER_LABELS[rank.tier];
  return (
    <div
      className={`relative flex items-center gap-3 p-4 rounded-2xl border transition-all
        ${isCurrent ? "border-violet-300 bg-violet-50 shadow-md" :
          isNext ? "border-orange-200 bg-orange-50" :
          isUnlocked ? "border-gray-100 bg-white" :
          "border-gray-100 bg-gray-50 opacity-60"}`}
    >
      {/* Lock overlay */}
      {!isUnlocked && !isCurrent && (
        <span className="absolute top-2 right-2 text-gray-300 text-xs">🔒</span>
      )}

      {/* Rank icon */}
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
          ${isCurrent ? "bg-violet-100" : isNext ? "bg-orange-100" : "bg-gray-50"}`}
      >
        <AnimatedRankIcon
          rank={rank}
          sizeClass="text-2xl"
          animated={isUnlocked || isCurrent}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`font-bold text-sm ${isCurrent ? "text-violet-700" : rank.color}`}>
            {rank.name}
          </span>
          {isCurrent && (
            <span className="text-[9px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full font-bold">현재</span>
          )}
          {isNext && (
            <span className="text-[9px] bg-orange-500 text-white px-1.5 py-0.5 rounded-full font-bold">다음</span>
          )}
          {tierInfo.badge && isUnlocked && (
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${tierInfo.badgeColor}`}>
              {tierInfo.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400 mt-0.5 truncate">{rank.description}</p>
        {(isNext || isCurrent) && (
          <p className="text-xs text-violet-500 mt-0.5 font-medium">{rank.rewardText}</p>
        )}
      </div>

      <div className="text-right text-xs text-gray-400 flex-shrink-0 ml-1">
        {rank.minPoints.toLocaleString()}P~
      </div>
    </div>
  );
}

export default function RankPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setLoaded(true);
  }, []);

  const isMember = user?.role === "member";
  const rankProgress = isMember ? getRankProgress(user!.points, "member") : null;

  const currentRankId = isMember ? user!.rankId : "guest";
  const nextRankId = rankProgress?.nextRank?.id ?? null;

  // 계급 tier별 그룹화 (guest 제외)
  const tierGroups = TIER_ORDER.map((tier) => ({
    tier,
    ranks: MEMBER_RANKS.filter((r) => r.tier === tier),
  }));

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* ── Hero ── */}
      <div className="text-center mb-8">
        <div className="text-4xl mb-3">🎖️</div>
        <h1 className="text-2xl font-extrabold text-gray-900">계급표</h1>
        <p className="text-sm font-semibold text-gray-700 mt-2">
          게임하고 테스트할수록 계급이 올라갑니다.
        </p>
        <p className="text-xs text-gray-400 mt-1">
          출석체크, 테스트 완료, 같이놀기로 포인트를 모아 더 높은 계급을 해금하세요.
        </p>
      </div>

      {/* ── 내 현재 계급 카드 ── */}
      {loaded && isMember && rankProgress && (
        <div className={`bg-gradient-to-br ${rankProgress.currentRank.gradient} rounded-3xl p-6 mb-8 shadow-sm border border-white`}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white/60 rounded-2xl flex items-center justify-center">
              <AnimatedRankIcon rank={rankProgress.currentRank} sizeClass="text-4xl" animated />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-semibold">내 현재 계급</p>
              <p className={`text-2xl font-extrabold ${rankProgress.currentRank.color}`}>
                {rankProgress.currentRank.name}
              </p>
              <p className="text-sm font-bold text-gray-700 mt-0.5">
                {user!.points.toLocaleString()}P · {user!.nickname}
              </p>
            </div>
          </div>

          {rankProgress.nextRank ? (
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{rankProgress.currentRank.name}</span>
                <span className={`font-semibold ${rankProgress.nextRank.color}`}>
                  다음: {rankProgress.nextRank.name}
                </span>
              </div>
              <div className="w-full bg-white/50 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-2.5 rounded-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all"
                  style={{ width: `${rankProgress.progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-gray-400">{rankProgress.progressPercent}%</span>
                <span className="text-gray-600 font-medium">
                  {rankProgress.pointsToNext.toLocaleString()}P 남음
                </span>
              </div>
              <p className="text-xs text-violet-600 mt-2 font-medium bg-white/40 rounded-xl px-3 py-2">
                {rankProgress.nextRank.rewardText}
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm font-bold text-purple-700">🌟 최고 계급 달성!</p>
              <p className="text-xs text-gray-500 mt-0.5">심심풀이 연구소 레전드입니다.</p>
            </div>
          )}
        </div>
      )}

      {/* ── 가입 유도 (게스트) ── */}
      {loaded && !isMember && (
        <div className="bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-100 rounded-3xl p-5 mb-8 text-center">
          <div className="text-3xl mb-2">🪖</div>
          <p className="font-bold text-gray-800">훈련병 · 미가입</p>
          <p className="text-xs text-gray-500 mt-1 mb-4">회원가입하면 500P와 함께 이등병으로 즉시 임관!</p>
          <Link
            href="/auth/signup"
            className="inline-block px-6 py-3 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-2xl text-sm font-bold hover:opacity-90 transition-opacity"
          >
            가입하고 이등병 시작 →
          </Link>
        </div>
      )}

      {/* ── 프리미엄 효과 안내 ── */}
      <div className="bg-gray-900 text-white rounded-2xl p-5 mb-8">
        <h3 className="font-extrabold text-sm mb-3 text-yellow-300">계급별 특수 효과</h3>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-bold w-16 flex-shrink-0">하사~준위</span>
            <span className="opacity-80">부사관 전용 소프트 펄스 뱃지</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-bold w-16 flex-shrink-0">소위~대위</span>
            <span className="opacity-80">✨ 빛나는 장교 shine 효과 해금</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold w-16 flex-shrink-0">소령~대령</span>
            <span className="opacity-80">⬆️ 부유하는 float + glow 효과 해금</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 font-bold w-16 flex-shrink-0">준장~대장</span>
            <span className="opacity-80">👑 장군 전용 오라 + sparkle 효과 해금</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-purple-400 font-bold w-16 flex-shrink-0">원수</span>
            <span className="opacity-80">🌟 레전드 전용 orbit 불꽃 오라 해금</span>
          </div>
        </div>
      </div>

      {/* ── 계급 tier별 타임라인 ── */}
      {tierGroups.map(({ tier, ranks }) => {
        const info = TIER_LABELS[tier];
        return (
          <div key={tier} className="mb-8">
            {/* Tier 헤더 */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-px bg-gray-200" />
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-extrabold text-gray-600 tracking-wide">
                  {info.label}
                </span>
                {info.badge && (
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${info.badgeColor}`}>
                    {info.badge}
                  </span>
                )}
              </div>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            <div className="space-y-2">
              {ranks.map((rank) => {
                const isCurrent = currentRankId === rank.id;
                const isNext = nextRankId === rank.id;
                const isUnlocked = isMember && user!.points >= rank.minPoints;
                return (
                  <RankCard
                    key={rank.id}
                    rank={rank}
                    isCurrent={isCurrent}
                    isNext={isNext}
                    isUnlocked={isUnlocked}
                  />
                );
              })}
            </div>
          </div>
        );
      })}

      {/* ── 포인트 얻는 방법 ── */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
        <h3 className="font-extrabold text-sm text-gray-800 mb-3">포인트 얻는 방법</h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          {[
            ["📅 출석체크", "+100P"],
            ["🔥 7일 개근 보너스", "+1,000P"],
            ["🧠 심리테스트 완료", "+30P"],
            ["🏆 월드컵 완료", "+50P"],
            ["🔤 초성퀴즈 완료", "+40P"],
            ["👥 같이놀기 완료", "+80P"],
            ["🎮 방 만들기", "+120P"],
            ["👋 친구 초대", "+150P"],
          ].map(([label, pts]) => (
            <div key={label} className="flex justify-between items-center bg-gray-50 rounded-xl px-3 py-2">
              <span>{label}</span>
              <span className="font-bold text-brand-purple">{pts}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="space-y-2">
        <Link
          href="/check-in"
          className="block w-full py-3.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-2xl text-sm font-bold text-center hover:opacity-90 transition-opacity"
        >
          📅 오늘 출석하기 +100P
        </Link>
        <div className="grid grid-cols-2 gap-2">
          <Link href="/games" className="py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center hover:bg-violet-100 transition-colors">
            🎮 포인트 주는 게임
          </Link>
          <Link href="/together" className="py-3 bg-violet-50 border border-violet-100 rounded-2xl text-sm font-bold text-violet-700 text-center hover:bg-violet-100 transition-colors">
            👥 같이놀기 +120P
          </Link>
        </div>
        <Link
          href="/leaderboard"
          className="block w-full py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-semibold text-gray-600 text-center hover:bg-gray-100 transition-colors"
        >
          🏆 랭킹 보기
        </Link>
      </div>
    </div>
  );
}
