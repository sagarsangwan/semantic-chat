"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlowingText } from "./glowing-text";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function CtaSection() {
  const ref = useRef(null);
  const router = useRouter();
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section ref={ref} className="relative overflow-hidden px-4 py-24 sm:py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8 }}
        className="container"
      >
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-purple-900/40 via-black/50 to-blue-900/40 p-8 backdrop-blur-md sm:p-12 md:p-16">
          {/* Animated gradient background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-purple-500/10 blur-3xl"></div>
            <div className="absolute -bottom-1/4 -right-1/4 h-[500px] w-[500px] animate-pulse rounded-full bg-blue-500/10 blur-3xl"></div>
          </div>

          <div className="relative z-10 text-center">
            <GlowingText
              as="h2"
              className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              glowColor="rgba(168, 85, 247, 0.4)"
            >
              Let your conversations evolve.
            </GlowingText>

            <p className="mx-auto mb-8 max-w-2xl text-lg text-foreground/80">
              Join thousands of users who are already experiencing the future of
              communication. Start your journey with SemanticChat today.
            </p>

            <Button
              size="lg"
              onClick={() => router.push("/login")}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-6 text-lg font-medium text-white hover:from-purple-700 hover:to-blue-600"
            >
              <span className="relative z-10">Sign In to Try Now</span>
              <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 blur transition-opacity duration-300 group-hover:opacity-70"></span>
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
