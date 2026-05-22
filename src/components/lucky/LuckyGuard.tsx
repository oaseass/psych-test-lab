"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/user/authService";
import type { UserProfile } from "@/lib/user/types";

// ─────────────────────────────────────────────
// LuckyGuard — 게스트 차단 가드
// ─────────────────────────────────────────────

type Props = {
  children: React.ReactNode;
};

export default function LuckyGuard({ children }: Props) {
  const [user, setUser] = useState<UserProfile | null | undefined>(undefined);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  // 로딩 중
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 animate-pulse">확인 중...</div>
      </div>
    );
  }

  // 비회원
  if (!user || user.role !== "member") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-violet-50 to-purple-100">
        <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-xl text-center">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">럭키존</h1>
          <p className="text-gray-700 font-semibold mb-1">럭키존은 회원 전용입니다.</p>
          <p className="text-sm text-gray-500 mb-1">
            가입하면 <span className="font-bold text-violet-600">500P</span>를 받고 이등병부터 시작합니다.
          </p>
          <p className="text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 mt-3 mb-6">
            럭키존은 현금 가치 없는 내부 포인트 게임입니다.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/auth/signup"
              className="w-full py-3 rounded-2xl font-black text-white text-center bg-violet-600 hover:bg-violet-700 transition-colors"
            >
              간단 회원가입 (무료)
            </Link>
            <Link
              href="/auth/login"
              className="w-full py-3 rounded-2xl font-bold text-violet-700 text-center bg-violet-50 border border-violet-200 hover:bg-violet-100 transition-colors"
            >
              로그인
            </Link>
            <Link
              href="/tests"
              className="w-full py-2 text-sm text-gray-500 text-center hover:text-gray-700"
            >
              혼자 테스트 하러가기 →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
