import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioConfig } from '../data/portfolioData';
import { sound } from '../utils/soundEffects';
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  ChevronRight,
  FileText,
  Compass,
  Cpu,
  MapPin,
  Sparkles,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenCv: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenCv }) => {
  const { content } = useLanguage();
  const { personal } = content;

  // Rotating Typewriter effect
  const roles = personal.roles;
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(80);

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        const nextText = currentRole.substring(0, displayedText.length + 1);
        setDisplayedText(nextText);
        setTypingSpeed(75 + Math.random() * 25);

        if (nextText === currentRole) {
          // Pause at full word
          setTypingSpeed(2200);
          setIsDeleting(true);
        }
      } else {
        // Deleting
        const nextText = currentRole.substring(0, displayedText.length - 1);
        setDisplayedText(nextText);
        setTypingSpeed(40);

        if (nextText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(380);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex, roles, typingSpeed]);

  const socialLinks = [
    {
      name: 'GitHub',
      url: personal.socials.github,
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-cyan-300 hover:border-cyan-400 hover:shadow-cyan-500/30',
      label: 'Visit Karam Naamneh GitHub profile',
    },
    {
      name: 'LinkedIn',
      url: personal.socials.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:text-sky-300 hover:border-sky-400 hover:shadow-sky-500/30',
      label: 'Connect with Karam Naamneh on LinkedIn',
    },
    {
      name: 'Instagram',
      url: personal.socials.instagram,
      icon: <Instagram className="w-5 h-5" />,
      color: 'hover:text-pink-400 hover:border-pink-500 hover:shadow-pink-500/30',
      label: 'Follow Karam Naamneh on Instagram',
    },
    {
      name: 'Email',
      url: personal.socials.email,
      icon: <Mail className="w-5 h-5" />,
      color: 'hover:text-emerald-300 hover:border-emerald-400 hover:shadow-emerald-500/30',
      label: 'Send direct transmission to Karam Naamneh',
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background Mission Control Overlay Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] md:w-[700px] h-[320px] sm:h-[600px] md:h-[700px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[130px]" />
        <div className="absolute top-1/3 left-1/4 w-[240px] sm:w-[420px] h-[240px] sm:h-[420px] bg-indigo-600/10 rounded-full blur-[90px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full text-center flex flex-col items-center">
        {/* Top Mission Status Pill with Location Badge */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 backdrop-blur-md shadow-inner shadow-cyan-500/10 text-xs font-mono">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span className="font-medium text-cyan-300">
              NASA Space Apps Irbid Lead 2026
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/70 border border-slate-700/60 backdrop-blur-md text-xs font-mono text-slate-300">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>Living in <strong>Irbid</strong> &bull; Studies in <strong>Zarqa</strong></span>
          </div>
        </div>

        {/* Hero Subject Name */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white mb-3 sm:mb-4">
          <span className="block font-heading-en bg-clip-text text-transparent bg-gradient-to-b from-white via-slate-100 to-slate-400">
            {personal.nameEn}
          </span>
          <span className="block text-xl sm:text-2xl md:text-3xl font-mono text-cyan-400/90 mt-2 font-semibold tracking-wide">
            Karam Naamneh
          </span>
        </h1>

        {/* Typewriter Rotating Role Line */}
        <div className="h-14 sm:h-16 flex items-center justify-center mb-4 sm:mb-6 max-w-3xl px-2">
          <div className="inline-flex items-center gap-2 text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-cyan-300">
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 animate-pulse shrink-0 hidden sm:inline-block" />
            <span className="font-mono tracking-tight text-center break-words">{displayedText}</span>
            <span className="inline-block w-0.5 h-5 sm:h-7 bg-cyan-400 animate-pulse shrink-0" />
          </div>
        </div>

        {/* One-line Tagline */}
        <p className="max-w-2xl text-sm sm:text-base md:text-lg text-slate-300 mb-8 sm:mb-10 leading-relaxed font-light px-4">
          {personal.tagline}
        </p>

        {/* Two CTAs: Primary Glowing + Ghost Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto justify-center mb-10 sm:mb-12 px-4 sm:px-0">
          <a
            href="#projects"
            id="hero-view-projects-cta"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-500 text-[#070B1F] font-bold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/50 hover:brightness-110 hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 font-mono"
          >
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-[#070B1F]" />
            <span>View Projects</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          <button
            onClick={() => {
              sound.playAffirmative();
              onOpenCv();
            }}
            id="hero-download-cv-cta"
            type="button"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl glass-panel text-slate-100 font-semibold text-sm sm:text-base flex items-center justify-center gap-2 border border-cyan-400/30 hover:border-cyan-400 hover:bg-cyan-950/50 hover:text-cyan-200 transition-all hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 font-mono"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
            <span>Open Resume (CV)</span>
          </button>
        </div>

        {/* Social Icon Row with Glow on Hover */}
        <div className="flex items-center gap-3.5 sm:gap-5 mb-12 sm:mb-16">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`p-2.5 sm:p-3 rounded-xl glass-panel text-slate-300 border border-slate-700/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${social.color}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Animated Scroll Down Indicator */}
        <a
          href="#about"
          aria-label="Scroll down to About section"
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-slate-500 group-hover:text-cyan-400 transition-colors">
            Telemetry Downlink
          </span>
          <div className="w-5 sm:w-6 h-8 sm:h-10 rounded-full border-2 border-slate-700 group-hover:border-cyan-400 flex items-start justify-center p-1 sm:p-1.5 transition-colors">
            <div className="w-1.5 h-2 rounded-full bg-cyan-400 animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};
