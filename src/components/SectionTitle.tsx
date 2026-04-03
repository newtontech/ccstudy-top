"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "./animations/ScrollReveal";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionTitle({
  title,
  subtitle,
  className,
}: SectionTitleProps) {
  return (
    <ScrollReveal className={className}>
      <div className="text-center mb-12">
        {/* Title with gradient */}
        <h2 className="text-3xl md:text-4xl font-bold gradient-text inline-block mb-4">
          {title}
        </h2>

        {/* Animated underline */}
        <motion.div
          className="h-1 w-24 mx-auto rounded-full"
          style={{
            background:
              "linear-gradient(90deg, var(--accent-purple), var(--accent-blue), var(--accent-cyan))",
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-4 text-[var(--text-secondary)] text-lg">
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
