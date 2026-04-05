import { test, expect } from "@playwright/test";

test.describe("Context Page", () => {
  test("page loads and shows title", async ({ page }) => {
    await page.goto("/context");
    await expect(page.getByText("上下文管理")).toBeVisible();
  });

  test("shows all section headings", async ({ page }) => {
    await page.goto("/context");
    const sections = [
      "上下文收集器",
      "上下文使用分析",
      "Token 预算管理",
      "Context Provider 体系",
      "压缩策略",
      "工具延迟加载",
    ];
    for (const section of sections) {
      await expect(page.getByText(section)).toBeVisible();
    }
  });

  test("has related module links", async ({ page }) => {
    await page.goto("/context");
    await expect(page.getByRole("link", { name: "查询引擎" })).toBeVisible();
    await expect(page.getByRole("link", { name: "工具系统" })).toBeVisible();
    await expect(page.getByRole("link", { name: "系统架构" })).toBeVisible();
  });

  test("code blocks are present", async ({ page }) => {
    await page.goto("/context");
    // Check that code blocks rendered (they have class with bg styling)
    const codeBlocks = page.locator("pre");
    await expect(codeBlocks.first()).toBeVisible();
  });
});
