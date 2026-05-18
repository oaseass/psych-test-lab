import { cn } from "@/lib/utils/cn";
import type { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses = {
  primary: "bg-brand-purple text-white hover:bg-purple-700 shadow-sm",
  secondary: "bg-brand-pink text-white hover:bg-pink-600 shadow-sm",
  ghost: "bg-transparent text-brand-purple hover:bg-purple-50",
  outline: "bg-white border-2 border-brand-purple text-brand-purple hover:bg-purple-50",
};

const sizeClasses = {
  sm: "px-3 py-1.5 text-sm rounded-xl",
  md: "px-5 py-2.5 text-sm rounded-2xl",
  lg: "px-6 py-3.5 text-base rounded-2xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  fullWidth,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
