"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { useFormContext, Controller } from "react-hook-form"

import { cn } from "@/lib/utils"

type SliderProps = {
  name: string
  min?: number
  max?: number
  step?: number
  className?: string
}

function Slider({
  name,
  min = 0,
  max = 100,
  step = 1,
  className,
}: SliderProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const _values = Array.isArray(field.value) ? field.value : [min, max]

        return (
          <SliderPrimitive.Root
            data-slot="slider"
            min={min}
            max={max}
            step={step}
            value={_values}
            onValueChange={field.onChange}
            className={cn(
              "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
              className,
            )}
          >
            <SliderPrimitive.Track
              data-slot="slider-track"
              className={cn(
                "bg-darkblue2 relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
              )}
            >
              <SliderPrimitive.Range
                data-slot="slider-range"
                className={cn(
                  "bg-bronze absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
                )}
              />
            </SliderPrimitive.Track>
            {Array.from({ length: _values.length }, (_, index) => (
              <SliderPrimitive.Thumb
                data-slot="slider-thumb"
                key={index}
                className="border-primary bg-lightblue ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
              />
            ))}
          </SliderPrimitive.Root>
        )
      }}
    />
  )
}

export { Slider }
