// 관리자 인증 서비스 (localStorage 기반 - 개발/데모용)
// 실제 운영 시에는 NextAuth + Supabase Auth로 교체 필요

const ADMIN_SESSION_KEY = "sslab_admin_session";
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD ?? "admin1234";

export function loginAdmin(password: string): { success: boolean; error?: string } {
  if (typeof window === "undefined") return { success: false, error: "Not available" };
  if (password !== ADMIN_PASSWORD) {
    return { success: false, error: "비밀번호가 올바르지 않습니다." };
  }
  const session = {
    loggedIn: true,
    loginAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
  localStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(session));
  return { success: true };
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_SESSION_KEY);
}

export function isAdminLoggedIn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    if (!session.loggedIn) return false;
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(ADMIN_SESSION_KEY);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function requireAdmin(): boolean {
  return isAdminLoggedIn();
}

export function getAdminLoginTime(): string | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(ADMIN_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw).loginAt ?? null;
  } catch {
    return null;
  }
}
