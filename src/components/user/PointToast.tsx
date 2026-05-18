"use client";
import { useEffect, useState } from "react";

type ToastItem = {
  id: string;
  message: string;
  type: "point" | "rankup";
};

let externalSetToasts: ((fn: (prev: ToastItem[]) => ToastItem[]) => void) | null = null;

export function showPointToast(message: string, type: "point" | "rankup" = "point") {
  if (!externalSetToasts) return;
  const id = Math.random().toString(36).slice(2);
  externalSetToasts((prev) => [...prev, { id, message, type }]);
  setTimeout(() => {
    externalSetToasts?.((prev) => prev.filter((t) => t.id !== id));
  }, 3000);
}

export default function PointToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    externalSetToasts = setToasts;
    return () => { externalSetToasts = null; };
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`px-5 py-3 rounded-2xl shadow-lg text-sm font-bold text-white animate-bounce-in
            ${t.type === "rankup" ? "bg-gradient-to-r from-yellow-500 to-orange-500" : "bg-gradient-to-r from-violet-600 to-pink-500"}`}
        >
          {t.type === "rankup" ? "🎖️ " : "⭐ "}
          {t.message}
        </div>
      ))}
    </div>
  );
}
