import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "purple" | "pink" | "green" | "orange" | "gray";
  className?: string;
}

const variantClasses = {
  purple: "bg-purple-50 text-brand-purple",
  pink: "bg-pink-50 text-brand-pink",
  green: "bg-green-50 text-brand-green",
  orange: "bg-orange-50 text-brand-orange",
  gray: "bg-gray-100 text-gray-600",
};

export default function Badge({ children, variant = "purple", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
