import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}

export default function SectionTitle({ title, subtitle, action, className }: SectionTitleProps) {
  return (
    <div className={cn("flex items-end justify-between mb-4", className)}>
      <div>
        <h2 className="text-lg font-bold text-brand-text">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
