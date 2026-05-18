import Link from "next/link";
import { worldcupList } from "@/data/games/worldcupData";
import { balanceGameList } from "@/data/games/balanceData";
import { initialQuizList } from "@/data/games/initialQuizData";
import { nonsenseSets } from "@/data/games/nonsenseData";

const gameCategories = [
  {
    href: "/games/worldcup",
    emoji: "🏆",
    title: "이상형 월드컵",
    desc: "토너먼트로 나의 이상형 찾기",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    count: worldcupList.length,
  },
  {
    href: "/games/balance",
    emoji: "⚖️",
    title: "밸런스 게임",
    desc: "A vs B, 둘 중 하나만 골라야 한다면?",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    count: balanceGameList.length,
  },
  {
    href: "/games/initial-quiz",
    emoji: "🔤",
    title: "초성 퀴즈",
    desc: "초성만 보고 단어 맞히기",
    color: "#F97316",
    bgColor: "#FFF7ED",
    count: initialQuizList.length,
  },
  {
    href: "/games/nonsense",
    emoji: "🤣",
    title: "넌센스 퀴즈",
    desc: "맞히면 웃고, 틀려도 웃는 퀴즈",
    color: "#EAB308",
    bgColor: "#FEFCE8",
    count: nonsenseSets.length,
  },
  {
    href: "/games/observation",
    emoji: "👁️",
    title: "관찰력 테스트",
    desc: "숨은 다른 하나 찾기",
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
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900">두뇌게임 & 미니게임</h1>
          <p className="text-gray-500 text-sm mt-1">심심할 때 3분 게임!</p>
        </div>

        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-1 gap-3">
          {gameCategories.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div
                className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 bg-white hover:shadow-md transition-shadow"
                style={{ borderLeftColor: cat.color, borderLeftWidth: 4 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: cat.bgColor }}
                >
                  {cat.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{cat.title}</span>
                    {cat.count && (
                      <span className="text-xs text-gray-400">{cat.count}개</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{cat.desc}</p>
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
