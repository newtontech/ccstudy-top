"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "./SectionTitle";
import { useLanguage } from "@/i18n/LanguageContext";
import Link from "next/link";

const paths = [
  {
    id: "quick-start",
    icon: "⚡",
    steps: [
      { label: "Architecture Overview", href: "/architecture" },
      { label: "Entry & Bootstrap", href: "/entry" },
      { label: "Tool System Basics", href: "/tools" },
      { label: "Command Reference", href: "/commands" },
    ],
  },
  {
    id: "deep-source",
    icon: "🔬",
    steps: [
      { label: "Ink UI Framework", href: "/ink" },
      { label: "Hooks Deep Dive", href: "/hooks" },
      { label: "Plugin System", href: "/plugins" },
      { label: "KAIROS Assistant", href: "/assistant" },
    ],
  },
  {
    id: "architecture",
    icon: "🏗️",
    steps: [
      { label: "Multi-Agent Coordination", href: "/coordinator" },
      { label: "Buddy Companion", href: "/buddy" },
      { label: "About & Resources", href: "/about" },
    ],
  },
];

const pathColors = ["#f59e0b", "#7c3aed", "#06b6d4"];

export function LearningPath() {
  const { t } = useLanguage();
  const { learningPath } = t.home;

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <SectionTitle
        title={learningPath.title}
        subtitle={learningPath.subtitle}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {paths.map((path, pi) => (
          <motion.div
            key={path.id}
            className="relative rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6 hover:border-opacity-60 transition-all"
            style={{
              borderColor: `${pathColors[pi]}40`,
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: pi * 0.15, duration: 0.5 }}
            whileHover={{ y: -4, borderColor: `${pathColors[pi]}80` }}
          >
            {/* Path header */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{path.icon}</span>
              <h3 className="text-xl font-bold">{learningPath.paths[path.id as keyof typeof learningPath.paths].title}</h3>
            </div>

            {/* Steps as SVG node graph */}
            <div className="relative">
              <svg
                className="w-full"
                viewBox="0 0 300 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Connection lines */}
                {path.steps.slice(1).map((_, i) => (
                  <motion.line
                    key={`line-${i}`}
                    x1={20}
                    y1={i * 26 + 14}
                    x2={20}
                    y2={(i + 1) * 26 + 6}
                    stroke={pathColors[pi]}
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: pi * 0.15 + i * 0.1, duration: 0.4 }}
                  />
                ))}

                {/* Nodes */}
                {path.steps.map((step, i) => (
                  <motion.g
                    key={step.href}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: pi * 0.15 + i * 0.08 }}
                  >
                    <Link href={step.href}>
                      <circle cx={20} cy={i * 26 + 10} r={8} fill={pathColors[pi]} fillOpacity={0.15} stroke={pathColors[pi]} strokeWidth={1.5} />
                      <circle cx={20} cy={i * 26 + 10} r={3} fill={pathColors[pi]} />
                      <text x={36} y={i * 26 + 14} fill="var(--text-primary)" fontSize={12} fontWeight={500}>
                        {step.label}
                      </text>
                    </Link>
                  </motion.g>
                ))}
              </svg>
            </div>

            {/* Description */}
            <p className="mt-4 text-sm text-[var(--text-secondary)]">
              {learningPath.paths[path.id as keyof typeof learningPath.paths].description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
