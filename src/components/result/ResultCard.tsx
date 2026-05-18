import type { TestResult, TestMeta } from "@/types";
import { cn } from "@/lib/utils/cn";

interface ResultCardProps {
  result: TestResult;
  meta: TestMeta;
  className?: string;
}

export default function ResultCard({ result, meta, className }: ResultCardProps) {
  return (
    <div className={cn("bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden", className)}>
      {/* 헤더 */}
      <div className="bg-gradient-to-br from-brand-purple to-brand-pink p-6 text-white text-center">
        <p className="text-sm opacity-80 mb-1">{meta.title} 결과</p>
        <h1 className="text-2xl font-bold leading-snug">{result.title}</h1>
        <p className="mt-2 text-sm opacity-90">{result.subtitle}</p>
      </div>

      {/* 키워드 */}
      {result.keywords && result.keywords.length > 0 && (
        <div className="px-6 py-4 flex flex-wrap gap-2 border-b border-gray-100">
          {result.keywords.map((kw) => (
            <span key={kw} className="text-xs px-3 py-1 bg-purple-50 text-brand-purple rounded-full font-medium">
              #{kw}
            </span>
          ))}
        </div>
      )}

      {/* 요약 */}
      <div className="px-6 py-5">
        <p className="text-sm text-gray-700 leading-relaxed">{result.summary}</p>
      </div>
    </div>
  );
}
