"use client"
import { useState } from "react"
import logo from "@/public/icons/yahta-logo.svg"
import { Image } from "@/components/Image"

import { Burger } from "./Burger"
import styles from "./index.module.scss"
import { MessengersBtn } from "./MessengersBtn"
import { NavMenu } from "./NavMenu"
import useHeaderScroll from "./useHeaderScroll"
import { Link } from "@/components/Link"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export const Header = () => {
  const pathname = usePathname()
  const isGalleryPage = pathname?.includes("/gallery")

  const [isBurgerOpened, setBurgerOpened] = useState(false)
  const [isMessengersOpened, setMessengersOpened] = useState(false)

  const toggleBurgerMenu = () => {
    setBurgerOpened((state) => !state)
  }

  const toggleMessengers = () => {
    setMessengersOpened((state) => !state)
  }

  // не работает, если обернуто в ScrollArea
  const headerState = useHeaderScroll()

  if (isGalleryPage) return null

  return (
    <header
      className={cn(
        styles.root,
        "bg-gradient-1-3",
        headerState === "hide" && styles.hide,
        (headerState === "show" || isBurgerOpened || isMessengersOpened) &&
          styles.show,
      )}
    >
      <MessengersBtn
        isOpened={isMessengersOpened}
        toggleOpened={toggleMessengers}
        onClose={() => setMessengersOpened(false)}
      />

      {/* <NavMenu
        isOpened={isBurgerOpened}
        burger={
          <Burger
            isOpened={isBurgerOpened}
            toggleOpened={toggleBurgerMenu}
            onClose={() => setBurgerOpened(false)}
          />
        }
      /> */}

      <div className="flex items-center gap-3 text-right">
        <div className="flex flex-col gap-1">
          <Link href="/" className="text-lg font-bold uppercase">
            Яхта-ялта
          </Link>
          <div className="text-sm font-light">Аренда яхт и катеров в Ялте</div>
        </div>
        <Link href="/">
          <Image
            placeholder="empty"
            className="size-14 sm:size-16"
            src={logo}
            alt="лого яхта-ялта"
          />
        </Link>
      </div>
    </header>
  )
}
