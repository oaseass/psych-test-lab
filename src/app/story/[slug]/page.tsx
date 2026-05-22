"use client";
import { use, useState } from "react";
import { notFound } from "next/navigation";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { storyList } from "@/data/storyData";

type Props = { params: Promise<{ slug: string }> };

export default function StoryDetailPage({ params }: Props) {
  const { slug } = use(params);
  const story = storyList.find((s) => s.slug === slug);
  if (!story) notFound();

  const firstScene = story.scenes[0];
  const [history, setHistory] = useState<string[]>([firstScene.id]);

  const currentId = history[history.length - 1];
  const current = story.scenes.find((s) => s.id === currentId);

  if (!current) return null;

  const isEnding = !current.choices || current.choices.length === 0;

  function choose(nextId: string) {
    setHistory((h) => [...h, nextId]);
  }

  function goBack() {
    if (history.length <= 1) return;
    setHistory((h) => h.slice(0, -1));
  }

  function restart() {
    setHistory([firstScene.id]);
  }

  return (
    <LayoutContainer>
      <div className="py-4 max-w-md mx-auto">
        {/* 헤더 */}
        <div className="flex items-center gap-3 mb-5">
          <div className="text-2xl">{story.emoji}</div>
          <div>
            <h1 className="font-black text-gray-900 text-base leading-tight">{story.title}</h1>
            <div className="text-xs text-gray-400">씬 {history.length} / {story.scenes.length}</div>
          </div>
          {history.length > 1 && (
            <button
              onClick={goBack}
              className="ml-auto text-sm text-gray-400 hover:text-gray-600 border border-gray-200 rounded-full px-3 py-1"
            >
              ← 되돌리기
            </button>
          )}
        </div>

        {/* 진행 바 */}
        <div className="h-1.5 bg-gray-200 rounded-full mb-5 overflow-hidden">
          <div
            className="h-1.5 rounded-full transition-all"
            style={{
              width: `${(history.length / story.scenes.length) * 100}%`,
              background: story.color,
            }}
          />
        </div>

        {/* 씬 내용 */}
        <div
          className="rounded-2xl p-5 mb-5 border"
          style={{ background: story.bgColor, borderColor: story.color + "40" }}
        >
          <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{current.text}</p>
        </div>

        {/* 선택지 or 엔딩 */}
        {isEnding ? (
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4 text-center">
              <div className="text-3xl mb-2">🏁</div>
              <div className="font-black text-gray-900 text-base">결말</div>
            </div>
            <button
              onClick={restart}
              className="w-full py-3 rounded-2xl font-bold text-white"
              style={{ background: story.color }}
            >
              처음부터 다시 🔄
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="text-xs text-gray-400 font-bold mb-1">어떻게 할까요?</div>
            {current.choices!.map((choice) => (
              <button
                key={choice.id}
                onClick={() => choose(choice.nextSceneId)}
                className="w-full py-3 px-4 rounded-2xl border-2 border-gray-200 bg-white text-gray-800 text-sm font-semibold text-left hover:border-gray-400 hover:bg-gray-50 transition-all active:scale-[0.99]"
              >
                {choice.text}
              </button>
            ))}
          </div>
        )}
      </div>
    </LayoutContainer>
  );
}
