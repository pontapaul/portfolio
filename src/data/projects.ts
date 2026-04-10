export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  coverImage?: string;
  wip?: boolean;
  featured: boolean;
}

export const projects: Project[] = [
  // — FEATURED (full detail page + cover image) —
  {
    slug: "tsc-green-volley",
    title: "TSC Green Volley",
    subtitle: "Gestionale per torneo di beach volley",
    description:
      "Piattaforma per la gestione completa del torneo estivo TSC Green Volley: iscrizioni squadre, gironi, tabelloni, classifiche e risultati in tempo reale.",
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
    description:
      "Suite di strumenti digitali per allenatori: gestione rosa, statistiche partite, pianificazione allenamenti.",
    tags: ["WIP"],
    coverImage: "/assets/projects/volleyball-coach/cover.png",
    wip: true,
    featured: true,
  },
  // — MINOR (compact row, no detail page) —
  {
    slug: "cgc",
    title: "CGC",
    subtitle: "Gestionale torneo — fork evoluto di TSC",
    description:
      "Fork evolutivo di TSC Green Volley, adattato per il torneo CGC. Stessa base tecnica, nuove funzionalità e personalizzazioni specifiche per il contesto.",
    tags: ["Laravel", "Vue 3", "Framework7", "MySQL"],
    repoUrl: "https://github.com/pontapaul/cgc",
    featured: false,
  },
  {
    slug: "jdownloader-web",
    title: "jdownloader-web",
    subtitle: "Web UI moderna per JDownloader2",
    description:
      "Interfaccia web self-hosted per JDownloader2, ispirata alla UI desktop. Vue 3 + Docker.",
    tags: ["Vue 3", "TypeScript", "Docker"],
    repoUrl: "https://github.com/pontapaul/jdownloader-web",
    wip: true,
    featured: false,
  },
  {
    slug: "portfolio",
    title: "portfolio",
    subtitle: "Questo sito",
    description:
      "Il sito che stai guardando — portfolio personale costruito con Astro.",
    tags: ["Astro", "TypeScript", "TailwindCSS"],
    repoUrl: "https://github.com/pontapaul/portfolio",
    liveUrl: "/",
    featured: false,
  },
];
