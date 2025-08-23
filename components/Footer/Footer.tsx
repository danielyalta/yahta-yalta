"use client"
import logo from "@/public/icons/yahta-logo.svg"

import { Image } from "@/components/Image"

import styles from "./footer.module.scss"
import { cn } from "@/lib/utils"

export const Footer = () => {
  return (
    <footer className={cn(styles.root, "bg-gradient-1-3")}>
      {/* <RopeDivider placement="top" /> */}
      <span className="font-light">
        Яхта-Ялта (c) 2021-{new Date().getFullYear()} Все права защищены.
      </span>

      <div>
        Разработка сайта:
        <a
          href="https://telegram.me/Danielyalta"
          target="_blank"
          className={cn(styles.creator, "link")}
        >
          Даниил
        </a>
      </div>

      <Image
        onClick={() => window.scrollTo(0, 0)}
        className="link size-14"
        placeholder="empty"
        src={logo}
        alt="лого яхта-ялта"
      />
    </footer>
  )
}
