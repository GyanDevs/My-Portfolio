import type { MetadataRoute } from "next";
import projects from "@/src/data/projects.json";

const BASE_URL = "https://gyan.design";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectSlugs = projects
    .filter((p) => !(p as { isPlaceholder?: boolean }).isPlaceholder)
    .map((p) => p.id);

  const projectUrls = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...projectUrls,
  ];
}
