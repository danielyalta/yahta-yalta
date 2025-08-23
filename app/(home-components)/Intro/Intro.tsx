import { Button } from "@/components/ui/button"
import styles from "./intro.module.scss"
import { IntroWrapper } from "./IntroWrapper"
import bgImage from "./intro-bg.jpg"
import { Image } from "@/components/Image"
import { BookingPopover } from "@/components/BookingPopover/BookingPopover"

export const Intro = () => {
  return (
    <IntroWrapper
      bgImage={
        <Image
          fill
          priority
          src={bgImage}
          alt="Интро картинка - аренда яхт и катеров в Ялте"
        />
      }
    >
      <div className="bg-darkblue4/70 absolute inset-0" />
      <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center">
        <div className="flex h-full w-[70%] flex-col items-center justify-around text-center text-shadow-lg/30">
          <div>
            <h1 className={styles.title}>Аренда яхты в Ялте</h1>
            <h2 className="text-[20px] font-bold sm:text-[30px] md:text-[40px] lg:text-[50px] xl:text-[60px]">
              Совершите настоящее
              <br />
              морское путешествие!
            </h2>
          </div>

          <h3 className="leading-[1.6] font-light italic sm:text-[18px] sm:leading-[1.4] md:text-[20px] lg:text-[24px]">
            Покупайтесь на диких пляжах или в открытом, чистом море. Полюбуйтесь
            самыми красивыми местами Ялты из яхты, совершая морскую прогулку к
            замку Ласточкино гнездо, скалам Адалары, Медведь-горе, скале Дива...
          </h3>

          <BookingPopover>
            <Button>Подобрать яхту</Button>
          </BookingPopover>
        </div>
      </div>
    </IntroWrapper>
  )
}
