"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDownToDot, ArrowRight } from "lucide-react";
import { GlowingText } from "./glowing-text";
import { useRouter } from "next/navigation";
export function HeroSection() {
  const ref = useRef(null);
  const router = useRouter();
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-32 text-center md:py-40"
    >
      {/* Animated gradient orb */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 max-w-4xl"
      >
        <GlowingText
          as="h1"
          className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          glowColor="rgba(168, 85, 247, 0.4)"
        >
          Chat. Understand. Improve.
        </GlowingText>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-foreground/80 sm:text-xl"
        >
          SemanticChat uses emotional AI to analyze conversations in real time,
          helping you communicate more effectively and build stronger
          connections.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Button
            onClick={() => router.push("/login")}
            size="lg"
            className="group relative cursor-pointer overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-blue-500 px-8 py-6 text-lg font-medium text-white hover:from-purple-700 hover:to-blue-600"
          >
            <span className="relative z-10">Start the Conversation</span>
            <span className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 blur transition-opacity duration-300 group-hover:opacity-70"></span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {/* Floating chat bubbles */}
        <div className="absolute left-0 top-0 -z-10 h-full w-full">
          <FloatingBubble
            size={60}
            left="10%"
            top="20%"
            delay={0}
            color="rgba(168, 85, 247, 0.2)"
          />
          <FloatingBubble
            size={40}
            left="80%"
            top="15%"
            delay={1.5}
            color="rgba(59, 130, 246, 0.2)"
          />
          <FloatingBubble
            size={30}
            left="20%"
            top="70%"
            delay={1}
            color="rgba(236, 72, 153, 0.2)"
          />
          <FloatingBubble
            size={50}
            left="75%"
            top="60%"
            delay={0.5}
            color="rgba(6, 182, 212, 0.2)"
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="mb-2 text-sm text-foreground/60">
            Scroll to explore
          </span>
          <div className="h-4 w-4 rounded-full border border-foreground/20 p-1">
            <div className="flex h-2 w-2 items-center justify-center animate-bounce rounded-full bg-foreground/60">
              {" "}
              <ArrowDownToDot className="  " />{" "}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FloatingBubble({ size, left, top, delay, color }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [1, 1.1, 1],
        y: [0, -15, 0],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        left,
        top,
        backgroundColor: color,
        filter: "blur(8px)",
      }}
    />
  );
}
