import Link from "next/link";
import type { LuckyGameConfig } from "@/lib/lucky/types";

// ─────────────────────────────────────────────
// LuckyGameCard — 럭키존 게임 카드
// ─────────────────────────────────────────────

type Props = {
  config: LuckyGameConfig;
  unlocked: boolean;
  isNew?: boolean;
  isHot?: boolean;
};

export default function LuckyGameCard({ config, unlocked, isNew, isHot }: Props) {
  const card = (
    <div
      className={`flex flex-col gap-2 p-4 rounded-2xl border-2 transition-all ${
        unlocked
          ? "hover:shadow-md active:scale-[0.98] cursor-pointer"
          : "opacity-60 cursor-not-allowed"
      }`}
      style={{
        background: config.bgColor,
        borderColor: unlocked ? config.color + "40" : "#E5E7EB",
      }}
    >
      <div className="flex items-start justify-between">
        <div className="text-3xl">{config.icon}</div>
        <div className="flex gap-1 flex-wrap justify-end">
          {isHot && <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">🔥 HOT</span>}
          {isNew && <span className="text-[9px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>}
          {!unlocked && (
            <span className="text-[9px] bg-gray-400 text-white px-1.5 py-0.5 rounded-full font-bold">
              🔒 {config.minRankName}
            </span>
          )}
        </div>
      </div>
      <div>
        <div className="font-bold text-gray-900 text-sm">{config.title}</div>
        <div className="text-[11px] text-gray-500 mt-0.5 leading-snug">{config.description}</div>
      </div>
      <div className="flex justify-between items-center mt-1">
        <span className="text-[10px] text-gray-400">
          최대 {Math.max(...config.possibleMultipliers)}배 보상
        </span>
        {unlocked && (
          <span
            className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
            style={{ background: config.color }}
          >
            도전하기 →
          </span>
        )}
      </div>
    </div>
  );

  if (!unlocked) return card;
  return <Link href={config.route}>{card}</Link>;
}
