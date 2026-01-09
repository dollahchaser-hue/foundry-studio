"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TextScramble } from "./TextScramble";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  // Glow position for mouse-following gradient
  const glowX = useSpring(useMotionValue(50), { damping: 30, stiffness: 200 });
  const glowY = useSpring(useMotionValue(50), { damping: 30, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalized mouse position (-0.5 to 0.5)
      const normalizedX = (e.clientX - centerX) / rect.width;
      const normalizedY = (e.clientY - centerY) / rect.height;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);

      // Glow follows mouse (0-100 percentage)
      const glowPosX = ((e.clientX - rect.left) / rect.width) * 100;
      const glowPosY = ((e.clientY - rect.top) / rect.height) * 100;
      glowX.set(glowPosX);
      glowY.set(glowPosY);

      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, glowX, glowY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 overflow-hidden"
    >
      {/* Animated gradient background that follows mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          background: `radial-gradient(circle at ${glowX.get()}% ${glowY.get()}%, var(--accent) 0%, transparent 50%)`,
        }}
      />

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            opacity: 0.05,
            filter: "blur(60px)",
          }}
          animate={{
            x: ["-20%", "20%", "-20%"],
            y: ["-20%", "30%", "-20%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
            opacity: 0.03,
            filter: "blur(80px)",
          }}
          animate={{
            x: ["20%", "-20%", "20%"],
            y: ["20%", "-20%", "20%"],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main content with 3D tilt */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          perspective: 1000,
        }}
        className="text-center max-w-5xl relative z-10"
      >
        {/* Eyebrow text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-sm text-[var(--foreground-secondary)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
            Available for new projects
          </span>
        </motion.div>

        {/* Main headline with scramble effect */}
        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-semibold tracking-tight mb-2 leading-[1.05]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="block"
          >
            <TextScramble delay={0.5} duration={1.2} className="font-semibold tracking-tight font-sans">
              You imagine.
            </TextScramble>
          </motion.span>
        </h1>

        <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-semibold tracking-tight mb-8 leading-[1.05]">
          <motion.span
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="block text-[var(--accent)]"
          >
            <TextScramble delay={0.8} duration={1.2} className="font-semibold tracking-tight font-sans">
              We build.
            </TextScramble>
          </motion.span>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-lg md:text-xl text-[var(--foreground-secondary)] max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          We craft exceptional digital products for ambitious startups and
          forward-thinking businesses. From MVPs to complex trading platforms.
        </motion.p>

        {/* CTA Buttons with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ transform: "translateZ(50px)" }}
        >
          <MagneticButton
            as="a"
            href="#contact"
            className="btn-accent px-8 py-4 text-base inline-block cursor-hover"
            strength={0.3}
          >
            Start a project
          </MagneticButton>
          <MagneticButton
            as="a"
            href="#projects"
            className="btn-secondary px-8 py-4 text-base inline-block cursor-hover"
            strength={0.3}
          >
            View our work
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-widest text-[var(--foreground-secondary)]">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--foreground-secondary)] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
