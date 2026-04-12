import type { MetadataRoute } from "next";
import projectsBase from "@/data/projectsBase.json";
import { routing } from "@/i18n/routing";
import { absoluteUrl, languageAlternates } from "@/lib/siteUrls";

const STATIC_PATHS: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/projects", changeFrequency: "weekly", priority: 0.9 },
  { path: "/search-console", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, changeFrequency, priority } of STATIC_PATHS) {
    entries.push({
      url: absoluteUrl(routing.defaultLocale, path),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: { languages: languageAlternates(path) },
    });
  }

  for (const p of projectsBase as { id: number; date: string }[]) {
    const path = `/projects/${p.id}`;
    entries.push({
      url: absoluteUrl(routing.defaultLocale, path),
      lastModified: new Date(p.date),
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: languageAlternates(path) },
    });
  }

  return entries;
}
