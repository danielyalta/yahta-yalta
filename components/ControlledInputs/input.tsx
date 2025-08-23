import * as React from "react"
import { ControllerProps, useController, useFormContext } from "react-hook-form"
import { X } from "lucide-react"
import { Spinner } from "../ui/spinner"
import { cn } from "@/lib/utils"
import { MaskitoOptions } from "@maskito/core"
import { useMaskito } from "@maskito/react"
import { ErrorMessageWrapper } from "../ui/ErrorMessageWrapper"
import { withMaskitoRegister } from "@/lib/with-maskito-register"

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {
    isCleanable?: boolean
    isLoading?: boolean
    containerClassName?: string
    maskitoOptions?: MaskitoOptions
    errorMessageWrapperClassName?: string
    leftContent?: React.ReactNode
    rightContent?: React.ReactNode
  } & Pick<ControllerProps, "name" | "rules" | "defaultValue">
>(
  (
    {
      className,
      type,
      name,
      rules,
      defaultValue,
      isCleanable = false,
      disabled,
      isLoading,
      containerClassName,
      maskitoOptions,
      errorMessageWrapperClassName,
      leftContent,
      rightContent,
      ...props
    },
    ref,
  ) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        type === "number" &&
        ["e", "E", "+", "-"].includes(event.key) &&
        !(event.key === "-" && event.currentTarget.selectionStart === 0)
      ) {
        event.preventDefault()
      }
    }

    const { control, register } = useFormContext()

    const { field } = useController({
      name,
      control,
      rules,
      defaultValue,
    })

    const handleClear = () => {
      field.onChange("")
    }

    const inputRef = useMaskito({ options: maskitoOptions })

    return (
      <ErrorMessageWrapper name={name} className={errorMessageWrapperClassName}>
        <div className={cn("relative flex items-center", containerClassName)}>
          {leftContent && <div className="absolute left-2">{leftContent}</div>}
          {isLoading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <Spinner size="s" />
            </div>
          )}
          <input
            type={type}
            className={cn(
              "border-input ring-offset-background focus-visible:ring-ring bg-background-gray file:text-foreground placeholder:text-text-secondary flex h-full w-full gap-[8px] rounded-[12px] border p-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-base focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              type === "number" &&
                "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
              className,
            )}
            onKeyDown={handleKeyDown}
            disabled={disabled || isLoading}
            id={name}
            {...props}
            {...field}
            ref={ref}
            {...(maskitoOptions &&
              withMaskitoRegister(register(name, rules), inputRef))}
          />
          {!disabled && !isLoading && isCleanable && field.value && (
            <button
              type="button"
              onClick={handleClear}
              className="link absolute right-2"
            >
              <X className="text-icon-gray !size-5" />
            </button>
          )}
          {rightContent}
        </div>
      </ErrorMessageWrapper>
    )
  },
)

Input.displayName = "Input"

export { Input }
