"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { RevealMask } from "./RevealMask";

const projects = [
  {
    title: "AlloyPulse",
    category: "FinTech Platform",
    description:
      "Multi-asset trading analysis with real-time confluence signals for Forex, Crypto, and Precious Metals.",
    tags: ["TypeScript", "Python", "Real-time"],
    color: "#3B82F6",
    number: "01",
  },
  {
    title: "BuilderSell",
    category: "Marketplace",
    description:
      "Connecting builders who can't sell with sellers who can't build. Bridging talent and business.",
    tags: ["TypeScript", "Next.js", "Payments"],
    color: "#8B5CF6",
    number: "02",
  },
  {
    title: "Crypto Rage Bot",
    category: "AI Automation",
    description:
      "AI-powered crypto Twitter persona with automated engagement and market sentiment analysis.",
    tags: ["TypeScript", "AI", "Twitter API"],
    color: "#EC4899",
    number: "03",
  },
  {
    title: "Payment System",
    category: "FinTech",
    description:
      "Secure payment processing with modern architecture. Built for reliability and scale.",
    tags: ["TypeScript", "Security", "API"],
    color: "#10B981",
    number: "04",
  },
];

export function HorizontalProjects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal scroll based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Progress indicator
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative bg-[var(--card-bg)]"
      style={{ height: "400vh" }} // Creates scroll space
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 px-6 pt-20 pb-8">
          <div className="max-w-6xl mx-auto flex items-end justify-between">
            <div>
              <RevealMask direction="up" delay={0}>
                <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-2 font-medium">
                  Selected work
                </p>
              </RevealMask>
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">
                <RevealMask direction="up" delay={0.1}>
                  Featured Projects
                </RevealMask>
              </h2>
            </div>

            {/* Progress bar */}
            <div className="hidden md:block w-48">
              <div className="flex items-center justify-between text-sm text-[var(--foreground-secondary)] mb-2">
                <span>Scroll</span>
                <span>{projects.length} Projects</span>
              </div>
              <div className="h-[2px] bg-[var(--card-border)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal scroll content */}
        <div className="h-full flex items-center pt-32">
          <motion.div
            style={{ x }}
            className="flex gap-8 pl-6 md:pl-[calc((100vw-72rem)/2+1.5rem)]"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}

            {/* End card - CTA */}
            <div className="flex-shrink-0 w-[80vw] md:w-[500px] h-[60vh] flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-[var(--foreground-secondary)] mb-4">
                  Want to see more?
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-2xl font-semibold text-[var(--accent)] group"
                >
                  Let&apos;s talk
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Navigation hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-[var(--foreground-secondary)]"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Scroll to explore</span>
          <ArrowRight size={16} />
        </motion.div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex-shrink-0 w-[80vw] md:w-[600px] h-[60vh] md:h-[65vh] relative group"
    >
      <div
        className="h-full rounded-3xl overflow-hidden relative"
        style={{
          background: `linear-gradient(135deg, ${project.color}15 0%, var(--card-bg) 100%)`,
          border: `1px solid ${project.color}20`,
        }}
      >
        {/* Large number */}
        <div className="absolute top-6 right-6">
          <span
            className="text-[8rem] font-bold leading-none opacity-5"
            style={{ color: project.color }}
          >
            {project.number}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
          {/* Top */}
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-6"
              style={{ background: project.color }}
            >
              {project.category}
            </span>

            <h3 className="text-3xl md:text-5xl font-semibold mb-4">
              {project.title}
            </h3>

            <p className="text-[var(--foreground-secondary)] text-lg max-w-md leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Bottom */}
          <div className="flex items-end justify-between">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-4 py-2 rounded-full border border-[var(--card-border)] text-[var(--foreground-secondary)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 45 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: project.color }}
            >
              <ExternalLink size={24} className="text-white" />
            </motion.button>
          </div>
        </div>

        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.color}10 0%, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  );
}
