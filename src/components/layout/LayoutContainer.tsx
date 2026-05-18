import { cn } from "@/lib/utils/cn";
import type { ReactNode } from "react";

interface LayoutContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
}

export default function LayoutContainer({ children, className, narrow }: LayoutContainerProps) {
  return (
    <main
      className={cn(
        "max-w-5xl mx-auto px-4 py-6",
        narrow && "max-w-2xl",
        className
      )}
    >
      {children}
    </main>
  );
}
