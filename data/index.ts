import { alexandra } from "./alexandra"
import { altair } from "./altair"
import { alustar } from "./alustar"
import { anadel } from "./anadel"
import { aurelia } from "./aurelia"
import { barcelona } from "./barcelona"
import { eden } from "./eden"
import { faraon } from "./faraon"
import { ibiza } from "./ibiza"
import { josie } from "./josie"
import { karolina } from "./karolina"
import { label } from "./label"
import { maestro } from "./maestro"
import { mishor } from "./mishor"
import { monika } from "./monika"
import { natatores } from "./natatores"
import { nikole } from "./nikole"
import { omega } from "./omega"
import { raffaela } from "./raffaela"
import { raskat } from "./raskat"
import { saintMary } from "./saintMary"
import { snafu } from "./snafu"
import { vaynah } from "./vaynah"
import { goodMorning } from "./goodMorning"
import { magicLight } from "./magicLight"

export const orderedBoatsData: BoatData[] = [
  maestro,
  alexandra,
  karolina,
  omega,
  natatores,
  ibiza,
  magicLight,
  altair,
  goodMorning,
  alustar,
  anadel,
  aurelia,
  barcelona,
  eden,
  josie,
  // juniorStar
  label,
  mishor,
  monika,
  nikole,
  faraon,
  raffaela,
  raskat,
  saintMary,
  snafu,
  vaynah,
]

const allPrices = orderedBoatsData.map((b) => b.price)

export const MIN_BOAT_PRICE = Math.min(...allPrices)
export const MAX_BOAT_PRICE = Math.max(...allPrices)
