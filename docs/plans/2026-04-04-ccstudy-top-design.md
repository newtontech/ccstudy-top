# CCStudy.top - Claude Code 源码解读网站设计文档

**日期**: 2026-04-04
**状态**: 已确认

## 目标

构建一个生动形象、带动画效果的网站，完整详细解读 Claude Code 源代码架构。面向开发者和科技爱好者，兼顾深度技术分析和直观可视化。

## 网站结构

```
ccstudy.top/
├── 首页 (/)              - 交互式架构全景图（大型 SVG 动画地图）
├── /architecture         - 系统架构深度解读
├── /entry                - 入口点与启动流程
├── /tools                - 40+ 工具系统详解
├── /commands             - 命令系统详解
├── /ink                  - React 终端 UI 框架
├── /plugins              - 插件与 MCP 系统
├── /assistant            - KAIROS 模式
├── /coordinator          - 多智能体协调
├── /hooks                - React Hooks 系统
├── /buddy                - Buddy 伴侣系统
└── /about                - 关于本站
```

## 首页设计

- **Hero 区域**: 动画标题 + 粒子/流光背景效果
- **核心区域**: 大型交互式 SVG 架构图
  - 约 15 个核心模块节点
  - 发光效果 + 脉冲动画
  - 连线有数据流动动画
  - Hover: 缩放 + 阴影 + 模块简介浮窗
  - 点击: 跳转模块详情页
- **底部**: 快速导航卡片网格

## 子页面模板

每个模块页面包含:
1. **模块概述**: 动画标题 + 简介文字
2. **内部架构图**: 该模块的结构图
3. **代码流程动画**: Step-by-step 执行路径可视化
4. **关键源码解读**: 带高亮和注释的代码片段
5. **交互式演示**: 模拟输入/输出
6. **关联模块**: 链接到相关模块

## 动画效果

- **滚动触发**: Framer Motion 渐入动画
- **架构图**: SVG 节点脉冲 + 连线流动 + Hover 缩放发光
- **代码高亮**: 逐行高亮 + 注释弹出
- **流程图**: 数据在节点间流动动画
- **主题切换**: 白色(默认) ↔ 暗色渐变紫蓝，平滑过渡

## 技术栈

| 类别 | 选择 | 理由 |
|------|------|------|
| 框架 | Next.js 14 (App Router) | SSG 静态导出、SEO 友好 |
| 语言 | TypeScript | 类型安全 |
| 样式 | Tailwind CSS | 快速开发、响应式 |
| 动画 | Framer Motion | React 生态最佳动画库 |
| 代码高亮 | Shiki | 服务端渲染、主题丰富 |
| 图表 | 自绘 SVG | 完全可控、动画友好 |
| 主题 | next-themes | 白色默认 + 暗色切换 |
| 字体 | Inter + JetBrains Mono | 正文 + 代码 |

## 视觉风格

- **默认**: 白色背景 + 蓝色/紫色强调
- **暗色**: 深色背景 + 渐变紫/蓝/青 + 发光效果（类似 Anthropic 官网）
- **地图**: 高品质 SVG，渐变节点 + 发光连线 + 脉冲动画

## 部署方案

- **仓库**: GitHub `ccstudy-top`
- **CI/CD**: GitHub Actions
  - `main` 分支 push 触发
  - `next build` + 静态导出
  - 部署到 `gh-pages` 分支
- **域名**: 阿里云 DNS 解析 ccstudy.top → GitHub Pages
- **CNAME**: 仓库内 CNAME 文件

## 性能优化

- 静态导出（SSG），零服务器成本
- 动画懒加载（滚动到可视区域触发）
- 代码分割 + 图片优化
- 响应式设计（移动端适配）

## Claude Code 核心模块分析

基于源码分析，网站将解读以下核心模块：

### 入口与启动
- `main.tsx` - 785KB 主入口，含快速路径优化
- `bootstrap/` - 应用初始化与全局状态
- `cli/` - CLI 入口与参数解析

### 核心引擎
- `tools/` - 40+ 工具实现（BashTool, FileEditTool, AgentTool 等）
- `commands/` - 40+ 命令实现
- `query/` - 查询引擎
- `context/` - 上下文管理（系统信息、项目上下文）

### UI 层
- `ink/` - 自定义 React 终端 UI 框架（250KB+）
- `components/` - 300+ React UI 组件
- `hooks/` - 80+ 自定义 React Hooks

### 扩展系统
- `plugins/` - 插件系统
- `skills/` - 技能系统
- MCP 集成 - Model Context Protocol 完整实现

### 高级功能
- `assistant/` - KAIROS 持久助手模式
- `coordinator/` - 多智能体协调
- `bridge/` - 远程桥接（WebSocket）
- `buddy/` - Tamagotchi 伴侣系统

### 基础设施
- `memdir/` - 持久化内存
- `state/` - 全局状态管理
- `services/` - 核心服务（分析、认证等）
