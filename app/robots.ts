import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://yahta-yalta.com"

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
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
