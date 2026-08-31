import type { Metadata } from "next";
import HeroSection from "@/features/home/components/hero-section";
import AboutSection from "@/features/home/components/about-section";
import SkillsSection from "@/features/home/components/skills-section";
import PortfolioSection from "@/features/home/components/portfolio-section";
import ExperienceSection from "@/features/home/components/experience-section";
import EducationSection from "@/features/home/components/eduction-section";
import ContactSection from "@/features/home/components/contact-section";
import Footer from "@/components/shared/footer";
import { SITE_URL } from "@/lib/blog/metadata";

export const metadata: Metadata = {
  title: "Nazmus Sakib — Full-Stack Software Engineer & System Architect",
  description:
    "Explore the portfolio, engineering projects, skills, backend architecture experience, and browser-based developer tools by Nazmus Sakib.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "Nazmus Sakib — Full-Stack Software Engineer",
    description:
      "Explore the portfolio, engineering projects, backend architecture experience, and browser-based developer tools by Nazmus Sakib.",
    url: SITE_URL,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/about-me.png`,
        width: 1200,
        height: 630,
        alt: "Nazmus Sakib — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nazmus Sakib — Full-Stack Software Engineer",
    description:
      "Portfolio, engineering projects, backend architecture experience, and developer tools by Nazmus Sakib.",
    images: [`${SITE_URL}/about-me.png`],
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-800 relative overflow-hidden">
      {/* Interactive animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 animate-pulse opacity-50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 via-transparent to-blue-900/10"></div>

      {/* Floating interactive elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute top-60 right-20 w-24 h-24 bg-blue-500/5 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-emerald-500/5 rounded-full blur-xl animate-bounce delay-1000"></div>

      {/* Content with relative positioning */}
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <PortfolioSection />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
