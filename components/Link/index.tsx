import cn from 'classnames'
import NextLink from 'next/link'
import type { LinkProps as NextLinkProps } from 'next/link'
import type { PropsWithChildren } from 'react'

import styles from './index.module.scss'

type LinkProps = NextLinkProps &
  PropsWithChildren & {
    className?: string
  }

export const Link = ({ children, className, ...otherProps }: LinkProps) => (
  <NextLink className={cn(styles.root, className)} {...otherProps}>
    {children}
  </NextLink>
)
