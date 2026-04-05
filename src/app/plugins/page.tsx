import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeBlock } from "@/components/CodeBlock";
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
      title: "权限系统",
      href: "/permissions",
      description: "权限控制",
      icon: "\uD83D\uDD12",
    },
    {
      title: "状态系统",
      href: "/state",
      description: "全局状态",
      icon: "\uD83D\uDCE6",
    },
    {
      title: "命令系统",
      href: "/commands",
      description: "命令执行",
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
      icon="🔌"
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

          {/* Plugin lifecycle and extension points diagram (replaces CodeBlock ~line 150) */}
          <ArchitectureDiagram
            title="Plugin 生命周期与扩展点"
            nodes={[
              { id: "metadata", label: "name / version", x: 30, y: 20, color: "var(--accent-purple)" },
              { id: "lifecycle", label: "Lifecycle Hooks", x: 220, y: 20, color: "var(--accent-blue)" },
              { id: "extensions", label: "Extension Points", x: 490, y: 20, color: "var(--accent-cyan)" },
              { id: "on-load", label: "onLoad()", x: 30, y: 110, color: "var(--accent-blue)" },
              { id: "on-init", label: "onInit()", x: 200, y: 110, color: "var(--accent-blue)" },
              { id: "on-cleanup", label: "onCleanup()", x: 370, y: 110, color: "var(--accent-blue)" },
              { id: "ext-tools", label: "tools[]", x: 540, y: 80, color: "var(--accent-cyan)" },
              { id: "ext-commands", label: "commands[]", x: 540, y: 140, color: "var(--accent-cyan)" },
              { id: "ext-hooks", label: "hooks[]", x: 30, y: 200, color: "var(--accent-purple)" },
              { id: "ext-skills", label: "skills[]", x: 200, y: 200, color: "var(--accent-purple)" },
              { id: "sandbox", label: "Sandbox", x: 400, y: 200, color: "var(--accent-blue)" },
              { id: "permissions", label: "Permissions", x: 560, y: 200, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "lifecycle", to: "on-load" },
              { from: "lifecycle", to: "on-init" },
              { from: "lifecycle", to: "on-cleanup" },
              { from: "extensions", to: "ext-tools" },
              { from: "extensions", to: "ext-commands" },
              { from: "on-init", to: "ext-tools", label: "register" },
              { from: "on-init", to: "ext-commands", label: "register" },
              { from: "ext-tools", to: "sandbox" },
              { from: "sandbox", to: "permissions" },
              { from: "extensions", to: "ext-hooks" },
              { from: "extensions", to: "ext-skills" },
            ]}
            width={750}
            height={270}
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

          {/* Skill structure diagram (replaces CodeBlock ~line 233) */}
          <ArchitectureDiagram
            title="Skill 结构：Frontmatter → Prompt → 变量替换"
            nodes={[
              { id: "skill-file", label: "skill.md", x: 30, y: 60, color: "var(--accent-blue)" },
              { id: "frontmatter", label: "YAML Frontmatter", x: 220, y: 20, color: "var(--accent-purple)" },
              { id: "fm-name", label: "name: commit", x: 420, y: 20, color: "var(--accent-purple)" },
              { id: "fm-trigger", label: "trigger: /commit", x: 590, y: 20, color: "var(--accent-purple)" },
              { id: "prompt-body", label: "Prompt Body", x: 220, y: 110, color: "var(--accent-cyan)" },
              { id: "step-1", label: "git status", x: 420, y: 80, color: "var(--accent-cyan)" },
              { id: "step-2", label: "git diff --staged", x: 590, y: 80, color: "var(--accent-cyan)" },
              { id: "step-3", label: "分析变更", x: 420, y: 150, color: "var(--accent-cyan)" },
              { id: "step-4", label: "生成 commit msg", x: 590, y: 150, color: "var(--accent-cyan)" },
              { id: "variables", label: "$FILE_PATH", x: 220, y: 200, color: "var(--accent-blue)" },
              { id: "var-sub", label: "Variable Substitution", x: 420, y: 200, color: "var(--accent-blue)" },
              { id: "execution", label: "Execution Engine", x: 590, y: 200, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "skill-file", to: "frontmatter" },
              { from: "skill-file", to: "prompt-body" },
              { from: "skill-file", to: "variables" },
              { from: "frontmatter", to: "fm-name" },
              { from: "frontmatter", to: "fm-trigger" },
              { from: "prompt-body", to: "step-1" },
              { from: "step-1", to: "step-2" },
              { from: "step-2", to: "step-3" },
              { from: "step-3", to: "step-4" },
              { from: "variables", to: "var-sub" },
              { from: "var-sub", to: "execution" },
              { from: "prompt-body", to: "execution" },
            ]}
            width={770}
            height={270}
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

          {/* MCP servers configuration diagram (replaces CodeBlock ~line 357) */}
          <ArchitectureDiagram
            title="MCP 服务器配置"
            nodes={[
              { id: "settings", label: "settings.json", x: 30, y: 80, color: "var(--accent-purple)" },
              { id: "mcp-servers", label: "mcpServers", x: 220, y: 80, color: "var(--accent-blue)" },
              { id: "fs-server", label: "filesystem", x: 420, y: 20, color: "var(--accent-cyan)" },
              { id: "gh-server", label: "github", x: 420, y: 80, color: "var(--accent-cyan)" },
              { id: "pg-server", label: "postgres", x: 420, y: 140, color: "var(--accent-cyan)" },
              { id: "fs-cmd", label: "npx server-filesystem", x: 600, y: 20, color: "var(--accent-cyan)" },
              { id: "gh-cmd", label: "npx server-github", x: 600, y: 80, color: "var(--accent-cyan)" },
              { id: "pg-cmd", label: "npx server-postgres", x: 600, y: 140, color: "var(--accent-cyan)" },
              { id: "env-vars", label: "env / args", x: 220, y: 170, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "settings", to: "mcp-servers" },
              { from: "mcp-servers", to: "fs-server" },
              { from: "mcp-servers", to: "gh-server" },
              { from: "mcp-servers", to: "pg-server" },
              { from: "fs-server", to: "fs-cmd", label: "command" },
              { from: "gh-server", to: "gh-cmd", label: "command" },
              { from: "pg-server", to: "pg-cmd", label: "command" },
              { from: "mcp-servers", to: "env-vars" },
            ]}
            width={780}
            height={210}
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

          {/* Hook types diagram (replaces CodeBlock ~line 496) */}
          <ArchitectureDiagram
            title="Hook 类型与匹配规则"
            nodes={[
              { id: "hooks-config", label: "hooks config", x: 30, y: 80, color: "var(--accent-purple)" },
              { id: "pre-tool", label: "PreToolUse", x: 240, y: 30, color: "var(--accent-cyan)" },
              { id: "post-tool", label: "PostToolUse", x: 240, y: 160, color: "var(--accent-blue)" },
              { id: "pre-bash", label: "matcher: BashTool", x: 460, y: 10, color: "var(--accent-cyan)" },
              { id: "pre-file", label: "matcher: FileWrite", x: 460, y: 60, color: "var(--accent-cyan)" },
              { id: "pre-cmd-1", label: "security-check", x: 650, y: 10, color: "var(--accent-cyan)" },
              { id: "pre-cmd-2", label: "validate-path", x: 650, y: 60, color: "var(--accent-cyan)" },
              { id: "post-file", label: "matcher: FileWrite", x: 460, y: 130, color: "var(--accent-blue)" },
              { id: "post-edit", label: "matcher: FileEdit", x: 460, y: 180, color: "var(--accent-blue)" },
              { id: "post-cmd-1", label: "eslint --fix", x: 650, y: 130, color: "var(--accent-blue)" },
              { id: "post-cmd-2", label: "prettier --write", x: 650, y: 180, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "hooks-config", to: "pre-tool" },
              { from: "hooks-config", to: "post-tool" },
              { from: "pre-tool", to: "pre-bash" },
              { from: "pre-tool", to: "pre-file" },
              { from: "pre-bash", to: "pre-cmd-1", label: "command" },
              { from: "pre-file", to: "pre-cmd-2", label: "command" },
              { from: "post-tool", to: "post-file" },
              { from: "post-tool", to: "post-edit" },
              { from: "post-file", to: "post-cmd-1", label: "command" },
              { from: "post-edit", to: "post-cmd-2", label: "command" },
            ]}
            width={800}
            height={230}
          />

          {/* Hook execution pipeline diagram (replaces CodeFlow ~line 526) */}
          <ArchitectureDiagram
            title="钩子执行流程"
            nodes={[
              { id: "tool-call", label: "工具调用触发", x: 30, y: 80, color: "var(--accent-purple)" },
              { id: "match", label: "1. 匹配钩子", x: 220, y: 20, color: "var(--accent-cyan)" },
              { id: "match-detail", label: "按事件类型 + 工具名", x: 420, y: 20, color: "var(--accent-cyan)" },
              { id: "execute", label: "2. 执行钩子命令", x: 220, y: 90, color: "var(--accent-blue)" },
              { id: "exec-detail", label: "子进程 + 环境变量注入", x: 420, y: 90, color: "var(--accent-blue)" },
              { id: "result", label: "3. 处理结果", x: 220, y: 160, color: "var(--accent-purple)" },
              { id: "deny", label: "exitCode != 0 → deny", x: 420, y: 130, color: "var(--accent-purple)" },
              { id: "allow", label: "exitCode == 0 → allow", x: 420, y: 190, color: "var(--accent-cyan)" },
              { id: "timeout", label: "4. 超时保护 (30s)", x: 620, y: 90, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "tool-call", to: "match" },
              { from: "tool-call", to: "execute" },
              { from: "match", to: "match-detail" },
              { from: "match-detail", to: "execute" },
              { from: "execute", to: "exec-detail" },
              { from: "execute", to: "result" },
              { from: "result", to: "deny" },
              { from: "result", to: "allow" },
              { from: "exec-detail", to: "timeout" },
            ]}
            width={780}
            height={240}
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
              以下流程展示了从定义到注册的完整过程，涵盖元数据声明、生命周期钩子、
              工具注册和命令注册四个核心环节。
            </p>
          </div>

          {/* Plugin creation flow diagram (replaces CodeBlock ~line 597) */}
          <ArchitectureDiagram
            title="插件创建流程"
            nodes={[
              { id: "create", label: "创建项目结构", x: 30, y: 30, color: "var(--accent-purple)" },
              { id: "dir", label: ".claude/plugins/my-plugin/", x: 260, y: 30, color: "var(--accent-purple)" },
              { id: "implement", label: "实现 Plugin 接口", x: 30, y: 100, color: "var(--accent-blue)" },
              { id: "meta", label: "name + version", x: 260, y: 80, color: "var(--accent-blue)" },
              { id: "lifecycle", label: "onLoad / onInit / onCleanup", x: 260, y: 130, color: "var(--accent-blue)" },
              { id: "register", label: "注册工具与命令", x: 30, y: 180, color: "var(--accent-cyan)" },
              { id: "tool-def", label: "Tool + Zod Schema", x: 260, y: 190, color: "var(--accent-cyan)" },
              { id: "cmd-def", label: "Command + handler", x: 480, y: 190, color: "var(--accent-cyan)" },
              { id: "config", label: "配置与测试", x: 30, y: 250, color: "var(--accent-purple)" },
              { id: "settings-reg", label: "settings.json 注册", x: 260, y: 250, color: "var(--accent-purple)" },
              { id: "verify", label: "验证插件功能", x: 480, y: 250, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "create", to: "dir" },
              { from: "create", to: "implement" },
              { from: "implement", to: "meta" },
              { from: "implement", to: "lifecycle" },
              { from: "implement", to: "register" },
              { from: "register", to: "tool-def" },
              { from: "register", to: "cmd-def" },
              { from: "register", to: "config" },
              { from: "config", to: "settings-reg" },
              { from: "config", to: "verify" },
            ]}
            width={680}
            height={310}
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

          {/* Plugin settings structure diagram (replaces CodeBlock ~line 696) */}
          <ArchitectureDiagram
            title="插件配置结构"
            nodes={[
              { id: "settings", label: "settings.json", x: 30, y: 60, color: "var(--accent-purple)" },
              { id: "plugins", label: "plugins", x: 220, y: 60, color: "var(--accent-blue)" },
              { id: "my-plugin", label: "my-plugin", x: 410, y: 20, color: "var(--accent-cyan)" },
              { id: "path", label: "path: ./plugins/...", x: 600, y: 20, color: "var(--accent-cyan)" },
              { id: "enabled", label: "enabled: true", x: 600, y: 70, color: "var(--accent-cyan)" },
              { id: "permissions", label: "permissions", x: 410, y: 110, color: "var(--accent-purple)" },
              { id: "allow-tools", label: "allowTools: [my_tool]", x: 600, y: 120, color: "var(--accent-purple)" },
              { id: "allow-cmds", label: "allowCommands: [my-cmd]", x: 600, y: 170, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "settings", to: "plugins" },
              { from: "plugins", to: "my-plugin" },
              { from: "my-plugin", to: "path" },
              { from: "my-plugin", to: "enabled" },
              { from: "my-plugin", to: "permissions" },
              { from: "permissions", to: "allow-tools" },
              { from: "permissions", to: "allow-cmds" },
            ]}
            width={780}
            height={210}
          />
        </section>
      </ScrollReveal>

      {/* Section 7: MCP 协议交互图 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="MCP 协议交互流程"
            subtitle="从初始化到工具调用的完整通信序列"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              MCP 协议采用请求-响应模式，Claude Code 与 MCP Server 之间通过
              <strong className="text-[var(--text-primary)]"> stdio</strong>（子进程管道）或
              <strong className="text-[var(--text-primary)]"> SSE</strong>（HTTP Server-Sent Events）进行通信。
              整个交互流程从握手初始化开始，经过能力协商、工具发现，最终完成工具调用。
            </p>
          </div>

          <ArchitectureDiagram
            title="MCP 完整交互流程"
            nodes={[
              { id: "claude", label: "Claude Code", x: 30, y: 120, color: "var(--accent-purple)" },
              { id: "mcp-server", label: "MCP Server", x: 600, y: 120, color: "var(--accent-cyan)" },
              { id: "s1", label: "1. initialize", x: 180, y: 20, color: "var(--accent-blue)" },
              { id: "s2", label: "2. capabilities", x: 480, y: 20, color: "var(--accent-cyan)" },
              { id: "s3", label: "3. tools/list", x: 180, y: 80, color: "var(--accent-blue)" },
              { id: "s4", label: "4. tool 列表", x: 480, y: 80, color: "var(--accent-cyan)" },
              { id: "s5", label: "5. tools/call", x: 180, y: 160, color: "var(--accent-blue)" },
              { id: "s6", label: "6. 执行结果", x: 480, y: 160, color: "var(--accent-cyan)" },
              { id: "stdio", label: "stdio / SSE", x: 340, y: 220, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "claude", to: "s1" },
              { from: "s1", to: "s2", label: "请求" },
              { from: "s2", to: "mcp-server" },
              { from: "mcp-server", to: "s4" },
              { from: "s4", to: "s3", label: "响应" },
              { from: "s3", to: "claude" },
              { from: "claude", to: "s5" },
              { from: "s5", to: "s6", label: "请求" },
              { from: "s6", to: "mcp-server" },
              { from: "claude", to: "stdio" },
              { from: "stdio", to: "mcp-server" },
            ]}
            width={800}
            height={270}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "stdio 通信",
                desc: "通过子进程的标准输入/输出进行通信，适用于本地 MCP Server。Claude Code 启动 Server 子进程，通过 stdin 发送请求、stdout 接收响应。低延迟、简单可靠。",
                color: "var(--accent-cyan)",
              },
              {
                title: "SSE 通信",
                desc: "通过 HTTP Server-Sent Events 进行通信，适用于远程 MCP Server。客户端通过 POST 发送请求，服务器通过 SSE 流推送响应。支持网络部署和负载均衡。",
                color: "var(--accent-purple)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">{item.title}</h5>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 8: Skills + Plugins 关系图 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Skills + Plugins + MCP 关系"
            subtitle="三大扩展机制的协作关系"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Plugins、Skills 和 MCP 构成了 Claude Code 扩展体系的三层架构。
              <strong className="text-[var(--text-primary)]">Plugins</strong> 是最强大的扩展方式，可以注册工具、命令和钩子；
              <strong className="text-[var(--text-primary)]">Skills</strong> 是轻量级的提示词模板，通过斜杠命令触发；
              <strong className="text-[var(--text-primary)]">MCP</strong> 则是标准化的外部工具协议。
              三者之间可以组合使用：Plugin 可以注册 Skills，也可以包装 MCP Servers，而 Skills 执行时可以调用底层 Tools。
            </p>
          </div>

          <ArchitectureDiagram
            title="扩展机制关系图"
            nodes={[
              { id: "plugins", label: "Plugins", x: 80, y: 30, color: "var(--accent-purple)" },
              { id: "skills", label: "Skills", x: 350, y: 30, color: "var(--accent-blue)" },
              { id: "mcp", label: "MCP", x: 620, y: 30, color: "var(--accent-cyan)" },
              { id: "p-tools", label: "注册 tools", x: 30, y: 120, color: "var(--accent-purple)" },
              { id: "p-cmds", label: "注册 commands", x: 30, y: 180, color: "var(--accent-purple)" },
              { id: "p-hooks", label: "注册 hooks", x: 30, y: 240, color: "var(--accent-purple)" },
              { id: "p-skills", label: "注册 skills", x: 220, y: 120, color: "var(--accent-blue)" },
              { id: "p-mcp", label: "包装 MCP Servers", x: 220, y: 200, color: "var(--accent-cyan)" },
              { id: "s-cmd", label: "/command 触发", x: 400, y: 120, color: "var(--accent-blue)" },
              { id: "s-prompt", label: "Markdown 模板", x: 400, y: 200, color: "var(--accent-blue)" },
              { id: "m-stdio", label: "stdio", x: 620, y: 120, color: "var(--accent-cyan)" },
              { id: "m-sse", label: "SSE", x: 620, y: 200, color: "var(--accent-cyan)" },
              { id: "m-ext", label: "外部工具", x: 620, y: 260, color: "var(--accent-cyan)" },
              { id: "s-to-tools", label: "Skills 通过 Tools 执行", x: 400, y: 270, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "plugins", to: "p-tools" },
              { from: "plugins", to: "p-cmds" },
              { from: "plugins", to: "p-hooks" },
              { from: "plugins", to: "p-skills", label: "可以注册" },
              { from: "plugins", to: "p-mcp", label: "可以包装" },
              { from: "p-skills", to: "skills" },
              { from: "p-mcp", to: "mcp" },
              { from: "skills", to: "s-cmd" },
              { from: "skills", to: "s-prompt" },
              { from: "s-cmd", to: "s-to-tools" },
              { from: "s-to-tools", to: "p-tools", label: "调用" },
              { from: "mcp", to: "m-stdio" },
              { from: "mcp", to: "m-sse" },
              { from: "mcp", to: "m-ext" },
            ]}
            width={800}
            height={310}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Plugin → Skills",
                desc: "插件可以在初始化时注册多个 Skills，将复杂功能封装为斜杠命令，用户无需了解底层实现细节。",
                color: "var(--accent-purple)",
              },
              {
                title: "Plugin → MCP",
                desc: "插件可以包装一个或多个 MCP Server，为外部工具提供统一的权限控制和生命周期管理。",
                color: "var(--accent-blue)",
              },
              {
                title: "Skills → Tools",
                desc: "Skills 执行时通过底层 Tools 完成实际操作，提示词模板 + 工具调用 = 强大的自动化工作流。",
                color: "var(--accent-cyan)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">{item.title}</h5>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 9: 源码片段 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="源码参考"
            subtitle="核心接口与配置示例"
          />

          <div className="space-y-8">
            <div>
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-3">Plugin 接口定义</h4>
              <CodeBlock
                code={`interface Plugin {
  /** 插件元数据 */
  name: string;
  version: string;
  description?: string;

  /** 生命周期钩子 */
  onLoad?(): Promise<void>;
  onInit?(ctx: PluginContext): Promise<void>;
  onCleanup?(): Promise<void>;

  /** 扩展点声明 */
  tools?: ToolDefinition[];
  commands?: CommandDefinition[];
  hooks?: HookDefinition[];
  skills?: SkillDefinition[];
}`}
                language="typescript"
              />
            </div>

            <div>
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-3">MCP Server 注册配置</h4>
              <CodeBlock
                code={`// claude_desktop_config.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic/server-filesystem", "/path/to/dir"],
      "env": { "NODE_ENV": "production" }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@anthropic/server-github"],
      "env": { "GITHUB_TOKEN": "ghp_xxx" }
    }
  }
}`}
                language="json"
              />
            </div>

            <div>
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-3">Skill 文件格式示例</h4>
              <CodeBlock
                code={`---
# .claude/skills/commit.md
name: commit
description: 生成规范的 Git commit message
trigger: /commit
---

## Commit Message 生成

1. 运行 \`git status\` 查看变更文件
2. 运行 \`git diff --staged\` 查看暂存内容
3. 分析变更类型 (feat|fix|docs|refactor|test)
4. 按照约定式提交规范生成 message

格式: <type>(<scope>): <subject>

变量: $FILE_PATH, $BRANCH_NAME`}
                language="markdown"
              />
            </div>
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
