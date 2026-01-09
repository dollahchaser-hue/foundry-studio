"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { Code2, Rocket, LineChart, Bot, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import { RevealMask } from "./RevealMask";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "End-to-end web and mobile applications built with modern technologies.",
    details: ["React & Next.js", "Node.js & Python", "PostgreSQL & Redis", "AWS & Vercel"],
    color: "#3B82F6",
  },
  {
    icon: Rocket,
    title: "MVP Development",
    description: "Launch fast with a polished minimum viable product.",
    details: ["4-8 week delivery", "Scalable architecture", "Investor ready"],
    color: "#8B5CF6",
  },
  {
    icon: LineChart,
    title: "Trading & FinTech",
    description: "Custom trading platforms and financial analysis tools.",
    details: ["Real-time data", "Secure payments", "Compliance ready"],
    color: "#10B981",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description: "Intelligent bots and automated workflows that scale.",
    details: ["Custom AI models", "API integrations", "24/7 automation"],
    color: "#EC4899",
  },
];

export function Services() {
  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[var(--background)]/90 backdrop-blur-sm" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <RevealMask direction="up" delay={0}>
              <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-4 font-medium flex items-center gap-2">
                <Sparkles size={16} />
                What we do
              </p>
            </RevealMask>

            <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
              <RevealMask direction="up" delay={0.1}>
                Services
              </RevealMask>
            </h2>
          </div>

          <RevealMask direction="up" delay={0.2}>
            <p className="text-[var(--foreground-secondary)] max-w-md text-lg">
              We deliver exceptional digital products with cutting-edge technology
              and obsessive attention to detail.
            </p>
          </RevealMask>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for gradient
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  // Smooth spring for gradient position
  const springX = useSpring(mouseX, { damping: 30, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 30, stiffness: 200 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
    >
      {/* Card container */}
      <div
        className="relative h-full rounded-3xl overflow-hidden transition-all duration-500 min-h-[280px]"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--card-border)",
        }}
      >
        {/* Animated gradient on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${springX.get()}px ${springY.get()}px, ${service.color}15, transparent 40%)`,
          }}
        />

        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${service.color}30, transparent 50%, ${service.color}20)`,
            padding: "1px",
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            maskComposite: "xor",
            WebkitMaskComposite: "xor",
          }}
        />

        {/* Content */}
        <div className="relative h-full p-6 md:p-8 flex flex-col">
          {/* Icon */}
          <motion.div
            className="relative"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden"
              style={{ background: `${service.color}15` }}
            >
              {/* Icon glow on hover */}
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                style={{
                  background: `radial-gradient(circle, ${service.color}30 0%, transparent 70%)`,
                }}
              />
              <service.icon
                size={26}
                style={{ color: service.color }}
                className="relative z-10"
              />
            </div>

            {/* Floating particles on hover */}
            {isHovered && (
              <>
                <motion.div
                  className="absolute w-1 h-1 rounded-full"
                  style={{ background: service.color }}
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [20, 35, 50],
                    y: [20, 5, -10],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <motion.div
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{ background: service.color }}
                  initial={{ opacity: 0, x: 25, y: 25 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: [25, 45, 60],
                    y: [25, 15, 5],
                  }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                />
              </>
            )}
          </motion.div>

          {/* Title and description */}
          <div className="mt-6">
            <motion.h3
              className="text-xl md:text-2xl font-semibold mb-3 transition-colors"
              style={{
                color: isHovered ? service.color : "var(--foreground)",
              }}
            >
              {service.title}
            </motion.h3>

            <p className="text-[var(--foreground-secondary)] leading-relaxed mb-4">
              {service.description}
            </p>

            {/* Details tags - always visible */}
            <div className="flex flex-wrap gap-2">
              {service.details.map((detail, i) => (
                <motion.span
                  key={detail}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + i * 0.05 }}
                  className="text-xs px-3 py-1.5 rounded-full border border-[var(--card-border)] text-[var(--foreground-secondary)] transition-colors duration-300"
                  style={{
                    borderColor: isHovered ? `${service.color}40` : undefined,
                    color: isHovered ? service.color : undefined,
                  }}
                >
                  {detail}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
