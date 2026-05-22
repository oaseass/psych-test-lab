"use client";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { experimentsList } from "@/data/experimentsData";

// 품질 기준 통과한 메인 실험
const MAIN_SLUGS = ["spend-money", "password-hell"];
// 미완성 실험 — 프로덕션에서 항상 제외 (환경변수 무관)
const HIDDEN_SLUGS = new Set(["infinite-mix"]);

const mainExps = experimentsList.filter((e) => MAIN_SLUGS.includes(e.slug));
const labExps = experimentsList.filter(
  (e) => !MAIN_SLUGS.includes(e.slug) && !HIDDEN_SLUGS.has(e.slug)
);

export default function ExperimentsPage() {
  return (
    <LayoutContainer>
      <div className="py-6 max-w-2xl mx-auto">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">⚗️</div>
          <h1 className="text-2xl font-black text-gray-900">웹실험</h1>
          <p className="text-gray-500 text-sm mt-2">
            심심할 때 해보는 인터랙티브 실험들
          </p>
        </div>

        {/* 메인 3개 */}
        <div className="grid grid-cols-1 gap-4 mb-10">
          {mainExps.map((exp) => (
            <Link key={exp.id} href={`/experiments/${exp.slug}`}>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all active:scale-[0.99] group">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: exp.bgColor }}
                  >
                    {exp.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{exp.title}</span>
                      {exp.isHot && (
                        <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">🔥 HOT</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-2">{exp.subtitle}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-400">⏱ {exp.estimatedMinutes}분</span>
                    </div>
                  </div>
                  <div className="text-gray-300 group-hover:text-gray-500 transition-colors text-lg flex-shrink-0">›</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* 실험실 (나머지) */}
        <div className="mb-4">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">실험실</h2>
          <div className="grid grid-cols-1 gap-3">
            {labExps.map((exp) => (
              <Link key={exp.id} href={`/experiments/${exp.slug}`}>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100 hover:bg-white hover:shadow-sm transition-all active:scale-[0.99] group">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: exp.bgColor }}
                  >
                    {exp.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-700 text-sm">{exp.title}</div>
                    <div className="text-xs text-gray-400 truncate">{exp.subtitle}</div>
                  </div>
                  <div className="text-gray-300 group-hover:text-gray-400 transition-colors">›</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </LayoutContainer>
  );
}

