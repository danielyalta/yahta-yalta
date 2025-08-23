import boatImages from "@/data/boatImages.json"

declare global {
  type BoatData = {
    mainImage?: OGImage
    cabins?: number
    capacity: number
    isHighSpeed?: boolean
    length?: number
    model?: string
    name: string
    price: number
    sleeps?: number
    toilets?: number
    slug: string
    type: "sailing" | "motor" | "catamaran"
    width?: number
    description: string
  }

  type BoatName = keyof typeof boatImages
}

export {}
