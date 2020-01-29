import { find } from 'lodash'
import db from '../tools/db'

const admins = [
  {
    id: '1',
    name: 'admin1',
    key: 'admin1_key',

  },
  {
    id: '2',
    name: 'admin2',
    key: 'admin2_key',

  },
]

const getAdmins = () => db.select('admin')
const addAdmin = (name, key) => {
  admins.push({ id: admins.length, name, key })
  return admins[admins.length - 1]
}

const getAdminByID = (id) => find(admins, ['id', id])
const getAdminByName = (name) => find(admins, ['name', name])

const getMe = (me) => {
  if (!me) throw new Error('Login First !')
  return getAdminByID(me.adminID)
}

module.exports = {
  getMe,
  getAdmins,
  addAdmin,
  getAdminByID,
  getAdminByName,
}
