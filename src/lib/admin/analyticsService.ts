import type { KpiMetric, MultiSeriesPoint, DashboardSummary, AdminDateRange } from "./types";
import { getMockKpiMetrics, getMockDashboardSummary, getMockTrafficSeries, getMockFunnelMetrics, getMockContentPerformance } from "./mockAdminData";

const DAY_MAP: Record<AdminDateRange, number> = { today: 1, yesterday: 1, "7d": 7, "30d": 30, "90d": 90 };

export function getDashboardSummary(_dateRange: AdminDateRange = "today"): DashboardSummary {
  return getMockDashboardSummary();
}

export function getKpiMetrics(_dateRange: AdminDateRange = "today"): KpiMetric[] {
  return getMockKpiMetrics();
}

export function getTrafficSeries(dateRange: AdminDateRange = "7d"): MultiSeriesPoint[] {
  return getMockTrafficSeries(DAY_MAP[dateRange]);
}

export function getFunnelMetrics(_dateRange: AdminDateRange = "7d") {
  return getMockFunnelMetrics();
}

export function getContentPerformance(_dateRange: AdminDateRange = "7d") {
  return getMockContentPerformance();
}

export function getCategoryPerformance(_dateRange: AdminDateRange = "7d") {
  const categories = [
    { category: "심리테스트", color: "#4F46E5" },
    { category: "퀴즈", color: "#7C3AED" },
    { category: "월드컵", color: "#10B981" },
    { category: "두뇌게임", color: "#F59E0B" },
    { category: "같이놀기", color: "#3B82F6" },
    { category: "럭키존", color: "#EF4444" },
    { category: "웹실험", color: "#8B5CF6" },
    { category: "생성기", color: "#EC4899" },
    { category: "투표", color: "#06B6D4" },
  ];
  return categories.map((c, i) => ({
    ...c,
    pageViews: [8200, 3100, 5400, 2200, 1800, 3600, 900, 650, 1200][i],
    completionRate: [58, 71, 64, 82, 55, 48, 67, 55, 90][i],
    shareRate: [3.2, 1.8, 5.1, 1.2, 4.8, 2.1, 1.5, 0.8, 2.3][i],
    signupRate: [2.1, 0.9, 1.8, 0.7, 3.2, 1.1, 0.6, 0.4, 0.8][i],
    adContrib: [38, 14, 25, 10, 8, 17, 4, 3, 6][i],
  }));
}

export function getUserAcquisition(_dateRange: AdminDateRange = "7d") {
  const days = DAY_MAP[_dateRange];
  const result = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const seed = d.getDate() + d.getMonth() * 31 + 200;
    result.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      organic: Math.round(15 + Math.sin(seed) * 8 + Math.random() * 10),
      direct: Math.round(8 + Math.cos(seed) * 4 + Math.random() * 5),
      invite: Math.round(4 + Math.sin(seed + 1) * 2 + Math.random() * 3),
    });
  }
  return result;
}

export function getRetentionMetrics() {
  return {
    day1: 38.2, day3: 22.5, day7: 14.8, day30: 8.3,
    checkInRate: 24.1, missionRate: 18.7, shopRate: 6.2, badgeRate: 31.5,
    cohortData: [
      { week: "W1", d1: 42, d3: 25, d7: 16, d30: 9 },
      { week: "W2", d1: 38, d3: 22, d7: 14, d30: 8 },
      { week: "W3", d1: 40, d3: 24, d7: 15, d30: 0 },
      { week: "W4", d1: 35, d3: 20, d7: 0, d30: 0 },
    ],
  };
}
