"use client";

import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import { SplitText } from "./SplitText";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/dollahchaser-hue",
      label: "GitHub",
    },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="py-20 px-6 border-t border-[var(--card-border)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)] opacity-[0.02] rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left side - CTA */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-semibold mb-6"
            >
              Ready to start
              <br />
              <span className="text-[var(--foreground-secondary)]">
                your project?
              </span>
            </motion.h3>

            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 text-[var(--accent)] font-medium group"
            >
              Get in touch
              <ArrowUpRight
                size={20}
                className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              />
            </motion.a>
          </div>

          {/* Right side - Links */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-[var(--foreground-secondary)] mb-4"
              >
                Navigation
              </motion.p>
              <ul className="space-y-3">
                {["Services", "Work", "Contact"].map((item, index) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                    >
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-sm text-[var(--foreground-secondary)] mb-4"
              >
                Connect
              </motion.p>
              <ul className="space-y-3">
                {socialLinks.map((link, index) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors"
                    >
                      <link.icon size={16} />
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[var(--card-border)] flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a href="#" className="text-2xl font-semibold tracking-tight">
              Foundry<span className="text-[var(--accent)]">.</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm text-[var(--foreground-secondary)]"
          >
            © {currentYear} Foundry Studio. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
