"use client";
import Link from "next/link";

type Props = {
  variant?: "inline" | "card";
  pendingPoints?: number; // 이번 플레이로 받을 수 있는 포인트
  className?: string;
};

export default function SignupPrompt({ variant = "card", pendingPoints, className = "" }: Props) {
  if (variant === "inline") {
    return (
      <div className={`text-center py-3 ${className}`}>
        <p className="text-sm text-gray-500 mb-2">
          {pendingPoints
            ? `회원가입하면 이번 플레이 ${pendingPoints}P + 가입 축하 500P를 받을 수 있어요!`
            : "회원가입하면 포인트와 계급이 쌓입니다."}
        </p>
        <div className="flex gap-2 justify-center">
          <Link
            href="/auth/signup"
            className="px-4 py-2 bg-brand-purple text-white rounded-xl text-sm font-bold hover:bg-purple-700 transition-colors"
          >
            간단 회원가입 (축하 500P)
          </Link>
          <Link
            href="/auth/login"
            className="px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            로그인
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-violet-50 to-pink-50 border border-violet-100 rounded-2xl p-5 ${className}`}>
      <div className="flex items-start gap-3 mb-3">
        <span className="text-2xl">🎖️</span>
        <div>
          <h3 className="font-bold text-gray-800 text-sm">지금 가입하면 이등병부터 시작!</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {pendingPoints
              ? `이번 플레이 ${pendingPoints}P + 가입 축하 500P 지급`
              : "가입 축하 500P 지급, 포인트 누적, 계급 상승"}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Link
          href="/auth/signup"
          className="flex-1 py-2.5 bg-brand-purple text-white rounded-xl text-sm font-bold text-center hover:bg-purple-700 transition-colors"
        >
          간단 회원가입
        </Link>
        <Link
          href="/auth/login"
          className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold text-center hover:bg-gray-50 transition-colors"
        >
          로그인
        </Link>
      </div>
    </div>
  );
}
