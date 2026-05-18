import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import { getPopularTests } from "@/lib/data/testRepository";

export const metadata: Metadata = {
  title: "인기 테스트",
  description: "가장 많이 공유된 인기 심리테스트 모음.",
};

export default function PopularPage() {
  const tests = getPopularTests(50);

  return (
    <LayoutContainer>
      <SectionTitle title="🔥 인기 테스트" subtitle={`총 ${tests.length}개`} />
      <TestGrid tests={tests} columns={3} />
    </LayoutContainer>
  );
}
