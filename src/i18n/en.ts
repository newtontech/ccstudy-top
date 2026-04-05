import type { Translations } from "./zh";

const en: Translations = {
  // Navbar
  nav: {
    home: "Home",
    architecture: "Architecture",
    tools: "Tools",
    commands: "Commands",
    ink: "UI Framework",
    plugins: "Plugins",
  },

  // Footer
  footer: {
    title: "CCStudy.top - Claude Code Source Guide",
    copyright: "© 2026",
  },

  // Hero
  hero: {
    title: "Claude Code Source Guide",
    subtitle: "Deep dive into the architecture of Anthropic's most powerful AI coding assistant",
    stats: {
      tools: "Tools",
      commands: "Commands",
      modules: "Core Modules",
    },
  },

  // Home page
  home: {
    architectureMap: {
      title: "Architecture Overview",
      subtitle: "Click nodes to explore Claude Code's core modules",
    },
    exploreModules: {
      title: "Explore Modules",
      subtitle: "Click cards to dive deeper into each module",
    },
    learningPath: {
      title: "Learning Paths",
      subtitle: "Choose your adventure — from quick start to deep architecture",
      paths: {
        "quick-start": {
          title: "Quick Start",
          description: "Get up and running with Claude Code's core concepts in minutes",
        },
        "deep-source": {
          title: "Deep Source Code",
          description: "Dive into the implementation details of key subsystems",
        },
        architecture: {
          title: "Architecture Design",
          description: "Understand the high-level design patterns and system boundaries",
        },
      },
    },
    glossary: {
      title: "Glossary",
      subtitle: "Key terms and concepts in Claude Code's architecture",
      learnMore: "Learn more",
    },
  },

  // Feature Grid - module cards
  modules: {
    architecture: {
      title: "System Architecture",
      description: "Overall architecture and core design patterns of Claude Code",
    },
    entry: {
      title: "Entry & Bootstrap",
      description: "Complete startup flow from main.tsx to app ready",
    },
    tools: {
      title: "Tool System",
      description: "Implementation and extension of 40+ built-in tools",
    },
    commands: {
      title: "Command System",
      description: "Complete CLI command reference and implementation",
    },
    ink: {
      title: "Ink UI Framework",
      description: "React-based terminal UI rendering framework",
    },
    plugins: {
      title: "Plugins & MCP",
      description: "Plugin system, skills system, and Model Context Protocol",
    },
    assistant: {
      title: "KAIROS Assistant",
      description: "Persistent AI assistant mode",
    },
    coordinator: {
      title: "Multi-Agent Coordination",
      description: "Coordinator pattern for multi-agent orchestration",
    },
    hooks: {
      title: "Hooks System",
      description: "Deep dive into 80+ custom React Hooks",
    },
    buddy: {
      title: "Buddy Companion",
      description: "Tamagotchi-style deterministic companion system",
    },
  },

  // ModuleLayout
  layout: {
    homeBreadcrumb: "Home",
    relatedModules: "Related Modules",
  },

  // Architecture page
  architecture: {
    title: "System Architecture",
    subtitle:
      "Deep dive into Claude Code's core architecture — layered design, message flow, state management, and performance strategies",
    category: "Core Architecture",
    related: {
      entry: { title: "Entry & Bootstrap", description: "Startup flow details" },
      tools: { title: "Tool System", description: "40+ tool implementations" },
      commands: { title: "Command System", description: "CLI interface" },
      plugins: { title: "Plugin System", description: "Extension mechanisms" },
    },
    overview: {
      title: "Architecture Overview",
      subtitle: "The Art of Layered Design",
      p1: "Claude Code is a highly complex CLI application built on",
      p1strong: "React + TypeScript",
      p1mid: ". It adopts a unique architectural approach — bringing the React component model into the terminal environment through a custom",
      p1code: "ink",
      p1end: " framework that renders React component trees as ANSI terminal output. This means developers can write terminal applications the same way they write web apps, enjoying all the benefits of componentization, state management, and declarative UI.",
      p2: "The entire system follows a classic layered architecture, from low-level infrastructure to high-level user interface, with clear responsibility boundaries at each layer. This design not only makes the code easy to understand and maintain, but also allows each layer to evolve independently without causing chain reactions.",
      fiveLayerTitle: "Claude Code Five-Layer Architecture",
      layers: [
        { layer: "L5", name: "UI Layer", desc: "Ink terminal rendering, React components, Hooks" },
        { layer: "L4", name: "Extension Layer", desc: "Plugins, Skills, MCP Protocol" },
        { layer: "L3", name: "Engine Layer", desc: "Query engine, tool system, command dispatch" },
        { layer: "L2", name: "State Layer", desc: "Global state, Context, memory system" },
        { layer: "L1", name: "Foundation Layer", desc: "Bootstrap, CLI parsing, main entry" },
      ],
    },
    messageFlow: {
      title: "Message Flow",
      subtitle: "The complete journey from user input to UI update",
      desc: "At the core of Claude Code is a carefully designed message processing pipeline. When a user enters a command in the terminal, the message goes through a series of transformations: from raw text input to intelligent context augmentation, from API calls to tool execution, and finally back to terminal rendering updates. Each step is optimized for smooth and responsive user experience.",
      pipeTitle: "Message Processing Pipeline",
      steps: [
        {
          step: "1",
          title: "User Input Capture",
          desc: "The user enters a command in the terminal. The TextInput component captures the input, constructs a standardized user message object, and appends it to the conversation history.",
        },
        {
          step: "2",
          title: "QueryEngine Context Augmentation",
          desc: "QueryEngine augments the message with context: fetching git status, project info, registered tool list, and current permissions to construct a complete system prompt.",
        },
        {
          step: "3",
          title: "API Call & Streaming Response",
          desc: "The augmented message is sent to the Claude API with streaming enabled (stream: true). Each token updates the terminal display in real-time, letting users see Claude's thinking process unfold.",
        },
        {
          step: "4",
          title: "Tool Call & Permission Verification",
          desc: "After analyzing the request, Claude decides to use a tool (e.g., FileReadTool). The system performs permission checks, executes the tool, and feeds the result back to Claude for continued reasoning.",
        },
        {
          step: "5",
          title: "Tool Result Feedback & Conversation Loop",
          desc: "After tool execution, the result is wrapped as a tool_result message appended to the conversation history, then fed back to Claude for continued reasoning. The loop continues until Claude provides a final response.",
        },
      ],
    },
    stateManagement: {
      title: "State Management",
      subtitle: "Centralized State & Distributed Context",
      desc: "Claude Code's state management adopts a hybrid approach combining",
      descstrong1: "centralized global state",
      descmid: "with",
      descstrong2: "React Context",
      descend: ". The global state is managed centrally by",
      desccode: "bootstrap/state.ts",
      descfinal: ", containing critical data for the application lifecycle; UI-related state is distributed through React Context in the component tree, ensuring each component can access the state it needs without prop drilling.",
      stateFlowTitle: "State Flow Architecture",
      stateFlowDesc: "State flow in the system follows strict unidirectional data flow principles:",
      phases: [
        {
          phase: "Startup Phase",
          desc: "Bootstrap initializes global state (originalCwd, sessionId, clientType). Once set, these values are immutable throughout the application lifecycle",
        },
        {
          phase: "Runtime Phase",
          desc: "QueryEngine reads/writes totalCostUSD for cost tracking, tool execution results update UI Context, React components automatically respond to state changes",
        },
        {
          phase: "Persistence Phase",
          desc: "Critical state is written to disk via memdir (memory directory). On next startup, context is restored, providing cross-session continuity",
        },
      ],
    },
    toolRegistration: {
      title: "Tool Registration & Execution",
      subtitle: "Unified management of 40+ built-in tools",
      desc: "Claude Code's tool system is its most powerful capability. Each tool implements a unified interface, ensuring that both built-in tools (like file read/write, code search) and external tools (like those from MCP servers) can be registered, discovered, and invoked in the same way. This design provides extremely high extensibility.",
      permissionTitle: "Permission Check Flow",
      permissionDesc: "Each tool call goes through multiple permission verification layers to protect user safety and privacy:",
      permissions: [
        { step: "Feature Flags", desc: "Check experimental feature flags to determine if the tool is enabled" },
        { step: "Permission Mode", desc: "Check current permission mode (auto/manual/bypass) to decide auto-approval" },
        { step: "Tool-Specific Check", desc: "Tool-level permission checks, such as file path restrictions, network access control" },
        { step: "User Consent", desc: "In manual mode, a confirmation dialog pops up for the user to decide whether to proceed" },
      ],
    },
    performance: {
      title: "Performance Optimization",
      subtitle: "Engineering practices behind millisecond response",
      desc: "Claude Code has invested significant engineering effort in performance optimization. From lazy loading at startup to memoization caching at runtime, from virtual scrolling for large datasets to non-blocking background tasks, every optimization is carefully designed to ensure the smoothest possible terminal interaction experience.",
      items: [
        {
          title: "Lazy Loading",
          desc: "Dynamically import heavy modules, load only when needed",
          detail: "Through dynamic import and conditional loading, unnecessary code is avoided at startup. For example, the coordinator pattern is only loaded when a feature flag is enabled.",
        },
        {
          title: "Memoization",
          desc: "Extensive use of React.memo + useMemo",
          detail: "For complex UI components and compute-intensive operations, React.memo prevents unnecessary re-renders, useMemo caches computation results.",
        },
        {
          title: "Virtual Scrolling",
          desc: "Virtualized rendering for large lists",
          detail: "In scenarios like large file lists and search results, only visible elements are rendered, significantly reducing DOM operations and memory usage.",
        },
        {
          title: "Background Tasks",
          desc: "Non-blocking async operations",
          detail: "Telemetry reporting, config prefetching, analytics data collection run in the background using the void Promise.all pattern to ensure the main thread is not blocked.",
        },
      ],
    },
    permission: {
      title: "Permission System",
      subtitle: "Multi-layered security model",
      desc: "Claude Code's permission system employs a multi-layered defense strategy. From global feature flags to fine-grained user confirmation, each layer provides different levels of security protection. This design ensures appropriate security levels across all usage scenarios — from personal development to enterprise environments.",
      layers: [
        {
          layer: "Feature Flags",
          desc: "Feature toggle layer",
          detail: "Controls the enablement of experimental features through the feature flag system. New tools and features are first controlled by flags and only enabled by default after thorough testing. This ensures only verified capabilities are exposed to users.",
        },
        {
          layer: "Permission Modes",
          desc: "Permission mode layer",
          detail: "Three permission modes for different security needs: auto mode automatically approves safe operations; manual mode requires confirmation for all sensitive operations; bypass mode is for CI/CD automation, controlled via environment variables.",
        },
        {
          layer: "Tool-Specific Permissions",
          desc: "Tool-level permission layer",
          detail: "Each tool can define its own permission check logic. For example, file operation tools check if paths are within the project directory, network tools check if URLs are whitelisted. This fine-grained control ensures tools can only perform allowed operations.",
        },
        {
          layer: "User Consent",
          desc: "User confirmation layer",
          detail: "In manual mode, sensitive operations (like file writes, command execution) prompt an interactive confirmation dialog. Users can approve or reject once, or choose \"Always allow for this session\", balancing security and convenience.",
        },
      ],
    },
    contextManagement: {
      title: "Context Management",
      subtitle: "Helping Claude understand your project",
      desc: "Context management is key to Claude Code's intelligence. The system collects and integrates context information through multiple channels, helping Claude deeply understand the user's project environment, coding habits, and team conventions. This context information is carefully organized and injected at each API call, ensuring Claude's responses are always relevant to the actual scenario.",
      contexts: [
        {
          title: "System Context",
          desc: "System Context",
          items: [
            "Git repository status (branches, changes, conflicts)",
            "System info (OS, Node.js version)",
            "Environment variables & configuration",
            "Network connection status",
          ],
        },
        {
          title: "User Context",
          desc: "User Context",
          items: [
            "CLAUDE.md project-level instruction files",
            "User-level ~/.claude/settings configuration",
            "Project .claude/ directory settings",
            "User preferences & behavioral history",
          ],
        },
        {
          title: "Memory System",
          desc: "Memory System (memdir)",
          items: [
            "Cross-session persistent context storage",
            "Project-specific knowledge & decision records",
            "Automatic learning & adaptation of user habits",
            "Team-shared knowledge base",
          ],
        },
        {
          title: "Team Context",
          desc: "Team Context",
          items: [
            "Shared state for multi-agent coordination",
            "Task assignment & progress tracking",
            "Inter-team member messaging",
            "Unified permissions & configuration management",
          ],
        },
      ],
    },
  },

  // Entry page
  entry: {
    title: "Entry & Bootstrap",
    subtitle: "Complete startup flow from main.tsx to app ready",
    category: "Core Architecture",
    related: {
      architecture: { title: "System Architecture", description: "Overall architecture & core design patterns" },
      tools: { title: "Tool System", description: "40+ built-in tool implementations" },
      plugins: { title: "Plugin System", description: "Plugins & MCP extensions" },
    },
    overview: {
      title: "Overview",
      subtitle: "Claude Code Startup Flow Overview",
      p1: "Claude Code's startup flow appears simple — a single command",
      p1code: "claude",
      p1mid: "is all it takes — but behind it lies carefully designed optimization strategies. The main entry file",
      p1code2: "main.tsx",
      p1end: "compiles to 785KB, yet achieves impressive startup speed through a series of fast path checks and parallel prefetch mechanisms.",
      p2: "The entire startup flow can be divided into four phases: fast path detection, parallel prefetch launch, core initialization, and command dispatch. Each phase is carefully optimized to ensure users get the fastest experience possible.",
    },
    mainEntry: {
      title: "main.tsx - Main Entry",
      subtitle: "Everything starts here",
      desc1: "is the entry file for Claude Code CLI, specified by Node.js in the",
      desc1code: "package.json",
      desc1mid: "'s",
      desc1code2: "bin",
      desc1end: "field. Its primary task is to start as quickly as possible — to achieve this, it launches critical subprocesses in parallel while modules are still loading:",
      p1: "The design here is quite clever:",
      p1strong1: "MDM (Mobile Device Management) configuration reading",
      p1mid: "and",
      p1strong2: "macOS Keychain prefetch",
      p1end: "are executed immediately at module top-level. This means that while Node.js parses and loads remaining modules, these two I/O-intensive operations have already started running in parallel, fully leveraging Node.js's event loop characteristics.",
      li1strong: "startMdmRawRead",
      li1: ": Prefetches MDM configuration for policy management in enterprise environments",
      li2strong: "startKeychainPrefetch",
      li2: ": Prefetches authentication credentials from macOS Keychain, accelerating subsequent API calls",
    },
    fastPath: {
      title: "Fast Path Optimization",
      subtitle: "Zero-latency handling of common requests",
      desc: "Claude Code provides fast paths for commands that don't require full initialization. These commands are intercepted and handled before loading any heavyweight modules, with near-zero response time.",
      allPathsTitle: "All Fast Paths",
      paths: [
        { flag: "--version / -v", desc: "Output version number and exit immediately, no modules loaded" },
        { flag: "--dump-system-prompt", desc: "Export system prompt for debugging and development" },
        { flag: "--claude-in-chrome-mcp", desc: "Start Chrome browser MCP service mode" },
        { flag: "--computer-use-mcp", desc: "Start computer use MCP service mode" },
        { flag: "--daemon-worker", desc: "Start in daemon worker mode" },
      ],
    },
    bootstrap: {
      title: "Bootstrap - Application State Initialization",
      subtitle: "The heart of centralized state management",
      desc1code: "bootstrap/state.ts",
      desc1: "is the core of Claude Code's state management. It maintains the global state needed for the application to run, from working directory to cost tracking, from session identifiers to client type detection — all critical information converges here.",
      advantagesTitle: "This centralized state design has several important advantages:",
      advantages: [
        { strong: "Single source of truth", desc: ": All modules access runtime information through the same state object, avoiding state inconsistency" },
        { strong: "Early computation", desc: ": Values like clientType are determined at startup, no need for repeated computation later" },
        { strong: "Traceability", desc: ": Fields like totalCostUSD provide critical runtime metrics" },
      ],
    },
    clientDetection: {
      title: "Client Type Detection",
      subtitle: "Adaptive runtime environment",
      desc: "Claude Code is more than just a CLI tool — it can run as TypeScript SDK, Python SDK, GitHub Action, and more. Startup environment detection ensures the correct behavioral mode.",
      clients: [
        { type: "cli", env: "(default)", desc: "Standard terminal interactive mode with streaming output and user input" },
        { type: "sdk-typescript", env: "CLAUDE_CODE_ENTRYPOINT=sdk-ts", desc: "TypeScript SDK embedded calls, programmatic control of Claude Code" },
        { type: "sdk-python", env: "CLAUDE_CODE_ENTRYPOINT=sdk-py", desc: "Python SDK embedded calls, suitable for data science and automation" },
        { type: "github-action", env: "GITHUB_ACTIONS=true", desc: "CI/CD environment, auto-detect and adjust output format and interaction mode" },
      ],
    },
    transport: {
      title: "Transport Layer Architecture",
      subtitle: "Flexible communication methods",
      desc: "Claude Code's CLI communicates with the API through a pluggable transport layer. Depending on the network environment and deployment scenario, the system automatically selects the optimal transport method:",
      transports: [
        {
          name: "HybridTransport",
          desc: "WebSocket read + HTTP POST write",
          detail: "Hybrid transport mode combining WebSocket's real-time push advantage with HTTP's reliability. Reading uses WebSocket for persistent connections, writing uses HTTP POST for reliable message delivery.",
        },
        {
          name: "WebSocketTransport",
          desc: "Standard bidirectional WebSocket",
          detail: "Pure WebSocket transport for stable network environments. Full-duplex communication with lowest latency, but may experience disconnections in unstable networks.",
        },
        {
          name: "SSETransport",
          desc: "Server-Sent Events",
          detail: "One-way push mode for scenarios that only need to receive server messages. Best compatibility, works in restricted network environments.",
        },
      ],
    },
    init: {
      title: "init() Initialization Flow",
      subtitle: "The startup engine for core infrastructure",
      desc1code: "init()",
      desc1: "is the most critical part of the startup flow. It sets up the configuration system, security environment, graceful shutdown mechanism, and telemetry service. Wrapped with",
      desc1code2: "memoize",
      desc1end: "to ensure it executes only once.",
      stepsTitle: "Initialization Steps",
      steps: [
        { step: "enableConfigs()", desc: "Enable the configuration system, load user-level and project-level config files, merge defaults with user customizations" },
        { step: "applySafeConfigEnvironmentVariables()", desc: "Inject security-related configuration items into environment variables, ensuring subprocesses and tools can read correct security policies" },
        { step: "setupGracefulShutdown()", desc: "Register SIGINT (Ctrl+C) and SIGTERM signal handlers, ensuring state is saved, telemetry is reported, and temp files are cleaned up on shutdown" },
        { step: "Promise.all([...])", desc: "Dynamically import telemetry and A/B testing modules in parallel using import(), void prefix indicates non-blocking of main flow" },
      ],
    },
  },

  // Tools page
  tools: {
    title: "Tool System",
    subtitle: "Deep dive into Claude Code's 40+ built-in tools — interface design, registration mechanism, execution flow, and concurrency control",
    category: "Core Architecture",
    related: {
      architecture: { title: "System Architecture", description: "Architecture overview" },
      commands: { title: "Command System", description: "CLI command details" },
      plugins: { title: "Plugin System", description: "MCP & extensions" },
      coordinator: { title: "Multi-Agent", description: "Agent tool details" },
    },
    overview: {
      title: "Tool System Overview",
      subtitle: "The bridge between AI and real-world interaction",
      p1: "At the core of Claude Code is the tool system. It provides",
      p1strong: "40+ built-in tools",
      p1end: "enabling AI to interact with the real world — reading and writing files, executing commands, searching code, accessing the web, managing tasks. Each tool implements a unified interface contract, ensuring both built-in and external MCP tools can be registered, discovered, and invoked the same way.",
      p2: "The tool system is the fundamental difference between Claude Code and traditional AI chatbots. Through the tool system, Claude can do more than generate text suggestions — it can directly manipulate file systems, run commands, search the web, truly becoming a developer's coding assistant.",
    },
    interfaceDef: {
      title: "Tool Interface Definition",
      subtitle: "The unified contract for all tools",
      desc1: "Each tool follows the unified",
      desc1code: "Tool<Input, Output, P>",
      desc1end: "type interface. This generic interface defines the tool's name, description, input validation, core execution function, permission checks, and concurrency safety declarations — the cornerstone of the entire tool system.",
      fieldsTitle: "Field Details",
      fields: [
        { field: "name", desc: "Global unique identifier for the tool. Claude matches and invokes tools by name" },
        { field: "description", desc: "Dynamic description function that generates context-aware descriptions based on input parameters, helping Claude understand tool capabilities" },
        { field: "inputSchema", desc: "Zod-based input Schema defining parameter types and constraints, automatically validating input legality before execution" },
        { field: "call", desc: "Core execution function that receives validated parameters and runtime context, returns tool execution results" },
        { field: "isReadOnly", desc: "Declares whether the tool is a read-only operation. Read-only tools can execute concurrently, write operations must execute serially" },
        { field: "isConcurrencySafe", desc: "Declares whether the tool is concurrency-safe. Affects scheduling strategy in the agentic loop" },
        { field: "checkPermissions", desc: "Permission check function that verifies user authorization to invoke the tool with given parameters before execution" },
        { field: "isEnabled", desc: "Checks if the tool is enabled in the current environment. Affected by feature flags, configuration, and runtime mode" },
      ],
    },
    registration: {
      title: "Tool Registration Mechanism",
      subtitle: "The complete chain from declaration to availability",
      desc1: "Tool registration has two phases:",
      desc1code1: "getAllBaseTools()",
      desc1mid: "assembles the base list of all built-in tools, and",
      desc1code2: "getTools()",
      desc1end: "filters and returns the final available tool set based on current permission context. This layered design decouples permission control from tool definition, maintaining code clarity and maintainability.",
      principlesTitle: "Key design principles of this registration mechanism:",
      principles: [
        { phase: "Unified Entry", desc: "All tools are registered through the same function. External MCP tools enjoy the exact same calling interface as built-in tools after registration" },
        { phase: "Dynamic Filtering", desc: "Dynamically determines which tools are available based on runtime environment, user configuration, and permission mode, exposing only necessary tools for each scenario" },
        { phase: "Lazy Binding", desc: "Tool implementations bind execution context only at call time, allowing the same tool definition to be reused across different sessions" },
      ],
    },
    coreTools: {
      title: "Core Tool Details",
      subtitle: "All built-in tools by category",
      desc: "Claude Code's 40+ built-in tools cover file operations, system interaction, search, agent management, task scheduling, and more. Below is each tool's core information and concurrency characteristics by category.",
      categories: [
        {
          category: "File Operations",
          tools: [
            { name: "FileReadTool", desc: "Read file content, supports line ranges and PDF pages" },
            { name: "FileWriteTool", desc: "Create or completely overwrite a file" },
            { name: "FileEditTool", desc: "Precise string replacement file editing" },
            { name: "GlobTool", desc: "Search file paths using glob patterns" },
            { name: "NotebookEditTool", desc: "Edit Jupyter Notebook cells" },
          ],
        },
        {
          category: "System Interaction",
          tools: [
            { name: "BashTool", desc: "Execute shell commands and capture output" },
            { name: "LSPTool", desc: "Interact with Language Server Protocol for type info" },
          ],
        },
        {
          category: "Search",
          tools: [
            { name: "GrepTool", desc: "Search file content using regex patterns" },
            { name: "WebSearchTool", desc: "Search the internet for up-to-date information" },
            { name: "WebFetchTool", desc: "Fetch and parse web page content" },
          ],
        },
        {
          category: "Agent Management",
          tools: [
            { name: "AgentTool", desc: "Spawn sub-agents to execute subtasks" },
            { name: "SendMessageTool", desc: "Inter-agent message passing and communication" },
          ],
        },
        {
          category: "Task Management",
          tools: [
            { name: "TaskCreateTool", desc: "Create new tasks in the task list" },
            { name: "TaskUpdateTool", desc: "Update task status and properties" },
            { name: "TaskListTool", desc: "List all tasks overview" },
            { name: "TaskGetTool", desc: "Get full details of a single task" },
            { name: "TaskStopTool", desc: "Stop a running task" },
          ],
        },
        {
          category: "Team Coordination",
          tools: [
            { name: "TeamCreateTool", desc: "Create a team and initialize task list" },
            { name: "TeamDeleteTool", desc: "Delete a team and clean up resources" },
          ],
        },
        {
          category: "Plan Mode",
          tools: [
            { name: "EnterPlanModeTool", desc: "Enter plan mode, analysis only without file modifications" },
            { name: "ExitPlanModeTool", desc: "Exit plan mode, begin execution" },
          ],
        },
        {
          category: "Scheduling",
          tools: [
            { name: "CronCreateTool", desc: "Create scheduled tasks (one-time or recurring)" },
            { name: "CronDeleteTool", desc: "Cancel a created scheduled task" },
            { name: "CronListTool", desc: "List all created scheduled tasks" },
          ],
        },
        {
          category: "Configuration",
          tools: [{ name: "ConfigTool", desc: "Read and modify application configuration" }],
        },
      ],
    },
    execution: {
      title: "Tool Execution Flow",
      subtitle: "The complete pipeline from Claude's decision to tool execution",
      desc: "When Claude decides to invoke a tool in the agentic loop, the request goes through four core phases: lookup, validation, permission check, and execution. Each phase has clear responsibilities and error handling strategies, ensuring safe and reliable tool calls.",
      steps: [
        { step: "Step 1: Claude API Response", desc: "The Claude API response contains tool call requests specifying tool names and input parameters. Claude autonomously decides whether to call tools and which tools to call based on conversation context." },
        { step: "Step 2: Lookup & Validation", desc: "Look up the target tool from the tool registry. Once found, use Zod Schema to validate input parameter legality, including type checking, required field validation, and value constraint verification." },
        { step: "Step 3: Permission Check", desc: "Check tool permissions: first check deny rules (blacklist), then check allow rules (whitelist), and finally determine based on permission mode whether to prompt user authorization dialog." },
        { step: "Step 4: Execute & Feedback", desc: "The tool executes core logic and returns results. Read-only tools can execute concurrently for efficiency, write operations execute serially for data consistency. Results are fed back to Claude for continued reasoning." },
      ],
    },
    concurrency: {
      title: "Concurrency Control",
      subtitle: "Concurrent reads, serial writes — intelligent scheduling",
      desc1: "Claude Code's tool scheduler intelligently schedules based on each tool's declared",
      desc1code: "isConcurrencySafe",
      desc1end: "property. Read-only tools (like file reads, searches) can execute concurrently to maximize throughput, while write operation tools (like file edits, command execution) must execute serially to ensure data consistency.",
      desc2: "When Claude requests multiple tool calls in a single response, the scheduler automatically groups them: all concurrency-safe tools execute simultaneously as a batch, while non-concurrency-safe tools execute sequentially one by one.",
      modes: [
        {
          title: "Concurrent Execution",
          desc: "READ-ONLY Tools",
          tools: "FileReadTool, GlobTool, GrepTool, WebSearchTool, WebFetchTool, TaskListTool",
          detail: "Multiple read-only tool calls can be initiated simultaneously, fully utilizing I/O wait time. For example, Claude can read multiple files and search multiple patterns at the same time, significantly reducing overall response time.",
        },
        {
          title: "Serial Execution",
          desc: "WRITE Tools",
          tools: "FileWriteTool, FileEditTool, BashTool, AgentTool, TaskCreateTool",
          detail: "Write operation tools must execute sequentially one by one, avoiding race conditions and data conflicts. Each write operation completes before subsequent operations can see the results of previous ones.",
        },
      ],
    },
    permission: {
      title: "Permission System",
      subtitle: "Four-layer security model",
      desc: "The tool system's security is ensured by a four-layer permission check mechanism. Each layer has different responsibilities and granularity, from global feature toggles to fine-grained user confirmation, building a defense-in-depth security system. This ensures appropriate security levels across all scenarios — from personal development to enterprise CI/CD.",
      layers: [
        { layer: "Feature Flags", desc: "Feature toggle layer", detail: "Controls the global enablement state of tools through the feature flag system. New tools are first controlled by flags and only enabled by default after thorough testing. Suitable for canary releases and A/B testing scenarios." },
        { layer: "Permission Modes", desc: "Permission mode layer", detail: "Three permission modes for different security needs: auto mode automatically approves safe operations; manual mode requires confirmation for all sensitive operations; bypass mode is for CI/CD and other automation scenarios." },
        { layer: "Tool-Specific Rules", desc: "Tool-level rule layer", detail: "Fine-grained control based on deny/allow rule lists. For example, you can configure allowing file reads from specific directories, or deny commands containing dangerous keywords. Rules support wildcard matching." },
        { layer: "User Consent", desc: "User confirmation layer", detail: "In manual mode, sensitive operations prompt an interactive confirmation dialog. Users can approve once or choose \"Always allow for this session\". Balancing security and convenience." },
      ],
    },
  },

  // CodeFlow component
  codeFlow: {
    step: "Step",
    output: "Output",
    prev: "Previous",
    next: "Next",
    pause: "Pause",
    autoPlay: "Auto Play",
  },

  // About page
  about: {
    title: "About",
    subtitle: "CCStudy.top — An unofficial Claude Code source code analysis project",
    category: "About",
    related: {
      home: { title: "Home", description: "Back to home" },
      architecture: { title: "System Architecture", description: "Architecture overview" },
      tools: { title: "Tool System", description: "Built-in tool details" },
    },
    aboutSection: {
      title: "About",
      p1strong: "CCStudy.top",
      p1: "is an unofficial Claude Code source code analysis project aimed at helping developers and tech enthusiasts deeply understand Claude Code's architecture design and implementation details.",
      p2: "This site's content is based on in-depth analysis of Claude Code's source code, covering core architecture, tool system, command parsing, plugin extensions, and other key modules. We hope structured analysis and visualized architecture diagrams will help more people understand the design philosophy of this excellent engineering project.",
    },
    techStack: {
      title: "Tech Stack",
      subtitle: "Core technologies used by this site",
      items: [
        { name: "Next.js 14", desc: "App Router, SSG" },
        { name: "TypeScript", desc: "Type Safety" },
        { name: "Tailwind CSS", desc: "Styling" },
        { name: "Framer Motion", desc: "Animation" },
        { name: "Shiki", desc: "Syntax Highlighting" },
        { name: "next-themes", desc: "Theme Switching" },
        { name: "Custom SVG Components", desc: "Architecture Diagrams" },
        { name: "GitHub Pages", desc: "Deployment" },
      ],
    },
    contribution: {
      title: "Contributing",
      subtitle: "Open source project, contributions welcome",
      desc: "This is an open source project. We welcome all forms of contributions, including but not limited to content improvements, bug fixes, feedback, and new feature proposals.",
      repoTitle: "GitHub Repository",
    },
    disclaimer: {
      title: "Disclaimer",
      p1: "This site is not affiliated with",
      p1strong: "Anthropic",
      p1end: "officially. It is a completely independent project.",
      p2strong: "Claude Code",
      p2: "is an Anthropic product. Related trademarks and intellectual property belong to Anthropic.",
      p3: "The source code analysis on this site is based on publicly available information and is for reference and educational purposes only.",
    },
  },
};

export default en;
