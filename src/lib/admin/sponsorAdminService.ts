import type { SponsorInquiry } from "./types";
import { getMockSponsorInquiries, getMockAdminUsers } from "./mockAdminData";

export function getSponsorInquiries(): SponsorInquiry[] {
  return getMockSponsorInquiries();
}

export function updateSponsorStatus(id: string, status: SponsorInquiry["status"]): void {
  if (typeof window === "undefined") return;
  try {
    const saved = JSON.parse(localStorage.getItem("sslab_sponsor_inquiries") ?? "[]") as SponsorInquiry[];
    const idx = saved.findIndex(s => s.id === id);
    if (idx >= 0) {
      saved[idx].status = status;
      localStorage.setItem("sslab_sponsor_inquiries", JSON.stringify(saved));
    }
  } catch { /* ignore */ }
}

export function submitSponsorInquiry(data: Omit<SponsorInquiry, "id" | "status" | "submittedAt" | "notes">): void {
  if (typeof window === "undefined") return;
  try {
    const saved = JSON.parse(localStorage.getItem("sslab_sponsor_inquiries") ?? "[]") as SponsorInquiry[];
    saved.unshift({
      ...data,
      id: `sp-${Date.now()}`,
      status: "new",
      submittedAt: new Date().toISOString(),
      notes: "",
    });
    localStorage.setItem("sslab_sponsor_inquiries", JSON.stringify(saved));
  } catch { /* ignore */ }
}

export function getSponsorProducts() {
  return [
    { id: "brand_test", name: "브랜드 테스트 제작", priceMin: 300000, priceMax: 1000000 },
    { id: "brand_worldcup", name: "브랜드 월드컵 제작", priceMin: 300000, priceMax: 1000000 },
    { id: "brand_quiz", name: "브랜드 퀴즈 제작", priceMin: 200000, priceMax: 700000 },
    { id: "main_banner", name: "메인 배너 (1주)", priceMin: 100000, priceMax: 500000 },
    { id: "category_sponsor", name: "카테고리 스폰서", priceMin: 300000, priceMax: 1000000 },
    { id: "season_event", name: "시즌 이벤트 스폰서", priceMin: 500000, priceMax: 2000000 },
    { id: "together_room", name: "같이놀기 브랜드 방", priceMin: 300000, priceMax: 800000 },
  ];
}

// 오용 방지
export { getMockAdminUsers };
