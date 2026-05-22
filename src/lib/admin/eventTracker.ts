// 이벤트 트래커 - localStorage 기반 (나중에 GA4/Supabase로 교체)
// Future: replace localStorage with window.gtag or Supabase event insert

import type { AnalyticsEvent, AnalyticsEventType } from "./types";

const EVENT_LOG_KEY = "sslab_analytics_events";
const MAX_EVENTS = 2000;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function saveEvent(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(EVENT_LOG_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
    events.unshift(event);
    if (events.length > MAX_EVENTS) events.splice(MAX_EVENTS);
    localStorage.setItem(EVENT_LOG_KEY, JSON.stringify(events));
  } catch {
    // ignore
  }
}

function track(type: AnalyticsEventType, extra: Partial<AnalyticsEvent> = {}): void {
  const event: AnalyticsEvent = {
    id: generateId(),
    type,
    createdAt: new Date().toISOString(),
    ...extra,
  };
  saveEvent(event);
  // Future: window.gtag?.("event", type, extra);
  // Future: supabase.from("analytics_events").insert(event);
}

export function trackPageView(route: string): void {
  track("page_view", { route });
}

export function trackContentStart(contentId: string, kind: string): void {
  track("content_start", { contentId, contentKind: kind });
}

export function trackContentComplete(contentId: string, kind: string): void {
  track("content_complete", { contentId, contentKind: kind });
}

export function trackResultShare(contentId: string): void {
  track("result_share", { contentId });
}

export function trackSignup(): void {
  track("signup");
}

export function trackLogin(): void {
  track("login");
}

export function trackCheckIn(): void {
  track("check_in");
}

export function trackPointEarn(reason: string, amount: number): void {
  track("point_earn", { meta: { reason, amount } });
}

export function trackPointSpend(reason: string, amount: number): void {
  track("point_spend", { meta: { reason, amount } });
}

export function trackLuckyPlay(gameType: string, stake: number): void {
  track("lucky_play", { meta: { gameType, stake } });
}

export function trackLuckyResult(gameType: string, isWin: boolean, netPoints: number): void {
  track(isWin ? "lucky_win" : "lucky_lose", { meta: { gameType, netPoints } });
}

export function trackTogetherRoomCreate(gameType: string): void {
  track("together_room_create", { meta: { gameType } });
}

export function trackAdImpression(slotId: string): void {
  track("ad_impression", { meta: { slotId } });
}

export function trackAffiliateClick(affiliateId: string): void {
  track("affiliate_click", { meta: { affiliateId } });
}

export function trackSponsorInquiry(): void {
  track("sponsor_inquiry");
}

export function getStoredEvents(): AnalyticsEvent[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(EVENT_LOG_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function clearStoredEvents(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(EVENT_LOG_KEY);
}
