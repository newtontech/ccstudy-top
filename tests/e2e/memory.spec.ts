import { test, expect } from "@playwright/test";

test.describe("Memory Page", () => {
  test("page loads and shows title", async ({ page }) => {
    await page.goto("/memory");
    await expect(page.getByText("记忆系统")).toBeVisible();
  });

  test("shows all section headings", async ({ page }) => {
    await page.goto("/memory");
    const sections = [
      "记忆系统概述",
      "memdir — 记忆目录路径",
      "记忆类型分类",
      "记忆文件格式",
      "记忆扫描与检索",
      "年龄衰减与新鲜度",
      "自动做梦（autoDream）",
      "DreamTask — 做梦任务管理",
      "团队记忆（Team Memory）",
      "extractMemories — 提取记忆 Agent",
    ];
    for (const section of sections) {
      await expect(page.getByText(section)).toBeVisible();
    }
  });

  test("has related module links", async ({ page }) => {
    await page.goto("/memory");
    await expect(page.getByRole("link", { name: "上下文管理" })).toBeVisible();
    await expect(page.getByRole("link", { name: "查询引擎" })).toBeVisible();
    await expect(page.getByRole("link", { name: "多智能体" })).toBeVisible();
    await expect(page.getByRole("link", { name: "工具系统" })).toBeVisible();
  });

  test("code blocks are present", async ({ page }) => {
    await page.goto("/memory");
    const codeBlocks = page.locator("pre");
    await expect(codeBlocks.first()).toBeVisible();
  });

  test("memory type badges are visible", async ({ page }) => {
    await page.goto("/memory");
    await expect(page.getByText("user")).toBeVisible();
    await expect(page.getByText("feedback")).toBeVisible();
    await expect(page.getByText("project")).toBeVisible();
    await expect(page.getByText("reference")).toBeVisible();
  });
});
