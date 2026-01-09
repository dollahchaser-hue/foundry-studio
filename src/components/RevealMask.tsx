"use client";

import { motion, Variants } from "framer-motion";

interface RevealMaskProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  duration?: number;
  once?: boolean;
}

export function RevealMask({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  once = true,
}: RevealMaskProps) {
  const getClipPath = () => {
    switch (direction) {
      case "left":
        return { hidden: "inset(0 100% 0 0)", visible: "inset(0 0% 0 0)" };
      case "right":
        return { hidden: "inset(0 0 0 100%)", visible: "inset(0 0 0 0%)" };
      case "up":
        return { hidden: "inset(100% 0 0 0)", visible: "inset(0% 0 0 0)" };
      case "down":
        return { hidden: "inset(0 0 100% 0)", visible: "inset(0 0 0% 0)" };
    }
  };

  const clipPaths = getClipPath();

  const variants: Variants = {
    hidden: {
      clipPath: clipPaths.hidden,
    },
    visible: {
      clipPath: clipPaths.visible,
      transition: {
        duration,
        ease: [0.77, 0, 0.175, 1],
        delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Line reveal - a line draws across then reveals content
export function LineReveal({
  children,
  className = "",
  delay = 0,
  lineColor = "var(--accent)",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  lineColor?: string;
}) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.6,
        ease: [0.77, 0, 0.175, 1],
      },
    },
  };

  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      className={className}
    >
      <motion.div
        variants={lineVariants}
        className="h-[2px] mb-4"
        style={{ backgroundColor: lineColor }}
      />
      <motion.div variants={contentVariants}>{children}</motion.div>
    </motion.div>
  );
}

// Counter animation
export function AnimatedCounter({
  value,
  duration = 2,
  className = "",
  suffix = "",
  prefix = "",
}: {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {prefix}
        <motion.span
          initial={{ opacity: 1 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          onViewportEnter={(entry) => {
            if (!entry) return;
            const target = entry.target as HTMLElement;
            let start = 0;
            const end = value;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / (duration * 1000), 1);

              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * end);

              target.textContent = current.toString();

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                target.textContent = end.toString();
              }
            };

            requestAnimationFrame(animate);
          }}
        >
          0
        </motion.span>
        {suffix}
      </motion.span>
    </motion.span>
  );
}
