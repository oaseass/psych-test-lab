import type { LuckyResult } from "@/lib/lucky/types";
import { getLuckyGameConfig } from "@/data/luckyGames";

// ─────────────────────────────────────────────
// LuckyHistoryList — 럭키 기록 목록
// ─────────────────────────────────────────────

type Props = {
  results: LuckyResult[];
  limit?: number;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours().toString().padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
}

export default function LuckyHistoryList({ results, limit }: Props) {
  const list = limit ? results.slice(0, limit) : results;

  if (list.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400 text-sm">
        아직 기록이 없습니다.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {list.map((r) => {
        const config = getLuckyGameConfig(r.gameType);
        return (
          <div
            key={r.id}
            className={`flex items-center gap-3 p-3 rounded-xl border ${
              r.isWin ? "bg-green-50 border-green-100" : "bg-red-50 border-red-100"
            }`}
          >
            <div className="text-2xl">{config?.icon ?? "🎮"}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-gray-800">{config?.title ?? r.gameType}</span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${r.isWin ? "bg-green-500 text-white" : "bg-red-400 text-white"}`}>
                  {r.isWin ? "성공" : "실패"}
                </span>
              </div>
              <div className="text-[11px] text-gray-400">{formatDate(r.createdAt)}</div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className={`text-sm font-black ${r.netPoints >= 0 ? "text-green-600" : "text-red-500"}`}>
                {r.netPoints >= 0 ? `+${r.netPoints}P` : `${r.netPoints}P`}
              </div>
              <div className="text-[10px] text-gray-400">사용 {r.stakePoints}P</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
