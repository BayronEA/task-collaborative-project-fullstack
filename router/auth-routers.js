import { Router } from 'express'
import { authRequired } from '../middleware/validatetoken.js'
import { authController } from '../controllers/auth-controller.js'
import { validateSchema } from '../middleware/validate-middleware.js'
import { registerSchema, loginSchema } from '../schemas/auth-schema.js'

const authrouter = Router()

authrouter.post(
  '/registro',
  validateSchema(registerSchema),
  authController.register
)
authrouter.post('/login', validateSchema(loginSchema), authController.login)
authrouter.post('/logout', authController.logout)
authrouter.get('/id', authRequired, authController.profile)

export default authrouter
