"use client";

import { motion, Variants } from "framer-motion";
import { Quote } from "lucide-react";
import { RevealMask } from "./RevealMask";
import { TiltCard } from "./TiltCard";

const testimonials = [
  {
    quote:
      "Foundry Studio delivered our MVP in record time. The quality exceeded our expectations and helped us secure our seed round.",
    author: "Sarah Chen",
    role: "Founder & CEO",
    company: "TechStart",
    avatar: "S",
  },
  {
    quote:
      "Their expertise in trading platforms is unmatched. The system they built handles thousands of transactions seamlessly.",
    author: "Michael Torres",
    role: "CTO",
    company: "FinanceFlow",
    avatar: "M",
  },
  {
    quote:
      "Professional, fast, and incredibly skilled. They understood our vision and made it even better than we imagined.",
    author: "Emily Roberts",
    role: "Product Manager",
    company: "DataDrive",
    avatar: "E",
  },
];

export function Testimonials() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[var(--accent)] opacity-[0.02] rounded-full blur-[100px] -translate-y-1/2" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="mb-20 text-center">
          <RevealMask direction="up" delay={0}>
            <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-4 font-medium">
              Testimonials
            </p>
          </RevealMask>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
            <RevealMask direction="up" delay={0.1}>
              Trusted by founders
            </RevealMask>
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>

        {/* Placeholder notice */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-[var(--foreground-secondary)] mt-12"
        >
          * Sample testimonials. Real client reviews coming soon.
        </motion.p>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: (typeof testimonials)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <TiltCard className="card p-8 h-full flex flex-col" tiltAmount={6}>
        <Quote size={32} className="text-[var(--accent)] opacity-30 mb-6" />

        <p className="text-[var(--foreground)] mb-8 flex-1 leading-relaxed text-lg">
          &ldquo;{testimonial.quote}&rdquo;
        </p>

        <div className="flex items-center gap-4 pt-6 border-t border-[var(--card-border)]">
          {/* Avatar */}
          <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center text-white font-semibold">
            {testimonial.avatar}
          </div>

          <div>
            <p className="font-semibold">{testimonial.author}</p>
            <p className="text-sm text-[var(--foreground-secondary)]">
              {testimonial.role} at{" "}
              <span className="text-[var(--accent)]">{testimonial.company}</span>
            </p>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}
