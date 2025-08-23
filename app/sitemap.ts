import type { MetadataRoute } from "next"
import { orderedBoatsData } from "@/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://yahta-yalta.com"

  // static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ]

  // boats dynamic routes
  const boatRoutes: MetadataRoute.Sitemap = orderedBoatsData.flatMap((boat) => [
    {
      url: `${baseUrl}/boats/${boat.name}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/boats/${boat.name}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ])

  return [...routes, ...boatRoutes]
}
