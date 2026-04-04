import { test, expect } from "@playwright/test";
import { createScreenshotReporter } from "./screenshot-reporter";

test.describe("i18n language toggle", () => {
  test("should switch from Chinese to English and back", async ({ page }) => {
    const screenshot = createScreenshotReporter(page, "i18n-toggle");

    // Navigate to homepage
    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2500);

    // BEFORE: Chinese (default state)
    await screenshot.captureBefore("chinese-default");

    // Verify default Chinese text is visible
    const navHome = page.locator("nav a").filter({ hasText: "首页" });
    await expect(navHome).toBeVisible();

    // Find and click the EN language toggle button
    const langBtn = page.locator('button[aria-label="Toggle language"]');
    await expect(langBtn).toBeVisible();
    await expect(langBtn).toContainText("EN");
    await langBtn.click();
    await page.waitForTimeout(1500);

    // AFTER: English state
    await screenshot.captureAfter("english-switched");

    // Verify English text is now visible
    const navHomeEn = page.locator("nav a").filter({ hasText: "Home" });
    await expect(navHomeEn).toBeVisible();

    // Verify the button now shows "中" (switch back to Chinese)
    await expect(langBtn).toContainText("中");
  });

  test("should persist language preference after page reload", async ({ page }) => {
    const screenshot = createScreenshotReporter(page, "i18n-persist");

    // Navigate and switch to English
    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    await screenshot.captureBefore("before-persist-test");

    const langBtn = page.locator('button[aria-label="Toggle language"]');
    await langBtn.click();
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2500);

    // AFTER: English should persist
    await screenshot.captureAfter("english-persisted-after-reload");

    // Verify English is still active
    const navHomeEn = page.locator("nav a").filter({ hasText: "Home" });
    await expect(navHomeEn).toBeVisible();
  });

  test("should translate about page", async ({ page }) => {
    const screenshot = createScreenshotReporter(page, "i18n-about");

    // Switch to English first
    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);

    const langBtn = page.locator('button[aria-label="Toggle language"]');
    await langBtn.click();
    await page.waitForTimeout(500);

    await screenshot.captureBefore("about-page-english");

    // Navigate to about page
    await page.goto("/about.html");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(2000);

    // Verify about page is in English
    await expect(page.locator("h1")).toContainText("About");

    // Switch back to Chinese
    await page.locator('button[aria-label="Toggle language"]').click();
    await page.waitForTimeout(1500);

    await screenshot.captureAfter("about-page-chinese");

    // Verify about page is now in Chinese
    await expect(page.locator("h1")).toContainText("关于本站");
  });
});
