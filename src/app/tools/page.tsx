import { ModuleLayout } from "@/components/ModuleLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function ToolsPage() {
  const relatedModules = [
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构概览",
      icon: "\uD83C\uDFD7\uFE0F",
    },
    {
      title: "命令系统",
      href: "/commands",
      description: "CLI 命令详解",
      icon: "\u2328\uFE0F",
    },
    {
      title: "插件系统",
      href: "/plugins",
      description: "MCP 与扩展",
      icon: "\uD83D\uDD0C",
    },
    {
      title: "多智能体",
      href: "/coordinator",
      description: "Agent 工具详解",
      icon: "\uD83D\uDD78\uFE0F",
    },
  ];

  const toolCategories = [
    {
      category: "文件操作",
      color: "var(--accent-cyan)",
      tools: [
        {
          name: "FileReadTool",
          desc: "读取文件内容，支持行号范围和 PDF 页码",
          readOnly: true,
          concurrent: true,
        },
        {
          name: "FileWriteTool",
          desc: "创建或完全覆盖文件",
          readOnly: false,
          concurrent: false,
        },
        {
          name: "FileEditTool",
          desc: "精确字符串替换编辑文件",
          readOnly: false,
          concurrent: false,
        },
        {
          name: "GlobTool",
          desc: "基于 glob 模式搜索文件路径",
          readOnly: true,
          concurrent: true,
        },
        {
          name: "NotebookEditTool",
          desc: "编辑 Jupyter Notebook 单元格",
          readOnly: false,
          concurrent: false,
        },
      ],
    },
    {
      category: "系统交互",
      color: "var(--accent-blue)",
      tools: [
        {
          name: "BashTool",
          desc: "执行 shell 命令并捕获输出",
          readOnly: false,
          concurrent: false,
        },
        {
          name: "LSPTool",
          desc: "与语言服务协议交互，获取类型信息",
          readOnly: true,
          concurrent: true,
        },
      ],
    },
    {
      category: "搜索",
      color: "var(--accent-purple)",
      tools: [
        {
          name: "GrepTool",
          desc: "基于正则表达式搜索文件内容",
          readOnly: true,
          concurrent: true,
        },
        {
          name: "WebSearchTool",
          desc: "搜索互联网获取最新信息",
          readOnly: true,
          concurrent: true,
        },
        {
          name: "WebFetchTool",
          desc: "抓取并解析网页内容",
          readOnly: true,
          concurrent: true,
        },
      ],
    },
    {
      category: "智能体管理",
      color: "var(--accent-cyan)",
      tools: [
        {
          name: "AgentTool",
          desc: "生成子代理执行子任务",
          readOnly: false,
          concurrent: false,
        },
        {
          name: "SendMessageTool",
          desc: "代理间消息传递与通信",
          readOnly: false,
          concurrent: false,
        },
      ],
    },
    {
      category: "任务管理",
      color: "var(--accent-blue)",
      tools: [
        {
          name: "TaskCreateTool",
          desc: "创建新任务到任务列表",
          readOnly: false,
          concurrent: false,
        },
        {
          name: "TaskUpdateTool",
          desc: "更新任务状态和属性",
          readOnly: false,
          concurrent: false,
        },
        {
          name: "TaskListTool",
          desc: "列出所有任务概览",
          readOnly: true,
          concurrent: true,
        },
        {
          name: "TaskGetTool",
          desc: "获取单个任务完整详情",
          readOnly: true,
          concurrent: true,
        },
        {
          name: "TaskStopTool",
          desc: "停止正在执行的任务",
          readOnly: false,
          concurrent: false,
        },
      ],
    },
    {
      category: "团队协调",
      color: "var(--accent-purple)",
      tools: [
        {
          name: "TeamCreateTool",
          desc: "创建团队并初始化任务列表",
          readOnly: false,
          concurrent: false,
        },
        {
          name: "TeamDeleteTool",
          desc: "删除团队并清理资源",
          readOnly: false,
          concurrent: false,
        },
      ],
    },
    {
      category: "计划模式",
      color: "var(--accent-cyan)",
      tools: [
        {
          name: "EnterPlanModeTool",
          desc: "进入计划模式，仅做分析不修改文件",
          readOnly: true,
          concurrent: true,
        },
        {
          name: "ExitPlanModeTool",
          desc: "退出计划模式，开始执行",
          readOnly: false,
          concurrent: false,
        },
      ],
    },
    {
      category: "调度",
      color: "var(--accent-blue)",
      tools: [
        {
          name: "CronCreateTool",
          desc: "创建定时任务（一次性或循环）",
          readOnly: false,
          concurrent: false,
        },
        {
          name: "CronDeleteTool",
          desc: "取消已创建的定时任务",
          readOnly: false,
          concurrent: false,
        },
        {
          name: "CronListTool",
          desc: "列出所有已创建的定时任务",
          readOnly: true,
          concurrent: true,
        },
      ],
    },
    {
      category: "配置",
      color: "var(--accent-purple)",
      tools: [
        {
          name: "ConfigTool",
          desc: "读取和修改应用配置项",
          readOnly: false,
          concurrent: false,
        },
      ],
    },
  ];

  return (
    <ModuleLayout
      title="工具系统"
      subtitle="Claude Code 40+ 内置工具的深度剖析 —— 接口设计、注册机制、执行流程与并发控制"
      icon="\uD83D\uDD27"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: 工具系统概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="工具系统概述"
            subtitle="AI 与真实环境交互的桥梁"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的核心是工具系统。它提供了{" "}
              <strong className="text-[var(--text-primary)]">
                40+ 内置工具
              </strong>{" "}
              ，让 AI 能够与真实环境进行交互——读写文件、执行命令、搜索代码、访问网络、管理任务。
              每一个工具都实现了统一的接口契约，确保无论是内置工具还是外部 MCP 工具，都能以相同的方式被注册、发现和调用。
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
              // Row 1
              { id: "bash", label: "BashTool", x: 40, y: 20, color: "var(--accent-cyan)" },
              { id: "fileread", label: "FileReadTool", x: 200, y: 20, color: "var(--accent-cyan)" },
              { id: "fileedit", label: "FileEditTool", x: 360, y: 20, color: "var(--accent-cyan)" },
              { id: "filewrite", label: "FileWriteTool", x: 520, y: 20, color: "var(--accent-cyan)" },
              // Row 2
              { id: "glob", label: "GlobTool", x: 40, y: 230, color: "var(--accent-blue)" },
              { id: "grep", label: "GrepTool", x: 200, y: 230, color: "var(--accent-blue)" },
              { id: "websearch", label: "WebSearchTool", x: 360, y: 230, color: "var(--accent-blue)" },
              { id: "webfetch", label: "WebFetchTool", x: 520, y: 230, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "registry", to: "bash", label: "" },
              { from: "registry", to: "fileread", label: "" },
              { from: "registry", to: "fileedit", label: "" },
              { from: "registry", to: "filewrite", label: "" },
              { from: "registry", to: "glob", label: "" },
              { from: "registry", to: "grep", label: "" },
              { from: "registry", to: "websearch", label: "" },
              { from: "registry", to: "webfetch", label: "" },
            ]}
            width={700}
            height={290}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: Tool 接口定义 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Tool 接口定义"
            subtitle="所有工具的统一契约"
          />

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

          <CodeBlock
            code={`// 基础工具接口 —— 所有工具的统一契约
export type Tool<Input, Output, P> = {
  name: string;                    // 工具名称（全局唯一标识符）
  description: (input) => string;  // 动态描述，根据输入生成
  inputSchema: Input;              // Zod 输入 Schema（参数校验）
  call: (args, context) => Result; // 核心执行函数
  isReadOnly: (input) => boolean;  // 是否只读（影响并发策略）
  isConcurrencySafe: (input) => boolean; // 是否并发安全
  checkPermissions: (input, ctx) => Result; // 权限检查
  isEnabled: () => boolean;        // 当前环境是否启用
};`}
            language="typescript"
            filename="tools/types.ts"
            highlights={[3, 4, 5, 6, 7, 8, 9, 10]}
          />

          <div className="mt-8 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">
              字段详解
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                {
                  field: "name",
                  desc: "工具的全局唯一标识符，Claude 通过名称匹配调用对应的工具",
                },
                {
                  field: "description",
                  desc: "动态描述函数，根据输入参数生成上下文相关的描述，帮助 Claude 理解工具能力",
                },
                {
                  field: "inputSchema",
                  desc: "基于 Zod 的输入 Schema，定义参数类型和约束，在执行前自动校验输入合法性",
                },
                {
                  field: "call",
                  desc: "核心执行函数，接收校验后的参数和运行时上下文，返回工具执行结果",
                },
                {
                  field: "isReadOnly",
                  desc: "声明工具是否为只读操作。只读工具可并发执行，写操作工具必须串行执行",
                },
                {
                  field: "isConcurrencySafe",
                  desc: "声明工具是否并发安全。影响工具在 agentic 循环中的调度策略",
                },
                {
                  field: "checkPermissions",
                  desc: "权限检查函数，在执行前验证用户是否有权调用此工具并传入给定参数",
                },
                {
                  field: "isEnabled",
                  desc: "检查当前环境是否启用此工具。受 feature flag、配置和运行模式影响",
                },
              ].map((item) => (
                <div
                  key={item.field}
                  className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
                >
                  <code className="text-sm font-mono text-[var(--accent-cyan)] mb-2 block">
                    {item.field}
                  </code>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: 工具注册机制 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="工具注册机制"
            subtitle="从声明到可用的完整链路"
          />

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
              这种分层设计让权限控制与工具定义解耦，保持代码的清晰和可维护性。
            </p>
          </div>

          <CodeBlock
            code={`// 第一阶段：组装所有内置工具
export function getAllBaseTools(): Tools {
  return [
    // 智能体管理
    AgentTool,
    // 系统交互
    BashTool,
    // 文件搜索
    GlobTool, GrepTool,
    // 文件操作
    FileReadTool, FileEditTool, FileWriteTool,
    // Notebook 编辑
    NotebookEditTool,
    // 网络搜索
    WebFetchTool, WebSearchTool,
    // 任务管理
    TaskCreateTool, TaskUpdateTool, TaskListTool,
    TaskGetTool,
    // 团队协调
    TeamCreateTool, TeamDeleteTool,
    // 计划模式
    EnterPlanModeTool, ExitPlanModeTool,
    // 调度
    CronCreateTool, CronDeleteTool, CronListTool,
    // MCP 扩展
    MCPTool,
    // ...更多工具
  ];
}

// 第二阶段：根据上下文过滤可用工具
export function getTools(context: ToolContext): Tools {
  const allTools = getAllBaseTools();
  return allTools.filter(tool => {
    // 检查 feature flag
    if (!tool.isEnabled()) return false;
    // 检查权限模式是否允许
    if (!isAllowedByPermissionMode(tool, context)) return false;
    return true;
  });
}`}
            language="typescript"
            filename="tools/registry.ts"
            highlights={[3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34]}
          />

          <div className="mt-8 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              这种注册机制的关键设计理念是：
            </p>
            <div className="space-y-3">
              {[
                {
                  phase: "统一入口",
                  desc: "所有工具通过同一个函数注册，MCP 外部工具在注册后享有与内置工具完全相同的调用接口",
                },
                {
                  phase: "动态过滤",
                  desc: "根据运行环境、用户配置和权限模式动态决定哪些工具可用，确保不同场景下只暴露必要的工具",
                },
                {
                  phase: "延迟绑定",
                  desc: "工具的具体实现在调用时才绑定执行上下文，允许同一个工具定义在不同会话中复用",
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

      {/* Section 4: 核心工具详解 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="核心工具详解"
            subtitle="按类别一览所有内置工具"
          />

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
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: cat.color }}
                  />
                  <h4 className="text-lg font-semibold text-[var(--text-primary)]">
                    {cat.category}
                  </h4>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    {cat.tools.length} tools
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {cat.tools.map((tool) => (
                    <div
                      key={tool.name}
                      className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-[var(--accent-cyan)]">
                          {tool.name}
                        </code>
                        <div className="flex gap-1.5">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono ${
                              tool.readOnly
                                ? "bg-green-500/10 text-green-400"
                                : "bg-orange-500/10 text-orange-400"
                            }`}
                          >
                            {tool.readOnly ? "READ" : "WRITE"}
                          </span>
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-mono ${
                              tool.concurrent
                                ? "bg-blue-500/10 text-blue-400"
                                : "bg-purple-500/10 text-purple-400"
                            }`}
                          >
                            {tool.concurrent ? "CONCURRENT" : "SERIAL"}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                        {tool.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 工具执行流程 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="工具执行流程"
            subtitle="从 Claude 决策到工具执行的完整管道"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              当 Claude 在 agentic 循环中决定调用一个工具时，请求会经历查找、验证、权限检查、
              执行四个核心阶段。每个阶段都有明确的职责和错误处理策略，确保工具调用安全可靠。
            </p>
          </div>

          <CodeFlow
            title="工具调用执行流程"
            steps={[
              {
                code: `// Step 1: Claude 返回工具调用
const toolUse = response.toolCalls[0];
// { name: 'FileReadTool', input: { path: '/src/app.ts' } }`,
                highlight: [1, 2],
                description:
                  "Claude API 响应中包含工具调用请求，指定工具名称和输入参数。Claude 根据对话上下文自主决定是否需要调用工具以及调用哪个工具。",
              },
              {
                code: `// Step 2: 查找并验证工具
const tool = tools.find(t => t.name === toolUse.name);
const validation = await tool.validateInput(toolUse.input);`,
                highlight: [1, 2],
                description:
                  "从工具注册表中查找目标工具。找到后使用 Zod Schema 验证输入参数的合法性，包括类型检查、必填字段校验和值约束验证。",
              },
              {
                code: `// Step 3: 权限检查
const permission = await tool.checkPermissions(toolUse.input, context);
if (permission.behavior !== 'allow') {
  // 请求用户授权（弹窗确认）
  const consent = await requestUserConsent(toolUse);
  if (!consent.approved) return;
}`,
                highlight: [1, 2, 3, 4, 5],
                description:
                  "检查工具权限：先检查 deny 规则（黑名单），再检查 allow 规则（白名单），最后根据权限模式决定是否弹出用户授权对话框。用户可以选择一次性批准或本次会话始终允许。",
              },
              {
                code: `// Step 4: 执行工具
const result = await tool.call(toolUse.input, context);
// result: { content: '文件内容...', isError: false }`,
                highlight: [1, 2],
                description:
                  "工具执行核心逻辑，返回结果。只读工具可并发执行以提升效率，写操作串行执行以保证数据一致性。执行结果将作为 tool_result 消息反馈给 Claude 继续推理。",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Section 6: 并发控制 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="并发控制"
            subtitle="只读并发、写入串行的智能调度"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的工具调度器根据每个工具声明的{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                isConcurrencySafe
              </code>{" "}
              属性进行智能调度。只读工具（如文件读取、搜索）可以并发执行以最大化吞吐量，
              写操作工具（如文件编辑、命令执行）则必须串行执行以保证数据一致性。
            </p>
            <p>
              当 Claude 在一次响应中请求调用多个工具时，调度器会自动将它们分组：
              所有并发安全的工具作为一批同时执行，非并发安全的工具按顺序逐一执行。
            </p>
          </div>

          <CodeBlock
            code={`// 只读工具并发执行，写操作工具串行执行
export async function* runTools(toolCalls) {
  for (const { isConcurrencySafe, blocks } of partitionToolCalls(toolCalls)) {
    if (isConcurrencySafe) {
      yield* runToolsConcurrently(blocks);  // 并发批处理
    } else {
      yield* runToolsSerially(blocks);       // 串行执行
    }
  }
}

// 工具分组策略
function partitionToolCalls(toolCalls) {
  const concurrent = [];
  const serial = [];

  for (const call of toolCalls) {
    const tool = registry.get(call.name);
    if (tool.isConcurrencySafe(call.input)) {
      concurrent.push(call);
    } else {
      serial.push(call);
    }
  }

  return [
    { isConcurrencySafe: true, blocks: concurrent },
    { isConcurrencySafe: false, blocks: serial },
  ];
}`}
            language="typescript"
            filename="tools/executor.ts"
            highlights={[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "并发执行",
                desc: "READ-ONLY 工具",
                tools: "FileReadTool, GlobTool, GrepTool, WebSearchTool, WebFetchTool, TaskListTool",
                detail:
                  "多个只读工具调用可以同时发起，充分利用 I/O 等待时间。例如 Claude 可以同时读取多个文件、搜索多个模式，大幅减少整体响应时间。",
                color: "var(--accent-cyan)",
              },
              {
                title: "串行执行",
                desc: "WRITE 工具",
                tools: "FileWriteTool, FileEditTool, BashTool, AgentTool, TaskCreateTool",
                detail:
                  "写操作工具必须按顺序逐一执行，避免竞态条件和数据冲突。每个写操作完成后，后续操作可以看到前序操作的结果。",
                color: "var(--accent-purple)",
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
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    {item.desc}
                  </span>
                </div>
                <p className="text-sm text-[var(--accent-cyan)] font-mono mb-3">
                  {item.tools}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7: 权限系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="权限系统"
            subtitle="四层防护的安全模型"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              工具系统的安全性由四层权限检查机制保障。每一层都有不同的职责和粒度，
              从全局的功能开关到细粒度的用户确认，构建了纵深防御的安全体系。
              这确保了在各种使用场景下——从个人开发到企业 CI/CD——都能提供适当的安全级别。
            </p>
          </div>

          <CodeBlock
            code={`// 四层权限检查流程
async function checkToolPermission(tool, input, context) {
  // Layer 1: Feature Flag —— 全局功能开关
  if (!tool.isEnabled()) {
    return { behavior: 'deny', reason: 'Tool disabled by feature flag' };
  }

  // Layer 2: Permission Mode —— 权限模式检查
  // auto: 自动批准安全操作
  // manual: 所有敏感操作需确认
  // bypass: CI/CD 环境，受环境变量控制
  const mode = context.permissionMode;

  // Layer 3: Tool-Specific Rules —— 工具级规则
  // 检查 deny/allow 规则列表
  const denyRule = matchDenyRules(tool.name, input);
  if (denyRule) {
    return { behavior: 'deny', reason: denyRule };
  }
  const allowRule = matchAllowRules(tool.name, input);
  if (allowRule) {
    return { behavior: 'allow' };
  }

  // Layer 4: User Consent —— 用户确认（manual 模式）
  if (mode === 'manual') {
    const consent = await showConsentDialog({
      tool: tool.name,
      input,
      risk: assessRisk(tool, input),
    });
    return consent.approved
      ? { behavior: 'allow', sessionWide: consent.sessionWide }
      : { behavior: 'deny', reason: 'User rejected' };
  }

  return { behavior: 'allow' };
}`}
            language="typescript"
            filename="tools/permissions.ts"
            highlights={[3, 4, 7, 8, 9, 10, 11, 14, 15, 16, 19, 20, 23, 24, 25, 26, 27, 28, 29, 30]}
          />

          <div className="mt-8 space-y-4">
            {[
              {
                layer: "Feature Flags",
                desc: "功能开关层",
                detail:
                  "通过 feature flag 系统控制工具的全局启用状态。新工具首先通过 flag 控制，经过充分测试后才默认启用。适用于灰度发布和 A/B 测试场景。",
                color: "var(--accent-cyan)",
              },
              {
                layer: "Permission Modes",
                desc: "权限模式层",
                detail:
                  "三种权限模式满足不同安全需求：auto 模式自动批准安全操作；manual 模式对所有敏感操作弹出确认；bypass 模式用于 CI/CD 等自动化场景。",
                color: "var(--accent-blue)",
              },
              {
                layer: "Tool-Specific Rules",
                desc: "工具级规则层",
                detail:
                  "基于 deny/allow 规则列表进行细粒度控制。例如可以配置允许读取特定目录的文件，或拒绝执行包含危险关键词的命令。规则支持通配符匹配。",
                color: "var(--accent-purple)",
              },
              {
                layer: "User Consent",
                desc: "用户确认层",
                detail:
                  "在 manual 模式下，敏感操作弹出交互式确认对话框。用户可一次性批准，也可选择\"本次会话始终允许\"。在安全性和便利性之间取得平衡。",
                color: "var(--accent-cyan)",
              },
            ].map((item, i) => (
              <div
                key={item.layer}
                className="flex gap-4 p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: `${item.color}20`,
                    color: item.color,
                  }}
                >
                  {i + 1}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base font-semibold text-[var(--text-primary)]">
                      {item.layer}
                    </span>
                    <span className="text-sm text-[var(--accent-cyan)] font-mono">
                      {item.desc}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
