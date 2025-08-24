import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path.html",
        destination: "/boats/:path",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
