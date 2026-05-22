"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getPlayableTest } from "@/lib/data/testRepository";
import type { TestResult, TestMeta } from "@/types";

interface PageProps {
  params: Promise<{ testSlug: string }>;
  searchParams: Promise<{ a?: string; b?: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psychlab.kr";

export default function ComparePage({ params, searchParams }: PageProps) {
  const { testSlug } = use(params);
  const { a: resultTypeA, b: resultTypeB } = use(searchParams);

  const [meta, setMeta] = useState<TestMeta | null>(null);
  const [resultA, setResultA] = useState<TestResult | null>(null);
  const [resultB, setResultB] = useState<TestResult | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const playable = getPlayableTest(testSlug);
    if (!playable) return;

    setMeta(playable.meta);

    if (resultTypeA) {
      const rA = playable.results.find((r) => r.id === resultTypeA);
      if (rA) setResultA(rA);
    }
    if (resultTypeB) {
      const rB = playable.results.find((r) => r.id === resultTypeB);
      if (rB) setResultB(rB);
    }
  }, [testSlug, resultTypeA, resultTypeB]);

  function copyInviteLink() {
    if (!resultTypeA) return;
    const link = `${SITE_URL}/compare/${testSlug}?a=${encodeURIComponent(resultTypeA)}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  // 결과 A만 있고 B가 없는 경우 = "내 결과 공유" 상태
  const isMyResultOnly = resultA && !resultB;
  const isBothResults = resultA && resultB;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="text-center mb-6">
        <div className="text-3xl mb-2">🆚</div>
        <h1 className="text-xl font-black text-gray-900 mb-1">결과 비교</h1>
        {meta && (
          <p className="text-sm text-gray-500">{meta.title}</p>
        )}
      </div>

      {/* 내 결과만 있는 경우 → 친구에게 링크 공유 유도 */}
      {isMyResultOnly && !isBothResults && (
        <div className="bg-gradient-to-br from-pink-50 to-purple-50 border border-pink-100 rounded-2xl p-5 mb-6 text-center">
          <div className="text-2xl mb-2">📩</div>
          <p className="font-bold text-gray-800 mb-1">친구에게 링크를 공유하세요!</p>
          <p className="text-sm text-gray-500 mb-4">
            친구가 같은 테스트를 완료하면 결과가 여기에 나타납니다
          </p>
          <button
            onClick={copyInviteLink}
            className="px-6 py-3 bg-brand-purple text-white rounded-2xl font-bold text-sm hover:bg-purple-700 transition-colors"
          >
            {copied ? "✅ 링크 복사됨!" : "🔗 비교 링크 복사하기"}
          </button>
        </div>
      )}

      {/* 두 결과 모두 있는 경우 → 비교 뷰 */}
      {isBothResults ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {/* 결과 A */}
            <CompareCard result={resultA} label="나" color="purple" />
            {/* 결과 B */}
            <CompareCard result={resultB} label="친구" color="pink" />
          </div>

          {/* 궁합 분석 */}
          <CompatibilityAnalysis resultA={resultA} resultB={resultB} />

          {/* 다시 테스트하기 */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center">
            <p className="text-sm text-gray-500 mb-3">다른 테스트로 비교해볼까요?</p>
            <Link
              href={`/test/${testSlug}/play`}
              className="inline-block px-5 py-2.5 bg-brand-purple text-white rounded-2xl text-sm font-bold hover:bg-purple-700 transition-colors"
            >
              🔄 테스트 다시하기
            </Link>
          </div>
        </div>
      ) : resultA ? null : (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">😅</div>
          <p className="text-gray-500 text-sm mb-4">비교할 결과를 찾을 수 없습니다.<br /><span className="text-xs text-gray-400">테스트를 먼저 완료해보세요.</span></p>
          <Link
            href={meta ? `/test/${meta.slug}` : "/tests"}
            className="px-5 py-2.5 bg-brand-purple text-white rounded-2xl text-sm font-bold hover:bg-purple-700 transition-colors"
          >
            테스트 하러 가기
          </Link>
        </div>
      )}

      {/* 결과 A 카드 (단독 표시) */}
      {isMyResultOnly && (
        <div className="mt-4">
          <p className="text-xs text-gray-400 text-center mb-3">내 결과 미리보기</p>
          <CompareCard result={resultA} label="나" color="purple" />
        </div>
      )}
    </div>
  );
}

function CompareCard({
  result,
  label,
  color,
}: {
  result: TestResult;
  label: string;
  color: "purple" | "pink";
}) {
  const colorMap = {
    purple: {
      bg: "from-purple-600 to-violet-600",
      badge: "bg-purple-100 text-purple-700",
      keyword: "bg-purple-50 text-purple-600 border-purple-100",
    },
    pink: {
      bg: "from-pink-500 to-rose-500",
      badge: "bg-pink-100 text-pink-700",
      keyword: "bg-pink-50 text-pink-600 border-pink-100",
    },
  };

  const c = colorMap[color];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      {/* 상단 컬러 헤더 */}
      <div className={`bg-gradient-to-br ${c.bg} px-3 pt-4 pb-6 text-white text-center`}>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${c.badge} mb-2 inline-block`}>
          {label}
        </span>
        <p className="text-xs font-bold leading-snug">{result.title}</p>
        {result.subtitle && (
          <p className="text-[10px] opacity-80 mt-0.5 leading-snug">{result.subtitle}</p>
        )}
      </div>

      {/* 키워드 */}
      {result.keywords && result.keywords.length > 0 && (
        <div className="px-2 py-2 flex flex-wrap gap-1 justify-center -mt-3">
          {result.keywords.slice(0, 3).map((kw) => (
            <span
              key={kw}
              className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${c.keyword}`}
            >
              #{kw}
            </span>
          ))}
        </div>
      )}

      {/* 요약 */}
      <div className="px-3 pb-3">
        <p className="text-[11px] text-gray-600 leading-relaxed line-clamp-3">{result.summary}</p>
      </div>
    </div>
  );
}

function CompatibilityAnalysis({
  resultA,
  resultB,
}: {
  resultA: TestResult;
  resultB: TestResult;
}) {
  // 키워드 겹치는 수로 궁합 점수 계산
  const aKw = new Set(resultA.keywords ?? []);
  const bKw = new Set(resultB.keywords ?? []);
  const commonCount = [...aKw].filter((k) => bKw.has(k)).length;
  const total = Math.max(aKw.size + bKw.size, 1);
  const score = Math.round(40 + (commonCount / total) * 60);

  // 잘 맞는지 확인 (matchingTypes 교차)
  const aMatches = new Set(resultA.matchingTypes ?? []);
  const bMatches = new Set(resultB.matchingTypes ?? []);
  const isMatch =
    aMatches.has(resultB.title) ||
    bMatches.has(resultA.title) ||
    [...aMatches].some((m) => bMatches.has(m));

  const label =
    score >= 80
      ? "환상의 궁합 🔥"
      : score >= 60
      ? "꽤 잘 맞아요 💜"
      : score >= 40
      ? "보통 정도예요 😊"
      : "서로 달라요 🌊";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 text-center shadow-sm">
      <p className="text-xs text-gray-500 mb-1">궁합 분석</p>
      <p className="text-3xl font-black text-brand-purple mb-1">{score}점</p>
      <p className="text-sm font-bold text-gray-700 mb-2">{label}</p>
      {isMatch && (
        <span className="inline-block text-[11px] px-3 py-1 bg-green-50 text-green-700 rounded-full border border-green-100 font-medium">
          ✨ 서로 잘 맞는 유형이에요!
        </span>
      )}
      <p className="text-[11px] text-gray-400 mt-2">
        공통 키워드 {commonCount}개 기준
      </p>
    </div>
  );
}
