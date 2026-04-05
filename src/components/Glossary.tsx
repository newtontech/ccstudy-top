"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";

interface GlossaryTerm {
  id: string;
  term: string;
  short: string;
  detail: string;
  href?: string;
  icon: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    id: "agent",
    term: "Agent",
    short: "AI agent loop that manages conversations and tool calls",
    detail: "The core agent in Claude Code iterates through a loop: receive user input → augment context → call LLM → execute tools → render results → repeat until done.",
    href: "/assistant",
    icon: "🤖",
  },
  {
    id: "tool",
    term: "Tool",
    short: "Extensible functions the agent can invoke",
    detail: "Claude Code provides 40+ built-in tools (Read, Write, Bash, Grep, etc.) and supports custom tools via plugins and MCP servers.",
    href: "/tools",
    icon: "🔧",
  },
  {
    id: "command",
    term: "Command",
    short: "Slash commands for user interactions",
    detail: "Slash commands like /help, /clear, /compact provide quick actions. The command system is extensible via plugins.",
    href: "/commands",
    icon: "⌨️",
  },
  {
    id: "query-engine",
    term: "QueryEngine",
    short: "Orchestrates conversations and message history",
    detail: "The QueryEngine manages the full conversation lifecycle: streaming API calls, message history, tool execution, and response rendering.",
    icon: "🔍",
  },
  {
    id: "context",
    term: "Context",
    short: "Token budget and system prompt management",
    detail: "Tracks token usage, compiles system prompts from CLAUDE.md files, git status, and project info to build the full context window.",
    icon: "🧠",
  },
  {
    id: "buddy",
    term: "Buddy",
    short: "Tamagotchi-style companion system",
    detail: "A deterministic companion that evolves based on user interactions. Manages long-running tasks, notifications, and scheduled operations.",
    href: "/buddy",
    icon: "🐣",
  },
  {
    id: "kairos",
    term: "KAIROS",
    short: "Persistent AI assistant mode",
    detail: "The KAIROS assistant provides persistent, context-aware AI assistance. Integrates memory, tools, and multi-step reasoning for complex tasks.",
    href: "/assistant",
    icon: "⏰",
  },
  {
    id: "mcp",
    term: "MCP",
    short: "Model Context Protocol for external integrations",
    detail: "The Model Context Protocol allows Claude Code to connect to external MCP servers for additional tools, resources, and prompts.",
    href: "/plugins",
    icon: "🔌",
  },
  {
    id: "token-budget",
    term: "Token Budget",
    short: "Manages LLM token allocation and context window",
    detail: "Tracks and allocates tokens across the conversation context, system prompts, tool definitions, and response space to stay within model limits.",
    icon: "💰",
  },
  {
    id: "stop-hooks",
    term: "Stop Hooks",
    short: "Lifecycle hooks triggered at conversation boundaries",
    detail: "Stop hooks fire when the agent pauses or completes. Used for auto-save, notifications, buddy state updates, and cleanup tasks.",
    href: "/hooks",
    icon: "🪝",
  },
  {
    id: "compact",
    term: "Compact",
    short: "Summarizes conversation history to save tokens",
    detail: "The /compact command summarizes older messages into a concise summary, freeing up context window space for new interactions while preserving key information.",
    icon: "📦",
  },
  {
    id: "dream",
    term: "Dream",
    short: "Background reflection and planning process",
    detail: "The Dream system enables the agent to perform background reasoning, planning, and self-reflection outside the main conversation loop.",
    icon: "💭",
  },
];

export function Glossary() {
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <SectionTitle
        title={t.home.glossary.title}
        subtitle={t.home.glossary.subtitle}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {glossaryTerms.map((item, i) => (
          <motion.div
            key={item.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] overflow-hidden cursor-pointer hover:border-[var(--accent-purple)] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.3 }}
            whileHover={{ y: -2 }}
            onClick={() => setExpanded(expanded === item.id ? null : item.id)}
          >
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">{item.icon}</span>
                <h4 className="font-bold text-sm">{item.term}</h4>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{item.short}</p>
            </div>

            <AnimatePresence>
              {expanded === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-[var(--border)] pt-3">
                    <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-3">
                      {item.detail}
                    </p>
                    {item.href && (
                      <Link
                        href={item.href}
                        className="inline-block text-xs font-medium text-[var(--accent-purple)] hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t.home.glossary.learnMore} →
                      </Link>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
