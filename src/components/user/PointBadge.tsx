"use client";

type Props = {
  points: number;
  size?: "sm" | "md";
  className?: string;
};

export default function PointBadge({ points, size = "md", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-0.5 font-bold text-brand-purple ${size === "sm" ? "text-xs" : "text-sm"} ${className}`}
    >
      <span className="text-yellow-500">⭐</span>
      {points.toLocaleString()}P
    </span>
  );
}
