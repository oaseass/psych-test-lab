// QualityBadge: prototype 콘텐츠 등 품질등급 뱃지

type QualityTier = "polished" | "normal" | "prototype" | "hidden";

const TIER_STYLE: Record<QualityTier, { label: string; className: string }> = {
  polished: { label: "★ 완성", className: "bg-emerald-50 text-emerald-600" },
  normal: { label: "보통", className: "bg-gray-50 text-gray-500" },
  prototype: { label: "테스트중", className: "bg-orange-50 text-orange-500" },
  hidden: { label: "비공개", className: "bg-gray-100 text-gray-400" },
};

export default function QualityBadge({ tier }: { tier: QualityTier }) {
  const { label, className } = TIER_STYLE[tier];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${className}`}>
      {label}
    </span>
  );
}
