"use client";

import { motion } from "framer-motion";

interface FlowingLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  animated?: boolean;
  dashed?: boolean;
}

export function FlowingLine({
  x1,
  y1,
  x2,
  y2,
  color,
  animated = true,
  dashed = false,
}: FlowingLineProps) {
  // Calculate S-curve control points
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx * dx + dy * dy);
  const offset = distance * 0.25;

  // Perpendicular offset for S-curve
  const nx = -dy / distance;
  const ny = dx / distance;

  const cx1 = midX - nx * offset;
  const cy1 = midY - ny * offset;
  const cx2 = midX + nx * offset;
  const cy2 = midY + ny * offset;

  const path = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  const gradientId = `flow-gradient-${x1}-${y1}-${x2}-${y2}`;

  return (
    <g>
      {/* Gradient definition */}
      <defs>
        <linearGradient id={gradientId} x1={`${x1}`} y1={`${y1}`} x2={`${x2}`} y2={`${y2}`} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color || "var(--accent-purple)"} />
          <stop offset="100%" stopColor={color || "var(--accent-cyan)"} />
        </linearGradient>
      </defs>

      {/* Background path (subtle) */}
      <path
        d={path}
        fill="none"
        stroke={color ? color : `url(#${gradientId})`}
        strokeWidth={2}
        opacity={0.3}
        strokeDasharray={dashed ? "6 4" : undefined}
      />

      {/* Animated flowing path */}
      {animated && (
        <motion.path
          d={path}
          fill="none"
          stroke={color ? color : `url(#${gradientId})`}
          strokeWidth={2}
          strokeDasharray="8 12"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: [0, 1],
            opacity: [0, 1],
            strokeDashoffset: [0, -40],
          }}
          transition={{
            pathLength: { duration: 1.5, ease: "easeInOut" },
            opacity: { duration: 0.5 },
            strokeDashoffset: {
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            },
          }}
        />
      )}
    </g>
  );
}
