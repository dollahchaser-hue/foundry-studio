"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glareOpacity?: number;
}

export function TiltCard({
  children,
  className = "",
  tiltAmount = 10,
  glareOpacity = 0.15,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 30, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [0, 1], [tiltAmount, -tiltAmount]);
  const rotateY = useTransform(springX, [0, 1], [-tiltAmount, tiltAmount]);

  // Glare effect
  const glareX = useTransform(springX, [0, 1], ["-100%", "100%"]);
  const glareY = useTransform(springY, [0, 1], ["-100%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width;
    const normalizedY = (e.clientY - rect.top) / rect.height;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative ${className}`}
    >
      {children}
      {/* Glare overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
        style={{ transform: "translateZ(1px)" }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,${glareOpacity}) 0%, transparent 50%)`,
            x: glareX,
            y: glareY,
            width: "200%",
            height: "200%",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
