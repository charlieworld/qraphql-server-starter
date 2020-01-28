import jwt from 'jsonwebtoken'

const forge = (userData) => jwt.sign({
  AdminID: userData.id,
  name: userData.name,
}, process.env.SECRET, {
  expiresIn: '1d',
})

const verify = async (token) => jwt.verify(token, process.env.SECRET)

module.exports = {
  forge,
  verify,
}
