import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ProjectCategory, ProjectItem } from '../types/portfolio';
import { sound } from '../utils/soundEffects';
import {
  ExternalLink,
  Github,
  Rocket,
  ChevronRight,
  X,
} from 'lucide-react';

export const ProjectsSection: React.FC = () => {
  const { content } = useLanguage();
  const { projects, projectFilters } = content;
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="relative py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
          <Rocket className="w-3.5 h-3.5 text-cyan-400" />
          <span>Featured Missions & Engineering</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-heading-en tracking-tight text-white mb-3">
          Projects & Deep-Space Systems
        </h2>
        <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base font-light mb-4">
          Production systems, autonomous robotics, low-level algorithms, and commercial platforms built with rigorous engineering standards.
        </p>
        <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 mx-auto rounded-full" />
      </div>

      {/* Filter Category Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-14">
        {projectFilters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => {
              sound.playPulse();
              setActiveFilter(filter.id);
            }}
            type="button"
            className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer font-mono ${
              activeFilter === filter.id
                ? 'bg-gradient-to-r from-cyan-500 to-sky-500 text-[#070B1F] font-bold shadow-lg shadow-cyan-500/25 scale-105'
                : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-400/40 hover:bg-white/5'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="glass-panel glass-panel-hover rounded-2xl border border-cyan-500/20 overflow-hidden flex flex-col group transition-all duration-300 relative"
          >
            {/* Top Accent Strip */}
            <div className="h-1 w-full bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-500 group-hover:h-1.5 transition-all" />

            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
              <div>
                {/* Meta Badge Bar */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono uppercase bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
                    {project.category}
                  </span>
                  {project.metrics && (
                    <span className="text-[11px] font-mono text-cyan-400/90 font-medium">
                      {project.metrics}
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Tagline */}
                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed mb-4">
                  {project.tagline}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-slate-800">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-slate-300 border border-slate-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Controls */}
                <div className="flex items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => {
                      sound.playAffirmative();
                      setSelectedProject(project);
                    }}
                    type="button"
                    className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
                  >
                    <span>View Architecture</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View repository on GitHub"
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-300 border border-slate-700/60 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open live system"
                        className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Modal Detail View */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#070B1F] border border-cyan-400/40 p-5 sm:p-8 shadow-2xl shadow-cyan-950 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => {
                sound.playDismiss();
                setSelectedProject(null);
              }}
              type="button"
              aria-label="Close project modal"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase">
                {selectedProject.category}
              </span>
              {selectedProject.metrics && (
                <span className="text-xs font-mono text-cyan-400">
                  // {selectedProject.metrics}
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3">
              {selectedProject.title}
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed mb-5 font-light">
              {selectedProject.description}
            </p>

            {/* Architecture / Tech Stack */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2">
                Tech Stack & Modules:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-cyan-200 text-xs font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-slate-700 text-white hover:border-cyan-400 hover:bg-cyan-950/40 text-xs sm:text-sm font-semibold transition-all font-mono"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
              </a>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-[#070B1F] hover:brightness-110 text-xs sm:text-sm font-bold transition-all font-mono"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Launch Live System</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
