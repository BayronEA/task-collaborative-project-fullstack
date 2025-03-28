import mongoose from 'mongoose'
import { env } from 'node:process'
export const database = async () => {
  try {
    await mongoose.connect(process.env.APIMONGODB)
    console.log('base de datos conectada')
  } catch {
    console.log('error')
  }
}
