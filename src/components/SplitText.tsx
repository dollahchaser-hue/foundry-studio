"use client";

import { motion, Variants, TargetAndTransition } from "framer-motion";
import { useRef } from "react";

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  staggerDelay?: number;
  animation?: "fadeUp" | "fadeIn" | "blur" | "scale" | "slideUp";
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const animations: Record<string, { hidden: TargetAndTransition; visible: TargetAndTransition }> = {
  fadeUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideUp: {
    hidden: { opacity: 0, y: "100%" },
    visible: { opacity: 1, y: "0%" },
  },
};

export function SplitText({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.03,
  animation = "fadeUp",
  once = true,
  as: Component = "span",
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const words = children.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay * 3,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const charVariants: Variants = {
    hidden: animations[animation].hidden,
    visible: {
      ...animations[animation].visible,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={containerVariants}
      className={`inline ${className}`}
      aria-label={children}
    >
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          variants={wordVariants}
          className="inline-block whitespace-nowrap"
        >
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={charVariants}
              className="inline-block"
              style={{ willChange: "transform, opacity, filter" }}
            >
              {char}
            </motion.span>
          ))}
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </motion.span>
      ))}
    </motion.div>
  );
}

// Simpler word-by-word split for subtitles
export function SplitWords({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  staggerDelay = 0.1,
  once = true,
}: Omit<SplitTextProps, "animation" | "as">) {
  const words = children.split(" ");

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={containerVariants}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="inline-block"
          style={{ willChange: "transform, opacity, filter" }}
        >
          {word}
          {index < words.length - 1 && <>&nbsp;</>}
        </motion.span>
      ))}
    </motion.span>
  );
}
