import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "hover:bg-lightblue2 bg-lightblue",
        secondary:
          "hover:border-lightblue2 hover:bg-lightblue border-2 border-white",
        flat: "hover:border-lightblue2 hover:bg-lightblue",
      },
      size: {
        lg: "px-8 py-4 text-lg font-semibold",
        xs: "max-h-[32px] max-w-[32px] p-1",
        sm: "h-[32px] gap-1.5 rounded-md px-3 has-[>svg]:px-2.5",
        m: "h-[40px] rounded-md px-4 has-[>svg]:px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      type={type}
      {...props}
    />
  )
}

export { Button, buttonVariants }
