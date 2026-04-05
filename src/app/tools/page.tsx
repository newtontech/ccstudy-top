"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";
import { CodeFlow } from "@/components/CodeFlow";

export default function ToolsPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const relatedModules = [
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构概览",
      icon: "🏗️",
    },
    {
      title: "命令系统",
      href: "/commands",
      description: "CLI 命令详解",
      icon: "⌨️",
    },
    {
      title: "查询引擎",
      href: "/query-engine",
      description: "Query Engine 深度剖析",
      icon: "🔍",
    },
    {
      title: "权限系统",
      href: "/permissions",
      description: "四层纵深防御",
      icon: "🛡️",
    },
    {
      title: "Hooks 系统",
      href: "/hooks",
      description: "Pre/Post 工具钩子",
      icon: "🪝",
    },
    {
      title: "插件系统",
      href: "/plugins",
      description: "MCP 与扩展",
      icon: "🔌",
    },
    {
      title: "多智能体",
      href: "/coordinator",
      description: "Agent 工具详解",
      icon: "🕸️",
    },
  ];

  const toolCategories = [
    {
      category: "文件操作",
      color: "var(--accent-cyan)",
      tools: [
        { name: "FileReadTool", desc: "读取文件内容，支持行号范围和 PDF 页码", readOnly: true, concurrent: true },
        { name: "FileWriteTool", desc: "创建或完全覆盖文件", readOnly: false, concurrent: false },
        { name: "FileEditTool", desc: "精确字符串替换编辑文件", readOnly: false, concurrent: false },
        { name: "GlobTool", desc: "基于 glob 模式搜索文件路径", readOnly: true, concurrent: true },
        { name: "NotebookEditTool", desc: "编辑 Jupyter Notebook 单元格", readOnly: false, concurrent: false },
      ],
    },
    {
      category: "系统交互",
      color: "var(--accent-blue)",
      tools: [
        { name: "BashTool", desc: "执行 shell 命令并捕获输出", readOnly: false, concurrent: false },
        { name: "LSPTool", desc: "与语言服务协议交互，获取类型信息", readOnly: true, concurrent: true },
        { name: "PowerShellTool", desc: "Windows PowerShell 命令执行", readOnly: false, concurrent: false },
      ],
    },
    {
      category: "搜索",
      color: "var(--accent-purple)",
      tools: [
        { name: "GrepTool", desc: "基于正则表达式搜索文件内容", readOnly: true, concurrent: true },
        { name: "WebSearchTool", desc: "搜索互联网获取最新信息", readOnly: true, concurrent: true },
        { name: "WebFetchTool", desc: "抓取并解析网页内容", readOnly: true, concurrent: true },
        { name: "ToolSearchTool", desc: "搜索和发现延迟加载的工具", readOnly: true, concurrent: true },
      ],
    },
    {
      category: "智能体管理",
      color: "var(--accent-cyan)",
      tools: [
        { name: "AgentTool", desc: "生成子代理执行子任务", readOnly: false, concurrent: false },
        { name: "SendMessageTool", desc: "代理间消息传递与通信", readOnly: false, concurrent: false },
      ],
    },
    {
      category: "任务管理",
      color: "var(--accent-blue)",
      tools: [
        { name: "TaskCreateTool", desc: "创建新任务到任务列表", readOnly: false, concurrent: false },
        { name: "TaskUpdateTool", desc: "更新任务状态和属性", readOnly: false, concurrent: false },
        { name: "TaskListTool", desc: "列出所有任务概览", readOnly: true, concurrent: true },
        { name: "TaskGetTool", desc: "获取单个任务完整详情", readOnly: true, concurrent: true },
        { name: "TaskStopTool", desc: "停止正在执行的任务", readOnly: false, concurrent: false },
        { name: "TaskOutputTool", desc: "获取任务输出结果", readOnly: true, concurrent: true },
      ],
    },
    {
      category: "团队协调",
      color: "var(--accent-purple)",
      tools: [
        { name: "TeamCreateTool", desc: "创建团队并初始化任务列表", readOnly: false, concurrent: false },
        { name: "TeamDeleteTool", desc: "删除团队并清理资源", readOnly: false, concurrent: false },
      ],
    },
    {
      category: "计划模式",
      color: "var(--accent-cyan)",
      tools: [
        { name: "EnterPlanModeTool", desc: "进入计划模式，仅做分析不修改文件", readOnly: true, concurrent: true },
        { name: "ExitPlanModeV2Tool", desc: "退出计划模式，开始执行", readOnly: false, concurrent: false },
      ],
    },
    {
      category: "调度与定时",
      color: "var(--accent-blue)",
      tools: [
        { name: "CronCreateTool", desc: "创建定时任务（一次性或循环）", readOnly: false, concurrent: false },
        { name: "CronDeleteTool", desc: "取消已创建的定时任务", readOnly: false, concurrent: false },
        { name: "CronListTool", desc: "列出所有已创建的定时任务", readOnly: true, concurrent: true },
        { name: "RemoteTriggerTool", desc: "远程触发工具执行", readOnly: false, concurrent: false },
      ],
    },
    {
      category: "MCP 与扩展",
      color: "var(--accent-purple)",
      tools: [
        { name: "ListMcpResourcesTool", desc: "列出 MCP 服务器可用资源", readOnly: true, concurrent: true },
        { name: "ReadMcpResourceTool", desc: "读取 MCP 服务器资源内容", readOnly: true, concurrent: true },
        { name: "MCPTool", desc: "MCP 外部工具统一代理", readOnly: false, concurrent: false },
        { name: "SkillTool", desc: "执行 Claude Code Skill 脚本", readOnly: false, concurrent: false },
      ],
    },
    {
      category: "配置与交互",
      color: "var(--accent-cyan)",
      tools: [
        { name: "ConfigTool", desc: "读取和修改应用配置项", readOnly: false, concurrent: false },
        { name: "AskUserQuestionTool", desc: "向用户提问并获取回答", readOnly: true, concurrent: true },
        { name: "TodoWriteTool", desc: "管理 Todo 列表", readOnly: false, concurrent: false },
      ],
    },
    {
      category: "Worktree",
      color: "var(--accent-blue)",
      tools: [
        { name: "EnterWorktreeTool", desc: "进入 Git Worktree 工作目录", readOnly: false, concurrent: false },
        { name: "ExitWorktreeTool", desc: "退出当前 Worktree", readOnly: false, concurrent: false },
      ],
    },
  ];

  // 14-step governance pipeline data
  const pipelineSteps = [
    { id: 1, name: "Claude API", detail: "tool_use blocks", color: "var(--accent-cyan)", phase: "initiate" },
    { id: 2, name: "findToolByName", detail: "注册表查找 + 别名回退", color: "var(--accent-cyan)", phase: "discovery" },
    { id: 3, name: "safeParse", detail: "Zod Schema 类型校验", color: "var(--accent-blue)", phase: "validation" },
    { id: 4, name: "validateInput", detail: "工具特定业务校验", color: "var(--accent-blue)", phase: "validation" },
    { id: 5, name: "Deny Rules", detail: "黑名单规则匹配", color: "var(--accent-purple)", phase: "permission" },
    { id: 6, name: "Allow Rules", detail: "白名单规则匹配", color: "var(--accent-purple)", phase: "permission" },
    { id: 7, name: "User Consent", detail: "auto/manual 用户确认", color: "var(--accent-purple)", phase: "permission" },
    { id: 8, name: "Pre-Tool Hooks", detail: "PreToolUse 钩子执行", color: "var(--accent-blue)", phase: "hooks" },
    { id: 9, name: "telemetry.start", detail: "OpenTelemetry span 开始", color: "var(--accent-cyan)", phase: "observability" },
    { id: 10, name: "tool.call()", detail: "核心执行逻辑", color: "var(--accent-blue)", phase: "execution" },
    { id: 11, name: "Post-Tool Hooks", detail: "PostToolUse 钩子执行", color: "var(--accent-blue)", phase: "hooks" },
    { id: 12, name: "telemetry.end", detail: "OpenTelemetry span 结束", color: "var(--accent-cyan)", phase: "observability" },
    { id: 13, name: "mapResult", detail: "结果序列化与截断", color: "var(--accent-purple)", phase: "result" },
    { id: 14, name: "Context Mod", detail: "上下文修改器应用", color: "var(--accent-purple)", phase: "result" },
  ];

  const pipelinePhases = [
    { key: "initiate", label: "发起", color: "var(--accent-cyan)" },
    { key: "discovery", label: "发现", color: "var(--accent-cyan)" },
    { key: "validation", label: "校验", color: "var(--accent-blue)" },
    { key: "permission", label: "权限", color: "var(--accent-purple)" },
    { key: "hooks", label: "钩子", color: "var(--accent-blue)" },
    { key: "observability", label: "可观测", color: "var(--accent-cyan)" },
    { key: "execution", label: "执行", color: "var(--accent-blue)" },
    { key: "result", label: "结果", color: "var(--accent-purple)" },
  ];

  // Tool inheritance tree
  const inheritanceTree = [
    {
      base: "Tool<I, O, P>",
      children: [
        { name: "BashTool", features: ["bashSecurity", "pathValidation", "sedEditParser", "destructiveCommandWarning"] },
        { name: "FileReadTool", features: ["PDF parsing", "line range", "encoding detection"] },
        { name: "FileEditTool", features: ["string replacement", "conflict detection"] },
        { name: "FileWriteTool", features: ["file creation", "full overwrite"] },
        { name: "GlobTool", features: ["pattern matching"] },
        { name: "GrepTool", features: ["regex search", "context lines"] },
        { name: "WebFetchTool", features: ["HTML→markdown", "content extraction"] },
        { name: "WebSearchTool", features: ["internet search", "result ranking"] },
        { name: "AgentTool", features: ["sub-agent spawn", "memory snapshot", "fork"] },
        { name: "NotebookEditTool", features: ["cell editing", "kernel support"] },
        { name: "MCPTool", features: ["server proxy", "MCP protocol"] },
        { name: "SkillTool", features: ["script execution", "skill registry"] },
      ],
    },
  ];

  return (
    <ModuleLayout
      title="工具系统"
      subtitle="Claude Code 40+ 内置工具的深度剖析 —— 接口设计、注册机制、14步治理流水线与继承体系"
      icon="🔧"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: 工具系统概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="工具系统概述" subtitle="AI 与真实环境交互的桥梁" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的核心是工具系统。它提供了{" "}
              <strong className="text-[var(--text-primary)]">40+ 内置工具</strong>，
              让 AI 能够与真实环境进行交互——读写文件、执行命令、搜索代码、访问网络、管理任务。
              每一个工具都实现了统一的 <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">Tool&lt;Input, Output, P&gt;</code> 接口契约。
            </p>
            <p>
              工具系统是 Claude Code 与传统 AI 聊天机器人的本质区别。通过工具系统，
              Claude 不再只能生成文本建议，而是能够直接操作文件系统、运行命令、搜索网络，
              真正成为开发者的编程助手。
            </p>
          </div>

          <ArchitectureDiagram
            title="工具分类架构"
            nodes={[
              { id: "registry", label: "Tool Registry", x: 280, y: 120, color: "var(--accent-purple)" },
              { id: "bash", label: "BashTool", x: 40, y: 20, color: "var(--accent-cyan)" },
              { id: "fileread", label: "FileReadTool", x: 200, y: 20, color: "var(--accent-cyan)" },
              { id: "fileedit", label: "FileEditTool", x: 360, y: 20, color: "var(--accent-cyan)" },
              { id: "filewrite", label: "FileWriteTool", x: 520, y: 20, color: "var(--accent-cyan)" },
              { id: "glob", label: "GlobTool", x: 40, y: 230, color: "var(--accent-blue)" },
              { id: "grep", label: "GrepTool", x: 200, y: 230, color: "var(--accent-blue)" },
              { id: "websearch", label: "WebSearchTool", x: 360, y: 230, color: "var(--accent-blue)" },
              { id: "webfetch", label: "WebFetchTool", x: 520, y: 230, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "registry", to: "bash" }, { from: "registry", to: "fileread" },
              { from: "registry", to: "fileedit" }, { from: "registry", to: "filewrite" },
              { from: "registry", to: "glob" }, { from: "registry", to: "grep" },
              { from: "registry", to: "websearch" }, { from: "registry", to: "webfetch" },
            ]}
            width={700}
            height={290}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: Tool 接口定义 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="Tool 接口定义" subtitle="所有工具的统一契约" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              每一个工具都遵循统一的{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                Tool&lt;Input, Output, P&gt;
              </code>{" "}
              类型接口。这个泛型接口定义了工具的名称、描述、输入校验、核心执行函数、
              权限检查和并发安全性声明，是整个工具系统的基石。
            </p>
          </div>

          <ArchitectureDiagram
            title="Tool<Input, Output, P> 接口结构"
            nodes={[
              { id: "tool", label: "Tool<I, O, P>", x: 330, y: 140, color: "var(--accent-purple)" },
              { id: "name", label: "name: string", x: 40, y: 20, color: "var(--accent-cyan)" },
              { id: "description", label: "description()", x: 200, y: 20, color: "var(--accent-cyan)" },
              { id: "inputSchema", label: "inputSchema: Zod", x: 490, y: 20, color: "var(--accent-cyan)" },
              { id: "call", label: "call(args, ctx)", x: 530, y: 140, color: "var(--accent-blue)" },
              { id: "isReadOnly", label: "isReadOnly()", x: 40, y: 260, color: "var(--accent-purple)" },
              { id: "isConcurrencySafe", label: "isConcurrencySafe()", x: 200, y: 260, color: "var(--accent-purple)" },
              { id: "checkPermissions", label: "checkPermissions()", x: 390, y: 260, color: "var(--accent-blue)" },
              { id: "isEnabled", label: "isEnabled()", x: 550, y: 260, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "tool", to: "name", label: "标识" }, { from: "tool", to: "description", label: "描述" },
              { from: "tool", to: "inputSchema", label: "校验" }, { from: "tool", to: "call", label: "执行" },
              { from: "tool", to: "isReadOnly", label: "只读" }, { from: "tool", to: "isConcurrencySafe", label: "并发" },
              { from: "tool", to: "checkPermissions", label: "权限" }, { from: "tool", to: "isEnabled", label: "开关" },
            ]}
            width={700}
            height={310}
          />

          <div className="mt-8 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">字段详解</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { field: "name", desc: "工具的全局唯一标识符，Claude 通过名称匹配调用对应的工具。支持 aliases 别名回退兼容。" },
                { field: "description", desc: "动态描述函数，根据输入参数生成上下文相关的描述，帮助 Claude 理解工具能力" },
                { field: "inputSchema", desc: "基于 Zod 的输入 Schema，定义参数类型和约束，在执行前自动校验输入合法性" },
                { field: "call", desc: "核心执行函数，接收校验后的参数和运行时上下文，返回工具执行结果" },
                { field: "isReadOnly", desc: "声明工具是否为只读操作。只读工具可并发执行，写操作工具必须串行执行" },
                { field: "isConcurrencySafe", desc: "声明工具是否并发安全。影响工具在 agentic 循环中的调度策略" },
                { field: "checkPermissions", desc: "权限检查函数，在执行前验证用户是否有权调用此工具并传入给定参数" },
                { field: "isEnabled", desc: "检查当前环境是否启用此工具。受 feature flag、配置和运行模式影响" },
              ].map((item) => (
                <div key={item.field} className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
                  <code className="text-sm font-mono text-[var(--accent-cyan)] mb-2 block">{item.field}</code>
                  <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: 工具注册机制 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="工具注册机制" subtitle="从声明到可用的完整链路" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              工具注册分为两个阶段：{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                getAllBaseTools()
              </code>{" "}
              负责组装所有内置工具的基础列表，{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                getTools()
              </code>{" "}
              则根据当前权限上下文过滤并返回最终可用的工具集合。
            </p>
          </div>

          <ArchitectureDiagram
            title="两阶段注册管线"
            nodes={[
              { id: "agent", label: "AgentTool", x: 20, y: 20, color: "var(--accent-cyan)" },
              { id: "bash2", label: "BashTool", x: 180, y: 20, color: "var(--accent-cyan)" },
              { id: "fileops", label: "File*Tools", x: 340, y: 20, color: "var(--accent-cyan)" },
              { id: "search", label: "SearchTools", x: 500, y: 20, color: "var(--accent-cyan)" },
              { id: "task", label: "TaskTools", x: 20, y: 80, color: "var(--accent-blue)" },
              { id: "cron", label: "CronTools", x: 180, y: 80, color: "var(--accent-blue)" },
              { id: "mcp", label: "MCPTool", x: 340, y: 80, color: "var(--accent-blue)" },
              { id: "more", label: "...更多", x: 500, y: 80, color: "var(--accent-blue)" },
              { id: "base", label: "getAllBaseTools()", x: 210, y: 175, color: "var(--accent-purple)" },
              { id: "flag", label: "isEnabled?", x: 40, y: 275, color: "var(--accent-blue)" },
              { id: "perm", label: "Permission?", x: 200, y: 275, color: "var(--accent-blue)" },
              { id: "result", label: "getTools(ctx)", x: 420, y: 275, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "agent", to: "base" }, { from: "bash2", to: "base" },
              { from: "fileops", to: "base" }, { from: "search", to: "base" },
              { from: "task", to: "base" }, { from: "cron", to: "base" },
              { from: "mcp", to: "base" }, { from: "more", to: "base" },
              { from: "base", to: "flag", label: "过滤" }, { from: "base", to: "perm", label: "过滤" },
              { from: "flag", to: "result" }, { from: "perm", to: "result" },
            ]}
            width={700}
            height={320}
          />

          <div className="mt-8 space-y-4">
            {[
              { phase: "统一入口", desc: "所有工具通过同一个函数注册，MCP 外部工具在注册后享有与内置工具完全相同的调用接口" },
              { phase: "动态过滤", desc: "根据运行环境、用户配置和权限模式动态决定哪些工具可用" },
              { phase: "延迟绑定", desc: "工具的具体实现在调用时才绑定执行上下文，允许同一个工具定义在不同会话中复用" },
            ].map((item, i) => (
              <div key={item.phase} className="flex gap-4 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] flex items-center justify-center text-sm font-bold">{i + 1}</span>
                <div>
                  <span className="text-sm font-semibold text-[var(--accent-cyan)]">{item.phase}</span>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ========== NEW: Section: 14-Step Governance Pipeline ========== */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="14 步工具治理流水线" subtitle="从 Claude 决策到结果返回的完整治理管道" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              当 Claude 在 agentic 循环中决定调用工具时，请求会经过{" "}
              <strong className="text-[var(--text-primary)]">14 个治理步骤</strong>。
              每个步骤都有明确的职责——从工具发现、参数校验、权限检查到执行、钩子和可观测性。
              这个流水线确保每一次工具调用都是安全、可追踪、可审计的。
            </p>
          </div>

          {/* Phase legend */}
          <div className="flex flex-wrap gap-3 mb-6">
            {pipelinePhases.map((p) => (
              <div key={p.key} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                <span className="text-xs text-[var(--text-secondary)]">{p.label}</span>
              </div>
            ))}
          </div>

          {/* Animated pipeline */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-2 min-w-[900px]">
              {pipelineSteps.map((step, i) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-shrink-0"
                >
                  <div
                    className="w-[64px] rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] p-2 text-center cursor-default hover:border-[var(--accent-cyan)] transition-colors"
                    title={step.detail}
                  >
                    <div
                      className="w-7 h-7 rounded-full mx-auto mb-1.5 flex items-center justify-center text-xs font-bold text-white"
                      style={{ background: step.color }}
                    >
                      {step.id}
                    </div>
                    <p className="text-[10px] font-mono text-[var(--text-primary)] leading-tight break-all">
                      {step.name}
                    </p>
                  </div>
                  {i < pipelineSteps.length - 1 && (
                    <div className="flex items-center justify-center h-4">
                      <motion.div
                        className="w-3 h-[2px] rounded"
                        style={{ background: "var(--text-secondary)" }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05 + 0.2 }}
                      />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pipeline details */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {pipelineSteps.map((step) => (
              <div key={step.id} className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: step.color }}>
                    {step.id}
                  </div>
                  <code className="text-sm font-mono text-[var(--accent-cyan)]">{step.name}</code>
                  <span className="text-[10px] px-1.5 py-0.5 rounded font-mono" style={{ background: `${step.color}20`, color: step.color }}>
                    {step.phase}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{step.detail}</p>
              </div>
            ))}
          </div>

          {/* Code flow visualization */}
          <div className="mt-10">
            <CodeFlow
              title="工具调用执行流程（简化）"
              steps={[
                {
                  code: `// 1. Claude API 返回 tool_use
const toolUseBlocks = response.content
  .filter(b => b.type === 'tool_use')`,
                  highlight: [1, 2],
                  description: "Claude API 响应中包含 tool_use 块",
                },
                {
                  code: `// 2-3. 查找工具 + Zod 校验
const tool = findToolByName(tools, name)
const parsed = tool.inputSchema.safeParse(input)
if (!parsed.success) return ValidationError`,
                  highlight: [1, 2, 3],
                  description: "从注册表查找工具并用 Zod 校验输入",
                },
                {
                  code: `// 4-7. 业务校验 + 权限检查
await tool.validateInput(parsed.data, ctx)
const perm = await tool.checkPermissions(input, ctx)
// deny → allow → user consent`,
                  highlight: [1, 2, 3, 4],
                  description: "工具特定校验 + 三层权限检查",
                },
                {
                  code: `// 8-9. Pre Hooks + Telemetry
await runPreToolUseHooks(tool, input)
startToolSpan(tool.name, toolUseID)`,
                  highlight: [1, 2],
                  description: "前置钩子执行 + OpenTelemetry 开始",
                },
                {
                  code: `// 10. 核心执行
const result = await tool.call(
  parsed.data, context, canUseTool,
  assistantMessage, onProgress
)`,
                  highlight: [1, 2, 3, 4, 5],
                  description: "调用工具的核心执行函数",
                },
                {
                  code: `// 11-14. Post Hooks + Telemetry + Result
await runPostToolUseHooks(tool, result)
endToolSpan(tool.name, toolUseID)
const block = tool.mapToolResultToToolResultBlockParam(
  result, toolUseID
)`,
                  highlight: [1, 2, 3, 4, 5, 6],
                  description: "后置钩子 + 遥测 + 结果序列化",
                },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* ========== NEW: Section: Tool Inheritance Tree ========== */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="工具继承树" subtitle="所有工具共享统一的 Tool 接口，各自实现领域逻辑" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 没有使用传统的类继承，而是采用{" "}
              <strong className="text-[var(--text-primary)]">组合式接口设计</strong>。
              所有工具都实现相同的 <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">Tool&lt;I, O, P&gt;</code> 类型，
              每个工具通过模块化的子文件组织领域逻辑。
              点击分类可展开查看该工具的模块组成。
            </p>
          </div>

          <div className="mt-8 space-y-6">
            {toolCategories.map((cat) => (
              <div key={cat.category}>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                  className="flex items-center gap-3 mb-3 w-full text-left group"
                >
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                  <h4 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                    {cat.category}
                  </h4>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">{cat.tools.length} tools</span>
                  <motion.span
                    animate={{ rotate: expandedCategory === cat.category ? 90 : 0 }}
                    className="text-[var(--text-secondary)] ml-auto"
                  >
                    ▶
                  </motion.span>
                </button>

                <AnimatePresence>
                  {expandedCategory === cat.category && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        {cat.tools.map((tool) => (
                          <div key={tool.name} className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
                            <div className="flex items-center justify-between mb-2">
                              <code className="text-sm font-mono text-[var(--accent-cyan)]">{tool.name}</code>
                              <div className="flex gap-1.5">
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono ${tool.readOnly ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"}`}>
                                  {tool.readOnly ? "READ" : "WRITE"}
                                </span>
                                <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono ${tool.concurrent ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"}`}>
                                  {tool.concurrent ? "CONCURRENT" : "SERIAL"}
                                </span>
                              </div>
                            </div>
                            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{tool.desc}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Tool composition example */}
          <div className="mt-10">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-4">工具模块化组成示例</h4>
            <div className="space-y-4">
              {inheritanceTree.map((branch) => (
                <div key={branch.base} className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                  <div className="flex items-center gap-3 mb-4">
                    <code className="text-base font-mono text-[var(--accent-purple)]">{branch.base}</code>
                    <span className="text-xs text-[var(--text-secondary)]">← 所有工具的统一接口</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {branch.children.map((child) => (
                      <div key={child.name} className="p-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
                        <code className="text-sm font-mono text-[var(--accent-cyan)] mb-1 block">{child.name}</code>
                        <div className="flex flex-wrap gap-1">
                          {child.features.map((f) => (
                            <span key={f} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] font-mono">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ========== NEW: Section: Tool Lifecycle ========== */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="工具生命周期" subtitle="从注册到审计的完整生命周期管理" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              每个工具经历从注册、发现、权限检查、参数验证、执行到审计的完整生命周期。
              以下展示生命周期的各个阶段及其对应的源码位置。
            </p>
          </div>

          <ArchitectureDiagram
            title="工具生命周期"
            nodes={[
              { id: "reg", label: "① 注册\ngetAllBaseTools()", x: 30, y: 30, color: "var(--accent-cyan)" },
              { id: "disc", label: "② 发现\ngetTools(ctx)", x: 250, y: 30, color: "var(--accent-cyan)" },
              { id: "perm", label: "③ 权限\ncheckPermissions()", x: 470, y: 30, color: "var(--accent-purple)" },
              { id: "val", label: "④ 校验\nsafeParse + validateInput", x: 30, y: 160, color: "var(--accent-blue)" },
              { id: "hook1", label: "⑤ Pre-Hooks\nrunPreToolUseHooks", x: 250, y: 160, color: "var(--accent-blue)" },
              { id: "exec", label: "⑥ 执行\ntool.call()", x: 470, y: 160, color: "var(--accent-purple)" },
              { id: "hook2", label: "⑦ Post-Hooks\nrunPostToolUseHooks", x: 30, y: 290, color: "var(--accent-blue)" },
              { id: "audit", label: "⑧ 审计\ntelemetry + analytics", x: 250, y: 290, color: "var(--accent-cyan)" },
              { id: "result", label: "⑨ 结果\nmapResult → Claude", x: 470, y: 290, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "reg", to: "disc", label: "" },
              { from: "disc", to: "perm", label: "" },
              { from: "perm", to: "val", label: "" },
              { from: "val", to: "hook1", label: "" },
              { from: "hook1", to: "exec", label: "" },
              { from: "exec", to: "hook2", label: "" },
              { from: "hook2", to: "audit", label: "" },
              { from: "audit", to: "result", label: "" },
            ]}
            width={650}
            height={370}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { stage: "注册阶段", steps: "getAllBaseTools() → getTools()", desc: "工具在启动时注册到全局列表，运行时根据 isEnabled 和权限过滤。源码：tools.ts", color: "var(--accent-cyan)" },
              { stage: "验证阶段", steps: "safeParse → validateInput → checkPermissions", desc: "Zod 类型校验 → 工具业务校验 → deny/allow/consent 权限检查。源码：toolExecution.ts", color: "var(--accent-blue)" },
              { stage: "执行阶段", steps: "Pre-Hooks → call() → Post-Hooks", desc: "钩子执行 → 核心逻辑 → 结果处理。完整可观测性通过 OpenTelemetry 实现。源码：toolOrchestration.ts", color: "var(--accent-purple)" },
            ].map((item) => (
              <div key={item.stage} className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">{item.stage}</h5>
                </div>
                <code className="text-xs font-mono text-[var(--accent-cyan)] block mb-2">{item.steps}</code>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section: 核心工具详解 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="核心工具详解" subtitle="按类别一览所有内置工具" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的 40+ 内置工具覆盖了文件操作、系统交互、搜索、智能体管理、任务调度等多个领域。
              以下按类别展示每个工具的核心信息和并发特性。
            </p>
          </div>

          <div className="mt-8 space-y-8">
            {toolCategories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full" style={{ background: cat.color }} />
                  <h4 className="text-lg font-semibold text-[var(--text-primary)]">{cat.category}</h4>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">{cat.tools.length} tools</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.tools.map((tool) => (
                    <div key={tool.name} className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-[var(--accent-cyan)]">{tool.name}</code>
                        <div className="flex gap-1.5">
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono ${tool.readOnly ? "bg-green-500/10 text-green-400" : "bg-orange-500/10 text-orange-400"}`}>
                            {tool.readOnly ? "READ" : "WRITE"}
                          </span>
                          <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono ${tool.concurrent ? "bg-blue-500/10 text-blue-400" : "bg-purple-500/10 text-purple-400"}`}>
                            {tool.concurrent ? "CONCURRENT" : "SERIAL"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{tool.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section: 工具执行流程 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="工具执行流程" subtitle="从 Claude 决策到工具执行的完整管道" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              当 Claude 在 agentic 循环中决定调用一个工具时，请求会经历查找、验证、权限检查、
              执行四个核心阶段。每个阶段都有明确的职责和错误处理策略，确保工具调用安全可靠。
            </p>
          </div>

          <ArchitectureDiagram
            title="工具调用执行流程"
            nodes={[
              { id: "s1", label: "1. Claude API", x: 30, y: 60, color: "var(--accent-cyan)" },
              { id: "s1detail", label: "toolCalls[].name", x: 220, y: 60, color: "var(--accent-cyan)" },
              { id: "s2", label: "2. 查找工具", x: 30, y: 145, color: "var(--accent-blue)" },
              { id: "s2detail", label: "Zod Schema 校验", x: 220, y: 145, color: "var(--accent-blue)" },
              { id: "s3", label: "3. 权限检查", x: 30, y: 230, color: "var(--accent-purple)" },
              { id: "s3detail", label: "deny/allow/consent", x: 220, y: 230, color: "var(--accent-purple)" },
              { id: "s4", label: "4. 执行工具", x: 30, y: 315, color: "var(--accent-blue)" },
              { id: "s4detail", label: "tool_result", x: 220, y: 315, color: "var(--accent-blue)" },
              { id: "err", label: "错误处理", x: 430, y: 185, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "s1", to: "s1detail" }, { from: "s1detail", to: "s2" },
              { from: "s2", to: "s2detail" }, { from: "s2detail", to: "s3" },
              { from: "s3", to: "s3detail" }, { from: "s3detail", to: "s4" },
              { from: "s4", to: "s4detail" },
              { from: "s2detail", to: "err", label: "校验失败" },
              { from: "s3detail", to: "err", label: "拒绝" },
            ]}
            width={600}
            height={360}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { step: "Step 1: Claude API 响应", desc: "Claude API 响应中包含工具调用请求，指定工具名称和输入参数。Claude 根据对话上下文自主决定是否需要调用工具以及调用哪个工具。", color: "var(--accent-cyan)" },
              { step: "Step 2: 查找与校验", desc: "从工具注册表中查找目标工具。找到后使用 Zod Schema 验证输入参数的合法性，包括类型检查、必填字段校验和值约束验证。", color: "var(--accent-blue)" },
              { step: "Step 3: 权限检查", desc: "检查工具权限：先检查 deny 规则（黑名单），再检查 allow 规则（白名单），最后根据权限模式决定是否弹出用户授权对话框。", color: "var(--accent-purple)" },
              { step: "Step 4: 执行与反馈", desc: "工具执行核心逻辑并返回结果。只读工具可并发执行以提升效率，写操作串行执行以保证数据一致性。结果反馈给 Claude 继续推理。", color: "var(--accent-blue)" },
            ].map((item) => (
              <div key={item.step} className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">{item.step}</h5>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section: 并发控制 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="并发控制" subtitle="只读并发、写入串行的智能调度" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的工具调度器根据每个工具声明的{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                isConcurrencySafe
              </code>{" "}
              属性进行智能调度。<code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">partitionToolCalls()</code> 将多个工具调用分为并发批和串行批。
            </p>
          </div>

          <ArchitectureDiagram
            title="并发调度策略：partitionToolCalls()"
            nodes={[
              { id: "input", label: "Tool Calls[]", x: 260, y: 15, color: "var(--accent-purple)" },
              { id: "partition", label: "partitionToolCalls()", x: 260, y: 95, color: "var(--accent-purple)" },
              { id: "conc_label", label: "并发通道", x: 20, y: 185, color: "var(--accent-cyan)" },
              { id: "fr", label: "FileReadTool", x: 170, y: 185, color: "var(--accent-cyan)" },
              { id: "gl", label: "GlobTool", x: 320, y: 185, color: "var(--accent-cyan)" },
              { id: "gr", label: "GrepTool", x: 470, y: 185, color: "var(--accent-cyan)" },
              { id: "conc_run", label: "runToolsConcurrently()", x: 170, y: 270, color: "var(--accent-cyan)" },
              { id: "ser_label", label: "串行通道", x: 20, y: 335, color: "var(--accent-purple)" },
              { id: "fw", label: "FileWriteTool", x: 170, y: 335, color: "var(--accent-purple)" },
              { id: "fe", label: "FileEditTool", x: 320, y: 335, color: "var(--accent-purple)" },
              { id: "ba", label: "BashTool", x: 470, y: 335, color: "var(--accent-purple)" },
              { id: "ser_run", label: "runToolsSerially()", x: 170, y: 410, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "input", to: "partition" },
              { from: "partition", to: "conc_label", label: "safe=true" },
              { from: "conc_label", to: "fr" }, { from: "conc_label", to: "gl" }, { from: "conc_label", to: "gr" },
              { from: "fr", to: "conc_run" }, { from: "gl", to: "conc_run" }, { from: "gr", to: "conc_run" },
              { from: "partition", to: "ser_label", label: "safe=false" },
              { from: "ser_label", to: "fw" }, { from: "fw", to: "fe", label: "next" }, { from: "fe", to: "ba", label: "next" },
              { from: "ba", to: "ser_run" },
            ]}
            width={660}
            height={455}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: "并发执行", desc: "READ-ONLY 工具", tools: "FileReadTool, GlobTool, GrepTool, WebSearchTool, WebFetchTool, TaskListTool", detail: "多个只读工具调用可以同时发起，充分利用 I/O 等待时间。最大并发数由 CLAUDE_CODE_MAX_TOOL_USE_CONCURRENCY 控制（默认 10）。", color: "var(--accent-cyan)" },
              { title: "串行执行", desc: "WRITE 工具", tools: "FileWriteTool, FileEditTool, BashTool, AgentTool, TaskCreateTool", detail: "写操作工具必须按顺序逐一执行，避免竞态条件和数据冲突。每个写操作完成后，后续操作可以看到前序操作的结果。", color: "var(--accent-purple)" },
            ].map((item) => (
              <div key={item.title} className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">{item.title}</h5>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">{item.desc}</span>
                </div>
                <p className="text-sm text-[var(--accent-cyan)] font-mono mb-3">{item.tools}</p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section: 权限系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="权限系统" subtitle="四层防护的安全模型" />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              工具系统的安全性由四层权限检查机制保障。每一层都有不同的职责和粒度，
              从全局的功能开关到细粒度的用户确认，构建了纵深防御的安全体系。
              详细权限机制见{" "}
              <a href="/permissions" className="text-[var(--accent-cyan)] hover:underline">权限系统页面</a>。
            </p>
          </div>

          <ArchitectureDiagram
            title="四层权限检查纵深防御"
            nodes={[
              { id: "req", label: "工具调用请求", x: 260, y: 15, color: "var(--accent-cyan)" },
              { id: "l1", label: "L1: Feature Flags", x: 260, y: 90, color: "var(--accent-cyan)" },
              { id: "l2", label: "L2: Permission Modes", x: 260, y: 165, color: "var(--accent-blue)" },
              { id: "l3", label: "L3: Tool Rules", x: 120, y: 240, color: "var(--accent-purple)" },
              { id: "l3deny", label: "deny 规则", x: 310, y: 240, color: "var(--accent-purple)" },
              { id: "l3allow", label: "allow 规则", x: 490, y: 240, color: "var(--accent-purple)" },
              { id: "l4", label: "L4: User Consent", x: 260, y: 320, color: "var(--accent-cyan)" },
              { id: "pass", label: "ALLOW", x: 120, y: 400, color: "var(--accent-cyan)" },
              { id: "deny", label: "DENY", x: 400, y: 400, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "req", to: "l1" }, { from: "l1", to: "l2", label: "enabled" },
              { from: "l2", to: "l3" }, { from: "l3", to: "l3deny" }, { from: "l3", to: "l3allow" },
              { from: "l3allow", to: "l4", label: "no rule" },
              { from: "l4", to: "pass", label: "approved" }, { from: "l4", to: "deny", label: "rejected" },
              { from: "l3deny", to: "deny", label: "matched" }, { from: "l1", to: "deny", label: "disabled" },
            ]}
            width={650}
            height={445}
          />

          <div className="mt-8 space-y-4">
            {[
              { layer: "Feature Flags", desc: "功能开关层", detail: "通过 feature flag 系统控制工具的全局启用状态。新工具首先通过 flag 控制，经过充分测试后才默认启用。", color: "var(--accent-cyan)" },
              { layer: "Permission Modes", desc: "权限模式层", detail: "三种权限模式：auto 模式自动批准安全操作；manual 模式对所有敏感操作弹出确认；bypass 模式用于 CI/CD。", color: "var(--accent-blue)" },
              { layer: "Tool-Specific Rules", desc: "工具级规则层", detail: "基于 deny/allow 规则列表进行细粒度控制。规则支持通配符匹配。详见 /permissions。", color: "var(--accent-purple)" },
              { layer: "User Consent", desc: "用户确认层", detail: "在 manual 模式下，敏感操作弹出交互式确认对话框。用户可一次性批准，也可选择'本次会话始终允许'。", color: "var(--accent-cyan)" },
            ].map((item, i) => (
              <div key={item.layer} className="flex gap-4 p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: `${item.color}20`, color: item.color }}>{i + 1}</span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-semibold text-[var(--text-primary)]">{item.layer}</span>
                    <span className="text-sm text-[var(--accent-cyan)] font-mono">{item.desc}</span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
