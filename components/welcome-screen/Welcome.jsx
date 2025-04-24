"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ParticleBackground } from "./particle-background";
import { Navbar } from "./navbar";
import { HeroSection } from "./hero-section";
import { FeaturesSection } from "./features-section";
import { HowItWorksSection } from "./how-it-works-section";
import { TestimonialsSection } from "./testimonials-section";
import { CtaSection } from "./cta-section";
import { Footer } from "./footer";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
function Welcome() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <main className=" relative min-h-screen overflow-hidden bg-gradient-to-b from-background/95 via-background to-background/95 flex justify-center items-center">
      {/* Particle background */}
      {/* Particle background */}
      {mounted && (
        <div className="fixed inset-0 z-0">
          <ParticleBackground />
        </div>
      )}
      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <motion.div style={{ opacity, scale }}>
          <HeroSection />
        </motion.div>

        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <CtaSection />
        <Footer />
      </div>
    </main>
  );
}

export default Welcome;
