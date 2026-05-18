import type { Metadata } from "next";
import Link from "next/link";
import { getGameConfig } from "@/data/together/togetherGames";

export const metadata: Metadata = {
  title: "같이 밸런스게임 | 같이놀기 | 심심풀이 연구소",
  description: "친구들과 함께 밸런스 선택! 다수파와 소수파를 공개합니다.",
};

export default function BalanceRoomPage() {
  const game = getGameConfig("balance-room");
  return (
    <div className="min-h-screen bg-[#FAF7F2] py-8 px-4">
      <div className="max-w-md mx-auto">
        <Link href="/together" className="text-sm text-violet-600 hover:underline mb-6 block">← 게임 목록</Link>
        <div className="rounded-3xl p-8 text-center mb-6" style={{ background: game.bgColor }}>
          <div className="text-7xl mb-4">{game.emoji}</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">{game.title}</h1>
          <p className="text-gray-600">{game.subtitle}</p>
        </div>
        <div className="bg-white rounded-2xl p-5 mb-4 border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-3">게임 방법</h2>
          <ol className="space-y-2 text-sm text-gray-700">
            <li className="flex gap-2"><span className="font-bold text-blue-500">1.</span> A/B 밸런스 선택지가 제시됩니다</li>
            <li className="flex gap-2"><span className="font-bold text-blue-500">2.</span> 동시에 하나를 선택합니다</li>
            <li className="flex gap-2"><span className="font-bold text-blue-500">3.</span> 다수파와 소수파가 공개됩니다</li>
            <li className="flex gap-2"><span className="font-bold text-blue-500">4.</span> 소수파가 되면 특별 뱃지를 받아요!</li>
          </ol>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-3 text-center border border-gray-100">
            <p className="text-2xl font-black text-gray-900">{game.recommendedPlayers}</p>
            <p className="text-xs text-gray-500">추천 인원</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center border border-gray-100">
            <p className="text-2xl font-black text-gray-900">{game.estimatedMinutes}분</p>
            <p className="text-xs text-gray-500">소요 시간</p>
          </div>
          <div className="bg-white rounded-2xl p-3 text-center border border-gray-100">
            <p className="text-2xl font-black text-gray-900">AI</p>
            <p className="text-xs text-gray-500">봇 지원</p>
          </div>
        </div>
        <Link href="/together/create" className="block w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-bold text-center text-lg hover:opacity-90 transition-all">
          🎮 방 만들기
        </Link>
      </div>
    </div>
  );
}
