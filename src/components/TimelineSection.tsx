import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Calendar, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  const { content } = useLanguage();
  const { experiences } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalHeight = rect.height;
      const progress = Math.min(
        1,
        Math.max(0, (windowHeight * 0.7 - rect.top) / totalHeight)
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
          <span>Command Trajectory & Leadership</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading-en tracking-tight text-white mb-3">
          Experience & Leadership
        </h2>
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light mb-4">
          A proven track record heading global space hackathons, mentoring student cohorts in AI and robotics, and deploying commercial systems.
        </p>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto rounded-full" />
      </div>

      {/* Timeline Track */}
      <div className="relative">
        {/* Base Track Line */}
        <div className="absolute top-0 bottom-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-slate-800" />

        {/* Animated Glowing Progress Line */}
        <div
          className="absolute top-0 left-4 sm:left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-cyan-400 via-sky-400 to-indigo-500 shadow-[0_0_12px_#22D3EE] transition-all duration-150"
          style={{ height: `${scrollProgress * 100}%` }}
        />

        {/* Timeline Items */}
        <div className="space-y-8 sm:space-y-14">
          {experiences.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Central Glowing Orbit Node */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#070B1F] border-2 border-cyan-400 flex items-center justify-center shadow-[0_0_15px_rgba(34,211,238,0.4)] z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 animate-pulse" />
                </div>

                {/* Content Card */}
                <div
                  className={`w-full sm:w-[calc(50%-36px)] pl-10 sm:pl-0 ${
                    isEven ? 'sm:pr-0 sm:pl-0' : 'sm:pr-0'
                  }`}
                >
                  <div className="glass-panel glass-panel-hover p-5 sm:p-7 rounded-2xl border border-cyan-500/20 relative overflow-hidden group">
                    {/* Header: Role & Organization */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                        <Calendar className="w-3 h-3 text-cyan-400" />
                        <span>{item.period}</span>
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        <span>{item.location}</span>
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {item.role}
                    </h3>
                    <p className="text-cyan-300 font-medium text-xs sm:text-sm mb-3">
                      {item.organization}
                    </p>

                    {/* Key Highlight Banner */}
                    {item.highlight && (
                      <div className="mb-3.5 p-2 sm:p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="text-xs font-medium text-cyan-100">
                          {item.highlight}
                        </span>
                      </div>
                    )}

                    {/* Bullet Points */}
                    <ul className="space-y-2 mb-5 text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                      {item.description.map((desc, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-800">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-slate-300 border border-slate-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
