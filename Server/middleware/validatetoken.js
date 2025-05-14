import jwt from 'jsonwebtoken'

export const authRequired = (req, res, next) => {
  // const { token } = req.cookies // Ya no se usa
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({
        message: 'No token, authorization denied (header missing or malformed)',
      })
  }
  const token = authHeader.split(' ')[1]

  if (!token) {
    // Esta verificación puede ser redundante si la anterior es robusta
    return res.status(401).json({ message: 'No token, authorization denied' })
  }
  jwt.verify(token, process.env.SECRET_KEY_JWT, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalido' })
    req.user = decoded // 'decoded' ya contiene el payload, usualmente {id: ..., username: ...}
    next()
  })
}
