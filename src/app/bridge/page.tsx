import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function BridgePage() {
  const relatedModules = [
    {
      title: "Ink 渲染引擎",
      href: "/ink",
      description: "终端 UI 框架",
      icon: "🖊️",
    },
    {
      title: "插件系统",
      href: "/plugins",
      description: "扩展机制",
      icon: "🔌",
    },
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构",
      icon: "🏗️",
    },
  ];

  return (
    <ModuleLayout
      title="Bridge 桥接系统"
      subtitle="CLI ↔ IDE 双向通信 —— 通过 WebSocket 实现 Claude Code 与 VS Code、JetBrains 等 IDE 的实时桥接"
      icon="🌉"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: Bridge 概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Bridge 架构概述"
            subtitle="连接 CLI 与 IDE 的双向通信桥梁"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Bridge 是 Claude Code 的核心通信层，实现了{" "}
              <strong className="text-[var(--text-primary)]">
                CLI 进程 ↔ IDE 插件
              </strong>{" "}
              之间的双向实时通信。它基于 WebSocket 协议，支持消息转发、权限审批、会话管理等关键功能，
              让开发者可以在 IDE 中远程操控 Claude Code 会话。
            </p>
            <p>
              Bridge 系统由三大核心模块组成：{" "}
              <strong className="text-[var(--text-primary)]">bridge/</strong>（核心桥接逻辑）、
              <strong className="text-[var(--text-primary)]">remote/</strong>（远程会话管理）、
              <strong className="text-[var(--text-primary)]">server/</strong>（直连模式服务端）。
              三者协同工作，支撑 Remote Control、Direct Connect、CCR Mirror 等多种运行模式。
            </p>
          </div>

          <ArchitectureDiagram
            title="Bridge 双向通信架构"
            nodes={[
              { id: "ide", label: "IDE 插件\n(VS Code / JetBrains)", x: 30, y: 20, color: "var(--accent-purple)" },
              { id: "anthropic", label: "Anthropic API\n(Claude.ai)", x: 270, y: 20, color: "var(--accent-blue)" },
              { id: "bridge", label: "Bridge Core\n(双向转发)", x: 150, y: 110, color: "var(--accent-cyan)" },
              { id: "ws", label: "WebSocket\n会话管理", x: 30, y: 200, color: "var(--accent-green)" },
              { id: "sdk-adapter", label: "SDK 消息\n适配器", x: 270, y: 200, color: "var(--accent-cyan)" },
              { id: "cli", label: "Claude CLI\n进程", x: 150, y: 290, color: "var(--accent-purple)" },
              { id: "permissions", label: "权限审批\n控制流", x: 400, y: 110, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "ide", to: "bridge", label: "WebSocket" },
              { from: "bridge", to: "anthropic", label: "HTTP/WS" },
              { from: "bridge", to: "ws" },
              { from: "bridge", to: "sdk-adapter" },
              { from: "ws", to: "cli" },
              { from: "sdk-adapter", to: "cli" },
              { from: "anthropic", to: "permissions" },
              { from: "permissions", to: "bridge" },
            ]}
            width={600}
            height={360}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: 协议层栈 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="协议层栈"
            subtitle="从传输层到应用层的四层架构"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Bridge 系统采用分层架构设计，每层负责不同的通信职责：
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "传输层",
                subtitle: "Transport Layer",
                items: ["WebSocket (SSE/WS)", "HTTP POST 批量写入", "Ping/Pong 心跳"],
                color: "var(--accent-green)",
              },
              {
                title: "会话层",
                subtitle: "Session Layer",
                items: ["会话创建与生命周期", "JWT 认证与刷新", "Epoch 版本控制"],
                color: "var(--accent-blue)",
              },
              {
                title: "消息层",
                subtitle: "Message Layer",
                items: ["SDK 消息协议", "控制请求/响应", "UUID 去重"],
                color: "var(--accent-purple)",
              },
              {
                title: "应用层",
                subtitle: "Application Layer",
                items: ["权限审批流", "消息适配与转换", "状态上报"],
                color: "var(--accent-cyan)",
              },
            ].map((layer) => (
              <div
                key={layer.title}
                className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5"
              >
                <h4 className="text-lg font-bold text-[var(--text-primary)]">{layer.title}</h4>
                <p className="text-xs text-[var(--text-tertiary)] mb-3">{layer.subtitle}</p>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  {layer.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: WebSocket 会话管理 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="WebSocket 会话管理"
            subtitle="SessionsWebSocket 与 RemoteSessionManager"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="text-[var(--accent-cyan)]">SessionsWebSocket</code> 是底层 WebSocket 客户端，
              负责与 <code className="text-[var(--accent-blue)]">/v1/sessions/ws/{'{'}id{'}'}/subscribe</code> 端点建立持久连接。
              它支持自动重连（最多 5 次，2s 间隔）、Ping/Pong 心跳（30s 间隔），
              以及对 4001（会话未找到）等瞬态错误的有限重试。
            </p>
            <p>
              <code className="text-[var(--accent-cyan)]">RemoteSessionManager</code> 在 WebSocket 之上构建了会话管理层，
              处理 SDK 消息分发、权限请求审批（control_request → control_response），
              以及通过 HTTP POST 发送用户消息。它维护一个待处理权限请求的 Map，
              支持 allow/deny 两种响应行为。
            </p>
          </div>

          <CodeBlock
            filename="SessionsWebSocket.ts"
            language="typescript"
            code={`const RECONNECT_DELAY_MS = 2000
const MAX_RECONNECT_ATTEMPTS = 5
const PING_INTERVAL_MS = 30000
const MAX_SESSION_NOT_FOUND_RETRIES = 3

// 永久关闭码 - 立即停止重连
const PERMANENT_CLOSE_CODES = new Set([4003]) // unauthorized

class SessionsWebSocket {
  private reconnectAttempts = 0
  private sessionNotFoundRetries = 0

  private handleClose(closeCode: number): void {
    // 永久关闭码：服务端已结束会话
    if (PERMANENT_CLOSE_CODES.has(closeCode)) return

    // 4001 可能是瞬态的（压缩期间）
    if (closeCode === 4001 && this.sessionNotFoundRetries <= MAX_SESSION_NOT_FOUND_RETRIES) {
      this.sessionNotFoundRetries++
      this.scheduleReconnect(RECONNECT_DELAY_MS * this.sessionNotFoundRetries)
      return
    }

    // 普通重连逻辑
    if (this.reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      this.reconnectAttempts++
      this.scheduleReconnect(RECONNECT_DELAY_MS)
    }
  }
}`}
          />
        </section>
      </ScrollReveal>

      {/* Section 4: SDK 消息适配器 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="SDK 消息适配器"
            subtitle="sdkMessageAdapter —— 连接 CCR 与 REPL 的桥梁"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="text-[var(--accent-cyan)]">sdkMessageAdapter</code> 负责
              CCR（Claude Code Remote）后端发送的 SDK 格式消息与 REPL 内部 Message 类型之间的双向转换。
              它处理 8 种消息类型的转换：
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { type: "assistant", target: "AssistantMessage", note: "AI 回复" },
              { type: "stream_event", target: "StreamEvent", note: "流式分块" },
              { type: "result", target: "SystemMessage", note: "会话结果" },
              { type: "system", target: "SystemMessage", note: "初始化/状态" },
              { type: "tool_progress", target: "SystemMessage", note: "工具进度" },
              { type: "compact_boundary", target: "SystemMessage", note: "压缩边界" },
              { type: "user (tool_result)", target: "UserMessage", note: "工具结果" },
              { type: "status", target: "SystemMessage", note: "状态变更" },
            ].map((item) => (
              <div
                key={item.type}
                className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--card)] px-4 py-3"
              >
                <span className="text-xs font-mono text-[var(--accent-cyan)] bg-[var(--bg)] px-2 py-1 rounded">
                  {item.type}
                </span>
                <span className="text-[var(--text-tertiary)]">→</span>
                <span className="text-sm text-[var(--text-primary)]">{item.target}</span>
                <span className="ml-auto text-xs text-[var(--text-tertiary)]">{item.note}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <CodeBlock
              filename="sdkMessageAdapter.ts"
              language="typescript"
              code={`export function convertSDKMessage(
  msg: SDKMessage,
  opts?: ConvertOptions,
): ConvertedMessage {
  switch (msg.type) {
    case 'assistant':
      return { type: 'message', message: convertAssistantMessage(msg) }
    case 'stream_event':
      return { type: 'stream_event', event: convertStreamEvent(msg) }
    case 'result':
      // 仅显示错误结果，成功结果在多轮会话中是噪音
      return msg.subtype !== 'success'
        ? { type: 'message', message: convertResultMessage(msg) }
        : { type: 'ignored' }
    case 'user': {
      // 工具结果需要转换为本地渲染格式
      if (opts?.convertToolResults && isToolResult(msg)) {
        return { type: 'message', message: createUserMessage(msg) }
      }
      return { type: 'ignored' } // 用户消息已由 REPL 本地添加
    }
    // ... 其他类型处理
  }
}`}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 消息协议格式 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="消息协议格式"
            subtitle="控制请求、权限审批与 SDK 消息流"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Bridge 协议定义了三种核心消息类型：<strong className="text-[var(--text-primary)]">SDKMessage</strong>（会话数据）、
              <strong className="text-[var(--text-primary)]">ControlRequest</strong>（服务端控制请求）和
              <strong className="text-[var(--text-primary)]">ControlResponse</strong>（客户端控制响应）。
              权限审批流是 Bridge 最关键的交互：当 Claude 需要使用工具时，
              通过 control_request 发送给 IDE 端用户审批，用户通过 control_response 回复 allow 或 deny。
            </p>
          </div>

          <CodeFlow
            title="权限审批流程"
            steps={[
              { code: "// Claude 请求工具权限\ncontrol_request: can_use_tool", highlight: [1], description: "Claude 请求工具" },
              { code: "// Bridge 转发到 IDE\nWebSocket → IDE 插件", highlight: [1], description: "Bridge 转发" },
              { code: "// 用户审批\nallow / deny + updatedInput", highlight: [1], description: "用户审批" },
              { code: "// IDE 回复响应\ncontrol_response: success", highlight: [1], description: "IDE 回复" },
              { code: "// Claude 继续执行\n使用工具或跳过", highlight: [1], description: "Claude 继续" },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <CodeBlock
              filename="controlTypes.ts - Request"
              language="typescript"
              code={`interface SDKControlRequest {
  type: 'control_request'
  request_id: string        // UUID
  request: {
    subtype: 'can_use_tool'
    tool_name: string       // "Read" | "Write" | ...
    input: Record<string, unknown>
    tool_use_id: string
  }
}`}
            />
            <CodeBlock
              filename="controlTypes.ts - Response"
              language="typescript"
              code={`interface SDKControlResponse {
  type: 'control_response'
  response: {
    subtype: 'success' | 'error'
    request_id: string
    response?: {
      behavior: 'allow' | 'deny'
      updatedInput?: Record<string, unknown>
      message?: string
    }
    error?: string
  }
}`}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: Direct Connect 模式 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Direct Connect 直连模式"
            subtitle="无中间层 —— IDE 直连 Claude CLI 进程"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <strong className="text-[var(--text-primary)]">Direct Connect</strong> 是一种轻量级连接模式，
              IDE 直接与本地 Claude CLI 进程通信，无需经过 Anthropic 云端中转。
              通过 <code className="text-[var(--accent-cyan)]">createDirectConnectSession()</code> 创建会话，
              CLI 作为子进程以 <code className="text-[var(--accent-blue)]">--input-format stream-json</code> 模式运行，
              通过 stdin/stdout 进行结构化 JSON 消息交换。
            </p>
            <p>
              与 CCR 模式不同，Direct Connect 的会话管理由本地{" "}
              <code className="text-[var(--accent-cyan)]">DirectConnectSessionManager</code> 负责，
              支持 auth token 认证、中断信号发送和权限响应。服务端支持多会话管理、
              空闲超时和 Unix Socket 绑定。
            </p>
          </div>

          <CodeBlock
            filename="createDirectConnectSession.ts"
            language="typescript"
            code={`// POST \${serverUrl}/sessions
async function createDirectConnectSession({
  serverUrl, authToken, cwd, dangerouslySkipPermissions
}): Promise<{ config: DirectConnectConfig; workDir?: string }> {
  const resp = await fetch(\`\${serverUrl}/sessions\`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(authToken ? { authorization: \`Bearer \${authToken}\` } : {}),
    },
    body: JSON.stringify({ cwd, ...(dangerouslySkipPermissions && {
      dangerously_skip_permissions: true,
    })}),
  })

  const data = connectResponseSchema().parse(await resp.json())
  // data: { session_id, ws_url, work_dir? }
  return { config: { serverUrl, sessionId, wsUrl, authToken }, workDir }
}`}
          />
        </section>
      </ScrollReveal>

      {/* Section 7: 传输层抽象 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="传输层抽象"
            subtitle="ReplBridgeTransport —— v1/v2 传输协议的统一接口"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="text-[var(--accent-cyan)]">ReplBridgeTransport</code> 定义了统一的传输接口，
              抽象了 v1（HybridTransport：WS 读取 + POST 写入）和 v2（SSETransport 读取 + CCRClient 写入）两种协议的差异。
              这让上层的 bridgeMessaging 逻辑无需关心底层传输实现。
            </p>
          </div>

          <ArchitectureDiagram
            title="双协议传输架构"
            nodes={[
              { id: "bridge-msg", label: "bridgeMessaging\n(统一逻辑层)", x: 175, y: 20, color: "var(--accent-cyan)" },
              { id: "transport-if", label: "ReplBridgeTransport\n(接口)", x: 175, y: 100, color: "var(--accent-blue)" },
              { id: "v1", label: "v1: HybridTransport\nWS 读 + POST 写", x: 50, y: 190, color: "var(--accent-purple)" },
              { id: "v2", label: "v2: SSE + CCRClient\nSSE 读 + POST 写", x: 320, y: 190, color: "var(--accent-green)" },
              { id: "v2-sse", label: "SSETransport", x: 230, y: 270, color: "var(--accent-green)" },
              { id: "v2-ccr", label: "CCRClient", x: 410, y: 270, color: "var(--accent-green)" },
            ]}
            edges={[
              { from: "bridge-msg", to: "transport-if" },
              { from: "transport-if", to: "v1", label: "createV1" },
              { from: "transport-if", to: "v2", label: "createV2" },
              { from: "v2", to: "v2-sse" },
              { from: "v2", to: "v2-ccr" },
            ]}
            width={560}
            height={330}
          />

          <div className="mt-6">
            <CodeBlock
              filename="replBridgeTransport.ts"
              language="typescript"
              code={`export type ReplBridgeTransport = {
  // 写入
  write(message: StdoutMessage): Promise<void>
  writeBatch(messages: StdoutMessage[]): Promise<void>
  // 生命周期
  connect(): void
  close(): void
  flush(): Promise<void>
  // 状态
  isConnectedStatus(): boolean
  getStateLabel(): string
  getLastSequenceNum(): number   // SSE seq 高水位
  // 回调
  setOnData(callback: (data: string) => void): void
  setOnClose(callback: (closeCode?: number) => void): void
  setOnConnect(callback: () => void): void
  // v2 专属
  reportState(state: SessionState): void     // PUT /worker state
  reportMetadata(metadata: Record<string, unknown>): void
  reportDelivery(eventId: string, status: 'processing' | 'processed'): void
}`}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 8: 多 IDE 适配器 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="多 IDE 适配器示意图"
            subtitle="同一 Bridge 核心，多种 IDE 前端"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Bridge 核心协议与 IDE 前端完全解耦。VS Code 和 JetBrains 等不同 IDE 的插件，
              都通过相同的 WebSocket 端点和消息协议与 Claude CLI 通信。
              SDK 消息适配器确保各 IDE 接收到统一格式的消息流。
            </p>
          </div>

          <ArchitectureDiagram
            title="多 IDE 适配架构"
            nodes={[
              { id: "vscode", label: "VS Code\nExtension", x: 20, y: 20, color: "var(--accent-blue)" },
              { id: "jetbrains", label: "JetBrains\nPlugin", x: 170, y: 20, color: "var(--accent-purple)" },
              { id: "claudeai", label: "Claude.ai\nWeb", x: 320, y: 20, color: "var(--accent-green)" },
              { id: "sdk-proto", label: "SDK 消息协议\n(统一格式)", x: 170, y: 110, color: "var(--accent-cyan)" },
              { id: "bridge-api", label: "Bridge API\n/bridge 端点", x: 170, y: 200, color: "var(--accent-cyan)" },
              { id: "session-mgr", label: "RemoteSession\nManager", x: 20, y: 290, color: "var(--accent-blue)" },
              { id: "direct-conn", label: "DirectConnect\nManager", x: 320, y: 290, color: "var(--accent-green)" },
              { id: "cli", label: "Claude CLI\n进程", x: 170, y: 380, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "vscode", to: "sdk-proto" },
              { from: "jetbrains", to: "sdk-proto" },
              { from: "claudeai", to: "sdk-proto" },
              { from: "sdk-proto", to: "bridge-api" },
              { from: "bridge-api", to: "session-mgr", label: "CCR" },
              { from: "bridge-api", to: "direct-conn", label: "Local" },
              { from: "session-mgr", to: "cli" },
              { from: "direct-conn", to: "cli" },
            ]}
            width={510}
            height={430}
          />
        </section>
      </ScrollReveal>

      {/* Section 9: Bridge 生命周期 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Bridge 生命周期"
            subtitle="从环境注册到会话归档的完整流程"
          />
          <CodeFlow
            title="Env-based Bridge 生命周期"
            steps={[
              { code: "// 1. 注册环境\nPOST /v1/environments/bridge → environment_id", highlight: [1], description: "注册环境" },
              { code: "// 2. 轮询工作\nGET /work/poll → WorkResponse", highlight: [1], description: "轮询工作" },
              { code: "// 3. 确认任务\nPOST /work/{id}/ack", highlight: [1], description: "确认任务" },
              { code: "// 4. 建立传输\ncreateV1/V2ReplTransport → WS/SSE", highlight: [1], description: "建立传输" },
              { code: "// 5. 双向通信\n消息转发 + 权限审批 + 心跳", highlight: [1], description: "双向通信" },
              { code: "// 6. 会话结束\nsendResult() → archiveSession()", highlight: [1], description: "会话结束" },
              { code: "// 7. 注销环境\nDELETE /v1/environments/bridge/{id}", highlight: [1], description: "注销环境" },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Section 10: 核心数据结构 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="核心数据结构"
            subtitle="BridgeConfig、WorkResponse 与 SessionHandle"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CodeBlock
              filename="bridge/types.ts"
              language="typescript"
              code={`export type BridgeConfig = {
  dir: string               // 工作目录
  machineName: string       // 机器标识
  branch: string            // Git 分支
  gitRepoUrl: string | null
  maxSessions: number       // 最大并发会话
  spawnMode: SpawnMode      // single-session | worktree | same-dir
  bridgeId: string          // 实例 UUID
  workerType: string        // claude_code | claude_code_assistant
  environmentId: string     // 幂等注册 ID
  apiBaseUrl: string
  sessionIngressUrl: string
}`}
            />
            <CodeBlock
              filename="bridge/types.ts"
              language="typescript"
              code={`export type WorkResponse = {
  id: string                // 工作 ID
  type: 'work'
  environment_id: string    // 环境 ID
  state: string             // 工作状态
  data: WorkData            // { type: 'session', id: sessionId }
  secret: string            // base64url JWT (含 token + sources)
  created_at: string        // ISO 时间戳
}

export type SpawnMode =
  | 'single-session'   // 单会话，结束即销毁
  | 'worktree'         // 每个会话独立 git worktree
  | 'same-dir'         // 共享工作目录`}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 11: UUID 去重与消息过滤 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="UUID 去重与消息过滤"
            subtitle="BoundedUUIDSet —— 防止消息回显和重复投递"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Bridge 的一个关键挑战是{" "}
              <strong className="text-[var(--text-primary)]">消息回显去重</strong>：
              本地发送的消息会通过服务器 WebSocket 回来。Bridge 使用两个{" "}
              <code className="text-[var(--accent-cyan)]">BoundedUUIDSet</code>（环形缓冲区 + HashSet）
              来过滤：recentPostedUUIDs 过滤自己发送的消息回显，
              recentInboundUUIDs 防止服务器重放的历史消息被重复投递。
            </p>
          </div>

          <CodeBlock
            filename="bridge/boundedUUIDSet.ts"
            language="typescript"
            code={`export class BoundedUUIDSet {
  private readonly capacity: number
  private readonly ring: (string | undefined)[]
  private readonly set = new Set<string>()
  private writeIdx = 0

  add(uuid: string): void {
    if (this.set.has(uuid)) return
    // 淘汰最旧的条目
    const evicted = this.ring[this.writeIdx]
    if (evicted !== undefined) this.set.delete(evicted)
    this.ring[this.writeIdx] = uuid
    this.set.add(uuid)
    this.writeIdx = (this.writeIdx + 1) % this.capacity
  }

  has(uuid: string): boolean {
    return this.set.has(uuid)
  }
}`}
          />
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
