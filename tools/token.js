import jwt from 'jsonwebtoken'

const forge = (userData) => jwt.sign({
  adminID: userData.id,
  name: userData.name,
}, process.env.SECRET, {
  expiresIn: '10d',
})

const verify = async (token) => jwt.verify(token, process.env.SECRET)

module.exports = {
  forge,
  verify,
}
