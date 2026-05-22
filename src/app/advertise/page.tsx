"use client";
import { useState } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { submitSponsorInquiry } from "@/lib/admin/sponsorAdminService";
import { trackSponsorInquiry } from "@/lib/admin/eventTracker";

const PRODUCTS = [
  { id: "brand_test", name: "브랜드 테스트 제작", emoji: "🧠", desc: "브랜드 맞춤 심리테스트 + 결과 카드 + 공유 기능", price: "30만~100만원", popular: true },
  { id: "brand_worldcup", name: "브랜드 월드컵 제작", emoji: "🏆", desc: "브랜드 아이템으로 이상형 월드컵 구성", price: "30만~100만원", popular: true },
  { id: "brand_quiz", name: "브랜드 퀴즈 제작", emoji: "❓", desc: "브랜드 관련 퀴즈 + 보상 연동", price: "20만~70만원", popular: false },
  { id: "main_banner", name: "메인 배너 노출", emoji: "📢", desc: "메인페이지 상단 배너 1주 노출", price: "10만~50만원", popular: false },
  { id: "category_sponsor", name: "카테고리 스폰서", emoji: "🎯", desc: "특정 카테고리 브랜딩 + 배너", price: "30만~100만원", popular: false },
  { id: "together_room", name: "같이놀기 브랜드 방", emoji: "🎮", desc: "브랜드 테마 같이놀기 방 + 초대 기능", price: "30만~80만원", popular: false },
  { id: "full_package", name: "풀패키지", emoji: "🌟", desc: "테스트 + 결과 카드 + 성과 리포트 + SNS 배포", price: "100만~300만원", popular: true },
];

export default function AdvertisePage() {
  const [form, setForm] = useState({ brand: "", contact: "", phone: "", email: "", product: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.brand || !form.contact || !form.phone || !form.product) {
      setError("브랜드명, 담당자, 연락처, 희망 상품은 필수입니다.");
      return;
    }
    submitSponsorInquiry({ brand: form.brand, contact: form.contact, phone: form.phone, email: form.email, product: form.product, budget: form.budget, message: form.message });
    trackSponsorInquiry();
    setSubmitted(true);
  }

  return (
    <LayoutContainer>
      <div className="pt-4 pb-12">
        <div className="text-center mb-10">
          <div className="inline-block bg-violet-100 text-violet-700 font-bold text-xs px-3 py-1.5 rounded-full mb-3">협찬 · 광고 · 제휴</div>
          <h1 className="text-3xl font-black text-brand-text mb-3">우리 브랜드를<br className="sm:hidden" /> 심심풀이에 담아보세요</h1>
          <p className="text-brand-muted text-sm max-w-md mx-auto">쿨즈·테스트·게임이 있는 심심풀이 연구소에서 브랜드 스토리를 재미있게 전달하세요.</p>
        </div>
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { n: "🎯", l: "높은 몰입도", d: "콘텐츠 완료형 설계" },
            { n: "📤", l: "결과 공유 구조", d: "바이럴 확산 가능" },
            { n: "📊", l: "데이터 수집 중", d: "오픈 초기 프로모션 가능" },
          ].map(s => (
            <div key={s.l} className="bg-white border border-brand-border rounded-2xl p-4 text-center">
              <div className="text-2xl mb-1">{s.n}</div>
              <div className="text-sm font-bold text-brand-purple">{s.l}</div>
              <div className="text-xs text-brand-muted mt-0.5">{s.d}</div>
            </div>
          ))}
        </div>
        <h2 className="text-lg font-black text-brand-text mb-4">💡 협찬 상품 안내</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {PRODUCTS.map(p => (
            <div key={p.id} className={`bg-white border rounded-2xl p-4 ${p.popular ? "border-violet-300" : "border-brand-border"}`}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{p.emoji}</span>
                  <span className="font-bold text-brand-text text-sm">{p.name}</span>
                </div>
                {p.popular && <span className="text-[9px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full font-bold">인기</span>}
              </div>
              <p className="text-xs text-brand-muted mb-2">{p.desc}</p>
              <div className="font-bold text-violet-700 text-xs">{p.price}</div>
            </div>
          ))}
        </div>
        <div className="bg-white border border-brand-border rounded-2xl p-6">
          <h2 className="text-lg font-black text-brand-text mb-5">📩 협찬 문의하기</h2>
          {submitted ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">✅</div>
              <div className="font-bold text-brand-text text-lg mb-2">문의가 접수되었습니다!</div>
              <p className="text-sm text-brand-muted mb-4">영업일 기준 2일 이내에 연락드리겠습니다.</p>
              <Link href="/" className="btn-primary px-6 py-2.5 text-sm">메인으로 돌아가기</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</p>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">브랜드명 *</label>
                  <input className="w-full border border-brand-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} placeholder="(주)브랜드명" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">담당자명 *</label>
                  <input className="w-full border border-brand-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400" value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))} placeholder="홍길동" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">연락처 *</label>
                  <input className="w-full border border-brand-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="010-0000-0000" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-brand-text mb-1">이메일</label>
                  <input className="w-full border border-brand-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@brand.com" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">희망 상품 *</label>
                <select className="w-full border border-brand-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400 bg-white" value={form.product} onChange={e => setForm(f => ({ ...f, product: e.target.value }))}>
                  <option value="">선택해주세요</option>
                  {PRODUCTS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">예산</label>
                <input className="w-full border border-brand-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} placeholder="예) 50만원, 100만원 이상" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-brand-text mb-1">문의 내용</label>
                <textarea className="w-full border border-brand-border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-violet-400 resize-none" rows={4} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="브랜드 소개, 희망 일정, 특이 요청 등 자유롭게 작성해주세요." />
              </div>
              <button type="submit" className="w-full btn-primary py-3 text-sm font-bold">문의 접수하기</button>
              <p className="text-[11px] text-brand-muted text-center">문의 정보는 상담 목적으로만 사용됩니다.</p>
            </form>
          )}
        </div>
      </div>
    </LayoutContainer>
  );
}
