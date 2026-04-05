const zh = {
  // Navbar
  nav: {
    home: "首页",
    architecture: "架构",
    tools: "工具",
    commands: "命令",
    ink: "UI框架",
    plugins: "插件",
  },

  // Footer
  footer: {
    title: "CCStudy.top - Claude Code 源码解读",
    copyright: "© 2026",
  },

  // Hero
  hero: {
    title: "Claude Code 源码解读",
    subtitle: "深入探索 Anthropic 最强 AI 编程助手的源代码架构",
    stats: {
      tools: "工具",
      commands: "命令",
      modules: "核心模块",
    },
  },

  // Home page
  home: {
    architectureMap: {
      title: "架构全景",
      subtitle: "点击节点探索 Claude Code 的核心模块",
    },
    exploreModules: {
      title: "探索模块",
      subtitle: "点击卡片深入了解每个模块",
    },
    learningPath: {
      title: "学习路线",
      subtitle: "选择你的探索路径 — 从快速上手到深度架构",
      paths: {
        "quick-start": {
          title: "快速上手",
          description: "几分钟内掌握 Claude Code 的核心概念",
        },
        "deep-source": {
          title: "深度源码",
          description: "深入关键子系统的实现细节",
        },
        architecture: {
          title: "架构设计",
          description: "理解高层设计模式和系统边界",
        },
      },
    },
    glossary: {
      title: "术语表",
      subtitle: "Claude Code 架构中的关键术语和概念",
      learnMore: "了解更多",
    },
  },

  // Feature Grid - module cards
  modules: {
    architecture: {
      title: "系统架构",
      description: "Claude Code 的整体架构与核心设计模式",
    },
    entry: {
      title: "入口与启动",
      description: "从 main.tsx 到应用就绪的完整启动流程",
    },
    tools: {
      title: "工具系统",
      description: "40+ 内置工具的实现与扩展机制",
    },
    commands: {
      title: "命令系统",
      description: "命令行界面的完整命令参考与实现",
    },
    ink: {
      title: "Ink UI框架",
      description: "基于 React 的终端 UI 渲染框架",
    },
    plugins: {
      title: "插件与MCP",
      description: "插件系统、技能系统与 Model Context Protocol",
    },
    assistant: {
      title: "KAIROS 助手",
      description: "持久化运行的 AI 助手模式",
    },
    coordinator: {
      title: "多智能体协调",
      description: "Coordinator 模式的多 Agent 编排系统",
    },
    hooks: {
      title: "Hooks 系统",
      description: "80+ 自定义 React Hooks 详解",
    },
    buddy: {
      title: "Buddy 伴侣",
      description: "Tamagotchi 风格的确定性行囊系统",
    },
  },

  // ModuleLayout
  layout: {
    homeBreadcrumb: "首页",
    relatedModules: "相关模块",
  },

  // Architecture page
  architecture: {
    title: "系统架构",
    subtitle:
      "Claude Code 核心架构的深度剖析 —— 分层设计、消息流、状态管理与性能策略",
    category: "核心架构",
    related: {
      entry: { title: "入口与启动", description: "启动流程详解" },
      tools: { title: "工具系统", description: "40+ 工具实现" },
      commands: { title: "命令系统", description: "命令行界面" },
      plugins: { title: "插件系统", description: "扩展机制" },
    },
    overview: {
      title: "架构概述",
      subtitle: "分层设计的艺术",
      p1: "Claude Code 是一个基于",
      p1strong: "React + TypeScript",
      p1mid: "构建的高度复杂的 CLI 应用程序。它采用了一种独特的架构方案——将 React 组件模型引入终端环境，通过自定义的",
      p1code: "ink",
      p1end: "框架将 React 组件树渲染为 ANSI 终端输出。这意味着开发者可以像编写 Web 应用一样编写终端应用，享受组件化、状态管理和声明式 UI 的所有优势。",
      p2: "整个系统采用经典的分层架构，从底层的基础设施到顶层的用户界面，每一层都有明确的职责边界。这种设计不仅使得代码易于理解和维护，还允许各层独立演进而不会产生连锁反应。",
      fiveLayerTitle: "Claude Code 五层架构",
      layers: [
        { layer: "L5", name: "UI 层", desc: "ink 终端渲染、React 组件、Hooks" },
        { layer: "L4", name: "扩展层", desc: "插件、Skills、MCP 协议" },
        { layer: "L3", name: "引擎层", desc: "查询引擎、工具系统、命令分发" },
        { layer: "L2", name: "状态层", desc: "全局状态、Context、记忆系统" },
        { layer: "L1", name: "基础层", desc: "Bootstrap、CLI 解析、主入口" },
      ],
    },
    messageFlow: {
      title: "消息流",
      subtitle: "从用户输入到界面更新的完整旅程",
      desc: "Claude Code 的核心是一个精心设计的消息处理管道。当用户在终端中输入一条指令时，这条消息会经历一系列转换和处理步骤：从原始文本输入到智能上下文增强，从 API 调用到工具执行，最终回到终端界面的渲染更新。每一步都经过优化，确保用户体验流畅且响应迅速。",
      pipeTitle: "消息处理管道",
      steps: [
        {
          step: "1",
          title: "用户输入捕获",
          desc: "用户在终端中输入指令，TextInput 组件捕获输入，构建标准化的用户消息对象，并追加到对话历史中。",
        },
        {
          step: "2",
          title: "QueryEngine 上下文增强",
          desc: "QueryEngine 对消息进行上下文增强：获取 git 状态、项目信息、已注册工具列表和当前权限，构建完整的系统提示词。",
        },
        {
          step: "3",
          title: "API 调用与流式响应",
          desc: "将增强后的消息发送给 Claude API。启用流式响应（stream: true），每个 token 到达时立即更新终端显示，用户可以看到 Claude 的思考过程实时展开。",
        },
        {
          step: "4",
          title: "工具调用与权限验证",
          desc: "Claude 分析请求后决定使用工具（如 FileReadTool），系统先进行权限检查，然后执行工具并将结果反馈给 Claude 继续推理。",
        },
        {
          step: "5",
          title: "工具结果反馈与对话循环",
          desc: "工具执行完毕后，结果被包装为 tool_result 消息追加到对话历史，然后反馈给 Claude 继续推理。整个循环会持续进行，直到 Claude 给出最终回复。",
        },
      ],
    },
    stateManagement: {
      title: "状态管理",
      subtitle: "集中式状态与分布式上下文",
      desc: "Claude Code 的状态管理采用了",
      descstrong1: "集中式全局状态",
      descmid: "与",
      descstrong2: "React Context",
      descend: "相结合的混合方案。全局状态由",
      desccode: "bootstrap/state.ts",
      descfinal: "集中管理，包含应用生命周期中的关键数据；而 UI 相关的状态则通过 React Context 在组件树中分发，确保每个组件都能获取所需的状态而无需层层传递 props。",
      stateFlowTitle: "状态流架构",
      stateFlowDesc: "状态在系统中的流向遵循严格的单向数据流原则：",
      phases: [
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
      ],
    },
    toolRegistration: {
      title: "工具注册与执行",
      subtitle: "40+ 内置工具的统一管理",
      desc: "Claude Code 的工具系统是其最强大的能力来源。每个工具都实现了一个统一的接口，确保无论是内置工具（如文件读写、代码搜索）还是外部工具（如 MCP 服务器提供的工具），都能以相同的方式被注册、发现和调用。这种设计带来了极高的可扩展性。",
      permissionTitle: "权限检查流程",
      permissionDesc: "每个工具调用都会经过多层权限验证，确保用户的安全和隐私不会被侵犯：",
      permissions: [
        { step: "Feature Flags", desc: "检查实验性功能开关，确定工具是否启用" },
        {
          step: "Permission Mode",
          desc: "检查当前权限模式（auto/manual/bypass），决定是否自动批准",
        },
        {
          step: "Tool-Specific Check",
          desc: "工具级别的权限检查，如文件路径限制、网络访问控制等",
        },
        {
          step: "User Consent",
          desc: "在 manual 模式下弹出确认对话框，由用户决定是否执行",
        },
      ],
    },
    performance: {
      title: "性能优化策略",
      subtitle: "毫秒级响应背后的工程实践",
      desc: "Claude Code 在性能优化方面投入了大量工程努力。从启动时的懒加载到运行时的记忆化缓存，从大数据量的虚拟滚动到后台任务的非阻塞执行，每一个优化都经过精心设计，确保终端中的交互体验尽可能流畅。",
      items: [
        {
          title: "Lazy Loading",
          desc: "动态导入重型模块，只在需要时加载",
          detail: "通过 dynamic import 和条件加载，避免在启动时加载不必要的代码。例如协调器模式只在 feature flag 开启时才加载。",
        },
        {
          title: "Memoization",
          desc: "React.memo + useMemo 广泛使用",
          detail: "对于复杂的 UI 组件和计算密集型操作，使用 React.memo 避免不必要的重渲染，useMemo 缓存计算结果。",
        },
        {
          title: "Virtual Scrolling",
          desc: "大列表的虚拟化渲染",
          detail: "在显示大型文件列表、搜索结果等场景下，只渲染可见区域的元素，大幅减少 DOM 操作和内存占用。",
        },
        {
          title: "Background Tasks",
          desc: "非阻塞异步操作",
          detail: "遥测上报、配置预取、分析数据收集等操作在后台执行，使用 void Promise.all 模式确保不阻塞主线程。",
        },
      ],
    },
    permission: {
      title: "权限系统",
      subtitle: "多层防护的安全模型",
      desc: "Claude Code 的权限系统采用多层防御策略，从全局的功能开关到细粒度的用户确认，每一层都提供了不同级别的安全保护。这种设计确保了在各种使用场景下——从个人开发到企业环境——都能提供适当的安全级别。",
      layers: [
        {
          layer: "Feature Flags",
          desc: "功能开关层",
          detail: "通过 feature flag 系统控制实验性功能的开启和关闭。新工具和新功能首先通过 flag 控制，经过充分测试后才会默认启用。这确保了只有经过验证的能力才会暴露给用户。",
        },
        {
          layer: "Permission Modes",
          desc: "权限模式层",
          detail: "三种权限模式满足不同安全需求：auto 模式自动批准安全操作；manual 模式对所有敏感操作弹出确认；bypass 模式用于 CI/CD 等自动化场景，通过环境变量控制。",
        },
        {
          layer: "Tool-Specific Permissions",
          desc: "工具级权限层",
          detail: "每个工具可以定义自己的权限检查逻辑。例如文件操作工具会检查路径是否在项目目录内，网络工具会检查 URL 是否在白名单中。这种细粒度的控制确保了工具只能执行被允许的操作。",
        },
        {
          layer: "User Consent",
          desc: "用户确认层",
          detail: "在 manual 模式下，敏感操作（如文件写入、命令执行）会弹出交互式确认对话框。用户可以一次性批准或拒绝，也可以选择\"本次会话始终允许\"，在安全性和便利性之间取得平衡。",
        },
      ],
    },
    contextManagement: {
      title: "上下文管理",
      subtitle: "让 Claude 理解你的项目",
      desc: "上下文管理是 Claude Code 智能化的关键。系统通过多种渠道收集和整合上下文信息，帮助 Claude 深入理解用户的项目环境、编码习惯和团队规范。这些上下文信息在每次 API 调用时都会被精心组织和注入，确保 Claude 的回复始终贴合实际场景。",
      contexts: [
        {
          title: "系统上下文",
          desc: "System Context",
          items: [
            "Git 仓库状态（分支、变更、冲突）",
            "系统信息（操作系统、Node.js 版本）",
            "环境变量与配置",
            "网络连接状态",
          ],
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
        },
      ],
    },
  },

  // Entry page
  entry: {
    title: "入口与启动",
    subtitle: "从 main.tsx 到应用就绪的完整启动流程",
    category: "核心架构",
    related: {
      architecture: { title: "系统架构", description: "整体架构与核心设计模式" },
      tools: { title: "工具系统", description: "40+ 内置工具实现" },
      plugins: { title: "插件系统", description: "插件与 MCP 扩展" },
    },
    overview: {
      title: "概述",
      subtitle: "Claude Code 启动流程全景",
      p1: "Claude Code 的启动流程看似简单——一行命令",
      p1code: "claude",
      p1mid: "即可启动——但背后隐藏着精心设计的优化策略。主入口文件",
      p1code2: "main.tsx",
      p1end: "虽然编译后高达 785KB，却通过一系列快速路径判断和并行预取机制，实现了令人印象深刻的启动速度。",
      p2: "整个启动流程可以分为四个阶段：快速路径检测、并行预取启动、核心初始化、以及命令分发。每个阶段都经过精心优化，确保用户获得最快的使用体验。",
    },
    mainEntry: {
      title: "main.tsx - 主入口",
      subtitle: "一切从这里开始",
      desc1: "是 Claude Code CLI 的入口文件，由 Node.js 在",
      desc1code: "package.json",
      desc1mid: "的",
      desc1code2: "bin",
      desc1end: "字段中指定。它的首要任务是尽快完成启动——为此，它在模块加载的同时就并行启动了关键子进程：",
      p1: "这里的设计非常巧妙：",
      p1strong1: "MDM（移动设备管理）配置读取",
      p1mid: "和",
      p1strong2: "macOS 钥匙串预取",
      p1end: "被放在模块顶层立即执行。这意味着在 Node.js 解析和加载剩余模块的同时，这两个 I/O 密集型操作已经开始并行运行，充分利用了 Node.js 的事件循环特性。",
      li1strong: "startMdmRawRead",
      li1: "：预读 MDM 配置，用于企业环境下的策略管理",
      li2strong: "startKeychainPrefetch",
      li2: "：预取 macOS 钥匙串中的认证凭据，加速后续 API 调用",
    },
    fastPath: {
      title: "快速路径优化",
      subtitle: "零延迟处理常见请求",
      desc: "Claude Code 为一系列不需要完整初始化的命令提供了快速路径（Fast Path）。这些命令在加载任何重量级模块之前就被拦截并处理，响应时间接近零。",
      allPathsTitle: "所有快速路径一览",
      paths: [
        { flag: "--version / -v", desc: "输出版本号后立即退出，不加载任何模块" },
        { flag: "--dump-system-prompt", desc: "导出系统提示词，用于调试和开发" },
        { flag: "--claude-in-chrome-mcp", desc: "启动 Chrome 浏览器 MCP 服务模式" },
        { flag: "--computer-use-mcp", desc: "启动计算机使用 MCP 服务模式" },
        { flag: "--daemon-worker", desc: "以守护进程工作模式启动" },
      ],
    },
    bootstrap: {
      title: "Bootstrap - 应用状态初始化",
      subtitle: "集中式状态管理的心脏",
      desc1code: "bootstrap/state.ts",
      desc1: "是 Claude Code 状态管理的核心。它维护了应用运行所需的全局状态，从工作目录到费用追踪，从会话标识到客户端类型检测，所有关键信息都汇聚于此。",
      advantagesTitle: "这种集中式状态设计有几个重要优势：",
      advantages: [
        { strong: "单一数据源", desc: "：所有模块通过同一个状态对象获取运行时信息，避免状态不一致" },
        { strong: "早期计算", desc: "：像 clientType 这样的值在启动时就确定，后续无需重复计算" },
        { strong: "可追踪性", desc: "：totalCostUSD 等字段提供了运行时的关键度量指标" },
      ],
    },
    clientDetection: {
      title: "客户端类型检测",
      subtitle: "自适应运行环境",
      desc: "Claude Code 不仅仅是 CLI 工具——它可以作为 TypeScript SDK、Python SDK、GitHub Action 等多种方式运行。启动时的环境检测确保了正确的行为模式。",
      clients: [
        { type: "cli", env: "（默认）", desc: "标准终端交互模式，支持流式输出和用户输入" },
        { type: "sdk-typescript", env: "CLAUDE_CODE_ENTRYPOINT=sdk-ts", desc: "TypeScript SDK 嵌入调用，程序化控制 Claude Code" },
        { type: "sdk-python", env: "CLAUDE_CODE_ENTRYPOINT=sdk-py", desc: "Python SDK 嵌入调用，适合数据科学和自动化场景" },
        { type: "github-action", env: "GITHUB_ACTIONS=true", desc: "CI/CD 环境，自动检测并调整输出格式和交互模式" },
      ],
    },
    transport: {
      title: "传输层架构",
      subtitle: "灵活的通信方式",
      desc: "Claude Code 的 CLI 与 API 之间通过可插拔的传输层进行通信。根据网络环境和部署场景的不同，系统会自动选择最优的传输方式：",
      transports: [
        {
          name: "HybridTransport",
          desc: "WebSocket 读 + HTTP POST 写",
          detail: "混合传输模式，结合了 WebSocket 的实时推送优势和 HTTP 的可靠性。读取使用 WebSocket 保持长连接，写入使用 HTTP POST 确保消息可靠送达。",
        },
        {
          name: "WebSocketTransport",
          desc: "标准双向 WebSocket",
          detail: "纯 WebSocket 传输，适用于网络环境稳定的场景。全双工通信，延迟最低，但在网络不稳定时可能出现断连。",
        },
        {
          name: "SSETransport",
          desc: "Server-Sent Events",
          detail: "单向推送模式，适用于只需要接收服务器消息的场景。兼容性最好，可在受限网络环境中工作。",
        },
      ],
    },
    init: {
      title: "init() 初始化流程",
      subtitle: "核心基础设施的启动引擎",
      desc1code: "init()",
      desc1: "函数是启动流程中最重要的环节。它负责建立配置系统、安全环境、优雅关闭机制和遥测服务。通过",
      desc1code2: "memoize",
      desc1end: "包装确保只执行一次。",
      stepsTitle: "初始化步骤详解",
      steps: [
        { step: "enableConfigs()", desc: "启用配置系统，加载用户级和项目级配置文件，合并默认值与用户自定义设置" },
        { step: "applySafeConfigEnvironmentVariables()", desc: "将安全相关的配置项注入到环境变量中，确保子进程和工具能读取到正确的安全策略" },
        { step: "setupGracefulShutdown()", desc: "注册 SIGINT（Ctrl+C）和 SIGTERM 信号处理器，确保关闭时保存状态、上报遥测数据、清理临时文件" },
        { step: "Promise.all([...])", desc: "通过动态 import() 并行加载遥测和 A/B 测试模块，使用 void 前缀表示不阻塞主流程" },
      ],
    },
  },

  // Tools page
  tools: {
    title: "工具系统",
    subtitle: "Claude Code 40+ 内置工具的深度剖析 —— 接口设计、注册机制、执行流程与并发控制",
    category: "核心架构",
    related: {
      architecture: { title: "系统架构", description: "整体架构概览" },
      commands: { title: "命令系统", description: "CLI 命令详解" },
      plugins: { title: "插件系统", description: "MCP 与扩展" },
      coordinator: { title: "多智能体", description: "Agent 工具详解" },
    },
    overview: {
      title: "工具系统概述",
      subtitle: "AI 与真实环境交互的桥梁",
      p1: "Claude Code 的核心是工具系统。它提供了",
      p1strong: "40+ 内置工具",
      p1end: "，让 AI 能够与真实环境进行交互——读写文件、执行命令、搜索代码、访问网络、管理任务。每一个工具都实现了统一的接口契约，确保无论是内置工具还是外部 MCP 工具，都能以相同的方式被注册、发现和调用。",
      p2: "工具系统是 Claude Code 与传统 AI 聊天机器人的本质区别。通过工具系统，Claude 不再只能生成文本建议，而是能够直接操作文件系统、运行命令、搜索网络，真正成为开发者的编程助手。",
    },
    interfaceDef: {
      title: "Tool 接口定义",
      subtitle: "所有工具的统一契约",
      desc1: "每一个工具都遵循统一的",
      desc1code: "Tool<Input, Output, P>",
      desc1end: "类型接口。这个泛型接口定义了工具的名称、描述、输入校验、核心执行函数、权限检查和并发安全性声明，是整个工具系统的基石。",
      fieldsTitle: "字段详解",
      fields: [
        { field: "name", desc: "工具的全局唯一标识符，Claude 通过名称匹配调用对应的工具" },
        { field: "description", desc: "动态描述函数，根据输入参数生成上下文相关的描述，帮助 Claude 理解工具能力" },
        { field: "inputSchema", desc: "基于 Zod 的输入 Schema，定义参数类型和约束，在执行前自动校验输入合法性" },
        { field: "call", desc: "核心执行函数，接收校验后的参数和运行时上下文，返回工具执行结果" },
        { field: "isReadOnly", desc: "声明工具是否为只读操作。只读工具可并发执行，写操作工具必须串行执行" },
        { field: "isConcurrencySafe", desc: "声明工具是否并发安全。影响工具在 agentic 循环中的调度策略" },
        { field: "checkPermissions", desc: "权限检查函数，在执行前验证用户是否有权调用此工具并传入给定参数" },
        { field: "isEnabled", desc: "检查当前环境是否启用此工具。受 feature flag、配置和运行模式影响" },
      ],
    },
    registration: {
      title: "工具注册机制",
      subtitle: "从声明到可用的完整链路",
      desc1: "工具注册分为两个阶段：",
      desc1code1: "getAllBaseTools()",
      desc1mid: "负责组装所有内置工具的基础列表，",
      desc1code2: "getTools()",
      desc1end: "则根据当前权限上下文过滤并返回最终可用的工具集合。这种分层设计让权限控制与工具定义解耦，保持代码的清晰和可维护性。",
      principlesTitle: "这种注册机制的关键设计理念是：",
      principles: [
        { phase: "统一入口", desc: "所有工具通过同一个函数注册，MCP 外部工具在注册后享有与内置工具完全相同的调用接口" },
        { phase: "动态过滤", desc: "根据运行环境、用户配置和权限模式动态决定哪些工具可用，确保不同场景下只暴露必要的工具" },
        { phase: "延迟绑定", desc: "工具的具体实现在调用时才绑定执行上下文，允许同一个工具定义在不同会话中复用" },
      ],
    },
    coreTools: {
      title: "核心工具详解",
      subtitle: "按类别一览所有内置工具",
      desc: "Claude Code 的 40+ 内置工具覆盖了文件操作、系统交互、搜索、智能体管理、任务调度等多个领域。以下按类别展示每个工具的核心信息和并发特性。",
      categories: [
        {
          category: "文件操作",
          tools: [
            { name: "FileReadTool", desc: "读取文件内容，支持行号范围和 PDF 页码" },
            { name: "FileWriteTool", desc: "创建或完全覆盖文件" },
            { name: "FileEditTool", desc: "精确字符串替换编辑文件" },
            { name: "GlobTool", desc: "基于 glob 模式搜索文件路径" },
            { name: "NotebookEditTool", desc: "编辑 Jupyter Notebook 单元格" },
          ],
        },
        {
          category: "系统交互",
          tools: [
            { name: "BashTool", desc: "执行 shell 命令并捕获输出" },
            { name: "LSPTool", desc: "与语言服务协议交互，获取类型信息" },
          ],
        },
        {
          category: "搜索",
          tools: [
            { name: "GrepTool", desc: "基于正则表达式搜索文件内容" },
            { name: "WebSearchTool", desc: "搜索互联网获取最新信息" },
            { name: "WebFetchTool", desc: "抓取并解析网页内容" },
          ],
        },
        {
          category: "智能体管理",
          tools: [
            { name: "AgentTool", desc: "生成子代理执行子任务" },
            { name: "SendMessageTool", desc: "代理间消息传递与通信" },
          ],
        },
        {
          category: "任务管理",
          tools: [
            { name: "TaskCreateTool", desc: "创建新任务到任务列表" },
            { name: "TaskUpdateTool", desc: "更新任务状态和属性" },
            { name: "TaskListTool", desc: "列出所有任务概览" },
            { name: "TaskGetTool", desc: "获取单个任务完整详情" },
            { name: "TaskStopTool", desc: "停止正在执行的任务" },
          ],
        },
        {
          category: "团队协调",
          tools: [
            { name: "TeamCreateTool", desc: "创建团队并初始化任务列表" },
            { name: "TeamDeleteTool", desc: "删除团队并清理资源" },
          ],
        },
        {
          category: "计划模式",
          tools: [
            { name: "EnterPlanModeTool", desc: "进入计划模式，仅做分析不修改文件" },
            { name: "ExitPlanModeTool", desc: "退出计划模式，开始执行" },
          ],
        },
        {
          category: "调度",
          tools: [
            { name: "CronCreateTool", desc: "创建定时任务（一次性或循环）" },
            { name: "CronDeleteTool", desc: "取消已创建的定时任务" },
            { name: "CronListTool", desc: "列出所有已创建的定时任务" },
          ],
        },
        {
          category: "配置",
          tools: [{ name: "ConfigTool", desc: "读取和修改应用配置项" }],
        },
      ],
    },
    execution: {
      title: "工具执行流程",
      subtitle: "从 Claude 决策到工具执行的完整管道",
      desc: "当 Claude 在 agentic 循环中决定调用一个工具时，请求会经历查找、验证、权限检查、执行四个核心阶段。每个阶段都有明确的职责和错误处理策略，确保工具调用安全可靠。",
      steps: [
        { step: "Step 1: Claude API 响应", desc: "Claude API 响应中包含工具调用请求，指定工具名称和输入参数。Claude 根据对话上下文自主决定是否需要调用工具以及调用哪个工具。" },
        { step: "Step 2: 查找与校验", desc: "从工具注册表中查找目标工具。找到后使用 Zod Schema 验证输入参数的合法性，包括类型检查、必填字段校验和值约束验证。" },
        { step: "Step 3: 权限检查", desc: "检查工具权限：先检查 deny 规则（黑名单），再检查 allow 规则（白名单），最后根据权限模式决定是否弹出用户授权对话框。" },
        { step: "Step 4: 执行与反馈", desc: "工具执行核心逻辑并返回结果。只读工具可并发执行以提升效率，写操作串行执行以保证数据一致性。结果反馈给 Claude 继续推理。" },
      ],
    },
    concurrency: {
      title: "并发控制",
      subtitle: "只读并发、写入串行的智能调度",
      desc1: "Claude Code 的工具调度器根据每个工具声明的",
      desc1code: "isConcurrencySafe",
      desc1end: "属性进行智能调度。只读工具（如文件读取、搜索）可以并发执行以最大化吞吐量，写操作工具（如文件编辑、命令执行）则必须串行执行以保证数据一致性。",
      desc2: "当 Claude 在一次响应中请求调用多个工具时，调度器会自动将它们分组：所有并发安全的工具作为一批同时执行，非并发安全的工具按顺序逐一执行。",
      modes: [
        {
          title: "并发执行",
          desc: "READ-ONLY 工具",
          tools: "FileReadTool, GlobTool, GrepTool, WebSearchTool, WebFetchTool, TaskListTool",
          detail: "多个只读工具调用可以同时发起，充分利用 I/O 等待时间。例如 Claude 可以同时读取多个文件、搜索多个模式，大幅减少整体响应时间。",
        },
        {
          title: "串行执行",
          desc: "WRITE 工具",
          tools: "FileWriteTool, FileEditTool, BashTool, AgentTool, TaskCreateTool",
          detail: "写操作工具必须按顺序逐一执行，避免竞态条件和数据冲突。每个写操作完成后，后续操作可以看到前序操作的结果。",
        },
      ],
    },
    permission: {
      title: "权限系统",
      subtitle: "四层防护的安全模型",
      desc: "工具系统的安全性由四层权限检查机制保障。每一层都有不同的职责和粒度，从全局的功能开关到细粒度的用户确认，构建了纵深防御的安全体系。这确保了在各种使用场景下——从个人开发到企业 CI/CD——都能提供适当的安全级别。",
      layers: [
        { layer: "Feature Flags", desc: "功能开关层", detail: "通过 feature flag 系统控制工具的全局启用状态。新工具首先通过 flag 控制，经过充分测试后才默认启用。适用于灰度发布和 A/B 测试场景。" },
        { layer: "Permission Modes", desc: "权限模式层", detail: "三种权限模式满足不同安全需求：auto 模式自动批准安全操作；manual 模式对所有敏感操作弹出确认；bypass 模式用于 CI/CD 等自动化场景。" },
        { layer: "Tool-Specific Rules", desc: "工具级规则层", detail: "基于 deny/allow 规则列表进行细粒度控制。例如可以配置允许读取特定目录的文件，或拒绝执行包含危险关键词的命令。规则支持通配符匹配。" },
        { layer: "User Consent", desc: "用户确认层", detail: "在 manual 模式下，敏感操作弹出交互式确认对话框。用户可一次性批准，也可选择\"本次会话始终允许\"。在安全性和便利性之间取得平衡。" },
      ],
    },
  },

  // CodeFlow component
  codeFlow: {
    step: "步骤",
    output: "输出",
    prev: "上一步",
    next: "下一步",
    pause: "暂停",
    autoPlay: "自动播放",
  },

  // About page
  about: {
    title: "关于本站",
    subtitle: "CCStudy.top —— 一个非官方的 Claude Code 源码解读项目",
    category: "关于",
    related: {
      home: { title: "首页", description: "返回首页" },
      architecture: { title: "系统架构", description: "整体架构概览" },
      tools: { title: "工具系统", description: "内置工具详解" },
    },
    aboutSection: {
      title: "关于本站",
      p1strong: "CCStudy.top",
      p1: "是一个非官方的 Claude Code 源码解读项目，旨在帮助开发者和科技爱好者深入理解 Claude Code 的架构设计与实现细节。",
      p2: "本站内容基于对 Claude Code 源代码的深入分析，涵盖了核心架构、工具系统、命令解析、插件扩展等关键模块。我们希望通过结构化的解读和可视化的架构图，让更多人能够理解这一优秀工程的设计思路。",
    },
    techStack: {
      title: "技术栈",
      subtitle: "本站使用的核心技术",
      items: [
        { name: "Next.js 14", desc: "App Router, SSG" },
        { name: "TypeScript", desc: "类型安全" },
        { name: "Tailwind CSS", desc: "样式系统" },
        { name: "Framer Motion", desc: "动画" },
        { name: "Shiki", desc: "代码高亮" },
        { name: "next-themes", desc: "主题切换" },
        { name: "自定义 SVG 组件", desc: "架构图" },
        { name: "GitHub Pages", desc: "部署" },
      ],
    },
    contribution: {
      title: "贡献",
      subtitle: "开源项目，欢迎参与",
      desc: "这是一个开源项目，我们欢迎各种形式的贡献，包括但不限于内容完善、错误修正、建议反馈和新功能提案。",
      repoTitle: "GitHub 仓库",
    },
    disclaimer: {
      title: "声明",
      p1: "本站与",
      p1strong: "Anthropic",
      p1end: "官方无关，是一个完全独立的项目。",
      p2strong: "Claude Code",
      p2: "是 Anthropic 的产品，相关商标和知识产权归 Anthropic 所有。",
      p3: "本站的源码分析基于公开可用信息，仅供参考和学习目的。",
    },
  },
};

export default zh;
export type Translations = typeof zh;
