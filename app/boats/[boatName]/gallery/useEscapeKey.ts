import { useRouter } from "next/navigation"
import { useEffect } from "react"

export const useEscapeKey = (boatName: BoatName) => {
  const router = useRouter()

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        router.push(`/boats/${boatName}`)
      }
    }

    document.addEventListener("keydown", handleEsc)

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [router, boatName])
}
