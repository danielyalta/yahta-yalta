import { orderedBoatsData } from "@/data"

import { Boat } from "./Boat/Boat"
import styles from "./boats.module.scss"
import { Section, SectionProps } from "../Section"

type BoatsProps = {
  title?: string
  currentBoat?: string
} & Pick<SectionProps, "topRopeDivider" | "bottomRopeDivider">

export const Boats = ({
  title = "Яхты и катера",
  currentBoat,
  ...sectionProps
}: BoatsProps) => {
  // const [filters, setFilters] = useState(null)

  const filteredBoatsData = orderedBoatsData.filter(
    ({ name }) => name !== currentBoat,
  )

  return (
    <Section className={styles.root} title={title} {...sectionProps}>
      {/* <h2>filters</h2> */}

      <div className={styles.boats} id="boats">
        {filteredBoatsData.map(({ name }) => {
          return <Boat key={name} boatName={name as BoatName} />
        })}
      </div>
    </Section>
  )
}
