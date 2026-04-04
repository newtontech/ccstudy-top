import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function HooksPage() {
  const relatedModules = [
    {
      title: "UI框架",
      href: "/ink",
      description: "React 终端 UI",
      icon: "🎨",
    },
    {
      title: "工具系统",
      href: "/tools",
      description: "40+ 工具实现",
      icon: "🔧",
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
      title="React Hooks 系统"
      subtitle="Claude Code 中 80+ 自定义 React Hooks 的完整体系，覆盖 UI 交互、业务逻辑、外部集成与性能优化"
      icon="🧩"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: Hooks 系统概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Hooks 系统概述"
            subtitle="四大类 Hooks 构成的完整状态与交互管理体系"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 使用超过{" "}
              <strong className="text-[var(--text-primary)]">80 个自定义 React Hooks</strong>{" "}
              来管理应用的方方面面。这些 Hooks 遵循 React 的组合式设计理念，
              将复杂的状态逻辑、副作用管理和性能优化封装为可复用的函数单元，
              使组件代码保持简洁和可维护。
            </p>
            <p>
              按照职责划分，这 80+ 个 Hooks 被组织为四大类别：
              <strong className="text-[var(--text-primary)]">UI Hooks</strong> 负责界面交互，
              <strong className="text-[var(--text-primary)]">业务逻辑 Hooks</strong> 处理核心业务，
              <strong className="text-[var(--text-primary)]">集成 Hooks</strong> 对接外部系统，
              <strong className="text-[var(--text-primary)]">性能 Hooks</strong> 保障运行效率。
              每个类别都提供了清晰的抽象层，让上层组件只关注"做什么"而非"怎么做"。
            </p>
          </div>

          <ArchitectureDiagram
            title="Hooks 分类体系"
            nodes={[
              // Row 1: Three main categories
              { id: "ui", label: "UI Hooks", x: 20, y: 30, color: "var(--accent-purple)" },
              { id: "biz", label: "业务逻辑 Hooks", x: 240, y: 30, color: "var(--accent-cyan)" },
              { id: "integ", label: "集成 Hooks", x: 480, y: 30, color: "var(--accent-blue)" },
              // Row 2: UI sub-nodes
              { id: "textInput", label: "useTextInput", x: 10, y: 100, color: "var(--accent-purple)" },
              { id: "virtualScroll", label: "useVirtualScroll", x: 150, y: 100, color: "var(--accent-purple)" },
              // Row 2: Biz sub-nodes
              { id: "canUseTool", label: "useCanUseTool", x: 240, y: 100, color: "var(--accent-cyan)" },
              { id: "replBridge", label: "useReplBridge", x: 380, y: 100, color: "var(--accent-cyan)" },
              // Row 2: Integ sub-nodes
              { id: "ideInteg", label: "useIDEIntegration", x: 470, y: 100, color: "var(--accent-blue)" },
              { id: "voiceInteg", label: "useVoiceIntegration", x: 620, y: 100, color: "var(--accent-blue)" },
              // Row 3: Performance category
              { id: "perf", label: "性能 Hooks", x: 240, y: 190, color: "#f59e0b" },
              { id: "memoized", label: "useMemoizedCallbacks", x: 400, y: 190, color: "#f59e0b" },
            ]}
            edges={[
              // UI category to children
              { from: "ui", to: "textInput" },
              { from: "ui", to: "virtualScroll" },
              // Biz category to children
              { from: "biz", to: "canUseTool" },
              { from: "biz", to: "replBridge" },
              // Integ category to children
              { from: "integ", to: "ideInteg" },
              { from: "integ", to: "voiceInteg" },
              // Perf category
              { from: "perf", to: "memoized" },
            ]}
            width={800}
            height={260}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: UI Hooks 详解 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="UI Hooks 详解"
            subtitle="管理终端界面的输入、滚动、补全与防抖交互"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              UI Hooks 是数量最多的一类，它们封装了终端环境下的各种界面交互逻辑。
              从文本输入到虚拟滚动，从命令补全到防抖处理，每个 Hook 都针对终端的特殊场景
              进行了深度优化，使组件无需关心底层细节即可实现流畅的用户体验。
            </p>
          </div>

          <ArchitectureDiagram
            title="UI Hooks 数据流"
            nodes={[
              // Input sources
              { id: "keyboard", label: "键盘输入", x: 10, y: 30, color: "#64748b" },
              { id: "scroll", label: "滚动事件", x: 10, y: 100, color: "#64748b" },
              // Hook layer
              { id: "textInput", label: "useTextInput", x: 200, y: 20, color: "var(--accent-purple)" },
              { id: "typeahead", label: "useTypeahead", x: 200, y: 80, color: "var(--accent-blue)" },
              { id: "vScroll", label: "useVirtualScroll", x: 200, y: 140, color: "var(--accent-cyan)" },
              { id: "debounce", label: "useDebouncedInput", x: 200, y: 200, color: "#10b981" },
              // Output
              { id: "buffer", label: "输入缓冲区", x: 420, y: 20, color: "var(--accent-purple)" },
              { id: "suggestions", label: "补全建议", x: 420, y: 80, color: "var(--accent-blue)" },
              { id: "visibleItems", label: "可见列表项", x: 420, y: 140, color: "var(--accent-cyan)" },
              { id: "throttled", label: "防抖回调", x: 420, y: 200, color: "#10b981" },
            ]}
            edges={[
              { from: "keyboard", to: "textInput", label: "按键" },
              { from: "keyboard", to: "typeahead", label: "字符" },
              { from: "scroll", to: "vScroll", label: "偏移" },
              { from: "keyboard", to: "debounce", label: "输入" },
              { from: "textInput", to: "buffer" },
              { from: "typeahead", to: "suggestions" },
              { from: "vScroll", to: "visibleItems" },
              { from: "debounce", to: "throttled", label: "延迟" },
            ]}
            width={600}
            height={270}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {/* useTextInput */}
            <div className="group p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-purple)]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--accent-purple)" }}
                />
                <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                  useTextInput
                </code>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                管理文本输入状态，支持历史记录浏览、自动补全建议、多行编辑模式。
                内部维护输入缓冲区和光标位置，处理退格、删除、方向键等复杂编辑操作。
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-purple)]/10 text-[var(--accent-purple)]">value</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-purple)]/10 text-[var(--accent-purple)]">onChange</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-purple)]/10 text-[var(--accent-purple)]">history</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-purple)]/10 text-[var(--accent-purple)]">suggestions</span>
              </div>
            </div>

            {/* useVirtualScroll */}
            <div className="group p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-purple)]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--accent-cyan)" }}
                />
                <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                  useVirtualScroll
                </code>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                高效渲染大数据列表，只渲染可视区域内的元素。通过计算滚动偏移量和可见索引范围，
                将渲染开销从 O(n) 降至 O(viewport)，确保万级数据也能流畅滚动。
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]">containerProps</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]">items</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]">scrollTo</span>
              </div>
            </div>

            {/* useTypeahead */}
            <div className="group p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-purple)]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--accent-blue)" }}
                />
                <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                  useTypeahead
                </code>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                命令和文件路径自动补全引擎。基于当前输入前缀，从命令列表、文件系统路径
                或自定义候选集中匹配最相关的建议，支持模糊匹配和最近使用优先排序。
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">query</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">suggestions</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">select</span>
              </div>
            </div>

            {/* useDebouncedInput */}
            <div className="group p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-purple)]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#10b981" }}
                />
                <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                  useDebouncedInput
                </code>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                防抖输入 Hook，在用户停止输入指定时间后才触发回调，减少不必要的重渲染
                和搜索请求。常用于搜索框、过滤条件等实时响应场景，配合 useMemo 优化性能。
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#10b981]/10 text-[#10b981]">value</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#10b981]/10 text-[#10b981]">debouncedValue</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#10b981]/10 text-[#10b981]">onChange</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: 业务逻辑 Hooks */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="业务逻辑 Hooks"
            subtitle="封装核心业务规则：权限校验、会话管理与工具调度"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              业务逻辑 Hooks 将 Claude Code 的核心业务规则封装为独立的逻辑单元。
              它们处理工具权限验证、REPL 会话桥接、远程连接管理、工具状态追踪等
              关键业务流程，使组件代码免于被复杂的条件判断和状态管理所淹没。
            </p>
          </div>

          {/* useCanUseTool flow diagram - replaces CodeBlock */}
          <ArchitectureDiagram
            title="useCanUseTool 权限校验流程"
            nodes={[
              { id: "component", label: "ToolButton 组件", x: 10, y: 30, color: "var(--accent-purple)" },
              { id: "hook", label: "useCanUseTool", x: 220, y: 30, color: "var(--accent-cyan)" },
              { id: "check", label: "权限检查", x: 430, y: 10, color: "var(--accent-blue)" },
              { id: "enabled", label: "启用状态", x: 430, y: 70, color: "var(--accent-blue)" },
              { id: "allowed", label: "渲染执行按钮", x: 620, y: 10, color: "#10b981" },
              { id: "denied", label: "PermissionDenied", x: 620, y: 70, color: "#f43f5e" },
            ]}
            edges={[
              { from: "component", to: "hook", label: "tool, input" },
              { from: "hook", to: "check", label: "权限" },
              { from: "hook", to: "enabled", label: "状态" },
              { from: "check", to: "allowed", label: "通过" },
              { from: "enabled", to: "denied", label: "不可用" },
            ]}
            width={800}
            height={130}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* useReplBridge */}
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--accent-cyan)" }}
                />
                <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                  useReplBridge
                </code>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                REPL（Read-Eval-Print Loop）模式桥接 Hook。在 REPL 模式下管理
                输入/输出循环，支持多行输入、表达式求值、结果格式化输出，
                是交互式编程体验的核心基础设施。
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]">evaluate</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]">history</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]">isEvaluating</span>
              </div>
            </div>

            {/* useRemoteSession */}
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "var(--accent-blue)" }}
                />
                <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                  useRemoteSession
                </code>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                远程会话管理 Hook。处理与远程服务器的连接建立、心跳维护、断线重连、
                会话状态同步等复杂逻辑，确保长时间运行的远程操作不会因网络波动而中断。
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">status</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">connect</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">disconnect</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--accent-blue)]/10 text-[var(--accent-blue)]">sessionId</span>
              </div>
            </div>

            {/* useToolPermission */}
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] md:col-span-2">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#f59e0b" }}
                />
                <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                  useToolPermission
                </code>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                工具权限状态管理 Hook。维护工具的授权状态、用户偏好设置和安全策略，
                提供 requestPermission / revokePermission 等方法，实现细粒度的工具访问控制。
                当用户首次使用某个工具时自动触发授权流程，已授权的工具在后续调用中直接放行。
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#f59e0b]/10 text-[#f59e0b]">permission</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#f59e0b]/10 text-[#f59e0b]">request</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#f59e0b]/10 text-[#f59e0b]">revoke</span>
                <span className="px-2 py-0.5 rounded text-xs font-mono bg-[#f59e0b]/10 text-[#f59e0b]">defaultPolicy: ask</span>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: 集成 Hooks */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="集成 Hooks"
            subtitle="连接 IDE、语音、桌面与移动端的外部系统桥接层"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              集成 Hooks 是 Claude Code 与外部世界交互的桥梁。它们封装了 IDE 集成、
              语音输入输出、桌面应用切换、移动端适配等外部系统的对接逻辑，
              为上层组件提供统一、简洁的 API，屏蔽了不同平台之间的差异。
            </p>
          </div>

          {/* Integration hooks architecture - replaces inline code blocks */}
          <ArchitectureDiagram
            title="集成 Hooks 架构"
            nodes={[
              // Central hub
              { id: "app", label: "Claude Code App", x: 310, y: 30, color: "var(--accent-purple)" },
              // Integration hooks
              { id: "ide", label: "useIDEIntegration", x: 20, y: 120, color: "var(--accent-purple)" },
              { id: "voice", label: "useVoiceIntegration", x: 220, y: 120, color: "var(--accent-cyan)" },
              { id: "desktop", label: "useDesktopHandoff", x: 420, y: 120, color: "var(--accent-blue)" },
              { id: "mobile", label: "useMobileSupport", x: 600, y: 120, color: "#10b981" },
              // External systems
              { id: "vscode", label: "VS Code / JetBrains", x: 20, y: 230, color: "#64748b" },
              { id: "stt", label: "STT / TTS 服务", x: 220, y: 230, color: "#64748b" },
              { id: "desktopApp", label: "桌面应用", x: 420, y: 230, color: "#64748b" },
              { id: "device", label: "移动设备", x: 600, y: 230, color: "#64748b" },
            ]}
            edges={[
              { from: "app", to: "ide", label: "LSP" },
              { from: "app", to: "voice", label: "音频" },
              { from: "app", to: "desktop", label: "交接" },
              { from: "app", to: "mobile", label: "适配" },
              { from: "ide", to: "vscode", label: "扩展 API" },
              { from: "voice", to: "stt", label: "语音" },
              { from: "desktop", to: "desktopApp", label: "IPC" },
              { from: "mobile", to: "device", label: "触摸" },
            ]}
            width={800}
            height={300}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              {
                name: "useIDEIntegration",
                color: "var(--accent-purple)",
                desc: "IDE 集成 Hook，支持 VS Code、JetBrains 等 编辑器的文件打开、光标定位、诊断信息展示等交互功能。通过语言服务器协议（LSP）和编辑器扩展 API 实现深度集成。",
                apis: ["openFile", "showDiagnostics", "connected"],
              },
              {
                name: "useVoiceIntegration",
                color: "var(--accent-cyan)",
                desc: "语音输入/输出 Hook，封装语音识别（STT）和语音合成（TTS）能力。支持实时语音转文字输入和 AI 回复的语音朗读，为无障碍访问和免提操作提供基础支持。",
                apis: ["isListening", "transcript", "speak"],
              },
              {
                name: "useDesktopHandoff",
                color: "var(--accent-blue)",
                desc: "桌面应用切换 Hook，处理 Claude Code CLI 与桌面应用之间的任务交接。支持将当前上下文、文件状态和对话历史无缝传递到桌面端，实现跨设备的连续工作流。",
                apis: ["handoff", "canHandoff", "desktopStatus"],
              },
              {
                name: "useMobileSupport",
                color: "#10b981",
                desc: "移动端适配 Hook，检测设备类型和屏幕尺寸，动态调整 UI 布局和交互方式。处理触摸手势、软键盘弹出、屏幕旋转等移动端特有的交互场景。",
                apis: ["isMobile", "screenWidth", "keyboardVisible"],
              },
            ].map((hook) => (
              <div
                key={hook.name}
                className="group p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-purple)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: hook.color }}
                  />
                  <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                    {hook.name}
                  </code>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  {hook.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {hook.apis.map((api) => (
                    <span
                      key={api}
                      className="px-2 py-0.5 rounded text-xs font-mono"
                      style={{
                        background: `color-mix(in srgb, ${hook.color} 10%, transparent)`,
                        color: hook.color,
                      }}
                    >
                      {api}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 性能 Hooks */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="性能 Hooks"
            subtitle="记忆化、延迟初始化与渲染优化策略"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              性能 Hooks 是 Claude Code 保持流畅体验的秘诀。它们通过记忆化回调、
              延迟初始化引用、避免不必要重渲染等手段，确保在处理大量数据、
              频繁更新的终端界面中依然保持 60fps 的响应速度。
              在终端环境中性能尤为关键，因为每次渲染都意味着完整重绘可见区域。
            </p>
          </div>

          {/* useMemoizedCallbacks & useLazyRef patterns - replaces CodeBlock */}
          <ArchitectureDiagram
            title="性能 Hook 内部机制"
            nodes={[
              // useMemoizedCallbacks
              { id: "callbacks", label: "callbacks 输入", x: 10, y: 20, color: "#f59e0b" },
              { id: "useRef", label: "useRef (缓存)", x: 200, y: 20, color: "#f59e0b" },
              { id: "useMemo", label: "useMemo (比较)", x: 400, y: 20, color: "#f59e0b" },
              { id: "stableRef", label: "稳定引用输出", x: 590, y: 20, color: "#10b981" },
              // useLazyRef
              { id: "initializer", label: "initializer ()", x: 10, y: 110, color: "#ec4899" },
              { id: "nullCheck", label: "ref === null?", x: 200, y: 110, color: "#ec4899" },
              { id: "execute", label: "执行初始化", x: 400, y: 80, color: "#ec4899" },
              { id: "cached", label: "返回缓存值", x: 400, y: 140, color: "#10b981" },
              { id: "lazyOutput", label: "延迟初始化输出", x: 590, y: 110, color: "#10b981" },
            ]}
            edges={[
              { from: "callbacks", to: "useRef", label: "传入" },
              { from: "useRef", to: "useMemo", label: "JSON.stringify" },
              { from: "useMemo", to: "stableRef", label: "依赖不变" },
              { from: "initializer", to: "nullCheck" },
              { from: "nullCheck", to: "execute", label: "是" },
              { from: "nullCheck", to: "cached", label: "否" },
              { from: "execute", to: "lazyOutput" },
              { from: "cached", to: "lazyOutput" },
            ]}
            width={750}
            height={190}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#f59e0b" }}
                />
                <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                  useMemoizedCallbacks
                </code>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                记忆化回调函数集合。通过 ref + useMemo 的组合，在依赖不变时返回相同引用，
                避免因回调引用变化导致的子组件不必要重渲染。特别适用于传递给
                useMemo / useCallback 依赖数组中的回调集合。
              </p>
            </div>

            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#ec4899" }}
                />
                <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                  useLazyRef
                </code>
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                延迟初始化的 ref。与 useRef(initValue) 不同，useLazyRef 接受一个初始化函数，
                只在首次访问时执行，避免每次渲染都创建昂贵的初始值对象。
                适用于大型数据结构、WebSocket 连接等需要延迟创建的资源。
              </p>
            </div>
          </div>

          {/* Performance optimization flow - replaces CodeFlow */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="性能优化流程：从瓶颈到流畅"
              nodes={[
                // Step 1: Problem
                { id: "chatView", label: "ChatView 渲染", x: 10, y: 20, color: "#f43f5e" },
                { id: "newCallbacks", label: "每次创建新回调", x: 200, y: 20, color: "#f43f5e" },
                { id: "childReRender", label: "子组件重渲染", x: 420, y: 20, color: "#f43f5e" },
                // Step 2: Solution
                { id: "memoized", label: "useMemoizedCallbacks", x: 10, y: 100, color: "var(--accent-cyan)" },
                { id: "sameRef", label: "返回相同引用", x: 200, y: 100, color: "var(--accent-cyan)" },
                { id: "memoPass", label: "React.memo 通过", x: 420, y: 100, color: "var(--accent-cyan)" },
                // Step 3: Result
                { id: "final", label: "跳过重渲染", x: 10, y: 180, color: "#10b981" },
                { id: "perf60", label: "保持 60fps", x: 200, y: 180, color: "#10b981" },
                { id: "stable", label: "稳定 UI", x: 420, y: 180, color: "#10b981" },
              ]}
              edges={[
                // Problem flow
                { from: "chatView", to: "newCallbacks", label: "触发" },
                { from: "newCallbacks", to: "childReRender", label: "引用变化" },
                // Solution flow
                { from: "memoized", to: "sameRef", label: "依赖不变" },
                { from: "sameRef", to: "memoPass", label: "浅比较" },
                // Result flow
                { from: "memoPass", to: "final", label: "props 未变" },
                { from: "final", to: "perf60" },
                { from: "perf60", to: "stable" },
              ]}
              width={600}
              height={250}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: Hook 设计模式 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Hook 设计模式"
            subtitle="Claude Code 中的四大 Hook 设计原则与实践"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的 80+ Hooks 并非随意堆砌，而是遵循四条核心设计模式。
              这些模式相互配合，构成了一个层次清晰、职责明确的 Hooks 体系，
              使整个应用的状态管理既灵活又可控。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            {[
              {
                num: "01",
                title: "状态封装",
                color: "var(--accent-purple)",
                desc: "将复杂状态逻辑封装在 Hook 中，对外只暴露必要的 getter 和 setter。组件无需关心状态管理的内部实现，只需调用 Hook 提供的接口即可完成交互。例如 useTextInput 封装了光标位置、历史记录、选择范围等多个状态。",
              },
              {
                num: "02",
                title: "副作用隔离",
                color: "var(--accent-cyan)",
                desc: "使用 useEffect 将副作用逻辑从组件中隔离出来。每个 Hook 负责管理自己的副作用（订阅、定时器、网络请求），并在卸载时自动清理。例如 useRemoteSession 在内部管理 WebSocket 连接的生命周期。",
              },
              {
                num: "03",
                title: "性能优化",
                color: "var(--accent-blue)",
                desc: "通过 useMemo / useCallback 防止不必要的渲染，通过 useRef 缓存可变值。性能 Hook 将这些优化手段封装为可复用的模式，让开发者无需每次都手动写 useMemo 依赖数组。",
              },
              {
                num: "04",
                title: "组合模式",
                color: "#10b981",
                desc: "多个小 Hook 组合成更强大的 Hook。例如 useIDEIntegration 内部组合了 useFileSystem、useDiagnostics、useCursorPosition 等子 Hook，对外提供统一的 IDE 操作接口，实现了关注点分离和代码复用。",
              },
            ].map((pattern) => (
              <div
                key={pattern.num}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="text-2xl font-bold font-mono"
                    style={{ color: pattern.color }}
                  >
                    {pattern.num}
                  </span>
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">
                    {pattern.title}
                  </h5>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {pattern.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Composition pattern diagram - replaces CodeBlock */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="组合模式：useIDEIntegration 内部 Hook 组合"
              nodes={[
                // Parent hook
                { id: "ide", label: "useIDEIntegration", x: 250, y: 20, color: "#10b981" },
                // Sub-hooks
                { id: "fs", label: "useFileSystem", x: 10, y: 120, color: "var(--accent-purple)" },
                { id: "diag", label: "useDiagnostics", x: 170, y: 120, color: "var(--accent-cyan)" },
                { id: "cursor", label: "useCursorPosition", x: 340, y: 120, color: "var(--accent-blue)" },
                { id: "term", label: "useEmbeddedTerminal", x: 510, y: 120, color: "#f59e0b" },
                // Output APIs
                { id: "openFile", label: "openFile()", x: 60, y: 230, color: "#10b981" },
                { id: "showProblems", label: "showProblems()", x: 230, y: 230, color: "#10b981" },
                { id: "runInTerminal", label: "runInTerminal()", x: 410, y: 230, color: "#10b981" },
                { id: "connected", label: "connected", x: 580, y: 230, color: "#10b981" },
              ]}
              edges={[
                { from: "ide", to: "fs", label: "组合" },
                { from: "ide", to: "diag", label: "组合" },
                { from: "ide", to: "cursor", label: "组合" },
                { from: "ide", to: "term", label: "组合" },
                { from: "fs", to: "openFile", label: "open + moveToLine" },
                { from: "diag", to: "showProblems", label: "getAll" },
                { from: "term", to: "runInTerminal", label: "execute" },
                { from: "fs", to: "connected", label: "状态" },
                { from: "diag", to: "connected", label: "状态" },
              ]}
              width={750}
              height={300}
            />
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
