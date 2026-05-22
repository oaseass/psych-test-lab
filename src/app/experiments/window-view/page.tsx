"use client";
import { useState } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type Scene = {
  id: string;
  name: string;
  description: string;
  style: React.CSSProperties;
  elements: Element[];
};

type Element = {
  id: string;
  top: number; // %
  left: number; // %
  width: number; // %
  height: number; // %
  bg: string;
  radius?: number;
  emoji?: string;
  zIndex?: number;
};

const SCENES: Scene[] = [
  {
    id: "morning",
    name: "맑은 아침",
    description: "따뜻한 햇빛이 드는 아침 창가",
    style: { background: "linear-gradient(180deg, #87CEEB 0%, #E0F2FE 50%, #FDE68A 100%)" },
    elements: [
      { id: "sun", top: 10, left: 70, width: 15, height: 20, bg: "#FBBF24", radius: 50, emoji: "☀️", zIndex: 1 },
      { id: "cloud1", top: 15, left: 20, width: 20, height: 10, bg: "rgba(255,255,255,0.8)", radius: 20 },
      { id: "cloud2", top: 20, left: 50, width: 15, height: 8, bg: "rgba(255,255,255,0.7)", radius: 20 },
      { id: "tree", top: 50, left: 10, width: 12, height: 45, bg: "#15803D", radius: 5 },
      { id: "house", top: 60, left: 55, width: 20, height: 30, bg: "#92400E", radius: 3 },
      { id: "bird", top: 25, left: 45, width: 4, height: 3, bg: "transparent", emoji: "🕊️" },
    ],
  },
  {
    id: "rain",
    name: "빗소리 오후",
    description: "빗소리가 들리는 흐린 오후",
    style: { background: "linear-gradient(180deg, #475569 0%, #94A3B8 40%, #CBD5E1 100%)" },
    elements: [
      { id: "cloud1", top: 5, left: 15, width: 30, height: 15, bg: "rgba(71,85,105,0.9)", radius: 20 },
      { id: "cloud2", top: 10, left: 55, width: 25, height: 12, bg: "rgba(71,85,105,0.8)", radius: 20 },
      { id: "rain1", top: 25, left: 15, width: 1, height: 20, bg: "#94A3B8", radius: 2 },
      { id: "rain2", top: 30, left: 30, width: 1, height: 20, bg: "#94A3B8", radius: 2 },
      { id: "rain3", top: 20, left: 60, width: 1, height: 20, bg: "#94A3B8", radius: 2 },
      { id: "rain4", top: 28, left: 75, width: 1, height: 20, bg: "#94A3B8", radius: 2 },
      { id: "puddle", top: 80, left: 25, width: 25, height: 8, bg: "rgba(148,163,184,0.5)", radius: 50 },
      { id: "umbrella", top: 55, left: 40, width: 15, height: 20, bg: "transparent", emoji: "☂️" },
    ],
  },
  {
    id: "night",
    name: "별이 가득한 밤",
    description: "조용하고 신비로운 밤하늘",
    style: { background: "linear-gradient(180deg, #0F0F23 0%, #1e1b4b 40%, #312e81 100%)" },
    elements: [
      { id: "moon", top: 10, left: 65, width: 12, height: 16, bg: "#FEF3C7", radius: 50, emoji: "🌙" },
      { id: "star1", top: 8, left: 20, width: 2, height: 2, bg: "#FEF9C3", radius: 50 },
      { id: "star2", top: 15, left: 40, width: 1.5, height: 1.5, bg: "#FEF9C3", radius: 50 },
      { id: "star3", top: 5, left: 80, width: 2, height: 2, bg: "#FEF9C3", radius: 50 },
      { id: "star4", top: 20, left: 10, width: 1, height: 1, bg: "#FEF9C3", radius: 50 },
      { id: "star5", top: 12, left: 55, width: 1.5, height: 1.5, bg: "#FEF9C3", radius: 50 },
      { id: "mountain", top: 55, left: 0, width: 50, height: 40, bg: "#1e1b4b", radius: 0 },
      { id: "mountain2", top: 60, left: 45, width: 55, height: 35, bg: "#0F0F23", radius: 0 },
      { id: "snowtip", top: 50, left: 18, width: 15, height: 10, bg: "#E0E7FF", radius: 50 },
      { id: "city", top: 75, left: 20, width: 60, height: 20, bg: "transparent", emoji: "🌃" },
    ],
  },
  {
    id: "spring",
    name: "벚꽃 봄날",
    description: "분홍빛 벚꽃이 가득한 봄날",
    style: { background: "linear-gradient(180deg, #FDF2F8 0%, #FCE7F3 50%, #FBCFE8 100%)" },
    elements: [
      { id: "tree1", top: 30, left: 5, width: 20, height: 65, bg: "#9D174D", radius: 5 },
      { id: "bloom1", top: 15, left: 0, width: 30, height: 30, bg: "rgba(249,168,212,0.7)", radius: 50 },
      { id: "tree2", top: 35, left: 70, width: 20, height: 60, bg: "#9D174D", radius: 5 },
      { id: "bloom2", top: 20, left: 60, width: 35, height: 30, bg: "rgba(249,168,212,0.6)", radius: 50 },
      { id: "petal1", top: 40, left: 35, width: 4, height: 4, bg: "transparent", emoji: "🌸" },
      { id: "petal2", top: 55, left: 50, width: 4, height: 4, bg: "transparent", emoji: "🌸" },
      { id: "petal3", top: 30, left: 45, width: 3, height: 3, bg: "transparent", emoji: "🌸" },
      { id: "path", top: 80, left: 20, width: 60, height: 15, bg: "#FCE7F3", radius: 3 },
      { id: "bench", top: 70, left: 45, width: 15, height: 10, bg: "transparent", emoji: "🪑" },
    ],
  },
];

export default function WindowViewPage() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const current = SCENES[sceneIdx];

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        <div className="text-center mb-5">
          <div className="text-4xl mb-2">🪟</div>
          <h1 className="text-xl font-black text-gray-900">창 밖 뷰어</h1>
          <p className="text-sm text-gray-400 mt-1">지금 이 창문 밖 풍경을 골라봐요</p>
        </div>

        {/* 창문 프레임 */}
        <div className="relative bg-gray-200 rounded-2xl p-3 shadow-lg mb-5">
          {/* 창틀 */}
          <div className="relative overflow-hidden rounded-xl" style={{ paddingTop: "75%", ...current.style }}>
            <div className="absolute inset-0" style={current.style}>
              {/* 요소들 렌더링 */}
              {current.elements.map((el) => (
                <div
                  key={el.id}
                  className="absolute flex items-center justify-center"
                  style={{
                    top: `${el.top}%`,
                    left: `${el.left}%`,
                    width: `${el.width}%`,
                    height: `${el.height}%`,
                    background: el.bg,
                    borderRadius: el.radius !== undefined ? `${el.radius}%` : undefined,
                    zIndex: el.zIndex ?? 0,
                    fontSize: el.emoji ? "clamp(16px, 5%, 32px)" : undefined,
                  }}
                >
                  {el.emoji}
                </div>
              ))}
              {/* 창살 (십자) */}
              <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 100 }}>
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2 bg-gray-300/60" />
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-gray-300/60" />
              </div>
            </div>
          </div>
          {/* 창틀 라벨 */}
          <div className="absolute bottom-4 right-4 bg-black/30 text-white text-xs px-3 py-1 rounded-full">
            {current.name}
          </div>
        </div>

        {/* 설명 */}
        <p className="text-center text-gray-500 text-sm mb-5">{current.description}</p>

        {/* 씬 선택 */}
        <div className="grid grid-cols-2 gap-3">
          {SCENES.map((scene, i) => (
            <button
              key={scene.id}
              onClick={() => setSceneIdx(i)}
              className={`py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                i === sceneIdx
                  ? "border-brand-purple text-brand-purple bg-purple-50"
                  : "border-gray-200 text-gray-600 bg-white hover:border-gray-300"
              }`}
            >
              {scene.name}
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-5">
          오늘 밖에 나가기 싫을 때 위로가 되길 바라요 🪟
        </p>
      </div>
    </LayoutContainer>
  );
}
