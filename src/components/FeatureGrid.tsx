"use client";

import { ModuleCard } from "./ModuleCard";
import { SectionTitle } from "./SectionTitle";
import { ScrollReveal } from "./animations/ScrollReveal";

const modules = [
  {
    title: "系统架构",
    description: "Claude Code 的整体架构与核心设计模式",
    icon: "🏗️",
    href: "/architecture",
    color: "#7c3aed",
  },
  {
    title: "入口与启动",
    description: "从 main.tsx 到应用就绪的完整启动流程",
    icon: "🚀",
    href: "/entry",
    color: "#f59e0b",
  },
  {
    title: "工具系统",
    description: "40+ 内置工具的实现与扩展机制",
    icon: "🔧",
    href: "/tools",
    color: "#2563eb",
  },
  {
    title: "命令系统",
    description: "命令行界面的完整命令参考与实现",
    icon: "⌨️",
    href: "/commands",
    color: "#4f46e5",
  },
  {
    title: "Ink UI框架",
    description: "基于 React 的终端 UI 渲染框架",
    icon: "🎨",
    href: "/ink",
    color: "#06b6d4",
  },
  {
    title: "插件与MCP",
    description: "插件系统、技能系统与 Model Context Protocol",
    icon: "🔌",
    href: "/plugins",
    color: "#10b981",
  },
  {
    title: "KAIROS 助手",
    description: "持久化运行的 AI 助手模式",
    icon: "🤖",
    href: "/assistant",
    color: "#8b5cf6",
  },
  {
    title: "多智能体协调",
    description: "Coordinator 模式的多 Agent 编排系统",
    icon: "🕸️",
    href: "/coordinator",
    color: "#ec4899",
  },
  {
    title: "Hooks 系统",
    description: "80+ 自定义 React Hooks 详解",
    icon: "🪝",
    href: "/hooks",
    color: "#14b8a6",
  },
  {
    title: "Buddy 伴侣",
    description: "Tamagotchi 风格的确定性行囊系统",
    icon: "🐣",
    href: "/buddy",
    color: "#f97316",
  },
];

export function FeatureGrid() {
  return (
    <div>
      <SectionTitle
        title="探索模块"
        subtitle="点击卡片深入了解每个模块"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((mod, i) => (
          <ScrollReveal key={mod.href} delay={i * 0.08}>
            <ModuleCard {...mod} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
