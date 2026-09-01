import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Award, BookOpen, GraduationCap } from "lucide-react";

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  gpa?: string;
  description?: string;
  achievements?: string[];
  relevantCourses?: string[];
  institutionType: "University" | "college" | "bootcamp" | "certification";
}

const EducationSection = () => {
  const education: Education[] = [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      institution: "The People's University of Bangladesh",
      location: "Dhaka, Bangladesh",
      period: "2020 - 2023",
      institutionType: "University",
      // description:
      //   "Comprehensive computer science program with focus on software engineering, algorithms, and data structures.",
      // achievements: [
      //   "Dean's List for 6 consecutive semesters",
      //   "Outstanding Student in Computer Science Award 2018",
      //   "President of Computer Science Student Association",
      //   "Lead developer for university's student portal project",
      // ],
      // relevantCourses: [
      //   "Data Structures & Algorithms",
      //   "Software Engineering",
      //   "Database Systems",
      //   "Web Development",
      //   "Machine Learning",
      //   "Computer Networks",
      // ],
    },
  ];

  const getInstitutionIcon = (type: Education["institutionType"]) => {
    switch (type) {
      case "University":
      case "college":
        return GraduationCap;
      case "bootcamp":
        return BookOpen;
      case "certification":
        return Award;
      default:
        return BookOpen;
    }
  };

  const getInstitutionBadgeColor = (type: Education["institutionType"]) => {
    switch (type) {
      case "University":
      case "college":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "bootcamp":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "certification":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      default:
        return "bg-muted/30 text-muted-foreground border-border";
    }
  };

  return (
    <section className="py-10 px-6 md:px-8 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800/20 via-transparent to-slate-700/20" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Education & Certifications
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            My educational journey and continuous learning path in technology
          </p>
        </div>

        <div className="space-y-8">
          {education.map((edu, index) => {
            const IconComponent = getInstitutionIcon(edu.institutionType);

            return (
              <div
                key={edu.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <Card className="group hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 hover:-translate-y-1 bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-cyan-500/30">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/20 flex items-center justify-center group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                            <IconComponent className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-xl md:text-2xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                              {edu.degree}
                            </h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <span className="font-semibold text-cyan-400">
                                {edu.institution}
                              </span>
                              <div className="flex items-center gap-1 text-slate-400 text-sm">
                                <MapPin className="w-4 h-4" />
                                {edu.location}
                              </div>
                            </div>
                          </div>
                        </div>

                        <CardDescription className="text-base leading-relaxed text-slate-300">
                          {edu.description}
                        </CardDescription>
                      </div>

                      <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-slate-400" />
                          <span className="text-sm font-medium text-slate-400">
                            {edu.period}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Badge
                            variant="outline"
                            className={getInstitutionBadgeColor(
                              edu.institutionType
                            )}
                          >
                            {edu.institutionType}
                          </Badge>
                          {edu.gpa && (
                            <Badge
                              variant="outline"
                              className="bg-amber-500/10 text-amber-400 border-amber-500/20"
                            >
                              GPA: {edu.gpa}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {/* <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      Achievements
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <Award className="w-4 h-4 text-cyan-400" />
                          Key Achievements
                        </h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-slate-300"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                              <span className="text-sm leading-relaxed">
                                {achievement}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      Relevant Courses
                      <div>
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-cyan-400" />
                          Key Subjects
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.relevantCourses.map((course) => (
                            <Badge
                              key={course}
                              variant="outline"
                              className="text-xs bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-cyan-500/10 hover:border-cyan-500/30 hover:text-cyan-400 transition-colors"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent> */}
                </Card>
              </div>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full border border-cyan-500/20">
            <GraduationCap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-400">
              Committed to continuous learning and professional growth
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
