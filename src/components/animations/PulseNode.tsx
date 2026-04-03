"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface PulseNodeProps {
  x: number;
  y: number;
  size?: number;
  color1?: string;
  color2?: string;
  label?: string;
  href?: string;
  onClick?: () => void;
  delay?: number;
}

export function PulseNode({
  x,
  y,
  size = 40,
  color1 = "var(--accent-purple)",
  color2 = "var(--accent-cyan)",
  label,
  href,
  onClick,
  delay = 0,
}: PulseNodeProps) {
  const id = `pulse-gradient-${x}-${y}-${label}`;
  const halfSize = size / 2;

  const content = (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{ cursor: href || onClick ? "pointer" : "default" }}
      onClick={onClick}
    >
      {/* Outer glow circle - pulsing */}
      <motion.circle
        cx={x}
        cy={y}
        r={halfSize + 8}
        fill="none"
        stroke={color1}
        strokeWidth={2}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        style={{ originX: `${x}px`, originY: `${y}px` }}
      />

      {/* Inner gradient circle */}
      <motion.circle
        cx={x}
        cy={y}
        r={halfSize}
        fill={`url(#${id})`}
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.2 }}
        style={{ originX: `${x}px`, originY: `${y}px` }}
      />

      {/* Hover glow ring */}
      <motion.circle
        cx={x}
        cy={y}
        r={halfSize + 4}
        fill="none"
        stroke={color2}
        strokeWidth={1.5}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.6 }}
        transition={{ duration: 0.2 }}
        style={{ originX: `${x}px`, originY: `${y}px`, pointerEvents: "none" }}
      />

      {/* Gradient definition */}
      <defs>
        <radialGradient id={id} cx="30%" cy="30%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </radialGradient>
      </defs>

      {/* Label */}
      {label && (
        <text
          x={x}
          y={y + halfSize + 18}
          textAnchor="middle"
          fill="var(--text-primary)"
          fontSize={12}
          fontWeight={500}
        >
          {label}
        </text>
      )}
    </motion.g>
  );

  if (href) {
    return (
      <Link href={href} legacyBehavior passHref>
        <a style={{ textDecoration: "none" }}>{content}</a>
      </Link>
    );
  }

  return content;
}
