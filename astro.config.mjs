// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Deployed to the XuKyle.github.io user site, so the site lives at the domain root.
export default defineConfig({
  site: 'https://xukyle.github.io',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
