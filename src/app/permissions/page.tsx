import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";
import { CodeBlock } from "@/components/CodeBlock";
import Link from "next/link";

export default function PermissionsPage() {
  const relatedModules = [
    {
      title: "工具系统",
      href: "/tools",
      description: "各工具的权限行为",
      icon: "🔧",
    },
    {
      title: "Undercover 模式",
      href: "/buddy",
      description: "安全贡献与匿名模式",
      icon: "🕵️",
    },
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构概览",
      icon: "🏗️",
    },
    {
      title: "命令系统",
      href: "/commands",
      description: "CLI 权限控制命令",
      icon: "⌨️",
    },
  ];

  const pipelineNodes = [
    { id: "tool", label: "工具调用", x: 0, y: 60, color: "var(--accent-cyan)" },
    { id: "mode", label: "模式检查", x: 180, y: 60, color: "var(--accent-purple)" },
    { id: "rule", label: "规则匹配", x: 360, y: 60, color: "var(--accent-blue)" },
    { id: "classifier", label: "分类器", x: 540, y: 60, color: "var(--accent-green)" },
    { id: "sandbox", label: "沙箱决策", x: 720, y: 60, color: "var(--accent-orange)" },
    { id: "result", label: "Allow/Deny/Ask", x: 900, y: 60, color: "var(--accent-pink)" },
  ];

  const pipelineEdges = [
    { from: "tool", to: "mode", label: "请求" },
    { from: "mode", to: "rule", label: "传递" },
    { from: "rule", to: "classifier", label: "未匹配" },
    { from: "classifier", to: "sandbox", label: "allow/ask" },
    { from: "sandbox", to: "result", label: "最终决策" },
  ];

  const sandboxNodes = [
    { id: "input", label: "用户命令", x: 0, y: 80, color: "var(--accent-cyan)" },
    { id: "check", label: "shouldUseSandbox", x: 180, y: 80, color: "var(--accent-purple)" },
    { id: "enabled", label: "沙箱已启用?", x: 360, y: 30, color: "var(--accent-blue)" },
    { id: "excluded", label: "排除列表?", x: 360, y: 130, color: "var(--accent-blue)" },
    { id: "sandbox_exec", label: "容器执行", x: 540, y: 30, color: "var(--accent-green)" },
    { id: "local_exec", label: "本地执行", x: 540, y: 130, color: "var(--accent-orange)" },
    { id: "output", label: "结果返回", x: 720, y: 80, color: "var(--accent-pink)" },
  ];

  const sandboxEdges = [
    { from: "input", to: "check" },
    { from: "check", to: "enabled" },
    { from: "enabled", to: "sandbox_exec", label: "Yes" },
    { from: "enabled", to: "excluded", label: "Yes" },
    { from: "excluded", to: "local_exec", label: "No" },
    { from: "sandbox_exec", to: "output" },
    { from: "local_exec", to: "output" },
  ];

  const permissionModes = [
    {
      name: "default",
      label: "Default",
      description: "标准权限模式，所有工具调用都需要用户确认",
      behavior: "ask",
      icon: "🛡️",
      detail:
        "每个工具调用都会弹出确认提示，用户手动决定 Allow、Deny 或 Allow Always。适用于对安全性要求最高的场景。",
    },
    {
      name: "plan",
      label: "Plan",
      description: "计划模式，只读操作自动允许，写操作需要确认",
      behavior: "ask (reads: allow)",
      icon: "📋",
      detail:
        "文件读取、搜索等只读操作自动放行，文件写入、命令执行等修改操作仍需确认。适合代码审查和探索阶段。",
    },
    {
      name: "autoEdit",
      label: "Auto Edit",
      description: "自动接受文件编辑，但命令执行仍需确认",
      behavior: "edits: allow, commands: ask",
      icon: "✏️",
      detail:
        "FileEdit、FileWrite 等文件编辑工具自动批准，BashTool 等命令执行工具仍需确认。平衡效率与安全。",
    },
    {
      name: "acceptEdits",
      label: "Accept Edits",
      description: "自动接受文件系统操作（mkdir, touch, rm, mv, cp, sed）",
      behavior: "fs ops: allow",
      icon: "📁",
      detail:
        "在 BashTool 中，文件系统相关命令（mkdir、touch、rm、rmdir、mv、cp、sed）自动允许，其他命令仍走标准权限流程。",
    },
    {
      name: "dontAsk",
      label: "Don't Ask (Auto-Approve)",
      description: "自动批准所有工具调用，无需确认",
      behavior: "allow (all)",
      icon: "⚡",
      detail:
        "所有工具调用自动批准，不弹出任何确认提示。最高效率但最低安全性，适合受信任的自动化流水线。",
    },
    {
      name: "bypassPermissions",
      label: "Bypass Permissions",
      description: "完全绕过权限系统，所有操作直接执行",
      behavior: "bypass",
      icon: "🔓",
      detail:
        "跳过所有权限检查和分类器评估。仅用于高度受控的环境（如 CI/CD），普通开发中不建议使用。",
    },
  ];

  return (
    <ModuleLayout
      title="权限与安全"
      subtitle="Claude Code 的权限模型、评估管道与沙箱机制"
      icon="🔐"
      category="安全"
      relatedModules={relatedModules}
    >
      {/* 权限模式总览 */}
      <section className="mb-16">
        <SectionTitle title="权限模式" subtitle="六种运行模式，从严格到宽松" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {permissionModes.map((mode) => (
            <ScrollReveal key={mode.name}>
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 hover:border-[var(--accent-purple)] transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{mode.icon}</span>
                  <h3 className="text-lg font-bold">{mode.label}</h3>
                </div>
                <p className="text-sm text-[var(--muted)] mb-2">
                  {mode.description}
                </p>
                <div className="inline-block px-2 py-1 rounded-md text-xs font-mono bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] mb-3">
                  {mode.behavior}
                </div>
                <p className="text-sm text-[var(--secondary)]">{mode.detail}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 权限模式对比表 */}
      <section className="mb-16">
        <SectionTitle title="模式对比" subtitle="不同模式下的权限行为一览" />
        <ScrollReveal>
          <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--card)]">
                  <th className="text-left p-4 font-semibold">模式</th>
                  <th className="text-center p-4 font-semibold">文件读取</th>
                  <th className="text-center p-4 font-semibold">文件编辑</th>
                  <th className="text-center p-4 font-semibold">Bash 命令</th>
                  <th className="text-center p-4 font-semibold">安全级别</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Default", "Ask ✋", "Ask ✋", "Ask ✋", "🟢 最高"],
                  ["Plan", "Allow ✅", "Ask ✋", "Ask ✋", "🟢 高"],
                  ["Auto Edit", "Allow ✅", "Allow ✅", "Ask ✋", "🟡 中"],
                  ["Accept Edits", "Allow ✅", "Allow ✅", "Ask ✋", "🟡 中"],
                  ["Don't Ask", "Allow ✅", "Allow ✅", "Allow ✅", "🔴 低"],
                  ["Bypass", "Allow ✅", "Allow ✅", "Allow ✅", "⚪ 无"],
                ].map((row) => (
                  <tr
                    key={row[0]}
                    className="border-b border-[var(--border)] hover:bg-[var(--card)] transition-colors"
                  >
                    <td className="p-4 font-medium">{row[0]}</td>
                    <td className="p-4 text-center">{row[1]}</td>
                    <td className="p-4 text-center">{row[2]}</td>
                    <td className="p-4 text-center">{row[3]}</td>
                    <td className="p-4 text-center">{row[4]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>
      </section>

      {/* 权限评估管道 */}
      <section className="mb-16">
        <SectionTitle
          title="权限评估管道"
          subtitle="每个工具调用经过的多阶段权限检查"
        />
        <ScrollReveal>
          <ArchitectureDiagram
            nodes={pipelineNodes}
            edges={pipelineEdges}
            width={1060}
            height={160}
          />
        </ScrollReveal>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <h4 className="font-bold mb-2 text-[var(--accent-cyan)]">
                ① 模式检查
              </h4>
              <p className="text-sm text-[var(--secondary)]">
                首先检查当前权限模式（default/plan/acceptEdits 等）。模式可以
                直接决定某些操作的行为，例如 Plan 模式自动放行只读操作，
                Accept Edits 模式自动放行文件系统命令。
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <h4 className="font-bold mb-2 text-[var(--accent-purple)]">
                ② 规则匹配
              </h4>
              <p className="text-sm text-[var(--secondary)]">
                检查用户自定义的权限规则（Permission Rules）。支持精确匹配、前缀匹配和通配符模式。
                匹配到的规则直接决定 allow 或 deny，未匹配则传递给分类器。
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5">
              <h4 className="font-bold mb-2 text-[var(--accent-green)]">
                ③ 分类器评估
              </h4>
              <p className="text-sm text-[var(--secondary)]">
                Bash Classifier 对 shell 命令进行语义分析，区分只读命令（ls、cat、grep）
                和潜在危险命令（rm、curl、npm install），自动做出安全决策。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 权限决策代码 */}
      <section className="mb-16">
        <SectionTitle
          title="核心类型定义"
          subtitle="来自 claude-code 源码的真实类型"
        />
        <ScrollReveal>
          <CodeBlock
            code={`// types/permissions.ts — 权限模式定义

// 外部可见的权限模式（用户可配置）
export const EXTERNAL_PERMISSION_MODES = [
  'acceptEdits',      // 自动接受文件系统操作
  'bypassPermissions', // 完全绕过权限系统
  'default',           // 标准模式，所有操作需确认
  'dontAsk',           // 自动批准所有操作
  'plan',              // 计划模式，只读自动放行
] as const

// 内部扩展模式
export type InternalPermissionMode =
  | ExternalPermissionMode
  | 'auto'    // 智能自动决策（Transcript Classifier）
  | 'bubble'  // 权限决策冒泡给上层

// 权限行为
export type PermissionBehavior = 'allow' | 'deny' | 'ask'

// 权限决策结果
export type PermissionResult = {
  behavior: PermissionBehavior
  message?: string
  decisionReason?: {
    type: 'mode' | 'rule' | 'classifier' | 'sandbox'
    mode?: PermissionMode
  }
}`}
            language="typescript"
          />
        </ScrollReveal>
      </section>

      {/* 沙箱机制 */}
      <section className="mb-16">
        <SectionTitle
          title="沙箱机制"
          subtitle="隔离执行不可信命令的安全容器"
        />
        <ScrollReveal>
          <ArchitectureDiagram
            nodes={sandboxNodes}
            edges={sandboxEdges}
            width={880}
            height={200}
          />
        </ScrollReveal>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h4 className="font-bold mb-3 text-[var(--accent-green)]">
                🔒 沙箱决策逻辑
              </h4>
              <ul className="space-y-2 text-sm text-[var(--secondary)]">
                <li className="flex gap-2">
                  <span className="text-[var(--accent-cyan)]">1.</span>
                  检查 <code className="text-[var(--accent-purple)]">SandboxManager.isSandboxingEnabled()</code> — 全局开关
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-cyan)]">2.</span>
                  检查 <code className="text-[var(--accent-purple)]">dangerouslyDisableSandbox</code> — 显式覆盖
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-cyan)]">3.</span>
                  检查排除列表 — 用户配置的排除命令（支持前缀/通配符）
                </li>
                <li className="flex gap-2">
                  <span className="text-[var(--accent-cyan)]">4.</span>
                  通过所有检查 → 在容器中执行；否则 → 本地执行
                </li>
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
              <h4 className="font-bold mb-3 text-[var(--accent-orange)]">
                ⚠️ 安全边界说明
              </h4>
              <ul className="space-y-2 text-sm text-[var(--secondary)]">
                <li>
                  <strong>排除命令 ≠ 安全边界</strong>：排除列表是用户便利功能，
                  不是安全控制。绕过排除列表不构成安全漏洞。
                </li>
                <li>
                  <strong>真正的安全控制</strong>：沙箱权限系统（弹出用户确认）
                  才是实际的安全边界。
                </li>
                <li>
                  <strong>复合命令处理</strong>：对 <code>cmd1 && cmd2</code> 格式，
                  逐个拆分子命令检查，防止通过复合命令逃逸沙箱。
                </li>
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bash Classifier */}
      <section className="mb-16">
        <SectionTitle
          title="Bash 命令分类器"
          subtitle="基于语义分析的自动权限决策"
        />
        <ScrollReveal>
          <CodeBlock
            code={`// utils/permissions/bashClassifier.ts

// 分类器行为
type ClassifierBehavior = 'allow' | 'deny' | 'ask'

// 分类结果
type ClassifierResult = {
  matches: boolean
  confidence: number        // 0-1 置信度
  reason: string            // 决策理由
  matchedDescription?: string
}

// 分类器描述 — 定义命令模式与行为映射
getBashPromptAllowDescriptions()  // 自动允许的命令描述
getBashPromptAskDescriptions()    // 需要确认的命令描述
getBashPromptDenyDescriptions()   // 自动拒绝的命令描述

// 示例分类：
// ✅ Allow: ls, cat, grep, head, tail, find, wc, echo ...
// ❌ Deny:  rm -rf /, sudo, chmod 777 ...
// 🤔 Ask:   curl, wget, npm install, docker ...`}
            language="typescript"
          />
        </ScrollReveal>
      </section>

      {/* 权限规则系统 */}
      <section className="mb-16">
        <SectionTitle
          title="权限规则系统"
          subtitle="用户自定义的细粒度权限控制"
        />
        <ScrollReveal>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-bold mb-2">规则类型</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-[var(--accent-cyan)]/5 border border-[var(--accent-cyan)]/20">
                    <div className="font-mono text-sm text-[var(--accent-cyan)] mb-1">
                      exact
                    </div>
                    <p className="text-xs text-[var(--secondary)]">
                      精确匹配命令字符串，如 <code>ls</code>
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-[var(--accent-purple)]/5 border border-[var(--accent-purple)]/20">
                    <div className="font-mono text-sm text-[var(--accent-purple)] mb-1">
                      prefix
                    </div>
                    <p className="text-xs text-[var(--secondary)]">
                      前缀匹配，如 <code>npm *</code> 匹配所有 npm 命令
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-[var(--accent-green)]/5 border border-[var(--accent-green)]/20">
                    <div className="font-mono text-sm text-[var(--accent-green)] mb-1">
                      wildcard
                    </div>
                    <p className="text-xs text-[var(--secondary)]">
                      通配符模式，如 <code>git push *</code>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-bold mb-2">规则值</h4>
                <div className="flex flex-wrap gap-3">
                  {["allow", "deny", "ask"].map((v) => (
                    <span
                      key={v}
                      className="px-3 py-1 rounded-full text-sm font-mono border border-[var(--border)]"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Undercover Mode */}
      <section className="mb-16">
        <SectionTitle
          title="Undercover 模式"
          subtitle="安全贡献公共仓库时的隐私保护"
        />
        <ScrollReveal>
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-4xl">🕵️</span>
              <div>
                <h4 className="font-bold text-lg mb-2">什么是 Undercover 模式？</h4>
                <p className="text-sm text-[var(--secondary)]">
                  Undercover 模式是 Claude Code 内部使用的安全机制，当贡献到公共/开源仓库时自动激活。
                  它会在 commit 和 PR 提示中添加安全指令，并移除所有可能泄露内部信息的归属标记。
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[var(--accent-cyan)]/5">
                <h5 className="font-bold mb-2 text-[var(--accent-cyan)]">
                  🔧 激活方式
                </h5>
                <ul className="space-y-1 text-sm text-[var(--secondary)]">
                  <li>
                    <code className="text-[var(--accent-purple)]">CLAUDE_CODE_UNDERCOVER=1</code>{" "}
                    — 强制开启
                  </li>
                  <li>默认 AUTO：仓库 remote 不在内部白名单中时自动激活</li>
                  <li>没有强制关闭选项（安全设计）</li>
                </ul>
              </div>
              <div className="p-4 rounded-lg bg-[var(--accent-orange)]/5">
                <h5 className="font-bold mb-2 text-[var(--accent-orange)]">
                  🛡️ 保护内容
                </h5>
                <ul className="space-y-1 text-sm text-[var(--secondary)]">
                  <li>模型代号（不告诉模型它是什么模型）</li>
                  <li>内部项目名称和代号</li>
                  <li>Anthropic 内部信息</li>
                  <li>commit/PR 中的归属标记</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-[var(--accent-purple)]/5 border border-[var(--accent-purple)]/20">
              <p className="text-sm text-[var(--secondary)]">
                💡 了解更多 Undercover 模式的实际应用，请访问{" "}
                <Link
                  href="/buddy"
                  className="text-[var(--accent-purple)] hover:underline font-medium"
                >
                  /buddy 页面
                </Link>
                。
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 远程权限桥接 */}
      <section className="mb-16">
        <SectionTitle
          title="远程权限桥接"
          subtitle="Remote Permission Bridge"
        />
        <ScrollReveal>
          <CodeBlock
            code={`// remote/remotePermissionBridge.ts

// 当工具在远程 CCR 容器中执行时，本地 CLI 需要处理权限请求。
// 由于本地没有真实的 AssistantMessage，需要创建合成消息。

function createSyntheticAssistantMessage(
  request: SDKControlPermissionRequest,
  requestId: string,
): AssistantMessage {
  return {
    type: 'assistant',
    message: {
      role: 'assistant',
      content: [{
        type: 'tool_use',
        id: request.tool_use_id,
        name: request.tool_name,
        input: request.input,
      }],
    },
    // ...
  }
}

// 对于本地未知的远程工具（如 MCP 工具），创建工具存根
function createToolStub(toolName: string): Tool {
  return {
    name: toolName,
    needsPermissions: () => true,
    isReadOnly: () => false,
    // ...
  }
}`}
            language="typescript"
          />
        </ScrollReveal>
      </section>

      {/* 权限决策流程代码 */}
      <section className="mb-16">
        <SectionTitle
          title="Accept Edits 模式验证"
          subtitle="modeValidation.ts — 基于模式的命令验证"
        />
        <ScrollReveal>
          <CodeBlock
            code={`// tools/BashTool/modeValidation.ts

// Accept Edits 模式下自动允许的文件系统命令
const ACCEPT_EDITS_ALLOWED_COMMANDS = [
  'mkdir', 'touch', 'rm', 'rmdir', 'mv', 'cp', 'sed',
] as const

function validateCommandForMode(
  cmd: string,
  toolPermissionContext: ToolPermissionContext,
): PermissionResult {
  const [baseCmd] = cmd.trim().split(/\\s+/)

  // Accept Edits 模式 → 自动允许文件系统操作
  if (
    toolPermissionContext.mode === 'acceptEdits' &&
    isFilesystemCommand(baseCmd)
  ) {
    return {
      behavior: 'allow',
      updatedInput: { command: cmd },
      decisionReason: { type: 'mode', mode: 'acceptEdits' },
    }
  }

  // Bypass 模式在主权限流中处理
  return { behavior: 'passthrough' }
}`}
            language="typescript"
          />
        </ScrollReveal>
      </section>
    </ModuleLayout>
  );
}
