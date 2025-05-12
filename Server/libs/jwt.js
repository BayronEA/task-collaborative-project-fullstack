import jwt from 'jsonwebtoken'
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.SECRET_KEY_JWT,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) reject(err)
        resolve(token)
      }
    )
  })
}
