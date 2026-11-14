import { getCollection, type CollectionEntry } from "astro:content";

export async function getReflections() {
  const entries = await getCollection("reflections", ({ data }) => import.meta.env.DEV || !data.draft);
  return entries.sort((a, b) => (b.data.pubDate?.getTime() ?? 0) - (a.data.pubDate?.getTime() ?? 0));
}

export function reflectionMeta({ body, data }: CollectionEntry<"reflections">) {
  const minutes = Math.max(1, Math.ceil((body?.trim().split(/\s+/).length ?? 0) / 220));
  const date = data.pubDate
    ? new Intl.DateTimeFormat("en", { dateStyle: "long", timeZone: "UTC" }).format(data.pubDate)
    : undefined;
  return [data.topic, data.draft ? "Draft" : date, `${minutes} min read`].filter(Boolean).join(" · ");
}
