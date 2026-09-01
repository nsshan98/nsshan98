"use client"

import { useEffect, useState } from "react"
import Navbar from "@/components/shared/navbar"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Download } from 'lucide-react';

// Custom high-quality SVG social icons
const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg preserveAspectRatio="xMidYMid" viewBox="0 0 256 256" {...props}><path d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453" fill="#0A66C2" /></svg>
)

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 1024 1024" fill="none" {...props}><path fillRule="evenodd" clipRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" transform="scale(64)" fill="#ffff" /></svg>
)

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="none" viewBox="0 0 360 362" {...props}><path fill="#25D366" fillRule="evenodd" d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z" clipRule="evenodd" /></svg>
)

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 49.4 512 399.42" {...props}><g fill="none" fillRule="evenodd"><g fillRule="nonzero"><path fill="#4285f4" d="M34.91 448.818h81.454V251L0 163.727V413.91c0 19.287 15.622 34.91 34.91 34.91z" /><path fill="#34a853" d="M395.636 448.818h81.455c19.287 0 34.909-15.622 34.909-34.909V163.727L395.636 251z" /><path fill="#fbbc04" d="M395.636 99.727V251L512 163.727v-46.545c0-43.142-49.25-67.782-83.782-41.891z" /></g><path fill="#ea4335" d="M116.364 251V99.727L256 204.455 395.636 99.727V251L256 355.727z" /><path fill="#c5221f" fillRule="nonzero" d="M0 117.182v46.545L116.364 251V99.727L83.782 75.291C49.25 49.4 0 74.04 0 117.18z" /></g></svg>
)

const socialLogos = [
  { name: "LinkedIn", icon: LinkedInIcon, url: "https://www.linkedin.com/in/nsshan98/", color: "#0077B5", showInHero: true, showInFloating: true },
  { name: "GitHub", icon: GitHubIcon, url: "https://github.com/nsshan98/", color: "#FFFFFF", showInHero: true, showInFloating: false },
  { name: "WhatsApp", icon: WhatsAppIcon, url: "https://wa.me/8801923248529", color: "#25D366", showInHero: true, showInFloating: true },
  { name: "Email", icon: MailIcon, url: "mailto:hello@bysakib.com", color: "#EA4335", showInHero: true, showInFloating: false },
]

const HeroSection = () => {
  const [showFloatingSocials, setShowFloatingSocials] = useState(false)

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isPast = window.scrollY > 400;
          setShowFloatingSocials((prev) => (prev !== isPast ? isPast : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div id="home" className="relative w-full overflow-hidden bg-black" style={{ minHeight: '100vh' }}>
      {/* Image positioned on the right side */}
      <div className="absolute top-0 right-0 bottom-0 w-full lg:w-[65%]">
        <Image
          src="/me.jpeg"
          alt="Nazmus Sakib"
          fill
          priority
          fetchPriority="high"
          className="object-cover"
          sizes="(max-width: 1023px) 100vw, 65vw"
        />
        {/* Overlay: uniform dark on mobile, left-to-right gradient on desktop */}
        <div className="absolute inset-0 bg-black/60 lg:bg-transparent" />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: `
              linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 15%, rgba(0,0,0,0.1) 40%, transparent 60%),
              linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 25%)
            `
          }}
        />
      </div>

      <Navbar />

      {/* Hero Content */}
      <section className="relative z-10 flex items-center" style={{ minHeight: '100vh' }}>
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-32">
          <div className="max-w-xl space-y-8">
            {/* Badge */}
            <div className="flex items-center gap-2 animate-fade-in">
              <span className="text-lg opacity-80">🏆</span>
              <span
                className="text-sm tracking-widest uppercase text-white/70 font-light"
                style={{ letterSpacing: '0.15em' }}
              >
                Your Frontend Development Partner
              </span>
              <span className="text-lg opacity-80">🏆</span>
            </div>

            {/* Main Heading */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight"
            >
              Code that ships.
              <br />
              Design that
              <br />
              endures.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-md font-light">
              Frontend developer for enterprises, founders and startups.
              I transform complexity into elegant, performant interfaces.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button variant="outline" asChild>
                <a
                  href="/Nazmus_Sakib_CV.pdf"
                  download="Nazmus_Sakib_CV.pdf"
                >
                  <Download />
                  Download CV
                </a>
              </Button>
              <Button variant="default" asChild>
                <Link
                  href="#portfolio"
                >
                  Explore projects
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Social Logos Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-10">
          <div className="flex items-center gap-8">
            {socialLogos.filter(s => s.showInHero).map((social, i) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="transition-all duration-500 hover:scale-110"
                  style={{
                    animationDelay: `${i * 100}ms`,
                    color: `${social.color}bb` // slightly desaturated at bottom bar
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = social.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = `${social.color}bb`;
                  }}
                  title={social.name}
                >
                  <IconComponent className="w-6 h-6" />
                </a>
              )
            })}
          </div>
        </div>
      </div>

      {/* Floating Vertical Socials Bar (Middle Right) */}
      <div
        className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4 transition-all duration-500 md:flex ${showFloatingSocials ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10 pointer-events-none"
          }`}
      >
        {socialLogos.filter(s => s.showInFloating).map((social) => {
          const IconComponent = social.icon
          return (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-zinc-950/80 border transition-all duration-300 hover:scale-110 shadow-lg shadow-black/40 backdrop-blur-sm group"
              style={{
                borderColor: `${social.color}30`,
                color: social.color,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = social.color;
                e.currentTarget.style.boxShadow = `0 0 15px ${social.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${social.color}30`;
                e.currentTarget.style.boxShadow = "none";
              }}
              title={social.name}
            >
              <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            </a>
          )
        })}
      </div>

      {/* Subtle rounded corners container */}
      <div className="absolute inset-2 sm:inset-4 rounded-2xl sm:rounded-3xl pointer-events-none border border-white/5" />
    </div>
  )
}

export default HeroSection