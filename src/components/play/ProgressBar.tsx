import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ current, total, className }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex justify-between text-xs text-gray-400">
        <span>{current} / {total} 문항</span>
        <span>{percent}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-brand-purple to-brand-pink rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
