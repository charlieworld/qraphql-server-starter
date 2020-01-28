import k from '../tools/key'
import admin from './admin'
import token from '../tools/token'


const signUp = async (user) => {
  const { name, key } = user
  const hashedKey = await k.hash(key)
  const newAdmin = admin.addAdmin(name, hashedKey)
  if (!newAdmin) {
    throw new Error('Add Admin failed!')
  }
  return newAdmin
}

const login = async (userInput) => {
  const { name, key } = userInput
  const user = admin.getAdminByName(name)
  if (!user) throw new Error('Email Account Not Exists')
  const passwordIsValid = await k.compare(key, user.key)
  if (!passwordIsValid) throw new Error('Wrong Password')
  return { token: token.forge(user) }
}

module.exports = {
  signUp,
  login,
}
