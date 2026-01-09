"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({
  items,
  speed = 30,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-8 text-2xl md:text-4xl font-semibold text-[var(--foreground)] opacity-20 hover:opacity-60 transition-opacity"
          >
            <span>{item}</span>
            <span className="text-[var(--accent)]">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Tech stack marquee with icons
export function TechMarquee({
  speed = 25,
  className = "",
}: {
  speed?: number;
  className?: string;
}) {
  const techs = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Redis",
    "AWS",
    "Tailwind",
    "Framer Motion",
  ];

  const duplicatedTechs = [...techs, ...techs, ...techs];

  return (
    <div className={`overflow-hidden py-8 ${className}`}>
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedTechs.map((tech, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 py-3 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)] transition-colors group"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] group-hover:scale-125 transition-transform" />
            <span className="text-sm font-medium text-[var(--foreground-secondary)] group-hover:text-[var(--foreground)] transition-colors">
              {tech}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Stats marquee
export function StatsMarquee({ className = "" }: { className?: string }) {
  const stats = [
    { value: "50+", label: "Projects Delivered" },
    { value: "98%", label: "Client Satisfaction" },
    { value: "24h", label: "Average Response" },
    { value: "5+", label: "Years Experience" },
  ];

  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-[var(--card-border)] ${className}`}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-bold text-[var(--accent)] mb-2">
            {stat.value}
          </div>
          <div className="text-sm text-[var(--foreground-secondary)]">
            {stat.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
