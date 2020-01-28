import bcrypt from 'bcrypt'

const hash = (key) => bcrypt.hash(key, parseInt(process.env.SALT_ROUNDS, 10))
const compare = async (password, passwordHash) => {
  const match = await bcrypt.compare(password, passwordHash)
  return match
}

module.exports = {
  hash,
  compare,
}
