"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useState, useEffect } from "react";

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.8)"]
  );
  const backgroundColorDark = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0,0,0,0)", "rgba(0,0,0,0.8)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          hasScrolled ? "backdrop-blur-xl" : ""
        }`}
        style={{
          backgroundColor:
            theme === "dark" ? backgroundColorDark : backgroundColor,
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="text-xl font-semibold tracking-tight relative group"
            whileHover={{ scale: 1.02 }}
          >
            Foundry
            <span className="text-[var(--accent)]">.</span>
            <motion.span
              className="absolute -bottom-1 left-0 h-[2px] bg-[var(--accent)]"
              initial={{ width: 0 }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition-colors relative group"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                {item.label}
                <motion.span
                  className="absolute -bottom-1 left-0 h-[1px] bg-[var(--accent)]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}

            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[var(--card-bg)] transition-all relative overflow-hidden"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "light" ? (
                  <Moon size={20} className="text-[var(--foreground-secondary)]" />
                ) : (
                  <Sun size={20} className="text-[var(--foreground-secondary)]" />
                )}
              </motion.div>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-40 bg-[var(--background)] md:hidden"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="text-3xl font-semibold"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isOpen ? 1 : 0,
                y: isOpen ? 0 : 20,
              }}
              transition={{ delay: index * 0.1 }}
            >
              {item.label}
            </motion.a>
          ))}

          <motion.button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className="flex items-center gap-2 text-lg text-[var(--foreground-secondary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ delay: 0.3 }}
          >
            {theme === "light" ? (
              <>
                <Moon size={20} /> Dark mode
              </>
            ) : (
              <>
                <Sun size={20} /> Light mode
              </>
            )}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
