import { ModuleLayout } from "@/components/ModuleLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function PluginsPage() {
  const relatedModules = [
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
      title: "系统架构",
      href: "/architecture",
      description: "整体架构",
      icon: "\uD83C\uDFD7\uFE0F",
    },
  ];

  return (
    <ModuleLayout
      title="插件与扩展"
      subtitle="Claude Code 的三大扩展机制 —— Plugins、Skills、MCP，打造无限可能的 AI 编程生态"
      icon="\uD83D\uDD0C"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: 扩展系统概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="扩展系统概述"
            subtitle="三大机制构建可扩展的 AI 编程平台"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的扩展性建立在三大核心机制之上：
              <strong className="text-[var(--text-primary)]">Plugins</strong>（插件系统）提供结构化的扩展能力，
              <strong className="text-[var(--text-primary)]">Skills</strong>（技能系统）支持可复用的提示词模板，
              <strong className="text-[var(--text-primary)]">MCP</strong>（Model Context Protocol）实现标准化的外部工具连接。
              三者协同工作，让 Claude Code 从一个封闭的 AI 工具变成一个开放的编程平台。
            </p>
            <p>
              这三种机制各司其职：插件系统负责注册新的工具和命令，技能系统让用户共享最佳实践，
              MCP 协议则打通了 AI 与外部世界的数据通道。通过组合使用这些机制，
              开发者可以打造完全定制化的 AI 编程体验。
            </p>
          </div>

          <ArchitectureDiagram
            title="扩展系统架构"
            nodes={[
              { id: "plugins", label: "Plugins", x: 30, y: 30, color: "var(--accent-purple)" },
              { id: "skills", label: "Skills", x: 310, y: 30, color: "var(--accent-blue)" },
              { id: "plugin-registry", label: "Plugin Registry", x: 30, y: 120, color: "var(--accent-purple)" },
              { id: "skill-registry", label: "Skill Registry", x: 310, y: 120, color: "var(--accent-blue)" },
              { id: "hooks", label: "Hooks System", x: 30, y: 210, color: "var(--accent-cyan)" },
              { id: "exec-engine", label: "Execution Engine", x: 310, y: 210, color: "var(--accent-blue)" },
              { id: "mcp", label: "MCP Protocol", x: 550, y: 120, color: "var(--accent-cyan)" },
              { id: "mcp-registry", label: "MCP Server Registry", x: 550, y: 210, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "plugins", to: "plugin-registry" },
              { from: "skills", to: "skill-registry" },
              { from: "plugin-registry", to: "hooks" },
              { from: "skill-registry", to: "exec-engine" },
              { from: "exec-engine", to: "mcp" },
              { from: "mcp", to: "mcp-registry" },
            ]}
            width={750}
            height={290}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: 插件系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="插件系统"
            subtitle="结构化的扩展能力与沙箱执行"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              插件是 Claude Code 最强大的扩展机制。每个插件都可以注册自定义工具、命令、钩子和技能，
              拥有完整的生命周期管理。插件在沙箱环境中执行，配合细粒度的权限控制，
              确保扩展代码不会影响系统的稳定性和安全性。
            </p>
          </div>

          <div className="mt-8 space-y-4">
            {[
              {
                phase: "load",
                desc: "加载阶段",
                detail: "从文件系统或注册表加载插件代码，解析元数据和依赖声明",
              },
              {
                phase: "initialize",
                desc: "初始化阶段",
                detail: "执行插件的初始化逻辑，注册工具、命令、钩子等扩展点，建立运行时上下文",
              },
              {
                phase: "execute",
                desc: "执行阶段",
                detail: "在沙箱环境中运行插件注册的工具和命令，受权限系统约束，支持并发安全调度",
              },
              {
                phase: "cleanup",
                desc: "清理阶段",
                detail: "卸载插件时执行清理逻辑，释放资源、移除注册的扩展点、恢复系统状态",
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
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-[var(--accent-cyan)]">
                      {item.phase}
                    </code>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.desc}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <CodeBlock
            code={`// 插件接口定义
interface Plugin {
  name: string;
  version: string;
  description?: string;

  // 生命周期钩子
  onLoad?(): Promise<void>;
  onInit?(): Promise<void>;
  onCleanup?(): Promise<void>;

  // 扩展点注册
  tools?: Tool[];           // 注册自定义工具
  commands?: Command[];     // 注册自定义命令
  hooks?: Hook[];           // 注册钩子
  skills?: Skill[];         // 注册技能
}`}
            language="typescript"
            filename="plugins/types.ts"
            highlights={[1, 2, 3, 4, 7, 8, 9, 12, 13, 14, 15]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "沙箱执行",
                desc: "插件代码在受限的沙箱环境中运行，隔离文件系统和网络访问，防止恶意操作",
                color: "var(--accent-cyan)",
              },
              {
                title: "权限控制",
                desc: "每个插件操作都经过权限检查，用户可以细粒度控制插件的能力范围",
                color: "var(--accent-purple)",
              },
              {
                title: "内置插件",
                desc: "Claude Code 捆绑了多个官方插件，开箱即用，涵盖常见开发场景",
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

      {/* Section 3: 技能系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="技能系统"
            subtitle="可复用的提示词模板与工作流"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              技能（Skills）是 Markdown 格式的提示词模板，包含元数据头部和提示词正文。
              用户可以通过斜杠命令（如 <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">/commit</code>）快速触发技能执行。
              技能系统支持变量替换和模板语法，让提示词可以根据上下文动态调整。
            </p>
            <p>
              技能的核心价值在于将最佳实践封装为可复用的单元。开发者可以创建自己的技能，
              也可以与团队和社区共享。一个精心设计的技能可以将复杂的操作流程简化为一条命令。
            </p>
          </div>

          <CodeBlock
            code={`---
name: commit
description: Create a git commit with AI assistance
trigger: when user types /commit
---

You are helping the user create a git commit.

Follow these steps:
1. Run \`git status\` to see all changed files
2. Run \`git diff --staged\` to see staged changes
3. Analyze the changes and generate a concise commit message
4. Present the message to the user for confirmation
5. Execute the commit upon approval

Guidelines:
- Use conventional commit format (feat/fix/docs/refactor)
- Keep the subject line under 72 characters
- Include a body for complex changes`}
            language="yaml"
            filename="skills/commit.md"
            highlights={[1, 2, 3, 4, 6, 7, 9, 10, 11, 12, 13, 14]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Markdown 格式",
                desc: "技能使用 Markdown 编写，元数据通过 YAML front matter 定义。开发者无需学习新语法，上手成本极低。提示词正文支持所有 Markdown 格式，包括代码块、列表和标题。",
                color: "var(--accent-cyan)",
              },
              {
                title: "变量替换",
                desc: "技能模板支持变量占位符，在执行时动态替换为实际值。例如 $FILE_PATH、$SELECTION 等内置变量，让同一个技能可以在不同上下文中复用。",
                color: "var(--accent-purple)",
              },
              {
                title: "用户创建与共享",
                desc: "任何用户都可以创建自定义技能，放入 .claude/skills/ 目录即可生效。技能可以通过 Git 仓库分享，团队可以维护共享的技能库以确保一致性。",
                color: "var(--accent-blue)",
              },
              {
                title: "斜杠命令触发",
                desc: "技能通过斜杠命令触发，Claude 会自动匹配技能名称并执行对应的提示词。用户也可以通过 Tab 键自动补全可用的技能列表。",
                color: "var(--accent-cyan)",
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

      {/* Section 4: MCP (Model Context Protocol) */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="MCP 协议"
            subtitle="Model Context Protocol —— 连接 AI 与外部世界的标准化协议"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <strong className="text-[var(--text-primary)]">MCP（Model Context Protocol）</strong>
              是 Claude Code 连接外部工具和数据源的标准化协议。
              它定义了一套统一的通信规范，让 Claude 能够通过一致的接口访问数据库、API、文件系统等外部资源，
              而无需为每种外部服务编写专门的集成代码。
            </p>
            <p>
              MCP 的核心思想是将 AI 与外部世界的连接标准化。任何实现了 MCP 协议的服务端都可以被
              Claude Code 直接发现和使用，就像 USB 协议让任何设备都能连接到计算机一样。
              这极大地降低了扩展 Claude Code 能力边界的技术门槛。
            </p>
          </div>

          <ArchitectureDiagram
            title="MCP 通信架构"
            nodes={[
              { id: "claude", label: "Claude Code", x: 30, y: 100, color: "var(--accent-purple)" },
              { id: "mcp-client", label: "MCP Client", x: 250, y: 100, color: "var(--accent-blue)" },
              { id: "mcp-server", label: "MCP Server", x: 470, y: 100, color: "var(--accent-cyan)" },
              { id: "api", label: "External APIs", x: 470, y: 200, color: "var(--accent-cyan)" },
              { id: "db", label: "Databases", x: 620, y: 140, color: "var(--accent-cyan)" },
              { id: "files", label: "File Systems", x: 620, y: 200, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "claude", to: "mcp-client" },
              { from: "mcp-client", to: "mcp-server", label: "stdio/SSE" },
              { from: "mcp-server", to: "api" },
              { from: "mcp-server", to: "db" },
              { from: "mcp-server", to: "files" },
            ]}
            width={800}
            height={260}
          />

          <div className="mt-8 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">
              MCP 配置与服务器管理
            </h4>
            <p>
              MCP 服务器通过配置文件声明式注册。每个服务器指定启动命令、参数和环境变量，
              Claude Code 会在需要时动态加载并管理这些服务器的生命周期。
              新增的 MCP 服务器需要经过用户审批才能启用，确保安全性。
            </p>
          </div>

          <CodeBlock
            code={`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/dir"],
      "env": {}
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "\${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"],
      "env": {}
    }
  }
}`}
            language="json"
            filename=".claude/settings.json"
            highlights={[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15, 16, 17]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "动态加载",
                desc: "MCP 服务器按需启动，不需要时自动关闭。Claude Code 负责管理服务器的完整生命周期，包括启动、健康检查、重连和关闭。",
                color: "var(--accent-cyan)",
              },
              {
                title: "审批流程",
                desc: "新增的 MCP 服务器需要用户明确批准才能启用。审批信息包括服务器的来源、请求的权限和提供的工具列表，确保用户知情并同意。",
                color: "var(--accent-purple)",
              },
              {
                title: "OAuth 与 API Key",
                desc: "MCP 支持 OAuth 2.0 和 API Key 两种认证方式。敏感凭据通过环境变量注入，不会出现在对话历史中，保障安全性。",
                color: "var(--accent-blue)",
              },
              {
                title: "官方注册表",
                desc: "Anthropic 维护了官方 MCP 服务器注册表，用户可以一键发现和安装经过验证的 MCP 服务器，无需手动编写配置。",
                color: "var(--accent-cyan)",
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

          <div className="mt-8 space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">
              MCP Resources 与 MCP Tools
            </h4>
            <p>
              MCP 定义了两种核心能力：<strong className="text-[var(--text-primary)]">Resources</strong>（资源）
              和 <strong className="text-[var(--text-primary)]">Tools</strong>（工具）。
              Resources 让 Claude 能够读取外部数据源的内容（如数据库记录、API 响应），
              Tools 则让 Claude 能够调用外部函数执行操作（如写入数据库、发送通知）。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "MCP Resources",
                desc: "只读的数据访问接口。Claude 可以通过 Resources 读取外部系统的数据，如数据库表结构、API 文档、文件内容等。Resources 的内容会作为上下文注入到对话中。",
                examples: "数据库 Schema、API 响应、配置文件、日志文件",
                color: "var(--accent-cyan)",
              },
              {
                title: "MCP Tools",
                desc: "可执行的函数调用接口。Claude 可以通过 Tools 调用外部系统的功能，如创建 GitHub Issue、发送 Slack 消息、执行 SQL 查询等。每个 Tool 都有明确的输入 Schema。",
                examples: "创建 Issue、发送消息、执行查询、触发部署",
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
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  {item.desc}
                </p>
                <div className="text-xs text-[var(--accent-cyan)] font-mono">
                  示例: {item.examples}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 钩子系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="钩子系统"
            subtitle="工具调用的前置/后置拦截器"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              钩子（Hooks）是 Claude Code 的拦截器机制，允许在工具调用前后执行自定义逻辑。
              每个钩子可以匹配特定的工具，在工具执行前进行安全检查或参数验证（PreToolUse），
              在工具执行后进行格式化或触发后续操作（PostToolUse）。
              钩子通过外部命令实现，与 Claude Code 的核心逻辑完全解耦。
            </p>
          </div>

          <CodeBlock
            code={`{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "BashTool",
        "command": "security-check $TOOL_INPUT"
      },
      {
        "matcher": "FileWriteTool",
        "command": "validate-path $FILE_PATH"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "FileWriteTool",
        "command": "eslint --fix $FILE_PATH"
      },
      {
        "matcher": "FileEditTool",
        "command": "prettier --write $FILE_PATH"
      }
    ]
  }
}`}
            language="json"
            filename=".claude/settings.json"
            highlights={[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18]}
          />

          <CodeFlow
            title="钩子执行流程"
            steps={[
              {
                code: `// Step 1: 匹配钩子
const hooks = getHooksForEvent('PreToolUse', toolName);
// hooks: [{ matcher: 'BashTool', command: 'security-check' }]`,
                highlight: [1, 2],
                description:
                  "当工具即将执行时，系统根据事件类型（PreToolUse/PostToolUse）和工具名称匹配所有已注册的钩子。支持通配符匹配，例如 * 可以匹配所有工具。",
              },
              {
                code: `// Step 2: 执行钩子命令
const result = await executeHook(hook, {
  TOOL_INPUT: JSON.stringify(toolInput),
  FILE_PATH: toolInput.file_path,
});
// result: { exitCode: 0, stdout: 'OK' }`,
                highlight: [1, 2, 3, 4, 5],
                description:
                  "钩子命令在独立的子进程中执行，通过环境变量注入工具参数。命令的标准输出和退出码决定钩子的执行结果。退出码 0 表示通过，非 0 表示拒绝。",
              },
              {
                code: `// Step 3: 处理钩子结果
if (result.exitCode !== 0) {
  // PreToolUse: 阻止工具执行
  return {
    behavior: 'deny',
    reason: result.stderr || 'Blocked by hook'
  };
}
// 继续执行工具`,
                highlight: [1, 2, 3, 4, 5, 7, 8],
                description:
                  "对于 PreToolUse 钩子，非零退出码会阻止工具执行，stderr 内容作为拒绝原因反馈给 Claude。对于 PostToolUse 钩子，执行失败会记录警告但不影响已完成操作。",
              },
              {
                code: `// Step 4: 错误处理与超时
try {
  await executeWithTimeout(hook, 30000);
} catch (error) {
  if (error instanceof TimeoutError) {
    logger.warn(\`Hook \${hook.command} timed out\`);
    // 根据配置决定是否继续执行
  }
}`,
                highlight: [1, 2, 3, 4, 5, 6],
                description:
                  "每个钩子命令都有超时保护（默认 30 秒），防止外部命令挂起导致系统阻塞。钩子执行异常时系统会记录日志，根据配置的策略决定是继续执行还是中止操作。",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Section 6: 创建自定义扩展 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="创建自定义扩展"
            subtitle="从零开始构建你的第一个插件"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              创建一个 Claude Code 插件只需要实现 Plugin 接口并导出。
              以下是一个最小化插件示例，它注册了一个自定义工具，
              演示了从定义到注册的完整流程。
            </p>
          </div>

          <CodeBlock
            code={`// my-plugin/index.ts
import { z } from 'zod';

export default {
  name: 'my-plugin',
  version: '1.0.0',
  description: 'A minimal example plugin',

  // 生命周期
  async onLoad() {
    console.log('Plugin loaded');
  },

  async onInit() {
    console.log('Plugin initialized');
  },

  async onCleanup() {
    console.log('Plugin cleaned up');
  },

  // 注册自定义工具
  tools: [{
    name: 'my_tool',
    description: 'My custom tool that processes input text',
    inputSchema: z.object({
      input: z.string().describe('Text to process'),
      uppercase: z.boolean().optional().default(false),
    }),
    call: async ({ input, uppercase }) => {
      const result = uppercase ? input.toUpperCase() : input;
      return {
        content: \`Processed: \${result}\`,
      };
    },
  }],

  // 注册自定义命令
  commands: [{
    name: 'my-command',
    description: 'Run my custom command',
    handler: async (args) => {
      console.log('Command executed with args:', args);
    },
  }],
};`}
            language="typescript"
            filename="my-plugin/index.ts"
            highlights={[1, 2, 4, 5, 6, 8, 9, 12, 13, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]}
          />

          <div className="mt-8 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">
              开发步骤
            </h4>
            <div className="space-y-3">
              {[
                {
                  step: "1",
                  title: "创建项目结构",
                  desc: "在 .claude/plugins/ 目录下创建插件文件夹，包含 index.ts 入口文件和 package.json 配置",
                },
                {
                  step: "2",
                  title: "实现 Plugin 接口",
                  desc: "导出一个满足 Plugin 接口的对象，声明插件名称、版本，并实现需要的生命周期方法和扩展点",
                },
                {
                  step: "3",
                  title: "注册工具与命令",
                  desc: "在 tools 和 commands 数组中定义插件提供的工具和命令，每个工具需要提供 Zod 输入 Schema 和执行函数",
                },
                {
                  step: "4",
                  title: "配置与测试",
                  desc: "在 settings.json 中注册插件路径，重启 Claude Code 加载插件，通过调用工具验证功能是否正常",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex gap-4 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-[var(--accent-cyan)]">
                      {item.title}
                    </span>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <CodeBlock
            code={`{
  "plugins": {
    "my-plugin": {
      "path": "./plugins/my-plugin",
      "enabled": true,
      "permissions": {
        "allowTools": ["my_tool"],
        "allowCommands": ["my-command"]
      }
    }
  }
}`}
            language="json"
            filename=".claude/settings.json"
            highlights={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
          />
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
