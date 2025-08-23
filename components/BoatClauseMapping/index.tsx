import cn from "classnames"

import styles from "./index.module.scss"

type BoatClauseMappingProps = {
  clauseMapping: Record<string, React.ReactNode>[]
  className?: string
  theme?: "light" | "dark"
}

export const BoatClauseMapping = ({
  clauseMapping,
  className,
  theme = "light",
}: BoatClauseMappingProps) => {
  const isLightTheme = theme === "light"
  return (
    <div className={cn(styles.root, className)}>
      {clauseMapping.map(
        ({ key, value, icon }, index) =>
          value && (
            <div
              key={index}
              className={cn(styles.clause, !isLightTheme && styles.clauseDark)}
            >
              <div className="flex items-center gap-1">
                <div className="size-5">{icon}</div>
                <div
                  className={isLightTheme ? styles.keyLight : styles.keyDark}
                >
                  {key}
                </div>
              </div>

              <div
                className={isLightTheme ? styles.valueLight : styles.valueDark}
              >
                {value}
              </div>
            </div>
          ),
      )}
    </div>
  )
}
