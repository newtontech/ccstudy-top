"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface TreeItem {
  name: string;
  description: string;
  href?: string;
  children?: { name: string; description: string }[];
  fileCount?: number;
}

const treeData: TreeItem[] = [
  { name: "main.tsx", description: "785KB 主入口，整合所有模块", fileCount: 1 },
  { name: "bootstrap/", description: "应用初始化 (state.ts)", fileCount: 1 },
  {
    name: "entrypoints/",
    description: "入口点集合 (cli.tsx, init.ts, mcp.ts, sdk/)",
    href: "/entry",
    children: [
      { name: "cli.tsx", description: "CLI 入口点" },
      { name: "init.ts", description: "初始化入口" },
      { name: "mcp.ts", description: "MCP 协议入口" },
      { name: "sdk/", description: "SDK 入口" },
    ],
    fileCount: 8,
  },
  {
    name: "cli/",
    description: "CLI 命令行处理",
    href: "/entry",
    children: [
      { name: "handlers/", description: "命令处理器" },
      { name: "transports/", description: "传输层" },
      { name: "structuredIO.ts", description: "结构化 I/O" },
    ],
    fileCount: 12,
  },
  {
    name: "server/",
    description: "Direct Connect 服务端",
    children: [
      { name: "directConnectManager.ts", description: "直连管理器" },
      { name: "createDirectConnectSession.ts", description: "会话创建" },
      { name: "types.ts", description: "类型定义" },
    ],
    fileCount: 3,
  },
  {
    name: "remote/",
    description: "远程会话管理",
    children: [
      { name: "RemoteSessionManager.ts", description: "远程会话管理器" },
      { name: "remotePermissionBridge.ts", description: "权限桥接" },
      { name: "sdkMessageAdapter.ts", description: "SDK 消息适配" },
      { name: "SessionsWebSocket.ts", description: "WebSocket 会话" },
    ],
    fileCount: 4,
  },
  { name: "query/", description: "查询引擎模块", href: "/query-engine", fileCount: 15 },
  { name: "QueryEngine.ts", description: "核心查询引擎", href: "/query-engine", fileCount: 1 },
  { name: "tools/", description: "40+ 内置工具", href: "/tools", fileCount: 42 },
  { name: "commands/", description: "命令系统", href: "/commands", fileCount: 18 },
  { name: "components/", description: "UI 组件库", fileCount: 60 },
  { name: "screens/", description: "屏幕级组件", fileCount: 25 },
  { name: "hooks/", description: "50+ React Hooks", fileCount: 55 },
  { name: "context/", description: "React Context providers", href: "/context", fileCount: 12 },
  { name: "state/", description: "全局状态管理", fileCount: 8 },
  { name: "assistant/", description: "Claude 助手逻辑", fileCount: 6 },
  { name: "bridge/", description: "IDE 桥接层", fileCount: 5 },
  { name: "coordinator/", description: "多 Agent 协调器", fileCount: 4 },
  { name: "buddy/", description: "Buddy 协作模式", fileCount: 3 },
  { name: "ink/", description: "ink 终端渲染适配", fileCount: 7 },
  { name: "keybindings/", description: "键盘快捷键", fileCount: 3 },
  { name: "plugins/", description: "插件系统", href: "/plugins", fileCount: 9 },
  { name: "skills/", description: "Skills 技能系统", fileCount: 6 },
  { name: "schemas/", description: "JSON Schema 定义", fileCount: 30 },
  { name: "migrations/", description: "数据库迁移", fileCount: 8 },
  { name: "memdir/", description: "记忆目录持久化", href: "/memory", fileCount: 5 },
  { name: "native-ts/", description: "Native TypeScript 绑定", fileCount: 4 },
  { name: "outputStyles/", description: "输出样式定义", fileCount: 3 },
  { name: "moreright/", description: "扩展能力模块", fileCount: 2 },
  { name: "public/", description: "静态资源", fileCount: 20 },
  { name: "services/", description: "后端服务", fileCount: 5 },
  { name: "tasks/", description: "任务管理", fileCount: 4 },
  { name: "types/", description: "TypeScript 类型定义", fileCount: 15 },
  { name: "upstreamproxy/", description: "上游代理", fileCount: 2 },
  { name: "utils/", description: "工具函数", fileCount: 20 },
  { name: "vim/", description: "Vim 编辑器模式", fileCount: 3 },
  { name: "voice/", description: "语音功能", fileCount: 4 },
];

export default function DirectoryTree() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (name: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  return (
    <div className="space-y-1 font-mono text-sm">
      <div className="text-[var(--text-secondary)] mb-4">claude-code-main/</div>
      {treeData.map((item, idx) => {
        const isLast = idx === treeData.length - 1;
        const isOpen = expanded.has(item.name);
        const prefix = isLast ? "└── " : "├── ";
        const hasChildren = item.children && item.children.length > 0;

        return (
          <div key={item.name}>
            <button
              onClick={() => hasChildren && toggle(item.name)}
              className={`w-full text-left px-3 py-2 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] hover:bg-[var(--accent-purple)]/10 transition-colors group ${
                !hasChildren ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-[var(--text-primary)] whitespace-nowrap">
                  <span className="text-[var(--text-secondary)]">{prefix}</span>
                  {hasChildren && (
                    <span className="inline-block w-4 text-center">{isOpen ? "▼" : "▶"}</span>
                  )}
                  {item.name}
                  {item.fileCount != null && (
                    <span className="text-[var(--text-secondary)] text-xs ml-2">
                      ({item.fileCount} 文件)
                    </span>
                  )}
                </span>
                <span className="text-[var(--text-secondary)] text-xs truncate">{item.description}</span>
                {item.href && (
                  <Link
                    href={item.href}
                    className="text-[var(--accent-purple)] hover:underline text-xs shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    →
                  </Link>
                )}
              </div>
            </button>
            <AnimatePresence>
              {hasChildren && isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden ml-8 border-l border-[var(--card-border)]"
                >
                  {item.children!.map((child, cidx) => (
                    <div
                      key={child.name}
                      className="px-3 py-1.5 text-xs text-[var(--text-secondary)]"
                    >
                      <span>{cidx === item.children!.length - 1 ? "└── " : "├── "}</span>
                      <span className="text-[var(--text-primary)]">{child.name}</span>
                      <span className="ml-2">— {child.description}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
