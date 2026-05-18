"use client";
import type { UserProfile } from "@/lib/user/types";

type Props = {
  user: UserProfile;
  size?: "sm" | "md" | "lg";
  showPoints?: boolean;
};

export default function UserBadge({ user, size = "md", showPoints = false }: Props) {
  const sizeClass = size === "sm" ? "text-xs" : size === "lg" ? "text-base font-bold" : "text-sm font-semibold";
  return (
    <span className={`inline-flex items-center gap-1 ${sizeClass}`}>
      <span>{user.rankIcon}</span>
      <span className="text-gray-800">{user.nickname}</span>
      {showPoints && (
        <span className="text-brand-purple font-bold">{user.points.toLocaleString()}P</span>
      )}
    </span>
  );
}
