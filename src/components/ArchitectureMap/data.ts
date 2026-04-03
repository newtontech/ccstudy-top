export interface MapNodeData {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
  x: number;
  y: number;
  category:
    | "entry"
    | "core"
    | "tools"
    | "commands"
    | "ui"
    | "extensions"
    | "infra";
  width: number;
  height: number;
}

export interface MapEdgeData {
  source: string;
  target: string;
  label?: string;
}

export const categoryColors: Record<
  MapNodeData["category"],
  { base: string; light: string; dark: string; glow: string }
> = {
  entry: {
    base: "#f59e0b",
    light: "#fbbf24",
    dark: "#d97706",
    glow: "rgba(245, 158, 11, 0.4)",
  },
  core: {
    base: "#7c3aed",
    light: "#a78bfa",
    dark: "#6d28d9",
    glow: "rgba(124, 58, 237, 0.4)",
  },
  tools: {
    base: "#2563eb",
    light: "#60a5fa",
    dark: "#1d4ed8",
    glow: "rgba(37, 99, 235, 0.4)",
  },
  commands: {
    base: "#4f46e5",
    light: "#818cf8",
    dark: "#4338ca",
    glow: "rgba(79, 70, 229, 0.4)",
  },
  ui: {
    base: "#06b6d4",
    light: "#22d3ee",
    dark: "#0891b2",
    glow: "rgba(6, 182, 212, 0.4)",
  },
  extensions: {
    base: "#10b981",
    light: "#34d399",
    dark: "#059669",
    glow: "rgba(16, 185, 129, 0.4)",
  },
  infra: {
    base: "#f43f5e",
    light: "#fb7185",
    dark: "#e11d48",
    glow: "rgba(244, 63, 94, 0.4)",
  },
};

export const categoryLabels: Record<MapNodeData["category"], string> = {
  entry: "Entry Point",
  core: "Core Engine",
  tools: "Tools",
  commands: "Commands",
  ui: "UI Layer",
  extensions: "Extensions",
  infra: "Infrastructure",
};

export const nodes: MapNodeData[] = [
  // Row 0: Entry point
  {
    id: "main",
    label: "main.tsx",
    description:
      "Application entry point. Initializes Claude Code and wires up the entire system.",
    href: "/modules/main",
    icon: "\u{1F680}",
    x: 650,
    y: 60,
    category: "entry",
    width: 150,
    height: 52,
  },

  // Row 1: Bootstrap & CLI
  {
    id: "bootstrap",
    label: "Bootstrap",
    description:
      "System bootstrap and initialization. Sets up configuration, plugins, and the runtime environment.",
    href: "/modules/bootstrap",
    icon: "\u{1F527}",
    x: 430,
    y: 175,
    category: "infra",
    width: 150,
    height: 52,
  },
  {
    id: "cli",
    label: "CLI",
    description:
      "Command-line interface layer. Parses arguments, routes commands, and manages the REPL loop.",
    href: "/modules/cli",
    icon: "\u{2328}\u{FE0F}",
    x: 870,
    y: 175,
    category: "entry",
    width: 140,
    height: 52,
  },

  // Row 2: Core engine
  {
    id: "query",
    label: "Query Engine",
    description:
      "The query engine orchestrates conversations, manages message history, and streams API responses.",
    href: "/modules/query",
    icon: "\u{1F50D}",
    x: 270,
    y: 300,
    category: "core",
    width: 155,
    height: 52,
  },
  {
    id: "context",
    label: "Context",
    description:
      "Context window management. Tracks token usage, compiles system prompts, and manages conversation state.",
    href: "/modules/context",
    icon: "\u{1F9E0}",
    x: 510,
    y: 300,
    category: "core",
    width: 140,
    height: 52,
  },
  {
    id: "tools",
    label: "Tools",
    description:
      "Tool registry and execution engine. Manages built-in tools like Read, Write, Bash, Grep, and more.",
    href: "/modules/tools",
    icon: "\u{1F6E0}\u{FE0F}",
    x: 750,
    y: 300,
    category: "tools",
    width: 130,
    height: 52,
  },
  {
    id: "commands",
    label: "Commands",
    description:
      "Slash command handler. Processes user commands like /help, /clear, /compact and extensibility hooks.",
    href: "/modules/commands",
    icon: "\u{1F4CB}",
    x: 1000,
    y: 300,
    category: "commands",
    width: 155,
    height: 52,
  },

  // Row 3: UI layer
  {
    id: "ink",
    label: "Ink Renderer",
    description:
      "React-based terminal renderer using Ink. Renders the interactive CLI UI with components and hooks.",
    href: "/modules/ink",
    icon: "\u{1F3A8}",
    x: 180,
    y: 430,
    category: "ui",
    width: 150,
    height: 52,
  },
  {
    id: "components",
    label: "Components",
    description:
      "UI component library for the terminal. Includes ToolUse, Message, DiffView, Permission and more.",
    href: "/modules/components",
    icon: "\u{1F9E9}",
    x: 420,
    y: 430,
    category: "ui",
    width: 160,
    height: 52,
  },
  {
    id: "hooks",
    label: "Hooks",
    description:
      "React hooks for state management and side effects. useTool, useAutoApprove, useConversation, etc.",
    href: "/modules/hooks",
    icon: "\u{1FA9D}",
    x: 670,
    y: 430,
    category: "ui",
    width: 130,
    height: 52,
  },
  {
    id: "state",
    label: "State Manager",
    description:
      "Global state management. Centralized store for conversation state, user preferences, and tool results.",
    href: "/modules/state",
    icon: "\u{1F4BE}",
    x: 920,
    y: 430,
    category: "infra",
    width: 160,
    height: 52,
  },

  // Row 4: Extensions
  {
    id: "plugins",
    label: "Plugins",
    description:
      "Plugin system for extending Claude Code. Supports custom tools, commands, and MCP server integration.",
    href: "/modules/plugins",
    icon: "\u{1F50C}",
    x: 180,
    y: 560,
    category: "extensions",
    width: 135,
    height: 52,
  },
  {
    id: "skills",
    label: "Skills",
    description:
      "Skill framework for composable workflows. Enables complex multi-step agent behaviors and automation.",
    href: "/modules/skills",
    icon: "\u{2728}",
    x: 420,
    y: 560,
    category: "extensions",
    width: 125,
    height: 52,
  },
  {
    id: "assistant",
    label: "Assistant",
    description:
      "The main agent loop. Manages the conversation flow, tool calls, permission checks, and response streaming.",
    href: "/modules/assistant",
    icon: "\u{1F916}",
    x: 660,
    y: 560,
    category: "core",
    width: 140,
    height: 52,
  },
  {
    id: "coordinator",
    label: "Coordinator",
    description:
      "Multi-agent coordination. Orchestrates parallel sub-agents, task distribution, and result aggregation.",
    href: "/modules/coordinator",
    icon: "\u{1F310}",
    x: 910,
    y: 560,
    category: "extensions",
    width: 155,
    height: 52,
  },

  // Row 5: Infrastructure bottom
  {
    id: "memdir",
    label: "Memory Dir",
    description:
      "Persistent memory and file-based storage. Manages CLAUDE.md files, session state, and project config.",
    href: "/modules/memdir",
    icon: "\u{1F4C1}",
    x: 330,
    y: 685,
    category: "infra",
    width: 145,
    height: 52,
  },
  {
    id: "bridge",
    label: "Bridge",
    description:
      "Inter-process communication bridge. Connects the CLI to VS Code extension and external integrations.",
    href: "/modules/bridge",
    icon: "\u{1F30D}",
    x: 630,
    y: 685,
    category: "infra",
    width: 130,
    height: 52,
  },
  {
    id: "buddy",
    label: "Buddy",
    description:
      "Background companion process. Manages long-running tasks, notifications, and scheduled operations.",
    href: "/modules/buddy",
    icon: "\u{1F91D}",
    x: 950,
    y: 685,
    category: "extensions",
    width: 125,
    height: 52,
  },
];

export const edges: MapEdgeData[] = [
  // Entry connections
  { source: "main", target: "bootstrap" },
  { source: "main", target: "cli" },

  // CLI to core
  { source: "cli", target: "query" },
  { source: "cli", target: "context" },
  { source: "cli", target: "tools" },
  { source: "cli", target: "commands" },

  // Bootstrap connections
  { source: "bootstrap", target: "state" },
  { source: "bootstrap", target: "context" },

  // Core interconnections
  { source: "query", target: "tools" },
  { source: "query", target: "context" },

  // Tools to UI
  { source: "tools", target: "components" },
  { source: "tools", target: "hooks" },
  { source: "tools", target: "plugins" },

  // Commands to UI
  { source: "commands", target: "components" },

  // UI interconnections
  { source: "ink", target: "components" },
  { source: "ink", target: "hooks" },
  { source: "components", target: "hooks" },

  // State and memory
  { source: "context", target: "memdir" },
  { source: "state", target: "memdir" },

  // Extensions
  { source: "plugins", target: "skills" },
  { source: "assistant", target: "coordinator" },
  { source: "coordinator", target: "bridge" },
  { source: "assistant", target: "hooks" },
  { source: "coordinator", target: "buddy" },
];
