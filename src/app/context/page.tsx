"use client";

import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

import { CodeBlock } from "@/components/CodeBlock";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

const relatedModules = [
  {
    title: "查询引擎",
    href: "/query-engine",
    description: "Token 预算与查询处理",
    icon: "🔍",
  },
  {
    title: "工具系统",
    href: "/tools",
    description: "内置与 MCP 工具详解",
    icon: "🛠️",
  },
  {
    title: "系统架构",
    href: "/architecture",
    description: "整体架构概览",
    icon: "🏗️",
  },
  {
    title: "多智能体",
    href: "/coordinator",
    description: "Agent 协调器",
    icon: "🕸️",
  },
];

export default function ContextPage() {
  return (
    <ModuleLayout
      title="上下文管理"
      subtitle="Claude Code 如何收集、压缩、分配和管理对话上下文"
      icon="🧠"
      category="核心机制"
      relatedModules={relatedModules}
    >
      {/* 上下文收集器 */}
      <ScrollReveal>
        <SectionTitle title="上下文收集器" subtitle="Context Collectors" />
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Claude Code 的上下文由三大收集器组成，在每次对话开始时并行收集并缓存：
          </p>

          <ArchitectureDiagram
            title="上下文收集架构"
            nodes={[
              { id: "system", label: "SystemContext", x: 250, y: 40, color: "var(--accent-purple)" },
              { id: "git", label: "Git Status", x: 80, y: 140, color: "var(--accent-blue)" },
              { id: "branch", label: "Branch Info", x: 250, y: 140, color: "var(--accent-blue)" },
              { id: "user", label: "UserContext", x: 250, y: 260, color: "var(--accent-cyan)" },
              { id: "claudemd", label: "CLAUDE.md", x: 80, y: 360, color: "var(--accent-green)" },
              { id: "date", label: "Current Date", x: 420, y: 360, color: "var(--accent-green)" },
              { id: "api", label: "API Cache Key", x: 250, y: 460, color: "var(--accent-orange)" },
            ]}
            edges={[
              { from: "system", to: "git", label: "" },
              { from: "system", to: "branch", label: "" },
              { from: "system", to: "user", label: "" },
              { from: "user", to: "claudemd", label: "" },
              { from: "user", to: "date", label: "" },
              { from: "user", to: "api", label: "" },
            ]}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-purple)" }}>
                📋 getSystemContext()
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                系统级上下文，每次对话开始时收集一次并使用 <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">memoize</code> 缓存。
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-blue)] mt-0.5">▸</span>
                  <span><strong>Git Status</strong> — 当前分支、主分支、工作区状态（截断至 2000 字符）、最近 5 条提交</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-blue)] mt-0.5">▸</span>
                  <span><strong>Git User</strong> — 用户名配置</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-blue)] mt-0.5">▸</span>
                  <span><strong>Cache Breaker</strong> — 调试用的系统提示注入（仅 ant 环境）</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-cyan)" }}>
                👤 getUserContext()
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-3">
                用户级上下文，包含项目配置和元数据，同样被 memoize 缓存。
              </p>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-green)] mt-0.5">▸</span>
                  <span><strong>CLAUDE.md</strong> — 从项目根目录向上遍历发现，合并多层 CLAUDE.md 文件</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-green)] mt-0.5">▸</span>
                  <span><strong>Memory Files</strong> — 过滤注入的记忆文件（filterInjectedMemoryFiles）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-green)] mt-0.5">▸</span>
                  <span><strong>Current Date</strong> — ISO 格式的当前日期</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--accent-green)] mt-0.5">▸</span>
                  <span><strong>Bare Mode</strong> — <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">--bare</code> 模式跳过自动发现，仅加载显式目录</span>
                </li>
              </ul>
            </div>
          </div>

          <CodeBlock
            code={`// context.ts — 上下文收集主入口
export const getSystemContext = memoize(async () => {
  const gitStatus = await getGitStatus();  // 分支 + status + commits
  return { gitStatus };
});

export const getUserContext = memoize(async () => {
  const claudeMd = shouldDisableClaudeMd
    ? null
    : getClaudeMds(filterInjectedMemoryFiles(await getMemoryFiles()));
  return { claudeMd, currentDate: \`Today's date is \${getLocalISODate()}.\` };
});`}
            language="typescript"
          />
        </div>
      </ScrollReveal>

      {/* 上下文使用分析 */}
      <ScrollReveal>
        <SectionTitle title="上下文使用分析" subtitle="analyzeContextUsage" />
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">analyzeContextUsage()</code> 是上下文管理的核心函数，并行计算所有上下文块的 token 消耗，生成可视化的网格图和详细统计。
          </p>

          <ArchitectureDiagram
            title="上下文分析流程"
            nodes={[
              { id: "input", label: "Messages + Tools", x: 250, y: 30, color: "var(--accent-purple)" },
              { id: "sys", label: "System Prompt", x: 80, y: 140, color: "var(--accent-blue)" },
              { id: "mem", label: "Memory Files", x: 250, y: 140, color: "var(--accent-green)" },
              { id: "tools", label: "Tool Definitions", x: 420, y: 140, color: "var(--accent-cyan)" },
              { id: "msg", label: "Messages", x: 80, y: 250, color: "var(--accent-orange)" },
              { id: "mcp", label: "MCP Tools", x: 250, y: 250, color: "var(--accent-pink)" },
              { id: "agent", label: "Custom Agents", x: 420, y: 250, color: "var(--accent-yellow)" },
              { id: "grid", label: "Context Grid", x: 250, y: 370, color: "var(--accent-purple)" },
              { id: "data", label: "ContextData", x: 250, y: 470, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "input", to: "sys" },
              { from: "input", to: "mem" },
              { from: "input", to: "tools" },
              { from: "input", to: "msg" },
              { from: "input", to: "mcp" },
              { from: "input", to: "agent" },
              { from: "sys", to: "grid" },
              { from: "mem", to: "grid" },
              { from: "tools", to: "grid" },
              { from: "msg", to: "grid" },
              { from: "mcp", to: "grid" },
              { from: "agent", to: "grid" },
              { from: "grid", to: "data" },
            ]}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "System prompt", color: "var(--accent-blue)", desc: "系统提示词，包含工具说明和规则" },
              { name: "System tools", color: "var(--text-tertiary)", desc: "内置工具定义（FileRead, Bash 等）" },
              { name: "MCP tools", color: "var(--accent-cyan)", desc: "外部 MCP 服务器提供的工具" },
              { name: "Memory files", color: "var(--accent-green)", desc: "CLAUDE.md 和项目记忆文件" },
              { name: "Messages", color: "var(--accent-purple)", desc: "对话历史（用户+助手消息）" },
              { name: "Custom agents", color: "var(--accent-yellow)", desc: "用户定义的自定义 Agent" },
              { name: "Skills", color: "var(--accent-orange)", desc: "技能工具的前置元数据" },
              { name: "Slash commands", color: "var(--accent-pink)", desc: "斜杠命令定义" },
              { name: "Free space", color: "var(--border)", desc: "剩余可用上下文空间" },
            ].map((cat) => (
              <div
                key={cat.name}
                className="rounded-lg border border-[var(--border)] bg-[var(--card)] p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-3 h-3 rounded-sm"
                    style={{ backgroundColor: cat.color }}
                  />
                  <span className="text-sm font-medium">{cat.name}</span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{cat.desc}</p>
              </div>
            ))}
          </div>

          <CodeBlock
            code={`// analyzeContextUsage 返回的 ContextData 结构
interface ContextData {
  categories: ContextCategory[];     // 各上下文块的 token 分布
  totalTokens: number;               // 总 token 使用量
  maxTokens: number;                 // 上下文窗口大小
  percentage: number;                // 使用百分比
  gridRows: GridSquare[][];          // 可视化网格数据
  model: string;                     // 当前模型
  memoryFiles: MemoryFile[];         // 记忆文件详情
  mcpTools: McpTool[];               // MCP 工具详情
  agents: Agent[];                   // 自定义 Agent 列表
  messageBreakdown?: {               // 消息级别 token 分解
    toolCallTokens: number;
    toolResultTokens: number;
    userMessageTokens: number;
    assistantMessageTokens: number;
    toolCallsByType: Array<{ name: string; callTokens: number; resultTokens: number }>;
  };
}`}
            language="typescript"
          />
        </div>
      </ScrollReveal>

      {/* Token 预算管理 */}
      <ScrollReveal>
        <SectionTitle title="Token 预算管理" subtitle="Token Budget" />
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Claude Code 支持用户在对话中指定 Token 预算，系统会解析自然语言中的预算声明并追踪进度。
          </p>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--accent-purple)" }}>
              🔄 Token 预算解析流程
            </h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm">
              {[
                { label: "用户输入", desc: "+500k / use 2M tokens", color: "var(--accent-purple)" },
                { label: "正则匹配", desc: "3 种正则模式", color: "var(--accent-blue)" },
                { label: "后缀解析", desc: "k/m/b → 数值", color: "var(--accent-cyan)" },
                { label: "预算值", desc: "number", color: "var(--accent-green)" },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-2">
                  <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-2">
                    <div className="font-medium" style={{ color: step.color }}>{step.label}</div>
                    <div className="text-xs text-[var(--text-secondary)]">{step.desc}</div>
                  </div>
                  {i < 3 && <span className="text-[var(--text-tertiary)] hidden sm:block">→</span>}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: "var(--accent-cyan)" }}>
              📊 parseTokenBudget — 三种匹配模式
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "简写前缀匹配",
                  regex: <code className="text-xs">/^\s*\+(\d+(?:\.\d+)?)\s*(k|m|b)\b/i</code>,
                  examples: ['"+500k 开发这个功能"', '"+2m 分析整个代码库"'],
                  note: "以 + 开头，位于行首",
                },
                {
                  name: "简写后缀匹配",
                  regex: <code className="text-xs">/\s\+(\d+(?:\.\d+)?)\s*(k|m|b)\s*[.!?]?\s*$/i</code>,
                  examples: ['"预算 +500k."', '"请用 +2m tokens。"'],
                  note: "以 + 开头，位于句尾",
                },
                {
                  name: "详细模式匹配",
                  regex: <code className="text-xs">/\b(?:use|spend)\s+(\d+(?:\.\d+)?)\s*(k|m|b)\s*tokens?\b/i</code>,
                  examples: ['"use 2M tokens"', '"spend 500k tokens"'],
                  note: "全文匹配，不限制位置",
                },
              ].map((mode) => (
                <div key={mode.name} className="rounded-lg bg-[var(--bg-secondary)] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold">{mode.name}</span>
                    <span className="text-xs text-[var(--text-tertiary)]">({mode.note})</span>
                  </div>
                  <div className="mb-2 font-mono text-xs text-[var(--accent-cyan)]">{mode.regex}</div>
                  <div className="flex flex-wrap gap-2">
                    {mode.examples.map((ex) => (
                      <span key={ex} className="text-xs bg-[var(--bg-primary)] border border-[var(--border)] px-2 py-1 rounded">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            code={`// utils/tokenBudget.ts
const MULTIPLIERS: Record<string, number> = {
  k: 1_000,
  m: 1_000_000,
  b: 1_000_000_000,
};

export function parseTokenBudget(text: string): number | null {
  // 1. 简写前缀: "+500k"
  const startMatch = text.match(SHORTHAND_START_RE);
  if (startMatch) return parseBudgetMatch(startMatch[1], startMatch[2]);
  // 2. 简写后缀: "预算 +500k."
  const endMatch = text.match(SHORTHAND_END_RE);
  if (endMatch) return parseBudgetMatch(endMatch[1], endMatch[2]);
  // 3. 详细模式: "use 2M tokens"
  const verboseMatch = text.match(VERBOSE_RE);
  if (verboseMatch) return parseBudgetMatch(verboseMatch[1], verboseMatch[2]);
  return null;
}

export function getBudgetContinuationMessage(
  pct: number, turnTokens: number, budget: number
): string {
  return \`Stopped at \${pct}% of token target (\${turnTokens} / \${budget}). Keep working.\`;
}`}
            language="typescript"
          />
        </div>
      </ScrollReveal>

      {/* Context Provider 体系 */}
      <ScrollReveal>
        <SectionTitle title="Context Provider 体系" subtitle="React Context Architecture" />
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Claude Code 使用多个 React Context Provider 管理不同维度的运行时状态。以下是核心 Provider 的职责和设计模式。
          </p>

          <ArchitectureDiagram
            title="Context Provider 层级"
            nodes={[
              { id: "app", label: "AppStore", x: 250, y: 30, color: "var(--accent-purple)" },
              { id: "mailbox", label: "Mailbox", x: 80, y: 130, color: "var(--accent-blue)" },
              { id: "stats", label: "Stats", x: 250, y: 130, color: "var(--accent-green)" },
              { id: "overlay", label: "Overlay", x: 420, y: 130, color: "var(--accent-cyan)" },
              { id: "modal", label: "Modal", x: 80, y: 230, color: "var(--accent-orange)" },
              { id: "notif", label: "Notifications", x: 250, y: 230, color: "var(--accent-pink)" },
              { id: "fps", label: "FpsMetrics", x: 420, y: 230, color: "var(--accent-yellow)" },
              { id: "voice", label: "Voice", x: 250, y: 330, color: "var(--accent-purple)" },
              { id: "queued", label: "QueuedMsg", x: 80, y: 330, color: "var(--accent-blue)" },
              { id: "prompt", label: "PromptOverlay", x: 420, y: 330, color: "var(--accent-green)" },
            ]}
            edges={[
              { from: "app", to: "mailbox" },
              { from: "app", to: "stats" },
              { from: "app", to: "overlay" },
              { from: "mailbox", to: "modal" },
              { from: "stats", to: "notif" },
              { from: "overlay", to: "fps" },
              { from: "modal", to: "voice" },
              { from: "notif", to: "queued" },
              { from: "fps", to: "prompt" },
            ]}
          />

          {/* Mailbox */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-blue)" }}>
              📬 Mailbox — 消息队列
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              Mailbox 是一个全局消息队列，使用 <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">useMemo</code> 创建单例，
              通过 Context 向下传递。所有子组件都可以向队列发送消息或消费消息。
            </p>
            <CodeBlock
              code={`// context/mailbox.tsx
const MailboxContext = createContext<Mailbox | undefined>(undefined);

export function MailboxProvider({ children }: Props) {
  const mailbox = useMemo(() => new Mailbox(), []);
  return (
    <MailboxContext.Provider value={mailbox}>
      {children}
    </MailboxContext.Provider>
  );
}

export function useMailbox(): Mailbox {
  const mailbox = useContext(MailboxContext);
  if (!mailbox) throw new Error("useMailbox must be used within a MailboxProvider");
  return mailbox;
}`}
              language="typescript"
            />
          </div>

          {/* FpsMetrics */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-yellow)" }}>
              ⚡ FpsMetrics — 帧率指标
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              通过 getter 函数而非直接值传递帧率数据，避免不必要的重渲染。
              组件只在需要时调用 <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">useFpsMetrics()</code> 获取当前帧率。
            </p>
            <CodeBlock
              code={`// context/fpsMetrics.tsx
type FpsMetricsGetter = () => FpsMetrics | undefined;
const FpsMetricsContext = createContext<FpsMetricsGetter | undefined>(undefined);

export function FpsMetricsProvider({ getFpsMetrics, children }: Props) {
  return (
    <FpsMetricsContext.Provider value={getFpsMetrics}>
      {children}
    </FpsMetricsContext.Provider>
  );
}

export function useFpsMetrics() {
  return useContext(FpsMetricsContext);
}`}
              language="typescript"
            />
          </div>

          {/* ModalContext */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-orange)" }}>
              🪟 ModalContext — 模态窗口上下文
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              ModalContext 由 FullscreenLayout 设置，当内容渲染在模态插槽中时提供精确的行列数和滚动引用。
              子组件使用 <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">useModalOrTerminalSize()</code> 替代
              <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded ml-1">useTerminalSize()</code> 以获取正确的可用空间。
            </p>
            <CodeBlock
              code={`// context/modalContext.tsx
type ModalCtx = {
  rows: number;
  columns: number;
  scrollRef: RefObject<ScrollBoxHandle | null> | null;
};

export function useIsInsideModal(): boolean {
  return useContext(ModalContext) !== null;
}

export function useModalOrTerminalSize(fallback: { rows: number; columns: number }) {
  const ctx = useContext(ModalContext);
  return ctx ? { rows: ctx.rows, columns: ctx.columns } : fallback;
}`}
              language="typescript"
            />
          </div>

          {/* Notifications */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-pink)" }}>
              🔔 Notifications — 通知系统
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              基于优先级的队列式通知系统，支持 4 个优先级：
              <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded ml-1">immediate</code> &gt;
              <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded ml-1">high</code> &gt;
              <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded ml-1">medium</code> &gt;
              <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded ml-1">low</code>。
              支持 <strong>fold</strong>（合并同 key 通知）和 <strong>invalidates</strong>（自动移除过期通知）。
            </p>
            <CodeBlock
              code={`// context/notifications.tsx
type Priority = 'low' | 'medium' | 'high' | 'immediate';

type BaseNotification = {
  key: string;
  invalidates?: string[];    // 自动移除这些 key 的通知
  priority: Priority;
  timeoutMs?: number;        // 默认 8000ms
  fold?: (acc, incoming) => Notification;  // 合并同 key 通知
};

const PRIORITIES: Record<Priority, number> = {
  immediate: 0, high: 1, medium: 2, low: 3,
};

// immediate 优先级直接打断当前通知，其他排入队列按优先级消费`}
              language="typescript"
            />
          </div>

          {/* OverlayContext */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-cyan)" }}>
              🔲 OverlayContext — 覆盖层追踪
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              解决 Escape 键冲突：当覆盖层（如 Select 下拉）打开时，CancelRequestHandler 不会误取消请求。
              区分模态覆盖层（如 Select）和非模态覆盖层（如 autocomplete）。
            </p>
            <CodeBlock
              code={`// context/overlayContext.tsx
const NON_MODAL_OVERLAYS = new Set(['autocomplete']);

export function useRegisterOverlay(id: string, enabled = true): void {
  // mount 时注册，unmount 时自动注销
  useEffect(() => {
    if (!enabled) return;
    setAppState(prev => ({
      ...prev,
      activeOverlays: new Set(prev.activeOverlays).add(id),
    }));
    return () => { /* 从 Set 中删除 id */ };
  }, [id, enabled]);
}

export function useIsOverlayActive(): boolean {
  return useAppState(s => s.activeOverlays.size > 0);
}

export function useIsModalOverlayActive(): boolean {
  return useAppState(s => {
    for (const id of s.activeOverlays) {
      if (!NON_MODAL_OVERLAYS.has(id)) return true;
    }
    return false;
  });
}`}
              language="typescript"
            />
          </div>

          {/* Stats */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-green)" }}>
              📈 Stats — 统计指标存储
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              使用水库采样（Reservoir Sampling, Algorithm R）实现固定内存的直方图统计，
              支持 counter、gauge、timer、set 四种指标类型。进程退出时自动持久化到项目配置。
            </p>
            <CodeBlock
              code={`// context/stats.tsx
const RESERVOIR_SIZE = 1024;

export function createStatsStore(): StatsStore {
  const histograms = new Map<string, Histogram>();
  return {
    increment(name, value = 1) { /* 计数器 */ },
    set(name, value) { /* 仪表盘 */ },
    observe(name, value) { /* 直方图 + 水库采样 */ },
    add(name, value) { /* 集合去重 */ },
    getAll() {
      // 输出: name_count, name_min, name_max, name_avg, name_p50, name_p95, name_p99
    },
  };
}

// Hooks: useCounter, useGauge, useTimer, useSet`}
              language="typescript"
            />
          </div>

          {/* PromptOverlayContext */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-green)" }}>
              💬 PromptOverlayContext — 提示浮层
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              使用数据/设置器 Context 对分离模式，写入者不会因自己的写入而重渲染。
              支持两个通道：斜杠命令建议数据和任意对话框节点。
            </p>
            <CodeBlock
              code={`// context/promptOverlayContext.tsx
// 数据/设置器 Context 对分离 — setter 永远稳定，不触发重渲染
const DataContext = createContext<PromptOverlayData | null>(null);
const SetContext = createContext<Setter<PromptOverlayData> | null>(null);
const DialogContext = createContext<ReactNode>(null);
const SetDialogContext = createContext<Setter<ReactNode> | null>(null);

export function useSetPromptOverlay(data: PromptOverlayData | null) {
  const set = useContext(SetContext);
  useEffect(() => {
    if (!set) return;
    set(data);
    return () => set(null); // unmount 时自动清除
  }, [set, data]);
}`}
              language="typescript"
            />
          </div>
        </div>
      </ScrollReveal>

      {/* 压缩策略 */}
      <ScrollReveal>
        <SectionTitle title="压缩策略" subtitle="Context Compaction" />
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            Claude Code 实现了多层压缩策略来管理有限的上下文窗口：
          </p>

          <div className="flex flex-col sm:flex-row items-stretch gap-3">
            {[
              { emoji: "🟢", label: "Micro Compact", color: "var(--accent-green)" },
              { emoji: "🟡", label: "Auto Compact", color: "var(--accent-yellow)" },
              { emoji: "🔴", label: "Manual Compact", color: "var(--accent-red)" },
            ].map((step, i) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-2">
                  <span className="mr-2">{step.emoji}</span>
                  <span className="font-medium" style={{ color: step.color }}>{step.label}</span>
                </div>
                {i < 2 && <span className="text-[var(--text-tertiary)] hidden sm:block">→</span>}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="text-2xl mb-3">🟢</div>
              <h4 className="font-semibold mb-2">Micro Compact</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                在 analyzeContextUsage 中自动调用，对消息进行微压缩以减少 token 估算值。
                不改变消息结构，仅去除冗余信息。
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="text-2xl mb-3">🟡</div>
              <h4 className="font-semibold mb-2">Auto Compact</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                上下文使用率接近窗口上限时自动触发。
                预留 <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">AUTOCOMPACT_BUFFER_TOKENS</code> 的安全缓冲区。
                支持 reactive-only 模式（tengu_cobalt_raccoon 特性标志）。
              </p>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="text-2xl mb-3">🔴</div>
              <h4 className="font-semibold mb-2">Manual Compact</h4>
              <p className="text-sm text-[var(--text-secondary)]">
                用户通过 <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">/compact</code> 命令手动触发。
                预留 <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">MANUAL_COMPACT_BUFFER_TOKENS</code>（3k）的缓冲区。
              </p>
            </div>
          </div>

          <CodeBlock
            code={`// 压缩缓冲区计算
const AUTOCOMPACT_BUFFER_TOKENS = 33_000;  // 自动压缩缓冲区
const MANUAL_COMPACT_BUFFER_TOKENS = 3_000; // 手动压缩缓冲区

// 上下文网格计算
const GRID_WIDTH = contextWindow >= 1_000_000 ? 20 : 10;
const GRID_HEIGHT = 10;
const TOTAL_SQUARES = GRID_WIDTH * GRID_HEIGHT;

// 每个方块代表 contextWindow / TOTAL_SQUARES 个 token
// 颜色编码不同上下文类别，形成可视化热力图`}
            language="typescript"
          />
        </div>
      </ScrollReveal>

      {/* 工具延迟加载 */}
      <ScrollReveal>
        <SectionTitle title="工具延迟加载" subtitle="Tool Search & Deferred Loading" />
        <div className="space-y-6">
          <p className="text-[var(--text-secondary)] leading-relaxed">
            当工具数量较多时，Claude Code 启用 Tool Search 机制：工具定义不会全部加载到上下文中，
            而是通过 ToolSearchTool 按需加载。延迟工具不计入上下文使用量，但会单独显示。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-blue)" }}>
                📦 延迟加载的工具
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--text-tertiary)] mt-0.5">▸</span>
                  <span>定义 token 已计算但不计入使用量</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--text-tertiary)] mt-0.5">▸</span>
                  <span>通过 ToolSearchTool 按需加载（搜索 → 调用）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--text-tertiary)] mt-0.5">▸</span>
                  <span>已使用的工具标记为 <code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">isLoaded: true</code></span>
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--accent-green)" }}>
                ✅ 始终加载的工具
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-2">
                  <span className="text-[var(--text-tertiary)] mt-0.5">▸</span>
                  <span>核心内置工具（FileRead, Bash, Grep 等）</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--text-tertiary)] mt-0.5">▸</span>
                  <span>Token 定义计入上下文使用量</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[var(--text-tertiary)] mt-0.5">▸</span>
                  <span>每工具有固定 500 token 的 API 开销（<code className="text-xs bg-[var(--bg-secondary)] px-1 py-0.5 rounded">TOOL_TOKEN_COUNT_OVERHEAD</code>）</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </ModuleLayout>
  );
}
