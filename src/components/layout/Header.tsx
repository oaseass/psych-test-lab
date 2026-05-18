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
          <span className="text-2xl">🧠</span>
          <span className="hidden sm:block">심리테스트 연구소</span>
          <span className="sm:hidden">심연</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/tests" className="text-gray-600 hover:text-brand-purple transition-colors">
            전체 테스트
          </Link>
          <Link href="/popular" className="text-gray-600 hover:text-brand-purple transition-colors">
            인기
          </Link>
          <Link href="/new" className="text-gray-600 hover:text-brand-purple transition-colors">
            신규
          </Link>
          <Link href="/ranking" className="text-gray-600 hover:text-brand-purple transition-colors">
            랭킹
          </Link>
          <Link
            href="/random"
            className="px-3 py-1.5 bg-brand-purple text-white rounded-full text-sm hover:bg-purple-700 transition-colors"
          >
            랜덤 테스트
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
          className="hidden md:flex items-center gap-1 text-sm text-gray-500 hover:text-brand-purple ml-4"
        >
          🔍
        </Link>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-2">
          {[
            { href: "/tests", label: "전체 테스트" },
            { href: "/popular", label: "인기 테스트" },
            { href: "/new", label: "신규 테스트" },
            { href: "/ranking", label: "랭킹" },
            { href: "/random", label: "🎲 랜덤 테스트" },
            { href: "/about", label: "소개" },
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
