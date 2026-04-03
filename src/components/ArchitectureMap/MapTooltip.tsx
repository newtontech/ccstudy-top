"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  type MapNodeData,
  categoryColors,
  categoryLabels,
} from "./data";

interface MapTooltipProps {
  node: MapNodeData;
  svgRect: DOMRect | null;
}

export function MapTooltip({ node, svgRect }: MapTooltipProps) {
  const colors = categoryColors[node.category];
  const label = categoryLabels[node.category];

  // Convert SVG coordinates to screen coordinates
  // The SVG viewBox is 1400x750, the svg element scales to fit the container
  if (!svgRect) return null;

  const scaleX = svgRect.width / 1400;
  const scaleY = svgRect.height / 750;

  // Position tooltip to the right of the node, or left if too close to right edge
  let screenX = (node.x + node.width / 2 + 16) * scaleX + svgRect.left;
  let screenY = (node.y - 10) * scaleY + svgRect.top;

  // If tooltip would go off-screen right, flip to left
  if (node.x + node.width / 2 + 280 > 1400) {
    screenX = (node.x - node.width / 2 - 16) * scaleX + svgRect.left;
  }

  // Convert to relative position within the parent container
  const relX = screenX - svgRect.left;
  const relY = screenY - svgRect.top;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 4 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
        className="pointer-events-none absolute z-50"
        style={{
          left: `${relX}px`,
          top: `${relY}px`,
          transform:
            node.x + node.width / 2 + 280 > 1400
              ? "translateX(-100%)"
              : "translateX(0)",
        }}
      >
        <div
          className="w-64 rounded-xl border p-4 shadow-2xl"
          style={{
            background: "rgba(15, 15, 40, 0.92)",
            backdropFilter: "blur(16px)",
            borderColor: `${colors.base}44`,
            boxShadow: `0 0 24px 4px ${colors.base}22, 0 8px 32px rgba(0,0,0,0.4)`,
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{node.icon}</span>
            <span className="font-semibold text-white text-sm">
              {node.label}
            </span>
          </div>

          {/* Category badge */}
          <div className="mb-2">
            <span
              className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                background: `${colors.base}30`,
                color: colors.light,
                border: `1px solid ${colors.base}50`,
              }}
            >
              {label}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs leading-relaxed text-gray-300 mb-3">
            {node.description}
          </p>

          {/* Click to explore */}
          <div className="flex items-center gap-1 text-[11px] font-medium" style={{ color: colors.light }}>
            <span>Click to explore</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="ml-0.5"
            >
              <path
                d="M4.5 3L7.5 6L4.5 9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
