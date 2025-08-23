"use client"
import { Input } from "@/components/ControlledInputs/input"
import { Image } from "@/components/Image"
import { Button } from "@/components/ui/button"
import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { orderedBoatsData } from "@/data"
import { capitalize, pluralize } from "@/lib/utils"
import telegram from "@/public/icons/telegram.svg"
import whatsapp from "@/public/icons/whatsapp.svg"
import { FormProvider, useForm } from "react-hook-form"
import { Combobox } from "../ui/combobox"
import { ru } from "date-fns/locale"

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { CircleQuestionMark } from "lucide-react"
import { TELEGRAM_BASE, WHATSAPP_BASE } from "../Contacts"
import { ControlledNumberInput } from "../ControlledInputs/ControlledNumberInput"
import { ButtonLink } from "../ui/button-link"
import { Slider } from "../ui/slider"

import { ControlledCalendar } from "../ControlledInputs/ControlledCalendar"
import { formatDate } from "date-fns"
import { InfoHint } from "../InfoHint"
import { useParams } from "next/navigation"

const messengerOptions = [
  {
    value: "whatsapp",
    label: "Whatsapp",
    icon: (
      <Image
        className="size-5"
        placeholder="empty"
        src={whatsapp}
        alt="wa icon"
      />
    ),
  },
  {
    value: "telegram",
    label: "Телеграм",
    icon: (
      <Image
        className="size-5"
        placeholder="empty"
        src={telegram}
        alt="tg icon"
      />
    ),
  },
]

const boatOptions = orderedBoatsData.map(({ slug }) => {
  const capitalizedSlug = capitalize(slug)

  return {
    value: capitalizedSlug,
    label: capitalizedSlug,
  }
})

const chooseForMeVariant = "помочь с подбором"
boatOptions.unshift({ label: chooseForMeVariant, value: chooseForMeVariant })

const allPrices = orderedBoatsData.map((b) => b.price)
const minBoatPrice = Math.min(...allPrices)
const maxBoatPrice = Math.max(...allPrices)

export const BookingForm = () => {
  const { boatName } = useParams<{ boatName: BoatName }>()

  let selectedBoatDefaultValue = chooseForMeVariant

  if (boatName) {
    const findedBoat = orderedBoatsData.find((b) => b.name === boatName)!.slug

    selectedBoatDefaultValue = capitalize(findedBoat)
  }

  const methods = useForm({
    defaultValues: {
      messenger: "whatsapp",
      selectedBoat: selectedBoatDefaultValue,
      duration: [2, 5],
      people: 2,
      price: [minBoatPrice, maxBoatPrice],
      date: null,
      time: "09:00",
    },
  })

  const {
    watch,
    formState: { isValid },
  } = methods

  const { messenger, duration, selectedBoat, price, people, date, time } =
    watch()
  const [minSelectedDuration, maxSelectedDuration] = duration
  const [minSelectedPrice, maxSelectedPrice] = price

  let durationText = ""
  if (minSelectedDuration === maxSelectedDuration) {
    durationText = `${minSelectedDuration} ${pluralize(minSelectedDuration, "hours")}`
  } else {
    durationText = `от ${minSelectedDuration} до ${maxSelectedDuration} ${pluralize(maxSelectedDuration, "hours")}`
  }

  let priceText = ""
  if (minSelectedPrice === maxSelectedPrice) {
    priceText = `${minSelectedPrice.toLocaleString("ru-RU")} ₽ в час`
  } else {
    priceText = `от ${minSelectedPrice.toLocaleString("ru-RU")} до ${maxSelectedPrice.toLocaleString("ru-RU")} ₽ в час`
  }

  const orderDetails = encodeURIComponent(
    `Здравствуйте! Желаю забронировать яхту.
• ${selectedBoat === chooseForMeVariant ? `Нужно подобрать яхту по цене ${priceText}` : `Выбрали яхту «${selectedBoat}»`}
• ${people === 1 ? "На одного человека" : `Нас будет ${people} ${pluralize(people, "people")}`}
• Длительность прогулки - ${durationText}
• Начало прогулки - ${
      date &&
      formatDate(date, "d MMMM", {
        locale: ru,
      })
    } в ${time}
`,
  )

  const submitHref = `${messenger === "telegram" ? TELEGRAM_BASE : WHATSAPP_BASE}?text=${orderDetails}`

  return (
    <>
      <FormProvider {...methods}>
        <form className="flex flex-col gap-8">
          <div className="grid gap-2">
            <span className="font-medium">Куда</span>
            <Combobox
              rules={{ required: "Выберите мессенджер" }}
              name="messenger"
              options={messengerOptions}
              placeholder="мессенджер"
            />
          </div>

          <div className="grid gap-2">
            <span className="font-medium">Выбранная яхта</span>
            <Combobox
              name="selectedBoat"
              options={boatOptions}
              placeholder="поможем с подбором"
            />
          </div>

          {selectedBoat === chooseForMeVariant && (
            <div className="grid gap-2">
              <span className="font-medium">Цена в час</span>
              <div className="flex flex-col items-center gap-1">
                <div>{priceText}</div>
                <Slider
                  name="price"
                  min={minBoatPrice}
                  max={maxBoatPrice}
                  step={1000}
                />
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">Длительность</span>
              <InfoHint>Минимальная длительность прогулки — 2 часа</InfoHint>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div>{durationText}</div>
              <Slider name="duration" min={2} max={24} step={1} />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <Label htmlFor="people">Количество пассажиров</Label>
              <InfoHint>Максимум 10 пассажиров</InfoHint>
            </div>
            <ControlledNumberInput
              name="people"
              className="w-[100px]"
              min={1}
              max={10}
            />
          </div>

          <div className="flex w-full items-center gap-2">
            <div className="flex w-1/2 flex-col gap-2">
              <span className="leading-none font-medium">Дата</span>
              <ControlledCalendar
                name="date"
                label="Дата"
                rules={{ required: "Выберите дату" }}
              />
            </div>
            <div className="flex w-1/2 flex-col gap-2">
              <Label htmlFor="time">Время</Label>
              <Input
                name="time"
                type="time"
                step="60"
                className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>
        </form>
      </FormProvider>
      <DialogFooter>
        <DialogClose asChild>
          <Button size="m" variant="flat">
            Закрыть
          </Button>
        </DialogClose>
        <ButtonLink
          disabled={!isValid}
          href={submitHref}
          target="_blank"
          size="m"
        >
          Готово
        </ButtonLink>
      </DialogFooter>
    </>
  )
}
