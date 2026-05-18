import type { Metadata } from "next";
import Link from "next/link";
import { getGameConfig } from "@/data/together/togetherGames";

export const metadata: Metadata = {
  title: "랜덤 미션 룰렛 | 같이놀기 | 심심풀이 연구소",
  description: "룰렛을 돌려 누가 미션을 받을지 결정하세요!",
};

export default function MissionRoulettePage() {
  const game = getGameConfig("mission-roulette");
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
            <li className="flex gap-2"><span className="font-bold text-amber-500">1.</span> 방장이 룰렛을 돌립니다</li>
            <li className="flex gap-2"><span className="font-bold text-amber-500">2.</span> 참가자 중 한 명이 랜덤으로 선택됩니다</li>
            <li className="flex gap-2"><span className="font-bold text-amber-500">3.</span> 선택된 사람이 미션을 수행합니다</li>
            <li className="flex gap-2"><span className="font-bold text-amber-500">4.</span> 여러 라운드 동안 재미있는 미션을 즐겨요!</li>
          </ol>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
          <p className="text-xs font-semibold text-amber-800 mb-2">✅ 미션 예시</p>
          <div className="space-y-1">
            {["가장 최근 저장한 사진 설명하기", "방 안 사람 한 명 칭찬하기", "오늘 가장 웃겼던 일 말하기"].map((m) => (
              <p key={m} className="text-xs text-amber-700">• {m}</p>
            ))}
          </div>
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
        <Link href="/together/create" className="block w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-center text-lg hover:opacity-90 transition-all">
          🎰 방 만들기
        </Link>
      </div>
    </div>
  );
}
