import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";

export const metadata: Metadata = { title: "개인정보처리방침" };

export default function PrivacyPage() {
  return (
    <LayoutContainer narrow>
      <h1 className="text-2xl font-extrabold text-brand-text mb-6">개인정보처리방침</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-sm text-gray-600 space-y-4 leading-relaxed">
        <p>심리테스트 연구소(이하 &quot;서비스&quot;)는 사용자의 개인정보를 수집하지 않습니다.</p>
        <p>테스트 결과는 사용자의 기기 내 로컬 스토리지(localStorage)에만 저장되며, 서버로 전송되지 않습니다.</p>
        <p>서비스는 Google Analytics를 통해 익명화된 방문 통계를 수집할 수 있습니다. 이는 서비스 개선 목적으로만 사용됩니다.</p>
        <p>광고 서비스(Google AdSense)를 통해 광고가 표시될 수 있으며, 이 과정에서 광고 서비스 사업자가 쿠키를 사용할 수 있습니다.</p>
        <p>문의: contact@psychlab.kr</p>
      </div>
    </LayoutContainer>
  );
}
