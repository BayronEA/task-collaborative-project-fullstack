import { Router } from 'express'
import { authRequired } from '../middleware/validatetoken.js'
import { authController } from '../controllers/auth-controller.js'

const authrouter = Router()

authrouter.post('/registro', authController.register)
authrouter.post('/login', authController.login)
authrouter.post('/logout', authController.logout)
authrouter.get('/id', authRequired, authController.profile)

export default authrouter
