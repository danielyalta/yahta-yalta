import { SITE_URL } from "@/lib/constants"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: "Yandex",
        allow: "/",
        crawlDelay: 5, // 5 seconds
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 10, // 10 seconds
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
