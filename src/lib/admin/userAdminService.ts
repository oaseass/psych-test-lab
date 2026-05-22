import type { AdminUser } from "./types";
import type { UserProfile } from "@/lib/user/types";

// localStorage에서 실제 가입 회원을 읽어옴
function getRealUsers(): AdminUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("sslab_users_db");
    if (!raw) return [];
    const db: Record<string, UserProfile> = JSON.parse(raw);
    const now = Date.now();
    const weekMs = 7 * 86400000;

    return Object.values(db)
      .filter((u) => u.role === "member")
      .map((u) => {
        const lastActive = u.lastLoginAt ?? u.createdAt;
        const isNew = now - new Date(u.createdAt).getTime() < 86400000;
        const isDormant = now - new Date(lastActive).getTime() > weekMs;
        const status: AdminUser["status"] = isNew ? "new" : isDormant ? "dormant" : "active";
        return {
          id: u.id,
          nickname: u.nickname,
          rankId: u.rankId,
          rankName: u.rankName,
          points: u.points,
          joinedAt: u.createdAt.slice(0, 10),
          lastActiveAt: lastActive,
          checkInDays: u.totalCheckInDays,
          completedCount: u.playedCount,
          togetherCount: u.togetherPlayedCount,
          luckyCount: 0,
          inviteCount: 0,
          status,
        };
      })
      .sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());
  } catch {
    return [];
  }
}

export function getAllUsers(): AdminUser[] {
  return getRealUsers();
}

export function getUserStats() {
  const users = getRealUsers();
  if (users.length === 0) {
    return {
      total: 0,
      newToday: 0,
      active7d: 0,
      dormant: 0,
      avgPoints: 0,
      highRankCount: 0,
      memberCount: 0,
      guestCount: 0,
    };
  }
  const now = Date.now();
  const week = 7 * 86400000;
  return {
    total: users.length,
    newToday: users.filter((u) => now - new Date(u.joinedAt).getTime() < 86400000).length,
    active7d: users.filter((u) => now - new Date(u.lastActiveAt).getTime() < week).length,
    dormant: users.filter((u) => u.status === "dormant").length,
    avgPoints: Math.round(users.reduce((s, u) => s + u.points, 0) / users.length),
    highRankCount: users.filter((u) => ["staff_sgt", "sgt_major", "msgt", "officer"].includes(u.rankId)).length,
    memberCount: users.length,
    guestCount: 0,
  };
}

export function filterUsers(users: AdminUser[], filter: string): AdminUser[] {
  switch (filter) {
    case "new": return users.filter((u) => u.status === "new");
    case "dormant": return users.filter((u) => u.status === "dormant");
    case "high_points": return [...users].sort((a, b) => b.points - a.points).slice(0, 20);
    case "lucky": return [...users].sort((a, b) => b.luckyCount - a.luckyCount);
    case "together": return [...users].sort((a, b) => b.togetherCount - a.togetherCount);
    case "inviter": return [...users].sort((a, b) => b.inviteCount - a.inviteCount);
    default: return users;
  }
}

