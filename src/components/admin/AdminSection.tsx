import type { ReactNode } from "react";

interface AdminSectionProps {
  title: string;
  subtitle?: string;
  headerRight?: ReactNode;
  children: ReactNode;
  className?: string;
}

export default function AdminSection({ title, subtitle, headerRight, children, className = "" }: AdminSectionProps) {
  return (
    <section className={`bg-white border border-gray-200 rounded-2xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2 className="font-bold text-gray-900">{title}</h2>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {headerRight && <div className="flex items-center gap-2">{headerRight}</div>}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}
