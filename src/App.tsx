import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { CosmicStarfield } from './components/CosmicStarfield';
import { NeuralNetworkCanvas } from './components/NeuralNetworkCanvas';
import { CursorGlowTrail } from './components/CursorGlowTrail';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TimelineSection } from './components/TimelineSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CvModal } from './components/CvModal';

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="relative min-h-screen bg-[#070B1F] text-[#E6EDF6] selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Layer 1: 3D Three.js WebGL Cosmic Starfield */}
        <CosmicStarfield />

        {/* Layer 2: Neural Network Nodes & Electrical Synaptic Pulses Canvas */}
        <NeuralNetworkCanvas />

        {/* Layer 3: Cursor-following Glowing Particles & Gravitational Field */}
        <CursorGlowTrail />

        {/* Sticky Mission Control Glass Navbar */}
        <Navbar onOpenCv={() => setCvModalOpen(true)} />

        {/* Main Content Area */}
        <main className="relative z-10">
          <HeroSection onOpenCv={() => setCvModalOpen(true)} />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <TimelineSection />
          <CertificationsSection />
          <ContactSection />
        </main>

        {/* Telemetry Footer */}
        <Footer />

        {/* Curriculum Vitae Modal */}
        <CvModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />
      </div>
    </LanguageProvider>
  );
}
