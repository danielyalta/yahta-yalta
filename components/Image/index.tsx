import NextImage from "next/image"
import type { ImageProps as NextImageProps } from "next/image"

import styles from "./index.module.scss"
import { cn } from "@/lib/utils"

type ImageProps = {
  className?: string
  containerClassname?: string
} & NextImageProps

export const Image = ({
  className,
  containerClassname,
  ...otherProps
}: ImageProps) => {
  const image = (
    <NextImage className={cn(styles.root, className)} {...otherProps} />
  )

  return containerClassname ? (
    <div className={containerClassname}>{image}</div>
  ) : (
    image
  )
}
