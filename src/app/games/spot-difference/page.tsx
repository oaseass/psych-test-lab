import Link from "next/link";
import { spotSceneList } from "@/data/games/spotDifferenceData";

const DIFF_LABELS = { easy: "쉬움", normal: "보통", hard: "어려움" };
const DIFF_COLORS = { easy: "#22C55E", normal: "#F59E0B", hard: "#EF4444" };

export default function SpotDifferencePage() {
  const masterpieces = spotSceneList.filter((s) => s.category === "masterpiece");
  const landmarks = spotSceneList.filter((s) => s.category === "landmark");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white rounded-2xl px-4 py-2 shadow-sm border border-gray-100 mb-4">
            <span className="text-2xl">🔍</span>
            <span className="text-xs font-bold text-purple-600">관찰력 게임</span>
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900">틀린그림 찾기</h1>
          <p className="text-sm text-gray-500 mt-1">
            명화·랜드마크 실제 사진에서 차이점을 발견하세요
          </p>
        </div>

        {/* Section: Masterpieces */}
        <section className="mb-10">
          <h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
            🖼️ 명화 속 차이 찾기
            <span className="text-xs font-normal text-gray-400">공개 도메인 명작 감상</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {masterpieces.map((scene) => (
              <SceneCard key={scene.slug} scene={scene} />
            ))}
          </div>
        </section>

        {/* Section: Landmarks */}
        <section className="mb-8">
          <h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
            🏛️ 세계 랜드마크 차이 찾기
            <span className="text-xs font-normal text-gray-400">세계 유명 명소</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {landmarks.map((scene) => (
              <SceneCard key={scene.slug} scene={scene} />
            ))}
          </div>
        </section>

        <div className="text-center">
          <Link href="/games/observation" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← 관찰력 게임 목록으로
          </Link>
        </div>
      </div>
    </div>
  );
}

function SceneCard({ scene }: { scene: (typeof spotSceneList)[number] }) {
  return (
    <Link href={`/games/spot-difference/${scene.slug}`}>
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-[0.98] group">
        {/* Thumbnail */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/3" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={scene.originalImage}
            alt={scene.source.originalTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {/* Difficulty badge */}
          <span
            className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full text-white shadow"
            style={{ background: DIFF_COLORS[scene.difficulty] }}
          >
            {DIFF_LABELS[scene.difficulty]}
          </span>
        </div>
        {/* Info */}
        <div className="p-3">
          <h3 className="font-bold text-sm text-gray-900 leading-tight">{scene.title}</h3>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{scene.source.artistOrPlace}{scene.source.year ? ` (${scene.source.year})` : ""}</p>
          <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
            <span>차이점 {scene.differences.length}개</span>
            <span>·</span>
            <span>⏱ {scene.timeLimit}초</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
