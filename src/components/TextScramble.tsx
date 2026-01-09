"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

interface TextScrambleProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

export function TextScramble({
  children,
  className = "",
  delay = 0,
  duration = 1.5,
  once = true,
}: TextScrambleProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [displayText, setDisplayText] = useState(children);
  const [isAnimating, setIsAnimating] = useState(false);

  const scramble = useCallback(() => {
    const originalText = children;
    const length = originalText.length;
    const totalFrames = Math.floor(duration * 60); // 60fps
    let frame = 0;

    setIsAnimating(true);

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;

      let result = "";
      for (let i = 0; i < length; i++) {
        const charProgress = progress * length;

        if (i < charProgress - 2) {
          // Revealed character
          result += originalText[i];
        } else if (i < charProgress) {
          // Currently scrambling
          result += chars[Math.floor(Math.random() * chars.length)];
        } else {
          // Not yet reached - show random or space
          if (originalText[i] === " ") {
            result += " ";
          } else {
            result += chars[Math.floor(Math.random() * chars.length)];
          }
        }
      }

      setDisplayText(result);

      if (frame < totalFrames) {
        requestAnimationFrame(animate);
      } else {
        setDisplayText(originalText);
        setIsAnimating(false);
      }
    };

    // Start with all scrambled
    let initial = "";
    for (let i = 0; i < length; i++) {
      if (originalText[i] === " ") {
        initial += " ";
      } else {
        initial += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    setDisplayText(initial);

    requestAnimationFrame(animate);
  }, [children, duration]);

  useEffect(() => {
    if (isInView && !isAnimating) {
      const timer = setTimeout(() => {
        scramble();
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, delay, scramble, isAnimating]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block font-mono ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
}

// Typewriter effect alternative
export function Typewriter({
  children,
  className = "",
  delay = 0,
  speed = 50, // ms per character
  once = true,
}: {
  children: string;
  className?: string;
  delay?: number;
  speed?: number;
  once?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (!isInView) return;

    const timer = setTimeout(() => {
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText(children.slice(0, index + 1));
        index++;
        if (index >= children.length) {
          clearInterval(interval);
          // Hide cursor after typing complete
          setTimeout(() => setShowCursor(false), 1000);
        }
      }, speed);

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(timer);
  }, [isInView, children, delay, speed]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {showCursor && isInView && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-[2px] h-[1em] bg-[var(--accent)] ml-1 align-middle"
        />
      )}
    </span>
  );
}

// Text reveal with highlight effect
export function TextHighlight({
  children,
  className = "",
  delay = 0,
}: {
  children: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <motion.span
        className="absolute inset-0 bg-[var(--accent)]"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: [0, 1, 1, 0] } : { scaleX: 0 }}
        transition={{
          duration: 1,
          delay,
          times: [0, 0.4, 0.6, 1],
          ease: [0.77, 0, 0.175, 1],
        }}
        style={{ originX: 0 }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.01, delay: delay + 0.4 }}
      >
        {children}
      </motion.span>
    </span>
  );
}
