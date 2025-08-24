// /lib/structured-data/getRootJsonLd.ts
import { SITE_URL } from "@/lib/constants"
import { PHONE_NUMBER } from "@/components/Contacts" // Убедитесь, что PHONE_NUMBER экспортируется
import { MIN_BOAT_PRICE } from "@/data"

// Если у вас есть другие константы (например, EMAIL_ADDRESS, LOGO_URL, SOCIAL_LINKS),
// которые используются в JSON-LD, их также можно импортировать сюда или передать как аргументы.

type GetRootJsonLdProps = {
  description: string // Описание сайта/бизнеса
  searchPageUrl?: string // URL страницы поиска, если есть Sitelinks Search Box
  email?: string // Email адрес, если хотите его включить
  streetAddress?: string // Улица
  postalCode?: string // Почтовый индекс
  latitude?: string // Широта
  longitude?: string // Долгота
  logoUrl?: string // URL логотипа
  ogImageUrl?: string // URL изображения OpenGraph
  socialLinks?: string[] // Массив ссылок на соцсети
}

export function getRootJsonLd({
  description,
  searchPageUrl,
  email,
  streetAddress,
  postalCode,
  latitude,
  longitude,
  logoUrl = `${SITE_URL}/images/logo.png`, // Дефолтный путь к логотипу
  ogImageUrl = `${SITE_URL}/images/og-image.jpg`, // Дефолтный путь к OG изображению
  socialLinks = [], // Дефолтный пустой массив для соцсетей
}: GetRootJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Описание организации / локального бизнеса
      {
        "@type": "LocalBusiness",
        name: "Яхта-Ялта",
        description: description,
        url: SITE_URL,
        logo: logoUrl,
        image: ogImageUrl,
        telephone: `+${PHONE_NUMBER}`,
        ...(email && { email: email }), // Добавляем email, только если он предоставлен
        address: {
          "@type": "PostalAddress",
          ...(streetAddress && { streetAddress: streetAddress }),
          addressLocality: "Ялта",
          addressRegion: "Крым",
          ...(postalCode && { postalCode: postalCode }),
          addressCountry: "RU",
        },
        ...(latitude &&
          longitude && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: latitude,
              longitude: longitude,
            },
          }),
        category: "Морские прогулки",
        makesOffer: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Аренда парусной яхты с капитаном",
              description: "Морские прогулки под парусом в Ялте.",
            },
            priceCurrency: "RUB",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: MIN_BOAT_PRICE,
              priceCurrency: "RUB",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Аренда моторной яхты или катера с капитаном",
              description: "Скоростные морские прогулки и рыбалка в Ялте.",
            },
            priceCurrency: "RUB",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: MIN_BOAT_PRICE,
              priceCurrency: "RUB",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Морская рыбалка с яхты",
              description: "Организация рыбалки в Черном море.",
            },
            priceCurrency: "RUB",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: MIN_BOAT_PRICE,
              priceCurrency: "RUB",
            },
          },
        ],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
            opens: "09:00",
            closes: "21:00",
          },
        ],
        ...(socialLinks.length > 0 && { sameAs: socialLinks }),
      },
      // 2. Описание веб-сайта
      {
        "@type": "WebSite",
        url: SITE_URL,
        name: "Яхта-Ялта",
        ...(searchPageUrl && {
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${searchPageUrl}?q={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }
  return jsonLd
}
