"use client";

interface Props {
  message?: string;
  icon?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export default function RankingEmptyState({
  message = "아직 기록이 없어요",
  icon = "📭",
  ctaLabel,
  ctaHref,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3 text-center">
      <div className="text-4xl">{icon}</div>
      <div className="text-sm text-gray-500">{message}</div>
      {ctaLabel && ctaHref && (
        <a
          href={ctaHref}
          className="mt-1 px-4 py-1.5 rounded-full bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
        >
          {ctaLabel}
        </a>
      )}
    </div>
  );
}
