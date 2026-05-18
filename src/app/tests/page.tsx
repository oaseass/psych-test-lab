import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import CategoryPill from "@/components/tests/CategoryPill";
import { getAllTestMeta, getAllCategories } from "@/lib/data/testRepository";

export const metadata: Metadata = {
  title: "전체 테스트",
  description: "1000가지 심리테스트 전체 목록. 연애, 성격, 직장, 인간관계, 돈 등 다양한 카테고리.",
};

export default function TestsPage() {
  const allTests = getAllTestMeta().filter((t) => t.status !== "needsReview");
  const categories = getAllCategories();

  return (
    <LayoutContainer>
      <SectionTitle
        title="전체 테스트"
        subtitle={`총 ${allTests.length}개`}
      />

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <CategoryPill key={cat.slug} category={cat} size="sm" />
        ))}
      </div>

      <TestGrid tests={allTests} columns={3} />
    </LayoutContainer>
  );
}
