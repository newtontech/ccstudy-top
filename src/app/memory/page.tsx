import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";
import { CodeBlock } from "@/components/CodeBlock";

const memoryAgeCode = `export function memoryAgeDays(mtimeMs: number): number {
  return Math.max(0, Math.floor((Date.now() - mtimeMs) / 86_400_000))
}

export function memoryAge(mtimeMs: number): string {
  const d = memoryAgeDays(mtimeMs)
  if (d === 0) return 'today'
  if (d === 1) return 'yesterday'
  return \`\${d} days ago\`
}

export function memoryFreshnessText(mtimeMs: number): string {
  const d = memoryAgeDays(mtimeMs)
  if (d <= 1) return ''
  return \`This memory is \${d} days old. Memories are point-in-time
  observations, not live state — verify against current code.\`
}`;

const memoryTypeCode = `export const MEMORY_TYPES = [
  'user',      // 用户画像：角色、偏好、知识水平
  'feedback',  // 反馈指导：纠正与确认的行为准则
  'project',   // 项目上下文：目标、里程碑、事件
  'reference', // 外部资源：Linear、Grafana 等系统指针
] as const`;

const scanMemoryCode = `export async function scanMemoryFiles(
  memoryDir: string,
  signal: AbortSignal,
): Promise<MemoryHeader[]> {
  const entries = await readdir(memoryDir, { recursive: true })
  const mdFiles = entries.filter(
    f => f.endsWith('.md') && basename(f) !== 'MEMORY.md'
  )
  // 读取 frontmatter，按 mtime 降序排列，最多 200 个
  const headers = await Promise.allSettled(
    mdFiles.map(async (relPath) => {
      const filePath = join(memoryDir, relPath)
      const { content, mtimeMs } = await readFileInRange(filePath, 0, 30)
      const { frontmatter } = parseFrontmatter(content)
      return {
        filename: relPath, filePath, mtimeMs,
        description: frontmatter.description || null,
        type: parseMemoryType(frontmatter.type),
      }
    })
  )
  return headers
    .filter(r => r.status === 'fulfilled')
    .map(r => r.value)
    .sort((a, b) => b.mtimeMs - a.mtimeMs)
    .slice(0, 200)
}`;

const findRelevantCode = `export async function findRelevantMemories(
  query: string,
  memoryDir: string,
  signal: AbortSignal,
): Promise<RelevantMemory[]> {
  // 1. 扫描所有记忆文件头部
  const memories = await scanMemoryFiles(memoryDir, signal)
  // 2. 用 Sonnet 模型选择最相关的 ≤5 条
  const selectedFilenames = await selectRelevantMemories(
    query, memories, signal
  )
  // 3. 返回路径 + mtime（用于新鲜度检查）
  return selected.map(m => ({
    path: m.filePath,
    mtimeMs: m.mtimeMs,
  }))
}`;

const autoDreamPromptCode = `# Dream: Memory Consolidation

## Phase 1 — Orient
- ls 记忆目录，读取 MEMORY.md 索引
- 浏览现有 topic files 避免重复

## Phase 2 — Gather recent signal
- 读取 daily logs (logs/YYYY/MM/YYYY-MM-DD.md)
- 检查与代码库矛盾的旧记忆
- 精准 grep JSONL transcripts

## Phase 3 — Consolidate
- 合并新信号到现有 topic files
- 转换相对日期为绝对日期
- 删除已被推翻的事实

## Phase 4 — Prune and index
- 更新 MEMORY.md（≤25 行，≤25KB）
- 移除过期指针，缩短冗长条目`;

const memoryFrontmatterCode = `---
name: integration-test-policy
description: 集成测试必须使用真实数据库，禁止 mock
type: feedback
---

# 集成测试数据库策略

## 规则
所有集成测试必须连接真实数据库进行验证。

## Why
上季度 mock 测试通过但生产迁移失败，
mock/真实环境的差异掩盖了关键 bug。

## How to apply
编写集成测试时直接连接测试数据库，
不使用 sqlite-memory 或 mock provider。`;

export default function MemoryPage() {
  const relatedModules = [
    {
      title: "上下文管理",
      href: "/context",
      description: "Token 预算与压缩策略",
      icon: "📊",
    },
    {
      title: "查询引擎",
      href: "/query-engine",
      description: "消息路由与工具调用",
      icon: "🔍",
    },
    {
      title: "多智能体",
      href: "/coordinator",
      description: "Agent 编排与任务管理",
      icon: "🕸️",
    },
    {
      title: "工具系统",
      href: "/tools",
      description: "文件操作与系统交互",
      icon: "🔧",
    },
  ];

  return (
    <ModuleLayout
      title="记忆系统"
      subtitle="Claude Code 的持久化记忆机制 —— memdir 目录扫描、AI 驱动的记忆检索、年龄衰减、自动做梦整合"
      icon="🧠"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: 概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="记忆系统概述" subtitle="持久化文件记忆" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 采用基于文件的持久化记忆系统，让 AI 在跨会话中保持连贯性。记忆存储在{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                ~/.claude/projects/&lt;sanitized-git-root&gt;/memory/
              </code>{" "}
              目录下，每个记忆是一个独立的 Markdown 文件，通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                MEMORY.md
              </code>{" "}
              索引文件进行快速导航。
            </p>
            <p>
              记忆系统包含两个核心能力：<strong className="text-[var(--text-primary)]">显式记忆</strong>（用户通过 /remember 命令或对话中主动要求保存）和{" "}
              <strong className="text-[var(--text-primary)]">隐式记忆</strong>（后台 extract-memories agent 自动提取重要信息）。
              更高级的{" "}
              <strong className="text-[var(--text-primary)]">自动做梦（autoDream）</strong>机制在积累足够会话后，
              自动整合、去重、修剪记忆文件。
            </p>
          </div>

          <ArchitectureDiagram
            title="记忆系统架构"
            nodes={[
              { id: "user", label: "用户对话", x: 40, y: 30, color: "var(--accent-cyan)" },
              { id: "extract", label: "extractMemories\n后台 Agent", x: 220, y: 30, color: "var(--accent-purple)" },
              { id: "memory-md", label: "MEMORY.md\n索引文件", x: 400, y: 30, color: "var(--accent-blue)" },
              { id: "topic-files", label: "Topic Files\n记忆文件", x: 400, y: 120, color: "var(--accent-blue)" },
              { id: "scan", label: "scanMemoryFiles\n目录扫描", x: 40, y: 120, color: "var(--accent-green)" },
              { id: "select", label: "Sonnet 选择器\nfindRelevantMemories", x: 220, y: 120, color: "var(--accent-green)" },
              { id: "dream", label: "autoDream\n记忆整合", x: 40, y: 210, color: "var(--accent-orange)" },
              { id: "lock", label: "合并锁\nconsolidationLock", x: 220, y: 210, color: "var(--accent-orange)" },
              { id: "team", label: "Team Memory\n团队共享记忆", x: 400, y: 210, color: "var(--accent-pink)" },
            ]}
            edges={[
              { from: "user", to: "extract", label: "对话结束" },
              { from: "extract", to: "memory-md", label: "写入索引" },
              { from: "extract", to: "topic-files", label: "写入记忆" },
              { from: "scan", to: "select", label: "记忆清单" },
              { from: "select", to: "user", label: "注入上下文" },
              { from: "topic-files", to: "scan", label: "扫描" },
              { from: "dream", to: "lock", label: "获取锁" },
              { from: "dream", to: "topic-files", label: "整合修剪" },
              { from: "dream", to: "memory-md", label: "更新索引" },
              { from: "team", to: "memory-md", label: "同步" },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: 记忆目录路径解析 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="memdir — 记忆目录路径" subtitle="paths.ts 路径解析与安全验证" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              记忆目录路径解析遵循严格的优先级链，同时内置多层安全验证防止路径遍历攻击：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
                <h4 className="text-sm font-semibold text-[var(--accent-cyan)] mb-2">路径解析优先级</h4>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>
                    <code className="text-xs font-mono text-[var(--accent-green)]">CLAUDE_COWORK_MEMORY_PATH_OVERRIDE</code> — 环境变量覆盖（Cowork SDK）
                  </li>
                  <li>
                    <code className="text-xs font-mono text-[var(--accent-green)]">settings.json autoMemoryDirectory</code> — 仅限 policy/local/user 信任源
                  </li>
                  <li>
                    默认路径：<code className="text-xs font-mono text-[var(--accent-green)]">~/.claude/projects/&lt;sanitized-git-root&gt;/memory/</code>
                  </li>
                </ol>
              </div>
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
                <h4 className="text-sm font-semibold text-[var(--accent-orange)] mb-2">安全防护机制</h4>
                <ul className="text-sm space-y-2 list-disc list-inside">
                  <li>拒绝相对路径、根路径、UNC 路径</li>
                  <li>拒绝 null 字节和 Windows 驱动器根</li>
                  <li>projectSettings 不参与路径覆盖（防恶意仓库）</li>
                  <li>路径经过 <code className="text-xs font-mono">normalize()</code> + NFC 规范化</li>
                </ul>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <h4 className="text-sm font-semibold text-[var(--accent-purple)] mb-2">KAIROS 助手模式布局</h4>
              <p className="text-sm mb-3">在 KAIROS 模式下，记忆目录使用按日期归档的日志布局：</p>
              <div className="font-mono text-xs text-[var(--accent-cyan)] bg-[var(--code-bg)] rounded-lg p-4">
                <pre>{`memory/
├── MEMORY.md              # 主索引（≤25行，≤25KB）
├── topic-1.md             # 按主题组织的记忆文件
├── topic-2.md
├── logs/
│   └── 2026/
│       └── 04/
│           ├── 2026-04-01.md   # 每日追加日志
│           ├── 2026-04-02.md
│           └── 2026-04-03.md
└── team/                   # 团队共享记忆
    ├── MEMORY.md
    └── *.md`}</pre>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: 记忆类型分类 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="记忆类型分类" subtitle="四类型封闭分类法 — memoryTypes.ts" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              记忆系统采用严格的四类型分类，每种类型都明确界定<strong className="text-[var(--text-primary)]">应该存什么</strong>和{" "}
              <strong className="text-[var(--text-primary)]">不该存什么</strong>。核心原则：只存储无法从当前代码库状态推导的信息。
            </p>

            <CodeBlock code={memoryTypeCode} language="typescript" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  type: "user",
                  scope: "always private",
                  color: "var(--accent-cyan)",
                  desc: "用户角色、目标、偏好、知识水平",
                  example: "用户是资深 Go 工程师，首次接触 React",
                  when: "了解用户角色、偏好、知识时保存",
                },
                {
                  type: "feedback",
                  scope: "default private / team",
                  color: "var(--accent-orange)",
                  desc: "纠正与确认的行为准则，含 Why 和 How to apply",
                  example: "集成测试禁止 mock 数据库，因上次 mock 通过但生产迁移失败",
                  when: "用户纠正或确认方案时保存（含非显而易见的确认）",
                },
                {
                  type: "project",
                  scope: "private / team",
                  color: "var(--accent-purple)",
                  desc: "项目目标、里程碑、事件（代码/git 不可推导的部分）",
                  example: "3月5日起合并冻结，mobile 团队切 release 分支",
                  when: "了解谁做什么、为什么、什么时候时保存",
                },
                {
                  type: "reference",
                  scope: "usually team",
                  color: "var(--accent-blue)",
                  desc: "外部系统指针（Linear、Grafana、Slack 等）",
                  example: "Pipeline bug 追踪在 Linear INGEST 项目",
                  when: "了解外部资源及其用途时保存",
                },
              ].map((t) => (
                <div
                  key={t.type}
                  className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        backgroundColor: t.color,
                        color: "#fff",
                      }}
                    >
                      {t.type}
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)]">
                      scope: {t.scope}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{t.desc}</p>
                  <p className="text-xs text-[var(--accent-green)] mb-1">
                    📌 {t.when}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] italic">
                    例：{t.example}
                  </p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <h4 className="text-sm font-semibold text-[var(--accent-orange)] mb-3">
                ⚠️ 不应保存的内容
              </h4>
              <ul className="text-sm space-y-1 text-[var(--text-secondary)] list-disc list-inside">
                <li>代码模式、约定、架构、文件路径 — 可从代码库推导</li>
                <li>Git 历史 — <code className="text-xs font-mono">git log</code> 才是权威来源</li>
                <li>调试方案 — 修复已在代码中，commit message 有上下文</li>
                <li>CLAUDE.md 中已记录的内容</li>
                <li>临时状态：进行中的工作、当前对话上下文</li>
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: 记忆文件格式 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="记忆文件格式" subtitle="Frontmatter 规范与索引结构" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              每个记忆文件使用 YAML Frontmatter 声明元数据，body 部分对于 feedback/project 类型要求包含{" "}
              <strong className="text-[var(--text-primary)]">Why</strong>（原因）和{" "}
              <strong className="text-[var(--text-primary)]">How to apply</strong>（适用场景）结构化信息：
            </p>

            <CodeBlock code={memoryFrontmatterCode} language="markdown" filename="memory-example.md" />

            <p className="text-sm">
              MEMORY.md 索引中每个条目不超过 ~150 字符：<code className="text-xs font-mono text-[var(--accent-cyan)]">- [Title](file.md) — one-line hook</code>。
              索引上限 25 行 / 25KB，超出会被截断。
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 记忆扫描与检索 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="记忆扫描与检索" subtitle="memoryScan.ts + findRelevantMemories.ts" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              记忆检索分为两步：<strong className="text-[var(--text-primary)]">扫描</strong>（读取所有 .md 文件的 frontmatter 头部）
              和 <strong className="text-[var(--text-primary)]">选择</strong>（用 Sonnet 模型从清单中选出最相关的 ≤5 条）。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-[var(--accent-green)] mb-2">
                  scanMemoryFiles — 单次扫描
                </h4>
                <CodeBlock code={scanMemoryCode} language="typescript" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-[var(--accent-green)] mb-2">
                  findRelevantMemories — AI 选择
                </h4>
                <CodeBlock code={findRelevantCode} language="typescript" />
              </div>
            </div>

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <h4 className="text-sm font-semibold text-[var(--accent-purple)] mb-3">检索流程要点</h4>
              <ul className="text-sm space-y-2 text-[var(--text-secondary)] list-disc list-inside">
                <li>
                  <strong className="text-[var(--text-primary)]">单次扫描优化</strong>：先读后排序，避免双 stat 调用
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">已去重过滤</strong>：<code className="text-xs font-mono">alreadySurfaced</code> 避免重复选择前轮已展示的记忆
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">工具噪声抑制</strong>：当用户正在使用某工具时，不选择该工具的参考文档
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">最多 200 个文件</strong>，按 mtime 降序排列
                </li>
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: 年龄衰减与新鲜度 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="年龄衰减与新鲜度" subtitle="memoryAge.ts — 记忆过时检测" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              记忆是时间点的快照，不是实时状态。系统通过 <strong className="text-[var(--text-primary)]">年龄计算</strong>和{" "}
              <strong className="text-[var(--text-primary)]">新鲜度警告</strong>帮助模型正确处理过时记忆：
            </p>

            <CodeBlock code={memoryAgeCode} language="typescript" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-center">
                <div className="text-2xl mb-2">0 天</div>
                <div className="text-sm font-semibold text-[var(--accent-green)]">today</div>
                <div className="text-xs text-[var(--text-tertiary)]">无警告</div>
              </div>
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-center">
                <div className="text-2xl mb-2">1 天</div>
                <div className="text-sm font-semibold text-[var(--accent-green)]">yesterday</div>
                <div className="text-xs text-[var(--text-tertiary)]">无警告</div>
              </div>
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4 text-center">
                <div className="text-2xl mb-2">2+ 天</div>
                <div className="text-sm font-semibold text-[var(--accent-orange)]">
                  &quot;{1} days old&quot;
                </div>
                <div className="text-xs text-[var(--text-tertiary)]">
                  注入 system-reminder 警告
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--accent-orange)] bg-[var(--card-bg)] p-5">
              <h4 className="text-sm font-semibold text-[var(--accent-orange)] mb-2">
                ⚠️ 记忆漂移防护
              </h4>
              <p className="text-sm">
                对于引用特定函数、文件路径的记忆，系统要求模型在使用前验证其仍然存在：
                文件路径 → 检查文件是否存在；函数名 → grep 搜索；文件:行号引用 → 特别容易过时。
                这是经过 eval 验证的防护机制（memory-prompt-iteration case study）。
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7: 自动做梦机制 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="自动做梦（autoDream）" subtitle="离线记忆整合 — 四阶段合并流程" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              自动做梦是记忆系统的核心维护机制。当满足条件时，系统会 fork 一个后台 Agent 执行记忆整合：
              浏览最近会话、合并新信息、修剪过期记忆、更新索引。
            </p>

            <ArchitectureDiagram
              title="autoDream 触发流程"
              nodes={[
                { id: "turn", label: "每轮结束\nstopHooks", x: 40, y: 30, color: "var(--accent-purple)" },
                { id: "time", label: "时间门\n≥24h", x: 180, y: 30, color: "var(--accent-orange)" },
                { id: "session", label: "会话门\n≥5 sessions", x: 320, y: 30, color: "var(--accent-orange)" },
                { id: "lock", label: "合并锁\nPID-based", x: 460, y: 30, color: "var(--accent-red)" },
                { id: "fork", label: "Forked Agent\n后台执行", x: 40, y: 130, color: "var(--accent-blue)" },
                { id: "p1", label: "Phase 1\nOrient", x: 180, y: 130, color: "var(--accent-green)" },
                { id: "p2", label: "Phase 2\nGather", x: 320, y: 130, color: "var(--accent-green)" },
                { id: "p3", label: "Phase 3\nConsolidate", x: 460, y: 130, color: "var(--accent-green)" },
                { id: "p4", label: "Phase 4\nPrune & Index", x: 460, y: 230, color: "var(--accent-green)" },
              ]}
              edges={[
                { from: "turn", to: "time" },
                { from: "time", to: "session" },
                { from: "session", to: "lock" },
                { from: "lock", to: "fork" },
                { from: "fork", to: "p1" },
                { from: "p1", to: "p2" },
                { from: "p2", to: "p3" },
                { from: "p3", to: "p4" },
              ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
                <h4 className="text-sm font-semibold text-[var(--accent-orange)] mb-2">
                  三重门控
                </h4>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>
                    <strong className="text-[var(--text-primary)]">时间门</strong>：距上次整合 ≥ 24 小时（一次 stat 调用）
                  </li>
                  <li>
                    <strong className="text-[var(--text-primary)]">会话门</strong>：有 ≥ 5 个新会话（扫描节流 10 分钟）
                  </li>
                  <li>
                    <strong className="text-[var(--text-primary)]">合并锁</strong>：PID-based 文件锁，防止并发整合
                  </li>
                </ol>
              </div>
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
                <h4 className="text-sm font-semibold text-[var(--accent-blue)] mb-2">
                  合并锁机制
                </h4>
                <ul className="text-sm space-y-2 list-disc list-inside">
                  <li>锁文件：<code className="text-xs font-mono">.consolidate-lock</code></li>
                  <li>mtime = lastConsolidatedAt 时间戳</li>
                  <li>body = holder PID，用于检测存活进程</li>
                  <li>过期阈值 1 小时（PID 复用防护）</li>
                  <li>失败时回滚 mtime（下次可重试）</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-[var(--accent-green)] mb-2">
                整合提示词（四阶段）
              </h4>
              <CodeBlock code={autoDreamPromptCode} language="markdown" />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 8: DreamTask */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="DreamTask — 做梦任务管理" subtitle="UI 可见性与生命周期" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              DreamTask 是 autoDream 的 UI 抽象层，将不可见的 forked agent 暴露为底部任务栏可见的后台任务，
              用户可以在 Shift+Down 对话框中查看进度、取消任务。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { phase: "starting", label: "🟡 开始中", desc: "读取记忆目录，浏览现有文件" },
                { phase: "updating", label: "🟢 更新中", desc: "首次 Edit/Write 操作后切换" },
                { phase: "completed", label: "✅ 已完成", desc: "整合完成，显示修改文件列表" },
              ].map((p) => (
                <div
                  key={p.phase}
                  className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-4"
                >
                  <div className="text-sm font-semibold mb-1">{p.label}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">
                    phase: &quot;{p.phase}&quot;
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
                    {p.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <h4 className="text-sm font-semibold text-[var(--accent-purple)] mb-3">
                DreamTask 状态结构
              </h4>
              <div className="font-mono text-xs text-[var(--accent-cyan)] bg-[var(--code-bg)] rounded-lg p-4">
                <pre>{`type DreamTaskState = {
  type: 'dream'
  status: 'running' | 'completed' | 'failed' | 'killed'
  phase: 'starting' | 'updating'
  sessionsReviewing: number    // 正在审查的会话数
  filesTouched: string[]       // Edit/Write 操作的文件路径
  turns: DreamTurn[]           // 助手回复（工具调用折叠为计数）
  priorMtime: number           // 锁的原始 mtime（用于 kill 回滚）
  abortController?: AbortController
}`}</pre>
              </div>
            </div>

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <h4 className="text-sm font-semibold text-[var(--accent-orange)] mb-2">
                生命周期事件
              </h4>
              <ul className="text-sm space-y-2 text-[var(--text-secondary)] list-disc list-inside">
                <li>
                  <strong className="text-[var(--text-primary)]">registerDreamTask</strong>：创建任务，status=running, phase=starting
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">addDreamTurn</strong>：每轮助手回复，phase 首次 Edit/Write 时切为 updating
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">completeDreamTask</strong>：status=completed，inline 显示修改摘要
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">failDreamTask</strong>：status=failed，回滚合并锁 mtime
                </li>
                <li>
                  <strong className="text-[var(--text-primary)]">kill</strong>：abort 控制器 + 回滚锁 + status=killed
                </li>
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 9: 团队记忆 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="团队记忆（Team Memory）" subtitle="跨用户共享记忆 — teamMemPaths.ts" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              团队记忆是个人记忆的扩展，存储在 <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                memory/team/
              </code> 子目录中。
              所有在同一项目目录工作的用户共享团队记忆，每个会话开始时自动同步。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
                <h4 className="text-sm font-semibold text-[var(--accent-cyan)] mb-2">
                  安全验证（双层检查）
                </h4>
                <ol className="text-sm space-y-2 list-decimal list-inside">
                  <li>
                    <strong className="text-[var(--text-primary)]">字符串级</strong>：path.resolve() 消除 .. 段
                  </li>
                  <li>
                    <strong className="text-[var(--text-primary)]">文件系统级</strong>：realpath() 解析符号链接
                  </li>
                </ol>
                <p className="text-xs text-[var(--text-tertiary)] mt-2">
                  防御悬挂符号链接、符号链接循环、Unicode 规范化攻击
                </p>
              </div>
              <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
                <h4 className="text-sm font-semibold text-[var(--accent-orange)] mb-2">
                  作用域规则
                </h4>
                <ul className="text-sm space-y-2 list-disc list-inside">
                  <li><code className="text-xs font-mono">user</code> → always private</li>
                  <li><code className="text-xs font-mono">feedback</code> → 默认 private，项目级惯例存 team</li>
                  <li><code className="text-xs font-mono">project</code> → 偏向 team</li>
                  <li><code className="text-xs font-mono">reference</code> → usually team</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 10: 提取记忆 Agent */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="extractMemories — 提取记忆 Agent" subtitle="后台自动提取对话中的有价值信息" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              主 Agent 的 prompt 中始终包含完整的保存指令。后台 extract-memories agent 作为安全网：
              当主 Agent 主动写入了记忆时后台跳过该范围，未写入时后台 agent 捕获遗漏。
            </p>

            <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
              <h4 className="text-sm font-semibold text-[var(--accent-purple)] mb-3">启用条件</h4>
              <ul className="text-sm space-y-2 text-[var(--text-secondary)] list-disc list-inside">
                <li>功能开关 <code className="text-xs font-mono text-[var(--accent-cyan)]">feature(&apos;EXTRACT_MEMORIES&apos;)</code> 必须开启</li>
                <li>交互式会话 OR GrowthBook flag <code className="text-xs font-mono text-[var(--accent-cyan)]">tengu_slate_thimble</code></li>
                <li>autoDream 限制工具权限：Bash 仅允许只读命令（ls, find, grep, cat 等）</li>
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
