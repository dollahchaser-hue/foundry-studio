import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HorizontalProjects } from "@/components/HorizontalProjects";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { TechMarquee, StatsMarquee, Marquee } from "@/components/Marquee";
import { CursorBlob } from "@/components/CursorBlob";
import { Preloader } from "@/components/Preloader";
import { GradientMeshCSS } from "@/components/GradientMesh";

export default function Home() {
  return (
    <main className="min-h-screen relative">
      {/* Preloader */}
      <Preloader />

      {/* Custom cursor blob */}
      <CursorBlob />

      {/* Global gradient mesh background */}
      <div className="fixed inset-0 z-0">
        <GradientMeshCSS />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />

        {/* Tech stack marquee */}
        <TechMarquee className="border-y border-[var(--card-border)] bg-[var(--background)]/80 backdrop-blur-sm" />

        <Services />

        {/* Stats section */}
        <div className="px-6 bg-[var(--background)]/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto">
            <StatsMarquee />
          </div>
        </div>

        {/* Horizontal scroll projects */}
        <HorizontalProjects />

        {/* Brand marquee */}
        <div className="py-16 overflow-hidden bg-[var(--background)]/80 backdrop-blur-sm">
          <Marquee
            items={[
              "MVP Development",
              "Trading Platforms",
              "AI Automation",
              "Full-Stack Apps",
              "FinTech Solutions",
            ]}
            speed={40}
          />
        </div>

        <Testimonials />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
