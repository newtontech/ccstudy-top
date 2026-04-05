"use client";

import { ModuleLayout } from "@/components/ModuleLayout";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SectionTitle } from "@/components/SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  const relatedModules = [
    {
      title: t.about.related.home.title,
      href: "/",
      description: t.about.related.home.description,
      icon: "🏠",
    },
    {
      title: t.about.related.architecture.title,
      href: "/architecture",
      description: t.about.related.architecture.description,
      icon: "🏗️",
    },
    {
      title: t.about.related.tools.title,
      href: "/tools",
      description: t.about.related.tools.description,
      icon: "🔧",
    },
  ];

  return (
    <ModuleLayout
      title={t.about.title}
      subtitle={t.about.subtitle}
      icon="ℹ️"
      category={t.about.category}
      relatedModules={relatedModules}
    >
      {/* Section 1: About */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title={t.about.aboutSection.title} />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>
              <strong className="text-[var(--text-primary)]">
                {t.about.aboutSection.p1strong}
              </strong>{" "}
              {t.about.aboutSection.p1}
            </p>
            <p>{t.about.aboutSection.p2}</p>
          </div>
        </section>
      </ScrollReveal>

      {/* Section 2: Tech Stack */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title={t.about.techStack.title} subtitle={t.about.techStack.subtitle} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {t.about.techStack.items.map((tech) => (
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

      {/* Section 3: Contributing */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title={t.about.contribution.title} subtitle={t.about.contribution.subtitle} />

          <div className="space-y-6 text-[var(--text-secondary)] leading-relaxed">
            <p>{t.about.contribution.desc}</p>
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
                  {t.about.contribution.repoTitle}
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

      {/* Section 4: Disclaimer */}
      <ScrollReveal>
        <section className="mb-16">
          <SectionTitle title={t.about.disclaimer.title} />

          <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed p-5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]">
            <p>
              {t.about.disclaimer.p1}{" "}
              <strong className="text-[var(--text-primary)]">
                {t.about.disclaimer.p1strong}
              </strong>{" "}
              {t.about.disclaimer.p1end}
            </p>
            <p>
              <strong className="text-[var(--text-primary)]">
                {t.about.disclaimer.p2strong}
              </strong>{" "}
              {t.about.disclaimer.p2}
            </p>
            <p>{t.about.disclaimer.p3}</p>
          </div>
        </section>
      </ScrollReveal>
    </ModuleLayout>
  );
}
