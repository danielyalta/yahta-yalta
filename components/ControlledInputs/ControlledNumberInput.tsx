"use client"

import {
  Controller,
  Control,
  useFormContext,
  ControllerProps,
} from "react-hook-form"
import { NumberInput } from "@/components/ui/number-input"
import { ErrorMessageWrapper } from "../ui/ErrorMessageWrapper"

interface ControlledNumberInputProps {
  name: string
  rules?: ControllerProps["rules"]
  label?: string
  min?: number
  max?: number
  step?: number
  className?: string
}

export function ControlledNumberInput({
  name,
  min,
  max,
  step,
  className,
  rules,
}: ControlledNumberInputProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <ErrorMessageWrapper name={name}>
          <NumberInput
            {...field}
            id={name}
            value={field.value ?? ""}
            onChange={(e) => field.onChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className={className}
          />
        </ErrorMessageWrapper>
      )}
    />
  )
}
