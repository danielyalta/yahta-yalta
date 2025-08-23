import { orderedBoatsData } from "@/data"
import boatImages from "@/data/boatImages.json"
import { notFound } from "next/navigation"

export const getBoatData = (boatName: BoatName) => {
  const data = orderedBoatsData.find(({ name }) => name === boatName)!
  const images = boatImages[boatName]
  const mainImage = images?.[0]

  if (!(boatName in boatImages)) {
    notFound()
  }

  return { data, images, mainImage }
}
