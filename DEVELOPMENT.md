# 开发与部署指南

## 快速开始

```bash
# 本地开发（热更新）
npm run dev

# 本地预览（无 basePath，直接访问 localhost:3000）
npm run preview:local

# GitHub Pages 预览（带 basePath=/ccstudy-top）
npm run preview:github
```

## 构建配置

项目支持双环境构建，通过 `DEPLOY_TARGET` 环境变量控制：

| 模式 | 命令 | basePath | 输出目录 | 访问路径 |
|------|------|----------|----------|----------|
| 本地 | `npm run build:local` | 无 | `out/` | `/` |
| GitHub Pages | `npm run build:github` | `/ccstudy-top` | `dist/` | `/ccstudy-top/` |

### 配置原理

`next.config.ts` 根据环境自动判断：

```typescript
const getBasePath = () => {
  if (process.env.DEPLOY_TARGET === 'github') {
    return '/ccstudy-top';
  }
  if (process.env.NODE_ENV === 'production' && !process.env.DEPLOY_TARGET) {
    return '/ccstudy-top';  // 默认生产构建使用 GitHub Pages 配置
  }
  return '';  // 本地开发无 basePath
};
```

## 可用脚本

### 开发
- `npm run dev` - 启动 Next.js 开发服务器（热更新）

### 构建
- `npm run build` - 默认构建（使用 GitHub Pages 配置）
- `npm run build:local` - 本地构建（无 basePath）
- `npm run build:github` - GitHub Pages 构建（有 basePath）

### 预览
- `npm run serve` - 启动本地静态服务器（需要先有 out/ 目录）
- `npm run serve:github` - 启动 GitHub Pages 预览服务器
- `npm run preview:local` - 构建并启动本地预览
- `npm run preview:github` - 构建并启动 GitHub Pages 预览

### 截图测试
- `npm run screenshot <url>` - 对指定 URL 截图
- `npm run screenshot:local` - 自动构建、启动服务器并截图
- `npm run screenshot:github` - 自动构建 GitHub 版本、启动服务器并截图

## 自动截图测试

### 基础用法

```bash
# 截图本地开发服务器
node scripts/screenshot-test.mjs http://localhost:3000/

# 截图 GitHub Pages 预览
node scripts/screenshot-test.mjs http://localhost:3000/ccstudy-top/

# 指定输出文件和尺寸
node scripts/screenshot-test.mjs http://localhost:3000/ \
  -o docs/preview.png \
  --width 1920 \
  --height 1080 \
  --full-page
```

### 一键截图（自动构建+启动服务器）

```bash
# 本地模式
npm run screenshot:local

# GitHub Pages 模式
npm run screenshot:github
```

截图将保存到 `e2e-screenshots/` 目录。

## 部署到 GitHub Pages

### 自动部署（推荐）

项目已配置 GitHub Actions，推送代码到 `main` 分支会自动部署。

### 手动部署

```bash
# 1. 构建 GitHub Pages 版本
npm run build:github

# 2. 部署 dist/ 目录到 GitHub Pages
# 可通过 GitHub 控制台或 gh 命令行工具完成
```

## 目录结构

```
ccstudy-top/
├── out/                    # 本地构建输出（无 basePath）
├── dist/                   # GitHub Pages 构建输出（有 basePath）
├── dist-preview/           # GitHub Pages 预览目录（临时）
├── e2e-screenshots/        # 截图测试结果
├── scripts/
│   ├── dev-server.mjs      # 开发服务器启动脚本
│   └── screenshot-test.mjs # 自动化截图脚本
└── next.config.ts          # Next.js 配置（双环境支持）
```

## 常见问题

### Q: 本地双击打开 HTML 文件为什么样式丢失？

A: 因为构建使用了绝对路径（如 `/_next/static/...` 或 `/ccstudy-top/_next/static/...`），必须通过 HTTP 服务器访问。使用 `npm run preview:local` 或 `npm run preview:github`。

### Q: 如何同时支持本地调试和 GitHub Pages？

A: 使用环境变量控制构建：
- 本地调试：`npm run build:local` → 访问 `http://localhost:3000/`
- GitHub Pages：`npm run build:github` → 访问 `http://localhost:3000/ccstudy-top/`

### Q: 截图测试需要安装什么？

A: 需要安装 Playwright：
```bash
npm install -D playwright
npx playwright install chromium
```

或使用 MCP Playwright 工具直接截图。
