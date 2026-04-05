import fs from "node:fs"
import path from "node:path"
<<<<<<< HEAD
import { fileURLToPath } from "node:url"
import type { Page } from "@playwright/test"

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * E2E screenshot reporter for PR before/after comparison.
 *
 * Output: controlled by E2E_SCREENSHOT_DIR env var (defaults to <e2e>/screenshots).
 * Each test gets a subdirectory with:
 *   - BEFORE-*.png  — failure/initial state
 *   - AFTER-*.png   — success/fixed state
 *   - manifest.json — records before/after paths for PR comment script
 */

=======
import type { Page } from "@playwright/test"

>>>>>>> 102da56 (fix: improve navbar link contrast for better visibility)
const SCREENSHOT_DIR = process.env.E2E_SCREENSHOT_DIR || path.join(__dirname, "screenshots")

export interface ScreenshotReporter {
  capture: (label: string, options?: { fullPage?: boolean }) => Promise<string>
  captureBefore: (label: string, options?: { fullPage?: boolean }) => Promise<string>
  captureAfter: (label: string, options?: { fullPage?: boolean }) => Promise<string>
}

interface ScreenshotManifest {
  testName: string
  before?: string
  after?: string
}

export function createScreenshotReporter(page: Page, testName: string): ScreenshotReporter {
  const dir = path.join(SCREENSHOT_DIR, testName)
  const manifest: ScreenshotManifest = { testName }

  const ensureDir = () => {
    if (!fs.existsSync(dir)) {
<<<<<<< HEAD
      const opts = { recursive: true }
      fs.mkdirSync(dir, opts)
=======
      fs.mkdirSync(dir, { recursive: true })
>>>>>>> 102da56 (fix: improve navbar link contrast for better visibility)
    }
  }

  const writeManifest = () => {
    ensureDir()
<<<<<<< HEAD
    const manifestPath = path.join(dir, "manifest.json")
    const data = JSON.stringify(manifest, null, 2)
    fs.writeFileSync(manifestPath, data)
=======
    fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest, null, 2))
>>>>>>> 102da56 (fix: improve navbar link contrast for better visibility)
  }

  return {
    async capture(label, options = {}) {
      ensureDir()
      const filepath = path.join(dir, `${label}-${Date.now()}.png`)
<<<<<<< HEAD
      const shotOpts = { path: filepath, fullPage: options.fullPage ?? true }
      await page.screenshot(shotOpts)
=======
      await page.screenshot({ path: filepath, fullPage: options.fullPage ?? true })
>>>>>>> 102da56 (fix: improve navbar link contrast for better visibility)
      return filepath
    },

    async captureBefore(label, options = {}) {
      ensureDir()
      const filepath = path.join(dir, `BEFORE-${label}-${Date.now()}.png`)
<<<<<<< HEAD
      const shotOpts = { path: filepath, fullPage: options.fullPage ?? true }
      await page.screenshot(shotOpts)
=======
      await page.screenshot({ path: filepath, fullPage: options.fullPage ?? true })
>>>>>>> 102da56 (fix: improve navbar link contrast for better visibility)
      manifest.before = filepath
      writeManifest()
      return filepath
    },

    async captureAfter(label, options = {}) {
      ensureDir()
      const filepath = path.join(dir, `AFTER-${label}-${Date.now()}.png`)
<<<<<<< HEAD
      const shotOpts = { path: filepath, fullPage: options.fullPage ?? true }
      await page.screenshot(shotOpts)
=======
      await page.screenshot({ path: filepath, fullPage: options.fullPage ?? true })
>>>>>>> 102da56 (fix: improve navbar link contrast for better visibility)
      manifest.after = filepath
      writeManifest()
      return filepath
    },
  }
}
