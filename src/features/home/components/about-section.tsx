import Image from "next/image";
import { Sparkles } from "lucide-react";


const AboutSection = () => {
  return (
    <section
      className="relative py-24 px-4 overflow-hidden"
      id="about-me"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #1a2840 60%, #1e293b 80%, #0f172a 100%)",
      }}
    >
      {/* Floating decorative cubes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left cubes */}
        <div
          className="absolute top-12 left-8 w-10 h-10 rounded-lg opacity-40"
          style={{
            background: "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
            transform: "rotate(25deg)",
            boxShadow: "0 8px 32px rgba(34, 211, 238, 0.2)",
          }}
        />
        <div
          className="absolute top-24 left-20 w-6 h-6 rounded-md opacity-30"
          style={{
            background: "linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)",
            transform: "rotate(-15deg)",
            boxShadow: "0 4px 16px rgba(34, 211, 238, 0.15)",
          }}
        />
        <div
          className="absolute top-8 left-32 w-4 h-4 rounded-sm opacity-25"
          style={{
            background: "linear-gradient(135deg, #a5f3fc 0%, #67e8f9 100%)",
            transform: "rotate(45deg)",
          }}
        />
        {/* Top-right cubes */}
        <div
          className="absolute top-16 right-16 w-8 h-8 rounded-md opacity-25"
          style={{
            background: "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
            transform: "rotate(30deg)",
            boxShadow: "0 6px 24px rgba(34, 211, 238, 0.15)",
          }}
        />
        <div
          className="absolute top-32 right-32 w-5 h-5 rounded-sm opacity-20"
          style={{
            background: "linear-gradient(135deg, #67e8f9 0%, #22d3ee 100%)",
            transform: "rotate(-20deg)",
          }}
        />
        {/* Bottom-left cube */}
        <div
          className="absolute bottom-20 left-16 w-7 h-7 rounded-md opacity-20"
          style={{
            background: "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
            transform: "rotate(40deg)",
          }}
        />
        {/* Glow effects */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-7xl z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Left - Photo with arch blob + vertical name */}
          <div className="flex items-center gap-8 justify-center lg:justify-center">
            <div className="relative" style={{ width: '400px', height: '540px' }}>
              {/* Arch-shaped colored blob behind photo */}
              <div
                className="absolute z-0"
                style={{
                  top: '20px',
                  left: '50px',
                  width: '330px',
                  height: '500px',
                  borderRadius: '170px 170px 30px 30px',
                  background: 'linear-gradient(180deg, #22d3ee 0%, #0891b2 60%, #0e7490 100%)',
                }}
              />

              {/* Photo overlapping the blob */}
              <div
                className="absolute z-10 overflow-hidden shadow-2xl shadow-cyan-900/30"
                style={{
                  top: '0',
                  left: '20px',
                  width: '360px',
                  height: '520px',
                  borderRadius: '20px',
                }}
              >
                <Image
                  src="/about-me.png"
                  alt="Nazmus Sakib"
                  fill
                  className="object-cover"
                  sizes="360px"
                />
              </div>

              {/* Vertical name text overlapping the photo from the left */}
              <div
                className="absolute z-20"
                style={{
                  left: '-10px',
                  bottom: '0',
                  writingMode: 'vertical-lr',
                  transform: 'rotate(180deg)',
                }}
              >
                <span
                  className="font-black uppercase select-none leading-none"
                  style={{
                    fontSize: '5rem',
                    color: 'white',
                    WebkitTextStroke: '2px rgba(255,255,255,0.8)',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 40px rgba(34, 211, 238, 0.15)',
                  }}
                >
                  sakib
                </span>
              </div>
            </div>

            {/* Vertical divider line */}
            <div className="hidden lg:flex flex-col items-center self-stretch py-8">
              <div className="w-px flex-1 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent" />
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            {/* Section heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              About me
            </h2>

            {/* Description paragraphs */}
            <div className="space-y-5 text-slate-300 leading-relaxed text-base">
              <p>
                Welcome to my portfolio! I&apos;m Nazmus Sakib, a passionate Frontend
                Developer dedicated to creating seamless and visually engaging
                digital experiences. With hands-on experience, I specialize in
                building intuitive interfaces that enhance usability and user
                satisfaction.
              </p>
              <p>
                My skills include modern JavaScript frameworks, responsive design,
                and component-driven architecture, ensuring that each interface is
                both aesthetically pleasing and functionally efficient. I have worked
                on diverse projects, including web platforms and interactive
                dashboards, always focusing on user-centered solutions that drive
                engagement.
              </p>
            </div>

            {/* Highlighted quote */}
            <div className="flex items-start gap-3 py-4">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5"
                style={{
                  background: "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
                }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <p className="text-slate-400 text-sm leading-relaxed italic">
                I am deeply committed to my work, investing creativity and precision into
                every project to ensure a unique and effective user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
