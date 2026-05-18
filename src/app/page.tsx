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

// playCount → 배지 텍스트 (숫자 직노출 대신)
function playBadge(count?: number): string | null {
  if (!count) return null;
  if (count >= 40000) return "인기";
  if (count >= 25000) return "많이 하는 중";
  if (count >= 10000) return "HOT";
  return null;
}

// 오늘의 놀이 — 카테고리별 고정 진입 카드
const TODAY_CATEGORIES = [
  { href: "/tests", emoji: "🧠", label: "오늘의 심리테스트", tag: "심리", bgFrom: "#EDE9FE", bgTo: "#E0E7FF" },
  { href: "/games/worldcup", emoji: "🏆", label: "오늘의 월드컵", tag: "월드컵", bgFrom: "#FDF2F8", bgTo: "#FCE7F3" },
  { href: "/games/balance", emoji: "⚖️", label: "오늘의 밸런스게임", tag: "밸런스", bgFrom: "#FFF0F6", bgTo: "#FFE4E6" },
  { href: "/games/initial-quiz", emoji: "🔤", label: "오늘의 초성퀴즈", tag: "퀴즈", bgFrom: "#FFF7ED", bgTo: "#FFEDD5" },
  { href: "/polls", emoji: "🗳️", label: "오늘의 투표", tag: "투표", bgFrom: "#ECFDF5", bgTo: "#D1FAE5" },
  { href: "/generator", emoji: "✨", label: "오늘의 생성기", tag: "생성기", bgFrom: "#FEFCE8", bgTo: "#FEF9C3" },
];

export default function HomePage() {
  const featured = getFeaturedTests();
  const newTests = getNewTests();

  return (
    <LayoutContainer>

      {/* ════════════════════════════
          1. 히어로
      ════════════════════════════ */}
      <section className="text-center pt-8 pb-6 mb-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text leading-tight">
          할 거 없을 때<br />
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">3분만 눌러봐 👇</span>
        </h1>
        <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
          심리테스트, 월드컵, 밸런스게임, 초성퀴즈, 투표, 생성기까지.<br />
          심심할 때 바로 하는 무료 놀이 모음.
        </p>
        <div className="mt-5 flex gap-3 justify-center">
          <Link href="/daily" className="px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-2xl font-bold text-sm shadow-md hover:shadow-lg hover:opacity-95 transition-all active:scale-95">
            🎯 오늘의 놀이 시작
          </Link>
          <Link href="/tests" className="px-5 py-3 bg-white text-purple-700 border-2 border-purple-200 rounded-2xl font-bold text-sm hover:border-purple-400 transition-colors active:scale-95">
            🔥 인기 콘텐츠 보기
          </Link>
        </div>
      </section>

      {/* ════════════════════════════
          2. 오늘의 놀이
      ════════════════════════════ */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-base font-extrabold text-gray-900">🎯 오늘의 놀이</h2>
            <p className="text-xs text-gray-400 mt-0.5">카테고리별 지금 바로 시작</p>
          </div>
          <Link href="/daily" className="text-xs text-brand-purple font-semibold hover:underline">
            전체 보기 →
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {TODAY_CATEGORIES.map((cat) => (
            <Link key={cat.href} href={cat.href}>
              <div
                className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-gray-100 hover:shadow-md transition-all text-center active:scale-[0.97]"
                style={{ background: `linear-gradient(135deg, ${cat.bgFrom}, ${cat.bgTo})` }}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-[11px] font-bold text-gray-800 leading-tight">{cat.label}</span>
                <span className="text-[9px] bg-white/70 text-gray-500 px-1.5 py-0.5 rounded-full font-medium">{cat.tag}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          3. 같이놀기
      ════════════════════════════ */}
      <section className="mb-8">
        <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl p-5 border border-violet-100">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-base font-extrabold text-gray-900">👥 같이놀기 <span className="text-xs font-bold bg-violet-600 text-white px-2 py-0.5 rounded-full ml-1">NEW</span></h2>
              <p className="text-xs text-gray-500 mt-0.5">혼자 와도 AI 친구가 같이 놀아줘요</p>
            </div>
            <Link href="/together" className="text-xs text-violet-600 font-semibold hover:underline flex-shrink-0">
              전체 보기 →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              { href: "/together/games/image-vote", emoji: "🗳️", label: "친구 이미지 투표", bg: "#FDF2F8" },
              { href: "/together/games/balance-room", emoji: "⚖️", label: "같이 밸런스게임", bg: "#EFF6FF" },
              { href: "/together/games/initial-quiz-room", emoji: "🔤", label: "초성퀴즈 대결방", bg: "#FFF7ED" },
              { href: "/together/games/compatibility-room", emoji: "💫", label: "친구 궁합방", bg: "#EDE9FE" },
            ].map((g) => (
              <Link key={g.href} href={g.href}>
                <div
                  className="flex items-center gap-2 p-3 rounded-2xl border border-white/80 hover:shadow-md transition-all active:scale-[0.97]"
                  style={{ background: g.bg }}
                >
                  <span className="text-xl">{g.emoji}</span>
                  <span className="text-xs font-bold text-gray-800">{g.label}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <Link
              href="/together/create"
              className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold text-sm text-center hover:opacity-90 transition-all"
            >
              🎮 방 만들기
            </Link>
            <Link
              href="/together/create"
              className="flex-1 py-3 rounded-2xl bg-white border-2 border-violet-200 text-violet-700 font-bold text-sm text-center hover:border-violet-400 transition-all"
            >
              🤖 AI랑 바로 시작
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════
          4. 지금 인기
      ════════════════════════════ */}
      <section className="mb-8">
        <SectionTitle title="🔥 지금 인기" subtitle="지금 가장 많이 하는 콘텐츠" />
        <div className="flex flex-col gap-2">
          {worldcupList.filter((w) => w.isFeatured).slice(0, 2).map((w) => (
            <Link key={w.id} href={`/games/worldcup/${w.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all active:scale-[0.99]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: w.bgColor }}>
                  {w.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{w.title}</div>
                  <div className="text-xs text-gray-400">월드컵</div>
                </div>
                {playBadge(w.playCount) && (
                  <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold flex-shrink-0">{playBadge(w.playCount)}</span>
                )}
              </div>
            </Link>
          ))}
          {balanceGameList.filter((b) => b.isFeatured).slice(0, 1).map((b) => (
            <Link key={b.id} href={`/games/balance/${b.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all active:scale-[0.99]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: b.bgColor }}>
                  {b.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{b.title}</div>
                  <div className="text-xs text-gray-400">밸런스게임</div>
                </div>
                <span className="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-bold flex-shrink-0">인기</span>
              </div>
            </Link>
          ))}
          {pollList.filter((p) => p.isHot).slice(0, 1).map((p) => (
            <Link key={p.id} href={`/polls/${p.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all active:scale-[0.99]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: p.bgColor }}>
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm leading-tight">{p.question}</div>
                  <div className="text-xs text-gray-400">투표</div>
                </div>
                <span className="text-[10px] bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold flex-shrink-0">HOT</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          4. 10초 테스트 (두뇌게임 퀵런치)
      ════════════════════════════ */}
      <section className="mb-8">
        <SectionTitle title="⚡ 10초 테스트" subtitle="클릭 한 번, 바로 시작" />
        <div className="grid grid-cols-4 gap-2">
          {[
            { href: "/games/reaction", emoji: "⚡", label: "반응속도", bg: "#FEF2F2", color: "#DC2626" },
            { href: "/games/observation", emoji: "👁️", label: "관찰력", bg: "#ECFEFF", color: "#0891B2" },
            { href: "/games/memory", emoji: "🧠", label: "기억력", bg: "#ECFDF5", color: "#059669" },
            { href: "/games/nonsense", emoji: "🤣", label: "넌센스", bg: "#FFFBEB", color: "#D97706" },
          ].map((g) => (
            <Link key={g.href} href={g.href}>
              <div className="flex flex-col items-center gap-1.5 py-3 px-1 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all text-center active:scale-95">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: g.bg }}>
                  {g.emoji}
                </div>
                <span className="text-[11px] font-bold" style={{ color: g.color }}>{g.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          5. 이상형 월드컵
      ════════════════════════════ */}
      <section className="mb-8">
        <SectionTitle
          title="🏆 이상형 월드컵"
          subtitle="토너먼트로 나만의 이상형 찾기"
          action={<Link href="/games/worldcup" className="text-sm text-brand-purple font-medium hover:underline">더 보기 →</Link>}
        />
        <div className="flex flex-col gap-2">
          {worldcupList.slice(0, 6).map((w) => (
            <Link key={w.id} href={`/games/worldcup/${w.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all active:scale-[0.99]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: w.bgColor }}>
                  {w.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm truncate">{w.title}</div>
                  <div className="text-xs text-gray-400">{w.tags.slice(0, 2).join(" · ")}</div>
                </div>
                <div className="flex gap-1 items-center">
                  {playBadge(w.playCount) && (
                    <span className="text-[10px] bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full font-bold">{playBadge(w.playCount)}</span>
                  )}
                  {w.isNew && <span className="text-[10px] bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full font-bold">NEW</span>}
                </div>
                <span className="text-gray-300 ml-1">›</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          6. 밸런스 게임
      ════════════════════════════ */}
      <section className="mb-8">
        <SectionTitle
          title="⚖️ 밸런스 게임"
          subtitle="A vs B, 당신의 선택은?"
          action={<Link href="/games/balance" className="text-sm text-brand-purple font-medium hover:underline">더 보기 →</Link>}
        />
        <div className="grid grid-cols-2 gap-2">
          {balanceGameList.slice(0, 6).map((b) => (
            <Link key={b.id} href={`/games/balance/${b.slug}`}>
              <div className="flex flex-col gap-2 p-3 bg-white rounded-2xl border border-gray-100 hover:border-pink-200 hover:shadow-md transition-all h-full active:scale-[0.98]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: b.bgColor }}>
                  {b.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-xs leading-snug">{b.title}</div>
                </div>
                <div className="text-[11px] text-gray-400">{b.pairs.length}쌍</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          7. 초성 퀴즈
      ════════════════════════════ */}
      <section className="mb-8">
        <SectionTitle
          title="🔤 초성 퀴즈"
          subtitle="초성만 보고 맞힐 수 있을까?"
          action={<Link href="/games/initial-quiz" className="text-sm text-brand-purple font-medium hover:underline">더 보기 →</Link>}
        />
        <div className="grid grid-cols-2 gap-2">
          {initialQuizList.slice(0, 6).map((q) => (
            <Link key={q.id} href={`/games/initial-quiz/${q.slug}`}>
              <div className="flex flex-col gap-2 p-3 bg-white rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all h-full active:scale-[0.98]">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: q.bgColor }}>
                  {q.emoji}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 text-xs leading-snug">{q.title}</div>
                </div>
                <div className="text-[11px] text-gray-400">{q.questions.length}문제</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          8. 두뇌 미니게임
      ════════════════════════════ */}
      <section className="mb-8">
        <SectionTitle title="🎮 두뇌 미니게임" subtitle="관찰력 · 기억력 · 반응속도 · 넌센스" />
        <div className="grid grid-cols-2 gap-2">
          {[
            { href: "/games/observation", emoji: "👁️", label: "관찰력 테스트", sub: "다른 하나 찾기", bg: "#ECFEFF" },
            { href: "/games/memory", emoji: "🧠", label: "기억력 테스트", sub: "순서를 외워라", bg: "#ECFDF5" },
            { href: "/games/reaction", emoji: "⚡", label: "반응속도 테스트", sub: "빠르게 클릭!", bg: "#FEF2F2" },
            { href: "/games/nonsense", emoji: "🤣", label: "넌센스 퀴즈", sub: "웃으면서 풀기", bg: "#FFFBEB" },
          ].map((g) => (
            <Link key={g.href} href={g.href}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all active:scale-[0.98]">
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

      {/* 광고 */}
      <AdSlot slotKey="header_banner" className="mb-8" />

      {/* ════════════════════════════
          9. 투표
      ════════════════════════════ */}
      <section className="mb-8">
        <SectionTitle
          title="🗳️ 지금 HOT 투표"
          action={<Link href="/polls" className="text-sm text-brand-purple font-medium hover:underline">전체 투표 →</Link>}
        />
        <div className="flex flex-col gap-2">
          {pollList.slice(0, 6).map((p) => (
            <Link key={p.id} href={`/polls/${p.slug}`}>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all active:scale-[0.99]">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: p.bgColor }}>
                  {p.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 text-sm leading-tight">{p.question}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{p.options.length}개 선택지</div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  {p.isHot && <span className="text-[10px] bg-red-100 text-red-500 px-2 py-0.5 rounded-full font-bold">HOT</span>}
                  {p.isNew && <span className="text-[10px] bg-pink-100 text-pink-500 px-2 py-0.5 rounded-full font-bold">NEW</span>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          10. 생성기
      ════════════════════════════ */}
      <section className="mb-8">
        <SectionTitle
          title="✨ 생성기"
          subtitle="이름 · 생일로 나만의 결과 만들기"
          action={<Link href="/generator" className="text-sm text-brand-purple font-medium hover:underline">전체 보기 →</Link>}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {generatorList.slice(0, 6).map((g) => (
            <Link key={g.id} href={`/generator/${g.slug}`}>
              <div className="flex items-center gap-2 p-3 bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all active:scale-[0.98]">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: g.bgColor }}>
                  {g.emoji}
                </div>
                <span className="font-semibold text-gray-900 text-xs leading-snug">{g.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ════════════════════════════
          11. 넌센스 퀴즈
      ════════════════════════════ */}
      <section className="mb-8">
        <SectionTitle
          title="🤣 넌센스 퀴즈"
          action={<Link href="/games/nonsense" className="text-sm text-brand-purple font-medium hover:underline">풀어보기 →</Link>}
        />
        <Link href="/games/nonsense">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-5 text-white hover:shadow-md transition-shadow active:scale-[0.99]">
            <div className="text-3xl mb-2">🤣</div>
            <div className="font-bold text-lg">맞히면 웃고, 틀려도 웃는 퀴즈</div>
            <div className="text-sm text-white/80 mt-1">아재개그 · 반전 · 5초 퀴즈 · 연애 넌센스</div>
          </div>
        </Link>
      </section>

      {/* 인피드 광고 */}
      <AdSlot slotKey="in_feed_1" className="mb-8" />

      {/* ════════════════════════════
          12. 인기 심리테스트
      ════════════════════════════ */}
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

      {/* ════════════════════════════
          13. 새로 추가된 콘텐츠
      ════════════════════════════ */}
      {newTests.length > 0 && (
        <section className="mb-10">
          <SectionTitle
            title="✨ 새로 추가된 콘텐츠"
            action={<Link href="/new" className="text-sm text-brand-purple font-medium hover:underline">더 보기 →</Link>}
          />
          <TestGrid tests={newTests.slice(0, 6)} columns={2} />
        </section>
      )}

    </LayoutContainer>
  );
}
