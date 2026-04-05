import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

/**
 * 全局检测：确保代码中不会出现未转义的 Unicode 转义序列
 * 如 \u{XXXX}、\uXXXX、\x{XX}、\xXX 等
 * 这些会导致页面显示为原始转义字符而非实际 emoji/符号
 */

// 递归获取目录下所有文件
function getAllFiles(dir: string, base = dir): string[] {
  const results: string[] = [];
  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // 跳过 node_modules、.next、out、.worktrees 等目录
      if (
        entry === "node_modules" ||
        entry === ".next" ||
        entry === "out" ||
        entry === ".worktrees" ||
        entry === ".git" ||
        entry === "dist" ||
        entry === "dist-preview" ||
        entry === "test-results"
      ) {
        continue;
      }
      results.push(...getAllFiles(fullPath, base));
    } else {
      const ext = extname(entry);
      // 只检查源码文件
      if (
        [".ts", ".tsx", ".js", ".jsx", ".md", ".mdx", ".json", ".css"].includes(ext)
      ) {
        results.push(fullPath);
      }
    }
  }

  return results;
}

// 检测文件中的 Unicode 转义序列
function findUnicodeEscapes(
  filePath: string
): { line: number; column: number; match: string; context: string }[] {
  const content = readFileSync(filePath, "utf-8");
  const results: { line: number; column: number; match: string; context: string }[] = [];

  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // 匹配 \u{XXXX} 格式（大括号形式）
    const bracePattern = /\\u\{[0-9a-fA-F]+\}/g;
    let match;
    while ((match = bracePattern.exec(line)) !== null) {
      results.push({
        line: lineNum,
        column: match.index + 1,
        match: match[0],
        context: line.trim(),
      });
    }

    // 匹配 \uXXXX 格式（4位十六进制，非大括号形式）
    // 但排除 package.json 等配置文件中的合法用法（如正则表达式中的 \u）
    const shortPattern = /\\u[0-9a-fA-F]{4}/g;
    while ((match = shortPattern.exec(line)) !== null) {
      results.push({
        line: lineNum,
        column: match.index + 1,
        match: match[0],
        context: line.trim(),
      });
    }
  }

  return results;
}

// 需要跳过的文件（包含合法的 Unicode 转义，如 package.json 的 name 字段等）
const SKIP_FILES: string[] = [];

// 需要跳过的路径前缀
const SKIP_PREFIXES: string[] = ["node_modules/", ".next/", "out/", "package-lock.json", "pnpm-lock.yaml"];

describe("No raw Unicode escape sequences in source code", () => {
  const srcDir = join(__dirname, "..", "src");
  const rootDir = join(__dirname, "..");
  const allFiles = [
    ...getAllFiles(srcDir),
    // 也检查根目录的配置文件
    ...getAllFiles(rootDir).filter(
      (f) => f.endsWith(".json") && !f.includes("node_modules") && !f.includes("lock")
    ),
  ];

  it("should not contain \\u{XXXX} or \\uXXXX escape sequences in .tsx/.ts files", () => {
    const sourceFiles = allFiles.filter((f) => f.endsWith(".ts") || f.endsWith(".tsx"));

    const violations: { file: string; line: number; column: number; match: string; context: string }[] = [];

    for (const file of sourceFiles) {
      const relativePath = file.replace(rootDir + "/", "");
      if (SKIP_FILES.includes(relativePath)) continue;
      if (SKIP_PREFIXES.some((p) => relativePath.startsWith(p))) continue;

      const escapes = findUnicodeEscapes(file);
      for (const esc of escapes) {
        violations.push({ file: relativePath, ...esc });
      }
    }

    if (violations.length > 0) {
      const report = violations
        .map((v) => `  ❌ ${v.file}:${v.line}:${v.column}\n     Found: ${v.match}\n     Line: ${v.context}`)
        .join("\n\n");
      expect.fail(
        `Found ${violations.length} Unicode escape sequence(s) in source code.\n\n${report}\n\n` +
          `These should be replaced with actual characters (emoji/symbols).\n` +
          `For example: \\u{1F680} → 🚀`
      );
    }
  });

  it("should not contain \\u{XXXX} in page content (.tsx files only)", () => {
    // 更严格的检查：只针对页面文件（用户可见内容）
    const pageFiles = allFiles.filter(
      (f) => f.includes("src/app/") && f.endsWith("page.tsx")
    );

    const violations: { file: string; line: number; match: string; context: string }[] = [];

    for (const file of pageFiles) {
      const relativePath = file.replace(rootDir + "/", "");
      const escapes = findUnicodeEscapes(file);
      for (const esc of escapes) {
        violations.push({ file: relativePath, line: esc.line, match: esc.match, context: esc.context });
      }
    }

    if (violations.length > 0) {
      const report = violations
        .map((v) => `  ❌ ${v.file}:${v.line}\n     Found: ${v.match}\n     Line: ${v.context}`)
        .join("\n\n");
      expect.fail(
        `Found ${violations.length} Unicode escape(s) in page content.\n\n${report}\n\n` +
          `Page files must use actual emoji/symbols, not escape sequences.`
      );
    }
  });

  it("should not contain \\u{XXXX} in component files", () => {
    const componentFiles = allFiles.filter(
      (f) => f.includes("src/components/") && (f.endsWith(".tsx") || f.endsWith(".ts"))
    );

    const violations: { file: string; line: number; match: string; context: string }[] = [];

    for (const file of componentFiles) {
      const relativePath = file.replace(rootDir + "/", "");
      const escapes = findUnicodeEscapes(file);
      for (const esc of escapes) {
        violations.push({ file: relativePath, line: esc.line, match: esc.match, context: esc.context });
      }
    }

    if (violations.length > 0) {
      const report = violations
        .map((v) => `  ❌ ${v.file}:${v.line}\n     Found: ${v.match}\n     Line: ${v.context}`)
        .join("\n\n");
      expect.fail(
        `Found ${violations.length} Unicode escape(s) in component files.\n\n${report}\n\n` +
          `Components must use actual emoji/symbols, not escape sequences.`
      );
    }
  });
});
