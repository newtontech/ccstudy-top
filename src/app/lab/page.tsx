"use client";

import { useState } from "react";
import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import { CodeBlock } from "@/components/CodeBlock";

/* ------------------------------------------------------------------ */
/*  Data: 5 Lab Steps                                                  */
/* ------------------------------------------------------------------ */

interface LabStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  concept: string;
  code: string;
  nodes: { id: string; label: string; x: number; y: number; color?: string }[];
  edges: { from: string; to: string; label?: string }[];
  related: { title: string; href: string; icon: string }[];
}

const STEPS: LabStep[] = [
  {
    id: 1,
    title: "最小可行 Agent",
    subtitle: "输入 → LLM → 输出",
    icon: "🧬",
    description:
      "一切从最简单的循环开始：用户输入一段文本，LLM 生成回复。这就是 Agent 的「单细胞」形态——没有工具、没有记忆，但核心回路已经跑通。",
    concept:
      "Claude Code 的启动入口就是这样一个循环：读取 CLI 输入 → 调用 Anthropic API → 流式输出回复。后续所有能力都挂载在这个基础循环上。",
    code: `// 最小可行 Agent — 不到 20 行
async function miniAgent(userInput: string) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: userInput }],
  });

  return response.content[0].text;
}

// 运行
const answer = await miniAgent("用 Python 写一个 Hello World");
console.log(answer);`,
    nodes: [
      { id: "user", label: "👤 用户输入", x: 80, y: 180 },
      { id: "llm", label: "🤖 LLM", x: 340, y: 180, color: "#8b5cf6" },
      { id: "output", label: "📤 输出", x: 600, y: 180 },
    ],
    edges: [
      { from: "user", to: "llm", label: "prompt" },
      { from: "llm", to: "output", label: "completion" },
    ],
    related: [
      { title: "入口与启动", href: "/entry", icon: "🚪" },
      { title: "系统架构", href: "/architecture", icon: "🏗️" },
    ],
  },
  {
    id: 2,
    title: "工具系统",
    subtitle: "让 Agent 能动手做事",
    icon: "🔧",
    description:
      "纯文本 Agent 只能「说」不能「做」。加入工具系统后，Agent 可以读写文件、执行命令、搜索代码。Claude Code 有 40+ 内置工具，但原理都是一样的：注册 → 调用 → 返回结果。",
    concept:
      "Claude Code 的 ToolUse 循环：LLM 决定调用哪个工具 → 执行工具 → 将结果追加到上下文 → LLM 继续推理。这就是 ReAct 模式的实现。",
    code: `// 工具注册
const tools: Tool[] = [
  {
    name: "read_file",
    description: "读取文件内容",
    parameters: { path: { type: "string" } },
    execute: ({ path }) => fs.readFileSync(path, "utf-8"),
  },
  {
    name: "write_file",
    description: "写入文件",
    parameters: { path: { type: "string" }, content: { type: "string" } },
    execute: ({ path, content }) => fs.writeFileSync(path, content),
  },
];

// ReAct 循环
async function agentWithTools(input: string) {
  let messages = [{ role: "user", content: input }];

  while (true) {
    const response = await callLLM(messages, tools);

    if (response.stop_reason === "end_turn") return response.text;

    // 执行工具调用
    for (const toolUse of response.tool_uses) {
      const tool = tools.find(t => t.name === toolUse.name);
      const result = await tool.execute(toolUse.input);
      messages.push({ role: "user", content: toolResult(toolUse, result) });
    }
  }
}`,
    nodes: [
      { id: "user", label: "👤 用户", x: 60, y: 180 },
      { id: "llm", label: "🤖 LLM", x: 260, y: 180, color: "#8b5cf6" },
      { id: "router", label: "🔀 决策", x: 440, y: 100 },
      { id: "tool1", label: "📄 文件", x: 600, y: 50 },
      { id: "tool2", label: "💻 命令", x: 600, y: 150 },
      { id: "output", label: "📤 输出", x: 440, y: 260 },
    ],
    edges: [
      { from: "user", to: "llm" },
      { from: "llm", to: "router", label: "tool_use?" },
      { from: "router", to: "tool1", label: "read/write" },
      { from: "router", to: "tool2", label: "exec" },
      { from: "tool1", to: "llm", label: "result" },
      { from: "tool2", to: "llm", label: "result" },
      { from: "router", to: "output", label: "text" },
    ],
    related: [
      { title: "工具系统", href: "/tools", icon: "🔧" },
      { title: "命令系统", href: "/commands", icon: "⌨️" },
    ],
  },
  {
    id: 3,
    title: "上下文管理",
    subtitle: "让 Agent 理解当前状态",
    icon: "📦",
    description:
      "随着对话变长，上下文窗口会被填满。Claude Code 通过上下文收集（自动读取相关文件）和压缩（摘要 + 截断）来管理 token 预算，确保 Agent 始终「知道自己在做什么」。",
    concept:
      "Claude Code 的 ContextManager 维护一个 token 预算，动态决定哪些内容保留、哪些被压缩。它还会在工具调用时自动将文件内容注入上下文。",
    code: `// 上下文管理器
class ContextManager {
  private messages: Message[] = [];
  private maxTokens = 200_000;

  async addMessage(msg: Message) {
    this.messages.push(msg);
    await this.maybeCompress();
  }

  private async maybeCompress() {
    const total = this.estimateTokens();
    if (total < this.maxTokens * 0.8) return;

    // 保留最近的消息，压缩旧消息
    const recent = this.messages.slice(-10);
    const old = this.messages.slice(0, -10);

    const summary = await callLLM(
      \`请用简洁的语言总结以下对话要点：\${JSON.stringify(old)}\`
    );

    this.messages = [
      { role: "system", content: \`之前的对话摘要：\${summary}\` },
      ...recent,
    ];
  }
}`,
    nodes: [
      { id: "user", label: "👤 用户", x: 60, y: 180 },
      { id: "ctx", label: "📦 上下文", x: 260, y: 80, color: "#06b6d4" },
      { id: "llm", label: "🤖 LLM", x: 440, y: 180, color: "#8b5cf6" },
      { id: "compress", label: "🗜️ 压缩", x: 260, y: 280, color: "#06b6d4" },
      { id: "output", label: "📤 输出", x: 620, y: 180 },
    ],
    edges: [
      { from: "user", to: "ctx" },
      { from: "ctx", to: "llm", label: "prompt" },
      { from: "llm", to: "output" },
      { from: "ctx", to: "compress", label: "超限?" },
      { from: "compress", to: "ctx", label: "摘要" },
    ],
    related: [
      { title: "查询引擎", href: "/architecture", icon: "🔍" },
      { title: "上下文管理", href: "/hooks", icon: "🪝" },
    ],
  },
  {
    id: 4,
    title: "记忆系统",
    subtitle: "让 Agent 记住过去",
    icon: "🧠",
    description:
      "没有记忆的 Agent，每次启动都是「失忆」状态。Claude Code 通过持久化会话历史 + 语义检索，让 Agent 能回顾之前的对话、文件变更和决策上下文。",
    concept:
      "Claude Code 将每次会话保存为 JSON 文件，支持 /resume 恢复。同时通过 Embedding 索引历史决策，在相关场景自动检索。",
    code: `// 记忆系统
interface Memory {
  id: string;
  content: string;
  embedding: number[];
  timestamp: number;
}

class MemorySystem {
  private memories: Memory[] = [];

  async store(content: string) {
    const embedding = await getEmbedding(content);
    this.memories.push({
      id: crypto.randomUUID(),
      content,
      embedding,
      timestamp: Date.now(),
    });
  }

  async recall(query: string, topK = 5): Promise<string[]> {
    const queryEmbedding = await getEmbedding(query);
    const scored = this.memories.map(m => ({
      content: m.content,
      score: cosineSimilarity(queryEmbedding, m.embedding),
    }));
    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(m => m.content);
  }
}`,
    nodes: [
      { id: "user", label: "👤 用户", x: 60, y: 180 },
      { id: "llm", label: "🤖 LLM", x: 300, y: 180, color: "#8b5cf6" },
      { id: "store", label: "💾 存储", x: 520, y: 80, color: "#10b981" },
      { id: "recall", label: "🔍 检索", x: 520, y: 280, color: "#10b981" },
      { id: "output", label: "📤 输出", x: 700, y: 180 },
    ],
    edges: [
      { from: "user", to: "llm" },
      { from: "llm", to: "store", label: "保存" },
      { from: "recall", to: "llm", label: "相关记忆" },
      { from: "store", to: "recall", label: "索引" },
      { from: "llm", to: "output" },
    ],
    related: [
      { title: "插件系统", href: "/plugins", icon: "🔌" },
      { title: "工具系统", href: "/tools", icon: "🔧" },
    ],
  },
  {
    id: 5,
    title: "多 Agent 协调",
    subtitle: "从单兵到团队",
    icon: "🕸️",
    description:
      "复杂任务需要分工协作。Claude Code 的 Coordinator 可以派生子 Agent（SubAgent），每个子 Agent 独立处理子任务，结果汇总后返回。这就是从「个人」到「团队」的进化。",
    concept:
      "Claude Code 的 Coordinator 模式：主 Agent 分析任务 → 拆分为子任务 → 为每个子任务创建独立 Agent → 收集结果 → 综合输出。每个子 Agent 有独立的上下文和工具集。",
    code: `// 多 Agent 协调器
class Coordinator {
  private agents: Agent[] = [];

  async solve(task: string) {
    // 1. 分析并拆分任务
    const subtasks = await this.decompose(task);

    // 2. 并行执行子任务
    const results = await Promise.all(
      subtasks.map(sub => this.spawnAgent(sub).run())
    );

    // 3. 综合结果
    return await this.synthesize(task, results);
  }

  private async decompose(task: string): Promise<SubTask[]> {
    const response = await callLLM(
      \`将任务拆分为可并行执行的子任务：\${task}\`
    );
    return JSON.parse(response.text);
  }

  private spawnAgent(subtask: SubTask): Agent {
    const agent = new Agent({
      tools: this.selectTools(subtask),
      maxTokens: 50_000,
    });
    return agent;
  }
}`,
    nodes: [
      { id: "user", label: "👤 用户", x: 60, y: 200 },
      { id: "coord", label: "🎯 协调器", x: 240, y: 200, color: "#f59e0b" },
      { id: "a1", label: "🤖 Agent A", x: 440, y: 60, color: "#8b5cf6" },
      { id: "a2", label: "🤖 Agent B", x: 440, y: 200, color: "#8b5cf6" },
      { id: "a3", label: "🤖 Agent C", x: 440, y: 340, color: "#8b5cf6" },
      { id: "merge", label: "📊 合并", x: 620, y: 200, color: "#f59e0b" },
      { id: "output", label: "📤 输出", x: 760, y: 200 },
    ],
    edges: [
      { from: "user", to: "coord" },
      { from: "coord", to: "a1", label: "子任务" },
      { from: "coord", to: "a2", label: "子任务" },
      { from: "coord", to: "a3", label: "子任务" },
      { from: "a1", to: "merge" },
      { from: "a2", to: "merge" },
      { from: "a3", to: "merge" },
      { from: "merge", to: "output" },
    ],
    related: [
      { title: "多智能体协调", href: "/coordinator", icon: "🕸️" },
      { title: "助手模式", href: "/assistant", icon: "🤝" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Full Claude Code Architecture (for comparison)                      */
/* ------------------------------------------------------------------ */

const FULL_ARCH_NODES = [
  { id: "cli", label: "CLI 入口", x: 80, y: 50 },
  { id: "session", label: "会话管理", x: 80, y: 150 },
  { id: "ctx", label: "上下文管理", x: 80, y: 250 },
  { id: "perm", label: "权限系统", x: 80, y: 350 },
  { id: "llm", label: "LLM 核心", x: 300, y: 200, color: "#8b5cf6" },
  { id: "tools", label: "40+ 工具", x: 520, y: 80 },
  { id: "memory", label: "记忆系统", x: 520, y: 200, color: "#10b981" },
  { id: "coord", label: "多 Agent", x: 520, y: 320, color: "#f59e0b" },
  { id: "hooks", label: "Hook 系统", x: 300, y: 370 },
  { id: "output", label: "输出渲染", x: 700, y: 200 },
];

const FULL_ARCH_EDGES = [
  { from: "cli", to: "session" },
  { from: "session", to: "ctx" },
  { from: "ctx", to: "llm" },
  { from: "perm", to: "llm" },
  { from: "llm", to: "tools" },
  { from: "llm", to: "memory" },
  { from: "llm", to: "coord" },
  { from: "tools", to: "llm", label: "结果" },
  { from: "memory", to: "llm", label: "检索" },
  { from: "coord", to: "llm", label: "汇总" },
  { from: "llm", to: "output" },
  { from: "hooks", to: "llm" },
];

/* ------------------------------------------------------------------ */
/*  Progress Bar Component                                             */
/* ------------------------------------------------------------------ */

function ProgressBar({
  current,
  onSelect,
}: {
  current: number;
  onSelect: (step: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mb-12 flex-wrap">
      {STEPS.map((step) => (
        <button
          key={step.id}
          onClick={() => onSelect(step.id)}
          className="flex items-center gap-1.5 md:gap-2 px-2 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer"
          style={{
            background:
              current >= step.id
                ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(6,182,212,0.2))"
                : "rgba(255,255,255,0.05)",
            border: `1px solid ${
              current === step.id
                ? "var(--accent-purple)"
                : "rgba(255,255,255,0.1)"
            }`,
            color: current >= step.id ? "var(--accent-purple)" : "var(--text-secondary)",
          }}
        >
          <span className="text-base md:text-lg">{step.icon}</span>
          <span className="hidden sm:inline">Step {step.id}</span>
          <span
            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
              current >= step.id
                ? "bg-[var(--accent-purple)] text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"
            }`}
          >
            {current > step.id ? "✓" : step.id}
          </span>
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step Content Component                                             */
/* ------------------------------------------------------------------ */

function StepContent({ step, isActive }: { step: LabStep; isActive: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {/* Step Header */}
          <div className="text-center mb-10">
            <div className="text-5xl mb-3">{step.icon}</div>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{step.title}</h3>
            <p className="text-[var(--text-secondary)] text-lg">{step.subtitle}</p>
          </div>

          {/* Description */}
          <ScrollReveal>
            <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 mb-8">
              <p className="text-[var(--text-primary)] leading-relaxed">
                {step.description}
              </p>
              <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                <p className="text-sm text-[var(--text-secondary)]">
                  <span className="font-semibold text-[var(--accent-cyan)]">💡 Claude Code 实际实现：</span>
                  {step.concept}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Architecture Diagram */}
          <ScrollReveal>
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-purple)]" />
                架构图
              </h4>
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 overflow-x-auto">
                <ArchitectureDiagram
                  nodes={step.nodes}
                  edges={step.edges}
                  width={800}
                  height={400}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Code Example */}
          <ScrollReveal>
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
                代码示例
              </h4>
              <CodeBlock code={step.code} language="typescript" filename="agent-step${step.id}.ts" />
            </div>
          </ScrollReveal>

          {/* Related Modules */}
          <ScrollReveal>
            <div className="flex flex-wrap gap-3">
              {step.related.map((r) => (
                <a
                  key={r.href}
                  href={r.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-sm hover:border-[var(--accent-purple)] transition-colors"
                >
                  <span>{r.icon}</span>
                  <span>{r.title}</span>
                  <span className="text-[var(--text-secondary)]">→</span>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function LabPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const relatedModules = [
    { title: "入口与启动", href: "/entry", description: "Agent 启动流程", icon: "🚪" },
    { title: "系统架构", href: "/architecture", description: "整体架构概览", icon: "🏗️" },
    { title: "工具系统", href: "/tools", description: "40+ 内置工具", icon: "🔧" },
    { title: "命令系统", href: "/commands", description: "CLI 命令详解", icon: "⌨️" },
    { title: "插件系统", href: "/plugins", description: "MCP 与扩展", icon: "🔌" },
    { title: "多智能体协调", href: "/coordinator", description: "Agent 协作", icon: "🕸️" },
    { title: "助手模式", href: "/assistant", description: "AI 助手", icon: "🤝" },
  ];

  return (
    <ModuleLayout
      title="实战 Lab"
      subtitle="从零构建简化版 Agent"
      icon="🧪"
      category="实战"
      relatedModules={relatedModules}
    >
      {/* Intro */}
      <ScrollReveal>
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            基于前 18 篇知识，我们将从零开始，逐步构建一个简化版 Claude Code。
            每个 Step 对应一个核心能力的实现，你可以跟着一步步动手。
          </p>
        </div>
      </ScrollReveal>

      {/* Full Architecture Overview */}
      <ScrollReveal>
        <div className="mb-12">
          <SectionTitle
            title="🎯 Claude Code 完整架构"
            subtitle="我们最终要构建的目标 — 5 个 Step 逐步实现其中的每个部分"
          />
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-4 overflow-x-auto">
            <ArchitectureDiagram
              nodes={FULL_ARCH_NODES}
              edges={FULL_ARCH_EDGES}
              width={800}
              height={420}
            />
          </div>
          <div className="flex flex-wrap gap-4 mt-4 justify-center text-sm text-[var(--text-secondary)]">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#8b5cf6]" /> LLM 核心
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#10b981]" /> 记忆系统
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-sm bg-[#f59e0b]" /> 协调器
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Progress */}
      <ProgressBar current={currentStep} onSelect={setCurrentStep} />

      {/* Step Content */}
      {STEPS.map((step) => (
        <StepContent key={step.id} step={step} isActive={currentStep === step.id} />
      ))}

      {/* Navigation */}
      <div className="flex justify-between items-center mt-12 pt-8 border-t border-[var(--border-color)]">
        <button
          onClick={() => setCurrentStep((s) => Math.max(1, s - 1))}
          disabled={currentStep === 1}
          className="px-5 py-2.5 rounded-lg border border-[var(--border-color)] text-sm font-medium hover:border-[var(--accent-purple)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          ← 上一步
        </button>
        <span className="text-sm text-[var(--text-secondary)]">
          {currentStep} / {STEPS.length}
        </span>
        <button
          onClick={() => setCurrentStep((s) => Math.min(STEPS.length, s + 1))}
          disabled={currentStep === STEPS.length}
          className="px-5 py-2.5 rounded-lg bg-[var(--accent-purple)] text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          下一步 →
        </button>
      </div>

      {/* Summary */}
      <ScrollReveal>
        <div className="mt-16 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8">
          <h3 className="text-xl font-bold mb-4">🗺️ 学习路径总结</h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {STEPS.map((step) => (
              <a
                key={step.id}
                href={step.related[0].href}
                className="p-4 rounded-lg border border-[var(--border-color)] hover:border-[var(--accent-purple)] transition-colors text-center group"
              >
                <div className="text-2xl mb-2">{step.icon}</div>
                <div className="text-sm font-semibold group-hover:text-[var(--accent-purple)] transition-colors">
                  Step {step.id}
                </div>
                <div className="text-xs text-[var(--text-secondary)] mt-1">{step.title}</div>
              </a>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </ModuleLayout>
  );
}
