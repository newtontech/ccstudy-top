import { ModuleLayout } from "@/components/ModuleLayout";
import { CodeBlock } from "@/components/CodeBlock";
import { CodeFlow } from "@/components/CodeFlow";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function BuddyPage() {
  const relatedModules = [
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构",
      icon: "\uD83C\uDFD7\uFE0F",
    },
    {
      title: "Hooks系统",
      href: "/hooks",
      description: "React Hooks",
      icon: "\uD83E\uDDE9D",
    },
    {
      title: "UI框架",
      href: "/ink",
      description: "终端 UI 渲染",
      icon: "\uD83C\uDFA8",
    },
  ];

  return (
    <ModuleLayout
      title="Buddy 伴侣系统"
      subtitle="Claude Code 内置的 Tamagotchi 风格伴侣系统 —— 确定性抽卡、ASCII 精灵、五维属性与灵魂描述"
      icon="\uD83E\uDD81"
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

          <CodeBlock
            code={`// Mulberry32 伪随机数生成器
function mulberry32(seed: number) {
  return function() {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

// 从用户 ID 生成种子
const seed = hashCode(userId);
const rng = mulberry32(seed);`}
            language="typescript"
            filename="buddy/prng.ts"
            highlights={[2, 3, 4, 5, 6, 7, 8, 9, 11, 12]}
          />

          <div className="mt-6">
            <CodeFlow
              title="抽卡流程"
              steps={[
                {
                  code: `// Step 1: 将用户 ID 转换为数字种子
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // 转换为 32 位整数
  }
  return hash;
}`,
                  highlight: [2, 3, 4, 5, 6, 7, 8],
                  description:
                    '用户 ID（如 "user_abc123"）通过哈希函数转换为一个 32 位整数种子。相同的 ID 永远产生相同的种子。',
                },
                {
                  code: `// Step 2: 初始化 PRNG 并抽取物种
const seed = hashCode("user_abc123"); // 例如 -1234567890
const rng = mulberry32(seed);

// 从 18 个物种中选择
const speciesIndex = Math.floor(rng() * 18);
const species = SPECIES_LIST[speciesIndex];`,
                  highlight: [2, 3, 5, 6],
                  description:
                    "用种子初始化 Mulberry32 PRNG，然后从 18 个物种中确定性地选择一个。",
                },
                {
                  code: `// Step 3: 判定稀有度与闪光
const rarity = determineRarity(rng);
const isShiny = rng() < 0.01; // 1% 独立闪光几率
const stats = generateStats(rng); // 五维属性`,
                  highlight: [2, 3, 4],
                  description:
                    "继续使用同一个 PRNG 序列判定稀有度、是否闪光、以及五维属性值，确保整个生成过程完全确定性。",
                },
              ]}
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

          <CodeBlock
            code={`function determineRarity(rng: () => number): Rarity {
  const roll = rng();
  if (roll < 0.01) return 'shiny';     // 1% 闪光
  if (roll < 0.05) return 'legendary';  // 4% 传说
  if (roll < 0.15) return 'epic';       // 10% 史诗
  if (roll < 0.35) return 'rare';       // 20% 稀有
  return 'common';                       // 65% 普通
}`}
            language="typescript"
            filename="buddy/rarity.ts"
            highlights={[3, 4, 5, 6, 7]}
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

          <div className="mt-6">
            <CodeBlock
              code={`// 物种列表与稀有度标签
type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'shiny';

interface Species {
  id: string;
  name: string;
  rarity: Rarity;
  asciiFrames: string[];   // 动画帧
  description: string;     // 物种描述
}

const SPECIES_LIST: Species[] = [
  { id: 'slime',    name: '小史莱姆', rarity: 'common', ... },
  { id: 'pixelcat', name: '像素猫',   rarity: 'common', ... },
  { id: 'codebug',  name: '代码虫',   rarity: 'common', ... },
  { id: 'crystalfox', name: '水晶狐', rarity: 'rare', ... },
  { id: 'datadragon', name: '数据龙', rarity: 'rare', ... },
  { id: 'quantumrabbit', name: '量子兔', rarity: 'rare', ... },
  { id: 'voidphoenix', name: '虚空凤凰', rarity: 'epic', ... },
  { id: 'timesnake', name: '时间蛇', rarity: 'epic', ... },
  { id: 'chaoswolf', name: '混沌狼', rarity: 'epic', ... },
  { id: 'cosmoswhale', name: '宇宙鲸', rarity: 'legendary', ... },
  { id: 'eternitytree', name: '永恒树', rarity: 'legendary', ... },
  { id: 'starEagle', name: '星辰鹰', rarity: 'legendary', ... },
  // ... 共 18 个物种
];`}
              language="typescript"
              filename="buddy/species.ts"
              highlights={[1, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
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

          <CodeBlock
            code={`interface BuddyStats {
  debugging: number;  // 0-100
  patience: number;   // 0-100
  chaos: number;      // 0-100
  wisdom: number;     // 0-100
  snark: number;      // 0-100
}

function generateStats(rng: () => number): BuddyStats {
  return {
    debugging: Math.floor(rng() * 100),
    patience: Math.floor(rng() * 100),
    chaos: Math.floor(rng() * 100),
    wisdom: Math.floor(rng() * 100),
    snark: Math.floor(rng() * 100),
  };
}`}
            language="typescript"
            filename="buddy/stats.ts"
            highlights={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
          />

          <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              {
                icon: "\uD83D\uDC1B",
                name: "DEBUGGING",
                label: "调试能力",
                desc: "伙伴的调试直觉。高数值意味着它能快速定位代码中的问题，是 Bug 猎手的最佳搭档。",
                color: "var(--accent-cyan)",
              },
              {
                icon: "\uD83E\uDDD8",
                name: "PATIENCE",
                label: "耐心程度",
                desc: "伙伴的耐心阈值。高耐心的伙伴在长编译过程中保持冷静，低耐心的伙伴会表现得焦躁不安。",
                color: "var(--accent-green, #22c55e)",
              },
              {
                icon: "\uD83D\uDCA5",
                name: "CHAOS",
                label: "混乱指数",
                desc: "伙伴的混沌程度。高混乱值的伙伴不可预测，可能产生意想不到的创意建议或古怪行为。",
                color: "var(--accent-purple)",
              },
              {
                icon: "\uD83D\uDCDA",
                name: "WISDOM",
                label: "智慧值",
                desc: "伙伴的知识深度。高智慧的伙伴理解复杂的架构模式和设计哲学，是资深开发者的精神伙伴。",
                color: "var(--accent-blue)",
              },
              {
                icon: "\uD83D\uDE0F",
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

          <div className="mt-8">
            <CodeBlock
              code={`// 属性对伙伴行为的影响
function getBuddyPersonality(stats: BuddyStats): string {
  const traits: string[] = [];

  if (stats.debugging > 80) {
    traits.push('能在 bug 报告提交前就发现问题');
  }
  if (stats.patience < 20) {
    traits.push('对你的无限循环感到绝望');
  }
  if (stats.chaos > 70) {
    traits.push('建议你用 Brainfuck 重写整个项目');
  }
  if (stats.wisdom > 90) {
    traits.push('理解你代码的意图，即使你自己都不理解');
  }
  if (stats.snark > 80) {
    traits.push('你的 console.log 调试方式让它叹气');
  }

  return traits.join('，') + '。';
}`}
              language="typescript"
              filename="buddy/personality.ts"
              highlights={[4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]}
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

          <div className="mt-8">
            <CodeBlock
              code={`// ASCII 精灵帧定义
interface SpriteAnimation {
  frames: string[];      // 动画帧序列
  frameInterval: number; // 帧切换间隔 (ms)
}

// 小史莱姆的动画定义
const slimeSprite: SpriteAnimation = {
  frames: [
    \`   ╭─────────╮
   │  ^   ^  │
   │    o    │
   │  \\\\___/  │
   ╰──┬───┬──╯\`,      // 帧 1: 开心
    \`   ╭─────────╮
   │  -   -  │
   │    O    │
   │  /---\\\\  │
   ╰──┬───┬──╯\`,      // 帧 2: 惊讶
    \`   ╭─────────╮
   │  >   <  │
   │    ~    │
   │  \\\\___/  │
   ╰──┬───┬──╯\`,      // 帧 3: 困惑
  ],
  frameInterval: 2000,  // 每 2 秒切换
};`}
              language="typescript"
              filename="buddy/sprites.ts"
              highlights={[1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22]}
            />
          </div>

          <div className="mt-8">
            <CodeFlow
              title="灵魂描述生成流程"
              steps={[
                {
                  code: `// Step 1: 收集伙伴数据
const buddyData = {
  species: '小史莱姆',
  rarity: 'common',
  isShiny: false,
  stats: {
    debugging: 42,
    patience: 78,
    chaos: 15,
    wisdom: 55,
    snark: 33,
  },
};`,
                  highlight: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                  description:
                    "将伙伴的所有信息打包：物种、稀有度、闪光状态和五维属性。这些数据构成了灵魂描述的基础素材。",
                },
                {
                  code: `// Step 2: 构建灵魂描述提示词
const soulPrompt = \`为我的伙伴生成一段灵魂描述。
物种: \${buddyData.species}
稀有度: \${buddyData.rarity}
属性: 调试\${buddyData.stats.debugging}/100,
      耐心\${buddyData.stats.patience}/100,
      混乱\${buddyData.stats.chaos}/100,
      智慧\${buddyData.stats.wisdom}/100,
      毒舌\${buddyData.stats.snark}/100
请用一句话描述它的性格特点。\`;`,
                  highlight: [2, 3, 4, 5, 6, 7, 8, 9, 10],
                  description:
                    "将伙伴数据格式化为自然语言提示词，让 Claude 理解这个伙伴的完整画像。",
                },
                {
                  code: `// Step 3: Claude 生成灵魂描述
// Claude 返回示例:
// "这只温和的小史莱姆有着惊人的耐心，
//  它会安静地等待编译完成，然后用那双
//  充满智慧的眼睛注视着你——它早就知道
//  那个分号漏了。"
const soulDescription = await generateSoulDescription(soulPrompt);`,
                  highlight: [2, 3, 4, 5, 6],
                  description:
                    "Claude 根据提示词生成一段独特的灵魂描述。这段描述融合了伙伴的属性特征，赋予它鲜活的个性和故事。每个伙伴的灵魂描述都是独一无二的。",
                },
              ]}
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
                icon: "\uD83E\uDD7A",
              },
              {
                title: "公平保证",
                desc: "确定性算法确保公正",
                detail:
                  "传统的随机抽卡系统依赖服务器端状态，容易引发公平性质疑。Buddy 系统使用确定性 PRNG，每个用户的伙伴完全由其 ID 决定——不需要服务器存储，不存在重复抽取，也不可能出现暗箱操作。代码就是公平的保证。",
                color: "var(--accent-purple)",
                icon: "\u2696\uFE0F",
              },
              {
                title: "能力展示",
                desc: "AI 技术的创意窗口",
                detail:
                  "Buddy 系统是一个精心设计的技术展示窗口。它展示了确定性计算、过程化生成和 AI 意图理解的融合——从 PRNG 算法到属性生成，再到 Claude 自身生成的灵魂描述。每一层都体现了 Claude Code 的工程能力和创意思维。",
                color: "var(--accent-blue)",
                icon: "\uD83D\uDE80",
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

          <div className="mt-8">
            <CodeBlock
              code={`// Buddy 系统的完整生成流程
function generateBuddy(userId: string): Buddy {
  // 1. 确定性种子
  const seed = hashCode(userId);
  const rng = mulberry32(seed);

  // 2. 物种与稀有度
  const species = SPECIES_LIST[Math.floor(rng() * SPECIES_COUNT)];
  const rarity = determineRarity(rng);
  const isShiny = rng() < 0.01;

  // 3. 五维属性
  const stats = generateStats(rng);

  // 4. ASCII 精灵与动画
  const sprite = getSpriteForSpecies(species.id, {
    shiny: isShiny,
    rarity: rarity,
  });

  // 5. Claude 生成灵魂描述
  const soul = await generateSoulDescription({
    species, rarity, isShiny, stats,
  });

  return {
    id: \`buddy_\${userId}\`,
    species,
    rarity,
    isShiny,
    stats,
    sprite,
    soul,
  };
}`}
              language="typescript"
              filename="buddy/generator.ts"
              highlights={[3, 4, 6, 7, 8, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]}
            />
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
