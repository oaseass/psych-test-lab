/**
 * authService.ts — localStorage mock auth
 *
 * NOTE: 이 구현은 localStorage 기반 mock auth입니다.
 * 비밀번호는 브라우저에 단순 해시로 저장됩니다.
 * 실제 운영 서비스에서는 Supabase Auth로 교체해야 합니다.
 * 함수 인터페이스는 Supabase 교체를 고려해 설계되었습니다.
 */
import type { UserProfile, UserRole } from "@/lib/user/types";
import { GUEST_RANK, MEMBER_RANKS } from "@/data/ranks";
import { syncUserRank } from "@/lib/user/rankService";

const KEY_CURRENT_USER = "sslab_current_user";
const KEY_USERS_DB = "sslab_users_db";
const KEY_POINT_LOGS = "sslab_point_logs";

// Simple deterministic hash (NOT cryptographic — mock only)
function simpleHash(str: string): string {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function generateId(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// Internal helper — write point log without importing pointService
function writePointLog(userId: string, reason: string, amount: number, label: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(KEY_POINT_LOGS);
    const logs = raw ? JSON.parse(raw) : [];
    logs.push({ id: generateId(), userId, amount, reason, label, createdAt: new Date().toISOString() });
    localStorage.setItem(KEY_POINT_LOGS, JSON.stringify(logs));
  } catch { /* ignore */ }
}

function getUsersDb(): Record<string, UserProfile> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(KEY_USERS_DB);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsersDb(db: Record<string, UserProfile>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_USERS_DB, JSON.stringify(db));
}

export function getCurrentUser(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY_CURRENT_USER);
    if (!raw) return null;
    return JSON.parse(raw) as UserProfile;
  } catch {
    return null;
  }
}

export function saveCurrentUser(user: UserProfile): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY_CURRENT_USER, JSON.stringify(user));
  // 회원 DB에도 동기화
  if (user.role === "member") {
    const db = getUsersDb();
    db[user.id] = user;
    saveUsersDb(db);
  }
}

export function createGuestUser(): UserProfile {
  const num = Math.floor(1000 + Math.random() * 9000);
  const guest: UserProfile = {
    id: `guest_${generateId()}`,
    role: "guest",
    nickname: `손님${num}`,
    points: 0,
    rankId: GUEST_RANK.id,
    rankName: GUEST_RANK.name,
    rankIcon: GUEST_RANK.icon,
    createdAt: new Date().toISOString(),
    checkInStreak: 0,
    totalCheckInDays: 0,
    playedCount: 0,
    togetherPlayedCount: 0,
  };
  saveCurrentUser(guest);
  return guest;
}

export function getOrCreateGuest(): UserProfile {
  const current = getCurrentUser();
  if (current) return current;
  return createGuestUser();
}

export type SignupResult =
  | { success: true; user: UserProfile }
  | { success: false; error: string };

export function signup(nickname: string, password: string): SignupResult {
  if (!nickname.trim() || nickname.length < 2) {
    return { success: false, error: "닉네임은 2자 이상이어야 합니다." };
  }
  if (nickname.length > 12) {
    return { success: false, error: "닉네임은 12자 이하여야 합니다." };
  }
  if (!password || password.length < 4) {
    return { success: false, error: "비밀번호는 4자 이상이어야 합니다." };
  }

  const db = getUsersDb();
  // 닉네임 중복 체크
  const exists = Object.values(db).some(
    (u) => u.nickname.toLowerCase() === nickname.trim().toLowerCase()
  );
  if (exists) {
    return { success: false, error: "이미 사용 중인 닉네임입니다." };
  }

  const startRank = MEMBER_RANKS[0]; // 이등병
  const now = new Date().toISOString();
  const newUser: UserProfile = {
    id: generateId(),
    role: "member" as UserRole,
    nickname: nickname.trim(),
    passwordHash: simpleHash(password),
    points: 500, // 가입 축하 포인트
    rankId: startRank.id,
    rankName: startRank.name,
    rankIcon: startRank.icon,
    createdAt: now,
    lastLoginAt: now,
    checkInStreak: 0,
    totalCheckInDays: 0,
    playedCount: 0,
    togetherPlayedCount: 0,
  };

  // 가입 포인트 log 저장 (pointService 순환의존 방지를 위해 직접 write)
  writePointLog(newUser.id, "signup_bonus", 500, "가입 축하 포인트");

  db[newUser.id] = newUser;
  saveUsersDb(db);
  saveCurrentUser(newUser);

  return { success: true, user: newUser };
}

export type LoginResult =
  | { success: true; user: UserProfile }
  | { success: false; error: string };

export function login(nickname: string, password: string): LoginResult {
  const db = getUsersDb();
  const user = Object.values(db).find(
    (u) => u.nickname.toLowerCase() === nickname.trim().toLowerCase()
  );
  if (!user) {
    return { success: false, error: "닉네임 또는 비밀번호가 올바르지 않습니다." };
  }
  if (user.passwordHash !== simpleHash(password)) {
    return { success: false, error: "닉네임 또는 비밀번호가 올바르지 않습니다." };
  }

  const updated: UserProfile = {
    ...syncUserRank(user),
    lastLoginAt: new Date().toISOString(),
  };
  db[updated.id] = updated;
  saveUsersDb(db);
  saveCurrentUser(updated);

  return { success: true, user: updated };
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY_CURRENT_USER);
}

export function isMember(): boolean {
  const user = getCurrentUser();
  return user?.role === "member";
}
