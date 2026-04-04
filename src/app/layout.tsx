import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "CCStudy.top - Claude Code 源码解读",
    template: "%s | CCStudy.top",
  },
  description: "生动形象的 Claude Code 源代码架构解读，带动画效果的交互式学习网站。深入探索 Anthropic 最强 AI 编程助手的 40+ 工具、40+ 命令、多智能体协调等核心模块。",
  keywords: ["Claude Code", "AI编程", "源码解读", "Anthropic", "TypeScript", "CLI", "AI Agent"],
  authors: [{ name: "CCStudy" }],
  openGraph: {
    title: "CCStudy.top - Claude Code 源码解读",
    description: "生动形象的 Claude Code 源代码架构解读",
    url: "https://ccstudy.top",
    siteName: "CCStudy.top",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CCStudy.top - Claude Code 源码解读",
    description: "生动形象的 Claude Code 源代码架构解读",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[family-name:var(--font-inter)] transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
