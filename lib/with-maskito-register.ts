import type { RefCallback } from "react"
import type { UseFormRegisterReturn } from "react-hook-form"

export const withMaskitoRegister = (
  registerResult: UseFormRegisterReturn,
  maskitoRef: RefCallback<HTMLElement | null>,
): UseFormRegisterReturn & { onInput: UseFormRegisterReturn["onChange"] } => {
  const ref: RefCallback<HTMLElement | null> = (node): void => {
    registerResult.ref(node)
    maskitoRef(node)
  }

  return {
    ...registerResult,
    ref,
    onInput: registerResult.onChange,
    // @ts-expect-error qwe
    onChange: undefined,
  }
}

export const unmaskFormNumberValue = (maskedValue: string) => {
  if (maskedValue === "") return NaN
  if (!maskedValue) {
    return Number(maskedValue)
  }

  const formattedAmount = maskedValue.replace(/[^0-9.]+/g, "")
  const numericAmount = parseFloat(formattedAmount)

  return numericAmount
}

type ValidateMaskedInputParams = {
  value: string
  minValue?: number
  minValueMessage?: string
}

export const validateMaskedInput = ({
  value,
  minValue = 0,
  minValueMessage,
}: ValidateMaskedInputParams) => {
  const formattedAmount = unmaskFormNumberValue(value)

  if (typeof formattedAmount !== "number" || isNaN(formattedAmount)) {
    return "Заполните поле"
  }
  if (formattedAmount < minValue) {
    return minValueMessage || `Должно быть не меньше ${minValue}`
  }

  if (formattedAmount === 0) {
    return `Должно быть больше нуля`
  }

  return true
}
