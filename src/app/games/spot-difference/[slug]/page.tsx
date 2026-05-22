import { notFound } from "next/navigation";
import { spotSceneList } from "@/data/games/spotDifferenceData";
import SpotDifferenceGame from "@/components/games/SpotDifferenceGame";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return spotSceneList.map((s) => ({ slug: s.slug }));
}

export default async function SpotDifferencePlayPage({ params }: PageProps) {
  const { slug } = await params;
  const scene = spotSceneList.find((s) => s.slug === slug);
  if (!scene) notFound();

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #F5F3FF, #FDF4FF)" }}>
      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
          <Link href="/games/spot-difference" className="hover:text-gray-600 transition-colors">
            틀린그림 찾기
          </Link>
          <span>/</span>
          <span className="text-gray-600 font-semibold">{scene.title}</span>
        </div>

        {/* Subtitle */}
        <p className="text-sm text-gray-500 mb-5 text-center">{scene.subtitle}</p>

        {/* Game */}
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
          <SpotDifferenceGame scene={scene} />
        </div>
      </div>
    </div>
  );
}
