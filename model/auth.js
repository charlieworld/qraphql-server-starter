import k from '../tools/key'
import admin from './admin'
import token from '../tools/token'


const signUp = async (user) => {
  const { name, key } = user
  const oldUser = await admin.getAdminByName(name)
  if (oldUser) throw new Error(`Admin Name:[${name}] Already Exist !`)
  const hashedKey = await k.hash(key)
  const newAdminID = await admin.addAdmin(name, hashedKey)
  if (!newAdminID) {
    throw new Error('Add Admin failed!')
  }
  const res = await admin.getAdminByID(newAdminID)
  return res
}

const login = async (userInput) => {
  const { name, key } = userInput
  const user = await admin.getAdminByName(name)
  if (!user) throw new Error('Admin Not Exists')
  const passwordIsValid = await k.compare(key, user.key)
  if (!passwordIsValid) throw new Error('Wrong Password')
  return { token: token.forge(user) }
}

module.exports = {
  signUp,
  login,
}
