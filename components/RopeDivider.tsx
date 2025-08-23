import { cn } from "@/lib/utils"

type RopeDividerProps = {
  placement?: "top" | "bottom"
}

export const RopeDivider = ({ placement = "bottom" }: RopeDividerProps) => {
  return (
    <div
      className={cn(
        "absolute left-0 z-10 h-4 w-full bg-[url('/images/rope.png')] bg-center bg-repeat-x",
        placement === "bottom" ? "bottom-0" : "top-0",
      )}
    />
  )
}
