import { test, expect } from "@playwright/test";

test.describe("QueryEngine Page", () => {
  test("page loads and shows title", async ({ page }) => {
    await page.goto("/query-engine");
    await expect(page.locator("h1")).toContainText("QueryEngine 核心循环");
  });

  test("all sections are visible", async ({ page }) => {
    await page.goto("/query-engine");
    await expect(page.getByText("QueryEngine 概述")).toBeVisible();
    await expect(page.getByText("8 步执行流程")).toBeVisible();
    await expect(page.getByText("Stop Hooks 中断机制")).toBeVisible();
    await expect(page.getByText("Token Budget 动态分配")).toBeVisible();
    await expect(page.getByText("依赖注入与配置")).toBeVisible();
    await expect(page.getByText("错误恢复机制")).toBeVisible();
    await expect(page.getByText("消息类型与流转")).toBeVisible();
  });

  test("related modules link to correct pages", async ({ page }) => {
    await page.goto("/query-engine");
    const toolsLink = page.locator('a[href="/tools"]');
    await expect(toolsLink).toBeVisible();
    const archLink = page.locator('a[href="/architecture"]');
    await expect(archLink).toBeVisible();
  });

  test("CodeFlow component renders code steps", async ({ page }) => {
    await page.goto("/query-engine");
    // CodeFlow should have step navigation
    await expect(page.getByText("query() 核心循环 — 8 步流程")).toBeVisible();
  });

  test("page is responsive", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/query-engine");
    await expect(page.locator("h1")).toContainText("QueryEngine 核心循环");
  });
});
