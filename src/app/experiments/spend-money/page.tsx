"use client";
import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";
import Link from "next/link";

type Item = {
  id: string;
  name: string;
  emoji: string;
  price: number;
  priceLabel: string;
  category: string;
};

const ITEMS: Item[] = [
  { id: "i01", name: "편의점 도시락", emoji: "🍱", price: 5000, priceLabel: "5,000원", category: "식품" },
  { id: "i02", name: "치킨 한 마리", emoji: "🍗", price: 22000, priceLabel: "22,000원", category: "식품" },
  { id: "i03", name: "스타벅스 아메리카노", emoji: "☕", price: 5000, priceLabel: "5,000원", category: "음료" },
  { id: "i04", name: "아이폰 최신형", emoji: "📱", price: 1500000, priceLabel: "150만원", category: "전자제품" },
  { id: "i05", name: "중고 경차", emoji: "🚗", price: 10000000, priceLabel: "1,000만원", category: "자동차" },
  { id: "i06", name: "명품 가방", emoji: "👜", price: 5000000, priceLabel: "500만원", category: "명품" },
  { id: "i07", name: "서울 아파트", emoji: "🏠", price: 1000000000, priceLabel: "10억", category: "부동산" },
  { id: "i08", name: "요트", emoji: "⛵", price: 500000000, priceLabel: "5억", category: "럭셔리" },
  { id: "i09", name: "전용기", emoji: "✈️", price: 10000000000, priceLabel: "100억", category: "럭셔리" },
  { id: "i10", name: "프로야구단", emoji: "⚾", price: 100000000000, priceLabel: "1,000억", category: "특급" },
  { id: "i11", name: "섬 하나", emoji: "🏝️", price: 50000000000, priceLabel: "500억", category: "특급" },
  { id: "i12", name: "우주여행 티켓", emoji: "🚀", price: 500000000000, priceLabel: "5,000억", category: "특급" },
  { id: "i13", name: "노트북", emoji: "💻", price: 1500000, priceLabel: "150만원", category: "전자제품" },
  { id: "i14", name: "명품 시계", emoji: "⌚", price: 10000000, priceLabel: "1,000만원", category: "명품" },
  { id: "i15", name: "건물 하나", emoji: "🏢", price: 10000000000, priceLabel: "100억", category: "부동산" },
];

const BUDGETS = [
  { label: "1억", value: 100000000 },
  { label: "10억", value: 1000000000 },
  { label: "100억", value: 10000000000 },
  { label: "1조", value: 1000000000000 },
];

function formatKorean(num: number): string {
  if (num >= 1000000000000) return `${(num / 1000000000000).toFixed(1)}조`;
  if (num >= 100000000) return `${(num / 100000000).toFixed(0)}억`;
  if (num >= 10000) return `${(num / 10000).toFixed(0)}만`;
  return `${num.toLocaleString()}`;
}

export default function SpendMoneyPage() {
  const [budget, setBudget] = useState<number | null>(null);
  const [spent, setSpent] = useState(0);
  const [cart, setCart] = useState<Map<string, number>>(new Map());

  const remaining = (budget ?? 0) - spent;

  function addItem(item: Item) {
    if (remaining < item.price) return;
    const newCart = new Map(cart);
    newCart.set(item.id, (newCart.get(item.id) ?? 0) + 1);
    setCart(newCart);
    setSpent((s) => s + item.price);
  }

  function removeItem(item: Item) {
    const qty = cart.get(item.id) ?? 0;
    if (qty <= 0) return;
    const newCart = new Map(cart);
    if (qty === 1) newCart.delete(item.id);
    else newCart.set(item.id, qty - 1);
    setCart(newCart);
    setSpent((s) => s - item.price);
  }

  function reset() {
    setBudget(null);
    setSpent(0);
    setCart(new Map());
  }

  if (!budget) {
    return (
      <LayoutContainer>
        <div className="py-8 max-w-md mx-auto text-center">
          <div className="text-5xl mb-4">💸</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">돈쓰기 시뮬레이터</h1>
          <p className="text-gray-500 text-sm mb-2">가상의 큰돈을 받았다. 다 써봐!</p>
          <p className="text-[11px] text-gray-400 mb-8">※ 본 시뮬레이터는 재미 목적의 가상 가격입니다.</p>
          <div className="grid grid-cols-2 gap-3">
            {BUDGETS.map((b) => (
              <button
                key={b.label}
                onClick={() => setBudget(b.value)}
                className="py-5 rounded-2xl font-black text-xl text-white shadow-lg hover:scale-105 transition-all active:scale-95"
                style={{ background: "linear-gradient(135deg, #059669, #34D399)" }}
              >
                💰 {b.label}
              </button>
            ))}
          </div>
        </div>
      </LayoutContainer>
    );
  }

  const spentPct = budget > 0 ? (spent / budget) * 100 : 0;
  const cartItems = [...cart.entries()].map(([id, qty]) => ({
    item: ITEMS.find((i) => i.id === id)!,
    qty,
  }));

  return (
    <LayoutContainer>
      <div className="py-4 max-w-2xl mx-auto">
        {/* 예산 현황 */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 pb-3 border-b border-gray-100 mb-4">
          <div className="flex items-center justify-between mb-2">
            <button onClick={reset} className="text-sm text-gray-400 hover:text-gray-600">← 다시 선택</button>
            <span className="text-xs text-gray-400">재미용 가상 가격</span>
          </div>
          <div className="flex justify-between text-sm mb-1">
            <span className="font-bold text-gray-700">남은 돈: <span className="text-green-600 text-base">{formatKorean(remaining)}</span></span>
            <span className="text-gray-400">예산: {formatKorean(budget)}</span>
          </div>
          <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-3 rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(spentPct, 100)}%`,
                background: spentPct > 80 ? "#DC2626" : spentPct > 50 ? "#D97706" : "#059669",
              }}
            />
          </div>
          <div className="text-xs text-gray-400 mt-1 text-right">사용: {formatKorean(spent)}</div>
        </div>

        {/* 장바구니 */}
        {cartItems.length > 0 && (
          <div className="mb-4 bg-green-50 rounded-2xl p-4">
            <h3 className="font-bold text-sm text-green-800 mb-2">🛍️ 구매 목록</h3>
            <div className="flex flex-wrap gap-2">
              {cartItems.map(({ item, qty }) => (
                <span key={item.id} className="text-sm bg-white rounded-full px-3 py-1 border border-green-200">
                  {item.emoji} {item.name} x{qty}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 상품 목록 */}
        <div className="grid grid-cols-1 gap-3">
          {["식품", "음료", "전자제품", "자동차", "명품", "부동산", "럭셔리", "특급"].map((cat) => {
            const catItems = ITEMS.filter((i) => i.category === cat);
            if (catItems.length === 0) return null;
            return (
              <div key={cat}>
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2 px-1">{cat}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {catItems.map((item) => {
                    const canAfford = remaining >= item.price;
                    const qty = cart.get(item.id) ?? 0;
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                          canAfford ? "bg-white border-gray-200" : "bg-gray-50 border-gray-100 opacity-60"
                        }`}
                      >
                        <span className="text-2xl">{item.emoji}</span>
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-gray-900">{item.name}</div>
                          <div className="text-xs text-gray-400">{item.priceLabel}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {qty > 0 && (
                            <button
                              onClick={() => removeItem(item)}
                              className="w-7 h-7 rounded-full bg-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-300 transition-colors"
                            >
                              −
                            </button>
                          )}
                          {qty > 0 && <span className="text-sm font-bold w-4 text-center">{qty}</span>}
                          <button
                            onClick={() => addItem(item)}
                            disabled={!canAfford}
                            className={`w-7 h-7 rounded-full font-bold text-sm transition-colors ${
                              canAfford
                                ? "bg-green-500 text-white hover:bg-green-600"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 결과 카드 */}
        {spent > 0 && (
          <div className="mt-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-5 border border-green-100">
            <h3 className="font-bold text-green-800 mb-3">💰 지출 결과</h3>
            <div className="grid grid-cols-2 gap-3 text-center mb-3">
              <div className="bg-white rounded-xl p-3">
                <div className="text-xl font-black text-red-500">{formatKorean(spent)}</div>
                <div className="text-xs text-gray-400">사용한 돈</div>
              </div>
              <div className="bg-white rounded-xl p-3">
                <div className="text-xl font-black text-green-600">{formatKorean(remaining)}</div>
                <div className="text-xs text-gray-400">남은 돈</div>
              </div>
            </div>
            <p className="text-sm text-green-700 text-center">
              {remaining === 0 ? "🎉 예산을 완벽하게 다 썼어요!" :
               spentPct >= 80 ? "💸 거의 다 썼네요. 대단한 소비력!" :
               spentPct >= 50 ? "🤔 절반 이상 썼어요. 더 써볼까요?" :
               "💰 아직 많이 남았어요. 더 써봐요!"}
            </p>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
