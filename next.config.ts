import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path.html",
        destination: "/boats/:path",
        permanent: true, // 308 redirect
      },
    ]
  },
}

export default nextConfig
