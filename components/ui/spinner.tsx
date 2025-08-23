import { Loader2 } from "lucide-react"
import { VariantProps, cva } from "class-variance-authority"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const spinnerVariants = cva("text-primary animate-spin", {
  variants: {
    size: {
      xxs: "size-6",
      s: "h-12 w-12",
      m: "h-24 w-24",
      l: "h-36 w-36",
    },
  },
  defaultVariants: {
    size: "m",
  },
})

type SpinnerProps = React.HTMLAttributes<SVGSVGElement> &
  VariantProps<typeof spinnerVariants> & {
    withContainer?: boolean
    containerClassName?: string
  }

const Spinner = forwardRef<SVGSVGElement, SpinnerProps>(
  (
    { className, size, withContainer = false, containerClassName, ...props },
    ref,
  ) => {
    const spinnerElement = (
      <Loader2
        ref={ref}
        strokeWidth={1}
        className={cn(spinnerVariants({ size }), "text-bronze", className)}
        {...props}
      />
    )

    return withContainer ? (
      <div
        className={cn(
          "flex h-full w-full grow items-center justify-center",
          containerClassName,
        )}
      >
        {spinnerElement}
      </div>
    ) : (
      spinnerElement
    )
  },
)

Spinner.displayName = "Spinner"

export { Spinner }
