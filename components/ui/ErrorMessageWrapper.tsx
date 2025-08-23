"use client"
import { memo, useEffect, useState } from "react"
import { useController, useFormContext } from "react-hook-form"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type ErrorMessageWrapperProps = {
  name: string
  className?: string
  children: ReactNode
}

export const ErrorMessageWrapper = memo(
  ({ name, children, className }: ErrorMessageWrapperProps) => {
    const { control } = useFormContext()

    const {
      fieldState: { error, isDirty, isTouched },
    } = useController({
      name,
      control,
    })

    const [lastErrorMessage, setLastErrorMessage] = useState("")

    useEffect(() => {
      if (error?.message) {
        setLastErrorMessage(error.message)
      }
    }, [error?.message])

    const hasError = isDirty && isTouched && Boolean(error?.message)
    const hasLastErrorMessage = Boolean(lastErrorMessage)

    return (
      <div className={cn("flex w-full min-w-0 flex-col gap-1", className)}>
        {children}
        <div
          className={cn(
            "text-negative flex min-w-0 flex-col gap-3 text-wrap",
            hasError &&
              "max-h-[30px] opacity-100 transition-all duration-500 ease-out",
            !hasError &&
              hasLastErrorMessage &&
              "max-h-0 opacity-0 transition-all duration-500 ease-in",
          )}
          style={{
            maxHeight: hasError ? "30px" : "0",
            opacity: hasError ? 1 : 0,
          }}
        >
          {lastErrorMessage || " "}
        </div>
      </div>
    )
  },
)

ErrorMessageWrapper.displayName = "ErrorMessageWrapper"
