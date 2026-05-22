import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import { getAllTestMeta } from "@/lib/data/testRepository";
import { POLISHED_SLUGS_ARRAY } from "@/data/playableSlugs";

export default function HomePage() {
  const allTests = getAllTestMeta();
  const featuredTests = POLISHED_SLUGS_ARRAY
    .map((slug) => allTests.find((t) => t.slug === slug))
    .filter(Boolean)
    .slice(0, 4) as ReturnType<typeof getAllTestMeta>;
  return (
    <LayoutContainer>

      {/* HERO */}
      <section className="pt-8 pb-6 mb-2 text-center">
        <h1 className="text-3xl sm:text-[2.4rem] font-black text-brand-text leading-[1.2] tracking-tight mb-3">
          심심할 때<br />
          <span className="text-brand-purple">3초만 눌러봐</span>
        </h1>
        <p className="text-sm text-brand-muted leading-relaxed max-w-[280px] mx-auto mb-6">
          테스트, 퀴즈, 월드컵, 웹실험 중에서 진짜 할 만한 것만 골랐습니다.
        </p>
        <div className="flex gap-2.5 justify-center flex-wrap">
          <Link href="/surprise" className="btn-primary px-6 py-3 text-sm">
            🎲 심심버튼 누르기
          </Link>
          <Link href="/daily" className="btn-secondary px-6 py-3 text-sm">
            🎯 오늘의 놀이 보기
          </Link>
        </div>
      </section>

      {/* 1. 심심버튼 */}
      <section className="mb-8">
        <Link href="/surprise">
          <div className="bg-gradient-to-r from-violet-600 to-pink-500 rounded-3xl p-5 text-white text-center hover:opacity-95 active:scale-[0.98] transition-all shadow-pop cursor-pointer group">
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">🎲</div>
            <div className="font-black text-lg">아무 생각 없이 누르기 좋음</div>
            <div className="text-white/80 text-sm mt-1">뭐 할지 모르면 그냥 눌러 → 심심버튼</div>
          </div>
        </Link>
      </section>

      {/* 2. 오늘의 놀이 */}
      <section className="mb-8">
        <Link href="/daily">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between hover:bg-amber-100/60 transition-colors active:scale-[0.99]">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🎯</div>
              <div>
                <div className="font-bold text-amber-900 text-sm">오늘의 놀이</div>
                <div className="text-xs text-amber-700">오늘은 이거 해봐 · 매일 바뀜</div>
              </div>
            </div>
            <div className="text-amber-500 font-bold text-sm">→</div>
          </div>
        </Link>
      </section>

      {/* 3. 월드컵 / 4. 초성퀴즈 / 5. 돈쓰기 시뮬레이터 / 6. 비밀번호 지옥 */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-3">
          <Link href="/games/worldcup">
            <div className="rounded-2xl p-4 bg-orange-50 border border-orange-100 hover:shadow-card-hover transition-all active:scale-[0.97] h-full">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-bold text-gray-900 text-sm">이상형 월드컵</div>
              <div className="text-xs text-gray-500 mt-1">친구랑 하면 더 웃김</div>
            </div>
          </Link>
          <Link href="/games/initial-quiz">
            <div className="rounded-2xl p-4 bg-blue-50 border border-blue-100 hover:shadow-card-hover transition-all active:scale-[0.97] h-full">
              <div className="text-2xl mb-2">🔤</div>
              <div className="font-bold text-gray-900 text-sm">초성퀴즈</div>
              <div className="text-xs text-gray-500 mt-1">3분만 죽여보자</div>
            </div>
          </Link>
          <Link href="/experiments/spend-money">
            <div className="rounded-2xl p-4 bg-emerald-50 border border-emerald-100 hover:shadow-card-hover transition-all active:scale-[0.97] h-full">
              <div className="text-2xl mb-2">💸</div>
              <div className="font-bold text-gray-900 text-sm">돈쓰기 시뮬레이터</div>
              <div className="text-xs text-gray-500 mt-1">100억 다 써봐</div>
            </div>
          </Link>
          <Link href="/experiments/password-hell">
            <div className="rounded-2xl p-4 bg-red-50 border border-red-100 hover:shadow-card-hover transition-all active:scale-[0.97] h-full">
              <div className="text-2xl mb-2">🔐</div>
              <div className="font-bold text-gray-900 text-sm">비밀번호 지옥</div>
              <div className="text-xs text-gray-500 mt-1">몇 단계까지 버티나</div>
            </div>
          </Link>
        </div>
      </section>

      {/* 7. 같이놀기 방 만들기 */}
      <section className="mb-8">
        <div className="bg-gradient-to-br from-violet-600 to-purple-700 rounded-3xl p-5 text-white">
          <h2 className="font-black text-lg mb-1">👥 같이놀기</h2>
          <p className="text-white/70 text-xs mb-4">회원 전용 · 링크 공유 · 친구랑 같이하기</p>
          <Link href="/together/create">
            <div className="py-3 rounded-2xl bg-white text-violet-700 font-black text-sm text-center hover:bg-violet-50 active:scale-[0.97] transition-all">
              🎮 방 만들기
            </div>
          </Link>
        </div>
      </section>

      {/* 8. 오늘의 챌린지 — 작은 링크 */}
      <div className="text-center mb-6 -mt-4">
        <Link href="/challenge" className="text-xs text-gray-400 hover:text-brand-purple transition-colors">
          🔥 오늘의 5연속 챌린지 &nbsp;·&nbsp; 완료 시 +500P
        </Link>
      </div>

      {/* 하단 보조 섹션 */}

      {/* 심리테스트 */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">🧠 심리테스트</h2>
          <Link href="/tests" className="text-xs font-semibold text-brand-purple hover:underline">전체 →</Link>
        </div>
        <TestGrid tests={featuredTests} columns={2} compact />
      </section>

      {/* 웹실험 */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="section-title">⚗️ 웹실험</h2>
          <Link href="/experiments" className="text-xs font-semibold text-brand-purple hover:underline">전체 →</Link>
        </div>
        <Link href="/experiments">
          <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-brand-border hover:border-brand-purple/20 hover:shadow-card-hover transition-all active:scale-[0.99]">
            <div className="text-3xl">⚗️</div>
            <div>
              <div className="font-bold text-brand-text text-sm">심심할 때 해보는 인터랙티브 실험들</div>
              <div className="text-xs text-brand-muted mt-0.5">돈쓰기, 비밀번호지옥, 무한조합</div>
            </div>
            <span className="ml-auto text-brand-muted text-sm">→</span>
          </div>
        </Link>
      </section>

      {/* 럭키존 - 하단 보조 카드 */}
      <section className="mb-8">
        <div className="bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-100 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-violet-700">🍀 럭키존</div>
            <div className="text-xs text-brand-muted mt-0.5">회원 포인트로 가볍게 도전하는 럭키존</div>
            <div className="text-[10px] text-gray-400 mt-1">포인트는 현금·상품으로 교환되지 않습니다</div>
          </div>
          <Link href="/lucky" className="text-xs font-semibold text-violet-600 hover:underline flex-shrink-0">
            입장 →
          </Link>
        </div>
      </section>

    </LayoutContainer>
  );
}
