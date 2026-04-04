import fs from "fs";
import path from "path";
import type { Page } from "@playwright/test";

const SCREENSHOT_DIR = process.env.E2E_SCREENSHOT_DIR || path.join(__dirname, "screenshots");

export interface ScreenshotReporter {
  capture: (label: string, options?: { fullPage?: boolean }) => Promise<string>;
  captureBefore: (label: string, options?: { fullPage?: boolean }) => Promise<string>;
  captureAfter: (label: string, options?: { fullPage?: boolean }) => Promise<string>;
}

interface ScreenshotManifest {
  testName: string;
  before?: string;
  after?: string;
}

export function createScreenshotReporter(page: Page, testName: string): ScreenshotReporter {
  const dir = path.join(SCREENSHOT_DIR, testName);
  const manifest: ScreenshotManifest = { testName };

  const ensureDir = () => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };

  const writeManifest = () => {
    ensureDir();
    const manifestPath = path.join(dir, "manifest.json");
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  };

  return {
    async capture(label, options = {}) {
      ensureDir();
      const filepath = path.join(dir, `${label}-${Date.now()}.png`);
      await page.screenshot({ path: filepath, fullPage: options.fullPage ?? true });
      return filepath;
    },

    async captureBefore(label, options = {}) {
      ensureDir();
      const filepath = path.join(dir, `BEFORE-${label}-${Date.now()}.png`);
      await page.screenshot({ path: filepath, fullPage: options.fullPage ?? true });
      manifest.before = filepath;
      writeManifest();
      return filepath;
    },

    async captureAfter(label, options = {}) {
      ensureDir();
      const filepath = path.join(dir, `AFTER-${label}-${Date.now()}.png`);
      await page.screenshot({ path: filepath, fullPage: options.fullPage ?? true });
      manifest.after = filepath;
      writeManifest();
      return filepath;
    },
  };
}
