"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { t, locale, toggleLocale } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/architecture", label: t.nav.architecture },
    { href: "/tools", label: t.nav.tools },
    { href: "/commands", label: t.nav.commands },
    { href: "/ink", label: t.nav.ink },
    { href: "/plugins", label: t.nav.plugins },
  ];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0a0a1a]/90 border-b border-transparent dark:border-transparent dark:shadow-[0_1px_12px_rgba(124,58,237,0.15)]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          CCStudy
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive
                    ? "text-[var(--accent-purple)] dark:text-[#a78bfa] bg-[var(--accent-purple)]/5 dark:bg-[#a78bfa]/10"
                    : "text-[var(--text-secondary)] dark:text-[#cbd5e1] hover:text-[var(--accent-purple)] dark:hover:text-[#a78bfa] hover:bg-[var(--card-border)]/50 dark:hover:bg-white/5"
                  }
                `}
              >
                {link.label}
                {/* Active indicator - gradient underline */}
                {isActive && mounted && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side: language toggle + theme toggle + mobile menu button */}
        <div className="flex items-center gap-2">
          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            className="px-2.5 py-1 rounded-lg text-xs font-bold hover:bg-[var(--card-border)] transition-colors border border-[var(--card-border)] text-[var(--text-primary)] dark:text-[#e2e8f0]"
            aria-label="Toggle language"
          >
            {locale === "zh" ? "EN" : "中"}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-[var(--card-border)] transition-colors text-[var(--text-primary)] dark:text-[#e2e8f0]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[var(--card-border)] transition-colors text-[var(--text-primary)] dark:text-[#e2e8f0]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[var(--card-border)] bg-white/95 dark:bg-[#0a0a1a]/95 backdrop-blur-md">
          <div className="px-4 py-3 flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    px-3 py-2 rounded-lg transition-colors text-sm font-medium
                    ${isActive
                      ? "text-[var(--accent-purple)] dark:text-[#a78bfa] bg-[var(--accent-purple)]/5 dark:bg-[#a78bfa]/10"
                      : "text-[var(--text-secondary)] dark:text-[#cbd5e1] hover:text-[var(--accent-purple)] dark:hover:text-[#a78bfa]"
                    }
                  `}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
