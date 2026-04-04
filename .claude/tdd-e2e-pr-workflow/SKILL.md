---
name: tdd-e2e-pr-workflow
description: 
  TDD-driven E2E workflow with Playwright browser screenshots as PR proof for the ccstudy-top static website.
  Workflow pick one open issue -> build static site -> write E2E test -> implement fix -> PR with screenshots.
  Triggers "tdd e2e", "screenshot pr", "before after screenshot", "visual pr proof", "e2e pr workflow", "issue to pr with screenshots", "playwright tdd", "fix issue", "worktree fix", "e2e test".
---

# TDD E2E PR Workflow
Process ONE issue at a time. Complete current PR before starting next.

One Issue -> One PR with visual proof.

**Flow**: Select one issue -> Build -> Write test (BEFORE screenshot) -> Fix -> Test passes (AFTER screenshot) -> PR with screenshot comment.

**Golden Rule**: Study existing E2E tests in `.worktrees/` and read the actual Playwright patterns before writing any test. This is a Next.js static export site, not a dynamic app -- tests navigate to `.html` files served by the static dev server.

---

## Phase 0: Select One Issue

Choose an open issue from the GitHub repo:

```bash
# List open issues
gh issue list --repo newtontech/ccstudy-top --state open --json number,title,body

# Or pick one randomly
gh issue list --repo newtontech/ccstudy-top --state open --json number,title | \
  jq -r '.[] | "\(.number): \(.title)"' | shuf -n 1
```

1. Note the issue number and create a short kebab-case slug from the title (e.g., "unicode-escape", "missing-404-page")
2. Create an isolated worktree from main:
   ```bash
   git worktree add .worktrees/fix/<slug> -b fix/<slug>
   ```
3. In the worktree, copy [screenshot-reporter.ts](assets/screenshot-reporter.ts) into `e2e/` directory
4. Install dependencies and set screenshot output:
   ```bash
   cd .worktrees/fix/<slug>
   npm install
   export E2E_SCREENSHOT_DIR="$(pwd)/e2e-screenshots"
   ```

---

## Phase 1: Build, Serve, Write Test

### Step A: Build and start the static server

This project uses `output: 'export'` -- there is no dev server for E2E. You must build first, then serve the static files.

```bash
# In the worktree directory:
npm run build:local
```

Then start the static server (port 3000). The Playwright config points to `baseURL: 'http://localhost:3456'` so adjust as needed, or override:

```bash
# Option 1: Start on port 3456 (matches playwright config)
node scripts/dev-server.mjs local
# Then edit playwright.config.ts baseURL or override via env:
# PLAYWRIGHT_BASE_URL=http://localhost:3000 npx playwright test

# Option 2: Just use port 3000 and override baseURL
# The dev-server.mjs always serves on port 3000
```

The `playwright.config.ts` in the worktree should look like:

```typescript
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

### Step B: Study existing test patterns

Read the existing E2E tests in `.worktrees/` to understand the patterns. Key points:

- Tests import directly from `@playwright/test` -- no custom fixtures
- Navigate to `.html` files: `page.goto("/index.html")`, `page.goto("/404.html")`, `page.goto("/assistant.html")`
- Wait for load: `await page.waitForLoadState("networkidle")`
- Use standard locators: `page.locator("h1")`, `page.locator("a").filter({ hasText: "text" })`
- Check CSS classes: `await heading.getAttribute("class")`
- Check content: `expect(page.locator("h1")).toContainText("404")`

### Step C: Write test with BEFORE screenshot

```typescript
import { test, expect } from "@playwright/test";
import { createScreenshotReporter } from "../screenshot-reporter";

test.describe("Bug description", () => {
  test("should demonstrate the bug", async ({ page }) => {
    const screenshot = createScreenshotReporter(page, "test-name");

    // Navigate to the static page
    await page.goto("/target-page.html");
    await page.waitForLoadState("networkidle");

    // Capture BEFORE state showing the bug
    await screenshot.captureBefore("bug-state");

    // Assert the buggy behavior (this test should FAIL before the fix)
    const heading = page.locator("h1");
    await expect(heading).toContainText("Expected Text");

    // Or check for the bug directly:
    const pageContent = await page.content();
    const hasBug = pageContent.includes("\\u{");
    expect(hasBug).toBe(false);
  });
});
```

**Important**: For `build:local`, the static export goes to `out/` directory with NO basePath. Page URLs are just `/index.html`, `/about.html`, etc. For `build:github`, output goes to `dist/` with basePath `/ccstudy-top/`, but the dev-server.mjs for github mode creates a `dist-preview/ccstudy-top/` structure served on port 3000.

---

## Phase 2: Implement Fix

Write minimum code to pass the test. Do NOT modify test assertions.

### Build-test cycle:

```bash
# 1. Make code changes in src/
# 2. Rebuild static export
npm run build:local

# 3. Run the specific E2E test
npx playwright test e2e/your-test.spec.ts

# 4. If it fails, read the error, fix code, rebuild, retest
```

### Debugging tips:

1. **Read the error carefully** -- most failures are wrong selectors or missing elements after static export
2. **Check the built output** -- look in `out/` (or `dist/`) to verify the HTML is correct
3. **Use `page.pause()`** to open Playwright Inspector and interact with the live page
4. **Check for hydration issues** -- static export can have different rendering than dev mode
5. **Verify CSS class names** -- Tailwind v4 may generate different class names than expected
6. **Never weaken assertions** -- fix the code, not the test

### Common failure patterns:

| Symptom | Likely Cause | Fix |
|---|---|---|
| 404 on page.goto | Build output missing the page | Check `out/` has the HTML file, verify export config |
| Selector not found | Wrong CSS class or data attribute | Use `page.pause()` to inspect DOM, check for Tailwind class changes |
| Text assertion fails | Content not rendered or different | Check static export vs dev mode, look for hydration issues |
| Timeout on waitForLoadState | Page has slow resources | Use `{ waitUntil: 'domcontentloaded' }` or increase timeout |
| Emoji shows as escape text | `\u{XXXX}` in source code | Replace with actual emoji characters in the TSX source |
| Blank page / JS errors | Build config issue | Check `next.config.ts`, ensure `output: 'export'` is set |

---

## Phase 3: AFTER Screenshot + Hard Gate

After the fix is implemented and test passes:

```typescript
test("should show fixed behavior", async ({ page }) => {
  const screenshot = createScreenshotReporter(page, "test-name");

  await page.goto("/target-page.html");
  await page.waitForLoadState("networkidle");

  // BEFORE is already captured from the failing test run
  await screenshot.captureAfter("feature-working");

  // Assert the fix works
  await expect(page.locator("h1")).toContainText("Expected Text");
});
```

**Hard gate** -- ALL three must be true before PR:
- Test passes (exit code 0)
- `BEFORE-*.png` exists in `e2e-screenshots/`
- `AFTER-*.png` exists in `e2e-screenshots/`

```bash
# Verify all gates
npx playwright test e2e/your-test.spec.ts && \
ls e2e-screenshots/*/BEFORE-*.png && \
ls e2e-screenshots/*/AFTER-*.png && \
echo "All gates passed!"
```

---

## Phase 4: PR + Screenshot Comment

### Create the PR:

```bash
# From the worktree directory
git add -A
git commit -m "fix: <issue-description> (closes #<issue-number>)"
git push origin fix/<slug>

# Create PR
gh pr create \
  --title "fix: <short-description>" \
  --body "Closes #<issue-number>

## Summary
<Brief description of the fix>

## Verification
- [x] E2E test passes
- [x] BEFORE screenshot captured
- [x] AFTER screenshot captured" \
  --repo newtontech/ccstudy-top
```

### Add screenshots to PR comment:

Screenshots are pushed to a **temp branch** (not the fix branch) and posted as a PR comment:

```bash
bash .claude/tdd-e2e-pr-workflow/scripts/pr-comment-screenshots.sh \
  newtontech/ccstudy-top \
  <PR_NUMBER> \
  e2e-screenshots/
```

This script:
1. Pushes screenshots to `e2e-screenshots-<PR_NUM>` temp branch
2. Uses raw GitHub URLs from that branch
3. Posts a markdown table with before/after images via `gh pr comment`

**Do NOT** push screenshots to the fix branch. Keep the fix branch clean (source code only).

---

## Cleanup

After PR is merged, remove the worktree:

```bash
cd /home/yhm/desktop/code/ccstudy-top
git worktree remove .worktrees/fix/<slug>
git branch -d fix/<slug>
```

---

## Quick Reference

```bash
# Select an issue
gh issue list --repo newtontech/ccstudy-top --state open --json number,title

# Create worktree
git worktree add .worktrees/fix/<slug> -b fix/<slug>
cd .worktrees/fix/<slug>
npm install

# Build and serve
npm run build:local
node scripts/dev-server.mjs local &
sleep 2

# Set screenshot dir
export E2E_SCREENSHOT_DIR="$(pwd)/e2e-screenshots"

# Run E2E test
npx playwright test e2e/<test-file>.spec.ts

# Push and create PR
git push origin fix/<slug>
gh pr create --title "fix: ..." --body "Closes #N" --repo newtontech/ccstudy-top
```

---

## Project-Specific Notes

### Static Export Routing

This site uses `output: 'export'` in Next.js. All routes become `.html` files:
- `/` -> `out/index.html`
- `/about` -> `out/about.html`
- `/assistant` -> `out/assistant.html`
- `/404` -> `out/404.html`

E2E tests must navigate to these `.html` paths. There is no Next.js server-side routing in E2E tests.

### Theme System

The site uses CSS variables for theming via `next-themes`. To test dark mode:

```typescript
// Emulate dark mode
await page.emulateMedia({ colorScheme: 'dark' });
await page.goto("/index.html");
```

### Animation Considerations

The site uses Framer Motion animations. Screenshots may capture mid-animation states. Either:
- Wait longer: `await page.waitForTimeout(2000)`
- Or check for specific animation-complete indicators in the DOM

### Tailwind v4

This project uses Tailwind CSS v4 (`@tailwindcss/postcss`). Class names may differ from v3. Always check the actual rendered output rather than assuming class names from Tailwind docs.

---

## Constraints

- **One issue at a time** -- complete one PR before starting the next
- BEFORE and AFTER must BOTH exist before PR -- hard gate, no exceptions
- Screenshots save to worktree via `E2E_SCREENSHOT_DIR`, never to main repo or fix branch
- Always study existing E2E tests first
- Must build (`npm run build:local`) before running E2E tests -- there is no live dev server for Playwright
- Test MUST pass before PR -- never create PR with failing tests
- `screenshot-reporter.ts` must be copied to each worktree's `e2e/` directory
- Use `build:local` for E2E (no basePath), not `build:github` (has basePath complicating URLs)
