"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getCurrentUser, logout, getOrCreateGuest } from "@/lib/user/authService";
import { canCheckInToday } from "@/lib/user/checkInService";
import { getRankById } from "@/lib/user/rankService";
import type { UserProfile } from "@/lib/user/types";
import RankBadge from "@/components/user/RankBadge";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const u = getCurrentUser() ?? getOrCreateGuest();
    setUser(u);
  }, []);

  function handleLogout() {
    logout();
    window.location.href = "/";
  }

  const canCheckIn = user?.role === "member" && canCheckInToday(user);
  const isMember = user?.role === "member";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-brand-purple">
          <span className="text-2xl">🎮</span>
          <span className="hidden sm:block">심심풀이 연구소</span>
          <span className="sm:hidden">심심풀이</span>
        </Link>

        {/* 데스크탑 네비게이션 */}
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          <Link href="/tests" className="text-gray-600 hover:text-brand-purple transition-colors">
            심리테스트
          </Link>
          <Link href="/daily" className="text-gray-600 hover:text-brand-purple transition-colors font-semibold">
            오늘의 놀이
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
          <Link href="/together" className="relative text-violet-600 font-semibold hover:text-violet-700 transition-colors">
            같이놀기
            <span className="absolute -top-1.5 -right-5 text-[9px] bg-violet-600 text-white px-1 py-0.5 rounded-full leading-none">
              회원
            </span>
          </Link>
          <Link href="/polls" className="text-gray-600 hover:text-brand-purple transition-colors">
            투표
          </Link>
          <Link href="/generator" className="text-gray-600 hover:text-brand-purple transition-colors">
            생성기
          </Link>
        </nav>

        {/* 계정 영역 (데스크탑) */}
        <div className="hidden md:flex items-center gap-2 ml-2">
          {user && (
            <div className="relative group">
              <Link href="/my" className="text-xs font-semibold text-gray-700 hover:text-brand-purple transition-colors whitespace-nowrap">
                <RankBadge rank={getRankById(user.rankId)} nickname={user.nickname} size="sm" compact animated />
              </Link>
              {/* Hover tooltip */}
              <div className="absolute right-0 top-full mt-1 w-52 bg-white border border-gray-100 rounded-xl shadow-lg p-3 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-50 pointer-events-none">
                <div className="flex items-center gap-2 mb-2">
                  <RankBadge rank={getRankById(user.rankId)} size="md" showName animated />
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <div className="flex justify-between">
                    <span>보유 포인트</span>
                    <span className="font-bold text-violet-600">{user.points.toLocaleString()}P</span>
                  </div>
                  {isMember && (() => {
                    const next = getRankById(user.rankId);
                    return null;
                  })()}
                </div>
                <div className="mt-1.5 pt-1.5 border-t border-gray-50 text-center">
                  <span className="text-[10px] text-gray-400">내 정보 보기</span>
                </div>
              </div>
            </div>
          )}
          {isMember ? (
            <>
              {canCheckIn && (
                <Link
                  href="/check-in"
                  className="text-xs px-2 py-1 bg-violet-50 text-violet-600 border border-violet-100 rounded-lg font-bold hover:bg-violet-100 transition-colors"
                >
                  출석
                </Link>
              )}
              <Link href="/my" className="text-xs px-2 py-1 bg-gray-50 text-gray-600 border border-gray-100 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                {user!.points.toLocaleString()}P
              </Link>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="text-xs text-gray-500 hover:text-brand-purple font-semibold transition-colors">
                로그인
              </Link>
              <Link href="/auth/signup" className="text-xs px-3 py-1.5 bg-brand-purple text-white rounded-lg font-bold hover:bg-purple-700 transition-colors">
                가입
              </Link>
            </>
          )}
          <Link href="/search" aria-label="검색" className="text-gray-500 hover:text-brand-purple ml-1">
            🔍
          </Link>
        </div>

        {/* 모바일 우측 */}
        <div className="md:hidden flex items-center gap-2">
          {user && (
            <Link href="/my" className="text-xs font-semibold text-gray-600 hover:text-brand-purple">
              <RankBadge rank={getRankById(user.rankId)} size="sm" compact animated />
              {isMember && <span className="ml-1">{user.points.toLocaleString()}P</span>}
            </Link>
          )}
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
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {/* 계정 섹션 */}
          <div className="pb-2 mb-1 border-b border-gray-100">
            {user && (
              <div className="px-3 py-1.5 text-xs text-gray-500 font-semibold">
                {user.rankIcon} {user.nickname} {isMember ? `· ${user.points.toLocaleString()}P` : "· 게스트"}
              </div>
            )}
            <div className="flex gap-2 px-3 py-1">
              {isMember ? (
                <>
                  <Link href="/my" onClick={() => setMenuOpen(false)} className="flex-1 py-1.5 text-center text-xs font-bold bg-violet-50 text-violet-700 rounded-lg border border-violet-100">내 정보</Link>
                  <Link href="/check-in" onClick={() => setMenuOpen(false)} className="flex-1 py-1.5 text-center text-xs font-bold bg-violet-600 text-white rounded-lg">
                    {canCheckIn ? "출석체크 +100P" : "출석 완료"}
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setMenuOpen(false)} className="flex-1 py-1.5 text-center text-xs font-semibold border border-gray-200 text-gray-600 rounded-lg">로그인</Link>
                  <Link href="/auth/signup" onClick={() => setMenuOpen(false)} className="flex-1 py-1.5 text-center text-xs font-bold bg-brand-purple text-white rounded-lg">회원가입 (500P)</Link>
                </>
              )}
            </div>
          </div>

          {[
            { href: "/tests", label: "🧠 심리테스트" },
            { href: "/daily", label: "🎯 오늘의 놀이" },
            { href: "/games", label: "🎮 두뇌게임" },
            { href: "/games/worldcup", label: "🏆 이상형 월드컵" },
            { href: "/games/balance", label: "⚖️ 밸런스 게임" },
            { href: "/games/initial-quiz", label: "🔤 초성 퀴즈" },
            { href: "/games/nonsense", label: "🤣 넌센스 퀴즈" },
            { href: "/games/observation", label: "👁️ 관찰력 테스트" },
            { href: "/games/memory", label: "🧠 기억력 테스트" },
            { href: "/games/reaction", label: "⚡ 반응속도" },
            { href: "/together", label: "👥 같이놀기", badge: "회원전용" },
            { href: "/polls", label: "🗳️ 투표" },
            { href: "/generator", label: "✨ 생성기" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-brand-purple text-sm font-medium"
            >
              <span>{item.label}</span>
              {"badge" in item && item.badge && (
                <span className="text-[9px] bg-violet-600 text-white px-1.5 py-0.5 rounded-full">{item.badge}</span>
              )}
            </Link>
          ))}

          {/* 하단 링크 */}
          <div className="pt-2 border-t border-gray-100 flex gap-2 px-3">
            <Link href="/rank" onClick={() => setMenuOpen(false)} className="flex-1 py-1.5 text-center text-xs font-semibold text-gray-500 hover:text-brand-purple">계급표</Link>
            <Link href="/leaderboard" onClick={() => setMenuOpen(false)} className="flex-1 py-1.5 text-center text-xs font-semibold text-gray-500 hover:text-brand-purple">랭킹</Link>
            {isMember && (
              <button onClick={() => { setMenuOpen(false); handleLogout(); }} className="flex-1 py-1.5 text-center text-xs font-semibold text-gray-400 hover:text-red-500">로그아웃</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
