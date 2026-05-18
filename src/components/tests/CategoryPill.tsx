import Link from "next/link";
import type { TestCategory } from "@/types";
import { cn } from "@/lib/utils/cn";

interface CategoryPillProps {
  category: TestCategory;
  active?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function CategoryPill({ category, active, size = "md" }: CategoryPillProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-medium transition-all",
        size === "sm" && "text-xs px-2.5 py-1",
        size === "md" && "text-sm px-3 py-1.5",
        size === "lg" && "text-base px-4 py-2",
        active
          ? "bg-brand-purple text-white shadow-sm"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      )}
    >
      <span>{category.icon}</span>
      <span>{category.name}</span>
    </Link>
  );
}
