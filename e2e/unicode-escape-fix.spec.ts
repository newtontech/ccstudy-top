import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

const PAGES = [
  { name: "about", path: "/about" },
  { name: "plugins", path: "/plugins" },
  { name: "commands", path: "/commands" },
] as const;

function captureAfter(page: any, testName: string, label: string): string {
  const dir = process.env.E2E_SCREENSHOT_DIR || "./e2e-screenshots";
  const testDir = path.join(dir, testName);
  const opts = { recursive: true };
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, opts);
  }
  const timestamp = Date.now();
  const filepath = path.join(testDir, `AFTER-${label}-${timestamp}.png`);
  // Return filepath; caller awaits page.screenshot
  return filepath;
}

test.describe("Unicode Escape Fix - Emoji Rendering", () => {
  for (const { name, path: pagePath } of PAGES) {
    test(`${name} page renders emoji characters not escape sequences`, async ({ page }) => {
      await page.goto(pagePath);
      await page.waitForLoadState("networkidle");

      const screenshotPath = captureAfter(page, name, name);
      const shotOpts = { path: screenshotPath, fullPage: true };
      await page.screenshot(shotOpts);
      console.log(`Screenshot saved: ${screenshotPath}`);

      const pageContent = await page.content();
      const hasLiteralU4 = pageContent.includes("\\u{");
      const hasLiteralSurrogate = pageContent.includes("\\uD83D");

      console.log(`${name} has literal \\u{ escapes:`, hasLiteralU4);
      console.log(`${name} has literal surrogate pairs:`, hasLiteralSurrogate);

      expect(hasLiteralU4).toBe(false);
      expect(hasLiteralSurrogate).toBe(false);
    });
  }
});
