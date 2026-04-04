import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function InkPage() {
  const relatedModules = [
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构概览",
      icon: "🏗️",
    },
    {
      title: "Hooks系统",
      href: "/hooks",
      description: "80+ React Hooks",
      icon: "🪝",
    },
    {
      title: "命令系统",
      href: "/commands",
      description: "命令行界面",
      icon: "⌨️",
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
      icon="🎨"
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

          {/* Replacement 1: JSX → ANSI escape code mapping */}
          <ArchitectureDiagram
            title="JSX 到 ANSI 转义码映射"
            nodes={[
              {
                id: "jsx-box",
                label: "<Box padding={1}>",
                x: 20,
                y: 20,
                color: "var(--accent-purple)",
              },
              {
                id: "jsx-text",
                label: '<Text color="green">',
                x: 20,
                y: 80,
                color: "var(--accent-purple)",
              },
              {
                id: "jsx-content",
                label: "Hello World",
                x: 20,
                y: 140,
                color: "var(--accent-blue)",
              },
              {
                id: "ansi-cursor",
                label: "\\x1b[1;1H",
                x: 350,
                y: 20,
                color: "var(--accent-cyan)",
              },
              {
                id: "ansi-green",
                label: "\\x1b[32m",
                x: 350,
                y: 80,
                color: "#10b981",
              },
              {
                id: "ansi-text",
                label: "Hello World",
                x: 350,
                y: 140,
                color: "var(--accent-blue)",
              },
              {
                id: "ansi-reset",
                label: "\\x1b[0m",
                x: 350,
                y: 200,
                color: "#ef4444",
              },
              {
                id: "mapping-label",
                label: "ANSI 转义码",
                x: 620,
                y: 80,
                color: "var(--accent-cyan)",
              },
              {
                id: "jsx-label",
                label: "JSX 组件",
                x: 620,
                y: 20,
                color: "var(--accent-purple)",
              },
            ]}
            edges={[
              { from: "jsx-label", to: "jsx-box", label: "定位+空白" },
              { from: "jsx-box", to: "ansi-cursor", label: "光标移动" },
              { from: "jsx-text", to: "ansi-green", label: "颜色码" },
              { from: "jsx-content", to: "ansi-text", label: "文本内容" },
              { from: "jsx-text", to: "ansi-reset", label: "样式重置" },
              { from: "ansi-green", to: "mapping-label", label: "" },
            ]}
            width={800}
            height={280}
          />

          {/* Replacement 2: Reconciler rendering flow (was CodeFlow) */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="Reconciler 渲染流程"
              nodes={[
                {
                  id: "step1-jsx",
                  label: "① JSX 组件树",
                  x: 20,
                  y: 40,
                  color: "var(--accent-purple)",
                },
                {
                  id: "step1-detail",
                  label: "Box/Text 嵌套结构",
                  x: 220,
                  y: 40,
                  color: "var(--accent-purple)",
                },
                {
                  id: "step2-reconciler",
                  label: "② 自定义 Reconciler",
                  x: 20,
                  y: 130,
                  color: "var(--accent-cyan)",
                },
                {
                  id: "step2-detail",
                  label: "createInstance / appendChild",
                  x: 220,
                  y: 130,
                  color: "var(--accent-cyan)",
                },
                {
                  id: "step3-yoga",
                  label: "③ Yoga 布局计算",
                  x: 20,
                  y: 220,
                  color: "var(--accent-blue)",
                },
                {
                  id: "step3-detail",
                  label: "left/top/width/height",
                  x: 220,
                  y: 220,
                  color: "var(--accent-blue)",
                },
                {
                  id: "step4-ansi",
                  label: "④ ANSI 输出",
                  x: 450,
                  y: 220,
                  color: "#10b981",
                },
                {
                  id: "step4-stdout",
                  label: "process.stdout",
                  x: 650,
                  y: 220,
                  color: "#10b981",
                },
              ]}
              edges={[
                { from: "step1-jsx", to: "step1-detail", label: "描述 UI" },
                { from: "step1-detail", to: "step2-reconciler", label: "拦截渲染" },
                { from: "step2-reconciler", to: "step2-detail", label: "节点操作" },
                { from: "step2-detail", to: "step3-yoga", label: "计算坐标" },
                { from: "step3-yoga", to: "step3-detail", label: "布局结果" },
                { from: "step3-detail", to: "step4-ansi", label: "生成序列" },
                { from: "step4-ansi", to: "step4-stdout", label: "写入终端" },
              ]}
              width={800}
              height={300}
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

          {/* Replacement 3: Theme structure diagram */}
          <ArchitectureDiagram
            title="主题对象结构"
            nodes={[
              {
                id: "theme",
                label: "theme",
                x: 300,
                y: 20,
                color: "var(--accent-purple)",
              },
              {
                id: "colors",
                label: "colors",
                x: 100,
                y: 120,
                color: "var(--accent-cyan)",
              },
              {
                id: "font",
                label: "font",
                x: 500,
                y: 120,
                color: "var(--accent-blue)",
              },
              {
                id: "primary",
                label: "primary #7c3aed",
                x: 0,
                y: 220,
                color: "#7c3aed",
              },
              {
                id: "secondary",
                label: "secondary #2563eb",
                x: 180,
                y: 220,
                color: "#2563eb",
              },
              {
                id: "success",
                label: "success #10b981",
                x: 360,
                y: 220,
                color: "#10b981",
              },
              {
                id: "error",
                label: "error #ef4444",
                x: 0,
                y: 290,
                color: "#ef4444",
              },
              {
                id: "muted",
                label: "muted #94a3b8",
                x: 180,
                y: 290,
                color: "#94a3b8",
              },
              {
                id: "bold",
                label: "bold \\x1b[1m",
                x: 450,
                y: 220,
                color: "var(--accent-blue)",
              },
              {
                id: "italic",
                label: "italic \\x1b[3m",
                x: 620,
                y: 220,
                color: "var(--accent-blue)",
              },
              {
                id: "underline",
                label: "underline \\x1b[4m",
                x: 450,
                y: 290,
                color: "var(--accent-blue)",
              },
            ]}
            edges={[
              { from: "theme", to: "colors", label: "颜色配置" },
              { from: "theme", to: "font", label: "字体样式" },
              { from: "colors", to: "primary", label: "" },
              { from: "colors", to: "secondary", label: "" },
              { from: "colors", to: "success", label: "" },
              { from: "colors", to: "error", label: "" },
              { from: "colors", to: "muted", label: "" },
              { from: "font", to: "bold", label: "" },
              { from: "font", to: "italic", label: "" },
              { from: "font", to: "underline", label: "" },
            ]}
            width={800}
            height={360}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "ANSI 颜色",
                desc: "支持标准 16 色、256 色扩展和 True Color 24 位全彩，自动检测终端能力降级显示",
                icon: "🎨",
                color: "var(--accent-purple)",
              },
              {
                title: "Flexbox 布局",
                desc: "基于 Yoga 引擎实现，支持 flexDirection、gap、padding、margin 等完整 Flexbox 属性",
                icon: "📐️",
                color: "var(--accent-cyan)",
              },
              {
                title: "主题切换",
                desc: "亮色/暗色终端自适应，统一管理颜色和样式，通过 ThemeProvider 注入全局主题",
                icon: "🌙",
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

          {/* Replacement 4: Flexbox layout in terminal diagram */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="Flexbox 布局在终端中的映射"
              nodes={[
                {
                  id: "outer-box",
                  label: 'Box flexDirection="column"',
                  x: 260,
                  y: 20,
                  color: "var(--accent-purple)",
                },
                {
                  id: "row1",
                  label: 'Box row justifyContent="space-between"',
                  x: 100,
                  y: 110,
                  color: "var(--accent-cyan)",
                },
                {
                  id: "row2",
                  label: 'Box paddingX={2}',
                  x: 100,
                  y: 200,
                  color: "var(--accent-cyan)",
                },
                {
                  id: "label-name",
                  label: 'Text "文件名"',
                  x: 0,
                  y: 290,
                  color: "#10b981",
                },
                {
                  id: "label-size",
                  label: 'Text "大小"',
                  x: 320,
                  y: 290,
                  color: "#94a3b8",
                },
                {
                  id: "file-name",
                  label: 'Text "src/index.ts"',
                  x: 0,
                  y: 360,
                  color: "#10b981",
                },
                {
                  id: "file-size",
                  label: 'Text "2.4 KB"',
                  x: 320,
                  y: 360,
                  color: "#94a3b8",
                },
              ]}
              edges={[
                { from: "outer-box", to: "row1", label: "子元素" },
                { from: "outer-box", to: "row2", label: "子元素" },
                { from: "row1", to: "label-name", label: "primary" },
                { from: "row1", to: "label-size", label: "muted" },
                { from: "row2", to: "file-name", label: "" },
                { from: "row2", to: "file-size", label: "muted" },
              ]}
              width={800}
              height={430}
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

          {/* Replacement 5: useVirtualScroll parameters diagram */}
          <ArchitectureDiagram
            title="useVirtualScroll 参数与返回值"
            nodes={[
              {
                id: "hook",
                label: "useVirtualScroll",
                x: 280,
                y: 20,
                color: "var(--accent-purple)",
              },
              {
                id: "param-count",
                label: "itemCount: number",
                x: 20,
                y: 120,
                color: "var(--accent-cyan)",
              },
              {
                id: "param-height",
                label: "itemHeight: number",
                x: 220,
                y: 120,
                color: "var(--accent-cyan)",
              },
              {
                id: "param-viewport",
                label: "viewportHeight: number",
                x: 420,
                y: 120,
                color: "var(--accent-cyan)",
              },
              {
                id: "param-overscan",
                label: "overscan?: number",
                x: 620,
                y: 120,
                color: "var(--accent-cyan)",
              },
              {
                id: "ret-start",
                label: "startIndex",
                x: 80,
                y: 230,
                color: "#10b981",
              },
              {
                id: "ret-end",
                label: "endIndex",
                x: 250,
                y: 230,
                color: "#10b981",
              },
              {
                id: "ret-offset",
                label: "offsetY",
                x: 420,
                y: 230,
                color: "#10b981",
              },
            ]}
            edges={[
              { from: "param-count", to: "hook", label: "列表总数" },
              { from: "param-height", to: "hook", label: "单项高度" },
              { from: "param-viewport", to: "hook", label: "视口高度" },
              { from: "param-overscan", to: "hook", label: "缓冲行数" },
              { from: "hook", to: "ret-start", label: "起始索引" },
              { from: "hook", to: "ret-end", label: "结束索引" },
              { from: "hook", to: "ret-offset", label: "Y轴偏移" },
            ]}
            width={800}
            height={300}
          />

          {/* Replacement 6: Virtual scroll flow (was CodeFlow) */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="虚拟滚动工作原理"
              nodes={[
                {
                  id: "input",
                  label: "滚动状态",
                  x: 20,
                  y: 40,
                  color: "var(--accent-purple)",
                },
                {
                  id: "calc",
                  label: "① 计算可视范围",
                  x: 220,
                  y: 40,
                  color: "var(--accent-cyan)",
                },
                {
                  id: "overscan",
                  label: "② Overscan 缓冲",
                  x: 440,
                  y: 40,
                  color: "var(--accent-blue)",
                },
                {
                  id: "render",
                  label: "③ 渲染可见项",
                  x: 620,
                  y: 40,
                  color: "#10b981",
                },
                {
                  id: "detail-scroll",
                  label: "scrollTop + viewportHeight",
                  x: 20,
                  y: 150,
                  color: "var(--accent-purple)",
                },
                {
                  id: "detail-calc",
                  label: "startIndex ~ endIndex",
                  x: 220,
                  y: 150,
                  color: "var(--accent-cyan)",
                },
                {
                  id: "detail-over",
                  label: "overscanStart ~ overscanEnd",
                  x: 440,
                  y: 150,
                  color: "var(--accent-blue)",
                },
                {
                  id: "detail-render",
                  label: "data.slice() + offsetY",
                  x: 620,
                  y: 150,
                  color: "#10b981",
                },
                {
                  id: "perf",
                  label: "O(viewport) 渲染开销",
                  x: 320,
                  y: 250,
                  color: "#f59e0b",
                },
              ]}
              edges={[
                { from: "input", to: "calc", label: "" },
                { from: "calc", to: "overscan", label: "" },
                { from: "overscan", to: "render", label: "" },
                { from: "detail-scroll", to: "input", label: "" },
                { from: "detail-calc", to: "calc", label: "" },
                { from: "detail-over", to: "overscan", label: "" },
                { from: "detail-render", to: "render", label: "" },
                { from: "render", to: "perf", label: "性能优化" },
              ]}
              width={800}
              height={310}
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
                    icon: "🖥️",
                  },
                  {
                    feature: "布局系统",
                    dom: "CSS Flexbox/Grid",
                    ink: "Yoga (Flexbox only)",
                    icon: "📐️",
                  },
                  {
                    feature: "事件系统",
                    dom: "鼠标+键盘+触摸",
                    ink: "键盘为主 + 终端鼠标",
                    icon: "⌨️",
                  },
                  {
                    feature: "样式",
                    dom: "CSS/SCSS",
                    ink: "ANSI 转义码",
                    icon: "🎨",
                  },
                  {
                    feature: "滚动",
                    dom: "CSS overflow",
                    ink: "虚拟滚动",
                    icon: "📖",
                  },
                  {
                    feature: "输入",
                    dom: "HTML Input",
                    ink: "原始 stdin",
                    icon: "✏️",
                  },
                  {
                    feature: "图片",
                    dom: "img 标签",
                    ink: "Sixel/iTerm2 协议",
                    icon: "🖼️",
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

          {/* Replacement 7: react-dom vs ink side-by-side diagram */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="Reconciler 对比：react-dom vs ink"
              nodes={[
                {
                  id: "react",
                  label: "React Core",
                  x: 310,
                  y: 20,
                  color: "var(--accent-purple)",
                },
                {
                  id: "dom-reconciler",
                  label: "react-dom Reconciler",
                  x: 40,
                  y: 130,
                  color: "var(--accent-blue)",
                },
                {
                  id: "ink-reconciler",
                  label: "ink Reconciler",
                  x: 500,
                  y: 130,
                  color: "var(--accent-cyan)",
                },
                {
                  id: "dom-create",
                  label: "createRoot()",
                  x: 40,
                  y: 230,
                  color: "var(--accent-blue)",
                },
                {
                  id: "ink-render",
                  label: "render()",
                  x: 500,
                  y: 230,
                  color: "var(--accent-cyan)",
                },
                {
                  id: "dom-target",
                  label: "DOM 节点",
                  x: 40,
                  y: 330,
                  color: "var(--accent-blue)",
                },
                {
                  id: "ink-target",
                  label: "process.stdout",
                  x: 500,
                  y: 330,
                  color: "var(--accent-cyan)",
                },
                {
                  id: "dom-label",
                  label: "浏览器渲染",
                  x: 220,
                  y: 280,
                  color: "var(--accent-blue)",
                },
                {
                  id: "ink-label",
                  label: "终端渲染",
                  x: 620,
                  y: 280,
                  color: "var(--accent-cyan)",
                },
              ]}
              edges={[
                { from: "react", to: "dom-reconciler", label: "" },
                { from: "react", to: "ink-reconciler", label: "" },
                { from: "dom-reconciler", to: "dom-create", label: "入口" },
                { from: "ink-reconciler", to: "ink-render", label: "入口" },
                { from: "dom-create", to: "dom-target", label: "写入" },
                { from: "ink-render", to: "ink-target", label: "写入" },
                { from: "dom-target", to: "dom-label", label: "" },
                { from: "ink-target", to: "ink-label", label: "" },
              ]}
              width={800}
              height={400}
            />
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
