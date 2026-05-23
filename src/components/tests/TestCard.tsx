import Link from "next/link";
import type { TestMeta } from "@/types";
import { cn } from "@/lib/utils/cn";
import { formatMinutes } from "@/lib/utils/format";
import { getTestIllustration } from "@/lib/visuals/resultIllustrations";

interface TestCardProps {
  test: TestMeta;
  className?: string;
  compact?: boolean;
}

export default function TestCard({ test, className, compact }: TestCardProps) {
  const visual = getTestIllustration(test.slug, test.categorySlug);

  return (
    <Link
      href={`/test/${test.slug}`}
      className={cn(
        "group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden",
        className
      )}
    >
      {/* 썸네일 영역 */}
      {!compact && (
        <div
          className="relative overflow-hidden flex items-center justify-center"
          style={{
            background: visual.gradient,
            height: visual.illustrationUrl?.startsWith("/") ? 128 : 96,
          }}
        >
          {/* 배경 장식 */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
          <div className="absolute -bottom-3 -left-3 w-12 h-12 bg-white/10 rounded-full" />
          {/* 장식 이모지들 - 로컬 SVG가 아닐 때만 */}
          {!visual.illustrationUrl?.startsWith("/") && visual.decorEmojis[0] && (
            <span className="absolute top-2 left-3 text-lg opacity-50">{visual.decorEmojis[0]}</span>
          )}
          {!visual.illustrationUrl?.startsWith("/") && visual.decorEmojis[1] && (
            <span className="absolute bottom-2 right-4 text-base opacity-40">{visual.decorEmojis[1]}</span>
          )}
          {/* 대표 이모지 / SVG 일러스트 */}
          <div className="relative flex items-center justify-center drop-shadow-lg">
            {visual.illustrationUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={visual.illustrationUrl}
                alt=""
                width={visual.illustrationUrl.startsWith("/") ? 112 : 64}
                height={visual.illustrationUrl.startsWith("/") ? 112 : 64}
                className={visual.illustrationUrl.startsWith("/") ? "w-28 h-28 object-contain" : "w-16 h-16 object-contain"}
                aria-hidden="true"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/25 border border-white/40 flex items-center justify-center shadow-sm">
                <span className="text-2xl">{visual.emoji}</span>
              </div>
            )}
          </div>
        </div>
      )}

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
