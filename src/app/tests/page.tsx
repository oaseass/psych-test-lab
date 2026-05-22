import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import CategoryPill from "@/components/tests/CategoryPill";
import { getPlayableTests, getActiveCategories } from "@/lib/data/testRepository";

export const metadata: Metadata = {
  title: "전체 테스트",
  description: "연애·성격·직장·인간관계·돈 등 다양한 심리테스트 모음.",
};

export default function TestsPage() {
  const allTests = getPlayableTests();
  const activeCategories = getActiveCategories();

  return (
    <LayoutContainer>
      <SectionTitle
        title="🧠 지금 바로 할 수 있는 테스트"
        subtitle="질문 있고, 선택지 있고, 결과 있는 것만 모았습니다."
      />

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-6">
        {activeCategories.map((cat) => (
          <CategoryPill key={cat.slug} category={cat} size="sm" />
        ))}
      </div>

      <TestGrid tests={allTests} columns={3} />
    </LayoutContainer>
  );
}
