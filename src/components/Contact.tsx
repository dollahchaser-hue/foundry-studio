"use client";

import { motion } from "framer-motion";
import { Send, ArrowRight, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { RevealMask } from "./RevealMask";
import { MagneticButton } from "./MagneticButton";

export function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    project: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormState({ name: "", email: "", project: "", message: "" });
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" className="py-32 px-6 bg-[var(--card-bg)] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--accent)] opacity-[0.02] rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative">
        {/* Section header */}
        <div className="mb-20">
          <RevealMask direction="up" delay={0}>
            <p className="text-sm uppercase tracking-widest text-[var(--accent)] mb-4 font-medium">
              Get in touch
            </p>
          </RevealMask>

          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-6">
            <RevealMask direction="up" delay={0.1}>
              Let&apos;s create
            </RevealMask>
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[var(--foreground-secondary)]">
            <RevealMask direction="up" delay={0.2}>
              something amazing
            </RevealMask>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-8"
          >
            <p className="text-lg text-[var(--foreground-secondary)] leading-relaxed">
              Have a project in mind? We&apos;d love to hear about it. Send us a
              message and we&apos;ll get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <ContactItem
                icon={Mail}
                label="Email"
                value="hello@foundrystudio.com"
              />
              <ContactItem
                icon={MapPin}
                label="Location"
                value="Remote / Worldwide"
              />
              <ContactItem
                icon={Clock}
                label="Response time"
                value="Within 24 hours"
              />
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  label="Name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
                <FormField
                  label="Email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-[var(--foreground-secondary)]">
                  Project Type
                </label>
                <select
                  name="project"
                  value={formState.project}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-4 bg-[var(--background)] border border-[var(--card-border)] rounded-2xl text-[var(--foreground)] appearance-none cursor-pointer focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all"
                >
                  <option value="">Select a project type</option>
                  <option value="mvp">MVP Development</option>
                  <option value="fullstack">Full-Stack Application</option>
                  <option value="fintech">Trading / FinTech Platform</option>
                  <option value="automation">AI & Automation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3 text-[var(--foreground-secondary)]">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your project, goals, and timeline..."
                  className="w-full px-5 py-4 bg-[var(--background)] border border-[var(--card-border)] rounded-2xl text-[var(--foreground)] resize-none focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all"
                />
              </div>

              <div className="pt-4">
                <MagneticButton strength={0.15}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-accent w-full md:w-auto px-10 py-5 text-base flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        Message sent!
                        <ArrowRight size={20} />
                      </>
                    ) : (
                      <>
                        Send message
                        <Send size={20} />
                      </>
                    )}
                  </button>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="w-12 h-12 rounded-2xl bg-[var(--background)] border border-[var(--card-border)] flex items-center justify-center group-hover:border-[var(--accent)] transition-colors">
        <Icon size={20} className="text-[var(--accent)]" />
      </div>
      <div>
        <p className="text-sm text-[var(--foreground-secondary)] mb-1">
          {label}
        </p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-3 text-[var(--foreground-secondary)]">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full px-5 py-4 bg-[var(--background)] border border-[var(--card-border)] rounded-2xl text-[var(--foreground)] focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-light)] transition-all"
      />
    </div>
  );
}
