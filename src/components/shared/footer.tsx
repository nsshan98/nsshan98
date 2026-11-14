"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUp, Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950/80 backdrop-blur-md border-t border-slate-850 text-slate-400 py-6 border-slate-800">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm">
          {/* Left: Brand & Legal */}
          <div className="flex items-center gap-2 text-slate-400">
            <span>© {new Date().getFullYear()} Nazmus Sakib</span>
            <span className="text-slate-600">·</span>
            <Link
              href="/privacy"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              Privacy &amp; Terms
            </Link>
          </div>

          {/* Center: Status indicator */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Available for projects</span>
          </div>

          {/* Right: Socials & Back-to-top */}
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/nsshan98"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com/in/nsshan98"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://twitter.com/nsshan98"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <Twitter className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:hello@bysakib.com"
              aria-label="Send Email"
              className="h-8 w-8 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
            </a>

            <div className="h-4 w-px bg-slate-800 mx-1" />

            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="h-8 w-8 p-0 border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            >
              <ArrowUp className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
