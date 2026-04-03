# CCStudy.top Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an animated, interactive website at ccstudy.top that vividly explains Claude Code's source code architecture.

**Architecture:** Next.js 14 static site with interactive SVG architecture maps, Framer Motion scroll animations, code highlighting via Shiki, and a white/dark theme toggle. Deployed via GitHub Pages with Alibaba Cloud DNS.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Shiki, next-themes, custom SVG components.

**Reference Codebase:** ~/desktop/code/claude-code-main (read-only reference for source analysis)

---

## Task 1: Initialize Next.js Project + Git + GitHub Repo

**Files:**
- Create: `ccstudy-top/` full Next.js project
- Create: `.github/workflows/deploy.yml`
- Create: `CNAME`

**Step 1: Create Next.js project**

```bash
cd ~/desktop/code/ccstudy-top
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-git
```

Select: Yes to all defaults when prompted.

**Step 2: Install dependencies**

```bash
npm install framer-motion next-themes shiki
```

**Step 3: Create CNAME file**

Create `public/CNAME`:
```
ccstudy.top
```

**Step 4: Configure Next.js for static export**

Modify `next.config.ts`:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "",
};

export default nextConfig;
```

**Step 5: Initialize Git and push to GitHub**

```bash
git init
git add .
git commit -m "feat: initialize Next.js project for ccstudy.top"
gh repo create ccstudy-top --public --source=. --push
```

---

## Task 2: Global Layout + Theme + Fonts

**Files:**
- Modify: `src/app/layout.tsx`
- Create: `src/components/ThemeProvider.tsx`
- Create: `src/components/Navbar.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/globals.css`

**Step 1: Configure fonts in layout.tsx**

Use `next/font/google` for Inter and JetBrains Mono. Set up the HTML with `suppressHydrationWarning` for next-themes.

**Step 2: Create ThemeProvider**

```tsx
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}
```

**Step 3: Create Navbar with theme toggle**

Navbar should include:
- Logo/title: "CCStudy.top" on the left
- Navigation links: Architecture, Tools, Commands, Ink, Plugins, etc.
- Theme toggle button (sun/moon icon) on the right
- Responsive hamburger menu for mobile
- Sticky top, backdrop blur effect

**Step 4: Create Footer**

Simple footer with copyright and links.

**Step 5: Update globals.css**

Add Tailwind directives and custom CSS variables for both themes:
- Light: white bg, dark text, blue/purple accents
- Dark: dark bg (#0a0a1a), light text, gradient purple/blue/cyan accents with glow effects

**Step 6: Wire layout.tsx**

```tsx
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
// fonts setup...

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={inter.variable}>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
```

**Step 7: Verify and commit**

```bash
npm run build
git add -A && git commit -m "feat: global layout, theme system, fonts"
```

---

## Task 3: Reusable Animation + UI Components

**Files:**
- Create: `src/components/animations/ScrollReveal.tsx`
- Create: `src/components/animations/TypewriterText.tsx`
- Create: `src/components/animations/PulseNode.tsx`
- Create: `src/components/animations/FlowingLine.tsx`
- Create: `src/components/CodeBlock.tsx`
- Create: `src/components/ModuleCard.tsx`
- Create: `src/components/SectionTitle.tsx`

**Step 1: Create ScrollReveal component**

Framer Motion wrapper that fades/slides in content when scrolled into view. Props: `direction` (up/down/left/right), `delay`, `duration`.

**Step 2: Create TypewriterText component**

Animated text that types character by character. Use Framer Motion stagger.

**Step 3: Create PulseNode component**

SVG circle/node with:
- Gradient fill (purple → blue → cyan)
- Pulsing glow animation (box-shadow scale)
- Hover: scale up + info tooltip
- Click: navigate to href

**Step 4: Create FlowingLine component**

SVG path with animated dash offset to simulate data flowing between nodes. Use CSS `stroke-dashoffset` animation.

**Step 5: Create CodeBlock component**

Shiki-based server component for syntax highlighting:
- Accepts `code`, `language`, `highlights` (line numbers) props
- Highlighted lines have a subtle background color
- Copy button in top-right corner
- Dark/light theme aware

**Step 6: Create ModuleCard component**

Card for the homepage navigation grid:
- Icon, title, description
- Hover: lift + shadow + gradient border glow
- Click: navigate to module page
- Framer Motion entrance animation

**Step 7: Create SectionTitle component**

Animated section title with underline animation that draws in on scroll.

**Step 8: Verify and commit**

```bash
npm run build
git add -A && git commit -m "feat: reusable animation and UI components"
```

---

## Task 4: Interactive Architecture Map (Core Component)

**Files:**
- Create: `src/components/ArchitectureMap.tsx`
- Create: `src/components/ArchitectureMap/data.ts` (node/edge definitions)
- Create: `src/components/ArchitectureMap/MapNode.tsx`
- Create: `src/components/ArchitectureMap/MapEdge.tsx`
- Create: `src/components/ArchitectureMap/MapTooltip.tsx`

**Step 1: Define architecture data**

In `data.ts`, define ~15 nodes and ~20 edges:

Nodes (with positions in SVG viewBox):
```
Entry Points: main.tsx (top center)
├── bootstrap (below main)
├── cli (below main)
│   ├── tools (center-left)
│   ├── commands (center-right)
│   ├── query (center)
│   └── context (center)
├── ink (bottom-left) - UI
│   ├── components
│   └── hooks
├── plugins (bottom-center)
│   └── skills
├── assistant (bottom-right)
├── coordinator (right)
├── bridge (far right)
├── buddy (far left)
├── memdir (below context)
└── state (below context)
```

Each node has: `id`, `label`, `description`, `href`, `x`, `y`, `icon`, `color`, `size`.

**Step 2: Create MapNode**

SVG group containing:
- Outer glow circle (animated pulse)
- Inner gradient circle
- Icon/emoji in center
- Label text below
- Hover state: scale(1.15) + brighter glow + tooltip

**Step 3: Create MapEdge**

SVG path connecting two nodes:
- Bezier curve path
- Animated dash (data flow effect)
- Gradient stroke matching source/target colors

**Step 4: Create MapTooltip**

Floating tooltip that appears on node hover:
- Shows node description
- Links to detail page
- Animated fade in/out

**Step 5: Compose ArchitectureMap**

```tsx
"use client";
// SVG viewBox: 1200x800
// Render edges first (behind nodes), then nodes on top
// Add zoom/pan controls for mobile
// Framer Motion entrance: nodes stagger in, edges draw in sequence
```

**Step 6: Verify and commit**

```bash
npm run build
git add -A && git commit -m "feat: interactive architecture map component"
```

---

## Task 5: Homepage

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/HeroSection.tsx`
- Create: `src/components/FeatureGrid.tsx`

**Step 1: Create HeroSection**

- Large animated title: "Claude Code 源码解读" with gradient text
- Subtitle with typewriter effect
- Subtle animated background (CSS gradient animation or particles)
- Scroll-down indicator arrow (bouncing)
- Framer Motion entrance: title fades up, subtitle types in

**Step 2: Insert ArchitectureMap**

Full-width section with the interactive map from Task 4. Add a section title "架构全景" above it.

**Step 3: Create FeatureGrid**

Grid of ModuleCards (from Task 3) for each module page:
- 2 columns on mobile, 3-4 on desktop
- Each card: icon + title + short description + link
- Modules: Architecture, Entry, Tools, Commands, Ink, Plugins, Assistant, Coordinator, Hooks, Buddy

**Step 4: Compose page.tsx**

```tsx
<HeroSection />
<section id="architecture-map">
  <SectionTitle title="架构全景" subtitle="点击节点探索各模块" />
  <ArchitectureMap />
</section>
<FeatureGrid />
```

**Step 5: Verify and commit**

```bash
npm run build
git add -A && git commit -m "feat: homepage with hero, architecture map, and feature grid"
```

---

## Task 6: Module Page Template

**Files:**
- Create: `src/components/ModuleLayout.tsx`
- Create: `src/components/CodeFlow.tsx`
- Create: `src/components/RelatedModules.tsx`

**Step 1: Create ModuleLayout**

Reusable layout wrapper for all module pages:
```tsx
interface ModuleLayoutProps {
  title: string;
  subtitle: string;
  icon: string;
  children: React.ReactNode;
  relatedModules: { title: string; href: string; description: string }[];
}
```

Contains:
- Animated page header (title + icon + subtitle)
- ScrollReveal-wrapped content sections
- RelatedModules at bottom

**Step 2: Create CodeFlow component**

Interactive step-by-step code execution visualization:
- Left: code block with line-by-line highlighting
- Right: execution state/output at each step
- User clicks "Next Step" or auto-plays
- Framer Motion: highlighted line slides, output animates in

**Step 3: Create RelatedModules component**

Horizontal card row linking to related module pages.

**Step 4: Verify and commit**

```bash
npm run build
git add -A && git commit -m "feat: module page template components"
```

---

## Task 7: /entry - Entry Points & Startup Flow

**Files:**
- Create: `src/app/entry/page.tsx`
- Create: `src/app/entry/page-content.tsx`

**Content: Explain Claude Code's startup process:**

1. **main.tsx overview**: 785KB entry point, fast path optimizations (--version, --dump-system-prompt), side-effect imports (MDM config, keychain prefetch, analytics init)
2. **Bootstrap flow**: Application initialization → global state setup → feature flag loading
3. **CLI entry**: Commander.js argument parsing → interactive vs non-interactive mode
4. **Startup sequence diagram**: Animated flowchart showing the initialization chain

**Key code snippets to highlight:**
- Fast path checks in main.tsx
- Dynamic imports for lazy loading
- Feature flag initialization

Use ModuleLayout, CodeBlock, CodeFlow components.

---

## Task 8: /architecture - System Architecture

**Files:**
- Create: `src/app/architecture/page.tsx`
- Create: `src/app/architecture/page-content.tsx`

**Content: Deep architecture overview:**

1. **Layer diagram**: Entry → CLI → Query Engine → Tools/Commands → UI (ink)
2. **State management**: bootstrap/state.ts centralized store → AppState → React contexts
3. **Message flow**: User Input → TextInput → QueryEngine → Tool Selection → State Update → UI Render
4. **Permission system**: Feature flags → Permission modes (auto/manual/bypass) → Tool-specific permissions
5. **Performance optimizations**: Lazy loading, memoization, virtual scrolling, background tasks

---

## Task 9: /tools - Tool System

**Files:**
- Create: `src/app/tools/page.tsx`
- Create: `src/app/tools/page-content.tsx`

**Content:**

1. **Tool interface**: Base `Tool` interface, permission checks, progress tracking
2. **40+ tools categorized**:
   - File: FileReadTool, FileWriteTool, FileEditTool
   - System: BashTool, PowerShellTool
   - Web: WebSearchTool, WebFetchTool
   - Search: GlobTool, GrepTool, LSPTool
   - Agent: AgentTool, SendMessageTool
   - Task: TaskCreateTool, TaskUpdateTool, TaskListTool
   - Team: TeamCreateTool, TeamDeleteTool
   - MCP: MCPTool, ListMcpResourcesTool
3. **Interactive demo**: Show how a tool call works end-to-end
4. **Tool registration**: How tools are registered and discovered

---

## Task 10: /commands - Command System

**Files:**
- Create: `src/app/commands/page.tsx`
- Create: `src/app/commands/page-content.tsx`

**Content:**

1. **Command pattern**: Each command is self-contained in `/commands/{name}/`
2. **40+ commands categorized**: Core, Project, Dev, Session, Tools, Settings, Integration, Advanced
3. **Command lifecycle**: Parse args → Execute → Return result
4. **Interactive command explorer**: Filter/search through commands

---

## Task 11: /ink - React Terminal UI Framework

**Files:**
- Create: `src/app/ink/page.tsx`
- Create: `src/app/ink/page-content.tsx`

**Content:**

1. **ink framework**: Custom React-based terminal UI (250KB+ of code)
2. **Components**: Box, Text, Button, Input, etc.
3. **Rendering**: How React components render to terminal ANSI output
4. **Theming**: ANSI color support, theme system
5. **Performance**: Virtual scrolling, efficient re-rendering
6. **Comparison with React DOM**: Key differences and adaptations

---

## Task 12: /plugins - Plugins & MCP

**Files:**
- Create: `src/app/plugins/page.tsx`
- Create: `src/app/plugins/page-content.tsx`

**Content:**

1. **Plugin system**: Lifecycle (load → init → execute → cleanup), sandboxed execution
2. **Skills system**: Reusable code snippets and workflows
3. **MCP (Model Context Protocol)**: Complete implementation, server management, resource access, authentication
4. **Hook system**: Pre/post execution hooks
5. **Extension points**: How to create custom plugins/tools

---

## Task 13: /assistant - KAIROS Mode

**Files:**
- Create: `src/app/assistant/page.tsx`
- Create: `src/app/assistant/page-content.tsx`

**Content:**

1. **KAIROS concept**: Always-on persistent Claude assistant
2. **Session management**: History fetching, context persistence
3. **Proactive actions**: Environment monitoring, autonomous actions
4. **Brief mode**: Ultra-concise responses for persistent context

---

## Task 14: /coordinator - Multi-Agent Coordination

**Files:**
- Create: `src/app/coordinator/page.tsx`
- Create: `src/app/coordinator/page-content.tsx`

**Content:**

1. **Multi-agent architecture**: Coordinator-worker pattern
2. **Tool isolation**: Different tool sets for coordinators vs workers
3. **Session lifecycle**: Agent creation → task assignment → execution → completion
4. **Communication**: Inter-agent messaging, task coordination

---

## Task 15: /hooks + /buddy - Hooks & Buddy Systems

**Files:**
- Create: `src/app/hooks/page.tsx`
- Create: `src/app/hooks/page-content.tsx`
- Create: `src/app/buddy/page.tsx`
- Create: `src/app/buddy/page-content.tsx`

**Hooks content:**
1. 80+ custom hooks categorized: UI, Business Logic, Integration, Performance
2. Key hooks: useTextInput, useVirtualScroll, useCanUseTool, useIDEIntegration

**Buddy content:**
1. Tamagotchi-style companion system
2. Deterministic gacha: Mulberry32 PRNG seeded by user ID
3. 18 species with rarity tiers, 1% shiny chance
4. ASCII art sprites with animations

---

## Task 16: /about Page

**Files:**
- Create: `src/app/about/page.tsx`

Simple about page explaining the project, how it was built, and links to resources.

---

## Task 17: GitHub Actions CI/CD

**Files:**
- Create: `.github/workflows/deploy.yml`

**Step 1: Create deploy workflow**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
          cache: "npm"
      - run: npm ci
      - run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Step 2: Configure GitHub Pages**

```bash
gh repo edit --homepage https://ccstudy.top
# Enable GitHub Pages from gh-pages branch in repo settings
```

**Step 3: Verify and commit**

```bash
git add -A && git commit -m "feat: GitHub Actions CI/CD for GitHub Pages"
git push
```

---

## Task 18: Final Polish + SEO

**Files:**
- Modify: `src/app/layout.tsx` (metadata)
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Create: `public/og-image.png`

**Step 1: Add comprehensive metadata**

OpenGraph, Twitter cards, description, keywords for SEO.

**Step 2: Generate sitemap and robots.txt**

```typescript
// src/app/sitemap.ts
export default function sitemap() {
  return [
    { url: "https://ccstudy.top", lastModified: new Date() },
    { url: "https://ccstudy.top/architecture", lastModified: new Date() },
    // ... all pages
  ];
}
```

**Step 3: Final build verification**

```bash
npm run build
# Verify all pages generate correctly in ./out/
```

**Step 4: Commit and push**

```bash
git add -A && git commit -m "feat: SEO, sitemap, final polish"
git push
```

---

## Execution Notes

- Each module page (Tasks 7-15) follows the same pattern using ModuleLayout + CodeBlock + CodeFlow components
- Source code analysis should reference ~/desktop/code/claude-code-main
- All pages use "use client" for interactive components, with server components for static content
- The ArchitectureMap is the centerpiece - invest in making it visually stunning
- Content should be in Chinese (matching target audience) with code in English
