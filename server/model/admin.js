
import { find } from 'lodash'

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
  {
    id: '3',
    name: 'admin3',
    key: 'admin3_key',

  },
]


const getAdmins = () => admins
const addAdmin = (name, key) => {
  admins.push({ id: admins.length, name, key })
  return admins[admins.length - 1]
}

const getAdminByID = (id) => find(admins, ['id', id])

module.exports = {
  getAdmins,
  addAdmin,
  getAdminByID,
}
