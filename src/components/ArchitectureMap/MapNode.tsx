"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { type MapNodeData, categoryColors } from "./data";

interface MapNodeProps {
  node: MapNodeData;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  delay?: number;
}

export function MapNode({ node, isHovered, onHover, delay = 0 }: MapNodeProps) {
  const router = useRouter();
  const colors = categoryColors[node.category];
  const w = node.width;
  const h = node.height;
  const rx = 14;

  const gradientId = `node-grad-${node.id}`;
  const shadowId = `node-shadow-${node.id}`;
  const glowId = `node-glow-${node.id}`;

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      style={{
        cursor: "pointer",
        transformOrigin: `${node.x}px ${node.y}px`,
      }}
      onPointerEnter={() => onHover(node.id)}
      onPointerLeave={() => onHover(null)}
      onClick={() => router.push(node.href)}
    >
      <defs>
        {/* Node fill gradient */}
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={colors.light} stopOpacity={0.95} />
          <stop offset="100%" stopColor={colors.dark} stopOpacity={0.95} />
        </linearGradient>

        {/* Drop shadow filter */}
        <filter
          id={shadowId}
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
        >
          <feDropShadow
            dx="0"
            dy="2"
            stdDeviation="4"
            floodColor={colors.base}
            floodOpacity={0.3}
          />
        </filter>

        {/* Glow filter for pulse */}
        <filter
          id={glowId}
          x="-40%"
          y="-40%"
          width="180%"
          height="180%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" />
        </filter>
      </defs>

      {/* Pulsing glow behind the node */}
      <motion.rect
        x={node.x - w / 2 - 6}
        y={node.y - h / 2 - 6}
        width={w + 12}
        height={h + 12}
        rx={rx + 2}
        fill={colors.base}
        filter={`url(#${glowId})`}
        animate={{
          opacity: isHovered ? [0.35, 0.5, 0.35] : [0.12, 0.28, 0.12],
        }}
        transition={{
          duration: isHovered ? 1.5 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        }}
      />

      {/* Main node body */}
      <motion.rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        rx={rx}
        fill={`url(#${gradientId})`}
        filter={`url(#${shadowId})`}
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          transformOrigin: `${node.x}px ${node.y}px`,
        }}
      />

      {/* Inner highlight (top edge light reflection) */}
      <motion.rect
        x={node.x - w / 2 + 2}
        y={node.y - h / 2 + 2}
        width={w - 4}
        height={h / 2 - 2}
        rx={rx - 2}
        fill="white"
        opacity={0.1}
        style={{
          transformOrigin: `${node.x}px ${node.y}px`,
        }}
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      />

      {/* Border ring */}
      <motion.rect
        x={node.x - w / 2}
        y={node.y - h / 2}
        width={w}
        height={h}
        rx={rx}
        fill="none"
        stroke="white"
        strokeWidth={1}
        opacity={isHovered ? 0.4 : 0.15}
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          transformOrigin: `${node.x}px ${node.y}px`,
        }}
      />

      {/* Icon */}
      <motion.text
        x={node.x - w / 2 + 20}
        y={node.y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={18}
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          transformOrigin: `${node.x}px ${node.y}px`,
        }}
      >
        {node.icon}
      </motion.text>

      {/* Label */}
      <motion.text
        x={node.x + 10}
        y={node.y + 1}
        textAnchor="middle"
        dominantBaseline="central"
        fill="white"
        fontSize={13}
        fontWeight={600}
        fontFamily="var(--font-inter), system-ui, sans-serif"
        letterSpacing="0.01em"
        animate={{
          scale: isHovered ? 1.08 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        style={{
          transformOrigin: `${node.x}px ${node.y}px`,
        }}
      >
        {node.label}
      </motion.text>
    </motion.g>
  );
}
