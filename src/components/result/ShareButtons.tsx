"use client";

import { useState } from "react";
import { trackShare } from "@/lib/tracking/tracking";

interface ShareButtonsProps {
  shareText: string;
  testSlug: string;
  resultId?: string;
  resultTitle?: string;
  resultSubtitle?: string;
  testTitle?: string;
  categorySlug?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psychlab.kr";

export default function ShareButtons({
  shareText,
  testSlug,
  resultId,
  resultTitle,
  resultSubtitle,
  testTitle,
  categorySlug,
}: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [compareCopied, setCompareCopied] = useState(false);

  const url = resultId
    ? `${SITE_URL}/result/${encodeURIComponent(resultId)}`
    : `${SITE_URL}/test/${testSlug}`;

  const fullText = `${shareText}\n${url}`;

  // OG 이미지 URL 생성
  const ogImageUrl = resultTitle
    ? `${SITE_URL}/api/og?${new URLSearchParams({
        title: testTitle ?? testSlug,
        result: resultTitle,
        subtitle: resultSubtitle ?? "",
        category: categorySlug ?? "심리테스트",
      }).toString()}`
    : null;

  // 결과 타입 추출 (resultId: {testSlug}__{resultTypeId}__{timestamp})
  const resultTypeId = resultId ? resultId.split("__")[1] : null;

  function copyLink() {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert("링크: " + url));
    trackShare(testSlug, "copy_link");
  }

  function copyCompareLink() {
    if (!resultTypeId) return;
    const compareUrl = `${SITE_URL}/compare/${testSlug}?a=${encodeURIComponent(resultTypeId)}`;
    navigator.clipboard
      .writeText(compareUrl)
      .then(() => {
        setCompareCopied(true);
        setTimeout(() => setCompareCopied(false), 2000);
      })
      .catch(() => alert("비교 링크: " + compareUrl));
    trackShare(testSlug, "compare_link");
  }

  function shareTwitter() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`;
    window.open(twitterUrl, "_blank", "noopener noreferrer");
    trackShare(testSlug, "twitter");
  }

  async function shareNative() {
    if (navigator.share) {
      try {
        await navigator.share({ title: "심리테스트 결과", text: shareText, url });
        trackShare(testSlug, "native");
      } catch {
        // 사용자가 취소한 경우 무시
      }
    } else {
      copyLink();
    }
  }

  return (
    <div className="space-y-3">
      <p className="text-center text-sm font-semibold text-gray-600">친구들에게 공유하기</p>

      <div className="flex gap-2">
        {/* 기본 공유 */}
        <button
          onClick={shareNative}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-brand-purple text-white rounded-2xl text-sm font-bold hover:bg-purple-700 transition-colors"
        >
          📤 공유하기
        </button>

        {/* 링크 복사 */}
        <button
          onClick={copyLink}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gray-100 text-gray-700 rounded-2xl text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          {copied ? "✅ 복사됨" : "🔗 링크 복사"}
        </button>
      </div>

      {/* 친구와 결과 비교하기 */}
      {resultTypeId && (
        <button
          onClick={copyCompareLink}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-pink-50 text-pink-600 rounded-2xl text-sm font-bold hover:bg-pink-100 transition-colors border border-pink-100"
        >
          {compareCopied ? "✅ 비교 링크 복사됨!" : "🆚 친구와 결과 비교하기"}
        </button>
      )}

      {/* 트위터 공유 */}
      <button
        onClick={shareTwitter}
        className="w-full flex items-center justify-center gap-2 py-2.5 bg-sky-50 text-sky-600 rounded-2xl text-sm font-medium hover:bg-sky-100 transition-colors"
      >
        🐦 X(트위터)에 공유
      </button>


    </div>
  );
}
