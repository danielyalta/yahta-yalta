"use client"
import { FreeMode } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/react"

import { Image } from "@/components/Image"

import { reviewsImages } from "./images"
import { Section } from "@/components/Section"
import styles from "./reviews.module.scss"

export const Reviews = () => {
  return (
    <Section title={<>Спасибо Вам &#129505;</>}>
      <div className="mx-auto h-[500px] w-full">
        <Swiper
          loop
          // navigation
          freeMode={{ enabled: true }}
          spaceBetween={10}
          slidesPerView={4}
          modules={[FreeMode]}
          className="h-full"
        >
          {reviewsImages.map((src, index) => (
            <SwiperSlide key={src.src}>
              <Image
                key={index}
                src={src}
                alt={`отзыв`}
                className={styles.img}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  )
}
