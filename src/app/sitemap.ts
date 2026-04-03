import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ccstudy.top";
  const routes = [
    "", "/architecture", "/entry", "/tools", "/commands",
    "/ink", "/plugins", "/assistant", "/coordinator",
    "/hooks", "/buddy", "/about"
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
