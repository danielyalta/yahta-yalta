import { Boats } from "@/components/Boats/Boats"
import { Cards } from "./(home-components)/Cards/Cards"
import { Intro } from "./(home-components)/Intro/Intro"
import { Reviews } from "./(home-components)/Reviews/Reviews"

export default function Home() {
  return (
    <>
      <Intro />
      <Cards />
      <Boats />
      <Reviews />
    </>
  )
}
