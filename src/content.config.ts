import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const reflections = defineCollection({
  loader: glob({ base: "./src/content/reflections", pattern: "*.md" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    topic: z.string(),
    pubDate: z.coerce.date().optional(),
    draft: z.boolean().default(true),
    featured: z.boolean().default(false),
    image: z.string().optional(),
    linkedInUrl: z.string().url().optional(),
  }),
});

export const collections = { reflections };
