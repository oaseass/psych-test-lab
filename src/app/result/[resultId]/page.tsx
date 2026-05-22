import type { Metadata } from "next";
import { decodeResultId } from "@/lib/utils/slug";
import { getPlayableTest } from "@/lib/data/testRepository";
import ResultPageClient from "./ResultPageClient";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psychlab.kr";

interface PageProps {
  params: Promise<{ resultId: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { resultId: encodedResultId } = await params;
  const resultId = decodeResultId(encodedResultId);

  const parts = resultId.split("__");
  if (parts.length < 2) return {};

  const [testSlug, resultTypeId] = parts;
  const playable = getPlayableTest(testSlug);
  if (!playable) return {};

  const result = playable.results.find((r) => r.id === resultTypeId);
  if (!result) return {};

  const title = `${result.title} | ${playable.meta.title}`;
  const description = result.subtitle || result.summary || "";
  const ogImageUrl = `${SITE_URL}/api/og?${new URLSearchParams({
    title: playable.meta.title,
    result: result.title,
    subtitle: result.subtitle ?? "",
  }).toString()}`;

  return {
    title,
    description,
    openGraph: {
      title: result.title,
      description,
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: result.title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default function ResultPage({ params }: PageProps) {
  return <ResultPageClient params={params} />;
}

