import Link from "next/link";
import { worldcupList } from "@/data/games/worldcupData";
import { balanceGameList } from "@/data/games/balanceData";
import { initialQuizList } from "@/data/games/initialQuizData";
import { nonsenseSets } from "@/data/games/nonsenseData";
import { spotSceneList } from "@/data/games/spotDifferenceData";

const FEATURED_GAMES = [
  {
    href: "/games/spot-difference",
    emoji: "🔍",
    title: "틀린그림 찾기",
    desc: "두 그림의 차이점을 모두 찾아라!",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    count: spotSceneList.length,
    isNew: true,
  },
  {
    href: "/games/worldcup",
    emoji: "🏆",
    title: "이상형 월드컵",
    desc: "토너먼트로 나의 이상형 찾기",
    color: "#F97316",
    bgColor: "#FFF7ED",
    count: worldcupList.length,
    isNew: false,
  },
  {
    href: "/games/initial-quiz",
    emoji: "🔤",
    title: "초성 퀴즈",
    desc: "초성만 보고 단어 맞히기",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    count: initialQuizList.length,
    isNew: false,
  },
  {
    href: "/games/balance",
    emoji: "⚖️",
    title: "밸런스 게임",
    desc: "A vs B, 둘 중 하나만 고른다면?",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    count: balanceGameList.length,
    isNew: false,
  },
];

const MORE_GAMES = [
  {
    href: "/games/nonsense",
    emoji: "🤣",
    title: "넌센스 퀴즈",
    desc: "맞혀도 웃고 틀려도 웃는 퀴즈",
    color: "#EAB308",
    bgColor: "#FEFCE8",
    count: nonsenseSets.length,
  },
  {
    href: "/games/observation",
    emoji: "👁️",
    title: "관찰력 테스트",
    desc: "틀린그림 · 숨은숫자 · 이모지 찾기",
    color: "#0891B2",
    bgColor: "#ECFEFF",
    count: null,
  },
  {
    href: "/games/memory",
    emoji: "🧠",
    title: "기억력 테스트",
    desc: "순서를 기억하고 따라해 봐요",
    color: "#059669",
    bgColor: "#ECFDF5",
    count: null,
  },
  {
    href: "/games/reaction",
    emoji: "⚡",
    title: "반응속도 테스트",
    desc: "나의 반응속도는 몇 ms?",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    count: null,
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #FAF7F2, #FDF4FF)" }}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-white rounded-2xl px-4 py-2 shadow-sm border border-purple-100 mb-3">
            <span className="text-xl">🎮</span>
            <span className="text-xs font-bold text-purple-600">심심풀이 연구소</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">미니게임</h1>
          <p className="text-sm text-gray-500 mt-1">심심할 때 3분 게임!</p>
        </div>

        {/* Featured games */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {FEATURED_GAMES.map((g) => (
            <Link key={g.href} href={g.href}>
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.97]">
                <div
                  className="w-full aspect-video flex items-center justify-center text-4xl"
                  style={{ background: g.bgColor }}
                >
                  {g.emoji}
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <h3 className="font-extrabold text-sm text-gray-800">{g.title}</h3>
                    {g.isNew && (
                      <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">NEW</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 leading-snug">{g.desc}</p>
                  {g.count && (
                    <p className="text-xs font-bold mt-1.5" style={{ color: g.color }}>{g.count}개 수록</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* More games */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">더보기</p>
        <div className="grid grid-cols-1 gap-2">
          {MORE_GAMES.map((g) => (
            <Link key={g.href} href={g.href}>
              <div className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ borderLeftColor: g.color, borderLeftWidth: 4 }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: g.bgColor }}>
                  {g.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-sm">{g.title}</div>
                  <p className="text-xs text-gray-500 mt-0.5">{g.desc}</p>
                </div>
                <span className="text-gray-300 text-lg">›</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
