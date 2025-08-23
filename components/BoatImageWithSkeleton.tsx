"use client"

import { useState } from "react"
import { Image } from "@/components/Image"
import { cn } from "@/lib/utils"
import type { ImageProps as NextImageProps } from "next/image"

export const BoatImageWithSkeleton = ({
  src,
  alt,
  fill,
  className,
  ...props
}: NextImageProps) => {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && (
        <div className="bg-gradient-1-lightblue absolute inset-0 z-10 size-full animate-pulse" />
      )}

      <Image
        src={src}
        alt={alt}
        fill={fill}
        onLoad={() => {
          setLoading(false)
        }}
        className={cn(
          "transition-opacity duration-500",
          loading && "opacity-0",
          className,
        )}
        {...props}
      />
    </>
  )
}
