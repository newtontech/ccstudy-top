"use client";

import { ModuleCard } from "./ModuleCard";
import { SectionTitle } from "./SectionTitle";
import { ScrollReveal } from "./animations/ScrollReveal";
import { useLanguage } from "@/i18n/LanguageContext";

const moduleKeys = [
  "architecture",
  "entry",
  "tools",
  "commands",
  "ink",
  "plugins",
  "assistant",
  "coordinator",
  "hooks",
  "buddy",
] as const;

const moduleMeta: Record<string, { icon: string; href: string; color: string }> = {
  architecture: { icon: "🏗️", href: "/architecture", color: "#7c3aed" },
  entry: { icon: "🚀", href: "/entry", color: "#f59e0b" },
  tools: { icon: "🔧", href: "/tools", color: "#2563eb" },
  commands: { icon: "⌨️", href: "/commands", color: "#4f46e5" },
  ink: { icon: "🎨", href: "/ink", color: "#06b6d4" },
  plugins: { icon: "🔌", href: "/plugins", color: "#10b981" },
  assistant: { icon: "🤖", href: "/assistant", color: "#8b5cf6" },
  coordinator: { icon: "🕸️", href: "/coordinator", color: "#ec4899" },
  hooks: { icon: "🪝", href: "/hooks", color: "#14b8a6" },
  buddy: { icon: "🐣", href: "/buddy", color: "#f97316" },
};

export function FeatureGrid() {
  const { t } = useLanguage();

  const modules = moduleKeys.map((key) => ({
    title: t.modules[key].title,
    description: t.modules[key].description,
    ...moduleMeta[key],
  }));

  return (
    <div>
      <SectionTitle
        title={t.home.exploreModules.title}
        subtitle={t.home.exploreModules.subtitle}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {modules.map((mod, i) => (
          <ScrollReveal key={mod.href} delay={i * 0.08}>
            <ModuleCard {...mod} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
