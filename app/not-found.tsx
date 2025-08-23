import { Compass, Sailboat, Map } from "lucide-react"
import { ButtonLink } from "@/components/ui/button-link"

const NotFoundPage = () => {
  return (
    <div className="from-darkblue to-darkblue2 relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-br font-sans text-white">
      <div className="relative z-10 flex flex-col items-center p-8 text-center">
        <div className="mb-8 flex items-center justify-center space-x-4 text-9xl font-extrabold tracking-tight text-white drop-shadow-lg">
          <span className="text-blue-800">4</span>
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-8 border-white bg-blue-500 shadow-xl">
            <span className="text-7xl">0</span>
            <Sailboat
              className="absolute -top-8 -right-8 rotate-45 text-white"
              size={64}
            />
          </div>
          <span className="text-blue-800">4</span>
        </div>

        <h1 className="mb-4 text-5xl leading-tight font-bold drop-shadow-2xl">
          Затерялись в открытом море...
        </h1>

        <p className="text-opacity-90 mb-8 max-w-lg text-lg text-white">
          Мы не смогли найти путь к этой странице. Похоже, она сбилась с курса и
          ушла в неизвестность.
        </p>

        <div className="flex space-x-4">
          <ButtonLink href="/">
            <Compass />
            Вернуться в порт
          </ButtonLink>
          <ButtonLink href="/contacts" variant="secondary">
            <Map />
            Проверить карту
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
