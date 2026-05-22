"use client";
import type { Rank } from "@/lib/user/types";
import RankInsigniaSvg from "./RankInsigniaSvg";

type Props = {
  rank: Rank;
  sizeClass?: string;
  animated?: boolean;
};

const SIZE_MAP: Record<string, number> = {
  "text-sm": 16,
  "text-base": 18,
  "text-lg": 20,
  "text-xl": 22,
  "text-2xl": 28,
  "text-3xl": 36,
  "text-4xl": 44,
  "text-5xl": 52,
  "text-6xl": 64,
};

export default function AnimatedRankIcon({ rank, sizeClass = "text-2xl", animated = true }: Props) {
  const animType = animated ? rank.animationType : "none";
  const iconSize = SIZE_MAP[sizeClass] ?? 28;
  const icon = <RankInsigniaSvg tier={rank.tier} count={rank.iconCount} size={iconSize} />;

  if (animType === "none") {
    return <span className="select-none inline-flex items-center">{icon}</span>;
  }

  if (animType === "soft-pulse") {
    return (
      <span className="select-none rank-soft-pulse inline-flex items-center">
        {icon}
      </span>
    );
  }

  if (animType === "shine") {
    return (
      <span className="relative inline-flex items-center select-none overflow-hidden" style={{ verticalAlign: "middle" }}>
        <span className="rank-shine-icon inline-flex">{icon}</span>
        {/* Sweep overlay */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.65) 50%, transparent 80%)",
            animation: "rank-shine-sweep 4s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        {/* Twinkle star */}
        <span
          className="absolute -top-0.5 -right-0.5 text-yellow-300 rank-sparkle pointer-events-none"
          style={{ fontSize: "0.35em", lineHeight: 1 }}
          aria-hidden="true"
        >
          ✦
        </span>
      </span>
    );
  }

  if (animType === "float") {
    return (
      <span
        className="select-none inline-flex items-center rank-float"
        style={{ filter: `drop-shadow(0 4px 8px ${rank.glowColor})` }}
      >
        {icon}
      </span>
    );
  }

  if (animType === "aura") {
    return (
      <span className="relative inline-flex items-center justify-center select-none" style={{ verticalAlign: "middle" }}>
        {/* Aura glow background */}
        <span
          className="absolute rounded-full rank-aura-pulse pointer-events-none"
          style={{
            inset: "-45%",
            background: `radial-gradient(circle, ${rank.glowColor} 0%, transparent 70%)`,
          }}
          aria-hidden="true"
        />
        {/* Sparkle dot 1 */}
        <span
          className="absolute rank-sparkle pointer-events-none"
          style={{ width: "5px", height: "5px", background: "#fbbf24", borderRadius: "50%", top: "-2px", right: "-2px" }}
          aria-hidden="true"
        />
        {/* Sparkle dot 2 */}
        <span
          className="absolute rank-sparkle-delay pointer-events-none"
          style={{ width: "4px", height: "4px", background: "#a78bfa", borderRadius: "50%", bottom: "-1px", left: "-2px" }}
          aria-hidden="true"
        />
        <span className="relative inline-flex">{icon}</span>
      </span>
    );
  }

  if (animType === "legend-flame") {
    return (
      <span className="relative inline-flex items-center justify-center select-none" style={{ verticalAlign: "middle" }}>
        {/* Outer aura */}
        <span
          className="absolute rounded-full rank-aura-pulse pointer-events-none"
          style={{
            inset: "-60%",
            background: "radial-gradient(circle, rgba(168,85,247,0.28) 0%, rgba(250,204,21,0.18) 50%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        {/* Orbiting particle 1 (gold) */}
        <span
          className="absolute rank-legend-orbit pointer-events-none"
          style={{
            width: "5px",
            height: "5px",
            background: "#fbbf24",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            marginTop: "-2.5px",
            marginLeft: "-2.5px",
          }}
          aria-hidden="true"
        />
        {/* Orbiting particle 2 (purple, delayed) */}
        <span
          className="absolute rank-legend-orbit pointer-events-none"
          style={{
            width: "4px",
            height: "4px",
            background: "#c084fc",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            marginTop: "-2px",
            marginLeft: "-2px",
            animationDelay: "2.5s",
          }}
          aria-hidden="true"
        />
        <span className="relative inline-flex rank-legend-glow">{icon}</span>
      </span>
    );
  }

  return <span className="select-none inline-flex items-center">{icon}</span>;
}

