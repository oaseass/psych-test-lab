import type { Metadata } from "next";
import LayoutContainer from "@/components/layout/LayoutContainer";

export const metadata: Metadata = { title: "이용약관" };

export default function TermsPage() {
  return (
    <LayoutContainer narrow>
      <h1 className="text-2xl font-extrabold text-brand-text mb-6">이용약관</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 text-sm text-gray-600 space-y-4 leading-relaxed">
        <p><strong>제1조 (목적)</strong><br />본 약관은 심리테스트 연구소(이하 &quot;서비스&quot;)의 이용 조건과 절차, 서비스 이용자와 서비스 간의 권리·의무 및 책임사항 등을 규정합니다.</p>
        <p><strong>제2조 (서비스 이용)</strong><br />서비스는 무료로 제공됩니다. 사용자는 서비스를 법령과 약관에 따라 이용해야 합니다.</p>
        <p><strong>제3조 (서비스의 변경)</strong><br />서비스는 운영상, 기술상의 이유로 서비스 내용을 변경하거나 중단할 수 있습니다.</p>
        <p><strong>제4조 (면책)</strong><br />본 테스트는 전문적 심리 진단을 대체하지 않습니다. 테스트 결과에 의한 의사결정의 책임은 사용자 본인에게 있습니다.</p>
        <p>시행일: 2025년 1월 1일</p>
      </div>
    </LayoutContainer>
  );
}
