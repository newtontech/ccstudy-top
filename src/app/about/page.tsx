import { ModuleLayout } from "@/components/ModuleLayout";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";

export default function AboutPage() {
  const relatedModules = [
    {
      title: "首页",
      href: "/",
      description: "返回首页",
      icon: "\uD83C\uDFE0",
    },
    {
      title: "系统架构",
      href: "/architecture",
      description: "整体架构概览",
      icon: "\uD83C\uDFD7\uFE0F",
    },
    {
      title: "工具系统",
      href: "/tools",
      description: "内置工具详解",
      icon: "\uD83D\uDD27",
    },
  ];

  const techStack = [
    { name: "Next.js 14", desc: "App Router, SSG" },
    { name: "TypeScript", desc: "类型安全" },
    { name: "Tailwind CSS", desc: "样式系统" },
    { name: "Framer Motion", desc: "动画" },
    { name: "Shiki", desc: "代码高亮" },
    { name: "next-themes", desc: "主题切换" },
    { name: "自定义 SVG 组件", desc: "架构图" },
    { name: "GitHub Pages", desc: "部署" },
  ];

  return (
    <ModuleLayout
      title="关于本站"
      subtitle="CCStudy.top —— 一个非官方的 Claude Code 源码解读项目"
      icon="ℹ️"
      category="关于"
      relatedModules={relatedModules}
    >
      {/* Section 1: 关于本站 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="关于本站" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <strong className="text-[var(--text-primary)]">CCStudy.top</strong>{" "}
              是一个非官方的 Claude Code 源码解读项目，旨在帮助开发者和科技爱好者深入理解
              Claude Code 的架构设计与实现细节。
            </p>
            <p>
              本站内容基于对 Claude Code 源代码的深入分析，涵盖了核心架构、工具系统、
              命令解析、插件扩展等关键模块。我们希望通过结构化的解读和可视化的架构图，
              让更多人能够理解这一优秀工程的设计思路。
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2: 技术栈 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="技术栈" subtitle="本站使用的核心技术" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="p-4 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-center"
              >
                <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {tech.name}
                </div>
                <div className="text-xs text-[var(--text-secondary)]">
                  {tech.desc}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Section 3: 贡献 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="贡献" subtitle="开源项目，欢迎参与" />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              这是一个开源项目，我们欢迎各种形式的贡献，包括但不限于内容完善、
              错误修正、建议反馈和新功能提案。
            </p>
            <div className="p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
              <div className="flex items-center gap-3 mb-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="text-[var(--text-primary)]"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span className="text-lg font-semibold text-[var(--text-primary)]">
                  GitHub 仓库
                </span>
              </div>
              <a
                href="https://github.com/newtontech/ccstudy-top"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-cyan)] hover:underline font-mono text-sm break-all"
              >
                https://github.com/newtontech/ccstudy-top
              </a>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 4: 声明 */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title="声明" />

          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
            <p>
              本站与{" "}
              <strong className="text-[var(--text-primary)]">Anthropic</strong>{" "}
              官方无关，是一个完全独立的项目。
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">Claude Code</strong>{" "}
              是 Anthropic 的产品，相关商标和知识产权归 Anthropic 所有。
            </p>
            <p>
              本站的源码分析基于公开可用信息，仅供参考和学习目的。
            </p>
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
