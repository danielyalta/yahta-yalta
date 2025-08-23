import { Image } from "@/components/Image"

import { Section } from "@/components/Section"
import cardImage1 from "./cards-1.jpg"
import cardImage2 from "./cards-2.jpg"
import cardImage3 from "./cards-3.jpg"
import bgImage from "./cards-bg-2.jpg"
import styles from "./cards.module.scss"
import { Button } from "@/components/ui/button"
import { BookingPopover } from "@/components/BookingPopover/BookingPopover"

const Card = ({ src, alt, caption }: any) => (
  <div className={styles.card}>
    <Image className={styles.photo} src={src} alt={alt} />
    <div className={styles.caption}>{caption}</div>
  </div>
)

export const Cards = () => {
  return (
    <Section
      className={styles.root}
      title="Наполните жизнь приятными моментами..."
    >
      <Image
        quality={30}
        className={styles.bgImage}
        src={bgImage}
        alt="фоновая картинка"
      />
      <div className={styles.cards}>
        <Card
          src={cardImage1}
          alt="Скала парус - Крым, Ялта"
          caption={`Любуемся скалой „Парус”`}
        />
        <Card
          src={cardImage2}
          alt="Замок Ласточкино Гнездо - Крым, Ялта"
          caption={`Замок „Ласточкино гнездо”`}
        />
        <Card
          src={cardImage3}
          alt="Гриль на яхте, готовка рыбы на яхте"
          caption="Словили рыбку и на гриль!"
        />
      </div>
      <div className={styles.callToAction}>
        <div className={styles.polaroid}>
          <div className={styles.photo}>
            <span className={styles.question}>?</span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[50px] sm:w-1/2">
          <span className="text-center text-xl leading-tight font-light italic sm:text-2xl">
            Забронируйте морскую прогулку вдоль берега Ялты и добавьте яркие
            фото в свою коллекцию!
          </span>
          <BookingPopover>
            <Button className="animate-bounce">Забронировать яхту</Button>
          </BookingPopover>
        </div>
      </div>
    </Section>
  )
}
