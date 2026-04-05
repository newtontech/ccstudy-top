import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeBlock } from "@/components/CodeBlock";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function CostPage() {
  const relatedModules = [
    {
      title: "查询引擎",
      href: "/query-engine",
      description: "多轮对话与工具调用循环",
      icon: "🔄",
    },
    {
      title: "上下文管理",
      href: "/context",
      description: "上下文窗口与压缩策略",
      icon: "📦",
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
      title="Token 经济学"
      subtitle="Claude Code 的实时成本追踪、Token 预算分配与多层优化策略，从 API 计费到用户侧可见的每一分钱"
      icon="💰"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: Token 计费模型 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Token 计费模型"
            subtitle="从 API Usage 到 USD 的完整计费链路"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 基于 Anthropic Messages API 的{" "}
              <strong className="text-[var(--text-primary)]">Beta Usage</strong>{" "}
              对象进行精确计费。每次 API 调用返回四类 Token 计数：
              <code className="text-[var(--accent-cyan)]">input_tokens</code>（输入）、
              <code className="text-[var(--accent-cyan)]">output_tokens</code>（输出）、
              <code className="text-[var(--accent-cyan)]">cache_read_input_tokens</code>（缓存读取）、
              <code className="text-[var(--accent-cyan)]">cache_creation_input_tokens</code>（缓存写入）。
              此外还追踪 <code className="text-[var(--accent-cyan)]">web_search_requests</code>（网页搜索次数）。
            </p>
            <p>
              不同 Token 类型对应不同单价。缓存读取 Token 的成本仅为普通输入 Token 的{" "}
              <strong className="text-[var(--text-primary)]">1/10</strong>，
              这使得 Prompt Caching 成为降低成本的最有效手段之一。
              Claude Code 的成本追踪系统通过{" "}
              <code className="text-[var(--accent-cyan)]">calculateUSDCost()</code> 函数，
              结合模型的定价表将 Token 用量转换为美元成本。
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              💲 Token 单价对比（以 Claude Sonnet 4 为例）
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "输入 Token", price: "$3 / MTok", color: "var(--accent-cyan)", desc: "System Prompt + 对话历史" },
                { label: "输出 Token", price: "$15 / MTok", color: "var(--accent-purple)", desc: "模型生成的回复" },
                { label: "缓存读取", price: "$0.30 / MTok", color: "var(--accent-green)", desc: "命中缓存的输入" },
                { label: "缓存写入", price: "$3.75 / MTok", color: "var(--accent-orange)", desc: "首次缓存写入" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-[var(--border-primary)] p-4 text-center"
                >
                  <div className="text-sm text-[var(--text-secondary)]">{item.label}</div>
                  <div className="text-2xl font-bold mt-1" style={{ color: item.color }}>
                    {item.price}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2: costTracker 实时追踪机制 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="costTracker 实时追踪机制"
            subtitle="从 API 响应到累计成本的端到端追踪"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="text-[var(--accent-cyan)]">cost-tracker.ts</code> 是 Claude Code 的成本追踪核心。
              每次收到 API 响应后，系统调用{" "}
              <code className="text-[var(--accent-cyan)]">addToTotalSessionCost(cost, usage, model)</code>，
              将本次调用的成本累加到全局状态，同时按模型名称归集用量数据。
            </p>
            <p>
              追踪系统维护的关键指标包括：总成本（USD）、API 总耗时、实际耗时、
              代码变更行数（增/删）、各模型的输入/输出/缓存 Token 数量，
              以及 Web Search 请求次数。这些数据通过{" "}
              <code className="text-[var(--accent-cyan)]">TelemetryCounter</code>{" "}
              上报到遥测系统，用于产品级别的成本分析。
            </p>
          </div>

          <ArchitectureDiagram
            title="成本追踪数据流"
            nodes={[
              { id: "api", label: "API 响应\ninput/output/cache tokens", x: 10, y: 10, color: "var(--accent-cyan)" },
              { id: "calc", label: "calculateUSDCost\n模型定价表 → USD", x: 230, y: 10, color: "var(--accent-purple)" },
              { id: "state", label: "addToTotalCostState\n全局状态累加", x: 450, y: 10, color: "var(--accent-blue)" },
              { id: "model", label: "addToTotalModelUsage\n按模型归集", x: 10, y: 120, color: "var(--accent-orange)" },
              { id: "telemetry", label: "TelemetryCounter\n遥测上报", x: 230, y: 120, color: "var(--accent-green)" },
              { id: "persist", label: "saveCurrentSessionCosts\n项目配置持久化", x: 450, y: 120, color: "#f59e0b" },
            ]}
            edges={[
              { from: "api", to: "calc" },
              { from: "calc", to: "state" },
              { from: "calc", to: "model" },
              { from: "state", to: "telemetry" },
              { from: "state", to: "persist" },
            ]}
          />

          <CodeBlock
            language="typescript"
            code={`export function addToTotalSessionCost(
  cost: number,
  usage: Usage,
  model: string,
): number {
  // 1. 按模型归集用量
  const modelUsage = addToTotalModelUsage(cost, usage, model);
  addToTotalCostState(cost, modelUsage, model);

  // 2. 上报遥测计数器
  getCostCounter()?.add(cost, { model });
  getTokenCounter()?.add(usage.input_tokens, { model, type: 'input' });
  getTokenCounter()?.add(usage.output_tokens, { model, type: 'output' });
  getTokenCounter()?.add(usage.cache_read_input_tokens ?? 0, {
    model, type: 'cacheRead',
  });
  getTokenCounter()?.add(usage.cache_creation_input_tokens ?? 0, {
    model, type: 'cacheCreation',
  });

  // 3. 递归处理 Advisor 子调用
  let totalCost = cost;
  for (const advisorUsage of getAdvisorUsage(usage)) {
    const advisorCost = calculateUSDCost(advisorUsage.model, advisorUsage);
    totalCost += addToTotalSessionCost(advisorCost, advisorUsage, advisorUsage.model);
  }
  return totalCost;
}`}
          />
        </section>
      </ScrollReveal>

      {/* Section 3: costHook 成本钩子 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="costHook 成本钩子"
            subtitle="React Hook 驱动的会话级成本生命周期管理"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="text-[var(--accent-cyan)]">costHook.ts</code> 导出{" "}
              <code className="text-[var(--accent-cyan)]">useCostSummary()</code>，
              这是一个 React Hook，在进程退出时自动输出格式化的成本摘要并持久化会话数据。
              它通过监听 Node.js 的 <code className="text-[var(--accent-cyan)]">process.on(exit)</code> 事件确保成本数据不会丢失。
            </p>
            <p>
              该 Hook 会检查用户是否有 Console Billing Access（Claude AI 订阅用户），
              订阅用户看到的是订阅额度信息，而非直接成本。非订阅用户则看到{" "}
              <code className="text-[var(--accent-cyan)]">formatTotalCost()</code> 生成的完整成本报告，
              包含按模型分组的详细用量。
            </p>
          </div>

          <CodeBlock
            language="typescript"
            code={`export function useCostSummary(
  getFpsMetrics?: () => FpsMetrics | undefined,
): void {
  useEffect(() => {
    const f = () => {
      if (hasConsoleBillingAccess()) {
        process.stdout.write('\\n' + formatTotalCost() + '\\n');
      }
      saveCurrentSessionCosts(getFpsMetrics?.());
    };
    process.on('exit', f);
    return () => { process.off('exit', f); };
  }, []);
}`}
          />
        </section>
      </ScrollReveal>

      {/* Section 4: Token 预算分配 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Token 预算分配"
            subtitle="智能预算追踪与边际收益递减检测"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <code className="text-[var(--accent-cyan)]">query/tokenBudget.ts</code> 实现了智能预算追踪系统。
              用户可以通过自然语言设置预算，例如{" "}
              <code className="text-[var(--accent-cyan)]">+500k</code> 或{" "}
              <code className="text-[var(--accent-cyan)]">use 2M tokens</code>，
              系统通过正则表达式解析这些简写。
            </p>
            <p>
              预算追踪器（<code className="text-[var(--accent-cyan)]">BudgetTracker</code>）维护续作次数、
              Token 增量等状态。当达到预算的 90% 时触发完成阈值；
              当连续 3 次续作且每次增量少于 500 Token 时，判定为{" "}
              <strong className="text-[var(--text-primary)]">边际收益递减</strong>（diminishing returns），
              自动终止任务以避免浪费 Token。
            </p>
          </div>

          <CodeBlock
            language="typescript"
            code={`// 解析自然语言预算
export function parseTokenBudget(text: string): number | null {
  // "+500k" → 500,000
  const startMatch = text.match(/^\\s*\\+(\\d+(?:\\.\\d+)?)\\s*(k|m|b)\\b/i);
  // "use 2M tokens" → 2,000,000
  const verboseMatch = text.match(/\\b(?:use|spend)\\s+(\\d+)\\s*(k|m|b)\\s*tokens?\\b/i);
  // ...
}

// 边际收益递减检测
const DIMINISHING_THRESHOLD = 500;
const isDiminishing =
  tracker.continuationCount >= 3 &&
  deltaSinceLastCheck < DIMINISHING_THRESHOLD &&
  tracker.lastDeltaTokens < DIMINISHING_THRESHOLD;`}
          />

          <ArchitectureDiagram
            title="Token 预算分配策略"
            nodes={[
              { id: "user", label: "用户预算指令\n+500k / use 2M", x: 240, y: 10, color: "var(--accent-cyan)" },
              { id: "parser", label: "parseTokenBudget()\n正则解析", x: 240, y: 100, color: "var(--accent-purple)" },
              { id: "tracker", label: "BudgetTracker\n续作次数 + Token增量", x: 240, y: 195, color: "var(--accent-blue)" },
              { id: "check", label: "checkTokenBudget()\n每次循环检查", x: 240, y: 290, color: "var(--accent-orange)" },
              { id: "continue", label: "继续工作\n< 90% 预算", x: 80, y: 380, color: "var(--accent-green)" },
              { id: "complete", label: "完成任务\n≥ 90% 预算", x: 320, y: 380, color: "var(--accent-green)" },
              { id: "diminish", label: "提前终止\n边际收益递减", x: 540, y: 380, color: "#ef4444" },
            ]}
            edges={[
              { from: "user", to: "parser" },
              { from: "parser", to: "tracker" },
              { from: "tracker", to: "check" },
              { from: "check", to: "continue" },
              { from: "check", to: "complete" },
              { from: "check", to: "diminish" },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Section 5: Token 估算与计数 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Token 估算与计数"
            subtitle="从粗略估算到 API 精确计数的分层策略"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 采用分层 Token 估算策略：
              <code className="text-[var(--accent-cyan)]">services/tokenEstimation.ts</code> 提供了
              从快速估算到精确计数的多个层级。快速估算使用{" "}
              <code className="text-[var(--accent-cyan)]">roughTokenCountEstimation()</code>，
              默认按 4 字节/Token 的比率计算，对 JSON 文件则使用 2 字节/Token 的更精确比率。
            </p>
            <p>
              精确计数通过 <code className="text-[var(--accent-cyan)]">countMessagesTokensWithAPI()</code>{" "}
              调用 Anthropic 的 Beta countTokens API。在 Bedrock 后端使用 AWS SDK 的 CountTokensCommand，
              在 Vertex 端点使用 Sonnet 模型作为 fallback。对于包含 thinking 块的消息，
              系统自动启用 thinking 模式以确保计数准确。
            </p>
          </div>

          <div className="mt-8 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
              📏 Token 估算层级
            </h4>
            <div className="space-y-4">
              {[
                {
                  level: "L1 粗略估算",
                  method: "roughTokenCountEstimation()",
                  accuracy: "~75%",
                  speed: "< 1ms",
                  desc: "字符数 / bytesPerToken，适用于快速阈值判断",
                  color: "var(--accent-orange)",
                },
                {
                  level: "L2 文件类型优化",
                  method: "roughTokenCountEstimationForFileType()",
                  accuracy: "~85%",
                  speed: "< 1ms",
                  desc: "JSON 文件使用 2 bytes/token 比率",
                  color: "var(--accent-cyan)",
                },
                {
                  level: "L3 API 精确计数",
                  method: "countMessagesTokensWithAPI()",
                  accuracy: "~99%",
                  speed: "100-500ms",
                  desc: "调用 Beta countTokens API",
                  color: "var(--accent-green)",
                },
                {
                  level: "L4 Haiku Fallback",
                  method: "countTokensViaHaikuFallback()",
                  accuracy: "~95%",
                  speed: "200-800ms",
                  desc: "使用 Haiku 模型进行完整消息计数，支持 thinking 块",
                  color: "var(--accent-purple)",
                },
              ].map((item) => (
                <div
                  key={item.level}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-lg border border-[var(--border-primary)]"
                >
                  <div className="sm:w-32 font-semibold" style={{ color: item.color }}>
                    {item.level}
                  </div>
                  <div className="sm:w-56 text-sm font-mono text-[var(--text-secondary)]">
                    {item.method}
                  </div>
                  <div className="sm:w-20 text-center">
                    <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-primary)]">
                      {item.accuracy}
                    </span>
                  </div>
                  <div className="sm:w-24 text-center text-sm text-[var(--text-secondary)]">
                    {item.speed}
                  </div>
                  <div className="text-sm text-[var(--text-secondary)]">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: 优化策略 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="优化策略"
            subtitle="缓存、压缩与预算分配的三重优化"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 实施了多层优化策略来控制 Token 消耗和成本：
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
              <div className="text-3xl mb-3">🚀</div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Prompt Caching
              </h4>
              <div className="text-sm text-[var(--accent-green)] font-mono mb-3">
                成本降低 90%
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                <li>• System Prompt 自动缓存</li>
                <li>• 工具定义批量缓存</li>
                <li>• 前缀匹配复用缓存</li>
                <li>• cache_read 仅 $0.30/MTok</li>
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
              <div className="text-3xl mb-3">📦</div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                Context Compaction
              </h4>
              <div className="text-sm text-[var(--accent-cyan)] font-mono mb-3">
                上下文压缩 60-80%
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                <li>• Auto-compact 触发阈值</li>
                <li>• 关键信息摘要保留</li>
                <li>• tokenCountWithEstimation() 精确测量</li>
                <li>• 并行工具调用处理</li>
              </ul>
            </div>

            <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                预算控制
              </h4>
              <div className="text-sm text-[var(--accent-purple)] font-mono mb-3">
                避免无效消耗
              </div>
              <ul className="text-sm text-[var(--text-secondary)] space-y-2">
                <li>• 自然语言预算设置</li>
                <li>• 90% 完成阈值</li>
                <li>• 边际收益递减检测</li>
                <li>• 会话级成本持久化</li>
              </ul>
            </div>
          </div>

          {/* Optimization Effect Comparison */}
          <div className="mt-8 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6">
            <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-6">
              📊 优化效果对比（模拟 100k Token 对话场景）
            </h4>
            <div className="space-y-4">
              {[
                {
                  scenario: "无优化（每次全量发送）",
                  cost: "$4.50",
                  tokens: "100k input + 20k output",
                  savings: "—",
                  color: "#ef4444",
                },
                {
                  scenario: "Prompt Caching（缓存命中率 80%）",
                  cost: "$1.98",
                  tokens: "80k cache_read + 20k input + 20k output",
                  savings: "-56%",
                  color: "var(--accent-green)",
                },
                {
                  scenario: "Caching + Compaction（压缩 60%）",
                  cost: "$1.17",
                  tokens: "48k cache_read + 12k input + 12k output",
                  savings: "-74%",
                  color: "var(--accent-cyan)",
                },
                {
                  scenario: "全链路优化 + 预算控制",
                  cost: "$0.81",
                  tokens: "48k cache_read + 12k input + 6k output",
                  savings: "-82%",
                  color: "var(--accent-purple)",
                },
              ].map((item) => (
                <div
                  key={item.scenario}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 rounded-lg border border-[var(--border-primary)]"
                >
                  <div className="flex-1 text-sm text-[var(--text-primary)]">
                    {item.scenario}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] font-mono">
                    {item.tokens}
                  </div>
                  <div className="sm:w-24 text-right font-bold" style={{ color: item.color }}>
                    {item.cost}
                  </div>
                  <div
                    className="sm:w-16 text-right text-sm font-semibold"
                    style={{ color: item.color }}
                  >
                    {item.savings}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7: 成本可视化仪表盘 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="成本可视化仪表盘"
            subtitle="从 formatTotalCost() 到用户可见的成本报告"
          />
          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 通过 <code className="text-[var(--accent-cyan)]">/cost</code> 命令和进程退出时的自动摘要，
              向用户展示完整的成本报告。报告包含总成本、API 耗时、实际耗时、代码变更统计，
              以及按模型分组的详细用量（输入/输出/缓存读取/缓存写入/搜索次数和对应成本）。
            </p>
            <p>
              对于 Claude AI 订阅用户，系统显示订阅额度使用情况而非直接成本。
              当用户超出额度进入 overage 模式时，会收到自动提示。
              成本数据通过 <code className="text-[var(--accent-cyan)]">saveCurrentSessionCosts()</code>{" "}
              持久化到项目配置，支持跨会话恢复和累计统计。
            </p>
          </div>

          <ArchitectureDiagram
            title="成本报告生成架构"
            nodes={[
              { id: "state", label: "全局成本状态\ncostState", x: 30, y: 20, color: "var(--accent-cyan)" },
              { id: "modelUsage", label: "模型用量\ncache per model", x: 250, y: 20, color: "var(--accent-purple)" },
              { id: "format", label: "formatTotalCost()\n格式化输出", x: 470, y: 20, color: "var(--accent-blue)" },
              { id: "cmd", label: "/cost 命令\n按需查看", x: 100, y: 140, color: "var(--accent-green)" },
              { id: "exit", label: "useCostSummary()\n退出时自动显示", x: 350, y: 140, color: "var(--accent-orange)" },
              { id: "persist", label: "项目配置持久化\n支持会话恢复", x: 100, y: 260, color: "#f59e0b" },
              { id: "telemetry", label: "遥测上报\n产品级分析", x: 350, y: 260, color: "var(--accent-purple)" },
            ]}
            edges={[
              { from: "state", to: "format" },
              { from: "modelUsage", to: "format" },
              { from: "format", to: "cmd" },
              { from: "format", to: "exit" },
              { from: "state", to: "persist" },
              { from: "state", to: "telemetry" },
            ]}
          />
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
