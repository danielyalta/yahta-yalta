"use client"
import { PropsWithChildren, ReactNode, useRef } from "react"
import anchorImage from "./sea-anchor.png"
import NextImage from "next/image"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

import { RopeDivider } from "@/components/RopeDivider"
import { cn } from "@/lib/utils"

export const IntroWrapper = ({
  children,
  bgImage,
}: PropsWithChildren<{ bgImage: ReactNode }>) => {
  const bottomElementRef = useRef(null)

  const isBottomElementVisible = useIntersectionObserver(bottomElementRef, {
    rootMargin: "-18px",
  })

  return (
    <>
      <div className="relative h-[calc(100svh+20px)] w-full">
        <RopeDivider />
        {bgImage}
        <NextImage
          className={cn(
            "h-[114px] w-[115px]",
            "md:h-[180px] md:w-[250px]",
            "lg:h-[228px] lg:w-[310px]",
            "absolute right-0 bottom-[-1%] z-20 translate-x-[100%] object-contain object-center transition-all duration-1000 ease-in-out",
            isBottomElementVisible && "translate-x-0",
          )}
          src={anchorImage}
          alt="Якорь"
        />
        {children}
      </div>

      <div ref={bottomElementRef} />
    </>
  )
}
