import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import AdImage from '#models/ad_image'

const PATH = '/Users/prasanjit/Documents/pb03/car-seller/app/uploads'

export default class AdImagesController {
  async store({ request, response, params }: HttpContext) {
    const images = request.files('adImages')
    for (const image of images) {
      const name = `${cuid()}.${image.extname}`
      await image.move(app.makePath(`${PATH}/${params.adId}/`), {
        name,
      })

      await AdImage.create({
        adId: params.adId,
        imageSrc: name,
      })
    }
    response.status(201).send(`${images.length} image(s) added`)
  }
}
