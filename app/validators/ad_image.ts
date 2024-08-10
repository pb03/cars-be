import vine from '@vinejs/vine'

export const updateImageValidator = vine.compile(
  vine.object({
    ad_images: vine.array(
      vine.file({
        size: '3mb',
        extnames: ['jpg', 'png', 'webp'],
      })
    ),
  })
)
