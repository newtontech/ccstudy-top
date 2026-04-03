export function Footer() {
  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--bg-secondary)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center gap-3 text-sm text-[var(--text-secondary)]">
        <p className="font-semibold text-[var(--text-primary)]">
          CCStudy.top - Claude Code 源码解读
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/newtontech/ccstudy-top"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--accent-purple)] transition-colors"
          >
            GitHub
          </a>
          <span>&copy; 2026</span>
        </div>
      </div>
    </footer>
  );
}
