import type { MetadataRoute } from "next"
import { orderedBoatsData } from "@/data"
import { SITE_URL } from "@/lib/constants"

export default function sitemap(): MetadataRoute.Sitemap {
  // static routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ]

  // boats dynamic routes
  const boatRoutes: MetadataRoute.Sitemap = orderedBoatsData.flatMap((boat) => [
    {
      url: `${SITE_URL}/boats/${boat.name}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/boats/${boat.name}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ])

  return [...routes, ...boatRoutes]
}
