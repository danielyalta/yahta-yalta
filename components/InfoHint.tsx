"use client"

import * as React from "react"
import { CircleQuestionMark } from "lucide-react"
import { useMediaQuery } from "usehooks-ts"

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"

type InfoHintProps = {
  children: React.ReactNode
  className?: string
}

export function InfoHint({ children, className }: InfoHintProps) {
  const isMobile = useMediaQuery("(pointer: coarse)")

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <CircleQuestionMark className={className ?? "size-5"} />
        </PopoverTrigger>
        <PopoverContent side="top" className="max-w-xs p-3 text-sm">
          {children}
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <CircleQuestionMark className={className ?? "size-5"} />
      </TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  )
}
