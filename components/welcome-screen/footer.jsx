"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  MessageSquare,
  Heart,
  Shield,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-background/95 px-4 py-12 backdrop-blur-md">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500">
                <span className="text-lg font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                SemanticChat
              </span>
            </Link>
            <p className="mb-4 text-foreground/70">
              Revolutionizing communication with AI-powered emotional
              intelligence.
            </p>
            <div className="flex gap-4">
              <SocialButton icon={Twitter} label="Twitter" />
              <SocialButton icon={Instagram} label="Instagram" />
              <SocialButton icon={Linkedin} label="LinkedIn" />
              <SocialButton icon={Github} label="GitHub" />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Product</h3>
            <ul className="space-y-2">
              <FooterLink href="#features">Features</FooterLink>
              <FooterLink href="#how-it-works">How It Works</FooterLink>
              <FooterLink href="#pricing">Pricing</FooterLink>
              <FooterLink href="#faq">FAQ</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#about">About Us</FooterLink>
              <FooterLink href="#careers">Careers</FooterLink>
              <FooterLink href="#blog">Blog</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="#terms">Terms of Service</FooterLink>
              <FooterLink href="#privacy">Privacy Policy</FooterLink>
              <FooterLink href="#cookies">Cookie Policy</FooterLink>
              <FooterLink href="#compliance">Compliance</FooterLink>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-center text-sm text-foreground/60 md:text-left">
            &copy; {currentYear} SemanticChat. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            <FeatureBadge icon={MessageSquare} text="Real-time Analysis" />
            <FeatureBadge icon={Heart} text="Emotion AI" />
            <FeatureBadge icon={Shield} text="Privacy First" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({ icon: Icon, label }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className="h-9 w-9 rounded-full border-white/10 bg-black/20 backdrop-blur-sm hover:bg-black/30"
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </Button>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        className="text-foreground/70 transition-colors hover:text-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

function FeatureBadge({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-xs text-foreground/70">
      <Icon className="h-3.5 w-3.5" />
      <span>{text}</span>
    </div>
  );
}
