# CLAUDE.md — AI assistant context for the portfolio project

## Project overview

Personal portfolio website for **Paolo Pontarollo**, built with Astro. Static site with three main pages: homepage, portfolio/CV, and personal projects. Self-hosted via Docker + Nginx behind Nginx Proxy Manager on `moon`.

## Architecture

```
Browser (HTTPS)
   │
Nginx Proxy Manager (moon) — TLS termination
   │
[Docker] portfolio — nginx:alpine serving Astro static build
```

## Stack

- **Framework:** Astro (latest stable)
- **Styling:** TailwindCSS v3
- **Language:** TypeScript
- **Container:** Docker multi-stage build (Node build → nginx:alpine)
- **Deployment:** served as static site

## Pages

- `/` — Homepage: ASCII face hero, brief intro, projects section (laugon-style), links to portfolio
- `/portfolio` — Portfolio: work experience, skills, downloadable CV
- `/projects/[slug]` — Project detail page (dynamic route, one per project)

No standalone `/projects` listing page — projects are surfaced directly on the homepage.

## Design system

### Palette

```css
--color-bg:        #111111   /* near-black background */
--color-text:      #f0f0f0   /* off-white primary text */
--color-muted:     #a3a3a3   /* secondary/muted text */
--color-accent:    #38bdf8   /* sky-blue — ASCII face, links, highlights */
--color-border:    #2a2a2a   /* subtle borders */
```

### Typography

- Font: **Space Grotesk** (Google Fonts) — modern, slightly quirky, developer-appropriate
- Headings: bold, large, tight letter-spacing
- Body: regular weight, comfortable line-height (1.6–1.7)

### Tone & copy

- Language: **Italian**
- Informal and direct — "Ciao, sono Paolo" style, not corporate
- First person, conversational

### Visual identity

- **ASCII face hero**: the profile photo (`public/assets/pontarollopaolo.jpg`) rendered as ASCII art using the accent color (`#38bdf8`) on the dark background. Use a pre-generated ASCII string or a JS library like `ascii-art` at build time.
- **Background texture**: subtle CSS grain/noise overlay for depth — no harsh patterns
- **No heavy animations** — subtle fade-in on scroll is fine, nothing distracting

### Component style

- Cards: dark background (`#1a1a1a`), `1px` border (`#2a2a2a`), `8px` radius, subtle hover lift
- Buttons: outlined style with accent color border + text, fill on hover
- Tags/badges: small, monospace font, accent-colored border
- Links: accent color, no underline by default, underline on hover

## Owner info

- **Name:** Paolo Pontarollo
- **Role:** Full Stack Developer
- **Stack:** Laravel, PHP, Vue.js, Nuxt.js, TypeScript, TailwindCSS, Docker
- **Location:** Bassano del Grappa, VI - Italy
- **Email:** pontapaul@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/paolo-pontarollo
- **GitHub:** https://github.com/pontapaul
- **CV PDF:** `public/assets/cv.pdf`
- **Profile photo:** `public/assets/pontarollopaolo.jpg`

## Work experience

```ts
const experiences = [
  {
    role: "Fullstack Developer",
    company: "4HSE Srl",
    location: "Verona, IT",
    period: "Settembre 2024 – Aprile 2026",
    description: "Manutenzione evolutiva e miglioramento continuo della piattaforma software per la gestione della sicurezza sul lavoro. Stack: PHP Yii2 (backend multitenant) + vanilla JavaScript (frontend custom).",
    tags: ["PHP", "Yii2", "JavaScript"],
  },
  {
    role: "Tech Lead",
    company: "Neosperience Spa",
    location: "Bassano del Grappa, IT",
    period: "Ottobre 2023 – Settembre 2025",
    description: "Coordinamento e supervisione dei team di sviluppo. Consolidamento delle skill organizzative e di analisi, mantenendo continuità con lo sviluppo del core della piattaforma.",
    tags: ["Team Lead", "Management", "Laravel", "Vue.js"],
  },
  {
    role: "Full Stack Developer",
    company: "NeoSperience – Workup",
    location: "Bassano del Grappa, IT",
    period: "Marzo 2021 – Settembre 2023",
    description: "Rework completo del CMS con NuxtJS e backend headless Laravel. R&D frontend e backend, affiancamento colleghi, sviluppo ecommerce avanzati.",
    tags: ["NuxtJS", "Laravel", "Vue.js", "PHP"],
  },
  {
    role: "Backend Developer",
    company: "Eurostep",
    location: "Montebelluna, IT",
    period: "Ottobre 2020 – Marzo 2021",
    description: "Sviluppo di una piattaforma per collegare servizi e-commerce, con focus su modularità dei package Laravel e design pattern.",
    tags: ["Laravel", "PHP"],
  },
  {
    role: "R&D Developer",
    company: "Workup",
    location: "Bassano del Grappa, IT",
    period: "Gennaio 2017 – Settembre 2019",
    description: "Sviluppo di un CMS custom modulare basato su Laravel, con integrazioni a servizi esterni (Algolia, AWS). Migrazione frontend da jQuery a VueJS.",
    tags: ["Laravel", "VueJS", "jQuery", "PHP"],
  },
];
```

## Skills

```ts
const skillGroups = [
  { category: "Backend",    skills: ["PHP", "Laravel", "Yii2", "MySQL"] },
  { category: "Frontend",   skills: ["Vue.js", "Nuxt.js", "TypeScript", "JavaScript", "TailwindCSS"] },
  { category: "DevOps",     skills: ["Docker", "Nginx", "Git"] },
  { category: "Soft skill", skills: ["Team work", "Tech Lead", "Management"] },
];
```

## Projects data (`src/data/projects.ts`)

```ts
export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  coverImage?: string;   // only required for featured projects
  wip?: boolean;
  featured: boolean;    // featured: large laugon-style entry with cover + detail page
                        // !featured: compact row, links directly to repo/live, no detail page
}

export const projects: Project[] = [
  // — FEATURED (full detail page + cover image) —
  {
    slug: "tsc-green-volley",
    title: "TSC Green Volley",
    subtitle: "Gestionale per torneo di beach volley",
    description: "Piattaforma per la gestione completa del torneo estivo TSC Green Volley: iscrizioni squadre, gironi, tabelloni, classifiche e risultati in tempo reale.",
    tags: ["Laravel", "Vue 3", "Framework7", "MySQL"],
    liveUrl: "https://tscgreenvolley.it",
    repoUrl: "https://github.com/pontapaul/tsc",
    coverImage: "/assets/projects/tsc-green-volley/cover.png",
    featured: true,
  },
  {
    slug: "volleyball-coach",
    title: "volleyball.coach",
    subtitle: "Suite di strumenti per allenatori di pallavolo",
    description: "Suite di strumenti digitali per allenatori: gestione rosa, statistiche partite, pianificazione allenamenti.",
    tags: ["WIP"],
    coverImage: "/assets/projects/volleyball-coach/cover.png",
    wip: true,
    featured: true,
  },
  // — MINOR (compact row, no detail page) —
  {
    slug: "jdownloader-web",
    title: "jdownloader-web",
    subtitle: "Web UI moderna per JDownloader2",
    description: "Interfaccia web self-hosted per JDownloader2, ispirata alla UI desktop. Vue 3 + Docker.",
    tags: ["Vue 3", "TypeScript", "Docker"],
    repoUrl: "https://github.com/pontapaul/jdownloader-web",
    wip: true,
    featured: false,
  },
  {
    slug: "portfolio",
    title: "portfolio",
    subtitle: "Questo sito",
    description: "Il sito che stai guardando — portfolio personale costruito con Astro.",
    tags: ["Astro", "TypeScript", "TailwindCSS"],
    repoUrl: "https://github.com/pontapaul/portfolio",
    liveUrl: "/",
    featured: false,
  },
];
```

## Project structure

```
public/
  assets/
    cv.pdf
    pontarollopaolo.jpg
    projects/
      tsc-green-volley/
        cover.png
      volleyball-coach/
        cover.png
src/
  layouts/
    BaseLayout.astro
    ProjectLayout.astro     # layout for detail pages
  pages/
    index.astro
    portfolio.astro
    projects/
      tsc-green-volley.astro
      volleyball-coach.astro
  components/
    Nav.astro
    Footer.astro
    HeroSection.astro
    AsciiPortrait.astro
    ProjectPreview.astro    # card used in homepage projects section
    ExperienceCard.astro
    SkillBadge.astro
  data/
    projects.ts             # typed project data array
  styles/
    global.css
```

## Code conventions

- Astro components only (no React/Vue/Svelte unless strictly needed)
- TailwindCSS utility classes + CSS custom properties for palette
- TypeScript strict mode
- No client-side JS unless needed
- Mobile-first responsive design

## Docker

Multi-stage Dockerfile:
1. `node:lts-alpine` — install deps, run `astro build`
2. `nginx:alpine` — copy `dist/` and serve

No environment variables needed (fully static site).
