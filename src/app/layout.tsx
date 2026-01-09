import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollColorProvider } from "@/components/ScrollColorProvider";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Foundry Studio | You imagine. We build.",
  description: "We turn your vision into reality. Full-stack development, MVPs, trading platforms, and AI automation for startups and businesses.",
  keywords: ["web development", "MVP", "startup", "fintech", "trading platform", "AI automation", "full-stack"],
  authors: [{ name: "Foundry Studio" }],
  openGraph: {
    title: "Foundry Studio | You imagine. We build.",
    description: "We turn your vision into reality. Full-stack development, MVPs, trading platforms, and AI automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <ThemeProvider>
          <SmoothScroll>
            <ScrollColorProvider>
              {children}
            </ScrollColorProvider>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
