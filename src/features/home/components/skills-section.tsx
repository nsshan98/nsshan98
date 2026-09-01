"use client";

import { useState } from "react";
import {
  Javascript,
  TypescriptIcon,
  _React,
  NextjsIcon,
  ReactQuery,
  MaterialUi,
  RadixUi,
  TailwindIcon,
  NodejsIcon,
  Express,
  Nestjs,
  Swagger,
  Oauth,
  GitIcon,
  Figma,
  VercelIcon,
  MongodbIcon,
  Postgresql,
  VisualStudioCode,
  Postman,
  Firebase,
  Prisma,
  Redux,
} from "@dev.icons/react";

interface SkillItem {
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;         // Primary brand color, e.g. "#F7DF1E"
  bg: string;            // Specific bg color for normal state, e.g. "#F7DF1E15"
  hoverBg: string;       // Specific bg color for hover state, e.g. "#F7DF1E33"
  iconColor?: string;     // Specific color for the icon (optional)
  invertOnDark?: boolean; // Flip dark/black SVGs to light/white
}

const skillCategories = [
  {
    title: "Frontend",
    gridArea: "frontend",
    skills: [
      {
        name: "JavaScript",
        icon: Javascript,
        color: "#F7DF1E",
        bg: "#F7DF1E15",
        hoverBg: "#F7DF1E33"
      },
      {
        name: "TypeScript",
        icon: TypescriptIcon,
        color: "#3178C6",
        bg: "#3178C615",
        hoverBg: "#3178C633"
      },
      {
        name: "React",
        icon: _React,
        color: "#61DAFB",
        bg: "#61DAFB15",
        hoverBg: "#61DAFB33"
      },
      {
        name: "Next.js",
        icon: NextjsIcon,
        color: "#FFFFFF",
        bg: "#FFFFFF10",
        hoverBg: "#FFFFFF25",
        invertOnDark: true
      },
      {
        name: "Redux",
        icon: Redux,
        color: "#764ABC",
        bg: "#764ABC15",
        hoverBg: "#764ABC33"
      },
      {
        name: "Material-UI",
        icon: MaterialUi,
        color: "#007FFF",
        bg: "#007FFF15",
        hoverBg: "#007FFF33"
      },
      {
        name: "Radix UI",
        icon: RadixUi,
        color: "#FF5555",
        bg: "#FF555515",
        hoverBg: "#FF555533",
        invertOnDark: true
      },
      {
        name: "Tailwind CSS",
        icon: TailwindIcon,
        color: "#38B2AC",
        bg: "#38B2AC15",
        hoverBg: "#38B2AC33"
      },
    ] as SkillItem[],
  },
  {
    title: "Backend",
    gridArea: "backend",
    skills: [
      {
        name: "Node.js",
        icon: NodejsIcon,
        color: "#339933",
        bg: "#33993315",
        hoverBg: "#33993333"
      },
      {
        name: "Express.js",
        icon: Express,
        color: "#FFFFFF",
        bg: "#FFFFFF10",
        hoverBg: "#FFFFFF25",
        invertOnDark: true
      },
      {
        name: "Nest.js",
        icon: Nestjs,
        color: "#E0234E",
        bg: "#E0234E15",
        hoverBg: "#E0234E33"
      },
      {
        name: "REST APIs",
        icon: Swagger,
        color: "#85EA2D",
        bg: "#85EA2D15",
        hoverBg: "#85EA2D33"
      },
      {
        name: "OAuth / Auth",
        icon: Oauth,
        color: "#EB5424",
        bg: "#EB542415",
        hoverBg: "#EB542433"
      },
    ] as SkillItem[],
  },
  {
    title: "Tools",
    gridArea: "tools",
    skills: [
      {
        name: "VS Code",
        icon: VisualStudioCode,
        color: "#007ACC",
        bg: "#007ACC15",
        hoverBg: "#007ACC33"
      },
      {
        name: "Git",
        icon: GitIcon,
        color: "#F05032",
        bg: "#F0503215",
        hoverBg: "#F0503233"
      },
      {
        name: "Figma",
        icon: Figma,
        color: "#F24E1E",
        bg: "#F24E1E15",
        hoverBg: "#F24E1E33"
      },
      {
        name: "Postman",
        icon: Postman,
        color: "#FF6C37",
        bg: "#FF6C3715",
        hoverBg: "#FF6C3733"
      },
      {
        name: "Vercel",
        icon: VercelIcon,
        color: "#FFFFFF",
        bg: "#FFFFFF10",
        hoverBg: "#FFFFFF25",
        invertOnDark: true
      },
      {
        name: "React Query",
        icon: ReactQuery,
        color: "#FF4154",
        bg: "#FF415415",
        hoverBg: "#FF415433"
      },
    ] as SkillItem[],
  },
  {
    title: "Database & ORM",
    gridArea: "database",
    skills: [
      {
        name: "MongoDB",
        icon: MongodbIcon,
        color: "#47A248",
        bg: "#47A24815",
        hoverBg: "#47A24833"
      },
      {
        name: "PostgreSQL",
        icon: Postgresql,
        color: "#4169E1",
        bg: "#4169E115",
        hoverBg: "#4169E133"
      },
      {
        name: "Firebase",
        icon: Firebase,
        color: "#FFCA28",
        bg: "#FFCA2815",
        hoverBg: "#FFCA2833"
      },
      {
        name: "Prisma",
        icon: Prisma,
        color: "#FFFFFF",
        bg: "#FFFFFF10",
        hoverBg: "#FFFFFF25",
        invertOnDark: true
      },
    ] as SkillItem[],
  },
];

// Helper to convert hex to rgba for dynamic borders and shadows
function hexToRgba(hex: string, alpha: number): string {
  if (!hex || !hex.startsWith("#")) return hex;
  const cleanHex = hex.replace("#", "");
  let r = 0, g = 0, b = 0;
  if (cleanHex.length === 3) {
    r = parseInt(cleanHex[0] + cleanHex[0], 16);
    g = parseInt(cleanHex[1] + cleanHex[1], 16);
    b = parseInt(cleanHex[2] + cleanHex[2], 16);
  } else if (cleanHex.length === 6 || cleanHex.length === 8) {
    r = parseInt(cleanHex.slice(0, 2), 16);
    g = parseInt(cleanHex.slice(2, 4), 16);
    b = parseInt(cleanHex.slice(4, 6), 16);
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function SkillIconCard({ skill }: { skill: SkillItem }) {
  const [isHovered, setIsHovered] = useState(false);
  const IconComponent = skill.icon;
  const primaryColor = skill.color;

  const currentBg = isHovered ? skill.hoverBg : skill.bg;
  const currentIconColor = isHovered ? primaryColor : (skill.iconColor || hexToRgba(primaryColor, 0.8));

  return (
    <div
      className="group flex flex-col items-center gap-2 cursor-default"
      title={skill.name}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300"
        style={{
          backgroundColor: currentBg,
          borderColor: isHovered ? hexToRgba(primaryColor, 0.5) : hexToRgba(primaryColor, 0.2),
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          boxShadow: isHovered ? `0 10px 15px -3px ${hexToRgba(primaryColor, 0.3)}` : "none",
        }}
      >
        <IconComponent
          className="w-8 h-8 transition-colors duration-300"
          style={{
            color: currentIconColor,
            filter: skill.invertOnDark ? "invert(1) brightness(1.8)" : "none"
          }}
        />
      </div>
      <span
        className="text-[11px] font-medium transition-colors duration-300 text-center leading-tight"
        style={{
          color: isHovered ? "#ffffff" : "#cbd5e1",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <>
      <style>{`
        @media (max-width: 639px) {
          .bento-grid {
            grid-template-columns: 1fr !important;
            grid-template-areas:
              "frontend"
              "backend"
              "tools"
              "database" !important;
          }
        }
      `}</style>
    <section
      id="technical-skills"
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0f1218 50%, #0a0a0a 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise across
            different technologies and tools.
          </p>
        </div>

        {/* Bento Grid */}
        <div
          className="bento-grid grid gap-4"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
            gridTemplateAreas: `
              "frontend backend tools"
              "frontend database tools"
            `,
          }}
        >
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-6 transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.05]"
              style={{ gridArea: category.gridArea }}
            >
              {/* Category title */}
              <h3 className="text-white font-medium text-base mb-4">
                {category.title}
              </h3>
              {/* Separator line */}
              <div className="w-full h-px bg-gradient-to-r from-cyan-500/40 via-cyan-500/20 to-transparent mb-6" />
              {/* Icons grid */}
              <div className="grid grid-cols-3 gap-5">
                {category.skills.map((skill) => (
                  <SkillIconCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
