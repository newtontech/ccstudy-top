import { ModuleLayout } from "@/components/ModuleLayout";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";
import { CodeBlock } from "@/components/CodeBlock";
import { QuizSection } from "@/components/QuizSection";

const relatedModules = [
  { title: "查询引擎", href: "/query-engine", description: "语义搜索核心", icon: "🔍" },
  { title: "上下文管理", href: "/context", description: "LLM 上下文构建", icon: "📦" },
  { title: "记忆系统", href: "/memory", description: "持久化记忆", icon: "🧠" },
  { title: "系统架构", href: "/architecture", description: "架构总览", icon: "🏗️" },
];

/* ─── 源码索引数据 ─── */
const moduleCategories = [
  {
    name: "核心架构",
    icon: "🏗️",
    modules: [
      { dir: "cli", files: 20, desc: "CLI 入口与命令行参数解析", chapter: "/entry" },
      { dir: "entrypoints", files: 8, desc: "应用入口点（CLI / Desktop）", chapter: "/entry" },
      { dir: "bootstrap", files: 1, desc: "启动引导与初始化流程", chapter: "/entry" },
      { dir: "context", files: 9, desc: "LLM 上下文窗口构建与管理", chapter: "/context" },
      { dir: "state", files: 6, desc: "全局状态管理（Context + Reducer）", chapter: "/state" },
      { dir: "coordinator", files: 1, desc: "多 Agent 协调器", chapter: "/coordinator" },
    ],
  },
  {
    name: "工具系统",
    icon: "🔧",
    modules: [
      { dir: "tools", files: 185, desc: "40+ 内置工具（文件、搜索、网络、Agent 等）", chapter: "/tools" },
      { dir: "tools/BashTool", files: 5, desc: "Shell 命令执行（沙箱模式）" },
      { dir: "tools/FileReadTool", files: 3, desc: "文件内容读取" },
      { dir: "tools/FileWriteTool", files: 3, desc: "文件完整覆写" },
      { dir: "tools/FileEditTool", files: 4, desc: "搜索-替换精确编辑" },
      { dir: "tools/GrepTool", files: 3, desc: "基于 ripgrep 的内容搜索" },
      { dir: "tools/GlobTool", files: 3, desc: "文件名模式匹配" },
      { dir: "tools/WebFetchTool", files: 4, desc: "网页内容抓取与提取" },
      { dir: "tools/WebSearchTool", files: 3, desc: "网络搜索" },
      { dir: "tools/MCPTool", files: 5, desc: "MCP 协议工具调用" },
      { dir: "tools/LSPTool", files: 6, desc: "语言服务器协议集成" },
      { dir: "tools/AgentTool", files: 4, desc: "子 Agent 生成与调度" },
      { dir: "tools/TaskCreateTool", files: 3, desc: "任务创建" },
      { dir: "tools/TaskListTool", files: 2, desc: "任务列表查询" },
      { dir: "tools/TaskUpdateTool", files: 3, desc: "任务状态更新" },
      { dir: "tools/ConfigTool", files: 4, desc: "配置读写" },
      { dir: "tools/NotebookEditTool", files: 3, desc: "Jupyter Notebook 编辑" },
      { dir: "tools/ScheduleCronTool", files: 3, desc: "定时任务管理" },
      { dir: "tools/SkillTool", files: 3, desc: "技能调用" },
      { dir: "tools/ToolSearchTool", files: 2, desc: "工具搜索" },
      { dir: "tools/BriefTool", files: 3, desc: "文件/目录摘要" },
      { dir: "tools/EnterPlanModeTool", files: 2, desc: "进入规划模式" },
      { dir: "tools/ExitPlanModeTool", files: 2, desc: "退出规划模式" },
    ],
  },
  {
    name: "命令系统",
    icon: "⌨️",
    modules: [
      { dir: "commands", files: 208, desc: "斜杠命令（/help, /clear, /compact 等）", chapter: "/commands" },
    ],
  },
  {
    name: "UI 与渲染",
    icon: "🎨",
    modules: [
      { dir: "ink", files: 97, desc: "Ink 终端 UI 组件", chapter: "/ink" },
      { dir: "components", files: 390, desc: "React 组件库", chapter: "/ink" },
      { dir: "screens", files: 3, desc: "屏幕布局定义" },
      { dir: "outputStyles", files: 1, desc: "输出样式定义" },
      { dir: "moreright", files: 1, desc: "右侧面板扩展" },
    ],
  },
  {
    name: "AI 与 Agent",
    icon: "🤖",
    modules: [
      { dir: "assistant", files: 1, desc: "主 Agent 实现", chapter: "/assistant" },
      { dir: "buddy", files: 6, desc: "辅助 Agent（并行任务）", chapter: "/buddy" },
      { dir: "tasks", files: 13, desc: "任务执行器（Shell / Agent / Remote）", chapter: "/coordinator" },
      { dir: "query", files: 4, desc: "查询引擎核心", chapter: "/query-engine" },
    ],
  },
  {
    name: "扩展与插件",
    icon: "🔌",
    modules: [
      { dir: "plugins", files: 2, desc: "插件加载与管理", chapter: "/plugins" },
      { dir: "skills", files: 20, desc: "内置技能定义", chapter: "/plugins" },
      { dir: "hooks", files: 105, desc: "事件钩子系统", chapter: "/hooks" },
      { dir: "memdir", files: 8, desc: "记忆目录管理", chapter: "/memory" },
    ],
  },
  {
    name: "基础设施",
    icon: "⚙️",
    modules: [
      { dir: "utils", files: 565, desc: "通用工具函数库", chapter: "/architecture" },
      { dir: "services", files: 131, desc: "服务层（API、认证等）", chapter: "/architecture" },
      { dir: "bridge", files: 31, desc: "IDE 桥接", chapter: "/bridge" },
      { dir: "constants", files: 21, desc: "常量定义" },
      { dir: "types", files: 11, desc: "TypeScript 类型定义" },
      { dir: "schemas", files: 1, desc: "JSON Schema 定义" },
      { dir: "migrations", files: 11, desc: "数据迁移脚本" },
    ],
  },
  {
    name: "其他模块",
    icon: "📦",
    modules: [
      { dir: "keybindings", files: 14, desc: "键盘快捷键映射" },
      { dir: "vim", files: 5, desc: "Vim 模式支持" },
      { dir: "voice", files: 1, desc: "语音交互" },
      { dir: "remote", files: 4, desc: "远程开发支持" },
      { dir: "server", files: 3, desc: "本地服务器" },
      { dir: "upstreamproxy", files: 2, desc: "上游 API 代理" },
      { dir: "native-ts", files: 5, desc: "原生 TS 工具（yoga-layout 等）" },
    ],
  },
];

/* ─── 命令速查表 ─── */
const commandCategories = [
  {
    name: "会话管理",
    commands: [
      { cmd: "/clear", desc: "清除对话历史" },
      { cmd: "/compact", desc: "压缩上下文窗口" },
      { cmd: "/resume", desc: "恢复之前的会话" },
      { cmd: "/session", desc: "查看会话信息" },
      { cmd: "/rewind", desc: "回退到之前的对话状态" },
    ],
  },
  {
    name: "模式切换",
    commands: [
      { cmd: "/plan", desc: "进入规划模式" },
      { cmd: "/edit", desc: "进入编辑模式" },
      { cmd: "/auto", desc: "自动模式（自主决策）" },
      { cmd: "/sandbox-toggle", desc: "切换沙箱模式" },
      { cmd: "/effort", desc: "调整推理努力程度" },
    ],
  },
  {
    name: "工具与扩展",
    commands: [
      { cmd: "/mcp", desc: "管理 MCP 服务器" },
      { cmd: "/plugin", desc: "管理插件" },
      { cmd: "/hooks", desc: "管理钩子" },
      { cmd: "/agents", desc: "管理 Agent" },
      { cmd: "/branch", desc: "Git 分支操作" },
    ],
  },
  {
    name: "配置与调试",
    commands: [
      { cmd: "/config", desc: "查看/修改配置" },
      { cmd: "/theme", desc: "切换主题" },
      { cmd: "/doctor", desc: "诊断环境问题" },
      { cmd: "/cost", desc: "查看 API 调用成本" },
      { cmd: "/debug-tool-call", desc: "调试工具调用" },
    ],
  },
  {
    name: "信息与帮助",
    commands: [
      { cmd: "/help", desc: "显示帮助信息" },
      { cmd: "/stats", desc: "显示使用统计" },
      { cmd: "/usage", desc: "显示 Token 使用量" },
      { cmd: "/release-notes", desc: "查看更新日志" },
      { cmd: "/memory", desc: "管理 Claude 记忆" },
    ],
  },
];

/* ─── 推荐阅读 ─── */
const readingList = [
  {
    category: "官方资源",
    items: [
      { title: "Anthropic 官方文档", url: "https://docs.anthropic.com", desc: "Claude API 完整文档" },
      { title: "MCP 协议规范", url: "https://modelcontextprotocol.io", desc: "Model Context Protocol 标准规范" },
      { title: "Claude Code GitHub", url: "https://github.com/anthropics/claude-code", desc: "Claude Code 开源仓库" },
      { title: "Ink 框架", url: "https://github.com/vadimdemedes/ink", desc: "React 终端 UI 框架" },
    ],
  },
  {
    category: "论文与研究",
    items: [
      { title: "Constitutional AI (Anthropic, 2023)", url: "https://arxiv.org/abs/2212.08073", desc: "宪法 AI：对齐方法的核心论文" },
      { title: "Toolformer (Meta, 2023)", url: "https://arxiv.org/abs/2302.04761", desc: "让 LLM 学会使用工具" },
      { title: "ReAct (Yao et al., 2023)", url: "https://arxiv.org/abs/2210.03629", desc: "推理 + 行动的 Agent 范式" },
      { title: "Tool Use 论文合集", url: "https://www.anthropic.com/research", desc: "Anthropic 研究博客" },
    ],
  },
  {
    category: "社区与工具",
    items: [
      { title: "Awesome Claude Code", url: "https://github.com/anthropics/claude-code", desc: "社区精选资源" },
      { title: "ripgrep", url: "https://github.com/BurntSushi/ripgrep", desc: "极速文本搜索工具" },
      { title: "Zod", url: "https://zod.dev", desc: "TypeScript Schema 验证" },
      { title: "Framer Motion", url: "https://www.framer.com/motion", desc: "React 动画库" },
    ],
  },
];

function CollapsibleCard({
  title,
  icon,
  children,
  defaultOpen = true,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details className="group rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden" open={defaultOpen || undefined}>
      <summary className="flex items-center gap-3 p-4 cursor-pointer select-none hover:bg-[var(--bg-tertiary)]/50 transition-colors">
        <span className="text-xl">{icon}</span>
        <span className="font-semibold text-[var(--text-primary)]">{title}</span>
        <span className="ml-auto text-[var(--text-tertiary)] transition-transform group-open:rotate-90">▶</span>
      </summary>
      <div className="px-4 pb-4">{children}</div>
    </details>
  );
}

export default function AppendixPage() {
  return (
    <ModuleLayout
      title="附录"
      subtitle="源码索引、命令速查、工具一览、自测题与推荐阅读 —— Claude Code 学习的完整参考手册"
      icon="📖"
      category="附录"
      relatedModules={relatedModules}
    >
      {/* ─── 源码索引 ─── */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="源码索引" subtitle="按模块分类的完整源码目录" />

          <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
            Claude Code 源码包含 <strong className="text-[var(--text-primary)]">37 个顶级目录</strong>，
            涵盖 CLI 入口、工具系统、命令系统、UI 渲染、AI Agent、插件扩展等模块。
            以下按功能分类列出所有模块，每个模块显示目录名、文件数、职责简介，
            可点击链接跳转到对应的章节页面。
          </p>

          <div className="space-y-3">
            {moduleCategories.map((cat) => (
              <CollapsibleCard
                key={cat.name}
                title={`${cat.name} (${cat.modules.length} 模块)`}
                icon={cat.icon}
                defaultOpen
              >
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[var(--border-primary)]">
                        <th className="text-left py-2 px-3 text-[var(--text-tertiary)] font-medium">目录</th>
                        <th className="text-left py-2 px-3 text-[var(--text-tertiary)] font-medium">文件数</th>
                        <th className="text-left py-2 px-3 text-[var(--text-tertiary)] font-medium">职责</th>
                        <th className="text-left py-2 px-3 text-[var(--text-tertiary)] font-medium">章节</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cat.modules.map((mod) => (
                        <tr key={mod.dir} className="border-b border-[var(--border-primary)]/50 hover:bg-[var(--bg-tertiary)]/30 transition-colors">
                          <td className="py-2 px-3">
                            <code className="text-[var(--accent-primary)] text-xs bg-[var(--bg-tertiary)] px-2 py-0.5 rounded">
                              {mod.dir}/
                            </code>
                          </td>
                          <td className="py-2 px-3 text-[var(--text-secondary)]">{mod.files}</td>
                          <td className="py-2 px-3 text-[var(--text-secondary)]">{mod.desc}</td>
                          <td className="py-2 px-3">
                            {mod.chapter ? (
                              <a
                                href={mod.chapter}
                                className="text-[var(--accent-primary)] hover:underline text-xs"
                              >
                                → {mod.chapter}
                              </a>
                            ) : (
                              <span className="text-[var(--text-tertiary)] text-xs">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CollapsibleCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ─── 命令速查表 ─── */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="命令速查表" subtitle="Claude Code 斜杠命令快速参考" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {commandCategories.map((cat) => (
              <div
                key={cat.name}
                className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-4"
              >
                <h3 className="font-semibold text-[var(--text-primary)] mb-3">{cat.name}</h3>
                <div className="space-y-2">
                  {cat.commands.map((c) => (
                    <div key={c.cmd} className="flex items-start gap-3">
                      <code className="flex-shrink-0 text-xs bg-[var(--bg-tertiary)] text-[var(--accent-primary)] px-2 py-1 rounded font-mono">
                        {c.cmd}
                      </code>
                      <span className="text-sm text-[var(--text-secondary)]">{c.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
            <h4 className="font-semibold text-[var(--text-primary)] mb-2">💡 快捷键</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[var(--text-secondary)]">
              <div><kbd className="bg-[var(--bg-tertiary)] px-2 py-0.5 rounded text-xs">Esc</kbd> 中断当前生成</div>
              <div><kbd className="bg-[var(--bg-tertiary)] px-2 py-0.5 rounded text-xs">Tab</kbd> 自动补全</div>
              <div><kbd className="bg-[var(--bg-tertiary)] px-2 py-0.5 rounded text-xs">Ctrl+C</kbd> 取消操作</div>
              <div><kbd className="bg-[var(--bg-tertiary)] px-2 py-0.5 rounded text-xs">Ctrl+L</kbd> 清屏</div>
              <div><kbd className="bg-[var(--bg-tertiary)] px-2 py-0.5 rounded text-xs">↑/↓</kbd> 浏览历史</div>
              <div><kbd className="bg-[var(--bg-tertiary)] px-2 py-0.5 rounded text-xs">Ctrl+R</kbd> 搜索历史</div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── 工具速查表 ─── */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="工具速查表" subtitle="40+ 内置工具分类一览" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { name: "BashTool", desc: "Shell 命令执行", cat: "执行", emoji: "🐚" },
              { name: "FileReadTool", desc: "读取文件内容", cat: "文件", emoji: "📄" },
              { name: "FileWriteTool", desc: "写入文件", cat: "文件", emoji: "✏️" },
              { name: "FileEditTool", desc: "搜索-替换编辑", cat: "文件", emoji: "📝" },
              { name: "GrepTool", desc: "内容搜索 (ripgrep)", cat: "搜索", emoji: "🔍" },
              { name: "GlobTool", desc: "文件名匹配", cat: "搜索", emoji: "🌐" },
              { name: "WebFetchTool", desc: "网页抓取", cat: "网络", emoji: "🕸️" },
              { name: "WebSearchTool", desc: "网络搜索", cat: "网络", emoji: "🔎" },
              { name: "MCPTool", desc: "MCP 协议调用", cat: "协议", emoji: "🔌" },
              { name: "LSPTool", desc: "代码智能 (LSP)", cat: "代码", emoji: "💡" },
              { name: "AgentTool", desc: "子 Agent 调度", cat: "Agent", emoji: "🤖" },
              { name: "TaskCreateTool", desc: "创建任务", cat: "任务", emoji: "📋" },
              { name: "TaskListTool", desc: "列出任务", cat: "任务", emoji: "📑" },
              { name: "TaskUpdateTool", desc: "更新任务", cat: "任务", emoji: "🔄" },
              { name: "TaskGetTool", desc: "获取任务详情", cat: "任务", emoji: "📋" },
              { name: "TaskOutputTool", desc: "获取任务输出", cat: "任务", emoji: "📊" },
              { name: "TaskStopTool", desc: "停止任务", cat: "任务", emoji: "🛑" },
              { name: "ConfigTool", desc: "配置读写", cat: "配置", emoji: "⚙️" },
              { name: "NotebookEditTool", desc: "Notebook 编辑", cat: "代码", emoji: "📓" },
              { name: "ScheduleCronTool", desc: "定时任务", cat: "调度", emoji: "⏰" },
              { name: "SkillTool", desc: "技能调用", cat: "扩展", emoji: "🎯" },
              { name: "ToolSearchTool", desc: "工具搜索", cat: "搜索", emoji: "🔎" },
              { name: "BriefTool", desc: "文件摘要", cat: "文件", emoji: "📋" },
              { name: "EnterPlanModeTool", desc: "进入规划", cat: "模式", emoji: "🧠" },
              { name: "ExitPlanModeTool", desc: "退出规划", cat: "模式", emoji: "✅" },
              { name: "TodoWriteTool", desc: "待办写入", cat: "任务", emoji: "✍️" },
              { name: "SendMessageTool", desc: "发送消息", cat: "通信", emoji: "💬" },
              { name: "AskUserQuestionTool", desc: "询问用户", cat: "交互", emoji: "❓" },
              { name: "SleepTool", desc: "暂停执行", cat: "控制", emoji: "💤" },
              { name: "REPLTool", desc: "REPL 交互", cat: "代码", emoji: "💻" },
              { name: "PowerShellTool", desc: "PowerShell 执行", cat: "执行", emoji: "🔵" },
              { name: "McpAuthTool", desc: "MCP 认证", cat: "协议", emoji: "🔑" },
              { name: "ListMcpResourcesTool", desc: "列出 MCP 资源", cat: "协议", emoji: "📦" },
              { name: "ReadMcpResourceTool", desc: "读取 MCP 资源", cat: "协议", emoji: "📖" },
              { name: "TeamCreateTool", desc: "创建团队", cat: "协作", emoji: "👥" },
              { name: "TeamDeleteTool", desc: "删除团队", cat: "协作", emoji: "🗑️" },
              { name: "RemoteTriggerTool", desc: "远程触发", cat: "通信", emoji: "📡" },
              { name: "EnterWorktreeTool", desc: "进入 Worktree", cat: "Git", emoji: "🌳" },
              { name: "ExitWorktreeTool", desc: "退出 Worktree", cat: "Git", emoji: "🚪" },
              { name: "SyntheticOutputTool", desc: "合成输出", cat: "内部", emoji: "🔲" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="flex items-start gap-3 p-3 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)]/30 transition-colors"
              >
                <span className="text-lg">{tool.emoji}</span>
                <div className="min-w-0">
                  <p className="text-sm font-mono font-medium text-[var(--text-primary)] truncate">
                    {tool.name}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">{tool.desc}</p>
                  <span className="inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]">
                    {tool.cat}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ─── 自测题 ─── */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="自测题" subtitle="32 道选择题，覆盖各章节核心知识点" />
          <p className="text-[var(--text-secondary)] mb-6">
            选择答案后点击「提交答案」查看结果和解析。可按章节分类筛选。
          </p>
          <QuizSection />
        </section>
      </ScrollReveal>

      {/* ─── 推荐阅读 ─── */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="推荐阅读" subtitle="深入理解 Claude Code 的延伸资源" />

          <div className="space-y-4">
            {readingList.map((group) => (
              <div key={group.category} className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-5">
                <h3 className="font-semibold text-[var(--text-primary)] mb-3">{group.category}</h3>
                <div className="space-y-3">
                  {group.items.map((item) => (
                    <a
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-[var(--bg-tertiary)]/50 transition-colors group"
                    >
                      <span className="flex-shrink-0 mt-0.5 text-[var(--accent-primary)]">🔗</span>
                      <div>
                        <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                          {item.title}
                        </p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.desc}</p>
                        <p className="text-[10px] text-[var(--text-tertiary)] mt-1 truncate">{item.url}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ─── 常用配置示例 ─── */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="常用配置示例" subtitle="claude.config.ts 配置片段" />

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">📋 允许特定工具自动执行</h3>
              <CodeBlock
                code={`// claude.config.ts
export default {
  permissions: {
    allow: [
      "Read",           // 允许文件读取
      "Glob",           // 允许文件搜索
      "Grep",           // 允许内容搜索
      "WebFetch",       // 允许网页抓取
      "TodoRead",       // 允许待办读取
    ],
    deny: [
      "Bash(rm -rf *)", // 禁止危险命令
    ],
  },
}`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">🔌 配置 MCP 服务器</h3>
              <CodeBlock
                code={`// claude.config.ts
export default {
  mcpServers: {
    github: {
      command: "npx",
      args: ["-y", "@anthropic/mcp-github"],
      env: { GITHUB_TOKEN: process.env.GITHUB_TOKEN },
    },
    filesystem: {
      command: "npx",
      args: ["-y", "@anthropic/mcp-filesystem", "/path/to/dir"],
    },
  },
}`}
                language="typescript"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">🪝 配置 Hooks</h3>
              <CodeBlock
                code={`// claude.config.ts
export default {
  hooks: {
    PreToolUse: [
      {
        matcher: "Bash",
        command: "echo 'About to run bash...'",
      },
    ],
    PostToolUse: [
      {
        matcher: "Write",
        command: "prettier --write $FILE",
      },
    ],
  },
}`}
                language="typescript"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
