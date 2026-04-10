import type { Locale, TranslationKey } from "../i18n";
import { t } from "../i18n";

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

interface ProjectDef {
  slug: string;
  title: string;
  subtitleKey: TranslationKey;
  descriptionKey: TranslationKey;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  coverImage?: string;
  wip?: boolean;
  featured: boolean;
}

const projectDefs: ProjectDef[] = [
  // — FEATURED (full detail page + cover image) —
  {
    slug: "tsc-green-volley",
    title: "TSC Green Volley",
    subtitleKey: "project.tsc.subtitle",
    descriptionKey: "project.tsc.description",
    tags: ["Laravel", "Vue 3", "Framework7", "MySQL"],
    liveUrl: "https://tscgreenvolley.it",
    repoUrl: "https://github.com/pontapaul/tsc",
    coverImage: "/assets/projects/tsc-green-volley/cover.svg",
    featured: true,
  },
  {
    slug: "volleyball-coach",
    title: "volleyball.coach",
    subtitleKey: "project.coach.subtitle",
    descriptionKey: "project.coach.description",
    tags: ["WIP"],
    coverImage: "/assets/projects/volleyball-coach/cover.svg",
    wip: true,
    featured: true,
  },
  // — MINOR (compact row, no detail page) —
  {
    slug: "cgc",
    title: "CGC",
    subtitleKey: "project.cgc.subtitle",
    descriptionKey: "project.cgc.description",
    tags: ["Laravel", "Vue 3", "Framework7", "MySQL"],
    repoUrl: "https://github.com/pontapaul/cgc",
    featured: false,
  },
  {
    slug: "jdownloader-web",
    title: "jdownloader-web",
    subtitleKey: "project.jdownloader.subtitle",
    descriptionKey: "project.jdownloader.description",
    tags: ["Vue 3", "TypeScript", "Docker"],
    repoUrl: "https://github.com/pontapaul/jdownloader-web",
    wip: true,
    featured: false,
  },
  {
    slug: "portfolio",
    title: "portfolio",
    subtitleKey: "project.portfolio.subtitle",
    descriptionKey: "project.portfolio.description",
    tags: ["Astro", "TypeScript", "TailwindCSS"],
    repoUrl: "https://github.com/pontapaul/portfolio",
    liveUrl: "/",
    featured: false,
  },
];

export function getProjects(locale: Locale): Project[] {
  return projectDefs.map((def) => ({
    slug: def.slug,
    title: def.title,
    subtitle: t(locale, def.subtitleKey),
    description: t(locale, def.descriptionKey),
    tags: def.tags,
    liveUrl: def.liveUrl,
    repoUrl: def.repoUrl,
    coverImage: def.coverImage,
    wip: def.wip,
    featured: def.featured,
  }));
}
