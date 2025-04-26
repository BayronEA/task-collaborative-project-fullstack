import { Router } from 'express'
import { authController } from '../controllers/auth-controller.js'
import { validateSchema } from '../middleware/validate-middleware.js'
import { authRequired } from '../middleware/validatetoken.js'
import { loginSchema, registerSchema } from '../schemas/auth-schema.js'

const authrouter = Router()

authrouter.post(
  '/registro',
  validateSchema(registerSchema),
  authController.register
)
authrouter.post('/login', validateSchema(loginSchema), authController.login)
authrouter.post('/logout', authController.logout)
authrouter.get('/id', authRequired, authController.profile)
authrouter.get('/verify', authController.verify)

export default authrouter
