import type { AdminAlert } from "@/lib/admin/types";

interface AdminAlertCardProps {
  alert: AdminAlert;
}

const BORDER_COLORS: Record<AdminAlert["level"], string> = {
  info:    "border-blue-400",
  warning: "border-amber-400",
  danger:  "border-red-500",
  success: "border-emerald-400",
};

const BG_COLORS: Record<AdminAlert["level"], string> = {
  info:    "bg-blue-50",
  warning: "bg-amber-50",
  danger:  "bg-red-50",
  success: "bg-emerald-50",
};

const ICON_MAP: Record<AdminAlert["level"], string> = {
  info:    "ℹ️",
  warning: "⚠️",
  danger:  "🚨",
  success: "✅",
};

export default function AdminAlertCard({ alert }: AdminAlertCardProps) {
  return (
    <div className={`${BG_COLORS[alert.level]} border-l-4 ${BORDER_COLORS[alert.level]} rounded-r-xl px-4 py-3 flex gap-3`}>
      <span className="text-base shrink-0">{ICON_MAP[alert.level]}</span>
      <div className="min-w-0">
        <div className="font-bold text-gray-900 text-sm">{alert.title}</div>
        <div className="text-xs text-gray-600 mt-0.5">{alert.message}</div>
        {alert.actionLabel && alert.actionHref && (
          <a href={alert.actionHref} className="text-xs text-indigo-600 font-medium mt-1 hover:underline inline-block">{alert.actionLabel} →</a>
        )}
      </div>
    </div>
  );
}
