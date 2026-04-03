import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

interface CodeBlockProps {
  code: string;
  language: string;
  highlights?: number[];
  filename?: string;
}

export async function CodeBlock({
  code,
  language,
  highlights,
  filename,
}: CodeBlockProps) {
  let html: string;

  try {
    html = await codeToHtml(code, {
      lang: language,
      theme: "github-dark",
    });
  } catch {
    // Fallback: render as plain text if language is not supported
    html = `<pre><code>${code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")}</code></pre>`;
  }

  // Apply line highlights by adding background to highlighted lines
  if (highlights && highlights.length > 0) {
    const lines = html.split("\n");
    const highlightedLines = lines.map((line, index) => {
      if (highlights.includes(index + 1)) {
        return line.replace(
          /class="line"/,
          'class="line" style="background: rgba(139, 92, 246, 0.15);"'
        );
      }
      return line;
    });
    html = highlightedLines.join("\n");
  }

  return (
    <div className="relative rounded-xl border border-[var(--card-border)] overflow-hidden my-4">
      {/* Header bar with filename */}
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-gray-700/50 text-sm text-gray-400">
          <span className="font-[family-name:var(--font-mono)]">{filename}</span>
        </div>
      )}

      {/* Code content */}
      <div className="relative">
        <div
          className="overflow-x-auto text-sm [&_pre]:!p-4 [&_pre]:!m-0 [&_pre]:!bg-[#0d1117] [&_pre]:!rounded-none [&_code]:font-[family-name:var(--font-mono)]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <CopyButton text={code} />
      </div>
    </div>
  );
}
