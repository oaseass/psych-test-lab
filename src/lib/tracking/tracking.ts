// GA4, Naver, Kakao 이벤트 트래킹 유틸리티

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    wcs?: { send: (obj: { beh: number }) => void };
    _nasa?: Record<string, unknown>;
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;

  // Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }
}

// 테스트 시작 이벤트
export function trackTestStart(testSlug: string, testTitle: string): void {
  trackEvent("test_start", {
    test_slug: testSlug,
    test_title: testTitle,
  });
}

// 테스트 완료 이벤트
export function trackTestComplete(
  testSlug: string,
  resultTypeId: string,
  timeSpentSeconds?: number
): void {
  trackEvent("test_complete", {
    test_slug: testSlug,
    result_type_id: resultTypeId,
    time_spent: timeSpentSeconds,
  });
}

// 결과 공유 이벤트
export function trackShare(testSlug: string, method: string): void {
  trackEvent("share", {
    content_type: "test_result",
    item_id: testSlug,
    method,
  });
}

// 페이지뷰 (Next.js App Router는 자동으로 GA4가 처리하지만 필요 시 수동 전송)
export function trackPageview(path: string): void {
  trackEvent("page_view", {
    page_path: path,
  });
}

// 광고 클릭
export function trackAdClick(slotId: string): void {
  trackEvent("ad_click", {
    slot_id: slotId,
  });
}
