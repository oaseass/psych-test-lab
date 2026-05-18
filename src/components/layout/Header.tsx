"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-purple">
          <span className="text-2xl">🎮</span>
          <span className="hidden sm:block">심심풀이 포털</span>
          <span className="sm:hidden">심심풀이</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link href="/tests" className="text-gray-600 hover:text-brand-purple transition-colors">
            심리테스트
          </Link>
          <Link href="/games" className="text-gray-600 hover:text-brand-purple transition-colors">
            두뇌게임
          </Link>
          <Link href="/games/worldcup" className="text-gray-600 hover:text-brand-purple transition-colors">
            월드컵
          </Link>
          <Link href="/games/balance" className="text-gray-600 hover:text-brand-purple transition-colors">
            밸런스
          </Link>
          <Link href="/games/initial-quiz" className="text-gray-600 hover:text-brand-purple transition-colors">
            초성퀴즈
          </Link>
          <Link href="/polls" className="text-gray-600 hover:text-brand-purple transition-colors">
            투표
          </Link>
          <Link href="/generator" className="text-gray-600 hover:text-brand-purple transition-colors">
            생성기
          </Link>
        </nav>

        {/* 모바일 검색 + 햄버거 */}
        <div className="md:hidden flex items-center gap-2">
          <Link href="/search" aria-label="검색" className="p-2 text-gray-600 hover:text-brand-purple">
            🔍
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
            className="p-2 text-gray-600"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* 데스크탑 검색 */}
        <Link
          href="/search"
          aria-label="검색"
          className="hidden md:flex items-center gap-1 text-sm text-gray-500 hover:text-brand-purple ml-2"
        >
          🔍
        </Link>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {[
            { href: "/tests", label: "🧠 심리테스트" },
            { href: "/games", label: "🎮 두뇌게임" },
            { href: "/games/worldcup", label: "🏆 이상형 월드컵" },
            { href: "/games/balance", label: "⚖️ 밸런스 게임" },
            { href: "/games/initial-quiz", label: "🔤 초성 퀴즈" },
            { href: "/games/nonsense", label: "🤣 넌센스 퀴즈" },
            { href: "/games/observation", label: "👁️ 관찰력 테스트" },
            { href: "/games/memory", label: "🧠 기억력 테스트" },
            { href: "/games/reaction", label: "⚡ 반응속도" },
            { href: "/polls", label: "🗳️ 투표" },
            { href: "/generator", label: "✨ 생성기" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-brand-purple text-sm font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
