import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import {
  Send,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  Instagram,
  Radio,
  Sparkles,
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { content } = useLanguage();
  const { contact, personal } = content;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim()) {
      sound.playDismiss();
      setErrorMessage('Please provide your full name');
      return;
    }
    if (!validateEmail(formData.email)) {
      sound.playDismiss();
      setErrorMessage('Please enter a valid email address');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 8) {
      sound.playDismiss();
      setErrorMessage('Please include a message with at least 8 characters');
      return;
    }

    sound.playPulse();
    setStatus('loading');

    setTimeout(() => {
      sound.playSuccess();
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1100);
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: personal.socials.github,
      icon: <Github className="w-5 h-5" />,
      color: 'hover:text-cyan-300 hover:border-cyan-400',
    },
    {
      name: 'LinkedIn',
      url: personal.socials.linkedin,
      icon: <Linkedin className="w-5 h-5" />,
      color: 'hover:text-sky-300 hover:border-sky-400',
    },
    {
      name: 'Instagram',
      url: personal.socials.instagram,
      icon: <Instagram className="w-5 h-5" />,
      color: 'hover:text-pink-400 hover:border-pink-500',
    },
    {
      name: 'Email',
      url: personal.socials.email,
      icon: <Mail className="w-5 h-5" />,
      color: 'hover:text-emerald-300 hover:border-emerald-400',
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>Direct Telemetry & Booking</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading-en tracking-tight text-white mb-3">
          {contact.title}
        </h2>
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light mb-4">
          {contact.subtitle}
        </p>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Direct Info Cards & Coordinates */}
        <div className="lg:col-span-5 space-y-5 sm:space-y-6">
          <div className="glass-panel p-5 sm:p-8 rounded-2xl border border-cyan-500/20 space-y-5 sm:space-y-6">
            <h3 className="font-heading-en text-lg sm:text-xl font-bold text-white mb-2 sm:mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Base Frequency Coordinates</span>
            </h3>

            {/* Calendly Booking Card */}
            {personal.socials.calendly && (
              <a
                href={personal.socials.calendly}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playAffirmative()}
                className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-cyan-500/15 via-sky-500/10 to-indigo-500/15 border border-cyan-400/40 hover:border-cyan-300 hover:bg-cyan-500/20 transition-all group shadow-md shadow-cyan-950/20"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-cyan-950/90 border border-cyan-400/40 text-cyan-300 group-hover:scale-105 transition-transform shrink-0">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider block">
                      Schedule 30-Min Meeting
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-300">
                      Direct via Calendly sync
                    </span>
                  </div>
                </div>
                <span className="text-xs font-mono px-2.5 sm:px-3 py-1.5 rounded-lg bg-cyan-400 text-[#070B1F] font-bold group-hover:brightness-110 transition-all shrink-0">
                  Book Now
                </span>
              </a>
            )}

            {/* Email */}
            <a
              href={`mailto:${personal.email}`}
              onClick={() => sound.playClick()}
              className="flex items-start gap-3.5 sm:gap-4 group p-2.5 sm:p-3 rounded-xl hover:bg-white/5 transition-colors"
            >
              <div className="p-2.5 sm:p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 group-hover:border-cyan-400 transition-colors shrink-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Direct Email Address
                </span>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors break-all">
                  {personal.email}
                </span>
              </div>
            </a>

            {/* Phone */}
            {personal.socials.phone && (
              <a
                href={personal.socials.phone}
                onClick={() => sound.playClick()}
                className="flex items-start gap-3.5 sm:gap-4 group p-2.5 sm:p-3 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="p-2.5 sm:p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 group-hover:border-cyan-400 transition-colors shrink-0">
                  <Radio className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div>
                  <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Direct Phone Line
                  </span>
                  <span className="text-xs sm:text-sm md:text-base font-semibold text-white group-hover:text-cyan-300 transition-colors font-mono">
                    0799828733
                  </span>
                </div>
              </a>
            )}

            {/* Residence in Irbid & Studies in Zarqa */}
            <div className="flex items-start gap-3.5 sm:gap-4 p-2.5 sm:p-3 rounded-xl">
              <div className="p-2.5 sm:p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Current Base & Campus
                </span>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-white block">
                  Living in Irbid &bull; Studies in Al-Zarqa University
                </span>
                <span className="text-[11px] text-cyan-300 font-mono">Jordan (GMT+3)</span>
              </div>
            </div>

            {/* Response Time */}
            <div className="flex items-start gap-3.5 sm:gap-4 p-2.5 sm:p-3 rounded-xl">
              <div className="p-2.5 sm:p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 shrink-0">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <span className="text-[11px] sm:text-xs font-mono text-slate-400 uppercase tracking-wider block">
                  Downlink Latency
                </span>
                <span className="text-xs sm:text-sm font-semibold text-cyan-300 font-mono">
                  {contact.responseTime}
                </span>
              </div>
            </div>

            {/* Social Icons Repeated */}
            <div className="pt-3 sm:pt-4 border-t border-slate-800">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3">
                Digital Profiles
              </span>
              <div className="flex items-center gap-2.5 sm:gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect via ${social.name}`}
                    className={`p-2.5 sm:p-3 rounded-xl glass-panel text-slate-300 border border-slate-700/60 transition-all hover:-translate-y-0.5 ${social.color}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Working Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-5 sm:p-8 md:p-10 rounded-2xl border border-cyan-500/25 relative overflow-hidden">
            {/* Success State Overlay */}
            {status === 'success' && (
              <div className="p-6 sm:p-8 text-center flex flex-col items-center justify-center space-y-4 rounded-xl bg-cyan-950/80 border border-cyan-400/50 backdrop-blur-xl animate-in fade-in duration-300">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center shadow-[0_0_20px_rgba(52,211,153,0.3)]">
                  <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {contact.successTitle}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-md">
                  {contact.successMessage}
                </p>
                <button
                  type="button"
                  data-sound="pulse"
                  onClick={() => setStatus('idle')}
                  className="px-6 py-2.5 rounded-xl bg-cyan-500 text-[#070B1F] font-bold text-xs font-mono hover:bg-cyan-400 transition-colors"
                >
                  Transmit Another Message
                </button>
              </div>
            )}

            {status !== 'success' && (
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      {contact.formName} *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-xs sm:text-sm transition-all"
                      placeholder="e.g. Dr. Alex Mercer"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                    >
                      {contact.formEmail} *
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-xs sm:text-sm transition-all"
                      placeholder="name@organization.org"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    {contact.formSubject}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-xs sm:text-sm transition-all"
                    placeholder="e.g. NASA Space Apps Mentorship / AI Collaboration"
                  />
                </div>

                {/* Message Input */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5"
                  >
                    {contact.formMessage} *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 text-xs sm:text-sm transition-all resize-none"
                    placeholder="Provide details regarding your project, inquiry, or collaborative opportunity..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  id="contact-submit-btn"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-400 hover:to-sky-400 text-[#070B1F] font-bold text-xs sm:text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all hover:brightness-110 disabled:opacity-60 cursor-pointer font-mono"
                >
                  {status === 'loading' ? (
                    <>
                      <Radio className="w-4 h-4 animate-spin" />
                      <span>{contact.sending}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{contact.sendButton}</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
