import type { Metadata } from "next";
import Link from "next/link";
import { TOGETHER_GAMES } from "@/data/together/togetherGames";
import TogetherGameCard from "@/components/together/TogetherGameCard";

export const metadata: Metadata = {
  title: "같이놀기 | 심심풀이 연구소",
  description:
    "친구들과 함께하는 파티게임! 이미지투표, 밸런스게임, 초성퀴즈, 궁합방, 친구맞히기, 미션룰렛. AI 봇이 있어서 혼자 와도 즐겁게 놀 수 있어요.",
  openGraph: {
    title: "같이놀기 | 심심풀이 연구소",
    description: "친구들과 함께하는 파티게임! 혼자 와도 AI 친구가 같이 놀아줘요.",
  },
};

export default function TogetherPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 히어로 */}
      <section className="py-12 px-4 text-center bg-gradient-to-b from-violet-50 to-[#FAF7F2]">
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-4">👥</div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">같이놀기</h1>
          <p className="text-lg text-gray-600 mb-2">친구들과 함께하는 파티게임</p>
          <p className="text-sm text-violet-600 font-semibold mb-6">
            🤖 혼자 와도 AI 친구가 같이 놀아줘요!
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/together/create"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              🎮 방 만들기
            </Link>
            <Link
              href="/together/create"
              className="px-6 py-3 rounded-2xl border-2 border-violet-300 text-violet-700 font-bold hover:bg-violet-50 transition-all"
            >
              🤖 AI랑 바로 시작
            </Link>
          </div>
        </div>
      </section>

      {/* 안내 배너 */}
      <section className="px-4 mb-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-violet-50 border border-violet-200 rounded-2xl px-4 py-3 flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="text-sm text-violet-800 font-semibold">AI 봇 안내</p>
              <p className="text-xs text-violet-600">
                게임 참가자가 부족할 때 AI 봇이 자동으로 참여해요. AI 봇은 항상 &quot;AI 친구&quot;로 표시되며, 실제 사람처럼 속이지 않습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 게임 목록 */}
      <section className="py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-black text-gray-900 mb-4">게임 종류</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TOGETHER_GAMES.map((game) => (
              <TogetherGameCard key={game.gameType} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* 방법 안내 */}
      <section className="py-8 px-4 bg-white">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-black text-gray-900 mb-5 text-center">어떻게 하나요?</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { emoji: "🎮", step: "1", title: "방 만들기", desc: "게임 선택 후 방 생성" },
              { emoji: "📤", step: "2", title: "링크 공유", desc: "친구에게 방 코드 전달" },
              { emoji: "🎉", step: "3", title: "같이 놀기", desc: "게임 시작!" },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center text-2xl">
                  {s.emoji}
                </div>
                <p className="font-bold text-gray-900 text-sm">{s.title}</p>
                <p className="text-xs text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 px-4 text-center">
        <div className="max-w-sm mx-auto">
          <Link
            href="/together/create"
            className="block w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg"
          >
            🚀 지금 바로 방 만들기
          </Link>
          <p className="text-xs text-gray-400 mt-3">무료 · 로그인 불필요 · AI 봇 지원</p>
        </div>
      </section>
    </div>
  );
}
