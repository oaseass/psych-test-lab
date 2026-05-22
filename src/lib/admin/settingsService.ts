import type { AdminSettings } from "./types";

const SETTINGS_KEY = "sslab_admin_settings";

const DEFAULT_SETTINGS: AdminSettings = {
  siteName: "심심풀이 연구소",
  defaultRpm: 1000,
  adsEnabled: true,
  demoDataVisible: true,
  mainQualityThreshold: "polished",
  signupBonusPoints: 100,
  checkInPoints: 50,
  dailyMissionBonus: 20,
  luckyDailyLimit: 3000,
  luckyDailyMaxProfit: 5000,
  togetherAiDefault: true,
};

export function getAdminSettings(): AdminSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveAdminSettings(settings: Partial<AdminSettings>): void {
  if (typeof window === "undefined") return;
  const current = getAdminSettings();
  localStorage.setItem(SETTINGS_KEY, JSON.stringify({ ...current, ...settings }));
}

export function resetAdminSettings(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SETTINGS_KEY);
}
