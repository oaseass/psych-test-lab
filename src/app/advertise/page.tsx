import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";

export const metadata: Metadata = {
  title: "광고 문의",
};

export default function AdvertisePage() {
  return (
    <LayoutContainer narrow>
      <h1 className="text-2xl font-extrabold text-brand-text mb-6">광고 문의</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <p className="text-sm text-gray-600">
          심심풀이 연구소에 광고를 게재하고 싶으신 분은 아래 이메일로 문의해주세요.
        </p>
        <div className="bg-purple-50 rounded-xl p-4">
          <p className="text-sm text-brand-purple font-medium">📧 contact@psychlab.kr</p>
        </div>
        <p className="text-xs text-gray-400">
          광고 유형: 배너 광고, 스폰서 테스트, 인피드 광고 등 협의 가능합니다.
        </p>
      </div>
    </LayoutContainer>
  );
}
