"use client";
import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type Ingredient = { id: string; name: string; emoji: string; category: string };

const INGREDIENTS: Ingredient[] = [
  // 음료
  { id: "milk", name: "우유", emoji: "🥛", category: "음료" },
  { id: "coke", name: "콜라", emoji: "🥤", category: "음료" },
  { id: "coffee", name: "커피", emoji: "☕", category: "음료" },
  { id: "juice", name: "주스", emoji: "🧃", category: "음료" },
  { id: "soju", name: "소주", emoji: "🍶", category: "음료" },
  // 음식
  { id: "ramen", name: "라면", emoji: "🍜", category: "음식" },
  { id: "ice", name: "아이스크림", emoji: "🍦", category: "음식" },
  { id: "kimbap", name: "김밥", emoji: "🍙", category: "음식" },
  { id: "chicken", name: "치킨", emoji: "🍗", category: "음식" },
  // 기타
  { id: "water", name: "물", emoji: "💧", category: "기타" },
  { id: "hotdog", name: "핫도그", emoji: "🌭", category: "음식" },
  { id: "beer", name: "맥주", emoji: "🍺", category: "음료" },
  { id: "pizza", name: "피자", emoji: "🍕", category: "음식" },
  { id: "candy", name: "사탕", emoji: "🍬", category: "음식" },
  { id: "egg", name: "달걀", emoji: "🥚", category: "음식" },
];

type Combo = {
  ingredients: [string, string];
  result: string;
  resultEmoji: string;
  description: string;
};

const COMBOS: Combo[] = [
  { ingredients: ["milk", "coffee"], result: "카페라떼", resultEmoji: "☕🥛", description: "시원한 카페라떼 완성!" },
  { ingredients: ["coke", "coffee"], result: "코피 칵테일", resultEmoji: "🤢", description: "... 이게 맞나? 충격적인 맛" },
  { ingredients: ["ramen", "egg"], result: "계란라면", resultEmoji: "🍳", description: "라면에 계란은 국룰!" },
  { ingredients: ["soju", "beer"], result: "소맥", resultEmoji: "🍻", description: "소맥이 완성됐습니다! (성인만)" },
  { ingredients: ["coke", "milk"], result: "밀크 콜라", resultEmoji: "🤍🥤", description: "세상에... 이걸 마시는 사람이 있다고?" },
  { ingredients: ["ice", "coffee"], result: "아이스 아메리카노", resultEmoji: "🧊☕", description: "한국인의 국민음료 완성!" },
  { ingredients: ["chicken", "beer"], result: "치맥", resultEmoji: "🍗🍺", description: "인생의 진리. 치맥이 탄생했습니다! (성인만)" },
  { ingredients: ["pizza", "coke"], result: "피자파티", resultEmoji: "🎉", description: "파티 음식 완성! 행복 200%" },
  { ingredients: ["ramen", "cheese"], result: "치즈라면", resultEmoji: "🧀", description: "요즘 유행하는 치즈라면" },
  { ingredients: ["water", "coffee"], result: "아메리카노", resultEmoji: "☕", description: "가장 기본적인 아메리카노" },
  { ingredients: ["milk", "ice"], result: "소프트 아이스크림", resultEmoji: "🍦", description: "아이스크림에 우유를 섞으면..." },
  { ingredients: ["soju", "juice"], result: "과일소주", resultEmoji: "🍹", description: "달달한 과일소주 완성! (성인만)" },
  { ingredients: ["hotdog", "coke"], result: "영화관 세트", resultEmoji: "🎬", description: "영화관 필수 조합!" },
  { ingredients: ["kimbap", "coffee"], result: "직장인 아침", resultEmoji: "😅", description: "직장인의 슬픈 아침식사..." },
  { ingredients: ["candy", "milk"], result: "달달한 우유", resultEmoji: "🍬🥛", description: "사탕을 우유에 녹이면?" },
  { ingredients: ["egg", "milk"], result: "에그노그", resultEmoji: "🥚🥛", description: "서양식 달걀 음료!" },
  { ingredients: ["beer", "coke"], result: "콜맥", resultEmoji: "🍺🥤", description: "콜라 맥주... 의외로 먹는 사람 있음" },
  { ingredients: ["coffee", "juice"], result: "오렌지 아메리카노", resultEmoji: "☕🍊", description: "요즘 유행! 오아 (오렌지 아메리카노)" },
  { ingredients: ["ice", "milk"], result: "아이스 밀크", resultEmoji: "🧊🥛", description: "시원한 우유. 생각보다 맛있음" },
  { ingredients: ["ramen", "kimbap"], result: "분식세트", resultEmoji: "🍜🍙", description: "분식집 정석 조합!" },
];

// 정의되지 않은 조합에 사용할 재미있는 fallback 결과 목록
const FALLBACK_COMBOS: Omit<Combo, "ingredients">[] = [
  { result: "정체불명의 혼합물", resultEmoji: "🧪", description: "과학이 설명하지 못하는 물질이 탄생했습니다" },
  { result: "수상한 스무디", resultEmoji: "😱", description: "절대 누구에게도 권하지 마세요..." },
  { result: "실험실 사고", resultEmoji: "💥", description: "이 조합은 실험실에서만 가능합니다" },
  { result: "의문의 젤리", resultEmoji: "🫨", description: "왜 굳어가는 거죠? 잠깐만요" },
  { result: "우주 쓰레기", resultEmoji: "🌌", description: "아무도 원하지 않는 조합이 우주로 날아갔습니다" },
  { result: "맛 테러범", resultEmoji: "💀", description: "이 레시피는 영원히 봉인합니다" },
  { result: "양자역학 음식", resultEmoji: "⚛️", description: "관측하기 전까지는 맛있는지 맛없는지 모릅니다" },
  { result: "AI 거부 레시피", resultEmoji: "🤖", description: "AI조차 이 조합을 설명할 수 없습니다" },
  { result: "고대 비밀 요리", resultEmoji: "📜", description: "기원전부터 아무도 만든 적 없는 전설의 조합" },
  { result: "철학적 식사", resultEmoji: "🤔", description: "왜 이 둘을 조합했는지 스스로에게 물어보세요" },
  { result: "불가사의 칵테일", resultEmoji: "🎲", description: "세상에 이런 게 있어? 없었는데 이제 있음" },
  { result: "마트 직원의 악몽", resultEmoji: "😰", description: "이 조합이 트렌드가 되면 저는 그만둡니다" },
];

function getFallbackCombo(a: string, b: string): Omit<Combo, "ingredients"> {
  const hash = (a + b).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return FALLBACK_COMBOS[hash % FALLBACK_COMBOS.length];
}

function getComboResult(a: string, b: string): Combo {
  return (
    COMBOS.find(
      (c) =>
        (c.ingredients[0] === a && c.ingredients[1] === b) ||
        (c.ingredients[0] === b && c.ingredients[1] === a)
    ) ?? { ingredients: [a, b], ...getFallbackCombo(a, b) }
  );
}

export default function InfiniteMixClient() {
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<Combo | null>(null);
  const [history, setHistory] = useState<Combo[]>([]);

  function toggle(id: string) {
    if (result) {
      // 결과 후 초기화
      setSelected([id]);
      setResult(null);
      return;
    }
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }
    const next = [...selected, id];
    if (next.length === 2) {
      const combo = getComboResult(next[0], next[1]);
      setResult(combo);
      setHistory((h) => [combo, ...h.slice(0, 9)]);
      setSelected(next);
    } else {
      setSelected(next);
    }
  }

  const discovered = new Set(history.map((h) => h.result));

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">🧪</div>
          <h1 className="text-xl font-black text-gray-900">무한 조합 실험실</h1>
          <p className="text-sm text-gray-400 mt-1">두 가지를 골라서 조합해봐요!</p>
        </div>

        {/* 현재 선택 */}
        <div className="flex items-center justify-center gap-4 mb-5 min-h-[60px]">
          {selected.length === 0 ? (
            <p className="text-gray-300 text-sm">재료를 선택하세요</p>
          ) : (
            <>
              <div className="text-4xl">{INGREDIENTS.find((i) => i.id === selected[0])?.emoji}</div>
              {selected.length >= 2 && (
                <>
                  <span className="text-2xl text-gray-300">+</span>
                  <div className="text-4xl">{INGREDIENTS.find((i) => i.id === selected[1])?.emoji}</div>
                  <span className="text-2xl text-gray-300">=</span>
                  {result ? (
                    <div className="text-3xl animate-bounce">{result.resultEmoji}</div>
                  ) : null}
                </>
              )}
            </>
          )}
        </div>

        {/* 결과 카드 */}
        {result && (
          <div className="mb-5 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center animate-in fade-in">
            <div className="text-3xl mb-1">{result.resultEmoji}</div>
            <div className="font-black text-lg text-gray-900">{result.result}</div>
            <div className="text-sm text-gray-500 mt-1">{result.description}</div>
            <div className="text-xs text-gray-400 mt-3">다른 재료를 클릭하면 새 조합 시작</div>
          </div>
        )}

        {/* 재료 선택 */}
        {["음료", "음식", "기타"].map((cat) => {
          const catItems = INGREDIENTS.filter((i) => i.category === cat);
          return (
            <div key={cat} className="mb-4">
              <h3 className="text-xs font-bold text-gray-400 mb-2 px-1">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {catItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 text-sm font-semibold transition-all ${
                      selected.includes(item.id)
                        ? "border-yellow-400 bg-yellow-50 text-yellow-800"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    <span>{item.emoji}</span>
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* 발견 기록 */}
        {history.length > 0 && (
          <div className="mt-4 bg-purple-50 rounded-2xl p-4">
            <h3 className="text-sm font-bold text-purple-800 mb-2">🔬 발견한 조합 ({discovered.size}/{COMBOS.length})</h3>
            <div className="flex flex-wrap gap-2">
              {[...discovered].map((r) => (
                <span key={r} className="text-xs bg-white border border-purple-200 rounded-full px-2 py-1 text-purple-700">{r}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
