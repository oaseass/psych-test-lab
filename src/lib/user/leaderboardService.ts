import type { UserProfile } from "@/lib/user/types";
import { getCurrentUser } from "@/lib/user/authService";

const KEY_USERS_DB = "sslab_users_db";

export type LeaderboardEntry = {
  rank: number;
  userId: string;
  nickname: string;
  rankName: string;
  rankIcon: string;
  points: number;
  playedCount: number;
  togetherPlayedCount: number;
};

function getAllUsers(): UserProfile[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY_USERS_DB);
    if (!raw) return [];
    return Object.values(JSON.parse(raw)) as UserProfile[];
  } catch {
    return [];
  }
}

export function getLeaderboard(limit = 50): LeaderboardEntry[] {
  const users = getAllUsers().filter((u) => u.role === "member");
  return users
    .sort((a, b) => b.points - a.points)
    .slice(0, limit)
    .map((u, i) => ({
      rank: i + 1,
      userId: u.id,
      nickname: u.nickname,
      rankName: u.rankName,
      rankIcon: u.rankIcon,
      points: u.points,
      playedCount: u.playedCount,
      togetherPlayedCount: u.togetherPlayedCount,
    }));
}

export function getMyRank(userId: string): number {
  const users = getAllUsers()
    .filter((u) => u.role === "member")
    .sort((a, b) => b.points - a.points);
  const idx = users.findIndex((u) => u.id === userId);
  return idx === -1 ? -1 : idx + 1;
}
