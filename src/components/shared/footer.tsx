"use client";
import { Button } from "@/components/ui/button";
import { Heart, ArrowUp, Coffee } from "lucide-react";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-slate-900/50 backdrop-blur-sm border-t border-slate-700/50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto max-w-7xl px-4">
        {/* Bottom Footer */}
        <div className="py-6 border-t border-slate-700/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400 text-sm">
              <span>© Nazmus Sakib. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" />
              <span>and lots of</span>
              <Coffee className="w-4 h-4 text-red-400 fill-current animate-pulse" />

            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Available for freelance work</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={scrollToTop}
                className="p-2 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-400 transition-all duration-300 hover:scale-110"
              >
                <ArrowUp className="w-4 h-4" />
                <span className="sr-only">Back to top</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
