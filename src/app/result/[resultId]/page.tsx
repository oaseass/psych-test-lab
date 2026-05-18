"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResultCard from "@/components/result/ResultCard";
import ResultSections from "@/components/result/ResultSections";
import ShareButtons from "@/components/result/ShareButtons";
import TestGrid from "@/components/tests/TestGrid";
import SectionTitle from "@/components/common/SectionTitle";
import AdSlot from "@/components/common/AdSlot";
import { getPlayableTest, getRecommendations, getAllTestMeta } from "@/lib/data/testRepository";
import { getPlayResult } from "@/lib/test-engine/storage";
import { restoreFromResultId } from "@/lib/test-engine/resultResolver";
import { decodeResultId } from "@/lib/utils/slug";
import NextContentRecommend from "@/components/common/NextContentRecommend";
import PointRewardBanner from "@/components/user/PointRewardBanner";
import type { TestResult, TestMeta } from "@/types";

interface PageProps {
  params: Promise<{ resultId: string }>;
}

export default function ResultPage({ params }: PageProps) {
  const { resultId: encodedResultId } = use(params);
  const resultId = decodeResultId(encodedResultId);

  const [result, setResult] = useState<TestResult | null>(null);
  const [meta, setMeta] = useState<TestMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // resultId 형식: {testSlug}__{resultTypeId}__{timestamp}
    const parts = resultId.split("__");
    if (parts.length < 2) {
      setLoading(false);
      return;
    }

    const testSlug = parts[0];
    const playable = getPlayableTest(testSlug);
    if (!playable) {
      setLoading(false);
      return;
    }

    // localStorage에서 완전한 결과 조회
    const stored = getPlayResult(resultId);
    if (stored) {
      const foundResult = playable.results.find((r) => r.id === stored.resultTypeId);
      if (foundResult) {
        setResult(foundResult);
        setMeta(playable.meta);
        setLoading(false);
        return;
      }
    }

    // localStorage에 없으면 resultId에서 복원
    const restored = restoreFromResultId(resultId, playable);
    if (restored) {
      setResult(restored.result);
      setMeta(playable.meta);
    }

    setLoading(false);
  }, [resultId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-400">
          <div className="text-4xl animate-pulse mb-3">🧠</div>
          <p>결과 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!result || !meta) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😅</div>
          <h1 className="text-xl font-bold text-gray-700 mb-2">결과를 찾을 수 없어요</h1>
          <p className="text-sm text-gray-500 mb-6">이 기기에서 테스트한 결과만 볼 수 있어요.</p>
          <Link
            href="/"
            className="px-6 py-3 bg-brand-purple text-white rounded-2xl font-bold hover:bg-purple-700 transition-colors"
          >
            테스트 하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      {/* 결과 카드 */}
      <ResultCard result={result} meta={meta} className="mb-4" />

      {/* 공유 버튼 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-4">
        <ShareButtons
          shareText={result.shareText}
          testSlug={meta.slug}
          resultId={resultId}
        />
      </div>

      {/* 광고 */}
      <AdSlot slotKey="result_middle" className="mb-4" />

      {/* 상세 결과 */}
      <ResultSections result={result} className="mb-6" />

      {/* 다시 하기 */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 text-center">
        <p className="text-sm text-gray-500 mb-3">다시 해보거나 다른 테스트를 해보세요</p>
        <div className="flex gap-3">
          <Link
            href={`/test/${meta.slug}/play`}
            className="flex-1 py-2.5 border-2 border-brand-purple text-brand-purple rounded-2xl text-sm font-bold hover:bg-purple-50 transition-colors"
          >
            다시 하기
          </Link>
          <Link
            href="/random"
            className="flex-1 py-2.5 bg-brand-purple text-white rounded-2xl text-sm font-bold hover:bg-purple-700 transition-colors"
          >
            🎲 랜덤 테스트
          </Link>
        </div>
      </div>

      {/* 포인트 보상 */}
      <PointRewardBanner contentId={meta.slug} reason="test_complete" className="mb-6" />

      {/* 추천 테스트 */}
      <RecommendedTests currentSlug={meta.slug} categorySlug={meta.categorySlug} />

      {/* 다음 콘텐츠 (게임/퀴즈/투표) */}
      <div className="mt-2 mb-10">
        <NextContentRecommend currentSlug={meta.slug} title="다른 것도 해봐요 🎮" />
      </div>
    </div>
  );
}

function RecommendedTests({ currentSlug, categorySlug }: { currentSlug: string; categorySlug: string }) {
  const allTests = getAllTestMeta();
  const recommended = getRecommendations({ currentSlug, categorySlug, allTests });

  if (recommended.length === 0) return null;

  return (
    <section>
      <SectionTitle title="다음 테스트 추천" />
      <TestGrid tests={recommended} columns={3} compact />
    </section>
  );
}
