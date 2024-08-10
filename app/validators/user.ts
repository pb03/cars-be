import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    username: vine.string(),
    email: vine.string().email(),
    password: vine.string().minLength(6),
  })
)
