"use client";
import { useState } from "react";
import { logoutAdmin } from "@/lib/admin/adminAuth";
import { useRouter } from "next/navigation";

const DATE_RANGES = [
  { value: "today", label: "오늘" },
  { value: "yesterday", label: "어제" },
  { value: "7d", label: "7일" },
  { value: "30d", label: "30일" },
  { value: "90d", label: "90일" },
];

interface AdminTopbarProps {
  title: string;
  dateRange?: string;
  onDateRangeChange?: (v: string) => void;
  showDemo?: boolean;
}

export default function AdminTopbar({ title, dateRange = "7d", onDateRangeChange, showDemo = true }: AdminTopbarProps) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  function handleLogout() {
    logoutAdmin();
    router.push("/admin/login");
  }

  const now = new Date();
  const lastUpdate = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-gray-900 text-lg">{title}</h1>
        {showDemo && (
          <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-200">
            DEMO DATA
          </span>
        )}
        <span className="text-xs text-gray-400">업데이트 {lastUpdate}</span>
      </div>

      <div className="flex items-center gap-3">
        {onDateRangeChange && (
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {DATE_RANGES.map(r => (
              <button
                key={r.value}
                onClick={() => onDateRangeChange(r.value)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  dateRange === r.value ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-bold hover:bg-indigo-700"
          >
            관
          </button>
          {showMenu && (
            <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-lg py-1 w-32 z-50">
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">로그아웃</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
