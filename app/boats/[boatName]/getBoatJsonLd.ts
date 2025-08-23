// /lib/structured-data/getBoatJsonLd.ts
import { capitalize } from "@/lib/utils"
import { boatTypeMapping, SITE_URL } from "@/lib/constants"
import { PHONE_NUMBER } from "@/components/Contacts" // Убедитесь, что PHONE_NUMBER экспортируется

// Удаляем локальное определение BoatDataForJsonLd
// Вместо этого используем глобальный тип BoatData
// type BoatDataForJsonLd = { /* ... */ }

type GetBoatJsonLdProps = {
  data: BoatData // Теперь используем глобальный тип BoatData
  images: string[] // Массив URL изображений
}

export function getBoatJsonLd({ data, images }: GetBoatJsonLdProps) {
  const {
    slug,
    name,
    description,
    price,
    capacity,
    type,
    model,
    length,
    width,
    cabins,
    sleeps,
    toilets,
    isHighSpeed,
  } = data

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        serviceType: "Аренда яхты для морской прогулки",
        name: `Морская прогулка на яхте ${capitalize(name)} в Ялте`,
        description: description,
        url: `${SITE_URL}boats/${name}`,
        image: images.map((imgSrc) => `${SITE_URL}${imgSrc}`),
        provider: {
          "@type": "LocalBusiness",
          name: "Яхта-Ялта",
          url: SITE_URL,
          telephone: `+${PHONE_NUMBER}`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ялта",
            addressRegion: "Крым",
            addressCountry: "RU",
            // streetAddress: "Название улицы, если есть конкретный причал"
          },
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "RUB",
          price: price,
          itemCondition: "https://schema.org/UsedCondition",
          availability: "https://schema.org/InStock",
          url: `${SITE_URL}boats/${name}`,
          category: "Аренда яхты",
        },
        category: "Туристические услуги",
        areaServed: {
          "@type": "Place",
          name: "Ялта",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ялта",
            addressRegion: "Крым",
            addressCountry: "RU",
          },
        },
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "Тип судна",
            value: boatTypeMapping[type],
          },
          {
            "@type": "PropertyValue",
            name: "Вместимость (пассажиров)",
            value: `${capacity}`,
          },
          ...(length
            ? [
                {
                  "@type": "PropertyValue",
                  name: "Длина",
                  value: `${length} м`,
                  unitCode: "MTR",
                },
              ]
            : []),
          ...(width
            ? [
                {
                  "@type": "PropertyValue",
                  name: "Ширина",
                  value: `${width} м`,
                  unitCode: "MTR",
                },
              ]
            : []),
          ...(model
            ? [
                {
                  "@type": "PropertyValue",
                  name: "Модель судна",
                  value: model,
                },
              ]
            : []),
          ...(cabins
            ? [
                {
                  "@type": "PropertyValue",
                  name: "Количество кают",
                  value: `${cabins}`,
                },
              ]
            : []),
          ...(sleeps
            ? [
                {
                  "@type": "PropertyValue",
                  name: "Спальные места",
                  value: `${sleeps}`,
                },
              ]
            : []),
          ...(toilets
            ? [
                {
                  "@type": "PropertyValue",
                  name: "Туалеты",
                  value: `${toilets}`,
                },
              ]
            : []),
          ...(isHighSpeed
            ? [
                {
                  "@type": "PropertyValue",
                  name: "Высокоскоростная",
                  value: "Да",
                },
              ]
            : []),
        ].filter(Boolean),
      },
    ],
  }
  return jsonLd
}
