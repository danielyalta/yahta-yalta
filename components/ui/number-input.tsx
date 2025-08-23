"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "./button"

interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  min?: number
  max?: number
  step?: number
}

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      min = -Infinity,
      max = Infinity,
      step = 1,
      value,
      onChange,
      ...props
    },
    ref,
  ) => {
    const handleChange = (newValue: number) => {
      if (newValue >= min && newValue <= max) {
        onChange?.({
          target: { value: newValue.toString() },
        } as React.ChangeEvent<HTMLInputElement>)
      }
    }

    const increment = () => {
      const newVal = Number(value) + step
      handleChange(newVal)
    }

    const decrement = () => {
      const newVal = Number(value) - step
      handleChange(newVal)
    }

    return (
      <div
        className={cn(
          "border-input flex h-[60px] w-full max-w-xs items-center rounded-md border bg-transparent shadow-xs",
          className,
        )}
      >
        <Input
          ref={ref}
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => handleChange(Number(e.target.value))}
          className={cn(
            "flex-1 [appearance:textfield] border-0 shadow-none focus-visible:ring-0",
            "[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          )}
          {...props}
        />
        <div className="border-input flex h-full flex-col overflow-hidden border-l">
          <Button
            size="sm"
            variant="flat"
            onClick={increment}
            className="flex h-1/2 items-center justify-center px-3"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <div className="border-input border-t" />
          <Button
            size="sm"
            variant="flat"
            onClick={decrement}
            className="flex h-1/2 items-center justify-center"
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
    )
  },
)

NumberInput.displayName = "NumberInput"
