"use client";
import { useState, useEffect, useRef } from "react";
import LayoutContainer from "@/components/layout/LayoutContainer";

type SceneEl = {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
  bg: string;
  radius?: number;
  emoji?: string;
  zIndex?: number;
};

type Scene = {
  id: string;
  name: string;
  mood: string;
  desc: string;
  bg: string;
  thumb: string;
  elements: SceneEl[];
};

const SCENES: Scene[] = [
  {
    id: "morning", name: "맑은 아침", mood: "☀️ 상쾌", desc: "따스한 햇빛이 드는 아침 창가",
    bg: "linear-gradient(180deg,#87CEEB 0%,#B3E5FC 55%,#C8E6A0 100%)",
    thumb: "linear-gradient(135deg,#87CEEB,#C8E6A0)",
    elements: [
      { id: "sun", top: 8, left: 68, width: 14, height: 18, bg: "#FBBF24", radius: 50, zIndex: 2 },
      { id: "glow", top: 3, left: 61, width: 28, height: 30, bg: "rgba(251,191,36,0.18)", radius: 50 },
      { id: "c1", top: 18, left: 10, width: 28, height: 11, bg: "rgba(255,255,255,0.88)", radius: 50 },
      { id: "c2", top: 26, left: 44, width: 20, height: 9, bg: "rgba(255,255,255,0.72)", radius: 50 },
      { id: "t1", top: 48, left: 4, width: 8, height: 48, bg: "#4D7C0F", radius: 4 },
      { id: "tt1", top: 24, left: -2, width: 22, height: 32, bg: "rgba(21,128,61,0.85)", radius: 50 },
      { id: "h", top: 60, left: 44, width: 22, height: 30, bg: "#92400E", radius: 2 },
      { id: "roof", top: 51, left: 41, width: 28, height: 13, bg: "#78350F", radius: 2 },
      { id: "bird", top: 22, left: 38, width: 4, height: 3, bg: "transparent", emoji: "🕊️" },
      { id: "ground", top: 88, left: 0, width: 100, height: 12, bg: "#86EFAC" },
    ],
  },
  {
    id: "rain", name: "빗소리 오후", mood: "🌧️ 차분", desc: "빗소리가 들리는 흐린 오후",
    bg: "linear-gradient(180deg,#475569 0%,#94A3B8 50%,#CBD5E1 100%)",
    thumb: "linear-gradient(135deg,#64748B,#CBD5E1)",
    elements: [
      { id: "c1", top: 5, left: 10, width: 35, height: 16, bg: "rgba(51,65,85,0.9)", radius: 20 },
      { id: "c2", top: 12, left: 52, width: 28, height: 13, bg: "rgba(71,85,105,0.8)", radius: 20 },
      { id: "r1", top: 28, left: 12, width: 1, height: 22, bg: "#94A3B8", radius: 2 },
      { id: "r2", top: 32, left: 28, width: 1, height: 22, bg: "#94A3B8", radius: 2 },
      { id: "r3", top: 25, left: 50, width: 1, height: 22, bg: "#94A3B8", radius: 2 },
      { id: "r4", top: 30, left: 68, width: 1, height: 22, bg: "#94A3B8", radius: 2 },
      { id: "r5", top: 22, left: 84, width: 1, height: 22, bg: "#94A3B8", radius: 2 },
      { id: "puddle", top: 82, left: 20, width: 30, height: 8, bg: "rgba(148,163,184,0.45)", radius: 50 },
      { id: "tree", top: 45, left: 72, width: 8, height: 50, bg: "#334155", radius: 3 },
      { id: "umb", top: 52, left: 35, width: 16, height: 22, bg: "transparent", emoji: "☂️" },
    ],
  },
  {
    id: "night", name: "별이 가득한 밤", mood: "🌟 신비", desc: "조용하고 신비로운 밤하늘",
    bg: "linear-gradient(180deg,#0F0F23 0%,#1E1B4B 45%,#312E81 100%)",
    thumb: "linear-gradient(135deg,#0F0F23,#312E81)",
    elements: [
      { id: "moon", top: 10, left: 64, width: 13, height: 17, bg: "#FEF3C7", radius: 50 },
      { id: "s1", top: 7, left: 18, width: 2, height: 2.5, bg: "#FEF9C3", radius: 50 },
      { id: "s2", top: 14, left: 38, width: 1.5, height: 1.5, bg: "#FEF9C3", radius: 50 },
      { id: "s3", top: 5, left: 78, width: 2, height: 2, bg: "#FEF9C3", radius: 50 },
      { id: "s4", top: 20, left: 8, width: 1, height: 1, bg: "#FEF9C3", radius: 50 },
      { id: "s5", top: 12, left: 54, width: 1.5, height: 1.5, bg: "#FEF9C3", radius: 50 },
      { id: "s6", top: 18, left: 88, width: 1, height: 1, bg: "#FEF9C3", radius: 50 },
      { id: "mt1", top: 52, left: 0, width: 55, height: 45, bg: "#1E1B4B", radius: 0 },
      { id: "mt2", top: 58, left: 42, width: 58, height: 40, bg: "#0F0F23", radius: 0 },
      { id: "city", top: 74, left: 18, width: 64, height: 22, bg: "transparent", emoji: "🌃" },
    ],
  },
  {
    id: "spring", name: "벚꽃 봄날", mood: "🌸 설렘", desc: "분홍빛 벚꽃이 흩날리는 봄날",
    bg: "linear-gradient(180deg,#FDF2F8 0%,#FCE7F3 55%,#FBCFE8 100%)",
    thumb: "linear-gradient(135deg,#FCE7F3,#FBCFE8)",
    elements: [
      { id: "t1", top: 28, left: 3, width: 10, height: 68, bg: "#9D174D", radius: 4 },
      { id: "b1", top: 10, left: -4, width: 32, height: 35, bg: "rgba(249,168,212,0.72)", radius: 50 },
      { id: "t2", top: 33, left: 72, width: 10, height: 64, bg: "#9D174D", radius: 4 },
      { id: "b2", top: 15, left: 60, width: 38, height: 32, bg: "rgba(249,168,212,0.62)", radius: 50 },
      { id: "p1", top: 38, left: 32, width: 5, height: 5, bg: "transparent", emoji: "🌸" },
      { id: "p2", top: 52, left: 52, width: 5, height: 5, bg: "transparent", emoji: "🌸" },
      { id: "p3", top: 28, left: 48, width: 4, height: 4, bg: "transparent", emoji: "🌸" },
      { id: "path", top: 80, left: 18, width: 64, height: 14, bg: "rgba(252,231,243,0.8)", radius: 3 },
      { id: "bench", top: 68, left: 44, width: 14, height: 11, bg: "transparent", emoji: "🪑" },
    ],
  },
  {
    id: "sunset", name: "황금빛 노을", mood: "🌅 포근", desc: "하늘이 물드는 황금빛 저녁",
    bg: "linear-gradient(180deg,#F97316 0%,#FB923C 30%,#FBBF24 60%,#FDE68A 100%)",
    thumb: "linear-gradient(135deg,#F97316,#FBBF24)",
    elements: [
      { id: "sun", top: 42, left: 38, width: 22, height: 28, bg: "#FCD34D", radius: 50, zIndex: 2 },
      { id: "sg", top: 34, left: 26, width: 46, height: 44, bg: "rgba(253,211,77,0.22)", radius: 50 },
      { id: "c1", top: 12, left: 5, width: 32, height: 12, bg: "rgba(251,146,60,0.5)", radius: 50 },
      { id: "c2", top: 8, left: 60, width: 28, height: 10, bg: "rgba(251,146,60,0.4)", radius: 50 },
      { id: "sil1", top: 65, left: 0, width: 30, height: 35, bg: "#1C1917", radius: 0 },
      { id: "sil2", top: 70, left: 55, width: 45, height: 30, bg: "#1C1917", radius: 0 },
      { id: "tree", top: 38, left: 68, width: 6, height: 55, bg: "#1C1917", radius: 2 },
      { id: "bird1", top: 20, left: 28, width: 4, height: 3, bg: "transparent", emoji: "🦅" },
      { id: "bird2", top: 26, left: 55, width: 3, height: 2, bg: "transparent", emoji: "🦅" },
    ],
  },
  {
    id: "summer", name: "여름 바다", mood: "🏖️ 청량", desc: "눈부신 여름 바다가 보이는 창가",
    bg: "linear-gradient(180deg,#0EA5E9 0%,#38BDF8 45%,#BAE6FD 70%,#FDE68A 100%)",
    thumb: "linear-gradient(135deg,#0EA5E9,#FDE68A)",
    elements: [
      { id: "sun", top: 8, left: 72, width: 13, height: 17, bg: "#FBBF24", radius: 50 },
      { id: "c1", top: 14, left: 8, width: 24, height: 9, bg: "rgba(255,255,255,0.75)", radius: 50 },
      { id: "wave1", top: 62, left: 0, width: 100, height: 12, bg: "rgba(14,165,233,0.6)", radius: 50 },
      { id: "wave2", top: 70, left: 0, width: 100, height: 12, bg: "rgba(56,189,248,0.5)", radius: 50 },
      { id: "sand", top: 80, left: 0, width: 100, height: 20, bg: "#FDE68A" },
      { id: "umbrella", top: 58, left: 35, width: 18, height: 24, bg: "transparent", emoji: "⛱️" },
      { id: "boat", top: 48, left: 62, width: 16, height: 12, bg: "transparent", emoji: "⛵" },
    ],
  },
  {
    id: "autumn", name: "단풍 가을", mood: "🍂 감성", desc: "붉고 노란 단풍이 물드는 가을",
    bg: "linear-gradient(180deg,#7C3AED 0%,#A78BFA 40%,#FCD34D 80%,#F97316 100%)",
    thumb: "linear-gradient(135deg,#DC2626,#F97316)",
    elements: [
      { id: "t1", top: 30, left: 5, width: 9, height: 65, bg: "#92400E", radius: 3 },
      { id: "l1", top: 8, left: -2, width: 28, height: 30, bg: "rgba(239,68,68,0.75)", radius: 50 },
      { id: "t2", top: 35, left: 73, width: 8, height: 60, bg: "#92400E", radius: 3 },
      { id: "l2", top: 14, left: 62, width: 34, height: 28, bg: "rgba(234,179,8,0.72)", radius: 50 },
      { id: "leaf1", top: 40, left: 34, width: 5, height: 5, bg: "transparent", emoji: "🍁" },
      { id: "leaf2", top: 54, left: 50, width: 5, height: 5, bg: "transparent", emoji: "🍂" },
      { id: "leaf3", top: 30, left: 48, width: 4, height: 4, bg: "transparent", emoji: "🍁" },
      { id: "path", top: 78, left: 15, width: 70, height: 14, bg: "rgba(180,120,60,0.4)", radius: 3 },
      { id: "bench", top: 66, left: 42, width: 16, height: 12, bg: "transparent", emoji: "🪑" },
    ],
  },
  {
    id: "winter", name: "눈 오는 겨울", mood: "❄️ 고요", desc: "소복소복 눈이 쌓이는 겨울날",
    bg: "linear-gradient(180deg,#BFDBFE 0%,#DBEAFE 50%,#EFF6FF 100%)",
    thumb: "linear-gradient(135deg,#BFDBFE,#EFF6FF)",
    elements: [
      { id: "c1", top: 6, left: 12, width: 30, height: 13, bg: "rgba(147,197,253,0.6)", radius: 50 },
      { id: "c2", top: 10, left: 55, width: 26, height: 11, bg: "rgba(147,197,253,0.5)", radius: 50 },
      { id: "sn1", top: 20, left: 15, width: 3, height: 3, bg: "transparent", emoji: "❄️" },
      { id: "sn2", top: 30, left: 40, width: 3, height: 3, bg: "transparent", emoji: "❄️" },
      { id: "sn3", top: 25, left: 68, width: 3, height: 3, bg: "transparent", emoji: "❄️" },
      { id: "sn4", top: 38, left: 28, width: 3, height: 3, bg: "transparent", emoji: "❄️" },
      { id: "t1", top: 35, left: 5, width: 8, height: 60, bg: "#64748B", radius: 3 },
      { id: "snow1", top: 38, left: 2, width: 14, height: 8, bg: "rgba(255,255,255,0.9)", radius: 50 },
      { id: "house", top: 56, left: 45, width: 22, height: 30, bg: "#CBD5E1", radius: 2 },
      { id: "roof", top: 47, left: 42, width: 28, height: 13, bg: "#93C5FD", radius: 2 },
      { id: "snowfield", top: 82, left: 0, width: 100, height: 18, bg: "rgba(255,255,255,0.92)" },
    ],
  },
  {
    id: "fog", name: "안개 낀 아침", mood: "🌫️ 몽환", desc: "뿌연 안개 속에 잠긴 이른 아침",
    bg: "linear-gradient(180deg,#D1D5DB 0%,#E5E7EB 40%,#F9FAFB 100%)",
    thumb: "linear-gradient(135deg,#9CA3AF,#E5E7EB)",
    elements: [
      { id: "fog1", top: 0, left: 0, width: 100, height: 35, bg: "rgba(209,213,219,0.8)" },
      { id: "fog2", top: 25, left: 0, width: 100, height: 30, bg: "rgba(229,231,235,0.7)" },
      { id: "t1", top: 40, left: 8, width: 5, height: 55, bg: "rgba(75,85,99,0.5)", radius: 2 },
      { id: "t2", top: 44, left: 30, width: 4, height: 50, bg: "rgba(107,114,128,0.4)", radius: 2 },
      { id: "t3", top: 38, left: 70, width: 6, height: 58, bg: "rgba(75,85,99,0.35)", radius: 2 },
      { id: "building", top: 50, left: 44, width: 20, height: 42, bg: "rgba(107,114,128,0.3)", radius: 2 },
      { id: "ground", top: 86, left: 0, width: 100, height: 14, bg: "rgba(209,213,219,0.6)" },
    ],
  },
  {
    id: "storm", name: "천둥 번개", mood: "⚡ 긴장", desc: "번개가 번쩍이는 폭풍우 밤",
    bg: "linear-gradient(180deg,#111827 0%,#1F2937 50%,#374151 100%)",
    thumb: "linear-gradient(135deg,#111827,#374151)",
    elements: [
      { id: "c1", top: 5, left: 5, width: 45, height: 22, bg: "rgba(17,24,39,0.95)", radius: 20 },
      { id: "c2", top: 10, left: 50, width: 45, height: 20, bg: "rgba(31,41,55,0.9)", radius: 20 },
      { id: "lightning", top: 20, left: 38, width: 8, height: 35, bg: "rgba(253,224,71,0.85)", radius: 2, zIndex: 3 },
      { id: "glow", top: 15, left: 28, width: 28, height: 50, bg: "rgba(253,224,71,0.08)", radius: 10 },
      { id: "r1", top: 28, left: 10, width: 1.5, height: 25, bg: "rgba(96,165,250,0.5)", radius: 2 },
      { id: "r2", top: 32, left: 25, width: 1.5, height: 25, bg: "rgba(96,165,250,0.5)", radius: 2 },
      { id: "r3", top: 24, left: 62, width: 1.5, height: 25, bg: "rgba(96,165,250,0.5)", radius: 2 },
      { id: "r4", top: 30, left: 80, width: 1.5, height: 25, bg: "rgba(96,165,250,0.5)", radius: 2 },
      { id: "mt", top: 58, left: 0, width: 100, height: 42, bg: "#111827", radius: 0 },
    ],
  },
  {
    id: "city", name: "도시의 밤", mood: "🌆 감각", desc: "반짝이는 도시 불빛이 가득한 밤",
    bg: "linear-gradient(180deg,#0F172A 0%,#1E293B 55%,#1E1B4B 100%)",
    thumb: "linear-gradient(135deg,#0F172A,#4338CA)",
    elements: [
      { id: "s1", top: 6, left: 20, width: 2, height: 2.5, bg: "#FEF9C3", radius: 50 },
      { id: "s2", top: 10, left: 60, width: 1.5, height: 1.5, bg: "#FEF9C3", radius: 50 },
      { id: "s3", top: 4, left: 82, width: 2, height: 2, bg: "#FEF9C3", radius: 50 },
      { id: "b1", top: 38, left: 5, width: 14, height: 55, bg: "#1E3A5F", radius: 2 },
      { id: "b1w", top: 42, left: 6, width: 3, height: 3, bg: "#FDE68A", radius: 1 },
      { id: "b1w2", top: 50, left: 11, width: 3, height: 3, bg: "#FDE68A", radius: 1 },
      { id: "b2", top: 28, left: 30, width: 18, height: 65, bg: "#1E293B", radius: 2 },
      { id: "b2w", top: 32, left: 32, width: 4, height: 4, bg: "#FCD34D", radius: 1 },
      { id: "b2w2", top: 44, left: 38, width: 4, height: 4, bg: "#93C5FD", radius: 1 },
      { id: "b3", top: 44, left: 62, width: 16, height: 50, bg: "#1E3A5F", radius: 2 },
      { id: "b3w", top: 48, left: 64, width: 3, height: 3, bg: "#FDE68A", radius: 1 },
      { id: "b4", top: 32, left: 80, width: 20, height: 62, bg: "#312E81", radius: 2 },
      { id: "b4w", top: 36, left: 83, width: 4, height: 4, bg: "#A5B4FC", radius: 1 },
      { id: "road", top: 88, left: 0, width: 100, height: 12, bg: "#0F172A" },
    ],
  },
  {
    id: "tropical", name: "열대 우림", mood: "🌴 이국", desc: "싱그러운 초록이 넘치는 열대",
    bg: "linear-gradient(180deg,#065F46 0%,#047857 35%,#059669 70%,#34D399 100%)",
    thumb: "linear-gradient(135deg,#065F46,#34D399)",
    elements: [
      { id: "sun", top: 8, left: 70, width: 14, height: 18, bg: "#FDE68A", radius: 50 },
      { id: "palm1", top: 20, left: 2, width: 6, height: 72, bg: "#92400E", radius: 4 },
      { id: "leaf1a", top: 14, left: -8, width: 30, height: 14, bg: "rgba(4,120,87,0.85)", radius: 50 },
      { id: "leaf1b", top: 10, left: 5, width: 26, height: 12, bg: "rgba(5,150,105,0.8)", radius: 50 },
      { id: "palm2", top: 26, left: 72, width: 5, height: 68, bg: "#92400E", radius: 4 },
      { id: "leaf2a", top: 18, left: 58, width: 32, height: 14, bg: "rgba(4,120,87,0.82)", radius: 50 },
      { id: "leaf2b", top: 14, left: 72, width: 26, height: 12, bg: "rgba(5,150,105,0.75)", radius: 50 },
      { id: "bird", top: 22, left: 38, width: 6, height: 5, bg: "transparent", emoji: "🦜" },
      { id: "water", top: 72, left: 0, width: 100, height: 18, bg: "rgba(52,211,153,0.55)" },
      { id: "ground", top: 86, left: 0, width: 100, height: 14, bg: "#065F46" },
    ],
  },
];

export default function WindowViewPage() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  const current = SCENES[sceneIdx];

  useEffect(() => {
    if (!autoPlay) return;
    const t = setInterval(() => {
      setSceneIdx((i) => (i + 1) % SCENES.length);
    }, 4000);
    return () => clearInterval(t);
  }, [autoPlay]);

  function pickScene(i: number) {
    setSceneIdx(i);
    // scroll thumbnail into view
    if (thumbRef.current) {
      const btn = thumbRef.current.children[i] as HTMLElement;
      btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-xl font-black text-gray-900">🪟 창 밖 뷰어</h1>
            <p className="text-xs text-gray-400 mt-0.5">원하는 풍경을 골라봐요</p>
          </div>
          <button
            onClick={() => setAutoPlay((v) => !v)}
            className={`text-xs px-3 py-1.5 rounded-full font-bold transition-colors ${
              autoPlay ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {autoPlay ? "⏸ 자동재생 중" : "▶ 자동재생"}
          </button>
        </div>

        {/* Window frame */}
        <div className="relative bg-stone-300 rounded-2xl p-3 shadow-xl mb-4"
          style={{ boxShadow: "inset 0 2px 8px rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.12)" }}>
          <div className="relative overflow-hidden rounded-xl" style={{ paddingTop: "72%" }}>
            <div className="absolute inset-0" style={{ background: current.bg }}>
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
                    fontSize: el.emoji ? "clamp(14px, 4.5%, 28px)" : undefined,
                    lineHeight: 1,
                  }}
                >
                  {el.emoji}
                </div>
              ))}
              {/* cross frame */}
              <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 100 }}>
                <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-2.5 bg-stone-300/70" />
                <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2.5 bg-stone-300/70" />
              </div>
            </div>
          </div>
          {/* scene label */}
          <div className="absolute bottom-4 left-4 bg-black/35 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {current.mood}
          </div>
          <div className="absolute bottom-4 right-4 bg-black/35 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
            {sceneIdx + 1}/{SCENES.length}
          </div>
        </div>

        {/* Description */}
        <p className="text-center text-gray-500 text-sm font-medium mb-4">{current.desc}</p>

        {/* Thumbnail strip */}
        <div
          ref={thumbRef}
          className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {SCENES.map((scene, i) => (
            <button
              key={scene.id}
              onClick={() => pickScene(i)}
              className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all ${
                i === sceneIdx ? "scale-110" : "opacity-60 hover:opacity-90"
              }`}
            >
              <div
                className="w-12 h-12 rounded-xl border-2 transition-all"
                style={{
                  background: scene.thumb,
                  borderColor: i === sceneIdx ? "#7C3AED" : "transparent",
                  boxShadow: i === sceneIdx ? "0 0 0 2px #DDD6FE" : "none",
                }}
              />
              <span className="text-[10px] text-gray-500 font-medium w-14 text-center leading-tight">
                {scene.name}
              </span>
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
