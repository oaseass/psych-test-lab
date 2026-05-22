import type { TestMeta } from "@/types";
import TestCard from "./TestCard";
import { cn } from "@/lib/utils/cn";

interface TestGridProps {
  tests: TestMeta[];
  className?: string;
  compact?: boolean;
  columns?: 2 | 3;
}

export default function TestGrid({ tests, className, compact, columns = 2 }: TestGridProps) {
  if (tests.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <div className="text-4xl mb-3">🔍</div>
        <p>조건에 맞는 테스트를 찾지 못했어요.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 2 && "grid-cols-1 sm:grid-cols-2",
        columns === 3 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {tests.map((test) => (
        <TestCard key={test.slug} test={test} compact={compact} />
      ))}
    </div>
  );
}
