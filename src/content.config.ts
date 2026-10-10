import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ base: './src/pages/posts', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string().min(1),
    pubDate: z.coerce.date(),
    description: z.string().min(1),
    tags: z.array(z.string()).default([]),
    layout: z.string().optional(),
  }),
});

export const collections = { posts };
