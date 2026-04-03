import { ModuleLayout } from "@/components/ModuleLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function CoordinatorPage() {
  const relatedModules = [
    {
      title: "工具系统",
      href: "/tools",
      description: "AgentTool 详解",
      icon: "\uD83D\uDD27",
    },
    {
      title: "KAIROS",
      href: "/assistant",
      description: "持久助手模式",
      icon: "\uD83E\uDD16",
    },
    {
      title: "插件系统",
      href: "/plugins",
      description: "扩展机制",
      icon: "\uD83D\uDD0C",
    },
  ];

  return (
    <ModuleLayout
      title="多智能体协调"
      subtitle="Claude Code 的 Coordinator 模式 — 多 Agent 编排、任务分解与团队协作"
      icon="\uD83D\uDD78\uFE0F"
      category="核心架构"
      relatedModules={relatedModules}
    >
      {/* Section 1: 多智能体架构概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="多智能体架构概述"
            subtitle="Coordinator-Worker 分层编排模型"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 的 Coordinator 模式实现了{" "}
              <strong className="text-[var(--text-primary)]">
                多 Agent 编排
              </strong>{" "}
              能力。在这个架构中，一个 Coordinator Agent 作为中央管理者，负责将复杂任务分解为子任务，
              分配给多个 Worker Agent 并行执行，最后汇总所有结果。这种模式使得 Claude Code 能够
              应对大规模、高复杂度的工程任务。
            </p>
            <p>
              Coordinator 与 Worker 之间通过明确的通信协议协作。Coordinator 拥有管理类工具
              （任务创建、团队管理、消息路由），而 Worker 则使用执行类工具（文件读写、命令执行、代码搜索），
              形成分层分权的协作体系。
            </p>
          </div>

          <ArchitectureDiagram
            title="Coordinator-Worker 架构"
            nodes={[
              { id: "coordinator", label: "Coordinator Agent", x: 330, y: 20, color: "var(--accent-cyan)" },
              { id: "worker1", label: "Worker Agent 1", x: 80, y: 160, color: "var(--accent-purple)" },
              { id: "worker2", label: "Worker Agent 2", x: 330, y: 160, color: "var(--accent-purple)" },
              { id: "worker3", label: "Worker Agent 3", x: 580, y: 160, color: "var(--accent-purple)" },
              { id: "queue", label: "Task Queue", x: 80, y: 310, color: "var(--accent-blue)" },
              { id: "state", label: "Shared State", x: 330, y: 310, color: "var(--accent-blue)" },
              { id: "bus", label: "Message Bus", x: 580, y: 310, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "coordinator", to: "worker1", label: "分配" },
              { from: "coordinator", to: "worker2", label: "分配" },
              { from: "coordinator", to: "worker3", label: "分配" },
              { from: "worker1", to: "queue", label: "" },
              { from: "worker2", to: "state", label: "" },
              { from: "worker3", to: "bus", label: "" },
            ]}
            width={860}
            height={380}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: 协调器模式 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="协调器模式"
            subtitle="管理工具与执行工具的分层设计"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Coordinator 拥有与 Worker 完全不同的工具集。Coordinator 使用{" "}
              <strong className="text-[var(--text-primary)]">管理工具</strong>{" "}
              进行任务分解、分配和进度监控，而 Worker 使用{" "}
              <strong className="text-[var(--text-primary)]">执行工具</strong>{" "}
              进行文件读写、命令执行和代码搜索。这种分层设计确保了职责清晰，避免了 Worker 越权操作。
            </p>
            <p>
              Coordinator 负责四个核心职责：将复杂任务分解为可独立执行的子任务、将子任务
              分配给最合适的 Worker Agent、监控各 Worker 的执行进度、以及汇总所有结果并生成最终输出。
            </p>
          </div>

          <CodeBlock
            code={`// 协调器角色
interface CoordinatorAgent {
  // 任务分解
  decomposeTask(task: string): SubTask[];
  // 任务分配
  assignTask(agent: WorkerAgent, task: SubTask): void;
  // 结果汇总
  aggregateResults(results: TaskResult[]): FinalResult;
  // 进度监控
  monitorProgress(): ProgressReport;
}

// 子任务定义
interface SubTask {
  id: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  dependencies: string[];  // 依赖的其他子任务 ID
}

// Worker 只拥有执行工具
interface WorkerAgent {
  name: string;
  tools: ['FileReadTool', 'FileEditTool', 'BashTool', 'GrepTool'];
  execute(task: SubTask): Promise<TaskResult>;
}`}
            language="typescript"
            filename="coordinator/types.ts"
            highlights={[2, 3, 4, 5, 6, 8, 9, 10, 14, 15, 16, 17, 18, 19]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "管理工具 (Coordinator)",
                desc: "TaskCreate, TaskUpdate, TaskList, TeamCreate, SendMessage, AgentTool",
                detail:
                  "Coordinator 使用这些工具来创建和管理团队、分配任务、监控进度以及在 Agent 之间路由消息。这些工具不直接操作代码或文件。",
                color: "var(--accent-cyan)",
              },
              {
                title: "执行工具 (Worker)",
                desc: "FileReadTool, FileEditTool, BashTool, GrepTool, GlobTool",
                detail:
                  "Worker 使用这些工具来执行具体的子任务：读取和编辑文件、运行命令、搜索代码。每个 Worker 聚焦于分配给自己的任务，完成后通过消息汇报结果。",
                color: "var(--accent-purple)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: item.color }}
                  />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h5>
                </div>
                <p className="text-sm text-[var(--accent-cyan)] font-mono mb-3">
                  {item.desc}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: Worker Agent 生命周期 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Worker Agent 生命周期"
            subtitle="从创建到终止的完整流程"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              每个 Worker Agent 都经历一个完整的生命周期：从 Coordinator 使用 AgentTool 生成，
              接收具体子任务，使用执行工具完成任务，通过 SendMessage 返回结果，最终由 Coordinator
              终止。这个过程是高度结构化的，每一步都有明确的输入和输出。
            </p>
          </div>

          <CodeFlow
            title="Worker Agent 生命周期"
            steps={[
              {
                code: `// Step 1: 创建 - Coordinator 使用 AgentTool 生成 Worker
const worker = await AgentTool.call({
  name: 'researcher',
  prompt: '研究 tools/ 目录下的所有工具实现',
  mode: 'subagent',
});

// Coordinator 在内部维护 Worker 注册表
const workerRegistry = new Map<string, WorkerAgent>();
workerRegistry.set('researcher', worker);`,
                highlight: [2, 3, 4, 5, 6, 9],
                description:
                  "Coordinator 使用 AgentTool 创建新的 Worker Agent。每个 Worker 拥有唯一的名称和明确的任务提示，以 subagent 模式运行，继承父 Agent 的部分权限但拥有独立的工具集。",
              },
              {
                code: `// Step 2: 分配任务 - Worker 接收具体子任务
await TaskUpdate({
  taskId: 'task-001',
  owner: 'researcher',
  status: 'in_progress',
});

// Worker 开始执行前会读取完整任务描述
const taskDetails = await TaskGet({ taskId: 'task-001' });
// taskDetails.description 包含具体的执行要求`,
                highlight: [2, 3, 4, 5, 8, 9],
                description:
                  "Coordinator 通过 TaskUpdate 将子任务分配给指定的 Worker，并将状态标记为 in_progress。Worker 接收到任务后，读取完整描述，了解具体需要完成的工作。",
              },
              {
                code: `// Step 3: 执行 - Worker 使用工具执行任务
const files = await GlobTool.call({ pattern: 'tools/**/*.ts' });
// 发现 45 个工具文件

for (const file of files.slice(0, 10)) {
  const content = await FileReadTool.call({ path: file });
  // 分析每个工具的实现...
}

// Worker 可以并行使用只读工具提升效率
const [types, registry] = await Promise.all([
  FileReadTool.call({ path: 'tools/types.ts' }),
  FileReadTool.call({ path: 'tools/registry.ts' }),
]);`,
                highlight: [2, 3, 5, 6, 7, 10, 11, 12, 13],
                description:
                  "Worker 使用执行工具完成具体任务。只读工具（如 FileReadTool、GlobTool）可以并发执行以提升效率，而写操作工具则串行执行以保证数据一致性。",
              },
              {
                code: `// Step 4: 汇报 - Worker 通过 SendMessage 返回结果
await SendMessageTool.call({
  to: 'coordinator',
  message: JSON.stringify({
    status: 'completed',
    summary: '完成分析，发现 40+ 工具实现',
    details: {
      totalFiles: 45,
      categories: ['file', 'search', 'bash', 'agent', 'task'],
      keyFindings: ['统一 Tool 接口', 'Zod Schema 校验', '并发调度器'],
    },
  }),
});`,
                highlight: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                description:
                  "Worker 完成任务后，通过 SendMessage 将结构化的结果发送回 Coordinator。消息中包含任务状态、执行摘要和详细发现，Coordinator 据此进行结果汇总和后续决策。",
              },
              {
                code: `// Step 5: 终止 - Coordinator 收到结果后终止 Worker
const result = await receiveMessage('researcher');
await TaskUpdate({
  taskId: 'task-001',
  status: 'completed',
});

// Worker 自动进入空闲状态
// Coordinator 可以选择复用或释放 Worker 资源
workerRegistry.delete('researcher');
// 团队资源被清理，任务完成`,
                highlight: [1, 2, 3, 4, 5, 8, 9],
                description:
                  "Coordinator 接收到 Worker 的结果消息后，将任务标记为 completed，并从注册表中移除 Worker。Worker 的资源被释放，整个生命周期结束。如果需要，Coordinator 可以创建新的 Worker 处理后续任务。",
              },
            ]}
          />

          <CodeBlock
            code={`// 生成 Worker Agent
const worker = await AgentTool.call({
  name: 'researcher',
  prompt: '研究 tools/ 目录下的所有工具实现',
  mode: 'subagent',
});

// Worker 通过 SendMessage 通信
SendMessageTool.call({
  to: 'coordinator',
  message: '完成分析，发现 40+ 工具实现',
});`}
            language="typescript"
            filename="coordinator/worker-lifecycle.ts"
            highlights={[2, 3, 4, 5, 6, 9, 10, 11, 12]}
          />
        </section>
      </ScrollReveal>

      {/* Section 4: 任务管理 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="任务管理"
            subtitle="TaskCreate / TaskUpdate / TaskList 全流程"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              任务管理是 Coordinator 模式的核心基础设施。通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                TaskCreate
              </code>{" "}
              创建任务、{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                TaskUpdate
              </code>{" "}
              更新状态、{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                TaskList
              </code>{" "}
              查看全局进度，Coordinator 可以精确地编排多个 Worker 的执行顺序。
            </p>
            <p>
              任务之间可以建立{" "}
              <strong className="text-[var(--text-primary)]">依赖和阻塞关系</strong>
              。一个任务可以被标记为阻塞其他任务，使得后续任务必须等待前置任务完成后才能开始。
              这种机制确保了任务按正确的依赖顺序执行，避免数据竞争和逻辑错误。
            </p>
          </div>

          <CodeBlock
            code={`// 创建任务
await TaskCreate({
  subject: "分析工具系统",
  description: "研究 tools/ 目录下所有工具的接口定义和实现模式",
});

// 设置任务依赖关系
await TaskCreate({
  subject: "编写工具系统文档",
  description: "基于分析结果编写工具系统文档",
  // 此任务被上一个任务阻塞
});
await TaskUpdate({
  taskId: "2",
  addBlockedBy: ["1"],  // 任务 2 必须等任务 1 完成
});

// 分配给 Worker
await TaskUpdate({
  taskId: "1",
  owner: "researcher",
});

// Worker 完成后更新
await TaskUpdate({
  taskId: "1",
  status: "completed",
});

// 查看全局进度
const tasks = await TaskList();
// tasks: [
//   { id: "1", status: "completed", owner: "researcher" },
//   { id: "2", status: "pending", blockedBy: ["1"] },  // 现在已解锁
// ]`}
            language="typescript"
            filename="coordinator/task-management.ts"
            highlights={[2, 3, 4, 7, 8, 12, 13, 16, 17, 18, 21, 22, 25, 26, 27, 28, 29, 30, 31]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                name: "TaskCreate",
                desc: "创建新任务并加入任务列表，可设置标题、描述和优先级",
                color: "var(--accent-cyan)",
              },
              {
                name: "TaskUpdate",
                desc: "更新任务状态、分配负责人、设置依赖关系",
                color: "var(--accent-blue)",
              },
              {
                name: "TaskList",
                desc: "列出所有任务及其状态，查看全局执行进度",
                color: "var(--accent-purple)",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: item.color }}
                  />
                  <code className="text-sm font-mono text-[var(--accent-cyan)]">
                    {item.name}
                  </code>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: 团队系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="团队系统"
            subtitle="TeamCreate / TeamDelete 管理多 Agent 团队"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              团队系统为多 Agent 协作提供了结构化的管理框架。通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                TeamCreate
              </code>{" "}
              创建团队后，系统会自动初始化共享的任务列表和通信信道。
              所有团队成员可以通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                SendMessage
              </code>{" "}
              进行点对点或广播通信，实现灵活的协作模式。
            </p>
            <p>
              每个团队都有独立的文件系统空间来存储任务数据和配置信息，
              确保不同团队之间不会相互干扰。团队生命周期结束时，
              通过{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                TeamDelete
              </code>{" "}
              清理所有相关资源。
            </p>
          </div>

          <CodeBlock
            code={`// 创建团队
await TeamCreate({
  team_name: "code-analysis",
  description: "分析 Claude Code 源代码架构",
});

// 团队成员共享:
// - 任务列表: ~/.claude/tasks/{team-name}/
// - 配置文件: ~/.claude/teams/{team-name}/config.json

// 添加 Worker 到团队
const worker = await AgentTool.call({
  name: 'researcher',
  prompt: '你是 code-analysis 团队的研究员',
  team_name: 'code-analysis',
});

// Worker 可以访问团队共享的任务列表
const tasks = await TaskList();  // 返回团队内的所有任务

// 团队工作完成后清理
await TeamDelete();`}
            language="typescript"
            filename="coordinator/team-system.ts"
            highlights={[2, 3, 4, 5, 8, 9, 12, 13, 14, 17, 18, 21, 22]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "共享任务列表",
                desc: "团队成员共享同一份任务列表，任何成员都可以创建、认领和更新任务。任务列表存储在 ~/.claude/tasks/{team-name}/ 目录下，以 JSON 格式持久化。",
                color: "var(--accent-cyan)",
              },
              {
                title: "团队配置",
                desc: "每个团队维护独立的配置文件，记录团队成员信息、角色分配和通信规则。配置文件位于 ~/.claude/teams/{team-name}/config.json，支持动态更新。",
                color: "var(--accent-purple)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: item.color }}
                  />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h5>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: 通信机制 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="通信机制"
            subtitle="SendMessage 点对点与广播通信"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Agent 间的通信是 Coordinator 模式的神经网络。{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                SendMessage
              </code>{" "}
              工具支持两种通信模式：{" "}
              <strong className="text-[var(--text-primary)]">点对点通信</strong>（发送给指定 Agent）
              和{" "}
              <strong className="text-[var(--text-primary)]">广播通信</strong>（发送给所有团队成员）。
              消息会自动投递到目标 Agent，无需主动轮询。
            </p>
            <p>
              消息投递是异步的。当目标 Agent 正忙于执行任务时，消息会被排队等待，
              直到当前任务完成后才处理。这种设计避免了 Agent 被频繁打断，
              保证了任务执行的连贯性。
            </p>
          </div>

          <CodeBlock
            code={`// 点对点通信
await SendMessage({
  to: "researcher",
  message: "请优先分析 tools/ 目录下的文件操作类工具",
});

// 广播通信
await SendMessage({
  to: "*",
  message: "所有成员请汇报当前进度",
});

// Coordinator 向 Worker 发送调整指令
await SendMessage({
  to: "developer",
  message: JSON.stringify({
    type: "directive",
    action: "switch_focus",
    newTask: "修复 src/utils/validator.ts 中的类型错误",
    priority: "high",
  }),
});

// Worker 向 Coordinator 汇报结果
await SendMessage({
  to: "coordinator",
  message: JSON.stringify({
    type: "status_report",
    taskId: "task-003",
    progress: 75,
    eta: "预计 5 分钟内完成",
    blockers: ["发现一个未预期的依赖关系"],
  }),
});`}
            language="typescript"
            filename="coordinator/communication.ts"
            highlights={[2, 3, 4, 7, 8, 9, 12, 13, 14, 15, 16, 17, 20, 21, 22, 23, 24, 25, 26]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "点对点通信",
                pattern: 'to: "agent-name"',
                desc: "发送给指定的单个 Agent。适用于任务分配、结果汇报、指令调整等场景。消息只有目标 Agent 能收到。",
                color: "var(--accent-cyan)",
              },
              {
                title: "广播通信",
                pattern: 'to: "*"',
                desc: "发送给团队中的所有成员。适用于全局通知、进度同步、紧急变更等场景。所有团队成员同时收到消息。",
                color: "var(--accent-purple)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: item.color }}
                  />
                  <h5 className="text-base font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h5>
                </div>
                <code className="text-sm font-mono text-[var(--accent-cyan)] block mb-3">
                  {item.pattern}
                </code>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
