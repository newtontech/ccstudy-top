import { ModuleLayout } from "@/components/ModuleLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function CommandsPage() {
  const relatedModules = [
    {
      title: "入口与启动",
      href: "/entry",
      description: "启动流程详解",
      icon: "\uD83D\uDE80",
    },
    {
      title: "工具系统",
      href: "/tools",
      description: "40+ 工具实现",
      icon: "\uD83D\uDD27",
    },
    {
      title: "UI框架",
      href: "/ink",
      description: "终端 UI 渲染",
      icon: "\uD83C\uDFA8",
    },
  ];

  const commandCategories = [
    {
      category: "核心命令",
      categoryEn: "Core",
      color: "var(--accent-purple)",
      commands: [
        { name: "init", desc: "初始化 Claude Code 配置" },
        { name: "login", desc: "登录认证，获取 API 访问权限" },
        { name: "logout", desc: "登出并清除本地认证凭据" },
        { name: "help", desc: "显示帮助信息与命令列表" },
        { name: "version", desc: "显示当前版本信息" },
      ],
    },
    {
      category: "项目命令",
      categoryEn: "Project",
      color: "var(--accent-cyan)",
      commands: [
        { name: "add-dir", desc: "添加工作目录到项目上下文" },
        { name: "config", desc: "管理和查看配置项" },
        { name: "context", desc: "上下文文件管理" },
        { name: "memory", desc: "持久化记忆存储与检索" },
      ],
    },
    {
      category: "开发命令",
      categoryEn: "Development",
      color: "var(--accent-blue)",
      commands: [
        { name: "commit", desc: "AI 驱动的智能 Git 提交" },
        { name: "review", desc: "代码审查与问题检测" },
        { name: "diff", desc: "查看文件差异" },
        { name: "branch", desc: "分支管理与切换" },
        { name: "pr-comments", desc: "拉取 PR 评论并处理" },
      ],
    },
    {
      category: "会话命令",
      categoryEn: "Session",
      color: "#10b981",
      commands: [
        { name: "session", desc: "会话创建与管理" },
        { name: "resume", desc: "恢复上一次会话" },
        { name: "status", desc: "查看当前状态信息" },
      ],
    },
    {
      category: "工具命令",
      categoryEn: "Tools",
      color: "#f59e0b",
      commands: [
        { name: "tasks", desc: "任务列表管理" },
        { name: "skills", desc: "技能系统配置与管理" },
        { name: "plugins", desc: "插件安装与管理" },
        { name: "mcp", desc: "MCP 服务器管理与配置" },
      ],
    },
    {
      category: "设置命令",
      categoryEn: "Settings",
      color: "#ec4899",
      commands: [
        { name: "model", desc: "切换 AI 模型" },
        { name: "theme", desc: "终端主题设置" },
        { name: "keybindings", desc: "快捷键配置" },
        { name: "output-style", desc: "输出风格设置" },
      ],
    },
    {
      category: "高级命令",
      categoryEn: "Advanced",
      color: "#ef4444",
      commands: [
        { name: "compact", desc: "压缩上下文以节省 token" },
        { name: "fast", desc: "快速模式，减少确认步骤" },
        { name: "ultraplan", desc: "超级计划模式，深度推理" },
        { name: "doctor", desc: "诊断工具，检查环境配置" },
      ],
    },
  ];

  return (
    <ModuleLayout
      title="命令系统"
      subtitle="Claude Code CLI 40+ 命令的架构设计、分类体系与执行流程深度解析"
      icon="\u2328\uFE0F"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: 命令系统概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="命令系统概述"
            subtitle="CLI 路由到命令执行的完整架构"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code CLI 提供了{" "}
              <strong className="text-[var(--text-primary)]">40+ 命令</strong>
              ，覆盖从项目初始化到代码提交、从会话管理到插件配置的完整开发生命周期。
              每个命令都是一个独立模块，遵循统一的接口规范，通过 Commander.js 注册到 CLI 路由系统中。
            </p>
            <p>
              命令系统采用分层架构设计：顶层是 CLI 路由器负责参数解析和命令分发，
              中间层是 preAction 钩子负责公共初始化，底层是各命令的独立处理器。
              这种设计确保了每个命令的独立性和可测试性，同时复用了公共的初始化逻辑。
            </p>
          </div>

          <ArchitectureDiagram
            title="命令分类架构"
            nodes={[
              {
                id: "cli",
                label: "CLI Router",
                x: 340,
                y: 130,
                color: "var(--accent-purple)",
              },
              // Row 1 - top
              {
                id: "core",
                label: "Core",
                x: 40,
                y: 10,
                color: "var(--accent-purple)",
              },
              {
                id: "project",
                label: "Project",
                x: 220,
                y: 10,
                color: "var(--accent-cyan)",
              },
              {
                id: "dev",
                label: "Development",
                x: 400,
                y: 10,
                color: "var(--accent-blue)",
              },
              {
                id: "session",
                label: "Session",
                x: 580,
                y: 10,
                color: "#10b981",
              },
              // Row 2 - bottom
              {
                id: "tools",
                label: "Tools",
                x: 40,
                y: 250,
                color: "#f59e0b",
              },
              {
                id: "settings",
                label: "Settings",
                x: 220,
                y: 250,
                color: "#ec4899",
              },
              {
                id: "advanced",
                label: "Advanced",
                x: 400,
                y: 250,
                color: "#ef4444",
              },
            ]}
            edges={[
              { from: "cli", to: "core", label: "" },
              { from: "cli", to: "project", label: "" },
              { from: "cli", to: "dev", label: "" },
              { from: "cli", to: "session", label: "" },
              { from: "cli", to: "tools", label: "" },
              { from: "cli", to: "settings", label: "" },
              { from: "cli", to: "advanced", label: "" },
            ]}
            width={760}
            height={310}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: 命令模式 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="命令模式"
            subtitle="模块化的命令组织结构"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              每个命令以独立目录的形式组织在{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                /commands/{`{name}`}/
              </code>{" "}
              下，通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                index.ts
              </code>{" "}
              作为入口导出命令处理函数。这种模块化的设计让每个命令可以独立开发、测试和维护。
            </p>
          </div>

          <CodeBlock
            code={`// commands/commit/index.ts
export async function commit(options: CommitOptions) {
  // 1. 解析参数
  const args = parseCommitArgs(options);

  // 2. 执行命令逻辑
  const result = await executeCommit(args);

  // 3. 返回结果
  return formatResult(result);
}`}
            language="typescript"
            filename="commands/commit/index.ts"
            highlights={[2, 3, 4, 6, 8, 9]}
          />

          <div className="mt-8 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              命令系统基于{" "}
              <strong className="text-[var(--text-primary)]">Commander.js</strong>{" "}
              实现参数解析。每个命令通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                program.command()
              </code>{" "}
              注册，支持子命令、选项、参数校验等完整功能。关键的设计决策是使用{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                preAction
              </code>{" "}
              钩子来执行所有命令共用的初始化逻辑，避免每个命令重复编写相同的启动代码。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "独立目录",
                desc: "每个命令独占一个目录，包含入口文件、测试和辅助模块",
                color: "var(--accent-purple)",
              },
              {
                title: "Commander.js",
                desc: "成熟的 CLI 框架，提供参数解析、帮助生成、子命令支持",
                color: "var(--accent-cyan)",
              },
              {
                title: "preAction 钩子",
                desc: "统一初始化入口，确保所有命令共享相同的基础设施",
                color: "var(--accent-blue)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: item.color }}
                  />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h5>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: 命令分类详解 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="命令分类详解"
            subtitle="七大类别，覆盖完整开发生命周期"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              Claude Code 的 40+ 命令按职责划分为七大类别，从核心命令到高级命令，
              构成了完整的开发工作流。每个命令卡片展示其名称、描述和所属类别。
            </p>
          </div>

          <div className="space-y-8">
            {commandCategories.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: cat.color }}
                  />
                  <h4 className="text-lg font-semibold text-[var(--text-primary)]">
                    {cat.category}
                  </h4>
                  <span className="text-sm font-mono text-[var(--text-secondary)]">
                    {cat.categoryEn}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-secondary)] opacity-60">
                    {cat.commands.length} commands
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.commands.map((cmd) => (
                    <div
                      key={cmd.name}
                      className="group p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-purple)]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-[var(--accent-cyan)]">
                          {cmd.name}
                        </code>
                        <span
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono"
                          style={{
                            color: cat.color,
                            background: `${cat.color}15`,
                            border: `1px solid ${cat.color}30`,
                          }}
                        >
                          {cat.categoryEn}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {cmd.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: 命令执行流程 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="命令执行流程"
            subtitle="从 CLI 参数到命令结果的完整管道"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              当用户在终端输入命令时，参数会经过 Commander.js 解析、preAction 钩子初始化、
              命令处理器执行三个核心阶段。每个阶段职责清晰，错误处理完善，确保命令执行的安全性和可靠性。
            </p>
          </div>

          <CodeFlow
            title="命令执行流程"
            steps={[
              {
                code: `// Step 1: Commander.js 解析 CLI 参数
const program = new Command();
program
  .name('claude')
  .version(VERSION)
  .argument('[args...]')
  .hook('preAction', async () => {
    await initializeEntrypoint(isNonInteractive);
    eagerLoadSettings();
  });`,
                highlight: [2, 3, 4, 5, 6, 7, 8, 9],
                description:
                  "CLI 参数首先被 Commander.js 解析。program 实例注册了全局钩子 preAction，在命令处理函数执行之前，先完成入口初始化和设置预加载。",
              },
              {
                code: `// Step 2: preAction 钩子执行
program.hook('preAction', async () => {
  // 初始化入口基础设施
  await initializeEntrypoint(isNonInteractive);
  // 预加载设置
  eagerLoadSettings();
});`,
                highlight: [3, 4, 6],
                description:
                  "preAction 钩子在所有命令处理函数执行之前统一运行。它负责初始化配置系统、加载用户设置、设置运行环境。无论执行哪个命令，这些初始化步骤都是必须的。",
              },
              {
                code: `// Step 3: 命令处理器执行
async function handleCommit(options) {
  const args = parseCommitArgs(options);
  const result = await executeCommit(args);
  return formatResult(result);
}`,
                highlight: [2, 3, 4],
                description:
                  "经过初始化后，控制权交给具体的命令处理函数。每个处理器负责解析自己的参数、执行命令逻辑、格式化并返回结果。错误会被全局错误处理器捕获。",
              },
              {
                code: `// Step 4: 结果输出与清理
process.on('exit', () => {
  flushTelemetry();
  cleanupTempFiles();
});`,
                highlight: [2, 3],
                description:
                  "命令执行完成后，系统会进行清理工作：刷新遥测数据、清理临时文件、保存会话状态。在非交互模式下，结果会直接输出到 stdout，便于管道操作。",
              },
            ]}
          />

          <div className="mt-8">
            <CodeBlock
              code={`// preAction 模式：所有命令的公共初始化入口
program.hook('preAction', async () => {
  await initializeEntrypoint(isNonInteractive);
  eagerLoadSettings();
});`}
              language="typescript"
              filename="cli.tsx"
              highlights={[2, 3, 4]}
            />
          </div>

          <div className="mt-8 space-y-4">
            {[
              {
                phase: "CLI Args",
                desc: "用户输入的命令行参数，包括命令名、子命令、选项和位置参数",
              },
              {
                phase: "Commander.js",
                desc: "参数解析引擎，将原始参数映射到命令定义，处理选项和参数校验",
              },
              {
                phase: "preAction Hook",
                desc: "公共初始化钩子，执行所有命令共享的初始化逻辑",
              },
              {
                phase: "init()",
                desc: "核心初始化函数，启用配置系统、安全环境、遥测服务",
              },
              {
                phase: "Command Handler",
                desc: "具体命令的业务逻辑处理，每个命令有独立的处理函数",
              },
              {
                phase: "Result",
                desc: "命令执行结果，在交互模式下渲染到终端 UI，非交互模式下输出到 stdout",
              },
            ].map((item, i) => (
              <div
                key={item.phase}
                className="flex gap-4 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <div>
                  <code className="text-sm font-mono text-[var(--accent-cyan)]">
                    {item.phase}
                  </code>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 交互式 vs 非交互式模式 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="交互式 vs 非交互式模式"
            subtitle="自适应运行环境"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的命令系统支持两种运行模式：交互式模式使用完整的 React 终端 UI（基于 ink 框架），
              提供丰富的可视化交互；非交互式模式直接执行命令并输出结果，适合管道操作和 CI/CD 集成。
              系统在启动时自动检测运行环境，选择合适的模式。
            </p>
          </div>

          <CodeBlock
            code={`// 检测是否为非交互式模式
const isNonInteractive = !process.stdout.isTTY ||
  hasNonInteractiveFlag(process.argv);

// 根据模式选择不同的处理路径
if (isNonInteractive) {
  // 非交互式：直接执行，输出到 stdout
  const result = await executeCommand(commandArgs);
  console.log(JSON.stringify(result));
} else {
  // 交互式：启动 ink React 终端 UI
  render(<App command={commandArgs} />);
}`}
            language="typescript"
            filename="cli.tsx - 模式检测"
            highlights={[2, 3, 5, 6, 7, 8, 10, 11]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h5 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--accent-cyan)" }}
                />
                交互式模式
              </h5>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  基于{" "}
                  <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                    ink
                  </code>{" "}
                  框架的 React 终端 UI，提供完整的可视化体验：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>实时流式输出与语法高亮</li>
                  <li>交互式权限确认对话框</li>
                  <li>进度条与状态指示器</li>
                  <li>快捷键支持与命令历史</li>
                  <li>多面板布局与工具结果展示</li>
                </ul>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h5 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--accent-purple)" }}
                />
                非交互式模式
              </h5>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  直接执行并输出结果，专为自动化场景设计：
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>stdout 输出，支持 Unix 管道组合</li>
                  <li>JSON 格式化输出，便于程序解析</li>
                  <li>无交互确认，适合 CI/CD 环境</li>
                  <li>退出码反映执行状态（0 = 成功）</li>
                  <li>stderr 输出错误与诊断信息</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <CodeBlock
              code={`// 管道友好的非交互式使用示例
// 在 CI 中执行代码审查
$ claude review --non-interactive --output json

# 输出 JSON 结果到文件
$ claude diff --json > changes.json

# 与其他工具组合使用
$ claude status --quiet && echo "OK" || echo "FAIL"`}
              language="bash"
              filename="终端示例"
              highlights={[2, 5, 8]}
            />
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
