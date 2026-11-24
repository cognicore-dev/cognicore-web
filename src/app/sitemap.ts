import type { MetadataRoute } from "next";
import { pages, site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, updated }) => ({
    url: `${site.url}${path}`,
    lastModified: updated,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));
}
