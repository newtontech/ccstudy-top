"use client";

import { useLanguage } from "@/i18n/LanguageContext";
import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ArchitectureMap, FeatureGrid } from "@/components/ClientComponents";
import { LearningPath } from "@/components/LearningPath";
import { Glossary } from "@/components/Glossary";

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <HeroSection />

      {/* Learning Paths */}
      <LearningPath />

      {/* Architecture Map */}
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

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <FeatureGrid />
      </section>

      {/* Glossary */}
      <Glossary />
    </>
  );
}
