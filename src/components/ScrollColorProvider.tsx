"use client";

import { useEffect } from "react";

export function ScrollColorProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      // Hue shifts from 210 (blue) through the spectrum as you scroll
      // 210 -> 260 (purple) -> 310 (pink) -> 360/0 (red) -> 30 (orange) -> 60 (yellow) -> 120 (green) -> 180 (cyan) -> 210
      // We'll do a partial shift: 210 -> 280 (blue to purple/violet)
      const hue = 210 + scrollPercent * 70;
      document.documentElement.style.setProperty("--accent-h", hue.toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <>{children}</>;
}
