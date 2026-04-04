"use client";

import dynamic from "next/dynamic";

// Dynamic imports with ssr: false must be in a Client Component
export const ArchitectureMap = dynamic(
  () => import("./ArchitectureMap").then((m) => m.ArchitectureMap),
  {
    ssr: false,
    loading: () => (
      <div className="h-[600px] flex items-center justify-center text-[var(--text-secondary)]">
        <div className="animate-pulse">Loading architecture diagram...</div>
      </div>
    ),
  }
);

export const FeatureGrid = dynamic(
  () => import("./FeatureGrid").then((m) => m.FeatureGrid),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] flex items-center justify-center text-[var(--text-secondary)]">
        <div className="animate-pulse">Loading features...</div>
      </div>
    ),
  }
);
