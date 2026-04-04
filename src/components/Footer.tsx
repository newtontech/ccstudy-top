"use client";

import { useLanguage } from "@/i18n/LanguageContext";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--bg-secondary)] mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col items-center gap-3 text-sm text-[var(--text-secondary)]">
        <p className="font-semibold text-[var(--text-primary)]">
          {t.footer.title}
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
          <span>{t.footer.copyright}</span>
        </div>
      </div>
    </footer>
  );
}
