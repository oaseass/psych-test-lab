"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signup } from "@/lib/user/authService";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/my";

  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== pwConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setLoading(true);
    // small delay for UX
    await new Promise((r) => setTimeout(r, 300));
    const result = signup(nickname, password);
    setLoading(false);
    if (!result.success) {
      setError(result.error);
      return;
    }
    router.replace(redirect);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAF7F2]">
      <div className="w-full max-w-sm">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎖️</div>
          <h1 className="text-2xl font-extrabold text-gray-900">심심풀이 연구소</h1>
          <p className="text-sm text-gray-500 mt-1">가입하면 500P 지급 · 이등병 시작</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">간단 회원가입</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 font-semibold mb-1 block">닉네임 (2~12자)</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="예: 라파엘, 냥이맘 등"
                maxLength={12}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-purple transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-semibold mb-1 block">비밀번호 (4자 이상)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-purple transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 font-semibold mb-1 block">비밀번호 확인</label>
              <input
                type="password"
                value={pwConfirm}
                onChange={(e) => setPwConfirm(e.target.value)}
                placeholder="비밀번호 다시 입력"
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-purple transition-colors"
              />
            </div>

            {error && (
              <div className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-pink-500 text-white rounded-2xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 mt-1"
            >
              {loading ? "가입 중..." : "가입하고 500P 받기 🎉"}
            </button>
          </form>

          <div className="mt-4 pt-4 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-400">
              이미 계정이 있어요?{" "}
              <Link href={`/auth/login?redirect=${encodeURIComponent(redirect)}`} className="text-brand-purple font-semibold hover:underline">
                로그인
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 bg-violet-50 rounded-2xl p-4 text-xs text-violet-700">
          <p className="font-bold mb-1">🔒 안내</p>
          <p>현재 서비스는 브라우저 로컬 저장소 기반입니다. 다른 기기에서는 로그인되지 않습니다.</p>
        </div>

        <div className="mt-3 text-center">
          <Link href="/" className="text-xs text-gray-400 hover:underline">← 메인으로</Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense>
      <SignupForm />
    </Suspense>
  );
}
