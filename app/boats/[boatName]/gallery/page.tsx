"use client"
import { useEffect, useState } from "react"
import {
  Controller,
  FreeMode,
  Keyboard,
  Navigation,
  Thumbs,
} from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"
import { Image } from "@/components/Image"

import { BoatImageWithSkeleton } from "@/components/BoatImageWithSkeleton"
import { getBoatData } from "@/lib/getBoatData"
import { Scaling } from "lucide-react"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import styles from "./gallery.module.scss"
import { useEscapeKey } from "./useEscapeKey"

const modEnabled = {
  enabled: true,
}

const GalleryPage = () => {
  const { boatName } = useParams<{ boatName: BoatName }>()
  const { data, images } = getBoatData(boatName)

  const searchParams = useSearchParams()
  const initialSlide = Number(searchParams.get("initialSlide") ?? 0)

  useEscapeKey(boatName)

  const [mainSwiper, setMainSwiper] = useState<any>(null)
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [thumbsSliderPerView, setThumbsSliderPerView] = useState(3)

  useEffect(() => {
    const getThumbsSliderPerView = () => {
      const breakpoints = {
        small: window.matchMedia("(max-width: 600px)"),
        medium: window.matchMedia("(min-width: 601px) and (max-width: 1024px)"),
        large: window.matchMedia("(min-width: 1025px) and (max-width: 1440px)"),
        extraLarge: window.matchMedia("(min-width: 1441px)"),
      }

      if (breakpoints.small.matches) {
        return 3
      } else if (breakpoints.medium.matches) {
        return 4
      } else if (breakpoints.large.matches) {
        return 5
      } else if (breakpoints.extraLarge.matches) {
        return 6
      }

      return 3
    }

    // Only run on client side
    if (typeof window !== "undefined") {
      setThumbsSliderPerView(getThumbsSliderPerView())
    }
  }, [])

  useEffect(() => {
    if (mainSwiper && initialSlide !== undefined) {
      mainSwiper.slideTo(initialSlide)
    }
  }, [mainSwiper, initialSlide])

  return (
    <div className={styles.root}>
      <Link
        href={`/boats/${data?.name}`}
        className="link absolute top-[20px] right-[10px] z-20"
      >
        <div className={styles.closeWrapper}>
          <Scaling />
        </div>
      </Link>

      <div className="h-4/5">
        <Swiper
          navigation={modEnabled}
          className="h-full"
          scrollbar={modEnabled}
          keyboard={modEnabled}
          slidesPerView={1}
          lazyPreloadPrevNext={2}
          onSwiper={setMainSwiper}
          modules={[Navigation, Controller, Thumbs, Keyboard, FreeMode]}
          controller={{ control: thumbsSwiper }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={src}>
              <Image
                fill
                priority
                sizes="100vw"
                className={styles.img}
                key={index}
                src={src}
                alt={`Заглавное фото ${data?.slug}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="relative h-1/5">
        <Swiper
          spaceBetween={10}
          slidesPerView={thumbsSliderPerView}
          modules={[FreeMode, Navigation, Controller, Thumbs]}
          onSwiper={setThumbsSwiper}
          freeMode
          watchSlidesProgress
          className="h-full"
          controller={{ control: mainSwiper }}
        >
          {images.map((src, index) => (
            <SwiperSlide
              key={src}
              onClick={() => {
                mainSwiper.slideTo(index)
              }}
            >
              <BoatImageWithSkeleton
                fill
                src={src}
                alt={`Фото-миниатюра ${data?.slug}`}
                sizes="(max-width: 600px) 33vw,
              (max-width: 1024px) 25vw,
              (max-width: 1440px) 20vw,
              16vw"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default GalleryPage
