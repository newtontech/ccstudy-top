# Testing Patterns -- ccstudy-top E2E Tests

Patterns extracted from existing Playwright E2E tests on the ccstudy-top static website.

## Table of Contents

- [Project Test Setup](#project-test-setup)
- [Navigation Patterns](#navigation-patterns)
- [Selector Strategies](#selector-strategies)
- [Screenshot Patterns](#screenshot-patterns)
- [Assertion Patterns](#assertion-patterns)
- [Theme Testing](#theme-testing)
- [Common Pitfalls](#common-pitfalls)

---

## Project Test Setup

### Build + Serve + Test workflow

This is a static export Next.js site. E2E tests run against the built static files, not a dev server.

```bash
# 1. Build the static export (output goes to out/ for local mode)
npm run build:local

# 2. Start the static file server (port 3000)
node scripts/dev-server.mjs local &
sleep 2

# 3. Run Playwright tests
npx playwright test

# 4. Cleanup
pkill -f "node scripts/dev-server"
```

### Playwright config

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
```

---

## Navigation Patterns

### Navigate to a page

Static export generates `.html` files for each route. Always include the `.html` extension:

```typescript
// Home page
await page.goto("/index.html");

// Module pages
await page.goto("/about.html");
await page.goto("/assistant.html");
await page.goto("/404.html");

// Wait for full load
await page.waitForLoadState("networkidle");
```

### Wait for animations to settle

The site uses Framer Motion. After navigation, animations may still be running:

```typescript
await page.goto("/index.html");
await page.waitForLoadState("networkidle");
// Wait for entrance animations to complete
await page.waitForTimeout(1500);
```

---

## Selector Strategies

### Priority order (most robust first):

1. **Heading tags** -- `page.locator("h1")`, `page.locator("h2")`
2. **ARIA roles** -- `page.getByRole("button", { name: "Text" })`
3. **Text content** -- `page.locator("a").filter({ hasText: "返回首页" })`
4. **CSS selectors** -- for checking styling classes
5. **`page.content()`** -- for checking raw HTML (e.g., emoji escape sequences)

### Heading assertions

```typescript
const heading = page.locator("h1");
await expect(heading).toContainText("404");
await expect(heading).toContainText("页面未找到");
```

### Link assertions

```typescript
const homeLink = page.locator("a").filter({ hasText: "返回首页" });
await expect(homeLink).toBeVisible();
```

### CSS class assertions

```typescript
const heading = page.locator("h1");
const classes = await heading.getAttribute("class");
expect(classes).toContain("bg-gradient");
```

### Raw HTML content checks

For checking things like emoji rendering:

```typescript
const pageContent = await page.content();
const hasLiteralEscape = pageContent.includes("\\u{");
expect(hasLiteralEscape).toBe(false);
```

---

## Screenshot Patterns

### Using the screenshot reporter

```typescript
import { createScreenshotReporter } from "../screenshot-reporter";

test("test name", async ({ page }) => {
  const screenshot = createScreenshotReporter(page, "test-name");

  await page.goto("/target.html");
  await page.waitForLoadState("networkidle");

  // Capture bug state
  await screenshot.captureBefore("bug-state");

  // ... fix applied ...

  // Capture fixed state
  await screenshot.captureAfter("feature-working");
});
```

### Inline screenshot helper (simpler alternative)

```typescript
import * as fs from "fs";
import * as path from "path";

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

// Usage:
await captureScreenshot(page, "assistant-emoji", "BEFORE");
await captureScreenshot(page, "assistant-emoji", "AFTER");
```

### Screenshot output directory

Controlled by `E2E_SCREENSHOT_DIR` env var:

```bash
export E2E_SCREENSHOT_DIR="$(pwd)/e2e-screenshots"
```

---

## Assertion Patterns

### Text content

```typescript
await expect(page.locator("h1")).toContainText("404");
await expect(page.locator("h2")).toContainText("页面未找到");
```

### Visibility

```typescript
await expect(homeLink).toBeVisible();
```

### CSS classes

```typescript
const classes = await heading.getAttribute("class");
expect(classes).toContain("bg-gradient");
```

### Negative assertions (checking bug is absent)

```typescript
const pageContent = await page.content();
expect(pageContent.includes("\\u{")).toBe(false);
```

---

## Theme Testing

### Dark mode

```typescript
// Emulate dark color scheme
await page.emulateMedia({ colorScheme: 'dark' });
await page.goto("/index.html");
await page.waitForLoadState("networkidle");
```

### CSS variable checks

```typescript
const bgColor = await page.evaluate(() => {
  return getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
});
```

---

## Common Pitfalls

### Pitfall #1: Forgetting to build before testing

There is no live dev server for E2E. You MUST build first:

```bash
# WRONG: just running tests without building
npx playwright test

# RIGHT: build, serve, then test
npm run build:local
node scripts/dev-server.mjs local &
sleep 2
npx playwright test
```

### Pitfall #2: Wrong page URLs

Static export uses `.html` extensions:

```typescript
// WRONG: no .html extension
await page.goto("/about");

// RIGHT: include .html extension
await page.goto("/about.html");
```

### Pitfall #3: Animation timing

Framer Motion animations cause elements to appear after a delay:

```typescript
// WRONG: assert immediately after navigation
await page.goto("/index.html");
await expect(someElement).toBeVisible(); // may fail during animation

// RIGHT: wait for networkidle + animation settle
await page.goto("/index.html");
await page.waitForLoadState("networkidle");
await page.waitForTimeout(1500);
await expect(someElement).toBeVisible();
```

### Pitfall #4: basePath confusion

`build:local` has NO basePath, `build:github` has basePath `/ccstudy-top/`. Use `build:local` for E2E testing to keep URLs simple.

### Pitfall #5: Playwright TS transform object params

Playwright's TS transform may reject inline object params in some setups:

```typescript
// WRONG: inline object
await page.screenshot({ path: file, fullPage: true })

// RIGHT: extract to variable
const shotOpts = { path: file, fullPage: true }
await page.screenshot(shotOpts)
```

### Pitfall #6: Checking for Tailwind v4 classes

Tailwind v4 class names may differ from v3. Always verify against the actual built output rather than assuming class names:

```typescript
// Don't assume class names -- check what's actually rendered
const element = page.locator(".my-component");
const classes = await element.getAttribute("class");
// Verify the actual classes, don't assume "bg-purple-500" still exists
```
