import { boatTypeMapping } from "@/lib/constants"
import Link from "next/link"
// import { Image } from "@/components/Image"

import { capitalize, cn, formatPrice } from "@/lib/utils"

import styles from "./boat.module.scss"
import { getBoatData } from "@/lib/getBoatData"
import { BoatClauseMapping } from "@/components/BoatClauseMapping"
import { BoatImageWithSkeleton } from "@/components/BoatImageWithSkeleton"
import { BadgeRussianRuble, Ship, Users } from "lucide-react"

type BoatProps = {
  boatName: BoatName
}
const boatIconMapping = {
  capacity: <Users className="text-darkblue3 size-5" />,
  price: <BadgeRussianRuble className="text-darkblue3 size-5" />,
  type: <Ship className="text-darkblue3 size-5" />,
}

export const Boat = ({ boatName }: BoatProps) => {
  const {
    data: { name, capacity, slug, type, price },
    mainImage,
  } = getBoatData(boatName)

  const clauseMapping = [
    {
      key: "Цена",
      value: formatPrice(price),
      icon: boatIconMapping.price,
    },
    { key: "Тип", value: boatTypeMapping[type], icon: boatIconMapping.type },
    {
      key: "Вместимость",
      value: `${capacity} человек`,
      icon: boatIconMapping.capacity,
    },
  ]

  return (
    <Link href={`/boats/${name}`} className={cn(styles.root, "bg-sand")}>
      <div className="bg-bronze text-darkblue3 absolute top-[1%] right-[-4%] z-20 rounded-[8px] px-5 py-2 text-[24px] font-medium">
        {capitalize(slug)}
      </div>

      <div className="relative h-[70%] w-full">
        <BoatImageWithSkeleton
          src={mainImage}
          fill
          alt={name}
          sizes="(max-width: 770px) 100vw,
         (max-width: 1180px) 50vw,
         (max-width: 1450px) 33vw,
         25vw"
        />
      </div>

      <BoatClauseMapping clauseMapping={clauseMapping} />
    </Link>
  )
}
