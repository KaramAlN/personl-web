import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/soundEffects';
import {
  Brain,
  Cpu,
  Terminal,
  Layers,
  Eye,
  Sparkles,
  BarChart2,
  Zap,
  Globe,
  Binary,
  Database,
  Network,
  GitBranch,
  Box,
  Activity,
  Award,
  Users,
  Mic,
  Compass,
  Languages,
} from 'lucide-react';

export const SkillsSection: React.FC = () => {
  const { content } = useLanguage();
  const { skillCategories, languages } = content;

  // Icon mapping
  const renderIcon = (iconName: string) => {
    const props = { className: 'w-4 h-4 text-cyan-400 group-hover:text-cyan-300' };
    switch (iconName) {
      case 'Terminal':
        return <Terminal {...props} />;
      case 'Cpu':
        return <Cpu {...props} />;
      case 'Brain':
        return <Brain {...props} />;
      case 'Layers':
        return <Layers {...props} />;
      case 'Eye':
        return <Eye {...props} />;
      case 'Sparkles':
        return <Sparkles {...props} />;
      case 'BarChart2':
        return <BarChart2 {...props} />;
      case 'Zap':
        return <Zap {...props} />;
      case 'Globe':
        return <Globe {...props} />;
      case 'Binary':
        return <Binary {...props} />;
      case 'Database':
        return <Database {...props} />;
      case 'Network':
        return <Network {...props} />;
      case 'GitBranch':
        return <GitBranch {...props} />;
      case 'Box':
        return <Box {...props} />;
      case 'Activity':
        return <Activity {...props} />;
      case 'Award':
        return <Award {...props} />;
      case 'Users':
        return <Users {...props} />;
      case 'Mic':
        return <Mic {...props} />;
      case 'Compass':
        return <Compass {...props} />;
      default:
        return <Cpu {...props} />;
    }
  };

  return (
    <section id="skills" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Brain className="w-3.5 h-3.5 text-cyan-400" />
          <span>Technical Matrix & Competencies</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading-en tracking-tight text-white mb-3">
          Skills & Capabilities
        </h2>
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light mb-4">
          A battle-tested engineering stack spanning low-level algorithms, autonomous robotics controllers, and commercial software systems.
        </p>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto rounded-full" />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
        {skillCategories.map((category) => (
          <div
            key={category.id}
            className="glass-panel p-5 sm:p-7 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 shadow-lg shadow-cyan-950/10 flex flex-col"
          >
            <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-cyan-500/20">
              <h3 className="font-heading-en text-base sm:text-lg font-bold text-slate-100 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{category.title}</span>
              </h3>
              <span className="text-[11px] font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/25">
                {category.skills.length} Items
              </span>
            </div>

            {/* Chips Container */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  onClick={() => sound.playClick(1000)}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-medium transition-all duration-300 cursor-pointer ${
                    skill.featured
                      ? 'bg-cyan-950/50 border border-cyan-400/40 text-cyan-100 hover:bg-cyan-900/60 hover:border-cyan-300 hover:shadow-[0_0_16px_rgba(34,211,238,0.35)]'
                      : 'bg-white/5 border border-slate-700/60 text-slate-300 hover:bg-white/10 hover:border-cyan-400/40 hover:text-white'
                  } hover:-translate-y-0.5`}
                >
                  {renderIcon(skill.iconName)}
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-cyan-400/70 font-mono hidden sm:inline group-hover:text-cyan-300">
                    &bull; {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Language Proficiency Bar */}
      <div className="glass-panel p-5 sm:p-7 rounded-2xl border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 sm:p-3 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
            <Languages className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Linguistic Fluency
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light">
              Fluent technical, scientific, and leadership communications
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="px-3.5 py-1.5 sm:py-2 rounded-xl bg-cyan-950/40 border border-cyan-400/30 flex items-center gap-2.5"
            >
              <span className="font-bold text-white text-xs sm:text-sm">{lang.name}</span>
              <span className="text-xs font-mono text-cyan-300 px-2 py-0.5 rounded bg-cyan-500/20">
                {lang.proficiency}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
