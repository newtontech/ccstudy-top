<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# CCStudy.top - AI Coding Agent 完整指南

> 本文件面向 AI Coding Agent，提供 Claude Code 源码解读网站的开发指南、架构说明和最佳实践。

## 项目概述

**项目类型**: Next.js 14 静态网站 (App Router)
**目标**: 创建交互式、动画丰富的 Claude Code 源码解读网站
**部署地址**: `https://newtontech.github.io/ccstudy-top/`
**源码解读对象**: `/home/yhm/desktop/code/claude-code-main/`

## 技术架构

### 核心依赖
```json
{
  "next": "^14.x",
  "react": "^18.x",
  "typescript": "^5.x",
  "tailwindcss": "^3.x",
  "framer-motion": "^11.x",
  "shiki": "^1.x",
  "next-themes": "^0.x"
}
```

### 关键设计决策

1. **App Router + SSG**
   - 使用 Next.js 14 App Router
   - 配置 `output: 'export'` 实现静态导出
   - 服务端组件（默认）+ 客户端组件（`'use client'`）混合

2. **CSS 变量主题系统**
   - 不使用 Tailwind dark mode class 策略
   - 自定义 CSS 变量实现主题切换
   - 通过 `next-themes` 管理主题状态

3. **动画架构**
   - **Framer Motion**: 组件级动画、手势交互
   - **CSS @keyframes**: 背景漂浮、循环动画
   - **SVG 动画**: 架构图连线流动、节点脉冲

## 目录结构

```
ccstudy-top/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # 首页
│   │   ├── layout.tsx          # 根布局
│   │   ├── globals.css         # 全局样式
│   │   ├── architecture/       # 系统架构页面
│   │   ├── entry/              # 入口流程页面
│   │   ├── tools/              # 工具系统页面
│   │   ├── commands/           # 命令系统页面
│   │   ├── ink/                # Ink 框架页面
│   │   ├── plugins/            # 插件系统页面
│   │   ├── assistant/          # KAIROS 助手页面
│   │   ├── coordinator/        # 多智能体协调页面
│   │   ├── hooks/              # Hooks 系统页面
│   │   ├── buddy/              # Buddy 伴侣页面
│   │   └── about/              # 关于页面
│   │
│   └── components/
│       ├── HeroSection.tsx     # Hero 区域
│       ├── ArchitectureMap/    # 交互式架构地图
│       ├── FeatureGrid.tsx     # 模块卡片网格
│       ├── ModuleLayout.tsx    # 模块页面布局
│       ├── CodeBlock.tsx       # 代码高亮
│       ├── CodeFlow.tsx        # 代码流程演示
│       ├── animations/         # 动画组件库
│       ├── Navbar.tsx          # 导航栏
│       ├── Footer.tsx          # 页脚
│       └── ThemeProvider.tsx   # 主题上下文
│
├── public/                     # 静态资源
├── docs/plans/                 # 设计文档
└── dist/                       # 构建输出
```

## 组件开发指南

### 1. 动画组件模式

#### ScrollReveal - 滚动触发动画
```tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ScrollReveal({ children, delay = 0, direction = 'up' }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const offset = {
    up: { x: 0, y: 40 },
    down: { x: 0, y: -40 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
```

#### 脉冲节点动画
```tsx
<motion.div
  animate={{
    scale: [1, 1.05, 1],
    boxShadow: [
      '0 0 0px rgba(124, 58, 237, 0)',
      '0 0 20px rgba(124, 58, 237, 0.4)',
      '0 0 0px rgba(124, 58, 237, 0)',
    ],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  }}
/>
```

### 2. SVG 架构图组件

#### MapNode - 可交互节点
```tsx
interface MapNodeProps {
  node: MapNodeData;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

export function MapNode({ node, isHovered, onHover }: MapNodeProps) {
  const colors = categoryColors[node.category];

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={() => onHover(null)}
      className="cursor-pointer"
    >
      {/* Glow effect */}
      <circle
        cx={node.x}
        cy={node.y}
        r={node.width / 2 + 10}
        fill={colors.glow}
        opacity={isHovered ? 0.6 : 0.2}
      />

      {/* Main node rect */}
      <rect
        x={node.x - node.width / 2}
        y={node.y - node.height / 2}
        width={node.width}
        height={node.height}
        rx={8}
        fill={isHovered ? colors.light : colors.base}
      />

      {/* Label */}
      <text
        x={node.x}
        y={node.y}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-white text-sm font-medium"
      >
        {node.label}
      </text>
    </motion.g>
  );
}
```

#### MapEdge - 流动连线
```tsx
export function MapEdge({ source, target, isHighlighted }: MapEdgeProps) {
  return (
    <>
      {/* Base line */}
      <line
        x1={source.x}
        y1={source.y}
        x2={target.x}
        y2={target.y}
        stroke="var(--text-secondary)"
        strokeWidth={1}
        opacity={isHighlighted ? 0.8 : 0.3}
      />

      {/* Flowing animation line */}
      {isHighlighted && (
        <line
          x1={source.x}
          y1={source.y}
          x2={target.x}
          y2={target.y}
          stroke="var(--accent-cyan)"
          strokeWidth={2}
          strokeDasharray="5 5"
          className="animate-flow"
        />
      )}
    </>
  );
}
```

### 3. CSS 关键帧动画

```css
/* globals.css */
@keyframes drift1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(60px, 40px) scale(1.05); }
  50% { transform: translate(30px, 80px) scale(0.95); }
  75% { transform: translate(-20px, 30px) scale(1.02); }
}

@keyframes flow {
  to { stroke-dashoffset: -20; }
}

.animate-flow {
  animation: flow 1s linear infinite;
}
```

## 样式系统

### CSS 变量定义
```css
/* globals.css */
:root {
  /* Background */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;

  /* Text */
  --text-primary: #0f172a;
  --text-secondary: #64748b;

  /* Accents */
  --accent-purple: #7c3aed;
  --accent-blue: #2563eb;
  --accent-cyan: #06b6d4;

  /* Card */
  --card-bg: #ffffff;
  --card-border: #e2e8f0;
}

.dark {
  --bg-primary: #0a0a0f;
  --bg-secondary: #12121a;
  --text-primary: #f1f5f9;
  --text-secondary: #94a3b8;
  --card-bg: rgba(30, 30, 40, 0.6);
  --card-border: rgba(255, 255, 255, 0.1);
}
```

### Tailwind 配置
```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'flow': 'flow 1s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
    },
  },
};
```

## 页面开发模板

### 模块详情页
```tsx
// app/[module]/page.tsx
import { ModuleLayout } from '@/components/ModuleLayout';
import { CodeBlock } from '@/components/CodeBlock';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

export default function ModulePage() {
  return (
    <ModuleLayout
      title="模块名称"
      subtitle="模块描述"
      icon="🚀"
      category="分类"
      relatedModules={[...]}
    >
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="概述" />
          <p className="text-[var(--text-secondary)]">
            内容...
          </p>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
```

## Claude Code 源码关键点

### 模块分类颜色
```typescript
const categoryColors = {
  entry: { base: '#f59e0b', light: '#fbbf24', dark: '#d97706', glow: 'rgba(245, 158, 11, 0.4)' },
  core: { base: '#7c3aed', light: '#a78bfa', dark: '#6d28d9', glow: 'rgba(124, 58, 237, 0.4)' },
  tools: { base: '#2563eb', light: '#60a5fa', dark: '#1d4ed8', glow: 'rgba(37, 99, 235, 0.4)' },
  commands: { base: '#4f46e5', light: '#818cf8', dark: '#4338ca', glow: 'rgba(79, 70, 229, 0.4)' },
  ui: { base: '#06b6d4', light: '#22d3ee', dark: '#0891b2', glow: 'rgba(6, 182, 212, 0.4)' },
  extensions: { base: '#10b981', light: '#34d399', dark: '#059669', glow: 'rgba(16, 185, 129, 0.4)' },
  infra: { base: '#f43f5e', light: '#fb7185', dark: '#e11d48', glow: 'rgba(244, 63, 94, 0.4)' },
};
```

### 关键文件大小
- `main.tsx`: ~785KB
- `ink.tsx`: ~252KB
- `commands/`: 85+ 目录
- `tools/`: 44 个工具目录
- `components/`: 300+ 组件
- `hooks/`: 80+ hooks

### 核心模块清单
1. **main.tsx** - 应用入口
2. **bootstrap/** - 系统初始化
3. **cli/** - 命令行解析
4. **query/** - 查询引擎
5. **context/** - 上下文管理
6. **tools/** - 工具系统 (40+)
7. **commands/** - 命令系统 (40+)
8. **ink/** - 终端 UI 渲染器
9. **components/** - UI 组件库
10. **hooks/** - React Hooks
11. **plugins/** - 插件系统
12. **skills/** - 技能框架
13. **assistant/** - KAIROS 助手
14. **coordinator/** - 多智能体协调
15. **buddy/** - 伴侣系统
16. **services/** - 核心服务
17. **memdir/** - 持久化内存
18. **bridge/** - 远程桥接
19. **state/** - 状态管理

## 性能优化清单

- [ ] 使用 `next/font` 优化字体加载
- [ ] 图片使用 Next.js Image 组件
- [ ] 动画使用 `transform` 和 `opacity` (GPU 加速)
- [ ] 滚动动画使用 `once: true` 避免重复触发
- [ ] 大型组件使用动态导入
- [ ] SVG 使用 `will-change: transform`

## GitHub Pages 部署

```js
// next.config.js
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  basePath: '/ccstudy-top',
  images: {
    unoptimized: true,
  },
};
```

## 调试技巧

### 动画调试
```tsx
// 减慢动画
<motion.div transition={{ duration: 5 }} />

// 强制播放动画
import { MotionConfig } from 'framer-motion';
<MotionConfig reducedMotion="never">
  {children}
</MotionConfig>
```

### 主题调试
```javascript
// 浏览器控制台切换主题
document.documentElement.classList.toggle('dark');
```

## 常见错误

1. **Hydration mismatch**: 服务端/客户端渲染不一致
   - 解决: 使用 `suppressHydrationWarning`
   - 主题样式使用 CSS 变量

2. **SVG viewBox**: 确保与内容尺寸匹配

3. **Framer Motion layoutId**: 确保页面内唯一

4. **静态导出**: 图片必须 `unoptimized: true`

## 扩展建议

1. **搜索功能**: FlexSearch 或 Algolia
2. **代码沙盒**: StackBlitz 嵌入
3. **键盘导航**: 方向键控制架构图
4. **进度追踪**: localStorage 记录学习进度
5. **PWA 支持**: 离线访问

## 参考资源

- [Framer Motion](https://www.framer.com/motion/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shiki](https://shiki.style/)
