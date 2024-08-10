import fs from 'node:fs'
import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'

import Ad from '#models/ad'
import AdImage from '#models/ad_image'
import { createAdValidator } from '#validators/ad'

const IMG_DIR_PATH = '/Users/prasanjit/Documents/pb03/car-seller/app/uploads'

export default class AdsController {
  async index({ params }: HttpContext) {
    const username = params.username
    const ads = username
      ? await Ad.query()
          .where('username', username)
          .preload('images')
          .preload('createdBy')
          .paginate(params.page ?? 1)
      : await Ad.query()
          .preload('images')
          .preload('createdBy')
          .paginate(params.page ?? 1)
    return ads
  }

  async show({ params }: HttpContext) {
    const ad = await Ad.query().where('id', params.id).preload('images').preload('createdBy')
    return ad[0]
  }

  async store({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(createAdValidator)
    const data = await Ad.create({
      title: payload.title,
      brand: payload.brand,
      price: payload.price,
      location: payload.location,
      ownerCount: payload.ownerCount,
      kmsDriven: payload.kmsDriven,
      fuelType: payload.fuelType,
      registration: payload.registration,
      registrationYear: payload.registrationYear,
      transmission: payload.transmission,
      userId: auth.getUserOrFail().id,
    })

    const adId = data.id
    const images = request.files('adImages')
    for (const image of images) {
      const name = `${cuid()}.${image.extname}`
      await image.move(app.makePath(`${IMG_DIR_PATH}/${adId}/`), {
        name,
      })

      await AdImage.create({
        adId: adId,
        imageSrc: name,
      })
    }
    console.log(`${images.length} image(s) added`)
    response.status(201).send(data)
  }

  async update({ params, request, response }: HttpContext) {
    const payload = await request.validateUsing(createAdValidator)
    const ad = await Ad.query().where('id', params.id).update({
      title: payload.title,
      brand: payload.brand,
      price: payload.price,
      location: payload.location,
      ownerCount: payload.ownerCount,
      kmsDriven: payload.kmsDriven,
      fuelType: payload.fuelType,
      registration: payload.registration,
      registrationYear: payload.registrationYear,
      transmission: payload.transmission,
    })
    response.status(200).send(ad)
  }

  async destroy({ params, response }: HttpContext) {
    const adId = params.id
    const ad = await Ad.findOrFail(adId)
    await ad.delete()

    try {
      fs.rmdirSync(`${IMG_DIR_PATH}/${adId}`, { recursive: true })
    } catch (err) {
      console.error('Error while deleting the directory.', err)
    }

    response.status(200).send('Ad deleted')
  }
}
