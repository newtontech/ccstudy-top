import type { NextConfig } from "next";

// 根据环境变量决定 basePath
// - 本地开发: 无 basePath (直接访问 localhost:3000)
// - GitHub Pages: basePath = '/ccstudy-top' (匹配仓库名)
// - 自动截图: 通过 DEPLOY_TARGET 环境变量控制
const getBasePath = () => {
  // 如果明确指定了部署目标
  if (process.env.DEPLOY_TARGET === 'github') {
    return '/ccstudy-top';
  }
  if (process.env.DEPLOY_TARGET === 'local') {
    return '';
  }
  // 默认：生产构建时使用 basePath，开发时不用
  if (process.env.NODE_ENV === 'production') {
    return '/ccstudy-top';
  }
  return '';
};

const basePath = getBasePath();

const nextConfig: NextConfig = {
  output: "export",
  distDir: basePath ? 'dist' : 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath,
  // 添加 assetPrefix 确保资源路径正确
  assetPrefix: basePath || undefined,
};

console.log(`[Next.js Config] NODE_ENV: ${process.env.NODE_ENV}, basePath: "${basePath}"`);

export default nextConfig;
