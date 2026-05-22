import type { TestResult, TestMeta } from "@/types";
import { cn } from "@/lib/utils/cn";
import { getTestIllustration } from "@/lib/visuals/resultIllustrations";

interface ResultCardProps {
  result: TestResult;
  meta: TestMeta;
  className?: string;
}

const SHARE_COUNT_BASE: Record<string, number> = {};
function mockShareCount(resultId: string): number {
  if (!SHARE_COUNT_BASE[resultId]) {
    let hash = 0;
    for (let i = 0; i < resultId.length; i++) hash = (hash * 31 + resultId.charCodeAt(i)) & 0xfffff;
    SHARE_COUNT_BASE[resultId] = 1200 + (hash % 8800);
  }
  return SHARE_COUNT_BASE[resultId];
}

export default function ResultCard({ result, meta, className }: ResultCardProps) {
  const shareCount = mockShareCount(result.id);
  const hasMatchingTypes = result.matchingTypes && result.matchingTypes.length > 0;
  const hasOppositeTypes = result.oppositeTypes && result.oppositeTypes.length > 0;
  const visual = getTestIllustration(meta.slug, meta.categorySlug);

  return (
    <div className={cn("bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden", className)}>
      {/* Header */}
      <div
        className="relative px-6 pt-8 pb-12 text-white text-center overflow-hidden"
        style={{ background: visual.gradient }}
      >
        {/* 배경 장식 원 */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-4 -left-6 w-24 h-24 bg-white/10 rounded-full" />
        <div className="absolute top-4 left-4 w-12 h-12 bg-white/5 rounded-full" />

        {/* 대표 이모지 */}
        <div className="relative mb-3 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center shadow-inner border border-white/30">
            <span className="text-4xl">{visual.emoji}</span>
          </div>
        </div>

        <p className="relative text-xs font-semibold opacity-70 tracking-widest uppercase mb-2">{meta.title}</p>
        <h1 className="relative text-2xl sm:text-3xl font-extrabold leading-snug drop-shadow-sm">{result.title}</h1>
        {result.subtitle && (
          <p className="relative mt-2 text-sm opacity-85 leading-relaxed">{result.subtitle}</p>
        )}
        {/* Social proof */}
        <div className="relative mt-3 inline-flex items-center gap-1.5 bg-white/20 rounded-full px-3 py-1 text-xs font-bold">
          <span>🔥</span>
          <span>{shareCount.toLocaleString()}명이 공유한 결과</span>
        </div>
      </div>

      {/* Keywords overlap */}
      {result.keywords && result.keywords.length > 0 && (
        <div className="-mt-5 mx-4 bg-white rounded-2xl shadow-md px-4 py-3 flex flex-wrap gap-2 justify-center border border-gray-100">
          {result.keywords.map((kw) => (
            <span key={kw} className="text-xs px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-brand-purple rounded-full font-bold border border-purple-100">
              #{kw}
            </span>
          ))}
        </div>
      )}

      {/* Summary */}
      <div className="px-6 py-5 mt-1">
        <p className="text-sm text-gray-700 leading-loose">{result.summary}</p>
      </div>

      {/* Compatible / Incompatible types */}
      {(hasMatchingTypes || hasOppositeTypes) && (
        <div className="grid grid-cols-2 gap-2 mx-4 mb-4">
          {hasMatchingTypes && (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-3">
              <p className="text-xs font-extrabold text-green-700 mb-1.5">💚 잘 맞는 유형</p>
              {result.matchingTypes.slice(0, 2).map((t) => (
                <p key={t} className="text-xs text-green-600 font-semibold truncate">• {t}</p>
              ))}
            </div>
          )}
          {hasOppositeTypes && (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-3">
              <p className="text-xs font-extrabold text-red-700 mb-1.5">💔 충돌하는 유형</p>
              {result.oppositeTypes.slice(0, 2).map((t) => (
                <p key={t} className="text-xs text-red-600 font-semibold truncate">• {t}</p>
              ))}
            </div>
          )}
        </div>
      )}

    </div>
  );
}
