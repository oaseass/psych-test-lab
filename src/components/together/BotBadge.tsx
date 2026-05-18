// BotBadge - AI 봇 표시 뱃지
export default function BotBadge({ size = "sm" }: { size?: "sm" | "xs" }) {
  if (size === "xs") {
    return (
      <span className="inline-flex items-center px-1 py-0.5 rounded text-[9px] font-bold bg-purple-100 text-purple-700 leading-none">
        AI
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700">
      🤖 AI 친구
    </span>
  );
}
