import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },
  async redirects() {
    return [
      {
        source: "/og-image.png",
        destination: "/opengraph-image",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
