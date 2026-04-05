import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

// Mock ModuleLayout
vi.mock("@/components/ModuleLayout", () => ({
  ModuleLayout: ({ title, subtitle, children, relatedModules }: any) => (
    <div>
      <h1>{title}</h1>
      <p>{subtitle}</p>
      <div>{children}</div>
      <div data-testid="related-modules">
        {relatedModules.map((m: any) => (
          <a key={m.title} href={m.href} data-testid={`related-${m.title}`}>
            {m.title}
          </a>
        ))}
      </div>
    </div>
  ),
}));

// Mock i18n
vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    t: (key: string) => key,
    locale: "zh",
    setLocale: vi.fn(),
  }),
}));

// Mock ScrollReveal
vi.mock("@/components/animations/ScrollReveal", () => ({
  ScrollReveal: ({ children }: any) => <>{children}</>,
}));

// Mock SectionTitle
vi.mock("@/components/SectionTitle", () => ({
  SectionTitle: ({ title, subtitle }: any) => (
    <div>
      <h2>{title}</h2>
      {subtitle && <span>{subtitle}</span>}
    </div>
  ),
}));

// Mock ArchitectureDiagram
vi.mock("@/components/ArchitectureDiagram", () => ({
  ArchitectureDiagram: ({ title }: any) => (
    <div data-testid="architecture-diagram">{title}</div>
  ),
}));

// Mock CodeBlock
vi.mock("@/components/CodeBlock", () => ({
  CodeBlock: ({ code, filename }: any) => (
    <pre data-filename={filename}>{code}</pre>
  ),
}));

// Mock RelatedModules
vi.mock("@/components/RelatedModules", () => ({
  RelatedModules: ({ modules }: any) => (
    <div>
      {modules.map((m: any) => (
        <a key={m.title} href={m.href} data-testid={`related-${m.title}`}>
          {m.title}
        </a>
      ))}
    </div>
  ),
}));

// Import after mocks
import MemoryPage from "./page";

describe("MemoryPage", () => {
  it("renders page title", () => {
    render(<MemoryPage />);
    expect(screen.getByText("记忆系统")).toBeInTheDocument();
  });

  it("renders all section titles", () => {
    render(<MemoryPage />);
    const sections = [
      "记忆系统概述",
      "memdir — 记忆目录路径",
      "记忆类型分类",
      "记忆文件格式",
      "记忆扫描与检索",
      "年龄衰减与新鲜度",
      "DreamTask — 做梦任务管理",
      "团队记忆（Team Memory）",
      "extractMemories — 提取记忆 Agent",
    ];
    for (const section of sections) {
      expect(screen.getByText(section)).toBeInTheDocument();
    }
    // "自动做梦（autoDream）" appears in both section title and diagram
    expect(screen.getAllByText("自动做梦（autoDream）").length).toBeGreaterThanOrEqual(1);
  });

  it("renders related module links", () => {
    render(<MemoryPage />);
    expect(screen.getByTestId("related-上下文管理")).toHaveAttribute("href", "/context");
    expect(screen.getByTestId("related-查询引擎")).toHaveAttribute("href", "/query-engine");
    expect(screen.getByTestId("related-多智能体")).toHaveAttribute("href", "/coordinator");
    expect(screen.getByTestId("related-工具系统")).toHaveAttribute("href", "/tools");
  });

  it("renders memory type names", () => {
    render(<MemoryPage />);
    expect(screen.getAllByText(/user/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/feedback/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/project/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/reference/).length).toBeGreaterThan(0);
  });

  it("renders key function names", () => {
    render(<MemoryPage />);
    expect(screen.getAllByText(/scanMemoryFiles/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/findRelevantMemories/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/memoryAgeDays/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/memoryFreshnessText/).length).toBeGreaterThan(0);
  });

  it("renders autoDream concepts", () => {
    render(<MemoryPage />);
    expect(screen.getAllByText(/autoDream/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/DreamTask/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/合并锁/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/extractMemories/).length).toBeGreaterThan(0);
  });

  it("renders DreamTask phases", () => {
    render(<MemoryPage />);
    expect(screen.getByText("🟡 开始中")).toBeInTheDocument();
    expect(screen.getByText("🟢 更新中")).toBeInTheDocument();
    expect(screen.getByText("✅ 已完成")).toBeInTheDocument();
  });

  it("renders architecture diagrams", () => {
    render(<MemoryPage />);
    const diagrams = screen.getAllByTestId("architecture-diagram");
    expect(diagrams.length).toBeGreaterThanOrEqual(2);
  });

  it("renders code blocks", () => {
    render(<MemoryPage />);
    const codeBlocks = document.querySelectorAll("pre");
    expect(codeBlocks.length).toBeGreaterThan(0);
  });
});
