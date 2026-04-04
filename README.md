# CCStudy.top - Claude Code 源码解读网站

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38B2AC)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-11-ff69b4)](https://www.framer.com/motion/)

> 生动形象的 Claude Code 源代码架构解读，带动画效果的交互式学习网站。

🔗 **在线访问**: [https://ccstudy.top](https://ccstudy.top)

## 项目简介

CCStudy.top 是一个专为开发者和科技爱好者打造的技术学习网站，致力于通过可视化和交互式的方式，深入解读 Anthropic 最强 AI 编程助手 Claude Code 的源代码架构。

Claude Code 是业界领先的 AI 编程 CLI 工具，其源代码在 2026 年 3 月通过 npm sourcemap 意外泄露。这份代码展现了当今最复杂的 AI Agent 系统架构设计，包含 40+ 工具、40+ 命令、多智能体协调、自定义 React 终端渲染引擎等核心模块。

## 核心特性

### 1. 交互式架构全景图
首页的大型 SVG 架构地图展示了 Claude Code 的 15+ 核心模块及其关系：
- 发光脉冲动画节点
- 数据流动画连接线
- Hover 缩放与详情浮窗
- 点击跳转到模块详情页

### 2. 深度源码解读
10 个核心模块的详细解析，每个模块包含：
- 架构概述与设计思想
- 内部结构图与数据流
- 关键源码分析与注释
- 交互式代码流程演示
- 关联模块快速导航

### 3. 丰富的动画效果
- **滚动触发动画**: 使用 Framer Motion 实现元素渐入效果
- **架构图动画**: SVG 节点脉冲、连线流动、Hover 发光
- **代码高亮**: 逐行高亮与注释弹出
- **主题切换**: 白色/暗色模式平滑过渡

### 4. 技术栈
| 类别 | 技术 | 说明 |
|------|------|------|
| 框架 | Next.js 14 (App Router) | React 服务端组件、SSG 静态导出 |
| 语言 | TypeScript | 类型安全、更好的 IDE 支持 |
| 样式 | Tailwind CSS | 原子化 CSS、响应式设计 |
| 动画 | Framer Motion | React 生态最佳动画库 |
| 字体 | Inter + JetBrains Mono | 正文与代码专用字体 |

## 项目结构

```
ccstudy-top/
├── src/
│   ├── app/                    # Next.js App Router 页面
│   │   ├── page.tsx            # 首页（Hero + 架构图 + 模块网格）
│   │   ├── layout.tsx          # 根布局（主题、字体、元数据）
│   │   ├── globals.css         # 全局样式与 CSS 变量
│   │   ├── architecture/       # 系统架构详解页面
│   │   ├── entry/              # 入口与启动流程页面
│   │   ├── tools/              # 工具系统详解页面
│   │   ├── commands/           # 命令系统详解页面
│   │   ├── ink/                # Ink UI 框架页面
│   │   ├── plugins/            # 插件与 MCP 系统页面
│   │   ├── assistant/          # KAIROS 助手模式页面
│   │   ├── coordinator/        # 多智能体协调页面
│   │   ├── hooks/              # React Hooks 系统页面
│   │   ├── buddy/              # Buddy 伴侣系统页面
│   │   └── about/              # 关于页面
│   │
│   └── components/             # React 组件
│       ├── HeroSection.tsx     # 首页 Hero 区域
│       ├── ArchitectureMap/    # 交互式架构地图
│       │   ├── index.tsx       # 地图主组件
│       │   ├── data.ts         # 节点与连接数据
│       │   ├── MapNode.tsx     # 可交互节点组件
│       │   ├── MapEdge.tsx     # 流动连线组件
│       │   └── MapTooltip.tsx  # Hover 提示组件
│       ├── FeatureGrid.tsx     # 模块卡片网格
│       ├── ModuleLayout.tsx    # 模块页面通用布局
│       ├── CodeBlock.tsx       # 代码高亮组件
│       ├── CodeFlow.tsx        # 代码流程演示组件
│       ├── ArchitectureDiagram.tsx # 架构图组件
│       ├── animations/         # 动画组件
│       │   ├── ScrollReveal.tsx    # 滚动触发动画
│       │   ├── TypewriterText.tsx  # 打字机效果
│       │   ├── PulseNode.tsx       # 脉冲节点
│       │   └── FlowingLine.tsx     # 流动线条
│       ├── Navbar.tsx          # 导航栏
│       ├── Footer.tsx          # 页脚
│       └── ThemeProvider.tsx   # 主题上下文
│
├── public/                     # 静态资源
├── docs/plans/                 # 设计文档与规划
├── next.config.js              # Next.js 配置
├── tailwind.config.ts          # Tailwind 配置
└── package.json
```

## Claude Code 核心模块

网站详细解读以下 Claude Code 核心模块：

### 入口与启动
- `main.tsx` (785KB) - 应用程序主入口
- `bootstrap/` - 系统初始化和全局状态
- `cli/` - 命令行参数解析和 REPL 循环

### 核心引擎
- `tools/` - 40+ 工具实现（BashTool、FileEditTool、AgentTool 等）
- `commands/` - 40+ 命令实现（/help、/clear、/compact 等）
- `query/` - 查询引擎和消息流管理
- `context/` - 上下文管理和系统提示词组装

### UI 层
- `ink/` - 自定义 React 终端 UI 框架 (250KB+)
- `components/` - 300+ React UI 组件
- `hooks/` - 80+ 自定义 React Hooks

### 扩展系统
- `plugins/` - 插件系统与 MCP 集成
- `skills/` - 技能框架
- `assistant/` - KAIROS 持久助手模式
- `coordinator/` - 多智能体协调
- `buddy/` - Tamagotchi 伴侣系统

### 基础设施
- `memdir/` - 持久化内存和项目配置
- `state/` - 全局状态管理
- `services/` - 核心服务（分析、认证等）
- `bridge/` - 远程桥接（WebSocket）

## 本地开发

### 环境要求
- Node.js 18+
- npm / yarn / pnpm

### 安装依赖

```bash
cd /home/yhm/desktop/code/ccstudy-top
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 构建生产版本

```bash
npm run build
```

生成静态导出到 `dist/` 目录。

### 代码检查

```bash
npm run lint
```

## 动画实现详解

### 1. Hero 区域背景动画
使用 CSS `@keyframes` 实现三个渐变圆的漂浮动画：

```css
@keyframes drift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(60px, 40px) scale(1.05); }
  50% { transform: translate(30px, 80px) scale(0.95); }
  75% { transform: translate(-20px, 30px) scale(1.02); }
}
```

### 2. 滚动触发动画
使用 Framer Motion 的 `useInView` hook：

```tsx
const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};
```

### 3. 架构图节点脉冲
使用 Framer Motion 的 `animate` 属性：

```tsx
<motion.circle
  animate={{
    scale: isHovered ? 1.15 : [1, 1.05, 1],
    filter: isHovered
      ? `drop-shadow(0 0 12px ${glowColor})`
      : `drop-shadow(0 0 4px ${glowColor})`,
  }}
  transition={{
    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
  }}
/>
```

### 4. 连线流动动画
使用 SVG `stroke-dasharray` 和 CSS 动画：

```css
@keyframes flow {
  to { stroke-dashoffset: -20; }
}
.flowing-line {
  stroke-dasharray: 5 5;
  animation: flow 1s linear infinite;
}
```

## 主题系统

网站支持白色和暗色两种主题：

```css
/* 白色主题（默认） */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --accent-purple: #7c3aed;
  --accent-blue: #2563eb;
  --accent-cyan: #06b6d4;
}

/* 暗色主题 */
.dark {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
}
```

## 部署

### GitHub Pages
1. 推送代码到 GitHub 仓库
2. GitHub Actions 自动构建并部署到 `gh-pages` 分支
3. 配置自定义域名 `ccstudy.top`

### 手动部署
```bash
npm run build
# 将 dist/ 目录内容上传到服务器
```

## 学习路径推荐

如果你是第一次访问，建议按以下顺序学习：

1. **首页** - 浏览交互式架构图，建立整体认知
2. **系统架构** (/architecture) - 了解五层架构设计
3. **入口与启动** (/entry) - 理解应用启动流程
4. **工具系统** (/tools) - 掌握 40+ 工具的使用和原理
5. **命令系统** (/commands) - 了解命令行界面的实现
6. **Ink UI框架** (/ink) - 学习终端 React 渲染原理
7. **其他模块** - 根据兴趣深入探索

## 参考资料

- [Claude Code 泄露源码分析](https://github.com/kuberwastaken/claude-code) - 原始泄露代码仓库
- [Kuber Mehta 的深度分析](https://kuber.studio/blog/AI/Claude-Code's-Entire-Source-Code-Got-Leaked-via-a-Sourcemap-in-npm,-Let's-Talk-About-it) - 详细的源码解读文章
- [Next.js 文档](https://nextjs.org/docs)
- [Framer Motion 文档](https://www.framer.com/motion/)

## 贡献

欢迎提交 Issue 和 PR！

## 许可证

本项目仅用于学习研究目的。Claude Code 源代码版权归 Anthropic 所有。

---

Made with ❤️ for the AI coding community.
