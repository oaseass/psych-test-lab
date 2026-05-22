import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import AdSlot from "@/components/common/AdSlot";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import LiveCounter from "@/components/common/LiveCounter";
import { getTestMeta, getPlayableTest, getPlayableTests, getRecommendations, getAllTestMeta } from "@/lib/data/testRepository";
import { buildTestMetadata } from "@/lib/seo/metadata";
import { formatMinutes } from "@/lib/utils/format";
import { categories } from "@/data/categories";

function getCategoryName(slug: string): string {
  return categories.find((c) => c.slug === slug)?.name ?? slug;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getPlayableTests().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getTestMeta(slug);
  if (!meta) return {};
  return buildTestMetadata(meta);
}

export default async function TestDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = getTestMeta(slug);
  if (!meta || !meta.isPlayable) notFound();

  const playable = getPlayableTest(slug);
  if (!playable) notFound();

  const allTests = getAllTestMeta();
  const recommended = getRecommendations({
    currentSlug: slug,
    categorySlug: meta.categorySlug,
    allTests,
  });

  return (
    <LayoutContainer narrow>
      {/* 테스트 정보 */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs px-2.5 py-1 bg-purple-50 text-brand-purple rounded-full font-medium">
            {getCategoryName(meta.categorySlug)}
          </span>
          <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">
            {meta.questionCount}문항
          </span>
          <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-500 rounded-full">
            {formatMinutes(meta.estimatedMinutes)}
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-brand-text leading-snug mb-3">
          {meta.title}
        </h1>

        <p className="text-brand-purple font-medium text-base mb-2">{meta.hook}</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-3">{meta.description}</p>
        <LiveCounter testSlug={slug} />

        {meta.tags && meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-4">
            {meta.tags.map((tag) => (
              <span key={tag} className="text-xs text-gray-400">#{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* 시작 버튼 */}
      <Link
        href={`/test/${slug}/play`}
        className="block w-full text-center py-4 bg-brand-purple text-white rounded-2xl text-lg font-bold hover:bg-purple-700 transition-colors shadow-md mb-6"
      >
        🧠 테스트 시작하기
      </Link>

      {/* 광고 */}
      <AdSlot slotKey="in_feed_1" className="mb-8" />

      {/* 추천 테스트 */}
      {recommended.length > 0 && (
        <section>
          <SectionTitle title="다른 테스트도 해볼까요?" />
          <TestGrid tests={recommended} columns={3} compact />
        </section>
      )}
    </LayoutContainer>
  );
}
