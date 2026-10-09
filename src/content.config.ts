import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { readFileSync } from 'node:fs';
import matter from 'gray-matter';

// Single Markdown file is the only source of truth for the bookmark list.
// Each item in the frontmatter `items` array becomes one collection entry.
const httpsUrl = z.string().refine(
  (value) => {
    try {
      return new URL(value).protocol === 'https:';
    } catch {
      return false;
    }
  },
  { message: '链接必须是合法的 https 地址' },
);

const bookmarks = defineCollection({
  loader: async () => {
    const source = readFileSync(new URL('./data/bookmarks.md', import.meta.url), 'utf8');
    const { data } = matter(source);
    const items = Array.isArray(data.items) ? data.items : [];
    return items.map((item, index) => {
      const { key, ...rest } = item as Record<string, unknown> & { key?: string };
      return { id: key ?? `bookmark-${index + 1}`, ...rest };
    });
  },
  schema: z.object({
    title: z.string().min(1),
    url: httpsUrl,
    category: z.string().min(1),
    tags: z.array(z.string()).default([]),
    description: z.string().default(''),
    note: z.string().optional(),
    status: z.enum(['verified', 'pending']).default('verified'),
    featured: z.boolean().default(false),
  }),
});

export const collections = { bookmarks };
