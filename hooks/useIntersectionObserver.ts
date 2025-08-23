import { useEffect, useState } from "react"
import type { MutableRefObject } from "react"

export function useIntersectionObserver(
  ref: MutableRefObject<Element | null>,
  {
    threshold = 0,
    root = null,
    rootMargin = "0%",
    ...options
  }: IntersectionObserverInit = {},
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    const element = ref.current

    if (element) {
      observer.observe(element)
      return () => {
        observer.unobserve(element)
      }
    }
  }, [ref, options])

  return isIntersecting
}
