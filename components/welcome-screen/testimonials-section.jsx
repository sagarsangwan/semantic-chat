"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { GlowingText } from "./glowing-text";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "SemanticChat has transformed how I communicate with my team. The sentiment analysis helps me ensure my messages are received as intended.",
      name: "Alex Johnson",
      title: "Product Manager",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "As someone who works remotely, clear communication is essential. This platform has helped me avoid misunderstandings and build stronger relationships with colleagues.",
      name: "Sarah Chen",
      title: "UX Designer",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    {
      quote:
        "The emotional insights have been eye-opening. I've become more aware of how my words affect others, which has improved both my professional and personal relationships.",
      name: "Michael Rodriguez",
      title: "Software Engineer",
      avatar: "/placeholder.svg?height=80&width=80",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative overflow-hidden px-4 py-24 sm:py-32"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(236,72,153,0.15),transparent_50%)]" />

      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-pink-500/10 to-purple-500/10 px-4 py-1.5 text-sm font-medium text-pink-400">
              Testimonials
            </span>
            <GlowingText
              as="h2"
              className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
              glowColor="rgba(236, 72, 153, 0.4)"
            >
              What Our Users Say
            </GlowingText>
            <p className="text-lg text-foreground/70">
              Discover how SemanticChat is changing the way people communicate.
            </p>
          </motion.div>
        </div>

        <div className="relative mt-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-black/30 p-8 backdrop-blur-sm md:p-12"
          >
            {/* Quote icon */}
            <div className="absolute right-8 top-8 text-purple-500/20">
              <Quote className="h-24 w-24" />
            </div>

            {/* Testimonial content */}
            <div className="relative z-10">
              <div className="min-h-[200px]">
                <motion.blockquote
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 text-xl font-medium italic text-foreground/90 md:text-2xl"
                >
                  "{testimonials[activeIndex].quote}"
                </motion.blockquote>
              </div>

              <div className="flex items-center">
                <Avatar className="h-12 w-12 border-2 border-purple-500/30">
                  <AvatarImage
                    src={testimonials[activeIndex].avatar || "/placeholder.svg"}
                    alt={testimonials[activeIndex].name}
                  />
                  <AvatarFallback>
                    {testimonials[activeIndex].name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-4">
                  <p className="font-semibold">
                    {testimonials[activeIndex].name}
                  </p>
                  <p className="text-sm text-foreground/70">
                    {testimonials[activeIndex].title}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full border-white/10 bg-black/30 backdrop-blur-sm hover:bg-black/50"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full border-white/10 bg-black/30 backdrop-blur-sm hover:bg-black/50"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>

          {/* Pagination dots */}
          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-purple-500 w-6"
                    : "bg-foreground/30 hover:bg-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
