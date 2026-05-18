import type { Metadata } from "next";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import SectionTitle from "@/components/common/SectionTitle";
import { worldcupList } from "@/data/games/worldcupData";
import { balanceGameList } from "@/data/games/balanceData";
import { initialQuizList } from "@/data/games/initialQuizData";
import { pollList } from "@/data/pollsData";
import { generatorList } from "@/data/generatorData";

export const metadata: Metadata = {
  title: "오늘의 놀이 | 심심풀이 연구소",
  description: "오늘 하루 심심풀이 연구소가 추천하는 콘텐츠를 만나보세요. 이상형 월드컵, 밸런스게임, 초성퀴즈, 투표, 생성기까지!",
};

// 날짜 기반 seed 생성
function getDailySeed(): number {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}

function seededPick<T>(arr: T[], seed: number, count: number): T[] {
  const shuffled = [...arr].sort((a, b) => {
    const ha = (JSON.stringify(a).length * seed) % 31;
    const hb = (JSON.stringify(b).length * (seed + 1)) % 31;
    return ha - hb;
  });
  return shuffled.slice(0, count);
}

const BRAIN_GAMES = [
  { href: "/games/observation", emoji: "👁️", label: "관찰력 테스트", sub: "다른 하나 찾기", bg: "#ECFEFF" },
  { href: "/games/memory", emoji: "🧠", label: "기억력 테스트", sub: "순서를 외워라", bg: "#ECFDF5" },
  { href: "/games/reaction", emoji: "⚡", label: "반응속도 테스트", sub: "빠르게 클릭!", bg: "#FEF2F2" },
  { href: "/games/nonsense", emoji: "🤣", label: "넌센스 퀴즈", sub: "웃으면서 풀기", bg: "#FFFBEB" },
];

// 오늘 날짜 포맷
function getDateStr(): string {
  const d = new Date();
  return `${d.getMonth() + 1}월 ${d.getDate()}일`;
}

// 요일
const DOW = ["일", "월", "화", "수", "목", "금", "토"];
function getDayOfWeek(): string {
  return DOW[new Date().getDay()] + "요일";
}

export default function DailyPage() {
  const seed = getDailySeed();

  const todayWorldcups = seededPick(worldcupList, seed, 4);
  const todayBalance = seededPick(balanceGameList, seed + 1, 4);
  const todayQuiz = seededPick(initialQuizList, seed + 2, 4);
  const todayPolls = seededPick(pollList, seed + 3, 4);
  const todayGenerators = seededPick(generatorList, seed + 4, 3);

  return (
    <LayoutContainer>
      {/* 날짜 헤더 */}
      <section className="-mx-4 px-6 py-8 mb-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 rounded-b-3xl sm:rounded-3xl sm:mx-0 text-white">
        <div className="text-white/70 text-xs font-semibold tracking-widest uppercase mb-1">TODAY&apos;S PICK</div>
        <h1 className="text-2xl sm:text-3xl font-extrabold leading-tight">
          {getDateStr()} {getDayOfWeek()}<br />
          오늘의 놀이 🎯
        </h1>
        <p className="mt-2 text-white/80 text-sm">매일 새로운 추천 콘텐츠</p>
        <div className="mt-4 flex gap-2 flex-wrap">
          <Link href="/" className="px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-xs font-bold hover:bg-white/30 transition-colors">
            ← 홈으로
          </Link>
          <Link href="/tests" className="px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-xs font-bold hover:bg-white/30 transition-colors">
            🧠 심리테스트
          </Link>
          <Link href="/games" className="px-4 py-2 bg-white/20 border border-white/30 rounded-xl text-xs font-bold hover:bg-white/30 transition-colors">
            🎮 게임 전체
          </Link>
        </div>
      </section>

      {/* 두뇌 미니게임 (항상 동일) */}
      <section className="mb-8">
        <SectionTitle title="🎮 오늘의 두뇌 게임" subtitle="관찰력 · 기억력 · 반응속도 · 넌센스" />
        <div className="grid grid-cols-2 gap-2">
          {BRAIN_GAMES.map((g) => (
            <Link key={g.href} href={g.href}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all active:scale-[0.98]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: g.bg }}>
                  {g.emoji}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-xs">{g.label}</div>
                  <div className="text-[11px] text-gray-400">{g.sub}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 오늘의 이상형 월드컵 */}
      <section className="mb-8">
        <SectionTitle
          title="🏆 오늘의 월드컵"
          action={<Link href="/games/worldcup" className="text-sm text-brand-purple font-medium hover:underline">전체 →</Link>}
        />
        <div className="grid grid-cols-2 gap-2">
          {todayWorldcups.map((w) => (
            <Link key={w.id} href={`/games/worldcup/${w.slug}`}>
              <div className="flex flex-col p-3 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all gap-2 h-full active:scale-[0.98]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: w.bgColor }}>
                  {w.emoji}
                </div>
                <div className="font-semibold text-gray-900 text-xs leading-snug">{w.title}</div>
                <div className="text-[11px] text-gray-400">{w.playCount?.toLocaleString()}명 참여</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 오늘의 밸런스 */}
      <section className="mb-8">
        <SectionTitle
          title="⚖️ 오늘의 밸런스"
          action={<Link href="/games/balance" className="text-sm text-brand-purple font-medium hover:underline">전체 →</Link>}
        />
        <div className="grid grid-cols-2 gap-2">
          {todayBalance.map((b) => (
            <Link key={b.id} href={`/games/balance/${b.slug}`}>
              <div className="flex flex-col p-3 bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all gap-2 h-full active:scale-[0.98]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: b.bgColor }}>
                  {b.emoji}
                </div>
                <div className="font-semibold text-gray-900 text-xs leading-snug">{b.title}</div>
                <div className="text-[11px] text-gray-400">{b.pairs.length}쌍</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 오늘의 초성퀴즈 */}
      <section className="mb-8">
        <SectionTitle
          title="🔤 오늘의 초성퀴즈"
          action={<Link href="/games/initial-quiz" className="text-sm text-brand-purple font-medium hover:underline">전체 →</Link>}
        />
        <div className="grid grid-cols-2 gap-2">
          {todayQuiz.map((q) => (
            <Link key={q.id} href={`/games/initial-quiz/${q.slug}`}>
              <div className="flex flex-col p-3 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all gap-2 h-full active:scale-[0.98]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: q.bgColor }}>
                  {q.emoji}
                </div>
                <div className="font-semibold text-gray-900 text-xs leading-snug">{q.title}</div>
                <div className="text-[11px] text-gray-400">{q.questions.length}문제</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 오늘의 투표 */}
      <section className="mb-8">
        <SectionTitle
          title="🗳️ 오늘의 투표"
          action={<Link href="/polls" className="text-sm text-brand-purple font-medium hover:underline">전체 →</Link>}
        />
        <div className="flex flex-col gap-2">
          {todayPolls.map((p) => (
            <Link key={p.id} href={`/polls/${p.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all active:scale-[0.98]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: p.bgColor }}>
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm leading-tight">{p.question}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{p.options.length}개 선택지</div>
                </div>
                {p.isHot && <span className="text-[10px] bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold flex-shrink-0">HOT</span>}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 오늘의 생성기 */}
      <section className="mb-8">
        <SectionTitle
          title="✨ 오늘의 생성기"
          action={<Link href="/generator" className="text-sm text-brand-purple font-medium hover:underline">전체 →</Link>}
        />
        <div className="grid grid-cols-3 gap-2">
          {todayGenerators.map((g) => (
            <Link key={g.id} href={`/generator/${g.slug}`}>
              <div className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all text-center active:scale-[0.98]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl" style={{ background: g.bgColor }}>
                  {g.emoji}
                </div>
                <span className="font-semibold text-gray-900 text-[11px] leading-snug">{g.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </LayoutContainer>
  );
}
