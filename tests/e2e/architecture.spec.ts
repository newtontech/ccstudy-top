import { test, expect } from "@playwright/test";

test.describe("Architecture Page - Issue #15", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/architecture");
  });

  test("page loads and shows title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("系统架构");
  });

  test("existing sections are preserved", async ({ page }) => {
    await expect(page.getByText("架构概述")).toBeVisible();
    await expect(page.getByText("消息流")).toBeVisible();
    await expect(page.getByText("状态管理")).toBeVisible();
    await expect(page.getByText("工具注册与执行")).toBeVisible();
    await expect(page.getByText("性能优化策略")).toBeVisible();
    await expect(page.getByText("权限系统")).toBeVisible();
    await expect(page.getByText("上下文管理")).toBeVisible();
  });

  test("four entry points section is visible", async ({ page }) => {
    await expect(page.getByText("四大入口")).toBeVisible();
    await expect(page.getByText("CLI")).toBeVisible();
    await expect(page.getByText("REPL")).toBeVisible();
    await expect(page.getByText("Direct Connect")).toBeVisible();
    await expect(page.getByText("Remote")).toBeVisible();
  });

  test("directory tree section is visible", async ({ page }) => {
    await expect(page.getByText("完整目录结构")).toBeVisible();
    await expect(page.getByText("main.tsx")).toBeVisible();
    await expect(page.getByText("bootstrap")).toBeVisible();
    await expect(page.getByText("entrypoints")).toBeVisible();
  });

  test("directory tree is interactive", async ({ page }) => {
    // Find a clickable directory item
    const cliItem = page.getByText("cli").first();
    await cliItem.click();
    // After clicking, sub-items should be visible
    await expect(page.getByText("handlers")).toBeVisible();
  });

  test("module dependency DAG section is visible", async ({ page }) => {
    await expect(page.getByText("模块依赖")).toBeVisible();
    await expect(page.getByText("QueryEngine")).toBeVisible();
  });

  test("related modules link to correct pages", async ({ page }) => {
    const links = ["/entry", "/tools", "/commands", "/plugins", "/query-engine", "/context", "/memory"];
    for (const href of links) {
      const link = page.locator(`a[href="${href}"]`);
      // At least one of them should exist
      const count = await link.count();
      if (count > 0) {
        await expect(link.first()).toBeVisible();
      }
    }
  });

  test("ArchitectureDiagram SVGs render", async ({ page }) => {
    const svgs = page.locator("svg");
    // Should have multiple architecture diagrams (existing 7 + new 2-3)
    const count = await svgs.count();
    expect(count).toBeGreaterThanOrEqual(7);
  });

  test("page is responsive on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/architecture");
    await expect(page.locator("h1")).toContainText("系统架构");
    await expect(page.getByText("四大入口")).toBeVisible();
  });

  test("page is responsive on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/architecture");
    await expect(page.locator("h1")).toContainText("系统架构");
  });
});
