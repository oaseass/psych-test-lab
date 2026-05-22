export async function GET() {
  return Response.json(
    {
      ok: true,
      deploymentPurpose: "hard-block-infinite-mix-sseom-jaemi-byeongmat",
      blockedPaths: [
        "/experiments/infinite-mix",
        "/category/sseom",
        "/category/jaemi-byeongmat",
      ],
      buildTime: new Date().toISOString(),
    },
    {
      headers: {
        "cache-control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
