import type { Metadata } from "next";
import Link from "next/link";
import { TOGETHER_GAMES } from "@/data/together/togetherGames";
import TogetherGameCard from "@/components/together/TogetherGameCard";

export const metadata: Metadata = {
  title: "같이놀기 | 심심풀이 연구소",
  description:
    "친구랑 링크 하나로 바로 시작. 이미지투표, 밸런스게임, 초성퀴즈, 궁합방, 친구맞히기, 미션룰렛.",
  openGraph: {
    title: "같이놀기 | 심심풀이 연구소",
    description: "방 만들고 링크 보내면 끝. 친구랑 같이 하면 더 웃김.",
  },
};

export default function TogetherPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* 히어로 */}
      <section className="py-12 px-4 text-center bg-gradient-to-b from-violet-50 to-[#FAF7F2]">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 bg-violet-100 text-violet-700 text-[11px] font-bold px-3 py-1 rounded-full mb-4">
            회원 전용 · 링크 공유 · 친구랑 같이하기
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-3">같이놀기</h1>
          <p className="text-lg text-gray-600 mb-2">방 만들고 링크 보내면 끝</p>
          <p className="text-sm text-gray-500 mb-6">
            친구랑 하면 더 웃기는 게임들 모음
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link
              href="/together/create"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold hover:opacity-90 transition-all shadow-md hover:shadow-lg"
            >
              🎮 방 만들기
            </Link>
            <Link
              href="/together"
              className="px-6 py-3 rounded-2xl border-2 border-violet-300 text-violet-700 font-bold hover:bg-violet-50 transition-all"
            >
              👀 게임 둘러보기
            </Link>
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

      {/* AI 연습방 안내 - 보조 섹션 */}
      <section className="px-4 pb-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">보조 기능</p>
            <p className="text-sm text-gray-700 font-semibold mb-1">혼자서 규칙만 먼저 익히고 싶다면?</p>
            <p className="text-xs text-gray-500 mb-3">
              AI 연습방에서 게임 방식을 먼저 확인해보세요. AI는 항상 AI로 표시되며 실제 사람이 아닙니다.
            </p>
            <Link
              href="/together/create"
              className="inline-block px-4 py-2 rounded-xl border border-gray-300 text-gray-600 text-xs font-bold hover:bg-gray-100 transition-colors"
            >
              AI 연습방 시작
            </Link>
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
          <p className="text-xs text-gray-400 mt-3">회원 전용 · 링크 공유</p>
        </div>
      </section>
    </div>
  );
}
