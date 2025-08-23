"use client"

import { Controller, useFormContext, ControllerProps } from "react-hook-form"
import { Calendar as UncontrolledCalendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDownIcon } from "lucide-react"
import { useState } from "react"
import { ErrorMessageWrapper } from "../ui/ErrorMessageWrapper"

interface ControlledCalendarProps {
  name: string
  rules?: ControllerProps["rules"]
  label?: string
  className?: string
}

export function ControlledCalendar({ name, rules }: ControlledCalendarProps) {
  const { control } = useFormContext()
  const [open, setOpen] = useState(false)

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => {
        const value = field.value as Date | undefined

        return (
          <Popover open={open} onOpenChange={setOpen}>
            <ErrorMessageWrapper name={name}>
              <PopoverTrigger asChild>
                <Button size="m">
                  {value ? value.toLocaleDateString("ru-RU") : "Выбрать дату"}
                  <ChevronDownIcon className="size-5" />
                </Button>
              </PopoverTrigger>
            </ErrorMessageWrapper>
            <PopoverContent className="w-auto p-0" align="start">
              <UncontrolledCalendar
                mode="single"
                selected={value}
                onSelect={(date) => {
                  field.onChange(date)
                  setOpen(false)
                }}
              />
            </PopoverContent>
          </Popover>
        )
      }}
    />
  )
}
