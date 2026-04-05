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
  CodeBlock: ({ code }: any) => <pre>{code}</pre>,
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
import ContextPage from "./page";

describe("ContextPage", () => {
  it("renders page title", () => {
    render(<ContextPage />);
    expect(screen.getByText("上下文管理")).toBeInTheDocument();
  });

  it("renders section titles", () => {
    render(<ContextPage />);
    expect(screen.getByText("上下文收集器")).toBeInTheDocument();
    expect(screen.getByText("上下文使用分析")).toBeInTheDocument();
    expect(screen.getByText("Token 预算管理")).toBeInTheDocument();
    expect(screen.getByText("Context Provider 体系")).toBeInTheDocument();
    expect(screen.getByText("压缩策略")).toBeInTheDocument();
    expect(screen.getByText("工具延迟加载")).toBeInTheDocument();
  });

  it("renders related module links", () => {
    render(<ContextPage />);
    expect(screen.getByTestId("related-查询引擎")).toHaveAttribute("href", "/query-engine");
    expect(screen.getByTestId("related-工具系统")).toHaveAttribute("href", "/tools");
    expect(screen.getByTestId("related-系统架构")).toHaveAttribute("href", "/architecture");
  });

  it("renders key code concepts", () => {
    render(<ContextPage />);
    expect(screen.getAllByText(/getSystemContext/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/getUserContext/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/parseTokenBudget/).length).toBeGreaterThan(0);
  });

  it("renders context provider names", () => {
    render(<ContextPage />);
    expect(screen.getAllByText(/Mailbox/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/FpsMetrics/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ModalContext/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Notifications/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/OverlayContext/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Stats/).length).toBeGreaterThan(0);
  });

  it("renders compression strategies", () => {
    render(<ContextPage />);
    expect(screen.getAllByText(/Micro Compact/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Auto Compact/).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Manual Compact/).length).toBeGreaterThan(0);
  });
});
