"use client";
import Link from "next/link";
import LayoutContainer from "@/components/layout/LayoutContainer";
import { storyList } from "@/data/storyData";

export default function StoryListPage() {
  return (
    <LayoutContainer>
      <div className="py-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-4xl mb-3">📖</div>
          <h1 className="text-2xl font-black text-gray-900">선택형 스토리</h1>
          <p className="text-gray-500 text-sm mt-2">선택에 따라 결말이 달라지는 인터랙티브 스토리</p>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {storyList.map((story) => (
            <Link key={story.id} href={`/story/${story.slug}`}>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-lg transition-all active:scale-[0.99] group">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: story.bgColor }}
                  >
                    {story.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{story.title}</span>
                      {story.isNew && <span className="text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-full font-bold">NEW</span>}
                      {story.isHot && <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">🔥</span>}
                    </div>
                    <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">{story.subtitle}</p>
                    <div className="flex gap-1 mt-2">
                      {story.tags.slice(0, 3).map((t) => (
                        <span key={t} className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-gray-300 group-hover:text-gray-500 text-lg flex-shrink-0">›</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </LayoutContainer>
  );
}
