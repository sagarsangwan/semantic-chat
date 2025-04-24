"use client";

import React from "react";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Update the GlowingText component to be theme-aware
export function GlowingText({
  as: Component = "div",
  children,
  className,
  glowColor = "rgba(168, 85, 247, 0.4)",
}) {
  const [mounted, setMounted] = React.useState(false);

  // After mounting, we can access the theme
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Component className={cn("relative", className)}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        {children}
      </motion.span>
      {mounted && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
          className="absolute left-0 top-0 -z-10 select-none blur-xl"
          style={{ color: glowColor }}
          aria-hidden="true"
        >
          {children}
        </motion.span>
      )}
    </Component>
  );
}
