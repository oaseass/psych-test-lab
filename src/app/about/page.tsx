import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";

export const metadata: Metadata = {
  title: "소개",
  description: "심리테스트 연구소 소개 페이지.",
};

export default function AboutPage() {
  return (
    <LayoutContainer narrow>
      <div className="prose prose-gray max-w-none">
        <h1 className="text-2xl font-extrabold text-brand-text mb-6">심리테스트 연구소 소개</h1>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-brand-purple mb-3">🧠 우리는 어떤 서비스인가요?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            심리테스트 연구소는 누구나 쉽고 재미있게 자신을 이해할 수 있는 심리테스트 플랫폼입니다.
            연애, 성격, 직장, 인간관계, 돈 등 다양한 주제의 테스트를 통해 나를 더 잘 알아가는 경험을 제공합니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-brand-purple mb-3">📋 테스트는 어떻게 만들어지나요?</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            모든 테스트는 심리학적 이론과 연구를 바탕으로 기획됩니다.
            다만, 본 테스트는 전문적인 심리 진단 도구가 아니며, 자기 이해와 재미를 위한 목적으로 제공됩니다.
            공인된 심리 진단이 필요하신 분은 전문가 상담을 권장드립니다.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-brand-purple mb-3">📧 문의하기</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            서비스 이용 문의, 버그 신고, 광고 문의 등은 아래 이메일로 연락해주세요.<br />
            <span className="text-brand-purple font-medium">contact@psychlab.kr</span>
          </p>
        </div>
      </div>
    </LayoutContainer>
  );
}
