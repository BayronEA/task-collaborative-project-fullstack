import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { database } from './db.js'
import authrouter from './router/auth-routers.js'
import taskroutes from './router/task-routes.js'

const app = express()
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://taskcollaborative.vercel.app/'],
    credentials: true,
  })
)
app.use(express.json())
dotenv.config()
database()
app.use(cookieParser())
app.use('/', authrouter)
app.use('/', taskroutes)
app.get('/', (req, res) => {
  res.send('<h1>Hola prueba</h1>')
})

const port = process.env.PORT ?? 3000
app.listen(port, () => {
  console.log(`servidor corriendo en el puerto http://localhost:${port}`)
})
