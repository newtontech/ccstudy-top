"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "./animations/ScrollReveal";
import { RelatedModules } from "./RelatedModules";
import { useLanguage } from "@/i18n/LanguageContext";

interface RelatedModule {
  title: string;
  href: string;
  description: string;
  icon: string;
}

interface ModuleLayoutProps {
  title: string;
  subtitle: string;
  icon: string;
  category: string;
  children: React.ReactNode;
  relatedModules: RelatedModule[];
}

export function ModuleLayout({
  title,
  subtitle,
  icon,
  category,
  children,
  relatedModules,
}: ModuleLayoutProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen">
      {/* Page header */}
      <div className="relative w-full overflow-hidden">
        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(37,99,235,0.08) 50%, rgba(6,182,212,0.06) 100%)",
          }}
        />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--text-primary) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 pt-8 pb-12">
          {/* Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <ol className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <li>
                <Link
                  href="/"
                  className="hover:text-[var(--accent-purple)] transition-colors"
                >
                  {t.layout.homeBreadcrumb}                </Link>
              </li>
              <li className="text-[var(--text-secondary)] opacity-50">/</li>
              <li>
                <span className="text-[var(--text-secondary)]">{category}</span>
              </li>
              <li className="text-[var(--text-secondary)] opacity-50">/</li>
              <li>
                <span className="text-[var(--text-primary)]">{title}</span>
              </li>
            </ol>
          </motion.nav>

          {/* Icon + Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <span className="text-5xl">{icon}</span>

            <div>
              <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-3">
                {title}
              </h1>
              <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
                {subtitle}
              </p>
            </div>

            {/* Category badge */}
            <div>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  color: "var(--accent-purple)",
                  borderColor: "var(--accent-purple)",
                  background: "rgba(124,58,237,0.1)",
                }}
              >
                {category}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="py-8">{children}</div>
        </ScrollReveal>

        {/* Related modules */}
        {relatedModules.length > 0 && (
          <ScrollReveal>
            <RelatedModules modules={relatedModules} />
          </ScrollReveal>
        )}

        {/* Bottom spacing */}
        <div className="h-16" />
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8,
          pointerEvents: showBackToTop ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="fixed bottom-8 right-8 z-50 w-10 h-10 rounded-full flex items-center justify-center shadow-lg border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text-primary)] hover:border-[var(--accent-purple)] transition-colors"
        aria-label="Back to top"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 12V4M4 8l4-4 4 4" />
        </svg>
      </motion.button>
    </div>
  );
}
