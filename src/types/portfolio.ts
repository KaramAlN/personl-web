export type Language = 'en';

export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
  calendly?: string;
  phone?: string;
}

export interface StatItem {
  id: string;
  value: string | number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

export interface SkillItem {
  name: string;
  iconName: string;
  level: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export type ProjectCategory = 'all' | 'ai' | 'space' | 'web' | 'research';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'ai' | 'space' | 'web' | 'research';
  tagline: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  metrics?: string;
  featured?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  tags: string[];
  highlight?: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  verifyUrl: string;
  badgeCode: string;
}

export interface PortfolioContent {
  personal: {
    nameEn: string;
    nameAr: string;
    roles: string[];
    tagline: string;
    bioParagraphs: string[];
    education: {
      degree: string;
      institution: string;
      period: string;
      gpaOrHonors?: string;
    };
    location: string;
    email: string;
    socials: SocialLinks;
    availability: string;
  };
  nav: {
    about: string;
    skills: string;
    projects: string;
    experience: string;
    certifications: string;
    studyTool: string;
    contact: string;
    cv: string;
    missionStatus: string;
  };
  stats: StatItem[];
  skillCategories: SkillCategory[];
  languages: {
    name: string;
    proficiency: string;
  }[];
  projectFilters: {
    id: ProjectCategory;
    label: string;
  }[];
  projects: ProjectItem[];
  experiences: ExperienceItem[];
  certifications: CertificationItem[];
  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    sendButton: string;
    sending: string;
    successTitle: string;
    successMessage: string;
    locationLabel: string;
    responseTime: string;
  };
  studyTool: {
    badge: string;
    title: string;
    subtitle: string;
    selectSubject: string;
    selectType: string;
    selectDifficulty: string;
    generateBtn: string;
    generatingBtn: string;
    promptCardTitle: string;
    copyPromptBtn: string;
    copiedPromptBtn: string;
    testQuizTitle: string;
    apiKeyHint: string;
  };
  footer: {
    rights: string;
    techStackNote: string;
    backToTop: string;
  };
}
