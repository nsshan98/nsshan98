"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

const menuItems = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about-me" },
  { label: "Services", href: "/#services" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "Tools", href: "/tools" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;      
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 sm:px-6",
          isScrolled
            ? "bg-transparent sm:bg-slate-700 border-blue-400/50 sm:backdrop-blur-md sm:rounded-4xl sm:shadow-lg py-2 sm:py-3 sm:w-2/3 mx-auto"
            : "bg-transparent py-4 sm:py-6"
        )}
      >
        <div className="w-full flex justify-end sm:justify-center items-center relative">
          {/* Desktop Navigation */}
          <ul
            className={cn(
              "hidden md:flex transition-all duration-500 ease-in-out",
              isScrolled ? "space-x-4 md:space-x-6" : "space-x-8 md:space-x-12"
            )}
          >
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={cn(
                    "relative font-medium text-amber-50 transition-all duration-300 ease-in-out  hover:text-cyan-400 group",
                    isScrolled
                      ? "text-sm text-white py-2 px-3 rounded-md hover:bg-accent hover:text-black"
                      : "text-base md:text-lg py-3 px-4"
                  )}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                  }}
                >
                  {item.label}

                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all duration-300",
                      isScrolled
                        ? "w-0 group-hover:w-full"
                        : "w-full transform scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:bg-cyan-400/10 hover:text-cyan-400 transition-all duration-300 hover:scale-110"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`text-white text-right h-6 w-6 absolute transition-all duration-300 ${
                    isMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />
                <X
                  className={`text-white h-6 w-6 absolute transition-all duration-300 ${
                    isMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                  }`}
                />
              </div>
            </Button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-20 left-4 right-4 bg-card/95 backdrop-blur-md rounded-lg shadow-xl border transform transition-all duration-300 ${
            isMenuOpen
              ? "translate-y-0 opacity-100 scale-100"
              : "-translate-y-4 opacity-0 scale-95"
          }`}
        >
          <nav className="flex flex-col p-6 gap-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-muted-foreground hover:text-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 py-3 px-4 rounded-lg border-b border-border/50 hover:border-cyan-400/30 last:border-b-0"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
