import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/soundEffects';

export const CertificationsSection: React.FC = () => {
  const { content } = useLanguage();
  const { certifications } = content;

  return (
    <section id="certifications" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Award className="w-3.5 h-3.5 text-cyan-400" />
          <span>Accreditations & Honors</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading-en tracking-tight text-white mb-3">
          Certifications & Distinctions
        </h2>
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light mb-4">
          Official academic and technical distinction certificates awarded by Al-Zarqa University for leadership, robotics, and academic engagement.
        </p>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto rounded-full" />
      </div>

      {/* Grid of Certificates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="glass-panel glass-panel-hover p-5 sm:p-6 rounded-2xl border border-cyan-500/20 flex flex-col justify-between group relative overflow-hidden"
          >
            {/* Top Light Accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20">
                  {cert.year}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors leading-snug">
                {cert.title}
              </h3>

              <p className="text-xs sm:text-sm text-cyan-200/80 mb-4 font-light">
                {cert.issuer}
              </p>
            </div>

            <div className="pt-3.5 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-400">
                ID: {cert.badgeCode}
              </span>

              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Issuer Info</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
