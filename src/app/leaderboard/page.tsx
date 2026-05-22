"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/user/authService";
import { getLeaderboard, getMyRank, type LeaderboardEntry } from "@/lib/user/leaderboardService";
import { getRankById } from "@/lib/user/rankService";
import type { UserProfile } from "@/lib/user/types";
import AnimatedRankIcon from "@/components/user/AnimatedRankIcon";
import RankingTable from "@/components/ranking/RankingTable";
import RankingPeriodTabs from "@/components/ranking/RankingPeriodTabs";
import type { RankingPeriod, RankingEntry } from "@/lib/ranking/types";
import {
  getSectionRanking,
  getLuckyRanking,
  getTogetherRanking,
  getBadgeLeaderboard,
} from "@/lib/ranking/rankingService";

function leaderboardToRankingEntry(e: LeaderboardEntry): RankingEntry {
  return {
    id: e.userId,
    rank: e.rank,
    userId: e.userId,
    nickname: e.nickname,
    rankIcon: e.rankIcon,
    rankName: e.rankName,
    title: e.nickname,
    value: e.points,
    displayValue: `${e.points.toLocaleString()}P`,
    subValue: e.rankName,
    createdAt: new Date().toISOString(),
  };
}

const SECTIONS = [
  { key: "points",          label: "전체 포인트",     icon: "🏅", desc: "누적 포인트 기준" },
  { key: "initial_quiz",    label: "초성퀴즈 점수",   icon: "🔤", desc: "최고 점수 기준" },
  { key: "reaction",        label: "반응속도",         icon: "⚡", desc: "빠를수록 높은 순위" },
  { key: "spot_difference", label: "틀린그림찾기",     icon: "🔍", desc: "클리어 시간 기준" },
  { key: "worldcup",        label: "월드컵 우승",      icon: "🏆", desc: "우승 횟수 기준" },
  { key: "lucky_king",      label: "럭키존 럭키왕",   icon: "👑", desc: "오늘 순획득 포인트 기준" },
  { key: "lucky_streak",    label: "럭키존 연승",      icon: "🔥", desc: "연속 성공 횟수 기준" },
  { key: "together_host",   label: "인기 방장",        icon: "🎮", desc: "방 생성 및 완료 횟수 기준" },
  { key: "invite",          label: "친구초대",         icon: "📨", desc: "초대 가입 성공 수 기준" },
  { key: "badge",           label: "뱃지 수집",        icon: "🎖️", desc: "보유 뱃지 수 기준" },
];

export default function LeaderboardPage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [pointEntries, setPointEntries] = useState<LeaderboardEntry[]>([]);
  const [myRank, setMyRank] = useState<number>(-1);
  const [period, setPeriod] = useState<RankingPeriod>("weekly");
  const [activeSection, setActiveSection] = useState("points");
  const [sectionEntries, setSectionEntries] = useState<RankingEntry[]>([]);

  useEffect(() => {
    const u = getCurrentUser();
    setUser(u);
    setPointEntries(getLeaderboard(50));
    if (u?.role === "member") setMyRank(getMyRank(u.id));
  }, []);

  useEffect(() => {
    if (activeSection === "points") {
      setSectionEntries(pointEntries.map(leaderboardToRankingEntry));
      return;
    }
    if (activeSection === "lucky_king") {
      setSectionEntries(getLuckyRanking("points", period));
      return;
    }
    if (activeSection === "lucky_streak") {
      setSectionEntries(getLuckyRanking("streak", period));
      return;
    }
    if (activeSection === "together_host") {
      setSectionEntries(getTogetherRanking("host", period));
      return;
    }
    if (activeSection === "badge") {
      setSectionEntries(getBadgeLeaderboard(period));
      return;
    }
    setSectionEntries(getSectionRanking(activeSection, period));
  }, [activeSection, period, pointEntries]);

  const isMember = user?.role === "member";
  const myUserId = isMember ? user!.id : undefined;

  const activeSec = SECTIONS.find((s) => s.key === activeSection) ?? SECTIONS[0];
  const isLucky = activeSection.startsWith("lucky");
  const isTogether = activeSection.startsWith("together");

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="text-center mb-5">
        <h1 className="text-2xl font-extrabold text-gray-900">🏅 리더보드</h1>
        <p className="text-sm text-gray-400 mt-1">전체 랭킹을 확인하세요</p>
      </div>

      {/* 기간 탭 */}
      <div className="mb-4">
        <RankingPeriodTabs period={period} onChange={setPeriod} />
      </div>

      {/* 섹션 탭 (가로 스크롤) */}
      <div className="flex gap-2 overflow-x-auto pb-1 mb-5 scrollbar-hide">
        {SECTIONS.map((s) => (
          <button
            key={s.key}
            onClick={() => setActiveSection(s.key)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
              activeSection === s.key
                ? "bg-violet-600 text-white border-violet-600 shadow"
                : "bg-white text-gray-600 border-gray-200 hover:border-violet-300"
            }`}
          >
            <span>{s.icon}</span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>

      {/* 활성 섹션 카드 */}
      <div
        className={`rounded-2xl p-5 mb-6 ${
          isLucky
            ? "bg-gradient-to-br from-yellow-50 to-amber-100 border border-yellow-200"
            : isTogether
            ? "bg-gradient-to-br from-pink-50 to-rose-100 border border-pink-200"
            : "bg-gradient-to-br from-violet-50 to-indigo-100 border border-violet-200"
        }`}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{activeSec.icon}</span>
          <span className="font-extrabold text-gray-800">{activeSec.label}</span>
        </div>
        <p className="text-xs text-gray-500 mb-4">{activeSec.desc}</p>
        <RankingTable entries={sectionEntries} myUserId={myUserId} showPodium maxRows={10} />
      </div>

      {/* 내 순위 배너 */}
      {isMember && (
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl p-4 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AnimatedRankIcon rank={getRankById(user!.rankId)} sizeClass="text-2xl" animated />
            <div>
              <p className="text-xs text-white/70">내 전체 순위</p>
              <p className="font-extrabold">
                {user!.nickname} · {user!.points.toLocaleString()}P
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold">{myRank > 0 ? `${myRank}위` : "-"}</p>
            <Link href="/my/records" className="text-xs text-white/70 underline mt-0.5 block">
              내 기록 보기
            </Link>
          </div>
        </div>
      )}

      {/* 비회원 CTA */}
      {!isMember && (
        <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-5 text-center">
          <p className="text-sm text-gray-600 mb-2">랭킹에 등록하려면 회원가입이 필요합니다.</p>
          <Link
            href="/auth/signup"
            className="inline-block px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-bold hover:bg-violet-700 transition-colors"
          >
            가입하고 이등병 시작
          </Link>
        </div>
      )}

      {/* 전체 포인트 TOP 50 */}
      <div className="mb-4">
        <h2 className="text-sm font-bold text-gray-500 mb-3">전체 포인트 TOP 50</h2>
        {pointEntries.length === 0 ? (
          <div className="text-center py-10">
            <div className="text-4xl mb-3">🏅</div>
            <p className="font-bold text-gray-700 text-sm">아직 1등이 없어요.</p>
            <p className="text-xs text-gray-400 mt-1">첫 번째 기록을 남기고 랜킹 1위에 올라가보세요.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {pointEntries.slice(0, 50).map((e) => {
              const isMe = user?.id === e.userId;
              return (
                <div
                  key={e.userId}
                  className={`flex items-center gap-3 p-3 rounded-2xl border ${
                    isMe ? "border-violet-300 bg-violet-50" : "border-gray-100 bg-white"
                  }`}
                >
                  <div className="w-7 text-center font-extrabold text-xs text-gray-400 flex-shrink-0">
                    {e.rank <= 3 ? ["🥇", "🥈", "🥉"][e.rank - 1] : e.rank}
                  </div>
                  <span className="text-lg">{e.rankIcon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`font-bold text-sm truncate ${isMe ? "text-violet-700" : "text-gray-800"}`}>
                        {e.nickname}
                      </span>
                      {isMe && (
                        <span className="text-[9px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full flex-shrink-0">
                          나
                        </span>
                      )}
                    </div>
                  <div className="text-xs text-gray-400">{e.rankName}</div>
                  </div>
                  <div className="text-sm font-bold text-violet-700 flex-shrink-0">
                    {e.points.toLocaleString()}P
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 하단 링크 */}
      <div className="flex justify-center gap-4 text-sm mt-6">
        <Link href="/my" className="text-gray-400 hover:text-indigo-600 transition-colors">
          👤 내 프로필
        </Link>
        <Link href="/my/records" className="text-gray-400 hover:text-indigo-600 transition-colors">
          📊 내 기록
        </Link>
        <Link href="/rank" className="text-gray-400 hover:text-indigo-600 transition-colors">
          🎖️ 계급 안내
        </Link>
      </div>
    </div>
  );
}
