import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import QueryEnginePage from "../page";

// Mock framer-motion
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: (props: any) => <img {...props} />,
}));

// Mock i18n
vi.mock("@/i18n/LanguageContext", () => ({
  useLanguage: () => ({
    t: {
      layout: { homeBreadcrumb: "Home" },
    },
  }),
}));

describe("QueryEnginePage", () => {
  it("renders the page title", () => {
    render(<QueryEnginePage />);
    expect(screen.getByText("QueryEngine 核心循环")).toBeInTheDocument();
  });

  it("renders section titles", () => {
    render(<QueryEnginePage />);
    expect(screen.getByText("QueryEngine 概述")).toBeInTheDocument();
    expect(screen.getByText("8 步执行流程")).toBeInTheDocument();
    expect(screen.getByText("Stop Hooks 中断机制")).toBeInTheDocument();
    expect(screen.getByText("Token Budget 动态分配")).toBeInTheDocument();
    expect(screen.getByText("依赖注入与配置")).toBeInTheDocument();
    expect(screen.getByText("错误恢复机制")).toBeInTheDocument();
    expect(screen.getByText("消息类型与流转")).toBeInTheDocument();
  });

  it("renders related modules", () => {
    render(<QueryEnginePage />);
    expect(screen.getByText("工具系统")).toBeInTheDocument();
    expect(screen.getByText("系统架构")).toBeInTheDocument();
  });

  it("renders key technical terms", () => {
    render(<QueryEnginePage />);
    expect(screen.getByText("query() while(true)")).toBeInTheDocument();
    expect(screen.getByText("handleStopHooks()")).toBeInTheDocument();
    expect(screen.getByText("checkTokenBudget()")).toBeInTheDocument();
  });
});
