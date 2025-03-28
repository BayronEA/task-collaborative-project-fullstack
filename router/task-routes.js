import { Router } from 'express'
import { authRequired } from '../middleware/validatetoken.js'
import { authController } from '../controllers/auth-controller.js'

const taskroutes = Router()

taskroutes.get('/task', authRequired, (req, res) => {
  res.json({ message: 'task ok' })
})

export default taskroutes
