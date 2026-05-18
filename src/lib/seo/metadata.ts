import type { Metadata } from "next";
import type { TestMeta, TestResult, TestCategory } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psychlab.kr";
const SITE_NAME = "심심풀이 연구소";
const DEFAULT_DESCRIPTION = "무료 심리테스트 · 이상형 월드컵 · 밸런스게임 · 초성퀴즈 · 투표 · 생성기! 심심할 때 3분씩 즐기는 퀴즈/게임/테스트 포털. 지금 바로 시작해보세요.";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export function buildSiteMetadata(): Metadata {
  return {
    title: {
      default: `${SITE_NAME} | 심리테스트·월드컵·퀴즈·밸런스게임 무료`,
      template: `%s | ${SITE_NAME}`,
    },
    keywords: ["심리테스트", "이상형 월드컵", "밸런스게임", "초성퀴즈", "넌센스퀴즈", "무료테스트", "심심풀이", "성격테스트", "MBTI", "연애테스트"],
    description: DEFAULT_DESCRIPTION,
    metadataBase: new URL(SITE_URL),
    openGraph: {
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: SITE_URL,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function buildTestMetadata(meta: TestMeta): Metadata {
  const title = `${meta.title}`;
  const description = meta.description || meta.hook;
  const url = `${SITE_URL}/test/${meta.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: url,
    },
  };
}

export function buildResultMetadata(
  meta: TestMeta,
  result: TestResult,
  resultId: string
): Metadata {
  const title = `${meta.title} 결과: ${result.title}`;
  const description = `${result.summary.slice(0, 120)}...`;
  const url = `${SITE_URL}/result/${resultId}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: false, // 결과 페이지는 색인하지 않음 (중복 방지)
    },
  };
}

export function buildCategoryMetadata(category: TestCategory): Metadata {
  const title = `${category.name} 심리테스트`;
  const description = `${category.description} 관련 심리테스트를 무료로 즐겨보세요.`;
  const url = `${SITE_URL}/category/${category.slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [DEFAULT_OG_IMAGE],
    },
    alternates: {
      canonical: url,
    },
  };
}
