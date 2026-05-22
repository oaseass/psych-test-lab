import { cn } from "@/lib/utils/cn";
import { AD_SLOTS, isAdSenseEnabled, type AdSlotConfig } from "@/lib/ads/adConfig";

interface AdSlotProps {
  slotKey: keyof typeof AD_SLOTS;
  className?: string;
}

const SIZE_MAP: Record<AdSlotConfig["size"], string> = {
  banner: "h-[100px] sm:h-[90px]",
  square: "h-[250px]",
  leaderboard: "h-[90px] sm:h-[90px]",
  "half-page": "h-[600px]",
};

export default function AdSlot({ slotKey, className }: AdSlotProps) {
  const config = AD_SLOTS[slotKey];
  if (!config) return null;

  // 프로덕션에서 AdSense가 활성화된 경우 실제 광고 표시
  if (isAdSenseEnabled() && config.slot) {
    // 실제 AdSense 코드는 여기에 넣습니다 (클라이언트 전용)
    return (
      <div className={cn("overflow-hidden", SIZE_MAP[config.size], className)}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
          data-ad-slot={config.slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // 개발 환경에서만 플레이스홀더 표시 (프로덕션에서는 완전 숨김)
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  // 개발 환경 플레이스홀더
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-gray-100 border border-dashed border-gray-300 rounded-lg text-gray-400 text-xs",
        SIZE_MAP[config.size],
        className
      )}
    >
      <div className="text-center">
        <div className="text-lg mb-1">📢</div>
        <div>광고 영역 ({config.label})</div>
      </div>
    </div>
  );
}
