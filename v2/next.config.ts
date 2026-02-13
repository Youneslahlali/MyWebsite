import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/version2',
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
