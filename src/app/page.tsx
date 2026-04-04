"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ArchitectureMap, FeatureGrid } from "@/components/ClientComponents";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 py-20">
        <ScrollReveal>
          <SectionTitle
            title={t.home.architectureMap.title}
            subtitle={t.home.architectureMap.subtitle}
          />
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <ArchitectureMap />
        </ScrollReveal>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20">
        <FeatureGrid />
      </section>
    </>
  );
}
