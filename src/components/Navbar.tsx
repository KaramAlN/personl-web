import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioConfig } from '../data/portfolioData';
import { PWAInstallButton } from './PWAInstallButton';
import { sound } from '../utils/soundEffects';
import { Menu, X, FileDown, Radio, Volume2, VolumeX, Sparkles, MapPin } from 'lucide-react';

interface NavbarProps {
  onOpenCv: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCv }) => {
  const { content } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section scrollspy
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
      const scrollPosition = window.scrollY + 180;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { id: string; label: string; badge?: boolean }[] = [
    { id: 'about', label: content.nav.about },
    { id: 'skills', label: content.nav.skills },
    { id: 'projects', label: content.nav.projects },
    { id: 'experience', label: content.nav.experience },
    { id: 'certifications', label: content.nav.certifications },
    { id: 'contact', label: content.nav.contact },
  ];

  const handleToggleSound = () => {
    const nextState = sound.toggleMute();
    setIsMuted(nextState);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2.5 sm:py-3 bg-[#070B1F]/85 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg shadow-cyan-950/20'
          : 'py-4 sm:py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Mission Callout */}
        <a
          href="#hero"
          className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          aria-label="Karam Naamneh Home"
        >
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-cyan-950 to-blue-900 border border-cyan-400/30 group-hover:border-cyan-400/80 transition-colors shadow-inner shadow-cyan-500/10">
            <span className="font-heading-en text-cyan-300 font-bold text-base sm:text-lg tracking-wider">
              KN
            </span>
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-bold tracking-tight text-slate-100 group-hover:text-cyan-300 transition-colors text-sm sm:text-base md:text-lg font-heading-en">
                {content.personal.nameEn}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
                <Radio className="w-2.5 h-2.5 animate-pulse text-cyan-400" />
                <span>NASA Lead 2026</span>
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-400 font-mono tracking-wider">
              <span className="text-cyan-400 inline-flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-cyan-400" />
                Irbid &bull; Zarqa
              </span>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline uppercase">{portfolioConfig.telemetry.orbitStatus}</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links (Tablets in landscape & Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all relative ${
                activeSection === link.id
                  ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/30 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-1.5">
                {link.badge && (
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                )}
                {link.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Action Controls: Sound Toggle + PWA Install + CV Button */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          {/* Sound FX Toggle Button */}
          <button
            onClick={handleToggleSound}
            id="sound-toggle-btn"
            type="button"
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            aria-label={isMuted ? 'Unmute audio effects' : 'Mute audio effects'}
            className="p-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 text-xs font-mono transition-all hover:border-cyan-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
          </button>

          {/* PWA Install Button */}
          <PWAInstallButton />

          {/* CV Button */}
          <button
            onClick={() => {
              sound.playAffirmative();
              onOpenCv();
            }}
            id="nav-cv-btn"
            type="button"
            className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-[#070B1F] font-semibold text-xs transition-all shadow-md shadow-cyan-500/20 hover:shadow-cyan-400/35 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 font-mono"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>{content.nav.cv}</span>
          </button>
        </div>

        {/* Mobile controls (Phones & Small Tablets) */}
        <div className="flex sm:hidden items-center gap-1.5">
          {/* Mobile Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            type="button"
            aria-label="Toggle Sound Effects"
            className="p-2 rounded-lg border border-cyan-500/30 bg-cyan-950/50 text-cyan-300 text-xs font-mono"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
          </button>

          {/* Mobile PWA Install Button */}
          <PWAInstallButton />

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="p-2 rounded-lg border border-slate-700 bg-slate-900/80 text-slate-200 hover:text-cyan-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-[#070B1F]/98 border-b border-cyan-500/20 backdrop-blur-2xl transition-all animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium flex items-center justify-between ${
                  activeSection === link.id
                    ? 'text-cyan-300 bg-cyan-950/70 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.label}</span>
              </a>
            ))}

            <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  sound.playAffirmative();
                  onOpenCv();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-[#070B1F] font-bold text-sm flex items-center justify-center gap-2 font-mono"
              >
                <FileDown className="w-4 h-4" />
                <span>{content.nav.cv}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
