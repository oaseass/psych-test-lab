import Link from "next/link";
import type { TestMeta } from "@/types";
import { cn } from "@/lib/utils/cn";
import { formatMinutes } from "@/lib/utils/format";

interface TestCardProps {
  test: TestMeta;
  className?: string;
  compact?: boolean;
}

export default function TestCard({ test, className, compact }: TestCardProps) {
  return (
    <Link
      href={`/test/${test.slug}`}
      className={cn(
        "group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden",
        className
      )}
    >
      <div className={cn("p-4", compact && "p-3")}>
        {/* 배지 영역 */}
        <div className="flex items-center gap-1.5 mb-2">
          {test.isFeatured && (
            <span className="text-xs px-2 py-0.5 bg-purple-50 text-brand-purple rounded-full font-medium">
              인기
            </span>
          )}
          {test.isNew && (
            <span className="text-xs px-2 py-0.5 bg-pink-50 text-brand-pink rounded-full font-medium">
              NEW
            </span>
          )}
          <span className="text-xs text-gray-400">{formatMinutes(test.estimatedMinutes)}</span>
        </div>

        {/* 제목 */}
        <h3
          className={cn(
            "font-bold text-brand-text leading-snug group-hover:text-brand-purple transition-colors",
            compact ? "text-sm" : "text-base"
          )}
        >
          {test.title.replace(/ 테스트$/, "")}
        </h3>

        {/* 훅 문구 */}
        {!compact && (
          <p className="mt-1.5 text-sm text-gray-500 line-clamp-2">{test.hook}</p>
        )}

        {/* 하단 메타 */}
        <div className="mt-3 flex items-center text-xs text-gray-400 gap-1.5">
          <span>{test.questionCount}문항</span>
          <span className="text-gray-300">·</span>
          <span>1분컷</span>
        </div>
      </div>
    </Link>
  );
}
