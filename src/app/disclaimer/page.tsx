import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";

export const metadata: Metadata = { title: "면책 고지" };

export default function DisclaimerPage() {
  return (
    <LayoutContainer narrow>
      <h1 className="text-2xl font-extrabold text-brand-text mb-6">면책 고지</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-sm text-gray-600 space-y-4 leading-relaxed">
        <p>심심풀이 연구소의 모든 테스트는 오락 및 자기 이해 목적으로 제공됩니다.</p>
        <p>본 서비스의 테스트 결과는 전문 심리학자, 정신건강의학과 전문의, 또는 기타 의료 전문가의 진단을 대체할 수 없습니다.</p>
        <p>정신건강 문제가 있으신 분은 반드시 전문가의 도움을 받으시기 바랍니다.</p>
        <p>테스트 결과를 기반으로 한 개인적 의사결정에 대한 책임은 사용자 본인에게 있으며, 서비스는 이에 대해 책임을 지지 않습니다.</p>
      </div>
    </LayoutContainer>
  );
}
