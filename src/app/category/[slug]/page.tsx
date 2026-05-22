import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import { getCategory, getTestsByCategory, getActiveCategorySlugs } from "@/lib/data/testRepository";
import { buildCategoryMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  // 공개 테스트가 있는 카테고리만 정적 생성 — 빈 카테고리 URL 차단
  const slugs = getActiveCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildCategoryMetadata(category);
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  // getTestsByCategory는 이미 isPubliclyVisibleTest 필터 적용
  const tests = getTestsByCategory(slug);

  // 공개 테스트 0개인 카테고리 — 직접 URL 접근도 차단
  if (tests.length === 0) notFound();

  return (
    <LayoutContainer>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-4xl">{category.icon}</span>
          <div>
            <h1 className="text-2xl font-bold text-brand-text">{category.name}</h1>
            <p className="text-sm text-gray-500">{category.description}</p>
          </div>
        </div>
      </div>

      <TestGrid tests={tests} columns={3} />
    </LayoutContainer>
  );
}
