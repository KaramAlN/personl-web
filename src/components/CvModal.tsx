import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import { X, Download, Printer, CheckCircle, Award, Briefcase, GraduationCap, Mail, Phone, MapPin, Globe } from 'lucide-react';

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CvModal: React.FC<CvModalProps> = ({ isOpen, onClose }) => {
  const { content } = useLanguage();
  const { personal, experiences, certifications, skillCategories } = content;

  if (!isOpen) return null;

  const handlePrint = () => {
    sound.playAffirmative();
    window.print();
  };

  const handleDownloadTextCv = () => {
    sound.playSuccess();
    const cvContent = `
========================================================================
                      ${personal.nameEn} (Karam Naamneh)
      AI Student & Local Lead — NASA Space Apps Challenge Irbid
========================================================================
Base: Resident in Irbid • Studies at Al-Zarqa University, Jordan
Email: ${personal.email}
Phone: 0799828733
GitHub: ${personal.socials.github}
LinkedIn: ${personal.socials.linkedin}
Instagram: ${personal.socials.instagram}

OBJECTIVE
${personal.tagline}

EDUCATION
${personal.education.degree}
${personal.education.institution} (${personal.education.period})
Campus: Al-Zarqa University • Resident City: Irbid
Honors: ${personal.education.gpaOrHonors}

LEADERSHIP & EXPERIENCE
${experiences
  .map(
    (exp) => `
* ${exp.role} | ${exp.organization} (${exp.period})
  Location: ${exp.location}
  - ${exp.description.join('\n  - ')}
`
  )
  .join('')}

CORE SKILLS
${skillCategories
  .map(
    (cat) => `
* ${cat.title}:
  ${cat.skills.map((s) => `${s.name} (${s.level})`).join(', ')}
`
  )
  .join('')}

HONORS & CERTIFICATIONS
${certifications
  .map(
    (c) => `* ${c.title} — ${c.issuer} (${c.year}) [ID: ${c.badgeCode}]`
  )
  .join('\n')}

========================================================================
Generated from Portfolio Mission Control: ${typeof window !== 'undefined' ? window.location.origin : 'https://karam-ai.app'}
`;

    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Karam_Naamneh_AI_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-lg overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[#090E26] border border-cyan-400/40 shadow-2xl shadow-cyan-950/80 my-8 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Action Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 border-b border-cyan-500/20 bg-[#070B1F]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-white font-bold text-sm sm:text-base font-heading-en">
              Curriculum Vitae Telemetry
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadTextCv}
              type="button"
              data-sound="success"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-[#070B1F] font-bold text-xs transition-colors shadow-sm font-mono"
              aria-label="Download plain text CV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </button>

            <button
              onClick={handlePrint}
              type="button"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium transition-colors font-mono"
              aria-label="Print CV"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={() => {
                sound.playDismiss();
                onClose();
              }}
              type="button"
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors ml-1 sm:ml-2"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable / Viewable CV Paper */}
        <div className="p-5 sm:p-8 md:p-10 overflow-y-auto space-y-6 sm:space-y-8 text-slate-200 font-sans leading-relaxed">
          {/* Header Bar */}
          <div className="border-b border-cyan-500/30 pb-5 sm:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading-en text-white mb-1">
                  {personal.nameEn}
                </h1>
                <p className="text-sm sm:text-base font-medium text-cyan-300">
                  Karam Naamneh &bull; AI Student & NASA Space Apps Irbid Lead 2026
                </p>
                <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
                  Resident in Irbid • Studies at Al-Zarqa University (2024–2028)
                </p>
              </div>

              <div className="text-xs font-mono text-slate-400 space-y-1">
                <div>📍 Irbid (Home) • Zarqa (Campus), Jordan</div>
                <div>✉️ {personal.email}</div>
                <div>📞 0799828733</div>
                <div>🔗 linkedin.com/in/karamalyousef</div>
              </div>
            </div>
          </div>

          {/* Education */}
          <section>
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs font-mono mb-3">
              <GraduationCap className="w-4 h-4" />
              <span>Education</span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-slate-800">
              <div className="flex flex-wrap justify-between items-center mb-1">
                <h4 className="font-bold text-white text-sm sm:text-base">
                  {personal.education.degree}
                </h4>
                <span className="text-xs font-mono text-cyan-300">
                  {personal.education.period}
                </span>
              </div>
              <p className="text-slate-300 text-xs sm:text-sm">
                {personal.education.institution}
              </p>
              <p className="text-slate-400 text-xs font-mono mt-1">
                Faculty of Information Technology • Based in Irbid, attending Zarqa campus
              </p>
            </div>
          </section>

          {/* Experience */}
          <section>
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs font-mono mb-3">
              <Briefcase className="w-4 h-4" />
              <span>Leadership & Professional Experience</span>
            </div>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-white/5 p-4 rounded-xl border border-slate-800">
                  <div className="flex flex-wrap justify-between items-center mb-1">
                    <h4 className="font-bold text-white text-sm sm:text-base">
                      {exp.role}
                    </h4>
                    <span className="text-xs font-mono text-cyan-300">
                      {exp.period}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-2">
                    <span className="text-cyan-400 font-semibold">{exp.organization}</span>
                    <span>&bull;</span>
                    <span>{exp.location}</span>
                  </div>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-1">
                    {exp.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs font-mono mb-3">
              <Award className="w-4 h-4" />
              <span>Technical & Applied Competencies</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {skillCategories.map((cat) => (
                <div key={cat.id} className="bg-white/5 p-3.5 rounded-xl border border-slate-800">
                  <h5 className="text-xs font-mono text-cyan-300 uppercase font-bold mb-2">
                    {cat.title}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-slate-200 border border-slate-700"
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <div className="flex items-center gap-2 text-cyan-400 font-bold uppercase tracking-wider text-xs font-mono mb-3">
              <CheckCircle className="w-4 h-4" />
              <span>Academic Certifications</span>
            </div>
            <div className="space-y-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="bg-white/5 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-white block">{cert.title}</span>
                    <span className="text-slate-400">{cert.issuer}</span>
                  </div>
                  <span className="text-cyan-400 font-mono text-[11px] shrink-0 ml-3">
                    {cert.badgeCode} ({cert.year})
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
