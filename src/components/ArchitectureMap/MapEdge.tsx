"use client";

import { motion } from "framer-motion";
import { type MapNodeData, type MapEdgeData, categoryColors } from "./data";

interface MapEdgeProps {
  edge: MapEdgeData;
  source: MapNodeData;
  target: MapNodeData;
  isHighlighted: boolean;
  delay?: number;
}

export function MapEdge({
  edge,
  source,
  target,
  isHighlighted,
  delay = 0,
}: MapEdgeProps) {
  const sourceColors = categoryColors[source.category];
  const targetColors = categoryColors[target.category];

  // Calculate connection points: bottom-center of source to top-center of target
  const sx = source.x;
  const sy = source.y + source.height / 2;
  const tx = target.x;
  const ty = target.y - target.height / 2;

  // Bezier control points for a smooth vertical S-curve
  const midY = (sy + ty) / 2;
  const path = `M ${sx} ${sy} C ${sx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`;

  const gradientId = `edge-grad-${edge.source}-${edge.target}`;
  const glowId = `edge-glow-${edge.source}-${edge.target}`;

  return (
    <g>
      <defs>
        {/* Gradient from source color to target color */}
        <linearGradient
          id={gradientId}
          x1={`${sx}`}
          y1={`${sy}`}
          x2={`${tx}`}
          y2={`${ty}`}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={sourceColors.base} />
          <stop offset="100%" stopColor={targetColors.base} />
        </linearGradient>

        {/* Glow filter for the edge */}
        <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
        </filter>
      </defs>

      {/* Subtle glow path behind */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={4}
        filter={`url(#${glowId})`}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHighlighted ? 0.35 : 0.12,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Base path (static) */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: isHighlighted ? 0.6 : 0.3,
        }}
        transition={{
          pathLength: { duration: 1, delay: delay + 0.3, ease: "easeInOut" },
          opacity: { duration: 0.5, delay: delay + 0.3 },
        }}
      />

      {/* Animated flowing dashes */}
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={1.5}
        strokeDasharray="6 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: 1,
          opacity: isHighlighted ? 0.9 : 0.55,
          strokeDashoffset: [0, -24],
        }}
        transition={{
          pathLength: {
            duration: 1,
            delay: delay + 0.5,
            ease: "easeInOut",
          },
          opacity: { duration: 0.5, delay: delay + 0.5 },
          strokeDashoffset: {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: delay + 1,
          },
        }}
      />
    </g>
  );
}
