import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Mirrors the `posts` collection in keystatic.config.ts. */
const posts = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.strictObject({
      title: z.string(),
      description: z.string(),
      // Keystatic writes `2026-11-01`, which YAML may already have parsed into a Date.
      date: z.coerce.date(),
      // Keystatic writes `cover: null` or leaves it out when there's no image.
      cover: image().nullish(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
