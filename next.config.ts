import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // временные редиректы, пока поисковые системы не раздуплятся.
  async redirects() {
    return [
      {
        source: "/:path((?!yachts).*)\\.html",
        destination: "/boats/:path",
        permanent: true,
      },
      {
        // https://yahta-yalta.ru/yachts.html
        source: "/yachts.html",
        destination: "/",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
