import telegram from "@/public/icons/telegram.svg"
import viber from "@/public/icons/viber.svg"
import whatsapp from "@/public/icons/whatsapp.svg"

import { Image } from "@/components/Image"

import styles from "./index.module.scss"

export const PHONE_NUMBER = "79781000171"

export const TELEGRAM_BASE = "https://t.me/RodionYalta"
export const WHATSAPP_BASE = `https://wa.me/${PHONE_NUMBER}`

export const Contacts = () => {
  const chats = [
    {
      href: TELEGRAM_BASE,
      src: telegram,
      alt: "телеграм контакт",
    },
    {
      href: WHATSAPP_BASE,
      src: whatsapp,
      alt: "ватсап контакт",
    },
    // {
    //   href: `viber://chat?number=79781000171&text=${text}`,
    //   src: viber,
    //   alt: "вайбер контакт",
    // },
  ]

  return (
    <div className={styles.root}>
      <div className={styles.chats}>
        {chats.map(({ alt, href, src }, index) => (
          <a
            key={index}
            href={href}
            className="scale-animated size-[80px]"
            target="_blank"
          >
            <Image placeholder="empty" src={src} alt={alt} />
          </a>
        ))}
      </div>

      <div className={styles.contacts}>
        <div>Родион:</div>
        <a className={styles.phoneHighlight} href={`tel:+${PHONE_NUMBER}`}>
          +7 (978) 100-01-71
        </a>
      </div>
    </div>
  )
}
