import type { ContentPerformance } from "./types";
import { getMockContentPerformance } from "./mockAdminData";

export function getAdminContentList(): ContentPerformance[] {
  return getMockContentPerformance();
}

export function getContentDetail(id: string): ContentPerformance | null {
  return getMockContentPerformance().find(c => c.id === id) ?? null;
}

export function updateContentQuality(id: string, qualityTier: ContentPerformance["qualityTier"]): void {
  // Future: DB update
  if (typeof window === "undefined") return;
  const key = `admin_content_quality_${id}`;
  localStorage.setItem(key, qualityTier);
}

export function toggleFeatured(id: string): void {
  if (typeof window === "undefined") return;
  const key = `admin_featured_${id}`;
  const cur = localStorage.getItem(key) === "true";
  localStorage.setItem(key, String(!cur));
}

export function toggleHot(id: string): void {
  if (typeof window === "undefined") return;
  const key = `admin_hot_${id}`;
  const cur = localStorage.getItem(key) === "true";
  localStorage.setItem(key, String(!cur));
}

export function toggleHidden(id: string): void {
  if (typeof window === "undefined") return;
  const key = `admin_hidden_${id}`;
  const cur = localStorage.getItem(key) === "true";
  localStorage.setItem(key, String(!cur));
}

export function getContentRecommendations() {
  const all = getMockContentPerformance();
  return {
    promote: all.filter(c => c.recommendation === "promote").slice(0, 5),
    improve: all.filter(c => c.recommendation === "improve").slice(0, 5),
    hide: all.filter(c => c.recommendation === "hide").slice(0, 5),
  };
}
