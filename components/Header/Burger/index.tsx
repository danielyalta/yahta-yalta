import cn from "classnames"

import { useOnClickOutside } from "@/hooks/useOnClickOutside"

import styles from "./index.module.scss"

type BurgerProps = {
  isOpened: boolean
  toggleOpened: () => void
  onClose: () => void
}

export const Burger = ({ isOpened, toggleOpened, onClose }: BurgerProps) => {
  const { setElRef } = useOnClickOutside({ onClose })

  return (
    <button
      className={cn(styles.root, isOpened && styles.opened)}
      onClick={toggleOpened}
      ref={setElRef}
    >
      <div className={cn(styles.item)} />
      <div className={cn(styles.item)} />
      <div className={cn(styles.item)} />
    </button>
  )
}
