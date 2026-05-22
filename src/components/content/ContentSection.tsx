import type { ReactNode } from "react";
import Link from "next/link";

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
  children: ReactNode;
  className?: string;
  noPadding?: boolean;
}

export default function ContentSection({
  title,
  subtitle,
  href,
  linkLabel = "더 보기 →",
  children,
  className = "",
  noPadding = false,
}: ContentSectionProps) {
  return (
    <section className={`mb-8 ${className}`}>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="section-title">{title}</h2>
          {subtitle && <p className="text-xs text-brand-muted mt-0.5">{subtitle}</p>}
        </div>
        {href && (
          <Link href={href} className="text-xs font-semibold text-brand-purple hover:underline flex-shrink-0 ml-4">
            {linkLabel}
          </Link>
        )}
      </div>
      <div className={noPadding ? "" : ""}>{children}</div>
    </section>
  );
}
