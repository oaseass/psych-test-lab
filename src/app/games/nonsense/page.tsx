"use client";
import { useState } from "react";
import { nonsenseSets } from "@/data/games/nonsenseData";
import NonsenseGame from "@/components/games/NonsenseGame";

export default function NonsensePage() {
  const [selected, setSelected] = useState<string | null>(null);

  const activeSet = nonsenseSets.find((s) => s.slug === selected);

  if (activeSet) {
    return (
      <div className="min-h-screen bg-[#FAF7F2]">
        <div className="max-w-md mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setSelected(null)}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ‹
            </button>
            <div>
              <h1 className="font-bold text-gray-900">{activeSet.title}</h1>
              <p className="text-xs text-gray-500">{activeSet.description}</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl p-6 shadow-sm">
            <NonsenseGame data={activeSet} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-black text-gray-900">🤣 넌센스 퀴즈</h1>
          <p className="text-gray-500 text-sm mt-1">맞혀도 웃고 틀려도 웃는 퀴즈!</p>
        </div>

        <div className="flex flex-col gap-3">
          {nonsenseSets.map((s) => (
            <button key={s.id} onClick={() => setSelected(s.slug)} className="text-left">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: s.bgColor }}
                >
                  {s.emoji}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900 text-sm">{s.title}</span>
                    {s.isFeatured && (
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">인기</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{s.questions.length}문제</p>
                </div>
                <span className="text-gray-300">›</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
