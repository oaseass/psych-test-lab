import type { UserProfile } from "@/lib/user/types";
import { getCurrentUser } from "@/lib/user/authService";
import { fetchLeaderboard } from "@/lib/supabase/dbService";

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

/** Supabase 우선, 실패 시 localStorage fallback */
export async function getLeaderboardAsync(limit = 50): Promise<LeaderboardEntry[]> {
  const supabaseData = await fetchLeaderboard(limit);
  if (supabaseData && supabaseData.length > 0) {
    return supabaseData.map((u, i) => ({
      rank: i + 1,
      userId: u.id,
      nickname: u.nickname,
      rankName: u.rank_name,
      rankIcon: u.rank_icon,
      points: u.points,
      playedCount: u.played_count,
      togetherPlayedCount: u.together_played_count,
    }));
  }
  return getLeaderboard(limit);
}
