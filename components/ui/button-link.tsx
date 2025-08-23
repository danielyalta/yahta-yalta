import * as React from "react"
import Link, { LinkProps } from "next/link"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

type ButtonLinkProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    className?: string
    disabled?: boolean
    asChild?: boolean
    children: React.ReactNode
    target?: string
  }

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      children,
      target = "_self",
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : Link
    return (
      <Comp
        className={cn(
          disabled && "pointer-events-none opacity-50",
          buttonVariants({ variant, size, className }),
        )}
        ref={ref}
        target={target}
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </Comp>
    )
  },
)

ButtonLink.displayName = "ButtonLink"

export { ButtonLink }
