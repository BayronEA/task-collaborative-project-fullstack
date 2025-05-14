import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createAccessToken } from '../libs/jwt.js'
import User from '../models/user.js'

export class authController {
  static async register(req, res) {
    const { email, password, username } = req.body
    try {
      const userFound = await User.findOne({ email })
      if (userFound) {
        return res.status(400).json(['El usuario ya existe'])
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
      res.json({
        // Enviamos el token en la respuesta
        token, // <--- AÑADIDO
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      })
      console.log('cookies en el backend', req.cookies)
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
  static async verify(req, res) {
    // El token se espera ahora en el encabezado Authorization: Bearer TOKEN
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res
        .status(401)
        .json({
          message: 'No autorizado, token no proveído o formato incorrecto',
        })
    }
    const token = authHeader.split(' ')[1] // Extraemos el token

    // console.log('Cookies recibidas:', req.cookies) // Esto ya no será relevante
    if (!token)
      return res.status(401).json({ message: 'No autorizado, token no existe' }) // Redundante si se valida authHeader
    jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, user) => {
      if (err)
        return res
          .status(401)
          .json({ message: 'No autorizado, token inválido' })
      const userFound = await User.findById(user.id)
      if (!userFound)
        return res
          .status(401)
          .json({ message: 'No autorizado, usuario no encontrado' })
      return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
      })
    })
  }
}
