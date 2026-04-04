import { ModuleLayout } from "@/components/ModuleLayout";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function BuddyPage() {
  const relatedModules = [
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构",
      icon: "🏗️",
    },
    {
      title: "Hooks系统",
      href: "/hooks",
      description: "React Hooks",
      icon: "🧩",
    },
    {
      title: "UI框架",
      href: "/ink",
      description: "终端 UI 渲染",
      icon: "🎨",
    },
  ];

  return (
    <ModuleLayout
      title="Buddy 伴侣系统"
      subtitle="Claude Code 内置的 Tamagotchi 风格伴侣系统 —— 确定性抽卡、ASCII 精灵、五维属性与灵魂描述"
      icon="🐆"
      category="趣味系统"
      relatedModules={relatedModules}
    >
      {/* Section 1: Buddy 系统概述 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="Buddy 系统概述"
            subtitle="终端里的电子宠物"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Claude Code 内置了一个{" "}
              <strong className="text-[var(--text-primary)]">
                Tamagotchi 风格的伴侣系统
              </strong>{" "}
              （Buddy System）。每个用户在首次使用时，都会获得一个独一无二的伙伴精灵。
              这个系统不仅仅是装饰——它展示了确定性计算、过程化生成和 AI 意图理解的巧妙结合。
            </p>
            <p>
              整个系统建立在几项核心机制之上：
              <strong className="text-[var(--text-primary)]">确定性抽卡</strong>{" "}
              确保每个用户基于其 ID 获得唯一的伙伴；
              <strong className="text-[var(--text-primary)]">18 个物种</strong>{" "}
              横跨五个稀有度等级；
              <strong className="text-[var(--text-primary)]">1% 闪光几率</strong>{" "}
              独立于稀有度的特殊变体；
              以及由{" "}
              <strong className="text-[var(--text-primary)]">Claude 自身生成</strong>{" "}
              的灵魂描述。
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "确定性抽卡",
                value: "Mulberry32 PRNG",
                desc: "基于用户 ID 的伪随机数生成器，保证唯一性",
                color: "var(--accent-cyan)",
              },
              {
                label: "物种总数",
                value: "18",
                desc: "横跨五个稀有度等级的独特伙伴",
                color: "var(--accent-purple)",
              },
              {
                label: "闪光几率",
                value: "1%",
                desc: "独立于稀有度的特殊闪光变体",
                color: "var(--accent-yellow, #f59e0b)",
              },
              {
                label: "属性维度",
                value: "5",
                desc: "过程化生成的五维伙伴属性",
                color: "var(--accent-blue)",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div
                  className="text-2xl font-bold mb-1"
                  style={{ color: item.color }}
                >
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                  {item.label}
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <ArchitectureDiagram
            title="Buddy 系统架构"
            nodes={[
              // Row 1: Input
              { id: "userId", label: "用户 ID", x: 240, y: 30, color: "var(--text-secondary)" },
              // Row 2: PRNG
              { id: "seed", label: "hashCode 种子", x: 100, y: 110, color: "var(--accent-cyan)" },
              { id: "prng", label: "Mulberry32 PRNG", x: 340, y: 110, color: "var(--accent-cyan)" },
              // Row 3: Generation
              { id: "species", label: "物种选择", x: 40, y: 200, color: "var(--accent-purple)" },
              { id: "rarity", label: "稀有度", x: 180, y: 200, color: "var(--accent-yellow, #f59e0b)" },
              { id: "stats", label: "五维属性", x: 320, y: 200, color: "var(--accent-blue)" },
              { id: "shiny", label: "闪光判定", x: 460, y: 200, color: "var(--accent-yellow, #f59e0b)" },
              // Row 4: Output
              { id: "ascii", label: "ASCII 精灵", x: 120, y: 290, color: "var(--accent-purple)" },
              { id: "soul", label: "灵魂描述", x: 340, y: 290, color: "var(--accent-cyan)" },
            ]}
            edges={[
              { from: "userId", to: "seed", label: "哈希" },
              { from: "seed", to: "prng", label: "初始化" },
              { from: "prng", to: "species", label: "" },
              { from: "prng", to: "rarity", label: "" },
              { from: "prng", to: "stats", label: "" },
              { from: "prng", to: "shiny", label: "" },
              { from: "species", to: "ascii", label: "渲染" },
              { from: "stats", to: "soul", label: "AI 生成" },
              { from: "rarity", to: "ascii", label: "" },
            ]}
            width={560}
            height={360}
          />
        </section>
      </ScrollReveal>

      {/* Section 2: 确定性抽卡系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="确定性抽卡系统"
            subtitle="基于 Mulberry32 的伪随机数生成"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Buddy 系统的核心是一个{" "}
              <strong className="text-[var(--text-primary)]">确定性随机数生成器</strong>
              （Deterministic PRNG）。与 JavaScript 内置的{" "}
              <code className="px-1.5 py-0.5 rounded bg-[var(--card-bg)] border border-[var(--card-border)] text-sm font-mono text-[var(--accent-cyan)]">
                Math.random()
              </code>{" "}
              不同，Mulberry32 算法使用固定种子，确保相同的输入始终产生相同的输出。
              这意味着每个用户 ID 都会对应一个唯一的、可复现的伙伴。
            </p>
            <p>
              为什么选择确定性而非真随机？因为确定性保证了公平性和可验证性——
              每个用户的伙伴由其 ID 唯一决定，不存在重复或遗漏，也不需要服务器端的状态存储。
            </p>
          </div>

          {/* Replaces CodeBlock #1: Mulberry32 PRNG algorithm visualization */}
          <ArchitectureDiagram
            title="Mulberry32 PRNG 算法流程"
            nodes={[
              { id: "input", label: "seed (32-bit int)", x: 40, y: 30, color: "var(--accent-cyan)" },
              { id: "add", label: "seed += 0x6D2B79F5", x: 220, y: 30, color: "var(--accent-cyan)" },
              { id: "imul", label: "Math.imul 变换", x: 400, y: 30, color: "var(--accent-purple)" },
              { id: "xor1", label: "XOR + 位运算", x: 40, y: 110, color: "var(--accent-purple)" },
              { id: "imul2", label: "Math.imul 二次变换", x: 220, y: 110, color: "var(--accent-purple)" },
              { id: "shift", label: "右移 + XOR", x: 400, y: 110, color: "var(--accent-blue)" },
              { id: "output", label: "[0, 1) 浮点数", x: 220, y: 190, color: "var(--accent-blue)" },
            ]}
            edges={[
              { from: "input", to: "add", label: "位或 0" },
              { from: "add", to: "imul", label: "异或移位" },
              { from: "imul", to: "xor1", label: "t = imul(...)" },
              { from: "xor1", to: "imul2", label: "61 | t" },
              { from: "imul2", to: "shift", label: "XOR t" },
              { from: "shift", to: "output", label: "/ 2^32" },
            ]}
            width={560}
            height={270}
          />

          {/* Replaces CodeFlow #1: 抽卡流程 */}
          <div className="mt-6">
            <ArchitectureDiagram
              title="抽卡流程：从用户 ID 到伙伴诞生"
              nodes={[
                { id: "uid", label: "用户 ID 字符串", x: 40, y: 30, color: "var(--text-secondary)" },
                { id: "hash", label: "hashCode()", x: 220, y: 30, color: "var(--accent-cyan)" },
                { id: "init", label: "mulberry32(seed)", x: 420, y: 30, color: "var(--accent-cyan)" },
                { id: "s1", label: "rng() → 物种", x: 40, y: 120, color: "var(--accent-purple)" },
                { id: "s2", label: "rng() → 稀有度", x: 220, y: 120, color: "var(--accent-yellow, #f59e0b)" },
                { id: "s3", label: "rng() < 0.01 → 闪光", x: 420, y: 120, color: "var(--accent-yellow, #f59e0b)" },
                { id: "s4", label: "rng() × 5 → 属性", x: 140, y: 210, color: "var(--accent-blue)" },
                { id: "result", label: "完整 Buddy 对象", x: 380, y: 210, color: "var(--accent-purple)" },
              ]}
              edges={[
                { from: "uid", to: "hash", label: "char 迭代" },
                { from: "hash", to: "init", label: "32-bit 种子" },
                { from: "init", to: "s1", label: "rng() ⨯ 18" },
                { from: "init", to: "s2", label: "rng() 分层" },
                { from: "init", to: "s3", label: "1% 判定" },
                { from: "init", to: "s4", label: "连续 5 次" },
                { from: "s1", to: "result", label: "" },
                { from: "s2", to: "result", label: "" },
                { from: "s3", to: "result", label: "" },
                { from: "s4", to: "result", label: "" },
              ]}
              width={600}
              height={300}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: 物种与稀有度 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="物种与稀有度"
            subtitle="18 个物种，五个稀有度等级"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              Buddy 系统包含{" "}
              <strong className="text-[var(--text-primary)]">18 个独特物种</strong>
              ，每个物种都属于五个稀有度等级之一。稀有度不仅影响获取概率，
              还决定了伙伴的视觉特效和动画复杂度。此外，任何稀有度的伙伴都有{" "}
              <strong className="text-[var(--text-primary)]">1% 的独立几率</strong>{" "}
              成为闪光（Shiny）变体，拥有独特的外观颜色。
            </p>
          </div>

          {/* Replaces CodeBlock #2: Rarity determination logic */}
          <ArchitectureDiagram
            title="稀有度概率分布"
            nodes={[
              { id: "roll", label: "rng() → [0, 1)", x: 280, y: 20, color: "var(--accent-cyan)" },
              { id: "common", label: "Common 65%", x: 40, y: 110, color: "var(--text-secondary)" },
              { id: "rare", label: "Rare 20%", x: 180, y: 110, color: "var(--accent-blue)" },
              { id: "epic", label: "Epic 10%", x: 320, y: 110, color: "var(--accent-purple)" },
              { id: "legend", label: "Legendary 4%", x: 460, y: 110, color: "var(--accent-yellow, #f59e0b)" },
              { id: "any", label: "任意稀有度", x: 280, y: 200, color: "var(--text-secondary)" },
              { id: "shiny", label: "Shiny 1% (独立)", x: 280, y: 280, color: "#f59e0b" },
            ]}
            edges={[
              { from: "roll", to: "common", label: "≥ 0.35" },
              { from: "roll", to: "rare", label: "0.15-0.35" },
              { from: "roll", to: "epic", label: "0.05-0.15" },
              { from: "roll", to: "legend", label: "0.01-0.05" },
              { from: "common", to: "any", label: "" },
              { from: "rare", to: "any", label: "" },
              { from: "epic", to: "any", label: "" },
              { from: "legend", to: "any", label: "" },
              { from: "any", to: "shiny", label: "rng() < 0.01" },
            ]}
            width={600}
            height={350}
          />

          <div className="mt-8 space-y-3">
            {[
              {
                rarity: "普通 (Common)",
                probability: "65%",
                desc: "最常见的伙伴类型，拥有基础的外观和简单的 ASCII 精灵动画",
                color: "var(--text-secondary)",
                example: "小史莱姆、像素猫、代码虫",
              },
              {
                rarity: "稀有 (Rare)",
                probability: "20%",
                desc: "较少见的伙伴，拥有独特的外观设计和更丰富的表情",
                color: "var(--accent-blue)",
                example: "水晶狐、数据龙、量子兔",
              },
              {
                rarity: "史诗 (Epic)",
                probability: "10%",
                desc: "稀有的伙伴，拥有特殊动画效果和独特的粒子特效",
                color: "var(--accent-purple)",
                example: "虚空凤凰、时间蛇、混沌狼",
              },
              {
                rarity: "传说 (Legendary)",
                probability: "4%",
                desc: "极其稀有的伙伴，拥有华丽的视觉效果和专属的动画序列",
                color: "var(--accent-yellow, #f59e0b)",
                example: "宇宙鲸、永恒树、星辰鹰",
              },
              {
                rarity: "闪光 (Shiny)",
                probability: "1%（独立）",
                desc: "独立于稀有度的特殊变体，拥有独特的闪光色彩和光芒效果",
                color: "#f59e0b",
                example: "任何物种都可能拥有闪光形态",
              },
            ].map((item) => (
              <div
                key={item.rarity}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-bold"
                      style={{
                        background: `${item.color}20`,
                        color: item.color,
                      }}
                    >
                      {item.rarity}
                    </span>
                    <span
                      className="text-sm font-mono font-bold"
                      style={{ color: item.color }}
                    >
                      {item.probability}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.desc}
                </p>
                <p className="mt-2 text-xs font-mono text-[var(--text-secondary)]">
                  {item.example}
                </p>
              </div>
            ))}
          </div>

          {/* Replaces CodeBlock #3: Species list with rarity tags */}
          <div className="mt-6">
            <ArchitectureDiagram
              title="18 个物种稀有度分类"
              nodes={[
                { id: "slime", label: "小史莱姆", x: 20, y: 30, color: "var(--text-secondary)" },
                { id: "cat", label: "像素猫", x: 170, y: 30, color: "var(--text-secondary)" },
                { id: "bug", label: "代码虫", x: 320, y: 30, color: "var(--text-secondary)" },
                { id: "fox", label: "水晶狐", x: 470, y: 30, color: "var(--accent-blue)" },
                { id: "dragon", label: "数据龙", x: 20, y: 100, color: "var(--accent-blue)" },
                { id: "rabbit", label: "量子兔", x: 170, y: 100, color: "var(--accent-blue)" },
                { id: "phoenix", label: "虚空凤凰", x: 320, y: 100, color: "var(--accent-purple)" },
                { id: "snake", label: "时间蛇", x: 470, y: 100, color: "var(--accent-purple)" },
                { id: "wolf", label: "混沌狼", x: 20, y: 170, color: "var(--accent-purple)" },
                { id: "whale", label: "宇宙鲸", x: 170, y: 170, color: "var(--accent-yellow, #f59e0b)" },
                { id: "tree", label: "永恒树", x: 320, y: 170, color: "var(--accent-yellow, #f59e0b)" },
                { id: "eagle", label: "星辰鹰", x: 470, y: 170, color: "var(--accent-yellow, #f59e0b)" },
                { id: "more", label: "... 共 18 种", x: 245, y: 240, color: "var(--text-secondary)" },
              ]}
              edges={[
                { from: "slime", to: "more", label: "" },
                { from: "cat", to: "more", label: "" },
                { from: "bug", to: "more", label: "" },
                { from: "fox", to: "more", label: "" },
                { from: "dragon", to: "more", label: "" },
                { from: "rabbit", to: "more", label: "" },
                { from: "phoenix", to: "more", label: "" },
                { from: "snake", to: "more", label: "" },
                { from: "wolf", to: "more", label: "" },
                { from: "whale", to: "more", label: "" },
                { from: "tree", to: "more", label: "" },
                { from: "eagle", to: "more", label: "" },
              ]}
              width={620}
              height={310}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: 五维属性系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="五维属性系统"
            subtitle="过程化生成的伙伴个性"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              每个伙伴拥有{" "}
              <strong className="text-[var(--text-primary)]">5 个过程化生成的属性</strong>
              ，这些属性由同一个 PRNG 序列决定，因此完全确定性且唯一。
              属性值范围从 0 到 100，不仅影响伙伴的灵魂描述，
              还会微妙地影响 ASCII 精灵的表情和动画节奏。
            </p>
          </div>

          {/* Replaces CodeBlock #4: BuddyStats interface and generation */}
          <ArchitectureDiagram
            title="五维属性生成流程"
            nodes={[
              { id: "rng", label: "PRNG 序列", x: 240, y: 20, color: "var(--accent-cyan)" },
              { id: "d", label: "Debugging", x: 20, y: 110, color: "var(--accent-cyan)" },
              { id: "p", label: "Patience", x: 160, y: 110, color: "var(--accent-green, #22c55e)" },
              { id: "c", label: "Chaos", x: 300, y: 110, color: "var(--accent-purple)" },
              { id: "w", label: "Wisdom", x: 440, y: 110, color: "var(--accent-blue)" },
              { id: "s", label: "Snark", x: 580, y: 110, color: "var(--accent-yellow, #f59e0b)" },
              { id: "range", label: "rng() × 100 → [0, 100)", x: 240, y: 200, color: "var(--text-secondary)" },
            ]}
            edges={[
              { from: "rng", to: "d", label: "rng()" },
              { from: "rng", to: "p", label: "rng()" },
              { from: "rng", to: "c", label: "rng()" },
              { from: "rng", to: "w", label: "rng()" },
              { from: "rng", to: "s", label: "rng()" },
              { from: "d", to: "range", label: "" },
              { from: "p", to: "range", label: "" },
              { from: "c", to: "range", label: "" },
              { from: "w", to: "range", label: "" },
              { from: "s", to: "range", label: "" },
            ]}
            width={740}
            height={270}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                icon: "🐛",
                name: "DEBUGGING",
                label: "调试能力",
                desc: "伙伴的调试直觉。高数值意味着它能快速定位代码中的问题，是 Bug 猎手的最佳搭档。",
                color: "var(--accent-cyan)",
              },
              {
                icon: "🧘",
                name: "PATIENCE",
                label: "耐心程度",
                desc: "伙伴的耐心阈值。高耐心的伙伴在长编译过程中保持冷静，低耐心的伙伴会表现得焦躁不安。",
                color: "var(--accent-green, #22c55e)",
              },
              {
                icon: "💥",
                name: "CHAOS",
                label: "混乱指数",
                desc: "伙伴的混沌程度。高混乱值的伙伴不可预测，可能产生意想不到的创意建议或古怪行为。",
                color: "var(--accent-purple)",
              },
              {
                icon: "📚",
                name: "WISDOM",
                label: "智慧值",
                desc: "伙伴的知识深度。高智慧的伙伴理解复杂的架构模式和设计哲学，是资深开发者的精神伙伴。",
                color: "var(--accent-blue)",
              },
              {
                icon: "😏",
                name: "SNARK",
                label: "毒舌程度",
                desc: "伙伴的讽刺天赋。高毒舌值的伙伴会在你写出 bug 时毫不留情地吐槽，但说的都是实话。",
                color: "var(--accent-yellow, #f59e0b)",
              },
            ].map((stat) => (
              <div
                key={stat.name}
                className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div
                  className="text-xs font-mono font-bold mb-1"
                  style={{ color: stat.color }}
                >
                  {stat.name}
                </div>
                <div className="text-sm font-semibold text-[var(--text-primary)] mb-2">
                  {stat.label}
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Replaces CodeBlock #5: Personality trait mapping */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="属性值 → 性格特征映射"
              nodes={[
                { id: "debug", label: "Debugging > 80", x: 20, y: 20, color: "var(--accent-cyan)" },
                { id: "patLow", label: "Patience < 20", x: 240, y: 20, color: "var(--accent-green, #22c55e)" },
                { id: "chaos", label: "Chaos > 70", x: 460, y: 20, color: "var(--accent-purple)" },
                { id: "wisdom", label: "Wisdom > 90", x: 20, y: 110, color: "var(--accent-blue)" },
                { id: "snark", label: "Snark > 80", x: 240, y: 110, color: "var(--accent-yellow, #f59e0b)" },
                { id: "t1", label: "Bug 预判达人", x: 80, y: 200, color: "var(--accent-cyan)" },
                { id: "t2", label: "对无限循环绝望", x: 320, y: 200, color: "var(--accent-green, #22c55e)" },
                { id: "t3", label: "建议 Brainfuck 重写", x: 520, y: 200, color: "var(--accent-purple)" },
                { id: "t4", label: "读懂你自己不懂的代码", x: 80, y: 280, color: "var(--accent-blue)" },
                { id: "t5", label: "对 console.log 叹气", x: 320, y: 280, color: "var(--accent-yellow, #f59e0b)" },
              ]}
              edges={[
                { from: "debug", to: "t1", label: "触发" },
                { from: "patLow", to: "t2", label: "触发" },
                { from: "chaos", to: "t3", label: "触发" },
                { from: "wisdom", to: "t4", label: "触发" },
                { from: "snark", to: "t5", label: "触发" },
              ]}
              width={680}
              height={340}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 5: ASCII Art 精灵系统 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="ASCII Art 精灵系统"
            subtitle="终端中的像素艺术与灵魂描述"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              每个伙伴都有独特的{" "}
              <strong className="text-[var(--text-primary)]">ASCII art 外观</strong>
              ，这些精灵由预定义的字符画帧组成，在终端中以动画形式展示。
              动画帧通过时间间隔切换，让伙伴看起来栩栩如生。
              更独特的是，Claude 会根据伙伴的物种、稀有度和五维属性，
              生成一段专属的{" "}
              <strong className="text-[var(--text-primary)]">灵魂描述</strong>
              ，赋予每个伙伴独特的性格和故事。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ASCII Art 示例 */}
            <div className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                小史莱姆 (Common) - 帧 1
              </div>
              <pre className="font-mono text-sm leading-tight text-[var(--accent-cyan)] whitespace-pre overflow-x-auto">
{`   ╭─────────╮
   │  ^   ^  │
   │    o    │
   │  \\___/  │
   ╰──┬───┬──╯
      │   │
   ╭──┴───┴──╮
   │ ~jiggle~ │
   ╰─────────╯`}
              </pre>
            </div>

            <div className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                小史莱姆 (Common) - 帧 2
              </div>
              <pre className="font-mono text-sm leading-tight text-[var(--accent-cyan)] whitespace-pre overflow-x-auto">
{`   ╭─────────╮
   │  -   -  │
   │    O    │
   │  /---\\  │
   ╰──┬───┬──╯
      │   │
   ╭──┴───┴──╮
   │ ~wobble~ │
   ╰─────────╯`}
              </pre>
            </div>
          </div>

          {/* Replaces CodeBlock #6: Sprite animation definition */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="精灵动画系统"
              nodes={[
                { id: "species", label: "物种 ID", x: 240, y: 20, color: "var(--accent-purple)" },
                { id: "sprite", label: "SpriteAnimation", x: 240, y: 100, color: "var(--accent-blue)" },
                { id: "f1", label: "帧 1: 开心 (^ ^)", x: 40, y: 190, color: "var(--accent-cyan)" },
                { id: "f2", label: "帧 2: 惊讶 (- O)", x: 240, y: 190, color: "var(--accent-cyan)" },
                { id: "f3", label: "帧 3: 困惑 (> <)", x: 440, y: 190, color: "var(--accent-cyan)" },
                { id: "timer", label: "2000ms 循环切换", x: 240, y: 280, color: "var(--accent-yellow, #f59e0b)" },
              ]}
              edges={[
                { from: "species", to: "sprite", label: "查找精灵表" },
                { from: "sprite", to: "f1", label: "frames[0]" },
                { from: "sprite", to: "f2", label: "frames[1]" },
                { from: "sprite", to: "f3", label: "frames[2]" },
                { from: "f1", to: "timer", label: "" },
                { from: "f2", to: "timer", label: "" },
                { from: "f3", to: "timer", label: "" },
                { from: "timer", to: "f1", label: "循环" },
              ]}
              width={600}
              height={340}
            />
          </div>

          {/* Replaces CodeFlow #2: 灵魂描述生成流程 */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="灵魂描述生成流程"
              nodes={[
                { id: "data", label: "伙伴数据打包", x: 240, y: 20, color: "var(--accent-blue)" },
                { id: "spec", label: "物种 + 稀有度", x: 40, y: 100, color: "var(--accent-purple)" },
                { id: "stat", label: "五维属性值", x: 240, y: 100, color: "var(--accent-blue)" },
                { id: "shiny", label: "闪光状态", x: 440, y: 100, color: "var(--accent-yellow, #f59e0b)" },
                { id: "prompt", label: "自然语言提示词", x: 240, y: 190, color: "var(--accent-cyan)" },
                { id: "claude", label: "Claude 生成", x: 240, y: 270, color: "var(--accent-purple)" },
                { id: "soul", label: "灵魂描述输出", x: 240, y: 350, color: "var(--accent-cyan)" },
              ]}
              edges={[
                { from: "data", to: "spec", label: "" },
                { from: "data", to: "stat", label: "" },
                { from: "data", to: "shiny", label: "" },
                { from: "spec", to: "prompt", label: "格式化" },
                { from: "stat", to: "prompt", label: "填入属性" },
                { from: "shiny", to: "prompt", label: "附加信息" },
                { from: "prompt", to: "claude", label: "API 调用" },
                { from: "claude", to: "soul", label: "一段话" },
              ]}
              width={600}
              height={420}
            />
          </div>
        </section>
      </ScrollReveal>

      {/* Section 6: 设计哲学 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle
            title="设计哲学"
            subtitle="为什么在一个 CLI 工具里放 Tamagotchi？"
          />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              在一个严肃的命令行工具中加入电子宠物系统，乍看之下似乎不合常理。
              但这个设计体现了 Claude Code 团队对开发者体验的深层思考——
              工具不仅是生产力的延伸，也可以是情感的寄托。
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "情感连接",
                desc: "增加趣味性与归属感",
                detail:
                  "开发者每天在终端中度过大量时间。一个独特的伙伴精灵能为这段时光增添温暖和趣味，让工具从冷冰冰的命令行变成有个性的工作伙伴。每个用户的伙伴都是独一无二的，这种独特性增强了用户与工具之间的情感纽带。",
                color: "var(--accent-cyan)",
                icon: "🥺",
              },
              {
                title: "公平保证",
                desc: "确定性算法确保公正",
                detail:
                  "传统的随机抽卡系统依赖服务器端状态，容易引发公平性质疑。Buddy 系统使用确定性 PRNG，每个用户的伙伴完全由其 ID 决定——不需要服务器存储，不存在重复抽取，也不可能出现暗箱操作。代码就是公平的保证。",
                color: "var(--accent-purple)",
                icon: "⚖️",
              },
              {
                title: "能力展示",
                desc: "AI 技术的创意窗口",
                detail:
                  "Buddy 系统是一个精心设计的技术展示窗口。它展示了确定性计算、过程化生成和 AI 意图理解的融合——从 PRNG 算法到属性生成，再到 Claude 自身生成的灵魂描述。每一层都体现了 Claude Code 的工程能力和创意思维。",
                color: "var(--accent-blue)",
                icon: "🚀",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]"
              >
                <div className="text-2xl mb-3">{item.icon}</div>
                <h5
                  className="text-lg font-semibold mb-1"
                  style={{ color: item.color }}
                >
                  {item.title}
                </h5>
                <p className="text-sm font-mono mb-3 text-[var(--text-secondary)]">
                  {item.desc}
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>

          {/* Replaces CodeBlock #7: Complete buddy generation flow */}
          <div className="mt-8">
            <ArchitectureDiagram
              title="Buddy 完整生成流程"
              nodes={[
                { id: "userId", label: "userId", x: 300, y: 20, color: "var(--text-secondary)" },
                { id: "seed", label: "hashCode → seed", x: 120, y: 90, color: "var(--accent-cyan)" },
                { id: "rng", label: "Mulberry32 RNG", x: 380, y: 90, color: "var(--accent-cyan)" },
                { id: "species", label: "物种选择", x: 20, y: 170, color: "var(--accent-purple)" },
                { id: "rarity", label: "稀有度判定", x: 160, y: 170, color: "var(--accent-yellow, #f59e0b)" },
                { id: "shiny", label: "闪光判定", x: 300, y: 170, color: "var(--accent-yellow, #f59e0b)" },
                { id: "stats", label: "五维属性", x: 440, y: 170, color: "var(--accent-blue)" },
                { id: "sprite", label: "ASCII 精灵", x: 120, y: 250, color: "var(--accent-purple)" },
                { id: "soul", label: "灵魂描述 (AI)", x: 380, y: 250, color: "var(--accent-cyan)" },
                { id: "buddy", label: "Buddy 对象", x: 250, y: 330, color: "var(--accent-purple)" },
              ]}
              edges={[
                { from: "userId", to: "seed", label: "哈希" },
                { from: "seed", to: "rng", label: "初始化" },
                { from: "rng", to: "species", label: "rng()" },
                { from: "rng", to: "rarity", label: "rng()" },
                { from: "rng", to: "shiny", label: "< 0.01" },
                { from: "rng", to: "stats", label: "5× rng()" },
                { from: "species", to: "sprite", label: "查表" },
                { from: "shiny", to: "sprite", label: "着色" },
                { from: "stats", to: "soul", label: "Claude" },
                { from: "sprite", to: "buddy", label: "" },
                { from: "soul", to: "buddy", label: "" },
                { from: "rarity", to: "buddy", label: "" },
              ]}
              width={600}
              height={400}
            />
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
