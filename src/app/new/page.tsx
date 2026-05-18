import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import { getNewTests } from "@/lib/data/testRepository";

export const metadata: Metadata = {
  title: "신규 테스트",
  description: "새롭게 추가된 심리테스트 모음.",
};

export default function NewPage() {
  const tests = getNewTests();

  return (
    <LayoutContainer>
      <SectionTitle title="✨ 신규 테스트" subtitle={`${tests.length}개의 새 테스트`} />
      <TestGrid tests={tests} columns={3} />
    </LayoutContainer>
  );
}
