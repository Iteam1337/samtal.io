import jwt from 'jsonwebtoken'

export const jwtSign = (name: string, email: string) => {
  return jwt.sign(
    {
      name,
      email,
    },
    'this is jwt secret',
    {
      expiresIn: '3h',
    }
  )
}
