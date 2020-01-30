import db from '../tools/db'
import uuid from '../tools/uuid'

const getAdmins = async () => {
  const res = await db.select('admin')
  return res
}
const addAdmin = async (name, key) => {
  const res = await db.insert('admin', { id: uuid.generate('admin'), name, key })
  return res
}

const getAdminByID = async (id) => {
  const res = await db.select('admin', { id })
  return res[0]
}
const getAdminByName = async (name) => {
  const res = await db.select('admin', { name })
  return res[0]
}

const getMe = async (me) => {
  if (!me) throw new Error('Login First !')
  const res = await getAdminByID(me.adminID)
  return res
}

module.exports = {
  getMe,
  getAdmins,
  addAdmin,
  getAdminByID,
  getAdminByName,
}
