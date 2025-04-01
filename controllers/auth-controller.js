import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { createAccessToken } from '../libs/jwt.js'

export class authController {
  static async register(req, res) {
    const { email, password, username } = req.body
    try {
      const userFound = await User.findOne({ email })
      if (userFound) {
        return res.status(400).json({ message: 'El usuario ya existe' })
      }

      const passwordhash = await bcrypt.hash(password, 10)

      const newUser = new User({
        username,
        email,
        password: passwordhash,
      })
      const userSaved = await newUser.save()
      res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
      })
    } catch (error) {
      console.log(error)
    }
  }

  static async login(req, res) {
    const { email, password } = req.body
    try {
      const userFound = await User.findOne({ email })
      if (!userFound) {
        res.status(400).json({ message: 'Usuario no encontrado' })
        return
      }

      const isMatch = await bcrypt.compare(password, userFound.password)
      if (!isMatch) {
        res.status(400).json({ message: 'Password incorrecta' })
        return
      }
      const token = await createAccessToken({
        id: userFound.id,
        username: userFound.username,
      })
      res
        .cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        })
        .json({
          id: userFound._id,
          username: userFound.username,
          email: userFound.email,
        })
    } catch (error) {
      if (error instanceof Error) {
        res.status(401).send(error.message)
      } else {
        res.status(401).send('error inesperado')
      }
    }
  }
  static async logout(req, res) {
    res.clearCookie('token').send('logout')
  }

  static async profile(req, res) {
    const userFound = await User.findById(req.user.id)
    if (!userFound)
      return res.status(400).json({ message: 'usuario no encontrado' })
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    })
  }
}
