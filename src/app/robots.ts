import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/recipes", "/events"],
      },
    ],
    sitemap: "https://www.akshayjagadeesh.com/sitemap.xml",
  };
}
