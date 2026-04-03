import { ModuleLayout } from "@/components/ModuleLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
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

          <CodeBlock
            code={`// Fast path: 并行启动关键子进程
// 这些操作在模块加载阶段就开始执行，不阻塞主线程
import { startMdmRawRead } from './utils/settings/mdm/rawRead.js';
startMdmRawRead();

import { startKeychainPrefetch } from './utils/secureStorage/keychainPrefetch.js';
startKeychainPrefetch();`}
            language="typescript"
            filename="main.tsx"
            highlights={[2, 3, 6]}
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

          <CodeBlock
            code={`// 零模块加载，直接输出版本号
if (args.length === 1 && (args[0] === '--version' || args[0] === '-v')) {
  console.log(\`\${MACRO.VERSION} (Claude Code)\`);
  return;
}`}
            language="typescript"
            filename="main.tsx - Fast Path"
            highlights={[2, 3, 4]}
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

          <CodeFlow
            title="main() 快速路径执行流程"
            steps={[
              {
                code: `function main(args) {\n  // Step 1: 检查版本号\n  if (args === '--version') {\n    console.log(VERSION);\n    return; // 快速退出\n  }\n  // Step 2: 启动并行预取\n  startMdmRawRead();\n  startKeychainPrefetch();\n  // Step 3: 初始化核心\n  await init();\n  // Step 4: 运行命令\n  await run();\n}`,
                highlight: [2, 3, 4],
                description:
                  "检查是否是 --version 快速路径。如果是，直接输出版本号后返回，无需加载任何模块，响应时间接近零。",
              },
              {
                code: `function main(args) {\n  if (args === '--version') {\n    console.log(VERSION);\n    return;\n  }\n  // Step 2: 启动并行预取\n  startMdmRawRead();\n  startKeychainPrefetch();\n  // Step 3: 初始化核心\n  await init();\n  await run();\n}`,
                highlight: [5, 6],
                description:
                  "并行启动 MDM 配置读取和 macOS 钥匙串预取。这两个操作是异步的，不阻塞主线程，在后续初始化完成前就可能已经拿到结果。",
              },
              {
                code: `function main(args) {\n  if (args === '--version') {\n    console.log(VERSION);\n    return;\n  }\n  startMdmRawRead();\n  startKeychainPrefetch();\n  // Step 3: 初始化核心\n  await init();\n  await run();\n}`,
                highlight: [7, 8],
                description:
                  "调用 init() 初始化配置系统、遥测服务、优雅关闭处理等核心基础设施，然后进入主运行循环 run()。",
              },
            ]}
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

          <CodeBlock
            code={`// 核心状态定义
type State = {
  originalCwd: string;        // 原始工作目录（启动时锁定）
  projectRoot: string;        // 项目根目录（向上查找 git/markdown 根）
  totalCostUSD: number;       // 总费用追踪（API 调用成本累计）
  isInteractive: boolean;     // 交互式模式标志（终端 vs 管道输入）
  kairosActive: boolean;      // KAIROS 助手模式（企业定制版本）
  clientType: string;         // 客户端类型检测（CLI / SDK / CI）
  sessionId: SessionId;       // 当前会话唯一标识符
  // ...更多状态字段
};`}
            language="typescript"
            filename="bootstrap/state.ts"
            highlights={[3, 4, 5, 6, 7, 8, 9]}
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

          <CodeBlock
            code={`// 通过环境变量检测客户端类型
const clientType = (() => {
  // GitHub Actions 环境
  if (isEnvTruthy(process.env.GITHUB_ACTIONS)) return 'github-action';

  // TypeScript SDK 调用
  if (process.env.CLAUDE_CODE_ENTRYPOINT === 'sdk-ts') return 'sdk-typescript';

  // Python SDK 调用
  if (process.env.CLAUDE_CODE_ENTRYPOINT === 'sdk-py') return 'sdk-python';

  // 默认：命令行界面
  return 'cli';
})();`}
            language="typescript"
            filename="bootstrap/state.ts"
            highlights={[3, 6, 9, 12]}
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
            <CodeBlock
              code={`// 传输层 URL 转换模式
// HTTP 基础 URL → WebSocket URL
const wsUrl = httpUrl
  .replace('https://', 'wss://')
  .replace('http://', 'ws://');

// SSE 端点追加路径
const sseUrl = \`\${httpUrl}/sse\`;`}
              language="typescript"
              filename="transport/url.ts"
              highlights={[3, 4, 7]}
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

          <CodeBlock
            code={`// 核心初始化函数 —— memoize 确保只执行一次
export const init = memoize(async (): Promise<void> => {
  // 1. 启用配置系统
  enableConfigs();

  // 2. 应用安全相关的环境变量
  applySafeConfigEnvironmentVariables();

  // 3. 设置优雅关闭处理（SIGINT、SIGTERM）
  setupGracefulShutdown();

  // 4. 并行初始化遥测和分析服务
  void Promise.all([
    import('../services/analytics/firstPartyEventLogger.js'),
    import('../services/analytics/growthbook.js'),
  ]);

  // ...更多初始化步骤
});`}
            language="typescript"
            filename="core/init.ts"
            highlights={[1, 3, 6, 9, 12, 13, 14, 15, 16]}
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
