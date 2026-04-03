"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  href: string;
  color?: string;
}

export function ModuleCard({
  title,
  description,
  icon,
  href,
  color = "var(--accent-purple)",
}: ModuleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Link href={href} className="block">
        <div
          className="group relative rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all duration-300 hover:shadow-lg"
          style={{
            ["--card-accent" as string]: color,
          }}
        >
          {/* Gradient border glow on hover */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: `0 0 20px 2px ${color}33, 0 0 40px 4px ${color}15`,
            }}
          />

          <div className="relative z-10">
            {/* Icon */}
            <div className="text-3xl mb-3">{icon}</div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
