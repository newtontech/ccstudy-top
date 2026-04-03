import { ModuleLayout } from "@/components/ModuleLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function ArchitecturePage() {
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
      title: "命令系统",
      href: "/commands",
      description: "命令行界面",
      icon: "\u2328\uFE0F",
    },
    {
      title: "插件系统",
      href: "/plugins",
      description: "扩展机制",
      icon: "\uD83D\uDD0C",
    },
  ];

  return (
    <ModuleLayout
      title="系统架构"
      subtitle="Claude Code 核心架构的深度剖析 —— 分层设计、消息流、状态管理与性能策略"
      icon="\uD83C\uDFD7\uFE0F"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: 架构概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="架构概述" subtitle="分层设计的艺术" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 是一个基于{" "}
              <strong className="text-[var(--text-primary)]">React + TypeScript</strong>{" "}
              构建的高度复杂的 CLI 应用程序。它采用了一种独特的架构方案——将 React 组件模型引入终端环境，
              通过自定义的{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                ink
              </code>{" "}
              框架将 React 组件树渲染为 ANSI 终端输出。这意味着开发者可以像编写 Web 应用一样编写终端应用，
              享受组件化、状态管理和声明式 UI 的所有优势。
            </p>
            <p>
              整个系统采用经典的分层架构，从底层的基础设施到顶层的用户界面，每一层都有明确的职责边界。
              这种设计不仅使得代码易于理解和维护，还允许各层独立演进而不会产生连锁反应。
            </p>
          </div>

          <ArchitectureDiagram
            title="Claude Code 五层架构"
            nodes={[
              // Layer 5: UI
              { id: "ui-ink", label: "ink 渲染器", x: 40, y: 40, color: "var(--accent-cyan)" },
              { id: "ui-comp", label: "UI 组件", x: 220, y: 40, color: "var(--accent-cyan)" },
              { id: "ui-hooks", label: "React Hooks", x: 400, y: 40, color: "var(--accent-cyan)" },
              // Layer 4: 扩展
              { id: "ext-plugin", label: "插件系统", x: 40, y: 130, color: "var(--accent-blue)" },
              { id: "ext-skills", label: "Skills", x: 220, y: 130, color: "var(--accent-blue)" },
              { id: "ext-mcp", label: "MCP 协议", x: 400, y: 130, color: "var(--accent-blue)" },
              // Layer 3: 引擎
              { id: "eng-query", label: "QueryEngine", x: 40, y: 220, color: "var(--accent-purple)" },
              { id: "eng-tools", label: "工具系统", x: 220, y: 220, color: "var(--accent-purple)" },
              { id: "eng-cmd", label: "命令分发", x: 400, y: 220, color: "var(--accent-purple)" },
              // Layer 2: 状态
              { id: "st-state", label: "全局状态", x: 40, y: 310, color: "var(--accent-purple)" },
              { id: "st-ctx", label: "Context", x: 220, y: 310, color: "var(--accent-purple)" },
              { id: "st-mem", label: "记忆系统", x: 400, y: 310, color: "var(--accent-purple)" },
              // Layer 1: 基础
              { id: "bs-bootstrap", label: "Bootstrap", x: 40, y: 400, color: "var(--text-secondary)" },
              { id: "bs-cli", label: "CLI 解析", x: 220, y: 400, color: "var(--text-secondary)" },
              { id: "bs-main", label: "main.tsx", x: 400, y: 400, color: "var(--text-secondary)" },
            ]}
            edges={[
              // Layer 5 connections
              { from: "ui-ink", to: "ui-comp", label: "渲染" },
              { from: "ui-comp", to: "ui-hooks", label: "绑定" },
              // Layer 4 connections
              { from: "ext-plugin", to: "ext-skills", label: "注册" },
              { from: "ext-skills", to: "ext-mcp", label: "通信" },
              // Layer 3 connections
              { from: "eng-query", to: "eng-tools", label: "调用" },
              { from: "eng-tools", to: "eng-cmd", label: "分发" },
              // Layer 2 connections
              { from: "st-state", to: "st-ctx", label: "注入" },
              { from: "st-ctx", to: "st-mem", label: "持久化" },
              // Layer 1 connections
              { from: "bs-bootstrap", to: "bs-cli", label: "启动" },
              { from: "bs-cli", to: "bs-main", label: "入口" },
              // Cross-layer: Layer 1 → 2
              { from: "bs-bootstrap", to: "st-state", label: "初始化" },
              // Cross-layer: Layer 2 → 3
              { from: "st-ctx", to: "eng-query", label: "上下文" },
              // Cross-layer: Layer 3 → 4
              { from: "eng-tools", to: "ext-mcp", label: "扩展" },
              // Cross-layer: Layer 3 → 5
              { from: "eng-query", to: "ui-hooks", label: "更新" },
            ]}
            width={560}
            height={480}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-3">
            {[
              { layer: "L5", name: "UI 层", desc: "ink 终端渲染、React 组件、Hooks", color: "var(--accent-cyan)" },
              { layer: "L4", name: "扩展层", desc: "插件、Skills、MCP 协议", color: "var(--accent-blue)" },
              { layer: "L3", name: "引擎层", desc: "查询引擎、工具系统、命令分发", color: "var(--accent-purple)" },
              { layer: "L2", name: "状态层", desc: "全局状态、Context、记忆系统", color: "var(--accent-purple)" },
              { layer: "L1", name: "基础层", desc: "Bootstrap、CLI 解析、主入口", color: "var(--text-secondary)" },
            ].map((item) => (
              <div
                key={item.layer}
                className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="inline-block px-2 py-0.5 rounded text-xs font-bold"
                    style={{
                      background: `${item.color}20`,
                      color: item.color,
                    }}
                  >
                    {item.layer}
                  </span>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {item.name}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2: 消息流 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="消息流" subtitle="从用户输入到界面更新的完整旅程" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的核心是一个精心设计的消息处理管道。当用户在终端中输入一条指令时，
              这条消息会经历一系列转换和处理步骤：从原始文本输入到智能上下文增强，
              从 API 调用到工具执行，最终回到终端界面的渲染更新。
              每一步都经过优化，确保用户体验流畅且响应迅速。
            </p>
          </div>

          <CodeFlow
            title="消息处理管道"
            steps={[
              {
                code: `// Step 1: 用户输入捕获
function handleUserInput(input: string) {
  // 用户输入: "fix the bug in app.ts"
  const userMessage = {
    role: 'user',
    content: input,
  };

  // 添加到消息历史
  conversationHistory.push(userMessage);
}`,
                highlight: [2, 3, 4, 5],
                description:
                  '用户在终端中输入 "fix the bug in app.ts"。TextInput 组件捕获输入，构建标准化的用户消息对象，并追加到对话历史中。',
              },
              {
                code: `// Step 2: QueryEngine 上下文增强
async function prepareQuery(messages) {
  // 注入系统上下文
  const gitStatus = await getGitStatus();
  const projectInfo = getProjectInfo();
  const systemPrompt = buildSystemPrompt({
    tools: registeredTools,
    gitStatus,
    projectInfo,
    permissions: currentPermissions,
  });

  return { system: systemPrompt, messages };
}`,
                highlight: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
                description:
                  "QueryEngine 对消息进行上下文增强：获取 git 状态、项目信息、已注册工具列表和当前权限，构建完整的系统提示词。所有这些上下文信息帮助 Claude 更好地理解用户需求。",
              },
              {
                code: `// Step 3: API 调用
const response = await apiClient.messages.create({
  model: 'claude-sonnet-4-20250514',
  system: systemPrompt,
  messages: conversationHistory,
  tools: toolDefinitions,
  stream: true,
  onChunk: (chunk) => {
    updateUI(chunk); // 流式更新终端
  },
});`,
                highlight: [2, 3, 4, 5, 6, 7, 8, 9],
                description:
                  "将增强后的消息发送给 Claude API。启用流式响应（stream: true），每个 token 到达时立即更新终端显示，用户可以看到 Claude 的思考过程实时展开。",
              },
              {
                code: `// Step 4: Claude 返回工具调用
// Claude 决定先读取文件，了解 bug 的情况
const toolCall = {
  type: 'tool_use',
  name: 'FileReadTool',
  input: {
    file_path: '/project/src/app.ts',
    offset: 1,
    limit: 50,
  },
};`,
                highlight: [2, 3, 4, 5, 6, 7, 8, 9],
                description:
                  'Claude 分析用户请求后，决定使用 FileReadTool 读取 app.ts 文件。它返回一个结构化的工具调用请求，包含工具名称和参数。系统会先进行权限检查，然后执行工具。',
              },
              {
                code: `// Step 5: 工具执行与结果反馈
const result = await toolExecutor.execute(toolCall);

// 将工具结果反馈给 Claude
conversationHistory.push({
  role: 'user',
  content: [{
    type: 'tool_result',
    tool_use_id: toolCall.id,
    content: result.output,
  }],
});

// 继续对话循环...
renderUpdate();`,
                highlight: [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 14],
                description:
                  "工具执行完毕后，结果被包装为 tool_result 消息追加到对话历史，然后反馈给 Claude 继续推理。整个循环会持续进行，直到 Claude 给出最终回复。UI 在每个步骤都会实时更新。",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Section 3: 状态管理 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="状态管理" subtitle="集中式状态与分布式上下文" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的状态管理采用了{" "}
              <strong className="text-[var(--text-primary)]">集中式全局状态</strong>{" "}
              与{" "}
              <strong className="text-[var(--text-primary)]">React Context</strong>{" "}
              相结合的混合方案。全局状态由{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                bootstrap/state.ts
              </code>{" "}
              集中管理，包含应用生命周期中的关键数据；而 UI 相关的状态则通过 React Context 在组件树中分发，
              确保每个组件都能获取所需的状态而无需层层传递 props。
            </p>
          </div>

          <CodeBlock
            code={`// 集中式状态 —— 应用运行时的核心数据
type AppState = {
  originalCwd: string;       // 原始工作目录（启动时锁定，不可变）
  projectRoot: string;       // 项目根目录（向上查找 git/markdown 根）
  totalCostUSD: number;      // 费用追踪（API 调用成本累计）
  isInteractive: boolean;    // 交互模式（终端 vs 管道输入）
  clientType: string;        // 客户端类型（CLI / SDK / CI）
  sessionId: string;         // 会话唯一标识符
  kairosActive: boolean;     // 企业定制版本标志
};

// React Context —— UI 层状态分发
interface UIContextType {
  notifications: Notification[];  // 通知队列
  overlay: OverlayState | null;   // 叠加层状态
  prompt: PromptState;            // 输入提示状态
  isLoading: boolean;             // 加载指示器
}`}
            language="typescript"
            filename="bootstrap/state.ts + UI Context"
            highlights={[2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16]}
          />

          <div className="mt-8 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">
              状态流架构
            </h4>
            <p>
              状态在系统中的流向遵循严格的单向数据流原则：
            </p>
            <div className="space-y-3">
              {[
                {
                  phase: "启动阶段",
                  desc: "Bootstrap 初始化全局状态（originalCwd、sessionId、clientType），这些值一旦设定，在应用生命周期内不可变",
                },
                {
                  phase: "运行阶段",
                  desc: "QueryEngine 读写 totalCostUSD 追踪费用，工具执行结果更新 UI Context，React 组件自动响应状态变化",
                },
                {
                  phase: "持久化阶段",
                  desc: "关键状态通过 memdir（记忆目录）写入磁盘，下次启动时恢复上下文，实现跨会话的连续体验",
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
                    <span className="text-sm font-semibold text-[var(--accent-cyan)]">
                      {item.phase}
                    </span>
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

      {/* Section 4: 工具注册与执行 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="工具注册与执行" subtitle="40+ 内置工具的统一管理" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的工具系统是其最强大的能力来源。每个工具都实现了一个统一的接口，
              确保无论是内置工具（如文件读写、代码搜索）还是外部工具（如 MCP 服务器提供的工具），
              都能以相同的方式被注册、发现和调用。这种设计带来了极高的可扩展性。
            </p>
          </div>

          <CodeBlock
            code={`// 基础工具接口 —— 所有工具的统一契约
interface Tool {
  name: string;              // 工具名称（全局唯一标识符）
  description: string;       // 工具描述（帮助 Claude 理解何时使用）
  inputSchema: object;       // JSON Schema 输入参数定义
  execute: (input: ToolInput) => Promise<ToolResult>;  // 执行函数
}

// 工具注册示例
const tools: Tool[] = [
  {
    name: 'Read',
    description: 'Reads a file from the local filesystem',
    inputSchema: {
      type: 'object',
      properties: {
        file_path: { type: 'string', description: 'Absolute path' },
        offset: { type: 'number' },
        limit: { type: 'number' },
      },
      required: ['file_path'],
    },
    execute: async (input) => {
      const content = await fs.readFile(input.file_path, 'utf-8');
      return { output: content, success: true };
    },
  },
  // ... 40+ more tools
];`}
            language="typescript"
            filename="tools/types.ts"
            highlights={[3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]}
          />

          <div className="mt-8 mb-6">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              权限检查流程
            </h4>
            <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed">
              每个工具调用都会经过多层权限验证，确保用户的安全和隐私不会被侵犯：
            </p>
            <div className="space-y-3">
              {[
                {
                  step: "Feature Flags",
                  desc: "检查实验性功能开关，确定工具是否启用",
                  icon: "1",
                },
                {
                  step: "Permission Mode",
                  desc: "检查当前权限模式（auto/manual/bypass），决定是否自动批准",
                  icon: "2",
                },
                {
                  step: "Tool-Specific Check",
                  desc: "工具级别的权限检查，如文件路径限制、网络访问控制等",
                  icon: "3",
                },
                {
                  step: "User Consent",
                  desc: "在 manual 模式下弹出确认对话框，由用户决定是否执行",
                  icon: "4",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center text-sm font-bold">
                    {item.icon}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-[var(--accent-cyan)]">
                      {item.step}
                    </span>
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

      {/* Section 5: 性能优化策略 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="性能优化策略" subtitle="毫秒级响应背后的工程实践" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 在性能优化方面投入了大量工程努力。从启动时的懒加载到运行时的记忆化缓存，
              从大数据量的虚拟滚动到后台任务的非阻塞执行，每一个优化都经过精心设计，
              确保终端中的交互体验尽可能流畅。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Lazy Loading",
                desc: "动态导入重型模块，只在需要时加载",
                detail:
                  "通过 dynamic import 和条件加载，避免在启动时加载不必要的代码。例如协调器模式只在 feature flag 开启时才加载。",
              },
              {
                title: "Memoization",
                desc: "React.memo + useMemo 广泛使用",
                detail:
                  "对于复杂的 UI 组件和计算密集型操作，使用 React.memo 避免不必要的重渲染，useMemo 缓存计算结果。",
              },
              {
                title: "Virtual Scrolling",
                desc: "大列表的虚拟化渲染",
                detail:
                  "在显示大型文件列表、搜索结果等场景下，只渲染可见区域的元素，大幅减少 DOM 操作和内存占用。",
              },
              {
                title: "Background Tasks",
                desc: "非阻塞异步操作",
                detail:
                  "遥测上报、配置预取、分析数据收集等操作在后台执行，使用 void Promise.all 模式确保不阻塞主线程。",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <h5 className="text-base font-semibold text-[var(--text-primary)] mb-1">
                  {item.title}
                </h5>
                <p className="text-sm text-[var(--accent-cyan)] mb-3 font-mono">
                  {item.desc}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              code={`// 懒加载重型模块 —— 条件导入策略
const coordinatorModule = feature('COORDINATOR_MODE')
  ? require('./coordinator/coordinatorMode.js')
  : null;

// 并行预加载非关键模块（不阻塞主流程）
void Promise.all([
  import('./services/analytics/firstPartyEventLogger.js'),
  import('./services/analytics/growthbook.js'),
]);

// React.memo 避免不必要的重渲染
const ExpensiveComponent = React.memo(({ data, onAction }) => {
  const processed = useMemo(
    () => heavyTransform(data),
    [data]
  );
  return <UIRenderer data={processed} onAction={onAction} />;
});`}
              language="typescript"
              filename="performance/patterns.ts"
              highlights={[2, 3, 4, 6, 7, 8, 9, 12, 13, 14, 15, 16]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: 权限系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="权限系统" subtitle="多层防护的安全模型" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的权限系统采用多层防御策略，从全局的功能开关到细粒度的用户确认，
              每一层都提供了不同级别的安全保护。这种设计确保了在各种使用场景下——
              从个人开发到企业环境——都能提供适当的安全级别。
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {[
              {
                layer: "Feature Flags",
                desc: "功能开关层",
                detail:
                  "通过 feature flag 系统控制实验性功能的开启和关闭。新工具和新功能首先通过 flag 控制，经过充分测试后才会默认启用。这确保了只有经过验证的能力才会暴露给用户。",
                example: `// 检查 feature flag
if (feature('MCP_SERVERS')) {
  enableMcpIntegration();
}`,
              },
              {
                layer: "Permission Modes",
                desc: "权限模式层",
                detail:
                  "三种权限模式满足不同安全需求：auto 模式自动批准安全操作；manual 模式对所有敏感操作弹出确认；bypass 模式用于 CI/CD 等自动化场景，通过环境变量控制。",
                example: `// 权限模式配置
const mode = process.env.PERMISSION_MODE || 'manual';
// auto: 自动批准安全操作
// manual: 每次敏感操作需确认
// bypass: CI/CD 环境，受环境变量控制`,
              },
              {
                layer: "Tool-Specific Permissions",
                desc: "工具级权限层",
                detail:
                  "每个工具可以定义自己的权限检查逻辑。例如文件操作工具会检查路径是否在项目目录内，网络工具会检查 URL 是否在白名单中。这种细粒度的控制确保了工具只能执行被允许的操作。",
                example: `// 工具级权限检查
async function checkPermission(tool, input) {
  if (tool.name === 'Write') {
    return isPathInProject(input.file_path);
  }
  return true;
}`,
              },
              {
                layer: "User Consent",
                desc: "用户确认层",
                detail:
                  "在 manual 模式下，敏感操作（如文件写入、命令执行）会弹出交互式确认对话框。用户可以一次性批准或拒绝，也可以选择\"本次会话始终允许\"，在安全性和便利性之间取得平衡。",
                example: `// 用户确认对话框
const consent = await showConsentDialog({
  tool: 'Bash',
  action: 'npm install express',
  risk: 'medium',
});
if (!consent.approved) return;`,
              },
            ].map((item, i) => (
              <div
                key={item.layer}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-blue)]/10 text-[var(--accent-blue)] flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h5 className="text-base font-semibold text-[var(--text-primary)]">
                      {item.layer}
                    </h5>
                    <p className="text-sm text-[var(--accent-cyan)] font-mono">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  {item.detail}
                </p>
                <CodeBlock
                  code={item.example}
                  language="typescript"
                  highlights={[2, 3]}
                />
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7: 上下文管理 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="上下文管理" subtitle="让 Claude 理解你的项目" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              上下文管理是 Claude Code 智能化的关键。系统通过多种渠道收集和整合上下文信息，
              帮助 Claude 深入理解用户的项目环境、编码习惯和团队规范。
              这些上下文信息在每次 API 调用时都会被精心组织和注入，确保 Claude 的回复始终贴合实际场景。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "系统上下文",
                desc: "System Context",
                items: [
                  "Git 仓库状态（分支、变更、冲突）",
                  "系统信息（操作系统、Node.js 版本）",
                  "环境变量与配置",
                  "网络连接状态",
                ],
                color: "var(--accent-cyan)",
              },
              {
                title: "用户上下文",
                desc: "User Context",
                items: [
                  "CLAUDE.md 项目级指令文件",
                  "用户级 ~/.claude/settings 配置",
                  "项目 .claude/ 目录下的设置",
                  "用户偏好与历史行为",
                ],
                color: "var(--accent-purple)",
              },
              {
                title: "记忆系统",
                desc: "Memory System (memdir)",
                items: [
                  "跨会话的持久化上下文存储",
                  "项目特定的知识与决策记录",
                  "用户习惯的自动学习与适应",
                  "团队共享的知识库",
                ],
                color: "var(--accent-blue)",
              },
              {
                title: "团队上下文",
                desc: "Team Context",
                items: [
                  "多 Agent 协调的共享状态",
                  "任务分配与进度追踪",
                  "团队成员间的消息传递",
                  "统一的权限与配置管理",
                ],
                color: "var(--accent-purple)",
              },
            ].map((ctx) => (
              <div
                key={ctx.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: ctx.color }}
                  />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">
                    {ctx.title}
                  </h5>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    {ctx.desc}
                  </span>
                </div>
                <ul className="space-y-2">
                  {ctx.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: ctx.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              code={`// 上下文组装 —— QueryEngine 的核心逻辑
function assembleContext(state: AppState): SystemPrompt {
  return {
    // 1. 系统上下文
    git: getGitStatus(),           // 当前分支、暂存区、未跟踪文件
    system: getSystemInfo(),       // OS、Node.js 版本、Shell 类型

    // 2. 用户上下文
    claudeMd: readClaudeMdFiles(), // 项目级 CLAUDE.md 指令
    settings: loadUserSettings(),  // 用户偏好与配置

    // 3. 记忆系统
    memory: loadMemdir(state.projectRoot),  // 持久化上下文

    // 4. 工具定义
    tools: getRegisteredTools(),   // 当前可用的工具列表

    // 5. 权限上下文
    permissions: getPermissionState(),  // 当前权限模式与规则
  };
}`}
              language="typescript"
              filename="core/context.ts"
              highlights={[3, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19]}
            />
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
