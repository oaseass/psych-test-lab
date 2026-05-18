import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import { getPopularTests } from "@/lib/data/testRepository";

export const metadata: Metadata = {
  title: "테스트 랭킹",
  description: "가장 인기 있는 심리테스트 순위.",
};

export default function RankingPage() {
  const tests = getPopularTests(30);

  return (
    <LayoutContainer>
      <SectionTitle title="🏆 테스트 랭킹 TOP 30" />
      <div className="space-y-3">
        {tests.map((test, i) => (
          <a
            key={test.slug}
            href={`/test/${test.slug}`}
            className="flex items-center gap-4 bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <span
              className={`text-lg font-extrabold w-8 text-center ${
                i === 0 ? "text-yellow-500" : i === 1 ? "text-gray-400" : i === 2 ? "text-amber-600" : "text-gray-300"
              }`}
            >
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-brand-text text-sm truncate">{test.title}</p>
              <p className="text-xs text-gray-400 truncate">{test.hook}</p>
            </div>
            <span className="text-xs text-gray-400">🔥 {test.viralScore * 100}+</span>
          </a>
        ))}
      </div>
    </LayoutContainer>
  );
}
