"use client";
import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "SHOW ALL",
  "FRONTEND & WEB APPS",
  "DEVELOPER TOOLS",
  "FULL-STACK",
  "PACKAGES",
];

const projects = [
  {
    id: 1,
    title: "Bikroy+",
    subTitle: "High-performance POS, sales, and order management.",
    description:
      "Full-stack POS and inventory solution with a responsive Next.js frontend, complex form validations (Zod), and real-time inventory management.",
    technologies: ["Next.js", "React Hook Form", "Zod", "Material UI", "Node.js"],
    image: "/bikroy+.png",
    externalLink: "https://bikroyplus.com/",
    categories: ["FRONTEND & WEB APPS", "FULL-STACK"],
  },
  {
    id: 2,
    title: "PdfGini",
    subTitle: "Client-side & cloud document processing suite.",
    description:
      "Fast browser-based PDF utility with an intuitive client-side UI to merge, split, compress, and convert PDF documents seamlessly.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
    image: "/pdfgini.png",
    externalLink: "http://pdfgini.com/",
    categories: ["DEVELOPER TOOLS", "FRONTEND & WEB APPS"],
  },
  {
    id: 3,
    title: "Intelens",
    subTitle: "Interactive expense tracking & financial analytics.",
    description:
      "Interactive financial dashboard featuring responsive data visualization, budget management, and seamless client-side state handling.",
    technologies: ["Next.js", "React Hook Form", "Zod", "Material UI"],
    image: "/intelens.png",
    externalLink: "https://www.intelens.xyz/",
    categories: ["FRONTEND & WEB APPS", "FULL-STACK"],
  },
  {
    id: 4,
    title: "Next.js Starter",
    subTitle: "Production-ready frontend architecture boilerplate.",
    description:
      "Opinionated Next.js template engineered with TypeScript, Tailwind CSS, Shadcn UI, and performance-first best practices.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
      "Material UI",
    ],
    image: "/nextjs-starter.png",
    externalLink: "https://www.npmjs.com/package/create-my-next-starter",
    githubLink: "https://github.com/nsshan98/create-my-next-starter",
    categories: ["PACKAGES", "FRONTEND & WEB APPS"],
  },
  {
    id: 5,
    title: "eMistribd",
    subTitle: "On-demand online service provider platform.",
    description:
      "Responsive booking platform connecting customers with service professionals, featuring smooth booking flows and clean UI/UX.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    image: "/emistribd.png",
    externalLink: "https://emistribd.com",
    categories: ["FRONTEND & WEB APPS", "FULL-STACK"],
  },
  {
    id: 6,
    title: "Esheba",
    subTitle: "Multi-vendor cleaning & home service marketplace.",
    description:
      "Modern web application offering seamless service discovery, scheduled booking flows, and accessible component architecture.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Shadcn UI",
    ],
    image: "/eshebabd.png",
    externalLink: "https://eshebabd.com",
    categories: ["FRONTEND & WEB APPS", "FULL-STACK"],
  },
];

export default function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("SHOW ALL");

  const filteredProjects =
    activeTab === "SHOW ALL"
      ? projects
      : projects.filter((project) =>
        project.categories.some(
          (cat) => cat.toUpperCase() === activeTab.toUpperCase()
        )
      );

  return (
    <section className="bg-slate-900/50 backdrop-blur-sm py-20 px-6 relative" id="portfolio">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A showcase of recent work, highlighting responsive frontend architectures, client performance, and resilient full-stack systems.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={cn(
                "px-8 py-2 border transition-all duration-300 text-sm font-medium",
                activeTab === category
                  ? "bg-cyan-500 text-slate-950 font-semibold border-cyan-500"
                  : "bg-slate-800/80 text-slate-200 border-slate-700 hover:border-cyan-400 hover:text-cyan-300"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-t-lg aspect-video">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-slate-900/60 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-4">
                  <div className="flex gap-3">
                    {project.externalLink && (
                      <a
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title}`}
                        className="p-2 bg-cyan-600 rounded-full text-white hover:bg-cyan-500 transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.title} on GitHub`}
                        className="p-2 bg-slate-700 rounded-full text-white hover:bg-slate-600 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-8 border border-t-0 border-slate-700/50 bg-slate-800/80 backdrop-blur-sm rounded-b-lg transition-colors duration-300 group-hover:bg-cyan-600">
                <h3 className="text-xl font-bold mb-1 text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm font-medium text-cyan-400 mb-3 group-hover:text-white transition-colors">
                  {project.subTitle}
                </p>
                <p className="text-sm text-slate-400 mb-4 line-clamp-2 group-hover:text-white/90 transition-colors">
                  {project.description}
                </p>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider group-hover:text-white/70 transition-colors">
                  {project.categories.join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
