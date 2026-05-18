"use client";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  redirectPath?: string;
  reason?: "together" | "checkin" | "ranking" | "general";
};

const REASONS: Record<NonNullable<Props["reason"]>, { title: string; desc: string }> = {
  together: {
    title: "같이놀기는 회원만 이용할 수 있어요.",
    desc: "가입하면 축하포인트 500P를 받고 이등병부터 시작합니다.",
  },
  checkin: {
    title: "출석체크는 회원만 이용할 수 있어요.",
    desc: "매일 출석하면 100P씩 쌓이고 연속 출석 보너스도 있어요.",
  },
  ranking: {
    title: "랭킹은 회원만 등록됩니다.",
    desc: "가입하면 포인트와 계급이 저장되고 랭킹에 등록됩니다.",
  },
  general: {
    title: "회원 전용 기능입니다.",
    desc: "가입하면 포인트, 계급, 출석체크, 같이놀기를 이용할 수 있어요.",
  },
};

export default function AuthModal({ isOpen, onClose, redirectPath = "/", reason = "general" }: Props) {
  if (!isOpen) return null;

  const info = REASONS[reason];
  const signupHref = redirectPath
    ? `/auth/signup?redirect=${encodeURIComponent(redirectPath)}`
    : "/auth/signup";
  const loginHref = redirectPath
    ? `/auth/login?redirect=${encodeURIComponent(redirectPath)}`
    : "/auth/login";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
        <div className="text-center mb-5">
          <div className="text-4xl mb-3">🎖️</div>
          <h2 className="font-extrabold text-gray-900 text-base mb-1">{info.title}</h2>
          <p className="text-sm text-gray-500">{info.desc}</p>
        </div>

        <div className="space-y-2 mb-3">
          <Link
            href={signupHref}
            onClick={onClose}
            className="block w-full py-3 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-2xl text-sm font-bold text-center hover:opacity-90 transition-opacity"
          >
            간단 회원가입 (축하 500P)
          </Link>
          <Link
            href={loginHref}
            onClick={onClose}
            className="block w-full py-3 border-2 border-gray-100 text-gray-700 rounded-2xl text-sm font-semibold text-center hover:border-gray-300 transition-colors"
          >
            이미 계정이 있어요 (로그인)
          </Link>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 text-xs text-gray-400 hover:text-gray-600 transition-colors"
        >
          게스트로 계속 (같이놀기 이용 불가)
        </button>
      </div>
    </div>
  );
}
