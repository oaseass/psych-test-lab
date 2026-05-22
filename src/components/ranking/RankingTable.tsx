"use client";
import type { RankingEntry } from "@/lib/ranking/types";
import UserRankCard from "./UserRankCard";
import TopThreePodium from "./TopThreePodium";

interface Props {
  entries: RankingEntry[];
  myUserId?: string;
  showPodium?: boolean;
  maxRows?: number;
}

export default function RankingTable({ entries, myUserId, showPodium = true, maxRows = 10 }: Props) {
  if (entries.length === 0) return null;

  const top3 = entries.slice(0, 3);
  const rest = entries.slice(3, maxRows);
  const myEntry = myUserId ? entries.find(e => e.userId === myUserId) : undefined;

  return (
    <div className="space-y-2">
      {showPodium && top3.length > 0 && <TopThreePodium entries={top3} />}

      {/* 4위 이하 */}
      <div className="space-y-1.5">
        {rest.map(entry => (
          <UserRankCard
            key={entry.id}
            entry={entry}
            highlight={!!myUserId && entry.userId === myUserId}
          />
        ))}
      </div>

      {/* 내 순위 (목록에 없는 경우) */}
      {myEntry && !rest.find(e => e.userId === myUserId) && myEntry.rank > 3 && (
        <div className="mt-3 border-t border-dashed border-indigo-200 pt-3">
          <div className="text-[11px] text-indigo-400 mb-1 px-1">내 순위</div>
          <UserRankCard entry={myEntry} highlight />
        </div>
      )}
    </div>
  );
}
