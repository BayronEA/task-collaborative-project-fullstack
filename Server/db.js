import mongoose from 'mongoose'
export const database = async () => {
  try {
    await mongoose.connect(process.env.APIMONGODB)
    console.log('base de datos conectada')
  } catch {
    console.log('error')
  }
}
