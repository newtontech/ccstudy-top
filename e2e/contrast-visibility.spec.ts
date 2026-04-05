import { test, expect } from "@playwright/test";
import { createScreenshotReporter } from "./screenshot-reporter";

test.describe("Navigation and content contrast visibility", () => {
  test("navbar links should have sufficient contrast in light mode", async ({ page }) => {
    const screenshot = createScreenshotReporter(page, "navbar-contrast-light");

    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);

    // BEFORE screenshot
    await screenshot.captureBefore("navbar-light", { fullPage: false });

    // Check navbar links exist
    const navLinks = page.locator("nav a");
    const count = await navLinks.count();
    expect(count).toBeGreaterThanOrEqual(6);

    // Check that nav link text color has sufficient contrast
    // The bug: links use --text-secondary (#475569) which is low contrast
    for (let i = 1; i < count; i++) { // skip logo link
      const color = await navLinks.nth(i).evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      // Parse RGB values
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      expect(match).toBeTruthy();
      const r = parseInt(match![1]);
      const g = parseInt(match![2]);
      const b = parseInt(match![3]);

      // Check luminance - links should be dark enough for white bg (#ffffff)
      // WCAG AA requires contrast ratio >= 4.5:1 for normal text
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      // For white background (1.0), text luminance should be <= 0.35 for sufficient contrast
      // This ensures contrast ratio > 4.5:1
      expect(luminance).toBeLessThanOrEqual(0.35);
    }

    await screenshot.captureAfter("navbar-light-fixed", { fullPage: false });
  });

  test("navbar links should have sufficient contrast in dark mode", async ({ page }) => {
    const screenshot = createScreenshotReporter(page, "navbar-contrast-dark");

    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");
    // next-themes uses class-based dark mode, manually add the dark class
    await page.evaluate(() => {
      document.documentElement.classList.add("dark");
      // Also set localStorage so next-themes picks it up
      localStorage.setItem("theme", "dark");
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.waitForTimeout(1500);

    await screenshot.captureBefore("navbar-dark", { fullPage: false });

    // Check that nav links are visible in dark mode
    const navLinks = page.locator("nav a");
    const count = await navLinks.count();

    for (let i = 1; i < count; i++) {
      const color = await navLinks.nth(i).evaluate((el) => {
        return window.getComputedStyle(el).color;
      });
      const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
      expect(match).toBeTruthy();
      const r = parseInt(match![1]);
      const g = parseInt(match![2]);
      const b = parseInt(match![3]);

      // For dark background, text should be light enough
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      expect(luminance).toBeGreaterThanOrEqual(0.55);
    }

    await screenshot.captureAfter("navbar-dark-fixed", { fullPage: false });
  });
});
