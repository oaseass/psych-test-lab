import Link from "next/link";

export type RecommendItem = {
  href: string;
  emoji: string;
  label: string;
  sub?: string;
  tag?: string;
  bgColor?: string;
};

const ALL_CONTENT: RecommendItem[] = [
  { href: "/games/worldcup/isanghyeong", emoji: "🏆", label: "이상형 월드컵", sub: "토너먼트 선택", tag: "월드컵", bgColor: "#EDE9FE" },
  { href: "/games/worldcup/food-worldcup", emoji: "🍕", label: "음식 월드컵", sub: "최애 음식은?", tag: "월드컵", bgColor: "#FEF3C7" },
  { href: "/games/worldcup/travel", emoji: "✈️", label: "여행지 월드컵", sub: "떠나고 싶은 곳", tag: "월드컵", bgColor: "#ECFDF5" },
  { href: "/games/balance/realistic-choice", emoji: "⚖️", label: "현실 밸런스", sub: "A vs B 선택", tag: "밸런스", bgColor: "#FDF2F8" },
  { href: "/games/balance/workplace", emoji: "💼", label: "직장인 밸런스", sub: "공감 100%", tag: "밸런스", bgColor: "#EFF6FF" },
  { href: "/games/initial-quiz/korean-food", emoji: "🍜", label: "한식 초성퀴즈", sub: "몇 개 맞힐까?", tag: "퀴즈", bgColor: "#FFF7ED" },
  { href: "/games/initial-quiz/kpop-song", emoji: "🎵", label: "K-POP 초성퀴즈", sub: "노래 제목은?", tag: "퀴즈", bgColor: "#FCE7F3" },
  { href: "/games/initial-quiz/korean-movie", emoji: "🎬", label: "영화 초성퀴즈", sub: "제목을 맞혀라", tag: "퀴즈", bgColor: "#F0FDF4" },
  { href: "/games/nonsense", emoji: "🤣", label: "넌센스 퀴즈", sub: "웃으면서 풀기", tag: "퀴즈", bgColor: "#FFFBEB" },
  { href: "/games/observation", emoji: "👁️", label: "관찰력 테스트", sub: "다른 하나 찾기", tag: "두뇌", bgColor: "#ECFEFF" },
  { href: "/games/memory", emoji: "🧠", label: "기억력 테스트", sub: "순서를 외워라", tag: "두뇌", bgColor: "#ECFDF5" },
  { href: "/games/reaction", emoji: "⚡", label: "반응속도 테스트", sub: "빠르게 클릭!", tag: "두뇌", bgColor: "#FEF2F2" },
  { href: "/polls", emoji: "🗳️", label: "HOT 투표 참여", sub: "지금 참여중!", tag: "투표", bgColor: "#F0FDF4" },
  { href: "/generator/nickname", emoji: "✨", label: "별명 생성기", sub: "나만의 별명", tag: "생성기", bgColor: "#FAF5FF" },
  { href: "/generator/daily-fortune", emoji: "🔮", label: "오늘의 운세", sub: "오늘은 어떨까?", tag: "생성기", bgColor: "#FFF8F0" },
  { href: "/generator/past-life", emoji: "⏳", label: "전생 직업 생성기", sub: "전생에는 뭐였을까", tag: "생성기", bgColor: "#F5F3FF" },
  { href: "/test/yeonae-gojang-paeteon/play", emoji: "💔", label: "연애 고장 패턴", sub: "심리테스트", tag: "심리", bgColor: "#FFF1F2" },
  { href: "/test/kkeullim-yuhyeong/play", emoji: "🌟", label: "끌림 유형", sub: "심리테스트", tag: "심리", bgColor: "#FFFBEB" },
];

function pickRecommends(exclude: string, count = 6): RecommendItem[] {
  const filtered = ALL_CONTENT.filter((c) => !c.href.includes(exclude));
  // shuffle deterministically using exclude string as seed
  let seed = 0;
  for (let i = 0; i < exclude.length; i++) seed += exclude.charCodeAt(i);
  const shuffled = [...filtered].sort((a, b) => {
    const h1 = (a.href.charCodeAt(0) + seed) % 17;
    const h2 = (b.href.charCodeAt(0) + seed + 1) % 17;
    return h1 - h2;
  });
  return shuffled.slice(0, count);
}

type Props = {
  currentSlug?: string;
  title?: string;
};

export default function NextContentRecommend({ currentSlug = "", title = "다음에 이거 해봐요 👇" }: Props) {
  const items = pickRecommends(currentSlug);

  return (
    <div className="mt-8 pt-6 border-t border-gray-100">
      <h3 className="font-extrabold text-gray-800 text-base mb-3">{title}</h3>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((item) => (
          <Link key={item.href} href={item.href}>
            <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all active:scale-[0.98]">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: item.bgColor || "#F3F4F6" }}
              >
                {item.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 text-xs leading-snug line-clamp-2">{item.label}</div>
                {item.tag && (
                  <span className="text-[10px] text-gray-400">{item.tag}</span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
