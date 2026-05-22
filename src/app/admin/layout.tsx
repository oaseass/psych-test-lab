"use client";
import { usePathname } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import type { ReactNode } from "react";

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  if (pathname === "/admin/login") return <>{children}</>;
  return <AdminLayout>{children}</AdminLayout>;
}
