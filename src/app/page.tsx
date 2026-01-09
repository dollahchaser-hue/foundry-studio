import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HorizontalProjects } from "@/components/HorizontalProjects";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { TechMarquee, StatsMarquee, Marquee } from "@/components/Marquee";
import { CursorBlob } from "@/components/CursorBlob";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Custom cursor blob */}
      <CursorBlob />

      <Navigation />
      <Hero />

      {/* Tech stack marquee */}
      <TechMarquee className="border-y border-[var(--card-border)]" />

      <Services />

      {/* Stats section */}
      <div className="px-6">
        <div className="max-w-6xl mx-auto">
          <StatsMarquee />
        </div>
      </div>

      {/* Horizontal scroll projects */}
      <HorizontalProjects />

      {/* Brand marquee */}
      <div className="py-16 overflow-hidden">
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
    </main>
  );
}
