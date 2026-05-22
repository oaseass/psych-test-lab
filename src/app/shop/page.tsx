"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { getCurrentUser } from "@/lib/user/authService";
import type { UserProfile } from "@/lib/user/types";

interface ShopItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  category: string;
  badge?: string;
}

const SHOP_ITEMS: ShopItem[] = [
  { id: "nick_gold", name: "닉네임 골드", desc: "닉네임이 황금색으로 빛납니다", price: 500, emoji: "🥇", category: "닉네임", badge: "인기" },
  { id: "nick_violet", name: "닉네임 바이올렛", desc: "닉네임이 보라색으로 표시됩니다", price: 300, emoji: "💜", category: "닉네임" },
  { id: "nick_red", name: "닉네임 레드", desc: "닉네임이 붉은색으로 표시됩니다", price: 300, emoji: "❤️", category: "닉네임" },
  { id: "border_rainbow", name: "프로필 무지개 테두리", desc: "프로필에 무지개 테두리가 생깁니다", price: 800, emoji: "🌈", category: "프로필", badge: "NEW" },
  { id: "border_fire", name: "프로필 불꽃 테두리", desc: "프로필에 불꽃 애니메이션 테두리", price: 600, emoji: "🔥", category: "프로필" },
  { id: "title_lucky", name: "칭호: 럭키스타", desc: "닉네임 옆에 [럭키스타] 칭호 표시", price: 1000, emoji: "⭐", category: "칭호" },
  { id: "title_quiz", name: "칭호: 퀴즈마스터", desc: "닉네임 옆에 [퀴즈마스터] 칭호 표시", price: 1000, emoji: "🧠", category: "칭호" },
  { id: "slot_boost", name: "럭키존 부스터 x2", desc: "24시간 럭키존 보상 2배", price: 400, emoji: "⚡", category: "부스터" },
  { id: "exp_boost", name: "경험치 부스터 x2", desc: "24시간 경험치 획득 2배", price: 300, emoji: "🚀", category: "부스터" },
];

const CATEGORIES = ["전체", "닉네임", "프로필", "칭호", "부스터"];

export default function ShopPage() {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [selectedCat, setSelectedCat] = useState("전체");
  const [purchased, setPurchased] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState("");
  const [userPoints, setUserPoints] = useState(0);

  useEffect(() => {
    const user = getCurrentUser();
    setCurrentUser(user);
    if (user) {
      const saved = localStorage.getItem(`shop_purchased_${user.id}`) ?? "[]";
      setPurchased(new Set(JSON.parse(saved)));
      const userJson = localStorage.getItem("sslab_current_user");
      if (userJson) setUserPoints(JSON.parse(userJson).points ?? 0);
    }
  }, []);

  function buy(item: ShopItem) {
    if (!currentUser) return;
    const userJson = localStorage.getItem("sslab_current_user");
    if (!userJson) return;
    const user = JSON.parse(userJson);
    if ((user.points ?? 0) < item.price) {
      setToast("포인트가 부족합니다!");
      setTimeout(() => setToast(""), 2000);
      return;
    }
    user.points = (user.points ?? 0) - item.price;
    localStorage.setItem("sslab_current_user", JSON.stringify(user));
    setUserPoints(user.points);

    const history = JSON.parse(localStorage.getItem(`shop_history_${currentUser.id}`) ?? "[]");
    history.unshift({ itemId: item.id, name: item.name, price: item.price, date: new Date().toISOString() });
    localStorage.setItem(`shop_history_${currentUser.id}`, JSON.stringify(history));

    const updated = new Set(purchased);
    updated.add(item.id);
    setPurchased(updated);
    localStorage.setItem(`shop_purchased_${currentUser.id}`, JSON.stringify([...updated]));

    setToast(`${item.name} 구매 완료! -${item.price}P`);
    setTimeout(() => setToast(""), 2500);
  }

  const filtered = selectedCat === "전체" ? SHOP_ITEMS : SHOP_ITEMS.filter((i) => i.category === selectedCat);

  return (
    <LayoutContainer>
      <div className="pt-4 pb-8">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-black text-brand-text">🛍️ 포인트 상점</h1>
            <p className="text-sm text-brand-muted mt-1">포인트로 꾸미기 아이템 구매</p>
          </div>
          <Link href="/shop/history" className="text-xs text-brand-purple font-semibold hover:underline">구매 내역 →</Link>
        </div>

        {/* 포인트 현황 */}
        {currentUser && (
          <div className="bg-violet-50 border border-violet-100 rounded-2xl p-4 mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs text-brand-muted">내 포인트</div>
              <div className="text-2xl font-black text-violet-700">{userPoints.toLocaleString()}P</div>
            </div>
            <Link href="/my/points" className="text-xs text-violet-600 font-semibold hover:underline">내역 보기 →</Link>
          </div>
        )}

        {/* 카테고리 필터 */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                selectedCat === cat ? "bg-brand-purple text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 상품 목록 */}
        <div className="grid grid-cols-2 gap-3">
          {filtered.map((item) => {
            const alreadyOwned = purchased.has(item.id);
            const canAfford = currentUser && userPoints >= item.price;
            return (
              <div key={item.id} className={`bg-white rounded-2xl border p-4 transition-all ${alreadyOwned ? "border-emerald-200 opacity-80" : "border-brand-border hover:shadow-card-hover"}`}>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{item.emoji}</span>
                  {item.badge && <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">{item.badge}</span>}
                </div>
                <div className="font-bold text-brand-text text-sm mb-0.5">{item.name}</div>
                <div className="text-[11px] text-brand-muted mb-3 leading-snug">{item.desc}</div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-amber-600 text-sm">{item.price.toLocaleString()}P</span>
                  {alreadyOwned ? (
                    <span className="text-xs text-emerald-600 font-bold">✅ 보유중</span>
                  ) : currentUser ? (
                    <button
                      onClick={() => buy(item)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all active:scale-95 ${
                        canAfford ? "bg-brand-purple text-white hover:opacity-90" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      구매
                    </button>
                  ) : (
                    <Link href="/login" className="text-xs font-bold text-brand-purple">로그인 →</Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[11px] text-brand-muted mt-6">포인트는 현금·상품으로 교환되지 않습니다</p>

        {/* 토스트 */}
        {toast && (
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm px-5 py-3 rounded-2xl shadow-pop z-50 animate-pop-in">
            {toast}
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
