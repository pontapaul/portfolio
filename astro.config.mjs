// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://pontapaul.com',
  integrations: [
    sitemap({
      // Drop the bare redirect routes (/, /portfolio, …) — only index the localized pages.
      filter: (page) => /\/(it|en)(\/|$)/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: 'it',
        locales: { it: 'it', en: 'en' },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});