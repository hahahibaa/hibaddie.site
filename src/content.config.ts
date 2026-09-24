import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Home page sections: src/content/home/*.md
const home = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/home' }),
  schema: z.object({
    name: z.string().optional(),
    tagline: z.string().optional(),
    photo: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
    items: z
      .array(
        z.object({
          title: z.string(),
          org: z.string().optional(),
          period: z.coerce.string().optional(),
          description: z.string().optional(),
          href: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

// Files starting with "_" are ignored, so you can keep templates/drafts around.
const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tools: z.array(z.string()).default([]),
    repo: z.string().optional(),
    link: z.string().optional(),
    featured: z.boolean().default(true),
    draft: z.boolean().default(false),
  }),
});

// The Test Bench: work in progress and experiments
const bench = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/bench' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    status: z.string().optional(), // e.g. "in progress", "works-ish", "abandoned"
    draft: z.boolean().default(false),
  }),
});

export const collections = { home, projects, bench };
