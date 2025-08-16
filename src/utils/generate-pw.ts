import bcrypt from 'bcrypt'
import crypto from 'crypto'

export const generatePlainPassword = () => {
  const length = 5
  const pw = crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex') // convert to hexadecimal format
    .slice(0, length) // return required number of characters
  console.log(pw)
  return pw
}

export const generateHashPassword = async (pw: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(pw, await bcrypt.genSalt(10))
  return hashedPassword
}
