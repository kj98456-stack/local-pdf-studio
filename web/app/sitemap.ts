import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://local-pdf-studio.pages.dev";
  const routes = ["", "/tools/merge-pdf", "/tools/images-to-pdf", "/tools/split-pdf", "/tools/rotate-pdf", "/about", "/contact", "/privacy"];
  return routes.map((r) => ({ url: `${base}${r}`, lastModified: new Date() }));
}
