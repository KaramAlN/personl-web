import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { PortfolioContent } from '../types/portfolio';
import { portfolioData } from '../data/portfolioData';
import { initGlobalButtonSound } from '../utils/soundEffects';

interface LanguageContextType {
  language: 'en';
  content: PortfolioContent;
  isRTL: boolean;
  reducedMotion: boolean;
  setReducedMotion: (val: boolean) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language = 'en';

  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
      localStorage.setItem('karam_portfolio_lang', 'en');
    }
  }, []);

  // Initialize global audio click listener
  useEffect(() => {
    const cleanup = initGlobalButtonSound();
    return cleanup;
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const isRTL = false;
  const content = useMemo(() => portfolioData.en, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        content,
        isRTL,
        reducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
