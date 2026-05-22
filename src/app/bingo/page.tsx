"use client";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { bingoList } from "@/data/bingoData";

export default function BingoListPage() {
  return (
    <LayoutContainer>
      <div className="py-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🎯</div>
          <h1 className="text-2xl font-black text-gray-900">빙고 게임</h1>
          <p className="text-gray-500 text-sm mt-2">내가 해당되는 항목에 체크하고 빙고를 완성해봐요!</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {bingoList.map((bingo) => (
            <Link key={bingo.id} href={`/bingo/${bingo.slug}`}>
              <div
                className="rounded-2xl p-4 hover:shadow-lg transition-all active:scale-[0.98] group relative overflow-hidden"
                style={{ background: bingo.bgColor }}
              >
                <div className="text-3xl mb-2">{bingo.emoji}</div>
                <div className="flex items-center gap-1 mb-0.5">
                  <span className="font-bold text-gray-900 text-sm">{bingo.title}</span>
                  {bingo.isHot && <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">🔥</span>}
                </div>
                <p className="text-xs text-gray-500 line-clamp-1">{bingo.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
