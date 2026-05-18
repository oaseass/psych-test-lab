"use client";

import { trackShare } from "@/lib/tracking/tracking";

interface ShareButtonsProps {
  shareText: string;
  testSlug: string;
  resultId?: string;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psychlab.kr";

export default function ShareButtons({ shareText, testSlug, resultId }: ShareButtonsProps) {
  const url = resultId
    ? `${SITE_URL}/result/${encodeURIComponent(resultId)}`
    : `${SITE_URL}/test/${testSlug}`;
  
  const fullText = `${shareText}${url}`;

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      alert("링크가 복사됐어요! 친구에게 공유해보세요 🙌");
    }).catch(() => {
      alert("링크: " + url);
    });
    trackShare(testSlug, "copy_link");
  }

  function shareKakao() {
    // 카카오 SDK가 없으면 링크 복사로 fallback
    copyLink();
    trackShare(testSlug, "kakao");
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
          🔗 링크 복사
        </button>
      </div>

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
