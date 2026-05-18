import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import AdSlot from "@/components/common/AdSlot";
import CategoryPill from "@/components/tests/CategoryPill";
import {
  getFeaturedTests,
  getNewTests,
  getPopularTests,
  getAllCategories,
} from "@/lib/data/testRepository";

export default function HomePage() {
  const featured = getFeaturedTests();
  const newTests = getNewTests();
  const popular = getPopularTests(6);
  const categories = getAllCategories();

  return (
    <LayoutContainer>
      {/* 히어로 섹션 */}
      <section className="text-center py-10 mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-text leading-tight">
          나를 이해하는<br />
          <span className="text-brand-purple">심리테스트 연구소</span>
        </h1>
        <p className="mt-3 text-gray-500 text-sm sm:text-base">
          1,000가지 심리테스트로 나의 패턴을 발견해보세요
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/random"
            className="px-8 py-3.5 bg-brand-purple text-white rounded-2xl font-bold hover:bg-purple-700 transition-colors shadow-md"
          >
            🎲 랜덤 테스트 시작
          </Link>
          <Link
            href="/tests"
            className="px-8 py-3.5 bg-white text-brand-purple border-2 border-brand-purple rounded-2xl font-bold hover:bg-purple-50 transition-colors"
          >
            전체 테스트 보기
          </Link>
        </div>
      </section>

      {/* 카테고리 */}
      <section className="mb-8">
        <SectionTitle title="카테고리" />
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <CategoryPill key={cat.slug} category={cat} />
          ))}
        </div>
      </section>

      {/* 광고 */}
      <AdSlot slotKey="header_banner" className="mb-8" />

      {/* 추천 테스트 */}
      {featured.length > 0 && (
        <section className="mb-10">
          <SectionTitle
            title="🔥 지금 인기 테스트"
            subtitle="가장 많이 공유된 테스트"
            action={
              <Link href="/popular" className="text-sm text-brand-purple font-medium hover:underline">
                더 보기 →
              </Link>
            }
          />
          <TestGrid tests={featured.slice(0, 6)} columns={3} />
        </section>
      )}

      {/* 인피드 광고 */}
      <AdSlot slotKey="in_feed_1" className="mb-10" />

      {/* 신규 테스트 */}
      {newTests.length > 0 && (
        <section className="mb-10">
          <SectionTitle
            title="✨ 새로 추가된 테스트"
            action={
              <Link href="/new" className="text-sm text-brand-purple font-medium hover:underline">
                더 보기 →
              </Link>
            }
          />
          <TestGrid tests={newTests} columns={2} />
        </section>
      )}

      {/* 인기 테스트 */}
      <section className="mb-10">
        <SectionTitle
          title="📊 많이 공유된 테스트"
          action={
            <Link href="/popular" className="text-sm text-brand-purple font-medium hover:underline">
              전체 보기 →
            </Link>
          }
        />
        <TestGrid tests={popular} columns={3} />
      </section>
    </LayoutContainer>
  );
}
