import { useEffect, useRef, useState } from "react"
import { HEADER_HEIGHT } from "@/lib/constants"
import { throttle } from "@/lib/utils"

const useHeaderScroll = () => {
  const prevScroll = useRef(0)
  const [headerState, setHeaderState] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currScroll = window.scrollY
      if (currScroll <= HEADER_HEIGHT) {
        setHeaderState(null)
      } else if (prevScroll.current > currScroll) {
        setHeaderState("show")
      } else if (prevScroll.current < currScroll) {
        setHeaderState("hide")
      }
      prevScroll.current = currScroll
    })

    if (typeof window !== "undefined") {
      prevScroll.current = window.scrollY
      window.addEventListener("scroll", handleScroll, { passive: true })
      return () => {
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return headerState
}

export default useHeaderScroll
