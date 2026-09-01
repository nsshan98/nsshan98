import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, ExternalLink } from "lucide-react";
import Link from "next/link";

interface Experience {
  id: string;
  position: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  companyUrl?: string;
  current: boolean;
}

const ExperienceSection = () => {
  const experiences: Experience[] = [
    {
      id: "1",
      position: "Frontend Developer",
      company: "Miicon Solutions",
      location: "22 RN Rd, Jashore",
      period: "2024 - Present",
      current: true,
      description:
        "Crafting fast, responsive, and pixel-perfect web experiences with React, Next.js, and modern UI magic.",
      achievements: [
        "Built and deployed responsive, high-performance websites using React.js, Next.js, and Material-UI, improving load times by up to 40%.",
        "Integrated REST APIs endpoints, ensuring seamless data flow between frontend and backend",
        "Implemented state management with TanStack Query to handle complex UI interactions and real-time updates.",
        "Enhanced SEO and performance with Next.js static generation (SSG) and server-side rendering (SSR).",
        "Collaborated with designers via Figma to translate UI/UX designs into pixel-perfect components.",
      ],
      technologies: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Material-UI (MUI)",
        "TanStack Query (React Query)",
        "Git",
        "GitHub",
        "REST API",
      ],
      companyUrl: "https://www.miiconsolutions.com",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-8 bg-slate-800/50 backdrop-blur-sm relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1500" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Professional Experience
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            My journey through various roles and the impact I&apos;ve made along
            the way
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500 opacity-50 hidden md:block" />

          <div className="space-y-8">
            {experiences.map((experience) => (
              <div key={experience.id} className="relative">
                {/* Timeline dot - desktop only */}
                <div className="absolute left-6 top-8 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 border-4 border-slate-800 shadow-lg hidden md:block z-10" />

                <div className="md:ml-20">
                  <Card className="group hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 border-slate-600/50 hover:border-blue-400/50 bg-slate-700/80 hover:bg-slate-700/90 backdrop-blur-sm">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div className="space-y-2">
                          <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                            {experience.position}
                          </h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold text-blue-400">
                                {experience.company}
                              </span>
                              {experience.companyUrl && (
                                <Link
                                  href={experience.companyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Visit ${experience.company} website`}
                                >
                                  <ExternalLink className="w-4 h-4 text-slate-400 hover:text-blue-400 transition-colors cursor-pointer" />
                                </Link>
                              )}
                            </div>
                            <div className="flex items-center gap-1 text-slate-400 text-sm">
                              <MapPin className="w-4 h-4" />
                              {experience.location}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-300">
                            {experience.period}
                          </span>
                          {experience.current && (
                            <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>

                      <CardDescription className="text-base leading-relaxed mt-3 text-slate-300">
                        {experience.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-6">
                        {/* Achievements */}
                        <div>
                          <h4 className="font-semibold text-white mb-3">
                            Key Achievements
                          </h4>
                          <ul className="space-y-2">
                            {experience.achievements.map((achievement, idx) => (
                              <li
                                key={idx}
                                className="flex items-start gap-2 text-slate-300"
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                                <span className="text-sm leading-relaxed">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h4 className="font-semibold text-white mb-3">
                            Technologies Used
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {experience.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs bg-slate-600/50 hover:bg-blue-500/20 hover:border-blue-400/50 transition-colors border-slate-500/50 text-slate-200"
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        {/* <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-400/30 backdrop-blur-sm">
            <span className="text-sm font-medium text-blue-300">
              Want to know more about my experience?
            </span>
            <ExternalLink className="w-4 h-4 text-blue-400" />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default ExperienceSection;
