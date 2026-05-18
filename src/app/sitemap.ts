import type { MetadataRoute } from "next";
import { getAllTestSlugs, getAllCategorySlugs } from "@/lib/data/testRepository";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psychlab.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const testSlugs = getAllTestSlugs();
  const categorySlugs = getAllCategorySlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/tests`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/popular`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/new`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/ranking`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/category/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const testRoutes: MetadataRoute.Sitemap = testSlugs.map((slug) => ({
    url: `${SITE_URL}/test/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...testRoutes];
}
