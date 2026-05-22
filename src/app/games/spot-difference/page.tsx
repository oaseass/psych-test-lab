import Link from "next/link";
import { spotSceneList } from "@/data/games/spotDifferenceData";

const DIFF_LABELS = { easy: "쉬움", normal: "보통", hard: "어려움" };
const DIFF_COLORS = { easy: "#22C55E", normal: "#F59E0B", hard: "#EF4444" };

export default function SpotDifferencePage() {
  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #F5F3FF, #FDF2F8)" }}>
      <div className="max-w-xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-white rounded-2xl px-4 py-2 shadow-sm border border-purple-100 mb-4">
            <span className="text-2xl">🔍</span>
            <span className="text-xs font-bold text-purple-600">관찰력 게임</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">틀린그림 찾기</h1>
          <p className="text-sm text-gray-500 mt-1">두 그림의 차이점을 찾아보세요!</p>
        </div>

        {/* Scene grid */}
        <div className="grid grid-cols-2 gap-3">
          {spotSceneList.map((scene) => (
            <Link key={scene.slug} href={`/games/spot-difference/${scene.slug}`}>
              <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.97]">
                {/* Preview thumbnail */}
                <div
                  className="w-full aspect-[3/2] flex items-center justify-center text-5xl"
                  style={{ background: scene.bgColor }}
                >
                  {scene.emoji}
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-gray-800">{scene.title}</h3>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: DIFF_COLORS[scene.difficulty] }}
                    >
                      {DIFF_LABELS[scene.difficulty]}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <span>차이점 {scene.differences.length}개</span>
                    <span>·</span>
                    <span>⏱ {scene.timeLimit}초</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link href="/games/observation" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← 관찰력 게임 목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}
