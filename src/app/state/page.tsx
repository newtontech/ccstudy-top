import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeFlow } from "@/components/CodeFlow";
import { CodeBlock } from "@/components/CodeBlock";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function StatePage() {
  const relatedModules = [
    {
      title: "React Hooks",
      href: "/hooks",
      description: "80+ 自定义 Hooks 体系",
      icon: "🧩",
    },
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构设计",
      icon: "🏗️",
    },
    {
      title: "工具系统",
      href: "/tools",
      description: "40+ 工具实现",
      icon: "🔧",
    },
  ];

  return (
    <ModuleLayout
      title="状态管理"
      subtitle="自研的极简状态管理方案 —— 基于 React useSyncExternalStore 的轻量级 Store，零依赖、类型安全、精准重渲染"
      icon="🗃️"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: 设计哲学 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="设计哲学"
            subtitle="为什么自研而不是用 Redux / Zustand / Jotai？"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 选择了{" "}
              <strong className="text-[var(--text-primary)]">自研轻量状态管理</strong>，
              而非 Redux、Zustand 等社区方案。核心原因在于 Claude Code 是一个{" "}
              <strong className="text-[var(--text-primary)]">单页终端应用</strong>，
              状态集中在单个 AppState 对象中，不需要 Redux 的多 reducer、middleware 生态，
              也不需要 Zustand 的独立模块化 store。
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
              <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                <div className="text-2xl mb-3">⚡</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  极简 API
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  整个 Store 实现仅 <code className="text-[var(--accent-cyan)]">~30 行代码</code>：
                  getState、setState、subscribe 三个方法，零学习成本。
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                <div className="text-2xl mb-3">🎯</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  精准订阅
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  基于 <code className="text-[var(--accent-cyan)]">useSyncExternalStore</code> + Selector 模式，
                  组件只在自己关心的字段变化时重渲染。
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
                <div className="text-2xl mb-3">🔗</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  响应式副作用
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  <code className="text-[var(--accent-cyan)]">onChangeAppState</code> 回调
                  自动同步状态到持久化存储、外部服务，类似 Redux middleware 但更轻量。
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/5">
              <p className="text-sm">
                <strong className="text-[var(--accent-cyan)]">💡 关键决策：</strong>
                不用 Redux 的原因 —— 单 store、单消费者、无时间旅行需求；
                不用 Zustand 的原因 —— 不需要独立模块化 store 和 devtools 生态。
                自研方案完美匹配 Claude Code 的实际需求。
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2: createStore 实现 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="createStore 实现"
            subtitle="30 行代码实现的完整状态管理核心"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              <code className="text-[var(--accent-cyan)]">createStore&lt;T&gt;</code> 是一个泛型函数，
              接收初始状态和可选的 onChange 回调，返回一个包含三个方法的对象。
              它是整个状态系统的基石，简洁而强大。
            </p>
          </div>

          <CodeBlock
            filename="store.ts — 核心实现（完整源码）"
            language="typescript"
            code={`type Listener = () => void
type OnChange<T> = (args: { newState: T; oldState: T }) => void

export type Store<T> = {
  getState: () => T
  setState: (updater: (prev: T) => T) => void
  subscribe: (listener: Listener) => () => void
}

export function createStore<T>(
  initialState: T,
  onChange?: OnChange<T>,
): Store<T> {
  let state = initialState
  const listeners = new Set<Listener>()

  return {
    getState: () => state,

    setState: (updater: (prev: T) => T) => {
      const prev = state
      const next = updater(prev)
      if (Object.is(next, prev)) return  // 引用未变则跳过
      state = next
      onChange?.({ newState: next, oldState: prev })
      for (const listener of listeners) listener()
    },

    subscribe: (listener: Listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)  // 返回取消订阅函数
    },
  }
}`}
          />

          <ArchitectureDiagram
            title="createStore 工作原理"
            nodes={[
              { id: "initial", label: "initialState", x: 20, y: 30, color: "#64748b" },
              { id: "store", label: "Store<T>", x: 200, y: 30, color: "var(--accent-purple)" },
              { id: "get", label: "getState()", x: 380, y: 0, color: "var(--accent-cyan)" },
              { id: "set", label: "setState()", x: 380, y: 60, color: "var(--accent-blue)" },
              { id: "sub", label: "subscribe()", x: 380, y: 120, color: "#10b981" },
              { id: "state", label: "state (闭包)", x: 200, y: 120, color: "#f59e0b" },
              { id: "onChange", label: "onChange?", x: 200, y: 190, color: "#ef4444" },
              { id: "notify", label: "listeners", x: 380, y: 190, color: "#10b981" },
            ]}
            edges={[
              { from: "initial", to: "store" },
              { from: "store", to: "get" },
              { from: "store", to: "set" },
              { from: "store", to: "sub" },
              { from: "store", to: "state" },
              { from: "store", to: "onChange" },
              { from: "onChange", to: "notify", label: "触发" },
            ]}
            width={500}
            height={240}
          />
        </section>
      </ScrollReveal>

      {/* Section 3: AppState 结构 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="AppState 结构"
            subtitle="涵盖 60+ 字段的集中式状态模型"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              <code className="text-[var(--accent-cyan)]">AppState</code> 是一个包含 60+ 字段的 TypeScript 类型，
              使用 <code className="text-[var(--accent-cyan)]">DeepImmutable</code> 包裹不可变部分，
              涵盖了 CLI 运行的所有状态：设置、任务、MCP 连接、插件、权限、UI 交互等。
            </p>
          </div>

          <ArchitectureDiagram
            title="AppState 数据模型（核心子域）"
            nodes={[
              { id: "app", label: "AppState", x: 300, y: 10, color: "var(--accent-purple)" },
              // Row 1
              { id: "settings", label: "settings", x: 30, y: 80, color: "var(--accent-cyan)" },
              { id: "tasks", label: "tasks", x: 170, y: 80, color: "var(--accent-blue)" },
              { id: "mcp", label: "mcp", x: 310, y: 80, color: "#10b981" },
              { id: "plugins", label: "plugins", x: 450, y: 80, color: "#f59e0b" },
              { id: "perm", label: "toolPermission", x: 580, y: 80, color: "#ef4444" },
              // Row 2
              { id: "ui", label: "UI 状态", x: 80, y: 170, color: "var(--accent-purple)" },
              { id: "bridge", label: "REPL Bridge", x: 250, y: 170, color: "var(--accent-blue)" },
              { id: "team", label: "Team/Swarm", x: 420, y: 170, color: "#10b981" },
              { id: "spec", label: "Speculation", x: 580, y: 170, color: "#f59e0b" },
            ]}
            edges={[
              { from: "app", to: "settings" },
              { from: "app", to: "tasks" },
              { from: "app", to: "mcp" },
              { from: "app", to: "plugins" },
              { from: "app", to: "perm" },
              { from: "app", to: "ui" },
              { from: "app", to: "bridge" },
              { from: "app", to: "team" },
              { from: "app", to: "spec" },
            ]}
            width={720}
            height={220}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                📋 DeepImmutable 部分
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>• <code className="text-[var(--accent-cyan)]">settings</code> — 用户配置</li>
                <li>• <code className="text-[var(--accent-cyan)]">verbose</code> — 详细模式</li>
                <li>• <code className="text-[var(--accent-cyan)]">mainLoopModel</code> — 当前模型</li>
                <li>• <code className="text-[var(--accent-cyan)]">toolPermissionContext</code> — 权限</li>
                <li>• <code className="text-[var(--accent-cyan)]">expandedView</code> — 展开视图</li>
                <li>• <code className="text-[var(--accent-cyan)]">replBridge*</code> — Bridge 状态</li>
              </ul>
            </div>
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                🔧 可变部分（含函数类型）
              </h3>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li>• <code className="text-[var(--accent-cyan)]">tasks</code> — 后台任务 Map</li>
                <li>• <code className="text-[var(--accent-cyan)]">agentNameRegistry</code> — 名称注册</li>
                <li>• <code className="text-[var(--accent-cyan)]">mcp.tools</code> — MCP 工具列表</li>
                <li>• <code className="text-[var(--accent-cyan)]">sessionHooks</code> — 会话钩子 Map</li>
                <li>• <code className="text-[var(--accent-cyan)]">replContext</code> — REPL VM 上下文</li>
                <li>• <code className="text-[var(--accent-cyan)]">teamContext</code> — 团队协作状态</li>
              </ul>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: useSyncExternalStore + Selector */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="React 集成"
            subtitle="useAppState Hook 与精准重渲染"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              Claude Code 利用 React 18 的 <code className="text-[var(--accent-cyan)]">useSyncExternalStore</code> API，
              配合 Selector 模式实现精准订阅。组件只在自己关心的状态切片变化时重渲染，
              避免了整个状态树变化导致的全量重渲染。
            </p>
          </div>

          <CodeBlock
            filename="AppState.tsx — useAppState Hook（简化）"
            language="typescript"
            code={`export function useAppState<T>(
  selector: (state: AppState) => T
): T {
  const store = useAppStore()

  const get = () => {
    const state = store.getState()
    return selector(state)  // 只提取需要的切片
  }

  // useSyncExternalStore 保证：
  // 1. 同步读取避免撕裂 (tearing)
  // 2. 仅当 selector 返回值变化时重渲染 (Object.is 比较)
  return useSyncExternalStore(store.subscribe, get, get)
}

// 使用示例 —— 多个独立订阅
const verbose = useAppState(s => s.verbose)
const model = useAppState(s => s.mainLoopModel)
const { text } = useAppState(s => s.promptSuggestion)

// 仅写入，不订阅 —— 永远不会触发重渲染
const setAppState = useSetAppState()
setAppState(prev => ({ ...prev, verbose: true }))`}
          />

          <CodeFlow
            title="状态更新 → 组件重渲染流程"
            steps={[
              {
                code: "setState(updater)",
                highlight: [],
                description: "1. 组件调用 setAppState(prev => ({ ...prev, verbose: true }))",
              },
              {
                code: "Object.is(next, prev)",
                highlight: [],
                description: "2. createStore 用 Object.is 检查新旧状态，相同则直接返回",
              },
              {
                code: "onChange?.({ newState, oldState })",
                highlight: [],
                description: "3. 触发 onChangeAppState，同步到持久化存储和外部服务",
              },
              {
                code: "for (const l of listeners) l()",
                highlight: [],
                description: "4. 遍历所有 listener，触发 useSyncExternalStore 的快照检查",
              },
              {
                code: "selector(newState) === selector(oldState)",
                highlight: [],
                description: "5. React 对每个 useAppState 的 selector 返回值做 Object.is 比较",
              },
              {
                code: "only affected components re-render",
                highlight: [],
                description: "6. 仅 selector 返回值变化的组件重渲染，其余跳过",
              },
            ]}
          />
        </section>
      </ScrollReveal>

      {/* Section 5: onChangeAppState */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="onChangeAppState 响应式更新"
            subtitle="状态变更的自动副作用管道"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              <code className="text-[var(--accent-cyan)]">onChangeAppState</code> 是 createStore 的 onChange 回调，
              在每次 setState 成功后执行。它通过比较 newState 和 oldState，
              对特定字段的变化执行副作用 —— 类似 Redux 的 middleware，但以声明式 diff 模式实现。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                🔐 权限模式同步
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                当 <code className="text-[var(--accent-cyan)]">toolPermissionContext.mode</code> 变化时，
                自动通知 CCR (Claude Cloud Runtime) 和 SDK 状态流，确保远程 UI 与 CLI 权限模式一致。
                还处理 Ultraplan 模式的特殊逻辑。
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                🤖 模型切换持久化
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                <code className="text-[var(--accent-cyan)]">mainLoopModel</code> 变化时自动写入
                userSettings 并更新全局模型覆盖。切换模型后重启会话仍然生效。
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                💾 视图/配置持久化
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                <code className="text-[var(--accent-cyan)]">expandedView</code>、<code className="text-[var(--accent-cyan)]">verbose</code>、
                <code className="text-[var(--accent-cyan)]">tungstenPanelVisible</code> 等变化时，
                自动保存到 globalConfig（JSON 文件）。
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">
                🔑 认证缓存清理
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                <code className="text-[var(--accent-cyan)]">settings</code> 变化时清空 API Key、
                AWS/GCP 凭证缓存，确保环境变量变更立即生效。
              </p>
            </div>
          </div>

          <ArchitectureDiagram
            title="onChangeAppState 副作用管道"
            nodes={[
              { id: "setState", label: "setState()", x: 50, y: 10, color: "var(--accent-purple)" },
              { id: "diff", label: "newState vs oldState", x: 50, y: 90, color: "#64748b" },
              { id: "perm", label: "权限模式", x: 250, y: 50, color: "#ef4444" },
              { id: "model", label: "模型切换", x: 250, y: 130, color: "var(--accent-cyan)" },
              { id: "view", label: "视图配置", x: 450, y: 50, color: "#10b981" },
              { id: "auth", label: "认证缓存", x: 450, y: 130, color: "#f59e0b" },
              { id: "ccr", label: "→ CCR 通知", x: 620, y: 30, color: "#ef4444" },
              { id: "sdk", label: "→ SDK 通知", x: 620, y: 70, color: "#ef4444" },
              { id: "settings", label: "→ userSettings", x: 620, y: 110, color: "var(--accent-cyan)" },
              { id: "globalCfg", label: "→ globalConfig", x: 620, y: 150, color: "#10b981" },
            ]}
            edges={[
              { from: "setState", to: "diff" },
              { from: "diff", to: "perm" },
              { from: "diff", to: "model" },
              { from: "diff", to: "view" },
              { from: "diff", to: "auth" },
              { from: "perm", to: "ccr" },
              { from: "perm", to: "sdk" },
              { from: "model", to: "settings" },
              { from: "view", to: "globalCfg" },
              { from: "auth", to: "settings" },
            ]}
            width={750}
            height={200}
          />
        </section>
      </ScrollReveal>

      {/* Section 6: Selectors */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Selectors 派生状态"
            subtitle="从 AppState 中派生计算值的纯函数"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              Selectors 是纯函数，接收 AppState（或其部分字段）作为输入，返回派生值。
              它们不产生副作用，只做数据提取和转换。在 Claude Code 中，Selectors 主要用于
              <strong className="text-[var(--text-primary)]">输入路由</strong>和{" "}
              <strong className="text-[var(--text-primary)]">任务查找</strong>。
            </p>
          </div>

          <CodeBlock
            filename="selectors.ts — 核心选择器"
            language="typescript"
            code={`// 查找当前正在查看的 teammate 任务
export function getViewedTeammateTask(
  appState: Pick<AppState, 'viewingAgentTaskId' | 'tasks'>,
): InProcessTeammateTaskState | undefined {
  const { viewingAgentTaskId, tasks } = appState
  if (!viewingAgentTaskId) return undefined
  const task = tasks[viewingAgentTaskId]
  if (!task || !isInProcessTeammateTask(task)) return undefined
  return task
}

// 判定用户输入应该路由到哪个 agent
export type ActiveAgentForInput =
  | { type: 'leader' }
  | { type: 'viewed'; task: InProcessTeammateTaskState }
  | { type: 'named_agent'; task: LocalAgentTaskState }

export function getActiveAgentForInput(
  appState: AppState,
): ActiveAgentForInput {
  const viewedTask = getViewedTeammateTask(appState)
  if (viewedTask) return { type: 'viewed', task: viewedTask }

  const { viewingAgentTaskId, tasks } = appState
  if (viewingAgentTaskId) {
    const task = tasks[viewingAgentTaskId]
    if (task?.type === 'local_agent')
      return { type: 'named_agent', task }
  }
  return { type: 'leader' }
}`}
          />

          <div className="p-4 rounded-lg border border-[var(--accent-cyan)]/30 bg-[var(--accent-cyan)]/5 mt-6">
            <p className="text-sm">
              <strong className="text-[var(--accent-cyan)]">💡 设计要点：</strong>
              使用 <code className="text-[var(--accent-cyan)]">Pick&lt;AppState, ...&gt;</code> 而非完整 AppState 作为参数，
              遵循最小依赖原则。Selector 返回的是已有的子对象引用而非新对象，
              确保 <code className="text-[var(--accent-cyan)]">Object.is</code> 比较能有效避免不必要的重渲染。
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 7: 持久化策略 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="持久化策略"
            subtitle="内存 → 文件系统 → 外部服务的三级同步"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              Claude Code 采用{" "}
              <strong className="text-[var(--text-primary)]">非自动持久化</strong> 策略：
              AppState 本身仅存在于内存中，通过 onChangeAppState 选择性地将关键字段
              持久化到文件系统和外部服务。这种设计避免了序列化/反序列化的性能开销，
              同时确保重要配置不会丢失。
            </p>
          </div>

          <ArchitectureDiagram
            title="持久化流程"
            nodes={[
              { id: "mem", label: "AppState\n(内存)", x: 50, y: 50, color: "var(--accent-purple)" },
              { id: "onChange", label: "onChange\nAppState", x: 220, y: 50, color: "#64748b" },
              { id: "diff", label: "字段 Diff", x: 380, y: 50, color: "var(--accent-cyan)" },
              { id: "gc", label: "globalConfig\n(JSON 文件)", x: 550, y: 0, color: "#10b981" },
              { id: "us", label: "userSettings\n(JSON 文件)", x: 550, y: 80, color: "var(--accent-blue)" },
              { id: "ccr", label: "CCR / SDK\n(网络)", x: 550, y: 160, color: "#ef4444" },
            ]}
            edges={[
              { from: "mem", to: "onChange", label: "setState" },
              { from: "onChange", to: "diff" },
              { from: "diff", to: "gc", label: "expandedView\nverbose" },
              { from: "diff", to: "us", label: "mainLoopModel" },
              { from: "diff", to: "ccr", label: "permission\nmode" },
            ]}
            width={700}
            height={210}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                📁 globalConfig.json
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                存储 verbose、expandedView、tungstenPanelVisible 等 UI 偏好。
                通过 <code className="text-[var(--accent-cyan)]">saveGlobalConfig</code> 原子写入。
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                📁 userSettings.json
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                存储模型选择等用户配置。
                通过 <code className="text-[var(--accent-cyan)]">updateSettingsForSource</code> 按源合并。
              </p>
            </div>
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                ☁️ CCR / SDK
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                权限模式变更实时推送至 Claude Cloud Runtime 和 SDK 状态流，
                确保远程 UI 与 CLI 同步。
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 8: 架构总结 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="架构总结"
            subtitle="整体数据流与设计模式"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              Claude Code 的状态管理是一个精心设计的分层架构：
              <strong className="text-[var(--text-primary)]">createStore</strong> 提供底层存储，
              <strong className="text-[var(--text-primary)]">AppStateProvider</strong> 注入 React 上下文，
              <strong className="text-[var(--text-primary)]">useAppState</strong> 实现精准订阅，
              <strong className="text-[var(--text-primary)]">onChangeAppState</strong> 处理副作用，
              <strong className="text-[var(--text-primary)]">Selectors</strong> 派生计算值。
              五层协作，构成了一个高效、可维护的状态管理方案。
            </p>
          </div>

          <ArchitectureDiagram
            title="状态管理分层架构"
            nodes={[
              { id: "l1", label: "React 组件", x: 300, y: 0, color: "var(--accent-purple)" },
              { id: "l2", label: "useAppState / useSetAppState", x: 260, y: 65, color: "var(--accent-cyan)" },
              { id: "l3", label: "useSyncExternalStore", x: 260, y: 130, color: "var(--accent-blue)" },
              { id: "l4", label: "Store<AppState>", x: 280, y: 195, color: "#10b981" },
              { id: "l5a", label: "onChangeAppState", x: 100, y: 260, color: "#f59e0b" },
              { id: "l5b", label: "Selectors", x: 340, y: 260, color: "#ef4444" },
              { id: "l5c", label: "getDefaultAppState", x: 560, y: 260, color: "#64748b" },
            ]}
            edges={[
              { from: "l1", to: "l2" },
              { from: "l2", to: "l3" },
              { from: "l3", to: "l4" },
              { from: "l4", to: "l5a" },
              { from: "l4", to: "l5b" },
              { from: "l4", to: "l5c" },
            ]}
            width={700}
            height={300}
          />
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
