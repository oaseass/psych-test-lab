import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";

const CATEGORIES = [
  {
    slug: "daily",
    name: "오늘의 놀이",
    icon: "🌟",
    description: "오늘 추천 심심풀이",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    href: "/",
  },
  {
    slug: "tests",
    name: "심리테스트",
    icon: "🧠",
    description: "나를 알아가는 심리 테스트",
    color: "#EC4899",
    bgColor: "#FDF2F8",
    href: "/tests",
  },
  {
    slug: "quizzes",
    name: "퀴즈/퍼즐",
    icon: "🧩",
    description: "초성퀴즈, 넌센스, 관찰력",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    href: "/games",
  },
  {
    slug: "choices",
    name: "선택게임",
    icon: "⚖️",
    description: "월드컵, 밸런스게임",
    color: "#EA580C",
    bgColor: "#FFF7ED",
    href: "/games",
  },
  {
    slug: "brain",
    name: "두뇌게임",
    icon: "🔍",
    description: "틀린그림찾기, 기억력",
    color: "#059669",
    bgColor: "#F0FDF4",
    href: "/games",
  },
  {
    slug: "together",
    name: "같이놀기",
    icon: "👥",
    description: "친구와 함께하는 게임",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    href: "/together",
  },
  {
    slug: "generators",
    name: "랜덤생성기",
    icon: "✨",
    description: "팀편성, 사다리타기",
    color: "#0891B2",
    bgColor: "#F0F9FF",
    href: "/generator",
  },
  {
    slug: "experiments",
    name: "웹실험",
    icon: "⚗️",
    description: "인터랙티브 실험 모음",
    color: "#1F2937",
    bgColor: "#F9FAFB",
    href: "/experiments",
  },
  {
    slug: "story",
    name: "선택형 스토리",
    icon: "📖",
    description: "내 선택으로 달라지는 결말",
    color: "#92400E",
    bgColor: "#FFFBEB",
    href: "/story",
  },
  {
    slug: "bingo",
    name: "빙고",
    icon: "🎯",
    description: "직장인·연애·여행 빙고",
    color: "#DC2626",
    bgColor: "#FFF1F2",
    href: "/bingo",
  },
  {
    slug: "gauge",
    name: "가짜 측정기",
    icon: "📊",
    description: "꼰대력·퇴사욕구 측정",
    color: "#D97706",
    bgColor: "#FFFBEB",
    href: "/gauge",
  },
  {
    slug: "community",
    name: "투표/랭킹",
    icon: "🗳️",
    description: "실시간 투표 참여하기",
    color: "#D97706",
    bgColor: "#FFFBEB",
    href: "/polls",
  },
];

export default function CategoriesPage() {
  return (
    <LayoutContainer>
      <div className="py-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gray-900">전체 카테고리</h1>
          <p className="text-gray-500 text-sm mt-2">
            심심풀이 연구소의 모든 놀이를 탐색해보세요
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={cat.href}>
              <div
                className="rounded-2xl p-4 hover:shadow-lg transition-all active:scale-[0.98] group"
                style={{ background: cat.bgColor }}
              >
                <div className="text-3xl mb-2">{cat.icon}</div>
                <div className="font-black text-gray-900 text-sm mb-0.5">{cat.name}</div>
                <p className="text-xs text-gray-500 leading-tight">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
        {/* 랜덤 버튼 */}
        <div className="mt-8 text-center">
          <Link href="/surprise">
            <button className="px-8 py-4 rounded-2xl font-black text-white shadow-lg hover:scale-105 active:scale-95 transition-all text-lg"
              style={{ background: "linear-gradient(135deg, #7C3AED, #EC4899)" }}>
              🎲 랜덤으로 하나 골라줘!
            </button>
          </Link>
        </div>
      </div>
    </LayoutContainer>
  );
}
