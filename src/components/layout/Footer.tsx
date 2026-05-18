import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
          <div>
            <div className="font-bold text-brand-purple mb-3">🧠 심리테스트 연구소</div>
            <p className="text-gray-500 text-xs leading-relaxed">
              재미있고 유익한 심리테스트를<br />
              무료로 즐겨보세요.
            </p>
          </div>

          <div>
            <div className="font-semibold text-gray-700 mb-3">테스트</div>
            <ul className="space-y-1.5 text-gray-500">
              <li><Link href="/tests" className="hover:text-brand-purple transition-colors">전체 보기</Link></li>
              <li><Link href="/popular" className="hover:text-brand-purple transition-colors">인기 테스트</Link></li>
              <li><Link href="/new" className="hover:text-brand-purple transition-colors">신규 테스트</Link></li>
              <li><Link href="/random" className="hover:text-brand-purple transition-colors">랜덤 테스트</Link></li>
              <li><Link href="/ranking" className="hover:text-brand-purple transition-colors">랭킹</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-gray-700 mb-3">카테고리</div>
            <ul className="space-y-1.5 text-gray-500">
              <li><Link href="/category/yeonae" className="hover:text-brand-purple transition-colors">연애</Link></li>
              <li><Link href="/category/seonggyek" className="hover:text-brand-purple transition-colors">성격</Link></li>
              <li><Link href="/category/jikjang" className="hover:text-brand-purple transition-colors">직장</Link></li>
              <li><Link href="/category/don-sobi" className="hover:text-brand-purple transition-colors">돈/소비</Link></li>
              <li><Link href="/tests" className="hover:text-brand-purple transition-colors">전체 카테고리 →</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-gray-700 mb-3">정보</div>
            <ul className="space-y-1.5 text-gray-500">
              <li><Link href="/about" className="hover:text-brand-purple transition-colors">소개</Link></li>
              <li><Link href="/advertise" className="hover:text-brand-purple transition-colors">광고 문의</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-purple transition-colors">개인정보처리방침</Link></li>
              <li><Link href="/terms" className="hover:text-brand-purple transition-colors">이용약관</Link></li>
              <li><Link href="/disclaimer" className="hover:text-brand-purple transition-colors">면책 고지</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-xs text-gray-400 flex flex-col md:flex-row justify-between gap-2">
          <p>© {currentYear} 심리테스트 연구소. All rights reserved.</p>
          <p>본 테스트는 재미와 자기 이해를 위한 것으로, 전문적인 심리 진단을 대체하지 않습니다.</p>
        </div>
      </div>
    </footer>
  );
}
