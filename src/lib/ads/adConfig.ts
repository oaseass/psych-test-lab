const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psychlab.kr";

export interface AdSlotConfig {
  id: string;
  label: string;
  size: "banner" | "square" | "leaderboard" | "half-page";
  clientId?: string;
  slot?: string;
}

export const AD_SLOTS: Record<string, AdSlotConfig> = {
  // 상단 배너 (728x90 또는 320x50)
  header_banner: {
    id: "header_banner",
    label: "상단 배너",
    size: "leaderboard",
    slot: process.env.NEXT_PUBLIC_ADSENSE_HEADER_SLOT,
  },
  // 테스트 카드 사이 인피드 광고
  in_feed_1: {
    id: "in_feed_1",
    label: "인피드 광고 1",
    size: "banner",
    slot: process.env.NEXT_PUBLIC_ADSENSE_INFEED_SLOT,
  },
  // 결과 페이지 중간 광고
  result_middle: {
    id: "result_middle",
    label: "결과 중간 광고",
    size: "square",
    slot: process.env.NEXT_PUBLIC_ADSENSE_RESULT_SLOT,
  },
  // 사이드바 광고
  sidebar: {
    id: "sidebar",
    label: "사이드바 광고",
    size: "half-page",
    slot: process.env.NEXT_PUBLIC_ADSENSE_SIDEBAR_SLOT,
  },
};

export const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export function isAdSenseEnabled(): boolean {
  return typeof ADSENSE_CLIENT_ID === "string" && ADSENSE_CLIENT_ID.length > 0;
}

export function getSiteUrl(): string {
  return SITE_URL;
}
