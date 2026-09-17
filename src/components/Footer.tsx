import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioConfig } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import { ArrowUp, Radio } from 'lucide-react';

export const Footer: React.FC = () => {
  const { content } = useLanguage();
  const { footer, personal } = content;

  const scrollToTop = () => {
    sound.playPulse();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-cyan-500/15 py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#050816]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Brand & Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-heading-en text-base sm:text-lg font-bold text-white tracking-wider">
              {personal.nameEn}
            </span>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
              IRBID &bull; ZARQA
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono">
            © {new Date().getFullYear()} {personal.nameEn}. {footer.rights}
          </p>
          <p className="text-[11px] text-slate-500 font-mono mt-0.5">
            {footer.techStackNote}
          </p>
        </div>

        {/* Center: System Status */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span>SYS: {portfolioConfig.telemetry.systemStatus}</span>
          <span className="text-slate-600">&bull;</span>
          <span className="text-cyan-300">PING: {portfolioConfig.telemetry.ping}</span>
        </div>

        {/* Right: Back to Top Button */}
        <button
          onClick={scrollToTop}
          id="footer-back-to-top-btn"
          type="button"
          data-sound="pulse"
          className="flex items-center gap-2 px-4 py-2 rounded-xl glass-panel text-slate-300 hover:text-cyan-300 hover:border-cyan-400 transition-all text-xs font-mono"
        >
          <span>{footer.backToTop}</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
