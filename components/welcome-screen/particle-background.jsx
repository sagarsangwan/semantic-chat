"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        color: getRandomColor(),
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    function getRandomColor() {
      const isDarkMode = document.documentElement.classList.contains("dark");

      const darkColors = [
        "rgba(168, 85, 247, 0.5)", // Purple
        "rgba(59, 130, 246, 0.5)", // Blue
        "rgba(236, 72, 153, 0.5)", // Pink
        "rgba(6, 182, 212, 0.5)", // Cyan
      ];

      const lightColors = [
        "rgba(168, 85, 247, 0.3)", // Purple (lighter)
        "rgba(59, 130, 246, 0.3)", // Blue (lighter)
        "rgba(236, 72, 153, 0.3)", // Pink (lighter)
        "rgba(6, 182, 212, 0.3)", // Cyan (lighter)
      ];

      const colors = isDarkMode ? darkColors : lightColors;
      return colors[Math.floor(Math.random() * colors.length)];
    }

    // Animation loop
    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.fill();
      });

      // Draw connections
      ctx.globalAlpha = 0.2;
      const isDarkMode = document.documentElement.classList.contains("dark");
      ctx.strokeStyle = isDarkMode
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(0, 0, 0, 0.1)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="absolute inset-0 z-0"
    />
  );
}
