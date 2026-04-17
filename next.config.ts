import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: "D:/marketplace/my-app",
  },
  cacheComponents:true
};

export default nextConfig;
