import type { RevenueEstimate, RevenueBreakdown, AdminDateRange } from "./types";
import { getMockSponsorInquiries } from "./mockAdminData";

export function calculateAdRevenue(pageViews: number, rpm: number): number {
  return Math.round((pageViews / 1000) * rpm);
}

export function getRevenueEstimate(pageViews: number, rpm: number = 1000): RevenueEstimate {
  const estimatedAdRevenue = calculateAdRevenue(pageViews, rpm);
  const sponsorRevenue = Math.round(estimatedAdRevenue * 0.4);
  const affiliateRevenue = Math.round(estimatedAdRevenue * 0.15);
  const customProductionRevenue = Math.round(estimatedAdRevenue * 0.2);
  return {
    pageViews,
    rpm,
    estimatedAdRevenue,
    sponsorRevenue,
    affiliateRevenue,
    customProductionRevenue,
    totalEstimatedRevenue: estimatedAdRevenue + sponsorRevenue + affiliateRevenue + customProductionRevenue,
  };
}

export function getRevenueScenarios(rpm: number = 1000) {
  const daus = [1000, 5000, 10000, 30000, 50000];
  return daus.map(dau => {
    const monthlyPV = dau * 5 * 30;
    const ad = calculateAdRevenue(monthlyPV, rpm);
    return {
      dau,
      monthlyPV,
      adRevenue: ad,
      sponsorRevenue: Math.round(ad * 0.4),
      affiliateRevenue: Math.round(ad * 0.15),
      total: Math.round(ad * 1.55),
    };
  });
}

export function getRevenueBreakdown(_dateRange: AdminDateRange = "30d"): RevenueBreakdown[] {
  const total = 850000;
  return [
    { source: "구글 애드센스", amount: 480000, share: 56.5, color: "#4F46E5" },
    { source: "브랜드 협찬", amount: 200000, share: 23.5, color: "#10B981" },
    { source: "기업 맞춤 제작", amount: 100000, share: 11.8, color: "#F59E0B" },
    { source: "제휴/CPA", amount: 70000, share: 8.2, color: "#EF4444" },
  ].map(item => ({ ...item, share: Math.round((item.amount / total) * 1000) / 10 }));
}

export function getSponsorPipeline() {
  const inquiries = getMockSponsorInquiries();
  const newAmt = inquiries.filter(i => i.status === "new").length * 500000;
  const activeAmt = inquiries.filter(i => i.status === "active").length * 800000;
  const completedAmt = inquiries.filter(i => i.status === "completed").length * 700000;
  return { newAmount: newAmt, activeAmount: activeAmt, completedAmount: completedAmt, monthlyEstimate: Math.round((newAmt * 0.3 + activeAmt + completedAmt) / 3) };
}

export function getSponsorProducts() {
  return [
    { name: "브랜드 테스트 제작", priceMin: 300000, priceMax: 1000000, description: "브랜드 맞춤 심리테스트 제작 + 결과 카드", turnaround: "2주", popular: true },
    { name: "브랜드 월드컵 제작", priceMin: 300000, priceMax: 1000000, description: "브랜드 아이템 이상형 월드컵", turnaround: "1주", popular: true },
    { name: "메인 배너 (1주)", priceMin: 100000, priceMax: 500000, description: "메인페이지 상단 배너 노출", turnaround: "즉시", popular: false },
    { name: "카테고리 스폰서", priceMin: 300000, priceMax: 1000000, description: "특정 카테고리 브랜딩", turnaround: "3일", popular: false },
    { name: "시즌 이벤트 스폰서", priceMin: 500000, priceMax: 2000000, description: "시즌 한정 브랜드 이벤트", turnaround: "2주", popular: false },
    { name: "풀패키지 (테스트+리포트)", priceMin: 1000000, priceMax: 3000000, description: "제작 + 결과 카드 + 성과 리포트", turnaround: "3주", popular: true },
  ];
}

export function getAffiliatePerformance() {
  return {
    totalClicks: 342,
    totalConversions: 28,
    conversionRate: 8.2,
    estimatedRevenue: 187000,
  };
}
