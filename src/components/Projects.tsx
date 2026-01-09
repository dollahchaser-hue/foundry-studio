"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { useRef } from "react";
import { TiltCard } from "./TiltCard";
import { RevealMask } from "./RevealMask";

const projects = [
  {
    title: "AlloyPulse",
    category: "FinTech Platform",
    description:
      "Multi-asset trading analysis platform with technical and fundamental analysis for Forex, Crypto, and Precious Metals. Real-time confluence signals for smarter trading decisions.",
    tags: ["TypeScript", "Python", "Real-time Data", "Analytics"],
    color: "#3B82F6",
    featured: true,
  },
  {
    title: "BuilderSell",
    category: "Marketplace",
    description:
      "A marketplace connecting builders who can't sell with sellers who can't build. Bridging the gap between technical talent and business expertise.",
    tags: ["TypeScript", "Next.js", "Marketplace", "Payments"],
    color: "#8B5CF6",
    featured: true,
  },
  {
    title: "Crypto Rage Bot",
    category: "AI Automation",
    description:
      "AI-powered crypto Twitter persona with automated engagement. Integrates TwitterAPI, OpenRouter, and CoinGecko.",
    tags: ["TypeScript", "AI", "Twitter API", "CoinGecko"],
    color: "#EC4899",
    featured: false,
  },
  {
    title: "Payment System",
    category: "FinTech",
    description:
      "Secure payment processing system with modern architecture. Built for reliability and seamless transactions.",
    tags: ["TypeScript", "Payments", "Security", "API"],
    color: "#10B981",
    featured: false,
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const featuredProjects = projects.filter((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundX = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="projects"
      ref={containerRef}
      className="py-32 px-6 bg-[var(--card-bg)] relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          x: backgroundX,
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
          opacity: 0.03,
        }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="mb-20">
          <RevealMask direction="up" delay={0}>
            <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-4 font-medium">
              Selected work
            </p>
          </RevealMask>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            <RevealMask direction="up" delay={0.1}>
              Projects that
            </RevealMask>
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--foreground-secondary)]">
            <RevealMask direction="up" delay={0.2}>
              speak for themselves
            </RevealMask>
          </h2>
        </div>

        {/* Featured Projects */}
        <div className="space-y-8 mb-16">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <SmallProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <TiltCard
        className={`card overflow-hidden flex flex-col ${
          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        }`}
        tiltAmount={5}
        glareOpacity={0.1}
      >
        {/* Image placeholder with gradient */}
        <div
          className="md:w-1/2 h-72 md:h-auto min-h-[300px] relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${project.color}15 0%, ${project.color}05 100%)`,
          }}
        >
          {/* Animated gradient orb */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${project.color}30 0%, transparent 70%)`,
              y,
            }}
            initial={{ x: "-50%", y: "-50%" }}
          />

          {/* Project initial */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="text-[12rem] font-bold opacity-10"
              style={{ color: project.color }}
            >
              {project.title.charAt(0)}
            </span>
          </div>

          {/* Floating tag */}
          <div className="absolute top-6 left-6">
            <span
              className="px-3 py-1 rounded-full text-xs font-medium text-white"
              style={{ background: project.color }}
            >
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl font-semibold mb-4 group">
              {project.title}
              <motion.span
                className="inline-block ml-2 opacity-0 group-hover:opacity-100"
                whileHover={{ x: 5 }}
              >
                <ArrowUpRight size={24} style={{ color: project.color }} />
              </motion.span>
            </h3>

            <p className="text-[var(--foreground-secondary)] mb-8 leading-relaxed text-lg">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm px-4 py-2 rounded-full border border-[var(--card-border)] text-[var(--foreground-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

function SmallProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <TiltCard
        className="card p-8 h-full group cursor-pointer"
        tiltAmount={8}
        glareOpacity={0.08}
      >
        <div className="flex items-start justify-between mb-6">
          <span
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{
              background: `${project.color}15`,
              color: project.color,
            }}
          >
            {project.category}
          </span>
          <motion.div
            className="text-[var(--foreground-secondary)] group-hover:text-[var(--accent)]"
            whileHover={{ rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <ExternalLink size={20} />
          </motion.div>
        </div>

        <h3 className="text-2xl font-semibold mb-3 group-hover:text-[var(--accent)] transition-colors">
          {project.title}
        </h3>

        <p className="text-[var(--foreground-secondary)] text-sm mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-3 py-1 rounded-full bg-[var(--background)] text-[var(--foreground-secondary)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </TiltCard>
    </motion.div>
  );
}
