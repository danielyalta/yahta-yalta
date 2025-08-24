import fs from "fs"
import path from "path"
import sharp from "sharp"

const boatsDir = path.join(process.cwd(), "public/images/boats")

function isImage(file: string) {
  return /\.(jpe?g|png|webp)$/i.test(file)
}

fs.readdirSync(boatsDir).forEach((boatFolder) => {
  const boatPath = path.join(boatsDir, boatFolder)

  if (fs.lstatSync(boatPath).isDirectory()) {
    const images = fs.readdirSync(boatPath).filter(isImage)

    if (images.length > 0) {
      // Берём первую картинку по сортировке
      const firstImage = path.join(boatPath, images[0])

      // Папка для OG-изображений
      const ogDir = path.join(boatPath, "og-image")
      if (!fs.existsSync(ogDir)) {
        fs.mkdirSync(ogDir)
      }

      const output = path.join(ogDir, "generated-og-image.jpg")

      sharp(firstImage)
        .resize(1200, 630, { fit: "cover" })
        .jpeg({ quality: 80 })
        .toFile(output)
        .then(() =>
          console.log(
            `✅ OG image created: ${boatFolder}/og-image/generated-og-image.jpg`,
          ),
        )
        .catch((err) => console.error(err))
    }
  }
})
