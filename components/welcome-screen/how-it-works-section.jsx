"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GlowingText } from "./glowing-text";
import { MessageSquare, Brain, Lightbulb } from "lucide-react";

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const steps = [
    {
      icon: MessageSquare,
      title: "Start chatting",
      description:
        "Begin a conversation just like you normally would. Our platform works seamlessly in the background.",
      color: "from-purple-600 to-blue-600",
      delay: 0.2,
    },
    {
      icon: Brain,
      title: "AI monitors sentiment",
      description:
        "Our advanced AI analyzes the emotional tone of each message in real-time, detecting nuances in communication.",
      color: "from-blue-600 to-cyan-600",
      delay: 0.4,
    },
    {
      icon: Lightbulb,
      title: "Get real-time nudges and suggestions",
      description:
        "Receive helpful insights and alternative phrasing options to improve your communication.",
      color: "from-cyan-600 to-teal-600",
      delay: 0.6,
    },
  ];

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-background to-background/95 px-4 py-24 sm:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15),transparent_50%)]" />

      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
              How It Works
            </span>
            <GlowingText
              as="h2"
              className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              glowColor="rgba(59, 130, 246, 0.4)"
            >
              Simple. Powerful. Intuitive.
            </GlowingText>
            <p className="text-lg text-foreground/70">
              SemanticChat works behind the scenes to enhance your conversations
              without getting in the way.
            </p>
          </motion.div>
        </div>

        <div className="relative mt-16">
          {/* Timeline connector */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-cyan-500/50 md:block"></div>

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => (
              <TimelineStep
                key={index}
                icon={step.icon}
                title={step.title}
                description={step.description}
                color={step.color}
                isInView={isInView}
                delay={step.delay}
                isLeft={index % 2 === 0}
                stepNumber={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({
  icon: Icon,
  title,
  description,
  color,
  isInView,
  delay,
  isLeft,
  stepNumber,
}) {
  return (
    <div className="relative">
      {/* Step number for mobile */}
      <div className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-background text-lg font-bold md:hidden">
        {stepNumber}
      </div>

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={
          isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }
        }
        transition={{ duration: 0.6, delay }}
        className={`relative mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm md:ml-auto md:mr-auto md:max-w-md md:items-start ${
          isLeft ? "md:mr-[calc(50%+2rem)]" : "md:ml-[calc(50%+2rem)]"
        }`}
      >
        {/* Timeline dot */}
        <div className="absolute left-1/2 top-0 hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-background bg-gradient-to-br from-purple-500 to-blue-500 md:flex">
          {stepNumber}
        </div>

        <div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} p-2 text-white shadow-lg`}
        >
          <Icon className="h-6 w-6" />
        </div>

        <h3 className="mb-2 text-center text-xl font-semibold md:text-left">
          {title}
        </h3>
        <p className="text-center text-foreground/70 md:text-left">
          {description}
        </p>
      </motion.div>
    </div>
  );
}
