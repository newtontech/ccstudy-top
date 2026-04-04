import { test, expect } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

// Simple screenshot helper
async function captureScreenshot(page: any, name: string, suffix: string) {
  const dir = process.env.E2E_SCREENSHOT_DIR || "./e2e-screenshots";
  const opts = { recursive: true };
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, opts);
  }
  const filePath = path.join(dir, `${suffix}-${name}.png`);
  await page.screenshot({ path: filePath, fullPage: true });
  return filePath;
}

test.describe("Unicode Emoji Rendering", () => {
  test("should render emoji correctly on assistant page", async ({ page }) => {
    // Navigate to assistant page directly via HTML file
    await page.goto("/assistant.html");
    await page.waitForLoadState("networkidle");

    // Take AFTER screenshot showing fixed state
    await captureScreenshot(page, "assistant-emoji", "AFTER");

    // Get the page content and check for literal escape sequences
    const pageContent = await page.content();
    
    // The bug: \u{XXXX} should NOT appear literally in the HTML
    // It should be converted to actual emoji characters
    const hasLiteralEscape = pageContent.includes("\\u{");
    
    console.log("Has literal \\u{ escapes:", hasLiteralEscape);
    
    // This assertion should PASS after the fix
    expect(hasLiteralEscape).toBe(false);
  });

  test("should render emoji correctly on home page", async ({ page }) => {
    // Navigate to home page
    await page.goto("/index.html");
    await page.waitForLoadState("networkidle");

    // Take AFTER screenshot
    await captureScreenshot(page, "homepage-emoji", "AFTER");

    // Check for literal escape sequences
    const pageContent = await page.content();
    const hasLiteralEscape = pageContent.includes("\\u{");
    
    console.log("Has literal \\u{ escapes:", hasLiteralEscape);
    
    // This assertion should PASS after the fix
    expect(hasLiteralEscape).toBe(false);
  });
});
