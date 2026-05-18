import type { TestResult } from "@/types";
import { cn } from "@/lib/utils/cn";

interface ResultSectionsProps {
  result: TestResult;
  className?: string;
}

const sections = [
  { key: "relationship" as const, label: "💑 연애/관계", icon: "💑" },
  { key: "money" as const, label: "💰 돈/소비", icon: "💰" },
  { key: "work" as const, label: "💼 직장/일", icon: "💼" },
  { key: "social" as const, label: "🤝 사회생활", icon: "🤝" },
];

export default function ResultSections({ result, className }: ResultSectionsProps) {
  return (
    <div className={cn("space-y-4", className)}>
      {/* 강점/약점 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {result.strengths && result.strengths.length > 0 && (
          <div className="bg-green-50 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-green-700 mb-2">✅ 강점</h3>
            <ul className="space-y-1">
              {result.strengths.map((s, i) => (
                <li key={i} className="text-sm text-green-800">{s}</li>
              ))}
            </ul>
          </div>
        )}

        {result.weaknesses && result.weaknesses.length > 0 && (
          <div className="bg-orange-50 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-orange-700 mb-2">⚠️ 주의점</h3>
            <ul className="space-y-1">
              {result.weaknesses.map((w, i) => (
                <li key={i} className="text-sm text-orange-800">{w}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 영역별 설명 */}
      {sections.map((section) => {
        const text = result[section.key];
        if (!text) return null;
        return (
          <div key={section.key} className="bg-gray-50 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-gray-700 mb-1.5">{section.label}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{text}</p>
          </div>
        );
      })}

      {/* 주의사항 */}
      {result.caution && (
        <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-4">
          <h3 className="text-sm font-bold text-yellow-800 mb-1.5">💡 이런 점은 조심해요</h3>
          <p className="text-sm text-yellow-700 leading-relaxed">{result.caution}</p>
        </div>
      )}

      {/* 궁합 */}
      {(result.matchingTypes?.length || result.oppositeTypes?.length) && (
        <div className="grid grid-cols-2 gap-3">
          {result.matchingTypes && result.matchingTypes.length > 0 && (
            <div className="bg-blue-50 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-blue-700 mb-1.5">💙 잘 맞는 유형</h3>
              <ul className="space-y-0.5">
                {result.matchingTypes.map((t, i) => (
                  <li key={i} className="text-xs text-blue-800">{t}</li>
                ))}
              </ul>
            </div>
          )}
          {result.oppositeTypes && result.oppositeTypes.length > 0 && (
            <div className="bg-red-50 rounded-2xl p-4">
              <h3 className="text-sm font-bold text-red-700 mb-1.5">💔 충돌하는 유형</h3>
              <ul className="space-y-0.5">
                {result.oppositeTypes.map((t, i) => (
                  <li key={i} className="text-xs text-red-800">{t}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
