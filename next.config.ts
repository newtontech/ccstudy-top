import type { NextConfig } from "next";

// 自定义域名 ccstudy.top → 无需 basePath
// newtontech.github.io/ccstudy-top/ 会自动重定向到 ccstudy.top
// 所以所有环境统一不使用 basePath
const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
