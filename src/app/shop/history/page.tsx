"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { getCurrentUser } from "@/lib/user/authService";
import type { UserProfile } from "@/lib/user/types";

interface HistoryItem {
  itemId: string;
  name: string;
  price: number;
  date: string;
}

export default function ShopHistoryPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const saved = JSON.parse(localStorage.getItem(`shop_history_${user.id}`) ?? "[]");
      setHistory(saved);
    }
  }, []);

  const totalSpent = history.reduce((s, h) => s + h.price, 0);

  return (
    <LayoutContainer>
      <div className="pt-4 pb-8">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/shop" className="text-brand-purple text-sm font-bold">← 상점</Link>
          <h1 className="text-xl font-black text-brand-text">구매 내역</h1>
        </div>

        {!currentUser ? (
          <div className="text-center pt-12">
            <p className="text-brand-muted mb-4">로그인 후 구매 내역을 확인할 수 있어요</p>
            <Link href="/login" className="btn-primary px-6 py-2.5 text-sm">로그인하기</Link>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center pt-12">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="text-brand-muted text-sm mb-4">아직 구매한 아이템이 없어요</p>
            <Link href="/shop" className="btn-primary px-6 py-2.5 text-sm">상점 방문하기</Link>
          </div>
        ) : (
          <>
            <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-5 flex justify-between items-center">
              <span className="text-sm text-brand-muted font-semibold">총 {history.length}건 구매</span>
              <span className="font-black text-violet-700">{totalSpent.toLocaleString()}P 사용</span>
            </div>
            <div className="flex flex-col gap-2">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white border border-brand-border rounded-2xl">
                  <div>
                    <div className="font-bold text-brand-text text-sm">{h.name}</div>
                    <div className="text-xs text-brand-muted">{new Date(h.date).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}</div>
                  </div>
                  <span className="font-black text-amber-600">-{h.price.toLocaleString()}P</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </LayoutContainer>
  );
}
