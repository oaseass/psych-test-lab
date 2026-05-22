import Link from "next/link";
import { spotSceneList } from "@/data/games/spotDifferenceData";

const GAMES = [
  {
    href: "/games/spot-difference",
    emoji: "🔍",
    title: "틀린그림 찾기",
    desc: "두 장면을 비교해 차이점 찾기",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    count: spotSceneList.length,
    ready: true,
  },
  {
    href: "#",
    emoji: "🔢",
    title: "숨은 숫자 찾기",
    desc: "복잡한 패턴에서 숫자를 찾아라",
    color: "#0891B2",
    bgColor: "#ECFEFF",
    count: null,
    ready: false,
  },
  {
    href: "#",
    emoji: "😵",
    title: "다른 이모지 찾기",
    desc: "하나뿐인 다른 이모지를 찾아라",
    color: "#059669",
    bgColor: "#ECFDF5",
    count: null,
    ready: false,
  },
];

export default function ObservationPage() {
  // ready=false 항목은 목록에서 제외 — 미완성 게임 비노출
  const readyGames = GAMES.filter((g) => g.ready);
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #F0FDFA, #ECFEFF)" }}>
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-white rounded-2xl px-4 py-2 shadow-sm border border-cyan-100 mb-4">
            <span className="text-2xl">👁️</span>
            <span className="text-xs font-bold text-cyan-600">관찰력 게임</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">관찰력 테스트</h1>
          <p className="text-sm text-gray-500 mt-1">눈을 크게 뜨고 집중해봐요</p>
        </div>
        <div className="flex flex-col gap-3">
          {readyGames.map((g) => (
            <Link key={g.href + g.title} href={g.href}>
              <div
                className="flex items-center gap-4 p-4 rounded-3xl border border-gray-100 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97]"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: g.bgColor }}
                >
                  {g.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-gray-800">{g.title}</h3>
                    {g.count && (
                      <span className="text-[10px] text-white px-2 py-0.5 rounded-full font-bold" style={{ background: g.color }}>
                        {g.count}개
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{g.desc}</p>
                </div>
                <div className="text-gray-300 font-bold text-lg">→</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
