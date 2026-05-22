interface AdminStatusBadgeProps {
  level: "info" | "warning" | "danger" | "success" | "active" | "dormant" | "neutral";
  label: string;
}

const STYLES: Record<AdminStatusBadgeProps["level"], string> = {
  info:    "bg-blue-100 text-blue-700 border border-blue-200",
  warning: "bg-amber-100 text-amber-700 border border-amber-200",
  danger:  "bg-red-100 text-red-600 border border-red-200",
  success: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  active:  "bg-emerald-100 text-emerald-700 border border-emerald-200",
  dormant: "bg-gray-100 text-gray-500 border border-gray-200",
  neutral: "bg-gray-100 text-gray-600 border border-gray-200",
};

export default function AdminStatusBadge({ level, label }: AdminStatusBadgeProps) {
  return (
    <span className={`inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-full ${STYLES[level]}`}>
      {label}
    </span>
  );
}
