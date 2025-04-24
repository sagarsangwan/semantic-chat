"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { ModeToggle } from "@/components/ui/theme-toggle";
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/80 backdrop-blur-lg shadow-md"
          : "bg-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
              <div className="absolute h-8 w-8 animate-ping rounded-full bg-purple-500 opacity-20"></div>
              <span className="text-lg font-bold text-white">S</span>
            </div>
          </motion.div>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl font-bold tracking-tight"
          >
            SemanticChat
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-6">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#how-it-works">How It Works</NavLink>
          <NavLink href="#testimonials">Testimonials</NavLink>
          <NavLink href="#pricing">Pricing</NavLink>
          <ModeToggle />
        </nav>

        <div className="hidden md:flex md:items-center md:gap-4">
          {/* <Link href="/login"> */}
          <Button
            variant="ghost"
            className="text-foreground/80 hover:text-foreground"
          >
            <Link
              className="text-foreground/80 hover:text-foreground"
              href="/login"
            >
              Log In
            </Link>
          </Button>
          {/* </Link> */}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="container border-t border-border/10 bg-background/95 backdrop-blur-lg md:hidden"
        >
          <nav className="flex flex-col py-4">
            <MobileNavLink
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </MobileNavLink>
            <MobileNavLink
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </MobileNavLink>
            <MobileNavLink
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </MobileNavLink>
            <MobileNavLink
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </MobileNavLink>
            <div className="mt-4 flex flex-col gap-2 px-4">
              <Button variant="outline" className="w-full justify-center">
                Log In
              </Button>
              <Button className="w-full justify-center bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600">
                Sign Up
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link
      href={href}
      className="border-b border-border/10 px-4 py-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
