import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LoginController {
  async handle({ request }: HttpContext) {
    const payload = request.all()
    const user = await User.verifyCredentials(payload.email, payload.password)
    const token = await User.accessTokens.create(user)
    return {
      token: token.value!.release(),
      user,
    }
  }
}
