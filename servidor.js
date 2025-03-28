import express from 'express'
import cors from 'cors'
import { database } from './db.js'
import authrouter from './router/auth-routers.js'
import taskroutes from './router/task-routes.js'
import cookieparser from 'cookie-parser'
import dotenv from 'dotenv'

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()
database()
app.use(cookieparser())
app.use('/', authrouter)
app.use('/', taskroutes)
app.get('/', (req, res) => {
  res.send('<h1>Hola prueba</h1>')
})

const port = process.env.PORT ?? 3000
app.listen(port, () => {
  console.log(`servidor corriendo en el puerto http://localhost:${port}`)
})
