import React, { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { GraduationCap, Telescope, Orbit, MapPin } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { content } = useLanguage();
  const { personal, stats } = content;

  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Orbit className="w-3.5 h-3.5 animate-spin text-cyan-400" />
          <span>Mission Profile & Background</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading-en tracking-tight text-white mb-3">
          About Karam Naamneh
        </h2>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
        {/* Left Column: Abstract Cosmic Avatar in Glowing Circular Frame with Orbiting Rings */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 flex items-center justify-center">
            {/* Outer Orbiting Ring 1 */}
            <div className="absolute inset-0 rounded-full border border-cyan-400/25 animate-[spin_22s_linear_infinite]" />
            {/* Outer Orbiting Ring 2 (Counter) */}
            <div className="absolute -inset-4 rounded-full border border-sky-400/15 border-dashed animate-[spin_35s_linear_infinite_reverse]" />

            {/* Orbiting Satellite Node */}
            <div className="absolute inset-0 animate-[spin_16s_linear_infinite] pointer-events-none">
              <div className="w-3 sm:w-3.5 h-3 sm:h-3.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#22D3EE] -top-1.5 left-1/2 -translate-x-1/2" />
            </div>

            {/* Orbiting Secondary Planetoid */}
            <div className="absolute -inset-4 animate-[spin_24s_linear_infinite_reverse] pointer-events-none">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-[0_0_10px_#818CF8] top-1/2 -right-1 -translate-y-1/2" />
            </div>

            {/* Central Glowing Core Avatar */}
            <div className="relative w-44 h-44 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-full p-1.5 bg-gradient-to-tr from-cyan-500 via-sky-600 to-indigo-600 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
              <div className="w-full h-full rounded-full bg-[#070B1F] flex flex-col items-center justify-center relative overflow-hidden border border-cyan-400/30 group">
                {/* Internal Cosmic Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#22d3ee_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />

                {/* Subject Monogram & AI Iconography */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center p-3 sm:p-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl bg-cyan-950/80 border border-cyan-400/40 flex items-center justify-center mb-2 sm:mb-3 shadow-inner shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                    <Telescope className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-cyan-300" />
                  </div>
                  <span className="font-heading-en text-base sm:text-lg md:text-xl font-bold tracking-wider text-slate-100">
                    KARAM NAAMNEH
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-cyan-400 tracking-widest uppercase mt-0.5">
                    AI Lead &bull; Irbid // Zarqa
                  </span>
                </div>

                {/* Bottom telemetry sweep */}
                <div className="absolute bottom-2 text-[9px] sm:text-[10px] font-mono text-slate-500 tracking-wider">
                  SYS: IRBID 32.5568° N • ZU 32.0628° N
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 3-paragraph Bio & Education Card */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="space-y-3.5 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 font-light">
            {personal.bioParagraphs.map((paragraph, index) => (
              <p key={index}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Education Glass Card */}
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-cyan-400/25 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start gap-3.5 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 shrink-0">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                  <h3 className="font-bold text-white text-base sm:text-lg">
                    {personal.education.degree}
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    {personal.education.period}
                  </span>
                </div>
                <p className="text-cyan-300 font-medium text-xs sm:text-sm mb-1">
                  {personal.education.institution}
                </p>
                {personal.education.gpaOrHonors && (
                  <p className="text-slate-400 text-xs sm:text-sm font-mono">
                    {personal.education.gpaOrHonors}
                  </p>
                )}
                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Based in Irbid &bull; Attending classes in Zarqa campus</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stat Counters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 sm:gap-6">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="glass-panel glass-panel-hover p-4 sm:p-6 rounded-2xl border border-cyan-500/20 text-center relative overflow-hidden group"
          >
            <div className="text-xl sm:text-3xl md:text-4xl font-black font-heading-en text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400 mb-1.5 sm:mb-2">
              <span>{stat.value}</span>
              {stat.suffix && <span>{stat.suffix}</span>}
            </div>
            <div className="font-bold text-slate-100 text-xs sm:text-sm md:text-base mb-0.5">
              {stat.label}
            </div>
            {stat.sublabel && (
              <div className="text-[11px] sm:text-xs text-slate-400 font-light line-clamp-2">
                {stat.sublabel}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
