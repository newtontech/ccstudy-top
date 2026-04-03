"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { nodes, edges, categoryColors, categoryLabels, type MapNodeData } from "./data";
import { MapNode } from "./MapNode";
import { MapEdge } from "./MapEdge";
import { MapTooltip } from "./MapTooltip";

const allCategories = Object.keys(categoryColors) as Array<
  keyof typeof categoryColors
>;

export function ArchitectureMap() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [svgRect, setSvgRect] = useState<DOMRect | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // Track the SVG bounding rect for tooltip positioning
  const updateRect = useCallback(() => {
    if (svgRef.current) {
      setSvgRect(svgRef.current.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    updateRect();
    window.addEventListener("resize", updateRect);
    return () => window.removeEventListener("resize", updateRect);
  }, [updateRect]);

  // Find hovered node data for tooltip
  const hoveredNodeData: MapNodeData | undefined = hoveredNode
    ? nodes.find((n) => n.id === hoveredNode)
    : undefined;

  // Build a set of edge IDs connected to the hovered node for highlighting
  const connectedEdges = new Set<string>();
  if (hoveredNode) {
    for (const edge of edges) {
      if (edge.source === hoveredNode || edge.target === hoveredNode) {
        connectedEdges.add(`${edge.source}-${edge.target}`);
      }
    }
  }

  // Build a set of node IDs connected to the hovered node
  const connectedNodes = new Set<string>();
  if (hoveredNode) {
    connectedNodes.add(hoveredNode);
    for (const edge of edges) {
      if (edge.source === hoveredNode) connectedNodes.add(edge.target);
      if (edge.target === hoveredNode) connectedNodes.add(edge.source);
    }
  }

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)]">
      {/* Title area */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 pt-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] tracking-wide">
            Architecture Map
          </h3>
          <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">
            Click any module to explore its source code
          </p>
        </div>
      </div>

      {/* SVG container */}
      <svg
        ref={svgRef}
        viewBox="0 0 1400 750"
        className="w-full h-auto"
        style={{ minHeight: 300 }}
      >
        <defs>
          {/* Background dot grid pattern */}
          <pattern
            id="dot-grid"
            x="0"
            y="0"
            width="30"
            height="30"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="15" cy="15" r="0.8" fill="currentColor" opacity={0.08} />
          </pattern>

          {/* Subtle radial gradient for background atmosphere */}
          <radialGradient id="bg-atmosphere" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity={0.04} />
            <stop offset="50%" stopColor="var(--accent-blue)" stopOpacity={0.02} />
            <stop offset="100%" stopColor="transparent" stopOpacity={0} />
          </radialGradient>
        </defs>

        {/* Background */}
        <rect width="1400" height="750" fill="var(--card-bg)" />
        <rect width="1400" height="750" fill="url(#bg-atmosphere)" />
        <rect width="1400" height="750" fill="url(#dot-grid)" />

        {/* Render edges (behind nodes) */}
        {edges.map((edge, i) => {
          const source = nodes.find((n) => n.id === edge.source);
          const target = nodes.find((n) => n.id === edge.target);
          if (!source || !target) return null;

          const edgeKey = `${edge.source}-${edge.target}`;
          const isHighlighted = connectedEdges.has(edgeKey);

          return (
            <MapEdge
              key={edgeKey}
              edge={edge}
              source={source}
              target={target}
              isHighlighted={isHighlighted}
              delay={i * 0.05}
            />
          );
        })}

        {/* Render nodes (on top) */}
        {nodes.map((node, i) => (
          <MapNode
            key={node.id}
            node={node}
            isHovered={hoveredNode === node.id}
            onHover={setHoveredNode}
            delay={i * 0.06}
          />
        ))}
      </svg>

      {/* Tooltip overlay */}
      {hoveredNodeData && svgRect && (
        <MapTooltip node={hoveredNodeData} svgRect={svgRect} />
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-5 flex flex-wrap gap-x-4 gap-y-1.5">
        {allCategories.map((cat) => (
          <div key={cat} className="flex items-center gap-1.5">
            <div
              className="h-2.5 w-2.5 rounded-full"
              style={{ background: categoryColors[cat].base }}
            />
            <span className="text-[10px] font-medium text-[var(--text-secondary)] tracking-wide uppercase">
              {categoryLabels[cat]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
