import { ModuleLayout } from "@/components/ModuleLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function AssistantPage() {
  const relatedModules = [
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
      subtitle="Claude Code 的持久化 AI 助手模式 — 持续运行、主动行动、精简交互"
      icon="🤖"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: KAIROS 概述 */}
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

      {/* Section 2: 会话管理 */}
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

          <CodeBlock
            code={`// KAIROS 会话生命周期
interface KairosSession {
  id: string;
  startedAt: Date;
  lastActiveAt: Date;
  context: SessionContext;
  history: Message[];
}

// 恢复会话
async function restoreSession(id: string) {
  const session = await fetchSessionHistory(id);
  await loadContext(session.context);
  return session;
}`}
            language="typescript"
            filename="kairos/session.ts"
            highlights={[2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14]}
          />

          <CodeFlow
            title="会话生命周期管理"
            steps={[
              {
                code: `// Step 1: 创建新会话\nconst session: KairosSession = {\n  id: generateSessionId(),\n  startedAt: new Date(),\n  lastActiveAt: new Date(),\n  context: await initContext(),\n  history: [],\n};\nawait persistSession(session);`,
                highlight: [2, 3, 4, 5],
                description:
                  "创建新的 KAIROS 会话。每个会话拥有唯一 ID，记录启动时间和初始上下文，为后续持久化恢复奠定基础。",
              },
              {
                code: `// Step 1: 创建新会话\nconst session = { id: generateSessionId(), ... };\nawait persistSession(session);\n\n// Step 2: 会话运行中 — 持续更新\nsession.lastActiveAt = new Date();\nsession.history.push(userMessage);\nsession.history.push(assistantResponse);\nawait persistSession(session);`,
                highlight: [6, 7, 8, 9],
                description:
                  "会话运行期间，每次交互都会更新 lastActiveAt 时间戳并追加历史消息。会话状态被持续持久化，确保随时可以恢复。",
              },
              {
                code: `// Step 1: 创建新会话\n// Step 2: 持续更新\n\n// Step 3: 恢复会话 — 跨终端保持状态\nasync function restoreSession(id: string) {\n  const session = await fetchSessionHistory(id);\n  await loadContext(session.context);\n  // 从上次中断处继续\n  return session;\n}`,
                highlight: [6, 7, 8, 9, 10],
                description:
                  "终端重新启动时，通过会话 ID 获取历史记录，加载之前保存的上下文状态，实现无缝恢复。用户无需重复说明之前的任务。",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Section 3: 主动行动 */}
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

          <CodeBlock
            code={`// 主动行动引擎
async function monitorEnvironment() {
  const changes = await detectFileChanges();
  const issues = await analyzeChanges(changes);

  if (issues.length > 0) {
    // 主动向用户报告发现的问题
    notifyUser({
      type: 'proactive_insight',
      message: \`发现 \${issues.length} 个潜在问题\`,
      suggestions: issues.map(generateFix),
    });
  }
}`}
            language="typescript"
            filename="kairos/proactive.ts"
            highlights={[2, 3, 4, 6, 7, 8, 9, 10, 11]}
          />
        </section>
      </ScrollReveal>

      {/* Section 4: 简要模式 (Brief Mode) */}
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

          <CodeBlock
            code={`// 简要模式配置
interface BriefModeConfig {
  enabled: boolean;
  maxLength: number;       // 响应最大字符数
  showCodeContext: boolean; // 是否显示代码上下文
  verbosity: 'minimal' | 'compact' | 'normal';
}

// 简要模式下的输出格式化
function briefFormat(issue: CodeIssue): string {
  return \`\${issue.file}:\${issue.line} - \${issue.summary}\`;
}

// 普通模式下的输出格式化
function normalFormat(issue: CodeIssue): string {
  return \`我已经仔细检查了你的代码，发现 \${issue.file} 文件\`
    + \`第\${issue.line}行有一个未处理的错误。\`
    + \`建议添加 try-catch 块来捕获可能的异常...\`;
}`}
            language="typescript"
            filename="kairos/briefMode.ts"
            highlights={[2, 3, 4, 5, 9, 13, 14, 15]}
          />
        </section>
      </ScrollReveal>

      {/* Section 5: 与标准模式的区别 */}
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
                kairos: "长期记忆",
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

          <CodeBlock
            code={`// KAIROS 模式激活
export const kairosConfig = {
  // 启用持久化会话
  persistentSession: true,
  // 启用环境监控
  environmentWatch: {
    fileChanges: true,
    gitStatus: true,
    testResults: true,
  },
  // 启用简要模式
  briefMode: {
    enabled: true,
    verbosity: 'compact',
  },
  // 长期记忆
  longTermMemory: {
    enabled: true,
    maxRetentionDays: 30,
  },
};`}
            language="typescript"
            filename="kairos/config.ts"
            highlights={[2, 4, 5, 6, 7, 8, 10, 11, 12, 14, 15, 16]}
          />
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
