"use client";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { signup, saveCurrentUser } from "@/lib/user/authService";
import { isSupabaseConfigured, supabaseSignup } from "@/lib/supabase/authSupabase";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") ?? "/my";

  const [email, setEmail] = useState("");
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

    try {
    if (isSupabaseConfigured) {
      // ── Supabase 기반 회원가입 ──
      const result = await supabaseSignup({ email, password, nickname });
      setLoading(false);
      if (!result.success) {
        setError(result.error);
        return;
      }
      saveCurrentUser(result.user);
      router.replace(redirect);
    } else {
      // ── localStorage fallback (Supabase 미설정 시) ──
      await new Promise((r) => setTimeout(r, 200));
      const result = signup(nickname, password);
      setLoading(false);
      if (!result.success) {
        setError(result.error);
        return;
      }
      router.replace(redirect);
    }
    } catch (err) {
      setLoading(false);
      setError(err instanceof Error ? err.message : "네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    }
  }

  const minPwLength = isSupabaseConfigured ? 6 : 4;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#FAF7F2]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">🎖️</div>
          <h1 className="text-2xl font-extrabold text-gray-900">심심풀이 연구소</h1>
          <p className="text-sm text-gray-500 mt-1">가입하면 500P 지급 · 이등병 시작</p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <h2 className="font-bold text-gray-800 mb-4">회원가입</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {isSupabaseConfigured && (
              <div>
                <label className="text-xs text-gray-500 font-semibold mb-1 block">이메일</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-brand-purple transition-colors"
                />
              </div>
            )}
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
              <label className="text-xs text-gray-500 font-semibold mb-1 block">
                비밀번호 ({minPwLength}자 이상)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호"
                required
                autoComplete="new-password"
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
                autoComplete="new-password"
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
              <Link
                href={`/auth/login?redirect=${encodeURIComponent(redirect)}`}
                className="text-brand-purple font-semibold hover:underline"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>

        {!isSupabaseConfigured && (
          <div className="mt-4 bg-amber-50 border border-amber-100 rounded-2xl p-4 text-xs text-amber-700">
            <p className="font-bold mb-1">⚠️ 안내</p>
            <p>현재 브라우저 저장소 기반으로 운영 중입니다. 다른 기기에서는 계정이 유지되지 않습니다.</p>
          </div>
        )}

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
