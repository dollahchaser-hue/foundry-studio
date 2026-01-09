"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { Code2, Rocket, LineChart, Bot } from "lucide-react";
import { useRef } from "react";
import { RevealMask, LineReveal } from "./RevealMask";
import { ScrollRevealText } from "./ParallaxSection";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "End-to-end web and mobile applications built with modern technologies. React, Next.js, Node.js, and more.",
    number: "01",
  },
  {
    icon: Rocket,
    title: "MVP Development",
    description:
      "Launch fast with a polished minimum viable product. We help startups validate ideas and get to market quickly.",
    number: "02",
  },
  {
    icon: LineChart,
    title: "Trading & FinTech",
    description:
      "Custom trading platforms, financial analysis tools, and payment systems built for performance and reliability.",
    number: "03",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Intelligent bots, automated workflows, and AI integrations that save time and scale your operations.",
    number: "04",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function Services() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section id="services" ref={containerRef} className="py-32 px-6 relative overflow-hidden">
      {/* Parallax background element */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.02] rounded-full blur-[120px] pointer-events-none"
        style={{ y: backgroundY }}
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header with reveal */}
        <div className="mb-20">
          <RevealMask direction="up" delay={0}>
            <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-4 font-medium">
              What we do
            </p>
          </RevealMask>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            <RevealMask direction="up" delay={0.1}>
              Services built for
            </RevealMask>
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--foreground-secondary)]">
            <RevealMask direction="up" delay={0.2}>
              ambitious teams
            </RevealMask>
          </h2>
        </div>

        {/* Services grid with stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-0 border-t border-[var(--card-border)]"
        >
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`group p-8 md:p-12 border-b border-[var(--card-border)] ${
        index % 2 === 0 ? "md:border-r" : ""
      } hover:bg-[var(--card-bg)] transition-colors duration-500`}
    >
      <div className="flex items-start justify-between mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
          style={{ background: "var(--accent-light)" }}
        >
          <service.icon size={26} style={{ color: "var(--accent)" }} />
        </div>
        <span className="text-6xl font-bold text-[var(--card-border)] group-hover:text-[var(--accent)] transition-colors duration-500">
          {service.number}
        </span>
      </div>

      <h3 className="text-2xl font-semibold mb-4 group-hover:text-[var(--accent)] transition-colors duration-300">
        {service.title}
      </h3>

      <p className="text-[var(--foreground-secondary)] leading-relaxed">
        {service.description}
      </p>

      {/* Animated underline on hover */}
      <div className="mt-6 h-[2px] bg-[var(--card-border)] relative overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-[var(--accent)]"
          initial={{ width: "0%" }}
          whileInView={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.4 }}
        />
      </div>
    </motion.div>
  );
}
