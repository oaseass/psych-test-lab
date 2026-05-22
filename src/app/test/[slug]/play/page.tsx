import { notFound } from "next/navigation";
import Link from "next/link";
import { getPlayableTest, getPlayableTests } from "@/lib/data/testRepository";
import { POLISHED_SLUGS } from "@/data/playableSlugs";
import TestPlayer from "@/components/play/TestPlayer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Array.from(POLISHED_SLUGS).map((slug) => ({ slug }));
}

export default async function PlayPage({ params }: PageProps) {
  const { slug } = await params;

  // polished 목록에 없으면 404 처리 — 준비 중 화면 노출 금지
  if (!POLISHED_SLUGS.has(slug)) notFound();

  // 서버에서 테스트 데이터를 미리 생성
  const playable = getPlayableTest(slug);
  if (!playable) notFound();

  return <TestPlayer initialTest={playable} slug={slug} />;
}
