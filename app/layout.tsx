import type { Metadata } from "next"
import { Caveat, Montserrat } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import "swiper/css/pagination"
import "./swiper.scss"

import { cn, formatPrice } from "@/lib/utils"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer/Footer"
import { SITE_URL } from "@/lib/constants"
import { getRootJsonLd } from "./getRootJsonLd"
import { MIN_BOAT_PRICE } from "@/data"

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
})

const caveat = Caveat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-caveat",
})

const title = "Яхта-Ялта - аренда яхты и катера в Ялте, морские прогулки"

export const metadata: Metadata = {
  title,
  themeColor: "#273549",
  alternates: {
    canonical: SITE_URL,
  },
  keywords:
    "прогулки на яхте, прогулки на катере, морская прогулка ялта, морские прогулки, ялта, яхта, катер, аренда, морское путешествие, экскурсия, рыбалка, прогулка на яхте, снять яхту, аренда яхты с капитаном, аренда, заказать яхту, морская экскурсия ласточкино гнездо, ласточка, гнездо, гнездышко, гурзуф яхта, медведь гора яхта",
  description: `Аренда яхты и катера в Ялте с капитаном. От ${formatPrice(MIN_BOAT_PRICE)}. Морские прогулки к замку Ласточкино гнездо, Медведь-горе. Рыбалка и гриль на яхте. Морские экскурсии. Морские прогулки на катере, парусной и моторной яхте в Ялте. Покупайтесь на диких пляжах или в открытом, чистом море. Полюбуйтесь самыми красивыми местами Ялты с яхты, совершая морскую прогулку к замку Ласточкино гнездо, скалам Адалары, Медведь-горе, скале Дива...`,
  openGraph: {
    title,
    locale: "ru_RU",
    type: "website",
    url: SITE_URL,
    images: `/images/og-main.jpg`,
    description:
      "Морская прогулка в Ялте. Морская прогулка к Ласточкино гнездо. Аренда яхты в Ялте. Аренда катера Ялта. Прогулка на яхте",
  },
  verification: {
    yandex: "66a28b60d8138467",
  },
  icons: {
    icon: [
      { url: "/favicons/favicon.ico", sizes: "any" },
      { url: "/favicons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicons/apple-touch-icon.png",
  },
  manifest: "/favicons/site.webmanifest",
  other: {
    "mask-icon": "/favicons/safari-pinned-tab.svg",
    "msapplication-config": "/favicons/browserconfig.xml",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = getRootJsonLd({
    description: metadata.description as string,
  })

  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          montserrat.variable,
          caveat.variable,
          "flex min-h-screen flex-col antialiased",
        )}
      >
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) { if (document.scripts[j].src === r) { return; } }
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js', 'ym');
          ym(74716621, 'init', {webvisor:true, clickmap:true, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-204178349-2"
          strategy="afterInteractive"
        />
        <Script id="ga-ua" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-204178349-2');`}
        </Script>
        <Header />
        <main
          className={cn(
            "min-h-[100svh]",
            "relative flex flex-col overflow-hidden",
          )}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
