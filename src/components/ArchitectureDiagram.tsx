"use client";

import { motion } from "framer-motion";

interface ArchNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color?: string;
}

interface ArchEdge {
  from: string;
  to: string;
  label?: string;
}

interface ArchitectureDiagramProps {
  nodes: ArchNode[];
  edges: ArchEdge[];
  width?: number;
  height?: number;
  title?: string;
}

const NODE_W = 140;
const NODE_H = 44;
const DEFAULT_COLOR = "var(--accent-purple)";

export function ArchitectureDiagram({
  nodes,
  edges,
  width = 800,
  height = 400,
  title,
}: ArchitectureDiagramProps) {
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="my-8 rounded-xl border border-[var(--card-border)] overflow-hidden bg-[var(--card-bg)]">
      {/* Optional title */}
      {title && (
        <div className="px-4 py-3 border-b border-[var(--card-border)]">
          <h4 className="text-sm font-semibold text-[var(--text-primary)]">
            {title}
          </h4>
        </div>
      )}

      {/* SVG diagram */}
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        style={{ minHeight: 200 }}
      >
        <defs>
          {/* Arrow marker */}
          <marker
            id="arch-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent-cyan)" />
          </marker>

          {/* Glow filter for nodes */}
          <filter id="node-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background subtle grid */}
        <pattern
          id="arch-grid"
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="10" cy="10" r="0.5" fill="currentColor" opacity={0.06} />
        </pattern>
        <rect width={width} height={height} fill="var(--card-bg)" />
        <rect width={width} height={height} fill="url(#arch-grid)" />

        {/* Edges */}
        {edges.map((edge, i) => {
          const fromNode = nodeMap.get(edge.from);
          const toNode = nodeMap.get(edge.to);
          if (!fromNode || !toNode) return null;

          const x1 = fromNode.x + NODE_W / 2;
          const y1 = fromNode.y + NODE_H / 2;
          const x2 = toNode.x + NODE_W / 2;
          const y2 = toNode.y + NODE_H / 2;

          const midX = (x1 + x2) / 2;
          const midY = (y1 + y2) / 2;

          // Shorten line so it doesn't overlap node rectangles
          const dx = x2 - x1;
          const dy = y2 - y1;
          const len = Math.sqrt(dx * dx + dy * dy) || 1;
          const offsetStart = NODE_W / 2 / len;
          const offsetEnd = (NODE_W / 2 + 8) / len;

          const sx = x1 + dx * offsetStart;
          const sy = y1 + dy * offsetStart;
          const ex = x2 - dx * offsetEnd;
          const ey = y2 - dy * offsetEnd;

          return (
            <g key={`edge-${edge.from}-${edge.to}`}>
              {/* Edge line with draw animation */}
              <motion.line
                x1={sx}
                y1={sy}
                x2={ex}
                y2={ey}
                stroke="var(--accent-cyan)"
                strokeWidth={1.5}
                strokeOpacity={0.5}
                markerEnd="url(#arch-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              />

              {/* Edge label */}
              {edge.label && (
                <motion.text
                  x={(sx + ex) / 2}
                  y={(sy + ey) / 2 - 6}
                  textAnchor="middle"
                  className="text-[10px] fill-[var(--text-secondary)] font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                >
                  {edge.label}
                </motion.text>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((node, i) => {
          const color = node.color || DEFAULT_COLOR;
          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              {/* Node shadow/glow */}
              <rect
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={NODE_H}
                rx={8}
                ry={8}
                fill="transparent"
                stroke={color}
                strokeWidth={1}
                strokeOpacity={0.3}
                filter="url(#node-glow)"
              />

              {/* Node body */}
              <rect
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={NODE_H}
                rx={8}
                ry={8}
                fill="var(--card-bg)"
                stroke={color}
                strokeWidth={1.5}
                strokeOpacity={0.6}
              />

              {/* Top accent bar */}
              <rect
                x={node.x}
                y={node.y}
                width={NODE_W}
                height={3}
                rx={8}
                ry={8}
                fill={color}
                opacity={0.8}
              />

              {/* Label */}
              <text
                x={node.x + NODE_W / 2}
                y={node.y + NODE_H / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-[var(--text-primary)] font-medium"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
