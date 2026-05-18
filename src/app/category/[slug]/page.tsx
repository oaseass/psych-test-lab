import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import { getCategory, getTestsByCategory, getAllCategorySlugs } from "@/lib/data/testRepository";
import { buildCategoryMetadata } from "@/lib/seo/metadata";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs();
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

  const tests = getTestsByCategory(slug).filter((t) => t.status !== "needsReview");

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
        <p className="text-sm text-gray-400">{tests.length}개의 테스트</p>
      </div>

      <TestGrid tests={tests} columns={3} />
    </LayoutContainer>
  );
}
