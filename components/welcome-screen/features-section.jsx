"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, MessageSquareText, BarChart3, ShieldCheck } from "lucide-react";
import { GlowingText } from "./glowing-text";

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const features = [
    {
      icon: MessageSquareText,
      title: "Real-Time Sentiment Detection",
      description:
        "Every message is analyzed for emotional tone, helping you understand the conversation dynamics.",
      color: "from-purple-600 to-blue-600",
      delay: 0.2,
    },
    {
      icon: Brain,
      title: "Smart Response Suggestions",
      description:
        "Got into an argument? We suggest calming replies to help de-escalate and improve communication.",
      color: "from-pink-600 to-purple-600",
      delay: 0.4,
    },
    {
      icon: BarChart3,
      title: "Mood-Based Chat Summaries",
      description:
        "Get daily insights based on emotional dynamics, helping you track and improve your communication patterns.",
      color: "from-blue-600 to-cyan-600",
      delay: 0.6,
    },
    {
      icon: ShieldCheck,
      title: "Privacy Focused",
      description:
        "We never store your messages. Your emotions, your data. Everything is processed securely in real-time.",
      color: "from-cyan-600 to-teal-600",
      delay: 0.8,
    },
  ];

  return (
    <section
      id="features"
      ref={ref}
      className="relative overflow-hidden px-4 py-24 sm:py-32"
    >
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-4 py-1.5 text-sm font-medium text-purple-400">
              Features
            </span>
            <GlowingText
              as="h2"
              className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              glowColor="rgba(168, 85, 247, 0.4)"
            >
              Elevate Your Conversations
            </GlowingText>
            <p className="text-lg text-foreground/70">
              Discover how SemanticChat transforms everyday communication with
              AI-powered insights.
            </p>
          </motion.div>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              isInView={isInView}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  isInView,
  delay,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-black/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
    >
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"></div>

      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} p-2 text-white shadow-lg`}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-foreground/70">{description}</p>

      {/* Hover effect */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full"></div>
    </motion.div>
  );
}
