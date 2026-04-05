import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeFlow } from "@/components/CodeFlow";
import { CodeBlock } from "@/components/CodeBlock";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

/* ──────────────────────── KAIROS 状态机数据 ──────────────────────── */

const STATE_MACHINE_NODES = [
  { id: "idle", label: "🟢 空闲", x: 40, y: 30, color: "#10b981" },
  { id: "chat", label: "💬 对话中", x: 230, y: 30, color: "var(--accent-blue)" },
  { id: "offline", label: "🌑 离线", x: 420, y: 30, color: "#64748b" },
  { id: "dream", label: "💭 做梦中", x: 420, y: 160, color: "var(--accent-purple)" },
  { id: "consolidate", label: "🔄 整合", x: 230, y: 160, color: "#f59e0b" },
  { id: "write", label: "📝 写入记忆", x: 40, y: 160, color: "#f43f5e" },
  { id: "restore", label: "⚡ 恢复就绪", x: 230, y: 290, color: "var(--accent-cyan)" },
];

const STATE_MACHINE_EDGES = [
  { from: "idle", to: "chat", label: "用户输入" },
  { from: "chat", to: "offline", label: "终端关闭" },
  { from: "chat", to: "idle", label: "会话结束" },
  { from: "offline", to: "dream", label: "时间门控通过" },
  { from: "dream", to: "consolidate", label: "扫描完成" },
  { from: "consolidate", to: "write", label: "整合完成" },
  { from: "write", to: "restore", label: "写入完成" },
  { from: "restore", to: "idle", label: "下次启动" },
];

/* ──────────────────────── 做梦流程步骤 ──────────────────────── */

const DREAM_FLOW_STEPS = [
  {
    title: "Phase 1 — Orient",
    desc: "定位与索引",
    code: `# 读取记忆目录结构和 MEMORY.md 索引\nls ~/.claude/projects/<slug>/memory/\ncat ~/.claude/projects/<slug>/memory/MEMORY.md`,
    color: "var(--accent-cyan)",
  },
  {
    title: "Phase 2 — Gather",
    desc: "收集近期信号",
    code: `# 检查每日日志\nlogs/YYYY/MM/YYYY-MM-DD.md\n\n# 精确搜索会话记录（仅关键术语）\ngrep -rn "<narrow term>" transcripts/ --include="*.jsonl" | tail -50`,
    color: "#f59e0b",
  },
  {
    title: "Phase 3 — Consolidate",
    desc: "整合与去重",
    code: `# 合并新信号到现有主题文件（不创建重复）\n# 将相对日期转换为绝对日期\n# 删除被推翻的记忆条目\n\n# 写入/更新记忆文件\nWrite: memory/project_deadlines.md\nWrite: memory/feedback_testing.md`,
    color: "#10b981",
  },
  {
    title: "Phase 4 — Prune & Index",
    desc: "修剪与索引",
    code: `# 更新 MEMORY.md 索引（≤200行，≤25KB）\n# 每条索引 ≤150 字符\n# - [Title](file.md) — one-line hook\n\n# 移除过时/错误条目\n# 添加新重要记忆的指针`,
    color: "var(--accent-purple)",
  },
];

/* ──────────────────────── 门控流程 ──────────────────────── */

const GATE_FLOW_STEPS = [
  { label: "检查启", code: "isAutoDreamEnabled()", color: "#64748b" },
  { label: "时间门控", code: "hoursSince >= minHours (24h)", color: "var(--accent-cyan)" },
  { label: "会话门控", code: "sessionCount >= minSessions (5)", color: "var(--accent-blue)" },
  { label: "获取锁", code: "tryAcquireConsolidationLock()", color: "#f59e0b" },
  { label: "执行做梦", code: "runForkedAgent(prompt)", color: "#10b981" },
];

/* ──────────────────────── 记忆类型 ──────────────────────── */

const MEMORY_TYPES = [
  { type: "user", label: "👤 User", desc: "用户角色、偏好、知识背景", scope: "私有" },
  { type: "feedback", label: "💬 Feedback", desc: "用户纠正与确认的行为指导", scope: "私有/团队" },
  { type: "project", label: "📁 Project", desc: "项目上下文、目标、决策", scope: "私有/团队" },
  { type: "reference", label: "🔗 Reference", desc: "外部系统指针（Linear、Slack等）", scope: "通常团队" },
];

/* ──────────────────────── 记忆整合对比 ──────────────────────── */

const MEMORY_COMPARISON = [
  {
    before: "碎片化的每日日志",
    after: "结构化的主题文件",
    detail: "logs/2026/03/2026-03-01.md → project_deadlines.md",
  },
  {
    before: "相对日期 \"昨天\" \"上周\"",
    after: "绝对日期 2026-03-01",
    detail: "时间流逝后仍可解读",
  },
  {
    before: "矛盾的记忆条目",
    after: "去重合并的单一真相",
    detail: "新调查推翻旧记忆 → 原地修正",
  },
  {
    before: "臃肿的 MEMORY.md",
    after: "简洁索引 ≤200行",
    detail: "每条 ≤150字符，详情在主题文件中",
  },
];

/* ══════════════════════════════════════════════════════════════ */

export default function AssistantPage() {
  const relatedModules = [
    {
      title: "记忆系统",
      href: "/memory",
      description: "持久化记忆存储与检索",
      icon: "🧠",
    },
    {
      title: "多智能体协调",
      href: "/coordinator",
      description: "多 Agent 编排系统",
      icon: "🕸️",
    },
    {
      title: "插件系统",
      href: "/plugins",
      description: "扩展机制",
      icon: "🔌",
    },
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构",
      icon: "🏗️",
    },
  ];

  return (
    <ModuleLayout
      title="KAIROS 助手模式"
      subtitle="Claude Code 的持久化 AI 助手模式 — 持续运行、主动行动、精简交互、自动做梦"
      icon="🤖"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* ═══════ Section 1: KAIROS 概述 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="KAIROS 概述" subtitle="Always-on 的持久化 AI 助手" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              KAIROS 是 Claude Code 的持久化 AI 助手模式。与传统的"请求-响应"式交互不同，
              KAIROS 以{" "}
              <strong className="text-[var(--text-primary)]">Always-on</strong>{" "}
              方式持续运行，监控环境变化并主动采取行动。它就像一个始终在线的开发伙伴，
              在你编写代码的同时默默守护项目健康。
            </p>
            <p>
              KAIROS 的核心设计理念包含三个关键特性：持久化会话保持跨终端的状态连续性；
              环境监控能力使其能主动发现问题；而{" "}
              <strong className="text-[var(--text-primary)]">简要模式（Brief Mode）</strong>{" "}
              则通过超简洁响应减少认知负担，让持久上下文中的交互更加高效。
            </p>
          </div>

          <ArchitectureDiagram
            title="KAIROS 助手架构"
            nodes={[
              { id: "kairos", label: "KAIROS Assistant", x: 340, y: 20 },
              { id: "session", label: "Session Manager", x: 40, y: 140 },
              { id: "context", label: "Context Monitor", x: 340, y: 140 },
              { id: "action", label: "Action Engine", x: 640, y: 140 },
              { id: "proactive", label: "Proactive Actions", x: 500, y: 280 },
              { id: "watch", label: "Environment Watch", x: 680, y: 280 },
              { id: "interact", label: "User Interaction", x: 340, y: 280 },
            ]}
            edges={[
              { from: "kairos", to: "session", label: "管理" },
              { from: "kairos", to: "context", label: "监控" },
              { from: "kairos", to: "action", label: "驱动" },
              { from: "action", to: "proactive", label: "执行" },
              { from: "action", to: "watch", label: "监听" },
              { from: "action", to: "interact", label: "交互" },
            ]}
            width={860}
            height={360}
          />
        </section>
      </ScrollReveal>

      {/* ═══════ Section 2: 会话管理 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="会话管理" subtitle="跨终端会话的状态持久化" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              KAIROS 的会话管理是其持久化能力的核心。通过{" "}
              <strong className="text-[var(--text-primary)]">持久化会话</strong>{" "}
              机制，KAIROS 能够跨越终端会话保持完整的状态信息。即使你关闭了终端窗口，
              下次启动时 KAIROS 可以自动恢复之前的上下文，继续未完成的工作。
            </p>
            <p>
              会话历史记录了完整的交互过程，包括对话消息、文件操作、命令执行等，
              使得 KAIROS 能够在任意时间点准确理解项目的当前状态和历史变更。
            </p>
          </div>

          <ArchitectureDiagram
            title="KAIROS 会话数据结构"
            nodes={[
              { id: "session", label: "KairosSession", x: 310, y: 10, color: "var(--accent-purple)" },
              { id: "sid", label: "id: string", x: 20, y: 100, color: "var(--accent-blue)" },
              { id: "started", label: "startedAt: Date", x: 180, y: 100, color: "var(--accent-blue)" },
              { id: "active", label: "lastActiveAt: Date", x: 350, y: 100, color: "var(--accent-blue)" },
              { id: "ctx", label: "context: SessionContext", x: 520, y: 100, color: "var(--accent-cyan)" },
              { id: "hist", label: "history: Message[]", x: 690, y: 100, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "session", to: "sid", label: "" },
              { from: "session", to: "started", label: "" },
              { from: "session", to: "active", label: "" },
              { from: "session", to: "ctx", label: "" },
              { from: "session", to: "hist", label: "" },
            ]}
            width={860}
            height={180}
          />

          <ArchitectureDiagram
            title="会话生命周期管理"
            nodes={[
              { id: "create", label: "1. 创建会话", x: 20, y: 30, color: "#10b981" },
              { id: "create-detail", label: "生成唯一 ID\n初始化上下文\n持久化存储", x: 20, y: 110, color: "#10b981" },
              { id: "running", label: "2. 会话运行", x: 310, y: 30, color: "var(--accent-blue)" },
              { id: "running-detail", label: "更新时间戳\n追加消息记录\n持续持久化", x: 310, y: 110, color: "var(--accent-blue)" },
              { id: "restore", label: "3. 恢复会话", x: 600, y: 30, color: "var(--accent-purple)" },
              { id: "restore-detail", label: "获取历史记录\n加载上下文\n无缝恢复", x: 600, y: 110, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "create", to: "create-detail", label: "" },
              { from: "create", to: "running", label: "启动" },
              { from: "running", to: "running-detail", label: "" },
              { from: "running", to: "restore", label: "终端关闭" },
              { from: "restore", to: "restore-detail", label: "" },
              { from: "restore", to: "running", label: "恢复运行" },
            ]}
            width={860}
            height={200}
          />
        </section>
      </ScrollReveal>

      {/* ═══════ Section 3: 主动行动 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="主动行动" subtitle="环境监控与智能响应" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              KAIROS 最强大的特性之一是其主动行动能力。它持续监控开发环境的各种变化，
              包括文件修改、Git 状态变更、测试结果等，并在检测到潜在问题时自动提供建议或执行修复。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "环境监控",
                desc: "持续追踪文件变化、Git 状态、测试结果等开发环境指标",
                detail:
                  "通过文件系统监听和 Git 钩子，KAIROS 实时感知项目中的每一次变更，构建完整的变更上下文。",
              },
              {
                name: "主动建议",
                desc: "检测到问题时自动分析并提供建议方案",
                detail:
                  "利用代码分析和模式匹配，KAIROS 在问题扩大前就能发现潜在风险，并主动向开发者报告。",
              },
              {
                name: "自动修复",
                desc: "在用户授权的情况下自动执行修复操作",
                detail:
                  "对于常见问题（如 lint 错误、格式问题），KAIROS 可以在获得授权后自动修复，减少手动干预。",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <h5 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                  {item.name}
                </h5>
                <p className="text-sm text-[var(--accent-cyan)] mb-3">
                  {item.desc}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <ArchitectureDiagram
            title="主动行动引擎流程"
            nodes={[
              { id: "monitor", label: "环境监控", x: 20, y: 60, color: "#f59e0b" },
              { id: "detect", label: "变更检测", x: 210, y: 60, color: "var(--accent-blue)" },
              { id: "analyze", label: "变更分析", x: 400, y: 60, color: "var(--accent-purple)" },
              { id: "decision", label: "问题判定", x: 590, y: 60, color: "#f43f5e" },
              { id: "notify", label: "主动通知用户", x: 590, y: 170, color: "var(--accent-cyan)" },
              { id: "suggest", label: "生成修复建议", x: 400, y: 170, color: "#10b981" },
              { id: "autofix", label: "授权自动修复", x: 210, y: 170, color: "#10b981" },
              { id: "sources", label: "文件/Git/测试", x: 20, y: 170, color: "#64748b" },
            ]}
            edges={[
              { from: "sources", to: "monitor", label: "数据源" },
              { from: "monitor", to: "detect", label: "捕获" },
              { from: "detect", to: "analyze", label: "送审" },
              { from: "analyze", to: "decision", label: "评估" },
              { from: "decision", to: "notify", label: "发现问题" },
              { from: "notify", to: "suggest", label: "请求" },
              { from: "suggest", to: "autofix", label: "授权" },
              { from: "autofix", to: "sources", label: "应用修复" },
            ]}
            width={860}
            height={260}
          />
        </section>
      </ScrollReveal>

      {/* ═══════ Section 4: 简要模式 (Brief Mode) ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="简要模式 (Brief Mode)" subtitle="超简洁响应，提升持续交互效率" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              简要模式是 KAIROS 针对持久化上下文场景专门优化的响应风格。在长时间运行中，
              过多的输出会造成信息过载。简要模式通过{" "}
              <strong className="text-[var(--text-primary)]">精简输出</strong>{" "}
              大幅减少响应长度，只保留最关键的信息，显著提高持续交互的效率。
            </p>
          </div>

          <div className="my-8 space-y-6">
            {/* 普通模式示例 */}
            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[var(--card-border)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-sm text-[var(--text-secondary)] font-medium">
                  普通模式
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  我已经仔细检查了你的代码，发现 src/app.ts 文件第42行有一个未处理的错误。
                  建议添加 try-catch 块来捕获可能的异常。这里是修复代码...
                </p>
              </div>
            </div>

            {/* 简要模式示例 */}
            <div className="rounded-xl border border-[var(--accent-cyan)] bg-[var(--card-bg)] overflow-hidden">
              <div className="px-4 py-2.5 border-b border-[var(--card-border)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
                <span className="text-sm text-[var(--accent-cyan)] font-medium">
                  简要模式
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm text-[var(--text-primary)] leading-relaxed font-mono">
                  src/app.ts:42 - 缺少 try-catch，建议添加错误处理
                </p>
              </div>
            </div>

            <div className="text-center text-sm text-[var(--text-secondary)] opacity-70">
              简要模式输出更精炼，适合持久上下文中快速获取关键信息
            </div>
          </div>

          <ArchitectureDiagram
            title="简要模式配置选项"
            nodes={[
              { id: "config", label: "BriefModeConfig", x: 310, y: 10, color: "var(--accent-purple)" },
              { id: "enabled", label: "enabled: boolean", x: 10, y: 110, color: "#10b981" },
              { id: "maxlen", label: "maxLength: number", x: 190, y: 110, color: "var(--accent-blue)" },
              { id: "showctx", label: "showCodeContext: boolean", x: 380, y: 110, color: "var(--accent-blue)" },
              { id: "verbosity", label: "verbosity", x: 580, y: 110, color: "#f59e0b" },
              { id: "v-min", label: "minimal", x: 490, y: 210, color: "#64748b" },
              { id: "v-cmp", label: "compact", x: 630, y: 210, color: "#64748b" },
              { id: "v-norm", label: "normal", x: 760, y: 210, color: "#64748b" },
            ]}
            edges={[
              { from: "config", to: "enabled", label: "" },
              { from: "config", to: "maxlen", label: "" },
              { from: "config", to: "showctx", label: "" },
              { from: "config", to: "verbosity", label: "" },
              { from: "verbosity", to: "v-min", label: "" },
              { from: "verbosity", to: "v-cmp", label: "" },
              { from: "verbosity", to: "v-norm", label: "" },
            ]}
            width={900}
            height={280}
          />
        </section>
      </ScrollReveal>

      {/* ═══════ Section 5: 与标准模式的区别 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="与标准模式的区别" subtitle="KAIROS 模式 vs 标准模式全方位对比" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              KAIROS 模式与 Claude Code 的标准模式在多个维度上存在根本性差异。
              标准模式适合执行单次任务，而 KAIROS 模式则设计为持续的长期开发伙伴。
              以下是两者的详细对比：
            </p>
          </div>

          {/* Comparison table */}
          <div className="my-8 rounded-xl border border-[var(--card-border)] overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-[#161b22] border-b border-[var(--card-border)]">
              <div className="px-4 py-3 text-sm font-semibold text-[var(--text-secondary)]">
                特性
              </div>
              <div className="px-4 py-3 text-sm font-semibold text-gray-400 text-center">
                标准模式
              </div>
              <div className="px-4 py-3 text-sm font-semibold text-[var(--accent-cyan)] text-center">
                KAIROS 模式
              </div>
            </div>

            {/* Table rows */}
            {[
              {
                feature: "生命周期",
                standard: "单次会话",
                kairos: "持久运行",
              },
              {
                feature: "上下文",
                standard: "当前会话",
                kairos: "跨会话持久化",
              },
              {
                feature: "响应风格",
                standard: "详细完整",
                kairos: "简洁精炼",
              },
              {
                feature: "主动性",
                standard: "被动等待",
                kairos: "主动监控",
              },
              {
                feature: "记忆",
                standard: "会话内",
                kairos: "长期记忆 + 做梦整合",
              },
              {
                feature: "适用场景",
                standard: "任务执行",
                kairos: "持续开发助手",
              },
            ].map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 border-b border-[var(--card-border)] last:border-b-0 ${
                  i % 2 === 0 ? "bg-[var(--card-bg)]" : "bg-[var(--card-bg)]/50"
                }`}
              >
                <div className="px-4 py-3 text-sm text-[var(--text-primary)] font-medium">
                  {row.feature}
                </div>
                <div className="px-4 py-3 text-sm text-[var(--text-secondary)] text-center">
                  {row.standard}
                </div>
                <div className="px-4 py-3 text-sm text-[var(--accent-cyan)] text-center font-medium">
                  {row.kairos}
                </div>
              </div>
            ))}
          </div>

          <ArchitectureDiagram
            title="KAIROS 模式配置总览"
            nodes={[
              { id: "root", label: "kairosConfig", x: 360, y: 10, color: "var(--accent-purple)" },
              { id: "persist", label: "persistentSession: true", x: 30, y: 110, color: "#10b981" },
              { id: "env", label: "environmentWatch", x: 250, y: 110, color: "var(--accent-blue)" },
              { id: "brief", label: "briefMode", x: 470, y: 110, color: "var(--accent-cyan)" },
              { id: "memory", label: "longTermMemory", x: 680, y: 110, color: "#f59e0b" },
              { id: "env-f", label: "fileChanges", x: 100, y: 210, color: "#64748b" },
              { id: "env-g", label: "gitStatus", x: 260, y: 210, color: "#64748b" },
              { id: "env-t", label: "testResults", x: 420, y: 210, color: "#64748b" },
              { id: "brief-e", label: "enabled: true", x: 510, y: 210, color: "#64748b" },
              { id: "brief-v", label: "verbosity: compact", x: 680, y: 210, color: "#64748b" },
              { id: "mem-e", label: "enabled: true", x: 620, y: 210, color: "#64748b" },
              { id: "mem-d", label: "maxRetention: 30d", x: 780, y: 210, color: "#64748b" },
            ]}
            edges={[
              { from: "root", to: "persist", label: "" },
              { from: "root", to: "env", label: "" },
              { from: "root", to: "brief", label: "" },
              { from: "root", to: "memory", label: "" },
              { from: "env", to: "env-f", label: "" },
              { from: "env", to: "env-g", label: "" },
              { from: "env", to: "env-t", label: "" },
              { from: "brief", to: "brief-e", label: "" },
              { from: "brief", to: "brief-v", label: "" },
              { from: "memory", to: "mem-e", label: "" },
              { from: "memory", to: "mem-d", label: "" },
            ]}
            width={960}
            height={290}
          />
        </section>
      </ScrollReveal>

      {/* ═══════════════════════════════════════════════════════════
          NEW SECTIONS: Dreaming Mechanism, Memory Integration
         ═══════════════════════════════════════════════════════════ */}

      {/* ═══════ Section 6: KAIROS 状态机 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="KAIROS 状态机"
            subtitle="从空闲到做梦的完整生命周期"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              KAIROS 助手并非始终处于"对话"状态。它有完整的生命周期状态机：
              从<strong className="text-[var(--text-primary)]">空闲</strong>开始，经过
              <strong className="text-[var(--text-primary)]">对话</strong>、
              <strong className="text-[var(--text-primary)]">离线</strong>，
              最终进入最关键的
              <strong className="text-[var(--text-primary)]">做梦</strong>阶段。
              做梦完成后，整合的记忆写入存储，助手恢复就绪。
            </p>
          </div>

          <ArchitectureDiagram
            title="KAIROS 状态机 — 空闲 → 对话 → 离线 → 做梦 → 恢复"
            nodes={STATE_MACHINE_NODES}
            edges={STATE_MACHINE_EDGES}
            width={780}
            height={340}
          />

          {/* 状态说明卡片 */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "空闲 / 对话", desc: "正常交互，用户与助手实时通信", emoji: "🟢" },
              { label: "离线", desc: "终端关闭，但会话数据已持久化到磁盘", emoji: "🌑" },
              { label: "做梦", desc: "后台子代理扫描记忆、整合信号、更新索引", emoji: "💭" },
              { label: "恢复", desc: "下次启动时加载整合后的记忆，无缝继续", emoji: "⚡" },
            ].map((s) => (
              <div
                key={s.label}
                className="p-4 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="text-2xl mb-2">{s.emoji}</div>
                <h5 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {s.label}
                </h5>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════ Section 7: AutoDream 自动做梦服务 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="AutoDream — 自动做梦服务"
            subtitle="离线时的记忆整合引擎"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              AutoDream 是 KAIROS 模式的核心创新之一。当助手离线后，系统会自动触发一个
              <strong className="text-[var(--text-primary)]">分叉子代理（Forked Agent）</strong>，
              以只读方式扫描记忆目录和会话记录，将新信号整合到持久化记忆中。这个过程就像人类在
              睡眠中整理白天的记忆——因此得名"做梦"。
            </p>
            <p>
              做梦过程由严格的三重门控保护，确保不会在不必要时频繁触发，也不会在另一个进程
              正在整合时产生冲突。
            </p>
          </div>

          {/* 门控流程 */}
          <div className="my-8">
            <h4 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              🔐 三重门控机制
            </h4>
            <CodeFlow
              title="三重门控流程"
              steps={GATE_FLOW_STEPS.map((s) => ({
                code: `// ${s.label}
${s.code}`,
                highlight: [],
                description: s.label,
              }))}
            />
          </div>

          {/* AutoDream 架构图 */}
          <ArchitectureDiagram
            title="AutoDream 架构"
            nodes={[
              { id: "hook", label: "stopHooks\n(每轮触发)", x: 30, y: 20, color: "#64748b" },
              { id: "gate", label: "三重门控\n时间/会话/锁", x: 210, y: 20, color: "#f59e0b" },
              { id: "fork", label: "Forked Agent\n(只读子代理)", x: 420, y: 20, color: "var(--accent-purple)" },
              { id: "scan", label: "扫描记忆目录\n+ 会话记录", x: 630, y: 20, color: "var(--accent-cyan)" },
              { id: "consolidate", label: "整合信号\n去重/修正", x: 420, y: 160, color: "#10b981" },
              { id: "write", label: "写入记忆文件\n更新 MEMORY.md", x: 630, y: 160, color: "#f43f5e" },
              { id: "lock", label: ".consolidate-lock\n(PID + mtime)", x: 210, y: 160, color: "#64748b" },
            ]}
            edges={[
              { from: "hook", to: "gate", label: "触发检查" },
              { from: "gate", to: "fork", label: "门控通过" },
              { from: "fork", to: "scan", label: "探索" },
              { from: "scan", to: "consolidate", label: "信号" },
              { from: "consolidate", to: "write", label: "写入" },
              { from: "gate", to: "lock", label: "获取锁" },
            ]}
            width={860}
            height={280}
          />

          {/* DreamTask 状态 */}
          <div className="mt-8">
            <h4 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              📋 DreamTask — 做梦任务状态
            </h4>
            <div className="rounded-xl border border-[var(--card-border)] overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 bg-[#161b22] border-b border-[var(--card-border)]">
                {["字段", "类型", "说明", "示例"].map((h) => (
                  <div key={h} className="px-3 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                    {h}
                  </div>
                ))}
              </div>
              {[
                { field: "status", type: "string", desc: "运行状态", example: "running | completed | failed | killed" },
                { field: "phase", type: "DreamPhase", desc: "当前阶段", example: "starting → updating" },
                { field: "sessionsReviewing", type: "number", desc: "正在审查的会话数", example: "12" },
                { field: "filesTouched", type: "string[]", desc: "被修改的文件路径", example: "[project_deadlines.md]" },
                { field: "turns", type: "DreamTurn[]", desc: "助手回合记录", example: "text + toolUseCount" },
                { field: "priorMtime", type: "number", desc: "锁的先前 mtime（回滚用）", example: "1712345678901" },
              ].map((row, i) => (
                <div
                  key={row.field}
                  className={`grid grid-cols-2 sm:grid-cols-4 border-b border-[var(--card-border)] last:border-b-0 ${
                    i % 2 === 0 ? "bg-[var(--card-bg)]" : "bg-[var(--card-bg)]/50"
                  }`}
                >
                  <div className="px-3 py-2 text-xs font-mono text-[var(--accent-cyan)]">{row.field}</div>
                  <div className="px-3 py-2 text-xs text-[var(--text-secondary)]">{row.type}</div>
                  <div className="px-3 py-2 text-xs text-[var(--text-secondary)]">{row.desc}</div>
                  <div className="px-3 py-2 text-xs text-[var(--text-primary)] font-mono">{row.example}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════ Section 8: 做梦四阶段流程 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="做梦四阶段"
            subtitle="Orient → Gather → Consolidate → Prune"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              做梦过程分为四个明确的阶段，由 consolidationPrompt 构建的提示词驱动。
              子代理以<strong className="text-[var(--text-primary)]">只读权限</strong>运行，
              限制 Bash 为只读命令（ls、grep、cat 等），但可以自由写入记忆目录。
            </p>
          </div>

          <CodeFlow
            title="做梦四阶段"
            steps={DREAM_FLOW_STEPS.map((s) => ({
              code: `# ${s.title}
${s.code}`,
              highlight: [],
              description: s.desc,
            }))}
          />
        </section>
      </ScrollReveal>

      {/* ═══════ Section 9: 记忆系统 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="记忆系统与整合"
            subtitle="四类型记忆 + 自动去重 + 上下文优化"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              KAIROS 的记忆系统采用封闭的四种类型分类法：<strong className="text-[var(--text-primary)]">user</strong>（用户画像）、
              <strong className="text-[var(--text-primary)]">feedback</strong>（行为指导）、
              <strong className="text-[var(--text-primary)]">project</strong>（项目上下文）、
              <strong className="text-[var(--text-primary)]">reference</strong>（外部指针）。
              每种记忆都排除可从代码状态推导的信息（架构、Git 历史、文件结构）。
            </p>
          </div>

          {/* 记忆类型卡片 */}
          <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {MEMORY_TYPES.map((m) => (
              <div
                key={m.type}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">
                    {m.label}
                  </h5>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--card-bg)] border border-[var(--card-border)] text-[var(--text-secondary)]">
                    {m.scope}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{m.desc}</p>
              </div>
            ))}
          </div>

          {/* 记忆文件格式 */}
          <div className="my-8">
            <h4 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              📝 记忆文件格式（Frontmatter）
            </h4>
            <CodeBlock
              code={`---
name: testing-preferences
description: 用户对测试方式的行为偏好——集成测试优先，禁用 mock
type: feedback
---

**规则**: 集成测试必须连接真实数据库，不使用 mock

**Why**: 上季度 mock 测试通过但生产迁移失败，教训深刻

**How to apply**: 编写测试时选择集成测试套件；审查他人 PR 时
对 mock 使用提出质疑`}
              language="markdown"
            />
          </div>

          {/* 记忆整合前后对比 */}
          <div className="my-8">
            <h4 className="text-base font-semibold text-[var(--text-primary)] mb-4">
              🔄 记忆整合前后对比
            </h4>
            <div className="space-y-3">
              {MEMORY_COMPARISON.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-3 gap-0 rounded-xl border border-[var(--card-border)] overflow-hidden"
                >
                  <div className="px-4 py-3 bg-[#f43f5e]/10 border-b md:border-b-0 md:border-r border-[var(--card-border)]">
                    <div className="text-xs text-[#f43f5e] font-semibold mb-1">整合前</div>
                    <div className="text-sm text-[var(--text-secondary)]">{row.before}</div>
                  </div>
                  <div className="px-4 py-3 bg-[#10b981]/10 border-b md:border-b-0 md:border-r border-[var(--card-border)]">
                    <div className="text-xs text-[#10b981] font-semibold mb-1">整合后</div>
                    <div className="text-sm text-[var(--text-primary)]">{row.after}</div>
                  </div>
                  <div className="px-4 py-3 bg-[var(--card-bg)]">
                    <div className="text-xs text-[var(--text-secondary)] font-semibold mb-1">示例</div>
                    <div className="text-sm text-[var(--text-secondary)] font-mono">{row.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ═══════ Section 10: 记忆检索与上下文优化 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="记忆检索与上下文优化"
            subtitle="findRelevantMemories — 智能记忆召回"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              当用户发起新对话时，系统不会加载全部记忆（可能上百个文件）。
              相反，<strong className="text-[var(--text-primary)]">findRelevantMemories</strong>{" "}
              先扫描所有记忆文件的 Frontmatter（标题 + 描述），然后用 Sonnet 模型选择最多 5 条最相关的记忆注入上下文。
            </p>
            <p>
              每条召回的记忆还附带<strong className="text-[var(--text-primary)]">新鲜度提示</strong>：
              超过 1 天的记忆会显示"N 天前"警告，提醒模型在引用前验证当前代码状态。
            </p>
          </div>

          <ArchitectureDiagram
            title="记忆检索流程"
            nodes={[
              { id: "query", label: "用户查询", x: 30, y: 60, color: "var(--accent-blue)" },
              { id: "scan", label: "scanMemoryFiles\n(读取 Frontmatter)", x: 230, y: 60, color: "var(--accent-cyan)" },
              { id: "select", label: "Sonnet 选择器\n(≤5 条相关)", x: 460, y: 60, color: "var(--accent-purple)" },
              { id: "inject", label: "注入上下文\n(含新鲜度提示)", x: 690, y: 60, color: "#10b981" },
              { id: "memdir", label: "memory/\n*.md 文件", x: 230, y: 180, color: "#64748b" },
              { id: "manifest", label: "格式化清单\n(type + desc + ts)", x: 460, y: 180, color: "#64748b" },
            ]}
            edges={[
              { from: "query", to: "scan", label: "触发" },
              { from: "scan", to: "select", label: "清单" },
              { from: "select", to: "inject", label: "选中" },
              { from: "memdir", to: "scan", label: "读取" },
              { from: "scan", to: "manifest", label: "格式化" },
              { from: "manifest", to: "select", label: "输入" },
            ]}
            width={860}
            height={270}
          />

          <CodeBlock
            code={`// findRelevantMemories 核心逻辑
async function findRelevantMemories(query, memoryDir, signal) {
  // 1. 扫描记忆目录，读取每个 .md 的 Frontmatter（≤30行）
  const memories = await scanMemoryFiles(memoryDir, signal);
  
  // 2. 用 Sonnet 从清单中选择 ≤5 条最相关的
  const selected = await selectRelevantMemories(query, memories, signal);
  
  // 3. 返回路径 + mtime（用于新鲜度警告）
  return selected.map(m => ({ path: m.filePath, mtimeMs: m.mtimeMs }));
}`}
            language="typescript"
          />
        </section>
      </ScrollReveal>

      {/* ═══════ Section 11: 锁机制与容错 ═══════ */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="锁机制与容错"
            subtitle=".consolidate-lock — 基于 PID + mtime 的分布式锁"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              做梦过程的锁文件<strong className="text-[var(--text-primary)]">.consolidate-lock</strong> 存放在记忆目录内，
              其 <code className="text-[var(--accent-cyan)]">mtime</code> 就是上次整合的时间戳（lastConsolidatedAt），
              文件内容是持有者的 PID。这种巧妙的设计让锁和时间门控共用一个文件。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "获取锁",
                desc: "写入 PID → mtime = now，返回先前 mtime（用于回滚）",
                color: "#10b981",
              },
              {
                title: "竞争检测",
                desc: "双重验证：PID 必须匹配 + 持有时间 < 1小时（防 PID 复用）",
                color: "#f59e0b",
              },
              {
                title: "失败回滚",
                desc: "回滚 mtime 到先前值，下次时间门控重新触发",
                color: "#f43f5e",
              },
              {
                title: "崩溃恢复",
                desc: "死 PID 自动回收，新进程接管并重新开始整合",
                color: "var(--accent-cyan)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <h5 className="text-sm font-semibold mb-1" style={{ color: item.color }}>
                  {item.title}
                </h5>
                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
