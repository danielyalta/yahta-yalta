import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1)

export const throttle = (cb: any, delay: number = 200) => {
  let shouldWait = false
  let waitingArgs: any
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args: any) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true

    setTimeout(timeoutFunc, delay)
  }
}

export const debounce = (callback: any, timeout: any = 400) => {
  let timer: any
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      callback(...args)
    }, timeout)
  }
}

export const formatPrice = (price: number) =>
  `${price.toLocaleString("ru-RU")} руб/час`

const pluralRules = new Intl.PluralRules("ru-RU")

const forms = {
  hours: {
    one: "час",
    few: "часа",
    many: "часов",
    other: "часов",
  },
  people: {
    one: "человек",
    few: "человека",
    many: "человек",
    other: "человек",
  },
} as const

type FormKey = keyof typeof forms

export function pluralize(n: number, key: FormKey): string {
  const category = pluralRules.select(n) as keyof (typeof forms)[FormKey]
  return forms[key][category]
}
