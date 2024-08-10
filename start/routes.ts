const UsersController = () => import('#controllers/users_controller')
const AdsController = () => import('#controllers/ads_controller')
const AdImagesController = () => import('#controllers/ad_images_controller')
const LoginController = () => import('#controllers/login_controller')

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'

router.post('/signup', [UsersController, 'store'])
router.post('/login', [LoginController])

router
  .resource('ads', AdsController)
  .apiOnly()
  .use(['store', 'update', 'destroy'], middleware.auth())

router.post('/ad-image/:adId', [AdImagesController, 'store']).use(middleware.auth())

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/
const IMG_DIR_PATH = '/Users/prasanjit/Documents/pb03/car-seller/app/uploads'

router.get('/uploads/:id/*', ({ request, response, params }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath(`${IMG_DIR_PATH}/${params.id}`, normalizedPath)
  return response.download(absolutePath)
})
