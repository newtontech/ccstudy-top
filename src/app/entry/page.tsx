import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function EntryPage() {
  const relatedModules = [
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构与核心设计模式",
      icon: "🏗️",
    },
    {
      title: "工具系统",
      href: "/tools",
      description: "40+ 内置工具实现",
      icon: "🔧",
    },
    {
      title: "插件系统",
      href: "/plugins",
      description: "插件与 MCP 扩展",
      icon: "🔌",
    },
  ];

  return (
    <ModuleLayout
      title="入口与启动"
      subtitle="从 main.tsx 到应用就绪的完整启动流程"
      icon="🚀"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: 概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="概述" subtitle="Claude Code 启动流程全景" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的启动流程看似简单——一行命令{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                claude
              </code>{" "}
              即可启动——但背后隐藏着精心设计的优化策略。主入口文件{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                main.tsx
              </code>{" "}
              虽然编译后高达 785KB，却通过一系列快速路径判断和并行预取机制，实现了令人印象深刻的启动速度。
            </p>
            <p>
              整个启动流程可以分为四个阶段：快速路径检测、并行预取启动、核心初始化、以及命令分发。每个阶段都经过精心优化，确保用户获得最快的使用体验。
            </p>
          </div>

          <ArchitectureDiagram
            title="启动流程架构"
            nodes={[
              { id: "main", label: "main.tsx", x: 40, y: 40 },
              { id: "bootstrap", label: "bootstrap", x: 220, y: 40 },
              { id: "cli", label: "cli.tsx", x: 400, y: 40 },
              { id: "init", label: "init()", x: 540, y: 40 },
              { id: "command", label: "命令执行", x: 680, y: 40 },
              { id: "state", label: "state.ts", x: 220, y: 160 },
              { id: "handlers", label: "handlers/", x: 540, y: 160 },
            ]}
            edges={[
              { from: "main", to: "bootstrap", label: "加载" },
              { from: "bootstrap", to: "cli", label: "启动" },
              { from: "cli", to: "init", label: "初始化" },
              { from: "init", to: "command", label: "运行" },
              { from: "bootstrap", to: "state", label: "状态" },
              { from: "init", to: "handlers", label: "分发" },
            ]}
            width={860}
            height={240}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: main.tsx - 主入口 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="main.tsx - 主入口"
            subtitle="一切从这里开始"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                main.tsx
              </code>{" "}
              是 Claude Code CLI 的入口文件，由 Node.js 在{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                package.json
              </code>{" "}
              的{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                bin
              </code>{" "}
              字段中指定。它的首要任务是尽快完成启动——为此，它在模块加载的同时就并行启动了关键子进程：
            </p>
          </div>

          <ArchitectureDiagram
            title="模块加载阶段 - 并行预取策略"
            nodes={[
              { id: "main", label: "main.tsx 入口", x: 40, y: 60, color: "var(--accent-purple)" },
              { id: "mdm", label: "startMdmRawRead()", x: 300, y: 10, color: "var(--accent-blue)" },
              { id: "keychain", label: "startKeychainPrefetch()", x: 300, y: 110, color: "var(--accent-cyan)" },
              { id: "mdmResult", label: "MDM 配置就绪", x: 560, y: 10, color: "var(--accent-blue)" },
              { id: "keychainResult", label: "认证凭据就绪", x: 560, y: 110, color: "var(--accent-cyan)" },
              { id: "modules", label: "其余模块加载中...", x: 300, y: 200, color: "var(--text-secondary)" },
            ]}
            edges={[
              { from: "main", to: "mdm", label: "异步启动" },
              { from: "main", to: "keychain", label: "异步启动" },
              { from: "main", to: "modules", label: "同步加载" },
              { from: "mdm", to: "mdmResult", label: "I/O 并行" },
              { from: "keychain", to: "keychainResult", label: "I/O 并行" },
            ]}
            width={800}
            height={260}
          />

          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              这里的设计非常巧妙：<strong className="text-[var(--text-primary)]">MDM（移动设备管理）配置读取</strong> 和{" "}
              <strong className="text-[var(--text-primary)]">macOS 钥匙串预取</strong>{" "}
              被放在模块顶层立即执行。这意味着在 Node.js 解析和加载剩余模块的同时，这两个 I/O 密集型操作已经开始并行运行，充分利用了 Node.js 的事件循环特性。
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-[var(--text-primary)]">startMdmRawRead</strong>：预读 MDM 配置，用于企业环境下的策略管理
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">startKeychainPrefetch</strong>：预取 macOS 钥匙串中的认证凭据，加速后续 API 调用
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: 快速路径优化 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="快速路径优化"
            subtitle="零延迟处理常见请求"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 为一系列不需要完整初始化的命令提供了快速路径（Fast Path）。这些命令在加载任何重量级模块之前就被拦截并处理，响应时间接近零。
            </p>
          </div>

          <ArchitectureDiagram
            title="快速路径决策 - 零模块加载"
            nodes={[
              { id: "args", label: "解析命令行参数", x: 40, y: 60, color: "var(--accent-purple)" },
              { id: "check", label: "匹配快速路径?", x: 280, y: 60, color: "var(--accent-purple)" },
              { id: "fast", label: "直接输出并退出", x: 540, y: 10, color: "#10b981" },
              { id: "full", label: "进入完整初始化", x: 540, y: 110, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "args", to: "check", label: "检查" },
              { from: "check", to: "fast", label: "--version 等" },
              { from: "check", to: "full", label: "其他命令" },
            ]}
            width={740}
            height={180}
          />

          <div className="mt-8 mb-6">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              所有快速路径一览
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  flag: "--version / -v",
                  desc: "输出版本号后立即退出，不加载任何模块",
                },
                {
                  flag: "--dump-system-prompt",
                  desc: "导出系统提示词，用于调试和开发",
                },
                {
                  flag: "--claude-in-chrome-mcp",
                  desc: "启动 Chrome 浏览器 MCP 服务模式",
                },
                {
                  flag: "--computer-use-mcp",
                  desc: "启动计算机使用 MCP 服务模式",
                },
                {
                  flag: "--daemon-worker",
                  desc: "以守护进程工作模式启动",
                },
              ].map((item) => (
                <div
                  key={item.flag}
                  className="flex gap-3 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
                >
                  <code className="text-sm font-mono text-[var(--accent-cyan)] whitespace-nowrap">
                    {item.flag}
                  </code>
                  <span className="text-sm text-[var(--text-secondary)]">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <ArchitectureDiagram
            title="main() 执行流程"
            nodes={[
              { id: "start", label: "main() 入口", x: 40, y: 40, color: "var(--accent-purple)" },
              { id: "step1", label: "1. 快速路径检测", x: 220, y: 40, color: "#10b981" },
              { id: "step2", label: "2. 并行预取", x: 400, y: 40, color: "var(--accent-blue)" },
              { id: "step3", label: "3. init() 初始化", x: 580, y: 40, color: "var(--accent-cyan)" },
              { id: "step4", label: "4. run() 主循环", x: 760, y: 40, color: "var(--accent-purple)" },
              { id: "mdm", label: "MDM 读取", x: 400, y: 140, color: "var(--accent-blue)" },
              { id: "keychain", label: "钥匙串预取", x: 580, y: 140, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "start", to: "step1", label: "启动" },
              { from: "step1", to: "step2", label: "通过" },
              { from: "step2", to: "step3", label: "预取完成" },
              { from: "step3", to: "step4", label: "就绪" },
              { from: "step2", to: "mdm", label: "异步" },
              { from: "step2", to: "keychain", label: "异步" },
            ]}
            width={940}
            height={210}
          />
        </section>
      </ScrollReveal>

      {/* Section 4: Bootstrap - 应用状态初始化 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Bootstrap - 应用状态初始化"
            subtitle="集中式状态管理的心脏"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                bootstrap/state.ts
              </code>{" "}
              是 Claude Code 状态管理的核心。它维护了应用运行所需的全局状态，从工作目录到费用追踪，从会话标识到客户端类型检测，所有关键信息都汇聚于此。
            </p>
          </div>

          <ArchitectureDiagram
            title="bootstrap/state.ts - 核心状态结构"
            nodes={[
              { id: "state", label: "State (全局状态)", x: 300, y: 10, color: "var(--accent-purple)" },
              { id: "cwd", label: "originalCwd", x: 40, y: 100, color: "var(--accent-blue)" },
              { id: "root", label: "projectRoot", x: 220, y: 100, color: "var(--accent-blue)" },
              { id: "cost", label: "totalCostUSD", x: 400, y: 100, color: "#f59e0b" },
              { id: "interactive", label: "isInteractive", x: 580, y: 100, color: "var(--accent-cyan)" },
              { id: "kairos", label: "kairosActive", x: 40, y: 190, color: "#10b981" },
              { id: "client", label: "clientType", x: 220, y: 190, color: "var(--accent-blue)" },
              { id: "session", label: "sessionId", x: 400, y: 190, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "state", to: "cwd", label: "工作目录" },
              { from: "state", to: "root", label: "项目根" },
              { from: "state", to: "cost", label: "费用追踪" },
              { from: "state", to: "interactive", label: "模式标志" },
              { from: "state", to: "kairos", label: "助手模式" },
              { from: "state", to: "client", label: "客户端类型" },
              { from: "state", to: "session", label: "会话标识" },
            ]}
            width={760}
            height={260}
          />

          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              这种集中式状态设计有几个重要优势：
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>
                <strong className="text-[var(--text-primary)]">单一数据源</strong>：所有模块通过同一个状态对象获取运行时信息，避免状态不一致
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">早期计算</strong>：像 clientType 这样的值在启动时就确定，后续无需重复计算
              </li>
              <li>
                <strong className="text-[var(--text-primary)]">可追踪性</strong>：totalCostUSD 等字段提供了运行时的关键度量指标
              </li>
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 客户端类型检测 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="客户端类型检测"
            subtitle="自适应运行环境"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 不仅仅是 CLI 工具——它可以作为 TypeScript SDK、Python SDK、GitHub Action 等多种方式运行。启动时的环境检测确保了正确的行为模式。
            </p>
          </div>

          <ArchitectureDiagram
            title="客户端类型检测决策流程"
            nodes={[
              { id: "detect", label: "环境变量检测", x: 40, y: 70, color: "var(--accent-purple)" },
              { id: "gh", label: "GITHUB_ACTIONS?", x: 280, y: 10, color: "var(--accent-blue)" },
              { id: "ts", label: "ENTRYPOINT=sdk-ts?", x: 280, y: 80, color: "var(--accent-cyan)" },
              { id: "py", label: "ENTRYPOINT=sdk-py?", x: 280, y: 150, color: "#10b981" },
              { id: "ghResult", label: "github-action", x: 520, y: 10, color: "var(--accent-blue)" },
              { id: "tsResult", label: "sdk-typescript", x: 520, y: 80, color: "var(--accent-cyan)" },
              { id: "pyResult", label: "sdk-python", x: 520, y: 150, color: "#10b981" },
              { id: "default", label: "cli (默认)", x: 520, y: 220, color: "var(--text-secondary)" },
            ]}
            edges={[
              { from: "detect", to: "gh", label: "检查" },
              { from: "detect", to: "ts", label: "检查" },
              { from: "detect", to: "py", label: "检查" },
              { from: "gh", to: "ghResult", label: "是" },
              { from: "ts", to: "tsResult", label: "是" },
              { from: "py", to: "pyResult", label: "是" },
              { from: "py", to: "default", label: "全部否" },
            ]}
            width={720}
            height={280}
          />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                type: "cli",
                env: "（默认）",
                desc: "标准终端交互模式，支持流式输出和用户输入",
              },
              {
                type: "sdk-typescript",
                env: "CLAUDE_CODE_ENTRYPOINT=sdk-ts",
                desc: "TypeScript SDK 嵌入调用，程序化控制 Claude Code",
              },
              {
                type: "sdk-python",
                env: "CLAUDE_CODE_ENTRYPOINT=sdk-py",
                desc: "Python SDK 嵌入调用，适合数据科学和自动化场景",
              },
              {
                type: "github-action",
                env: "GITHUB_ACTIONS=true",
                desc: "CI/CD 环境，自动检测并调整输出格式和交互模式",
              },
            ].map((item) => (
              <div
                key={item.type}
                className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <code className="text-sm font-mono text-[var(--accent-cyan)]">
                    {item.type}
                  </code>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-1">
                  {item.desc}
                </p>
                <code className="text-xs font-mono text-[var(--text-secondary)] opacity-60">
                  {item.env}
                </code>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: 传输层架构 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="传输层架构"
            subtitle="灵活的通信方式"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的 CLI 与 API 之间通过可插拔的传输层进行通信。根据网络环境和部署场景的不同，系统会自动选择最优的传输方式：
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "HybridTransport",
                desc: "WebSocket 读 + HTTP POST 写",
                detail:
                  "混合传输模式，结合了 WebSocket 的实时推送优势和 HTTP 的可靠性。读取使用 WebSocket 保持长连接，写入使用 HTTP POST 确保消息可靠送达。",
              },
              {
                name: "WebSocketTransport",
                desc: "标准双向 WebSocket",
                detail:
                  "纯 WebSocket 传输，适用于网络环境稳定的场景。全双工通信，延迟最低，但在网络不稳定时可能出现断连。",
              },
              {
                name: "SSETransport",
                desc: "Server-Sent Events",
                detail:
                  "单向推送模式，适用于只需要接收服务器消息的场景。兼容性最好，可在受限网络环境中工作。",
              },
            ].map((transport) => (
              <div
                key={transport.name}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <h5 className="text-base font-semibold text-[var(--text-primary)] mb-1 font-mono">
                  {transport.name}
                </h5>
                <p className="text-sm text-[var(--accent-cyan)] mb-3 font-mono">
                  {transport.desc}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {transport.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <ArchitectureDiagram
              title="传输层 URL 转换模式"
              nodes={[
                { id: "http", label: "HTTP 基础 URL", x: 40, y: 60, color: "var(--accent-blue)" },
                { id: "ws", label: "WebSocket URL", x: 320, y: 20, color: "var(--accent-cyan)" },
                { id: "sse", label: "SSE 端点 URL", x: 320, y: 100, color: "#10b981" },
                { id: "wsResult", label: "wss:// 或 ws://", x: 560, y: 20, color: "var(--accent-cyan)" },
                { id: "sseResult", label: "/sse 路径追加", x: 560, y: 100, color: "#10b981" },
              ]}
              edges={[
                { from: "http", to: "ws", label: "协议替换" },
                { from: "http", to: "sse", label: "路径追加" },
                { from: "ws", to: "wsResult", label: "https -> wss" },
                { from: "sse", to: "sseResult", label: "+ /sse" },
              ]}
              width={760}
              height={170}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7: init() 初始化流程 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="init() 初始化流程"
            subtitle="核心基础设施的启动引擎"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                init()
              </code>{" "}
              函数是启动流程中最重要的环节。它负责建立配置系统、安全环境、优雅关闭机制和遥测服务。通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                memoize
              </code>{" "}
              包装确保只执行一次。
            </p>
          </div>

          <ArchitectureDiagram
            title="init() 初始化流程 (memoize 包装，仅执行一次)"
            nodes={[
              { id: "init", label: "init()", x: 40, y: 60, color: "var(--accent-purple)" },
              { id: "config", label: "1. enableConfigs()", x: 240, y: 10, color: "var(--accent-blue)" },
              { id: "safe", label: "2. applySafeEnv()", x: 440, y: 10, color: "var(--accent-cyan)" },
              { id: "shutdown", label: "3. setupGracefulShutdown()", x: 240, y: 110, color: "#f59e0b" },
              { id: "analytics", label: "4. Promise.all()", x: 440, y: 110, color: "#10b981" },
              { id: "analyticsDetail", label: "analytics + growthbook", x: 640, y: 110, color: "#10b981" },
            ]}
            edges={[
              { from: "init", to: "config", label: "配置" },
              { from: "config", to: "safe", label: "安全" },
              { from: "init", to: "shutdown", label: "信号" },
              { from: "init", to: "analytics", label: "异步加载" },
              { from: "analytics", to: "analyticsDetail", label: "并行 import" },
            ]}
            width={820}
            height={180}
          />

          <div className="mt-8 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">
              初始化步骤详解
            </h4>

            <div className="space-y-4">
              {[
                {
                  step: "enableConfigs()",
                  desc: "启用配置系统，加载用户级和项目级配置文件，合并默认值与用户自定义设置",
                },
                {
                  step: "applySafeConfigEnvironmentVariables()",
                  desc: "将安全相关的配置项注入到环境变量中，确保子进程和工具能读取到正确的安全策略",
                },
                {
                  step: "setupGracefulShutdown()",
                  desc: "注册 SIGINT（Ctrl+C）和 SIGTERM 信号处理器，确保关闭时保存状态、上报遥测数据、清理临时文件",
                },
                {
                  step: "Promise.all([...])",
                  desc: "通过动态 import() 并行加载遥测和 A/B 测试模块，使用 void 前缀表示不阻塞主流程",
                },
              ].map((item, i) => (
                <div
                  key={item.step}
                  className="flex gap-4 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <code className="text-sm font-mono text-[var(--accent-cyan)]">
                      {item.step}
                    </code>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
