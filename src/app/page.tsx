import { HeroSection } from "@/components/HeroSection";
import { SectionTitle } from "@/components/SectionTitle";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ArchitectureMap, FeatureGrid } from "@/components/ClientComponents";

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="max-w-7xl mx-auto px-4 py-20">
        <ScrollReveal>
          <SectionTitle
            title="架构全景"
            subtitle="点击节点探索 Claude Code 的核心模块"
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
