import { GUEST_RANK, MEMBER_RANKS, ALL_RANKS } from "@/data/ranks";
import type { Rank, UserProfile, UserRole } from "@/lib/user/types";

export function getRankById(rankId: string): Rank {
  return ALL_RANKS.find((r) => r.id === rankId) ?? GUEST_RANK;
}

export function getRankByName(rankName: string): Rank | undefined {
  return ALL_RANKS.find((r) => r.name === rankName);
}

export function getRankByPoints(points: number, role: UserRole): Rank {
  if (role === "guest") return GUEST_RANK;
  // Find highest rank user qualifies for
  let result = MEMBER_RANKS[0];
  for (const rank of MEMBER_RANKS) {
    if (points >= rank.minPoints) {
      result = rank;
    } else {
      break;
    }
  }
  return result;
}

export function getNextRank(points: number, role: UserRole): Rank | null {
  if (role === "guest") return MEMBER_RANKS[0];
  for (const rank of MEMBER_RANKS) {
    if (points < rank.minPoints) return rank;
  }
  return null; // 장군 — 최고 계급
}

export function getRankProgress(points: number, role: UserRole): {
  currentRank: Rank;
  nextRank: Rank | null;
  progressPercent: number;
  pointsToNext: number;
} {
  const currentRank = getRankByPoints(points, role);
  const nextRank = getNextRank(points, role);

  if (!nextRank) {
    return { currentRank, nextRank: null, progressPercent: 100, pointsToNext: 0 };
  }

  const base = currentRank.minPoints;
  const ceiling = nextRank.minPoints;
  const progressPercent = Math.min(100, Math.round(((points - base) / (ceiling - base)) * 100));
  const pointsToNext = ceiling - points;

  return { currentRank, nextRank, progressPercent, pointsToNext };
}

export function formatDisplayName(user: UserProfile): string {
  return `(${user.rankIcon} ${user.nickname})`;
}

export function syncUserRank(user: UserProfile): UserProfile {
  const rank = getRankByPoints(user.points, user.role);
  return {
    ...user,
    rankId: rank.id,
    rankName: rank.name,
    rankIcon: rank.icon,
  };
}
