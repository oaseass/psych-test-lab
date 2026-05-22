import Link from "next/link";
import type { TogetherGameConfig } from "@/lib/together/types";

interface Props {
  game: TogetherGameConfig;
  variant?: "wide" | "card";
}

export default function TogetherGameCard({ game, variant = "card" }: Props) {
  const href = `/together/games/${game.gameType}`;

  if (variant === "wide") {
    return (
      <Link href={href} className="group block">
        <div
          className="flex items-center gap-4 p-4 rounded-2xl border border-transparent hover:border-gray-200 hover:shadow-md transition-all"
          style={{ background: game.bgColor }}
        >
          <span className="text-4xl">{game.emoji}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-gray-900">{game.title}</h3>
            </div>
            <p className="text-sm text-gray-600 truncate">{game.subtitle}</p>
            <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
              <span>👥 {game.recommendedPlayers}</span>
              <span>⏱ {game.estimatedMinutes}분</span>
            </div>
          </div>
          <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block">
      <div
        className="relative rounded-2xl p-5 h-full hover:shadow-lg transition-all hover:-translate-y-1"
        style={{ background: game.bgColor }}
      >
        <div className="text-4xl mb-3">{game.emoji}</div>
        <h3 className="font-bold text-gray-900 mb-1">{game.title}</h3>
        <p className="text-sm text-gray-600 mb-3">{game.subtitle}</p>
        <div className="flex items-center gap-2 flex-wrap text-xs text-gray-500">
          <span>👥 {game.recommendedPlayers}</span>
          <span>⏱ {game.estimatedMinutes}분</span>
          <span className="px-1.5 py-0.5 rounded bg-violet-50 text-violet-600 font-semibold">링크 공유</span>
        </div>
        <div
          className="absolute bottom-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold group-hover:scale-110 transition-transform"
          style={{ background: `linear-gradient(135deg, ${game.gradientFrom}, ${game.gradientTo})` }}
        >
          →
        </div>
      </div>
    </Link>
  );
}
