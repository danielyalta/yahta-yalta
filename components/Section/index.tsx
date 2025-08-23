import type { CSSProperties, ReactNode } from "react"

import styles from "./index.module.scss"
import { cn } from "@/lib/utils"
import { RopeDivider } from "../RopeDivider"

export type SectionProps = {
  title: ReactNode
  children: ReactNode
  className?: string
  style?: CSSProperties
  topRopeDivider?: boolean
  bottomRopeDivider?: boolean
  theme?: "light" | "blue"
}

export const Section = ({
  title,
  children,
  className,
  style,
  topRopeDivider = false,
  bottomRopeDivider = true,
  theme = "blue",
}: SectionProps) => (
  <section
    className={cn(
      styles.root,
      theme === "blue" && styles.blueSection,
      "relative",
      className,
    )}
    style={style}
  >
    {topRopeDivider && <RopeDivider placement="top" />}
    {bottomRopeDivider && <RopeDivider placement="bottom" />}
    <h3 className={cn(styles.title, theme === "blue" && styles.blueTitle)}>
      {title}
    </h3>
    {children}
  </section>
)
