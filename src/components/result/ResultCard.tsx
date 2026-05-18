import type { TestResult, TestMeta } from "@/types";
import { cn } from "@/lib/utils/cn";

interface ResultCardProps {
  result: TestResult;
  meta: TestMeta;
  className?: string;
}

export default function ResultCard({ result, meta, className }: ResultCardProps) {
  return (
    <div className={cn("bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden", className)}>
      {/* 헤더 — 그라디언트 배너 */}
      <div className="relative bg-gradient-to-br from-purple-600 via-violet-600 to-pink-500 px-6 pt-8 pb-10 text-white text-center overflow-hidden">
        {/* 배경 장식 원 */}
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-4 -left-6 w-24 h-24 bg-white/10 rounded-full" />
        <p className="relative text-xs font-semibold opacity-70 tracking-widest uppercase mb-2">{meta.title}</p>
        <h1 className="relative text-2xl sm:text-3xl font-extrabold leading-snug drop-shadow-sm">{result.title}</h1>
        {result.subtitle && (
          <p className="relative mt-2 text-sm opacity-85 leading-relaxed">{result.subtitle}</p>
        )}
      </div>

      {/* 키워드 — 헤더 바로 아래 오버랩 */}
      {result.keywords && result.keywords.length > 0 && (
        <div className="-mt-4 mx-4 bg-white rounded-2xl shadow-md px-4 py-3 flex flex-wrap gap-2 justify-center border border-gray-100">
          {result.keywords.map((kw) => (
            <span key={kw} className="text-xs px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-brand-purple rounded-full font-bold border border-purple-100">
              #{kw}
            </span>
          ))}
        </div>
      )}

      {/* 요약 */}
      <div className="px-6 py-5 mt-2">
        <p className="text-sm text-gray-700 leading-loose">{result.summary}</p>
      </div>
    </div>
  );
}
