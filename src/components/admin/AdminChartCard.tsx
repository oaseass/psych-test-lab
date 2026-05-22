import type { ReactNode } from "react";

interface AdminChartCardProps {
  title: string;
  subtitle?: string;
  height?: number;
  children: ReactNode;
  demoBadge?: boolean;
  headerRight?: ReactNode;
}

export default function AdminChartCard({ title, subtitle, height = 240, children, demoBadge = true, headerRight }: AdminChartCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 text-sm">{title}</h3>
            {demoBadge && (
              <span className="text-[9px] bg-amber-100 text-amber-600 font-bold px-1.5 py-0.5 rounded-full border border-amber-200">DEMO</span>
            )}
          </div>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {headerRight && <div>{headerRight}</div>}
      </div>
      <div style={{ height: `${height}px` }} className="px-4 py-3">
        {children}
      </div>
    </div>
  );
}
