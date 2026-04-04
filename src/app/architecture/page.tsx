import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function ArchitecturePage() {
  const relatedModules = [
    {
      title: "入口与启动",
      href: "/entry",
      description: "启动流程详解",
      icon: "🚀",
    },
    {
      title: "工具系统",
      href: "/tools",
      description: "40+ 工具实现",
      icon: "🔧",
    },
    {
      title: "命令系统",
      href: "/commands",
      description: "命令行界面",
      icon: "⌨️",
    },
    {
      title: "插件系统",
      href: "/plugins",
      description: "扩展机制",
      icon: "🔌",
    },
  ];

  return (
    <ModuleLayout
      title="系统架构"
      subtitle="Claude Code 核心架构的深度剖析 —— 分层设计、消息流、状态管理与性能策略"
      icon="🏗️"
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

          <ArchitectureDiagram
            title="消息处理管道"
            nodes={[
              { id: "msg-user", label: "用户输入", x: 30, y: 30, color: "var(--accent-cyan)" },
              { id: "msg-textinput", label: "TextInput", x: 220, y: 30, color: "var(--accent-cyan)" },
              { id: "msg-history", label: "对话历史", x: 410, y: 30, color: "var(--accent-cyan)" },

              { id: "msg-query", label: "QueryEngine", x: 30, y: 120, color: "var(--accent-purple)" },
              { id: "msg-git", label: "Git 状态", x: 220, y: 120, color: "var(--accent-purple)" },
              { id: "msg-system", label: "System Prompt", x: 410, y: 120, color: "var(--accent-purple)" },

              { id: "msg-api", label: "Claude API", x: 30, y: 210, color: "var(--accent-blue)" },
              { id: "msg-stream", label: "流式响应", x: 220, y: 210, color: "var(--accent-blue)" },
              { id: "msg-update", label: "UI 更新", x: 410, y: 210, color: "var(--accent-blue)" },

              { id: "msg-toolcall", label: "工具调用", x: 30, y: 300, color: "var(--text-secondary)" },
              { id: "msg-perm", label: "权限检查", x: 220, y: 300, color: "var(--text-secondary)" },
              { id: "msg-exec", label: "工具执行", x: 410, y: 300, color: "var(--text-secondary)" },

              { id: "msg-result", label: "工具结果", x: 120, y: 390, color: "var(--accent-cyan)" },
              { id: "msg-loop", label: "对话循环", x: 310, y: 390, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "msg-user", to: "msg-textinput", label: "捕获" },
              { from: "msg-textinput", to: "msg-history", label: "记录" },
              { from: "msg-history", to: "msg-query", label: "传递" },
              { from: "msg-query", to: "msg-git", label: "读取" },
              { from: "msg-git", to: "msg-system", label: "构建" },
              { from: "msg-system", to: "msg-api", label: "发送" },
              { from: "msg-api", to: "msg-stream", label: "stream" },
              { from: "msg-stream", to: "msg-update", label: "渲染" },
              { from: "msg-api", to: "msg-toolcall", label: "返回" },
              { from: "msg-toolcall", to: "msg-perm", label: "验证" },
              { from: "msg-perm", to: "msg-exec", label: "批准" },
              { from: "msg-exec", to: "msg-result", label: "输出" },
              { from: "msg-result", to: "msg-loop", label: "反馈" },
              { from: "msg-loop", to: "msg-api", label: "继续" },
            ]}
            width={560}
            height={460}
          />

          <div className="mt-6 space-y-3">
            {[
              {
                step: "1",
                title: "用户输入捕获",
                desc: "用户在终端中输入指令，TextInput 组件捕获输入，构建标准化的用户消息对象，并追加到对话历史中。",
                color: "var(--accent-cyan)",
              },
              {
                step: "2",
                title: "QueryEngine 上下文增强",
                desc: "QueryEngine 对消息进行上下文增强：获取 git 状态、项目信息、已注册工具列表和当前权限，构建完整的系统提示词。",
                color: "var(--accent-purple)",
              },
              {
                step: "3",
                title: "API 调用与流式响应",
                desc: "将增强后的消息发送给 Claude API。启用流式响应（stream: true），每个 token 到达时立即更新终端显示，用户可以看到 Claude 的思考过程实时展开。",
                color: "var(--accent-blue)",
              },
              {
                step: "4",
                title: "工具调用与权限验证",
                desc: "Claude 分析请求后决定使用工具（如 FileReadTool），系统先进行权限检查，然后执行工具并将结果反馈给 Claude 继续推理。",
                color: "var(--text-secondary)",
              },
              {
                step: "5",
                title: "工具结果反馈与对话循环",
                desc: "工具执行完毕后，结果被包装为 tool_result 消息追加到对话历史，然后反馈给 Claude 继续推理。整个循环会持续进行，直到 Claude 给出最终回复。",
                color: "var(--accent-cyan)",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{
                    background: `${item.color}15`,
                    color: item.color,
                  }}
                >
                  {item.step}
                </span>
                <div>
                  <span className="text-sm font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </span>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
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

          <ArchitectureDiagram
            title="状态管理架构"
            nodes={[
              // Global State row
              { id: "gs-cwd", label: "originalCwd", x: 10, y: 30, color: "var(--accent-purple)" },
              { id: "gs-project", label: "projectRoot", x: 180, y: 30, color: "var(--accent-purple)" },
              { id: "gs-cost", label: "totalCostUSD", x: 350, y: 30, color: "var(--accent-purple)" },
              { id: "gs-session", label: "sessionId", x: 520, y: 30, color: "var(--accent-purple)" },

              // Global State container label
              { id: "gs-interactive", label: "isInteractive", x: 10, y: 100, color: "var(--accent-purple)" },
              { id: "gs-client", label: "clientType", x: 180, y: 100, color: "var(--accent-purple)" },
              { id: "gs-kairos", label: "kairosActive", x: 350, y: 100, color: "var(--accent-purple)" },

              // UI Context row
              { id: "ui-notif", label: "notifications", x: 10, y: 210, color: "var(--accent-cyan)" },
              { id: "ui-overlay", label: "overlay", x: 180, y: 210, color: "var(--accent-cyan)" },
              { id: "ui-prompt", label: "prompt", x: 350, y: 210, color: "var(--accent-cyan)" },
              { id: "ui-loading", label: "isLoading", x: 520, y: 210, color: "var(--accent-cyan)" },

              // Storage layer
              { id: "store-bootstrap", label: "Bootstrap", x: 100, y: 320, color: "var(--text-secondary)" },
              { id: "store-memdir", label: "memdir 持久化", x: 320, y: 320, color: "var(--text-secondary)" },
            ]}
            edges={[
              // Global state internal connections
              { from: "gs-cwd", to: "gs-project", label: "派生" },
              { from: "gs-cost", to: "gs-session", label: "关联" },
              { from: "gs-interactive", to: "gs-client", label: "决定" },
              // Global state to UI Context
              { from: "gs-session", to: "ui-loading", label: "驱动" },
              { from: "gs-kairos", to: "ui-overlay", label: "控制" },
              // UI Context internal
              { from: "ui-notif", to: "ui-overlay", label: "触发" },
              { from: "ui-prompt", to: "ui-loading", label: "联动" },
              // Storage connections
              { from: "store-bootstrap", to: "gs-cwd", label: "初始化" },
              { from: "store-bootstrap", to: "gs-session", label: "创建" },
              { from: "gs-session", to: "store-memdir", label: "写入" },
              { from: "store-memdir", to: "ui-prompt", label: "恢复" },
            ]}
            width={680}
            height={380}
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

          <ArchitectureDiagram
            title="工具接口与注册架构"
            nodes={[
              // Tool interface
              { id: "tool-name", label: "name: string", x: 10, y: 30, color: "var(--accent-blue)" },
              { id: "tool-desc", label: "description", x: 180, y: 30, color: "var(--accent-blue)" },
              { id: "tool-schema", label: "inputSchema", x: 350, y: 30, color: "var(--accent-blue)" },
              { id: "tool-exec", label: "execute()", x: 520, y: 30, color: "var(--accent-blue)" },

              // Tool instances
              { id: "t-read", label: "Read", x: 10, y: 140, color: "var(--accent-cyan)" },
              { id: "t-write", label: "Write", x: 140, y: 140, color: "var(--accent-cyan)" },
              { id: "t-bash", label: "Bash", x: 270, y: 140, color: "var(--accent-cyan)" },
              { id: "t-grep", label: "Grep", x: 400, y: 140, color: "var(--accent-cyan)" },
              { id: "t-more", label: "40+ ...", x: 530, y: 140, color: "var(--accent-cyan)" },

              // Registry & execution
              { id: "reg-registry", label: "工具注册表", x: 100, y: 260, color: "var(--accent-purple)" },
              { id: "reg-dispatch", label: "工具调度器", x: 320, y: 260, color: "var(--accent-purple)" },
              { id: "reg-result", label: "ToolResult", x: 530, y: 260, color: "var(--accent-purple)" },
            ]}
            edges={[
              // Interface connections
              { from: "tool-name", to: "tool-desc", label: "标识" },
              { from: "tool-desc", to: "tool-schema", label: "描述" },
              { from: "tool-schema", to: "tool-exec", label: "验证" },
              // Instances implement interface
              { from: "tool-exec", to: "t-read", label: "实现" },
              { from: "tool-exec", to: "t-write", label: "实现" },
              { from: "tool-exec", to: "t-bash", label: "实现" },
              // Instances register
              { from: "t-read", to: "reg-registry", label: "注册" },
              { from: "t-bash", to: "reg-registry", label: "注册" },
              { from: "t-more", to: "reg-registry", label: "注册" },
              // Registry to dispatch
              { from: "reg-registry", to: "reg-dispatch", label: "查找" },
              { from: "reg-dispatch", to: "reg-result", label: "执行" },
            ]}
            width={680}
            height={320}
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

          <ArchitectureDiagram
            title="性能优化策略全景图"
            nodes={[
              // Lazy Loading
              { id: "perf-entry", label: "应用入口", x: 250, y: 20, color: "var(--accent-cyan)" },

              // Branching to strategies
              { id: "perf-lazy", label: "Lazy Loading", x: 10, y: 110, color: "var(--accent-purple)" },
              { id: "perf-dynamic", label: "dynamic import", x: 210, y: 110, color: "var(--accent-purple)" },
              { id: "perf-cond", label: "条件加载", x: 420, y: 110, color: "var(--accent-purple)" },

              // Memoization
              { id: "perf-memo", label: "Memoization", x: 10, y: 200, color: "var(--accent-blue)" },
              { id: "perf-reactmemo", label: "React.memo", x: 210, y: 200, color: "var(--accent-blue)" },
              { id: "perf-usememo", label: "useMemo", x: 420, y: 200, color: "var(--accent-blue)" },

              // Virtual Scrolling + Background
              { id: "perf-virtual", label: "Virtual Scroll", x: 80, y: 290, color: "var(--text-secondary)" },
              { id: "perf-bg", label: "Background Tasks", x: 310, y: 290, color: "var(--text-secondary)" },

              // Result
              { id: "perf-fast", label: "流畅体验", x: 220, y: 370, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "perf-entry", to: "perf-lazy", label: "启动时" },
              { from: "perf-entry", to: "perf-memo", label: "运行时" },
              { from: "perf-entry", to: "perf-virtual", label: "渲染时" },
              { from: "perf-lazy", to: "perf-dynamic", label: "策略" },
              { from: "perf-dynamic", to: "perf-cond", label: "按需" },
              { from: "perf-memo", to: "perf-reactmemo", label: "避免" },
              { from: "perf-memo", to: "perf-usememo", label: "缓存" },
              { from: "perf-reactmemo", to: "perf-fast", label: "加速" },
              { from: "perf-usememo", to: "perf-fast", label: "优化" },
              { from: "perf-virtual", to: "perf-fast", label: "减少" },
              { from: "perf-bg", to: "perf-fast", label: "不阻塞" },
              { from: "perf-cond", to: "perf-bg", label: "后台" },
            ]}
            width={580}
            height={430}
          />

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

          <ArchitectureDiagram
            title="权限系统多层防御"
            nodes={[
              // Incoming request
              { id: "sec-request", label: "工具调用请求", x: 220, y: 20, color: "var(--accent-cyan)" },

              // Layer 1: Feature Flags
              { id: "sec-flag", label: "Feature Flags", x: 10, y: 110, color: "var(--accent-purple)" },
              { id: "sec-check", label: "功能是否启用", x: 280, y: 110, color: "var(--accent-purple)" },

              // Layer 2: Permission Modes
              { id: "sec-mode", label: "Permission Mode", x: 10, y: 200, color: "var(--accent-blue)" },
              { id: "sec-auto", label: "auto", x: 200, y: 200, color: "var(--accent-blue)" },
              { id: "sec-manual", label: "manual", x: 340, y: 200, color: "var(--accent-blue)" },
              { id: "sec-bypass", label: "bypass", x: 480, y: 200, color: "var(--accent-blue)" },

              // Layer 3: Tool-specific
              { id: "sec-tool", label: "工具级权限", x: 10, y: 290, color: "var(--text-secondary)" },
              { id: "sec-path", label: "路径检查", x: 200, y: 290, color: "var(--text-secondary)" },
              { id: "sec-net", label: "网络白名单", x: 400, y: 290, color: "var(--text-secondary)" },

              // Layer 4: User Consent
              { id: "sec-consent", label: "用户确认", x: 120, y: 380, color: "var(--accent-cyan)" },
              { id: "sec-exec", label: "执行工具", x: 360, y: 380, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "sec-request", to: "sec-flag", label: "第1层" },
              { from: "sec-flag", to: "sec-check", label: "检查" },
              { from: "sec-check", to: "sec-mode", label: "第2层" },
              { from: "sec-mode", to: "sec-auto", label: "模式" },
              { from: "sec-mode", to: "sec-manual", label: "模式" },
              { from: "sec-mode", to: "sec-bypass", label: "模式" },
              { from: "sec-manual", to: "sec-tool", label: "第3层" },
              { from: "sec-auto", to: "sec-tool", label: "第3层" },
              { from: "sec-tool", to: "sec-path", label: "验证" },
              { from: "sec-tool", to: "sec-net", label: "验证" },
              { from: "sec-path", to: "sec-consent", label: "第4层" },
              { from: "sec-consent", to: "sec-exec", label: "批准" },
              { from: "sec-net", to: "sec-exec", label: "通过" },
            ]}
            width={640}
            height={440}
          />

          <div className="mt-6 space-y-4">
            {[
              {
                layer: "Feature Flags",
                desc: "功能开关层",
                detail:
                  "通过 feature flag 系统控制实验性功能的开启和关闭。新工具和新功能首先通过 flag 控制，经过充分测试后才会默认启用。这确保了只有经过验证的能力才会暴露给用户。",
              },
              {
                layer: "Permission Modes",
                desc: "权限模式层",
                detail:
                  "三种权限模式满足不同安全需求：auto 模式自动批准安全操作；manual 模式对所有敏感操作弹出确认；bypass 模式用于 CI/CD 等自动化场景，通过环境变量控制。",
              },
              {
                layer: "Tool-Specific Permissions",
                desc: "工具级权限层",
                detail:
                  "每个工具可以定义自己的权限检查逻辑。例如文件操作工具会检查路径是否在项目目录内，网络工具会检查 URL 是否在白名单中。这种细粒度的控制确保了工具只能执行被允许的操作。",
              },
              {
                layer: "User Consent",
                desc: "用户确认层",
                detail:
                  "在 manual 模式下，敏感操作（如文件写入、命令执行）会弹出交互式确认对话框。用户可以一次性批准或拒绝，也可以选择\"本次会话始终允许\"，在安全性和便利性之间取得平衡。",
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
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.detail}
                </p>
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

          <ArchitectureDiagram
            title="上下文组装流程 (QueryEngine 核心逻辑)"
            nodes={[
              // Context sources
              { id: "ctx-git", label: "Git 状态", x: 10, y: 30, color: "var(--accent-cyan)" },
              { id: "ctx-sys", label: "系统信息", x: 190, y: 30, color: "var(--accent-cyan)" },
              { id: "ctx-claudemd", label: "CLAUDE.md", x: 370, y: 30, color: "var(--accent-purple)" },
              { id: "ctx-settings", label: "用户配置", x: 540, y: 30, color: "var(--accent-purple)" },

              { id: "ctx-memdir", label: "memdir 记忆", x: 10, y: 120, color: "var(--accent-blue)" },
              { id: "ctx-tools", label: "工具列表", x: 190, y: 120, color: "var(--accent-blue)" },
              { id: "ctx-perm", label: "权限状态", x: 370, y: 120, color: "var(--accent-blue)" },

              // Assembler
              { id: "ctx-assemble", label: "QueryEngine 上下文组装", x: 170, y: 230, color: "var(--accent-purple)" },

              // Output
              { id: "ctx-prompt", label: "SystemPrompt", x: 170, y: 330, color: "var(--accent-cyan)" },
              { id: "ctx-api", label: "Claude API", x: 420, y: 330, color: "var(--accent-blue)" },
            ]}
            edges={[
              // Sources to assembler
              { from: "ctx-git", to: "ctx-assemble", label: "注入" },
              { from: "ctx-sys", to: "ctx-assemble", label: "注入" },
              { from: "ctx-claudemd", to: "ctx-assemble", label: "注入" },
              { from: "ctx-settings", to: "ctx-assemble", label: "注入" },
              { from: "ctx-memdir", to: "ctx-assemble", label: "加载" },
              { from: "ctx-tools", to: "ctx-assemble", label: "注册" },
              { from: "ctx-perm", to: "ctx-assemble", label: "附加" },
              // Assembler to output
              { from: "ctx-assemble", to: "ctx-prompt", label: "生成" },
              { from: "ctx-prompt", to: "ctx-api", label: "发送" },
            ]}
            width={700}
            height={390}
          />
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
