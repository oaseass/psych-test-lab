"use client";
import { useState } from "react";
import { notFound } from "next/navigation";
import { getWorldcupBySlug } from "@/data/games/worldcupData";
import WorldcupGame from "@/components/games/WorldcupGame";
import Link from "next/link";
import { use } from "react";
import PointRewardBanner from "@/components/user/PointRewardBanner";

export default function WorldcupPlayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const data = getWorldcupBySlug(slug);
  if (!data) notFound();

  return <WorldcupPlayClient data={data} />;
}

function WorldcupPlayClient({ data }: { data: NonNullable<ReturnType<typeof getWorldcupBySlug>> }) {
  const [winner, setWinner] = useState<string | null>(null);

  const winnerItem = winner ? data.items.find((i) => i.id === winner) : null;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-md mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/games/worldcup" className="text-gray-400 hover:text-gray-600 text-xl">‹</Link>
          <div>
            <h1 className="font-bold text-gray-900">{data.title}</h1>
            <p className="text-xs text-gray-500">{data.description}</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm">
          {winner ? (
            <div className="flex flex-col items-center gap-6 py-4">
              <div className="text-5xl">{winnerItem?.emoji}</div>
              <div
                className="text-xl font-bold text-white px-6 py-3 rounded-2xl"
                style={{ background: data.color }}
              >
                🏆 최종 우승!
              </div>
              <div className="text-xl font-semibold text-gray-800">{winnerItem?.label}</div>
              <p className="text-gray-500 text-sm text-center">{winnerItem?.description}</p>
              <button
                onClick={() => setWinner(null)}
                className="px-6 py-2 rounded-full text-sm font-bold text-white"
                style={{ background: data.color }}
              >
                다시 하기
              </button>
              <PointRewardBanner contentId={data.slug} reason="worldcup_complete" className="w-full" />
              <Link href="/games/worldcup" className="text-sm text-gray-400 underline">
                다른 월드컵 보기
              </Link>
            </div>
          ) : (
            <WorldcupGame data={data} onComplete={setWinner} />
          )}
        </div>
      </div>
    </div>
  );
}
