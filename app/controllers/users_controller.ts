import User from '#models/user'
import { createUserValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    const user = await User.create({
      fullName: payload.fullName,
      username: payload.username,
      email: payload.email,
      password: payload.password,
    })
    response.status(201).send(user)
  }
}
