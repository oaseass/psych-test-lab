"use client";
import { useState } from "react";
import type { ContentItem } from "@/lib/content/types";
import type { RankingPeriod } from "@/lib/ranking/types";
import { getRankingTabsForContent, getRanking, getResultDistribution, getChoiceDistribution, getWorldcupWinnerRanking } from "@/lib/ranking/rankingService";
import RankingTable from "./RankingTable";
import DistributionChart from "./DistributionChart";
import RankingPeriodTabs from "./RankingPeriodTabs";
import RankingEmptyState from "./RankingEmptyState";
import UserRankCard from "./UserRankCard";
import { getCurrentUser } from "@/lib/user/authService";

interface Props {
  contentItem: ContentItem;
  children: React.ReactNode;         // 메인 게임/테스트 콘텐츠
  myResultId?: string;               // 심리테스트 결과 ID
  myChoiceId?: string;               // 밸런스게임 내 선택 ID
  myWorldcupWinnerId?: string;       // 월드컵 내 우승 ID
}

export default function RankingTabs({ contentItem, children, myResultId, myChoiceId, myWorldcupWinnerId }: Props) {
  const tabs = getRankingTabsForContent(contentItem);
  const [activeTab, setActiveTab] = useState(tabs[0]?.key ?? "play");
  const [period, setPeriod] = useState<RankingPeriod>("weekly");
  const user = typeof window !== "undefined" ? getCurrentUser() : null;
  const isMember = user?.role === "member";

  const activeTabConfig = tabs.find(t => t.key === activeTab);

  function renderContent() {
    if (activeTab === "play") return children;

    const k = contentItem.kind;
    const rankType = activeTabConfig?.rankingType;

    // 결과 통계형 (심리테스트 등)
    if (activeTab === "stats" && rankType === "result_distribution") {
      const entries = getResultDistribution(contentItem.slug, period);
      const total = entries.reduce((s, e) => s + e.count, 0);
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-500">전체 참여 {total.toLocaleString()}명</div>
            <RankingPeriodTabs period={period} onChange={setPeriod} periods={["today", "weekly", "monthly", "all"]} />
          </div>
          <DistributionChart entries={entries} type="result" myResultId={myResultId} />
          {myResultId && (() => {
            const myEntry = entries.find(e => e.id === myResultId);
            if (!myEntry) return null;
            return (
              <div className="mt-3 bg-indigo-50 border border-indigo-200 rounded-2xl px-4 py-3 text-sm text-indigo-700 font-semibold">
                당신의 결과는 전체 참여자 중 <span className="text-indigo-900">{myEntry.percentage}%</span>가 나온 유형이에요.
              </div>
            );
          })()}
        </div>
      );
    }

    // 선택 비율형 (밸런스, 투표)
    if (activeTab === "stats" && rankType === "choice_distribution") {
      const entries = getChoiceDistribution(contentItem.slug, period);
      const myEntry = entries.find(e => e.id === myChoiceId);
      return (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <RankingPeriodTabs period={period} onChange={setPeriod} />
          </div>
          <DistributionChart entries={entries} type="choice" myResultId={myChoiceId} />
          {myEntry && (
            <div className={`mt-3 rounded-2xl px-4 py-3 text-sm font-semibold ${myEntry.percentage < 50 ? "bg-rose-50 border border-rose-200 text-rose-700" : "bg-emerald-50 border border-emerald-200 text-emerald-700"}`}>
              {myEntry.percentage < 50
                ? `당신은 ${myEntry.percentage}% 소수파입니다.`
                : `당신은 ${myEntry.percentage}% 다수파입니다.`}
            </div>
          )}
        </div>
      );
    }

    // 월드컵 우승 랭킹
    if (activeTab === "ranking" && rankType === "worldcup_winner") {
      const entries = getWorldcupWinnerRanking(contentItem.slug, period);
      return (
        <div className="space-y-4">
          <div className="flex justify-end">
            <RankingPeriodTabs period={period} onChange={setPeriod} />
          </div>
          {entries.length === 0 ? <RankingEmptyState message="아직 완료 기록이 없어요" /> : (
            <div className="space-y-2">
              {entries.map(entry => (
                <div key={entry.id} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-3 py-2.5 shadow-sm">
                  <div className="w-7 h-7 rounded-full bg-yellow-100 flex items-center justify-center font-black text-xs text-yellow-700">{entry.rank}</div>
                  <div className="flex-1 font-semibold text-sm text-gray-800">{entry.title}</div>
                  <div className="text-indigo-600 font-bold text-sm">{entry.displayValue}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // 시간/점수 랭킹
    if (activeTab === "ranking" && rankType && (rankType === "time" || rankType === "score")) {
      const entries = getRanking(contentItem.slug, rankType, period);
      return (
        <div className="space-y-4">
          <div className="flex justify-end">
            <RankingPeriodTabs period={period} onChange={setPeriod} />
          </div>
          {entries.length === 0
            ? <RankingEmptyState message="아직 기록이 없어요" />
            : <RankingTable entries={entries} myUserId={isMember ? user?.id : undefined} showPodium />}
        </div>
      );
    }

    // 럭키존 랭킹
    if (activeTab === "lucky_king" || activeTab === "lucky_streak") {
      const t = activeTab === "lucky_streak" ? "lucky_streak" : "lucky_points";
      const entries = getRanking("lucky_zone", t, period);
      return (
        <div className="space-y-4">
          <div className="flex justify-end">
            <RankingPeriodTabs period={period} onChange={setPeriod} periods={["today", "weekly", "all"]} />
          </div>
          <RankingTable entries={entries} myUserId={isMember ? user?.id : undefined} showPodium />
        </div>
      );
    }

    // 같이놀기 랭킹
    if (activeTab === "host") {
      const entries = getRanking("together", "together_host", period);
      return (
        <div className="space-y-4">
          <div className="flex justify-end">
            <RankingPeriodTabs period={period} onChange={setPeriod} />
          </div>
          <RankingTable entries={entries} myUserId={isMember ? user?.id : undefined} showPodium />
        </div>
      );
    }
    if (activeTab === "invite") {
      const entries = getRanking("global", "invite", period);
      return (
        <div className="space-y-4">
          <div className="flex justify-end">
            <RankingPeriodTabs period={period} onChange={setPeriod} />
          </div>
          <RankingTable entries={entries} myUserId={isMember ? user?.id : undefined} showPodium />
        </div>
      );
    }

    // 내 기록
    if (activeTab === "my") {
      if (!isMember) {
        return (
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <div className="text-4xl">🔓</div>
            <div className="text-sm text-gray-700 font-semibold">회원이 되면 기록을 랭킹에 남길 수 있어요!</div>
            <div className="text-xs text-gray-500">가입하면 500P 받고 이등병부터 시작합니다.</div>
            <a href="/auth/signup" className="px-5 py-2 bg-indigo-600 text-white text-sm rounded-full font-bold hover:bg-indigo-700 transition-colors">가입하고 랭킹 등록하기</a>
          </div>
        );
      }
      const myEntry = rankType ? (user?.id ? getRanking(contentItem.slug, rankType, "all").find(e => e.userId === user.id) : undefined) : undefined;
      return (
        <div className="py-4">
          {myEntry
            ? <UserRankCard entry={myEntry} highlight />
            : <RankingEmptyState message="아직 내 기록이 없어요. 플레이해 보세요!" ctaLabel="지금 도전하기" ctaHref={contentItem.route} />}
        </div>
      );
    }

    return null;
  }

  return (
    <div className="w-full">
      {/* 탭 네비게이션 */}
      <div className="flex border-b border-gray-200 mb-4 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-shrink-0 px-4 py-2.5 text-sm font-semibold border-b-2 transition-all ${
              activeTab === tab.key
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 내용 */}
      <div>{renderContent()}</div>
    </div>
  );
}
