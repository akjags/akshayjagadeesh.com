import type { MetadataRoute } from "next";
import { posts } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.akshayjagadeesh.com";
  return [
    "",
    "/about",
    "/writing",
    "/publications",
    ...posts.map((post) => `/writing/${post.slug}`),
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
