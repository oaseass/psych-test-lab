import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {},
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/experiments/infinite-mix",
        destination: "/blocked",
        permanent: false,
      },
      {
        source: "/category/sseom",
        destination: "/blocked",
        permanent: false,
      },
      {
        source: "/category/jaemi-byeongmat",
        destination: "/blocked",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
