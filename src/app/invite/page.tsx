"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { getCurrentUser } from "@/lib/user/authService";
import type { UserProfile } from "@/lib/user/types";

const REWARD_PER_INVITE = 300;

export default function InvitePage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [inviteCount, setInviteCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const code = `SSLAB-${user.id.slice(-6).toUpperCase()}`;
      setInviteCode(code);
      const count = JSON.parse(localStorage.getItem(`invite_count_${user.id}`) ?? "0");
      setInviteCount(count);
    }
  }, []);

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}?ref=${inviteCode}` : "";

  function copyCode() {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function shareKakao() {
    if (typeof window !== "undefined" && (window as any).Kakao?.Share) {
      (window as any).Kakao.Share.sendDefault({
        objectType: "text",
        text: `심심할 때 즐기는 무료 포털 💙\n심심랩에서 같이 놀아요!\n초대코드: ${inviteCode}`,
        link: { mobileWebUrl: shareUrl, webUrl: shareUrl },
      });
    } else {
      copyCode();
    }
  }

  return (
    <LayoutContainer>
      <div className="pt-4 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-brand-text">👥 친구 초대</h1>
          <p className="text-sm text-brand-muted mt-1">친구 1명당 {REWARD_PER_INVITE}P 지급!</p>
        </div>

        {!currentUser ? (
          <div className="text-center pt-12">
            <div className="text-5xl mb-4">🔗</div>
            <p className="text-brand-muted mb-4">로그인하면 초대 코드를 받을 수 있어요</p>
            <Link href="/login" className="btn-primary px-6 py-2.5 text-sm">로그인하기</Link>
          </div>
        ) : (
          <>
            {/* 보상 안내 */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <span className="text-3xl">🎁</span>
                <div>
                  <div className="font-bold text-emerald-800 text-sm mb-1">초대 보상 안내</div>
                  <ul className="text-xs text-emerald-700 space-y-0.5">
                    <li>• 친구가 초대코드로 가입하면 <strong>{REWARD_PER_INVITE}P</strong> 지급</li>
                    <li>• 초대한 친구도 <strong>100P</strong> 받아요</li>
                    <li>• 보상 지급은 가입 완료 기준</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 내 초대 현황 */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-center justify-between">
              <div>
                <div className="text-xs text-brand-muted">초대한 친구</div>
                <div className="text-2xl font-black text-amber-700">{inviteCount}명</div>
              </div>
              <div>
                <div className="text-xs text-brand-muted">적립된 포인트</div>
                <div className="text-2xl font-black text-amber-700">{(inviteCount * REWARD_PER_INVITE).toLocaleString()}P</div>
              </div>
            </div>

            {/* 초대 코드 */}
            <div className="bg-white border border-brand-border rounded-2xl p-4 mb-4">
              <div className="text-xs text-brand-muted font-semibold mb-2">내 초대 코드</div>
              <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-3">
                <span className="flex-1 font-mono font-black text-brand-purple tracking-widest text-sm">{inviteCode}</span>
                <button
                  onClick={copyCode}
                  className="text-xs bg-brand-purple text-white px-3 py-1.5 rounded-lg font-bold active:scale-95 transition-all"
                >
                  {copied ? "✅ 복사됨" : "복사"}
                </button>
              </div>
            </div>

            {/* 공유 버튼 */}
            <div className="flex flex-col gap-2">
              <button
                onClick={copyCode}
                className="w-full btn-primary py-3 text-sm font-bold"
              >
                🔗 링크 복사하기
              </button>
              <button
                onClick={shareKakao}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-2xl text-sm transition-all active:scale-95"
              >
                💬 카카오톡으로 공유
              </button>
            </div>

            <p className="text-center text-[11px] text-brand-muted mt-6">
              부정한 방법으로 초대 보상을 받는 경우 포인트가 회수될 수 있어요
            </p>
          </>
        )}
      </div>
    </LayoutContainer>
  );
}
