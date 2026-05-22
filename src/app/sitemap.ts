import type { MetadataRoute } from "next";
import { getPublicTestSlugs, getActiveCategorySlugs } from "@/lib/data/testRepository";
import { worldcupList } from "@/data/games/worldcupData";
import { balanceGameList } from "@/data/games/balanceData";
import { initialQuizList } from "@/data/games/initialQuizData";
import { spotSceneList } from "@/data/games/spotDifferenceData";
import { pollList } from "@/data/pollsData";
import { generatorList } from "@/data/generatorData";
import { experimentsList } from "@/data/experimentsData";
import { storyList } from "@/data/storyData";
import { bingoList } from "@/data/bingoData";
import { gaugeList } from "@/data/gaugeData";
import { LUCKY_GAMES } from "@/data/luckyGames";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://psychlab.kr";

export default function sitemap(): MetadataRoute.Sitemap {
  const testSlugs = getPublicTestSlugs();
  const categorySlugs = getActiveCategorySlugs();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1.0 },
    { url: `${SITE_URL}/tests`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/categories`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/experiments`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/story`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/bingo`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/gauge`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/lucky`, changeFrequency: "weekly", priority: 0.75 },
    { url: `${SITE_URL}/lucky/history`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/surprise`, changeFrequency: "daily", priority: 0.7 },
    { url: `${SITE_URL}/games`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/games/worldcup`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/games/balance`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/games/initial-quiz`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/games/spot-difference`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/together`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/polls`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/generator`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/popular`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/new`, changeFrequency: "daily", priority: 0.8 },
    { url: `${SITE_URL}/search`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE_URL}/missions`, changeFrequency: "daily", priority: 0.75 },
    { url: `${SITE_URL}/shop`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/shop/history`, changeFrequency: "never", priority: 0.3 },
    { url: `${SITE_URL}/badges`, changeFrequency: "weekly", priority: 0.65 },
    { url: `${SITE_URL}/invite`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/my/results`, changeFrequency: "never", priority: 0.3 },
    { url: `${SITE_URL}/my/points`, changeFrequency: "never", priority: 0.3 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/category/${slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const testRoutes: MetadataRoute.Sitemap = testSlugs.map((slug) => ({
    url: `${SITE_URL}/test/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const worldcupRoutes: MetadataRoute.Sitemap = worldcupList.map((w) => ({
    url: `${SITE_URL}/games/worldcup/${w.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const balanceRoutes: MetadataRoute.Sitemap = balanceGameList.map((b) => ({
    url: `${SITE_URL}/games/balance/${b.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const initialQuizRoutes: MetadataRoute.Sitemap = initialQuizList.map((q) => ({
    url: `${SITE_URL}/games/initial-quiz/${q.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const spotRoutes: MetadataRoute.Sitemap = spotSceneList.map((s) => ({
    url: `${SITE_URL}/games/spot-difference/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const pollRoutes: MetadataRoute.Sitemap = pollList.map((p) => ({
    url: `${SITE_URL}/polls/${p.slug}`,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const generatorRoutes: MetadataRoute.Sitemap = generatorList.map((g) => ({
    url: `${SITE_URL}/generator/${g.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const HIDDEN_EXPERIMENT_SLUGS = new Set(["infinite-mix"]);
  const experimentRoutes: MetadataRoute.Sitemap = experimentsList
    .filter((e) => !HIDDEN_EXPERIMENT_SLUGS.has(e.slug))
    .map((e) => ({
      url: `${SITE_URL}/experiments/${e.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const storyRoutes: MetadataRoute.Sitemap = storyList.map((s) => ({
    url: `${SITE_URL}/story/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const bingoRoutes: MetadataRoute.Sitemap = bingoList.map((b) => ({
    url: `${SITE_URL}/bingo/${b.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const gaugeRoutes: MetadataRoute.Sitemap = gaugeList.map((g) => ({
    url: `${SITE_URL}/gauge/${g.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const luckyRoutes: MetadataRoute.Sitemap = LUCKY_GAMES.map((g) => ({
    url: `${SITE_URL}${g.route}`,
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...testRoutes,
    ...worldcupRoutes,
    ...balanceRoutes,
    ...initialQuizRoutes,
    ...spotRoutes,
    ...pollRoutes,
    ...generatorRoutes,
    ...experimentRoutes,
    ...storyRoutes,
    ...bingoRoutes,
    ...gaugeRoutes,
    ...luckyRoutes,
  ];
}
