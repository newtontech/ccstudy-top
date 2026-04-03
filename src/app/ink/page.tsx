import { ModuleLayout } from "@/components/ModuleLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function InkPage() {
  const relatedModules = [
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构概览",
      icon: "\uD83C\uDFD7\uFE0F",
    },
    {
      title: "Hooks系统",
      href: "/hooks",
      description: "80+ React Hooks",
      icon: "\uD83E\uDE9D",
    },
    {
      title: "命令系统",
      href: "/commands",
      description: "命令行界面",
      icon: "\u2328\uFE0F",
    },
  ];

  const coreComponents = [
    {
      name: "Box",
      desc: "布局容器，支持 flexbox（对应 CSS flexbox）",
      code: `<Box flexDirection="column" padding={1}>
  <Text>Hello</Text>
</Box>`,
      color: "var(--accent-purple)",
    },
    {
      name: "Text",
      desc: "文本渲染，支持颜色、粗体、斜体、下划线",
      code: `<Text color="green" bold>
  Success!
</Text>`,
      color: "#10b981",
    },
    {
      name: "Input",
      desc: "文本输入框，支持 focus/blur 事件",
      code: `<Input
  value={text}
  onChange={setText}
  placeholder="输入..."
/>`,
      color: "var(--accent-cyan)",
    },
    {
      name: "Button",
      desc: "可点击按钮，支持键盘交互",
      code: `<Button onPress={() => submit()}>
  确认提交
</Button>`,
      color: "var(--accent-blue)",
    },
    {
      name: "ScrollView",
      desc: "虚拟滚动列表，处理大数据量",
      code: `<ScrollView height={20}>
  {items.map((item) => (
    <Row key={item.id} />
  ))}
</ScrollView>`,
      color: "#f59e0b",
    },
    {
      name: "Spinner",
      desc: "加载动画（旋转字符动画）",
      code: `<Spinner label="Loading..." />
// 渲染为: ⠋ Loading...
//   ⠙ Loading...  (持续旋转)`,
      color: "#ec4899",
    },
    {
      name: "ProgressBar",
      desc: "进度条组件",
      code: `<ProgressBar
  value={75}
  max={100}
  label="下载进度"
/>`,
      color: "#8b5cf6",
    },
    {
      name: "Tabs",
      desc: "标签页切换",
      code: `<Tabs items={["文件", "编辑"]}>
  <TabPanel>文件列表</TabPanel>
  <TabPanel>编辑器</TabPanel>
</Tabs>`,
      color: "#06b6d4",
    },
  ];

  return (
    <ModuleLayout
      title="Ink 终端 UI 框架"
      subtitle="基于 React 的声明式终端 UI 渲染引擎，250KB+ 代码实现从组件树到 ANSI 输出的完整桥梁"
      icon="\uD83C\uDFA8"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: Ink 框架概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Ink 框架概述"
            subtitle="React 声明式模型在终端中的完美落地"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 使用自研的 React 终端 UI 框架（ink），拥有{" "}
              <strong className="text-[var(--text-primary)]">250KB+</strong>{" "}
              的源代码。它基于 React 的声明式 UI 模型，但渲染目标从浏览器 DOM 变为了终端的 ANSI 转义序列输出。
              这一创新使得开发者可以用熟悉的 React 组件模式来构建丰富的终端交互界面。
            </p>
            <p>
              Ink 的核心思想是：开发者编写 React 组件树，ink 通过自定义的 React Reconciler
              将组件树转换为终端可理解的 ANSI 输出流。这意味着你可以使用 props、state、hooks、
              context 等 React 核心概念来构建终端应用，同时获得组件复用、状态管理和声明式编程的所有好处。
            </p>
          </div>

          <ArchitectureDiagram
            title="Ink 渲染管线"
            nodes={[
              // Row 1: Source
              {
                id: "components",
                label: "React Components",
                x: 80,
                y: 20,
                color: "var(--accent-purple)",
              },
              // Row 2: Processing
              {
                id: "reconciler",
                label: "Reconciler",
                x: 310,
                y: 120,
                color: "var(--accent-cyan)",
              },
              // Row 3: Output
              {
                id: "ansi",
                label: "ANSI Output",
                x: 80,
                y: 220,
                color: "var(--accent-blue)",
              },
              {
                id: "terminal",
                label: "Terminal",
                x: 540,
                y: 220,
                color: "#10b981",
              },
              // Sub-nodes for components
              {
                id: "box",
                label: "Box",
                x: 330,
                y: 10,
                color: "var(--accent-purple)",
              },
              {
                id: "text",
                label: "Text",
                x: 470,
                y: 10,
                color: "var(--accent-purple)",
              },
              {
                id: "input",
                label: "Input",
                x: 330,
                y: 55,
                color: "var(--accent-purple)",
              },
              {
                id: "button",
                label: "Button",
                x: 470,
                y: 55,
                color: "var(--accent-purple)",
              },
              {
                id: "scrollview",
                label: "ScrollView",
                x: 600,
                y: 10,
                color: "var(--accent-purple)",
              },
            ]}
            edges={[
              { from: "components", to: "reconciler", label: "JSX" },
              { from: "box", to: "components", label: "" },
              { from: "text", to: "components", label: "" },
              { from: "input", to: "components", label: "" },
              { from: "button", to: "components", label: "" },
              { from: "scrollview", to: "components", label: "" },
              { from: "reconciler", to: "ansi", label: "渲染" },
              { from: "ansi", to: "terminal", label: "输出" },
            ]}
            width={800}
            height={290}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: React 到终端的桥梁 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="React 到终端的桥梁"
            subtitle="从 JSX 到 ANSI：自定义 Reconciler 的实现原理"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Ink 的核心是一个自定义的{" "}
              <strong className="text-[var(--text-primary)]">React Reconciler</strong>{" "}
              实现。与 react-dom 使用浏览器 DOM API 不同，ink 的 reconciler 将 React 组件树
              转换为终端 ANSI 转义序列。这意味着 ink 并不依赖 react-dom，而是直接使用
              React 底层的 reconciler API 来定义自己的渲染目标。
            </p>
            <p>
              布局计算使用{" "}
              <strong className="text-[var(--text-primary)]">Yoga</strong>{" "}
              引擎（Facebook 开源的跨平台布局引擎），它将 CSS Flexbox 布局算法映射到终端的行列坐标系统中。
              每个 Box 组件都对应一个 Yoga 节点，通过 flexbox 属性计算出精确的终端坐标位置。
            </p>
          </div>

          <CodeBlock
            code={`// React 组件 → 终端渲染
// <Box padding={1}>        → ANSI 定位 + 空白
//   <Text color="green">   → \\x1b[32m (绿色 ANSI 码)
//     Hello World
//   </Text>                 → \\x1b[0m (重置)
// </Box>

// 实际渲染到终端的 ANSI 输出：
// \\x1b[1;1H  (光标移动到 1,1)
// \\x1b[32mHello World\\x1b[0m  (绿色文字 + 重置)`}
            language="typescript"
            filename="ink-rendering.ts"
            highlights={[2, 3, 4, 5, 6]}
          />

          <div className="mt-8">
            <CodeFlow
              title="Reconciler 渲染流程"
              steps={[
                {
                  code: `// Step 1: React 组件树描述 UI 结构
function App() {
  return (
    <Box flexDirection="column" padding={1}>
      <Text color="green" bold>
        Welcome to Claude Code
      </Text>
      <Text color="gray">
        Type your message below
      </Text>
    </Box>
  );
}`,
                  highlight: [2, 3, 4, 5, 6, 8, 9, 10, 12],
                  description:
                    "开发者使用熟悉的 JSX 语法编写终端 UI。React 组件树描述了 UI 的结构和属性，包括布局方向、内边距、文本颜色等。",
                },
                {
                  code: `// Step 2: 自定义 Reconciler 处理组件树
const reconciler = Reconciler({
  createInstance(type, props) {
    // 根据组件类型创建终端节点
    if (type === "box") return createYogaNode(props);
    if (type === "text") return createTextNode(props);
  },
  appendChild(parent, child) {
    // 构建节点树
    parent.appendChild(child);
  },
  // ... 其他 reconciler 方法
});`,
                  highlight: [2, 3, 4, 5, 6, 8, 9, 10, 12],
                  description:
                    "自定义 Reconciler 拦截 React 的渲染指令。当 React 创建、更新、删除节点时，reconciler 将这些操作转换为对终端节点树的操作。",
                },
                {
                  code: `// Step 3: Yoga 引擎计算布局
const layout = yogaNode.computeLayout();
// layout = {
//   left: 1, top: 1,
//   width: 40, height: 2
// }

// 将布局坐标映射到终端行列
const terminalX = layout.left;
const terminalY = layout.top;`,
                  highlight: [2, 3, 4, 5, 6, 9, 10],
                  description:
                    "Yoga 布局引擎计算每个节点的精确位置和尺寸。这些坐标随后被映射到终端的行列系统中，确定每个元素在终端屏幕上的渲染位置。",
                },
                {
                  code: `// Step 4: 生成 ANSI 输出并写入终端
const output = [
  "\\x1b[1;1H",              // 定位光标
  "\\x1b[1m",                // 粗体
  "\\x1b[32m",               // 绿色
  "Welcome to Claude Code",  // 文本内容
  "\\x1b[0m",                // 重置所有样式
  "\\x1b[2;1H",              // 下一行
  "\\x1b[90m",               // 灰色
  "Type your message below",
  "\\x1b[0m",                // 重置
].join("");

process.stdout.write(output);`,
                  highlight: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14],
                  description:
                    "最终阶段：将节点树和布局信息转换为 ANSI 转义序列字符串，通过 process.stdout.write() 写入终端，完成渲染。",
                },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: 核心组件 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="核心组件"
            subtitle="构建终端 UI 的八大基础组件"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed mb-8">
            <p>
              Ink 提供了一套完整的终端 UI 组件库，每个组件都针对终端环境做了深度优化。
              从基础的布局容器 Box 到复杂的虚拟滚动列表 ScrollView，这些组件覆盖了
              终端应用开发的所有常见需求。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {coreComponents.map((comp) => (
              <div
                key={comp.name}
                className="group p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-300 hover:shadow-lg hover:border-[var(--accent-purple)]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: comp.color }}
                  />
                  <code className="text-base font-semibold font-mono text-[var(--text-primary)]">
                    {comp.name}
                  </code>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  {comp.desc}
                </p>
                <div className="rounded-lg bg-[#0d1117] border border-gray-700/50 p-3 overflow-x-auto">
                  <pre className="text-xs font-mono text-gray-300 whitespace-pre">
                    {comp.code}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: 样式系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="样式系统"
            subtitle="ANSI 颜色、Flexbox 布局与主题引擎"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Ink 的样式系统提供了三层颜色支持：{" "}
              <strong className="text-[var(--text-primary)]">16色标准 ANSI</strong>、
              <strong className="text-[var(--text-primary)]">256色扩展调色板</strong> 和{" "}
              <strong className="text-[var(--text-primary)]">True Color (24位)</strong>。
              布局方面使用 Yoga 引擎实现了完整的 CSS Flexbox 子集映射，
              让开发者可以用 flexDirection、justifyContent、alignItems 等熟悉的属性来布局终端界面。
            </p>
            <p>
              主题系统支持亮色和暗色终端适配，通过检测终端的 colorScheme 环境变量自动切换。
              所有颜色、字体样式都通过统一的 theme 对象管理，确保整个应用风格一致。
            </p>
          </div>

          <CodeBlock
            code={`const theme = {
  colors: {
    primary: '#7c3aed',     // 紫色主色
    secondary: '#2563eb',   // 蓝色辅色
    success: '#10b981',     // 绿色成功
    error: '#ef4444',       // 红色错误
    muted: '#94a3b8',       // 灰色次要
  },
  font: {
    bold: '\\x1b[1m',
    italic: '\\x1b[3m',
    underline: '\\x1b[4m',
  }
};`}
            language="typescript"
            filename="theme.ts"
            highlights={[2, 3, 4, 5, 6, 7, 9, 10, 11, 12]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "ANSI 颜色",
                desc: "支持标准 16 色、256 色扩展和 True Color 24 位全彩，自动检测终端能力降级显示",
                icon: "\uD83C\uDFA8",
                color: "var(--accent-purple)",
              },
              {
                title: "Flexbox 布局",
                desc: "基于 Yoga 引擎实现，支持 flexDirection、gap、padding、margin 等完整 Flexbox 属性",
                icon: "\uD83D\uDDC2\uFE0F",
                color: "var(--accent-cyan)",
              },
              {
                title: "主题切换",
                desc: "亮色/暗色终端自适应，统一管理颜色和样式，通过 ThemeProvider 注入全局主题",
                icon: "\uD83C\uDF19",
                color: "var(--accent-blue)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h5 className="text-base font-semibold text-[var(--text-primary)] mb-2">
                  {item.title}
                </h5>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <CodeBlock
              code={`// Flexbox 布局映射示例
<Box flexDirection="column" gap={1}>
  <Box flexDirection="row" justifyContent="space-between">
    <Text color="primary">文件名</Text>
    <Text color="muted">大小</Text>
  </Box>
  <Box paddingX={2}>
    <Text>src/index.ts</Text>
    <Text color="muted">2.4 KB</Text>
  </Box>
</Box>

// 终端渲染效果：
// ┌─────────────────────────┐
// │ 文件名              大小 │
// │   src/index.ts    2.4 KB│
// └─────────────────────────┘`}
              language="tsx"
              filename="flexbox-layout.tsx"
              highlights={[2, 3, 4, 5, 11, 12, 13, 14]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 虚拟滚动 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="虚拟滚动"
            subtitle="高性能大列表渲染的关键技术"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              终端环境对性能极其敏感，每次渲染都需要重绘整个可见区域。当面对长文件内容、
              大量日志输出或搜索结果时，全量渲染会导致严重的性能问题。
              Ink 通过{" "}
              <strong className="text-[var(--text-primary)]">useVirtualScroll</strong>{" "}
              hook 实现了虚拟滚动机制，只渲染当前可视区域内的列表项，
              将渲染开销从 O(n) 降至 O(viewport)。
            </p>
            <p>
              该 hook 接受列表总数、单项高度、视口高度和 overscan 参数，
              计算出当前需要渲染的起止索引和偏移量，确保滚动流畅性的同时将渲染压力降到最低。
            </p>
          </div>

          <CodeBlock
            code={`function useVirtualScroll(options: {
  itemCount: number;
  itemHeight: number;
  viewportHeight: number;
  overscan?: number; // 额外渲染的行数
}) {
  // 只渲染可视区域 + overscan 范围内的项
  // 返回：startIndex, endIndex, offsetY
}`}
            language="typescript"
            filename="useVirtualScroll.ts"
            highlights={[1, 2, 3, 4, 5, 6, 8, 9]}
          />

          <div className="mt-8">
            <CodeFlow
              title="虚拟滚动工作原理"
              steps={[
                {
                  code: `// Step 1: 计算可视范围
const { scrollTop, viewportHeight } = state;
const startIndex = Math.floor(scrollTop / itemHeight);
const visibleCount = Math.ceil(viewportHeight / itemHeight);
const endIndex = startIndex + visibleCount;`,
                  highlight: [2, 3, 4, 5],
                  description:
                    "根据当前滚动位置和视口高度，计算出需要渲染的起止索引。这是虚拟滚动的核心计算步骤。",
                },
                {
                  code: `// Step 2: 加入 overscan 缓冲区
const overscanStart = Math.max(
  0, startIndex - overscan
);
const overscanEnd = Math.min(
  itemCount - 1, endIndex + overscan
);`,
                  highlight: [2, 3, 4, 5, 6, 7],
                  description:
                    "为防止滚动时出现空白闪烁，在可视范围上下各增加 overscan 行的缓冲区域，提前渲染即将进入视口的项。",
                },
                {
                  code: `// Step 3: 只渲染范围内的项
const items = data.slice(overscanStart, overscanEnd + 1);
const offsetY = overscanStart * itemHeight;

return (
  <Box height={viewportHeight} overflow="hidden">
    <Box paddingTop={offsetY}>
      {items.map(item => <Row key={item.id} />)}
    </Box>
  </Box>
);`,
                  highlight: [2, 3, 5, 6, 7, 8, 9],
                  description:
                    "只渲染经过 overscan 扩展后的列表项，通过 paddingTop 将渲染内容定位到正确的滚动位置。",
                },
              ]}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: 与 React DOM 的对比 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="与 React DOM 的对比"
            subtitle="两种渲染目标的架构差异"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              虽然 Ink 和 React DOM 都基于相同的 React 核心库，但由于渲染目标的根本差异，
              两者在布局引擎、事件处理、样式实现等方面存在显著不同。
              下表详细对比了两者的关键差异，帮助理解 Ink 的设计选择。
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse my-6">
              <thead>
                <tr className="border-b border-[var(--card-border)]">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)] bg-[var(--card-bg)] rounded-tl-lg">
                    特性
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)] bg-[var(--card-bg)]">
                    React DOM
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--text-primary)] bg-[var(--card-bg)] rounded-tr-lg">
                    React Ink
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "渲染目标",
                    dom: "DOM 节点",
                    ink: "ANSI 终端输出",
                    icon: "\uD83D\uDDA5\uFE0F",
                  },
                  {
                    feature: "布局系统",
                    dom: "CSS Flexbox/Grid",
                    ink: "Yoga (Flexbox only)",
                    icon: "\uD83D\uDDC2\uFE0F",
                  },
                  {
                    feature: "事件系统",
                    dom: "鼠标+键盘+触摸",
                    ink: "键盘为主 + 终端鼠标",
                    icon: "\u2328\uFE0F",
                  },
                  {
                    feature: "样式",
                    dom: "CSS/SCSS",
                    ink: "ANSI 转义码",
                    icon: "\uD83C\uDFA8",
                  },
                  {
                    feature: "滚动",
                    dom: "CSS overflow",
                    ink: "虚拟滚动",
                    icon: "\uD83D\uDCD6",
                  },
                  {
                    feature: "输入",
                    dom: "HTML Input",
                    ink: "原始 stdin",
                    icon: "\u270F\uFE0F",
                  },
                  {
                    feature: "图片",
                    dom: "img 标签",
                    ink: "Sixel/iTerm2 协议",
                    icon: "\uD83D\uDDBC\uFE0F",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-[var(--card-border)] ${
                      i % 2 === 0 ? "bg-[var(--card-bg)]" : ""
                    } hover:bg-[var(--card-bg)] transition-colors`}
                  >
                    <td className="py-3 px-4 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{row.icon}</span>
                        <span className="font-medium text-[var(--text-primary)]">
                          {row.feature}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--text-secondary)] font-mono">
                      {row.dom}
                    </td>
                    <td className="py-3 px-4 text-sm text-[var(--accent-cyan)] font-mono">
                      {row.ink}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 space-y-4 text-[var(--text-secondary)] leading-relaxed">
            <p>
              这些差异体现了终端环境的特点：有限的显示能力（行列式布局）、
              丰富的事件限制（以键盘为主）、以及独特的性能挑战（全量重绘）。
              Ink 针对每一个差异都做出了精心的设计决策，确保在终端约束下依然能提供优秀的开发体验。
            </p>
          </div>

          <div className="mt-8">
            <CodeBlock
              code={`// Ink 的 Reconciler 与 react-dom 的 Reconciler 对比
// react-dom 使用 createRoot() → DOM 节点
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("app"));
root.render(<App />);

// Ink 使用 render() → ANSI 输出流
import { render } from "ink";
render(<App />);
// 内部调用 Reconciler，将组件树写入 process.stdout`}
              language="typescript"
              filename="reconciler-comparison.ts"
              highlights={[2, 3, 4, 5, 8, 9, 10]}
            />
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
