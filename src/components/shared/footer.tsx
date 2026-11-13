"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, ArrowUp, Github, Linkedin, Twitter, Mail, ShieldCheck, Rss, FileText } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-950/80 backdrop-blur-md border-t border-slate-800 text-slate-400">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800/80">
          {/* Col 1: Bio */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="inline-block text-xl font-bold text-white hover:text-cyan-400 transition-colors">
              Nazmus Sakib
            </Link>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Full-Stack Software Engineer & Architect specializing in backend architecture, PostgreSQL performance, Next.js applications, and privacy-first browser developer tools.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/nsshan98"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="h-9 w-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/nsshan98"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="h-9 w-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/nsshan98"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter Profile"
                className="h-9 w-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="mailto:hello@bysakib.com"
                aria-label="Send Email"
                className="h-9 w-9 rounded-lg border border-slate-800 bg-slate-900/60 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-cyan-400 transition-colors">Case Studies</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-cyan-400 transition-colors">Technical Blog</Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-cyan-400 transition-colors">Developer Tools</Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Machine Feeds */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                  <span>Privacy & Terms</span>
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5 text-slate-400" />
                  <span>Sitemap XML</span>
                </a>
              </li>
              <li>
                <a href="/feed.xml" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <Rss className="h-3.5 w-3.5 text-amber-400" />
                  <span>RSS Feed</span>
                </a>
              </li>
              <li>
                <a href="/llms.txt" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5">
                  <span className="font-mono text-xs text-cyan-400 font-bold">llms</span>
                  <span>llms.txt (AI context)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Nazmus Sakib. Crafted with clean architecture &</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current animate-pulse" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Available for engineering projects</span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="p-2 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-400 transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="sr-only">Back to top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
