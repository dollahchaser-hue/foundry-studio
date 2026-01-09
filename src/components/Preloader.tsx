"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 70 ? 3 : prev < 90 ? 2 : 1;
        return Math.min(prev + increment, 100);
      });
    }, 30);

    // Hide preloader after progress completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--background)]"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] },
          }}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full"
              style={{
                background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
                opacity: 0.1,
                filter: "blur(80px)",
              }}
              animate={{
                x: ["-30%", "30%", "-30%"],
                y: ["-30%", "30%", "-30%"],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Logo animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 text-center"
          >
            {/* Logo text with reveal */}
            <div className="overflow-hidden mb-8">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.77, 0, 0.175, 1] }}
                className="text-4xl md:text-6xl font-semibold tracking-tight"
              >
                Foundry
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-[var(--accent)]"
                >
                  .
                </motion.span>
              </motion.h1>
            </div>

            {/* Tagline with letter animation */}
            <div className="overflow-hidden mb-12">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.77, 0, 0.175, 1] }}
                className="text-[var(--foreground-secondary)] text-sm tracking-widest uppercase"
              >
                You imagine. We build.
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-48 mx-auto">
              <div className="flex justify-between text-xs text-[var(--foreground-secondary)] mb-2">
                <span>Loading</span>
                <span>{progress}%</span>
              </div>
              <div className="h-[2px] bg-[var(--card-border)] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[var(--accent)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 text-xs text-[var(--foreground-secondary)] tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            STUDIO
          </motion.div>
          <motion.div
            className="absolute bottom-8 right-8 text-xs text-[var(--foreground-secondary)] tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            © 2024
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Alternative minimal preloader
export function MinimalPreloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--background)]"
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <motion.div
            className="w-12 h-12 rounded-full border-2 border-[var(--card-border)] border-t-[var(--accent)]"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
