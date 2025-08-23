import { useEffect, useState } from "react"

type useOnClickOutsideParams = {
  onClose: () => void
}

export const useOnClickOutside = ({ onClose }: useOnClickOutsideParams) => {
  const [elRef, setElRef] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const listener = (event: any) => {
      if (!elRef?.contains(event.target)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [elRef, onClose])

  return { setElRef }
}
