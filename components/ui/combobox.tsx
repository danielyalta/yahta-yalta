"use client"

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ControllerProps, useController, useFormContext } from "react-hook-form"
import { ErrorMessageWrapper } from "./ErrorMessageWrapper"
import { Spinner } from "@/components/ui/spinner" // Assuming you have a Spinner component
import { cn } from "@/lib/utils"
import { ScrollArea } from "./scroll-area"

type ComboboxProps = {
  disabled?: boolean
  placeholder?: string
  options?: { value: string; label: string; icon?: React.ReactNode }[]
  inputPlaceholder?: string
  onChange?: (value: string) => void
  isLoading?: boolean
  isCleanable?: boolean
  className?: string
  alwaysShowPlaceholder?: boolean
} & Pick<ControllerProps, "name" | "rules" | "defaultValue">

export function Combobox({
  placeholder = "Select an option...",
  options = [],
  inputPlaceholder = "Поиск...",
  name,
  onChange,
  rules,
  defaultValue,
  disabled,
  isLoading,
  className,
  alwaysShowPlaceholder = false,
  isCleanable = false,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  const { control } = useFormContext()

  const {
    field: { ref, value, onChange: fieldOnChange, ...field },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  })

  const handleClear = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    fieldOnChange("")
    onChange?.("")
    setOpen(false)
  }

  const handleSelect = (newValue: string) => {
    fieldOnChange(newValue)
    onChange?.(newValue)
    setOpen(false)
  }

  const customFilter = React.useCallback(
    (itemValue: string, search: string) => {
      const option = options.find((opt) => opt.value === itemValue)
      if (!option) return 0 // Don't show if option not found

      const searchLower = search.toLowerCase()
      const labelLower = option.label.toLowerCase()
      const valueLower = option.value.toLowerCase()

      if (
        labelLower.includes(searchLower) ||
        valueLower.includes(searchLower)
      ) {
        return 1 // Show if label or value matches
      }

      return 0 // Hide if no match
    },
    [options],
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <ErrorMessageWrapper name={name}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            role="combobox"
            aria-expanded={open}
            className={cn(
              "h-[40px] w-full justify-between px-3 py-4",
              className,
            )}
            {...field}
          >
            <div className="flex flex-col items-start overflow-hidden text-left font-normal">
              {(!value || alwaysShowPlaceholder) && (
                <span className="text-text-secondary truncate text-sm">
                  {placeholder}
                </span>
              )}

              <div className="flex items-center gap-1">
                <div>
                  {options.find((option) => option.value === value)?.icon}
                </div>
                <span className="truncate">
                  {options.find((option) => option.value === value)?.label}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!disabled && !isLoading && value && isCleanable && (
                <div
                  onClick={handleClear}
                  className="ring-offset-background focus:ring-ring rounded-sm opacity-50 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none"
                >
                  <X className="!size-5" />
                </div>
              )}
              <ChevronsUpDown className="text-icon-gray !size-5" />
            </div>
          </Button>
        </PopoverTrigger>
      </ErrorMessageWrapper>
      <PopoverContent
        align="start"
        className="bg-gradient-1-3 z-50 w-[340px] p-0"
        onWheel={(e) => e.stopPropagation()}
      >
        <Command filter={customFilter}>
          <ScrollArea className="h-fit max-h-[300px]">
            <CommandList>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <Spinner size="s" />
                </div>
              ) : (
                <>
                  <CommandEmpty>Ничего не найдено</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        className="justify-between"
                        key={option.value}
                        value={option.value}
                        onSelect={() => handleSelect(option.value)}
                      >
                        <div className="flex items-center gap-2">
                          <div>{option.icon}</div>
                          {option.label}
                        </div>
                        {value === option.value && <Check className="size-4" />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
