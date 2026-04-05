"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Claude Code 的入口文件位于哪个目录？",
    options: ["cli/", "entrypoints/", "bootstrap/", "main/"],
    correct: 1,
    explanation: "entrypoints/ 目录包含 CLI 和桌面应用的入口点，是整个应用的启动位置。",
    category: "入口与启动",
  },
  {
    id: 2,
    question: "查询引擎的核心逻辑位于哪个目录？",
    options: ["query/", "search/", "context/", "tools/"],
    correct: 0,
    explanation: "query/ 目录包含查询引擎的核心逻辑，负责处理代码搜索和语义查询。",
    category: "查询引擎",
  },
  {
    id: 3,
    question: "BashTool 的主要职责是什么？",
    options: ["代码格式化", "执行 shell 命令", "文件读写", "网络请求"],
    correct: 1,
    explanation: "BashTool 允许 Claude Code 在安全沙箱中执行 shell 命令，是最核心的工具之一。",
    category: "工具系统",
  },
  {
    id: 4,
    question: "Context 系统的主要功能是什么？",
    options: ["管理用户账户", "构建和管理 LLM 上下文窗口", "处理网络请求", "编译 TypeScript"],
    correct: 1,
    explanation: "Context 系统负责构建发送给 LLM 的上下文，包括系统提示、对话历史和工具定义。",
    category: "上下文管理",
  },
  {
    id: 5,
    question: "哪个工具用于读取文件内容？",
    options: ["FileWriteTool", "FileEditTool", "FileReadTool", "GrepTool"],
    correct: 2,
    explanation: "FileReadTool 专门用于读取文件内容，支持文本文件和图片文件。",
    category: "工具系统",
  },
  {
    id: 6,
    question: "Claude Code 使用什么 UI 框架构建终端界面？",
    options: ["Electron", "React Native", "Ink (React for CLI)", "Vue CLI"],
    correct: 2,
    explanation: "Ink 是一个基于 React 的终端 UI 框架，Claude Code 使用它来构建丰富的 CLI 界面。",
    category: "Ink 终端界面",
  },
  {
    id: 7,
    question: "权限系统的核心设计原则是什么？",
    options: ["默认允许所有操作", "默认拒绝，显式授权", "仅管理员可操作", "无权限控制"],
    correct: 1,
    explanation: "Claude Code 的权限系统采用默认拒绝策略，敏感操作需要用户显式授权。",
    category: "权限系统",
  },
  {
    id: 8,
    question: "MCP (Model Context Protocol) 的作用是什么？",
    options: ["管理模型参数", "提供外部工具和资源的标准协议", "压缩上下文", "加密通信"],
    correct: 1,
    explanation: "MCP 是 Anthropic 提出的开放协议，用于标准化 AI 模型与外部工具/资源的交互。",
    category: "插件系统",
  },
  {
    id: 9,
    question: "GrepTool 的底层实现基于什么？",
    options: ["Node.js 内置搜索", "ripgrep (rg)", "grep 命令", "正则表达式引擎"],
    correct: 1,
    explanation: "GrepTool 使用 ripgrep 作为底层搜索引擎，提供极快的文件内容搜索能力。",
    category: "工具系统",
  },
  {
    id: 10,
    question: "状态管理使用什么方案？",
    options: ["Redux", "Zustand", "React Context + useReducer", "MobX"],
    correct: 2,
    explanation: "Claude Code 使用 React Context 和 useReducer 进行状态管理，保持轻量级。",
    category: "状态管理",
  },
  {
    id: 11,
    question: "Coordinator 模块的主要职责是什么？",
    options: ["UI 渲染", "协调多个 Agent 和任务的执行", "文件系统操作", "网络通信"],
    correct: 1,
    explanation: "Coordinator 负责协调多个 Agent 实例和任务的执行，实现多 Agent 协作。",
    category: "协调器",
  },
  {
    id: 12,
    question: "Hooks 系统的设计灵感来自什么？",
    options: ["Git Hooks", "React Hooks", "Webhook", "Event Hooks"],
    correct: 0,
    explanation: "Claude Code 的 Hooks 系统类似 Git Hooks，允许在特定事件（如工具调用前后）执行自定义脚本。",
    category: "Hooks 系统",
  },
  {
    id: 13,
    question: "WebFetchTool 的功能是什么？",
    options: ["本地文件搜索", "获取网页内容", "发送邮件", "管理浏览器"],
    correct: 1,
    explanation: "WebFetchTool 用于获取和提取网页内容，支持 HTML 到 Markdown 的转换。",
    category: "工具系统",
  },
  {
    id: 14,
    question: "FileEditTool 和 FileWriteTool 的区别是什么？",
    options: ["没有区别", "Edit 基于搜索替换，Write 是完整覆写", "Edit 更快，Write 更安全", "Edit 用于图片，Write 用于文本"],
    correct: 1,
    explanation: "FileEditTool 使用搜索-替换模式进行精确编辑，FileWriteTool 则完整覆写文件内容。",
    category: "工具系统",
  },
  {
    id: 15,
    question: "Buddy 模块的主要功能是什么？",
    options: ["代码补全", "提供辅助 Agent 进行并行任务处理", "版本控制", "性能监控"],
    correct: 1,
    explanation: "Buddy 是一个辅助 Agent 模块，支持与主 Agent 并行执行任务，提高效率。",
    category: "Buddy 系统",
  },
  {
    id: 16,
    question: "Claude Code 的插件系统支持哪种扩展方式？",
    options: ["仅内置插件", "MCP 服务器 + 自定义技能", "浏览器扩展", "操作系统级插件"],
    correct: 1,
    explanation: "插件系统通过 MCP 服务器和自定义技能两种方式支持扩展。",
    category: "插件系统",
  },
  {
    id: 17,
    question: "成本追踪模块记录什么信息？",
    options: ["服务器运行成本", "API 调用的 Token 使用量和费用", "开发时间", "代码行数"],
    correct: 1,
    explanation: "成本追踪模块记录每次 API 调用的 Token 使用量和对应费用，帮助用户控制支出。",
    category: "成本管理",
  },
  {
    id: 18,
    question: "LSPTool 的作用是什么？",
    options: ["语言服务器协议集成", "日志服务提供器", "负载均衡", "链接状态协议"],
    correct: 0,
    explanation: "LSPTool 集成了语言服务器协议，提供代码智能功能如跳转定义、查找引用等。",
    category: "工具系统",
  },
  {
    id: 19,
    question: "Memory 系统使用什么格式存储记忆？",
    options: ["JSON 文件", "SQLite 数据库", "Markdown 文件", "二进制格式"],
    correct: 2,
    explanation: "Memory 系统使用 Markdown 文件存储，便于人类阅读和编辑。",
    category: "记忆系统",
  },
  {
    id: 20,
    question: "Bridge 模块的主要功能是什么？",
    options: ["连接数据库", "连接 IDE 和 Claude Code 实例", "网络桥接", "硬件接口"],
    correct: 1,
    explanation: "Bridge 模块负责 Claude Code 与 IDE（如 VS Code）之间的通信桥梁。",
    category: "Bridge 系统",
  },
  {
    id: 21,
    question: "TaskCreateTool、TaskListTool、TaskUpdateTool 属于什么系统？",
    options: ["文件管理", "任务管理系统", "日程管理", "项目管理"],
    correct: 1,
    explanation: "这些工具属于 Claude Code 的内置任务管理系统，支持创建、查询和更新任务。",
    category: "工具系统",
  },
  {
    id: 22,
    question: "EnterPlanModeTool 和 ExitPlanModeTool 用于什么？",
    options: ["项目管理", "切换规划模式和执行模式", "文件规划", "网络规划"],
    correct: 1,
    explanation: "这两个工具用于在规划模式（思考方案）和执行模式（实施操作）之间切换。",
    category: "工具系统",
  },
  {
    id: 23,
    question: "AgentTool 的功能是什么？",
    options: ["管理用户 Agent", "生成子 Agent 处理子任务", "AI 代理管理", "网络代理"],
    correct: 1,
    explanation: "AgentTool 允许 Claude Code 生成子 Agent 来并行处理子任务，实现任务分解。",
    category: "工具系统",
  },
  {
    id: 24,
    question: "Keybindings 目录的内容是什么？",
    options: ["加密密钥", "键盘快捷键定义", "API 密钥", "SSH 密钥"],
    correct: 1,
    explanation: "Keybindings 目录包含键盘快捷键的定义和映射。",
    category: "其他模块",
  },
  {
    id: 25,
    question: "Skills 系统与 MCP 的关系是什么？",
    options: ["完全独立", "Skills 是 MCP 的简化封装", "MCP 是 Skills 的子集", "两者相同"],
    correct: 1,
    explanation: "Skills 是在 MCP 之上构建的简化封装，提供更友好的工具定义方式。",
    category: "插件系统",
  },
  {
    id: 26,
    question: "Remote 模块的功能是什么？",
    options: ["远程桌面", "远程开发支持", "远程登录", "CDN 分发"],
    correct: 1,
    explanation: "Remote 模块提供远程开发支持，允许 Claude Code 在远程服务器上运行。",
    category: "其他模块",
  },
  {
    id: 27,
    question: "Upstreamproxy 目录的作用是什么？",
    options: ["反向代理", "管理到上游 API 的代理连接", "负载均衡", "CDN 加速"],
    correct: 1,
    explanation: "Upstreamproxy 管理到上游 API（如 Anthropic API）的代理连接。",
    category: "其他模块",
  },
  {
    id: 28,
    question: "Voice 模块提供什么功能？",
    options: ["语音识别", "语音交互支持", "语音合成", "音频播放"],
    correct: 1,
    explanation: "Voice 模块提供语音交互功能，允许用户通过语音与 Claude Code 交互。",
    category: "其他模块",
  },
  {
    id: 29,
    question: "Claude Code 的沙箱模式通过什么实现？",
    options: ["Docker 容器", "操作系统级沙箱", "应用内权限控制", "虚拟机"],
    correct: 2,
    explanation: "Claude Code 通过应用内权限控制实现沙箱模式，限制工具的访问范围。",
    category: "权限系统",
  },
  {
    id: 30,
    question: "Native-ts 目录包含什么？",
    options: ["原生应用代码", "原生 TypeScript 工具（yoga-layout, file-index, color-diff）", "TypeScript 编译器", "Node.js 绑定"],
    correct: 1,
    explanation: "Native-ts 包含原生 TypeScript 工具，如 yoga-layout（布局引擎）、file-index（文件索引）等。",
    category: "其他模块",
  },
  {
    id: 31,
    question: "OutputStyles 目录的作用是什么？",
    options: ["CSS 样式", "定义终端输出的样式和格式", "打印模板", "日志格式"],
    correct: 1,
    explanation: "OutputStyles 定义了终端输出的样式和格式，确保一致的可视化体验。",
    category: "Ink 终端界面",
  },
  {
    id: 32,
    question: "ScheduleCronTool 的功能是什么？",
    options: ["定时编译", "创建和管理定时任务", "日志轮转", "性能调度"],
    correct: 1,
    explanation: "ScheduleCronTool 允许创建和管理 cron 风格的定时任务。",
    category: "工具系统",
  },
];

const categories = [...new Set(questions.map((q) => q.category))];

export function QuizSection() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<Record<number, boolean>>({});
  const [activeCategory, setActiveCategory] = useState<string>("全部");

  const filteredQuestions =
    activeCategory === "全部"
      ? questions
      : questions.filter((q) => q.category === activeCategory);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (showResults[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = (questionId: number) => {
    setShowResults((prev) => ({ ...prev, [questionId]: true }));
  };

  const correctCount = questions.filter(
    (q) => selectedAnswers[q.id] === q.correct
  ).length;

  return (
    <div>
      {/* Score */}
      {Object.keys(showResults).length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]"
        >
          <p className="text-[var(--text-primary)] font-semibold">
            📊 已作答：{Object.keys(showResults).length} / {questions.length}{" "}
            ｜ 正确：{correctCount}
          </p>
          <div className="mt-2 h-2 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
              initial={{ width: 0 }}
              animate={{
                width: `${(correctCount / questions.length) * 100}%`,
              }}
            />
          </div>
        </motion.div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveCategory("全部")}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
            activeCategory === "全部"
              ? "bg-[var(--accent-primary)] text-white"
              : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          全部 ({questions.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
              activeCategory === cat
                ? "bg-[var(--accent-primary)] text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            {cat} ({questions.filter((q) => q.category === cat).length})
          </button>
        ))}
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isAnswered = showResults[q.id];
          const isCorrect = selectedAnswers[q.id] === q.correct;

          return (
            <motion.div
              key={q.id}
              layout
              className="p-5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[var(--bg-tertiary)] text-xs font-bold text-[var(--text-secondary)]">
                  {q.id}
                </span>
                <div>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {q.category}
                  </span>
                  <p className="text-[var(--text-primary)] font-medium mt-0.5">
                    {q.question}
                  </p>
                </div>
              </div>

              <div className="space-y-2 ml-10">
                {q.options.map((opt, i) => {
                  const isSelected = selectedAnswers[q.id] === i;
                  const isCorrectOption = q.correct === i;
                  let optionStyle =
                    "border-[var(--border-primary)] hover:border-[var(--accent-primary)]/50";

                  if (isAnswered) {
                    if (isCorrectOption) {
                      optionStyle =
                        "border-emerald-500/50 bg-emerald-500/10";
                    } else if (isSelected && !isCorrect) {
                      optionStyle = "border-red-500/50 bg-red-500/10";
                    } else {
                      optionStyle = "border-[var(--border-primary)] opacity-60";
                    }
                  } else if (isSelected) {
                    optionStyle =
                      "border-[var(--accent-primary)] bg-[var(--accent-primary)]/10";
                  }

                  return (
                    <button
                      key={i}
                      onClick={() => handleSelect(q.id, i)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${optionStyle}`}
                    >
                      <span className="text-sm text-[var(--text-secondary)]">
                        {String.fromCharCode(65 + i)}.{" "}
                      </span>
                      <span className="text-sm text-[var(--text-primary)]">
                        {opt}
                      </span>
                      {isAnswered && isCorrectOption && (
                        <span className="float-right text-emerald-400 text-xs">
                          ✓ 正确
                        </span>
                      )}
                      {isAnswered && isSelected && !isCorrect && (
                        <span className="float-right text-red-400 text-xs">
                          ✗ 错误
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-10 mt-3 p-3 rounded-lg bg-[var(--bg-tertiary)] text-sm text-[var(--text-secondary)]"
                  >
                    💡 {q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>

              {!isAnswered && selectedAnswers[q.id] !== undefined && (
                <div className="ml-10 mt-3">
                  <button
                    onClick={() => handleSubmit(q.id)}
                    className="px-4 py-2 rounded-lg bg-[var(--accent-primary)] text-white text-sm hover:opacity-90 transition-opacity"
                  >
                    提交答案
                  </button>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
