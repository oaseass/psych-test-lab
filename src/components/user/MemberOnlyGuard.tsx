"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/user/authService";
import AuthModal from "@/components/user/AuthModal";

type Props = {
  children: React.ReactNode;
  redirectPath?: string;
  reason?: "together" | "checkin" | "ranking" | "general";
  /** true: 비회원이면 redirect(모달 없이), false(기본): 모달 표시 */
  hardRedirect?: boolean;
};

export default function MemberOnlyGuard({ children, redirectPath, reason = "general", hardRedirect = false }: Props) {
  const [checked, setChecked] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const user = getCurrentUser();
    const member = user?.role === "member";
    setIsMember(member);
    setChecked(true);
    if (!member) {
      if (hardRedirect) {
        const target = redirectPath ?? "/auth/signup";
        router.replace(`${target}?redirect=${encodeURIComponent(window.location.pathname)}`);
      } else {
        setShowModal(true);
      }
    }
  }, [hardRedirect, redirectPath, router]);

  if (!checked) return null;
  if (!isMember) {
    return (
      <>
        <AuthModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          redirectPath={redirectPath ?? (typeof window !== "undefined" ? window.location.pathname : "/")}
          reason={reason}
        />
        {/* 모달 뒤 빈 상태 */}
        <div className="min-h-screen" />
      </>
    );
  }

  return <>{children}</>;
}
