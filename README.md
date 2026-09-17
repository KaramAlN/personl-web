# Karam Naamneh — Deep Space & Artificial Intelligence Portfolio
> Personal portfolio website of Karam Naamneh (كرم نعامنة) — AI Student, Local Lead for NASA Space Apps Challenge Irbid, and AI Team Leader at Breakers.

## 🌌 Overview
This portfolio is built with a bespoke **"Deep space meets artificial intelligence"** visual identity. Designed to evoke a mission control telemetry interface floating in the cosmos, it pairs scientific precision with cutting-edge front-end engineering.

### Key Highlights
- **Full Bilingual Support (Arabic & English)**: Complete RTL mirroring, typography switching (IBM Plex Sans Arabic / Space Grotesk / Inter), with preference stored in `localStorage`.
- **Three-Tier Dynamic Animation Stack**:
  1. **3D WebGL Cosmic Starfield**: Real-time Three.js star field with depth, cosmic nebula particles, smooth scroll parallax, and responsive particle density.
  2. **Neural Network Node Layer**: HTML5 Canvas connecting synaptic nodes with electrical pulses traveling along links, reacting to mouse displacement.
  3. **Cursor Glow & Particle Trail**: Glowing cyan/violet particles following mouse velocity with gravitational field (automatically disabled on touch devices).
- **Student Exam & Revision Platform Generator**: An interactive tool with an official API System Prompt ready for immediate integration with Gemini API or OpenAI API to generate revision questions for university students.
- **Interactive Experience & Certifications**: Vertical timeline with glowing scroll fill, project filter matrix, hover particle bursts, working contact form, and CV viewer.

---

## 🛠️ Single-Source Configuration File

All personal data, projects, translations, skills, social links, and contact information live in **one centralized file**:

👉 **`/src/data/portfolioData.ts`**

To customize:
1. **Personal info**: Edit `personal.nameEn`, `personal.nameAr`, `personal.roles`, `personal.tagline`, `personal.bioParagraphs`, and `personal.education`.
2. **Social links & Contact**: Update `personal.socials` (GitHub, LinkedIn, Instagram, Email).
3. **Projects**: Add or modify entries in `projects` (title, description, tech stack, GitHub repo, live demo URLs).
4. **Skills Matrix**: Update items in `skillCategories` (AI/ML, Programming, Tools & Cloud, Leadership).
5. **Certifications**: Add verified certificates in `certifications`.

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Build for production
npm run build
```

The application will launch on `http://localhost:3000`.

---

## 🎓 Student Revision Platform Prompt

The prompt template designed for the student quiz and question generation platform is accessible directly within the portfolio under the **"منصة مراجعة الطلاب / Student AI Tool"** section and exported in `/src/data/portfolioData.ts` under `studentRevisionPromptTemplate`.
