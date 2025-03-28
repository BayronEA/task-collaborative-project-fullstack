import jwt from 'jsonwebtoken'
import { SECRET_KEY_JWT } from '../config.js'

export const authRequired = (req, res, next) => {
  const { token } = req.cookies
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' })
  }
  jwt.verify(
    token,
    process.env.SECRET_KEY_JWT || SECRET_KEY_JWT,
    (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Token invalido' })
      req.user = decoded
      next()
    }
  )
}
