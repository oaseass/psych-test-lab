import type { Metadata } from "next";
import Link from "next/link";
import { getGameConfig } from "@/data/together/togetherGames";

export const metadata: Metadata = {
  title: "친구 맞히기 퀴즈 | 같이놀기 | 심심풀이 연구소",
  description: "방장에 관한 질문! 방장의 답변을 예측하면 점수를 드립니다.",
};

export default function FriendQuizPage() {
  const game = getGameConfig("friend-quiz");
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
            <li className="flex gap-2"><span className="font-bold text-emerald-500">1.</span> 방장에 관한 질문이 나옵니다</li>
            <li className="flex gap-2"><span className="font-bold text-emerald-500">2.</span> 방장의 답변이 미리 설정됩니다</li>
            <li className="flex gap-2"><span className="font-bold text-emerald-500">3.</span> 나머지 참가자들이 방장의 답을 맞힙니다</li>
            <li className="flex gap-2"><span className="font-bold text-emerald-500">4.</span> 정답이면 +10점!</li>
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
        <Link href="/together/create" className="block w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-center text-lg hover:opacity-90 transition-all">
          🤔 방 만들기
        </Link>
      </div>
    </div>
  );
}
