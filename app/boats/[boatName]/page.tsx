import { getBoatData } from "@/lib/getBoatData"
import Link from "next/link"

import { BoatImageWithSkeleton } from "@/components/BoatImageWithSkeleton"
import { Boats } from "@/components/Boats/Boats"
import { Image } from "@/components/Image"
import { capitalize, formatPrice } from "@/lib/utils"
import styles from "./boatpage.module.scss"
import { BoatParameters } from "./BoatParameters"

import { boatTypeMapping, dashChar, SITE_URL } from "@/lib/constants"
import type { Metadata } from "next"
import { getBoatJsonLd } from "./getBoatJsonLd"

type Params = Promise<{ boatName: string }>

const keywordsMapping = {
  sailing: "парусная яхта в ялте, парусник ялта, прогулка под парусом,",
  motor: "моторная яхта в ялте, рыбалка с катера",
  catamaran: "катамаран ялта, яхта-катамаран",
}

export async function generateMetadata({
  params,
}: {
  params: Params
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}): Promise<Metadata> {
  const { boatName } = await params
  const {
    data: { slug, type, name, price, capacity },
    mainImage,
  } = getBoatData(boatName as BoatName)

  const textAddition = type === "catamaran" ? "" : "яхта"

  const titleMainPart = `${capitalize(slug)} ${dashChar} ${boatTypeMapping[type]} ${textAddition}`

  const description = `Забронировать +7 978-1000-171 | Скидки на аренду светового дня и суток | Цена: ${formatPrice(price)} | Вместимость ${dashChar} до ${capacity} пассажиров | Рыбалка на яхте`

  const keywords = `яхта ${slug}, яхта ${slug} ялта, яхта ${name}, яхта ${name} ялта, 
аренда ${type === "catamaran" ? "катамарана" : type === "sailing" ? "парусной яхты" : "моторной яхты"} ${name}, 
морская прогулка на ${name} в Ялте, рыбалка на ${name}, 
${keywordsMapping[type]}, 
прогулки на яхте, прогулки на катере, морская прогулка ялта, морские прогулки, 
ялта, яхта, катер, аренда, морское путешествие, экскурсия, рыбалка, 
прогулка на яхте, снять яхту, аренда яхты с капитаном, заказать яхту, 
морская экскурсия ласточкино гнездо, ласточка, гнездо, гурзуф яхта, медведь гора яхта`

  return {
    alternates: {
      canonical: `${SITE_URL}boats/${name}`,
    },
    title: `${titleMainPart}. Аренда и морская прогулка на ${capitalize(name)} в Ялте`,
    description,
    keywords,
    openGraph: {
      url: `${SITE_URL}boats/${name}`,
      images: mainImage,
      type: "website",
      description,
      title: `${titleMainPart}. Аренда яхты и морская прогулка в Ялте`,
    },
  }
}

const BoatPage = async ({ params }: { params: Params }) => {
  const { boatName } = await params

  const { data, images, mainImage } = getBoatData(boatName as BoatName)
  const { slug, name, description } = data

  const thumbs = images.slice(1, 4)

  const jsonLd = getBoatJsonLd({ data, images })

  return (
    <div className={styles.root}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className={styles.title}>{capitalize(slug)}</h1>

      <div className={styles.showcase}>
        <div className={styles.photos}>
          <Link
            className="scale-animated-xs relative h-3/4"
            href={`/boats/${name}/gallery?initialSlide=${0}`}
          >
            <Image
              src={mainImage}
              alt={`Заглавное фото яхты ${slug}`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 60vw"
            />
          </Link>
          <div className={styles.thumbs}>
            {thumbs.map((src, index) => (
              <Link
                key={index}
                className="scale-animated-xs relative w-1/3"
                href={`/boats/${name}/gallery?initialSlide=${index + 1}`}
              >
                <BoatImageWithSkeleton
                  src={src}
                  alt={`Фото яхты ${slug}`}
                  fill
                  sizes="(max-width: 1280px) 33vw, 20vw"
                />
              </Link>
            ))}
          </div>
        </div>

        <div className={styles.about}>
          <BoatParameters {...data} />
          <div className={styles.description}>
            <h2 className={styles.subtitle}>Описание</h2>
            <div className={styles.descriptionText}>{description}</div>
          </div>
        </div>
      </div>

      <Boats topRopeDivider title="Другие яхты" currentBoat={name} />
    </div>
  )
}

export default BoatPage
