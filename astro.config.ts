import { defineConfig, fontProviders } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Pages are static; only Keystatic's admin UI and API (/keystatic, /api/keystatic) render on demand, so they need a server.
  adapter: node({ mode: 'standalone' }),
  // Nothing uses Astro sessions; without this the Node adapter turns them on with filesystem storage.
  session: false,
  // Keystatic's admin UI is React; the blog itself ships no framework.
  integrations: [mdx(), react(), keystatic()],
  markdown: {
    // Shiki inlines the light colours and exposes the dark ones as `--shiki-dark*` variables, which
    // src/styles/global.css switches to under `.dark`.
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
  // Downloaded at build time and served from this site; no request to a font CDN at runtime.
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: 'Gentium Book Plus',
      cssVariable: '--font-gentium',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
      fallbacks: ['serif'],
    },
  ],
  vite: { plugins: [tailwindcss()] },
});
