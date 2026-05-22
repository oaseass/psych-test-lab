"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin } from "@/lib/admin/adminAuth";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const ok = loginAdmin(password);
    if (ok) {
      router.replace("/admin");
    } else {
      setError("비밀번호가 올바르지 않습니다.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🔐</div>
          <h1 className="font-black text-gray-900 text-xl">운영 콘솔</h1>
          <p className="text-sm text-gray-500 mt-1">심심풀이 연구소 관리자 전용</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-xl">
              {error}
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">비밀번호</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="관리자 비밀번호"
              autoFocus
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl text-sm transition-colors"
          >
            {loading ? "확인 중..." : "로그인"}
          </button>
        </form>

        <p className="text-center text-[11px] text-gray-400 mt-6">
          관리자 전용 페이지입니다
        </p>
      </div>
    </div>
  );
}
