import { boatTypeMapping } from "@/lib/constants"
import { cn, formatPrice } from "@/lib/utils"
import { BoatClauseMapping } from "@/components/BoatClauseMapping"
import {
  BedDouble,
  MoveHorizontal,
  MoveVertical,
  Ship,
  ShipWheel,
  Toilet,
  Users,
} from "lucide-react"
import { BookingPopover } from "@/components/BookingPopover/BookingPopover"
import { Button } from "@/components/ui/button"

export const BoatParameters = (boatData: BoatData) => {
  const { price, type, capacity, length, width, cabins, sleeps, toilets } =
    boatData

  const clauseMapping = [
    {
      key: "Тип",
      value: boatTypeMapping[type],
      icon: <Ship className="size-5" />,
    },
    {
      key: "Вмещает",
      value: capacity ? `до ${capacity} человек` : null,
      icon: <Users className="size-5" />,
    },
    {
      key: "Длина",
      value: length ? `${length} м` : null,
      icon: <MoveVertical className="size-5" />,
    },
    {
      key: "Ширина",
      value: width ? `${width} м` : null,
      icon: <MoveHorizontal className="size-5" />,
    },
    { key: "Кают", value: cabins, icon: <ShipWheel className="size-5" /> },
    {
      key: "Спальных мест",
      value: sleeps,
      icon: <BedDouble className="size-5" />,
    },
    { key: "Санузлов", value: toilets, icon: <Toilet className="size-5" /> },
  ]

  return (
    <div
      className={cn(
        "flex w-full max-w-[600px] flex-col gap-[30px] rounded-[20px] p-[20px] text-xl sm:px-[20px] sm:py-[40px]",
        "bg-gradient-1-3 border-bronze border",
      )}
    >
      <span className="text-bronze text-center text-[30px] font-bold">
        {formatPrice(price)}
      </span>
      <BookingPopover>
        <Button className="mx-auto w-fit">Забронировать</Button>
      </BookingPopover>
      <BoatClauseMapping
        className="gap-[40px] text-[20px]"
        theme="dark"
        clauseMapping={clauseMapping}
      />
    </div>
  )
}
