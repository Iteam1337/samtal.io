import crypto from 'crypto'

const create128BitIV = () => {
  const iv = crypto
    .createHash('sha256')
    .update('super secret key here')
    .digest()

  const resizedIV = Buffer.allocUnsafe(16)
  iv.copy(resizedIV)

  return resizedIV
}

export const encrypt = (str: string) => {
  const key = crypto
    .createHash('sha256')
    .update('super secret key here')
    .digest()

  const cipher = crypto.createCipheriv('aes256', key, create128BitIV())
  const msg = []

  msg.push(cipher.update(str, 'binary', 'hex'))
  msg.push(cipher.final('hex'))

  return msg.join('')
}

export const decrypt = (str: string) => {
  try {
    const key = crypto
      .createHash('sha256')
      .update('super secret key here')
      .digest()

    const cipher = crypto.createDecipheriv('aes256', key, create128BitIV())
    const msg = []

    msg.push(cipher.update(str, 'hex', 'binary'))
    msg.push(cipher.final('binary'))

    return msg.join('')
  } catch (error) {
    throw new Error(error)
  }
}
