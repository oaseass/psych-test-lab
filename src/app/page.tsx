import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import AdSlot from "@/components/common/AdSlot";
import {
  getFeaturedTests,
  getNewTests,
} from "@/lib/data/testRepository";
import { worldcupList } from "@/data/games/worldcupData";
import { balanceGameList } from "@/data/games/balanceData";
import { initialQuizList } from "@/data/games/initialQuizData";
import { pollList } from "@/data/pollsData";
import { generatorList } from "@/data/generatorData";

export default function HomePage() {
  const featured = getFeaturedTests();
  const newTests = getNewTests();
  const featuredWorldcups = worldcupList.filter((w) => w.isFeatured).slice(0, 3);
  const featuredBalance = balanceGameList.filter((b) => b.isFeatured).slice(0, 3);
  const featuredQuiz = initialQuizList.filter((q) => q.isFeatured).slice(0, 3);
  const hotPolls = pollList.filter((p) => p.isHot).slice(0, 3);
  const featuredGenerators = generatorList.filter((g) => g.isFeatured).slice(0, 4);

  return (
    <LayoutContainer>
      {/* 히어로 섹션 */}
      <section className="text-center py-8 mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text leading-tight">
          심심할 때 오는 곳<br />
          <span className="text-brand-purple">심심풀이 포털</span>
        </h1>
        <p className="mt-3 text-gray-500 text-sm sm:text-base">
          심리테스트 · 월드컵 · 밸런스게임 · 초성퀴즈 · 투표 · 생성기
        </p>
        <div className="mt-5 flex flex-wrap gap-2 justify-center">
          <Link href="/games/worldcup" className="px-5 py-2.5 bg-purple-600 text-white rounded-2xl font-bold text-sm hover:bg-purple-700 transition-colors shadow-sm">
            🏆 월드컵
          </Link>
          <Link href="/games/balance" className="px-5 py-2.5 bg-pink-500 text-white rounded-2xl font-bold text-sm hover:bg-pink-600 transition-colors shadow-sm">
            ⚖️ 밸런스
          </Link>
          <Link href="/games/initial-quiz" className="px-5 py-2.5 bg-orange-500 text-white rounded-2xl font-bold text-sm hover:bg-orange-600 transition-colors shadow-sm">
            🔤 초성퀴즈
          </Link>
          <Link href="/polls" className="px-5 py-2.5 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-sm">
            🗳️ 투표
          </Link>
          <Link href="/generator" className="px-5 py-2.5 bg-yellow-500 text-white rounded-2xl font-bold text-sm hover:bg-yellow-600 transition-colors shadow-sm">
            ✨ 생성기
          </Link>
          <Link href="/tests" className="px-5 py-2.5 bg-white text-purple-600 border-2 border-purple-600 rounded-2xl font-bold text-sm hover:bg-purple-50 transition-colors">
            🧠 심리테스트
          </Link>
        </div>
      </section>

      {/* 이상형 월드컵 */}
      <section className="mb-8">
        <SectionTitle
          title="🏆 이상형 월드컵"
          subtitle="토너먼트로 나만의 이상형 찾기"
          action={<Link href="/games/worldcup" className="text-sm text-brand-purple font-medium hover:underline">더 보기 →</Link>}
        />
        <div className="flex flex-col gap-2">
          {featuredWorldcups.map((w) => (
            <Link key={w.id} href={`/games/worldcup/${w.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: w.bgColor }}>
                  {w.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{w.title}</div>
                  <div className="text-xs text-gray-400">{w.playCount?.toLocaleString()}명 참여</div>
                </div>
                <span className="text-gray-300">›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 밸런스 게임 */}
      <section className="mb-8">
        <SectionTitle
          title="⚖️ 밸런스 게임"
          subtitle="A vs B, 당신의 선택은?"
          action={<Link href="/games/balance" className="text-sm text-brand-purple font-medium hover:underline">더 보기 →</Link>}
        />
        <div className="flex flex-col gap-2">
          {featuredBalance.map((b) => (
            <Link key={b.id} href={`/games/balance/${b.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: b.bgColor }}>
                  {b.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{b.title}</div>
                  <div className="text-xs text-gray-400">{b.pairs.length}쌍</div>
                </div>
                <span className="text-gray-300">›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 초성 퀴즈 */}
      <section className="mb-8">
        <SectionTitle
          title="🔤 초성 퀴즈"
          subtitle="초성만 보고 맞힐 수 있을까?"
          action={<Link href="/games/initial-quiz" className="text-sm text-brand-purple font-medium hover:underline">더 보기 →</Link>}
        />
        <div className="flex flex-col gap-2">
          {featuredQuiz.map((q) => (
            <Link key={q.id} href={`/games/initial-quiz/${q.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: q.bgColor }}>
                  {q.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{q.title}</div>
                  <div className="text-xs text-gray-400">{q.questions.length}문제</div>
                </div>
                <span className="text-gray-300">›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 두뇌 미니게임 */}
      <section className="mb-8">
        <SectionTitle title="🎮 두뇌 미니게임" subtitle="관찰력 · 기억력 · 반응속도" />
        <div className="grid grid-cols-3 gap-2">
          {[
            { href: "/games/observation", emoji: "👁️", label: "관찰력", color: "#0891B2", bg: "#ECFEFF" },
            { href: "/games/memory", emoji: "🧠", label: "기억력", color: "#059669", bg: "#ECFDF5" },
            { href: "/games/reaction", emoji: "⚡", label: "반응속도", color: "#DC2626", bg: "#FEF2F2" },
          ].map((g) => (
            <Link key={g.href} href={g.href}>
              <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: g.bg }}>
                  {g.emoji}
                </div>
                <span className="text-xs font-semibold text-gray-700">{g.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 광고 */}
      <AdSlot slotKey="header_banner" className="mb-8" />

      {/* HOT 투표 */}
      <section className="mb-8">
        <SectionTitle
          title="🗳️ 지금 HOT 투표"
          action={<Link href="/polls" className="text-sm text-brand-purple font-medium hover:underline">전체 투표 →</Link>}
        />
        <div className="flex flex-col gap-2">
          {hotPolls.map((p) => (
            <Link key={p.id} href={`/polls/${p.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: p.bgColor }}>
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{p.question}</div>
                  <div className="text-xs text-gray-400">{p.options.length}개 선택지</div>
                </div>
                <span className="text-xs bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold">HOT</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 생성기 */}
      <section className="mb-8">
        <SectionTitle
          title="✨ 생성기"
          subtitle="이름/생일로 나만의 결과 만들기"
          action={<Link href="/generator" className="text-sm text-brand-purple font-medium hover:underline">전체 보기 →</Link>}
        />
        <div className="grid grid-cols-2 gap-2">
          {featuredGenerators.map((g) => (
            <Link key={g.id} href={`/generator/${g.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <span className="text-2xl">{g.emoji}</span>
                <span className="font-semibold text-gray-900 text-xs">{g.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 넌센스 퀴즈 */}
      <section className="mb-8">
        <SectionTitle
          title="🤣 넌센스 퀴즈"
          action={<Link href="/games/nonsense" className="text-sm text-brand-purple font-medium hover:underline">풀어보기 →</Link>}
        />
        <Link href="/games/nonsense">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-5 text-white hover:shadow-md transition-shadow">
            <div className="text-3xl mb-2">🤣</div>
            <div className="font-bold text-lg">맞히면 웃고, 틀려도 웃는 퀴즈</div>
            <div className="text-sm text-white/80 mt-1">아재개그 · 반전 · 5초 퀴즈 · 연애 넌센스</div>
          </div>
        </Link>
      </section>

      {/* 인피드 광고 */}
      <AdSlot slotKey="in_feed_1" className="mb-8" />

      {/* 인기 심리테스트 */}
      {featured.length > 0 && (
        <section className="mb-10">
          <SectionTitle
            title="🧠 인기 심리테스트"
            subtitle="지금 가장 많이 하는 테스트"
            action={<Link href="/tests" className="text-sm text-brand-purple font-medium hover:underline">전체 보기 →</Link>}
          />
          <TestGrid tests={featured.slice(0, 6)} columns={3} />
        </section>
      )}

      {/* 신규 테스트 */}
      {newTests.length > 0 && (
        <section className="mb-10">
          <SectionTitle
            title="✨ 새로 추가된 테스트"
            action={<Link href="/new" className="text-sm text-brand-purple font-medium hover:underline">더 보기 →</Link>}
          />
          <TestGrid tests={newTests} columns={2} />
        </section>
      )}
    </LayoutContainer>
  );
}
