import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeFlow } from "@/components/CodeFlow";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function QueryEnginePage() {
  const relatedModules = [
    {
      title: "工具系统",
      href: "/tools",
      description: "工具调用与执行",
      icon: "🔧",
    },
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构概览",
      icon: "🏗️",
    },
    {
      title: "入口点",
      href: "/entry",
      description: "Claude Code 启动流程",
      icon: "🚪",
    },
    {
      title: "命令系统",
      href: "/commands",
      description: "CLI 命令与斜杠命令",
      icon: "⌨️",
    },
  ];

  // The 8 core steps of the query loop, extracted from query.ts
  const queryLoopSteps = [
    {
      code: `// query.ts — queryLoop entry
async function* queryLoop(params: QueryParams) {
  const budgetTracker = feature('TOKEN_BUDGET') 
    ? createBudgetTracker() : null
  const config = buildQueryConfig()

  // Fire-and-forget memory prefetch
  using pendingMemoryPrefetch = 
    startRelevantMemoryPrefetch(messages, toolUseContext)

  while (true) {`,
      highlight: [2, 3, 7, 8],
      description:
        "Step 1: 初始化 — 创建 BudgetTracker、快照 QueryConfig（session ID、feature gates）、启动异步内存预取",
    },
    {
      code: `// Snip: remove stale zombie markers
if (feature('HISTORY_SNIP')) {
  const snipResult = snipModule.snipCompactIfNeeded(messagesForQuery)
  messagesForQuery = snipResult.messages
  snipTokensFreed = snipResult.tokensFreed
}

// Microcompact: remove redundant tool results
const microcompactResult = await deps.microcompact(
  messagesForQuery, toolUseContext, querySource
)
messagesForQuery = microcompactResult.messages`,
      highlight: [2, 3, 4, 8, 9, 10],
      description:
        "Step 2: 上下文压缩 — 依次执行 Snip（移除僵尸标记）、Microcompact（去除冗余工具结果）、Context Collapse（细粒度摘要）",
    },
    {
      code: `// Autocompact: full conversation summarization
const { compactionResult } = await deps.autocompact(
  messagesForQuery, toolUseContext,
  { systemPrompt, userContext, systemContext, toolUseContext,
    forkContextMessages: messagesForQuery },
  querySource, tracking, snipTokensFreed
)

if (compactionResult) {
  const postCompactMessages = 
    buildPostCompactMessages(compactionResult)
  messagesForQuery = postCompactMessages
}`,
      highlight: [2, 3, 7, 8, 9],
      description:
        "Step 3: 自动压缩 — 当 token 超过阈值时，将整段对话摘要为 compact_boundary 消息，释放上下文窗口",
    },
    {
      code: `// Blocking limit check (skip if compact just ran)
if (!compactionResult && querySource !== 'compact') {
  const { isAtBlockingLimit } = calculateTokenWarningState(
    tokenCountWithEstimation(messagesForQuery) - snipTokensFreed,
    toolUseContext.options.mainLoopModel
  )
  if (isAtBlockingLimit) {
    yield createAssistantAPIErrorMessage({
      content: PROMPT_TOO_LONG_ERROR_MESSAGE,
      error: 'invalid_request'
    })
    return { reason: 'blocking_limit' }
  }
}`,
      highlight: [2, 3, 4, 5, 6, 10],
      description:
        "Step 4: 阻塞检查 — 如果上下文超过硬性上限且自动压缩未运行，直接报错退出，保留手动 /compact 空间",
    },
    {
      code: `// Call Claude API with streaming
for await (const message of deps.callModel({
  messages: prependUserContext(messagesForQuery, userContext),
  systemPrompt: fullSystemPrompt,
  thinkingConfig: toolUseContext.options.thinkingConfig,
  tools: toolUseContext.options.tools,
  signal: toolUseContext.abortController.signal,
  options: { model: currentModel, fallbackModel, taskBudget }
})) {
  // Yield streaming events to consumers
  yield message
  if (message.type === 'assistant') {
    assistantMessages.push(message)
    // Collect tool_use blocks
    const toolUseBlocks = message.message.content
      .filter(c => c.type === 'tool_use')
    if (toolUseBlocks.length > 0) needsFollowUp = true
  }
}`,
      highlight: [2, 3, 4, 5, 6, 7, 11, 12, 14, 15, 16, 17],
      description:
        "Step 5: 调用 Claude API — 流式请求 Claude 模型，收集 assistant 消息和 tool_use 块，检测是否需要后续工具执行",
    },
    {
      code: `// Execute tools (streaming or batch)
const toolUpdates = streamingToolExecutor
  ? streamingToolExecutor.getRemainingResults()
  : runTools(toolUseBlocks, assistantMessages, 
      canUseTool, toolUseContext)

for await (const update of toolUpdates) {
  if (update.message) {
    yield update.message
    toolResults.push(
      ...normalizeMessagesForAPI([update.message], tools)
        .filter(_ => _.type === 'user')
    )
  }
}`,
      highlight: [2, 3, 4, 6, 7, 8, 9],
      description:
        "Step 6: 执行工具 — StreamingToolExecutor 并行执行只读工具，runTools 串行执行写操作，收集 tool_result",
    },
    {
      code: `// Attach file changes, memory, queued commands
for await (const attachment of getAttachmentMessages(
  null, updatedToolUseContext, null, queuedCommandsSnapshot,
  [...messagesForQuery, ...assistantMessages, ...toolResults],
  querySource
)) {
  yield attachment
  toolResults.push(attachment)
}

// Inject prefetched memory & skill discovery
// Check maxTurns limit
if (maxTurns && nextTurnCount > maxTurns) {
  yield createAttachmentMessage({ 
    type: 'max_turns_reached', maxTurns, turnCount 
  })
  return { reason: 'max_turns' }
}`,
      highlight: [2, 3, 4, 12, 13, 14, 15, 16],
      description:
        "Step 7: 附件注入 — 注入文件变更通知、内存附件、队列命令，检查 maxTurns 上限，准备下一轮递归",
    },
    {
      code: `// Stop hooks: execute post-turn checks
const stopHookResult = yield* handleStopHooks(
  messagesForQuery, assistantMessages,
  systemPrompt, userContext, systemContext,
  toolUseContext, querySource, stopHookActive
)

if (stopHookResult.preventContinuation) 
  return { reason: 'stop_hook_prevented' }
if (stopHookResult.blockingErrors.length > 0) {
  // Inject blocking errors and retry
  state = { messages: [...messagesForQuery, ...assistantMessages, 
    ...stopHookResult.blockingErrors], ... }
  continue
}

// Token budget check
if (feature('TOKEN_BUDGET')) {
  const decision = checkTokenBudget(budgetTracker, ...)
  if (decision.action === 'continue') { /* inject nudge */ }
  if (decision.completionEvent) { /* log and stop */ }
}

return { reason: 'completed' }`,
      highlight: [2, 3, 4, 7, 8, 12, 13, 14, 17, 18, 19],
      description:
        "Step 8: 终止检查 — 执行 stop hooks（后台钩子）、检查 token budget（90% 阈值继续或边际递减停止），最终返回 completed",
    },
  ];

  return (
    <ModuleLayout
      title="QueryEngine 核心循环"
      subtitle="Claude Code 的心脏 —— query() 无限循环如何驱动 AI 推理、工具执行与上下文管理"
      icon="💓"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: QueryEngine 概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="QueryEngine 概述"
            subtitle="驱动 Claude Code 的核心引擎"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              QueryEngine 是 Claude Code 最核心的类。它拥有整个查询生命周期和会话状态，
              每次 <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">submitMessage()</code>{" "}
              调用启动一个新的 turn，而内部的 <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">query()</code>{" "}
              函数通过 <strong className="text-[var(--text-primary)]">while(true) 无限循环</strong> 实现多轮工具调用。
            </p>
            <p>
              架构上分为两层：<strong className="text-[var(--text-primary)]">QueryEngine 类</strong>（会话管理、消息持久化、SDK 适配）
              和 <strong className="text-[var(--text-primary)]">query() 函数</strong>（纯推理循环、上下文压缩、工具执行）。
              依赖通过 <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">QueryDeps</code> 注入，便于测试。
            </p>
          </div>

          <ArchitectureDiagram
            title="QueryEngine 两层架构"
            nodes={[
              { id: "qe", label: "QueryEngine", x: 250, y: 20, color: "var(--accent-purple)" },
              { id: "submit", label: "submitMessage()", x: 80, y: 100, color: "var(--accent-cyan)" },
              { id: "sysprompt", label: "fetchSystemPrompt()", x: 380, y: 100, color: "var(--accent-cyan)" },
              { id: "procinput", label: "processUserInput()", x: 80, y: 180, color: "var(--accent-blue)" },
              { id: "query", label: "query() while(true)", x: 250, y: 250, color: "var(--accent-purple)" },
              { id: "hooks", label: "handleStopHooks()", x: 450, y: 250, color: "var(--accent-blue)" },
              { id: "model", label: "callModel()", x: 100, y: 330, color: "var(--accent-cyan)" },
              { id: "tools", label: "runTools()", x: 280, y: 330, color: "var(--accent-cyan)" },
              { id: "compact", label: "autocompact()", x: 450, y: 330, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "qe", to: "submit", label: "" },
              { from: "qe", to: "sysprompt", label: "" },
              { from: "submit", to: "procinput", label: "" },
              { from: "procinput", to: "query", label: "" },
              { from: "query", to: "model", label: "stream" },
              { from: "query", to: "tools", label: "execute" },
              { from: "query", to: "compact", label: "if needed" },
              { from: "query", to: "hooks", label: "end_turn" },
              { from: "hooks", to: "query", label: "retry" },
            ]}
            width={620}
            height={380}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: 8 步执行流程动画 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="8 步执行流程"
            subtitle="query() 循环的完整生命周期"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              以下是 <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">queryLoop()</code>{" "}
              每次迭代执行的 8 个核心步骤。点击自动播放可观看完整流程动画。
            </p>
          </div>

          <CodeFlow
            title="query() 核心循环 — 8 步流程"
            steps={queryLoopSteps}
            language="typescript"
          />
        </section>
      </ScrollReveal>

      {/* Section 3: 执行流程全景图 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="执行流程全景图"
            subtitle="从用户输入到最终结果的完整数据流"
          />

          <ArchitectureDiagram
            title="QueryEngine 完整执行流程图"
            nodes={[
              // Top: User input
              { id: "user", label: "👤 用户输入", x: 250, y: 10, color: "var(--accent-cyan)" },
              // QueryEngine layer
              { id: "qe2", label: "QueryEngine.submitMessage()", x: 250, y: 70, color: "var(--accent-purple)" },
              { id: "proc", label: "processUserInput()", x: 250, y: 125, color: "var(--accent-blue)" },
              // query loop
              { id: "loop", label: "query() while(true)", x: 250, y: 185, color: "var(--accent-purple)" },
              // Left branch: context management
              { id: "snip", label: "Snip", x: 50, y: 250, color: "var(--accent-cyan)" },
              { id: "micro", label: "Microcompact", x: 50, y: 305, color: "var(--accent-cyan)" },
              { id: "auto", label: "Autocompact", x: 50, y: 360, color: "var(--accent-blue)" },
              // Center: API call
              { id: "api", label: "Claude API\n(streaming)", x: 250, y: 270, color: "var(--accent-purple)" },
              { id: "resp", label: "assistant +\ntool_use", x: 250, y: 340, color: "var(--accent-cyan)" },
              // Right: tool execution
              { id: "tool", label: "runTools() /\nStreamingExecutor", x: 460, y: 270, color: "var(--accent-blue)" },
              { id: "tresult", label: "tool_results", x: 460, y: 340, color: "var(--accent-cyan)" },
              // Bottom: termination
              { id: "stop", label: "Stop Hooks", x: 160, y: 415, color: "var(--accent-purple)" },
              { id: "budget", label: "Token Budget", x: 340, y: 415, color: "var(--accent-blue)" },
              { id: "result", label: "✅ result", x: 250, y: 470, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "user", to: "qe2", label: "" },
              { from: "qe2", to: "proc", label: "" },
              { from: "proc", to: "loop", label: "" },
              { from: "loop", to: "snip", label: "压缩" },
              { from: "snip", to: "micro", label: "" },
              { from: "micro", to: "auto", label: "" },
              { from: "loop", to: "api", label: "调用" },
              { from: "api", to: "resp", label: "" },
              { from: "resp", to: "tool", label: "tool_use" },
              { from: "tool", to: "tresult", label: "" },
              { from: "tresult", to: "loop", label: "递归" },
              { from: "loop", to: "stop", label: "end_turn" },
              { from: "loop", to: "budget", label: "检查" },
              { from: "stop", to: "result", label: "" },
              { from: "budget", to: "result", label: "" },
            ]}
            width={580}
            height={510}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "初始化阶段",
                items: ["创建 BudgetTracker 和 QueryConfig", "启动内存预取 (pendingMemoryPrefetch)", "初始化 StreamingToolExecutor"],
                color: "var(--accent-cyan)",
              },
              {
                title: "上下文管理",
                items: ["Snip — 移除过期的僵尸标记", "Microcompact — 去除冗余工具结果", "Autocompact — 全量对话摘要压缩"],
                color: "var(--accent-blue)",
              },
              {
                title: "推理与执行",
                items: ["流式调用 Claude API", "收集 assistant 消息和 tool_use 块", "并行/串行执行工具调用"],
                color: "var(--accent-purple)",
              },
              {
                title: "终止与检查",
                items: ["Stop Hooks — 后台钩子检查", "Token Budget — 90% 阈值/边际递减", "maxTurns / maxBudgetUsd 限制"],
                color: "var(--accent-cyan)",
              },
            ].map((group) => (
              <div
                key={group.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 rounded-full" style={{ background: group.color }} />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">{group.title}</h5>
                </div>
                <ul className="space-y-2">
                  {group.items.map((item, i) => (
                    <li key={i} className="text-sm text-[var(--text-secondary)] flex items-start gap-2">
                      <span className="text-[var(--accent-cyan)] mt-0.5">▸</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: Stop Hooks 中断机制 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Stop Hooks 中断机制"
            subtitle="每次 turn 结束时的钩子系统"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">handleStopHooks()</code>{" "}
              在 Claude 完成回复后执行，可以阻止循环继续（preventContinuation）或注入阻塞错误（blockingErrors）触发重试。
              它还异步触发 Prompt Suggestion、Memory Extraction、Auto Dream 等后台任务。
            </p>
            <p>
              对于 Teammate（子智能体），还会额外运行 <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">TaskCompleted</code> 和{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">TeammateIdle</code> 钩子。
            </p>
          </div>

          <ArchitectureDiagram
            title="Stop Hooks 执行流程"
            nodes={[
              { id: "end", label: "Turn 结束\n(needsFollowUp=false)", x: 240, y: 10, color: "var(--accent-purple)" },
              { id: "bg", label: "后台任务\n(async fire-and-forget)", x: 60, y: 90, color: "var(--accent-cyan)" },
              { id: "bg1", label: "PromptSuggestion", x: 10, y: 170, color: "var(--accent-cyan)" },
              { id: "bg2", label: "ExtractMemories", x: 140, y: 170, color: "var(--accent-cyan)" },
              { id: "bg3", label: "AutoDream", x: 270, y: 170, color: "var(--accent-cyan)" },
              { id: "exec", label: "executeStopHooks()", x: 420, y: 90, color: "var(--accent-purple)" },
              { id: "progress", label: "progress 消息", x: 350, y: 170, color: "var(--accent-blue)" },
              { id: "check", label: "结果检查", x: 490, y: 170, color: "var(--accent-blue)" },
              { id: "block", label: "blockingErrors\n→ continue 重试", x: 350, y: 260, color: "var(--accent-purple)" },
              { id: "prevent", label: "preventContinuation\n→ return 终止", x: 490, y: 260, color: "var(--accent-purple)" },
              { id: "pass", label: "通过 → return completed", x: 240, y: 330, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "end", to: "bg", label: "" },
              { from: "end", to: "exec", label: "" },
              { from: "bg", to: "bg1", label: "" },
              { from: "bg", to: "bg2", label: "" },
              { from: "bg", to: "bg3", label: "" },
              { from: "exec", to: "progress", label: "" },
              { from: "exec", to: "check", label: "" },
              { from: "check", to: "block", label: "有错误" },
              { from: "check", to: "prevent", label: "阻止" },
              { from: "check", to: "pass", label: "通过" },
            ]}
            width={580}
            height={360}
          />

          <div className="mt-8 space-y-4">
            {[
              {
                type: "blockingErrors",
                desc: "钩子发现需要修正的问题（如代码规范违规），注入错误消息后 continue 重试，Claude 会在下一轮修正",
                color: "var(--accent-purple)",
              },
              {
                type: "preventContinuation",
                desc: "钩子判定应该终止循环（如前置条件不满足），立即 return，不再继续推理",
                color: "var(--accent-blue)",
              },
              {
                type: "后台任务",
                desc: "PromptSuggestion（生成后续建议）、ExtractMemories（提取对话记忆）、AutoDream（自动任务生成）异步执行，不阻塞主循环",
                color: "var(--accent-cyan)",
              },
            ].map((item) => (
              <div key={item.type} className="flex gap-4 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ background: item.color }} />
                <div>
                  <code className="text-sm font-mono text-[var(--accent-cyan)]">{item.type}</code>
                  <p className="mt-1 text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: Token Budget 动态分配 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Token Budget 动态分配"
            subtitle="智能的 token 消耗控制策略"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">checkTokenBudget()</code>{" "}
              实现了双重停止条件：
            </p>
            <ul className="space-y-2 list-none">
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-cyan)]">▸</span>
                <span><strong className="text-[var(--text-primary)]">90% 阈值</strong> — 当 token 消耗达到预算的 90% 时，注入 nudge 消息提示 Claude 尽快收尾</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--accent-cyan)]">▸</span>
                <span><strong className="text-[var(--text-primary)]">边际递减检测</strong> — 连续 3 次续接后，如果每轮新增 token &lt; 500，判定为边际递减，提前终止</span>
              </li>
            </ul>
          </div>

          <ArchitectureDiagram
            title="Token Budget 决策流程"
            nodes={[
              { id: "check", label: "checkTokenBudget()", x: 240, y: 10, color: "var(--accent-purple)" },
              { id: "pct", label: "计算 pct\n= turnTokens / budget", x: 240, y: 80, color: "var(--accent-blue)" },
              { id: "dimin", label: "边际递减?\n(≥3次 & <500 tokens)", x: 80, y: 160, color: "var(--accent-cyan)" },
              { id: "thresh", label: "pct < 90%?", x: 400, y: 160, color: "var(--accent-cyan)" },
              { id: "continue", label: "✅ continue\n注入 nudge 消息", x: 400, y: 250, color: "var(--accent-cyan)" },
              { id: "stop1", label: "⏹ stop\n边际递减终止", x: 80, y: 250, color: "var(--accent-purple)" },
              { id: "stop2", label: "⏹ stop\n预算耗尽", x: 240, y: 250, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "check", to: "pct", label: "" },
              { from: "pct", to: "dimin", label: "" },
              { from: "pct", to: "thresh", label: "" },
              { from: "dimin", to: "stop1", label: "是" },
              { from: "dimin", to: "thresh", label: "否" },
              { from: "thresh", to: "continue", label: "是" },
              { from: "thresh", to: "stop2", label: "否" },
            ]}
            width={550}
            height={300}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: "COMPLETION_THRESHOLD",
                value: "0.9 (90%)",
                desc: "达到预算 90% 时注入收尾提示",
                color: "var(--accent-cyan)",
              },
              {
                label: "DIMINISHING_THRESHOLD",
                value: "500 tokens",
                desc: "每轮新增低于此值视为边际递减",
                color: "var(--accent-blue)",
              },
              {
                label: "最小续接次数",
                value: "3 次",
                desc: "至少续接 3 次后才开始检测边际递减",
                color: "var(--accent-purple)",
              },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-center">
                <div className="text-2xl font-bold" style={{ color: item.color }}>{item.value}</div>
                <div className="text-xs font-mono text-[var(--accent-cyan)] mt-1">{item.label}</div>
                <p className="text-xs text-[var(--text-secondary)] mt-2">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
            <h4 className="text-base font-semibold text-[var(--text-primary)] mb-3">BudgetTracker 状态</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm font-mono">
              {[
                { field: "continuationCount", desc: "续接计数" },
                { field: "lastDeltaTokens", desc: "上轮增量" },
                { field: "lastGlobalTurnTokens", desc: "上轮总量" },
                { field: "startedAt", desc: "起始时间" },
                { field: "pct", desc: "当前百分比" },
              ].map((item) => (
                <div key={item.field} className="p-3 rounded bg-[var(--card-bg)] border border-[var(--card-border)]">
                  <div className="text-[var(--accent-cyan)] text-xs">{item.field}</div>
                  <div className="text-[var(--text-secondary)] text-[10px] mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: 依赖注入与配置 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="依赖注入与配置"
            subtitle="QueryDeps + QueryConfig 的设计哲学"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              query() 的核心依赖通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">QueryDeps</code>{" "}
              接口注入（callModel、microcompact、autocompact、uuid），不可变配置通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">QueryConfig</code>{" "}
              在循环开始时快照。这使得测试可以直接注入 mock，无需 spyOn。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-3">
                <code className="text-[var(--accent-cyan)]">QueryDeps</code> — 可替换依赖
              </h4>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between p-2 rounded bg-[var(--card-bg)] border border-[var(--card-border)]">
                  <span className="text-[var(--accent-cyan)]">callModel</span>
                  <span className="text-[var(--text-secondary)]">queryModelWithStreaming</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--card-bg)] border border-[var(--card-border)]">
                  <span className="text-[var(--accent-cyan)]">microcompact</span>
                  <span className="text-[var(--text-secondary)]">microcompactMessages</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--card-bg)] border border-[var(--card-border)]">
                  <span className="text-[var(--accent-cyan)]">autocompact</span>
                  <span className="text-[var(--text-secondary)]">autoCompactIfNeeded</span>
                </div>
                <div className="flex justify-between p-2 rounded bg-[var(--card-bg)] border border-[var(--card-border)]">
                  <span className="text-[var(--accent-cyan)]">uuid</span>
                  <span className="text-[var(--text-secondary)]">randomUUID</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h4 className="text-base font-semibold text-[var(--text-primary)] mb-3">
                <code className="text-[var(--accent-cyan)]">QueryConfig</code> — 不可变快照
              </h4>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex justify-between p-2 rounded bg-[var(--card-bg)] border border-[var(--card-border)]">
                  <span className="text-[var(--accent-cyan)]">sessionId</span>
                  <span className="text-[var(--text-secondary)]">SessionId</span>
                </div>
                <div className="p-2 rounded bg-[var(--card-bg)] border border-[var(--card-border)]">
                  <span className="text-[var(--accent-cyan)]">gates</span>
                  <div className="mt-1 space-y-1 text-xs text-[var(--text-secondary)]">
                    <div>streamingToolExecution: boolean</div>
                    <div>emitToolUseSummaries: boolean</div>
                    <div>isAnt: boolean</div>
                    <div>fastModeEnabled: boolean</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7: 恢复机制 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="错误恢复机制"
            subtitle="Prompt-Too-Long、Max-Output-Tokens、Model Fallback"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              query() 实现了多层错误恢复策略，通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">withhold</code>{" "}
              机制暂缓错误暴露，先尝试恢复：
            </p>
          </div>

          <div className="mt-6 space-y-4">
            {[
              {
                name: "Context Collapse Drain",
                trigger: "prompt_too_long (413)",
                action: "排空所有 staged collapses，保留细粒度上下文而非全量摘要",
                color: "var(--accent-cyan)",
              },
              {
                name: "Reactive Compact",
                trigger: "prompt_too_long / media_size_error",
                action: "执行 reactive compact 压缩，单次尝试，避免死循环",
                color: "var(--accent-blue)",
              },
              {
                name: "Max Output Tokens Escalate",
                trigger: "max_output_tokens (8k cap)",
                action: "自动升级到 64k tokens 重试同一请求",
                color: "var(--accent-purple)",
              },
              {
                name: "Max Output Tokens Recovery",
                trigger: "max_output_tokens (64k also hit)",
                action: "注入恢复消息，最多重试 3 次（MAX_OUTPUT_TOKENS_RECOVERY_LIMIT）",
                color: "var(--accent-cyan)",
              },
              {
                name: "Model Fallback",
                trigger: "FallbackTriggeredError",
                action: "切换到 fallbackModel 重试，清理签名块（thinking blocks）",
                color: "var(--accent-blue)",
              },
            ].map((item) => (
              <div key={item.name} className="flex gap-4 p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
                <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1" style={{ background: item.color }} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">{item.name}</span>
                    <code className="text-xs font-mono text-[var(--accent-cyan)]">{item.trigger}</code>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 8: 消息类型与流转 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="消息类型与流转"
            subtitle="query() yield 的所有消息类型"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              query() 是一个 AsyncGenerator，通过 yield 向外推送多种消息类型。
              QueryEngine.submitMessage() 负责将这些消息转换为 SDKMessage 格式并持久化到 transcript。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { type: "assistant", desc: "Claude 的回复（含 thinking/tool_use 块）", color: "var(--accent-purple)" },
              { type: "user", desc: "工具执行结果（tool_result）", color: "var(--accent-cyan)" },
              { type: "progress", desc: "工具执行进度通知", color: "var(--accent-blue)" },
              { type: "attachment", desc: "文件变更、max_turns、structured_output", color: "var(--accent-purple)" },
              { type: "stream_event", desc: "message_start/delta/stop 事件", color: "var(--accent-cyan)" },
              { type: "system", desc: "compact_boundary、api_error、warning", color: "var(--accent-blue)" },
              { type: "tombstone", desc: "标记待移除的消息（如 fallback 清理）", color: "var(--text-secondary)" },
              { type: "stream_request_start", desc: "API 请求开始信号", color: "var(--text-secondary)" },
              { type: "tool_use_summary", desc: "工具调用摘要（Haiku 生成）", color: "var(--accent-purple)" },
            ].map((item) => (
              <div key={item.type} className="p-3 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
                <code className="text-xs font-mono" style={{ color: item.color }}>{item.type}</code>
                <p className="text-xs text-[var(--text-secondary)] mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
