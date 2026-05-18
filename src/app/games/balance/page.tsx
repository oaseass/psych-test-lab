import Link from "next/link";
import { balanceGameList } from "@/data/games/balanceData";

export default function BalanceListPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900">⚖️ 밸런스 게임</h1>
          <p className="text-gray-500 text-sm mt-1">둘 중 하나만 고른다면?</p>
        </div>

        <div className="flex flex-col gap-3">
          {balanceGameList.map((g) => (
            <Link key={g.id} href={`/games/balance/${g.slug}`}>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: g.bgColor }}
                >
                  {g.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{g.title}</span>
                    {g.isNew && (
                      <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-bold">NEW</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{g.description}</p>
                  {g.playCount && (
                    <p className="text-xs text-gray-400 mt-1">👥 {g.playCount.toLocaleString()}명 참여</p>
                  )}
                </div>
                <span className="text-gray-300">›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
