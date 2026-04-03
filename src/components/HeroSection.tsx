"use client";

import { motion } from "framer-motion";
import { TypewriterText } from "./animations/TypewriterText";

const stats = [
  { label: "工具", value: "40+" },
  { label: "命令", value: "40+" },
  { label: "核心模块", value: "15+" },
];

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        {/* Purple circle - top left */}
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40 dark:opacity-50 animate-[drift1_20s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-purple) 0%, transparent 70%)",
          }}
        />
        {/* Blue circle - bottom right */}
        <div
          className="absolute -bottom-48 -right-48 w-[500px] h-[500px] rounded-full opacity-30 dark:opacity-40 animate-[drift2_25s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-blue) 0%, transparent 70%)",
          }}
        />
        {/* Cyan circle - center */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 dark:opacity-30 animate-[drift3_22s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Title */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Claude Code 源码解读
        </motion.h1>

        {/* Subtitle with typewriter */}
        <motion.div
          className="text-xl text-[var(--text-secondary)] mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <TypewriterText
            text="深入探索 Anthropic 最强 AI 编程助手的源代码架构"
            speed={60}
            delay={800}
            className="text-xl text-[var(--text-secondary)]"
          />
        </motion.div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex items-center gap-2 px-5 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)]/80 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + i * 0.15, duration: 0.5 }}
            >
              <span className="text-2xl font-bold gradient-text">
                {stat.value}
              </span>
              <span className="text-sm text-[var(--text-secondary)]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--text-secondary)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-2xl"
        >
          ↓
        </motion.div>
      </motion.div>

      {/* Keyframe styles for background animation */}
      <style jsx>{`
        @keyframes drift1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(60px, 40px) scale(1.05);
          }
          50% {
            transform: translate(30px, 80px) scale(0.95);
          }
          75% {
            transform: translate(-20px, 30px) scale(1.02);
          }
        }
        @keyframes drift2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(-50px, -30px) scale(1.08);
          }
          50% {
            transform: translate(-80px, -60px) scale(0.96);
          }
          75% {
            transform: translate(-30px, -20px) scale(1.03);
          }
        }
        @keyframes drift3 {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          33% {
            transform: translate(-45%, -55%) scale(1.1);
          }
          66% {
            transform: translate(-55%, -45%) scale(0.9);
          }
        }
      `}</style>
    </section>
  );
}
